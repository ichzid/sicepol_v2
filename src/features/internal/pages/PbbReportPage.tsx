import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { reportMeta } from '../config/reports';
import type { Column, Notify } from '../types';
import type { PbbFilter, PbbKetetapanItem, PbbPiutangItem, PbbRealisasiItem, PbbReportType, PbbRow } from '../types/pbbReport';
import { exportPbbReport } from '../api/pbbReport';
import { getExportFilename } from '../api/simpada';
import { usePbbReport } from '../hooks/usePbbReport';
import { DataTable, ExportButton, PageHeader, PbbFilterPanel, Tabs, type PbbFilterState } from '../components/Shared';

const ketetapanColumns: Column[] = [
  { key: 'nop', label: 'NOP', width: '18%' },
  { key: 'nama_wp', label: 'Nama Wajib Pajak', width: '22%' },
  { key: 'alamat_objek', label: 'Alamat Objek', width: '24%' },
  { key: 'pokok_pbb', label: 'Ketetapan PBB', money: true, width: '16%' },
  { key: 'tahun', label: 'Tahun', width: '8%' },
  { key: 'wilayah', label: 'Wilayah', width: '12%' },
];

const realisasiColumns: Column[] = [
  { key: 'nop', label: 'NOP', width: '17%' },
  { key: 'nama_wp', label: 'Nama Wajib Pajak', width: '19%' },
  { key: 'alamat_objek', label: 'Alamat Objek', width: '20%' },
  { key: 'pokok_pbb', label: 'Pokok PBB', money: true, width: '12%' },
  { key: 'denda', label: 'Denda', money: true, width: '10%' },
  { key: 'total_bayar', label: 'Total Bayar', money: true, width: '12%' },
  { key: 'tanggal_bayar', label: 'Tanggal Bayar', width: '10%' },
];

const piutangColumns: Column[] = [
  { key: 'nop', label: 'NOP', width: '18%' },
  { key: 'nama_wp', label: 'Nama Wajib Pajak', width: '20%' },
  { key: 'pokok_pbb', label: 'Pokok PBB', money: true, width: '14%' },
  { key: 'denda', label: 'Denda', money: true, width: '12%' },
  { key: 'total_bayar', label: 'Total Piutang', money: true, width: '14%' },
  { key: 'tgl_jatuh_tempo', label: 'Jatuh Tempo', width: '12%' },
  { key: 'wilayah', label: 'Wilayah', width: '10%' },
];

