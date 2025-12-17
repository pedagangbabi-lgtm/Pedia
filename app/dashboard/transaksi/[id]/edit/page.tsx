// app/dashboard/transaksi/[id]/edit/page.tsx

import { notFound, redirect } from 'next/navigation';
import { auth } from '@/app/lib/auth';
import { fetchTransactionById, fetchCustomers, fetchMenus } from '@/app/lib/data';
import EditTransactionForm from '@/app/ui/transaksi/edit-form';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTransactionPage(props: PageProps) {
  // 🔒 CEK AUTH & ROLE DULU
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  const userRole = session.user.role || 'staff';
  
  // Redirect jika bukan admin
  if (userRole !== 'admin') {
    redirect('/dashboard/transaksi?error=access_denied');
  }

  // Await params terlebih dahulu
  const params = await props.params;
  const id = params.id;

  // Validasi ID
  if (!id || id === 'undefined') {
    console.error('Invalid ID:', id);
    notFound();
  }

  try {
    const [transaction, customers, menus] = await Promise.all([
      fetchTransactionById(id),
      fetchCustomers(),
      fetchMenus(),
    ]);

    if (!transaction) {
      notFound();
    }

    return (
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Transaksi: {transaction.id}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Perbarui detail transaksi dan keranjang belanja
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <EditTransactionForm
            transaction={transaction}
            customers={customers}
            menus={menus}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading transaction:', error);
    notFound();
  }
}