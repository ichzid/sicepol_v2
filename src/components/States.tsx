export function Loading(){return <div className="state" role="status">Memuat data pajak…</div>}
export function ErrorState({retry}:{retry:()=>void}){return <div className="state" role="alert"><p>Data tidak dapat dimuat.</p><button className="btn primary" onClick={retry}>Coba Lagi</button></div>}
