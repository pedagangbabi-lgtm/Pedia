'use client';

import { deleteCustomer } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function DeleteCustomerButton({ 
  id, 
  name,
  transactionCount 
}: { 
  id: string;
  name: string;
  transactionCount: number;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCustomer(id);
      // Redirect akan otomatis terjadi karena revalidatePath
    } catch (error) {
      console.error(error);
      alert(
        'Gagal menghapus pelanggan: ' + 
        (error instanceof Error ? error.message : 'Unknown error')
      );
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  // Jika pelanggan punya transaksi, button disabled
  const hasTransactions = transactionCount > 0;

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting || hasTransactions}
        className={`flex items-center gap-1 rounded-md border p-2 transition ${
          hasTransactions
            ? 'border-gray-200 text-gray-300 cursor-not-allowed'
            : 'border-red-200 text-red-600 hover:bg-red-50'
        }`}
        title={
          hasTransactions 
            ? `Tidak dapat dihapus (${transactionCount} transaksi)` 
            : 'Hapus Pelanggan'
        }
      >
        <TrashIcon className="w-5 h-5" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="rounded-xl bg-white p-6 shadow-2xl max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Konfirmasi Hapus Pelanggan
            </h3>
            <p className="text-gray-700 mb-2">
              Apakah Anda yakin ingin menghapus pelanggan{' '}
              <span className="font-semibold text-pink-600">{name}</span>?
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>
                  Data pelanggan ini akan dihapus <br>
                  </br>permanen dan tidak dapat dikembalikan.
                  {transactionCount > 0 && (
                    <strong className="block mt-1">
                      Pelanggan ini memiliki {transactionCount} transaksi. Hapus transaksi terlebih dahulu.
                    </strong>
                  )}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}