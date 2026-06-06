import React, { useState } from 'react';
import { 
  Search, Shield, Phone, Mail, Map, MapPin, 
  CheckCircle, Info, ExternalLink, RefreshCw, Send, Radio, Home
} from 'lucide-react';
import { Officer, ResidentProfile, RuangPengurusSpace } from '../types';

interface CariPengurusComponentProps {
  space: RuangPengurusSpace;
  officers: Officer[];
  residents: ResidentProfile[];
  citizen: ResidentProfile;
  onApplyForRelocation: (newBlock: string) => void;
  addLog: (category: 'letter' | 'resident' | 'auth' | 'system', text: string) => void;
}

export function CariPengurusComponent({
  space,
  officers,
  residents,
  citizen,
  onApplyForRelocation,
  addLog
}: CariPengurusComponentProps) {
  const [activeTab, setActiveTab] = useState<'kontak' | 'geosector'>('kontak');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'semua' | 'RW' | 'RT'>('semua');
  
  // Warga map search states
  const [wargaMapQuery, setWargaMapQuery] = useState('');
  const [focusedResident, setFocusedResident] = useState<ResidentProfile | null>(null);
  
  // Relocation request form state
  const [showRelocateForm, setShowRelocateForm] = useState(false);
  const [requestedBlock, setRequestedBlock] = useState(citizen.blokNomor);
  const [relocateReason, setRelocateReason] = useState('');
  const [relocateSuccess, setRelocateSuccess] = useState(false);

  // Filter officers
  const filteredOfficers = officers.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          o.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (o.rtNumber && o.rtNumber.includes(searchTerm));
    
    const matchesLevel = selectedLevel === 'semua' || o.level === selectedLevel;

    return matchesSearch && matchesLevel;
  });

  const handleSubRelocate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedBlock.trim()) return;

    onApplyForRelocation(requestedBlock);
    addLog('resident', `Warga ${citizen.nama} mengajukan permohonan pemindahan blok alamat baru dari "${citizen.blokNomor}" ke "${requestedBlock}" karena alasan: ${relocateReason}`);
    setRelocateSuccess(true);
    setTimeout(() => {
      setRelocateSuccess(false);
      setShowRelocateForm(false);
      setRelocateReason('');
    }, 4000);
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome & Info Panel */}
      <div className="bg-gradient-to-br from-[#00288e] to-indigo-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-md">
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
        ></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-indigo-200 border border-white/10">Sistem Pencarian Sektor</span>
            <h2 className="text-2xl font-black tracking-tight">Hubungi & Kenali Dewan Pengurus Anda</h2>
            <p className="text-xs text-indigo-150 leading-relaxed max-w-xl">
              Anda berdomisili di dalam kawasan wilayah hukum kerja **RW {space.rwNumber}**. Temukan jajaran pimpinan yang mengayomi blok tempat tinggal Anda, lihat lokasi administratif sekretariat, atau ajukan surat kepindahan jika blok nomor Anda tidak sinkron.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-end">
            <button 
              onClick={() => setShowRelocateForm(!showRelocateForm)}
              className="px-5 py-3 bg-white text-[#00288e] hover:bg-indigo-50 font-black rounded-xl text-xs flex items-center gap-2 shadow transition-all cursor-pointer"
            >
              <RefreshCw size={14} /> Ajukan Mutasi Blok Domisili
            </button>
          </div>
        </div>
      </div>

      {/* Relocate form container */}
      {showRelocateForm && (
        <div className="bg-slate-50 border border-slate-205 rounded-2xl p-6 transition-all space-y-4 max-w-xl">
          <div>
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              <RefreshCw size={14} className="text-[#00288e]" /> Formulir Pengajuan Sinkronisasi Blok No.
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Apabila alamat nomor rumah atau blok pendaftaran Anda mengalami kesalahan input.</p>
          </div>

          {relocateSuccess ? (
            <div className="p-4 bg-emerald-600 text-white rounded-xl text-xs font-bold leading-normal">
              Pengajuan permohonan sinkronisasi domisili berhasil dikirimkan ke Ketua RT Anda untuk diverifikasi di Dashboard utama!
            </div>
          ) : (
            <form onSubmit={handleSubRelocate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase">Blok Domisili Lama Anda:</label>
                  <input type="text" disabled value={citizen.blokNomor} className="w-full bg-slate-200 border text-xs rounded-xl px-4 py-2 text-slate-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-indigo-705 uppercase">Blok Domisili Baru Sebenarnya:</label>
                  <input 
                    type="text" 
                    required 
                    value={requestedBlock} 
                    onChange={e => setRequestedBlock(e.target.value)} 
                    placeholder="Contoh: Blok I No. 12B" 
                    className="w-full bg-white border text-xs text-slate-800 rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#00288e] outline-none font-medium" 
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-505 uppercase">Alasan Singkat Koreksi / Mutasi:</label>
                <textarea 
                  rows={2} 
                  required
                  value={relocateReason}
                  onChange={e => setRelocateReason(e.target.value)}
                  placeholder="Contoh: Kesalahan ketik nomor rumah saat pendaftaran, seharunya No. 12B bukan No. 12A."
                  className="w-full text-xs p-3 bg-white border rounded-xl outline-none focus:ring-2 focus:ring-[#00288e] text-slate-800 font-medium"
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="py-2.5 px-4 bg-[#00288e] text-white hover:bg-blue-900 rounded-lg text-xs font-bold cursor-pointer">
                  Kirim Permohonan Sinkronisasi
                </button>
                <button type="button" onClick={() => setShowRelocateForm(false)} className="py-2.5 px-3 bg-slate-250 text-slate-600 hover:bg-slate-300 rounded-lg text-xs font-bold cursor-pointer">
                  Batalkan
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Tab Switcher for Warga finder map */}
      <div className="flex border-b border-indigo-50 leading-none">
        <button
          onClick={() => setActiveTab('kontak')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'kontak' ? 'border-[#00288e] text-[#00288e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield size={16} /> Direktori Kontak & Jajaran Pengurus
        </button>
        <button
          onClick={() => setActiveTab('geosector')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'geosector' ? 'border-[#00288e] text-[#00288e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Map size={16} /> Peta Geospasial & Cari Hunian Warga
        </button>
      </div>

      {activeTab === 'kontak' ? (
        /* TWO COLUMNS: Maps service coverage on LHS, Officers list on RHS */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Lefthand map & coverage info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
              <Map size={16} className="text-[#00288e]" /> Batas Area Layanan Sektor
            </h3>

            {/* Fake concentric map radius visual */}
            <div className="relative h-60 bg-slate-900 rounded-xl flex items-center justify-center overflow-hidden border">
              
              {/* Fake grid lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-slate-500"></div>
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-500"></div>
                <div className="absolute w-full h-[2px] bg-slate-700 rotate-45 top-10"></div>
              </div>

              <div 
                className="absolute bg-blue-500/15 border border-dashed border-blue-400 rounded-full flex items-center justify-center transition-all duration-300 z-10"
                style={{ 
                  width: `${Math.min(200, 80 + (space.gmapRadiusMeters / 4))}px`, 
                  height: `${Math.min(200, 80 + (space.gmapRadiusMeters / 4))}px` 
                }}
              >
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <span className="absolute text-[8px] bg-slate-950/80 px-1.5 py-0.5 rounded text-blue-300 font-bold border border-blue-400/20 whitespace-nowrap">
                   Rentang Blanket: {space.gmapRadiusMeters}m
                </span>
              </div>

              <div className="absolute center flex flex-col items-center">
                <div className="bg-red-500 p-1.5 text-white rounded-full shadow border border-white">
                  <MapPin size={12} className="animate-bounce" />
                </div>
                <span className="mt-1 px-1.5 py-0.5 bg-slate-950 text-white font-mono font-bold text-[8px] rounded whitespace-nowrap">
                   Sekretariat RW {space.rwNumber}
                </span>
              </div>
            </div>

            {/* Administrative Center Address */}
            <div className="space-y-3 pt-2 text-xs leading-relaxed text-slate-600 font-medium font-sans">
              <div className="p-4 bg-slate-50 rounded-xl">
                <span className="text-[9px] bg-slate-100 text-slate-500 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">Kantor Balai Warga:</span>
                <p className="font-bold text-slate-800 mt-0.5">{space.alamatSekretariatRw}</p>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-xl space-y-1">
                <span className="text-[9px] bg-indigo-100 text-[#00288e] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">Sub-RT yang tercakup:</span>
                <div className="flex flex-wrap gap-1.5 mt-1 font-mono">
                  {space.rtsGoverned.map(rt => (
                    <span key={rt} className="bg-white border border-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded text-[10px]">
                      RT {rt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Righthand directory listings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
            
            {/* Filter tool */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2 border-b">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Daftar Kontak Organisasi Pelaksana</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Urutkan jajaran pengurus berdasarkan RW atau unit RT Anda.</p>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-100 p-0.5 rounded-lg text-[10.5px]">
                <button
                  type="button"
                  onClick={() => setSelectedLevel('semua')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    selectedLevel === 'semua' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-505 hover:text-slate-800'
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLevel('RW')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    selectedLevel === 'RW' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-505 hover:text-slate-800'
                  }`}
                >
                  RW {space.rwNumber}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLevel('RT')}
                  className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                    selectedLevel === 'RT' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-505 hover:text-slate-800'
                  }`}
                >
                  Tingkat RT
                </button>
              </div>
            </div>

            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari nama pengurus, RT atau peran jabatan..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-[#00288e] text-xs font-semibold text-slate-800"
              />
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100">
              {filteredOfficers.length > 0 ? (
                filteredOfficers.map((o) => (
                  <div key={o.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 text-[#00288e] font-black text-xs flex items-center justify-center shrink-0">
                        {o.name.slice(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-extrabold text-slate-900 capitalize">{o.name}</h4>
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-bold font-mono border ${
                            o.level === 'RW' ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-blue-50 text-[#00288e] border-blue-100'
                          }`}>
                            {o.level === 'RW' ? 'RW ' + space.rwNumber : 'RT ' + o.rtNumber}
                          </span>
                        </div>
                        <p className="text-[10.5px] text-slate-500 font-bold mt-0.5">{o.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] font-bold shrink-0">
                      <a 
                        href={`tel:${o.phone}`}
                        className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-[#00288e] rounded-xl text-slate-500 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Phone size={12} /> Hubungi
                      </a>
                      {o.email && (
                        <a 
                          href={`mailto:${o.email}`}
                          className="p-2 bg-slate-50 hover:bg-slate-100 hover:text-[#00288e] rounded-xl text-slate-550 flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Mail size={12} /> Email
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-slate-450 font-semibold">
                  Tidak ada petugas kepengurusan yang sesuai dengan filter pencarian.
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
      ) : (
        /* TAB 2: ACTIVE GEOGRAPHIC FINDER MAP */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sektor Map Left Panel */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 px-6 border-b bg-slate-50/50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00288e]" />
                <div>
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Peta Hunian Interaktif RT 60</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Batas radius dan rute evakuasi menuju Balai Sekretariat.</p>
                </div>
              </div>
              <span className="text-[9px] bg-blue-100 border border-blue-200 text-[#00288e] font-mono px-1.5 py-0.5 rounded font-bold">GRID V4 READY</span>
            </div>

            {/* Simulated Live maps context */}
            <div className="relative h-[420px] bg-slate-900 flex items-center justify-center overflow-hidden">
              
              {/* Fake Street Grid lines */}
              <div className="absolute inset-0 opacity-40 select-none pointer-events-none">
                <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-slate-705"></div>
                <div className="absolute left-2/3 top-0 bottom-0 w-2.5 bg-slate-700"></div>
                <div className="absolute left-0 right-0 top-1/3 h-2 bg-slate-705"></div>
                <div className="absolute left-0 right-0 top-3/4 h-3 bg-slate-700"></div>
                
                {/* Visual blocks */}
                <div className="absolute top-12 left-12 w-28 h-12 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-bold uppercase tracking-wider">Blok I (A)</div>
                <div className="absolute top-12 right-20 w-24 h-12 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-bold uppercase tracking-wider">Blok II (B)</div>
                <div className="absolute bottom-12 left-24 w-32 h-16 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-bold uppercase tracking-wider">Blok III (C)</div>
                <div className="absolute bottom-16 right-16 w-24 h-12 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[9px] text-slate-500 font-bold uppercase tracking-wider">Blok IV (D)</div>
              </div>

              {/* Central Pin : Balai Sekretariat RW */}
              <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-10">
                <div className="bg-red-500 p-2 text-white rounded-full shadow-lg border border-white animate-pulse">
                  <MapPin size={16} />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-slate-900 border border-slate-700 text-white font-bold text-[8.5px] rounded whitespace-nowrap shadow-md">
                  Balai Sekretariat
                </span>
              </div>

              {/* Dynamic Path Navigation line on Search focus! */}
              {focusedResident && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  <g>
                    {focusedResident.blokNomor.toLowerCase().includes('i') || focusedResident.blokNomor.toLowerCase().includes('a') ? (
                      <path d="M 120 80 Q 200 80 200 210" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" className="animate-[dash_2s_linear_infinite]" />
                    ) : focusedResident.blokNomor.toLowerCase().includes('ii') || focusedResident.blokNomor.toLowerCase().includes('b') ? (
                      <path d="M 300 80 Q 220 80 200 210" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" className="animate-[dash_2s_linear_infinite]" />
                    ) : focusedResident.blokNomor.toLowerCase().includes('iii') || focusedResident.blokNomor.toLowerCase().includes('c') ? (
                      <path d="M 160 320 Q 200 320 200 210" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" className="animate-[dash_2s_linear_infinite]" />
                    ) : (
                      <path d="M 320 320 Q 220 320 200 210" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" className="animate-[dash_2s_linear_infinite]" />
                    )}
                  </g>
                </svg>
              )}

              {/* Highlight Pin of Searched house */}
              {focusedResident && (
                <div className="absolute z-20 transition-all duration-300"
                  style={{
                    left: focusedResident.blokNomor.toLowerCase().includes('i') || focusedResident.blokNomor.toLowerCase().includes('a') ? '120px' : 
                          focusedResident.blokNomor.toLowerCase().includes('ii') || focusedResident.blokNomor.toLowerCase().includes('b') ? '300px' :
                          focusedResident.blokNomor.toLowerCase().includes('iii') || focusedResident.blokNomor.toLowerCase().includes('c') ? '160px' : '320px',
                    top: focusedResident.blokNomor.toLowerCase().includes('i') || focusedResident.blokNomor.toLowerCase().includes('a') || focusedResident.blokNomor.toLowerCase().includes('ii') || focusedResident.blokNomor.toLowerCase().includes('b') ? '80px' : '320px'
                  }}
                >
                  <div className="w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping absolute"></div>
                    <div className="bg-amber-500 p-1.5 text-white rounded-full shadow-lg border border-white">
                      <Home size={12} />
                    </div>
                    <span className="mt-1 px-1.5 py-0.5 bg-slate-900 text-yellow-300 border border-slate-700 font-bold text-[8px] rounded whitespace-nowrap shadow select-none">
                      {focusedResident.blokNomor}
                    </span>
                  </div>
                </div>
              )}

              {/* Floating Map coordinates card */}
              <div className="absolute bottom-4 left-4 p-3 bg-slate-950/90 border border-slate-800 rounded-xl max-w-xs space-y-1 text-white text-[10px] z-30">
                <span className="text-slate-400 uppercase tracking-widest font-black text-[8px]">Titik Pusat:</span>
                <p className="font-extrabold">{space.gmapCenter.label}</p>
                <div className="flex gap-2 font-mono text-[9px] text-[#9cb3ff] font-bold">
                  <span>LAT: {space.gmapCenter.lat}</span>
                  <span>LNG: {space.gmapCenter.lng}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t text-slate-500 text-[11px] tracking-tight leading-normal font-sans">
              *Arah navigasi disimulasikan dari letak hunian menuju Balai Sekretariat untuk mempermudah warga menempuh rute evakuasi tercepat dan mengambil berkas fisik resmi yang telah diproses.
            </div>
          </div>

          {/* Search Console Right Panel */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[10px] bg-yellow-50 text-amber-800 font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border border-yellow-100">Warga Map Search</span>
              <h3 className="text-sm font-black text-slate-900 mt-2 uppercase tracking-wide">Pencarian Hunian Warga</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">Cari berdasarkan nama lengkap atau nomor NIK untuk melacak letak domisili rumah.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Ketik nama tetangga (misal: Budi)..." 
                  value={wargaMapQuery}
                  onChange={e => {
                    setWargaMapQuery(e.target.value);
                    // Match first if matched
                    const m = residents.find(r => r.nama.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value.length > 1);
                    if (m) setFocusedResident(m);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-250 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#00288e] text-slate-800 font-semibold"
                />
              </div>

              {/* Suggestions results dropdown list */}
              {wargaMapQuery.length > 1 && (
                <div className="border rounded-xl divide-y bg-slate-50/50 max-h-40 overflow-y-auto">
                  {residents.filter(r => r.nama.toLowerCase().includes(wargaMapQuery.toLowerCase())).map(r => (
                    <button
                      key={r.nik}
                      onClick={() => {
                        setFocusedResident(r);
                        setWargaMapQuery(r.nama);
                      }}
                      className="w-full text-left p-2.5 text-xs hover:bg-white text-slate-700 transition-colors flex justify-between items-center cursor-pointer font-bold"
                    >
                      <span className="uppercase text-slate-900">{r.nama}</span>
                      <span className="px-1.5 py-0.2 bg-blue-50 text-[#00288e] rounded text-[8.5px] font-mono">{r.blokNomor}</span>
                    </button>
                  ))}
                  {residents.filter(r => r.nama.toLowerCase().includes(wargaMapQuery.toLowerCase())).length === 0 && (
                    <div className="p-3 text-center text-slate-400 text-[11px] font-bold">Warga tidak ditemukan.</div>
                  )}
                </div>
              )}

              {/* Output matched resident profile */}
              {focusedResident ? (
                <div className="p-5 bg-gradient-to-br from-indigo-50/30 to-blue-50/30 border border-indigo-100 rounded-xl space-y-4 animate-fade-in text-xs font-semibold">
                  
                  <div className="border-b pb-3 space-y-1">
                    <span className="text-[9px] bg-indigo-100 text-[#00288e] uppercase px-2 py-0.5 rounded font-bold font-mono">Hasil Geofinder</span>
                    <h4 className="text-xs font-black text-slate-900 uppercase mt-2">{focusedResident.nama}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">NIK: {focusedResident.nik}</p>
                    <p className="text-[10.5px] text-indigo-900">Alamat: <span className="font-extrabold">{focusedResident.blokNomor}</span></p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Anggota Satu KK:</span>
                    <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                      {residents.filter(r => r.kkNo === focusedResident.kkNo && r.kkNo).map(fam => (
                        <div key={fam.nik} className="p-1.5 bg-white border border-slate-100 rounded text-[10.5px] text-slate-600 flex justify-between font-medium">
                          <span>{fam.nama}</span>
                          <span className="text-[8.5px] bg-slate-100 text-slate-500 font-bold px-1 rounded">{fam.kkRole}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Distance simulation calculator */}
                  <div className="pt-3 border-t space-y-2">
                    <span className="text-[9px] text-slate-400 font-bold uppercase block tracking-wider">Arah & Estimasi Rute:</span>
                    <div className="grid grid-cols-2 gap-2 text-slate-700">
                      <div className="p-2 bg-white rounded-lg border text-center shadow-xs">
                        <span className="text-[8px] text-slate-400 block font-bold">JARAK</span>
                        <p className="font-extrabold text-[#00288e]">
                          {focusedResident.blokNomor.toLowerCase().includes('a') || focusedResident.blokNomor.includes('1') ? '120m' : 
                           focusedResident.blokNomor.toLowerCase().includes('b') || focusedResident.blokNomor.includes('2') ? '240m' :
                           focusedResident.blokNomor.toLowerCase().includes('c') || focusedResident.blokNomor.includes('3') ? '160m' : '320m'}
                        </p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border text-center shadow-xs">
                        <span className="text-[8px] text-slate-400 block font-bold">WAKTU JALAN</span>
                        <p className="font-extrabold text-emerald-700">
                          {focusedResident.blokNomor.toLowerCase().includes('a') || focusedResident.blokNomor.includes('1') ? '1.5 Min' : 
                           focusedResident.blokNomor.toLowerCase().includes('b') || focusedResident.blokNomor.includes('2') ? '3.0 Min' :
                           focusedResident.blokNomor.toLowerCase().includes('c') || focusedResident.blokNomor.includes('3') ? '2.0 Min' : '4.0 Min'}
                        </p>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-405 italic leading-snug mt-1 border-t pt-2 font-medium font-sans">
                      👣 "Keluar dari {focusedResident.blokNomor}, menyusuri gang rukun tetangga, lurus 80m lalu belok kanan ke arah Balai Sekretariat."
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center">
                  <p className="text-[11px] text-slate-400 font-semibold leading-relaxed">
                    Silakan cari nama warga atau tetangga di atas untuk menyoroti lokasi koordinat rumah serta rute pengantaran berkas.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
