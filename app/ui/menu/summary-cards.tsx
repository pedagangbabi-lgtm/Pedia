// app/ui/menu/summary-cards.tsx
import { Utensils, ShoppingBag, Trophy, LucideIcon } from 'lucide-react';

export default function MenuSummary({
  data,
}: {
  data: { total_menu: number; total_sold: number; best_seller: string };
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card 
        title="Total Menu" 
        value={data.total_menu} 
        icon={Utensils} 
        color="pink" 
        sub="Menu Aktif" 
      />
      <Card 
        title="Total Terjual" 
        value={data.total_sold} 
        icon={ShoppingBag} 
        color="blue" 
        sub="Porsi Terjual" 
      />
      <Card 
        title="Menu Terlaris" 
        value={data.best_seller} 
        icon={Trophy} 
        color="yellow" 
        sub="Paling Diminati" 
      />
    </div>
  );
}

interface CardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'pink' | 'blue' | 'yellow'; // Spesifikan key warna agar aman
  sub: string;
}

function Card({ title, value, icon: Icon, color, sub }: CardProps) {
  const styles = {
    pink: 'bg-pink-50 text-pink-600 border-pink-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
  };

  // Cek apakah value-nya "Tidak ada"
  const isEmpty = value === "Tidak ada";

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${styles[color]}`}>
      <div className="flex items-center justify-between mb-2">
         <h3 className="text-sm font-medium opacity-80">{title}</h3>
         <Icon className="h-5 w-5" />
      </div>
      
      {/* Logic styling: Kalau "Tidak ada", font jadi kecil dan italic abu-abu */}
      <p className={`font-bold truncate ${isEmpty ? 'text-lg text-gray-400 italic font-normal' : 'text-2xl'}`}>
        {value}
      </p>
      
      <p className="text-xs mt-1 opacity-70">{sub}</p>
    </div>
  );
}