# Panduan Konsumsi API Realisasi Pajak Daerah dan Retribusi Daerah

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

## 1. Daftar Realisasi Pajak Daerah

### Endpoint

```http
GET /realisasi-pajak?tahun={tahun}
```

Contoh request untuk tahun 2026:

```http
GET https://api-bapenda.ichmal.my.id/api/realisasi-pajak?tahun=2026
Accept: application/json
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `tahun` | number | Tidak | Tahun anggaran yang ingin ditampilkan |

### JavaScript/TypeScript

```ts
async function getRealisasiPajakDaerah(tahun: number) {
  const url = new URL(
    "https://api-bapenda.ichmal.my.id/api/realisasi-pajak",
  );
  url.searchParams.set("tahun", String(tahun));

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil realisasi pajak daerah: ${response.status}`,
    );
  }

  return response.json();
}

const data = await getRealisasiPajakDaerah(2026);
console.log(data.rincian);
```

### cURL

```bash
curl --request GET \
  --header "Accept: application/json" \
  "https://api-bapenda.ichmal.my.id/api/realisasi-pajak?tahun=2026"
```

## 2. Daftar Realisasi Retribusi Daerah

### Endpoint

```http
GET /realisasi-retribusi?tahun={tahun}
```

Contoh request untuk tahun 2026:

```http
GET https://api-bapenda.ichmal.my.id/api/realisasi-retribusi?tahun=2026
Accept: application/json
```

### Parameter

| Parameter | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `tahun` | number | Disarankan | Tahun anggaran yang ingin ditampilkan |

### JavaScript/TypeScript

```ts
async function getRealisasiRetribusiDaerah(tahun: number) {
  const url = new URL(
    "https://api-bapenda.ichmal.my.id/api/realisasi-retribusi",
  );
  url.searchParams.set("tahun", String(tahun));

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Gagal mengambil realisasi retribusi daerah: ${response.status}`,
    );
  }

  return response.json();
}

const data = await getRealisasiRetribusiDaerah(2026);
console.log(data.rincian);
```

### cURL

```bash
curl --request GET \
  --header "Accept: application/json" \
  "https://api-bapenda.ichmal.my.id/api/realisasi-retribusi?tahun=2026"
```

## Bentuk Umum Response

Kedua endpoint mengembalikan struktur umum berikut:

```json
{
  "success": true,
  "tahun": 2026,
  "ringkasan": {
    "total_target": 0,
    "total_realisasi": 0,
    "persentase_capaian": 0,
    "selisih_anggaran": 0
  },
  "rincian": []
}
```

Keterangan:

| Field | Keterangan |
|---|---|
| `success` | Status keberhasilan request |
| `tahun` | Tahun anggaran |
| `ringkasan` | Total target dan realisasi seluruh data |
| `rincian` | Daftar realisasi per jenis pajak atau retribusi |

Untuk menampilkan daftar realisasi, gunakan data pada field `rincian`.

## Penanganan Error

Periksa status HTTP sebelum menggunakan response:

```ts
const response = await fetch(url, {
  headers: { Accept: "application/json" },
});

if (!response.ok) {
  const error = await response.json().catch(() => null);
  throw new Error(
    error?.message ?? `Permintaan gagal dengan status ${response.status}`,
  );
}

const data = await response.json();
```

Status HTTP yang mungkin diterima:

| Status | Keterangan |
|---|---|
| `200` | Request berhasil |
| `404` | Endpoint tidak ditemukan |
| `422` | Parameter request tidak valid |
| `500` | Terjadi masalah pada server API |
