import postgres from 'postgres';

// Ambil connection string dari environment variable
const connectionString = process.env.POSTGRES_URL;

// --- DEBUGGING BLOCK ---
if (!connectionString) {
  throw new Error(`
    FATAL ERROR: POSTGRES_URL tidak ditemukan!
    Pastikan Anda sudah membuat variabel 'POSTGRES_URL' di Vercel dan melakukan REDEPLOY.
  `);
}
// -----------------------

// Inisialisasi koneksi
const sql = postgres(connectionString, {
  ssl: { rejectUnauthorized: false }, // biasanya perlu untuk Neon
});

export default sql;
