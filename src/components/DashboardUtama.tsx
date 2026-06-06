import React, { useState } from 'react';
import { 
  FileCheck, Users, Clock, AlertTriangle, Search, Filter, 
  ChevronRight, Calendar, ArrowRight, MapPin, Activity, HelpCircle 
} from 'lucide-react';
import { LetterRequest, ResidentProfile } from '../types';
import { MAP_BLOCKS } from '../mockData';

interface DashboardUtamaProps {
  letters: LetterRequest[];
  residents: ResidentProfile[];
  onViewLetter: (id: string) => void;
  onNavigateToView: (view: any) => void;
}

export function DashboardUtama({ letters, residents, onViewLetter, onNavigateToView }: DashboardUtamaProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'disetujui' | 'ditolak'>('all');

  // Stats Counters
  const pendingCount = letters.filter((l) => l.status === 'pending').length;
  const approvedCount = letters.filter((l) => l.status === 'disetujui').length;
  const rejectedCount = letters.filter((l) => l.status === 'ditolak').length;
  const totalResidents = residents.length;

  // Filter letter requests based on search, block, and status selection
  const filteredLetters = letters.filter((letter) => {
    const matchesSearch = 
      letter.nama.toLowerCase().includes(searchQuery.toLowerCase()) || 
      letter.jenisSurat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Check block match. A letter's resident profile block matching map block
    const resident = residents.find((r) => r.nik === letter.nik);
    const matchesBlock = !selectedBlock || (resident && resident.blokNomor.includes(`Blok ${selectedBlock}`));

    const matchesStatus = statusFilter === 'all' || letter.status === statusFilter;

    return matchesSearch && matchesBlock && matchesStatus;
  });

  // Recent activity feeds
  const recentActivities = [
    { text: 'Warga baru Budi Hartono bergabung di RT 60', time: '1 jam yang lalu', type: 'user' },
    { text: 'Siti Rahmawati mengajukan Surat Pembuatan SKCK', time: '3 jam yang lalu', type: 'letter' },
    { text: 'Persetujuan Surat Pengantar KTP (id: SL-002)', time: 'Kemarin', type: 'approve' },
    { text: 'Penolakan pengajuan Rian Hidayat karena berkas belum lengkap', time: '2 hari yang lalu', type: 'reject' },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner metrics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Clock size={22} className="animate-spin-slow" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Menunggu Tinjauan</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{pendingCount} Pengajuan</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <FileCheck size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Surat Terbit</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{approvedCount} Berkas</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ditolak / Draf</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{rejectedCount} Dokumen</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex items-center gap-5 transition-transform hover:scale-[1.01]">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Users size={22} />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Warga Terdaftar</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalResidents} Penduduk</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Left Queue */}
        <div className="lg:col-span-8 space-y-6">
          {/* INTERACTIVE DASHBOARD CHART */}
          <ChartSection letters={letters} />

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            {/* Header controls & filter */}
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Daftar Pengajuan Surat Warga</h3>
                  <p className="text-sm text-slate-500 mt-0.5">Pantau, proses, dan cetak surat pengantar resmi RT/RW.</p>
                </div>
                {selectedBlock && (
                  <button 
                    onClick={() => setSelectedBlock(null)}
                    className="px-3 py-1 bg-blue-50 border border-blue-100 text-[#00288e] rounded-full text-xs font-bold"
                  >
                    Filter: Blok {selectedBlock} ✕
                  </button>
                )}
              </div>

              {/* Action row filters */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari warga, jenis surat, atau id..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 transition-colors"
                  />
                </div>
                <div className="flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200">
                  {(['all', 'pending', 'disetujui', 'ditolak'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        statusFilter === st 
                          ? 'bg-white text-slate-900 shadow-sm' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {st === 'all' ? 'Semua' : st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* List Table */}
            <div className="divide-y divide-slate-150">
              {filteredLetters.length > 0 ? (
                filteredLetters.map((letter) => (
                  <div 
                    key={letter.id} 
                    className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    onClick={() => onViewLetter(letter.id)}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-[#00288e] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded font-mono">
                          {letter.id}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00288e] transition-colors">
                          {letter.nama}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">•</span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Calendar size={12} /> {letter.tanggalPengajuan}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold">{letter.jenisSurat}</p>
                      <p className="text-xs text-slate-500 leading-normal line-clamp-1">{letter.keperluan}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                      <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full ${
                        letter.status === 'pending' && 'bg-amber-50 text-amber-700 border border-amber-200/50'
                      } ${
                        letter.status === 'disetujui' && 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'
                      } ${
                        letter.status === 'ditolak' && 'bg-red-50 text-red-700 border border-red-200/50'
                      }`}>
                        {letter.status === 'pending' ? 'Tinjauan' : letter.status}
                      </span>
                      <button className="p-1.5 hover:bg-blue-50 rounded-lg text-[#00288e] opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <p className="text-sm text-slate-500 font-medium">Tidak ada pengajuan surat yang ditemukan.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Columns: SVG Demographics Map & Activities */}
        <div className="lg:col-span-4 space-y-6">
          {/* SVG Map of Territory */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
            <div>
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight">Peta Wilayah & Hunian RT 60</h3>
              <p className="text-xs text-slate-500 mt-0.5">Klik pada blok untuk menelusuri pengajuan surat.</p>
            </div>

            {/* Interactive SVG Block Chart Map */}
            <div className="w-full h-44 bg-slate-50 rounded-xl relative border border-slate-200 flex items-center justify-center p-2">
              <svg viewBox="0 0 360 220" className="w-full h-full">
                {MAP_BLOCKS.map((block) => (
                  <path
                    key={block.id}
                    d={block.coordinates}
                    fill={selectedBlock === block.id ? '#00288e' : block.color}
                    fillOpacity={selectedBlock === block.id ? '0.9' : '0.15'}
                    stroke={selectedBlock === block.id ? '#00288e' : block.color}
                    strokeWidth="2"
                    className="cursor-pointer transition-all hover:fill-opacity-40"
                    onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
                  />
                ))}
                {/* Visual Label text positioning inside block polygons */}
                <text x="75" y="75" fill={selectedBlock === 'A' ? '#fff' : '#334155'} className="text-xs font-bold" pointerEvents="none">A</text>
                <text x="175" y="75" fill={selectedBlock === 'B' ? '#fff' : '#334155'} className="text-xs font-bold" pointerEvents="none">B</text>
                <text x="75" y="155" fill={selectedBlock === 'C' ? '#fff' : '#334155'} className="text-xs font-bold" pointerEvents="none">C</text>
                <text x="175" y="155" fill={selectedBlock === 'D' ? '#fff' : '#334155'} className="text-xs font-bold" pointerEvents="none">D</text>
                <text x="275" y="115" fill={selectedBlock === 'E' ? '#fff' : '#334155'} className="text-xs font-bold" pointerEvents="none">E</text>
              </svg>
            </div>

            {/* Block Stats list */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {MAP_BLOCKS.map((block) => (
                <button
                  key={block.id}
                  onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
                  className={`p-2 rounded-lg text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    selectedBlock === block.id 
                      ? 'bg-blue-50 border-[#00288e] text-[#00288e]' 
                      : 'bg-slate-50/50 border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: block.color }}></span>
                    {block.name}
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold">{block.count} KK</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity lists */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-[15px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Activity size={18} className="text-[#00288e]" /> Aktivitas Terbaru
              </h3>
            </div>

            <div className="space-y-4">
              {recentActivities.map((act, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5"></div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-slate-700 font-medium">{act.text}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigateToView('status-pengajuan')}
              className="w-full py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              Lihat Riwayat Lengkap <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// PREMIUM DYNAMIC CHART COMPONENT (Self-contained, SVG-powered for reliability)
interface ChartSectionProps {
  letters: LetterRequest[];
}

function ChartSection({ letters }: ChartSectionProps) {
  const [activeTab, setActiveTab] = React.useState<'category' | 'trend'>('category');
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  // 1. Process Category Distribution data from actual letters list
  const categoryCounts: Record<string, number> = {};
  letters.forEach((l) => {
    const type = l.jenisSurat || 'Surat Pengantar';
    categoryCounts[type] = (categoryCounts[type] || 0) + 1;
  });

  const categories = Object.entries(categoryCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const maxCategoryCount = categories.length > 0 ? Math.max(...categories.map((c) => c.count)) : 1;

  // 2. Process Monthly Trend data (Jan-Jun)
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'];
  const monthlyCounts = [4, 7, 12, 10, 15, letters.length]; // Group 2026 letters

  const maxMonthCount = Math.max(...monthlyCounts);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4 border-slate-100">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></span>
            Statistik Administrasi Surat Terbit
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Analitik data persuratan wilayah hukum RT 60 Pekalongan secara langsung.</p>
        </div>

        <div className="flex bg-slate-100 p-0.5 rounded-lg border text-[10.5px]">
          <button
            type="button"
            onClick={() => setActiveTab('category')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'category' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sebaran Berkas ({categories.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('trend')}
            className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
              activeTab === 'trend' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Tren Bulanan (1 Semester)
          </button>
        </div>
      </div>

      {activeTab === 'category' ? (
        /* CATEGORY DISTRIBUTION BAR CHART */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3.5">
              {categories.slice(0, 5).map((item, idx) => {
                const percentage = Math.round((item.count / letters.length) * 100) || 0;
                const progressWidth = `${Math.min(100, Math.max(8, (item.count / maxCategoryCount) * 100))}%`;

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`space-y-1.5 p-2.5 rounded-xl border border-transparent transition-all ${
                      hoveredIndex === idx ? 'bg-slate-50 border-slate-100 scale-[1.01]' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-705 truncate max-w-[200px]">{item.name}</span>
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-slate-400">({item.count} Berkas)</span>
                        <span className="font-bold text-[#00288e]">{percentage}%</span>
                      </div>
                    </div>
                    
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-[#00288e] rounded-full transition-all duration-500"
                        style={{ width: progressWidth }}
                      ></div>
                    </div>
                  </div>
                );
              })}
              {categories.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-400 font-bold">Belum ada pengajuan surat tercatat.</div>
              )}
            </div>

            {/* Visual breakdown box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[9px] bg-indigo-50 border border-indigo-100 font-mono font-bold text-[#00288e] px-1.5 py-0.5 rounded uppercase">Metrik Pengantar</span>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Layanan Terpilih</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  Pengantar KTP & SKCK memicu lebih dari 65% total pengurusan administrasi warga semester ini. Konfigurasi digital mempercepat proses verifikasi.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Rata-Rata Respon</span>
                  <p className="text-[15px] font-black text-slate-850">~15 Menit</p>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">Akurasi Berkas</span>
                  <p className="text-[15px] font-black text-slate-250 text-emerald-700">99.8% OK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SEMI-ANNUAL TREND AREA/BAR CHART */
        <div className="space-y-4">
          <div className="relative h-44 bg-slate-50 border rounded-xl overflow-hidden p-6 flex items-end justify-between font-mono text-[10px] text-slate-400 pt-10">
            {/* Grid Line background guides */}
            <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-slate-200"></div>
            <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-slate-200"></div>
            <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-slate-200"></div>

            {monthlyCounts.map((val, idx) => {
              const heightPercentage = `${Math.min(100, Math.max(15, (val / maxMonthCount) * 85))}%`;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer px-1 sm:px-2 z-10"
                >
                  {/* Floating Tooltip marker */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-2 bg-slate-900 text-white font-bold text-[9px] p-2 rounded-lg shadow-lg border border-slate-700 pointer-events-none whitespace-nowrap z-30">
                      <p className="font-semibold text-blue-300 font-sans">{months[idx]}</p>
                      <p className="font-mono mt-0.5">{val} Berkas Masuk</p>
                    </div>
                  )}

                  {/* Pulsating values on top inside graph */}
                  <span className={`absolute bottom-[calc(heightPercentage+4px)] font-bold transition-all text-[11px] ${
                    isHovered ? 'text-[#00288e]' : 'text-slate-450'
                  }`} style={{ bottom: heightPercentage }}>
                    {val}
                  </span>

                  {/* Bar shape */}
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t transition-all duration-300 relative"
                    style={{
                      height: heightPercentage,
                      backgroundImage: isHovered 
                        ? 'linear-gradient(to top, #1e3a8a, #3b82f6)' 
                        : 'linear-gradient(to top, #00288e, #6366f1)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-t-lg"></div>
                  </div>

                  <span className="mt-2 font-bold font-sans text-slate-500 tracking-tight leading-none text-center truncate max-w-[50px] sm:max-w-none">
                    {months[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

