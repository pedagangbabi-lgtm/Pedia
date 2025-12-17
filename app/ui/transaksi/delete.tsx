'use client';

import { deleteTransaction } from '@/app/lib/actions';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function DeleteTransactionButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteTransaction(id);
      // Redirect akan otomatis terjadi karena revalidatePath
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus transaksi: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="flex items-center gap-1 rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 transition disabled:opacity-50"
        title="Hapus Transaksi"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="rounded-lg bg-white p-6 shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Konfirmasi Hapus Transaksi
                </h3>
            <p className="text-gray-700 mb-4 leading-relaxed text-center">
            Apakah Anda yakin ingin menghapus <br />
            transaksi{' '}
            <span className="font-mono font-semibold text-pink-600">{id} </span> ?
            </p>

            
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