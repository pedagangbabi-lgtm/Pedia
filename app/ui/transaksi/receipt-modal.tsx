'use client';

import { Transaction } from '@/app/lib/definitions';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import { X, Printer } from 'lucide-react';
import { useMemo } from 'react';

export default function ReceiptModal({
    transaction,
    onClose
}: {
    transaction: Transaction;
    onClose: () => void
}) {

    // LOGIC: Hitung Subtotal dan Diskon secara on-the-fly
    const { subTotal, discount, grandTotal } = useMemo(() => {
        // 1. Hitung total harga asli dari semua item
        const calculatedSubTotal = transaction.items?.reduce((sum, item) => {
            return sum + Number(item.subtotal);
        }, 0) || 0;

        // 2. Ambil Total Akhir dari database
        const finalTotal = Number(transaction.total_amount);

        // 3. Selisihnya adalah Diskon
        const disc = calculatedSubTotal - finalTotal;

        return {
            subTotal: calculatedSubTotal,
            discount: disc,
            grandTotal: finalTotal
        };
    }, [transaction]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:p-0">
            {/* Overlay click to close */}
            <div className="absolute inset-0 print:hidden" onClick={onClose}></div>

            <div className="relative w-full max-w-sm bg-white shadow-2xl overflow-hidden rounded-sm print:shadow-none print:w-full">

                {/* Header Modal (Disembunyikan saat Print) */}
                <div className="bg-pink-600 p-4 text-white flex justify-between items-center print:hidden">
                    <h3 className="font-bold">Detail Transaksi</h3>
                    <button onClick={onClose}><X className="w-5 h-5" /></button>
                </div>

                {/* KONTEN STRUK */}
                <div className="p-6 bg-white font-mono text-sm text-gray-700 print:p-0">

                    {/* Toko Info */}
                    <div className="text-center mb-6 border-b border-dashed border-gray-300 pb-4">
                        <h2 className="text-xl font-bold text-pink-600 mb-1 print:text-black">BABIPEDIA</h2>
                        <p className="text-xs text-gray-500">Jl. K.H. Muhdi Gang Komajaya, Corongan, Maguwoharjo, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta</p>
                        <p className="text-xs text-gray-500">Telp: 0811-251-8481</p>
                    </div>

                    {/* Info Transaksi */}
                    <div className="mb-4 space-y-1 text-xs">
                        <div className="flex justify-between">
                            <span>ID:</span>
                            <span className="font-bold">{transaction.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tanggal:</span>
                            <span>{formatDate(transaction.date)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Plg:</span>
                            <span>{transaction.customer_name}</span>
                        </div>
                    </div>

                    {/* Table Item */}
                    <div className="border-t border-dashed border-gray-300 py-2 mb-2">
                        {transaction.items?.map((item, idx) => (
                            <div key={idx} className="mb-2 last:mb-0">
                                <div className="font-bold truncate">{item.menu_name}</div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{item.quantity} x {formatCurrency(Number(item.price))}</span>
                                    <span className="text-gray-800">{formatCurrency(Number(item.subtotal))}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- BAGIAN KALKULASI TOTAL --- */}
                    <div className="border-t border-dashed border-gray-300 pt-2 space-y-1">

                        {/* Subtotal */}
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subTotal)}</span>
                        </div>

                        {/* Diskon (Hanya muncul jika ada diskon > 0) */}
                        {discount > 0 && (
                            <div className="flex justify-between text-xs text-red-500 font-medium">
                                <span>Diskon</span>
                                <span>-{formatCurrency(discount)}</span>
                            </div>
                        )}

                        {/* Grand Total */}
                        <div className="flex justify-between text-lg font-bold text-black border-t border-dashed border-gray-300 pt-2 mt-2">
                            <span>TOTAL</span>
                            <span>{formatCurrency(grandTotal)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-400 mt-6 print:mt-8">
                        <p>Terima kasih atas kunjungan Anda!</p>
                        <p>Simpan struk ini sebagai bukti pembayaran.</p>
                    </div>

                </div>

                {/* Action Button (Hidden saat Print) */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center print:hidden">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                    >
                        <Printer className="w-4 h-4" /> Cetak Struk
                    </button>
                </div>
            </div>
        </div>
    );
}