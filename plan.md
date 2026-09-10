# Rencana Pengembangan Laporan Terpusat SICEPOL

## 1. Latar Belakang

Saat ini data pajak dan retribusi tersebar pada beberapa aplikasi:

- **e-PBB** untuk PBB-P2.
- **e-BPHTB** untuk BPHTB.
- **e-Simpada** untuk pajak hotel, restoran/PBJT makanan dan minuman, hiburan, parkir, reklame, penerangan jalan, mineral bukan logam dan batuan, air tanah, serta sarang burung walet.
- **e-Retribusi** untuk retribusi yang dikelola berbagai OPD, seperti kebersihan, perizinan, PUPR, dan kesehatan.
- **e-SPTPD** untuk pajak makan dan minum OPD.
- **API Bapenda** sebagai sumber sejumlah data lintas aplikasi.

Pemeriksa, khususnya BPK, harus membuka setiap aplikasi secara terpisah untuk memperoleh laporan. SICEPOL akan dikembangkan menjadi portal layanan publik sekaligus penyedia laporan pajak dan retribusi terpusat.

## 2. Tujuan

1. Menyediakan satu akses untuk seluruh laporan pajak dan retribusi.
2. Mengurangi kebutuhan pemberian akun pada setiap aplikasi sumber.
3. Menyeragamkan tampilan, filter, dan format laporan.
4. Menyediakan ekspor Excel berdasarkan filter.
5. Menampilkan sumber dan waktu pembaruan data secara transparan.
6. Membatasi akses berdasarkan peran dan mencatat aktivitas pemeriksaan.
7. Mempertahankan layanan publik SICEPOL yang sudah tersedia.

## 3. Ruang Lingkup

### 3.1 Portal publik

- Pemeriksaan histori pajak.
- Rincian perhitungan.
- Status pembayaran.
- Pembayaran digital.

### 3.2 Portal internal

- Dashboard ringkasan lintas pajak dan retribusi.
- Laporan per jenis pendapatan.
- Filter dan penelusuran detail data.
- Ekspor Excel.
- Status sumber data dan sinkronisasi.
- Manajemen pengguna dan hak akses.
- Audit aktivitas pengguna.

## 4. Pengguna dan Hak Akses

| Peran | Hak akses utama |
|---|---|
| Administrator | Mengelola pengguna, hak akses, sumber data, sinkronisasi, dan seluruh laporan |
| Operator | Melihat laporan dan menjalankan sinkronisasi sesuai kewenangan |
| Pimpinan | Melihat dashboard dan seluruh laporan tanpa mengubah data |
| Pemeriksa BPK | Melihat dan mengekspor laporan yang diberikan secara read-only |

Akses pemeriksa BPK harus dapat dibatasi berdasarkan periode, tahun pemeriksaan, jenis pendapatan, dan jenis laporan. Akun dapat memiliki masa berlaku.

## 5. Struktur Navigasi

```text
Dashboard
├── Laporan Pajak
│   ├── PBB-P2
│   ├── BPHTB
│   └── Pajak Daerah Lainnya
│       ├── Hotel
│       ├── Restoran / PBJT Makanan dan Minuman
│       ├── Hiburan
│       ├── Parkir
│       ├── Reklame
│       ├── Penerangan Jalan
│       ├── Mineral Bukan Logam dan Batuan
│       ├── Air Tanah
│       └── Sarang Burung Walet
├── Laporan Retribusi
│   ├── Kebersihan
│   ├── Perizinan
│   ├── PUPR
│   ├── Kesehatan
│   └── Retribusi lainnya
├── Laporan Makan Minum OPD
├── Pusat Ekspor
│   ├── Buat Ekspor
│   └── Riwayat Ekspor
└── Administrasi
    ├── Pengguna dan Hak Akses
    ├── Sumber Data
    ├── Status Sinkronisasi
    └── Audit Log
```

Untuk menghindari sidebar terlalu panjang, jenis laporan ditampilkan sebagai tab setelah pengguna memilih jenis pajak atau retribusi.

## 6. Kelompok Laporan Standar

| Kelompok | Deskripsi |
|---|---|
| Monitoring | Ringkasan target, ketetapan, pembayaran, dan capaian |
| Ketetapan | Dokumen dan nilai pajak yang telah ditetapkan |
| Realisasi | Pembayaran atau penerimaan yang telah masuk |
| Piutang | Ketetapan yang belum dilunasi |
| Wajib Pajak | Daftar subjek pajak terdaftar |
| Objek Pajak | Daftar objek pajak dan karakteristiknya |
| Pendaftaran | Pendaftaran wajib pajak atau objek baru |
| Potensi | Potensi penerimaan berdasarkan objek atau usaha |
| Perubahan | Mutasi, pembetulan, pembatalan, atau perubahan objek |
| Transaksi | Transaksi khusus, termasuk transaksi BPHTB |

Tidak semua jenis pendapatan harus memiliki seluruh kelompok laporan. Retribusi pada tahap awal hanya membutuhkan laporan monitoring.

## 7. Rancangan Dashboard

### 7.1 Filter global

