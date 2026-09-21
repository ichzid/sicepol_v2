export type BphtbReportType = 'ketetapan' | 'realisasi';

export type BphtbFilter = {
  tahun?: number;
  page?: number;
  per_page?: number;
};

export type BphtbItem = {
  no_sts: string | null;
  nomor_dokumen: string | null;
  nop: string | null;
  nomor_registrasi: string | null;
  npwp: string | null;
  nik_wp: string | null;
  nama_wp: string | null;
  alamat_wp: string | null;
  notaris: string | null;
  luas_tanah: number | null;
  luas_bangunan: number | null;
  njop_pbb: number | null;
  npoptkp_bphtb: number | null;
  alamat_objek_pajak: string | null;
  tanggal_bayar: string | null;
  nilai_transaksi: number | null;
  setoran: number | null;
  keterangan: string | null;
  tanggal_validasi: string | null;
  status_bayar: string | null;
};

export type BphtbPagination = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export type BphtbReportData = {
  pagination: BphtbPagination;
  data: BphtbItem[];
};

export type BphtbApiResponse = {
  status: boolean;
  message: string;
  filters?: {
    tahun?: number;
  };
  validation: {
    tahun_minimum: number;
    tahun_maksimum: number;
  };
  laporan: {
    ketetapan: BphtbReportData;
    realisasi: BphtbReportData;
  };
};

export type BphtbRow = {
  [key: string]: string | number;
  nomor_dokumen: string;
  nop: string;
  nama_wp: string;
  notaris: string;
  luas_tanah: number;
  luas_bangunan: number;
  njop_pbb: number;
  setoran: number;
  tanggal_validasi: string;
  tanggal_bayar: string;
  status_bayar: string;
};
