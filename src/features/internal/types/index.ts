export type Row = Record<string, string | number>;
export type Column = { key: string; label: string; money?: boolean; width?: string };
export type Notify = (message: string) => void;

export type RevenueType = 'pajak' | 'retribusi';
export type DashboardFilter = { year: number; type: RevenueType };

export type RealisasiSummary = {
  total_target: number;
  total_realisasi: number;
  persentase_capaian: number;
  selisih_anggaran: number;
};

export type RealisasiDetail = {
  jenis_pajak?: string;
  jenis_retribusi?: string;
  target: number;
  realisasi: number;
  persentase: number;
  selisih: number;
};

export type RealisasiResponse = {
  success: boolean;
  tahun: number;
  ringkasan: RealisasiSummary;
  rincian: RealisasiDetail[];
};

export type TrenPenerimaanResponse = {
  success: boolean;
  tahun: number;
  jenis: RevenueType;
  kode: string | null;
  nama: string | null;
  ringkasan: { total_realisasi: number };
  rincian: {
    bulan: number;
    nama_bulan: string;
    realisasi: number;
  }[];
};
