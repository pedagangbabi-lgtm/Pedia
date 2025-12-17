// app/ui/pelanggan/cards.tsx
import clsx from 'clsx';
import { Flame, Users, User, Snowflake } from 'lucide-react';

type Kind = 'hot' | 'warm' | 'cool' | 'cold';

const iconMap: Record<Kind, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  hot: Flame,
  warm: Users,
  cool: User,
  cold: Snowflake,
};

// Tinted-but-vibrant backgrounds
const tone = {
  hot: {
    bg: 'bg-gradient-to-br from-pink-50 via-pink-75 to-pink-100',
    ring: 'ring-pink-200',
    title: 'text-pink-700',
    icon: 'text-pink-600',
  },
  warm: {
    bg: 'bg-gradient-to-br from-amber-50 via-amber-75 to-amber-100',
    ring: 'ring-amber-200',
    title: 'text-orange-700',
    icon: 'text-orange-600',
  },
  cool: {
    bg: 'bg-gradient-to-br from-sky-50 via-sky-75 to-sky-100',
    ring: 'ring-sky-200',
    title: 'text-sky-700',
    icon: 'text-sky-600',
  },
  cold: {
    bg: 'bg-gradient-to-br from-blue-50 via-blue-75 to-blue-100',
    ring: 'ring-blue-200',
    title: 'text-blue-700',
    icon: 'text-blue-600',
  },
} as const;

/**
 * NOTE: Tailwind default tidak punya *-75.
 * Jika belum ada, tambah util berikut di globals.css:
 * .from-pink-75{--tw-gradient-from:#fde3ee var(--tw-gradient-from-position);--tw-gradient-to:rgb(253 227 238 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}
 * .via-pink-75{--tw-gradient-to:rgb(253 227 238 / 0) var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),#fde3ee var(--tw-gradient-via-position),var(--tw-gradient-to)}
 * (buat versi serupa untuk amber-75, sky-75, blue-75)
 * Atau ganti via-* jadi via-<tint>-100 jika tak mau custom util.
 */

export default function CardWrapper({
  counts,
  className,
}: {
  counts: { hot: number; warm: number; cool: number; cold: number };
  className?: string;
}) {
  return (
    <div className={clsx('grid gap-4 sm:grid-cols-2 lg:grid-cols-4', className)}>
      <Card title="Hot Customers"  value={counts.hot}  type="hot"  />
      <Card title="Warm Customers" value={counts.warm} type="warm" />
      <Card title="Cool Customers" value={counts.cool} type="cool" />
      <Card title="Cold Customers" value={counts.cold} type="cold" />
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: Kind;
}) {
  const Icon = iconMap[type];
  const t = tone[type];

  return (
    <div
      className={clsx(
        'rounded-xl p-2 shadow-sm transition-all hover:shadow-md',
        t.bg,
        'ring-1', t.ring, // subtle outline agar lebih “pop”
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="min-w-0">
          <h3 className={clsx('text-sm font-semibold tracking-tight', t.title)}>{title}</h3>
          <p className="mt-1 truncate text-2xl font-bold text-gray-800">
            {(value)}{' '}
            <span className="text-sm font-normal text-gray-600">Pelanggan</span>
          </p>
        </div>
        {Icon ? <Icon className={clsx('h-8 w-8', t.icon)} strokeWidth={1.6} /> : null}
      </div>
    </div>
  );
}
