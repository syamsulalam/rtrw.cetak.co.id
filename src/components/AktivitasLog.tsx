import React, { useState } from 'react';
import { 
  History, Search, Filter, Trash2, Calendar, FileText, UserPlus, Shield, Sparkles, Download, ArrowUpDown
} from 'lucide-react';
import { ActivityLog } from '../types';

interface AktivitasLogProps {
  logs: ActivityLog[];
  onClearLogs: () => void;
}

export function AktivitasLog({ logs, onClearLogs }: AktivitasLogProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | 'letter' | 'resident' | 'auth' | 'system'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.text.toLowerCase().includes(search.toLowerCase()) || 
                          (log.userName && log.userName.toLowerCase().includes(search.toLowerCase())) ||
                          (log.userNik && log.userNik.includes(search));
    const matchesCategory = category === 'all' || log.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
  });

  // Export logs to CSV file local download
  const handleExportCSV = () => {
    const headers = ['ID', 'Waktu', 'Kategori', 'Aktivitas', 'NIK Pelaku', 'Nama Pelaku'];
    const rows = sortedLogs.map((l) => [
      l.id,
      l.timestamp,
      l.category.toUpperCase(),
      `"${l.text.replace(/"/g, '""')}"`,
      l.userNik || '',
      l.userName || ''
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SILAS_LOG_AKTIVITAS_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'letter': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'resident': return 'text-green-600 bg-green-50 border-green-200';
      case 'auth': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'letter': return <FileText size={14} />;
      case 'resident': return <UserPlus size={14} />;
      case 'auth': return <Shield size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Upper header overview banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-909 tracking-tight flex items-center gap-2">
            <History className="text-[#00288e]" size={22} /> Audit Log Aktivitas Sistem SILAS
          </h2>
          <p className="text-xs text-slate-505 mt-1">Transparansi perekaman log transaksi pengajuan, registrasi warga, dan persetujuan berkas.</p>
        </div>

        <div className="flex gap-2.5 w-full md:w-auto">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Download size={14} /> Ekspor .CSV Log
          </button>
          
          <button
            onClick={onClearLogs}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 text-slate-500 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trash2 size={14} /> Reset Histori Log
          </button>
        </div>
      </div>

      {/* Grid of basic statistic stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Transaksi Log</p>
          <p className="text-xl font-black text-slate-905 mt-0.5">{logs.length} Log</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Layanan Surat</p>
          <p className="text-xl font-black text-blue-600 mt-0.5">{logs.filter(l => l.category === 'letter').length} Log</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registrasi Kependudukan</p>
          <p className="text-xl font-black text-green-600 mt-0.5">{logs.filter(l => l.category === 'resident').length} Log</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Autentikasi & Keamanan</p>
          <p className="text-xl font-black text-purple-600 mt-0.5">{logs.filter(l => l.category === 'auth').length} Log</p>
        </div>
      </div>

      {/* Main filter-search-timeline cards */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar filter */}
        <div className="p-5 border-b bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kata kunci aktivitas, nama atau NIK..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#00288e] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex bg-slate-200/60 p-1 rounded-xl items-center border">
              {(['all', 'letter', 'resident', 'auth', 'system'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    category === cat
                      ? 'bg-white text-[#00288e] shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'Semua' : cat === 'resident' ? 'Warga' : cat === 'letter' ? 'Surat' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="px-3 py-2 bg-white border rounded-xl font-bold text-xs text-slate-650 inline-flex items-center gap-1 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <ArrowUpDown size={13} /> {sortOrder === 'desc' ? 'Urutan Terbaru' : 'Urutan Terlama'}
            </button>
          </div>
        </div>

        {/* Timeline Log Lists */}
        <div className="divide-y divide-slate-100 p-2">
          {sortedLogs.length > 0 ? (
            sortedLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-50/40 rounded-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <span className={`p-2 rounded-xl border shrink-0 flex items-center justify-center mt-0.5 ${getCategoryColor(log.category)}`}>
                    {getCategoryIcon(log.category)}
                  </span>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {log.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                        <Calendar size={11} /> {new Date(log.timestamp).toLocaleString('id-ID', { hour12: false })}
                      </span>
                      {log.userName && (
                        <>
                          <span className="text-slate-300 text-[10px]">•</span>
                          <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-1.5 py-0.5 rounded leading-none">
                            Pelaku: {log.userName} ({log.userNik})
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-semibold bg-slate-50 border text-slate-400 px-2 py-0.5 rounded shadow-sm self-start md:self-center shrink-0">
                  {log.id}
                </span>
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-slate-500 text-sm font-medium">
              Tidak ada aktivitas terekam yang cocok dengan filter pencarian.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
