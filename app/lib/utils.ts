import { CustomerStatus } from './definitions';

export const formatCurrency = (amount: number | string): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  if (typeof numericAmount !== 'number' || isNaN(numericAmount)) {
    return 'Rp 0';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta"   // 👉 ini yang benar
  }).format(date);
};


export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const getCustomerStatus = (frequency: number): CustomerStatus => {
  if (frequency >= 25) return 'hot';
  if (frequency >= 15) return 'warm';
  if (frequency >= 5) return 'cool';
  return 'cold';
};

// Logic penentuan status stok
export const getStockStatus = (stock: number, minStock: number): 'aman' | 'rendah' | 'kritis' => {
  const criticalThreshold = minStock * 0.5;

  if (stock < criticalThreshold) {
    return 'kritis';
  }
  if (stock >= criticalThreshold && stock <= minStock) {
    return 'rendah';
  }
  return 'aman';
};

// Format angka ribuan
export const formatNumber = (num: number) => {
  return num.toLocaleString('id-ID');
};

// ⭐ FORMAT NOMOR UNTUK WHATSAPP
// app/lib/utils.ts

export function formatPhoneForWA(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');
  
  // Jika dimulai dengan 0, ganti dengan 62
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  
  // Jika belum ada kode negara, tambahkan 62
  if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }
  
  return cleaned;
}
