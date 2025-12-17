"use client";

import { useState } from 'react';
import { formatCurrency } from "@/app/lib/utils";

interface TopCustomer {
  name: string;
  frequency: number;
  totalSpent: number;
  averagePerVisit: number;
}

interface TopCustomersTableProps {
  initialData: TopCustomer[];
}

type Period = 'all-time' | 'this-month' | 'this-week';

// Function untuk fetch data dari API
async function fetchTopCustomersClient(period: Period): Promise<TopCustomer[]> {
  const response = await fetch(`/api/top-customers?period=${period}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
}

export default function TopCustomersTable({ initialData }: TopCustomersTableProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('all-time');
  const [data, setData] = useState<TopCustomer[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const periodOptions = [
    { value: 'all-time', label: 'Sepanjang Waktu' },
    { value: 'this-month', label: 'Bulan Ini' },
    { value: 'this-week', label: 'Minggu Ini' },
  ];

  // Handler untuk ganti period
  const handlePeriodChange = async (period: Period) => {
    setLoading(true);
    setError(null);
    setSelectedPeriod(period);
    
    try {
      const newData = await fetchTopCustomersClient(period);
      setData(newData);
    } catch (error) {
      console.error('Error fetching top customers:', error);
      setError('Gagal memuat data. Menampilkan data awal.');
      // Fallback ke initial data
      setData(initialData);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = data.reduce((sum, customer) => sum + customer.totalSpent, 0);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-pink-600">Performa Top 5 Pelanggan</h3>
          <p className="text-sm text-gray-500">Analisis pelanggan terbaik</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label htmlFor="period" className="text-sm text-gray-600 whitespace-nowrap">
            Periode:
          </label>
          <select
            id="period"
            value={selectedPeriod}
            onChange={(e) => handlePeriodChange(e.target.value as Period)}
            disabled={loading}
            className="text-sm border border-gray-300 rounded-md px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Memuat data...</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-3 py-2 font-medium">Rank</th>
                  <th className="px-2 py-2 font-medium min-w-[100px]">Nama Pelanggan</th>
                  <th className="px-2 py-2 font-medium text-center">Frekuensi</th>
                  <th className="px-2 py-2 font-medium text-right">Total</th>
                  <th className="px-2 py-2 font-medium text-right">Rata²</th>
                  <th className="px-2 py-2 font-medium text-right">Kontribusi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((customer, index) => {
                  const contribution = totalRevenue > 0 ? (customer.totalSpent / totalRevenue) * 100 : 0;
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-3 font-semibold text-gray-900">{index + 1}</td>
                      <td className="px-2 py-3 font-medium text-gray-900 truncate max-w-[120px]" title={customer.name}>
                        {customer.name}
                      </td>
                      <td className="px-2 py-3 text-center">
                        <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded">
                          {customer.frequency}x
                        </span>
                      </td>
                      <td className="px-2 py-3 text-right font-medium whitespace-nowrap">
                        {formatCurrency(customer.totalSpent)}
                      </td>
                      <td className="px-2 py-3 text-right whitespace-nowrap">
                        {formatCurrency(customer.averagePerVisit)}
                      </td>
                      <td className="px-2 py-3 text-right font-bold text-pink-600 whitespace-nowrap">
                        {contribution.toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}
                
                {data.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500 text-sm">
                      Tidak ada data pelanggan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-3">
            {data.map((customer, index) => {
              const contribution = totalRevenue > 0 ? (customer.totalSpent / totalRevenue) * 100 : 0;
              
              return (
                <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-pink-600 text-white text-xs font-bold px-2 py-1 rounded min-w-[30px] text-center">
                        #{index + 1}
                      </span>
                      <span className="font-medium text-gray-900 text-sm truncate flex-1">
                        {customer.name}
                      </span>
                    </div>
                    <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                      {customer.frequency}x
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-gray-600 mb-1">Total</div>
                      <div className="font-medium truncate" title={formatCurrency(customer.totalSpent)}>
                        {formatCurrency(customer.totalSpent)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 mb-1">Rata²</div>
                      <div className="truncate" title={formatCurrency(customer.averagePerVisit)}>
                        {formatCurrency(customer.averagePerVisit)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-600 mb-1">Kontribusi</div>
                      <div className="font-bold text-pink-600">
                        {contribution.toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {data.length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                Tidak ada data pelanggan
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}