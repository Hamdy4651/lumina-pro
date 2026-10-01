import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Instagram, Menu, MessageCircle, Minus, MoveHorizontal, Phone, Plus, Sparkles, X } from 'lucide-react';

const WA = '4915777779962';
const PHONE = '015 77777 9962';
const img = (id: number, w = 800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=1000&w=${w}`;
const heroImage = '/lumina-hero.jpeg';
const p1 = img(6874749), p2 = img(33334711), p3 = img(670380);
const c1 = img(7789603, 1400), c2 = img(7789616, 1400), c3 = img(6627918, 1400);
const beforeImage = img(39525267), afterImage = img(30148072);

type Service = { name: string; description: string; duration: string; price: string; image: string };
type Doctor = { name: string; specialty: string; image: string };
type Booking = { service: Service; doctor: Doctor | null; date: string; time: string };

const services: Service[] = [
  { name: 'Botox · 4 Zonen', description: 'Vier Zonen präzise behandeln – für eine frische, natürliche Ausstrahlung.', duration: 'ca. 30 Min.', price: '240 €', image: p3 },
  { name: 'Jede weitere Botox-Zone', description: 'Ihre Behandlung flexibel erweitern – jede zusätzliche Zone zum festen Preis.', duration: 'ca. 15 Min.', price: '59 €', image: c2 },
  { name: 'Hyaluronsäure & Filler', description: 'Ästhetische Präzision mit hochwertigen Fillern – ganz ohne Skalpell.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: beforeImage },
  { name: 'Russische Lippen-Technik', description: 'Definierte Lippen mit Juvederm und einem besonders natürlichen Ergebnis.', duration: 'ca. 45 Min.', price: '219 € statt 240 €', image: p1 },
  { name: 'Doppelkinn · Lemon Bottle', description: 'Die moderne Injektionslipolyse für sichtbare Ergebnisse ohne OP.', duration: '3 Sitzungen', price: '299 € statt 360 €', image: afterImage },
  { name: 'Skin Booster mit Profhilo', description: 'Zellaktivierung und intensive Feuchtigkeit für vitalere Haut.', duration: '3 Sitzungen', price: '599 € statt 750 €', image: p2 },
  { name: 'Skin Booster & PRP', description: 'Regeneration trifft Feuchtigkeitskick – für sichtbar strahlende Haut.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: c1 },
  { name: 'HydraFacial & Microneedling', description: 'Tiefenpflege und Hauterneuerung in einer wirkungsvollen Kombination.', duration: 'ca. 60 Min.', price: 'Preis auf Anfrage', image: c2 },
  { name: 'Infusionen & Vitamine', description: 'Vitamine, Antioxidantien und Nährstoffe gezielt für Körper und Haut.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: c3 },
  { name: 'Anti-Aging Kombi', description: 'Botox, Filler und Skin Booster für ein sichtbar verjüngtes Erscheinungsbild.', duration: 'individuell', price: 'Preis auf Anfrage', image: afterImage },
];
const doctors: Doctor[] = [
  { name: 'Dr. med. Lena Hoffmann', specialty: 'Ästhetische Medizin & Dermatologie', image: p1 },
  { name: 'Dr. med. Karim Aydin', specialty: 'Plastische & Ästhetische Chirurgie', image: p2 },
  { name: 'Dr. med. Sophie Brandt', specialty: 'Ästhetische Medizin', image: p3 },
];
const faqs = [
  ['Wie finde ich die richtige Behandlung?', 'In einem persönlichen Beratungsgespräch nehmen wir uns Zeit, Ihre Wünsche und die Möglichkeiten Ihrer Haut genau zu verstehen. Erst danach empfehlen wir eine Behandlung – transparent, ehrlich und ohne Verkaufsdruck.'],
  ['Wie lange hält das Ergebnis?', 'Das hängt von Behandlung, Region und Stoffwechsel ab. Bei Botulinumtoxin rechnen wir meist mit drei bis sechs Monaten, bei Fillern oft mit neun bis zwölf Monaten.'],
  ['Ist eine Behandlung schmerzhaft?', 'Die meisten Behandlungen werden als gut tolerierbar empfunden. Bei Bedarf verwenden wir eine lokale Betäubung und besonders feine Kanülen.'],
  ['Was muss ich vor dem Termin beachten?', 'Bitte kommen Sie möglichst ohne Make-up und informieren Sie uns über Medikamente, Allergien und bestehende Erkrankungen.'],
  ['Gibt es eine Ausfallzeit?', 'Viele Behandlungen sind direkt gesellschaftsfähig. Leichte Rötungen oder Schwellungen klingen in der Regel schnell ab.'],
];
const nav: [string, string][] = [['Start', 'start'], ['Über uns', 'warum'], ['Behandlungen', 'behandlungen'], ['Vorher & Nachher', 'vorher'], ['Team', 'team'], ['Bewertungen', 'stimmen'], ['FAQ', 'faq']];
const cases = [['Harmonische Lippenkontur', 'Hyaluron-Filler', '0,5 ml'], ['Frische Stirnpartie', 'Botox', '3 Zonen'], ['Straffere Gesichtskontur', 'Profhilo', '2 ml']];
const mornings = ['08:30', '09:15', '10:30', '11:15', '12:00'], afternoons = ['13:30', '14:15', '15:30', '16:15', '17:00'];

const upcomingDays = (n: number) => {
  const out: { label: string; wd: string; d: string; m: string }[] = [];
  const cur = new Date();
  while (out.length < n) {
    cur.setDate(cur.getDate() + 1);
    if (cur.getDay() === 0) continue;
    const f = (o: Intl.DateTimeFormatOptions) => cur.toLocaleDateString('de-DE', o).replace('.', '');
    out.push({ label: f({ weekday: 'short', day: 'numeric', month: 'short' }), wd: f({ weekday: 'short' }), d: String(cur.getDate()), m: f({ month: 'short' }) });
  }
  return out;
};

function App() {
  const days = useMemo(() => upcomingDays(10), []);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<Booking>({ service: services[0], doctor: null, date: days[0].label, time: '10:30' });
  const [faqOpen, setFaqOpen] = useState(0);
  const [slider, setSlider] = useState(54);
  const [activeCase, setActiveCase] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => setIsLoading(false), 1750);
    const targets = document.querySelectorAll<HTMLElement>('main > section:not(.hero)');
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: 0.12 });
    targets.forEach((x) => { x.classList.add('reveal-target'); io.observe(x); });
    const onScroll = () => {
      const h = document.documentElement;
      setScrolled(window.scrollY > 60);
      setProgress((window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(t); io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  useEffect(() => { document.body.style.overflow = bookingOpen ? 'hidden' : ''; }, [bookingOpen]);

  const openBooking = (service?: Service) => {
    if (service) setBooking((c) => ({ ...c, service }));
    setStep(1); setConfirmed(false); setBookingOpen(true);
  };

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = ['Neue Terminanfrage – LUMINA Klinik', '',
      `Behandlung: ${booking.service.name} (${booking.service.duration}, ${booking.service.price})`,
      `Ärztin/Arzt: ${booking.doctor?.name ?? 'Egal, wer zuerst frei ist'}`,
      `Wunschtermin: ${booking.date}, ${booking.time} Uhr`, '',
      `Name: ${f.get('name') ?? ''}`, `Telefon: ${f.get('phone') ?? ''}`, `E-Mail: ${f.get('email') ?? ''}`, `Nachricht: ${f.get('note') || '–'}`].join('\n');
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    setConfirmed(true);
  };

  const anyDoctor = 'Egal, wer zuerst frei ist';
  const marquee = [...services, ...services].map((s) => s.name);

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className={`preloader ${isLoading ? '' : 'is-hidden'}`} aria-hidden="true">
        <div className="preloader-word">{'LUMINA'.split('').map((l, i) => <span key={i}>{l}</span>)}</div>
        <div className="preloader-line" />
        <p>ÄSTHETISCHE MEDIZIN · BOCHUM</p>
      </div>

      <a className="wa-float" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={24} /></a>

      <div className="site-shell">
        <header className={`site-header ${scrolled ? 'is-solid' : ''}`}>
          <a href="#start" className="brand" aria-label="LUMINA Klinik Startseite"><span className="brand-mark">L</span><span>LUMINA</span><small>KLINIK</small></a>
          <nav className={`main-nav ${mobileNav ? 'is-open' : ''}`}>{nav.map(([l, id]) => <a href={`#${id}`} key={id} onClick={() => setMobileNav(false)}>{l}</a>)}</nav>
          <div className="header-actions">
            <a className="phone-link" href={`tel:+${WA}`}><Phone size={15} /> {PHONE}</a>
            <button className="button button-gold" onClick={() => openBooking()}>Termin buchen <ArrowUpRight size={16} /></button>
          </div>
          <button className="menu-button" aria-label="Menü öffnen" onClick={() => setMobileNav((o) => !o)}>{mobileNav ? <X /> : <Menu />}</button>
        </header>

        <main>
          <section className="hero" id="start">
            <img className="hero-image" src={heroImage} alt="Frau in ruhigem, natürlichem Licht" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <p className="eyebrow light">Ästhetische Medizin · Bochum</p>
              <h1>Natürlich schön.<br /><em>Ganz Sie.</em></h1>
              <p className="hero-copy">Ästhetische Medizin, die Ihre Persönlichkeit unterstreicht – in einer Atmosphäre, die sich nach Ihnen richtet.</p>
              <div className="hero-buttons"><button className="button button-gold" onClick={() => openBooking()}>Ihre Beratung beginnen <ArrowUpRight size={17} /></button><a className="text-link light-link" href="#behandlungen">Behandlungen entdecken <ArrowDownRight size={16} /></a></div>
            </div>
            <div className="hero-meta"><div><strong>4,9</strong><span>von 5 · 535 Bewertungen</span></div><a href={`tel:+${WA}`}><Phone size={15} /> {PHONE}</a></div>
            <div className="trust-grid">{[['01', 'Zentrale Lage', 'Mitten in Bochum.'], ['02', 'Erfahrenes Team', 'Medizin mit Haltung.'], ['03', 'Moderne Technik', 'Präzise. Sicher.'], ['04', 'Persönliche Betreuung', 'Zeit, die Ihnen gehört.']].map(([n, t, s]) => <div className="trust-card" key={n}><span className="card-number">{n}</span><strong>{t}</strong><small>{s}</small></div>)}</div>
            <div className="scroll-note"><span /> Scrollen</div>
          </section>

          <div className="marquee" aria-hidden="true"><div className="marquee-track">{marquee.map((n, i) => <span key={i}>{n}<i>✦</i></span>)}</div></div>

          <section className="intro-section light-section" id="warum">
            <div className="section-head"><p className="eyebrow">01 · Warum LUMINA</p><span className="section-rule" /></div>
            <div className="intro-grid"><div><h2>Schönheit beginnt<br />mit <em>Vertrauen.</em></h2><p className="lead-copy">Wir glauben nicht an ein neues Gesicht. Wir glauben an den besten, entspanntesten Ausdruck von Ihnen.</p><a className="text-link dark-link" href="#team">LUMINA kennenlernen <ArrowUpRight size={16} /></a></div><div className="intro-image-wrap"><img src={p2} alt="Natürliches Portrait einer Patientin" /><div className="floating-note"><Sparkles size={18} /><span>Medizinische Präzision<br /><b>mit menschlicher Wärme</b></span></div></div></div>
            <div className="pillar-grid">{[['01', 'Ruhe & Vertrauen', 'Sie werden gesehen, gehört und verstanden.'], ['02', 'Moderne Diagnostik', 'Wir entscheiden auf Basis von Wissen, nicht von Trends.'], ['03', 'Persönlich betreut', 'Eine feste Ansprechpartnerin für Ihren gesamten Weg.'], ['04', 'Ehrlich beraten', 'Wir empfehlen nur, was wirklich zu Ihnen passt.']].map(([n, t, s]) => <div className="pillar" key={n}><span>{n}</span><h3>{t}</h3><p>{s}</p></div>)}</div>
          </section>

          <section className="before-section dark-section" id="vorher">
            <div className="section-head light-head"><p className="eyebrow">02 · Vorher & Nachher</p><span className="section-rule" /></div>
            <div className="before-heading"><h2>Veränderung,<br /><em>die bleibt.</em></h2><p>Unsere Ergebnisse sind so individuell wie die Menschen, die zu uns kommen. Natürlichkeit ist dabei unser Maßstab.</p></div>
            <div className="case-layout">
              <div className="case-slider">
                <div className="case-image after"><img src={afterImage} alt="Beispiel nach einer Behandlung" /></div>
                <div className="case-image before" style={{ clipPath: `inset(0 ${100 - slider}% 0 0)` }}><img src={beforeImage} alt="Beispiel vor einer Behandlung" /></div>
                <div className="slider-divider" style={{ left: `${slider}%` }}><span><MoveHorizontal size={16} /></span></div>
                <input className="range-slider" type="range" min="0" max="100" value={slider} onChange={(e) => setSlider(Number(e.target.value))} aria-label="Vorher-Nachher Vergleich verschieben" />
                <div className="slider-label before-label">Vorher</div><div className="slider-label after-label">Nachher</div>
              </div>
              <div className="case-info">
                <div className="case-tabs">{cases.map((_, i) => <button className={activeCase === i ? 'active' : ''} onClick={() => setActiveCase(i)} key={i}>0{i + 1}</button>)}</div>
                <p className="eyebrow">Fallstudie 0{activeCase + 1}</p><h3>{cases[activeCase][0]}</h3>
                <p>Eine sanfte Korrektur, die den Ausdruck bewahrt und die natürliche Form unterstreicht.</p>
                <div className="case-details"><div><span>Behandlung</span><strong>{cases[activeCase][1]}</strong></div><div><span>Menge</span><strong>{cases[activeCase][2]}</strong></div></div>
                <small>Ergebnisse können individuell variieren. Abbildungen dienen der Orientierung.</small>
              </div>
            </div>
          </section>

          <section className="services-section light-section" id="behandlungen">
            <div className="section-head"><p className="eyebrow">03 · Behandlungen</p><span className="section-rule" /></div>
            <div className="section-title-row"><h2>Für Ihren<br /><em>Moment.</em></h2><p>Jede Behandlung beginnt mit einem Gespräch. Entdecken Sie unsere Möglichkeiten – oder lassen Sie sich persönlich beraten.</p></div>
            <div className="service-grid">{services.map((s, i) => <article className="service-card" key={s.name}><div className="service-image"><img src={s.image} alt={s.name} loading="lazy" /><span>{String(i + 1).padStart(2, '0')}</span></div><div className="service-body"><h3>{s.name}</h3><p>{s.description}</p><div className="service-meta"><span><Clock3 size={14} /> {s.duration}</span><strong>{s.price}</strong></div><button className="service-book" onClick={() => openBooking(s)}>Termin buchen <ArrowUpRight size={15} /></button></div></article>)}</div>
            <div className="service-banner"><div><p className="eyebrow">Ihre Frage, unser Rat</p><h3>Nicht sicher, welche<br /><em>Behandlung</em> Sie brauchen?</h3></div><button className="button button-outline" onClick={() => openBooking(services[services.length - 1])}>Beratung anfragen <ArrowUpRight size={16} /></button></div>
          </section>

          <section className="clinic-section dark-section">
            <div className="clinic-mosaic"><img className="clinic-main" src={c1} alt="Behandlungsraum der LUMINA Klinik" loading="lazy" /><img className="clinic-small" src={c2} alt="Heller Raum in der Klinik" loading="lazy" /><div className="mosaic-caption"><span className="eyebrow">04 · Unsere Praxis</span><p>Ein Ort, an dem Sie<br /><em>ankommen.</em></p></div></div>
            <div className="clinic-content"><p className="eyebrow">Die LUMINA Atmosphäre</p><h2>Privat. Persönlich.<br /><em>Unaufgeregt.</em></h2><p className="lead-copy">Von der ersten Begrüßung bis zur Nachsorge: In unserer Praxis in Bochum geht es um Sie. Um Ihre Fragen, Ihre Wünsche und um das gute Gefühl, in besten Händen zu sein.</p><div className="feature-row">{[['01', 'Diskretion', 'Ein geschützter Raum für Ihre Entscheidungen.'], ['02', 'Qualität', 'Medizinische Standards ohne Kompromisse.'], ['03', 'Zeit', 'Beratung, die nicht auf die Uhr schaut.'], ['04', 'Haltung', 'Schönheit, die zu Ihnen gehört.']].map(([n, t, s]) => <div className="feature-tile" key={n}><span>{n}</span><strong>{t}</strong><p>{s}</p></div>)}</div></div>
          </section>

          <section className="team-section light-section" id="team">
            <div className="section-head"><p className="eyebrow">05 · Unser Team</p><span className="section-rule" /></div>
            <div className="team-intro"><div><h2>In guten Händen.<br /><em>Wirklich.</em></h2></div><p>Unser Team verbindet medizinische Expertise mit einem feinen Gespür für das, was Sie ausmacht.</p></div>
            <div className="lead-doctor"><div className="doctor-portrait"><img src={p1} alt={doctors[0].name} /><span>Ärztliche Leitung</span></div><div className="doctor-copy"><p className="eyebrow">{doctors[0].name}</p><h3>„Natürlichkeit ist<br />kein Kompromiss.“</h3><p>Als Fachärztin für Dermatologie und ästhetische Medizin begleitet Dr. Hoffmann ihre Patientinnen und Patienten seit über 12 Jahren mit Präzision, Empathie und einem klaren Blick für das Wesentliche.</p><div className="timeline">{['Fachärztin für Dermatologie', 'Zusatzbezeichnung Ästhetische Medizin', 'Mitglied der DGBT & DGPRÄC'].map((t, i) => <div key={t}><span>0{i + 1}</span>{t}</div>)}</div></div></div>
            <div className="doctor-grid">{doctors.slice(1).map((d) => <div className="doctor-card" key={d.name}><img src={d.image} alt={d.name} loading="lazy" /><p className="eyebrow">{d.specialty}</p><h3>{d.name}</h3></div>)}<div className="team-card"><span className="card-number">+</span><h3>Und ein Team,<br />das Sie kennt.</h3><p>Empfang, Assistenz und Nachsorge: Wir sind da, bevor Sie fragen müssen.</p></div></div>
          </section>

          <section className="location-section warm-section">
            <div className="location-copy"><p className="eyebrow">06 · Standort & Zeiten</p><h2>Mitten in<br /><em>Bochum.</em></h2><p className="lead-copy">Unsere Praxis liegt zentral in Bochum – ruhig, diskret und gut erreichbar.</p>
              <div className="address"><strong>Brückstr. 44<br />44787 Bochum</strong><a className="text-link dark-link" href="https://maps.google.com/?q=Brückstrasse+44+Bochum" target="_blank" rel="noreferrer">Route planen <ArrowUpRight size={15} /></a></div>
              <div className="hours"><div><span>Mo – Sa</span><strong>Nach Terminvereinbarung</strong></div><div><span>Sonntag</span><strong>Geschlossen</strong></div><div><span>Kontakt</span><strong>Auch per WhatsApp</strong></div></div>
              <button className="button button-dark" onClick={() => openBooking()}>Termin vereinbaren <ArrowUpRight size={16} /></button></div>
            <div className="map-card"><div className="map-grid" /><div className="map-label"><span className="pin-dot" /> LUMINA KLINIK</div><div className="map-roads road-one" /><div className="map-roads road-two" /></div>
          </section>

          <section className="reviews-section dark-section" id="stimmen">
            <div className="section-head light-head"><p className="eyebrow">07 · Kundenstimmen</p><span className="section-rule" /></div>
            <div className="review-layout"><div><div className="review-stars">★★★★★</div><blockquote>„Ich habe mich vom ersten Moment an unglaublich wohl und verstanden gefühlt. Das Ergebnis ist genau das, was ich mir gewünscht habe: frisch, aber immer noch ich.“</blockquote><p className="review-author">— Julia M. · Patientin seit 2022</p></div><div className="review-side"><div className="rating-big"><strong>4,9</strong><span>/ 5</span></div><div className="rating-stars">★★★★★</div><p>535 Bewertungen auf Google</p><a className="text-link light-link" href="#stimmen">Alle Bewertungen <ArrowUpRight size={16} /></a></div></div>
            <div className="stats-row"><div><strong>5/5</strong><span>Behandlungserlebnis</span></div><div><strong>2.800+</strong><span>Zufriedene Patient:innen</span></div><div><strong>100%</strong><span>Weiterempfehlung</span></div></div>
          </section>

          <section className="faq-section light-section" id="faq">
            <div className="faq-heading"><p className="eyebrow">08 · FAQ</p><h2>Was Sie noch<br /><em>wissen möchten.</em></h2><p>Die wichtigsten Antworten für Ihre Entscheidung. Und wenn etwas offen bleibt: Wir sind nur einen Anruf entfernt.</p><a className="text-link dark-link" href={`tel:+${WA}`}>Direkt mit uns sprechen <Phone size={15} /></a></div>
            <div className="faq-list">{faqs.map(([q, a], i) => <div className={`faq-item ${faqOpen === i ? 'open' : ''}`} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}><span>{q}</span>{faqOpen === i ? <Minus size={18} /> : <Plus size={18} />}</button><div className="faq-answer"><p>{a}</p></div></div>)}</div>
          </section>

          <section className="final-cta"><img src={heroImage} alt="Ruhiger Moment in warmem Licht" loading="lazy" /><div className="final-overlay" /><div className="final-content"><p className="eyebrow light">Ihr nächster Schritt</p><h2>Ihr neues Ich<br />beginnt mit<br /><em>einem Gespräch.</em></h2><button className="button button-gold" onClick={() => openBooking()}>Termin buchen <ArrowUpRight size={16} /></button></div></section>
        </main>

        <footer className="site-footer dark-section">
          <div className="footer-top"><div><a className="brand footer-brand" href="#start"><span className="brand-mark">L</span><span>LUMINA</span><small>KLINIK</small></a><p>Ästhetische Medizin<br />mit Haltung.</p></div>
            <div className="footer-links"><div><p className="eyebrow light">Kontakt</p><a href={`tel:+${WA}`}>{PHONE}</a><a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">WhatsApp schreiben</a></div><div><p className="eyebrow light">Besuchen Sie uns</p><span>Brückstr. 44</span><span>44787 Bochum</span></div><div><p className="eyebrow light">Folgen Sie uns</p><a href="#start"><Instagram size={17} /> Instagram</a></div></div></div>
          <div className="footer-wordmark">LUMINA</div>
          <div className="footer-bottom"><span>© 2026 LUMINA Klinik</span><span>Impressum · Datenschutz</span><span>Made with intention</span></div>
        </footer>

        {bookingOpen && <div className="booking-overlay"><div className="booking-modal"><button className="booking-close" onClick={() => setBookingOpen(false)} aria-label="Buchung schließen"><X /></button>
          {confirmed ? <div className="confirmation"><div className="check-circle"><Check size={38} /></div><p className="eyebrow">Fast geschafft</p><h2>Wir freuen uns<br /><em>auf Sie.</em></h2><p>Bitte senden Sie die vorbereitete Nachricht in WhatsApp ab. Danach bestätigen wir Ihren Termin für „{booking.service.name}“ persönlich.</p><div className="confirmation-summary"><span>{booking.service.name}</span><strong>{booking.date} · {booking.time}</strong><small>{booking.doctor?.name ?? anyDoctor}</small></div><button className="button button-gold" onClick={() => setBookingOpen(false)}>Zurück zur Website <ArrowRight size={16} /></button></div>
          : <><div className="booking-main">
            <div className="booking-head"><div><p className="eyebrow">Ihre persönliche Buchung</p><h2>Schritt {step} <span>/ 05</span></h2></div><div className="progress-track"><span style={{ width: `${step * 20}%` }} /></div></div>

            {step === 1 && <div className="booking-step"><h3>Welche Behandlung darf es sein?</h3><p>Wählen Sie Ihren Wunsch – wir beraten Sie natürlich gern vor Ort.</p><div className="booking-service-grid">{services.map((s) => <button className={`booking-service ${booking.service.name === s.name ? 'selected' : ''}`} onClick={() => setBooking((c) => ({ ...c, service: s }))} key={s.name}><img src={s.image} alt="" /><span>{s.name}</span><small>{s.duration} · {s.price}</small></button>)}</div></div>}

            {step === 2 && <div className="booking-step"><h3>Wer darf Sie begleiten?</h3><p>Wählen Sie Ihre Wunschärztin oder Ihren Wunscharzt.</p><div className="booking-doctors"><button className={`doctor-choice any-choice ${booking.doctor === null ? 'selected' : ''}`} onClick={() => setBooking((c) => ({ ...c, doctor: null }))}><div className="any-icon"><Sparkles size={22} /></div><span>{anyDoctor}</span><small>Wir finden den passenden Termin für Sie.</small></button>{doctors.map((d) => <button className={`doctor-choice ${booking.doctor?.name === d.name ? 'selected' : ''}`} onClick={() => setBooking((c) => ({ ...c, doctor: d }))} key={d.name}><img src={d.image} alt="" /><span>{d.name}</span><small>{d.specialty}</small></button>)}</div></div>}

            {step === 3 && <div className="booking-step"><h3>Wann passt es für Sie?</h3><p>Wählen Sie Ihren Wunschtag. Sonntags ist die Praxis geschlossen.</p><div className="date-strip">{days.map((d) => <button className={booking.date === d.label ? 'selected' : ''} onClick={() => setBooking((c) => ({ ...c, date: d.label }))} key={d.label}><small>{d.wd}</small><strong>{d.d}</strong><span>{d.m}</span></button>)}</div></div>}

            {step === 4 && <div className="booking-step"><h3>Welche Uhrzeit passt?</h3><p>Ihr Wunschtermin: {booking.date}. Wir bestätigen die Uhrzeit persönlich.</p>{[['Vormittag', mornings], ['Nachmittag', afternoons]].map(([label, times]) => <div className="time-group" key={label as string}><p className="eyebrow">{label as string}</p><div className="time-grid">{(times as string[]).map((t) => <button className={booking.time === t ? 'selected' : ''} onClick={() => setBooking((c) => ({ ...c, time: t }))} key={t}>{t}</button>)}</div></div>)}</div>}

            {step === 5 && <form className="booking-step booking-form" onSubmit={submitBooking}><h3>Wie dürfen wir Sie erreichen?</h3><p>Ihre Anfrage wird per WhatsApp an unser Team gesendet.</p><div className="form-grid"><label>Vor- und Nachname<input required name="name" placeholder="Ihr Name" /></label><label>Telefonnummer<input required name="phone" type="tel" placeholder={PHONE} /></label><label>E-Mail-Adresse<input required name="email" type="email" placeholder="ihre@email.de" /></label><label>Ihre Nachricht <span>(optional)</span><textarea name="note" placeholder="Was möchten Sie uns noch mitteilen?" /></label></div><label className="privacy"><input required type="checkbox" /> <span>Ich stimme zu, dass meine Angaben zur Terminvereinbarung per WhatsApp übermittelt werden. <u>Datenschutz</u></span></label><button className="button button-gold form-submit" type="submit">Per WhatsApp anfragen <ArrowUpRight size={16} /></button></form>}

            <div className="booking-navigation">{step > 1 ? <button className="back-button" onClick={() => setStep((s) => Math.max(1, s - 1))}><ArrowLeft size={16} /> Zurück</button> : <span />}{step < 5 && <button className="button button-dark" onClick={() => setStep((s) => Math.min(5, s + 1))}>Weiter <ArrowRight size={16} /></button>}</div>
          </div>
          <aside className="booking-summary"><p className="eyebrow">Ihre Auswahl</p><h3>Terminübersicht</h3><div className="summary-image"><img src={booking.service.image} alt="" /></div>
            {[['Behandlung', booking.service.name], ['Dauer', booking.service.duration], ['Preis', booking.service.price], ['Ärztliche Begleitung', booking.doctor?.name ?? anyDoctor], ['Wunschtermin', `${booking.date} · ${booking.time} Uhr`]].map(([l, v]) => <div className="summary-line" key={l}><span>{l}</span><strong>{v}</strong></div>)}
            <div className="summary-note"><Check size={15} /> Unverbindliche Anfrage · Bestätigung durch unser Team</div></aside></>}
        </div></div>}
      </div>
    </>
  );
}

export default App;