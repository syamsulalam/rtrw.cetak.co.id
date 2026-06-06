import React, { useState, useEffect } from 'react';
import { ActiveUser, LetterRequest, ResidentProfile, RTConfig, PengurusView } from './types';
import { 
  INITIAL_LETTERS, INITIAL_RESIDENTS, INITIAL_RT_CONFIG 
} from './mockData';

// Import Layout & Gateways
import { AppLayout } from './components/AppLayout';
import { LoginScreen } from './components/LoginScreen';
import { WargaOnboarding } from './components/WargaOnboarding';

// Import Pengurus (Admin) Subscreens
import { DashboardUtama } from './components/DashboardUtama';
import { TinjauanPengajuanSurat } from './components/TinjauanPengajuanSurat';
import { PengaturanWilayah } from './components/PengaturanWilayah';
import { ProfilPengurus } from './components/ProfilPengurus';

// Import Warga Panel
import { WargaDashboard } from './components/WargaDashboard';

// Import Lucide icons for supplementary views
import { FileClock, UserCheck, Calendar, Search, MapPin, Eye, Info, Check, X } from 'lucide-react';

export default function App() {
  // 1. Core State Hooks (Hydrate from LocalStorage to keep real persistence!)
  const [currentUser, setCurrentUser] = useState<ActiveUser | null>(() => {
    const cached = localStorage.getItem('silas_user');
    return cached ? JSON.parse(cached) : null;
  });

  const [letters, setLetters] = useState<LetterRequest[]>(() => {
    const cached = localStorage.getItem('silas_letters');
    return cached ? JSON.parse(cached) : INITIAL_LETTERS;
  });

  const [residents, setResidents] = useState<ResidentProfile[]>(() => {
    const cached = localStorage.getItem('silas_residents');
    return cached ? JSON.parse(cached) : INITIAL_RESIDENTS;
  });

  const [rtConfig, setRtConfig] = useState<RTConfig>(() => {
    const cached = localStorage.getItem('silas_rt_config');
    return cached ? JSON.parse(cached) : INITIAL_RT_CONFIG;
  });

  // 2. Navigation Routing States
  const [currentView, setCurrentView] = useState<PengurusView>('dashboard');
  const [focusedLetterId, setFocusedLetterId] = useState<string | null>(null);
  
  // Supplementary view states inside Admin (search/filters)
  const [wargaSearch, setWargaSearch] = useState('');
  const [focusedCitizenKtp, setFocusedCitizenKtp] = useState<string | null>(null);

  // Sync to localStorage on state changes
  useEffect(() => {
    localStorage.setItem('silas_letters', JSON.stringify(letters));
  }, [letters]);

  useEffect(() => {
    localStorage.setItem('silas_residents', JSON.stringify(residents));
  }, [residents]);

  useEffect(() => {
    localStorage.setItem('silas_rt_config', JSON.stringify(rtConfig));
  }, [rtConfig]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('silas_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('silas_user');
    }
  }, [currentUser]);

  // 3. User State Manipulation Logic (Core Actions)
  const handleLoginSuccess = (user: ActiveUser) => {
    setCurrentUser(user);
    if (user.role === 'pengurus') {
      setCurrentView('dashboard');
    }
    setFocusedLetterId(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('silas_user');
  };

  const handleSwitchPortalDemo = () => {
    if (!currentUser) return;
    if (currentUser.role === 'pengurus') {
      // Switch to a prefilled citizen (Budi Hartono)
      const budi = residents.find((r) => r.nik === INITIAL_RESIDENTS[0].nik) || INITIAL_RESIDENTS[0];
      setCurrentUser({
        nama: budi.nama,
        nik: budi.nik,
        role: 'warga',
        wargaProfile: budi,
      });
    } else {
      // Switch back to RT Administrator
      setCurrentUser({
        nama: rtConfig.namaKetua,
        nik: rtConfig.nikKetua,
        role: 'pengurus',
      });
      setCurrentView('dashboard');
    }
    setFocusedLetterId(null);
  };

  const handleCompleteOnboarding = (completedProfile: ResidentProfile) => {
    // 1. Add/Update demographic listings
    setResidents((prev) => {
      const filtered = prev.filter((r) => r.nik !== completedProfile.nik);
      return [...filtered, completedProfile];
    });

    // 2. Set active user state to fully verified resident member
    setCurrentUser({
      nama: completedProfile.nama,
      nik: completedProfile.nik,
      role: 'warga',
      wargaProfile: completedProfile,
    });
  };

  const handleApproveLetter = (id: string, officialDocNumber: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    setLetters((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'disetujui',
              nomorSurat: officialDocNumber,
              tglPersetujuan: formattedDate,
            }
          : l
      )
    );
  };

  const handleRejectLetter = (id: string, reason: string) => {
    setLetters((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'ditolak',
              catatanPenolakan: reason,
            }
          : l
      )
    );
  };

  const handleSubmitNewLetter = (jenis: string, keperluan: string) => {
    if (!currentUser) return;
    const randId = `SL-0${Math.floor(Math.random() * 90) + 10}`;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    const newApplication: LetterRequest = {
      id: randId,
      nik: currentUser.nik,
      nama: currentUser.nama,
      jenisSurat: jenis,
      keperluan: keperluan,
      tanggalPengajuan: formattedDate,
      status: 'pending',
    };

    setLetters((prev) => [newApplication, ...prev]);
  };

  const handleDeleteLetterRequest = (id: string) => {
    setLetters((prev) => prev.filter((l) => l.id !== id));
  };

  // 4. Gateway Decision Branching (Login/Onboarding)
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentUser.role === 'onboarding') {
    return (
      <WargaOnboarding 
        currentUser={currentUser}
        onComplete={handleCompleteOnboarding}
        onLogout={handleLogout}
      />
    );
  }

  // 5. Main Workspaces Routing (Full-Layout shells)
  return (
    <AppLayout
      role={currentUser.role}
      username={currentUser.nama}
      currentView={focusedLetterId ? 'layanan-surat' : currentView}
      onViewChange={(view) => {
        setFocusedLetterId(null);
        setCurrentView(view);
      }}
      onLogout={handleLogout}
      onSwitchPortal={handleSwitchPortalDemo}
    >
      {/* ========================================================= */}
      {/* 2. ADMINISTRATOR PORTAL SCREENS */}
      {/* ========================================================= */}
      {currentUser.role === 'pengurus' && (
        <>
          {focusedLetterId ? (
            // Live Letter Review View (Handles pending letters details and kop templates)
            <TinjauanPengajuanSurat
              letter={letters.find((l) => l.id === focusedLetterId)!}
              resident={residents.find((r) => r.nik === letters.find((l) => l.id === focusedLetterId)?.nik)}
              rtConfig={rtConfig}
              onApprove={handleApproveLetter}
              onReject={handleRejectLetter}
              onBack={() => setFocusedLetterId(null)}
            />
          ) : (
            <>
              {currentView === 'dashboard' && (
                <DashboardUtama
                  letters={letters}
                  residents={residents}
                  onViewLetter={(id) => setFocusedLetterId(id)}
                  onNavigateToView={(view) => setCurrentView(view)}
                />
              )}

              {currentView === 'layanan-surat' && (
                // Detailed Document Review queue list
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">Antrean Pengajuan Surat Masuk</h2>
                    <p className="text-xs text-slate-500 mt-1">Sertifikasi & setujui pelayanan permohonan warga RT 60.</p>
                  </div>

                  <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b bg-slate-50/50">
                      <span className="text-xs font-bold text-slate-505 uppercase tracking-wider">Berkas Menunggu Verifikasi ({letters.filter(l => l.status === 'pending').length})</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {letters.filter(l => l.status === 'pending').map((l) => (
                        <div 
                          key={l.id}
                          onClick={() => setFocusedLetterId(l.id)}
                          className="p-5 flex justify-between items-center hover:bg-slate-50/40 transition-colors cursor-pointer group"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 font-mono">{l.id}</span>
                              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight group-hover:text-[#00288e] transition-colors">{l.nama}</h4>
                            </div>
                            <p className="text-xs font-semibold text-slate-605">{l.jenisSurat}</p>
                            <p className="text-xs text-slate-400 line-clamp-1">{l.keperluan}</p>
                          </div>
                          <span className="text-xs font-bold text-[#00288e] bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl transition-all">
                            Tinjau Berkas
                          </span>
                        </div>
                      ))}
                      {letters.filter(l => l.status === 'pending').length === 0 && (
                        <div className="p-12 text-center text-slate-500 text-sm font-medium">
                          Seluruh pengajuan surat warga telah selesai diproses!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'status-pengajuan' && (
                // Approved documents table logs
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-909 tracking-tight">Riwayat Dokumen Terbit</h2>
                    <p className="text-xs text-slate-505 mt-1">Daftar arsip digital surat pengantar RT 60 yang telah resmi ditandatangani.</p>
                  </div>

                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse font-medium">
                        <thead>
                          <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="p-4 pl-6">ID Surat</th>
                            <th className="p-4">Tanggal Terbit</th>
                            <th className="p-4">Nama Penerima</th>
                            <th className="p-4">Jenis Surat Pengantar</th>
                            <th className="p-4">Nomor Dokumen Resmi</th>
                            <th className="p-4 text-right pr-6">Status Arsip</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {letters.filter(l => l.status === 'disetujui').map((l) => (
                            <tr 
                              key={l.id} 
                              onClick={() => setFocusedLetterId(l.id)}
                              className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                            >
                              <td className="p-4 pl-6 font-mono text-indigo-700 font-bold">{l.id}</td>
                              <td className="p-4 text-slate-505 flex items-center gap-1.5"><Calendar size={13} /> {l.tglPersetujuan || l.tanggalPengajuan}</td>
                              <td className="p-4 font-bold text-slate-805 uppercase">{l.nama}</td>
                              <td className="p-4 font-semibold">{l.jenisSurat}</td>
                              <td className="p-4 font-mono text-[11px] font-semibold text-slate-600">{l.nomorSurat}</td>
                              <td className="p-4 text-right pr-6">
                                <span className="bg-emerald-50 text-emerald-700 font-bold uppercase text-[10px] px-2.5 py-1 rounded-full border border-emerald-200/50">TERBIT (AMN)</span>
                              </td>
                            </tr>
                          ))}
                          {letters.filter(l => l.status === 'disetujui').length === 0 && (
                            <tr>
                              <td colSpan={6} className="p-12 text-center text-slate-400">Belum ada surat pengantar resmi yang terbit bulan ini.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {currentView === 'data-warga' && (
                // Citizens database tables with clickable row preview KTP!
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-909 tracking-tight">Data Induk Kependudukan RT 60</h2>
                      <p className="text-xs text-slate-505 mt-1">Daftar nama dan NIK kepala keluarga terdaftar di rukun tetangga.</p>
                    </div>

                    <div className="relative w-full max-w-xs">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari nama atau NIK warga..."
                        value={wargaSearch}
                        onChange={(e) => setWargaSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-[#00288e] outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse font-medium">
                        <thead>
                          <tr className="bg-slate-50 border-b text-slate-400 font-bold text-slate-505 uppercase tracking-wider">
                            <th className="p-4 pl-6">Nama Lengkap</th>
                            <th className="p-4">16-Digit NIK</th>
                            <th className="p-4">Blok & No. Rumah</th>
                            <th className="p-4">Pekerjaan</th>
                            <th className="p-4">No. WhatsApp</th>
                            <th className="p-4 text-right pr-6">Berkas KTP</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y text-slate-700">
                          {residents.filter(r => r.nama.toLowerCase().includes(wargaSearch.toLowerCase()) || r.nik.includes(wargaSearch)).map((r) => (
                            <tr key={r.nik} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 pl-6 font-bold text-slate-805 uppercase flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-50 text-[#00288e] font-black text-[11px] flex items-center justify-center">
                                  {r.nama.charAt(0)}
                                </div>
                                {r.nama}
                              </td>
                              <td className="p-4 font-mono font-semibold text-slate-600 tracking-wide">{r.nik}</td>
                              <td className="p-4 font-bold text-emerald-700">{r.blokNomor || '[Belum Mengisi]'}</td>
                              <td className="p-4 font-semibold">{r.pekerjaan || '[Belum Mengisi]'}</td>
                              <td className="p-4 font-mono text-slate-500">
                                {r.noHp ? `+62 ${r.noHp}` : '[Belum Mengisi]'}
                              </td>
                              <td className="p-4 text-right pr-6">
                                {r.ktpUrl ? (
                                  <button 
                                    onClick={() => setFocusedCitizenKtp(r.ktpUrl || null)}
                                    className="px-2.5 py-1 bg-blue-50 text-[#00288e] font-bold text-[10px] rounded hover:bg-blue-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Eye size={12} /> Lihat KTP
                                  </button>
                                ) : (
                                  <span className="text-slate-400 text-[10px] italic">Tiada Berkas</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Citizen's KTP preview modal overlay */}
                  {focusedCitizenKtp && (
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center" onClick={() => setFocusedCitizenKtp(null)}>
                      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 relative space-y-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <h4 className="text-sm font-bold text-slate-900">Salinan KTP Kependudukan</h4>
                          <button onClick={() => setFocusedCitizenKtp(null)} className="text-slate-400 hover:text-slate-600 font-extrabold p-1 text-sm">✕</button>
                        </div>
                        <div className="aspect-[1.58/1] rounded-xl overflow-hidden border">
                          <img src={focusedCitizenKtp} alt="Citizen KTP preview" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 bg-blue-50 rounded-lg text-[11px] text-slate-500 leading-normal flex gap-2">
                          <Info size={14} className="text-[#00288e] shrink-0 mt-0.5" />
                          <span>Milik warga resmi RT 60 Pekalongan. Keamanan data terenkripsi.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentView === 'pengaturan-wilayah' && (
                <PengaturanWilayah
                  rtConfig={rtConfig}
                  onUpdateConfig={(updated) => {
                    setRtConfig(updated);
                    // Also update Ketua RT details of currentUser session if they update it
                    setCurrentUser(prev => prev ? { ...prev, nama: updated.namaKetua, nik: updated.nikKetua } : null);
                  }}
                />
              )}

              {currentView === 'profil' && (
                <ProfilPengurus
                  rtConfig={rtConfig}
                  onUpdateConfig={(updated) => {
                    setRtConfig(updated);
                    setCurrentUser(prev => prev ? { ...prev, nama: updated.namaKetua, nik: updated.nikKetua } : null);
                  }}
                />
              )}
            </>
          )}
        </>
      )}

      {/* ========================================================= */}
      {/* 3. RESIDENT (WARGA) PORTAL SCREENS */}
      {/* ========================================================= */}
      {currentUser.role === 'warga' && (
        <WargaDashboard
          resident={currentUser.wargaProfile!}
          letters={letters}
          onSubmitLetter={handleSubmitNewLetter}
          onDeleteRequest={handleDeleteLetterRequest}
        />
      )}
    </AppLayout>
  );
}
