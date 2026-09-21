import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DashboardFilter, Notify, RevenueType, Row } from '../types';
import { Badge, DataTable, FilterPanel, PageHeader, SummaryCards } from '../components/Shared';
import { useRealisasi, useTrenPenerimaan } from '../hooks/useRealisasi';
import { money } from '../utils/format';

const percent = (value: number) => `${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(value)}%`;

export function Dashboard({ notify }: { notify: Notify }) {
  const currentYear = new Date().getFullYear();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedYear = Number(searchParams.get('tahun'));
  const requestedType = searchParams.get('jenis');
  const filter: DashboardFilter = {
    year: Number.isInteger(requestedYear) && requestedYear >= 2020 && requestedYear <= currentYear ? requestedYear : currentYear,
    type: (requestedType === 'retribusi' ? 'retribusi' : 'pajak') as RevenueType,
  };
  const query = useRealisasi(filter);
  const trendQuery = useTrenPenerimaan(filter);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [showTrendSkeleton, setShowTrendSkeleton] = useState(false);
  useEffect(() => {
    if (!query.isPending) {
      setShowSkeleton(false);
      return;
    }
    const timer = window.setTimeout(() => setShowSkeleton(true), 180);
    return () => window.clearTimeout(timer);
  }, [query.isPending, filter.year, filter.type]);
  useEffect(() => {
    if (!trendQuery.isPending) {
      setShowTrendSkeleton(false);
      return;
    }
    const timer = window.setTimeout(() => setShowTrendSkeleton(true), 180);
    return () => window.clearTimeout(timer);
  }, [trendQuery.isPending, filter.year, filter.type]);
  useEffect(() => {
    if (searchParams.get('tahun') !== String(filter.year) || searchParams.get('jenis') !== filter.type) {
      setSearchParams({ tahun: String(filter.year), jenis: filter.type }, { replace: true });
    }
  }, [filter.year, filter.type, searchParams, setSearchParams]);
  const revenueLabel = filter.type === 'pajak' ? 'Pajak Daerah' : 'Retribusi Daerah';

  const applyFilter = (nextFilter: DashboardFilter) => {
    setSearchParams({ tahun: String(nextFilter.year), jenis: nextFilter.type });
  };

  const taxOrder = ['bumi dan bangunan', 'bphtb', 'makanan dan minuman', 'tenaga listrik', 'perhotelan', 'parkir', 'kesenian dan hiburan', 'reklame', 'air tanah', 'mineral bukan logam', 'sarang burung walet', 'opsen pkb', 'opsen bbnkb'];
  const orderRows = (items: Row[]) => [...items].sort((a,b) => {
    const getRank = (name: string) => { const rank=taxOrder.findIndex(item=>name.toLowerCase().includes(item)); return rank === -1 ? taxOrder.length : rank; };
    return getRank(String(a.jenis))-getRank(String(b.jenis));
  });
  const rows: Row[] = orderRows((query.data?.rincian ?? []).map(item => ({
    jenis: item.jenis_pajak ?? item.jenis_retribusi ?? '-',
    target: item.target,
    realisasi: item.realisasi,
    capaian: percent(item.persentase),
    capaianValue: item.persentase,
    sisaTarget: Math.abs(item.selisih),
  })));
  const colors = ['#19558a', '#198754', '#e0a100', '#7b61a8', '#d96b43', '#008ba3', '#b84a62', '#507b3b', '#8a6428', '#86547c', '#3478b8', '#b45f2a', '#66788a'];
  const composition = rows;
  const compositionSplit = Math.ceil(composition.length/2);
  const compositionColumns = [composition.slice(0,compositionSplit),composition.slice(compositionSplit)];
  const totalRealization = composition.reduce((total,row)=>total+Number(row.realisasi),0);
  let cumulative = 0;
  const donutGradient = composition.map((row,index)=>{
    const start = cumulative;
    cumulative += totalRealization > 0 ? Number(row.realisasi)/totalRealization*100 : 0;
    return `${colors[index]} ${start}% ${cumulative}%`;
  }).join(', ');
  const trend = [...(trendQuery.data?.rincian ?? [])].sort((a,b)=>a.bulan-b.bulan);
  const highestTrend = Math.max(...trend.map(item=>item.realisasi), 0);

  return <>
    <PageHeader title="Dashboard Konsolidasi" description={`Ringkasan kinerja ${revenueLabel.toLowerCase()} tahun anggaran ${filter.year}.`}/>
    <FilterPanel onApply={applyFilter} autoApply value={filter}/>

    {query.isPending ? (showSkeleton ? <div className="in-dashboard-skeleton" role="status" aria-label="Memuat data dashboard">
        <div className="in-summary items-4">{Array.from({length:4},(_,index)=><article key={index}><i className="in-skeleton line label"/><i className="in-skeleton line value"/><i className="in-skeleton line note"/></article>)}</div>
        <div className="in-charts">
          <section className="in-panel"><div className="in-section-head"><div><h2>Komposisi Realisasi</h2><p>Kontribusi menurut jenis {revenueLabel.toLowerCase()}</p></div></div><div className="in-skeleton-composition"><i className="in-skeleton circle"/><div>{Array.from({length:8},(_,index)=><i className="in-skeleton line" key={index}/>)}</div></div></section>
          <section className="in-panel"><div className="in-section-head"><div><h2>Tren Penerimaan</h2><p>Realisasi bulanan {filter.year}</p></div></div><div className="in-skeleton-chart">{[45,68,52,82,61,74,55,88,70].map((height,index)=><i className="in-skeleton" style={{height:`${height}%`}} key={index}/>)}</div></section>
        </div>
        <section className="in-table-card"><header className="in-table-title"><h2>Rincian Per Jenis {revenueLabel}</h2></header><div className="in-skeleton-table"><div className="head">{Array.from({length:5},(_,index)=><i className="in-skeleton line" key={index}/>)}</div>{Array.from({length:7},(_,row)=><div key={row}>{Array.from({length:5},(_,column)=><i className="in-skeleton line" key={column}/>)}</div>)}</div></section>
      </div> : null)
      : query.isError ? <section className="in-panel in-empty" role="alert"><strong>Data realisasi tidak dapat dimuat.</strong><span>Periksa koneksi lalu coba kembali.</span><button className="in-btn primary" onClick={()=>query.refetch()}>Coba Lagi</button></section>
      : query.data && <>
        <SummaryCards items={[
          { label: 'Total Target', value: money(query.data.ringkasan.total_target) },
          { label: 'Total Realisasi', value: money(query.data.ringkasan.total_realisasi), tone: 'success' },
          { label: 'Persentase Capaian', value: percent(query.data.ringkasan.persentase_capaian), note: 'Dari target tahunan' },
          { label: 'Sisa Target', value: money(Math.abs(query.data.ringkasan.selisih_anggaran)), note: `${percent(Math.max(0, 100 - query.data.ringkasan.persentase_capaian))} belum tercapai`, tone: 'warning' },
        ]}/>

        <div className="in-charts">
          <section className="in-panel"><div className="in-section-head"><div><h2>Komposisi Realisasi</h2><p>Kontribusi menurut jenis {revenueLabel.toLowerCase()}</p></div><Badge>Data Terbaru</Badge></div><div className="in-composition"><div className="in-donut" style={{background:totalRealization > 0 ? `conic-gradient(${donutGradient})` : '#edf1f5'}}><div><strong>{percent(100)}</strong><span>Total realisasi</span></div></div><div className="in-composition-list">{compositionColumns.map((column,columnIndex)=><div className="in-composition-column" key={columnIndex}>{column.map((row,rowIndex)=>{const colorIndex=columnIndex*compositionSplit+rowIndex; return <div key={row.jenis}><i style={{background:colors[colorIndex]}}/><span title={String(row.jenis)}>{row.jenis}</span><b>{totalRealization > 0 ? percent(Number(row.realisasi)/totalRealization*100) : percent(0)}</b></div>})}</div>)}</div></div></section>
          <section className="in-panel"><div className="in-section-head"><div><h2>Tren Penerimaan</h2><p>Realisasi bulanan {filter.year}</p></div></div>{trendQuery.isPending ? (showTrendSkeleton ? <div className="in-skeleton-chart">{[45,68,52,82,61,74,55,88,70,48,62,56].map((height,index)=><i className="in-skeleton" style={{height:`${height}%`}} key={index}/>)}</div> : <div className="trend-chart"/>) : trendQuery.isError ? <div className="in-chart-error"><span>Tren penerimaan tidak dapat dimuat.</span><button onClick={()=>trendQuery.refetch()}>Coba Lagi</button></div> : <div className="trend-chart"><div className="trend-line">{trend.map(item=><i key={item.bulan} title={`${item.nama_bulan}: ${money(item.realisasi)}`} style={{height:`${item.realisasi > 0 && highestTrend > 0 ? Math.max(2,item.realisasi/highestTrend*100) : 0}%`}}><span>{item.nama_bulan.slice(0,3)}</span></i>)}</div></div>}</section>
        </div>

        <DataTable columns={[
          {key:'jenis',label:'Jenis Pendapatan',width:'32%'},
          {key:'target',label:'Target',money:true,width:'17%'},
          {key:'realisasi',label:'Realisasi',money:true,width:'17%'},
          {key:'capaian',label:'Capaian',width:'17%'},
          {key:'sisaTarget',label:'Sisa Target',money:true,width:'17%'},
        ]} rows={rows} initialSort={false} search={false} pagination={false} title={`Rincian Per Jenis ${revenueLabel}`}/>
      </>}
  </>;
}
