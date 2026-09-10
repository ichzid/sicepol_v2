import type { Row } from '../types';

export const incomeRows: Row[] = [
  { jenis: 'PBB-P2', target: 86000000000, realisasi: 64860000000, capaian: '75,4%', sisaTarget: 21140000000 },
  { jenis: 'BPHTB', target: 72000000000, realisasi: 61320000000, capaian: '85,2%', sisaTarget: 10680000000 },
  { jenis: 'Pajak Daerah Lainnya', target: 98000000000, realisasi: 78150000000, capaian: '79,7%', sisaTarget: 19850000000 },
  { jenis: 'Retribusi Daerah', target: 42000000000, realisasi: 29420000000, capaian: '70,0%', sisaTarget: 12580000000 },
  { jenis: 'Makan Minum OPD', target: 18000000000, realisasi: 14050000000, capaian: '78,1%', sisaTarget: 3950000000 },
];

export const reportRows: Row[] = [
  { nomor: '32.71.010.001.001-0123.0', nama: 'PT Nusantara Sejahtera', wilayah: 'Kec. Balikpapan Kota', tanggal: '02 Sep 2026', ketetapan: 4850000, pembayaran: 4850000, status: 'Lunas' },
  { nomor: '32.71.020.004.002-0451.0', nama: 'Andi Kurniawan', wilayah: 'Kec. Balikpapan Utara', tanggal: '01 Sep 2026', ketetapan: 2375000, pembayaran: 1500000, status: 'Sebagian' },
  { nomor: '32.71.030.006.004-0098.0', nama: 'CV Cahaya Timur', wilayah: 'Kec. Balikpapan Selatan', tanggal: '30 Agu 2026', ketetapan: 12250000, pembayaran: 0, status: 'Belum Lunas' },
  { nomor: '32.71.040.002.007-0311.0', nama: 'Siti Rahmawati', wilayah: 'Kec. Balikpapan Barat', tanggal: '28 Agu 2026', ketetapan: 1900000, pembayaran: 1900000, status: 'Lunas' },
  { nomor: '32.71.050.003.008-0107.0', nama: 'Hotel Samudra', wilayah: 'Kec. Balikpapan Tengah', tanggal: '25 Agu 2026', ketetapan: 18750000, pembayaran: 18750000, status: 'Lunas' },
  { nomor: '32.71.060.001.003-0204.0', nama: 'Rudi Hartono', wilayah: 'Kec. Balikpapan Timur', tanggal: '23 Agu 2026', ketetapan: 3250000, pembayaran: 0, status: 'Belum Lunas' },
  { nomor: '32.71.010.008.001-0188.0', nama: 'Restoran Selera Kita', wilayah: 'Kec. Balikpapan Kota', tanggal: '20 Agu 2026', ketetapan: 8900000, pembayaran: 7000000, status: 'Sebagian' },
];

