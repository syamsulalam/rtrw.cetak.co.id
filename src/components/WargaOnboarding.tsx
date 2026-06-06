import React, { useState } from 'react';
import { 
  User, Briefcase, MapPin, FileUp, Sparkles, Check, 
  ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Eye, AlertCircle
} from 'lucide-react';
import { ActiveUser, ResidentProfile } from '../types';

interface WargaOnboardingProps {
  currentUser: ActiveUser;
  onComplete: (updatedProfile: ResidentProfile) => void;
  onLogout: () => void;
}

export function WargaOnboarding({ currentUser, onComplete, onLogout }: WargaOnboardingProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [form, setForm] = useState<ResidentProfile>({
    nik: currentUser.nik,
    nama: currentUser.nama,
    tempatLahir: '',
    tanggalLahir: '',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: '',
    statusKawin: 'Belum Kawin',
    alamatKtp: '',
    blokNomor: '',
    noHp: '',
    progressOnboarding: 0,
    ktpUrl: '',
  });

  const [ktpPreview, setKtpPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleKtpFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleKtpFile(e.target.files[0]);
    }
  };

  const handleKtpFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setKtpPreview(reader.result as string);
      setForm((prev) => ({
        ...prev,
        ktpUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const triggerKtpUploadMock = () => {
    // Inject a beautiful mock Indonesian KTP image
    const mockKtpBase64 = "https://lh3.googleusercontent.com/aida-public/AB6AXuBSp_C0U186E128y9vW-yU1N";
    setKtpPreview(mockKtpBase64);
    setForm((prev) => ({
      ...prev,
      ktpUrl: mockKtpBase64,
    }));
  };

  const validateStep = () => {
    setError(null);
    if (step === 1) {
      if (!form.nama.trim() || !form.tempatLahir.trim() || !form.tanggalLahir) {
        setError('Mohon lengkapi seluruh data kependudukan.');
        return false;
      }
    } else if (step === 2) {
      if (!form.agama || !form.pekerjaan.trim()) {
        setError('Mohon lengkapi profil sosial dan jenis pekerjaan.');
        return false;
      }
    } else if (step === 3) {
      if (!form.alamatKtp.trim() || !form.blokNomor || !form.noHp.trim()) {
        setError('Mohon lengkapi alamat KTP, blok rumah RT 60, dan nomor WhatsApp.');
        return false;
      }
    } else if (step === 4) {
      if (!form.ktpUrl) {
        setError('Anda wajib mengunggah salinan KTP Kependudukan.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((v) => Math.min(v + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setError(null);
    setStep((v) => Math.max(v - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep()) {
      const finalProfile: ResidentProfile = {
        ...form,
        progressOnboarding: 100,
      };
      onComplete(finalProfile);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex justify-between items-center pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00288e] flex items-center justify-center text-white font-bold text-sm shadow-sm">
            S
          </div>
          <span className="text-md font-bold text-[#00288e] tracking-tight">SILAS Warga</span>
        </div>
        <button 
          onClick={onLogout}
          className="px-3.5 py-1.5 text-slate-500 hover:text-red-600 transition-colors text-xs font-bold font-sans rounded-lg hover:bg-slate-100"
        >
          Keluar (Batal)
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden my-8 flex flex-col">
        {/* Progress Tracker Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Langkah {step} dari {totalSteps}</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                {step === 1 && 'Data Kependudukan'}
                {step === 2 && 'Profil Sosial & Pekerjaan'}
                {step === 3 && 'Alamat Domisili & Kontak'}
                {step === 4 && 'Konfirmasi & Unggah KTP'}
              </h2>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-[#00288e] text-xs font-bold rounded-full">
              {Math.round((step / totalSteps) * 100)}% Selesai
            </span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex gap-0.5">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`flex-1 h-full transition-all duration-300 ${
                  s <= step ? 'bg-[#00288e]' : 'bg-slate-300/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Body View */}
        <div className="p-8 flex-1 min-h-[360px]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs font-semibold flex items-start gap-3">
              <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Personal Demographic data */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Nomor Induk Kependudukan (NIK)</label>
                  <input
                    type="text"
                    disabled
                    value={form.nik}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-500 rounded-xl font-mono text-[15px] font-semibold tracking-wide cursor-not-allowed"
                  />
                  <p className="text-[10px] text-slate-400">NIK telah terkunci berdasarkan pendaftaran awal.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Nama Lengkap (Sesuai KTP)</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleInputChange}
                    placeholder="Contoh: Rian Hidayat"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Tempat Lahir</label>
                  <input
                    type="text"
                    name="tempatLahir"
                    value={form.tempatLahir}
                    onChange={handleInputChange}
                    placeholder="Contoh: Pekalongan"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="tanggalLahir"
                    value={form.tanggalLahir}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Jenis Kelamin</label>
                <div className="flex gap-4">
                  {['Laki-laki', 'Perempuan'].map((g) => (
                    <label key={g} className="flex-1 p-3 border border-slate-200 rounded-xl flex items-center justify-center gap-2 cursor-pointer select-none bg-white hover:bg-slate-50 transition-colors">
                      <input
                        type="radio"
                        name="jenisKelamin"
                        checked={form.jenisKelamin === g}
                        onChange={() => setForm((p) => ({ ...p, jenisKelamin: g as any }))}
                        className="text-[#00288e] focus:ring-[#00288e]"
                      />
                      <span className="text-sm font-semibold text-slate-800">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Social & Occupation data */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700 font-sans">Agama</label>
                  <select
                    name="agama"
                    value={form.agama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Budha">Budha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Status Pernikahan</label>
                  <select
                    name="statusKawin"
                    value={form.statusKawin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  >
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Pekerjaan Utama</label>
                <input
                  type="text"
                  name="pekerjaan"
                  value={form.pekerjaan}
                  onChange={handleInputChange}
                  placeholder="Contoh: Karyawan Swasta, Wiraswasta, Mahasiswa"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                />
              </div>

              <div className="flex bg-slate-50 border border-slate-200 rounded-2xl p-4 gap-3 items-start">
                <ShieldCheck size={18} className="text-[#00288e] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  Data kependudukan ini akan dilindungi secara ketat sesuai dengan regulasi enkripsi data pribadi pengurus RT/RW Pekalongan.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Addresses and Contact data */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700 block">Pilih Blok Kediaman (Di RT 60)</label>
                  <select
                    name="blokNomor"
                    value={form.blokNomor}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                  >
                    <option value="">-- Pilih Blok Rumah --</option>
                    <option value="Blok A No. 12">Blok A No. 12</option>
                    <option value="Blok B No. 8">Blok B No. 8</option>
                    <option value="Blok C No. 17">Blok C No. 17</option>
                    <option value="Blok D No. 5">Blok D No. 5</option>
                    <option value="Blok E No. 20">Blok E No. 20</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">Nomor WhatsApp Aktif</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 text-slate-400 font-semibold text-sm">+62</span>
                    <input
                      type="text"
                      name="noHp"
                      value={form.noHp}
                      onChange={handleInputChange}
                      placeholder="8123456789"
                      className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[15px]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Alamat Lengkap Sesuai KTP</label>
                <textarea
                  name="alamatKtp"
                  value={form.alamatKtp}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Contoh: Jl. Merak No. 17, Pekalongan"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white text-[14px]"
                />
              </div>
            </div>
          )}

          {/* STEP 4: KTP document upload */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center md:text-left">
                <h4 className="text-slate-900 font-bold mb-1 text-sm">Unggah Foto Kartu Tanda Penduduk (KTP)</h4>
                <p className="text-xs text-slate-500">Salinan digital ini diperlukan pengurus untuk pencocokan NIK resmi secara visual.</p>
              </div>

              {/* Drag n Drop Canvas */}
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`w-full p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center relative transition-all min-h-[220px] ${
                  dragActive ? 'border-[#00288e] bg-blue-50/20' : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {ktpPreview ? (
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-[1.58/1] w-72 max-w-full">
                      <img
                        src={ktpPreview}
                        alt="KTP Upload Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => { setKtpPreview(null); setForm(p => ({ ...p, ktpUrl: '' })); }}
                          className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 bg-white border border-emerald-200 rounded-full">
                      <Check size={14} /> Berkas Terunggah
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-[#00288e] rounded-full flex items-center justify-center mb-4">
                      <FileUp size={22} />
                    </div>
                    <p className="text-sm font-bold text-slate-800 mb-1">
                      Seret & jatuhkan berkas KTP di sini
                    </p>
                    <p className="text-[11px] text-slate-400 mb-4 uppercase tracking-widest font-sans">
                      Format PNG, JPG, JPEG (Max 4MB)
                    </p>
                    
                    <div className="flex gap-3">
                      <label className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-sm">
                        Pilih Berkas Manual
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={triggerKtpUploadMock}
                        className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
                      >
                        <Sparkles size={12} /> Gunakan Scan KTP Demo
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Badge info */}
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#00288e] mt-0.5 shrink-0" />
                <div className="text-xs text-slate-600 leading-normal">
                  <span className="font-bold text-slate-900 block mb-0.5">Sertifikasi Keamanan Data</span>
                  Setelah terunggah, foto KTP hanya dapat dilihat terbatas oleh Ketua RT 60 untuk keperluan verifikasi surat pengantar.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="bg-slate-50 border-t border-slate-200 p-6 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-5 py-2.5 rounded-lg border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              step === 1 
                ? 'opacity-40 text-slate-400 border-slate-200 bg-white cursor-not-allowed' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
          >
            <ArrowLeft size={16} /> Sebelumnya
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-[#00288e] text-white hover:bg-blue-900 transition-colors font-bold rounded-lg text-sm flex items-center gap-2 shadow-sm cursor-pointer"
            >
              Selanjutnya <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-7 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-bold rounded-lg text-sm flex items-center gap-2 shadow-md cursor-pointer"
            >
              Simpan Profil Warga <Check size={16} />
            </button>
          )}
        </div>
      </main>

      {/* Info Footnote */}
      <footer className="max-w-xl mx-auto text-center text-xs text-slate-400 font-medium">
        Terdapat masalah pada sistem onboarding? Kunjungi balai warga RT 60 di jam kerja.
      </footer>
    </div>
  );
}
