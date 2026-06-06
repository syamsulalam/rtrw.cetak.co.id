import { LetterRequest, ResidentProfile, RTConfig, Officer, RuangPengurusSpace } from './types';

export const INITIAL_RT_CONFIG: RTConfig = {
  rtNumber: '60',
  rwNumber: '14',
  kelurahan: 'Kebonagung',
  kecamatan: 'Sukajaya',
  kota: 'Kota Pekalongan',
  kodePos: '51112',
  namaKetua: 'Agus Santoso, S.T.',
  nikKetua: '3515123456780001',
  noHpKetua: '81234567890',
  alamatSekretariat: 'Jl. Merpati No. 45, Kebonagung, Pekalongan',
  stampUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrQMsGgZMkgTzv-Wdf8AAahDrE8aCvUW2J19C4-f5OxpOjGwsWiJBaJNDZj7jUJ23fwIFOyShsc7kwK1ya1U8N8-yaEw6TprgSnZTWSeZSQ2904Tokw8zQiXcAOsA0h_dh_RCZLz97KMr1odea908vs66UXD-A_zSdleWkNp0Ndk2Wg7Zyz5UwEeABDeXY1YkI2lIOG0NPgZUyhoKimFVYEHdhBkYj9Nr5ZUi0yhUdcQvP59vaRiZp5QE98SAXLkjXWIrc9Kydoh1f',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHXbZ0z6v07mQ6v0l99pM4U0gSOfXq76nN-m28F-wB6N9SUn9Z_s2zX8O566bXk-gW7V3aD',
  signatureUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp489gAe-c8MrQR-s-Y5SF_wI9XDzkGoPT-TEAHtf87vKaD4L0eka0a-Nlcrtv3lE0SHnhd7DnRmVfsZL-ivarpIsqXcLFBc9bN7Al26oRb-lj5eNxM0yyvPEQbQX8_vQ4UwAUFhE8IqjdobjGL99tTxh46sPCJMWQI1CJCCfu2zoPc8XtyjPj3Cj3OEdIvWh_NRe3-8J2rwpYVtXFCUm3UCelu0U11peq5jh4VU-Q5Vftg-tieNnqsg2WjA0baUKNKh9-Xxpy4mGJ',
};

export const INITIAL_RESIDENTS: ResidentProfile[] = [
  {
    nik: '3273012345670001',
    nama: 'Budi Hartono',
    tempatLahir: 'Semarang',
    tanggalLahir: '1988-04-12',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Karyawan Swasta',
    statusKawin: 'Kawin',
    alamatKtp: 'Jl. Garuda No. 12, RT 60/RW 14, Kebonagung',
    blokNomor: 'Blok I No. 12A',
    noHp: '8112233445',
    progressOnboarding: 100,
    ktpUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSp_C0U186E128y9vW-yU1N',
    kkNo: '3273010908070001',
    kkRole: 'Kepala Keluarga',
    statusWarga: 'aktif',
  },
  {
    nik: '3273012345670002',
    nama: 'Siti Rahmawati',
    tempatLahir: 'Pekalongan',
    tanggalLahir: '1992-08-22',
    jenisKelamin: 'Perempuan',
    agama: 'Islam',
    pekerjaan: 'Ibu Rumah Tangga',
    statusKawin: 'Kawin',
    alamatKtp: 'Jl. Rajawali No. 8, RT 60/RW 14, Kebonagung',
    blokNomor: 'Blok I No. 12A', // Same family block details
    noHp: '8521122334',
    progressOnboarding: 100,
    kkNo: '3273010908070001',
    kkRole: 'Istri',
    statusWarga: 'aktif',
  },
  {
    nik: '3273012345670003',
    nama: 'Rian Hidayat',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2001-11-05',
    jenisKelamin: 'Laki-laki',
    agama: 'Kristen',
    pekerjaan: 'Mahasiswa',
    statusKawin: 'Belum Kawin',
    alamatKtp: 'Jl. Merak No. 17, RT 60/RW 14, Kebonagung',
    blokNomor: 'Blok C No. 17',
    noHp: '8775566778',
    progressOnboarding: 40, // Needs onboarding profile completion
    kkNo: '3273010908079999',
    kkRole: 'Kepala Keluarga',
    statusWarga: 'aktif',
  },
  {
    nik: '3273012345670004',
    nama: 'Rahmat Kartono',
    tempatLahir: 'Semarang',
    tanggalLahir: '2015-05-18',
    jenisKelamin: 'Laki-laki',
    agama: 'Islam',
    pekerjaan: 'Pelajar',
    statusKawin: 'Belum Kawin',
    alamatKtp: 'Jl. Garuda No. 12, RT 60/RW 14, Kebonagung',
    blokNomor: 'Blok I No. 12A',
    noHp: '8112233445',
    progressOnboarding: 100,
    kkNo: '3273010908070001',
    kkRole: 'Anak',
    statusWarga: 'aktif',
  },
];

