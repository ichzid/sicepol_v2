import type {SVGProps} from 'react'

type IconProps = SVGProps<SVGSVGElement>
const Base=({children,...props}:IconProps)=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
export const SearchIcon=(p:IconProps)=><Base {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></Base>
export const CalendarIcon=(p:IconProps)=><Base {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></Base>
export const ShieldCheckIcon=(p:IconProps)=><Base {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></Base>
export const ClockIcon=(p:IconProps)=><Base {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Base>
export const WalletIcon=(p:IconProps)=><Base {...p}><path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12"/><path d="M16 11h4v4h-4a2 2 0 0 1 0-4Z"/></Base>
export const BuildingIcon=(p:IconProps)=><Base {...p}><path d="M4 21V5l8-3 8 3v16M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1M2 21h20"/></Base>
export const UserIcon=(p:IconProps)=><Base {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Base>
export const CalculatorIcon=(p:IconProps)=><Base {...p}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8v4H8zM8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></Base>
export const ReceiptIcon=(p:IconProps)=><Base {...p}><path d="M6 3h12v19l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h4"/></Base>
export const DownloadIcon=(p:IconProps)=><Base {...p}><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 20h16"/></Base>
export const ArrowLeftIcon=(p:IconProps)=><Base {...p}><path d="m15 18-6-6 6-6"/></Base>
export const InfoIcon=(p:IconProps)=><Base {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></Base>
export const AnnouncementIcon=(p:IconProps)=><Base {...p}><path d="m3 11 15-6v14L3 13v-2Z"/><path d="m7 14 2 6h4l-2-5M21 9v6"/></Base>
export const CopyIcon=(p:IconProps)=><Base {...p}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></Base>
export const CheckIcon=(p:IconProps)=><Base {...p}><path d="m5 12 4 4L19 6"/></Base>
export const ChevronRightIcon=(p:IconProps)=><Base {...p}><path d="m9 18 6-6-6-6"/></Base>
