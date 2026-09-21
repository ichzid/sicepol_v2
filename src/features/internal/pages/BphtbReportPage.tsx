import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { reportMeta } from '../config/reports';
import type { Column, Notify } from '../types';
import type { BphtbReportType, BphtbRow } from '../types/bphtbReport';
import { useBphtbReport } from '../hooks/useBphtbReport';
import { BphtbFilterPanel, DataTable, ExportButton, PageHeader, Tabs, type BphtbFilterState } from '../components/Shared';

export function BphtbReportPage({ notify }: { notify: Notify }) {
  const location = useLocation();
  const meta = reportMeta.bphtb;
  const supportedTabs = meta.tabs;

  const requestedTab = new URLSearchParams(location.search).get('tab');
  const activeTab = requestedTab && supportedTabs.includes(requestedTab) ? requestedTab : supportedTabs[0];

  const reportType: BphtbReportType = activeTab === 'Realisasi' ? 'realisasi' : 'ketetapan';

  const columns = useMemo<Column[]>(
    () => [
      { key: 'nomor_dokumen', label: 'No Dokumen', width: '13%' },
      { key: 'nop', label: 'NOP', width: '15%' },
      { key: 'nama_wp', label: 'Nama Wajib Pajak', width: '16%' },
      { key: 'notaris', label: 'Notaris', width: '16%' },
      { key: 'njop_pbb', label: 'NJOP', money: true, width: '10%' },
      { key: 'setoran', label: 'Nilai BPHTB', money: true, width: '10%' },
      reportType === 'realisasi'
        ? { key: 'tanggal_bayar', label: 'Tanggal Bayar', width: '10%' }
        : { key: 'tanggal_validasi', label: 'Tgl Validasi', width: '10%' },
      { key: 'status_bayar', label: 'Status', width: '10%' },
    ],
    [reportType]
  );

  const currentYear = new Date().getFullYear();
  const [filterState, setFilterState] = useState<BphtbFilterState>({ tahun: currentYear });
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState('');

  // Sesuai dokumentasi: Mengirim tahun, page, dan per_page ke API
  const query = useBphtbReport({
    tahun: filterState.tahun,
    page,
    per_page: perPage,
  });

  const apiReport = query.data?.laporan[reportType];
  const items = apiReport?.data || [];
  const pagination = apiReport?.pagination;

  // Filter pencarian client-side terhadap data halaman yang sedang aktif
  const filteredItems = useMemo(() => {
    if (!search) return items;
    const lowerSearch = search.toLowerCase();
    return items.filter(item => 
      (item.nop?.toLowerCase().includes(lowerSearch) || false) ||
      (item.nama_wp?.toLowerCase().includes(lowerSearch) || false) ||
      (item.nomor_dokumen?.toLowerCase().includes(lowerSearch) || false) ||
      (item.notaris?.toLowerCase().includes(lowerSearch) || false)
    );
  }, [items, search]);

  const rows = useMemo<BphtbRow[]>(() => {
    return filteredItems.map((item) => ({
      nomor_dokumen: item.nomor_dokumen || '-',
      nop: item.nop || '-',
      nama_wp: item.nama_wp || '-',
      notaris: item.notaris || '-',
      luas_tanah: item.luas_tanah || 0,
      luas_bangunan: item.luas_bangunan || 0,
      njop_pbb: item.njop_pbb || 0,
      setoran: item.setoran || 0,
      tanggal_validasi: item.tanggal_validasi || '-',
      tanggal_bayar: item.tanggal_bayar || '-',
      status_bayar: item.status_bayar === 'sudah_bayar' ? 'Lunas' : item.status_bayar === 'belum_bayar' ? 'Belum Bayar' : (item.status_bayar || '-'),
    }));
  }, [filteredItems]);

  const pageTitle = `Data ${activeTab} BPHTB`;

  useEffect(() => {
    document.title = `${pageTitle} | SICEPOL`;
  }, [pageTitle]);

  // Sesuai dokumen: Validasi rentang tahun dari respon API
  const minYear = query.data?.validation?.tahun_minimum || 2025;
  const maxYear = query.data?.validation?.tahun_maksimum || currentYear;

  const handleExport = () => {
    notify('Dokumentasi API belum menyediakan format download file excel.');
  };

  const total = pagination?.total ?? filteredItems.length;
  const totalPages = pagination?.total_pages ?? Math.max(1, Math.ceil(total / perPage));

  const serverTable = {
    query: search,
    sort: null,
    direction: null,
    page,
    size: perPage,
    total,
    pages: totalPages,
    loading: query.isFetching,
    onQueryChange: (v: string) => { setSearch(v); },
    onSortChange: () => {},
    onPageChange: (newPage: number) => { setPage(newPage); },
    onSizeChange: (newSize: number) => { setPerPage(newSize); setPage(1); },
  };

  return (
    <>
      <PageHeader
        title={pageTitle}
        description={meta.description}
        action={<ExportButton notify={notify} onClick={handleExport} />}
      />
      <Tabs items={supportedTabs} />
      <BphtbFilterPanel
        value={filterState}
        minYear={minYear}
        maxYear={maxYear}
        onApply={(next) => { setFilterState(next); setPage(1); }}
      />
      <DataTable
        columns={columns}
        rows={rows}
        server={serverTable}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </>
  );
}