export const INITIAL_OFFICERS: Officer[] = [
  // RW Level
  { id: 'OFF-01', name: 'Drs. H. Heru Baskoro', nik: '3515123456789001', role: 'Ketua RW', level: 'RW', phone: '081230001111', email: 'heru.baskoro@pekalongan.go.id' },
  { id: 'OFF-02', name: 'Bambang Tri Nugroho', nik: '3515123456789004', role: 'Wakil RW', level: 'RW', phone: '081230004444' },
  { id: 'OFF-03', name: 'Maya Indah Lestari, S.E.', nik: '3515123456789002', role: 'Sekretaris RW', level: 'RW', phone: '081230002222', email: 'maya.lestari@pekalongan.go.id' },
  { id: 'OFF-04', name: 'H. Ahmad Subarjo, M.B.A.', nik: '3515123456789003', role: 'Bendahara RW', level: 'RW', phone: '081230003333' },
  
  // RT 60 Under RW 14
  { id: 'OFF-05', name: 'Agus Santoso, S.T.', nik: '3515123456780001', role: 'Ketua RT', level: 'RT', rtNumber: '60', phone: '081234567890', email: 'rt60.sukajaya@pekalongan.go.id' },
  { id: 'OFF-06', name: 'Hendra Wijaya', nik: '3515123456780002', role: 'Wakil RT', level: 'RT', rtNumber: '60', phone: '081222222222' },
  { id: 'OFF-07', name: 'Riana Shanti, S.Kom.', nik: '3515123456780003', role: 'Sekretaris RT', level: 'RT', rtNumber: '60', phone: '081233333333' },
  { id: 'OFF-08', name: 'Joko Widodo', nik: '3515123456780004', role: 'Bendahara RT', level: 'RT', rtNumber: '60', phone: '081244444444' },

  // RT 61 Under RW 14 (Simulated neighbors)
  { id: 'OFF-09', name: 'Ir. H. Supriyono', nik: '3515123456781201', role: 'Ketua RT', level: 'RT', rtNumber: '61', phone: '081299990001' },
  { id: 'OFF-10', name: 'Suhartini, S.Pd.', nik: '3515123456781203', role: 'Sekretaris RT', level: 'RT', rtNumber: '61', phone: '081299990002' },

  // RT 62 Under RW 14
  { id: 'OFF-11', name: 'Dr. Gunawan Pratama', nik: '3515123456781301', role: 'Ketua RT', level: 'RT', rtNumber: '62', phone: '081288880001' },
];

export const INITIAL_RUANG_PENGURUS: RuangPengurusSpace = {
  id: 'SPACE-RW14',
  name: 'Ruang Pengurus Perumahan Kebonagung Indah Sector I',
  rwNumber: '14',
  alamatSekretariatRw: 'Balai Pertemuan Warga RW 14, Jl. Elang Raya No. 4, Kebonagung, Pekalongan',
  gmapCenter: { lat: -6.8912, lng: 109.6766, label: 'Kawasan Perumahan Kebonagung Indah sectors' },
  gmapRadiusMeters: 450, // adjustable service layout boundary meters
  rtsGoverned: ['59', '60', '61', '62']
};

