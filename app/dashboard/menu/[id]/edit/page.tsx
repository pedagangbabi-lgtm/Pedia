import EditMenuForm from '@/app/ui/menu/edit-form';
import { fetchMenuById, fetchStockList } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Menu | BABIPEDIA Dashboard',
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  const [menu, stocks] = await Promise.all([
    fetchMenuById(id),
    fetchStockList()
  ]);

  if (!menu) {
    notFound();
  }

  return (
    <main>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Menu: <span className='text-pink-600'>{menu.name}</span></h1>
      <EditMenuForm stocks={stocks} menu={menu} />
    </main>
  );
}