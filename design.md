# Desain Dashboard Laporan Terpusat SICEPOL

## 1. Prinsip Desain

Dashboard internal SICEPOL menggunakan rancangan khusus yang:

- Formal, bersih, dan berorientasi pada data.
- Konsisten dengan identitas visual portal publik SICEPOL.
- Mudah digunakan oleh pegawai internal, pimpinan, dan pemeriksa BPK.
- Mendukung pertumbuhan jumlah pajak, retribusi, dan jenis laporan.
- Mengutamakan keterbacaan tabel serta kejelasan sumber data.
- Responsif untuk desktop, tablet, dan perangkat mobile.

Dashboard tidak menggunakan template admin siap pakai secara utuh. Antarmuka dirancang khusus menggunakan komponen UI yang stabil agar kode tetap ringan dan mudah disesuaikan.

## 2. Pola Navigasi

Dashboard menggunakan kombinasi:

- **Sidebar** untuk navigasi utama.
- **Top bar** untuk konteks aplikasi dan aktivitas pengguna.
- **Tab** untuk memilih jenis laporan setelah pengguna memilih jenis pajak atau retribusi.

Pola ini dipilih karena jumlah kelompok laporan cukup banyak dan akan terus berkembang.

## 3. Struktur Layout Desktop

```text
┌────────────────────────────────────────────────────────────┐
│ ☰  SICEPOL   Tahun 2026   Status Data      Notifikasi User │
├─────────────────┬──────────────────────────────────────────┤
│ Sidebar         │ Breadcrumb                               │
│                 │ Judul Halaman              Ekspor Excel  │
│ Dashboard       │                                          │
│ Laporan Pajak   │ Filter                                   │
│ Retribusi       │                                          │
│ Makan Minum     │ Kartu Ringkasan                          │
│ Pusat Ekspor    │                                          │
│ Administrasi    │ Grafik / Tabel                           │
└─────────────────┴──────────────────────────────────────────┘
```

Ukuran utama:

- Tinggi top bar: 60–64 px.
- Lebar sidebar terbuka: 240–264 px.
- Lebar sidebar diperkecil: 64–72 px.
- Lebar konten: mengikuti sisa ruang layar.
- Jarak antarkomponen utama: 16–24 px.

## 4. Sidebar

### 4.1 Fungsi

Sidebar digunakan untuk navigasi tingkat utama:

```text
Dashboard
Laporan Pajak
  ├── PBB-P2
  ├── BPHTB
  └── Pajak Daerah Lainnya
Laporan Retribusi
Laporan Makan Minum OPD
Pusat Ekspor
Administrasi
```

### 4.2 Perilaku

- Dapat diperkecil menjadi mode ikon.
- Tetap terlihat saat konten halaman digulir.
- Menu aktif memiliki warna dan indikator yang jelas.
- Submenu dibatasi maksimal dua tingkat.
- Menu hanya ditampilkan apabila pengguna memiliki permission.
- Tooltip ditampilkan pada mode sidebar kecil.
- Status submenu yang terbuka dipertahankan saat berpindah halaman terkait.
- Pada perangkat mobile, sidebar berubah menjadi drawer overlay.

### 4.3 Pembagian area

**Bagian atas:**

- Logo atau simbol instansi.
- Nama SICEPOL.
- Label “Portal Laporan”.

**Bagian tengah:**

- Seluruh menu utama sesuai hak akses.

**Bagian bawah:**

- Bantuan singkat.
- Versi aplikasi jika diperlukan.
- Tombol perkecil sidebar.

## 5. Top Bar

Top bar menampilkan:

- Tombol buka/tutup sidebar.
- Nama atau konteks halaman pada tampilan mobile.
- Tahun anggaran aktif.
- Status pembaruan data.
- Notifikasi proses ekspor.
- Nama dan role pengguna.
- Menu profil dan logout.

Top bar tidak digunakan untuk menampilkan seluruh filter laporan. Filter spesifik tetap berada di area konten agar konteksnya jelas.

Contoh:

```text
[☰] SICEPOL    Tahun Anggaran: [2026 ▼]    Data: Terbaru    [Ekspor] [Budi ▼]
```

## 6. Navigasi Jenis Laporan

