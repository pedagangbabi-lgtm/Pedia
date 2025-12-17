'use client';

import { Calendar, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function YearFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Ambil tahun dari URL, atau default ke tahun sekarang
  const currentYear = searchParams.get('year') || new Date().getFullYear().toString();

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);
    
    // Set parameter 'year' di URL
    params.set('year', event.target.value);

    // Update URL tanpa reload full page
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative">
      {/* Icon Kalender (Kiri) */}
      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
      
      <select 
        value={currentYear}
        onChange={handleYearChange}
        className="appearance-none w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-pink-500 cursor-pointer hover:border-pink-300 transition-colors"
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>

      {/* Icon Panah Custom (Kanan) */}
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
    </div>
  );
}