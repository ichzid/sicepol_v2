import axios from 'axios';
import type { PbbApiResponse, PbbFilter, PbbKetetapanItem, PbbPiutangItem, PbbRealisasiItem, PbbReportType } from '../types/pbbReport';

export const pbbApiBaseUrl =
  import.meta.env.VITE_PBB_REPORT_API_BASE_URL || '/api/GetLaporan';

export const pbbApiKey =
  import.meta.env.VITE_PBB_REPORT_API_KEY || 'PBB-LAPORAN-2026-7f4c9a2e8b6d1f3a5c0e';

export const pbbReportApi = axios.create({
  baseURL: pbbApiBaseUrl,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'X-API-Key': pbbApiKey,
  },
});

export async function fetchPbbReport<T = PbbKetetapanItem | PbbRealisasiItem | PbbPiutangItem>(
  type: PbbReportType,
  filter: PbbFilter,
  signal?: AbortSignal
): Promise<PbbApiResponse<T>> {
  const params: Record<string, unknown> = {
    kd_kecamatan: filter.kd_kecamatan || '1221',
    kd_kelurahan: filter.kd_kelurahan || '999',
    buku: filter.buku ?? 9,
    format: 'json',
  };

  if (type === 'realisasi') {
    if (filter.tgl_awal) params.tgl_awal = filter.tgl_awal;
    if (filter.tgl_akhir) params.tgl_akhir = filter.tgl_akhir;
  } else {
    params.tahun = filter.tahun ?? new Date().getFullYear();
  }

  const response = await pbbReportApi.get<PbbApiResponse<T>>(`/${type}`, {
    params,
    signal,
  });

  return response.data;
}

export async function exportPbbReport(
  type: PbbReportType,
  filter: PbbFilter
) {
  const params: Record<string, unknown> = {
    kd_kecamatan: filter.kd_kecamatan || '1221',
    kd_kelurahan: filter.kd_kelurahan || '999',
    buku: filter.buku ?? 9,
    format: 'excel',
  };

  if (type === 'realisasi') {
    if (filter.tgl_awal) params.tgl_awal = filter.tgl_awal;
    if (filter.tgl_akhir) params.tgl_akhir = filter.tgl_akhir;
  } else {
    params.tahun = filter.tahun ?? new Date().getFullYear();
  }

  return pbbReportApi.get(`/${type}`, {
    params,
    responseType: 'blob',
  });
}
