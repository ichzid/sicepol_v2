import type { ReactNode } from 'react';

const iconPaths: Record<string, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  reports: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/></>,
  pbb: <><path d="M3 11 12 3l9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  bphtb: <><path d="M3 10h18M5 10V7l7-4 7 4v3M6 10v8M10 10v8M14 10v8M18 10v8M3 21h18"/></>,
  tax: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h4"/></>,
  retribution: <><path d="M4 7h16M6 3h12l2 4H4zM6 7v13M18 7v13M3 21h18"/><path d="M9 11h6M9 15h6"/></>,
  opd: <><path d="M4 21V8l8-5 8 5v13M8 21v-6h8v6M8 10h.01M12 10h.01M16 10h.01"/></>,
  potential: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/><path d="m4 7 6-5 6 7 6-5"/></>,
  taxpayer: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M17 8h5M19.5 5.5v5"/></>,
  export: <><path d="M12 3v12M7 10l5 5 5-5M4 21h16"/></>,
  excel: <><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 12l6 6M15 12l-6 6"/></>,
  source: <><path d="M20 7h-7V3M4 17h7v4"/><path d="M20 7a9 9 0 0 0-15-2M4 17a9 9 0 0 0 15 2"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  audit: <><path d="M9 3h6l1 2h4v16H4V5h4z"/><path d="M8 11h8M8 15h8M8 19h5"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>, chevronDown: <path d="m6 9 6 6 6-6"/>,
  profile: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h5a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  x: <path d="M6 6l12 12M18 6 6 18"/>,
};

export function AppIcon({ name }: { name: string }) {
  return <svg className="in-app-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name] || iconPaths.reports}</svg>;
}
