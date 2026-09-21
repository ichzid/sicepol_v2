import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getEsptpdMealReport, getOpdMealRecapReport, getRekapWpReport, getSimpadaReport, getSimpadaSources } from '../api/simpada';
import type { EsptpdReportParams, OpdMealRecapParams, RekapWpParams, SimpadaReportParams, SimpadaReportType } from '../types/simpada';

export function useSimpadaSources() {
  return useQuery({ queryKey: ['internal', 'simpada-sources'], queryFn: ({ signal }) => getSimpadaSources(signal) });
}
export function useSimpadaReport(reportType: SimpadaReportType | null, source: string | undefined, params: SimpadaReportParams, enabled = true) {
  return useQuery({
    queryKey: ['internal', 'simpada-report', reportType, source, params],
    queryFn: ({ signal }) => getSimpadaReport(reportType!, source!, params, signal),
    enabled: enabled && Boolean(reportType && source),
    placeholderData: keepPreviousData,
  });
}
export function useEsptpdMealReport(params: EsptpdReportParams, enabled = true) {
  return useQuery({
    queryKey: ['internal', 'esptpd-meal-report', params],
    queryFn: ({ signal }) => getEsptpdMealReport(params, signal),
    enabled,
    placeholderData: keepPreviousData,
  });
}
export function useOpdMealRecapReport(params: OpdMealRecapParams, enabled = true) {
  return useQuery({
    queryKey: ['internal', 'opd-meal-recap-report', params],
    queryFn: ({ signal }) => getOpdMealRecapReport(params, signal),
    enabled,
    placeholderData: keepPreviousData,
  });
}
export function useRekapWpReport(source: string | undefined, params: RekapWpParams, enabled = true) {
  return useQuery({
    queryKey: ['internal', 'rekap-wp-report', source, params],
    queryFn: ({ signal }) => getRekapWpReport(source!, params, signal),
    enabled: enabled && Boolean(source),
    placeholderData: keepPreviousData,
  });
}
