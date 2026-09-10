import axios from 'axios';
import type { RealisasiResponse, RevenueType, TrenPenerimaanResponse } from '../types';

const realisasiApi = axios.create({
  baseURL: 'https://api-bapenda.ichmal.my.id/api',
  headers: { Accept: 'application/json' },
  timeout: 10000,
});

export async function getRealisasi(type: RevenueType, year: number) {
  const endpoint = type === 'pajak' ? '/realisasi-pajak' : '/realisasi-retribusi';
  return (await realisasiApi.get<RealisasiResponse>(endpoint, { params: { tahun: year } })).data;
}

export async function getTrenPenerimaan(type: RevenueType, year: number) {
  return (await realisasiApi.get<TrenPenerimaanResponse>('/tren-penerimaan', {
    params: { tahun: year, jenis: type },
  })).data;
}