- Tahun anggaran.
- Rentang periode.
- Jenis pendapatan.
- Status pembaruan data.

### 7.2 Kartu ringkasan

- Total target.
- Total ketetapan.
- Total realisasi.
- Total piutang.
- Persentase capaian.
- Jumlah wajib pajak aktif.

### 7.3 Visualisasi

- Target dan realisasi per jenis pendapatan.
- Tren penerimaan bulanan.
- Komposisi piutang berdasarkan jenis pendapatan atau umur piutang.

### 7.4 Tabel ringkasan

| Jenis pendapatan | Target | Ketetapan | Realisasi | Piutang | Capaian | Data terakhir |
|---|---:|---:|---:|---:|---:|---|

Setiap baris dapat dibuka untuk melihat laporan terperinci.

## 8. Standar Halaman Laporan

Setiap halaman laporan memiliki susunan yang konsisten:

1. Judul dan jenis laporan.
2. Nama sistem sumber.
3. Waktu pembaruan data terakhir.
4. Filter utama dan filter lanjutan.
5. Ringkasan hasil filter.
6. Tabel data dengan pagination dari server.
7. Detail data melalui drawer atau halaman detail.
8. Tombol ekspor Excel berdasarkan filter aktif.

Kemampuan tabel:

- Pencarian.
- Pengurutan kolom.
- Pagination.
- Sticky header.
- Pemilihan kolom.
- Penelusuran detail baris.
- Format rupiah dan tanggal yang konsisten.

## 9. Arsitektur Integrasi

```text
Aplikasi sumber dan API Bapenda
              │
              ▼
      Integration Service
              │
              ▼
      Database Pelaporan
              │
              ▼
          SICEPOL API
              │
              ▼
 Dashboard, Laporan, dan Ekspor
```

Pendekatan yang digunakan adalah **API dan database pelaporan**:

1. SICEPOL mengambil data melalui API aplikasi sumber.
2. Data divalidasi dan dinormalisasi.
3. Data disimpan dalam database pelaporan.
4. Dashboard dan laporan membaca database pelaporan.
5. Sinkronisasi berjalan terjadwal atau dijalankan manual oleh petugas berwenang.
6. Setiap data menyimpan sistem sumber dan waktu sinkronisasi.

Dashboard tidak bergantung langsung pada ketersediaan seluruh aplikasi sumber saat halaman dibuka.

## 10. Standar API SICEPOL

Contoh endpoint agregator:

```text
GET  /api/reports/summary
GET  /api/reports/pbb/assessments
GET  /api/reports/pbb/receipts
GET  /api/reports/pbb/receivables
GET  /api/reports/bphtb/transactions
GET  /api/reports/local-taxes
GET  /api/reports/retributions
POST /api/report-exports
GET  /api/report-exports/{id}
```

Struktur respons daftar:

```json
{
  "data": [],
  "summary": {
    "record_count": 0,
    "assessment_total": 0,
    "payment_total": 0,
    "receivable_total": 0
  },
  "pagination": {
    "page": 1,
    "per_page": 25,
    "total": 0
  },
  "source": {
    "system": "e-PBB",
    "synchronized_at": "2026-09-08T09:30:00+08:00"
  }
}
```

## 11. Ekspor Excel

Ekspor harus menggunakan seluruh data sesuai filter, bukan hanya baris pada halaman tabel yang sedang terlihat.

Alur ekspor:

1. Pengguna memilih laporan dan filter.
2. Sistem menampilkan ringkasan serta jumlah record.
3. Pengguna meminta ekspor Excel.
4. Server memproses file secara asynchronous.
5. File tersedia pada menu Riwayat Ekspor.
6. Permintaan dan pengunduhan dicatat dalam audit log.

Isi workbook:

- **Sheet Ringkasan:** nama laporan, periode, filter, jumlah data, total nilai, sumber, waktu sinkronisasi, waktu ekspor, dan pengguna.
- **Sheet Data:** seluruh record sesuai filter.

Contoh nama file:

```text
Laporan_Piutang_PBB_2026-09-08.xlsx
Laporan_Realisasi_BPHTB_Jan-Agustus_2026.xlsx
Monitoring_Retribusi_Kebersihan_2026.xlsx
```

## 12. Keamanan dan Audit

- Seluruh route internal wajib dilindungi autentikasi.
- Otorisasi harus divalidasi pada server, bukan hanya menyembunyikan menu.
- Akun pemeriksa bersifat read-only dan dapat memiliki masa berlaku.
- Data sensitif ditampilkan sesuai kewenangan.
- API menerapkan rate limiting dan validasi parameter.
- Aktivitas login, membuka laporan, menggunakan filter, meminta ekspor, dan mengunduh file dicatat.
- Audit log minimal menyimpan pengguna, waktu, laporan, filter, aktivitas, serta informasi sesi/IP.

## 13. Struktur Route Frontend

```text
/                          Portal publik
/pbb/...                   Layanan publik PBB
/login                     Login internal
/internal                  Dashboard internal
/internal/reports          Katalog laporan
/internal/reports/pbb/...  Laporan PBB
/internal/reports/bphtb/... Laporan BPHTB
/internal/reports/taxes/... Laporan pajak daerah lainnya
/internal/retributions/... Laporan retribusi
/internal/exports          Riwayat ekspor
/internal/admin/...        Administrasi
```

