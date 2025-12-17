'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { updateStock, StockState } from '@/app/lib/actions';
import { Stock } from '@/app/lib/definitions';
import { Package, DollarSign, Layers, User } from 'lucide-react';

export default function EditStockForm({ stock }: { stock: Stock }) {
  // Kita bind ID ke server action agar server tahu ID mana yang diupdate
  const updateStockWithId = updateStock.bind(null, stock.id);
  
  const initialState: StockState = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(updateStockWithId, initialState);

  return (
    <form action={formAction} className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
      
      {/* --- NAMA BAHAN --- */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2 text-gray-900">Nama Bahan</label>
        <div className="relative">
            <Package className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
            name="name"
            type="text"
            // LOGIC PENTING: Ambil dari state error dulu, kalau kosong ambil dari data DB
            defaultValue={state.values?.name || stock.name}
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500"
            />
        </div>
        <div aria-live="polite">{state.errors?.name && <p className="mt-2 text-sm text-red-500">{state.errors.name[0]}</p>}</div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
        {/* --- SATUAN --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">Satuan</label>
          <div className="relative">
            <Layers className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <select
                name="unit"
                defaultValue={state.values?.unit || stock.unit}
                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500 bg-white"
            >
                <option value="gram">Gram (g)</option>
                <option value="ml">Mililiter (ml)</option>
                <option value="pcs">Pieces (pcs)</option>
                <option value="lembar">Lembar</option>
            </select>
          </div>
        </div>

        {/* --- HARGA PER SATUAN --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">Harga / Satuan (Rp)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
                name="price_per_unit"
                type="number"
                defaultValue={state.values?.price_per_unit || stock.price_per_unit}
                className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
           <div aria-live="polite">{state.errors?.price_per_unit && <p className="mt-2 text-sm text-red-500">{state.errors.price_per_unit[0]}</p>}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4">
        {/* --- STOK AWAL --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">Stok Saat Ini</label>
          <input
            name="stock"
            type="number"
            defaultValue={state.values?.stock || stock.stock}
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500"
          />
          <div aria-live="polite">{state.errors?.stock && <p className="mt-2 text-sm text-red-500">{state.errors.stock[0]}</p>}</div>
        </div>

        {/* --- STOK MINIMUM --- */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-900">Stok Minimum</label>
          <input
            name="min_stock"
            type="number"
            defaultValue={state.values?.min_stock || stock.min_stock}
            className="block w-full rounded-md border border-gray-200 py-2 px-4 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500"
          />
           <div aria-live="polite">{state.errors?.min_stock && <p className="mt-2 text-sm text-red-500">{state.errors.min_stock[0]}</p>}</div>
        </div>
      </div>

      {/* --- SUPPLIER --- */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-900">Nama Supplier</label>
        <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
            name="supplier"
            type="text"
            defaultValue={state.values?.supplier || stock.supplier}
            className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 focus:border-pink-500 focus:ring-pink-500"
            />
        </div>
         <div aria-live="polite">{state.errors?.supplier && <p className="mt-2 text-sm text-red-500">{state.errors.supplier[0]}</p>}</div>
      </div>
    
      <div aria-live="polite" className="mb-4">
        {state.message && (
            <p className="text-sm text-red-500 font-bold bg-red-50 p-2 rounded border border-red-200">{state.message}</p>
        )}
      </div>

      {/* --- TOMBOL AKSI --- */}
      <div className="flex justify-end gap-4">
        <Link 
            href="/dashboard/stok" 
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
            Batal
        </Link>
        <button 
            type="submit" 
            className="flex h-10 items-center rounded-lg bg-pink-600 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-500 shadow-md shadow-pink-200"
        >
            Update Data
        </button>
      </div>
    </form>
  );
}