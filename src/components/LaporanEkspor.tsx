import React, { useState } from 'react';
import { 
  FileDown, Download, Printer, Filter, Calendar, BarChart3, HelpCircle, FileText, Users, CheckSquare, Eye, X, History
} from 'lucide-react';
import { LetterRequest, ResidentProfile, RTConfig, ActivityLog } from '../types';
import { AktivitasLog } from './AktivitasLog';

interface LaporanEksporProps {
  letters: LetterRequest[];
  residents: ResidentProfile[];
  rtConfig: RTConfig;
  logs: ActivityLog[];
  onClearLogs: () => void;
}

export function LaporanEkspor({ letters, residents, rtConfig, logs, onClearLogs }: LaporanEksporProps) {
  const [activeTab, setActiveTab] = useState<'laporan' | 'logs'>('laporan');
  const [selectedMonth, setSelectedMonth] = useState<string>('06'); // June default
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  // Filter letters for the chosen period
  const filteredLetters = letters.filter((l) => {
    if (!l.tanggalPengajuan) return false;
    const [year, month] = l.tanggalPengajuan.split('-');
    return year === selectedYear && month === selectedMonth;
  });

  // Calculation statistics
  const totalInPeriod = filteredLetters.length;
  const approvedInPeriod = filteredLetters.filter((l) => l.status === 'disetujui').length;
  const rejectedInPeriod = filteredLetters.filter((l) => l.status === 'ditolak').length;
  const pendingInPeriod = filteredLetters.filter((l) => l.status === 'pending').length;
  const draftInPeriod = filteredLetters.filter((l) => l.status === 'draft').length;

  const totalResidents = residents.length;
  const completedResidents = residents.filter((r) => r.progressOnboarding === 100).length;

  // Let's compute types of letters distribution for generating visual chart
  const letterTypesMap: { [key: string]: number } = {};
  filteredLetters.forEach((l) => {
    letterTypesMap[l.jenisSurat] = (letterTypesMap[l.jenisSurat] || 0) + 1;
  });

  const chartData = Object.entries(letterTypesMap).map(([name, val]) => ({ name, val }));

  // Working CSV Download trigger for Letters Transcript
  const handleExportLettersCSV = () => {
    const headers = ['ID Surat', 'NIK Pemilik', 'Nama Pemilik', 'Jenis Surat Pengantar', 'Alasan Keperluaan', 'Tanggal Pengajuan', 'Status Finis', 'Nomor Dokumen Resmi', 'Tanggal Disetujui'];
    const rows = letters.map((l) => [
      l.id,
      l.nik,
      `"${l.nama.replace(/"/g, '""')}"`,
      `"${l.jenisSurat.replace(/"/g, '""')}"`,
      `"${l.keperluan.replace(/"/g, '""')}"`,
      l.tanggalPengajuan,
      l.status.toUpperCase(),
      l.nomorSurat || '-',
      l.tglPersetujuan || '-'
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Surat_SILAS_RT60_RW14_${selectedMonth}_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Working CSV Download trigger for Residents Demographic Database
  const handleExportResidentsCSV = () => {
    const headers = ['NIK 16-Digit', 'Nama Lengkap', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Agama', 'Pekerjaan', 'Pernikahan', 'Alamat KTP', 'Blok Rumah', 'WhatsApp (+62)', 'Onboarding (%)'];
    const rows = residents.map((r) => [
      r.nik,
      `"${r.nama.replace(/"/g, '""')}"`,
      `"${r.tempatLahir.replace(/"/g, '""')}"`,
      r.tanggalLahir,
      r.jenisKelamin,
      r.agama,
      `"${r.pekerjaan.replace(/"/g, '""')}"`,
      r.statusKawin,
      `"${r.alamatKtp.replace(/"/g, '""')}"`,
      `"${r.blokNomor || ''}"`,
      r.noHp || '-',
      r.progressOnboarding
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Induk_Warga_RT60_RW14.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const indonesiMonthName = (m: string) => {
    switch (m) {
      case '01': return 'Januari';
      case '02': return 'Februari';
      case '03': return 'Maret';
      case '04': return 'April';
      case '05': return 'Mei';
      case '06': return 'Juni';
      case '07': return 'Juli';
      case '08': return 'Agustus';
      case '09': return 'September';
      case '10': return 'Oktober';
      case '11': return 'November';
      default: return 'Desember';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title with Tabs Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 font-sans">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileDown size={22} className="text-[#00288e]" /> Pusat Pelaporan & Auditing Resmi
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Pusat kendali pelaporan. Saring dan cetak rekapitulasi surat keluar, ekspor CSV kependudukan terpadu, serta pantau audit log aktivitas sistem secara live.
          </p>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200 self-start md:self-center shrink-0">
          <button
            onClick={() => setActiveTab('laporan')}
            type="button"
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'laporan'
                ? 'bg-white text-[#00288e] shadow-sm font-black'
                : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <FileDown size={14} /> Generator Laporan
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            type="button"
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white text-[#00288e] shadow-sm font-black'
                : 'text-slate-550 hover:text-slate-800'
            }`}
          >
            <History size={14} /> Log Aktivitas Sistem
          </button>
        </div>
      </div>

      {activeTab === 'logs' ? (
        <AktivitasLog logs={logs} onClearLogs={onClearLogs} />
      ) : (
        <div className="space-y-8">
          {/* Dynamic filters & controls bar */}
          <div className="bg-white border rounded-xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5 border-slate-200">
            <div>
              <h2 className="text-md font-bold text-slate-800 tracking-tight flex items-center gap-2">
                <FileDown className="text-[#00288e]" size={18} /> Konfigurasi Saringan Cetak Laporan
              </h2>
              <p className="text-xs text-slate-500 mt-1">Cetak rekapitulasi, saring periode administrasi, dan download spreadsheet CSV data kependudukan.</p>
            </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-50 border px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <Calendar size={14} className="text-slate-400" />
            <span>Periode:</span>
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs font-bold text-[#00288e] outline-none"
            >
              <option value="01">Januari</option>
              <option value="02">Februari</option>
              <option value="03">Maret</option>
              <option value="04">April</option>
              <option value="05">Mei</option>
              <option value="06">Juni</option>
              <option value="07">Juli</option>
              <option value="08">Agustus</option>
              <option value="09">September</option>
              <option value="10">Oktober</option>
              <option value="11">November</option>
              <option value="12">Desember</option>
            </select>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-xs font-bold text-[#00288e] outline-none ml-1"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <button
            onClick={() => setShowPrintPreview(true)}
            className="px-4 py-2 border border-[#00288e] text-[#00288e] bg-blue-50/40 hover:bg-blue-100/50 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={14} /> Cetak Rekap Bulanan
          </button>
        </div>
      </div>

      {/* Stats of specific period */}
      <h3 className="text-md font-bold text-slate-805 -mb-4">Statistik Rekapitulasi Pelayanan — {indonesiMonthName(selectedMonth)} {selectedYear}</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="bg-white border p-5 rounded-xl shadow-sm text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Permohonan Masuk</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{totalInPeriod}</p>
          <span className="text-[10px] text-slate-400 font-medium">berkas dalam bulan ini</span>
        </div>
        <div className="bg-white border p-5 rounded-xl shadow-sm text-center">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Disetujui RT</p>
          <p className="text-3xl font-black text-emerald-600 mt-1">{approvedInPeriod}</p>
          <span className="text-[10px] text-emerald-500 font-medium">resmi berstempel</span>
        </div>
        <div className="bg-white border p-5 rounded-xl shadow-sm text-center">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Ditolak</p>
          <p className="text-3xl font-black text-red-500 mt-1">{rejectedInPeriod}</p>
          <span className="text-[10px] text-red-500 font-medium font-mono">perlu revisi berkas</span>
        </div>
        <div className="bg-white border p-5 rounded-xl shadow-sm text-center">
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Menunggu Tinjauan</p>
          <p className="text-3xl font-black text-amber-500 mt-1">{pendingInPeriod}</p>
          <span className="text-[10px] text-amber-500 font-medium">berada di antrean</span>
        </div>
        <div className="bg-white border p-5 rounded-xl shadow-sm text-center">
          <p className="text-[10px] font-bold text-[#00288e] uppercase tracking-wider">Draf Warga</p>
          <p className="text-3xl font-black text-blue-800 mt-1">{draftInPeriod}</p>
          <span className="text-[10px] text-blue-500 font-semibold uppercase font-mono bg-blue-50 rounded px-1.5 py-0.5 leading-none">Drafting</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column visual analysis */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
          <div>
            <h3 className="text-md font-bold text-slate-905 tracking-tight flex items-center gap-1.5">
              <BarChart3 size={18} className="text-[#00288e]" /> Distribusi Jenis Surat Pelayanan
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Persentase dan kuantitas pengurusan surat di RT {rtConfig.rtNumber}.</p>
          </div>

          {chartData.length > 0 ? (
            <div className="space-y-4">
              {chartData.map((data, idx) => {
                const percentage = Math.round((data.val / totalInPeriod) * 100);
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                      <span className="truncate max-w-xs">{data.name}</span>
                      <span className="font-bold flex gap-2">
                        <span>{data.val} Berkas</span>
                        <span className="text-slate-400">({percentage}%)</span>
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-[#00288e] h-2.5 rounded-full" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs font-semibold">
              Belum ada surat masuk terekam dalam filter periode {indonesiMonthName(selectedMonth)} {selectedYear}.
            </div>
          )}
        </div>

        {/* Right column trigger listings */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-5">
            <h4 className="text-[14px] font-bold text-slate-950 uppercase tracking-wider pb-2 border-b">Unduh Data Master RT 60</h4>
            
            <div className="space-y-4">
              {/* Letters trigger */}
              <div className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">Transkrip Pelayanan Surat</p>
                  <p className="text-[10px] text-slate-400">Berupa file .csv berisi log lengkap, nama penerima, nomor surat, alasan keperluan.</p>
                </div>
                <button
                  type="button"
                  onClick={handleExportLettersCSV}
                  className="px-3.5 py-2 bg-[#00288e] font-bold text-white text-xs rounded-xl shadow-sm text-center shrink-0 hover:bg-blue-900 cursor-pointer flex items-center gap-1"
                >
                  <Download size={14} /> Ekspor
                </button>
              </div>

              {/* Citizen trigger */}
              <div className="p-4 bg-slate-50 border rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-800">Data Induk Kependudukan</p>
                  <p className="text-[10px] text-slate-400">Database lengkap biodata keluarga besar RT 60 (Nama, NIK, Blok Rumah, Telp, Onboarding Progress).</p>
                </div>
                <button
                  type="button"
                  onClick={handleExportResidentsCSV}
                  className="px-3.5 py-2 bg-emerald-600 font-bold text-white text-xs rounded-xl shadow-sm text-center shrink-0 hover:bg-emerald-700 cursor-pointer flex items-center gap-1"
                >
                  <Download size={14} /> Ekspor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HIGH FIDELITY PRINT PREVIEW MODAL */}
      {showPrintPreview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-4xl w-full shadow-2xl relative space-y-6 printable-paper border" onClick={(e) => e.stopPropagation()}>
            
            {/* Top Toolbar */}
            <div className="flex justify-between items-center pb-4 border-b border-dashed no-print">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase">Draf Cetak Laporan Bulanan</h4>
                <p className="text-[10px] text-slate-400">Tekan cetak untuk memunculkan print dialog browser.</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#00288e] text-white text-xs font-bold rounded-xl flex items-center gap-1 hover:bg-blue-900 shadow cursor-pointer"
                >
                  <Printer size={13} /> Cetak Sekarang
                </button>
                <button 
                  onClick={() => setShowPrintPreview(false)}
                  className="p-2 border bg-white text-slate-500 rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Printable official layout */}
            <div className="p-8 border border-slate-300 rounded shadow-sm space-y-6 text-black select-text" id="printable-rekap-area">
              <div className="text-center border-b-4 border-double border-black pb-4">
                <h1 className="text-xl font-bold uppercase tracking-tight">RUKUN TETANGGA 60 / RUKUN WARGA {rtConfig.rwNumber}</h1>
                <p className="text-sm font-serif italic text-slate-650">Kecamatan {rtConfig.kecamatan}, Kelurahan {rtConfig.kelurahan}, {rtConfig.kota}</p>
                <p className="text-xs text-slate-500">Sekretariat: {rtConfig.alamatSekretariat}</p>
              </div>

              <div className="text-center space-y-1 py-2">
                <h2 className="text-md font-bold uppercase underline">REKAPITULASI PELAYANAN SURAT PENGANTAR</h2>
                <p className="text-xs font-medium font-mono text-slate-600">Periode Pelayanan: {indonesiMonthName(selectedMonth).toUpperCase()} {selectedYear}</p>
              </div>

              {/* Overview Details mapping */}
              <div className="grid grid-cols-2 gap-4 text-xs font-serif leading-loose border-y py-4 my-2">
                <div>
                  <p>Kabupaten/Kota: <span className="font-bold">{rtConfig.kota}</span></p>
                  <p>Kelurahan: <span className="font-bold">{rtConfig.kelurahan}</span></p>
                </div>
                <div>
                  <p>Rincian RT/RW: <span className="font-bold">RT {rtConfig.rtNumber} / RW {rtConfig.rwNumber}</span></p>
                  <p>Ditandatangani: <span className="font-bold">{rtConfig.namaKetua}</span></p>
                </div>
              </div>

              {/* Statistics tables */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase">1. Rincian Statistik Kumulatif</h3>
                <table className="w-full text-left text-xs border border-collapse border-black font-medium">
                  <thead>
                    <tr className="bg-slate-100 border border-black font-bold uppercase text-[10px]">
                      <th className="p-2 border border-black">Status Dokumen</th>
                      <th className="p-2 border border-black text-center">Jumlah Berkas</th>
                      <th className="p-2 border border-black">Keterangan Administrasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-black">
                      <td className="p-2 border border-black font-bold text-emerald-800">DISETUJUI / TERBIT</td>
                      <td className="p-2 border border-black text-center font-bold">{approvedInPeriod}</td>
                      <td className="p-2 border border-black text-[11px]">Selesai ditandatangani Ketua RT dan terbit resmi.</td>
                    </tr>
                    <tr className="border border-black">
                      <td className="p-2 border border-black font-bold text-red-700">DITOLAK / REVISI</td>
                      <td className="p-2 border border-black text-center font-bold">{rejectedInPeriod}</td>
                      <td className="p-2 border border-black text-[11px]">Ditolak sementara karena berkas lampiran tidak seirama.</td>
                    </tr>
                    <tr className="border border-black">
                      <td className="p-2 border border-black font-bold text-amber-600">MENGANTRE (PROSES)</td>
                      <td className="p-2 border border-black text-center font-bold">{pendingInPeriod}</td>
                      <td className="p-2 border border-black text-[11px]">Menunggu sinkronisasi profil kependudukan oleh pengurus.</td>
                    </tr>
                    <tr className="bg-slate-50 font-bold border border-black">
                      <td className="p-2 border border-black uppercase text-[11px]">Total Seluruh Pengajuan</td>
                      <td className="p-2 border border-black text-center text-sm">{totalInPeriod}</td>
                      <td className="p-2 border border-black text-[11px]">Seluruh permohonan dalam periode ini.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* List of issued letters details */}
              <div className="space-y-2.5 pt-3">
                <h3 className="text-xs font-bold uppercase">2. Daftar Transaksi Terbit Khusus Bulan Ini</h3>
                <table className="w-full text-left text-[11px] border border-collapse border-black font-medium">
                  <thead>
                    <tr className="bg-slate-100 border border-black font-bold uppercase">
                      <th className="p-2 border border-black">ID</th>
                      <th className="p-2 border border-black">Nama Warga</th>
                      <th className="p-2 border border-black">Jenis Surat Pengantar</th>
                      <th className="p-2 border border-black">Status</th>
                      <th className="p-2 border border-black">Nomor Berkas Resmi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLetters.map((l) => (
                      <tr key={l.id} className="border border-black">
                        <td className="p-2 border border-black font-mono font-bold align-top">{l.id}</td>
                        <td className="p-2 border border-black align-top font-bold uppercase">{l.nama}</td>
                        <td className="p-2 border border-black align-top">{l.jenisSurat}</td>
                        <td className="p-2 border border-black align-top font-bold capitalize">{l.status === 'disetujui' ? 'Terbit' : l.status}</td>
                        <td className="p-2 border border-black align-top font-mono font-semibold">{l.nomorSurat || l.catatanPenolakan || '-'}</td>
                      </tr>
                    ))}
                    {filteredLetters.length === 0 && (
                      <tr className="border border-black">
                        <td colSpan={5} className="p-8 text-center text-slate-500">Nihil. Belum ada dokumen bersesuaian dalam filter pencarian ini.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer signature line replicas */}
              <div className="pt-8 flex justify-between items-center text-xs font-serif leading-normal">
                <div>
                  <p className="italic text-slate-400">Dicetak digital via Portal SILAS.</p>
                  <p>Tanggal Cetak: {new Date().toISOString().slice(0,10)}</p>
                </div>
                
                <div className="text-center space-y-12 pr-6 relative">
                  <div>
                    <p>Hormat Kami,</p>
                    <p className="font-bold uppercase">Ketua RT {rtConfig.rtNumber} Kebonagung</p>
                  </div>
                  
                  {/* Digital seal and stamp overlay */}
                  {rtConfig.stampUrl && (
                    <div className="absolute top-2.5 left-2.5 pointer-events-none select-none z-10 w-24 h-24 rotate-[-15deg] opacity-75 mix-blend-multiply">
                      <img src={rtConfig.stampUrl} className="w-full h-full object-contain" alt="cap stempel" />
                    </div>
                  )}

                  {rtConfig.signatureUrl && (
                    <div className="absolute top-6 left-6 pointer-events-none select-none z-0 w-28 object-contain">
                      <img src={rtConfig.signatureUrl} className="w-full h-full" alt="tanda tangan" />
                    </div>
                  )}

                  <div className="relative z-20 pt-10">
                    <p className="font-bold text-md underline uppercase">{rtConfig.namaKetua}</p>
                    <p className="font-mono text-[10px] text-slate-500">NIK. {rtConfig.nikKetua}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
