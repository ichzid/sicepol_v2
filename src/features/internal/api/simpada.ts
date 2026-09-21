import axios, { isAxiosError } from 'axios';
import type { EsptpdReportParams, EsptpdReportResponse, OpdMealRecapParams, OpdMealRecapResponse, RekapWpParams, RekapWpResponse, SimpadaReportParams, SimpadaReportResponse, SimpadaReportType, SimpadaSourcesResponse } from '../types/simpada';

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const simpadaApi = axios.create({ baseURL: apiBaseUrl, headers: { Accept: 'application/json' }, timeout: 30000 });

export function compactSimpadaParams<T extends object>(params: T): T {
  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined)) as T;
}

export async function getSimpadaSources(signal?: AbortSignal) {
  return (await simpadaApi.get<SimpadaSourcesResponse>('/v1/reports/pajak-daerah/sources', { signal })).data;
}
export async function getSimpadaReport(reportType: SimpadaReportType, source: string, params: SimpadaReportParams, signal?: AbortSignal) {
  return (await simpadaApi.get<SimpadaReportResponse>(`/v1/reports/pajak-daerah/${reportType}/${source}`, { params: compactSimpadaParams(params), signal })).data;
}
export async function exportSimpadaReport(reportType: SimpadaReportType, source: string, params: SimpadaReportParams) {
  const exportParams = { ...compactSimpadaParams(params) };
  delete exportParams.page;
  delete exportParams.per_page;
  return simpadaApi.get<Blob>(`/v1/reports/pajak-daerah/${reportType}/${source}/export`, { params: exportParams, responseType: 'blob', headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } });
}
export async function getEsptpdMealReport(params: EsptpdReportParams, signal?: AbortSignal) {
  return (await simpadaApi.get<EsptpdReportResponse>('/v1/reports/esptpd/monitoring-makan-minum', { params: compactSimpadaParams(params), signal })).data;
}
export async function exportEsptpdMealReport(params: EsptpdReportParams) {
  const exportParams = { ...compactSimpadaParams(params) };
  delete exportParams.page;
  delete exportParams.per_page;
  return simpadaApi.get<Blob>('/v1/reports/esptpd/monitoring-makan-minum/export', { params: exportParams, responseType: 'blob', headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } });
}
export async function getOpdMealRecapReport(params: OpdMealRecapParams, signal?: AbortSignal) {
  return (await simpadaApi.get<OpdMealRecapResponse>('/v1/reports/esptpd/rekap-instansi-makan-minum', { params: compactSimpadaParams(params), signal })).data;
}
export async function exportOpdMealRecapReport(params: OpdMealRecapParams) {
  const exportParams = { ...compactSimpadaParams(params) };
  delete exportParams.page;
  delete exportParams.per_page;
  return simpadaApi.get<Blob>('/v1/reports/esptpd/rekap-instansi-makan-minum/export', { params: exportParams, responseType: 'blob', headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } });
}
export async function getRekapWpReport(source: string, params: RekapWpParams, signal?: AbortSignal) {
  return (await simpadaApi.get<RekapWpResponse>(`/v1/reports/pajak-daerah/rekap-ketetapan-per-wp/${source}`, { params: compactSimpadaParams(params), signal })).data;
}
export async function exportRekapWpReport(source: string, params: RekapWpParams) {
  const exportParams = { ...compactSimpadaParams(params) };
  delete exportParams.page;
  delete exportParams.per_page;
  return simpadaApi.get<Blob>(`/v1/reports/pajak-daerah/rekap-ketetapan-per-wp/${source}/export`, { params: exportParams, responseType: 'blob', headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' } });
}
export async function getApiErrorMessage(error: unknown) {
  if (!isAxiosError(error)) return 'Terjadi kesalahan saat menghubungi API.';
  let payload = error.response?.data;
  if (payload instanceof Blob) {
    try { payload = JSON.parse(await payload.text()); } catch { return error.message; }
  }
  if (payload && typeof payload === 'object') {
    const body = payload as { message?: string; errors?: Record<string, string[]> };
    if (body.message) return body.message;
    const messages = Object.values(body.errors || {}).flat();
    if (messages.length) return messages.join(' ');
  }
  const status = error.response?.status;
  if (status === 401) return 'Autentikasi diperlukan.';
  if (status === 404) return 'Laporan atau sumber tidak ditemukan.';
  if (status === 422) return 'Filter laporan tidak valid.';
  if (status === 500) return 'Server gagal memproses laporan.';
  return error.message;
}
export function getExportFilename(contentDisposition: string | undefined, fallback: string) {
  if (!contentDisposition) return fallback;
  const utf8 = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const plain = contentDisposition.match(/filename="?([^";]+)"?/i)?.[1];
  try { return decodeURIComponent(utf8 || plain || fallback); } catch { return plain || fallback; }
}