Portal internal menggunakan layout sidebar, header pengguna, filter periode, status data, dan area konten laporan. Portal publik tetap menggunakan layout yang sudah ada.

## 14. Tahapan Implementasi

### Tahap 1 — Inventarisasi dan standardisasi data

- Mendata seluruh aplikasi dan endpoint API.
- Mendata jenis laporan dari setiap aplikasi.
- Memetakan field, kode, status, tanggal, dan definisi nilai keuangan.
- Menyamakan definisi target, ketetapan, realisasi, piutang, wajib pajak, dan objek pajak.
- Menentukan jadwal sinkronisasi setiap sumber.
- Menyusun matriks role dan permission.

**Keluaran:** katalog sumber data, kamus data, matriks laporan, dan matriks hak akses.

### Tahap 2 — Fondasi portal internal

- Login dan logout.
- Protected route.
- Role dan permission.
- Layout dashboard internal.
- Sidebar dan navigasi.
- Audit log dasar.
- Halaman status sumber data.

**Keluaran:** pengguna internal dan BPK dapat masuk ke portal sesuai hak akses.

### Tahap 3 — Integrasi dan laporan PBB

- Integrasi API e-PBB.
- Proses sinkronisasi dan normalisasi data.
- Monitoring PBB.
- Ketetapan PBB.
- Realisasi PBB.
- Piutang PBB.
- Daftar wajib pajak.
- Pendaftaran baru.
- Mutasi objek pajak.
- Ekspor Excel laporan PBB.

**Keluaran:** satu domain laporan lengkap sebagai acuan implementasi domain lainnya.

### Tahap 4 — Integrasi BPHTB dan pajak daerah lainnya

- Integrasi e-BPHTB dan API Bapenda.
- Laporan transaksi dan realisasi BPHTB.
- Integrasi sembilan jenis pajak daerah.
- Penerapan laporan monitoring, ketetapan, realisasi, piutang, wajib pajak, dan potensi sesuai ketersediaan data.
- Ekspor Excel setiap laporan.

**Keluaran:** laporan pajak tersedia melalui satu portal.

### Tahap 5 — Retribusi dan makan minum OPD

- Integrasi e-Retribusi.
- Monitoring berdasarkan OPD dan jenis retribusi.
- Integrasi e-SPTPD.
- Laporan makan minum OPD.
- Rekap target dan realisasi lintas OPD.

**Keluaran:** laporan retribusi dan makan minum OPD tersedia secara terpusat.

### Tahap 6 — Dashboard konsolidasi

- Ringkasan lintas pajak dan retribusi.
- Grafik target dan realisasi.
- Tren penerimaan bulanan.
- Komposisi dan umur piutang.
- Drill-down dari ringkasan ke laporan detail.

**Keluaran:** dashboard pimpinan dan pemeriksa dengan angka yang telah terstandardisasi.

### Tahap 7 — Penguatan ekspor, keamanan, dan operasional

- Pemrosesan ekspor besar secara asynchronous.
- Riwayat dan pengunduhan ulang ekspor.
- Pembatasan periode akses pemeriksa.
- Penyempurnaan audit log.
- Pengujian keamanan, akurasi data, performa, dan rekonsiliasi dengan aplikasi sumber.
- Monitoring kegagalan sinkronisasi.

**Keluaran:** portal siap digunakan dalam proses pemeriksaan dan operasional rutin.

## 15. Kriteria Keberhasilan

1. Pengguna dapat mengakses laporan yang diizinkan melalui satu akun SICEPOL.
2. Angka laporan dapat direkonsiliasi dengan aplikasi sumber.
3. Setiap laporan menunjukkan sumber dan waktu pembaruan data.
4. Filter dan pagination diproses pada server.
5. State filter halaman disimpan dalam URL query string (contoh: `?tahun=2026&jenis=pajak`) agar tetap konsisten setelah refresh, dapat dibagikan, di-bookmark, serta mendukung navigasi Back/Forward browser. Prinsip ini diterapkan pada dashboard dan fitur laporan lain yang memiliki filter, dengan nilai default dan validasi parameter yang sesuai tiap halaman.
6. Ekspor Excel memuat seluruh data sesuai filter.
7. Gangguan pada satu aplikasi sumber tidak membuat seluruh dashboard gagal dibuka.
8. Hak akses BPK bersifat terbatas dan read-only.
9. Aktivitas akses dan ekspor dapat ditelusuri melalui audit log.
10. Portal publik SICEPOL tetap berjalan tanpa tercampur dengan fitur internal.

## 16. Prioritas Awal

Implementasi dimulai dari **inventarisasi data dan PBB**. PBB dipilih sebagai pilot karena memiliki variasi laporan paling lengkap. Pola integrasi, filter, tabel, detail, dan ekspor yang berhasil pada PBB kemudian digunakan sebagai standar untuk BPHTB, pajak daerah lainnya, retribusi, dan e-SPTPD.
