import React, { useState, useEffect } from 'react';
import { ActiveUser, LetterRequest, ResidentProfile, RTConfig, PengurusView, ActivityLog, Officer, RuangPengurusSpace } from './types';
import { 
  INITIAL_LETTERS, INITIAL_RESIDENTS, INITIAL_RT_CONFIG, INITIAL_OFFICERS, INITIAL_RUANG_PENGURUS
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
import { AktivitasLog } from './components/AktivitasLog';
import { LaporanEkspor } from './components/LaporanEkspor';

// Import newly created modular components
import { DataKeluargaComponent } from './components/DataKeluargaComponent';
import { RuangPengurusComponent } from './components/RuangPengurusComponent';
import { CariPengurusComponent } from './components/CariPengurusComponent';

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

  const [officers, setOfficers] = useState<Officer[]>(() => {
    const cached = localStorage.getItem('silas_officers');
    return cached ? JSON.parse(cached) : INITIAL_OFFICERS;
  });

  const [space, setSpace] = useState<RuangPengurusSpace>(() => {
    const cached = localStorage.getItem('silas_space');
    return cached ? JSON.parse(cached) : INITIAL_RUANG_PENGURUS;
  });

  const [logs, setLogs] = useState<ActivityLog[]>(() => {
    const cached = localStorage.getItem('silas_logs');
    if (cached) return JSON.parse(cached);
    
    return [
      { id: 'LOG-30412', timestamp: '2026-06-05T14:30:00.000Z', category: 'resident', text: 'Warga baru Budi Hartono bergabung di RT 60 Pekalongan.', userName: 'Agus Santoso', userNik: '3515123456780001' },
      { id: 'LOG-78123', timestamp: '2026-06-05T16:45:00.000Z', category: 'letter', text: 'Siti Rahmawati mengajukan permohonan "Surat Pengantar SKCK".', userName: 'Siti Rahmawati', userNik: '3273012345670002' },
      { id: 'LOG-55102', timestamp: '2026-06-06T08:15:00.000Z', category: 'letter', text: 'Ketua RT menyetujui penerbitan surat pengantar KTP ber-stempel.', userName: 'Agus Santoso', userNik: '3515123456780001' },
      { id: 'LOG-99124', timestamp: '2026-06-06T10:00:00.000Z', category: 'system', text: 'Konfigurasi sekretariat RT/RW disinkronkan.', userName: 'Agus Santoso', userNik: '3515123456780001' }
    ];
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
    localStorage.setItem('silas_officers', JSON.stringify(officers));
  }, [officers]);

  useEffect(() => {
    localStorage.setItem('silas_space', JSON.stringify(space));
  }, [space]);

  useEffect(() => {
    localStorage.setItem('silas_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('silas_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('silas_user');
    }
  }, [currentUser]);

  const addLog = (category: ActivityLog['category'], text: string, name?: string, nik?: string) => {
    const newLog: ActivityLog = {
      id: `LOG-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString(),
      category,
      text,
      userName: name || currentUser?.nama || 'Sistem',
      userNik: nik || currentUser?.nik || '0000000000000000',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  // 3. User State Manipulation Logic (Core Actions)
  const handleLoginSuccess = (user: ActiveUser) => {
    setCurrentUser(user);
    if (user.role === 'pengurus') {
      setCurrentView('dashboard');
    }
    setFocusedLetterId(null);
    addLog('auth', `Sesi masuk berhasil untuk pengguna ${user.nama} (${user.role.toUpperCase()}).`, user.nama, user.nik);
  };

  const handleLogout = () => {
    if (currentUser) {
      addLog('auth', `Keluar sesi sukses untuk ${currentUser.nama}.`, currentUser.nama, currentUser.nik);
    }
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
      addLog('auth', `Beralih Portal Demo: Sesi Warga (${budi.nama}) dibuka.`, budi.nama, budi.nik);
    } else {
      // Switch back to RT Administrator
      setCurrentUser({
        nama: rtConfig.namaKetua,
        nik: rtConfig.nikKetua,
        role: 'pengurus',
      });
      setCurrentView('dashboard');
      addLog('auth', `Beralih Portal Demo: Sesi Ketua RT (${rtConfig.namaKetua}) dibuka.`, rtConfig.namaKetua, rtConfig.nikKetua);
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
    addLog('resident', `Warga baru ${completedProfile.nama} berhasil menyelesaikan kelengkapan profil data kependudukan.`, completedProfile.nama, completedProfile.nik);
  };

  const handleApproveLetter = (id: string, officialDocNumber: string) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    setLetters((prev) => {
      const match = prev.find((l) => l.id === id);
      if (match) {
        addLog('letter', `Ketua RT menyetujui penerbitan surat ${match.jenisSurat} (ID: ${id}) dengan No. Surat resmi: ${officialDocNumber}`);
      }
      return prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'disetujui',
              nomorSurat: officialDocNumber,
              tglPersetujuan: formattedDate,
            }
          : l
      );
    });
  };

  const handleRejectLetter = (id: string, reason: string) => {
    setLetters((prev) => {
      const match = prev.find((l) => l.id === id);
      if (match) {
        addLog('letter', `Ketua RT menolak berkas pengajuan ${match.jenisSurat} (ID: ${id}) karena alasan: ${reason}`);
      }
      return prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: 'ditolak',
              catatanPenolakan: reason,
            }
          : l
      );
    });
  };

  const handleSubmitNewLetter = (jenis: string, keperluan: string, isDraft = false, existingId: string | null = null) => {
    if (!currentUser) return;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    if (existingId) {
      setLetters((prev) =>
        prev.map((l) =>
          l.id === existingId
            ? {
                ...l,
                jenisSurat: jenis,
                keperluan: keperluan,
                status: isDraft ? 'draft' : 'pending',
                tanggalPengajuan: formattedDate,
              }
            : l
        )
      );
      addLog('letter', `${isDraft ? 'Menyimpan pembaharuan draf' : 'Mengirimkan pengajuan draf resmi'} "${jenis}" (ID: ${existingId})`, currentUser.nama, currentUser.nik);
    } else {
      const randId = `SL-0${Math.floor(Math.random() * 90) + 15}`;
      const newApplication: LetterRequest = {
        id: randId,
        nik: currentUser.nik,
        nama: currentUser.nama,
        jenisSurat: jenis,
        keperluan: keperluan,
        tanggalPengajuan: formattedDate,
        status: isDraft ? 'draft' : 'pending',
      };
      setLetters((prev) => [newApplication, ...prev]);
      addLog('letter', `${isDraft ? 'Menyimpan draf permohonan baru' : 'Mengirimkan permohonan baru'} "${jenis}" (ID: ${randId})`, currentUser.nama, currentUser.nik);
    }
  };

  const handleDeleteLetterRequest = (id: string) => {
    setLetters((prev) => {
      const match = prev.find((l) => l.id === id);
      if (match) {
        addLog('letter', `Keluarga menghapus ${match.status === 'draft' ? 'draf dokumen sementara' : 'pengajuan dokumen'} "${match.jenisSurat}" (ID: ${id})`, currentUser.nama, currentUser.nik);
      }
      return prev.filter((l) => l.id !== id);
    });
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


              {currentView === 'data-kk' && (
                <DataKeluargaComponent
                  residents={residents}
                  onAddResident={(newResident) => {
                    const updated = [...residents, newResident];
                    setResidents(updated);
                  }}
                  onUpdateResident={(updatedResident) => {
                    const updated = residents.map(r => r.nik === updatedResident.nik ? updatedResident : r);
                    setResidents(updated);
                  }}
                  onDeleteResident={(nik) => {
                    const target = residents.find(r => r.nik === nik);
                    const updated = residents.filter(r => r.nik !== nik);
                    setResidents(updated);
                    if (target) {
                      addLog('resident', `Warga ${target.nama} dikeluarkan dari basis data KK kependudukan.`);
                    }
                  }}
                  addLog={addLog}
                />
              )}

              {currentView === 'ruang-pengurus' && (
                <RuangPengurusComponent
                  initialSpace={space}
                  initialOfficers={officers}
                  residents={residents}
                  onUpdateSpace={(updatedSpace) => {
                    setSpace(updatedSpace);
                  }}
                  onUpdateOfficers={(updatedOfficers) => {
                    setOfficers(updatedOfficers);
                  }}
                  onAddResidentBatch={(newResidents) => {
                    const updated = [...residents, ...newResidents];
                    setResidents(updated);
                  }}
                  onApproveResident={(nik) => {
                    const target = residents.find(r => r.nik === nik);
                    if (target) {
                      const updated = residents.map(r => r.nik === nik ? { ...r, statusWarga: 'aktif' } : r);
                      setResidents(updated);
                      addLog('resident', `Permohonan gabung warga ${target.nama} disetujui secara online.`);
                    }
                  }}
                  onRejectResident={(nik) => {
                    const target = residents.find(r => r.nik === nik);
                    const updated = residents.filter(r => r.nik !== nik);
                    setResidents(updated);
                    if (target) {
                      addLog('resident', `Mengabaikan / menolak pengajuan registrasi warga baru atas nama ${target.nama}.`);
                    }
                  }}
                  addLog={addLog}
                />
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

              {currentView === 'laporan' && (
                <LaporanEkspor
                  letters={letters}
                  residents={residents}
                  rtConfig={rtConfig}
                  logs={logs}
                  onClearLogs={() => {
                    setLogs([]);
                    addLog('system', 'Pembersihan audit log sistem dilakukan oleh administrator.');
                  }}
                />
              )}

              {currentView === 'profil' && (
                <ProfilPengurus
                  rtConfig={rtConfig}
                  officers={officers}
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
        <>
          {currentView === 'cari-pengurus' ? (
            <CariPengurusComponent
              space={space}
              officers={officers}
              residents={residents}
              citizen={currentUser.wargaProfile!}
              onApplyForRelocation={(newBlock) => {
                const updated = residents.map(r => r.nik === currentUser.wargaProfile!.nik ? { ...r, statusWarga: 'tertunda', blokNomor: newBlock } : r);
                setResidents(updated);
                // Sync to current user profile state
                const targetProf = updated.find(r => r.nik === currentUser.wargaProfile!.nik);
                if (targetProf) {
                  setCurrentUser(prev => prev ? { ...prev, wargaProfile: targetProf } : null);
                }
              }}
              addLog={addLog}
            />
          ) : (
            <WargaDashboard
              resident={currentUser.wargaProfile!}
              letters={letters}
              onSubmitLetter={handleSubmitNewLetter}
              onDeleteRequest={handleDeleteLetterRequest}
            />
          )}
        </>
      )}
    </AppLayout>
  );
}
