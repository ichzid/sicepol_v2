import type { Row } from './index';

export type SimpadaReportType = 'monitoring' | 'ketetapan' | 'realisasi' | 'piutang';
export type SimpadaSortDirection = 'asc' | 'desc';
export type SimpadaMatchStatus = 'found' | 'not_found';
export type SimpadaSortField = 'number' | 'document_number' | 'taxpayer_number' | 'taxpayer_name' | 'address' | 'tax_period' | 'assessment_date' | 'payment_date' | 'due_date' | 'principal_amount' | 'penalty_amount' | 'total_amount' | 'payment_status' | 'kohir' | 'payment_code';

export type SimpadaSource = {
  key: string;
  id: number;
  aliases: number[];
  name: string;
  supported_reports: string[];
};
export type SimpadaSourcesResponse = { data: SimpadaSource[] };

export type SimpadaReportParams = {
  year: number;
  month?: string;
  mode?: 'corrected';
  search?: string;
  sort_by?: SimpadaSortField;
  sort_direction?: SimpadaSortDirection;
  page?: number;
  per_page?: number;
};

export type SimpadaDetails = Record<string, string | number | null>;
export type SimpadaApiRow = {
  number?: number | string | null;
  source_record_id?: string | null;
  document_number?: string | null;
  taxpayer_number?: string | null;
  taxpayer_name?: string | null;
  address?: string | null;
  tax_period?: string | null;
  assessment_date?: string | null;
  payment_date?: string | null;
  due_date?: string | null;
  due_date_display?: string | null;
  principal_amount?: string | null;
  penalty_months?: number | null;
  penalty_amount?: string | null;
  total_amount?: string | null;
  paid_at?: string | null;
  paid_at_display?: string | null;
  payment_status?: string | null;
  status_code?: string | null;
  source_match_status?: SimpadaMatchStatus | null;
  payment_match_status?: SimpadaMatchStatus | null;
  kohir?: string | null;
  payment_code?: string | null;
  details?: SimpadaDetails | null;
};
export type SimpadaPagination = { current_page: number; per_page: number; last_page: number };
export type SimpadaReportMeta = {
  report_type: SimpadaReportType;
  source: string;
  compatibility_mode: string;
  total: number;
  row_count: number;
  columns: string[];
  pagination: SimpadaPagination;
};
export type SimpadaReportResponse = { meta: SimpadaReportMeta; data: SimpadaApiRow[] };

export type EsptpdSortField = 'no' | 'tanggal_input' | 'no_npwpd' | 'no_sptpd' | 'nama_instansi' | 'alamat_instansi' | 'nama_usaha' | 'alamat_usaha' | 'masa_pajak' | 'nilai_pajak' | 'status_bayar' | 'tanggal_bayar' | 'nomor_sts';
export type EsptpdReportParams = {
  year: number;
  month?: string;
  search?: string;
  sort_by?: EsptpdSortField;
  sort_direction?: SimpadaSortDirection;
  page?: number;
  per_page?: number;
};
export type EsptpdApiRow = Record<EsptpdSortField, string | number | null>;
export type EsptpdReportMeta = {
  report_type: 'monitoring-makan-minum';
  source: 'esptpd';
  compatibility_mode: string;
  year: number;
  month?: string | null;
  total: number;
  row_count: number;
  columns: EsptpdSortField[];
  pagination: SimpadaPagination;
};
export type EsptpdReportResponse = { meta: EsptpdReportMeta; data: EsptpdApiRow[] };

export type OpdMealRecapSortField = 'no_npwpd' | 'nama_instansi' | 'alamat_instansi' | 'januari' | 'februari' | 'maret' | 'april' | 'mei' | 'juni' | 'juli' | 'agustus' | 'september' | 'oktober' | 'november' | 'desember' | 'total';
export type OpdMealRecapParams = { year: number; search?: string; sort_by?: OpdMealRecapSortField; sort_direction?: SimpadaSortDirection; page?: number; per_page?: number };
export type OpdMealRecapApiRow = Record<OpdMealRecapSortField, string | null> & { no: number | string | null };
export type OpdMealRecapResponse = { meta: { report_type: 'rekap-instansi-makan-minum'; source: 'simpada'; year: number; total: number; row_count: number; columns: string[]; pagination: SimpadaPagination }; data: OpdMealRecapApiRow[] };

export type RekapWpSortField = 'number' | 'taxpayer_number' | 'taxpayer_name' | 'address' | 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december' | 'annual_total';
export type RekapWpParams = {
  year: number;
  search?: string;
  sort_by?: RekapWpSortField;
  sort_direction?: SimpadaSortDirection;
  page?: number;
  per_page?: number;
};
export type RekapWpApiRow = {
  number: number | string | null;
  taxpayer_number: string | null;
  taxpayer_name: string | null;
  address: string | null;
  january: string | null;
  february: string | null;
  march: string | null;
  april: string | null;
  may: string | null;
  june: string | null;
  july: string | null;
  august: string | null;
  september: string | null;
  october: string | null;
  november: string | null;
  december: string | null;
  annual_total: string | null;
};
export type RekapWpMeta = {
  report_type?: string;
  source?: string;
  year?: number;
  total: number;
  row_count: number;
  columns?: string[];
  pagination: SimpadaPagination;
};
export type RekapWpResponse = { meta: RekapWpMeta; data: RekapWpApiRow[] };

