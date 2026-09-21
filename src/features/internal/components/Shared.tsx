import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Column, DashboardFilter, Notify, RevenueType, Row } from '../types';
import { money } from '../utils/format';
import { AppIcon } from './AppIcon';

export function Badge({ children, tone }: { children: ReactNode; tone?: string }) { return <span className={`in-badge ${tone || String(children).toLowerCase().replaceAll(' ', '-')}`}>{children}</span>; }
export function PageHeader({ title, description, meta, context, action }: { title: string; description: string; meta?: string; context?: string; action?: ReactNode }) { return <header className="in-page-header"><div>{context?<div className="in-page-title"><h1>{title}</h1><span>{context}</span></div>:<h1>{title}</h1>}<p>{description}</p>{meta && <small><i/> {meta}</small>}</div>{action}</header>; }
export function SummaryCards({ items }: { items: { label: string; value: string; note?: string; tone?: string }[] }) { return <div className={`in-summary items-${items.length}`}>{items.map(item => <article key={item.label} className={item.tone || ''}><span>{item.label}</span><strong>{item.value}</strong>{item.note && <small>{item.note}</small>}</article>)}</div>; }
export function FilterPanel({ onApply, autoApply=false, value }: { onApply: (filter: DashboardFilter) => void; autoApply?: boolean; value?: DashboardFilter }) { const currentYear=new Date().getFullYear(); const years=Array.from({length:Math.max(1,currentYear-2019)},(_,index)=>String(currentYear-index)); const [year,setYear]=useState(String(value?.year ?? currentYear)); const [type,setType]=useState<RevenueType>(value?.type ?? 'pajak'); useEffect(()=>{if(value){setYear(String(value.year));setType(value.type)}},[value]); const update=(nextYear:string,nextType:RevenueType)=>{setYear(nextYear);setType(nextType);if(autoApply)onApply({year:Number(nextYear),type:nextType})}; const reset=()=>update(String(currentYear),'pajak'); return <section className="in-filter"><div className="in-filter-fields"><label>Tahun Anggaran<select value={year} onChange={e=>update(e.target.value,type)}>{years.map(option=><option key={option}>{option}</option>)}</select></label><label>Jenis Pendapatan<select value={type} onChange={e=>update(year,e.target.value as RevenueType)}><option value="pajak">Pajak Daerah</option><option value="retribusi">Retribusi Daerah</option></select></label></div><div className="in-filter-actions"><button className="in-btn ghost" onClick={reset}>Reset</button>{!autoApply&&<button className="in-btn primary" onClick={()=>onApply({year:Number(year),type})}>Terapkan Filter</button>}</div></section>; }
export type RetributionFilter = { year: number; month?: string; source?: string };
export function RetributionFilterPanel({ onApply, value, sources, yearOnly=false }: { onApply: (filter: RetributionFilter) => void; value: RetributionFilter; sources: { id: string; name: string }[]; yearOnly?: boolean }) { const currentYear=new Date().getFullYear(); const years=Array.from({length:6},(_,index)=>String(currentYear-index)); const [draft,setDraft]=useState(value); useEffect(()=>setDraft(value),[value]); const reset=()=>{const next={year:currentYear};setDraft(next);onApply(next)}; return <section className="in-filter"><div className="in-filter-fields">{!yearOnly&&<label>Jenis Retribusi<select value={draft.source||''} onChange={e=>setDraft({...draft,source:e.target.value||undefined})}><option value="">Semua Jenis Retribusi</option>{sources.map(source=><option key={source.id} value={source.id}>{source.name}</option>)}</select></label>}<label>Tahun Transaksi<select value={draft.year} onChange={e=>setDraft({...draft,year:Number(e.target.value)})}>{years.map(option=><option key={option}>{option}</option>)}</select></label>{!yearOnly&&<label>Bulan Transaksi<select value={draft.month||''} onChange={e=>setDraft({...draft,month:e.target.value||undefined})}><option value="">Semua Bulan</option>{['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((name,index)=><option key={name} value={String(index+1).padStart(2,'0')}>{name}</option>)}</select></label>}</div><div className="in-filter-actions"><button className="in-btn ghost" onClick={reset}>Reset</button><button className="in-btn primary" onClick={()=>onApply(draft)}>Terapkan Filter</button></div></section>; }
export function OpdMealsFilterPanel({ onApply }: { onApply: () => void }) { const currentYear=new Date().getFullYear(); const years=Array.from({length:Math.max(1,currentYear-2019)},(_,index)=>String(currentYear-index)); const [month,setMonth]=useState('Semua Bulan'); const [year,setYear]=useState(String(currentYear)); const reset=()=>{setMonth('Semua Bulan');setYear(String(currentYear))}; return <section className="in-filter"><div className="in-filter-fields"><label>Tahun Transaksi<select value={year} onChange={e=>setYear(e.target.value)}>{years.map(option=><option key={option}>{option}</option>)}</select></label><label>Bulan Transaksi<select value={month} onChange={e=>setMonth(e.target.value)}><option>Semua Bulan</option><option>Januari</option><option>Februari</option><option>Maret</option><option>April</option><option>Mei</option><option>Juni</option><option>Juli</option><option>Agustus</option><option>September</option><option>Oktober</option><option>November</option><option>Desember</option></select></label></div><div className="in-filter-actions"><button className="in-btn ghost" onClick={reset}>Reset</button><button className="in-btn primary" onClick={onApply}>Terapkan Filter</button></div></section>; }
export type SimpadaFilter = { year: number; month?: string };
export function SimpadaFilterPanel({ onApply, value, paymentPeriod=false, transactionPeriod=false, yearOnly=false }: { onApply: (filter: SimpadaFilter) => void; value: SimpadaFilter; paymentPeriod?: boolean; transactionPeriod?: boolean; yearOnly?: boolean }) { const currentYear=new Date().getFullYear(); const years=Array.from({length:6},(_,index)=>String(currentYear-index)); const [year,setYear]=useState(String(value.year)); const [month,setMonth]=useState(value.month || ''); useEffect(()=>{setYear(String(value.year));setMonth(value.month || '')},[value]); const apply=()=>onApply({year:Number(year),...(!yearOnly&&month?{month}:{})}); const reset=()=>{setYear(String(currentYear));setMonth('');onApply({year:currentYear})}; return <section className="in-filter"><div className="in-filter-fields"><label>{paymentPeriod?'Tahun Bayar':transactionPeriod?'Tahun Transaksi':'Tahun Cetak'}<select value={year} onChange={e=>setYear(e.target.value)}>{years.map(option=><option key={option}>{option}</option>)}</select></label>{!yearOnly&&<label>{paymentPeriod?'Bulan Bayar':transactionPeriod?'Bulan Transaksi':'Bulan Cetak'}<select value={month} onChange={e=>setMonth(e.target.value)}><option value="">Semua Bulan</option>{['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'].map((name,index)=><option key={name} value={String(index+1).padStart(2,'0')}>{name}</option>)}</select></label>}</div><div className="in-filter-actions"><button className="in-btn ghost" onClick={reset}>Reset</button><button className="in-btn primary" onClick={apply}>Terapkan Filter</button></div></section>; }

export type PbbFilterState = {
  tahun: number;
  tgl_awal?: string;
  tgl_akhir?: string;
  buku: number;
};
export function PbbFilterPanel({
  onApply,
  value,
  isRealisasi = false,
}: {
  onApply: (filter: PbbFilterState) => void;
  value: PbbFilterState;
  isRealisasi?: boolean;
}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: Math.max(1, currentYear - 1991) }, (_, index) => currentYear - index);
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const reset = () => {
    const today = new Date().toISOString().slice(0, 10);
    const firstDay = `${currentYear}-01-01`;
    const next: PbbFilterState = {
      tahun: currentYear,
      tgl_awal: firstDay,
      tgl_akhir: today,
      buku: 9,
    };
    setDraft(next);
    onApply(next);
  };

  return (
    <section className="in-filter">
      <div className="in-filter-fields">
        {isRealisasi ? (
          <>
            <label>
              Tanggal Awal
              <input
                type="date"
                value={draft.tgl_awal || ''}
                onChange={(e) => setDraft({ ...draft, tgl_awal: e.target.value })}
              />
            </label>
            <label>
              Tanggal Akhir
              <input
                type="date"
                value={draft.tgl_akhir || ''}
                onChange={(e) => setDraft({ ...draft, tgl_akhir: e.target.value })}
              />
            </label>
          </>
        ) : (
          <label>
            Tahun Pajak
            <select
              value={draft.tahun}
              onChange={(e) => setDraft({ ...draft, tahun: Number(e.target.value) })}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          Kategori Buku
          <select
            value={draft.buku}
            onChange={(e) => setDraft({ ...draft, buku: Number(e.target.value) })}
          >
            <option value={9}>Semua Buku</option>
            <option value={7}>Buku 1, 2, 3 (&lt; Rp 2.000.000)</option>
            <option value={8}>Buku 4, 5 (&ge; Rp 2.000.000)</option>
          </select>
        </label>
      </div>
      <div className="in-filter-actions">
        <button className="in-btn ghost" onClick={reset}>
          Reset
        </button>
        <button className="in-btn primary" onClick={() => onApply(draft)}>
          Terapkan Filter
        </button>
      </div>
    </section>
  );
}
export type BphtbFilterState = {
  tahun: number;
};
export function BphtbFilterPanel({
  onApply,
  value,
  minYear = 2025,
  maxYear,
}: {
  onApply: (filter: BphtbFilterState) => void;
  value: BphtbFilterState;
  minYear?: number;
  maxYear?: number;
}) {
  const currentYear = new Date().getFullYear();
  const actualMaxYear = maxYear || currentYear;
  const years = Array.from(
    { length: Math.max(1, actualMaxYear - minYear + 1) },
    (_, index) => actualMaxYear - index
  );
  
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const reset = () => {
    const next: BphtbFilterState = { tahun: currentYear };
    setDraft(next);
    onApply(next);
  };

  return (
    <section className="in-filter">
      <div className="in-filter-fields">
        <label>
          Tahun Pajak
          <select
            value={draft.tahun}
            onChange={(e) => setDraft({ ...draft, tahun: Number(e.target.value) })}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="in-filter-actions">
        <button className="in-btn ghost" onClick={reset}>
          Reset
        </button>
        <button className="in-btn primary" onClick={() => onApply(draft)}>
          Terapkan Filter
        </button>
      </div>
    </section>
  );
}

type ServerTable = { query: string; sort: string | null; direction: 'asc'|'desc' | null; page: number; size: number; total: number; rowCount?: number; pages: number; onQueryChange: (value:string)=>void; onSortChange: (key:string,direction:'asc'|'desc')=>void; onPageChange:(page:number)=>void; onSizeChange:(size:number)=>void; sortableKeys?: string[]; loading?: boolean; error?: string };
type PaginationItem = number | 'start-ellipsis' | 'end-ellipsis';
function paginationItems(current: number, total: number): PaginationItem[] { if(total<=7)return Array.from({length:total},(_,index)=>index+1); const items: PaginationItem[]=[1]; if(current>3)items.push('start-ellipsis'); for(let page=Math.max(2,current-1);page<=Math.min(total-1,current+1);page++)items.push(page); if(current<total-2)items.push('end-ellipsis'); items.push(total); return items; }
export function DataTable({ columns, rows, search=true, pageSizeOptions=[10, 25, 50, 100], initialSort=true, title, pagination=true, server, statusInAction=false, loading=false, skeletonRows=5, wide=false, fit=false }: { columns: Column[]; rows: Row[]; search?: boolean; pageSizeOptions?: number[]; initialSort?: boolean; title?: string; pagination?: boolean; server?: ServerTable; statusInAction?: boolean; loading?: boolean; skeletonRows?: number; wide?: boolean; fit?: boolean }) { const [query,setQuery]=useState(''); const [sort,setSort]=useState(initialSort ? columns[0].key : ''); const [asc,setAsc]=useState(true); const [page,setPage]=useState(1); const [size,setSize]=useState(pageSizeOptions[0]); const filtered=useMemo(()=>{if(server)return rows;const result=rows.filter(r=>Object.values(r).join(' ').toLowerCase().includes(query.toLowerCase())); return sort ? result.sort((a,b)=>String(a[sort]).localeCompare(String(b[sort]),'id',{numeric:true})*(asc?1:-1)) : result},[rows,query,sort,asc,server]); const pages=server?server.pages:Math.max(1,Math.ceil(filtered.length/size)),shown=server?rows:(pagination?filtered.slice((page-1)*size,page*size):filtered); const activePage=server?server.page:page,activeSize=server?server.size:size,activeQuery=server?server.query:query,activeSort=server?server.sort:sort,activeAsc=server?server.direction==='asc':asc,isLoading=Boolean(loading||server?.loading); const order=(key:string)=>{if(server){if(server.sortableKeys&&!server.sortableKeys.includes(key))return;server.onSortChange(key,server.sort===key&&server.direction==='asc'?'desc':'asc')}else if(sort===key)setAsc(!asc);else{setSort(key);setAsc(true)}}; return <section className={`in-table-card${wide?' in-table-card-wide':''}${fit?' in-table-card-fit':''}`} aria-busy={isLoading}>{title&&<header className="in-table-title"><h2>{title}</h2></header>}{search&&<div className="in-table-tools"><label className="in-page-size">Tampilkan<select value={activeSize} disabled={isLoading} onChange={e=>server?server.onSizeChange(Number(e.target.value)):(setSize(Number(e.target.value)),setPage(1))}>{pageSizeOptions.map(option=><option key={option} value={option}>{option}</option>)}</select>data</label><label className="in-search">⌕<input aria-label="Cari data" maxLength={server?200:undefined} value={activeQuery} onChange={e=>server?server.onQueryChange(e.target.value):(setQuery(e.target.value),setPage(1))} placeholder="Cari nomor atau nama..."/></label></div>}{server?.error&&!isLoading?<div className="in-empty"><strong>Gagal memuat data</strong><span>{server.error}</span></div>:<div className="in-table-body"><div className="in-table-scroll"><table className={`in-table ${columns.some(c=>c.width)?'has-column-widths':''}`}><colgroup>{columns.map(c=><col key={c.key} style={c.width?{width:c.width}:undefined}/>)}</colgroup><thead><tr>{columns.map(c=><th key={c.key}><button disabled={isLoading||Boolean(server?.sortableKeys&&!server.sortableKeys.includes(c.key))} onClick={()=>order(c.key)}>{c.label}{activeSort===c.key?(activeAsc?' ↑':' ↓'):''}</button></th>)}</tr></thead><tbody>{isLoading?Array.from({length:Math.max(0,skeletonRows)},(_,rowIndex)=><tr className="in-table-skeleton-row" key={rowIndex}>{columns.map((c,columnIndex)=><td key={c.key} className={c.money?'number':''}><span className="in-skeleton line" style={{width:`${58+((rowIndex+columnIndex)%4)*9}%`}}/></td>)}</tr>):shown.map((row,i)=><tr key={i}>{columns.map(c=><td key={c.key} className={c.money?'number':''}>{c.key==='status'?<Badge>{row[c.key]}</Badge>:c.key==='action'?(statusInAction?(()=>{const status=String(row.status||'-');const statusCode=String(row.statusCode||'');const partial=statusCode?statusCode==='partial':/(sebagian|partial)/i.test(status);const paid=statusCode?statusCode==='paid':/(sudah|lunas|paid)/i.test(status)&&!/(belum|unpaid|not\s*paid)/i.test(status);const tone=partial?'partial':paid?'paid':'unpaid';return <div className="in-action-status"><button className="in-table-action"><AppIcon name="reports"/>{row[c.key] || 'Detail'}</button><span className={`in-action-status-badge ${tone}`}>{!partial&&<AppIcon name={paid?'check':'x'}/>} {status}</span>{row.sourceMatchStatus==='not_found'&&<span className="in-action-status-badge unpaid">Sumber tidak ditemukan</span>}</div>})():<button className="in-table-action"><AppIcon name="reports"/>{row[c.key] || 'Detail'}</button>):c.key==='capaian'?<div className="in-table-progress"><span><i style={{width:`${Math.min(100,Math.max(0,Number(row.capaianValue ?? 0)))}%`}}/></span><b>{row[c.key]}</b></div>:c.money?money(row[c.key]):row[c.key]}</td>)}</tr>)}</tbody></table></div>{!isLoading&&!shown.length&&<div className="in-empty"><b>⌕</b><strong>Data tidak ditemukan</strong><span>Coba ubah kata kunci atau filter yang digunakan.</span></div>}</div>}{pagination&&!isLoading&&!server?.error&&<footer className="in-pagination"><span>Menampilkan {shown.length} dari {server?.total??filtered.length} data</span><nav aria-label="Navigasi halaman tabel"><button className="in-pagination-nav" aria-label="Halaman sebelumnya" disabled={activePage<=1} onClick={()=>server?server.onPageChange(activePage-1):setPage(activePage-1)}><AppIcon name="chevron"/><span>Previous</span></button><div className="in-pagination-pages">{paginationItems(activePage,pages).map(item=>typeof item==='number'?<button key={item} className={item===activePage?'active':''} aria-label={`Halaman ${item}`} aria-current={item===activePage?'page':undefined} onClick={()=>server?server.onPageChange(item):setPage(item)}>{item}</button>:<span className="in-pagination-ellipsis" aria-hidden="true" key={item}>…</span>)}</div><button className="in-pagination-nav" aria-label="Halaman berikutnya" disabled={activePage>=pages} onClick={()=>server?server.onPageChange(activePage+1):setPage(activePage+1)}><span>Next</span><AppIcon name="chevron"/></button></nav></footer>}</section>; }
export function Tabs({ items }: { items: string[] }) { const navigate=useNavigate(); const loc=useLocation(); const selected=new URLSearchParams(loc.search).get('tab')||items[0]; return <div className="in-tabs" role="tablist">{items.map(tab=><button role="tab" aria-selected={selected===tab} className={selected===tab?'active':''} onClick={()=>navigate(`?tab=${encodeURIComponent(tab)}`)} key={tab}>{tab}</button>)}</div>; }
export function ExportButton({ notify, onClick, disabled=false, loading=false }: { notify: Notify; onClick?: () => void; disabled?: boolean; loading?: boolean }) { return <button className="in-btn excel" disabled={disabled} onClick={onClick || (()=>notify('Permintaan ekspor berhasil dibuat dan sedang diproses.'))}><AppIcon name="excel"/> {loading?'Mengunduh...':'Ekspor Excel'}</button>; }
