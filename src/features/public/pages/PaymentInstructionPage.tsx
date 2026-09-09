import {useState} from 'react';
import {Link, Navigate, useParams, useSearchParams} from 'react-router-dom';
import {AppHeader} from '../components/AppHeader';
import {BillingCard} from '../components/BillingCard';
import {CopyIcon} from '../components/Icons';
import {findMethod} from '../data/mockPbb';
import {usePbbDetail} from '../hooks/usePbb';
import {formatNop, isValidNop, validYear} from '../utils/format';

export default function PaymentInstructionPage() {
  const {nop = '', year} = useParams();
  const [sp] = useSearchParams();
  const method = findMethod(sp.get('method'));
  const [copied, setCopied] = useState('');
  const q = usePbbDetail(nop, +year!);

  if (!isValidNop(nop)) return <Navigate to="/"/>;
  if (!validYear(year)) return <Navigate to={`/pbb/${nop}/history`}/>;
  if (!method) return <Navigate to={`/pbb/${nop}/${year}/payment-method`}/>;
  if (q.data?.status === 'Lunas') return <Navigate to={`/pbb/${nop}/${year}`}/>;

  const code = method.code?.(nop, +year!);

  return <div className="payment-instruction-page">
    <AppHeader backTo={`/pbb/${nop}/${year}/payment-method`} backLabel="Kembali ke Metode"/>
    <main>
      <section className="container intro" aria-labelledby="payment-instruction-title">
        <span className="eyebrow">Instruksi Pembayaran</span>
        <h1 id="payment-instruction-title">Selesaikan Pembayaran</h1>
        <p className="lead">Ikuti instruksi pembayaran melalui <strong>{method.label}</strong> untuk tagihan tahun <strong>{year}</strong> dengan NOP <strong>{formatNop(nop)}</strong>.</p>
      </section>
      <section className="container payment-instruction-layout" aria-label="Instruksi dan informasi tagihan">
        <article className="card payment-instruction-card">
          <div className="payment-instruction-head">
            <div className="payment-instruction-channel">
              <span className="payment-instruction-channel-logo"><img src={method.logo} alt={`Logo ${method.label}`}/></span>
              <div className="payment-instruction-channel-copy"><small>Metode Pembayaran</small><h2>{method.label}</h2></div>
            </div>
            <span className="payment-instruction-waiting">Menunggu Pembayaran</span>
          </div>
          {method.qr ? <div className="payment-instruction-qr-panel">
            <svg className="payment-instruction-qr-symbol" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="4" aria-hidden="true"><path d="M4 4h20v20H4zM40 4h20v20H40zM4 40h20v20H4zM10 10h8v8h-8zM46 10h8v8h-8zM10 46h8v8h-8zM34 32h8v8h-8zM50 32h10v8M32 50h8v10M48 48h12v12H48z"/></svg>
            <p>Kode QR pembayaran akan ditampilkan setelah instruksi diterbitkan.</p>
          </div> : <div className="payment-instruction-code">
            <span className="payment-instruction-code-label">{method.codeLabel}</span>
            <div className="payment-instruction-code-row">
              <strong className="payment-instruction-code-value">{code}</strong>
              <button className="payment-instruction-copy" type="button" aria-label={`Salin ${method.codeLabel}`} aria-describedby="payment-copy-feedback" onClick={async () => {await navigator.clipboard.writeText(code!); setCopied('Berhasil disalin')}}><CopyIcon/>Salin</button>
            </div>
            <p id="payment-copy-feedback" className="payment-instruction-copy-feedback" aria-live="polite">{copied}</p>
            <p className="payment-instruction-expiry">Selesaikan pembayaran sebelum jatuh tempo tagihan.</p>
          </div>}
          <h3 className="payment-instruction-steps-title">Langkah Pembayaran</h3>
          <ol className="payment-instruction-steps">{method.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <div className="payment-instruction-actions">
            <Link className="payment-instruction-btn payment-instruction-btn-primary" to={`/pbb/${nop}/history`}>Kembali ke Histori PBB</Link>
            <Link className="payment-instruction-btn payment-instruction-btn-secondary" to={`/pbb/${nop}/${year}/payment-status?method=${method.slug}`}>Periksa Status Pembayaran</Link>
          </div>
        </article>
        {q.data && <BillingCard data={q.data}/>} 
      </section>
    </main>
  </div>;
}
