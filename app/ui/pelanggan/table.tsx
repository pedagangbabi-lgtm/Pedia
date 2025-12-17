'use client';

import { useState } from 'react';
import { Customer } from '@/app/lib/definitions';
import { formatCurrency, getCustomerStatus, formatPhoneForWA } from '@/app/lib/utils';
import StatusBadge from './status';
import { EyeIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import DeleteCustomerButton from '@/app/ui/pelanggan/delete';

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-pink-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">No</th>
                <th scope="col" className="px-3 py-5 font-medium">Nama Pelanggan</th>
                <th scope="col" className="px-3 py-5 font-medium">No. HP</th>
                <th scope="col" className="px-3 py-5 font-medium">Alamat</th>
                <th scope="col" className="px-3 py-5 font-medium">Frekuensi</th>
                <th scope="col" className="px-3 py-5 font-medium">Total Belanja</th>
                <th scope="col" className="px-3 py-5 font-medium">Status</th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Aksi</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers.map((customer, index) => {
                const status = getCustomerStatus(customer.transaction_frequency);
                return (
                  <tr
                    key={customer.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none hover:bg-pink-50/50 transition-colors"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {index + 1}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-pink-600">
                      {customer.name}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      <a
                        href={`https://wa.me/${formatPhoneForWA(customer.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:underline"
                      >
                        {customer.phone}
                      </a>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 max-w-[200px] truncate">
                      {customer.address}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      <span className="font-bold text-gray-700">{customer.transaction_frequency}x</span>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(customer.total_spent)}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3">
                      <StatusBadge status={status} />
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-2">
                        {/* Button Lihat Detail */}
                        <button
                          onClick={() => setSelectedCustomer(customer)}
                          className="rounded-md border p-2 hover:bg-gray-100 text-gray-600"
                          title="Lihat Detail"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>

                        {/* Button Edit */}
                        <Link
                          href={`/dashboard/pelanggan/${customer.id}/edit`}
                          className="rounded-md border border-blue-200 p-2 hover:bg-blue-50 text-blue-600 inline-flex items-center justify-center"
                          title="Edit Pelanggan"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Link>

                        {/* Button Delete */}
                        <DeleteCustomerButton 
                          id={customer.id}
                          name={customer.name}
                          transactionCount={customer.transaction_frequency}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DETAIL PELANGGAN --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl transform transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-pink-600">Detail Pelanggan</h3>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                 <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
                    👤
                 </div>
              </div>
              
              <DetailRow label="Nama" value={selectedCustomer.name} />

              <DetailRow 
                label="No. HP"
                value={
                  <a 
                    href={`https://wa.me/${formatPhoneForWA(selectedCustomer.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    {selectedCustomer.phone}
                  </a>
                }
              />

              <DetailRow label="Alamat" value={selectedCustomer.address} />
              <DetailRow 
                label="Total Belanja" 
                value={formatCurrency(selectedCustomer.total_spent)} 
                isHighlight
              />
              <div className="flex justify-between border-b border-gray-100 py-2">
                 <span className="text-gray-500">Status Loyalitas</span>
                 <StatusBadge status={getCustomerStatus(selectedCustomer.transaction_frequency)} />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  isHighlight = false
}: {
  label: string;
  value: React.ReactNode;
  isHighlight?: boolean;
}) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-2 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className={`font-medium ${isHighlight ? 'text-pink-600 font-bold' : 'text-gray-900'} text-right`}>
        {value}
      </span>
    </div>
  );
}