import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      // Tabel Users (Untuk Login nanti)
      await sql`
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `;

      // Tabel Customers
      await sql`
        CREATE TABLE IF NOT EXISTS customers (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(50) UNIQUE,
          address TEXT,
          transaction_frequency INT DEFAULT 0,
          total_spent NUMERIC(15, 0) DEFAULT 0,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Tabel Stocks
      await sql`
        CREATE TABLE IF NOT EXISTS stocks (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          unit VARCHAR(20) NOT NULL,
          stock INT DEFAULT 0,
          min_stock INT DEFAULT 0,
          price_per_unit NUMERIC(15, 0) DEFAULT 0,
          supplier VARCHAR(255),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Tabel Menus
      await sql`
        CREATE TABLE IF NOT EXISTS menus (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price NUMERIC(15, 0) DEFAULT 0,
          sold_count INT DEFAULT 0,
          is_deleted BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Tabel Resep
      await sql`
        CREATE TABLE IF NOT EXISTS menu_recipes (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
          stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
          amount_needed INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          CONSTRAINT unique_menu_stock UNIQUE (menu_id, stock_id) 
        );
      `;

      // Tabel Header Transaksi
      await sql`
        CREATE TABLE IF NOT EXISTS transactions (
          id VARCHAR(50) PRIMARY KEY,
          customer_id UUID REFERENCES customers(id),
          total_amount NUMERIC(15, 0) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `;

      // Tabel Detail Item
      await sql`
        CREATE TABLE IF NOT EXISTS transaction_items (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          transaction_id VARCHAR(50) REFERENCES transactions(id) ON DELETE CASCADE,
          menu_id UUID REFERENCES menus(id),
          quantity INT NOT NULL,
          price_at_time NUMERIC(15, 0) NOT NULL,
          subtotal NUMERIC(15, 0) NOT NULL
        );
      `;
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}