Jenis laporan tidak dimasukkan sebagai submenu sidebar agar navigasi tidak terlalu panjang. Setelah memilih jenis pajak, pengguna memilih laporan melalui tab.

Contoh halaman PBB-P2:

```text
PBB-P2

[Monitoring] [Ketetapan] [Realisasi] [Piutang]
[Wajib Pajak] [Pendaftaran] [Mutasi Objek]
```

Ketentuan tab:

- Tab aktif memiliki latar atau garis bawah yang jelas.
- Tab yang tidak tersedia untuk suatu jenis pendapatan tidak ditampilkan.
- Jika jumlah tab tidak muat, tab dapat digulir secara horizontal.
- Pemilihan tab tercermin dalam URL agar halaman dapat dibagikan atau dimuat ulang.

## 7. Struktur Halaman Dashboard

### 7.1 Header halaman

Terdiri dari:

- Breadcrumb.
- Judul dashboard.
- Deskripsi singkat periode data.
- Waktu pembaruan terakhir.

### 7.2 Filter global

Filter dashboard:

- Tahun anggaran.
- Rentang periode.
- Jenis pendapatan.
- Status pembaruan data.

Filter menggunakan tombol **Terapkan** dan **Reset** agar permintaan data tidak berjalan pada setiap perubahan input.

### 7.3 Kartu ringkasan

Kartu utama:

- Total target.
- Total ketetapan.
- Total realisasi.
- Total piutang.
- Persentase capaian.
- Jumlah wajib pajak aktif.

Ketentuan:

- Satuan rupiah dan jumlah objek tidak dicampur dalam satu kartu.
- Nilai utama lebih dominan daripada label.
- Perbandingan dengan periode sebelumnya dapat ditampilkan sebagai informasi sekunder.
- Warna tidak menjadi satu-satunya penanda kondisi.

### 7.4 Grafik

Maksimal tiga grafik utama:

1. Target dan realisasi per jenis pendapatan menggunakan grafik batang horizontal.
2. Tren penerimaan bulanan menggunakan grafik garis.
3. Komposisi piutang berdasarkan jenis pendapatan atau umur piutang.

Grafik harus menyediakan tooltip, legenda yang jelas, dan format rupiah ringkas. Setiap grafik dapat membuka laporan detail melalui interaksi drill-down.

### 7.5 Tabel ringkasan

```text
| Jenis Pendapatan | Target | Ketetapan | Realisasi | Piutang | Capaian | Data Terakhir |
```

Setiap baris dapat diklik untuk menuju laporan terkait.

## 8. Struktur Halaman Laporan

### 8.1 Header laporan

Header memuat:

- Breadcrumb.
- Nama jenis pajak atau retribusi.
- Nama jenis laporan.
- Sistem sumber.
- Waktu sinkronisasi terakhir.
- Status data.
- Tombol ekspor Excel.

Contoh:

```text
Laporan Ketetapan PBB-P2
Sumber: e-PBB • Diperbarui 8 September 2026, 09.30 WITA • Data terbaru
```

### 8.2 Filter laporan

Filter utama selalu terlihat. Filter yang jarang digunakan ditempatkan dalam panel **Filter Lainnya**.

Filter dapat meliputi:

- Tahun pajak.
- Rentang tanggal.
- Kecamatan.
- Kelurahan.
- Masa pajak.
- Status ketetapan.
- Status pembayaran.
- Jenis pajak atau retribusi.
- OPD pengelola.
- NOP, NPWPD, atau nama wajib pajak.

Susunan aksi:

```text
[Filter utama] [Filter Lainnya] [Terapkan] [Reset]
```

Filter aktif ditampilkan sebagai chip yang dapat dihapus satu per satu.

### 8.3 Ringkasan hasil filter

Setelah filter diterapkan, tampilkan angka yang berasal dari hasil filter:

```text
Jumlah Data       Total Ketetapan       Total Pembayaran       Sisa
12.430            Rp25.000.000.000      Rp18.000.000.000        Rp7.000.000.000
```

### 8.4 Tabel data

Tabel mendukung:

