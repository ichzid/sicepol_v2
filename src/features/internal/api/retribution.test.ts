import AxiosMockAdapter from 'axios-mock-adapter';
import { afterEach, describe, expect, it } from 'vitest';
import { simpadaApi } from './simpada';
import { exportRetributionRecap, exportRetributionReport, getRetributionRecap, getRetributionReport, getRetributionSources } from './retribution';

const mock=new AxiosMockAdapter(simpadaApi); const response={meta:{total:0,row_count:0,columns:[],pagination:{current_page:1,per_page:10,last_page:1}},data:[]};
afterEach(()=>mock.reset());
describe('API laporan Retribusi',()=>{
  it('mengambil sources dari endpoint dinamis',async()=>{mock.onGet('/v1/reports/retribusi/sources').reply(200,{data:[{id:'015',name:'Pariwisata',opd_id:'04'}],meta:{total:1}});expect((await getRetributionSources()).data[0].id).toBe('015')});
  it('mengirim parameter monitoring dengan leading zero tanpa mode atau OPD',async()=>{mock.onGet('/v1/reports/retribusi/monitoring').reply(config=>{expect(config.params).toEqual({year:2026,month:'09',source:'015',page:1,per_page:10});for(const field of ['mode','opd_id','id_opd','id_user','akses','search','sort_by','sort_direction'])expect(config.params).not.toHaveProperty(field);return[200,response]});await getRetributionReport({year:2026,month:'09',source:'015',search:'',page:1,per_page:10})});
  it('ekspor monitoring membawa filter/search/sort tanpa pagination',async()=>{mock.onGet('/v1/reports/retribusi/monitoring/export').reply(config=>{expect(config.params).toEqual({year:2026,month:'01',source:'7',search:'pasar',sort_by:'payment_status',sort_direction:'asc'});return[200,new Blob()]});await exportRetributionReport({year:2026,month:'01',source:'7',search:'pasar',sort_by:'payment_status',sort_direction:'asc',page:3,per_page:25})});
  it('rekap OPD hanya mengirim kontrak rekap dan ekspornya tanpa pagination',async()=>{const params={year:2026,search:'dinas',sort_by:'annual_total' as const,sort_direction:'desc' as const,page:2,per_page:10};mock.onGet('/v1/reports/retribusi/rekap-opd').reply(config=>{expect(config.params).toEqual(params);for(const field of ['month','source','opd_id','mode'])expect(config.params).not.toHaveProperty(field);return[200,response]});mock.onGet('/v1/reports/retribusi/rekap-opd/export').reply(config=>{expect(config.params).toEqual({year:2026,search:'dinas',sort_by:'annual_total',sort_direction:'desc'});return[200,new Blob()]});await getRetributionRecap(params);await exportRetributionRecap(params)});
});
