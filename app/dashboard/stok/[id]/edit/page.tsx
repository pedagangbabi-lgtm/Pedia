import EditStockForm from '@/app/ui/stok/edit-form';
import { fetchStockById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Stok Bahan | BABIPEDIA Dashboard',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const stock = await fetchStockById(id);

  if (!stock) {
    notFound();
  }

  return (
    <main>
        <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/dashboard/stok" className="hover:text-pink-600 transition-colors">
                Stok Bahan
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-pink-600 font-medium">Edit Bahan</span>
        </div>

        <h1 className="mb-8 text-2xl font-bold text-gray-900">
            Edit Data: <span className="text-pink-600">{stock.name}</span>
        </h1>
        
        <EditStockForm stock={stock} />
    </main>
  );
}