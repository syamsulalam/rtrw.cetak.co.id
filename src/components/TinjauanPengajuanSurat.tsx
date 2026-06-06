import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Check, X, Printer, FileText, Calendar, 
  User, Shield, Eye, AlertCircle, RefreshCw, Send, CheckCircle, Clock 
} from 'lucide-react';
import { LetterRequest, ResidentProfile, RTConfig } from '../types';

interface TinjauanPengajuanSuratProps {
  letter: LetterRequest;
  resident?: ResidentProfile;
  rtConfig: RTConfig;
  onApprove: (id: string, nomorSurat: string) => void;
  onReject: (id: string, catatan: string) => void;
  onBack: () => void;
}

export function TinjauanPengajuanSurat({ 
  letter, 
  resident, 
  rtConfig, 
  onApprove, 
  onReject, 
  onBack 
}: TinjauanPengajuanSuratProps) {
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [docNumber, setDocNumber] = useState(
    letter.nomorSurat || `0${Math.floor(Math.random() * 90) + 10}/SP/RT${rtConfig.rtNumber}/RW${rtConfig.rwNumber}/${getCurrentRomanMonth()}/2026`
  );
  
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  // Helper utility to get current Roman month for Indonesian letters
  function getCurrentRomanMonth() {
    const months = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    return months[new Date().getMonth()];
  }

  const handleApproveAction = () => {
    onApprove(letter.id, docNumber);
  };

  const handleRejectAction = () => {
    if (!rejectReason.trim()) return;
    onReject(letter.id, rejectReason);
    setRejecting(false);
  };

  const triggerPrintSimulation = () => {
    setIsPrinting(true);
    setPrintSuccess(false);
    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);
      setTimeout(() => setPrintSuccess(false), 3000);
    }, 2000);
  };

  const displayNik = resident?.nik || letter.nik;
  const displayNama = resident?.nama || letter.nama;
  const displayGender = resident?.jenisKelamin || 'Laki-laki';
  const displayTempatLahir = resident?.tempatLahir || 'Pekalongan';
  const displayTglLahir = resident?.tanggalLahir || '1995-05-15';
  const displayAgama = resident?.agama || 'Islam';
  const displayPekerjaan = resident?.pekerjaan || 'Wiraswasta';
  const displayStatusKawin = resident?.statusKawin || 'Keluarga';
  const displayAlamat = resident?.alamatKtp || 'Jl. Kebonagung, Pekalongan';
  const blockNumber = resident?.blokNomor || 'RT 60 / RW 14';

  return (
    <div className="space-y-8 relative">
      {/* Simulation overlay for print */}
      {isPrinting && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full text-center space-y-4 shadow-xl border border-slate-100 flex flex-col items-center">
            <RefreshCw size={40} className="text-[#00288e] animate-spin" />
            <h4 className="text-md font-bold text-slate-900">Mempersiapkan Dokumen...</h4>
            <p className="text-xs text-slate-500 leading-normal">Surat pengantar sedang ditransfer ke printer antrean RT/RW digital Pekalongan secara otomatis.</p>
          </div>
        </div>
      )}

      {printSuccess && (
        <div className="fixed top-20 right-8 bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-xl z-50 flex items-center gap-3 animate-fade-in border border-emerald-500 font-semibold text-sm">
          <CheckCircle size={18} />
          <span>Simulasi Pencetakan Surat Pengantar Selesai!</span>
        </div>
      )}

      {/* Top action header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs transition-all shadow-sm w-fit"
        >
          <ArrowLeft size={16} /> Kembali ke Dasbor
        </button>

        <div className="flex flex-wrap gap-2">
          {letter.status === 'pending' && !rejecting && (
            <>
              <button 
                onClick={() => setRejecting(true)}
                className="px-4 py-2 bg-red-50 border border-red-200 hover:bg-red-100/60 text-red-700 font-bold rounded-xl text-xs flex items-center gap-2 transition-colors cursor-pointer"
              >
                <X size={16} /> Tolak Pengajuan
              </button>
              <button 
                onClick={handleApproveAction}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <Check size={16} /> Setujui & Tanda Tangani
              </button>
            </>
          )}

          {letter.status === 'disetujui' && (
            <button 
              onClick={triggerPrintSimulation}
              className="px-5 py-2.5 bg-[#00288e] hover:bg-blue-900 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
            >
              <Printer size={16} /> Cetak Surat Fisik
            </button>
          )}
        </div>
      </div>

      {/* Reject Overlay Row */}
      {rejecting && (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex flex-col md:flex-row gap-4 items-end animate-fade-in">
          <div className="flex-1 space-y-2">
            <h4 className="text-xs font-bold text-red-800 uppercase tracking-widest flex items-center gap-1.5">
              <AlertCircle size={14} /> Tuliskan Alasan Penolakan Surat
            </h4>
            <input
              type="text"
              placeholder="Contoh: Lampiran KTP kurang jelas, silakan upload ulang."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-4 py-2.5 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none text-slate-900 bg-white text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setRejecting(false)}
              className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl text-xs cursor-pointer"
            >
              Batal
            </button>
            <button 
              onClick={handleRejectAction}
              disabled={!rejectReason.trim()}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs disabled:opacity-50 cursor-pointer"
            >
              Kirim Penolakan
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Resident Profile Details Review */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
            <div>
              <h3 className="text-[15px] font-bold text-slate-900">Verifikasi Profile Warga</h3>
              <p className="text-xs text-slate-500 mt-0.5">Sesuai data terdaftar onboarding SILAS.</p>
            </div>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-[#00288e] border border-blue-100 flex items-center justify-center font-bold text-lg">
                {displayNama.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-905">{displayNama}</h4>
                <p className="text-[11px] font-semibold text-slate-400 font-mono tracking-wide">{displayNik}</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-medium text-slate-600">
              <div className="flex justify-between">
                <span>Kelamin:</span>
                <span className="text-slate-905 font-semibold text-right">{displayGender}</span>
              </div>
              <div className="flex justify-between">
                <span>Tempat/Tgl Lahir:</span>
                <span className="text-slate-905 font-semibold text-right">{displayTempatLahir}, {displayTglLahir}</span>
              </div>
              <div className="flex justify-between">
                <span>Pekerjaan:</span>
                <span className="text-slate-905 font-semibold text-right">{displayPekerjaan}</span>
              </div>
              <div className="flex justify-between">
                <span>Blok Kediaman:</span>
                <span className="text-emerald-700 font-bold text-right">{blockNumber}</span>
              </div>
            </div>

            {resident?.ktpUrl && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Verifikasi Berkas KTP:</span>
                <div className="border border-slate-200 rounded-xl overflow-hidden aspect-[1.58/1] bg-slate-50 relative group">
                  <img
                    src={resident.ktpUrl}
                    alt="Salinan KTP"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-800 border shadow-sm">Foto Jelas</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-50 border border-slate-250 p-5 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Detail Keperluan Pengajuan</h4>
            <div className="text-xs space-y-3 leading-relaxed text-slate-600">
              <p className="bg-white p-3.5 border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-800">{letter.keperluan}</p>
              <div className="flex gap-2">
                <Clock size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span>Diajukan pada: {letter.tanggalPengajuan}</span>
              </div>
              {letter.status === 'ditolak' && letter.catatanPenolakan && (
                <div className="mt-2 p-3 bg-red-100/50 border border-red-200 rounded-lg">
                  <span className="text-[10px] font-bold text-red-800 uppercase tracking-wider block">Alasan Penolakan:</span>
                  <p className="text-xs text-red-700 italic mt-0.5 font-medium">"{letter.catatanPenolakan}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: A4 letterhead container mockup */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Visual letterhead preview box */}
          <div className="bg-white hover:shadow-md transition-shadow aspect-[1/1.414] w-[640px] max-w-full p-12 border border-slate-300 shadow-sm relative overflow-hidden flex flex-col font-sans text-slate-900 pointer-events-none">
            {/* Stamp / Signature relative position wrapper */}
            <div className="flex-1 flex flex-col">
              {/* Kop Surat (Traditional Letterhead) */}
              <div className="text-center border-b-[3px] border-slate-900 pb-3 flex items-center justify-center gap-6">
                {rtConfig.logoUrl && (
                  <img 
                    src={rtConfig.logoUrl} 
                    alt="Village Logo" 
                    className="w-16 h-16 object-contain mix-blend-multiply" 
                  />
                )}
                <div className="space-y-0.5">
                  <h3 className="text-[15px] font-bold uppercase tracking-tight">Pemerintah {rtConfig.kota.toUpperCase()}</h3>
                  <h4 className="text-[13px] font-bold uppercase tracking-tight">Kecamatan {rtConfig.kecamatan.toUpperCase()} - Kelurahan {rtConfig.kelurahan.toUpperCase()}</h4>
                  <h2 className="text-[16px] font-extrabold uppercase tracking-wide">Pengurus Rukun Tetangga {rtConfig.rtNumber} Rukun Warga {rtConfig.rwNumber}</h2>
                  <p className="text-[10px] font-medium text-slate-500 italic mt-0.5">Sekretariat: {rtConfig.alamatSekretariat}</p>
                </div>
              </div>

              {/* Letter Title */}
              <div className="my-8 text-center space-y-1">
                <h2 className="text-[16px] font-bold uppercase underline tracking-wider">Surat Pengantar RT/RW</h2>
                <p className="text-xs text-slate-600 font-medium">
                  {letter.status === 'disetujui' ? `Nomor: ${letter.nomorSurat || docNumber}` : 'Nomor: [Ditulis Setelah Persetujuan]'}
                </p>
              </div>

              {/* Introductory Paragraph */}
              <div className="text-[12px] leading-relaxed space-y-5 text-justify">
                <p>Yang bertanda tangan di bawah ini Pengurus Rukun Tetangga {rtConfig.rtNumber} / Rukun Warga {rtConfig.rwNumber} Kelurahan {rtConfig.kelurahan}, Kecamatan {rtConfig.kecamatan}, Kota {rtConfig.kota} dengan ini menerangkan bahwa:</p>

                {/* Resident Details List aligned beautifully */}
                <table className="w-full text-[12px] pl-6 border-collapse my-2 ml-4">
                  <tbody>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">Nama Lengkap<span>:</span></td>
                      <td className="py-1 px-3 uppercase font-extrabold text-slate-905">{displayNama}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">NIK KTP<span>:</span></td>
                      <td className="py-1 px-3 font-mono font-semibold">{displayNik}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">Tempat/Tanggal Lahir<span>:</span></td>
                      <td className="py-1 px-3">{displayTempatLahir}, {displayTglLahir}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">Agama<span>:</span></td>
                      <td className="py-1 px-3">{displayAgama}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">Pekerjaan Utama<span>:</span></td>
                      <td className="py-1 px-3">{displayPekerjaan}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 flex justify-between font-semibold">Status Pernikahan<span>:</span></td>
                      <td className="py-1 px-3">{displayStatusKawin}</td>
                    </tr>
                    <tr>
                      <td className="w-45 py-1 flex justify-between font-semibold">Alamat Sesuai KTP<span>:</span></td>
                      <td className="py-1 px-3 leading-normal">{displayAlamat}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Utility Context Paragraph */}
                <p>Bahwa nama yang tersebut di atas adalah benar-benar warga yang berdomisili di wilayah pengurusan RT {rtConfig.rtNumber} / RW {rtConfig.rwNumber} Kelurahan {rtConfig.kelurahan} dan bertempat tinggal di <strong className="text-slate-905 font-bold">{blockNumber}</strong>.</p>
                <p>Surat pengantar ini diberikan secara sah untuk keperluan perihal pelayanan: <u className="font-bold text-slate-900">{letter.jenisSurat}</u>.</p>
                <p>Demikian surat keterangan pengantar ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* Signers dual column row (Absolute stamp overlapping) */}
              <div className="mt-14 grid grid-cols-2 text-center text-[12px] relative">
                <div>
                  <p className="mb-14">Pemohon / Warga,</p>
                  <p className="font-bold underline uppercase">{displayNama}</p>
                </div>
                
                {/* Official Signer Chairman */}
                <div className="relative">
                  <p className="mb-0">Pekalongan, {letter.tglPersetujuan || letter.tanggalPengajuan}</p>
                  <p className="mb-14 font-semibold">Ketua Rukun Tetangga {rtConfig.rtNumber},</p>
                  
                  {/* Absolute Signature & Stamp Layering */}
                  {letter.status === 'disetujui' ? (
                    <div className="absolute inset-x-0 bottom-4 flex justify-center items-center h-20 pointer-events-none select-none">
                      {/* Transparent Signature overlapping stamp */}
                      {rtConfig.signatureUrl && (
                        <img 
                          src={rtConfig.signatureUrl} 
                          alt="RT Signature" 
                          className="w-32 object-contain select-none -translate-x-3 pointer-events-none absolute z-10" 
                        />
                      )}
                      {/* Color-multiplied stamp slightly rotatated of realism */}
                      {rtConfig.stampUrl && (
                        <img 
                          src={rtConfig.stampUrl} 
                          alt="RT Stamp" 
                          className="w-24 h-24 object-contain opacity-85 select-none rotate-[12deg] translate-x-3 pointer-events-none absolute z-0 mix-blend-multiply" 
                        />
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-x-0 bottom-6 bg-slate-100 border border-dashed border-slate-300 py-2.5 rounded text-[10px] text-slate-400 font-bold uppercase flex justify-center items-center gap-1">
                      <Clock size={12} /> Belum Ditandatangani
                    </div>
                  )}

                  <p className="font-bold underline uppercase mt-4">{rtConfig.namaKetua}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
