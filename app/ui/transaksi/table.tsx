'use client';

import { Transaction } from '@/app/lib/definitions';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import { Eye, Loader2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { getTransactionDetail } from '@/app/lib/actions';
import ReceiptModal from './receipt-modal';
import Link from 'next/link';
import DeleteTransactionButton from '@/app/ui/transaksi/delete';

export default function TransactionTable({ 
  transactions,
  userRole 
}: { 
  transactions: Transaction[];
  userRole: 'admin' | 'staff';
}) {
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const detail = await getTransactionDetail(id);
      setSelectedTx(detail);
    } catch (error) {
      console.error(error);
      alert('Gagal mengambil detail transaksi');
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = userRole === 'admin';

  return (
    <>
      <div className="rounded-lg bg-pink-50 p-2 md:pt-0 mt-6">
        <table className="min-w-full text-gray-900">
          <thead className="text-left text-sm font-normal">
            <tr>
              <th className="px-4 py-5 font-medium">ID Transaksi</th>
              <th className="px-3 py-5 font-medium">Tanggal & Waktu</th>
              <th className="px-3 py-5 font-medium">Pelanggan</th>
              <th className="px-3 py-5 font-medium">Total</th>
              <th className="py-3 pl-6 pr-3">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b py-3 text-sm hover:bg-gray-50">
                <td className="whitespace-nowrap py-3 pl-6 pr-3 font-mono font-bold text-pink-600">
                  {tx.id}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{formatDate(tx.date).split(' pukul ')[0]}</span>
                    <span className="text-xs text-gray-500">{formatDate(tx.date).split(' pukul ')[1]}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {tx.customer_name || '-'}
                </td>
                <td className="whitespace-nowrap px-3 py-3 font-bold text-gray-700">
                  {formatCurrency(tx.total_amount)}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-2">
                    {/* Tombol Lihat Detail - SEMUA BISA */}
                    <button 
                      onClick={() => handleViewDetail(tx.id)}
                      disabled={isLoading}
                      className="flex items-center gap-1 rounded-md border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 hover:text-pink-600 transition"
                      title="Lihat Detail"
                    >
                      {isLoading && selectedTx?.id === tx.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                    {/* Tombol Edit - HANYA ADMIN */}
                    {isAdmin ? (
                      <Link
                        href={`/dashboard/transaksi/${encodeURIComponent(tx.id)}/edit`}
                        className="flex items-center gap-1 rounded-md border border-blue-200 p-2 text-blue-600 hover:bg-blue-50 transition"
                        title="Edit Transaksi"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    ) : (
                      <div 
                        className="flex items-center gap-1 rounded-md border border-gray-200 p-2 text-gray-300 cursor-not-allowed"
                        title="⛔ Hanya Admin yang dapat mengedit"
                      >
                        <Pencil className="w-4 h-4" />
                      </div>
                    )}

                    {/* Tombol Delete - HANYA ADMIN */}
                    {isAdmin ? (
                      <DeleteTransactionButton id={tx.id} />
                    ) : (
                      <div 
                        className="flex items-center gap-1 rounded-md border border-gray-200 p-2 text-gray-300 cursor-not-allowed"
                        title="⛔ Hanya Admin yang dapat menghapus"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RENDER MODAL */}
      {selectedTx && (
        <ReceiptModal 
          transaction={selectedTx} 
          onClose={() => setSelectedTx(null)} 
        />
      )}
    </>
  );
}