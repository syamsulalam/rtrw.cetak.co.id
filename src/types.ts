export type Role = 'guest' | 'onboarding' | 'warga' | 'pengurus';

export type PengurusView =
  | 'dashboard'
  | 'layanan-surat'
  | 'status-pengajuan'
  | 'data-warga'
  | 'data-kk'
  | 'ruang-pengurus'
  | 'pengaturan-wilayah'
  | 'profil'
  | 'log-aktivitas'
  | 'laporan';

export type WargaView = 'dashboard' | 'buat-surat' | 'status' | 'profil' | 'bantuan' | 'cari-pengurus';

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
  blokNomor: string; // Format e.g., "Blok I No. 12A"
  noHp: string;
  ktpUrl?: string;
  progressOnboarding: number; // 0 to 100
  kkNo?: string;               // 16-Digit KK Number to group KKs
  kkRole?: 'Kepala Keluarga' | 'Istri' | 'Anak' | 'Lainnya'; // KK roles
  statusWarga?: 'aktif' | 'tertunda' | 'ditolak'; // Online registration application status
}

export interface LetterRequest {
  id: string;
  nik: string;
  nama: string;
  jenisSurat: string;
  keperluan: string;
  tanggalPengajuan: string;
  status: 'pending' | 'disetujui' | 'ditolak' | 'draft';
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

export interface ActivityLog {
  id: string;
  timestamp: string;
  category: 'letter' | 'resident' | 'auth' | 'system';
  text: string;
  userNik?: string;
  userName?: string;
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

export interface Officer {
  id: string;
  name: string;
  nik: string;
  role: 'Ketua RW' | 'Wakil RW' | 'Sekretaris RW' | 'Bendahara RW' | 'Ketua RT' | 'Wakil RT' | 'Sekretaris RT' | 'Bendahara RT';
  level: 'RW' | 'RT';
  rtNumber?: string; // If level is RT
  phone: string;
  email?: string;
}

export interface RuangPengurusSpace {
  id: string;
  name: string;
  rwNumber: string;
  alamatSekretariatRw: string;
  gmapCenter: { lat: number; lng: number; label: string };
  gmapRadiusMeters: number; // radius of governing blanket service area
  rtsGoverned: string[]; // List of RTs under this RW
}
