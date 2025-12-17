'use client';
import Link from 'next/link';
import { useActionState } from 'react';
import { createStock, StockState } from '@/app/lib/actions';

export default function CreateStockForm() {
  const initialState: StockState = { message: null, errors: {}, values: {} };
  const [state, formAction] = useActionState(createStock, initialState);

  return (
    <form action={formAction} className="rounded-md bg-gray-50 p-6">
      
      {/* Nama Bahan */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nama Bahan</label>
        <input
          name="name"
          defaultValue={state.values?.name}
          placeholder="Contoh: Daging Babi"
          className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
        />
        <p className="text-red-500 text-sm mt-1">{state.errors?.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Satuan */}
        <div>
          <label className="block text-sm font-medium mb-2">Satuan</label>
          <select
            name="unit"
            defaultValue={state.values?.unit || ""}
            className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
          >
            <option value="" disabled>Pilih Satuan</option>
            <option value="gram">Gram (g)</option>
            <option value="ml">Mililiter (ml)</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="lembar">Lembar</option>
          </select>
          <p className="text-red-500 text-sm mt-1">{state.errors?.unit}</p>
        </div>

        {/* Harga Per Satuan */}
        <div>
          <label className="block text-sm font-medium mb-2">Harga / Satuan (Rp)</label>
          <input
            name="price_per_unit"
            type="number"
            defaultValue={state.values?.price_per_unit}
            placeholder="0"
            className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
          />
          <p className="text-red-500 text-sm mt-1">{state.errors?.price_per_unit}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Stok Awal */}
        <div>
          <label className="block text-sm font-medium mb-2">Stok Awal</label>
          <input
            name="stock"
            type="number"
            defaultValue={state.values?.stock}
            placeholder="0"
            className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
          />
          <p className="text-red-500 text-sm mt-1">{state.errors?.stock}</p>
        </div>

        {/* Stok Minimum */}
        <div>
          <label className="block text-sm font-medium mb-2">Stok Minimum</label>
          <input
            name="min_stock"
            type="number"
            defaultValue={state.values?.min_stock}
            placeholder="0"
            className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
          />
           <p className="text-red-500 text-sm mt-1">{state.errors?.min_stock}</p>
        </div>
      </div>

      {/* Supplier */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Supplier</label>
        <input
          name="supplier"
          defaultValue={state.values?.supplier}
          placeholder="Nama Supplier"
          className="w-full rounded-md border border-gray-200 py-2 px-4 focus:border-pink-500 focus:ring-pink-500"
        />
        <p className="text-red-500 text-sm mt-1">{state.errors?.supplier}</p>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Link href="/dashboard/stok" className="bg-gray-100 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200">Batal</Link>
        <button type="submit" className="bg-pink-600 px-4 py-2 rounded-lg text-white hover:bg-pink-500">Simpan Bahan</button>
      </div>
    </form>
  );
}