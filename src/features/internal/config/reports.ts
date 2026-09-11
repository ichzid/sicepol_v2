export const reportMeta: Record<string, { title: string; source: string; tabs: string[]; description: string }> = {
  pbb: { title: 'Laporan PBB-P2', source: 'e-PBB', tabs: ['Monitoring', 'Ketetapan', 'Realisasi', 'Piutang', 'Wajib Pajak', 'Pendaftaran', 'Mutasi Objek'], description: 'Monitoring ketetapan, penerimaan, dan piutang Pajak Bumi dan Bangunan.' },
  bphtb: { title: 'Laporan BPHTB', source: 'e-BPHTB', tabs: ['Monitoring', 'Transaksi', 'Realisasi', 'Wajib Pajak'], description: 'Rekap transaksi dan realisasi Bea Perolehan Hak atas Tanah dan Bangunan.' },
  taxes: { title: 'Pajak Daerah Lainnya', source: 'e-Simpada', tabs: ['Monitoring', 'Ketetapan', 'Realisasi', 'Piutang', 'Rekap WP'], description: 'Laporan pajak daerah yang terintegrasi dari aplikasi e-Simpada.' },
  retributions: { title: 'Laporan Retribusi Daerah', source: 'e-Retribusi', tabs: ['Monitoring', 'Rekap OPD'], description: 'Monitoring target dan realisasi retribusi berdasarkan OPD pengelola.' },
  'opd-meals': { title: 'Makan Minum OPD', source: 'e-SPTPD', tabs: ['Monitoring', 'Rekap OPD'], description: 'Laporan pajak konsumsi makan dan minum seluruh perangkat daerah.' },
};
