import React, { useState } from 'react';
import { 
  FileText, Shield, HelpCircle, FilePlus, Landmark, 
  Check, Calendar, MapPin, Send, Trash2, ArrowUpRight, ChevronRight,
  Pencil, AlertTriangle, BookOpen, User, Phone, CheckSquare, Sparkles, Clock
} from 'lucide-react';
import { LetterRequest, ResidentProfile } from '../types';
import { JENIS_SURAT_LIST } from '../mockData';

interface WargaDashboardProps {
  resident: ResidentProfile;
  letters: LetterRequest[];
  onSubmitLetter: (jenisSurat: string, keperluan: string, isDraft?: boolean, existingId?: string | null) => void;
  onDeleteRequest: (id: string) => void;
}

export function WargaDashboard({ 
  resident, 
  letters, 
  onSubmitLetter, 
  onDeleteRequest 
}: WargaDashboardProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'buat-surat' | 'profil' | 'bantuan'>('status');
  
  // New Letter drafting/filing state
  const [jenisSurat, setJenisSurat] = useState(JENIS_SURAT_LIST[0]);
  const [keperluan, setKeperluan] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [successAction, setSuccessAction] = useState<'submit' | 'draft'>('submit');

  // Track draft active editing
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);

  // Filter letters belonging to this resident
  const myLetters = letters.filter((l) => l.nik === resident.nik);
  const draftLetters = myLetters.filter((l) => l.status === 'draft');
  const officialLetters = myLetters.filter((l) => l.status !== 'draft');

  // Handle new letter or draft saving
  const handleFormAction = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault();
    if (!keperluan.trim()) return;

    onSubmitLetter(jenisSurat, keperluan, isDraft, editingDraftId);
    
    // Clear states
    setKeperluan('');
    setEditingDraftId(null);
    setSuccessAction(isDraft ? 'draft' : 'submit');
    setSuccessMsg(true);
    setActiveTab('status');
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  // Re-open/edit a draft
  const handleEditDraft = (draft: LetterRequest) => {
    setJenisSurat(draft.jenisSurat);
    setKeperluan(draft.keperluan);
    setEditingDraftId(draft.id);
    setActiveTab('buat-surat');
  };

  // One-click submit a draft directly from lists
  const handlePromoteDraft = (draftId: string, jenis: string, kep: string) => {
    onSubmitLetter(jenis, kep, false, draftId);
    setSuccessAction('submit');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'disetujui': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'ditolak': return 'text-red-700 bg-red-50 border-red-200';
      case 'draft': return 'text-slate-700 bg-slate-100 border-slate-300';
      default: return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  const getStatusLabelLocally = (status: string) => {
    switch (status) {
      case 'disetujui': return 'Resmi Terbit';
      case 'ditolak': return 'Ditolak/Revisi';
      case 'draft': return 'Draf Mandiri';
      default: return 'Mengantre Review';
    }
  };

  // Neighborhood Board Mock Data for Warga Status Dashboard
  const announcements = [
    { id: 1, date: '06 Juni 2026', title: 'Kerja Bakti Rutin Minggu Depan', content: 'Diimbau semua kepala keluarga untuk merapat di balai RT pukul 07:00 pagi dalam agenda pembersihan saluran air menghadapi musim hujan.', type: 'penting' },
    { id: 2, date: '01 Juni 2026', title: 'Iuran Sampah & Keamanan Terbuka', content: 'Iuran bulan Juni telah dibuka, pembayaran dapat dikoordinasikan langsung ke bendahara RT 60 atau via transfer e-Wallet.', type: 'info' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Panel with resident branding */}
      <div className="bg-gradient-to-r from-[#00288e] to-blue-900 rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
        ></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#9cb3ff] border border-white/10">Portal Mandiri Warga RT 60</span>
            <h2 className="text-3xl font-extrabold tracking-tight">Halo, {resident.nama}!</h2>
            <p className="text-blue-100 text-xs leading-relaxed max-w-lg">Pantau antrean, ajukan draf surat kepengurusan resmi kelurahan pendaftaran diri, atau simpan draf pengajuan Anda kapan saja.</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => {
                setEditingDraftId(null);
                setKeperluan('');
                setActiveTab('buat-surat');
              }}
              className="px-5 py-3 bg-white hover:bg-blue-50 text-[#00288e] transition-all font-bold rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <FilePlus size={16} /> Buat Permohonan Baru
            </button>
          </div>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-lg flex items-center gap-3 border border-emerald-500 font-semibold animate-fade-in text-xs transition-all">
          <Check size={18} />
          <span>
            {successAction === 'submit' 
              ? 'Permohonan surat resmi Anda berhasil dikirim ke antrean pelayanan Ketua RT!' 
              : 'Draf dokumen berhasil disimpan sementara dalam memori lokal draf Anda.'}
          </span>
        </div>
      )}

      {/* Tabs Menu in Warga dashboard */}
      <div className="flex border-b border-indigo-50 leading-none">
        <button
          onClick={() => setActiveTab('status')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'status' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText size={16} /> Halaman Status & Pengajuan ({officialLetters.length + draftLetters.length})
        </button>
        <button
          onClick={() => {
            setEditingDraftId(null);
            setActiveTab('buat-surat');
          }}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'buat-surat' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FilePlus size={16} /> {editingDraftId ? 'Edit Draf Surat' : 'Form Permohonan Surat'}
        </button>
        <button
          onClick={() => setActiveTab('bantuan')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'bantuan' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle size={16} /> Pusat Bantuan RT
        </button>
      </div>

      {/* TAB SWITCHINGS */}
      {activeTab === 'status' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Timeline and drafts on Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. DRAFTS SECTION (IF ANY EXISTS) */}
            {draftLetters.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-50 border p-3 px-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#00288e]" />
                    <h3 className="text-sm font-bold text-slate-800">Draf Permohonan Anda ({draftLetters.length})</h3>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Local Draft Mode</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draftLetters.map((draft) => (
                    <div key={draft.id} className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-5 hover:border-blue-400 transition-colors flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold font-mono text-slate-500 uppercase">Draf • {draft.id}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{draft.tanggalPengajuan}</span>
                        </div>
                        <h4 className="text-xs font-black text-slate-900 leading-normal">{draft.jenisSurat}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 italic leading-relaxed">"{draft.keperluan}"</p>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handlePromoteDraft(draft.id, draft.jenisSurat, draft.keperluan)}
                          className="flex-1 py-1 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-sm text-[10px] flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <Send size={10} /> Kirim Resmi
                        </button>
                        <button
                          onClick={() => handleEditDraft(draft)}
                          className="py-1 px-2 bg-blue-50 text-[#00288e] hover:bg-blue-100 font-bold rounded text-[10px] flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <Pencil size={10} /> Edit
                        </button>
                        <button
                          onClick={() => onDeleteRequest(draft.id)}
                          className="py-1 px-2 bg-red-50 text-red-650 hover:bg-red-100 font-bold rounded text-[10px] flex items-center justify-center cursor-pointer"
                          title="Hapus draf"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. OFFICIAL LETTER QUEUES AND STATUSES */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-2">Pelacakan Antrean Surat Resmi</h3>
              
              {officialLetters.length > 0 ? (
                <div className="space-y-6">
                  {officialLetters.map((l) => (
                    <div key={l.id} className="bg-white border rounded-2xl shadow-sm overflow-hidden">
                      {/* Collapsed top description banner */}
                      <div className="p-5 border-b border-indigo-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/40">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono tracking-wider bg-indigo-50 text-[#00288e] px-2 py-0.5 rounded border border-indigo-100 font-bold">{l.id}</span>
                            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Calendar size={12} /> {l.tanggalPengajuan}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-905 mt-1">{l.jenisSurat}</h4>
                          <p className="text-xs text-slate-500 leading-normal mt-0.5">Keperluan: <span className="font-medium text-slate-600 italic">"{l.keperluan}"</span></p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(l.status)}`}>
                            {getStatusLabelLocally(l.status)}
                          </span>
                          {l.status === 'pending' && (
                            <button 
                              onClick={() => onDeleteRequest(l.id)}
                              className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors cursor-pointer"
                              title="Batalkan pengajuan"
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
                              <p className="text-xs font-bold text-slate-800">Berkas Dikirim</p>
                              <p className="text-[10px] text-slate-400">{l.tanggalPengajuan}</p>
                            </div>
                          </div>

                          {/* Step 2: Verification */}
                          <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                              l.status === 'disetujui' ? 'bg-emerald-600 text-white border-emerald-300' : l.status === 'ditolak' ? 'bg-red-100 text-red-705 border-red-300' : 'bg-amber-500 text-white border-amber-300'
                            }`}>
                              {l.status === 'disetujui' ? <Check size={14} /> : l.status === 'ditolak' ? '✕' : <Clock size={12} className="animate-spin-slow" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">Review Pengurus</p>
                              <p className="text-[10px] text-slate-500 font-medium">
                                {l.status === 'disetujui' ? 'Pencocokan OK' : l.status === 'ditolak' ? 'Penolakan' : 'Proses Verifikasi'}
                              </p>
                            </div>
                          </div>

                          {/* Step 3: Signature Stamp */}
                          <div className="flex md:flex-col items-center gap-3 text-center md:items-center relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                              l.status === 'disetujui' ? 'bg-emerald-600 text-white border-emerald-300' : 'bg-slate-100 text-slate-400'
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
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                              l.status === 'disetujui' ? 'bg-[#00288e] text-white animate-pulse' : 'bg-slate-100 text-slate-400'
                            }`}>
                              {l.status === 'disetujui' ? <Check size={14} /> : '•'}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">Status Berkas</p>
                              <p className="text-[10px] text-slate-500 font-bold">
                                {l.status === 'disetujui' ? 'Dokumen Terbit' : 'Dalam Proses'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {l.status === 'ditolak' && l.catatanPenolakan && (
                          <div className="mt-5 p-4 bg-red-50 border border-red-150 rounded-xl flex items-start gap-3">
                            <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="p-1 px-1.5 bg-red-100 rounded text-red-700 text-[9px] font-bold uppercase shrink-0 leading-none">Catatan Revisi Ketua RT</span>
                              <p className="text-xs text-red-700 italic font-medium mt-1">"{l.catatanPenolakan}"</p>
                            </div>
                          </div>
                        )}

                        {l.status === 'disetujui' && l.nomorSurat && (
                          <div className="mt-5 p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex flex-wrap justify-between items-center gap-4">
                            <div>
                              <span className="p-1 px-1.5 bg-emerald-100 text-emerald-800 rounded text-[9px] font-bold uppercase tracking-wider">No Surat Resmi</span>
                              <p className="text-xs tracking-wide font-mono font-bold text-emerald-900 mt-1">{l.nomorSurat}</p>
                            </div>
                            <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                              <CheckSquare size={13} /> Dokumen Siap Diambil di Sekretariat RT
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border p-10 text-center rounded-2xl">
                  <p className="text-xs text-slate-505 font-semibold">Anda belum memiliki permohonan surat aktif yang sedang diproses.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Advanced Warga Status Widgets & Notice Boards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Warga Status Indicators Dashboard */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5">
              <div>
                <dt className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles size={11} className="text-amber-500" /> Profil Status Warga
                </dt>
                <h4 className="text-md font-bold text-slate-850 mt-1">Status Kependudukan Resmi</h4>
              </div>

              {/* Status items checkboxes check lists */}
              <div className="space-y-4 pt-1 font-medium text-xs text-slate-600">
                <div className="flex justify-between items-center pb-2.5 border-b">
                  <span>Nama Lengkap:</span>
                  <span className="font-bold text-slate-900 uppercase">{resident.nama}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b">
                  <span>NIK KTP 16-Digit:</span>
                  <span className="font-mono text-slate-800">{resident.nik}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b">
                  <span>Blok Pilihan:</span>
                  <span className="font-bold text-[#00288e]">{resident.blokNomor || 'Blok Utama'}</span>
                </div>
                <div className="flex justify-between items-center pb-2.5 border-b">
                  <span>Onboarding Data:</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    resident.progressOnboarding === 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-[#00288e]'
                  }`}>{resident.progressOnboarding}% Lengkap</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Iuran Kebersihan RT:</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded">LUNAS JUNI</span>
                </div>
              </div>
            </div>

            {/* Notice Board */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider pb-1.5 border-b flex items-center gap-1.5">
                <BookOpen size={16} className="text-[#00288e]" /> Papan Pengumuman RT 60
              </h3>

              <div className="space-y-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="text-xs leading-relaxed space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                      <span>{ann.date}</span>
                      <span className={`px-1.5 py-0.5 rounded capitalize ${
                        ann.type === 'penting' ? 'bg-red-50 text-red-600 border' : 'bg-slate-50 text-slate-500 border'
                      }`}>{ann.type}</span>
                    </div>
                    <h5 className="font-bold text-slate-900">{ann.title}</h5>
                    <p className="text-slate-500">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Forms view for permohonan / draft */}
      {activeTab === 'buat-surat' && (
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {editingDraftId ? 'Perbarui Draf Permohonan Anda' : 'Formulir Pengajuan Surat Pengantar'}
              </h3>
              {editingDraftId && (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold rounded uppercase">
                  Mengedit Draf: {editingDraftId}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Lengkapi form pelayanan dan alasan pengurusan sejelas mungkin untuk memperlancar verifikasi RT.</p>
          </div>

          <form onSubmit={(e) => handleFormAction(e, false)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Tipe Pelayanan Surat Resmi</label>
              <select
                value={jenisSurat}
                onChange={(e) => setJenisSurat(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-slate-900 bg-white text-[14px] font-semibold"
              >
                {JENIS_SURAT_LIST.map((tipe, idx) => (
                  <option key={idx} value={tipe}>{tipe}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-705">Tulis Alasan Keperluan Secara Detail</label>
              <textarea
                value={keperluan}
                onChange={(e) => setKeperluan(e.target.value)}
                rows={4}
                required
                placeholder="Contoh: Digunakan sebagai syarat pembuatan SKCK baru untuk pendaftaran rekrutmen staff administrasi Kelurahan Kebonagung."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-[13px] text-slate-900 placeholder:text-slate-400 leading-relaxed"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => handleFormAction(e, true)}
                className="flex-1 py-3 border border-slate-200 bg-white text-slate-700 font-bold rounded-xl shadow-sm text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer"
              >
                Simpan Sebagai Draf
              </button>

              <button
                type="submit"
                className="flex-1 py-3 bg-[#00288e] hover:bg-blue-900 text-white font-bold rounded-xl shadow-md text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send size={13} /> {editingDraftId ? 'Kirim Pembaruan Resmi' : 'Kirim Pengajuan Resmi'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Help service information items */}
      {activeTab === 'bantuan' && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-md font-bold text-[#00288e]">Informasi Jam Pelayanan RT 60</h3>
            <p className="text-xs text-slate-500">Masa respon di SILAS rata-rata berkisar kurang dari 24 jam.</p>
          </div>

          <div className="space-y-4 pt-1 font-medium text-xs leading-relaxed">
            <div className="p-4 bg-slate-50 border rounded-xl flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] shrink-0 mt-2"></span>
              <p className="text-slate-700">Senin - Jumat: Jam 18:00 - 21:00 WIB (Sertifikasi/Cap Ketua RT sepulang jam kerja)</p>
            </div>
            <div className="p-4 bg-slate-50 border rounded-xl flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00288e] shrink-0 mt-2"></span>
              <p className="text-slate-700 font-semibold">Sabtu - Minggu: Jam 09:00 - 15:00 WIB (Bebas Janji Layanan Sekretariat)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
