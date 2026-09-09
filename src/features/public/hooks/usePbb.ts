import {useQuery} from '@tanstack/react-query'
import {checkPaymentStatus,getPbbDetail,getPbbHistory} from '../api/pbb'
export const usePbbHistory=(nop:string)=>useQuery({queryKey:['pbb','history',nop],queryFn:()=>getPbbHistory(nop),enabled:!!nop})
export const usePbbDetail=(nop:string,year:number)=>useQuery({queryKey:['pbb','detail',nop,year],queryFn:()=>getPbbDetail(nop,year),enabled:!!nop&&!!year})
export const usePaymentStatus=(nop:string,year:number)=>useQuery({queryKey:['pbb','status',nop,year],queryFn:()=>checkPaymentStatus(nop,year),enabled:!!nop&&!!year})
