export type PbbReportType = 'ketetapan' | 'realisasi' | 'piutang';

export type PbbFilter = {
  tahun?: number;
  tgl_awal?: string;
  tgl_akhir?: string;
  kd_kecamatan?: string;
  kd_kelurahan?: string;
  buku?: number | string;
};

export type PbbKetetapanItem = {
  nop: string;
  nik: string | null;
  nama_wp: string;
  alamat_objek: string | null;
  pokok_pbb: number;
  luas_tanah: number;
  kode_kelas_tanah: string;
  njop_tanah_permeter: number;
  luas_bangunan: number;
  kode_kelas_bangunan: string;
  njop_bangunan_permeter: number;
  njoptkp: number;
  tahun: number;
  nama_kecamatan: string;
  nama_kelurahan: string;
};

export type PbbRealisasiItem = {
  nop: string;
  nama_wp: string;
  alamat_objek: string | null;
  pokok_pbb: number;
  denda: number;
  pokok_dan_denda: number;
  tanggal_bayar: string;
  tahun: number;
  luas_tanah: number;
  luas_bangunan: number;
  njop_tanah?: number;
  njop_bangunan?: number;
  kode_kelas_tanah?: string;
  kode_kelas_bangunan?: string;
  nama_kecamatan: string;
  nama_kelurahan: string;
};

export type PbbPiutangItem = {
  nop: string;
  nama_wp: string;
  pokok_pbb: number;
  tgl_jatuh_tempo: string;
  denda: number;
  pokok_dan_denda: number;
  luas_tanah: number;
  luas_bangunan: number;
  tahun: number;
  nama_kecamatan: string;
  nama_kelurahan: string;
};

export type PbbApiResponse<T> = {
  success: boolean;
  message: string;
  jenis_laporan: string;
  filter: Record<string, unknown>;
  total_data: number;
  total_nominal: number;
  data: T[];
};

export type PbbRow = {
  [key: string]: string | number;
  nop: string;
  nama_wp: string;
  alamat_objek: string;
  pokok_pbb: number;
  denda: number;
  total_bayar: number;
  tanggal_bayar: string;
  tgl_jatuh_tempo: string;
  luas_tanah: number;
  luas_bangunan: number;
  tahun: number;
  wilayah: string;
};
