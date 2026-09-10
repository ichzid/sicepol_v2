# Panduan API Tren Penerimaan

## Informasi Dasar

Base URL:

```text
https://api-bapenda.ichmal.my.id/api
```

API menggunakan method `GET`, menghasilkan response JSON, dan tidak memerlukan API key atau autentikasi.

Header request:

```http
Accept: application/json
```

## Endpoint

Endpoint ini digunakan untuk menampilkan tren penerimaan bulanan. Data dapat diambil secara global berdasarkan kelompok pendapatan atau dibatasi untuk satu jenis pajak/retribusi.

```http
GET /tren-penerimaan?tahun={tahun}&jenis={jenis}&kode={kode}
```

## Parameter

| Parameter | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `tahun` | number | Ya | Tahun anggaran yang ingin ditampilkan |
| `jenis` | string | Ya | Kelompok pendapatan: `pajak` atau `retribusi` |
| `kode` | string | Tidak | Kode stabil jenis pajak/retribusi dari database |

Aturan penggunaan:

- Tanpa parameter `kode`, API mengembalikan tren global untuk seluruh data dalam kelompok `jenis`.
- Dengan parameter `kode`, API mengembalikan tren untuk satu jenis pajak atau retribusi.
- Nilai `kode` menggunakan identifier stabil dari database, bukan nama tampilan.

## Contoh Request

### Tren Global Pajak Daerah

```http
GET https://api-bapenda.ichmal.my.id/api/tren-penerimaan?tahun=2026&jenis=pajak
Accept: application/json
```

### Tren Per Jenis Pajak

```http
GET https://api-bapenda.ichmal.my.id/api/tren-penerimaan?tahun=2026&jenis=pajak&kode=PBB
Accept: application/json
```

### Tren Global Retribusi Daerah

```http
GET https://api-bapenda.ichmal.my.id/api/tren-penerimaan?tahun=2026&jenis=retribusi
Accept: application/json
```

### Tren Per Jenis Retribusi

```http
GET https://api-bapenda.ichmal.my.id/api/tren-penerimaan?tahun=2026&jenis=retribusi&kode=PELAYANAN_KESEHATAN
Accept: application/json
```

## Bentuk Response

```json
{
  "success": true,
  "tahun": 2026,
  "jenis": "pajak",
  "kode": "PBB",
  "nama": "Pajak Bumi dan Bangunan",
  "ringkasan": {
    "total_realisasi": 64860000000
  },
  "rincian": [
    {
      "bulan": 1,
      "nama_bulan": "Januari",
      "realisasi": 4250000000
    },
    {
      "bulan": 2,
      "nama_bulan": "Februari",
      "realisasi": 5180000000
    },
    {
      "bulan": 3,
      "nama_bulan": "Maret",
      "realisasi": 0
    }
  ]
}
```

Untuk request global, field `kode` dan `nama` bernilai `null`.

## Ketentuan Data Backend

- Field `rincian` selalu berisi 12 bulan, dari Januari sampai Desember.
- Bulan tanpa transaksi tetap dikembalikan dengan nilai `realisasi: 0`.
- Data diurutkan berdasarkan nomor bulan secara menaik.
- Pengelompokan menggunakan tanggal pembayaran atau tanggal transaksi.
- Nominal dikirim sebagai angka, bukan string berformat rupiah.
- Perhitungan tanggal menggunakan zona waktu `Asia/Jakarta`.
- Jika `kode` tidak ditemukan atau tidak sesuai dengan `jenis`, API mengembalikan status `404` atau `422` dengan pesan yang jelas.

## JavaScript/TypeScript

```ts
type JenisPendapatan = "pajak" | "retribusi";

async function getTrenPenerimaan(
  tahun: number,
  jenis: JenisPendapatan,
  kode?: string,
) {
  const url = new URL(
    "https://api-bapenda.ichmal.my.id/api/tren-penerimaan",
  );

  url.searchParams.set("tahun", String(tahun));
  url.searchParams.set("jenis", jenis);

  if (kode) {
    url.searchParams.set("kode", kode);
  }

  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.message ?? `Gagal mengambil tren penerimaan: ${response.status}`,
    );
  }

  return response.json();
}

const trenGlobal = await getTrenPenerimaan(2026, "pajak");
const trenPbb = await getTrenPenerimaan(2026, "pajak", "PBB");
```

## cURL

```bash
curl --request GET \
  --header "Accept: application/json" \
  "https://api-bapenda.ichmal.my.id/api/tren-penerimaan?tahun=2026&jenis=pajak&kode=PBB"
```

## Status HTTP

| Status | Keterangan |
|---|---|
| `200` | Request berhasil |
| `404` | Data atau endpoint tidak ditemukan |
| `422` | Parameter request tidak valid |
| `500` | Terjadi masalah pada server API |