- Pagination dari server.
- Pengurutan kolom.
- Pencarian.
- Sticky header.
- Pemilihan kolom.
- Format rupiah, angka, dan tanggal yang konsisten.
- Detail baris.
- Empty state, loading state, dan error state.
- Ekspor berdasarkan filter aktif.

Kolom identitas utama tetap terlihat ketika tabel digulir secara horizontal jika memungkinkan.

### 8.5 Detail data

Detail baris dibuka melalui drawer pada desktop atau halaman khusus pada mobile. Isinya dapat meliputi:

- Identitas wajib pajak.
- Identitas objek pajak.
- Informasi ketetapan.
- Riwayat pembayaran.
- Riwayat perubahan.
- Sistem sumber.
- Waktu sinkronisasi terakhir.

Data detail tidak dimuat seluruhnya di tabel utama.

## 9. Pusat Ekspor

### 9.1 Notifikasi ekspor

Ketika ekspor sedang diproses:

- Top bar menampilkan indikator proses.
- Pengguna tetap dapat menggunakan halaman lain.
- Notifikasi muncul ketika file siap atau gagal.

### 9.2 Riwayat ekspor

Tabel riwayat ekspor memuat:

- Nama laporan.
- Filter atau periode.
- Waktu permintaan.
- Pengguna.
- Status proses.
- Ukuran file.
- Masa berlaku file.
- Aksi unduh.

Status yang digunakan:

- Menunggu.
- Diproses.
- Selesai.
- Gagal.
- Kedaluwarsa.

## 10. Tema Visual

### 10.1 Karakter

Tema visual menggunakan gaya:

- Resmi dan profesional.
- Ringan serta tidak penuh dekorasi.
- Memiliki kontras yang baik.
- Mengutamakan angka, tabel, dan status data.

### 10.2 Palet warna

- **Biru tua:** warna utama, sidebar, tombol primer, dan elemen identitas.
- **Biru muda:** latar elemen aktif dan informasi.
- **Putih:** permukaan kartu dan tabel.
- **Abu-abu sangat muda:** latar halaman.
- **Hijau:** realisasi, lunas, berhasil, atau data terbaru.
- **Jingga:** peringatan dan sinkronisasi tertunda.
- **Merah:** kegagalan, data kritis, atau masalah sinkronisasi.

Merah tidak digunakan berlebihan untuk seluruh data piutang. Status piutang normal dapat menggunakan warna netral atau jingga, sedangkan merah digunakan untuk kondisi kritis.

### 10.3 Tipografi

- Gunakan font sans-serif yang jelas dan tersedia secara konsisten.
- Judul halaman: 24–28 px.
- Judul bagian: 18–20 px.
- Isi utama: 14–16 px.
- Isi tabel: 13–14 px.
- Angka keuangan menggunakan tabular numbers jika didukung font.

### 10.4 Bentuk komponen

- Radius kartu dan input dibuat moderat, sekitar 8–12 px.
- Bayangan digunakan tipis dan hanya untuk membedakan lapisan.
- Border tipis lebih diutamakan daripada bayangan tebal.
- Tombol memiliki tinggi dan area klik yang konsisten.
- Ikon selalu disertai label atau tooltip jika maknanya tidak langsung jelas.

## 11. Komponen dan Teknologi UI

Rancangan dibuat khusus SICEPOL dengan fondasi:

- **TanStack Query** untuk pengambilan, cache, dan pembaruan data.
- **TanStack Table** untuk tabel laporan.
- **Radix UI atau shadcn/ui** untuk dialog, dropdown, tab, tooltip, drawer, dan komponen aksesibel lainnya.
- **Recharts** untuk visualisasi dashboard.
- **CSS variables/design tokens** untuk menyelaraskan tema portal publik dan internal.

Template admin siap pakai tidak digunakan secara utuh untuk menghindari dependensi berlebih, tampilan generik, dan struktur yang sulit disesuaikan.

## 12. Design Tokens

Token berikut menjadi acuan dan dapat disesuaikan dengan identitas resmi instansi:

```css
:root {
  --color-primary-900: #12335b;
  --color-primary-700: #19558a;
  --color-primary-100: #e8f2fb;
  --color-background: #f5f7fa;
  --color-surface: #ffffff;
  --color-border: #dfe5ec;
  --color-text-primary: #17212b;
  --color-text-secondary: #5f6b78;
  --color-success: #198754;
  --color-warning: #c77700;
  --color-danger: #c63c3c;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
}
```

