// app/ui/pelanggan/status.tsx
import clsx from 'clsx';
import type { CustomerStatus } from '@/app/lib/definitions';
import { Flame, Snowflake } from 'lucide-react'; // ikon untuk hot & cold

type Size = 'sm' | 'md' | 'lg';

const LABEL: Record<CustomerStatus, string> = {
  hot: 'Hot',
  warm: 'Warm',
  cool: 'Cool',
  cold: 'Cold',
};

const SIZE: Record<Size, { pad: string; text: string; gap: string; icon: number }> = {
  sm: { pad: 'px-2 py-0.5', text: 'text-[10px] md:text-xs', gap: 'gap-1',   icon: 12 },
  md: { pad: 'px-2.5 py-1', text: 'text-xs',                 gap: 'gap-1.5', icon: 14 },
  lg: { pad: 'px-3 py-1.5', text: 'text-sm',                 gap: 'gap-2',   icon: 16 },
};

// Gradien & ring
const THEME: Record<CustomerStatus, { text: string; ring: string; bg: string }> = {
  hot:  { text: 'text-white',        ring: 'ring-red-300/60',  bg: 'bg-gradient-to-r from-pink-500 to-orange-500' },
  warm: { text: 'text-orange-900',   ring: 'ring-amber-300/60', bg: 'bg-gradient-to-r from-amber-200 to-yellow-300' },
  cool: { text: 'text-sky-900',      ring: 'ring-sky-300/60',   bg: 'bg-gradient-to-r from-sky-200 to-cyan-300' },
  cold: { text: 'text-white',        ring: 'ring-blue-300/60',  bg: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
};

export default function StatusBadge({
  status,
  size = 'md',
  withIcon = true,
  className,
  title,
}: {
  status: CustomerStatus;
  size?: Size;
  withIcon?: boolean;
  className?: string;
  title?: string;
}) {
  const label = LABEL[status];
  const sz = SIZE[size];
  const t = THEME[status];

  return (
    <span
      className={clsx(
        'inline-flex select-none items-center rounded-full font-semibold shadow-sm ring-1',
        sz.pad,
        sz.text,
        sz.gap,
        t.bg,
        t.text,
        t.ring,
        className,
      )}
      aria-label={`${label} status`}
      title={title ?? label}
      data-status={status}
    >
      {withIcon && status === 'hot' && <Flame size={sz.icon} aria-hidden className="shrink-0" />}
      {withIcon && status === 'cold' && <Snowflake size={sz.icon} aria-hidden className="shrink-0" />}
      {label}
    </span>
  );
}
