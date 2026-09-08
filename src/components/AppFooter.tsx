import logo from '../../logo.png'

const Chevron=()=> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>

const socialIcons={
  facebook:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z"/></svg>,
  whatsapp:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z"/><path d="M8.2 8.2c.5 3.3 2.3 5.1 5.6 5.6l1.2-1.2 2 .9c-.2 1.5-1.1 2.3-2.6 2.3-3.7 0-6.2-2.5-6.2-6.2 0-1.5.8-2.4 2.3-2.6l.9 2-1.2 1.2"/></svg>,
  youtube:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.2 7.1c-.2-1-1-1.8-2-2C17.5 4.6 12 4.6 12 4.6s-5.5 0-7.2.5c-1 .2-1.8 1-2 2-.4 1.7-.4 4.9-.4 4.9s0 3.2.4 4.9c.2 1 1 1.8 2 2 1.7.5 7.2.5 7.2.5s5.5 0 7.2-.5c1-.2 1.8-1 2-2 .4-1.7.4-4.9.4-4.9s0-3.2-.4-4.9ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z"/></svg>,
  instagram:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  tiktok:<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 3h3.2c.3 2 1.5 3.3 3.4 3.8V10a8 8 0 0 1-3.3-1v6.4a6.3 6.3 0 1 1-6.3-6.3h.9v3.3a3.3 3.3 0 1 0 2.1 3V3Z"/></svg>
}

type SocialName=keyof typeof socialIcons
const SocialIcon=({name}:{name:SocialName})=>socialIcons[name]
const contactIcons={
  location:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  chat:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/><path d="M8 9h8M8 13h5"/></svg>,
  email:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>,
  clock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
}

type ContactIcon=keyof typeof contactIcons

export function AppFooter(){
  const quickLinks=['Beranda','Profil','Pajak Daerah','Berita','Produk Hukum','Galeri']
  const services=['E-SPTPD','E-BPHTB','Cek NOP PBB-P2','SPPT Elektronik','Pendaftaran WP','Alur Pengaduan']
  const socials:{name:SocialName;label:string}[]=[{name:'facebook',label:'Facebook'},{name:'whatsapp',label:'WhatsApp'},{name:'youtube',label:'YouTube'},{name:'instagram',label:'Instagram'},{name:'tiktok',label:'TikTok'}]
  return <footer className="site-footer">
    <div className="container footer-grid">
      <section className="footer-brand"><div className="footer-brand-head"><span className="footer-logo"><img src={logo} alt="Logo Kabupaten Batu Bara"/></span><strong>BAPENDA <em>BATU BARA</em></strong></div><p>Badan Pendapatan Daerah Kabupaten Batu Bara. Pelayanan pajak daerah yang transparan, akuntabel, dan profesional.</p><div className="footer-socials">{socials.map(({name,label})=><a href="#" aria-label={label} key={label}><SocialIcon name={name}/></a>)}</div></section>
      <FooterLinks title="Tautan Cepat" items={quickLinks}/>
      <FooterLinks title="Layanan" items={services}/>
      <section className="footer-column footer-contact"><h2>Kontak &amp; Alamat</h2><div className="footer-contact-list"><Contact icon="location"><span>Jl. Lintas Sumatera KM 110, Air Putih,<br/>Kabupaten Batu Bara, Sumatera<br/>Utara 21256</span></Contact><Contact icon="chat"><small>WhatsApp</small><span>0811 6384 987</span></Contact><Contact icon="email"><small>Email</small><span>bapenda.batubara@gmail.com</span></Contact><Contact icon="clock"><small>Jam Operasional</small><span>Senin – Jumat, 08.00 – 16.00</span></Contact></div></section>
    </div>
    <div className="footer-bottom"><div className="container footer-bottom-inner"><p>© 2026 Badan Pendapatan Daerah Kabupaten Batu Bara. Hak Cipta Dilindungi.</p><strong className="footer-motto">Jujur Bayar Pajak, Hebat !!</strong></div></div>
    <button className="footer-to-top" type="button" aria-label="Kembali ke atas" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 15 6-6 6 6"/></svg></button>
  </footer>
}

function FooterLinks({title,items}:{title:string;items:string[]}){return <nav className="footer-column" aria-label={title}><h2>{title}</h2><ul>{items.map(item=><li key={item}><Chevron/><a href="#">{item}</a></li>)}</ul></nav>}
function Contact({icon,children}:{icon:ContactIcon;children:React.ReactNode}){return <div className="footer-contact-item"><b aria-hidden="true">{contactIcons[icon]}</b><div>{children}</div></div>}
