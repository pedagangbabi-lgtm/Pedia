'use client';

import { Filter, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function StatusFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentStatus = searchParams.get('status') || '';

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    const val = event.target.value;

    if (val) {
      params.set('status', val);
    } else {
      params.delete('status'); // Hapus param jika pilih "Semua"
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
      
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        className="appearance-none w-full pl-10 pr-10 py-[9px] rounded-md border border-gray-200 text-sm bg-white focus:outline-pink-500 cursor-pointer hover:border-pink-300 transition-colors text-gray-600"
      >
        <option value="">Semua Status</option>
        <option value="aman">✅ Aman</option>
        <option value="rendah">📉 Rendah</option>
        <option value="kritis">⚠️ Kritis</option>
      </select>

      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}