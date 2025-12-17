'use client';

import { formatCurrency } from '@/app/lib/utils';
import { DollarSign, CreditCard, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { DashboardData, CardProps } from '@/app/lib/definitions';

// 3. Gunakan tipe DashboardData di sini
export default function DashboardCards({ data }: { data: DashboardData }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      
      <Card 
        title="Total Penjualan" 
        value={formatCurrency(data.revenue)} 
        sub="Minggu ini"
        growth={data.revenueGrowth}
        icon={DollarSign}
      />

      <Card 
        title="Total Transaksi" 
        value={`${data.transactions} Transaksi`} 
        sub="Minggu ini"
        growth={data.txGrowth}
        icon={CreditCard}
      />

      <Card 
        title="Pelanggan Aktif" 
        value={`${data.customers} Pelanggan`} 
        sub="Total terdaftar"
        growth={data.customerGrowth}
        icon={Users}
      />

      <Card 
        title="Rata-rata Transaksi" 
        value={formatCurrency(data.avgTx)} 
        sub="Per transaksi"
        growth={data.avgGrowth}
        icon={TrendingUp}
      />
    </div>
  );
}

// 4. Gunakan tipe CardProps di sini
function Card({ title, value, sub, growth, icon: Icon }: CardProps) {
  const isPositive = growth > 0;
  const isNegative = growth < 0;
  
  let colorClass = "text-gray-500";
  let TrendIcon = Minus;

  if (isPositive) {
    colorClass = "text-green-600";
    TrendIcon = ArrowUpRight;
  } else if (isNegative) {
    colorClass = "text-red-500";
    TrendIcon = ArrowDownRight;
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">{value}</h3>
        </div>
        <div className="p-3 bg-pink-50 rounded-full text-pink-600">
            <Icon className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">{sub}</span>
        
        <span className={`flex items-center font-medium ${colorClass}`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            {Math.abs(growth).toFixed(1)}%
        </span>
      </div>
    </div>
  );
}