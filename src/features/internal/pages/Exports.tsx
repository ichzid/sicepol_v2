import { exportRows } from '../data/mockData';
import type { Notify } from '../types';
import { DataTable, PageHeader, SummaryCards } from '../components/Shared';

export function Exports({ notify }: { notify: Notify }) { return <><PageHeader title="Pusat & Riwayat Ekspor" description="Pantau proses dan unduh kembali laporan yang pernah dibuat." action={<button className="in-btn primary" onClick={()=>notify('Form ekspor baru siap digunakan.')}>＋ Buat Ekspor</button>}/><SummaryCards items={[{label:'Total Ekspor Bulan Ini',value:'48'},{label:'Sedang Diproses',value:'2',tone:'warning'},{label:'Selesai',value:'43',tone:'success'},{label:'Gagal',value:'3'}]}/><DataTable columns={[{key:'report',label:'Nama Laporan'},{key:'periode',label:'Periode'},{key:'requested',label:'Waktu Permintaan'},{key:'user',label:'Pengguna'},{key:'status',label:'Status'},{key:'size',label:'Ukuran'}]} rows={exportRows}/></>; }
