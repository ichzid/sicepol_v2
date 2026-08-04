export type PaymentStatus = 'Lunas' | 'Belum'
export interface PbbRecord { year:number; taxpayerName:string; dueDate:string; penaltyInfo:string; principal:number; penalty:number; total:number; paid:number; paidDate:string; status:PaymentStatus }
export interface PbbDetail extends PbbRecord { nop:string; objectAddress:string; taxpayerAddress:string; npwp:string; earthArea:number; buildingArea:number; earthRate:number; buildingRate:number; earthNjop:number; buildingNjop:number; totalNjop:number; njoptkp:number; taxableNjop:number; taxRate:number }
export interface PaymentCheck { status:'pending'|'paid'; checkedAt:string }
export type PaymentMethodSlug='virtual-account'|'qris'|'teller-bank-sumut'|'dana'|'ovo'|'gopay'|'kantor-pos'|'indomaret'|'alfamart'
export interface PaymentMethod { slug:PaymentMethodSlug; label:string; logo:string; description:string; group:string; codeLabel?:string; code?:(nop:string,year:number)=>string; qr?:boolean; steps:string[] }