export const INITIAL_LETTERS: LetterRequest[] = [
  {
    id: 'SL-001',
    nik: '3273012345670001',
    nama: 'Budi Hartono',
    jenisSurat: 'Surat Pengantar Pembuatan KTP',
    keperluan: 'Pembaruan KTP Elektronik karena alamat berubah',
    tanggalPengajuan: '2026-06-04',
    status: 'pending',
    keperluanDetail: {
      rt: '60',
      rw: '14',
      blok: 'A-12',
      keteranganTambahan: 'Warga baru pindahan dari Semarang semenjak Mei 2026.',
    },
  },
  {
    id: 'SL-002',
    nik: '3273012345670002',
    nama: 'Siti Rahmawati',
    jenisSurat: 'Surat Pengantar Surat Keterangan Catatan Kepolisian (SKCK)',
    keperluan: 'Melamar pekerjaan sebagai Pegawai Negeri Sipil (PNS)',
    tanggalPengajuan: '2026-06-02',
    status: 'disetujui',
    nomorSurat: '045/SP/RT60/RW14/VI/2026',
    tglPersetujuan: '2026-06-03',
    keperluanDetail: {
      rt: '60',
      rw: '14',
      blok: 'B-8',
      keteranganTambahan: 'Karakter baik, aktif dalam pengajian RT.',
    },
  },
  {
    id: 'SL-003',
    nik: '3273012345670001',
    nama: 'Budi Hartono',
    jenisSurat: 'Surat Keterangan Domisili Usaha',
    keperluan: 'Syarat pembukaan warung kelontong',
    tanggalPengajuan: '2026-05-28',
    status: 'disetujui',
    nomorSurat: '038/SP/RT60/RW14/V/2026',
    tglPersetujuan: '2026-05-29',
  },
  {
    id: 'SL-004',
    nik: '3273012345670003',
    nama: 'Rian Hidayat',
    jenisSurat: 'Surat Keterangan Belum Menikah',
    keperluan: 'Persyaratan pengajuan beasiswa luar negeri',
    tanggalPengajuan: '2026-06-01',
    status: 'ditolak',
    catatanPenolakan: 'Format berkas pendukung kurang lengkap. Silakan lampirkan KTP orang tua dan lengkapi profil warga terlebih dahulu.',
  },
];

export const MAP_BLOCKS = [
  { id: 'A', name: 'Blok A', coordinates: 'M 40,40 L 120,40 L 120,100 L 40,100 Z', color: '#3b82f6', count: 18 },
  { id: 'B', name: 'Blok B', coordinates: 'M 140,40 L 220,40 L 220,100 L 140,100 Z', color: '#10b981', count: 14 },
  { id: 'C', name: 'Blok C', coordinates: 'M 40,120 L 120,120 L 120,180 L 40,180 Z', color: '#f59e0b', count: 11 },
  { id: 'D', name: 'Blok D', coordinates: 'M 140,120 L 220,120 L 220,180 L 140,180 Z', color: '#8b5cf6', count: 9 },
  { id: 'E', name: 'Blok E', coordinates: 'M 240,40 L 320,40 L 320,180 L 240,180 Z', color: '#ec4899', count: 16 },
];

export const JENIS_SURAT_LIST = [
  'Surat Pengantar Pembuatan KTP',
  'Surat Pengantar Pembuatan KK (Kartu Keluarga)',
  'Surat Pengantar Pembuatan SKCK',
  'Surat Keterangan Domisili Tinggal',
  'Surat Keterangan Usaha (SKU)',
  'Surat Keterangan Kurang Mampu (SKTM)',
  'Surat Keterangan Belum Menikah',
  'Surat Keterangan Kematian',
];
