'use client';

import { Calendar, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function YearFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const nowYear = new Date().getFullYear().toString();
  const currentYear = searchParams.get('year') ?? nowYear;

  const startYear = 2023;
  const years = Array.from(
    { length: Number(nowYear) - startYear + 1 },
    (_, i) => Number(nowYear) - i
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative inline-flex items-center">
      {/* VISUAL BOX */}
      <div
        className="
          flex items-center gap-2
          rounded-lg
          border border-gray-300
          bg-white
          px-3 py-2
          text-sm font-medium text-gray-900
        "
      >
        <Calendar size={16} className="text-gray-500" />
        <span className="min-w-[40px] text-center">{currentYear}</span>
        <ChevronDown size={14} className="text-gray-500" />
      </div>

      {/* SELECT ASLI (INVISIBLE) */}
      <select
        value={currentYear}
        onChange={handleChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
