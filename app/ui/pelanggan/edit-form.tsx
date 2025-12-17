'use client';

import { Customer } from '@/app/lib/definitions';
import { updateCustomer, UpdateCustomerState } from '@/app/lib/actions';
import { useActionState } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/app/lib/utils';

export default function EditCustomerForm({ customer }: { customer: Customer }) {
  const initialState: UpdateCustomerState = { 
    message: null, 
    errors: {},
    values: {
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
    }
  };

  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, formAction, isPending] = useActionState(updateCustomerWithId, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {/* Success Message */}
      {state.message === 'success' && (
        <div className="rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
          ✓ Pelanggan berhasil diupdate! Mengalihkan...
        </div>
      )}

      {/* Error Message */}
      {state.message && state.message !== 'success' && (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Nama */}
        <div className="md:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
            Nama Pelanggan <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={state.values?.name || customer.name}
            placeholder="Masukkan nama pelanggan"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            aria-describedby="name-error"
          />
          {state.errors?.name && (
            <p id="name-error" className="mt-2 text-sm text-red-600">
              {state.errors.name[0]}
            </p>
          )}
        </div>

        {/* No. HP */}
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
            Nomor HP <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={state.values?.phone || customer.phone}
            placeholder="08xxxxxxxxxx"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            aria-describedby="phone-error"
          />
          {state.errors?.phone && (
            <p id="phone-error" className="mt-2 text-sm text-red-600">
              {state.errors.phone[0]}
            </p>
          )}
        </div>

        {/* Alamat */}
        <div>
          <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
            Alamat <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="address"
            rows={4}
            defaultValue={state.values?.address || customer.address}
            placeholder="Masukkan alamat lengkap"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            aria-describedby="address-error"
          />
          {state.errors?.address && (
            <p id="address-error" className="mt-2 text-sm text-red-600">
              {state.errors.address[0]}
            </p>
          )}
        </div>
      </div>

      {/* Info Card - Data yang tidak bisa diedit */}
      <div className="rounded-lg bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
            📊
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Data Statistik</h3>
            <p className="text-xs text-gray-600">Data ini dihitung otomatis oleh sistem</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 border border-pink-100">
            <p className="text-xs text-gray-500 mb-1">Frekuensi Transaksi</p>
            <p className="text-2xl font-bold text-pink-600">{customer.transaction_frequency}x</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-pink-100">
            <p className="text-xs text-gray-500 mb-1">Total Belanja</p>
            <p className="text-lg font-bold text-pink-600">
              {formatCurrency(customer.total_spent)}
            </p>
          </div>
        </div>
      </div>

      {/* Info peringatan */}
      <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
        <div className="flex gap-3">
          <span className="text-blue-600 text-xl">ℹ️</span>
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Catatan Penting:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Hanya <strong>Nama, Nomor HP, dan Alamat</strong> yang dapat diubah</li>
              <li>Data statistik (frekuensi & total belanja) dikelola otomatis oleh sistem</li>
              <li>Pastikan nomor HP tidak sama dengan pelanggan lain</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white hover:bg-pink-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Menyimpan...
            </span>
          ) : (
            'Simpan Perubahan'
          )}
        </button>
        <Link
          href="/dashboard/pelanggan"
          className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition text-center"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}