export function PbbReportPage({ notify }: { notify: Notify }) {
  const location = useLocation();
  const meta = reportMeta.pbb;
  const supportedTabs = meta.tabs;

  const requestedTab = new URLSearchParams(location.search).get('tab');
  const activeTab = requestedTab && supportedTabs.includes(requestedTab) ? requestedTab : supportedTabs[0];

  const reportType: PbbReportType =
    activeTab === 'Realisasi' ? 'realisasi' : activeTab === 'Piutang' ? 'piutang' : 'ketetapan';

  const currentYear = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10);
  const firstDayOfYear = `${currentYear}-01-01`;

  const [filterState, setFilterState] = useState<PbbFilterState>({
    tahun: currentYear,
    tgl_awal: firstDayOfYear,
    tgl_akhir: today,
    buku: 9,
  });

  const [exporting, setExporting] = useState(false);

  const apiFilter = useMemo<PbbFilter>(() => {
    if (reportType === 'realisasi') {
      return {
        tgl_awal: filterState.tgl_awal || firstDayOfYear,
        tgl_akhir: filterState.tgl_akhir || today,
        buku: filterState.buku,
        kd_kecamatan: '1221',
        kd_kelurahan: '999',
      };
    }
    return {
      tahun: filterState.tahun,
      buku: filterState.buku,
      kd_kecamatan: '1221',
      kd_kelurahan: '999',
    };
  }, [reportType, filterState, firstDayOfYear, today]);

  const query = usePbbReport(reportType, apiFilter);

  const rows = useMemo<PbbRow[]>(() => {
    if (!query.data?.data) return [];
    if (reportType === 'ketetapan') {
      const items = query.data.data as PbbKetetapanItem[];
      return items.map((item) => ({
        nop: item.nop || '-',
        nama_wp: item.nama_wp || '-',
        alamat_objek: item.alamat_objek || '-',
        pokok_pbb: item.pokok_pbb || 0,
        denda: 0,
        total_bayar: item.pokok_pbb || 0,
        tanggal_bayar: '-',
        tgl_jatuh_tempo: '-',
        luas_tanah: item.luas_tanah || 0,
        luas_bangunan: item.luas_bangunan || 0,
        tahun: item.tahun || filterState.tahun,
        wilayah: `${item.nama_kecamatan || ''} - ${item.nama_kelurahan || ''}`,
      }));
    }
    if (reportType === 'realisasi') {
      const items = query.data.data as PbbRealisasiItem[];
      return items.map((item) => ({
        nop: item.nop || '-',
        nama_wp: item.nama_wp || '-',
        alamat_objek: item.alamat_objek || '-',
        pokok_pbb: item.pokok_pbb || 0,
        denda: item.denda || 0,
        total_bayar: item.pokok_dan_denda || 0,
        tanggal_bayar: item.tanggal_bayar || '-',
        tgl_jatuh_tempo: '-',
        luas_tanah: item.luas_tanah || 0,
        luas_bangunan: item.luas_bangunan || 0,
        tahun: item.tahun || filterState.tahun,
        wilayah: `${item.nama_kecamatan || ''} - ${item.nama_kelurahan || ''}`,
      }));
    }
    const items = query.data.data as PbbPiutangItem[];
    return items.map((item) => ({
      nop: item.nop || '-',
      nama_wp: item.nama_wp || '-',
      alamat_objek: '-',
      pokok_pbb: item.pokok_pbb || 0,
      denda: item.denda || 0,
      total_bayar: item.pokok_dan_denda || 0,
      tanggal_bayar: '-',
      tgl_jatuh_tempo: item.tgl_jatuh_tempo || '-',
      luas_tanah: item.luas_tanah || 0,
      luas_bangunan: item.luas_bangunan || 0,
      tahun: item.tahun || filterState.tahun,
      wilayah: `${item.nama_kecamatan || ''} - ${item.nama_kelurahan || ''}`,
    }));
  }, [query.data, reportType, filterState.tahun]);

  const pageTitle = `Data ${activeTab} PBB-P2`;

  useEffect(() => {
    document.title = `${pageTitle} | SICEPOL`;
  }, [pageTitle]);

  const download = async () => {
    setExporting(true);
    try {
      const response = await exportPbbReport(reportType, apiFilter);
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      const defaultFilename =
        reportType === 'realisasi'
          ? `Laporan_Realisasi_PBB_${filterState.tgl_awal}_sd_${filterState.tgl_akhir}.xlsx`
          : `Laporan_${activeTab}_PBB_${filterState.tahun}.xlsx`;
      link.download = getExportFilename(response.headers['content-disposition'] as string | undefined, defaultFilename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      notify(`Ekspor gagal: ${error instanceof Error ? error.message : 'Terjadi kesalahan sistem.'}`);
    } finally {
      setExporting(false);
    }
  };

  const activeColumns =
    reportType === 'realisasi' ? realisasiColumns : reportType === 'piutang' ? piutangColumns : ketetapanColumns;

  return (
    <>
      <PageHeader
        title={pageTitle}
        description="Monitoring dan laporan Pajak Bumi dan Bangunan (PBB-P2) yang bersumber dari e-PBB."
        action={<ExportButton notify={notify} onClick={download} disabled={exporting} loading={exporting} />}
      />
      <Tabs items={supportedTabs} />
      <PbbFilterPanel
        value={filterState}
        isRealisasi={reportType === 'realisasi'}
        onApply={(next) => setFilterState(next)}
      />
      <DataTable
        columns={activeColumns}
        rows={rows}
        loading={query.isFetching}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </>
  );
}
