import React, { useState } from 'react';
import { 
  MapPin, Search, Plus, Trash2, Edit, Users, Shield, 
  FileText, Check, AlertCircle, Sparkles, Upload, 
  FileSpreadsheet, ArrowRight, X, Phone, Mail, Sliders, ChevronDown
} from 'lucide-react';
import { Officer, ResidentProfile, RuangPengurusSpace } from '../types';

interface RuangPengurusComponentProps {
  initialSpace: RuangPengurusSpace;
  initialOfficers: Officer[];
  residents: ResidentProfile[];
  onUpdateSpace: (updated: RuangPengurusSpace) => void;
  onUpdateOfficers: (updated: Officer[]) => void;
  onAddResidentBatch: (newResidents: ResidentProfile[]) => void;
  onApproveResident: (nik: string) => void;
  onRejectResident: (nik: string) => void;
  addLog: (category: 'letter' | 'resident' | 'auth' | 'system', text: string) => void;
}

export function RuangPengurusComponent({
  initialSpace,
  initialOfficers,
  residents,
  onUpdateSpace,
  onUpdateOfficers,
  onAddResidentBatch,
  onApproveResident,
  onRejectResident,
  addLog
}: RuangPengurusComponentProps) {
  const [activeTab, setActiveTab] = useState<'kepengurusan' | 'wilayah-map' | 'pendaftaran-bulk'>('kepengurusan');
  
  // States for Officers Management
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers);
  const [editingOfficerId, setEditingOfficerId] = useState<string | null>(null);
  const [officerForm, setOfficerForm] = useState({
    name: '',
    nik: '',
    role: 'Wakil RT' as Officer['role'],
    level: 'RT' as Officer['level'],
    rtNumber: '60',
    phone: '',
    email: ''
  });

  // State for Map Configuration
  const [space, setSpace] = useState<RuangPengurusSpace>(initialSpace);
  const [latInput, setLatInput] = useState(space.gmapCenter.lat.toString());
  const [lngInput, setLngInput] = useState(space.gmapCenter.lng.toString());
  const [centerLabel, setCenterLabel] = useState(space.gmapCenter.label);
  const [radiusMeters, setRadiusMeters] = useState(space.gmapRadiusMeters);

  // Bulk Import Clipboard Text State
  const [pasteData, setPasteData] = useState('');
  const [parsedPreview, setParsedPreview] = useState<any[]>([]);
  const [parseError, setParseError] = useState('');
  const [bulkImportSuccess, setBulkImportSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [kkAutoLinked, setKkAutoLinked] = useState(false);

  // Single Manual Citizen addition Form State
  const [newWargaForm, setNewWargaForm] = useState({
    nik: '',
    nama: '',
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki' as ResidentProfile['jenisKelamin'],
    agama: 'Islam',
    pekerjaan: 'Karyawan Swasta',
    statusKawin: 'Belum Kawin',
    alamatKtp: '',
    blokNomor: 'Blok I No. 12A',
    noHp: '',
    kkNo: '',
    kkRole: 'Anak' as ResidentProfile['kkRole']
  });

  // Automated KK linking effect for manual input
  React.useEffect(() => {
    if (newWargaForm.kkNo && newWargaForm.kkNo.length >= 8) {
      const match = residents.find(r => r.kkNo === newWargaForm.kkNo && r.blokNomor);
      if (match) {
        setNewWargaForm(prev => {
          if (prev.blokNomor !== match.blokNomor || prev.alamatKtp !== match.alamatKtp) {
            setKkAutoLinked(true);
            return {
              ...prev,
              blokNomor: match.blokNomor,
              alamatKtp: match.alamatKtp || prev.alamatKtp
            };
          }
          return prev;
        });
      } else {
        setKkAutoLinked(false);
      }
    } else {
      setKkAutoLinked(false);
    }
  }, [newWargaForm.kkNo, residents]);

  // Filter application residents (statusWarga !== 'aktif' or statusWarga === 'tertunda')
  const pendingApplications = residents.filter(r => r.statusWarga === 'tertunda');

  // Handle adding or updating an officer
  const handleSaveOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerForm.name || !officerForm.nik || !officerForm.phone) {
      alert('Mohon isi kolom Name, NIK, dan No HP pengurus.');
      return;
    }

    if (editingOfficerId) {
      // Update
      const updated = officers.map(o => o.id === editingOfficerId ? { 
        ...o, 
        name: officerForm.name,
        nik: officerForm.nik,
        role: officerForm.role,
        level: officerForm.level,
        rtNumber: officerForm.level === 'RT' ? officerForm.rtNumber : undefined,
        phone: officerForm.phone,
        email: officerForm.email || undefined
      } : o);
      setOfficers(updated);
      onUpdateOfficers(updated);
      addLog('system', `Pengurus Organisasi diperbarui: ${officerForm.name} (${officerForm.role})`);
      setEditingOfficerId(null);
    } else {
      // Createnew
      const newOfficer: Officer = {
        id: `OFF-${Math.floor(Math.random() * 90000) + 10000}`,
        name: officerForm.name,
        nik: officerForm.nik,
        role: officerForm.role,
        level: officerForm.level,
        rtNumber: officerForm.level === 'RT' ? officerForm.rtNumber : undefined,
        phone: officerForm.phone,
        email: officerForm.email || undefined
      };
      const updated = [...officers, newOfficer];
      setOfficers(updated);
      onUpdateOfficers(updated);
      addLog('system', `Pengurus Organisasi baru ditambahkan secara manual: ${officerForm.name} (${officerForm.role})`);
    }

    // Reset Form
    setOfficerForm({
      name: '',
      nik: '',
      role: 'Wakil RT',
      level: 'RT',
      rtNumber: '60',
      phone: '',
      email: ''
    });
  };

  const startEditOfficer = (o: Officer) => {
    setEditingOfficerId(o.id);
    setOfficerForm({
      name: o.name,
      nik: o.nik,
      role: o.role,
      level: o.level,
      rtNumber: o.rtNumber || '60',
      phone: o.phone,
      email: o.email || ''
    });
  };

  const handleDeleteOfficer = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${name} dari daftar organisasi keputusan?`)) {
      const updated = officers.filter(o => o.id !== id);
      setOfficers(updated);
      onUpdateOfficers(updated);
      addLog('system', `Petugas Kepengurusan dihapus: ${name}`);
    }
  };

  // Update territory configuration
  const handleUpdateTerritory = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLat = parseFloat(latInput);
    const parsedLng = parseFloat(lngInput);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      alert('Koordinat latitude/longitude tidak valid.');
      return;
    }

    const updatedSpace: RuangPengurusSpace = {
      ...space,
      gmapCenter: {
        lat: parsedLat,
        lng: parsedLng,
        label: centerLabel
      },
      gmapRadiusMeters: radiusMeters
    };
    setSpace(updatedSpace);
    onUpdateSpace(updatedSpace);
    addLog('system', `Peta wilayah & batas blanket kepengurusan RW ${space.rwNumber} diperbarui.`);
    alert('Batas Blanket Geo-Territorial berhasil dikonfigurasi & disinkronkan!');
  };

  // Bulk Clipboard Paste Parser
  const handleParsePaste = (customText?: string) => {
    setParseError('');
    const targetText = typeof customText === 'string' ? customText : pasteData;
    if (!targetText.trim()) {
      setParseError('Data teks kosong.');
      return;
    }

    try {
      const lines = targetText.trim().split('\n');
      const tempPreview: any[] = [];

      lines.forEach((line, idx) => {
        // support comma or tab separated
        const delimiter = line.includes('\t') ? '\t' : ',';
        const cols = line.split(delimiter).map(c => c.trim());

        if (cols.length < 2) return; // skip garbage lines

        // Expected format: NIK, Nama, BlokNomor, HubunganKK, NoHP, KKNo
        // e.g. 3273012300005511, Heri Prasetyo, Blok I No. 4, Kepala Keluarga, 0812999901, 3273010908079014
        const nik = cols[0] || '';
        const name = cols[1] || '';
        const block = cols[2] || '';
        const roleKK = (cols[3] || 'Anggota Keluarga') as ResidentProfile['kkRole'];
        const phone = cols[4] || '0812345001';
        const kkId = cols[5] || '';

        if (nik.length < 8 || !name) {
          throw new Error(`Baris ${idx + 1} tidak valid (Format harus: NIK, Nama, BlokNomor, PeranKK, NoHP, KK_Card_No)`);
        }

        // Automate KK linking: if block address is omitted, lookup matches!
        let finalBlock = block;
        let finalAlamat = 'Jl. Perumahan Kebonagung, Pekalongan';
        
        if (kkId) {
          const matchExisting = residents.find(r => r.kkNo === kkId && r.blokNomor);
          if (matchExisting) {
            finalBlock = matchExisting.blokNomor;
            finalAlamat = matchExisting.alamatKtp || finalAlamat;
          } else {
            const matchInBatch = tempPreview.find(p => p.kkNo === kkId && p.blokNomor);
            if (matchInBatch) {
              finalBlock = matchInBatch.blokNomor;
              finalAlamat = matchInBatch.alamatKtp || finalAlamat;
            }
          }
        }
        
        if (!finalBlock) {
          finalBlock = 'Blok I No. 12A'; // default fallback
        }

        tempPreview.push({
          nik,
          nama: name,
          tempatLahir: 'Pekalongan',
          tanggalLahir: '1990-01-01',
          jenisKelamin: 'Laki-laki',
          agama: 'Islam',
          pekerjaan: 'Karyawan Swasta',
          statusKawin: 'Kawin',
          alamatKtp: finalAlamat,
          blokNomor: finalBlock,
          noHp: phone,
          progressOnboarding: 100,
          kkNo: kkId || `327301010101${Math.floor(Math.random() * 9000) + 1000}`,
          kkRole: roleKK,
          statusWarga: 'aktif'
        });
      });

      if (tempPreview.length === 0) {
        setParseError('Tidak ada baris data yang cocok dengan format kependudukan.');
      } else {
        setParsedPreview(tempPreview);
        if (customText) {
          setPasteData(customText);
        }
      }
    } catch (err: any) {
      setParseError(err.message || 'Gagal mengurai teks data.');
    }
  };

  // Drag & Drop / File Upload Helpers
  const downloadCsvTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "NIK,Nama Lengkap,Nomor Blok,Hubungan Keluarga KK,No Telepon,Nomor KK\n"
      + "3273012300001234,Ahmad Fauzi,Blok I No. 12A,Kepala Keluarga,0812233441,3273010908070001\n"
      + "3273012300005678,Nuraini Rahmawati,Blok I No. 12A,Istri,0812233442,3273010908070001\n"
      + "3273012300003422,Rudi Hermawan,Blok II No. 4,Kepala Keluarga,0812233443,3273010908070005\n"
      + "3273012300009988,Siti Aminah,Blok II No. 4,Anak,0812233444,3273010908070005";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "template_bulk_warga.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readAndParseFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      readAndParseFile(e.target.files[0]);
    }
  };

  const readAndParseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        const text = event.target.result;
        let cleanText = text;
        if (text.toLowerCase().includes('nik') && text.toLowerCase().includes('nama')) {
          const lines = text.split('\n');
          cleanText = lines.slice(1).join('\n');
        }
        handleParsePaste(cleanText);
      }
    };
    reader.readAsText(file);
  };

  const handleCommitBulk = () => {
    if (parsedPreview.length === 0) return;
    onAddResidentBatch(parsedPreview);
    addLog('resident', `Import Data Massal: ${parsedPreview.length} warga baru didaftarkan secara kolektif.`);
    setBulkImportSuccess(`${parsedPreview.length} warga baru berhasil didaftarkan secara kolektif!`);
    setPasteData('');
    setParsedPreview([]);
    setTimeout(() => setBulkImportSuccess(''), 5000);
  };

  // Manual citizen addition saving
  const handleSaveManualWarga = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWargaForm.nik || !newWargaForm.nama) {
      alert('Mohon lengkapi NIK dan Nama lengkap warga baru.');
      return;
    }

    const newCitizen: ResidentProfile = {
      ...newWargaForm,
      progressOnboarding: 100,
      statusWarga: 'aktif'
    };

    onAddResidentBatch([newCitizen]);
    addLog('resident', `Warga baru ${newCitizen.nama} didaftarkan secara manual oleh pengurus.`);
    alert(`Warga ${newCitizen.nama} berhasil dimasukkan ke pangkalan data kependudukan.`);
    setNewWargaForm({
      nik: '',
      nama: '',
      tempatLahir: '',
      tanggalLahir: '',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pekerjaan: 'Karyawan Swasta',
      statusKawin: 'Belum Kawin',
      alamatKtp: '',
      blokNomor: 'Blok I No. 12A',
      noHp: '',
      kkNo: '',
      kkRole: 'Anak'
    });
  };

  const bgStyle = "bg-white border text-xs text-slate-800 rounded-xl px-4 py-2.5 w-full focus:ring-2 focus:ring-[#00288e] outline-none font-medium";

  return (
    <div className="space-y-8">
      {/* HEADER BANNER */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden shadow-sm">
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}
        ></div>
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600/30 text-blue-300 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-blue-500/20">Kamar Pengurus Terpadu</span>
            <span className="text-[10px] bg-slate-800 border border-slate-700 font-mono text-slate-400 px-2 py-0.5 rounded">ID: {space.id}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">{space.name}</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pusat koordinasi terpadu pimpinan Rukun Warga {space.rwNumber} beserta jajaran Rukun Tetangga di bawah naungannya. 
            Kelola data penugasan, sesuaikan cakupan wilayah kerja, serta verifikasi pengajuan pendaftaran warga baru dengan lancar.
          </p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-indigo-50 leading-none">
        <button
          onClick={() => setActiveTab('kepengurusan')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'kepengurusan' ? 'border-[#00288e] text-[#00288e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield size={16} /> Struktur Organisasi & Petugas ({officers.length})
        </button>
        <button
          onClick={() => setActiveTab('wilayah-map')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'wilayah-map' ? 'border-[#00288e] text-[#00288e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin size={16} /> Cakupan Geo-Territorial & Map
        </button>
        <button
          onClick={() => setActiveTab('pendaftaran-bulk')}
          className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 cursor-pointer relative ${
            activeTab === 'pendaftaran-bulk' ? 'border-[#00288e] text-[#00288e]' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users size={16} /> Pendaftaran & Bulk Import
          {pendingApplications.length > 0 && (
            <span className="absolute top-1.5 right-1 px-1.5 py-0.5 bg-red-500 text-white font-mono text-[9px] font-bold rounded-full scale-90">
              {pendingApplications.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB CONTENTS */}
      {activeTab === 'kepengurusan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Organogram List Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Jajaran Dewan Kepengurusan RW {space.rwNumber}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Beban kerja terbagi dalam kepengurusan tingkat RW dan sektor RT dibawahnya.</p>
              </div>
            </div>

            {/* LEVEL RW SECTION */}
            <div className="space-y-4">
              <div className="px-3 py-1 bg-yellow-50 text-amber-800 border border-yellow-200 text-[10px] font-bold uppercase tracking-wider rounded-lg w-fit">
                Tingkat Rukun Warga (RW {space.rwNumber})
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officers.filter(o => o.level === 'RW').map((o) => (
                  <div key={o.id} className="bg-white border rounded-xl p-5 hover:shadow-sm transition-all relative flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-blue-50 text-[#00288e] font-bold text-[9px] rounded-lg border border-blue-100">{o.role}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEditOfficer(o)}
                            className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors cursor-pointer"
                            title="Edit data"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteOfficer(o.id, o.name)}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                            title="Hapus pengurus"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">{o.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">NIK: {o.nik}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-medium font-mono">
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400 shrink-0" />
                        <span>+{o.phone}</span>
                      </div>
                      {o.email && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate">{o.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LEVEL RT SECTION */}
            <div className="space-y-4 pt-4">
              <div className="px-3 py-1 bg-blue-50 text-blue-900 border border-blue-100 text-[10px] font-bold uppercase tracking-wider rounded-lg w-fit">
                Tingkat Rukun Tetangga (RT)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officers.filter(o => o.level === 'RT').map((o) => (
                  <div key={o.id} className="bg-white border rounded-xl p-5 hover:shadow-sm transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold text-[9px] rounded-lg border border-emerald-100">
                          {o.role} {o.rtNumber}
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => startEditOfficer(o)}
                            className="text-slate-400 hover:text-slate-600 p-0.5 transition-colors cursor-pointer"
                          >
                            <Edit size={14} />
                          </button>
                          <button 
                            onClick={() => handleDeleteOfficer(o.id, o.name)}
                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">{o.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-1">NIK: {o.nik}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-[11px] text-slate-500 font-medium font-mono">
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400 shrink-0" />
                        <span>+{o.phone}</span>
                      </div>
                      {o.email && (
                        <div className="flex items-center gap-1.5 truncate">
                          <Mail size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate">{o.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Form Create/Edit Officer Column */}
          <div className="lg:col-span-4 bg-slate-5 brown-10 border rounded-2xl p-6 space-y-6">
            <div>
              <span className="text-[9px] bg-[#00288e]/10 text-[#00288e] font-black uppercase tracking-wider px-2 py-0.5 rounded">Form Pengurus</span>
              <h3 className="text-md font-bold text-slate-905 mt-1">
                {editingOfficerId ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
              </h3>
              <p className="text-[11px] text-slate-400 leading-normal mt-0.5">Daftarkan pengurus baru ke tabel organisasi kepemimpinan lokal RT/RW.</p>
            </div>

            <form onSubmit={handleSaveOfficer} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Nama Lengkap & Gelar</label>
                <input 
                  type="text" 
                  value={officerForm.name}
                  onChange={e => setOfficerForm({...officerForm, name: e.target.value})}
                  placeholder="Contoh: Drs. Setiawan Hadi"
                  className={bgStyle}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">NIK KTP 16-Digit</label>
                <input 
                  type="text" 
                  maxLength={16}
                  value={officerForm.nik}
                  onChange={e => setOfficerForm({...officerForm, nik: e.target.value})}
                  placeholder="Contoh: 351512xxxxxxxxxx"
                  className={bgStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Tingkatan Kamar</label>
                  <select 
                    value={officerForm.level}
                    onChange={e => setOfficerForm({...officerForm, level: e.target.value as Officer['level']})}
                    className={bgStyle}
                  >
                    <option value="RW">Tingkat RW</option>
                    <option value="RT">Tingkat RT</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Peran / Jabatan</label>
                  <select 
                    value={officerForm.role}
                    onChange={e => setOfficerForm({...officerForm, role: e.target.value as Officer['role']})}
                    className={bgStyle}
                  >
                    {officerForm.level === 'RW' ? (
                      <>
                        <option value="Ketua RW">Ketua RW</option>
                        <option value="Wakil RW">Wakil RW</option>
                        <option value="Sekretaris RW">Sekretaris RW</option>
                        <option value="Bendahara RW">Bendahara RW</option>
                      </>
                    ) : (
                      <>
                        <option value="Ketua RT">Ketua RT</option>
                        <option value="Wakil RT">Wakil RT</option>
                        <option value="Sekretaris RT">Sekretaris RT</option>
                        <option value="Bendahara RT">Bendahara RT</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {officerForm.level === 'RT' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">Nomor Rukun Tetangga (RT)</label>
                  <input 
                    type="text" 
                    value={officerForm.rtNumber}
                    onChange={e => setOfficerForm({...officerForm, rtNumber: e.target.value})}
                    placeholder="Contoh: 60"
                    className={bgStyle}
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Nomor HP Aktif (WhatsApp)</label>
                <input 
                  type="text" 
                  value={officerForm.phone}
                  onChange={e => setOfficerForm({...officerForm, phone: e.target.value})}
                  placeholder="Contoh: 08123456789"
                  className={bgStyle}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">E-Mail Resmi (Opsional)</label>
                <input 
                  type="email" 
                  value={officerForm.email}
                  onChange={e => setOfficerForm({...officerForm, email: e.target.value})}
                  placeholder="Contoh: dprd.heru@pekalongan.go.id"
                  className={bgStyle}
                />
              </div>

              <div className="flex gap-2 pt-2">
                {editingOfficerId && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingOfficerId(null);
                      setOfficerForm({ name: '', nik: '', role: 'Wakil RT', level: 'RT', rtNumber: '60', phone: '', email: '' });
                    }}
                    className="flex-1 py-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                )}
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-[#00288e] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check size={14} /> {editingOfficerId ? 'Simpan Update' : 'Daftarkan Petugas'}
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {activeTab === 'wilayah-map' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Google Maps interactive simulated projection */}
          <div className="lg:col-span-8 bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Maps Top Bar controls */}
            <div className="bg-slate-50 border-b p-4 px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#00288e]" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Proyeksi Geo-Sektor & Area Layanan</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Visualisasi radius blanket proteksi pelayanan Rukun Warga.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100 rounded">
                  Status Koordinat: AKTIF
                </span>
              </div>
            </div>

            {/* Simulated Live Google Maps Interactive Canvas */}
            <div className="relative h-96 bg-slate-900 flex items-center justify-center overflow-hidden">
              
              {/* Fake Street grid background */}
              <div className="absolute inset-0 opacity-40 select-none pointer-events-none">
                {/* Simulated streets lines */}
                <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-slate-700"></div>
                <div className="absolute left-2/3 top-0 bottom-0 w-2.5 bg-slate-705"></div>
                <div className="absolute left-0 right-0 top-1/3 h-2 bg-slate-700"></div>
                <div className="absolute left-0 right-0 top-3/4 h-3 bg-slate-700"></div>
                
                {/* Diagonal secondary lines */}
                <div className="absolute w-[500px] h-[3px] bg-slate-800 rotate-45 top-1/4 left-10"></div>
                <div className="absolute w-[500px] h-[3px] bg-slate-800 -rotate-45 top-1/4 right-10"></div>

                {/* Grid blocks */}
                <div className="absolute top-8 left-10 w-20 h-14 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sektor A</div>
                <div className="absolute top-8 right-16 w-24 h-16 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sektor B</div>
                <div className="absolute bottom-12 left-16 w-28 h-20 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sektor Utama</div>
                <div className="absolute bottom-16 right-12 w-20 h-16 bg-slate-800/80 rounded border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sektor C</div>
              </div>

              {/* Glowing service blanket circle (centered based on adjustable state) */}
              <div 
                className="absolute bg-blue-500/20 border-2 border-dashed border-blue-400 rounded-full flex items-center justify-center animate-pulse-slow transition-all duration-300 z-10"
                style={{ 
                  width: `${Math.min(320, 100 + (radiusMeters / 3))}px`, 
                  height: `${Math.min(320, 100 + (radiusMeters / 3))}px` 
                }}
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-slate-900/80 rounded text-[9px] font-bold text-blue-200 border border-blue-500/30 whitespace-nowrap shadow">
                  Blanket Pelayanan: {radiusMeters} Meter
                </div>
              </div>

              {/* Pin marker */}
              <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center z-25">
                <div className="bg-red-500 p-2 text-white rounded-full shadow-lg border border-white">
                  <MapPin size={16} className="animate-bounce" />
                </div>
                <span className="mt-1 px-2 py-0.5 bg-slate-900 border border-slate-750 text-white font-bold text-[9px] rounded whitespace-nowrap shadow-md">
                   Balai Sekretariat RW {space.rwNumber}
                </span>
              </div>

              {/* Map UI overlays */}
              <div className="absolute bottom-4 left-4 p-3 bg-slate-900/90 border border-slate-755 rounded-xl z-30 max-w-xs space-y-1">
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Peta Geografis Resmi:</span>
                <p className="text-[11px] font-bold text-white truncate">{centerLabel}</p>
                <p className="text-[9px] text-[#9cb3ff] font-mono">LAT: {parseFloat(latInput).toFixed(4)} • LNG: {parseFloat(lngInput).toFixed(4)}</p>
              </div>

              <div className="absolute top-4 right-4 bg-slate-900/80 p-2 border border-slate-755 rounded-lg text-[10px] text-white flex flex-col gap-1.5 font-bold z-30 shadow-md">
                <button className="p-1 px-2 hover:bg-slate-700 bg-slate-800 rounded text-center cursor-pointer font-mono">+</button>
                <button className="p-1 px-2 hover:bg-slate-700 bg-slate-800 rounded text-center cursor-pointer font-mono">-</button>
              </div>
            </div>

            <div className="p-5 bg-slate-50 text-[11.5px] border-t text-slate-600 font-medium">
              *Koordinat dan batasan blanket geofencing ini digunakan oleh integrasi peta warga untuk menyaring letak domisili KK serta memberikan arah navigasi rute tercepat menuju tempat pengambilan berkas fisik surat di sekretariat.
            </div>
          </div>

          {/* Configuration Parameters Side Column */}
          <div className="lg:col-span-4 bg-white border rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <span className="text-[9px] bg-indigo-50 text-[#00288e] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-100">Setup Geospasial</span>
              <h3 className="text-md font-bold text-slate-900 mt-1">Konfigurasi Batas Wilayah</h3>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Sesuaikan titik koordinat Google Maps serta rentang perlindungan blanket kerja.</p>
            </div>

            <form onSubmit={handleUpdateTerritory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase">Nama Wilayah / Kompleks Sektor</label>
                <input 
                  type="text" 
                  value={centerLabel}
                  onChange={e => setCenterLabel(e.target.value)}
                  placeholder="Contoh: Perumahan Kebonagung Indah Sector I"
                  className={bgStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">GMap Latitude</label>
                  <input 
                    type="text" 
                    value={latInput}
                    onChange={e => setLatInput(e.target.value)}
                    placeholder="Contoh: -6.8912"
                    className={bgStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase">GMap Longitude</label>
                  <input 
                    type="text" 
                    value={lngInput}
                    onChange={e => setLngInput(e.target.value)}
                    placeholder="Contoh: 109.6766"
                    className={bgStyle}
                  />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[10px] font-black text-slate-500 uppercase">Radius Blanket Pelayanan</span>
                  <span className="font-bold font-mono text-[#00288e] bg-indigo-50 px-2 py-0.5 rounded">{radiusMeters} Meter</span>
                </div>
                <input 
                  type="range" 
                  min={50} 
                  max={1500} 
                  step={25}
                  value={radiusMeters}
                  onChange={e => setRadiusMeters(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#00288e]"
                />
                <p className="text-[10px] text-slate-400 leading-normal">
                  Blanket area untuk menyaring hak pilih warga, wilayah penarikan iuran sampah, dan batas koordinasi resmi pengantar kelurahan.
                </p>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-[#00288e] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <Sliders size={14} /> Sinkronisasi Koordinat Map
              </button>
            </form>
          </div>

        </div>
      )}

      {activeTab === 'pendaftaran-bulk' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Work Desk Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Citizen Requests Waiting for Approval */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Permohonan Registrasi Online Warga ({pendingApplications.length})</h3>
                <span className="text-[10px] bg-red-50 text-red-700 px-2.5 py-0.5 rounded font-mono font-bold uppercase">Pending Verification</span>
              </div>

              {pendingApplications.length > 0 ? (
                <div className="space-y-3">
                  {pendingApplications.map((app) => (
                    <div key={app.nik} className="bg-white border text-xs text-slate-800 rounded-xl p-5 hover:shadow-sm transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-slate-900 uppercase text-xs">{app.nama}</h4>
                          <span className="px-1.5 py-0.5 bg-yellow-50 text-amber-800 text-[9px] font-bold rounded-lg border border-yellow-200">Menunggu Review</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono mt-1">NIK: {app.nik} • KK: {app.kkNo || 'Belum Terdaftar'} ({app.kkRole || 'Anggota'})</p>
                        <p className="text-[10.5px] text-slate-500 mt-1">Sektor Domisili: <span className="font-bold text-[#00288e]">{app.blokNomor}</span></p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onApproveResident(app.nik)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-755 text-white font-bold rounded text-[10.5px] flex items-center gap-1 cursor-pointer shadow-sm"
                        >
                          <Check size={12} /> Setujui Gabung
                        </button>
                        <button
                          onClick={() => onRejectResident(app.nik)}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-650 font-bold rounded text-[10.5px] cursor-pointer"
                        >
                          Tolak
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50/40 border-2 border-dashed border-slate-200 p-8 rounded-xl text-center">
                  <p className="text-[11px] text-slate-400 font-semibold">Tidak ada warga baru dalam antrean permohonan registrasi online saat ini.</p>
                </div>
              )}
            </div>

            {/* Bulk Clipboard Paste, Drag & Drop or CSV import desk */}
            <div className="space-y-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              
              <div className="border-b pb-4 flex justify-between items-center flex-col sm:flex-row gap-4">
                <div>
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                    <FileSpreadsheet size={16} className="text-emerald-600" /> Bulk Import Warga Kolektif
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Salin/Tempel data warga atau seret file CSV/Excel langsung untuk diproses otomatis secara bulk.</p>
                </div>
                
                {/* Download Template CSV button */}
                <button
                  type="button"
                  onClick={downloadCsvTemplate}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-[#00288e] cursor-pointer rounded-xl text-[10px] font-black uppercase tracking-wide flex items-center gap-1.5 transition-colors shrink-0 border border-slate-200"
                >
                  <Upload size={12} className="rotate-180" /> Unduh Template CSV
                </button>
              </div>

              {bulkImportSuccess && (
                <div className="p-3 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow animate-bounce">
                  {bulkImportSuccess}
                </div>
              )}

              {/* Drag and Drop Zone Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 py-10 text-center transition-all relative ${
                  isDragging 
                    ? 'border-[#00288e] bg-blue-50/50 scale-[0.99] shadow-inner' 
                    : 'border-slate-250 bg-slate-50 hover:bg-slate-50/70 hover:border-slate-300'
                }`}
              >
                <input 
                  type="file" 
                  id="csv-file-upload" 
                  accept=".csv,.txt"
                  onChange={handleFileChange}
                  className="hidden" 
                />
                
                <div className="max-w-md mx-auto space-y-3 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-[#00288e] flex items-center justify-center shadow-xs">
                    <Upload size={22} className={isDragging ? 'animate-bounce' : ''} />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-800">
                      Seret & jatuhkan file CSV data warga di sini, atau {' '}
                      <label htmlFor="csv-file-upload" className="text-[#00288e] hover:underline cursor-pointer">
                        Pilih file lokal
                      </label>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">Mendukung format data kependudukan CSV atau berkas teks tab-separated (.txt)</p>
                  </div>
                </div>
              </div>

              {/* Paste Text fallback option */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase block tracking-wider">Atau Tempel Baris Raw Spreadsheet (CSV / TSV)</label>
                <textarea 
                  rows={4}
                  value={pasteData}
                  onChange={e => setPasteData(e.target.value)}
                  placeholder={`Masukkan baris data kependudukan dipisahkan dengan koma atau tab.
Contoh baris format:
NIK, Nama Lengkap, Nomor Blok, Hubungan Keluarga KK, No Telepon, Nomor KK
3273012300001234, Ahmad Fauzi, Blok I No. 12A, Kepala Keluarga, 0812233441, 3273010908070001
3273012300005678, Nuraini Rahmawati, Blok I No. 12A, Istri, 0812233442, 3273010908070001`}
                  className="w-full text-xs p-4 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-[#00288e] text-slate-800 font-mono placeholder:text-slate-400 focus:bg-white"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={() => handleParsePaste()}
                  disabled={!pasteData.trim()}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-xs font-bold cursor-pointer transition-colors"
                >
                  Urai & Pratinjau ({pasteData.split('\n').filter(p => p.trim()).length} baris)
                </button>
                {parsedPreview.length > 0 && (
                  <button 
                    onClick={handleCommitBulk}
                    className="px-4 py-2.5 bg-[#00288e] hover:bg-blue-900 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow"
                  >
                    Simpan Kolektif ({parsedPreview.length} Waga) <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {parseError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                  <AlertCircle size={15} /> {parseError}
                </div>
              )}

              {parsedPreview.length > 0 && (
                <div className="pt-4 border-t space-y-3">
                  <h4 className="text-[11px] font-black text-slate-700 uppercase">Pratinjau Hasil Parser:</h4>
                  <div className="overflow-x-auto border rounded-xl">
                    <table className="w-full text-left text-[11px] leading-relaxed">
                      <thead className="bg-slate-50 text-slate-400 uppercase font-bold border-b border-slate-100">
                        <tr>
                          <th className="p-2 px-3">NIK</th>
                          <th className="p-2">Nama</th>
                          <th className="p-2">No. Blok</th>
                          <th className="p-2">KK Role</th>
                          <th className="p-2">KK Card No</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700 font-mono">
                        {parsedPreview.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2 px-3 font-bold">{item.nik}</td>
                            <td className="p-2 capitalize font-sans">{item.nama}</td>
                            <td className="p-2">{item.blokNomor}</td>
                            <td className="p-2 uppercase text-emerald-700 font-bold font-sans">{item.kkRole}</td>
                            <td className="p-2">{item.kkNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Manual addition desk on Side Column */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
            <div>
              <span className="text-[9px] bg-indigo-50 text-[#00288e] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-indigo-100">Input Manual</span>
              <h3 className="text-md font-bold text-slate-905 mt-1">Simpan Data Warga</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Tambah data warga baru satu persatu ke pangkalan data lingkungan.</p>
            </div>

            <form onSubmit={handleSaveManualWarga} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={newWargaForm.nama}
                  onChange={e => setNewWargaForm({...newWargaForm, nama: e.target.value})}
                  placeholder="Contoh: Andi Wijono"
                  className={bgStyle}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">NIK (KTP)</label>
                  <input 
                    type="text" 
                    maxLength={16}
                    value={newWargaForm.nik}
                    onChange={e => setNewWargaForm({...newWargaForm, nik: e.target.value})}
                    placeholder="16 Digit"
                    className={bgStyle}
                  />
                </div>
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-black text-slate-500">No Kartu Keluarga (KK)</label>
                  <input 
                    type="text" 
                    maxLength={16}
                    value={newWargaForm.kkNo}
                    onChange={e => setNewWargaForm({...newWargaForm, kkNo: e.target.value})}
                    placeholder="16 Digit"
                    className={`${bgStyle} ${kkAutoLinked ? 'border-amber-400 bg-amber-50/40 text-amber-900 font-bold' : ''}`}
                  />
                  {kkAutoLinked && (
                    <span className="absolute right-2 top-0 text-[8px] bg-amber-100 text-amber-800 border border-amber-200 uppercase px-1.5 py-0.5 rounded font-black animate-pulse">
                      Linked KK ✓
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">Hubungan KK</label>
                  <select
                    value={newWargaForm.kkRole}
                    onChange={e => setNewWargaForm({...newWargaForm, kkRole: e.target.value as ResidentProfile['kkRole']})}
                    className={bgStyle}
                  >
                    <option value="Kepala Keluarga">Kepala Keluarga</option>
                    <option value="Istri">Istri</option>
                    <option value="Anak">Anak</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">Blok Domisili Resmi</label>
                  <input 
                    type="text" 
                    value={newWargaForm.blokNomor}
                    onChange={e => setNewWargaForm({...newWargaForm, blokNomor: e.target.value})}
                    placeholder="Contoh: Blok I No. 12A"
                    className={bgStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">Tempat Lahir</label>
                  <input 
                    type="text" 
                    value={newWargaForm.tempatLahir}
                    onChange={e => setNewWargaForm({...newWargaForm, tempatLahir: e.target.value})}
                    placeholder="Contoh: Pekalongan"
                    className={bgStyle}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    value={newWargaForm.tanggalLahir}
                    onChange={e => setNewWargaForm({...newWargaForm, tanggalLahir: e.target.value})}
                    className={bgStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">Jenis Kelamin</label>
                  <select 
                    value={newWargaForm.jenisKelamin}
                    onChange={e => setNewWargaForm({...newWargaForm, jenisKelamin: e.target.value as ResidentProfile['jenisKelamin']})}
                    className={bgStyle}
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500">No HP Aktif</label>
                  <input 
                    type="text" 
                    value={newWargaForm.noHp}
                    onChange={e => setNewWargaForm({...newWargaForm, noHp: e.target.value})}
                    placeholder="08xxxxxxxx"
                    className={bgStyle}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl shadow cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Simpan Data Warga
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