Nilai akhir harus diselaraskan dengan variabel dan tema yang sudah digunakan portal publik SICEPOL.

## 13. Responsivitas

### Desktop

- Sidebar terbuka secara default.
- Tabel menggunakan seluruh lebar konten.
- Drawer digunakan untuk detail data.
- Kartu ringkasan dapat ditampilkan dalam 3–6 kolom sesuai lebar layar.

### Tablet

- Sidebar dapat diperkecil secara default.
- Kartu ringkasan ditampilkan dalam 2–3 kolom.
- Filter dapat tersusun menjadi beberapa baris.

### Mobile

- Sidebar menjadi drawer overlay.
- Top bar hanya menampilkan kontrol penting.
- Kartu ringkasan disusun satu atau dua kolom.
- Tab laporan dapat digulir horizontal.
- Tabel menggunakan horizontal scroll atau tampilan kartu untuk data prioritas.
- Detail data dibuka sebagai halaman penuh atau bottom sheet.

Desktop tetap menjadi prioritas utama karena laporan dan pemeriksaan banyak menggunakan tabel besar.

## 14. Aksesibilitas

- Kontras teks dan latar memenuhi standar keterbacaan.
- Seluruh navigasi dan kontrol dapat digunakan dengan keyboard.
- Fokus keyboard terlihat jelas.
- Status tidak hanya dibedakan melalui warna.
- Input memiliki label yang jelas.
- Tombol ikon memiliki accessible label dan tooltip.
- Tabel memiliki header serta hubungan kolom yang benar.
- Dialog dan drawer mengelola fokus dengan benar.
- Grafik menyediakan ringkasan nilai dalam teks atau tabel.

## 15. State Antarmuka

Setiap halaman data wajib memiliki:

- **Loading:** skeleton pada kartu, grafik, dan tabel.
- **Empty:** penjelasan bahwa data tidak ditemukan dan saran mengubah filter.
- **Error:** pesan singkat, sumber masalah jika diketahui, dan tombol coba lagi.
- **Stale:** peringatan jika data belum diperbarui sesuai jadwal.
- **Success:** konfirmasi ekspor atau aksi administratif berhasil.

Kegagalan satu sumber data tidak boleh menghilangkan seluruh dashboard. Bagian terkait menampilkan statusnya sendiri.

## 16. Keamanan dalam Desain

- Menu dan tombol mengikuti permission pengguna.
- Penyembunyian menu bukan pengganti validasi otorisasi pada server.
- Informasi sensitif dapat dimasking sesuai role.
- Role dan masa berlaku akun terlihat pada menu profil.
- Pengguna BPK diberi penanda bahwa akses bersifat read-only.
- Tombol sinkronisasi hanya tersedia untuk role berwenang.
- Aktivitas ekspor memberikan informasi bahwa tindakan akan dicatat.

## 17. Arah Implementasi

Urutan implementasi UI:

1. Menetapkan design tokens yang konsisten dengan portal publik.
2. Membuat internal layout dengan sidebar dan top bar.
3. Membuat navigasi berbasis role dan permission.
4. Membuat komponen breadcrumb, page header, status sumber, serta tab laporan.
5. Membuat filter bar dan chip filter aktif.
6. Membuat kartu ringkasan.
7. Membuat tabel laporan generik dengan pagination server.
8. Membuat drawer detail data.
9. Membuat komponen grafik dashboard.
10. Membuat notifikasi dan riwayat ekspor.
11. Menyempurnakan responsivitas dan aksesibilitas.

## 18. Keputusan Desain

Keputusan utama untuk dashboard laporan SICEPOL adalah:

> Menggunakan **collapsible sidebar dan top bar**, dengan **rancangan khusus SICEPOL yang dibangun dari library komponen stabil**, bukan template admin siap pakai secara utuh.

Pendekatan ini dipilih karena navigasi akan terus berkembang, hak akses berbeda untuk setiap pengguna, tabel membutuhkan ruang horizontal besar, dan identitas visual harus tetap selaras dengan portal publik SICEPOL.
