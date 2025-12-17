// app/dashboard/pelanggan/page.tsx
import { fetchCustomers, fetchCustomerCounts } from '@/app/lib/data';
import CustomersTable from '@/app/ui/pelanggan/table';
import CardWrapper from '@/app/ui/pelanggan/cards';
import SortButton from '@/app/ui/pelanggan/sort-button';
import Search from '@/app/ui/search';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pelanggan | BABIPEDIA Dashboard',
};

export default async function Page(props: {
  searchParams?: Promise<{
    sort?: string;
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const sortOrder = searchParams?.sort === 'asc' ? 'asc' : 'desc';
  const query = searchParams?.query || '';

  const [customers, customerCounts] = await Promise.all([
    fetchCustomers(sortOrder, query),
    fetchCustomerCounts(),
  ]);

  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-pink-600">Data Pelanggan</h1>
            <p className="text-sm text-gray-500">Kelola data pelanggan dan lihat statistik</p>
        </div>
        <Link
            href="/dashboard/pelanggan/create"
            className="flex items-center gap-2 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
            <PlusIcon className="h-5 w-5" />
            <span className="hidden md:block">Tambah Pelanggan</span>
        </Link>
      </div>
      <CardWrapper counts={customerCounts} />
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <Search placeholder="Cari nama, no HP, atau alamat..." />
        <SortButton />
      </div>
      <CustomersTable customers={customers} />
    </div>
  );
}