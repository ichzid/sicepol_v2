# API Get Laporan BPHTB

Endpoint ini mengembalikan data ketetapan dan realisasi BPHTB sekaligus dalam satu respons JSON.

## Endpoint

```http
GET /api/GetLaporanBPHTB
```

## Autentikasi

Setiap request wajib menyertakan header:

```http
X-API-KEY: 64863e6c27e99aa36136be012c8608c7299ebc93
```

API key dapat diubah melalui properti `$api_key` pada controller `application/controllers/api/GetLaporanBPHTB.php`.

## Parameter Query

| Parameter | Wajib | Default | Keterangan |
|---|---|---|---|
| `tahun` | Tidak | Tahun berjalan | Hanya dapat dipilih mulai tahun 2025 sampai tahun berjalan |
| `page` | Tidak | `1` | Halaman untuk masing-masing data ketetapan dan realisasi |
| `per_page` | Tidak | `100` | Jumlah data per laporan, maksimal 500 |

Parameter `jenis` tidak digunakan. Data ketetapan dan realisasi selalu dikirim bersamaan.

## Tampilan Data Awal

Saat view client pertama kali dibuka, panggil endpoint tanpa parameter `tahun`:

```bash
curl -X GET "https://domain.go.id/api/GetLaporanBPHTB" \
  -H "X-API-KEY: 64863e6c27e99aa36136be012c8608c7299ebc93"
```

Endpoint otomatis menggunakan tahun berjalan untuk data ketetapan dan realisasi.

## Filter atau Export Berdasarkan Tahun

Tombol export atau filter pada client dapat mengirim parameter `tahun`:

```bash
curl -X GET "https://domain.go.id/api/GetLaporanBPHTB?tahun=2025&page=1&per_page=100" \
  -H "X-API-KEY: 64863e6c27e99aa36136be012c8608c7299ebc93"
```

Frontend harus membuat pilihan tahun berdasarkan nilai berikut pada respons:

```json
{
  "validation": {
    "tahun_minimum": 2025,
    "tahun_maksimum": 2026
  }
}
```

Dengan demikian, pilihan tahun dapat dibuat dari `tahun_minimum` sampai `tahun_maksimum`. Tahun 2024 dan sebelumnya tidak boleh ditampilkan atau dikirim.

## Contoh Respons Berhasil

```json
{
  "status": true,
  "message": "Data laporan BPHTB berhasil diambil.",
  "filters": {
    "tahun": 2026
  },
  "validation": {
    "tahun_minimum": 2025,
    "tahun_maksimum": 2026
  },
  "laporan": {
    "ketetapan": {
      "pagination": {
        "page": 1,
        "per_page": 100,
        "total": 200,
        "total_pages": 2
      },
      "data": []
    },
    "realisasi": {
      "pagination": {
        "page": 1,
        "per_page": 100,
        "total": 180,
        "total_pages": 2
      },
      "data": []
    }
  }
}
```

Setiap item pada `data` memiliki field berikut:

- `no_sts`
- `nomor_dokumen`
- `nop`
- `nomor_registrasi`
- `npwp`
- `nik_wp`
- `nama_wp`
- `alamat_wp`
- `notaris`
- `luas_tanah`
- `luas_bangunan`
- `njop_pbb`
- `npoptkp_bphtb`
- `alamat_objek_pajak`
- `tanggal_bayar`
- `nilai_transaksi`
- `setoran`
- `keterangan`
- `tanggal_validasi`
- `status_bayar`

Metadata yang tidak memiliki pasangan nomor dokumen akan bernilai `null` tanpa menggagalkan seluruh respons.

## Respons Error

### API key tidak ada atau salah — HTTP 401

```json
{
  "status": false,
  "message": "API key tidak valid."
}
```

### Tahun di bawah 2025 atau melewati tahun berjalan — HTTP 422

```json
{
  "status": false,
  "message": "Parameter tahun tidak valid.",
  "errors": {
    "tahun": "Tahun laporan hanya tersedia mulai 2025 sampai 2026."
  },
  "validation": {
    "tahun_minimum": 2025,
    "tahun_maksimum": 2026
  }
}
```

Frontend dapat menggunakan objek `validation` dari respons error untuk memperbaiki daftar pilihan tahun.

## Catatan Keamanan

- Gunakan HTTPS pada server produksi.
- Rotasi API key secara berkala.
- Jangan meletakkan API key pada URL atau query string.
- Batasi akses dokumentasi dan API key karena respons berisi data wajib pajak.
