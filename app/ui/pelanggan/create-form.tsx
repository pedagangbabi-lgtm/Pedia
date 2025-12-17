'use client';

import Link from 'next/link';
import { User, Phone, MapPin } from 'lucide-react';
import { createCustomer, State } from '@/app/lib/actions';
import { useActionState } from 'react'; // Gunakan 'useFormState' dari 'react-dom' jika Next.js versi < 15

export default function Form() {
  // Inisialisasi State untuk error handling
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
            Nama Pelanggan
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={state.values?.name}
              placeholder="Masukkan nama lengkap"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
              aria-describedby="name-error"
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-900">
            Nomor HP
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="phone"
              name="phone"
              type="text"
              defaultValue={state.values?.phone}
              placeholder="Contoh: 0812-3456-7890"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
              aria-describedby="phone-error"
            />
          </div>
           <div id="phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone &&
              state.errors.phone.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900">
            Alamat Lengkap
          </label>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="address"
              name="address"
              defaultValue={state.values?.address}
              placeholder="Masukkan alamat domisili..."
              rows={3}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-pink-500 focus:ring-pink-500"
              aria-describedby="address-error"
            />
          </div>
           {/* Tampilkan Error Alamat Disini */}
           <div id="address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address &&
              state.errors.address.map((error: string) => (
                <p key={error} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
            {state.message && (
                <p className="mt-2 text-sm text-red-500 font-bold">
                    {state.message}
                </p>
            )}
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/pelanggan"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Batal
        </Link>
        <button
          type="submit"
          className="flex h-10 items-center rounded-lg bg-pink-600 px-4 text-sm font-medium text-white transition-colors hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        >
          Simpan Pelanggan
        </button>
      </div>
    </form>
  );
}