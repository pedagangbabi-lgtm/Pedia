import CreateMenuForm from '@/app/ui/menu/create-form';
import { fetchStockList } from '@/app/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buat Menu Baru | BABIPEDIA Dashboard',
};

export default async function Page() {
  const stocks = await fetchStockList();

  return (
    <main>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Buat Menu Baru</h1>
      <CreateMenuForm stocks={stocks} />
    </main>
  );
}