import { useEffect } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { localTaxMenus } from '../config/navigation';
import { reportMeta } from '../config/reports';
import { opdMealRows, reportRows, retributionRows, simpadaRows } from '../data/mockData';
import type { Notify } from '../types';
import { DataTable, ExportButton, FilterPanel, OpdMealsFilterPanel, PageHeader, RetributionFilterPanel, SimpadaFilterPanel, Tabs } from '../components/Shared';

const opdMealColumns = [
  { key: 'inputDate', label: 'Tanggal Transaksi', width: '12%' },
  { key: 'npwpd', label: 'No NPWPD', width: '14%' },
  { key: 'sptpd', label: 'No SPTPD', width: '15%' },
  { key: 'taxPeriod', label: 'Masa Pajak', width: '12%' },
  { key: 'opd', label: 'Nama OPD', width: '21%' },
  { key: 'taxAmount', label: 'Nilai Pajak', money: true, width: '12%' },
  { key: 'status', label: 'Status Bayar', width: '9%' },
  { key: 'action', label: 'Action', width: '7%' },
];

const retributionColumns = [
  { key: 'transactionDate', label: 'Tanggal Transaksi', width: '12%' },
  { key: 'npwrd', label: 'No NPWRD', width: '12%' },
  { key: 'formNumber', label: 'No Form', width: '14%' },
  { key: 'period', label: 'Masa Retribusi', width: '11%' },
  { key: 'opd', label: 'Nama OPD', width: '17%' },
  { key: 'type', label: 'Jenis Retribusi', width: '18%' },
  { key: 'amount', label: 'Jumlah Bayar', money: true, width: '10%' },
  { key: 'status', label: 'Status Bayar', width: '9%' },
  { key: 'action', label: 'Aksi', width: '7%' },
];

const simpadaColumns = [
  { key: 'tanggalCetak', label: 'Tanggal Cetak', width: '10%' },
  { key: 'npwpd', label: 'No NPWPD', width: '14%' },
  { key: 'sptpd', label: 'No SPTPD', width: '13%' },
  { key: 'masaPajak', label: 'Masa Pajak', width: '10%' },
  { key: 'namaObjek', label: 'Nama Objek', width: '14%' },
  { key: 'alamatObjek', label: 'Alamat Objek', width: '20%' },
  { key: 'nilaiPajak', label: 'Nilai Pajak', money: true, width: '11%' },
  { key: 'status', label: 'Status Bayar', width: '8%' },
  { key: 'action', label: 'Action', width: '7%' },
];

export function ReportPage({ notify, kind: fixedKind }: { notify: Notify; kind?: string }) {
  const { taxType } = useParams();
  const location = useLocation();
  const kind = taxType ? 'taxes' : fixedKind || 'pbb';
  const meta = reportMeta[kind] || reportMeta.pbb;
  const selectedTax = localTaxMenus.find(([slug]) => slug === taxType);
  const requestedTab = new URLSearchParams(location.search).get('tab');
  const activeTab = requestedTab && meta.tabs.includes(requestedTab) ? requestedTab : meta.tabs[0];
  const isSimpada = kind === 'taxes' && selectedTax;
  const reportName = isSimpada ? selectedTax[1] : meta.title.replace(/^Laporan\s+/, '');
  const pageTitle = `Data ${activeTab} ${reportName}`;
  const browserTitle = `${pageTitle} | SICEPOL`;
  const description = isSimpada
    ? `Monitoring dan laporan ${selectedTax[1]} yang bersumber dari aplikasi e-Simpada.`
    : meta.description;

  useEffect(() => {
    document.title = browserTitle;
  }, [browserTitle]);

  if (taxType && !selectedTax) return <Navigate to="/internal" replace />;

  return <>
    <PageHeader title={pageTitle} description={description} action={<ExportButton notify={notify} />} />
    <Tabs items={meta.tabs} />
    {isSimpada
      ? <SimpadaFilterPanel onApply={() => notify('Filter laporan berhasil diterapkan.')} />
      : kind === 'retributions'
        ? <RetributionFilterPanel onApply={() => notify('Filter laporan berhasil diterapkan.')} />
        : kind === 'opd-meals'
          ? <OpdMealsFilterPanel onApply={() => notify('Filter laporan berhasil diterapkan.')} />
          : <FilterPanel onApply={() => notify('Filter laporan berhasil diterapkan.')} />}
    {isSimpada
      ? <DataTable columns={simpadaColumns} rows={simpadaRows} />
      : kind === 'retributions'
        ? <DataTable columns={retributionColumns} rows={retributionRows} />
        : kind === 'opd-meals'
          ? <DataTable columns={opdMealColumns} rows={opdMealRows} />
          : <DataTable columns={[{key:'nomor',label:kind==='bphtb'?'Nomor Transaksi':'NOP / NPWPD'},{key:'nama',label:'Wajib Pajak'},{key:'wilayah',label:'Wilayah'},{key:'tanggal',label:'Tanggal'},{key:'ketetapan',label:'Ketetapan',money:true},{key:'pembayaran',label:'Pembayaran',money:true},{key:'status',label:'Status'},{key:'action',label:'Action'}]} rows={reportRows} />}
  </>;
}
