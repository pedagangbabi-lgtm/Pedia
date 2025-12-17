'use client';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, Legend 
} from 'recharts';
import { formatCurrency } from '@/app/lib/utils';

// Grafik Area (Pendapatan Bulanan)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RevenueChart({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#db2777" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#db2777" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis 
            stroke="#9ca3af" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `Rp${(value / 1000000).toFixed(0)}jt`} 
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6' }}
          />
          <Area 
            type="monotone" 
            dataKey="total" 
            stroke="#db2777" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTotal)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Grafik Garis (Tren Transaksi)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function TransactionChart({ data }: { data: any[] }) {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #f3f4f6' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            name="Jumlah Transaksi"
            stroke="#db2777" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#db2777', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}