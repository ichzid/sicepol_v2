import type {PaymentMethod,PbbDetail,PbbRecord} from '../types/pbb'
import bankSumut from '../../../../channels/banksumut.png'
import qris from '../../../../channels/qris.svg'
import dana from '../../../../channels/dana.svg'
import ovo from '../../../../channels/ovo.svg'
import gopay from '../../../../channels/gopay.svg'
import pos from '../../../../channels/pos.png'
import indomaret from '../../../../channels/indomaret.png'
import alfamart from '../../../../channels/alfamart.png'
const paidDates=['05/09/2024','21/07/2023','15/09/2022','10/09/2021','24/08/2020','17/09/2019','03/09/2018','28/08/2017','12/09/2016','07/09/2015']
export const records:PbbRecord[]=Array.from({length:12},(_,i)=>{const year=2026-i,unpaid=year>=2025,penalty=year===2025?45500:0;return{year,taxpayerName:'Budi Santoso',dueDate:`30/09/${year}`,penaltyInfo:year===2025?'10 bulan (20%)':'0 bulan (0%)',principal:227500,penalty,total:227500+penalty,paid:unpaid?0:227500,paidDate:unpaid?'-':paidDates[2024-year],status:unpaid?'Belum':'Lunas'}})
export function mockDetail(nop:string,year:number):PbbDetail|undefined{const record=records.find(x=>x.year===year);if(!record)return;return{...record,nop,objectAddress:'Desa Perkebunan Lima Puluh, Kabupaten Batu Bara',taxpayerAddress:'Jl. Merdeka No. 10, Lima Puluh',npwp:'12.345.678.9-***.***',earthArea:240,buildingArea:96,earthRate:500000,buildingRate:750000,earthNjop:120000000,buildingNjop:72000000,totalNjop:192000000,njoptkp:10000000,taxableNjop:182000000,taxRate:.00125}}
const wallet=['Buka aplikasi dompet digital yang dipilih.','Pilih layanan pembayaran tagihan atau merchant yang tersedia.','Masukkan kode pembayaran apabila diminta.','Periksa kesesuaian nominal tagihan.','Konfirmasi pembayaran pada aplikasi.'],outlet=['Kunjungi loket atau kasir gerai yang dipilih.','Sampaikan bahwa Anda akan melakukan pembayaran PBB.','Tunjukkan kode pembayaran yang tertera.','Periksa kesesuaian nominal sebelum membayar.','Simpan struk sebagai bukti pembayaran.']
const channelLogos={dana,ovo,gopay}
export const methods:PaymentMethod[]=[
{slug:'virtual-account',label:'Transfer Virtual Account',logo:bankSumut,description:'Transfer dari berbagai bank ke Virtual Account Bank Sumut.',group:'Transfer Virtual Account',codeLabel:'Nomor Virtual Account',code:n=>`8888${n}`,steps:['Buka mobile banking atau internet banking.','Pilih transfer antarbank atau Virtual Account.','Pilih Bank Sumut.','Masukkan nomor Virtual Account yang tertera.','Periksa nominal lalu konfirmasi pembayaran.']},
{slug:'qris',label:'QRIS',logo:qris,description:'Bayar dari aplikasi yang mendukung QRIS.',group:'QRIS',qr:true,steps:['Buka aplikasi pembayaran yang mendukung QRIS.','Pilih fitur pemindaian QR.','Pindai kode setelah tersedia.','Periksa penerima dan nominal.','Konfirmasi pembayaran.']},
{slug:'teller-bank-sumut',label:'Teller Bank Sumut',logo:bankSumut,description:'Pembayaran langsung melalui teller Bank Sumut.',group:'Teller Bank Sumut',codeLabel:'Kode Pembayaran',code:(n,y)=>`STS-${y}-${n.slice(-6)}`,steps:outlet},
...(['dana','ovo','gopay'] as const).map(slug=>({slug,label:slug==='gopay'?'GoPay':slug.toUpperCase(),logo:channelLogos[slug],description:`Pembayaran melalui ${slug==='gopay'?'GoPay':slug.toUpperCase()}.`,group:'E-Wallet & Gerai Pembayaran',codeLabel:'Kode Pembayaran',code:(n:string,y:number)=>`${slug.toUpperCase()}-${y}-${n.slice(-8)}`,steps:wallet})),
...([{slug:'kantor-pos',label:'Kantor Pos',logo:pos},{slug:'indomaret',label:'Indomaret',logo:indomaret},{slug:'alfamart',label:'Alfamart',logo:alfamart}] as const).map(x=>({...x,description:`Pembayaran melalui ${x.label}.`,group:'E-Wallet & Gerai Pembayaran',codeLabel:'Kode Pembayaran',code:(n:string,y:number)=>`PBB-${y}-${n.slice(-8)}`,steps:outlet}))]
export const findMethod=(slug:string|null)=>methods.find(x=>x.slug===slug)
