import { Navigate, Route, Routes } from 'react-router-dom';
import type { Notify } from '../types';
import { Dashboard } from '../pages/Dashboard';
import { Exports } from '../pages/Exports';
import { OtherReport } from '../pages/OtherReport';
import { ReportPage } from '../pages/ReportPage';
import { Users } from '../pages/Users';

export function InternalRoutes({ notify }: { notify: Notify }) { return <Routes><Route index element={<Dashboard notify={notify}/>}/><Route path="reports/pbb" element={<ReportPage notify={notify} kind="pbb"/>}/><Route path="reports/bphtb" element={<ReportPage notify={notify} kind="bphtb"/>}/><Route path="reports/taxes/:taxType" element={<ReportPage notify={notify} kind="taxes"/>}/><Route path="reports/retributions" element={<ReportPage notify={notify} kind="retributions"/>}/><Route path="reports/opd-meals" element={<ReportPage notify={notify} kind="opd-meals"/>}/><Route path="reports/potential" element={<OtherReport notify={notify} type="potential"/>}/><Route path="reports/taxpayers" element={<OtherReport notify={notify} type="taxpayers"/>}/><Route path="exports" element={<Exports notify={notify}/>}/><Route path="admin/users" element={<Users notify={notify}/>}/><Route path="*" element={<Navigate to="/internal" replace/>}/></Routes>; }
