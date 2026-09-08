import {useState} from 'react';
import {Navigate,useNavigate,useParams} from 'react-router-dom';
import {AppHeader} from '../components/AppHeader';
import {BillingCard} from '../components/BillingCard';
import {Loading} from '../components/States';
import {methods} from '../data/mockPbb';
import {usePbbDetail} from '../hooks/usePbb';
import type {PaymentMethodSlug} from '../types/pbb';
import {formatNop,isValidNop,validYear} from '../utils/format';

const groups=['Transfer Virtual Account','QRIS','Teller Bank Sumut','E-Wallet & Gerai Pembayaran'];

export default function PaymentMethodPage(){
  const {nop='',year}=useParams();
  const [selected,setSelected]=useState<PaymentMethodSlug>('virtual-account');
  const nav=useNavigate();
  if(!isValidNop(nop))return <Navigate to="/"/>;
  if(!validYear(year))return <Navigate to={`/pbb/${nop}/history`}/>;
  const q=usePbbDetail(nop,+year!);
  if(q.data?.status==='Lunas')return <Navigate to={`/pbb/${nop}/${year}`}/>;
  const selectedMethod=methods.find(method=>method.slug===selected);

  return <div className="payment-method-page">
    <AppHeader backTo={`/pbb/${nop}/${year}`} backLabel="Kembali ke Detail"/>
    <main>
      <section className="container intro" aria-labelledby="payment-method-title">
        <span className="eyebrow">Pembayaran PBB</span>
        <h1 id="payment-method-title">Pilih Metode Pembayaran</h1>
        <p className="lead">Pilih metode pembayaran untuk tagihan tahun pajak <strong>{year}</strong> dengan NOP <strong>{formatNop(nop)}</strong>.</p>
      </section>
      {q.isLoading?<Loading/>:<section className="container payment-method-layout" aria-label="Metode dan informasi pembayaran">
        <article className="payment-method-card">
          <h2 className="payment-method-card-title">Metode Pembayaran</h2>
          <p className="payment-method-card-subtitle">Pilih salah satu metode yang ingin digunakan untuk melanjutkan proses pembayaran.</p>
          <form onSubmit={event=>{event.preventDefault();nav(`/pbb/${nop}/${year}/payment-instruction?method=${selected}`)}}>
            {groups.map(group=><fieldset className={`payment-method-group${group.startsWith('E-')?' payment-method-group-grid':''}`} key={group}>
              <legend>{group}</legend>
              <div className="payment-method-list">
                {methods.filter(method=>method.group===group).map(method=><label className={`payment-method-option${selected===method.slug?' selected':''}`} key={method.slug}>
                  <input type="radio" name="payment-method" value={method.slug} checked={selected===method.slug} onChange={()=>setSelected(method.slug)}/>
                  <span className="payment-method-icon" aria-hidden="true"><img src={method.logo} alt=""/></span>
                  <span className="payment-method-copy"><strong>{method.label}</strong><small>{method.description}</small></span>
                </label>)}
              </div>
            </fieldset>)}
            <div className="payment-method-action">
              <p className="payment-method-note">Pastikan metode yang dipilih dan data tagihan sudah benar sebelum melanjutkan.</p>
              <p className="payment-method-selection" aria-live="polite">Metode terpilih: {selectedMethod?.label}</p>
              <button className="payment-method-button" type="submit">Lanjutkan Pembayaran</button>
            </div>
          </form>
        </article>
        {q.data&&<BillingCard data={q.data}/>} 
      </section>}
    </main>
  </div>;
}
