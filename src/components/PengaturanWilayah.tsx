import React, { useState } from 'react';
import { 
  Building, Settings, QrCode, Upload, Save, CheckCircle, 
  Trash2, Link2, Download, Shield, Landmark, Edit, MapPin 
} from 'lucide-react';
import { RTConfig } from '../types';
import { MAP_BLOCKS } from '../mockData';

interface PengaturanWilayahProps {
  rtConfig: RTConfig;
  onUpdateConfig: (updated: RTConfig) => void;
}

export function PengaturanWilayah({ rtConfig, onUpdateConfig }: PengaturanWilayahProps) {
  const [activeTab, setActiveTab] = useState<'profil-rt' | 'blok-perumahan' | 'qr-registrasi'>('profil-rt');
  const [form, setForm] = useState<RTConfig>({ ...rtConfig });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [qrUrl, setQrUrl] = useState(`https://silas60.id/register?sec=rt${rtConfig.rtNumber}-rw${rtConfig.rwNumber}`);
  const [copied, setCopied] = useState(false);

  const [blocks, setBlocks] = useState(MAP_BLOCKS);
  const [newBlock, setNewBlock] = useState('');
  const [newCount, setNewCount] = useState(5);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig(form);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addNewBlock = () => {
    if (!newBlock.trim()) return;
    setBlocks([
      ...blocks,
      {
        id: newBlock.toUpperCase().charAt(0),
        name: `Blok ${newBlock.toUpperCase()}`,
        coordinates: 'M 10,10 L 50,10 L 50,50 L 10,50 Z', // default small rect for SVG
        color: '#6366f1',
        count: newCount,
      }
    ]);
    setNewBlock('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Konfigurasi Wilayah & Aset RT 60</h2>
          <p className="text-xs text-slate-500 mt-1">Atur data administratif rukun tetangga, cap stempel, dan koordinasi warga.</p>
        </div>
        
        {saveSuccess && (
          <div className="bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-250 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle size={14} /> Berhasil diselamatkan!
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('profil-rt')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'profil-rt' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building size={16} /> Profil Administrasi RT
        </button>
        <button
          onClick={() => setActiveTab('blok-perumahan')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'blok-perumahan' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin size={16} /> Blok Perumahan / KK
        </button>
        <button
          onClick={() => setActiveTab('qr-registrasi')}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 -mb-px flex items-center gap-1.5 ${
            activeTab === 'qr-registrasi' 
              ? 'border-[#00288e] text-[#00288e]' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <QrCode size={16} /> QR Registrasi Warga
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'profil-rt' && (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b pb-2">Atribut Lembaga RT 60 / RW 14</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Nomor Rukun Tetangga (RT)</label>
                <input
                  type="text"
                  value={form.rtNumber}
                  onChange={(e) => setForm(p => ({ ...p, rtNumber: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Nomor Rukun Warga (RW)</label>
                <input
                  type="text"
                  value={form.rwNumber}
                  onChange={(e) => setForm(p => ({ ...p, rwNumber: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Kelurahan</label>
                <input
                  type="text"
                  value={form.kelurahan}
                  onChange={(e) => setForm(p => ({ ...p, kelurahan: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-700">Kecamatan</label>
                <input
                  type="text"
                  value={form.kecamatan}
                  onChange={(e) => setForm(p => ({ ...p, kecamatan: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700">Alamat Kantor Sekretariat RT</label>
              <textarea
                value={form.alamatSekretariat}
                onChange={(e) => setForm(p => ({ ...p, alamatSekretariat: e.target.value }))}
                rows={2}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#00288e] outline-none text-sm text-slate-900 bg-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#00288e] hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer shadow-sm ml-auto"
            >
              <Save size={14} /> Simpan Profil Terdaftar
            </button>
          </div>

          {/* Logo preview sidebar configurations */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Logo Kabupaten / Kelurahan</h4>
              <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-xl bg-slate-50 gap-4">
                {form.logoUrl && (
                  <img src={form.logoUrl} alt="Logo" className="w-20 h-20 object-contain mix-blend-multiply" />
                )}
                <button 
                  type="button"
                  className="px-4 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-700 transition-colors shadow-sm"
                >
                  Unggah Logo Baru
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Block Populations panel */}
      {activeTab === 'blok-perumahan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Penanggung Jawab Blok & Sektor</h3>
              <span className="px-2.5 py-1 bg-blue-50 text-[#00288e] text-[11px] font-bold rounded-md">RT Mandiri Pekalongan</span>
            </div>

            <div className="divide-y rounded-xl border border-slate-150 overflow-hidden bg-slate-50/50">
              {blocks.map((b) => (
                <div key={b.id} className="p-4 flex justify-between items-center hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: b.color }}></span>
                    <h4 className="text-sm font-bold text-slate-905">{b.name}</h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-slate-500 font-semibold">{b.count} Kepala Keluarga</span>
                    <button className="text-red-600 hover:text-red-800 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Tambah Sektor Baru</h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Kode Huruf Blok</label>
                <input
                  type="text"
                  placeholder="Contoh: F"
                  maxLength={1}
                  value={newBlock}
                  onChange={(e) => setNewBlock(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#00288e] text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Prediksi Kepala Keluarga</label>
                <input
                  type="number"
                  value={newCount}
                  onChange={(e) => setNewCount(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#00288e] text-sm"
                />
              </div>
              <button
                type="button"
                onClick={addNewBlock}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                Tambahkan Blok Kediaman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite QR sharing code panel */}
      {activeTab === 'qr-registrasi' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 max-w-xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#00288e] mx-auto">
            <QrCode size={22} />
          </div>

          <div className="space-y-2">
            <h3 className="text-md font-bold text-slate-900 tracking-tight">Undangan Registrasi Mandiri Warga RT {rtConfig.rtNumber}</h3>
            <p className="text-xs text-slate-505 max-w-sm mx-auto leading-relaxed">Letakkan QR Code ini di papan pengumuman RT sehingga keluarga baru dapat memindai draf registrasi onboarding secara mandiri dari gawai masing-masing.</p>
          </div>

          <div className="border border-slate-200 shadow-sm p-5 w-44 h-44 mx-auto rounded-xl bg-slate-50 flex items-center justify-center">
            {/* Visual simulation of high-fidelity invite QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#00288e]">
              <path d="M10,10 H30 V30 H10 Z M10,12 V28 H28 V12 Z" fill="currentColor" />
              <path d="M15,15 H25 V25 H15 Z" fill="currentColor" />
              <path d="M70,10 H90 V30 H70 Z M70,12 V28 H88 V12 Z" fill="currentColor" />
              <path d="M75,15 H85 V25 H75 Z" fill="currentColor" />
              <path d="M10,70 H30 V90 H10 Z M10,72 V88 H28 V72 Z" fill="currentColor" />
              <path d="M15,15 H25 V25 H15 Z" fill="currentColor" />
              <circle cx="20" cy="80" r="5" fill="currentColor" />
              <rect x="40" y="10" width="8" height="8" fill="currentColor" />
              <rect x="52" y="10" width="10" height="4" fill="currentColor" />
              <rect x="40" y="22" width="18" height="6" fill="currentColor" />
              <rect x="40" y="40" width="10" height="10" fill="currentColor" />
              <rect x="55" y="45" width="25" height="12" fill="currentColor" />
              <rect x="42" y="72" width="28" height="12" fill="currentColor" />
              <rect x="75" y="75" width="15" height="15" fill="currentColor" />
            </svg>
          </div>

          <div className="space-y-4 max-w-md mx-auto pt-2">
            <div className="relative flex items-center border rounded-xl overflow-hidden shadow-inner font-mono text-xs bg-slate-50">
              <span className="flex-1 px-4 py-3 text-slate-500 text-left truncate">{qrUrl}</span>
              <button 
                type="button"
                onClick={handleCopyLink}
                className="px-4 py-3 bg-[#00288e] hover:bg-blue-900 text-white font-bold transition-colors cursor-pointer shadow-md select-all shrink-0 font-sans"
              >
                {copied ? 'Tersalin' : 'Salin Tautan'}
              </button>
            </div>

            <button
              type="button"
              className="w-full py-2.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download size={14} /> Unduh QR Code dalam PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
