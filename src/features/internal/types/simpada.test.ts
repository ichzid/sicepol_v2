import { describe, expect, it } from 'vitest';
import { buildEsptpdColumns, buildRekapWpColumns, buildSimpadaColumns, sanitizeExportFilename } from '../pages/ReportPage';
import { adaptEsptpdPagination, adaptEsptpdRows, adaptRekapWpPagination, adaptRekapWpRows, adaptSimpadaPagination, adaptSimpadaRows, type EsptpdReportResponse, type RekapWpResponse, type SimpadaReportResponse } from './simpada';

describe('adapter laporan SIMPADA', () => {
  it('menggunakan meta API untuk pagination tanpa slicing data client', () => {
    const response: SimpadaReportResponse = {
      meta: { report_type: 'monitoring', source: 'hotel', compatibility_mode: 'compatibility', total: 87, row_count: 2, columns: [], pagination: { current_page: 4, per_page: 25, last_page: 4 } },
      data: [{ taxpayer_number: 'A' }, { taxpayer_number: 'B' }],
    };
    expect(adaptSimpadaPagination(response, 1, 10)).toEqual({ page: 4, perPage: 25, pages: 4, total: 87, rowCount: 2 });
    expect(adaptSimpadaRows(response.data)).toHaveLength(2);
  });

  it('menampilkan source_match_status not_found tanpa memasukkan payment_match_status ke presentasi', () => {
    const [row] = adaptSimpadaRows([{ source_match_status: 'not_found', payment_match_status: 'found' }], 'monitoring');
    expect(row.sourceMatchStatus).toBe('not_found');
    expect(row).not.toHaveProperty('paymentMatchStatus');
    expect(row.action).toBe('Detail');
  });

  it('mempertahankan nomor API, identifier, status_code, dan fallback data kosong', () => {
    const input = [{ number: '007', taxpayer_number: '0002', taxpayer_name: '', address: null, assessment_date: '2026-01-10', principal_amount: '100.25', payment_status: 'Teks bebas', status_code: 'paid' }];
    const [row] = adaptSimpadaRows(input, 'monitoring');
    expect(row).toMatchObject({ number: '007', taxpayer_number: '0002', taxpayer_name: '-', address: '-', assessment_date: '10-01-2026', principal_amount: '100.25', status: 'Teks bebas', statusCode: 'paid' });
    expect(input[0]).not.toHaveProperty('status');
  });

  it('menampilkan details sebagai teks ringkas tanpa mengubah object API', () => {
    const details = { rate: '10 %', note: null };
    const [row] = adaptSimpadaRows([{ details }]);
    expect(row.details).toBe('rate: 10 %; note: -');
    expect(details).toEqual({ rate: '10 %', note: null });
  });

  it('mengecualikan kolom terlarang, mempertahankan urutan meta.columns, dan menaruh status teks terakhir', () => {
    expect(buildSimpadaColumns(['document_number', 'number', 'due_date', 'taxpayer_name', 'penalty_months', 'penalty_amount', 'total_amount', 'payment_date', 'details', 'principal_amount'], 'monitoring').map(column => column.key)).toEqual(['document_number', 'taxpayer_name', 'principal_amount', 'statusText']);
    expect(buildSimpadaColumns(['number', 'payment_status', 'kohir'], 'piutang').map(column => column.key)).toEqual(['kohir', 'statusText']);
    expect(buildSimpadaColumns(['payment_status'], 'ketetapan').map(column => column.key)).toEqual([]);
  });

  it('menormalisasi lebar seluruh kolom aktif termasuk status teks', () => {
    const columns = buildSimpadaColumns(['document_number', 'taxpayer_number', 'assessment_date', 'taxpayer_name', 'address', 'principal_amount'], 'monitoring');
    const widths = Object.fromEntries(columns.map(column => [column.key, Number.parseFloat(column.width || '')]));

    expect(columns.every(column => column.width?.endsWith('%'))).toBe(true);
    expect(Object.values(widths).reduce((total, width) => total + width, 0)).toBeCloseTo(100, 1);
    expect(widths.address).toBeGreaterThan(widths.assessment_date);
    expect(widths.address).toBeGreaterThan(widths.document_number);
    expect(widths.taxpayer_name).toBeGreaterThan(widths.assessment_date);
    expect(widths.taxpayer_name).toBeGreaterThan(widths.taxpayer_number);
    expect(widths.statusText).toBeGreaterThan(0);
  });

  it('mengadaptasi data dan pagination Rekap WP tanpa field number', () => {
    const response: RekapWpResponse = {
      meta: { total: 21, row_count: 1, columns: ['number', 'taxpayer_number', 'taxpayer_name', 'address', 'january', 'annual_total'], pagination: { current_page: 2, per_page: 10, last_page: 3 } },
      data: [{ number: 11, taxpayer_number: 'P.001', taxpayer_name: 'Usaha Maju', address: null, january: '1000', february: '0', march: '0', april: '0', may: '0', june: '0', july: '0', august: '0', september: '0', october: '0', november: '0', december: '0', annual_total: '1000' }],
    };
    expect(adaptRekapWpPagination(response, 1, 25)).toEqual({ page: 2, perPage: 10, pages: 3, total: 21, rowCount: 1 });
    expect(adaptRekapWpRows(response.data)[0]).toMatchObject({ taxpayer_number: 'P.001', address: '-', january: '1000', annual_total: '1000' });
    expect(adaptRekapWpRows(response.data)[0]).not.toHaveProperty('number');
  });

  it('menjamin urutan kontrak kolom Rekap WP dan nominal money', () => {
    const columns = buildRekapWpColumns(['annual_total', 'number', 'january', 'address', 'taxpayer_name', 'taxpayer_number']);
    expect(columns.map(column => column.key)).toEqual(['taxpayer_number', 'taxpayer_name', 'address', 'january', 'annual_total']);
    expect(columns.filter(column => ['january', 'annual_total'].includes(column.key)).every(column => column.money)).toBe(true);
    expect(columns.some(column => column.key === 'number' || column.key === 'action' || column.key === 'status')).toBe(false);
  });

  it('mempertahankan metadata pagination, leading zero, nilai, tanggal display, dan status e-SPTPD', () => {
    const response = {
      meta: { report_type: 'monitoring-makan-minum', source: 'esptpd', compatibility_mode: 'compatibility', year: 2026, month: '09', total: 41, row_count: 1, columns: ['no_npwpd', 'tanggal_input', 'nilai_pajak', 'status_bayar'], pagination: { current_page: 3, per_page: 15, last_page: 3 } },
      data: [{ no: 31, tanggal_input: '15-09-2026', no_npwpd: '0000123', no_sptpd: '00045/SPTPD', nama_instansi: 'Instansi', alamat_instansi: 'Alamat', nama_usaha: 'Usaha', alamat_usaha: 'Alamat Usaha', masa_pajak: 'September 2026', nilai_pajak: '1500000', status_bayar: 'Status Backend', tanggal_bayar: '16-09-2026 10:30:00', nomor_sts: '000STS' }],
    } as EsptpdReportResponse;
    expect(adaptEsptpdPagination(response, 1, 10)).toEqual({ page: 3, perPage: 15, pages: 3, total: 41, rowCount: 1 });
    expect(adaptEsptpdRows(response.data)[0]).toMatchObject({ no_npwpd: '0000123', no_sptpd: '00045/SPTPD', nomor_sts: '000STS', tanggal_input: '15-09-2026', tanggal_bayar: '16-09-2026 10:30:00', nilai_pajak: '1500000', status_bayar: 'Status Backend', status: 'Status Backend' });
    expect(buildEsptpdColumns(response.meta.columns).map(column => column.key)).toEqual(response.meta.columns);
    expect(buildEsptpdColumns(['nilai_pajak'])[0].money).toBe(true);
  });

  it('menyusun fallback filename dari pageTitle yang disanitasi', () => {
    expect(sanitizeExportFilename('Data Realisasi PBJT Atas Hotel')).toBe('data-realisasi-pbjt-atas-hotel.xlsx');
  });
});
