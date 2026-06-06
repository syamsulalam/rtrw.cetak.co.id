import React, { useState } from 'react';
import { 
  FileText, Shield, HelpCircle, FilePlus, Landmark, 
  Check, Calendar, MapPin, Send, Trash2, ArrowUpRight, HelpCircle as HelpIcon, ChevronRight
} from 'lucide-react';
import { LetterRequest, ResidentProfile } from '../types';
import { JENIS_SURAT_LIST } from '../mockData';

interface WargaDashboardProps {
  resident: ResidentProfile;
  letters: LetterRequest[];
  onSubmitLetter: (jenisSurat: string, keperluan: string) => void;
  onDeleteRequest: (id: string) => void;
}

export function WargaDashboard({ 
  resident, 
  letters, 
  onSubmitLetter, 
  onDeleteRequest 
}: WargaDashboardProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'buat-surat' | 'profil' | 'bantuan'>('status');
  
  // New Letter drafting state
  const [jenisSurat, setJenisSurat] = useState(JENIS_SURAT_LIST[0]);
  const [keperluan, setKeperluan] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Filter letters belonging to this resident
  const myLetters = letters.filter((l) => l.nik === resident.nik);

  // Handle new letter submit
  const handleNewRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keperluan.trim()) return;
    onSubmitLetter(jenisSurat, keperluan);
    setKeperluan('');
    setSuccessMsg(true);
    setActiveTab('status');
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disetujui': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'ditolak': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-amber-600 bg-amber-50 border-amber-200';
    }
  };

  const getStatusLabelLocally = (status: string) => {
    switch (status) {
      case 'disetujui': return 'Disetujui RT & Terbit';
      case 'ditolak': return 'Ditolak';
      default: return 'Mengantre Verifikasi';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Panel with resident branding */}
      <div className="bg-gradient-to-r from-[#00288e] to-blue-850 rounded-xl p-8 text-white shadow-md relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
        ></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-200 border border-white/10">Portal Mandiri Warga</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Halo, {resident.nama}!</h2>
            <p className="text-blue-100 text-sm leading-relaxed max-w-lg">Selamat datang di sistem SILAS RT 60. Di sini Anda dapat mengajukan surat pengantar resmi kelurahan secara mandiri.</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setActiveTab('buat-surat')}
              className="px-5 py-3 bg-white text-[#00288e] hover:bg-blue-50 transition-colors font-bold rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <FilePlus size={16} /> Buat Pengajuan Baru
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center gap-3 border border-emerald-500 font-semibold animate-fade-in text-sm">
          <Check size={18} />
          <span>Pengajuan surat Anda berhasil dikirim ke antrean Ketua RT 60!</span>
        </div>
      )}

      {/* Tabs Menu in Warga dashboard */}
      <div className="flex border-b border-indigo-50 leading-none">
        <button
          onClick={() => setActiveTab('status')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'status' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText size={16} /> Status Pengajuan Anda ({myLetters.length})
        </button>
        <button
          onClick={() => setActiveTab('buat-surat')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'buat-surat' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FilePlus size={16} /> Form Permohonan Surat
        </button>
        <button
          onClick={() => setActiveTab('bantuan')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'bantuan' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle size={16} /> Pusat Bantuan RT
        </button>
      </div>

      {/* TAB Content switches */}
      {activeTab === 'status' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Timeline tracing on Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-md font-bold text-slate-900 tracking-tight">Pelacakan Antrean Surat Realtime</h3>
            
            {myLetters.length > 0 ? (
              <div className="space-y-6">
                {myLetters.map((l) => (
                  <div key={l.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Collapsed top description banner */}
                    <div className="p-5 border-b border-indigo-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/40">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100/50 font-semibold">{l.id}</span>
                          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Calendar size={12} /> {l.tanggalPengajuan}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-905 mt-1">{l.jenisSurat}</h4>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(l.status)}`}>
                          {getStatusLabelLocally(l.status)}
                        </span>
                        {l.status === 'pending' && (
                          <button 
                            onClick={() => onDeleteRequest(l.id)}
                            className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Timeline Tracker Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                        {/* Connecting track horizontal line */}
                        <div className="absolute top-4 left-10 right-10 h-0.5 bg-slate-200 hidden md:block z-0"></div>

                        {/* Step 1: Draft Submitted */}
                        <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                          <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs"><Check size={14} /></div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Draft Dikirim</p>
                            <p className="text-[10px] text-slate-400">{l.tanggalPengajuan}</p>
                          </div>
                        </div>

                        {/* Step 2: Verification */}
                        <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            l.status === 'disetujui' ? 'bg-emerald-600 text-white' : l.status === 'ditolak' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-500 text-white'
                          }`}>
                            {l.status === 'disetujui' ? <Check size={14} /> : l.status === 'ditolak' ? '✕' : '•'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Pengecekan NIK</p>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {l.status === 'disetujui' ? 'Pencocokan OK' : l.status === 'ditolak' ? 'Ditolak' : 'Proses Verifikasi'}
                            </p>
                          </div>
                        </div>

                        {/* Step 3: Signature Stamp */}
                        <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            l.status === 'disetujui' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'
                          }`}>
                            {l.status === 'disetujui' ? <Check size={14} /> : '•'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">TTD & Cap Ketua RT</p>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {l.status === 'disetujui' ? 'Sertifikasi Valid' : 'Menunggu cap'}
                            </p>
                          </div>
                        </div>

                        {/* Step 4: Ready to Collect */}
                        <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                            l.status === 'disetujui' ? 'bg-[#00288e] text-white animate-pulse' : 'bg-slate-200 text-slate-400'
                          }`}>
                            {l.status === 'disetujui' ? <Check size={14} /> : '•'}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-800">Berkas Unduh</p>
                            <p className="text-[10px] text-slate-500 font-medium">
                              {l.status === 'disetujui' ? 'Siap Diambil/Simulasi' : 'Surat Terbit'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {l.status === 'ditolak' && l.catatanPenolakan && (
                        <div className="mt-5 p-4 bg-red-50 border border-red-155 rounded-xl flex items-start gap-3">
                          <span className="p-1 bg-red-100 rounded text-red-700 text-[10px] font-bold uppercase shrink-0">Catatan RT</span>
                          <p className="text-xs text-red-700 italic font-medium">"{l.catatanPenolakan}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 p-12 text-center rounded-2xl">
                <p className="text-sm text-slate-500 font-semibold">Anda belum pernah mengajukan surat pengantar.</p>
                <button 
                  onClick={() => setActiveTab('buat-surat')}
                  className="mt-4 px-4 py-2 bg-[#00288e] text-white rounded-lg text-xs font-bold hover:bg-blue-900 shadow"
                >
                  Ajukan Surat Pertama Anda
                </button>
              </div>
            )}
          </div>

          {/* Right Sektor info widgets */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest pb-1 border-b">Kartu Anggota Warga</h3>
              <div className="space-y-3.5 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Nama:</span>
                  <span className="font-bold text-slate-900 uppercase">{resident.nama}</span>
                </div>
                <div className="flex justify-between">
                  <span>NIK KTP:</span>
                  <span className="font-mono tracking-wider font-semibold text-slate-800">{resident.nik}</span>
                </div>
                <div className="flex justify-between">
                  <span>Blok Pilihan:</span>
                  <span className="font-bold text-emerald-700">{resident.blokNomor || 'Sektor Utama'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Keterangan Status:</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded">TERAKTIF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: New Letter Request application */}
      {activeTab === 'buat-surat' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Formulir Pengajuan Surat Pengantar</h3>
            <p className="text-xs text-slate-500 mt-0.5">Lengkapi tipe pelayanan dan alasan pengurusan sejelas mungkin untuk memperlancar verifikasi Ketua RT.</p>
          </div>

          <form onSubmit={handleNewRequest} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tipe Pelayanan Surat Resmi</label>
              <select
                value={jenisSurat}
                onChange={(e) => setJenisSurat(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-slate-900 bg-white text-[15px] font-semibold"
              >
                {JENIS_SURAT_LIST.map((tipe, idx) => (
                  <option key={idx} value={tipe}>{tipe}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tulis Alasan Alasan Keperluan Secara Detail</label>
              <textarea
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                rows={4}
                required
                placeholder="Contoh: Digunakan sebagai lampiran permohonan Kartu Keluarga baru di Kantor Catatan Sipil Pekalongan dikarenakan penamaan anak pertama."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-[14px] text-slate-900 placeholder:text-slate-400 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#00288e] hover:bg-blue-900 text-white font-bold rounded-xl shadow-md transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send size={14} /> Kirim Pengajuan Surat Pengantar
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: Bantuan RT panel lists */}
      {activeTab === 'bantuan' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-md font-bold text-indigo-950">Informasi Jam Pelayanan RT 60 / RW 14</h3>
            <p className="text-xs text-slate-500">Masa respon rata-rata di SILAS kurang dari 24 jam.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border rounded-xl flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] shrink-0 mt-2"></span>
              <p className="text-xs text-slate-700 leading-normal font-semibold">Senin - Jumat: Jam 18:00 - 21:00 WIB (Verifikasi Cepat karena Ketua RT pulang kerja)</p>
            </div>
            <div className="p-4 bg-slate-50 border rounded-xl flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] shrink-0 mt-2"></span>
              <p className="text-xs text-slate-700 leading-normal font-semibold">Sabtu - Minggu: Jam 09:00 - 15:00 WIB (Bebas Janji)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
