import { useQuery } from '@tanstack/react-query';
import { fetchBphtbReport } from '../api/bphtbReport';
import type { BphtbApiResponse, BphtbFilter } from '../types/bphtbReport';

export function useBphtbReport(filter: BphtbFilter, enabled = true) {
  return useQuery<BphtbApiResponse>({
    queryKey: ['bphtb-report', filter],
    queryFn: ({ signal }) => fetchBphtbReport(filter, signal),
    enabled,
    staleTime: 5 * 60 * 1000, // cache 5 minutes
  });
}
