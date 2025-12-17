// app/dashboard/transaksi/create/page.tsx
import { fetchMenusForPOS, fetchCustomersForPOS } from '@/app/lib/data'; // Update import
import POSTransaction from '@/app/ui/transaksi/create-form';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Transaksi | BABIPEDIA Dashboard',
  description: 'Halaman Kasir/POS untuk mengelola transaksi di dashboard.',
};

export default async function Page() {
  const [menus, customers] = await Promise.all([
    fetchMenusForPOS(),
    fetchCustomersForPOS() 
  ]);

  return (
    <main className="h-full">
        <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/dashboard/transaksi" className="hover:text-pink-600 transition-colors">
                Transaksi
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-pink-600 font-medium">Kasir / POS</span>
        </div>

        <POSTransaction menus={menus} customers={customers} />
    </main>
  );
}