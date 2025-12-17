'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportPDFButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    console.log("1. Proses Export Dimulai..."); // Cek Console Browser

    // Cari elemen berdasarkan ID
    const element = document.getElementById('report-content'); 
    console.log("2. Element ditemukan?", element); // Jika null, berarti ID salah letak

    if (!element) {
      alert("Gagal: Area laporan tidak ditemukan. Pastikan ID 'report-content' sudah dipasang di page.tsx");
      return;
    }

    setIsGenerating(true);

    try {
      console.log("3. Mulai render HTML ke Canvas...");
      
      // Render Canvas
      const canvas = await html2canvas(element, {
        scale: 2, 
        useCORS: true,
        logging: true, // Aktifkan log html2canvas untuk debugging
      });

      console.log("4. Canvas berhasil dibuat, mulai generate PDF...");

      const imgData = canvas.toDataURL('image/png');
      
      // Setup PDF (A4 Landscape)
      // width 297mm, height 210mm
      const pdf = new jsPDF('l', 'mm', 'a4'); 
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Hitung rasio gambar agar pas di A4
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Tambahkan gambar ke PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      
      console.log("5. Menyimpan file...");
      pdf.save(`Laporan-BabiPedia-${new Date().getFullYear()}.pdf`);

    } catch (error) {
      console.error('ERROR SAAT EXPORT:', error); // Cek detail error disini
      alert('Terjadi kesalahan saat membuat PDF. Cek Console Browser.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isGenerating}
      className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-500 transition shadow-md shadow-pink-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Memproses...
        </>
      ) : (
        <>
            <Download className="w-4 h-4" />
            Export PDF
        </>
      )}
    </button>
  );
}