import type { Row } from './index';
import type { SimpadaPagination, SimpadaSortDirection } from './simpada';

export type RetributionSource = { id: string; name: string; opd_id: string };
export type RetributionSourcesResponse = { data: RetributionSource[]; meta: { total: number } };
export type RetributionSortField = 'transaction_date' | 'taxpayer_number' | 'document_number' | 'opd_id' | 'opd_name' | 'tax_period' | 'assessment_amount' | 'payment_amount' | 'payment_date' | 'payment_status' | 'status_code' | 'retribution_type_id' | 'retribution_type_name';
export type RetributionReportParams = { year: number; month?: string; source?: string; search?: string; sort_by?: RetributionSortField; sort_direction?: SimpadaSortDirection; page?: number; per_page?: number };
export type RetributionApiRow = {
  number?: number | string | null;
  source_record_id?: string | null;
  transaction_date: string | null;
  taxpayer_number: string | null;
  document_number: string | null;
  opd_id: string | null;
  opd_name: string | null;
  tax_period: string | null;
  assessment_amount: string | null;
  payment_amount: string | null;
  payment_date: string | null;
  payment_status: string | null;
  status_code: string | null;
  payment_match_status?: string | null;
  retribution_type_id: string | null;
  retribution_type_name: string | null;
};
export type RetributionReportResponse = { meta: { total: number; row_count: number; columns: string[]; pagination: SimpadaPagination }; data: RetributionApiRow[] };

export type RetributionRecapSortField = 'opd_id' | 'opd_name' | 'january' | 'february' | 'march' | 'april' | 'may' | 'june' | 'july' | 'august' | 'september' | 'october' | 'november' | 'december' | 'annual_total';
export type RetributionRecapParams = { year: number; search?: string; sort_by?: RetributionRecapSortField; sort_direction?: SimpadaSortDirection; page?: number; per_page?: number };
export type RetributionRecapRow = Record<RetributionRecapSortField, string | null> & { number?: number | string | null };
export type RetributionRecapResponse = { meta: { total: number; row_count: number; columns: string[]; pagination: SimpadaPagination }; data: RetributionRecapRow[] };

const display = (value: unknown) => value === null || value === undefined || value === '' ? '-' : String(value);
const formatDate = (value: string | null | undefined) => {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : display(value);
};
const monitoringFields: RetributionSortField[] = ['transaction_date','taxpayer_number','document_number','opd_id','opd_name','tax_period','assessment_amount','payment_amount','payment_date','payment_status','status_code','retribution_type_id','retribution_type_name'];
export function adaptRetributionRows(rows: RetributionApiRow[]): Row[] {
  return rows.map(row => Object.fromEntries(monitoringFields.map(field => [field, field === 'transaction_date' || field === 'payment_date' ? formatDate(row[field]) : display(row[field])]))) as Row[];
}
const recapFields: RetributionRecapSortField[] = ['opd_id','opd_name','january','february','march','april','may','june','july','august','september','october','november','december','annual_total'];
export function adaptRetributionRecapRows(rows: RetributionRecapRow[]): Row[] { return rows.map(row => Object.fromEntries(recapFields.map(field => [field, display(row[field])]))) as Row[]; }
export function adaptRetributionPagination(response: RetributionReportResponse | RetributionRecapResponse | undefined, page: number, perPage: number) { return { page: response?.meta.pagination.current_page ?? page, perPage: response?.meta.pagination.per_page ?? perPage, pages: response?.meta.pagination.last_page ?? 1, total: response?.meta.total ?? 0, rowCount: response?.meta.row_count ?? 0 }; }
