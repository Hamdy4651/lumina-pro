import { useEffect, useState, type FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Instagram,
  Menu,
  Minus,
  MoveHorizontal,
  Phone,
  Plus,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const heroImage = '/lumina-hero.jpeg';
const portraitImage = 'https://images.pexels.com/photos/6874749/pexels-photo-6874749.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';
const portraitTwo = 'https://images.pexels.com/photos/33334711/pexels-photo-33334711.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';
const portraitThree = 'https://images.pexels.com/photos/670380/pexels-photo-670380.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';
const clinicImage = 'https://images.pexels.com/photos/7789603/pexels-photo-7789603.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400';
const clinicImageTwo = 'https://images.pexels.com/photos/7789616/pexels-photo-7789616.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400';
const clinicImageThree = 'https://images.pexels.com/photos/6627918/pexels-photo-6627918.jpeg?auto=compress&cs=tinysrgb&h=1000&w=1400';
const beforeImage = 'https://images.pexels.com/photos/39525267/pexels-photo-39525267.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';
const afterImage = 'https://images.pexels.com/photos/30148072/pexels-photo-30148072.jpeg?auto=compress&cs=tinysrgb&h=1000&w=800';

type Service = { name: string; description: string; duration: string; price: string; image: string };
type Doctor = { name: string; specialty: string; image: string };

type Booking = {
  service: Service;
  doctor: Doctor | null;
  date: string;
  time: string;
};

const services: Service[] = [
  { name: 'Botox · 4 Zonen', description: 'Vier Zonen präzise behandeln – für eine frische, natürliche Ausstrahlung.', duration: 'ca. 30 Min.', price: '240 €', image: portraitThree },
  { name: 'Jede weitere Botox-Zone', description: 'Ihre Behandlung flexibel erweitern – jede zusätzliche Zone zum festen Preis.', duration: 'ca. 15 Min.', price: '59 €', image: clinicImageTwo },
  { name: 'Hyaluronsäure & Filler', description: 'Ästhetische Präzision mit hochwertigen Fillern – ganz ohne Skalpell.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: beforeImage },
  { name: 'Russische Lippen-Technik', description: 'Definierte Lippen mit Juvederm und einem besonders natürlichen Ergebnis.', duration: 'ca. 45 Min.', price: '219 € statt 240 €', image: portraitImage },
  { name: 'Doppelkinn · Lemon Bottle', description: 'Die moderne Injektionslipolyse für sichtbare Ergebnisse ohne OP.', duration: '3 Sitzungen', price: '299 € statt 360 €', image: afterImage },
  { name: 'Skin Booster mit Profhilo', description: 'Zellaktivierung und intensive Feuchtigkeit für vitalere Haut.', duration: '3 Sitzungen', price: '599 € statt 750 €', image: portraitTwo },
  { name: 'Skin Booster & PRP', description: 'Regeneration trifft Feuchtigkeitskick – für sichtbar strahlende Haut.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: clinicImage },
  { name: 'HydraFacial & Microneedling', description: 'Tiefenpflege und Hauterneuerung in einer wirkungsvollen Kombination.', duration: 'ca. 60 Min.', price: 'Preis auf Anfrage', image: clinicImageTwo },
  { name: 'Infusionen & Vitamine', description: 'Vitamine, Antioxidantien und Nährstoffe gezielt für Körper und Haut.', duration: 'ca. 45 Min.', price: 'Preis auf Anfrage', image: clinicImageThree },
  { name: 'Anti-Aging Kombi', description: 'Botox, Filler und Skin Booster für ein sichtbar verjüngtes Erscheinungsbild.', duration: 'individuell', price: 'Preis auf Anfrage', image: afterImage },
];

const doctors: Doctor[] = [
  { name: 'Dr. med. Lena Hoffmann', specialty: 'Ästhetische Medizin & Dermatologie', image: portraitImage },
  { name: 'Dr. med. Karim Aydin', specialty: 'Plastische & Ästhetische Chirurgie', image: portraitTwo },
  { name: 'Dr. med. Sophie Brandt', specialty: 'Ästhetische Medizin', image: portraitThree },
];

const faqs = [
  ['Wie finde ich die richtige Behandlung?', 'In einem persönlichen Beratungsgespräch nehmen wir uns Zeit, Ihre Wünsche und die Möglichkeiten Ihrer Haut genau zu verstehen. Erst danach empfehlen wir eine Behandlung – transparent, ehrlich und ohne Verkaufsdruck.'],
  ['Wie lange hält das Ergebnis?', 'Das hängt von der Behandlung, der Region und Ihrem individuellen Stoffwechsel ab. Bei Botulinumtoxin rechnen wir meist mit drei bis sechs Monaten, bei Fillern oft mit neun bis zwölf Monaten.'],
  ['Ist eine Behandlung schmerzhaft?', 'Die meisten Behandlungen werden als sehr gut tolerierbar empfunden. Wir verwenden bei Bedarf eine lokale Betäubung und arbeiten mit besonders feinen Kanülen.'],
  ['Was muss ich vor dem Termin beachten?', 'Bitte kommen Sie möglichst ohne Make-up und informieren Sie uns über Medikamente, Allergien und bestehende Erkrankungen. Weitere Hinweise erhalten Sie vorab persönlich von uns.'],
  ['Gibt es eine Ausfallzeit?', 'Viele Behandlungen sind direkt gesellschaftsfähig. Leichte Rötungen oder Schwellungen können je nach Behandlung für kurze Zeit auftreten und klingen in der Regel schnell ab.'],
];

const navItems = ['Start', 'Über uns', 'Behandlungen', 'Vorher & Nachher', 'Team', 'Bewertungen', 'FAQ'];

function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [booking, setBooking] = useState<Booking>({ service: services[0], doctor: null, date: 'Do, 16. Mai', time: '10:30' });
  const [faqOpen, setFaqOpen] = useState(0);
  const [slider, setSlider] = useState(54);
  const [activeCase, setActiveCase] = useState(0);
  const [mobileNav, setMobileNav] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1750);
    const revealTargets = document.querySelectorAll<HTMLElement>('main > section:not(.hero)');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((target) => {
      target.classList.add('reveal-target');
      observer.observe(target);
    });

    return () => {
      window.clearTimeout(loadingTimer);
      observer.disconnect();
    };
  }, []);

  const openBooking = (service?: Service) => {
    if (service) setBooking((current) => ({ ...current, service }));
    setBookingStep(1);
    setConfirmed(false);
    setFormError('');
    setBookingOpen(true);
  };

  const nextStep = () => setBookingStep((step) => Math.min(5, step + 1));
  const previousStep = () => setBookingStep((step) => Math.max(1, step - 1));

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from('lumina_appointments').insert({
      service: booking.service.name,
      doctor: booking.doctor?.name ?? 'Egal, wer zuerst frei ist',
      appointment_date: '2026-05-16',
      appointment_time: booking.time,
      duration: booking.service.duration,
      price: booking.service.price,
      name: String(form.get('name') ?? ''),
      phone: String(form.get('phone') ?? ''),
      email: String(form.get('email') ?? ''),
      note: String(form.get('note') ?? ''),
    });
    setSaving(false);
    if (error) {
      setFormError('Ihre Anfrage konnte gerade nicht gesendet werden. Bitte rufen Sie uns direkt an.');
      return;
    }
    setConfirmed(true);
  };

  return (
    <>
      <div className={`preloader ${isLoading ? '' : 'is-hidden'}`} aria-hidden="true">
        <div className="preloader-word"><span>L</span><span>U</span><span>M</span><span>I</span><span>N</span><span>A</span></div>
        <div className="preloader-line" />
        <p>ÄSTHETISCHE MEDIZIN · BOCHUM</p>
      </div>
      <div className="site-shell">
      <header className="site-header">
        <a href="#start" className="brand" aria-label="LUMINA Klinik Startseite">
          <span className="brand-mark">L</span><span>LUMINA</span><small>KLINIK</small>
        </a>
        <nav className={`main-nav ${mobileNav ? 'is-open' : ''}`}>
          {navItems.map((item) => <a href={`#${item === 'Start' ? 'start' : item === 'Über uns' ? 'warum' : item === 'Behandlungen' ? 'behandlungen' : item === 'Vorher & Nachher' ? 'vorher' : item === 'Team' ? 'team' : item === 'Bewertungen' ? 'stimmen' : 'faq'}`} key={item} onClick={() => setMobileNav(false)}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+4915777779962"><Phone size={15} /> 015 77777 9962</a>
          <button className="button button-gold" onClick={() => openBooking()}>Termin buchen <ArrowUpRight size={16} /></button>
        </div>
        <button className="menu-button" aria-label="Menü öffnen" onClick={() => setMobileNav((open) => !open)}>{mobileNav ? <X /> : <Menu />}</button>
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
          <div className="hero-meta"><div><strong>4,9</strong><span>von 5 · 535 Bewertungen</span></div><a href="tel:+4915777779962"><Phone size={15} /> 015 77777 9962</a></div>
          <div className="trust-grid">{[['01', 'Zentrale Lage', 'Mitten in Bochum.'], ['02', 'Erfahrenes Team', 'Medizin mit Haltung.'], ['03', 'Moderne Technik', 'Präzise. Sicher.'], ['04', 'Persönliche Betreuung', 'Zeit, die Ihnen gehört.']].map(([number, title, text]) => <div className="trust-card" key={number}><span className="card-number">{number}</span><strong>{title}</strong><small>{text}</small></div>)}</div>
          <div className="scroll-note"><span /> Scrollen</div>
        </section>

        <section className="intro-section light-section" id="warum">
          <div className="section-head"><p className="eyebrow">01 · Warum LUMINA</p><span className="section-rule" /></div>
          <div className="intro-grid"><div><h2>Schönheit beginnt<br />mit <em>Vertrauen.</em></h2><p className="lead-copy">Wir glauben nicht an ein neues Gesicht. Wir glauben an den besten, entspanntesten Ausdruck von Ihnen.</p><a className="text-link dark-link" href="#team">LUMINA kennenlernen <ArrowUpRight size={16} /></a></div><div className="intro-image-wrap"><img src={portraitTwo} alt="Natürliches Portrait einer Patientin" /><div className="floating-note"><Sparkles size={18} /><span>Medizinische Präzision<br /><b>mit menschlicher Wärme</b></span></div></div></div>
          <div className="pillar-grid">{[['01', 'Ruhe & Vertrauen', 'Sie werden gesehen, gehört und verstanden.'], ['02', 'Moderne Diagnostik', 'Wir entscheiden auf Basis von Wissen, nicht von Trends.'], ['03', 'Persönlich betreut', 'Eine feste Ansprechpartnerin für Ihren gesamten Weg.'], ['04', 'Ehrlich beraten', 'Wir empfehlen nur, was wirklich zu Ihnen passt.']].map(([number, title, text]) => <div className="pillar" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>)}</div>
        </section>

        <section className="before-section dark-section" id="vorher">
          <div className="section-head light-head"><p className="eyebrow">02 · Vorher & Nachher</p><span className="section-rule" /></div>
          <div className="before-heading"><h2>Veränderung,<br /><em>die bleibt.</em></h2><p>Unsere Ergebnisse sind so individuell wie die Menschen, die zu uns kommen. Natürlichkeit ist dabei unser Maßstab.</p></div>
          <div className="case-layout"><div className="case-slider"><div className="case-image after"><img src={afterImage} alt="Beispiel nach einer Behandlung" /></div><div className="case-image before" style={{ width: `${slider}%` }}><img src={beforeImage} alt="Beispiel vor einer Behandlung" /></div><div className="slider-divider" style={{ left: `${slider}%` }}><span><MoveHorizontal size={16} /></span></div><input className="range-slider" type="range" min="0" max="100" value={slider} onChange={(event) => setSlider(Number(event.target.value))} aria-label="Vorher-Nachher Vergleich verschieben" /><div className="slider-label before-label">Vorher</div><div className="slider-label after-label">Nachher</div></div><div className="case-info"><div className="case-tabs">{['01', '02', '03'].map((item, index) => <button className={activeCase === index ? 'active' : ''} onClick={() => setActiveCase(index)} key={item}>{item}</button>)}</div><p className="eyebrow">Fallstudie {String(activeCase + 1).padStart(2, '0')}</p><h3>Harmonische Lippenkontur</h3><p>Eine sanfte Korrektur, die den Ausdruck bewahrt und die natürliche Lippenform unterstreicht.</p><div className="case-details"><div><span>Behandlung</span><strong>Hyaluron-Filler</strong></div><div><span>Produkte</span><strong>0,5 ml</strong></div></div><small>Ergebnisse können individuell variieren. Abbildungen dienen der Orientierung.</small></div></div>
        </section>

        <section className="services-section light-section" id="behandlungen">
          <div className="section-head"><p className="eyebrow">03 · Behandlungen</p><span className="section-rule" /></div><div className="section-title-row"><h2>Für Ihren<br /><em>Moment.</em></h2><p>Jede Behandlung beginnt mit einem Gespräch. Entdecken Sie unsere Möglichkeiten – oder lassen Sie sich persönlich beraten.</p></div>
          <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.name}><div className="service-image"><img src={service.image} alt={service.name} /><span>{String(index + 1).padStart(2, '0')}</span></div><div className="service-body"><h3>{service.name}</h3><p>{service.description}</p><div className="service-meta"><span><Clock3 size={14} /> {service.duration}</span><strong>{service.price}</strong></div><button className="service-book" onClick={() => openBooking(service)}>Termin buchen <ArrowUpRight size={15} /></button></div></article>)}</div>
          <div className="service-banner"><div><p className="eyebrow">Ihre Frage, unser Rat</p><h3>Nicht sicher, welche<br /><em>Behandlung</em> Sie brauchen?</h3></div><button className="button button-outline" onClick={() => openBooking(services[services.length - 1])}>Beratung anfragen <ArrowUpRight size={16} /></button></div>
        </section>

        <section className="clinic-section dark-section"><div className="clinic-mosaic"><img className="clinic-main" src={clinicImage} alt="Behandlungsraum der LUMINA Klinik" /><img className="clinic-small" src={clinicImageTwo} alt="Heller Raum in der Klinik" /><div className="mosaic-caption"><span className="eyebrow">04 · Unsere Praxis</span><p>Ein Ort, an dem Sie<br /><em>ankommen.</em></p></div></div><div className="clinic-content"><p className="eyebrow">Die LUMINA Atmosphäre</p><h2>Privat. Persönlich.<br /><em>Unaufgeregt.</em></h2><p className="lead-copy">Von der ersten Begrüßung bis zur Nachsorge: In unserer Praxis in Bochum geht es um Sie. Um Ihre Fragen, Ihre Wünsche und um das gute Gefühl, in besten Händen zu sein.</p><div className="feature-row">{[['01', 'Diskretion', 'Ein geschützter Raum für Ihre Entscheidungen.'], ['02', 'Qualität', 'Medizinische Standards ohne Kompromisse.'], ['03', 'Zeit', 'Beratung, die nicht auf die Uhr schaut.'], ['04', 'Haltung', 'Schönheit, die zu Ihnen gehört.']].map(([n, title, text]) => <div className="feature-tile" key={n}><span>{n}</span><strong>{title}</strong><p>{text}</p></div>)}</div></div></section>

        <section className="team-section light-section" id="team"><div className="section-head"><p className="eyebrow">05 · Unser Team</p><span className="section-rule" /></div><div className="team-intro"><div><h2>In guten Händen.<br /><em>Wirklich.</em></h2></div><p>Unser Team verbindet medizinische Expertise mit einem feinen Gespür für das, was Sie ausmacht.</p></div><div className="lead-doctor"><div className="doctor-portrait"><img src={portraitImage} alt="Dr. med. Lena Hoffmann" /><span>Ärztliche Leitung</span></div><div className="doctor-copy"><p className="eyebrow">Dr. med. Lena Hoffmann</p><h3>„Natürlichkeit ist<br />kein Kompromiss.“</h3><p>Als Fachärztin für Dermatologie und ästhetische Medizin begleitet Dr. Hoffmann ihre Patientinnen und Patienten seit über 12 Jahren mit Präzision, Empathie und einem klaren Blick für das Wesentliche.</p><div className="timeline">{['Fachärztin für Dermatologie', 'Zusatzbezeichnung Ästhetische Medizin', 'Mitglied der DGBT & DGPRÄC'].map((item, index) => <div key={item}><span>0{index + 1}</span>{item}</div>)}</div></div></div><div className="doctor-grid">{doctors.slice(1).map((doctor) => <div className="doctor-card" key={doctor.name}><img src={doctor.image} alt={doctor.name} /><p className="eyebrow">{doctor.specialty}</p><h3>{doctor.name}</h3></div>)}<div className="team-card"><span className="card-number">+</span><h3>Und ein Team,<br />das Sie kennt.</h3><p>Empfang, Assistenz und Nachsorge: Wir sind da, bevor Sie fragen müssen.</p></div></div></section>

        <section className="location-section warm-section"><div className="location-copy"><p className="eyebrow">06 · Standort & Zeiten</p><h2>Mitten in<br /><em>Bochum.</em></h2><p className="lead-copy">Unsere Praxis liegt zentral in Bochum – ruhig, diskret und gut erreichbar.</p><div className="address"><strong>Brückstr. 44<br />44787 Bochum</strong><a className="text-link dark-link" href="https://maps.google.com/?q=Brückstrasse+44+Bochum" target="_blank" rel="noreferrer">Route planen <ArrowUpRight size={15} /></a></div><div className="hours"><div><span>Mo – Sa</span><strong>Nach Terminvereinbarung</strong></div><div><span>Sonntag</span><strong>Geschlossen</strong></div><div><span>Kontakt</span><strong>Auch per WhatsApp</strong></div></div><button className="button button-dark" onClick={() => openBooking()}>Termin vereinbaren <ArrowUpRight size={16} /></button></div><div className="map-card"><div className="map-grid" /><div className="map-label"><span className="pin-dot" /> LUMINA KLINIK</div><div className="map-roads road-one" /><div className="map-roads road-two" /></div></section>

        <section className="reviews-section dark-section" id="stimmen"><div className="section-head light-head"><p className="eyebrow">07 · Kundenstimmen</p><span className="section-rule" /></div><div className="review-layout"><div><div className="review-stars">★★★★★</div><blockquote>„Ich habe mich vom ersten Moment an unglaublich wohl und verstanden gefühlt. Das Ergebnis ist genau das, was ich mir gewünscht habe: frisch, aber immer noch ich.“</blockquote><p className="review-author">— Julia M. · Patientin seit 2022</p></div><div className="review-side"><div className="rating-big"><strong>4,9</strong><span>/ 5</span></div><div className="rating-stars">★★★★★</div><p>535 Bewertungen auf Google</p><a className="text-link light-link" href="#stimmen">Alle Bewertungen <ArrowUpRight size={16} /></a></div></div><div className="stats-row"><div><strong>5/5</strong><span>Behandlungserlebnis</span></div><div><strong>2.800+</strong><span>Zufriedene Patient:innen</span></div><div><strong>100%</strong><span>Weiterempfehlung</span></div></div></section>

        <section className="faq-section light-section" id="faq"><div className="faq-heading"><p className="eyebrow">08 · FAQ</p><h2>Was Sie noch<br /><em>wissen möchten.</em></h2><p>Die wichtigsten Antworten für Ihre Entscheidung. Und wenn etwas offen bleibt: Wir sind nur einen Anruf entfernt.</p><a className="text-link dark-link" href="tel:+4915777779962">Direkt mit uns sprechen <Phone size={15} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${faqOpen === index ? 'open' : ''}`} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}><span>{question}</span>{faqOpen === index ? <Minus size={18} /> : <Plus size={18} />}</button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>

        <section className="final-cta"><img src={heroImage} alt="Ruhiger Moment in warmem Licht" /><div className="final-overlay" /><div className="final-content"><p className="eyebrow light">Ihr nächster Schritt</p><h2>Ihr neues Ich<br />beginnt mit<br /><em>einem Gespräch.</em></h2><button className="button button-gold" onClick={() => openBooking()}>Termin buchen <ArrowUpRight size={16} /></button></div></section>
      </main>

      <footer className="site-footer dark-section"><div className="footer-top"><div><a className="brand footer-brand" href="#start"><span className="brand-mark">L</span><span>LUMINA</span><small>KLINIK</small></a><p>Ästhetische Medizin<br />mit Haltung.</p></div><div className="footer-links"><div><p className="eyebrow light">Kontakt</p><a href="tel:+4915777779962">015 77777 9962</a><a href="https://wa.me/4915777779962" target="_blank" rel="noreferrer">WhatsApp schreiben</a></div><div><p className="eyebrow light">Besuchen Sie uns</p><span>Brückstr. 44</span><span>44787 Bochum</span></div><div><p className="eyebrow light">Folgen Sie uns</p><a href="#start"><Instagram size={17} /> Instagram</a></div></div></div><div className="footer-wordmark">LUMINA</div><div className="footer-bottom"><span>© 2026 LUMINA Klinik</span><span>Impressum · Datenschutz</span><span>Made with intention</span></div></footer>

      {bookingOpen && <div className="booking-overlay"><div className="booking-modal"><button className="booking-close" onClick={() => setBookingOpen(false)} aria-label="Buchung schließen"><X /></button>{confirmed ? <div className="confirmation"><div className="check-circle"><Check size={38} /></div><p className="eyebrow">Ihre Anfrage ist angekommen</p><h2>Wir freuen uns<br /><em>auf Sie.</em></h2><p>Vielen Dank, {booking.service.name} ist für Sie vorgemerkt. Wir melden uns in Kürze persönlich bei Ihnen.</p><div className="confirmation-summary"><span>{booking.service.name}</span><strong>{booking.date} · {booking.time}</strong><small>{booking.doctor?.name ?? 'Egal, wer zuerst frei ist'}</small></div><button className="button button-gold" onClick={() => setBookingOpen(false)}>Zurück zur Website <ArrowRight size={16} /></button></div> : <><div className="booking-main"><div className="booking-head"><div><p className="eyebrow">Ihre persönliche Buchung</p><h2>Schritt {bookingStep} <span>/ 05</span></h2></div><div className="progress-track"><span style={{ width: `${bookingStep * 20}%` }} /></div></div>{bookingStep === 1 && <div className="booking-step"><h3>Welche Behandlung darf es sein?</h3><p>Wählen Sie Ihren Wunsch – wir beraten Sie natürlich gern vor Ort.</p><div className="booking-service-grid">{services.map((service) => <button className={`booking-service ${booking.service.name === service.name ? 'selected' : ''}`} onClick={() => setBooking((current) => ({ ...current, service }))} key={service.name}><img src={service.image} alt="" /><span>{service.name}</span><small>{service.duration} · {service.price}</small></button>)}</div></div>}{bookingStep === 2 && <div className="booking-step"><h3>Wer darf Sie begleiten?</h3><p>Wählen Sie Ihre Wunschärztin oder Ihren Wunscharzt.</p><div className="booking-doctors"><button className={`doctor-choice any-choice ${booking.doctor === null ? 'selected' : ''}`} onClick={() => setBooking((current) => ({ ...current, doctor: null }))}><div className="any-icon"><Sparkles size={22} /></div><span>Egal, wer zuerst frei ist</span><small>Wir finden den passenden Termin für Sie.</small></button>{doctors.map((doctor) => <button className={`doctor-choice ${booking.doctor?.name === doctor.name ? 'selected' : ''}`} onClick={() => setBooking((current) => ({ ...current, doctor }))} key={doctor.name}><img src={doctor.image} alt="" /><span>{doctor.name}</span><small>{doctor.specialty}</small></button>)}</div></div>}{bookingStep === 3 && <div className="booking-step"><h3>Wann passt es für Sie?</h3><p>Wählen Sie einen Tag. Die markierten Tage sind aktuell verfügbar.</p><div className="date-strip">{['Do, 16. Mai', 'Fr, 17. Mai', 'Mo, 20. Mai', 'Di, 21. Mai', 'Mi, 22. Mai'].map((date, index) => <button className={booking.date === date ? 'selected' : ''} onClick={() => setBooking((current) => ({ ...current, date }))} key={date}><small>{date.split(',')[0]}</small><strong>{date.split(' ')[1]}</strong><span>{index === 0 ? 'Heute' : 'frei'}</span></button>)}</div><div className="calendar-placeholder"><CalendarDays size={22} /><span>Mai 2026</span><ChevronDown size={16} /></div><div className="calendar-days">{['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => <span key={day}>{day}</span>)}{Array.from({ length: 35 }, (_, index) => <button className={[3, 10, 17, 24].includes(index) ? 'disabled' : index === 17 ? 'selected' : ''} key={index}>{index < 4 ? '' : index - 3}</button>)}</div></div>}{bookingStep === 4 && <div className="booking-step"><h3>Welche Uhrzeit passt?</h3><p>Alle Zeiten werden automatisch an die Länge Ihrer Behandlung angepasst.</p><div className="time-group"><p className="eyebrow">Vormittag</p><div className="time-grid">{['08:30', '09:15', '10:30', '11:15', '12:00'].map((time, index) => <button className={`${booking.time === time ? 'selected' : ''} ${index === 1 ? 'unavailable' : ''}`} disabled={index === 1} onClick={() => setBooking((current) => ({ ...current, time }))} key={time}>{time}</button>)}</div></div><div className="time-group"><p className="eyebrow">Nachmittag</p><div className="time-grid">{['13:30', '14:15', '15:30', '16:15', '17:00'].map((time) => <button className={booking.time === time ? 'selected' : ''} onClick={() => setBooking((current) => ({ ...current, time }))} key={time}>{time}</button>)}</div></div></div>}{bookingStep === 5 && <form className="booking-step booking-form" onSubmit={submitBooking}><h3>Wie dürfen wir Sie erreichen?</h3><p>Wir bestätigen Ihre Anfrage persönlich innerhalb eines Werktages.</p><div className="form-grid"><label>Vor- und Nachname<input required name="name" placeholder="Ihr Name" /></label><label>Telefonnummer<input required name="phone" type="tel" placeholder="015 77777 9962" /></label><label>E-Mail-Adresse<input required name="email" type="email" placeholder="ihre@email.de" /></label><label>Ihre Nachricht <span>(optional)</span><textarea name="note" placeholder="Was möchten Sie uns noch mitteilen?" /></label></div><label className="privacy"><input required type="checkbox" /> <span>Ich stimme der Verarbeitung meiner Daten zur Terminvereinbarung zu. <u>Datenschutz</u></span></label>{formError && <p className="form-error">{formError}</p>}<button className="button button-gold form-submit" type="submit" disabled={saving}>{saving ? 'Wird gesendet …' : 'Verbindlich anfragen'} <ArrowUpRight size={16} /></button></form>}<div className="booking-navigation">{bookingStep > 1 ? <button className="back-button" onClick={previousStep}><ArrowLeft size={16} /> Zurück</button> : <span />}{bookingStep < 5 && <button className="button button-dark" onClick={nextStep}>Weiter <ArrowRight size={16} /></button>}</div></div><aside className="booking-summary"><p className="eyebrow">Ihre Auswahl</p><h3>Terminübersicht</h3><div className="summary-image"><img src={booking.service.image} alt="" /></div><div className="summary-line"><span>Behandlung</span><strong>{booking.service.name}</strong></div><div className="summary-line"><span>Dauer</span><strong>{booking.service.duration}</strong></div><div className="summary-line"><span>Preis</span><strong>{booking.service.price}</strong></div><div className="summary-line"><span>Ärztliche Begleitung</span><strong>{booking.doctor?.name ?? 'Egal, wer zuerst frei ist'}</strong></div><div className="summary-line"><span>Wunschtermin</span><strong>{booking.date}<br />{booking.time} Uhr</strong></div><div className="summary-note"><Check size={15} /> Kostenlos stornierbar bis 24h vorher</div></aside></>}</div></div>}
      </div>
    </>
  );
}

export default App;
