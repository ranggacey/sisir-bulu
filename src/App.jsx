import { useState, useEffect } from 'react'

const WA = 'https://wa.me/6281234567890?text=Halo%20Sisir%20Bulu,%20saya%20mau%20booking%20grooming.'

const SERVICES = [
  { icon: 'dog', title: 'Grooming Anjing', desc: 'Mandi, potong bulu model, bersihkan telinga, dan potong kuku. Anjing pulang wangi dan ganteng.', price: 'Rp 85rb' },
  { icon: 'cat', title: 'Grooming Kucing', desc: 'Penanganan lembut khusus kucing, mandi air hangat, dan styling bulu anti kusut.', price: 'Rp 75rb' },
  { icon: 'bath', title: 'Mandi + Blow', desc: 'Mandi dengan sampo premium sesuai jenis bulu, dilanjut blow dry sampai kering sempurna.', price: 'Rp 50rb' },
  { icon: 'scissors', title: 'Potong Kuku', desc: 'Potong kuku aman tanpa berdarah, plus poles biar halus. Cepat, cuma 15 menit.', price: 'Rp 25rb' },
]

const FEATURES = [
  { title: 'Groomer Sayang Hewan', desc: 'Tim kami pecinta hewan beneran. Hewan yang takut atau agresif ditangani dengan sabar, tanpa bentakan.' },
  { title: 'Produk Aman & Premium', desc: 'Sampo dan conditioner khusus hewan, pH seimbang, aman kalau terjilat. Kulit sensitif? Ada varian hypoallergenic.' },
  { title: 'Ruangan Bersih & Wangi', desc: 'Area grooming dibersihkan tiap selesai satu hewan. Kamu bisa tunggu sambil lihat via kaca.' },
]

const TESTIS = [
  { name: 'Nadia Putri', role: 'Mama-nya Mochi (Kucing)', ava: '#f2668b', text: 'Mochi biasanya takut banget kalau grooming, tapi di sini dia pulang anteng dan bulunya lembut banget. Groomernya sabar poll.' },
  { name: 'Bagas Ramadhan', role: 'Papa-nya Bruno (Golden)', ava: '#7fcfa0', text: 'Bruno anjing gede yang aktif banget, tapi hasilnya rapi. Sekarang tiap bulan pasti ke sini, nggak mau pindah.' },
  { name: 'Sinta Dewi', role: 'Mama-nya Kiko & Kiki', ava: '#ffc93c', text: 'Sekaligus bawa dua kucing, dua-duanya ditangani dengan baik. Harganya juga masuk akal untuk kualitasnya.' },
]

const PRICES = [
  { name: 'Mandi Ceria', desc: 'Buat perawatan rutin biar tetap wangi.', val: 'Rp 50rb', feats: ['Mandi sampo premium', 'Blow dry', 'Bersihkan telinga', 'Parfum hewan'], featured: false },
  { name: 'Grooming Komplit', desc: 'Paket lengkap paling laris.', val: 'Rp 95rb', feats: ['Semua layanan Mandi Ceria', 'Potong bulu model', 'Potong kuku + poles', 'Foto after grooming'], featured: true },
  { name: 'Spa Mewah', desc: 'Manjakan anabul kesayanganmu.', val: 'Rp 150rb', feats: ['Semua layanan Komplit', 'Creambath bulu', 'Pijat relaksasi', 'Bandana lucu gratis'], featured: false },
]

const FAQS = [
  { q: 'Apakah hewan saya harus divaksin dulu?', a: 'Iya, minimal vaksin pertama. Ini buat melindungi hewanmu dan hewan lain yang lagi grooming bareng. Bawa buku vaksinnya ya.' },
  { q: 'Berapa lama proses grooming?', a: 'Mandi + blow sekitar 45 menit. Grooming komplit 1,5 sampai 2 jam tergantung kondisi bulu dan ukuran hewan.' },
  { q: 'Bagaimana kalau hewan saya galak atau takut?', a: 'Tenang, groomer kami terlatih menangani hewan yang cemas atau agresif ringan. Kalau memang tidak memungkinkan, kami akan hubungi kamu dan tidak memaksa.' },
  { q: 'Apakah boleh menunggu selama grooming?', a: 'Boleh banget. Ada ruang tunggu nyaman dengan kaca one-way, jadi kamu bisa lihat tanpa bikin hewanmu tegang.' },
  { q: 'Apakah melayani antar jemput?', a: 'Melayani untuk area Semarang dengan biaya Rp 20rb sekali jalan. Kabari via WhatsApp minimal H-1.' },
]

