import AxiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { exportEsptpdMealReport, exportOpdMealRecapReport, exportRekapWpReport, exportSimpadaReport, getApiErrorMessage, getEsptpdMealReport, getExportFilename, getOpdMealRecapReport, getRekapWpReport, getSimpadaReport, simpadaApi } from './simpada';

const mock = new AxiosMockAdapter(simpadaApi);
const emptyResponse = { meta: { report_type: 'monitoring', source: 'hotel', compatibility_mode: 'compatibility', total: 0, row_count: 0, columns: [], pagination: { current_page: 1, per_page: 10, last_page: 1 } }, data: [] };

afterEach(() => mock.reset());

describe('API laporan SIMPADA', () => {
  it('memanggil URL laporan yang benar dan hanya mengirim parameter terisi', async () => {
    mock.onGet('/v1/reports/pajak-daerah/monitoring/hotel').reply(config => {
      expect(config.params).toEqual({ year: 2026, month: '02', page: 1, per_page: 10 });
      expect(config.params).not.toHaveProperty('search');
      expect(config.params).not.toHaveProperty('mode');
      expect(config.params).not.toHaveProperty('as_of_date');
      expect(config.params).not.toHaveProperty('sort_by');
      expect(config.params).not.toHaveProperty('sort_direction');
      return [200, emptyResponse];
    });

    await getSimpadaReport('monitoring', 'hotel', { year: 2026, month: '02', search: '', page: 1, per_page: 10 });
    expect(mock.history.get).toHaveLength(1);
  });

  it('tetap mengirim corrected untuk request dan ekspor piutang listrik', async () => {
    mock.onGet('/v1/reports/pajak-daerah/piutang/pbjt-tenaga-listrik').reply(config => {
      expect(config.params).toEqual({ year: 2026, mode: 'corrected' });
      return [200, emptyResponse];
    });
    mock.onGet('/v1/reports/pajak-daerah/piutang/pbjt-tenaga-listrik/export').reply(config => {
      expect(config.params).toEqual({ year: 2026, mode: 'corrected' });
      return [200, new Blob(['xlsx'])];
    });
    await getSimpadaReport('piutang', 'pbjt-tenaga-listrik', { year: 2026, mode: 'corrected' });
    await exportSimpadaReport('piutang', 'pbjt-tenaga-listrik', { year: 2026, mode: 'corrected', page: 2, per_page: 25 });
  });

  it('ekspor tidak mengirim pagination dan nama file dibaca dari Content-Disposition', async () => {
    mock.onGet('/v1/reports/pajak-daerah/realisasi/restoran/export').reply(config => {
      expect(config.params).toEqual({ year: 2026 });
      expect(config.params).not.toHaveProperty('mode');
      expect(config.params).not.toHaveProperty('as_of_date');
      expect(config.responseType).toBe('blob');
      return [200, new Blob(['xlsx']), { 'Content-Disposition': "attachment; filename*=UTF-8''realisasi%20restoran.xlsx" }];
    });
    const response = await exportSimpadaReport('realisasi', 'restoran', { year: 2026, page: 4, per_page: 50 });
    expect(getExportFilename(response.headers['Content-Disposition'] as string | undefined, 'fallback.xlsx')).toBe('realisasi restoran.xlsx');
  });

  it('memanggil endpoint Rekap WP tanpa parameter report lain', async () => {
    mock.onGet('/v1/reports/pajak-daerah/rekap-ketetapan-per-wp/pbjt-hotel').reply(config => {
      expect(config.params).toEqual({ year: 2026, search: 'maju', sort_by: 'annual_total', sort_direction: 'desc', page: 2, per_page: 10 });
      expect(config.params).not.toHaveProperty('month');
      expect(config.params).not.toHaveProperty('mode');
      expect(config.params).not.toHaveProperty('as_of_date');
      return [200, { meta: { total: 0, row_count: 0, columns: [], pagination: { current_page: 2, per_page: 10, last_page: 1 } }, data: [] }];
    });
    await getRekapWpReport('pbjt-hotel', { year: 2026, search: 'maju', sort_by: 'annual_total', sort_direction: 'desc', page: 2, per_page: 10 });
  });

  it('ekspor Rekap WP mempertahankan filter dan sorting tanpa pagination', async () => {
    mock.onGet('/v1/reports/pajak-daerah/rekap-ketetapan-per-wp/pbjt-hotel/export').reply(config => {
      expect(config.params).toEqual({ year: 2026, search: 'maju', sort_by: 'taxpayer_name', sort_direction: 'asc' });
      expect(config.params).not.toHaveProperty('page');
      expect(config.params).not.toHaveProperty('per_page');
      return [200, new Blob(['xlsx'])];
    });
    await exportRekapWpReport('pbjt-hotel', { year: 2026, search: 'maju', sort_by: 'taxpayer_name', sort_direction: 'asc', page: 3, per_page: 25 });
  });

  it('memanggil endpoint e-SPTPD dengan compact params tanpa mode, sorting default, atau parameter terlarang', async () => {
    mock.onGet('/v1/reports/esptpd/monitoring-makan-minum').reply(config => {
      expect(config.params).toEqual({ year: 2026, month: '09', page: 2, per_page: 25 });
      for (const field of ['search', 'sort_by', 'sort_direction', 'mode', 'id_user', 'id_opd', 'akses']) expect(config.params).not.toHaveProperty(field);
      return [200, emptyResponse];
    });
    await getEsptpdMealReport({ year: 2026, month: '09', search: '', page: 2, per_page: 25 });
  });

  it('ekspor e-SPTPD mempertahankan filter/search/sorting dan menghapus pagination', async () => {
    mock.onGet('/v1/reports/esptpd/monitoring-makan-minum/export').reply(config => {
      expect(config.params).toEqual({ year: 2026, month: '09', search: 'restoran', sort_by: 'nilai_pajak', sort_direction: 'desc' });
      expect(config.params).not.toHaveProperty('page');
      expect(config.params).not.toHaveProperty('per_page');
      expect(config.responseType).toBe('blob');
      return [200, new Blob(['xlsx'])];
    });
    await exportEsptpdMealReport({ year: 2026, month: '09', search: 'restoran', sort_by: 'nilai_pajak', sort_direction: 'desc', page: 4, per_page: 50 });
  });

  it('mengirim parameter Rekap OPD sesuai kontrak dan menghapus pagination saat ekspor', async () => {
    mock.onGet('/v1/reports/esptpd/rekap-instansi-makan-minum').reply(config => {
      expect(config.params).toEqual({ year: 2026, search: 'dinas', sort_by: 'total', sort_direction: 'desc', page: 2, per_page: 10 });
      for (const field of ['month', 'mode', 'as_of_date', 'id_user', 'id_opd', 'akses']) expect(config.params).not.toHaveProperty(field);
      return [200, emptyResponse];
    });
    mock.onGet('/v1/reports/esptpd/rekap-instansi-makan-minum/export').reply(config => {
      expect(config.params).toEqual({ year: 2026, search: 'dinas', sort_by: 'total', sort_direction: 'desc' });
      expect(config.params).not.toHaveProperty('page');
      expect(config.params).not.toHaveProperty('per_page');
      return [200, new Blob(['xlsx'])];
    });
    const params = { year: 2026, search: 'dinas', sort_by: 'total' as const, sort_direction: 'desc' as const, page: 2, per_page: 10 };
    await getOpdMealRecapReport(params);
    await exportOpdMealRecapReport(params);
  });

  it('mengambil message backend untuk error 422', async () => {
    mock.onGet('/v1/reports/pajak-daerah/monitoring/hotel').reply(422, { message: 'Bulan laporan tidak valid.' });
    let thrown: unknown;
    try { await getSimpadaReport('monitoring', 'hotel', { year: 2026 }); } catch (error) { thrown = error; }
    expect(await getApiErrorMessage(thrown)).toBe('Bulan laporan tidak valid.');
  });
});
