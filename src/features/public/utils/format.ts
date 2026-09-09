export const nopDigits=(value:string)=>value.replace(/\D/g,'').slice(0,18)
export const isValidNop=(value:string)=>/^\d{18}$/.test(value)
export function formatNop(value:string){const digits=nopDigits(value),sizes=[2,2,3,3,3,4,1];let at=0;return sizes.map(size=>{const part=digits.slice(at,at+size);at+=size;return part}).filter(Boolean).map((part,i)=>`${i===6?'-':i?'.':''}${part}`).join('')}
export const rupiah=(value:number)=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value)
export const validYear=(value:string|undefined)=>!!value&&/^20(1[5-9]|2[0-6])$/.test(value)
