import React, { useState } from 'react';
import { 
  Home, User, Plus, Trash2, Edit, ChevronDown, ChevronRight, 
  MapPin, Search, Grid, Users, CreditCard, Sparkles, Check, ArrowRight, X, Eye, Info
} from 'lucide-react';
import { ResidentProfile } from '../types';

interface DataKeluargaComponentProps {
  residents: ResidentProfile[];
  onAddResident: (newResident: ResidentProfile) => void;
  onUpdateResident: (updatedResident: ResidentProfile) => void;
  onDeleteResident: (nik: string) => void;
  addLog: (category: 'letter' | 'resident' | 'auth' | 'system', text: string) => void;
}

export function DataKeluargaComponent({
  residents,
  onAddResident,
  onUpdateResident,
  onDeleteResident,
  addLog
}: DataKeluargaComponentProps) {
  const [activeSubView, setActiveSubView] = useState<'warga' | 'kk'>('warga');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<string>('semua');
  const [focusedCitizenKtp, setFocusedCitizenKtp] = useState<string | null>(null);
  const [expandedKk, setExpandedKk] = useState<Record<string, boolean>>({
    '3273010908070001': true // Expand first one by default
  });

  // Modal / Form states for adding kid/spouse under a KK
  const [targetKkNo, setTargetKkNo] = useState<string | null>(null);
  const [targetBlock, setTargetBlock] = useState<string>('');
  const [newMemberForm, setNewMemberForm] = useState({
    nik: '',
    nama: '',
    tempatLahir: 'Pekalongan',
    tanggalLahir: '2005-01-01',
    jenisKelamin: 'Laki-laki' as ResidentProfile['jenisKelamin'],
    agama: 'Islam',
    pekerjaan: 'Pelajar',
    statusKawin: 'Belum Kawin',
    alamatKtp: '',
    noHp: '',
    kkRole: 'Anak' as ResidentProfile['kkRole']
  });

  // Unique Blocks present in residents list (e.g. A, B, C, I)
  const extractBlockLetter = (blockLabel: string) => {
    // e.g., "Blok I No. 12A" -> "Blok I"
    if (!blockLabel) return 'Lainnya';
    const split = blockLabel.split('No.');
    return split[0].trim();
  };

  const blocksList = Array.from(new Set(residents.map(r => extractBlockLetter(r.blokNomor)))).filter(Boolean);

  // Group residents by `kkNo` inside of families. Ensure residents with no kkNo get lumped nicely or assigned one
  // Grouping matches structure
  const kkGroups: Record<string, ResidentProfile[]> = {};
  residents.forEach(r => {
    const kk = r.kkNo || 'TANPA-KK-' + r.nik;
    if (!kkGroups[kk]) kkGroups[kk] = [];
    kkGroups[kk].push(r);
  });

  // Filter groups
  const filteredKkNumbers = Object.keys(kkGroups).filter(kkNo => {
    const members = kkGroups[kkNo];
    const head = members.find(m => m.kkRole === 'Kepala Keluarga') || members[0];
    
    // Search match NIK, Name or KK Number
    const matchesSearch = head.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          head.nik.includes(searchTerm) || 
                          kkNo.includes(searchTerm) ||
                          members.some(m => m.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Block match
    const primaryBlock = extractBlockLetter(head.blokNomor);
    const matchesBlock = selectedBlock === 'semua' || primaryBlock === selectedBlock;

    return matchesSearch && matchesBlock;
  });

  const toggleKkExpand = (kkNo: string) => {
    setExpandedKk(prev => ({
      ...prev,
      [kkNo]: !prev[kkNo]
    }));
  };

  // Save new member
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.nik || !newMemberForm.nama) {
      alert('Mohon isi NIK dan nama lengkap anggota keluarga baru.');
      return;
    }
    if (!targetKkNo) return;

    const newCitizen: ResidentProfile = {
      ...newMemberForm,
      blokNomor: targetBlock,
      kkNo: targetKkNo,
      alamatKtp: `Jl. Perumahan RT 60/RW 14, Pekalongan`,
      progressOnboarding: 100,
      statusWarga: 'aktif'
    };

    onAddResident(newCitizen);
    addLog('resident', `Anggota keluarga baru ${newCitizen.nama} (${newCitizen.kkRole}) terdaftar di KK ID: ${targetKkNo} alamat ${targetBlock}`);
    
    // Reset Form
    setTargetKkNo(null);
    setNewMemberForm({
      nik: '',
      nama: '',
      tempatLahir: 'Pekalongan',
      tanggalLahir: '2005-01-01',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pekerjaan: 'Pelajar',
      statusKawin: 'Belum Kawin',
      alamatKtp: '',
      noHp: '',
      kkRole: 'Anak'
    });
  };

  const bgStyle = "bg-white border text-xs text-slate-800 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#00288e] outline-none font-medium";

  return (
    <div className="space-y-6">
      
      {/* Page Title with Tabs Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users size={22} className="text-[#00288e]" /> Data Induk Kependudukan (Warga & KK)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Portal kependudukan terpadu. Kelola biodata warga kependudukan resmi, berkas identitas KTP, dan bagan silsilah keluarga (KK).
          </p>
        </div>

        <div className="flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200 self-start md:self-center shrink-0">
          <button
            onClick={() => {
              setActiveSubView('warga');
              addLog('system', 'Ketua RT meninjau portal daftar penduduk terpadu rukun tetangga.');
            }}
            type="button"
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubView === 'warga'
                ? 'bg-white text-[#00288e] shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users size={14} /> Daftar Seluruh Warga
          </button>
          <button
            onClick={() => {
              setActiveSubView('kk');
              addLog('system', 'Ketua RT meninjau silsilah kartu keluarga terdaftar.');
            }}
            type="button"
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubView === 'kk'
                ? 'bg-white text-[#00288e] shadow-sm font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home size={14} /> Silsilah Keluarga (KK)
          </button>
        </div>
      </div>

      {/* Top Stats Cards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <dt className="text-xs font-bold text-indigo-500 uppercase tracking-wider font-bold">Total Kepala Keluarga (KK)</dt>
            <dd className="text-2xl font-black text-[#00288e] mt-1">{Object.keys(kkGroups).length} KK Terdaftar</dd>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Tercatat dalam memori kependudukan.</p>
          </div>
          <div className="p-3 bg-blue-100 text-[#00288e] rounded-xl"><Home size={22} /></div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <dt className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-semibold">Total Jiwa Penduduk</dt>
            <dd className="text-2xl font-black text-emerald-800 mt-1">
              {residents.length} Jiwa Terdaftar
            </dd>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Seluruh warga resmi di wewenang RT 60.</p>
          </div>
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl"><Users size={22} /></div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div>
            <dt className="text-xs font-bold text-purple-500 uppercase tracking-wider font-semibold">Rasio Anggota Keluarga</dt>
            <dd className="text-2xl font-black text-purple-800 mt-1">
              {residents.filter(r => r.kkRole && r.kkRole !== 'Kepala Keluarga').length} Jiwa Anggota
            </dd>
            <p className="text-[10px] text-slate-400 mt-1 font-semibold">Istri, anak, serta kerabat sekamar.</p>
          </div>
          <div className="p-3 bg-purple-100 text-purple-700 rounded-xl"><Users size={12} className="hidden" /><Home size={22} /></div>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white border text-xs text-slate-800 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder={activeSubView === 'warga' ? "Cari nama warga, NIK..." : "Cari kepala keluarga / No KK..."} 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#00288e] text-xs font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap text-[10px]">Filter Blok:</span>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => setSelectedBlock('semua')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                selectedBlock === 'semua' ? 'bg-[#00288e] text-white border-[#00288e]' : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Semua Blok
            </button>
            {blocksList.map((bl) => (
              <button
                key={bl}
                onClick={() => setSelectedBlock(bl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedBlock === bl ? 'bg-[#00288e] text-white border-[#00288e]' : 'bg-slate-50 text-slate-505 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {bl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeSubView === 'warga' ? (
        /* TAB 1: INDIVIDUAL CITIZENS DIRECTORY TABLE WITH KTP PREVIEW */
        <div className="space-y-4">
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-medium">
                <thead>
                  <tr className="bg-slate-50 border-b text-slate-400 font-bold uppercase tracking-wider text-[10px] border-slate-200">
                    <th className="p-4 pl-6">Nama Lengkap</th>
                    <th className="p-4">16-Digit NIK</th>
                    <th className="p-4">Blok & No. Rumah</th>
                    <th className="p-4">Peran KK / No. KK</th>
                    <th className="p-4">Pekerjaan</th>
                    <th className="p-4">No. WhatsApp</th>
                    <th className="p-4 text-right pr-6">Berkas KTP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {residents.filter(r => {
                    const matchesSearch = r.nama.toLowerCase().includes(searchTerm.toLowerCase()) || r.nik.includes(searchTerm);
                    const blockLetter = extractBlockLetter(r.blokNomor);
                    const matchesBlock = selectedBlock === 'semua' || blockLetter === selectedBlock;
                    return matchesSearch && matchesBlock;
                  }).map((r) => (
                    <tr key={r.nik} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 pl-6 font-bold text-slate-900 uppercase flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-[#00288e] font-black text-[11px] flex items-center justify-center border border-blue-105 shrink-0">
                          {r.nama.charAt(0)}
                        </div>
                        <div className="truncate max-w-[180px]">
                          <p className="font-bold text-slate-800">{r.nama}</p>
                          <span className="text-[9.5px] text-slate-400 font-semibold uppercase leading-none">progress: {r.progressOnboarding || 0}%</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-semibold text-slate-600 tracking-wide">{r.nik}</td>
                      <td className="p-4 font-bold text-emerald-700">{r.blokNomor || '[Belum Mengisi]'}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded text-[9.5px] font-bold">
                          {r.kkRole || 'Anggota'}
                        </span>
                        <p className="text-[9.5px] text-slate-400 font-mono font-bold mt-0.5">{r.kkNo ? `KK: ${r.kkNo}` : 'Tanpa KK'}</p>
                      </td>
                      <td className="p-4 font-semibold text-slate-600">{r.pekerjaan || '[Belum Mengisi]'}</td>
                      <td className="p-4 font-mono text-slate-500">
                        {r.noHp ? `+62 ${r.noHp}` : '[Belum Mengisi]'}
                      </td>
                      <td className="p-4 text-right pr-6">
                        {r.ktpUrl ? (
                          <button 
                            onClick={() => setFocusedCitizenKtp(r.ktpUrl || null)}
                            type="button"
                            className="px-2.5 py-1 bg-blue-50 text-[#00288e] font-bold text-[10px] rounded hover:bg-blue-100 transition-colors inline-flex items-center gap-1 cursor-pointer border border-blue-200"
                          >
                            <Eye size={12} /> Lihat KTP
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[10px] italic">Tiada Berkas</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {residents.filter(r => {
                    const matchesSearch = r.nama.toLowerCase().includes(searchTerm.toLowerCase()) || r.nik.includes(searchTerm);
                    const blockLetter = extractBlockLetter(r.blokNomor);
                    const matchesBlock = selectedBlock === 'semua' || blockLetter === selectedBlock;
                    return matchesSearch && matchesBlock;
                  }).length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-slate-400 font-semibold">Tidak ada warga terdaftar dengan kriteria penyaringan di atas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* TAB 2: HOUSEHOLD GROUPS (KK ACCORDION LISTS) */
        <div className="space-y-4">
        {filteredKkNumbers.length > 0 ? (
          filteredKkNumbers.map((kkNo) => {
            const members = kkGroups[kkNo];
            const kepalaKeluarga = members.find(m => m.kkRole === 'Kepala Keluarga') || members[0];
            const hasKKCard = !kkNo.startsWith('TANPA-KK-');
            const isExpanded = !!expandedKk[kkNo];

            return (
              <div key={kkNo} className="bg-white border rounded-2xl shadow-sm overflow-hidden border-slate-200">
                
                {/* Accordion Header */}
                <div 
                  onClick={() => toggleKkExpand(kkNo)}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/40 cursor-pointer select-none transition-colors hover:bg-slate-50 border-b border-indigo-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#00288e] rounded-xl shrink-0 border border-blue-100 mt-0.5">
                      <Home size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide">Kel. {kepalaKeluarga?.nama}</h4>
                        <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold rounded-lg font-mono tracking-wide">
                          📍 {kepalaKeluarga?.blokNomor}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-semibold font-mono">
                        <span className="flex items-center gap-1"><CreditCard size={12} /> KK: {hasKKCard ? kkNo : 'Dokumen Kertas Hilang / Belum Input'}</span>
                        <span>•</span>
                        <span className="text-slate-550 font-sans">{members.length} Jiwa dalam rumah</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTargetKkNo(kkNo);
                        setTargetBlock(kepalaKeluarga.blokNomor);
                      }}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-[#00288e] font-bold rounded text-[10.5px] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={13} /> Silsilah Keluarga
                    </button>
                    {isExpanded ? <ChevronDown size={18} className="text-slate-400" /> : <ChevronRight size={18} className="text-slate-400" />}
                  </div>
                </div>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="p-6 space-y-6">
                    <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                      
                      {/* Family members tree items */}
                      {members.map((member) => {
                        const isHead = member.kkRole === 'Kepala Keluarga';
                        return (
                          <div key={member.nik} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border border-slate-100 shadow-xs rounded-xl relative">
                            {/* Branch marker dot */}
                            <div className="absolute -left-[21px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-200 border-2 border-white rounded-full"></div>

                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg text-xs font-bold ${
                                isHead ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-650'
                              }`}>
                                <User size={15} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2.5">
                                  <span className="font-extrabold text-slate-850 capitalize text-[13px]">{member.nama}</span>
                                  <span className={`p-0.5 px-2 text-[9px] font-black uppercase rounded-full ${
                                    isHead ? 'bg-indigo-100 text-[#00288e]' : 'bg-slate-150 text-slate-600'
                                  }`}>{member.kkRole || 'Anggota'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-[10.5px] text-slate-400 font-mono mt-0.5 font-bold">
                                  <span>NIK: {member.nik}</span>
                                  <span>•</span>
                                  <span>HP: {member.noHp || '-'}</span>
                                  <span>•</span>
                                  <span>Lahir: {member.tempatLahir}, {member.tanggalLahir}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              {member.progressOnboarding < 100 && (
                                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[9px] font-bold uppercase rounded border border-amber-200">Onboarding: {member.progressOnboarding}%</span>
                              )}
                              <button
                                onClick={() => onDeleteResident(member.nik)}
                                className="p-1 px-2.5 hover:bg-red-50 text-red-500 rounded font-bold text-[10px] cursor-pointer"
                                title="Keluarkan warga"
                              >
                                <Trash2 size={13} /> Keluar KK
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white border p-12 text-center rounded-2xl shadow-xs">
            <p className="text-xs text-slate-450 font-semibold">Tidak ada kepala keluarga yang cocok dengan parameter kriteria filter saat ini.</p>
          </div>
        )}
        </div>
      )}

      {/* POPUP / MODAL INPUT NEW FAMILY UNDER SPECIFFIC KK */}
      {targetKkNo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <dt className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">Tambah Silsilah Keluarga</dt>
                <h3 className="text-md font-bold text-slate-900">Gabungkan Anggota Keluarga Baru</h3>
              </div>
              <button 
                onClick={() => setTargetKkNo(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="flex items-center gap-1 px-3 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-900 text-[10.5px] font-bold">
                <span>Dokumen Kartu Keluarga Sasaran: {targetKkNo} (📍 {targetBlock})</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Nama Lengkap Sesuai Akta</label>
                <input 
                  type="text" 
                  value={newMemberForm.nama}
                  onChange={e => setNewMemberForm({...newMemberForm, nama: e.target.value})}
                  required
                  placeholder="Contoh: Rian Hartono"
                  className={bgStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">16-Digit NIK KTP</label>
                  <input 
                    type="text" 
                    maxLength={16}
                    value={newMemberForm.nik}
                    onChange={e => setNewMemberForm({...newMemberForm, nik: e.target.value})}
                    required
                    placeholder="Contoh: 327301xxxxxxxxxx"
                    className={bgStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase font-bold text-[#00288e]">Hubungan Keluarga</label>
                  <select 
                    value={newMemberForm.kkRole}
                    onChange={e => setNewMemberForm({...newMemberForm, kkRole: e.target.value as ResidentProfile['kkRole']})}
                    className={bgStyle}
                  >
                    <option value="Istri">Istri</option>
                    <option value="Anak">Anak</option>
                    <option value="Lainnya">Lainnya / Kerabat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Tempat Lahir</label>
                  <input 
                    type="text" 
                    value={newMemberForm.tempatLahir}
                    onChange={e => setNewMemberForm({...newMemberForm, tempatLahir: e.target.value})}
                    className={bgStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    value={newMemberForm.tanggalLahir}
                    onChange={e => setNewMemberForm({...newMemberForm, tanggalLahir: e.target.value})}
                    className={bgStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Jenis Kelamin</label>
                  <select 
                    value={newMemberForm.jenisKelamin}
                    onChange={e => setNewMemberForm({...newMemberForm, jenisKelamin: e.target.value as ResidentProfile['jenisKelamin']})}
                    className={bgStyle}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Mata Pencaharian / Pekerjaan</label>
                  <input 
                    type="text" 
                    value={newMemberForm.pekerjaan}
                    onChange={e => setNewMemberForm({...newMemberForm, pekerjaan: e.target.value})}
                    className={bgStyle}
                  />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setTargetKkNo(null)}
                  className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Batalkan Form
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-800 to-[#00288e] hover:from-indigo-900 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1 cursor-pointer"
                >
                  Gabungkan Silsilah KK <ArrowRight size={13} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Citizen's KTP preview modal overlay */}
      {focusedCitizenKtp && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4" onClick={() => setFocusedCitizenKtp(null)}>
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-150 relative space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Salinan KTP Kependudukan</h4>
              <button onClick={() => setFocusedCitizenKtp(null)} className="text-slate-400 hover:text-slate-600 font-extrabold p-1 text-sm cursor-pointer">✕</button>
            </div>
            <div className="aspect-[1.58/1] rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-50">
              <img src={focusedCitizenKtp} alt="Citizen KTP preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-105 rounded-lg text-[11px] text-slate-500 leading-normal flex gap-2">
              <Info size={14} className="text-[#00288e] shrink-0 mt-0.5" />
              <span>Milik warga resmi RT 60 Pekalongan. Validasi database kependudukan resmi terenkripsi secara aman.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