export function adaptSimpadaPagination(response: SimpadaReportResponse | undefined, fallbackPage: number, fallbackPerPage: number) {
  return {
    page: response?.meta.pagination.current_page ?? fallbackPage,
    perPage: response?.meta.pagination.per_page ?? fallbackPerPage,
    pages: response?.meta.pagination.last_page ?? 1,
    total: response?.meta.total ?? 0,
    rowCount: response?.meta.row_count ?? 0,
  };
}

export function adaptEsptpdPagination(response: EsptpdReportResponse | undefined, fallbackPage: number, fallbackPerPage: number) {
  return {
    page: response?.meta.pagination.current_page ?? fallbackPage,
    perPage: response?.meta.pagination.per_page ?? fallbackPerPage,
    pages: response?.meta.pagination.last_page ?? 1,
    total: response?.meta.total ?? 0,
    rowCount: response?.meta.row_count ?? 0,
  };
}

const display = (value: unknown) => value === null || value === undefined || value === '' ? '-' : String(value);
const formatDate = (value: string | null | undefined) => {
  const parts = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!parts) return '-';
  const [, year, month, day] = parts;
  const date = new Date(`${value}T00:00:00`);
  return date.getFullYear() === Number(year) && date.getMonth() + 1 === Number(month) && date.getDate() === Number(day) ? `${day}-${month}-${year}` : '-';
};
const displayDetails = (details: SimpadaDetails | null | undefined) => {
  if (!details || !Object.keys(details).length) return '-';
  return Object.entries(details).map(([key, value]) => `${key}: ${display(value)}`).join('; ');
};
const dateFields = new Set<keyof SimpadaApiRow>(['assessment_date', 'payment_date', 'due_date']);
const dataFields: (keyof SimpadaApiRow)[] = ['number', 'document_number', 'taxpayer_number', 'taxpayer_name', 'address', 'tax_period', 'assessment_date', 'payment_date', 'due_date', 'penalty_months', 'principal_amount', 'penalty_amount', 'total_amount', 'payment_status', 'kohir', 'payment_code'];

export function adaptSimpadaRows(rows: SimpadaApiRow[], reportType?: SimpadaReportType | null): Row[] {
  return rows.map(row => {
    const adapted: Row = {};
    for (const field of dataFields) adapted[field] = dateFields.has(field) ? formatDate(row[field] as string | null | undefined) : display(row[field]);
    adapted.details = displayDetails(row.details);
    adapted.status = reportType === 'ketetapan' ? '' : display(row.payment_status);
    adapted.statusText = display(row.payment_status);
    adapted.statusCode = display(row.status_code);
    adapted.sourceMatchStatus = display(row.source_match_status);
    adapted.action = 'Detail';
    return adapted;
  });
}

const rekapWpFields: (keyof RekapWpApiRow)[] = ['taxpayer_number', 'taxpayer_name', 'address', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'annual_total'];

export function adaptRekapWpRows(rows: RekapWpApiRow[]): Row[] {
  return rows.map(row => Object.fromEntries(rekapWpFields.map(field => [field, display(row[field])]))) as Row[];
}

export function adaptOpdMealRecapRows(rows: OpdMealRecapApiRow[]): Row[] {
  return rows.map(row => Object.fromEntries((Object.keys(row) as (keyof OpdMealRecapApiRow)[]).filter(field => field !== 'no').map(field => [field, display(row[field])]))) as Row[];
}

export function adaptEsptpdRows(rows: EsptpdApiRow[]): Row[] {
  return rows.map(row => ({
    ...Object.fromEntries(Object.entries(row).map(([field, value]) => [field, display(value)])),
    status: display(row.status_bayar),
    action: 'Detail',
  }));
}

export function adaptOpdMealRecapPagination(response: OpdMealRecapResponse | undefined, fallbackPage: number, fallbackPerPage: number) {
  return {
    page: response?.meta.pagination.current_page ?? fallbackPage,
    perPage: response?.meta.pagination.per_page ?? fallbackPerPage,
    pages: response?.meta.pagination.last_page ?? 1,
    total: response?.meta.total ?? 0,
    rowCount: response?.meta.row_count ?? 0,
  };
}

export function adaptRekapWpPagination(response: RekapWpResponse | undefined, fallbackPage: number, fallbackPerPage: number) {
  return {
    page: response?.meta.pagination.current_page ?? fallbackPage,
    perPage: response?.meta.pagination.per_page ?? fallbackPerPage,
    pages: response?.meta.pagination.last_page ?? 1,
    total: response?.meta.total ?? 0,
    rowCount: response?.meta.row_count ?? 0,
  };
}