function Icon({ name }) {
  const paths = {
    paw: <path d="M12 13c-2.8 0-5.5 2.2-5.5 4.8 0 1.5 1.1 2.7 2.6 2.7 1 0 1.9-.5 2.9-.5s1.9.5 2.9.5c1.5 0 2.6-1.2 2.6-2.7 0-2.6-2.7-4.8-5.5-4.8zM6.2 8.2c-1-.3-2 .7-1.8 1.9.2 1 1.3 1.7 2.2 1.4.9-.3 1.4-1.5 1-2.4-.3-.8-1-1-1.4-.9zm11.6 0c-1-.3-2 .7-1.8 1.9.2 1 1.3 1.7 2.2 1.4.9-.3 1.4-1.5 1-2.4-.3-.8-1-1-1.4-.9zM9.5 3.5c-1 .2-1.5 1.5-1 2.5.4.9 1.5 1.3 2.3.8.8-.4 1-1.6.5-2.5-.4-.7-1.2-1-1.8-.8zm5 0c-1 .2-1.5 1.5-1 2.5.4.9 1.5 1.3 2.3.8.8-.4 1-1.6.5-2.5-.4-.7-1.2-1-1.8-.8z" />,
    dog: <path d="M4 11V7a2 2 0 0 1 2-2h1l2-2 3 3h3a2 2 0 0 1 2 2v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-5-11z" />,
    cat: <path d="M4 8l3-4 4 3 4-3 3 4c1 5-2 11-7 11-5 0-8-6-7-11z" />,
    bath: <path d="M4 12h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2zm2 5l-1 2m14-2l1 2M7 12V6a2 2 0 0 1 4 0" />,
    scissors: <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.5 6.5L20 18M15.5 4.5L4 16" />,
    star: <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
    check: <path d="M4 12l5 5L20 6" />,
    clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-13v5l3 2" />,
    pin: <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
    arrow: <path d="M5 12h14m-6-6l6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    wa: <path d="M21 12a9 9 0 1 1-16.6 4.8L3 21l4.3-1.3A9 9 0 1 1 21 12zm-4.3 2.5c-.2.6-1.2 1.1-1.7 1.1-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.2z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [faq, setFaq] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <div className="site">
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="logo" href="#"><span className="logo-mark"><Icon name="paw" /></span>Sisir Bulu</a>
          <div className={`nav-links ${open ? 'show' : ''}`}>
            <a href="#layanan" onClick={() => setOpen(false)}>Layanan</a>
            <a href="#kenapa" onClick={() => setOpen(false)}>Kenapa Kami</a>
            <a href="#testimoni" onClick={() => setOpen(false)}>Testimoni</a>
            <a href="#paket" onClick={() => setOpen(false)}>Paket</a>
            <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          </div>
          <div className="nav-cta">
            <a href={WA} className="btn btn-primary">Booking Grooming</a>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="blob blob-1" /><div className="blob blob-2" /><div className="blob blob-3" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow reveal">Pet Grooming · Semarang</p>
            <h1 className="reveal">Bulu Rapi, <span className="hl">Hati Senang.</span></h1>
            <p className="lead reveal">Grooming anjing dan kucing dengan penuh kasih sayang. Anabul pulang wangi, rapi, dan happy. Kamu pun tenang.</p>
            <div className="hero-actions reveal">
              <a href={WA} className="btn btn-primary"><Icon name="wa" /> Booking via WhatsApp</a>
              <a href="#layanan" className="btn btn-ghost">Lihat Layanan</a>
            </div>
            <div className="hero-stats reveal">
              <div><strong>4.9</strong><span>Rating Google</span></div>
              <div><strong>12rb+</strong><span>Anabul Dilayani</span></div>
              <div><strong>6+</strong><span>Tahun Berdiri</span></div>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="sticker s1">Groomer bersertifikat</div>
            <div className="hero-frame">
              <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop" alt="Anak anjing lucu setelah grooming" />
            </div>
            <div className="sticker s2">Gratis foto after grooming</div>
          </div>
        </div>
      </header>

      <section className="section" id="layanan">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow reveal">Layanan Kami</p>
            <h2 className="reveal">Perawatan Buat Anabul</h2>
            <p className="section-sub reveal">Semua layanan dikerjakan groomer berpengalaman yang sayang hewan.</p>
          </div>
          <div className="svc-grid">
            {SERVICES.map((s, i) => (
              <article key={i} className="svc-card reveal">
                <div className="svc-icon"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-price">{s.price}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="kenapa">
        <div className="container feat-grid">
          <div className="feat-photos reveal">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop" alt="Anjing bermain" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=600&auto=format&fit=crop" alt="Anjing dan anak anjing" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=600&auto=format&fit=crop" alt="Kucing lucu" loading="lazy" />
            <img src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=600&auto=format&fit=crop" alt="Anak anjing" loading="lazy" />
          </div>
          <div>
            <p className="eyebrow reveal">Kenapa Sisir Bulu</p>
            <h2 className="reveal">Anabulmu Dirawat Seperti Milik Sendiri</h2>
            <p className="section-sub reveal">Kami tahu nitipin hewan kesayangan itu butuh kepercayaan besar. Makanya kami perlakukan setiap anabul dengan hati.</p>
            <div className="feat-list">
              {FEATURES.map((f, i) => (
                <div key={i} className="feat-item reveal">
                  <div className="feat-check"><Icon name="check" /></div>
                  <div><h3>{f.title}</h3><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="testimoni">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Testimoni</p>
            <h2 className="reveal">Kata Para Pawrents</h2>
            <p className="section-sub reveal">Cerita dari pawrents yang anabulnya sudah grooming di sini.</p>
          </div>
          <div className="testi-grid">
            {TESTIS.map((t, i) => (
              <article key={i} className="testi-card reveal">
                <div className="stars"><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /><Icon name="star" /></div>
                <p>"{t.text}"</p>
                <div className="testi-who">
                  <div className="testi-ava" style={{ background: t.ava }}>{t.name[0]}</div>
                  <div><strong>{t.name}</strong><span>{t.role}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="paket">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">Paket Hemat</p>
            <h2 className="reveal">Pilih Paketnya</h2>
            <p className="section-sub reveal">Harga jelas di depan, nggak ada biaya siluman.</p>
          </div>
          <div className="price-grid">
            {PRICES.map((p, i) => (
              <article key={i} className={`price-card reveal ${p.featured ? 'featured' : ''}`}>
                {p.featured && <span className="price-flag">Paling Laris</span>}
                <h3>{p.name}</h3>
                <p className="pdesc">{p.desc}</p>
                <div className="price-val">{p.val}</div>
                <ul className="price-list">
                  {p.feats.map((f, j) => <li key={j}><Icon name="check" />{f}</li>)}
                </ul>
                <a href={WA} className="btn btn-primary" style={{ justifyContent: 'center' }}>Pilih {p.name}</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow reveal">FAQ</p>
            <h2 className="reveal">Sering Ditanyakan</h2>
          </div>
          <div className="faq-wrap">
            {FAQS.map((f, i) => (
              <div key={i} className={`faq-item reveal ${faq === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setFaq(faq === i ? -1 : i)}>
                  {f.q}<span className="plus"><Icon name="plus" /></span>
                </button>
                <div className="faq-a" style={{ maxHeight: faq === i ? '240px' : '0' }}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="cta-box reveal">
            <p className="eyebrow" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}>Slot Terbatas Tiap Hari</p>
            <h2>Booking Jadwal <span>Grooming</span> Sekarang</h2>
            <p>Kami batasi 10 anabul per hari biar setiap hewan dapat perhatian penuh. Amankan slot anabulmu via WhatsApp.</p>
            <a href={WA} className="btn btn-primary"><Icon name="wa" /> Chat WhatsApp <Icon name="arrow" /></a>
            <div className="cta-meta">
              <div><Icon name="clock" /> Senin-Sabtu · 09.00 - 18.00</div>
              <div><Icon name="pin" /> Jl. Veteran No. 45, Semarang</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="foot-grid">
            <div>
              <a className="logo" href="#"><span className="logo-mark"><Icon name="paw" /></span>Sisir Bulu</a>
              <p>Pet grooming & pet shop di Semarang. Merawat anabul dengan kasih sayang sejak 2019.</p>
            </div>
            <div>
              <h4>Layanan</h4>
              <ul>
                <li><a href="#layanan">Grooming Anjing</a></li>
                <li><a href="#layanan">Grooming Kucing</a></li>
                <li><a href="#layanan">Mandi + Blow</a></li>
                <li><a href="#paket">Paket Spa</a></li>
              </ul>
            </div>
            <div>
              <h4>Navigasi</h4>
              <ul>
                <li><a href="#kenapa">Kenapa Kami</a></li>
                <li><a href="#testimoni">Testimoni</a></li>
                <li><a href="#paket">Paket</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Kontak</h4>
              <ul>
                <li><a href={WA}>WhatsApp</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">TikTok</a></li>
                <li><a href="#">Shopee Pet Shop</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Sisir Bulu. Seluruh hak cipta dilindungi.</span>
            <span>Semarang, Jawa Tengah</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
