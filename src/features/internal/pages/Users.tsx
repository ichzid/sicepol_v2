import { userRows } from '../data/mockData';
import type { Notify } from '../types';
import { DataTable, PageHeader, SummaryCards } from '../components/Shared';

export function Users({ notify }: { notify: Notify }) { return <><PageHeader title="Pengguna & Hak Akses" description="Kelola akun, peran, periode akses, dan kewenangan pengguna internal." action={<button className="in-btn primary" onClick={()=>notify('Form tambah pengguna dibuka (simulasi).')}>＋ Tambah Pengguna</button>}/><SummaryCards items={[{label:'Total Pengguna',value:'28'},{label:'Administrator',value:'3'},{label:'Operator',value:'14'},{label:'Pemeriksa BPK',value:'6'}]}/><DataTable columns={[{key:'name',label:'Nama'},{key:'email',label:'Email'},{key:'role',label:'Peran'},{key:'access',label:'Akses'},{key:'expires',label:'Berlaku Hingga'},{key:'status',label:'Status'}]} rows={userRows}/></>; }
