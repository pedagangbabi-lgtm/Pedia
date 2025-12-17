import { Banknote, ReceiptText } from 'lucide-react';
import { formatCurrency } from '@/app/lib/utils';

export default function TransactionCards({ 
  data 
}: { 
  data: { count: number; total_revenue: number } 
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
      <div className="rounded-xl border border-pink-200 bg-pink-50 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-pink-600">Total Pendapatan</h3>
          <Banknote className="h-6 w-6 text-pink-500" />
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-700">{formatCurrency(data.total_revenue)}</p>
      </div>
      
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-blue-600">Total Transaksi</h3>
          <ReceiptText className="h-6 w-6 text-blue-500" />
        </div>
        <p className="mt-2 text-2xl font-bold text-gray-700">{data.count} Transaksi</p>
      </div>
    </div>
  );
}