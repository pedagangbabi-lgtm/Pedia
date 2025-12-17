'use client';

import { useState } from 'react';
import { Menu } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';
import { Eye, Pencil, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { deleteMenu } from '@/app/lib/actions';
import Link from 'next/link';
import MenuDetailModal from './detail-modal';

export default function MenuCard({ menu }: { menu: Menu }) {
  // State untuk Modal Detail
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // State untuk Modal Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMenu(menu.id);
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Gagal menghapus menu:", error);
      alert("Gagal menghapus menu.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* --- KARTU MENU --- */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full relative">

        {/* Header: Nama & Rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-pink-600 line-clamp-1">{menu.name}</h3>
        </div>

        {/* Deskripsi */}
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
          {menu.description}
        </p>

        {/* Harga & Terjual */}
        <div className="flex justify-between items-end mb-4 border-b border-gray-50 pb-4">
          <div>
            <p className="text-xs text-gray-400">Harga</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(menu.price)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Terjual</p>
            <p className="text-sm font-bold text-green-600">{menu.sold_count}x</p>
          </div>
        </div>

        {/* Bahan Baku Preview */}
        <div className="mb-6">
          <p className="text-xs font-medium text-pink-500 mb-2">Bahan Utama:</p>
          <div className="flex flex-wrap gap-2">
            {menu.recipes && menu.recipes.length > 0 ? (
              menu.recipes.slice(0, 2).map((r, i) => (
                <span key={i} className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded border border-pink-100">
                  <strong>{r.stock_name}</strong>: {r.amount_needed} {r.unit}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400 italic">Belum set resep</span>
            )}
            {menu.recipes && menu.recipes.length > 2 && (
              <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded">
                +{menu.recipes.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex gap-2 mt-auto">
          {/* Tombol Detail */}
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
          >
            <Eye className="w-3 h-3" /> Detail
          </button>

          {/* Tombol Edit */}
          <Link
            href={`/dashboard/menu/${menu.id}/edit`}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600 transition"
          >
            <Pencil className="w-3 h-3" />
          </Link>

          {/* Tombol Hapus (Sekarang memicu Modal) */}
          <button
            type="button"
            onClick={handleDeleteClick}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 hover:border-red-200 transition"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* --- MODAL DETAIL --- */}
      {isDetailOpen && (
        <MenuDetailModal menu={menu} onClose={() => setIsDetailOpen(false)} />
      )}

      {/* --- MODAL KONFIRMASI HAPUS (BARU) --- */}
      {isDeleteOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl transform transition-all scale-100">

            {/* Icon Peringatan */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">
                Hapus Menu?
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Anda yakin ingin menghapus <span className="font-bold text-gray-800">&quot;{menu.name}&quot;</span>?
                <br></br>Menu ini hanya akan di Non-Aktfkan <i>(soft delete)</i>.
              </p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                disabled={isDeleting}
                className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none disabled:opacity-50"
              >
                Batal
              </button>

              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 focus:outline-none disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  'Ya, Hapus'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}