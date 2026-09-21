import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getRetributionRecap, getRetributionReport, getRetributionSources } from '../api/retribution';
import type { RetributionRecapParams, RetributionReportParams } from '../types/retribution';

export function useRetributionSources(enabled = true) { return useQuery({ queryKey: ['internal','retribution-sources'], queryFn: ({ signal }) => getRetributionSources(signal), enabled }); }
export function useRetributionReport(params: RetributionReportParams, enabled = true) { return useQuery({ queryKey: ['internal','retribution-report',params], queryFn: ({ signal }) => getRetributionReport(params, signal), enabled, placeholderData: keepPreviousData }); }
export function useRetributionRecap(params: RetributionRecapParams, enabled = true) { return useQuery({ queryKey: ['internal','retribution-recap',params], queryFn: ({ signal }) => getRetributionRecap(params, signal), enabled, placeholderData: keepPreviousData }); }
