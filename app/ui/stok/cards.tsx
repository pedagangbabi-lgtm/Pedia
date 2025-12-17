import { Package, AlertTriangle, TrendingDown, CheckCircle, LucideIcon } from 'lucide-react';

// 1. Definisi tipe props untuk Card
type CardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'pink' | 'red' | 'yellow' | 'green'; // <-- Kunci perbaikannya disini (Specific String)
};

export default function StockCards({
  counts,
}: {
  counts: { total_item: number; kritis: number; rendah: number; aman: number };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card title="Total Bahan" value={`${counts.total_item} Item`} icon={Package} color="pink" />
      <Card title="Stok Kritis" value={`${counts.kritis} Item`} icon={AlertTriangle} color="red" />
      <Card title="Stok Rendah" value={`${counts.rendah} Item`} icon={TrendingDown} color="yellow" />
      <Card title="Stok Aman" value={`${counts.aman} Item`} icon={CheckCircle} color="green" />
    </div>
  );
}

// 2. Gunakan tipe props tadi di fungsi Card
function Card({ title, value, icon: Icon, color }: CardProps) {
  
  // TypeScript sekarang tahu bahwa 'color' pasti salah satu dari key di bawah ini
  const colors = {
    pink: 'bg-pink-50 text-pink-600 border-pink-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    green: 'bg-green-50 text-green-600 border-green-200',
  };
  
  return (
    <div className={`rounded-xl border p-4 shadow-sm ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xl font-bold mt-1">{value}</p>
        </div>
        <Icon className="h-8 w-8 opacity-80" />
      </div>
    </div>
  );
}