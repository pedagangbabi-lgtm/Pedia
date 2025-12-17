// app/dashboard/pelanggan/[id]/edit/page.tsx

import { notFound } from 'next/navigation';
import { fetchCustomerById } from '@/app/lib/data';
import EditCustomerForm from '@/app/ui/pelanggan/edit-form';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCustomerPage(props: PageProps) {
  const params = await props.params;
  const id = params.id;

  if (!id || id === 'undefined') {
    notFound();
  }

  try {
    const customer = await fetchCustomerById(id);

    if (!customer) {
      notFound();
    }

    return (
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Pelanggan
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Perbarui informasi pelanggan: <span className="font-semibold text-pink-600">{customer.name}</span>
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <EditCustomerForm customer={customer} />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading customer:', error);
    notFound();
  }
}