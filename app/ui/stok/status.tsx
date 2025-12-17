import { CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

export default function StockStatusBadge({ status }: { status: 'aman' | 'rendah' | 'kritis' }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium gap-1 border',
        {
          'bg-green-100 text-green-700 border-green-200': status === 'aman',
          'bg-yellow-100 text-yellow-700 border-yellow-200': status === 'rendah',
          'bg-red-100 text-red-700 border-red-200': status === 'kritis',
        }
      )}
    >
      {status === 'aman' && <CheckCircle className="w-3 h-3" />}
      {status === 'rendah' && <TrendingDown className="w-3 h-3" />}
      {status === 'kritis' && <AlertTriangle className="w-3 h-3" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}