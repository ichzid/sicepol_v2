import {http} from './http'
import {mockDetail,records} from '../data/mockPbb'
import type {PaymentCheck,PbbDetail,PbbRecord} from '../types/pbb'
const mock=import.meta.env.VITE_USE_MOCK_API==='true'
export async function getPbbHistory(nop:string):Promise<PbbRecord[]>{if(mock)return records;return (await http.get<PbbRecord[]>(`/pbb/${nop}/history`)).data}
export async function getPbbDetail(nop:string,year:number):Promise<PbbDetail>{if(mock){const data=mockDetail(nop,year);if(!data)throw new Error('Data tidak ditemukan');return data}return (await http.get<PbbDetail>(`/pbb/${nop}/${year}`)).data}
export async function checkPaymentStatus(nop:string,year:number):Promise<PaymentCheck>{if(mock)return{status:'pending',checkedAt:new Date().toISOString()};return (await http.get<PaymentCheck>(`/pbb/${nop}/${year}/payment-status`)).data}
