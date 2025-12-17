import Form from '@/app/ui/stok/create-form';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tambah Stok Bahan | BABIPEDIA Dashboard',
  description: 'Halaman untuk menambahkan stok bahan baku baru ke dalam sistem.',
};

export default function Page() {
  return (
    <main>
        <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/dashboard/stok" className="hover:text-pink-600 transition-colors">
                Stok Bahan
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-pink-600 font-medium">Tambah Bahan Baru</span>
        </div>

        <h1 className="mb-8 text-2xl font-bold text-gray-900">
            Tambah Stok Bahan Baku
        </h1>
        
        <Form />
    </main>
  );
}