export const simpadaRows: Row[] = [
  { npwpd: 'P.1.0001234.01.01', sptpd: 'SPTPD/2026/000741', tanggalCetak: '05 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'Hotel Samudra', alamatObjek: 'Jl. Perintis Kemerdekaan, Lima Puluh', nilaiPajak: 18750000, status: 'Lunas' },
  { npwpd: 'P.1.0001288.01.01', sptpd: 'SPTPD/2026/000742', tanggalCetak: '05 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'Restoran Selera Kita', alamatObjek: 'Jl. Merdeka, Air Putih', nilaiPajak: 8900000, status: 'Sebagian' },
  { npwpd: 'P.1.0001341.01.01', sptpd: 'SPTPD/2026/000743', tanggalCetak: '06 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'Taman Rekreasi Bahagia', alamatObjek: 'Jl. Lintas Sumatera, Indrapura', nilaiPajak: 12250000, status: 'Belum Lunas' },
  { no: 4, npwpd: 'P.1.0001402.01.01', sptpd: 'SPTPD/2026/000744', tanggalCetak: '06 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'Parkir Plaza Batu Bara', alamatObjek: 'Jl. Sudirman, Tanjung Gading', nilaiPajak: 4850000, status: 'Lunas' },
  { no: 5, npwpd: 'P.1.0001467.01.01', sptpd: 'SPTPD/2026/000745', tanggalCetak: '07 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'Reklame Cahaya Timur', alamatObjek: 'Jl. Acces Road Inalum, Kuala Tanjung', nilaiPajak: 3250000, status: 'Belum Lunas' },
  { no: 6, npwpd: 'P.1.0001519.01.01', sptpd: 'SPTPD/2026/000746', tanggalCetak: '07 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'PLN Unit Batu Bara', alamatObjek: 'Jl. Pendidikan, Lima Puluh', nilaiPajak: 26750000, status: 'Lunas' },
  { npwpd: 'P.1.0001583.01.01', sptpd: 'SPTPD/2026/000747', tanggalCetak: '08 Jul 2026', masaPajak: 'Juni 2026', namaObjek: 'CV Mineral Sejahtera', alamatObjek: 'Desa Mangkai Baru, Lima Puluh', nilaiPajak: 15400000, status: 'Sebagian' },
];

export const opdMealRows: Row[] = [
  { inputDate: '05 Jul 2026', npwpd: 'P.1.0001288.01.01', sptpd: 'SPTPD/2026/000742', opd: 'Sekretariat Daerah', taxPeriod: 'Juni 2026', taxAmount: 4250000, status: 'Lunas', action: 'Detail' },
  { inputDate: '06 Jul 2026', npwpd: 'P.1.0001341.01.01', sptpd: 'SPTPD/2026/000743', opd: 'Dinas Kesehatan', taxPeriod: 'Juni 2026', taxAmount: 3150000, status: 'Sebagian', action: 'Detail' },
  { inputDate: '07 Jul 2026', npwpd: 'P.1.0001402.01.01', sptpd: 'SPTPD/2026/000744', opd: 'Dinas Pendidikan', taxPeriod: 'Juni 2026', taxAmount: 5800000, status: 'Belum Lunas', action: 'Detail' },
  { inputDate: '08 Jul 2026', npwpd: 'P.1.0001467.01.01', sptpd: 'SPTPD/2026/000745', opd: 'Dinas PUPR', taxPeriod: 'Juni 2026', taxAmount: 2750000, status: 'Lunas', action: 'Detail' },
];

export const retributionRows: Row[] = [
  { no: 1, formNumber: 'FORM/RET/2026/00124', opd: 'Dinas Lingkungan Hidup', transactionDate: '05 Jul 2026', npwrd: 'R.1.000124.01', period: 'Juni 2026', type: 'Pelayanan Kebersihan', amount: 2750000, status: 'Lunas', action: 'Detail' },
  { no: 2, formNumber: 'FORM/RET/2026/00125', opd: 'Dinas Kesehatan', transactionDate: '06 Jul 2026', npwrd: 'R.1.000125.01', period: 'Juni 2026', type: 'Pelayanan Kesehatan', amount: 1850000, status: 'Sebagian', action: 'Detail' },
  { no: 3, formNumber: 'FORM/RET/2026/00126', opd: 'Dinas PUPR', transactionDate: '07 Jul 2026', npwrd: 'R.1.000126.01', period: 'Juni 2026', type: 'Persetujuan Bangunan Gedung', amount: 7250000, status: 'Belum Lunas', action: 'Detail' },
  { formNumber: 'FORM/RET/2026/00127', opd: 'BPKAD', transactionDate: '08 Jul 2026', npwrd: 'R.1.000127.01', period: 'Juni 2026', type: 'Pemakaian Kekayaan Daerah', amount: 4500000, status: 'Lunas', action: 'Detail' },
];

export const exportRows: Row[] = [
  { report: 'Ketetapan PBB-P2', periode: 'Jan–Sep 2026', requested: '8 Sep 2026, 09.42', user: 'Budi Santoso', status: 'Selesai', size: '2,8 MB' },
  { report: 'Realisasi BPHTB', periode: 'Agustus 2026', requested: '8 Sep 2026, 09.35', user: 'Budi Santoso', status: 'Diproses', size: '—' },
  { report: 'Retribusi Kebersihan', periode: 'Triwulan III', requested: '7 Sep 2026, 15.10', user: 'Siti Aminah', status: 'Selesai', size: '1,2 MB' },
  { report: 'Piutang Pajak Daerah', periode: '2026', requested: '6 Sep 2026, 11.22', user: 'Budi Santoso', status: 'Gagal', size: '—' },
];

export const userRows: Row[] = [
  { name: 'Budi Santoso', email: 'budi@balikpapan.go.id', role: 'Administrator', access: 'Seluruh laporan', expires: 'Tidak terbatas', status: 'Aktif' },
  { name: 'Siti Aminah', email: 'siti@balikpapan.go.id', role: 'Operator', access: 'Pajak & Retribusi', expires: 'Tidak terbatas', status: 'Aktif' },
  { name: 'Arif Pratama', email: 'arif@bpk.go.id', role: 'Pemeriksa BPK', access: 'Tahun 2026', expires: '31 Des 2026', status: 'Aktif' },
  { name: 'Rina Wulandari', email: 'rina@balikpapan.go.id', role: 'Pimpinan', access: 'Dashboard & Laporan', expires: 'Tidak terbatas', status: 'Aktif' },
];
