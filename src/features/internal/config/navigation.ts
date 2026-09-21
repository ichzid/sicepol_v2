export const localTaxMenus: ReadonlyArray<readonly [string, string]> = [
  ['pbjt-tenaga-listrik', 'PBJT Tenaga Listrik'],
  ['pbjt-makan-minum', 'PBJT Makan Minum'],
  ['pbjt-hotel', 'PBJT Hotel'],
  ['pbjt-parkir', 'PBJT Parkir'],
  ['pbjt-hiburan', 'PBJT Hiburan'],
  ['pajak-sarang-burung-walet', 'Pajak Sarang Walet'],
  ['pajak-reklame', 'Pajak Reklame'],
  ['pajak-mblb', 'Pajak MBLB'],
  ['pajak-air-tanah', 'Pajak Air Tanah'],
];

export const nav = [
  { to: '/internal', label: 'Dashboard', icon: 'dashboard', end: true },
  { section: 'Laporan Pajak' },
  { to: '/internal/reports/pbb', label: 'PBB-P2', icon: 'pbb' },
  { to: '/internal/reports/bphtb', label: 'BPHTB', icon: 'bphtb' },
  { taxGroup: true, label: 'Pajak Daerah Lainnya', icon: 'tax' },
  { section: 'Pendapatan Lain' },
  { to: '/internal/reports/retributions', label: 'Retribusi Daerah', icon: 'retribution' },
  { to: '/internal/reports/opd-meals', label: 'Makan Minum OPD', icon: 'opd' },
  { section: 'Laporan Lainnya' },
  { to: '/internal/reports/potential', label: 'Potensi Pajak Daerah', icon: 'potential' },
  { to: '/internal/reports/taxpayers', label: 'Daftar Wajib Pajak', icon: 'taxpayer' },
  { section: 'Pengelolaan' },
  { to: '/internal/exports', label: 'Pusat Ekspor', icon: 'export' },
  { to: '/internal/admin/users', label: 'Pengguna & Hak Akses', icon: 'users' },
  { to: '/', label: 'Logout', icon: 'logout' },
];
