import Form from '@/app/ui/pelanggan/create-form';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tambah Pelanggan | BABIPEDIA Dashboard',
};

export default async function Page() {
  return (
    <main>
        <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href="/dashboard/pelanggan" className="hover:text-pink-600">Pelanggan</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-pink-600 font-medium">Tambah Baru</span>
        </div>

        <h1 className="mb-8 text-2xl font-bold text-gray-900">
            Tambah Pelanggan Baru
        </h1>
        
        <Form />
    </main>
  );
}