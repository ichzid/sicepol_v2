import { useQuery } from '@tanstack/react-query';
import { getRealisasi, getTrenPenerimaan } from '../api/realisasi';
import type { DashboardFilter } from '../types';

export function useRealisasi(filter: DashboardFilter) {
  return useQuery({
    queryKey: ['internal', 'realisasi', filter.type, filter.year],
    queryFn: () => getRealisasi(filter.type, filter.year),
  });
}

export function useTrenPenerimaan(filter: DashboardFilter) {
  return useQuery({
    queryKey: ['internal', 'tren-penerimaan', filter.type, filter.year],
    queryFn: () => getTrenPenerimaan(filter.type, filter.year),
  });
}
