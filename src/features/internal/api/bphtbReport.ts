import axios from 'axios';
import type { BphtbApiResponse, BphtbFilter } from '../types/bphtbReport';

export const bphtbApiBaseUrl =
  import.meta.env.VITE_BPHTB_REPORT_API_BASE_URL || '/api/GetLaporanBPHTB';

export const bphtbApiKey =
  import.meta.env.VITE_BPHTB_REPORT_API_KEY || '64863e6c27e99aa36136be012c8608c7299ebc93';

export const bphtbReportApi = axios.create({
  baseURL: bphtbApiBaseUrl,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'X-API-KEY': bphtbApiKey,
  },
});

export async function fetchBphtbReport(
  filter: BphtbFilter,
  signal?: AbortSignal
): Promise<BphtbApiResponse> {
  const params: Record<string, unknown> = {
    page: filter.page ?? 1,
    per_page: filter.per_page ?? 100,
  };

  if (filter.tahun) {
    params.tahun = filter.tahun;
  }

  const response = await bphtbReportApi.get<BphtbApiResponse>('', {
    params,
    signal,
  });

  return response.data;
}
