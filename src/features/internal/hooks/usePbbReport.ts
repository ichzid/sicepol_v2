import { useQuery } from '@tanstack/react-query';
import { fetchPbbReport } from '../api/pbbReport';
import type { PbbApiResponse, PbbFilter, PbbKetetapanItem, PbbPiutangItem, PbbRealisasiItem, PbbReportType } from '../types/pbbReport';

export function usePbbReport<T = PbbKetetapanItem | PbbRealisasiItem | PbbPiutangItem>(
  type: PbbReportType,
  filter: PbbFilter,
  enabled = true
) {
  return useQuery<PbbApiResponse<T>>({
    queryKey: ['pbb-report', type, filter],
    queryFn: ({ signal }) => fetchPbbReport<T>(type, filter, signal),
    enabled,
    staleTime: 60 * 1000,
  });
}
