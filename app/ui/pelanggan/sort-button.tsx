'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default function SortButton() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Cek apakah url sekarang sedang sort 'asc' atau 'desc' (default)
  const currentSort = searchParams.get('sort') || 'desc';

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    
    // Toggle logic: Kalau sekarang desc, ubah ke asc, dan sebaliknya
    if (currentSort === 'desc') {
      params.set('sort', 'asc');
    } else {
      params.set('sort', 'desc');
    }

    // Update URL tanpa refresh halaman penuh
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button 
      onClick={handleSort}
      className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 text-gray-600 transition-colors"
    >
      <ArrowsUpDownIcon className="w-4 h-4" />
      {currentSort === 'desc' ? 'Urut: Terbanyak' : 'Urut: Sedikit'}
    </button>
  );
}