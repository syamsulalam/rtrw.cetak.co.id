import React from 'react';
import { Pencil, Save, Info, Upload, Eye } from 'lucide-react';
import { RTConfig } from '../types';

interface ProfilPengurusProps {
  rtConfig: RTConfig;
  onUpdateConfig: (updated: RTConfig) => void;
}

export function ProfilPengurus({ rtConfig, onUpdateConfig }: ProfilPengurusProps) {
  const [form, setForm] = React.useState<RTConfig>({ ...rtConfig });
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(form);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Profile Section */}
      <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative group shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPmp16pt1K3bQ8KZ-sNpbO1RgYRU2cJBM1_mQORGzke1Hgo6YyfBpCGr7TdaYgZTn_3X6fxpe10UWH9QPCO-_hpKvO8E8hn7Up2xRHVsvpI1Ituk130mNugTpBK37PY2nNL7kw9rpNBxsxR2l_ewyvBXDckvu6AlAAkVryYB7Lc3iZgViatwYPdGP_8qPIRRC9DeA5h7XuOG5SbViJzPk5DG4fT0puK6wbfLcEGVlSPAT0FzFTKWXcwVgCcqxBbSIvN-wBxLS5pxVD"
            alt={form.namaKetua}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-50 shadow-sm relative z-10"
          />
          <button className="absolute bottom-1 right-1 p-2 bg-[#00288e] text-white rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center z-20">
            <Pencil size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-905 tracking-tight">
              {form.namaKetua}
            </h2>
            <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[11px] font-bold uppercase tracking-wider rounded-full w-fit mx-auto md:mx-0 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
              Aktif
            </span>
          </div>
          <p className="text-slate-500 text-[15px] mb-5 font-medium">
            Ketua RT {form.rtNumber} / RW {form.rwNumber} — Kelurahan {form.kelurahan}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 min-w-[140px]">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Masa Jabatan
              </p>
              <p className="text-[15px] font-semibold text-slate-800">2022 - 2027</p>
            </div>
            <div className="bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200 min-w-[140px]">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                Surat Terbit (Bulan ini)
              </p>
              <p className="text-[15px] font-semibold text-slate-800">24 Dokumen</p>
            </div>
          </div>
        </div>

        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/70 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Form */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-909 tracking-tight">
                  Data Resmi Pengurus
                </h3>
                <p className="text-sm text-slate-500 mt-1 font-medium">
                  Data ini akan muncul otomatis di kaki surat pengantar.
                </p>
              </div>
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#00288e] hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm shrink-0 w-full md:w-auto justify-center cursor-pointer"
              >
                <Save size={18} /> Simpan Perubahan
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Nama Lengkap (Beserta Gelar)
                  </label>
                  <input
                    type="text"
                    value={form.namaKetua}
                    onChange={(e) => setForm(p => ({ ...p, namaKetua: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white transition-all text-[15px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700 font-mono">
                    Nomor Induk Kependudukan (NIK)
                  </label>
                  <input
                    type="text"
                    value={form.nikKetua}
                    onChange={(e) => setForm(p => ({ ...p, nikKetua: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white transition-all font-mono text-[15px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Jabatan Resmi
                  </label>
                  <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-905 bg-white transition-all text-[15px] appearance-none">
                    <option value="Ketua RT">Ketua RT</option>
                    <option value="Sekretaris RT">Sekretaris RT</option>
                    <option value="Bendahara RT">Bendahara RT</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <span className="text-slate-500 font-semibold text-[15px]">+62</span>
                    </div>
                    <input
                      type="text"
                      value={form.noHpKetua}
                      onChange={(e) => setForm(p => ({ ...p, noHpKetua: e.target.value }))}
                      className="w-full pl-12 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] focus:border-[#00288e] outline-none text-slate-900 bg-white transition-all text-[15px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3.5 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                  <Info size={20} className="text-[#00288e] shrink-0 mt-0.5" />
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                    Pastikan nama dan NIK sesuai dengan KTP asli. Perubahan data ini 
                    akan langsung berdampak pada seluruh draf surat yang sedang diproses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column - Assets */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          {/* Signature */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-[16px] font-bold text-slate-900">
                Tanda Tangan Digital
              </h3>
            </div>
            <div className="p-6">
              <div className="w-full aspect-[16/9] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden transition-colors hover:bg-slate-100/50 hover:border-slate-300">
                {form.signatureUrl && (
                  <img
                    src={form.signatureUrl}
                    alt="Signature Preview"
                    className="w-56 object-contain opacity-90 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <span className="bg-white px-5 py-2.5 rounded-full font-semibold text-[#00288e] text-sm flex items-center gap-2 shadow-sm border border-slate-100">
                    <Upload size={16} /> Unggah Baru
                  </span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-slate-500 font-medium italic">
                Format: PNG Transparan, Max 2MB
              </p>
            </div>
          </div>

          {/* Stamp */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-200 bg-slate-50/50">
              <h3 className="text-[16px] font-bold text-slate-905">
                Stempel Resmi RT/RW
              </h3>
            </div>
            <div className="p-6 flex flex-col items-center justify-center">
              <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden transition-colors hover:bg-slate-100/50 hover:border-slate-300">
                {form.stampUrl && (
                  <img
                    src={form.stampUrl}
                    alt="Stamp Preview"
                    className="w-24 h-24 object-contain opacity-90 transition-opacity mix-blend-multiply"
                  />
                )}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                  <span className="bg-white p-2.5 rounded-full shadow-sm text-[#00288e]">
                    <Upload size={18} />
                  </span>
                </div>
              </div>
              <button className="mt-6 text-sm font-semibold text-[#00288e] hover:text-blue-800 transition-colors flex items-center gap-2 decoration-blue-200 hover:decoration-blue-400 p-2 rounded-lg hover:bg-blue-50">
                <Eye size={18} /> Lihat Detail Stempel
              </button>
            </div>
          </div>
        </section>

        {/* Bottom Stats Card */}
        <section className="lg:col-span-12 bg-[#00288e] rounded-xl p-8 flex flex-col md:flex-row justify-between items-center md:items-center gap-8 shadow-lg relative overflow-hidden">
          {/* Background pattern matching design vibe */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

          <div className="max-w-xl relative z-10 text-center md:text-left">
            <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Pencapaian Jabatan
            </h4>
            <p className="text-blue-100 text-[15px] leading-relaxed font-medium">
              Bapak Agus telah melayani warga selama 850 hari berturut-turut dengan
              tingkat kepuasan layanan 98%.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-14 relative z-10 pr-0 md:pr-10">
            <div className="text-center">
              <p className="text-4xl font-bold text-white tracking-tight mb-2">
                1,240
              </p>
              <p className="text-[12px] font-bold text-blue-200 uppercase tracking-widest">
                Total Surat
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white tracking-tight mb-2">
                482
              </p>
              <p className="text-[12px] font-bold text-blue-200 uppercase tracking-widest">
                Warga Terdaftar
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-white tracking-tight mb-2">
                24
              </p>
              <p className="text-[12px] font-bold text-blue-200 uppercase tracking-widest">
                Kegiatan Sosial
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
