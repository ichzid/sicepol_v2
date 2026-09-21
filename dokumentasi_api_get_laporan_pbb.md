# API GET Laporan PBB

Base URL: `https://<host>/<base-path>/api/GetLaporan`

## Konfigurasi

Key dikonfigurasi pada properti `$apiKey` di method `__construct()` dalam `application/controllers/api/GetLaporan.php`:

```php
$this->apiKey = 'PBB-LAPORAN-2026-7f4c9a2e8b6d1f3a5c0e';
```

Ganti nilai tersebut dengan key acak minimal 32 karakter yang sama dengan konfigurasi aplikasi client. Kirim key hanya melalui header `X-API-Key`. API key tidak boleh ditaruh di URL/query string, log, atau frontend publik. Karena key berada dalam source code, batasi akses repository dan file controller. Untuk aplikasi browser, idealnya panggil API melalui backend/proxy tepercaya yang menyimpan key di server.

## Endpoint dan Parameter

Semua endpoint hanya menerima `GET`, mewajibkan HTTPS untuk akses non-localhost, dan default menghasilkan JSON.

| Endpoint | Parameter Khusus | Default |
|---|---|---|
| `/ketetapan` | `tahun` (4 digit, minimal 1992) | tahun berjalan |
| `/piutang` | `tahun` (4 digit, minimal 1992) | tahun berjalan |
| `/realisasi` | `tgl_awal`, `tgl_akhir` (`YYYY-MM-DD`) | 1 Januari tahun berjalan sampai hari ini |

### Parameter Umum

- `kd_kecamatan`: kode 3 digit atau `1221` untuk seluruh wilayah; default `1221`.
- `kd_kelurahan`: `999` untuk semua desa, atau kode 3/6 digit (6 digit dinormalisasi ke 3 digit); default `999`. Jika kecamatan `1221`, nilainya wajib `999`.
- `buku`: `7` = Buku 1/2/3 (nilai `< 2.000.000`), `8` = Buku 4/5 (nilai `>= 2.000.000`), `9` = semua buku; default `9`.
- `format`: `json` atau `excel`; default `json`. Nilai `excel` mengunduh `.xlsx` dengan filter yang sama.

## Contoh Penggunaan

### 1. Request via cURL (JSON)

```bash
curl --fail-with-body \
  -H "X-API-Key: $PBB_LAPORAN_API_KEY" \
  "https://<host>/<base-path>/api/GetLaporan/ketetapan?tahun=2026&kd_kecamatan=1221&kd_kelurahan=999&buku=9"
```

### 2. Render JSON melalui Backend / Proxy

```js
const response = await fetch('/proxy/laporan/ketetapan?tahun=2026');
const payload = await response.json();
if (!response.ok) throw new Error(payload.message);
document.querySelector('#hasil').textContent = JSON.stringify(payload.data, null, 2);
```

### 3. Panggilan Langsung dari Lingkungan Internal Tepercaya

Jika JavaScript berjalan pada lingkungan internal tepercaya (bukan frontend publik), header dapat dikirim langsung:

```js
const response = await fetch('https://<host>/<base-path>/api/GetLaporan/realisasi', {
  headers: { 'X-API-Key': apiKey }
});
```

### 4. Unduh Excel sebagai Blob

Sebaiknya gunakan URL proxy backend agar key tidak terekspos:

```js
const response = await fetch('/proxy/laporan/piutang?tahun=2026&format=excel');
if (!response.ok) throw new Error((await response.json()).message);
const blob = await response.blob();
const url = URL.createObjectURL(blob);
const link = Object.assign(document.createElement('a'), { href: url, download: 'Piutang_PBB_2026.xlsx' });
link.click();
URL.revokeObjectURL(url);
```

## Struktur Respons JSON

```json
{
  "success": true,
  "message": "Laporan ketetapan berhasil diambil.",
  "jenis_laporan": "ketetapan",
  "filter": {
    "kd_kecamatan": "1221",
    "kd_kelurahan": "999",
    "buku": 9,
    "format": "json",
    "tahun": 2026
  },
  "total_data": 1,
  "total_nominal": 150000,
  "data": []
}
```

Respons error memakai struktur yang sama dengan `success: false`, `filter: {}`, `total_data: 0`, `total_nominal: 0`, dan `data: []` bila konteks belum tersedia.

### Kode Status HTTP

- `200` : Berhasil
- `400` : Parameter tidak valid
- `401` : Key salah atau tidak ada
- `403` : Akses remote tanpa HTTPS
- `404` : Endpoint laporan tidak ditemukan
- `405` : Metode HTTP bukan GET
- `500` : Kegagalan pemrosesan internal tanpa detail database
- `503` : Konfigurasi key belum valid

## Mapping Kolom Data

- **Ketetapan**: `nop`, `nik`, `nama_wp`, `alamat_objek`, `pokok_pbb`, luas/kode kelas/NJOP per meter tanah dan bangunan, `njoptkp`, `tahun`, nama wilayah.
- **Piutang**: `nop`, `nama_wp`, `pokok_pbb`, `tgl_jatuh_tempo`, `denda`, `pokok_dan_denda`, luas tanah/bangunan, `tahun`, nama wilayah. *(Piutang berarti tidak ada transaksi pasangan pada `pembayaran_sppt`; denda dihitung oleh `Denda_pbb`)*.
- **Realisasi**: `nop`, `nama_wp`, `alamat_objek`, `pokok_pbb`, `denda`, `pokok_dan_denda`, `tanggal_bayar`, `tahun`, luas/NJOP/kode kelas tanah dan bangunan, nama wilayah.

## SOP Keamanan dan Integrasi

1. Buat key acak minimal 32 karakter, simpan sebagai *environment variable* server, batasi akses konfigurasi, dan rotasi berkala.
2. Jangan *hardcode* / *commit* key dan jangan pernah mengirimkannya melalui URL atau frontend publik.
3. Gunakan HTTPS tervalidasi; jangan menonaktifkan verifikasi sertifikat pada client.
4. Terapkan autentikasi, otorisasi wilayah, *rate limit*, audit akses, dan *timeout* pada proxy/integrator sesuai kebutuhan organisasi.
5. Validasi status HTTP dan properti `success`; perlakukan file Excel hanya ketika respons sukses dan header `Content-Type` sesuai.
6. Data laporan mengandung data wajib pajak: batasi pengguna, penyimpanan, distribusi, dan masa retensinya.