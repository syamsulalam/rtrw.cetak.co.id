import React, { useState } from 'react';
import { Shield, User, Landmark, ChevronRight, Lock, KeyRound, AlertCircle, Sparkles } from 'lucide-react';
import { ActiveUser, Role } from '../types';
import { INITIAL_RESIDENTS } from '../mockData';

interface LoginScreenProps {
  onLoginSuccess: (user: ActiveUser) => void;
}

export function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<'warga' | 'pengurus'>('warga');
  const [selectedResidentNik, setSelectedResidentNik] = useState(INITIAL_RESIDENTS[0].nik);
  const [userName, setUserName] = useState('');
  const [userNik, setUserNik] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(true); // default to one-tap admin demo
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'pengurus') {
      // Admin Login
      onLoginSuccess({
        nama: 'Agus Santoso, S.T.',
        nik: '3515123456780001',
        role: 'pengurus',
      });
    } else {
      // Resident Login
      const res = INITIAL_RESIDENTS.find((r) => r.nik === selectedResidentNik);
      if (res) {
        onLoginSuccess({
          nama: res.nama,
          nik: res.nik,
          role: 'warga',
          wargaProfile: res,
        });
      }
    }
  };

  const handleRegisterAsNewWarga = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userNik.trim()) {
      setError('Mohon lengkapi Nama dan NIK Anda.');
      return;
    }
    if (userNik.length !== 16 || isNaN(Number(userNik))) {
      setError('NIK harus berupa 16 digit angka.');
      return;
    }

    onLoginSuccess({
      nama: userName,
      nik: userNik,
      role: 'onboarding', // Lead to Lengkapi Profil Screen
      wargaProfile: {
        nik: userNik,
        nama: userName,
        tempatLahir: '',
        tanggalLahir: '',
        jenisKelamin: 'Laki-laki',
        agama: '',
        pekerjaan: '',
        statusKawin: '',
        alamatKtp: '',
        blokNomor: '',
        noHp: '',
        progressOnboarding: 0,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row relative">
      {/* Visual Left Banner (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#00288e] text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Tech dots pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
        ></div>
        
        {/* Rounded dynamic blobs for modern aesthetic */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl -mr-32 pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -ml-40 pointer-events-none"></div>

        <div className="z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Landmark size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">SILAS</h1>
            <p className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold mb-0">
              Sistem Layanan Surat Pengantar
            </p>
          </div>
        </div>

        <div className="z-10 max-w-md my-auto">
          <span className="px-3 py-1.5 bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider rounded-full inline-flex items-center gap-1.5 mb-6">
            <Sparkles size={12} /> Versi 2.0 Digital
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
            Urus Surat Pengantar RT/RW Kini Lebih Cepat & Praktis.
          </h2>
          <p className="text-blue-100/80 leading-relaxed font-normal">
            Platform modern untuk efisiensi birokrasi warga. Mempermudah permohonan surat, verifikasi berkas, tanda tangan digital, hingga stempel RT/RW resmi dalam satu sistem digital terintegrasi.
          </p>
        </div>

        <div className="z-10 flex justify-between items-center text-xs text-blue-200 border-t border-white/10 pt-6">
          <p>© 2026 Kelurahan Kebonagung. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Panduan</a>
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>

      {/* Form Right Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 bg-slate-50 relative">
        <div className="w-full max-w-md">
          {/* Logo on mobile view */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#00288e] flex items-center justify-center shadow-md">
              <Landmark size={20} className="text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-black text-[#00288e]">SILAS</h1>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-0">
                Sistem Layanan Surat Pengantar
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h3 className="text-2xl font-extrabold text-[#00288e] tracking-tight">
              Selamat Datang di SILAS
            </h3>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Silakan login untuk memproses atau mengajukan surat pengantar resmi.
            </p>
          </div>

          {/* Role Switching Slider Toggle */}
          <div className="p-1.5 bg-slate-200/70 rounded-2xl flex gap-1 mb-8 shadow-inner border border-slate-100">
            <button
              onClick={() => {
                setActiveTab('warga');
                setError(null);
              }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'warga'
                  ? 'bg-white text-[#00288e] shadow-sm'
                  : 'text-slate-600 hover:text-[#00288e]'
              }`}
            >
              <User size={16} /> Warga
            </button>
            <button
              onClick={() => {
                setActiveTab('pengurus');
                setError(null);
              }}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pengurus'
                  ? 'bg-white text-[#00288e] shadow-sm'
                  : 'text-slate-600 hover:text-[#00288e]'
              }`}
            >
              <Shield size={16} /> Pengurus RT
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-semibold rounded-xl flex items-start gap-3">
              <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Tab 1: Warga Flow */}
          {activeTab === 'warga' && (
            <div className="space-y-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[13px] font-bold text-slate-700 block">
                    Pilih Akun Warga Demo
                  </label>
                  <select
                    value={selectedResidentNik}
                    onChange={(e) => setSelectedResidentNik(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-slate-900 bg-white shadow-sm font-semibold text-[15px]"
                  >
                    {INITIAL_RESIDENTS.map((res) => (
                      <option key={res.nik} value={res.nik}>
                        {res.nama} ({res.progressOnboarding === 100 ? 'Profil Lengkap' : 'Butuh Onboarding'})
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#00288e] text-white hover:bg-blue-900 transition-colors font-bold rounded-xl shadow-md text-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  Masuk sebagai Warga <ChevronRight size={16} />
                </button>
              </form>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-wider">Atau Daftar Baru</span>
                <div className="flex-grow border-t border-slate-200"></div>
              </div>

              {/* Registration as new warga */}
              <form onSubmit={handleRegisterAsNewWarga} className="space-y-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Daftar Warga Baru (RT 60)
                </h4>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rian Hidayat"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none text-slate-900 focus:ring-2 focus:ring-[#00288e] text-sm"
                  />
                </div>
                <div className="space-y-1 font-mono">
                  <label className="text-xs font-semibold text-slate-700 font-sans">16 Digit NIK KTP</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Contoh: 3273012345670003"
                    value={userNik}
                    onChange={(e) => setUserNik(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none text-slate-900 focus:ring-2 focus:ring-[#00288e] text-sm tracking-widest font-semibold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Registrasi & Lengkapi Profil
                </button>
              </form>
            </div>
          )}

          {/* Tab 2: Pengurus Flow */}
          {activeTab === 'pengurus' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700">NIP / Username Pengurus</label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    defaultValue="admin_rt60"
                    disabled={isAdminMode}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-slate-900 bg-slate-50 transition-colors font-semibold text-[15px] cursor-not-allowed"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-700">Sandi Pengurus</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isAdminMode}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-slate-900 bg-slate-50 transition-colors font-semibold tracking-widest cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAdminMode}
                    onChange={(e) => setIsAdminMode(e.checked)}
                    className="w-4 h-4 text-[#00288e] focus:ring-[#00288e] border-slate-300 rounded"
                  />
                  <span className="text-xs font-semibold text-slate-600">
                    Mode Akses Demo (Satu Ketukan)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#00288e] text-white hover:bg-blue-900 transition-colors font-bold rounded-xl shadow-md text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                Masuk sebagai Pengurus <ChevronRight size={16} />
              </button>
            </form>
          )}

          <div className="text-center mt-12 text-xs text-slate-400">
            <p>Butuh bantuan masuk? Hubungi Kelurahan Teknis di ext-110.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
