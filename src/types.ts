export type Role = 'guest' | 'onboarding' | 'warga' | 'pengurus';

export type PengurusView =
  | 'dashboard'
  | 'layanan-surat'
  | 'status-pengajuan'
  | 'data-warga'
  | 'pengaturan-wilayah'
  | 'profil';

export type WargaView = 'dashboard' | 'buat-surat' | 'status' | 'profil' | 'bantuan';

export interface ResidentProfile {
  nik: string;
  nama: string;
  tempatLahir: string;
  tanggalLahir: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  agama: string;
  pekerjaan: string;
  statusKawin: string;
  alamatKtp: string;
  blokNomor: string;
  noHp: string;
  ktpUrl?: string;
  progressOnboarding: number; // 0 to 100
}

export interface LetterRequest {
  id: string;
  nik: string;
  nama: string;
  jenisSurat: string;
  keperluan: string;
  tanggalPengajuan: string;
  status: 'pending' | 'disetujui' | 'ditolak';
  nomorSurat?: string;
  catatanPenolakan?: string;
  tglPersetujuan?: string;
  keperluanDetail?: {
    rt?: string;
    rw?: string;
    blok?: string;
    keteranganTambahan?: string;
  };
}

export interface RTConfig {
  rtNumber: string;
  rwNumber: string;
  kelurahan: string;
  kecamatan: string;
  kota: string;
  kodePos: string;
  namaKetua: string;
  nikKetua: string;
  noHpKetua: string;
  alamatSekretariat: string;
  stampUrl?: string;
  logoUrl?: string;
  signatureUrl?: string;
}

export interface ActiveUser {
  nama: string;
  nik: string;
  role: Role;
  wargaProfile?: ResidentProfile;
}
