import { useState, useEffect, useRef, useCallback } from "react";

const APP_URL = "https://app.reroom.today?login=true";
type Page = "home" | "datenschutz" | "impressum" | "kontakt";

/* ═══════════════ ICONS ═══════════════ */

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowBack = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M11 19l-7-7 7-7" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ═══════════════ BEFORE/AFTER HERO ═══════════════ */

function HeroArt() {
  const [split, setSplit] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const pct = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100));
    setSplit(pct);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) setFromClientX(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [setFromClientX]);

  return (
    <div
      className="hero-art"
      ref={ref}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* Before (full) */}
      <svg className="room-svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wallBefore" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#CFC8B8" />
            <stop offset="1" stopColor="#9F9888" />
          </linearGradient>
          <linearGradient id="floorBefore" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8B7A66" />
            <stop offset="1" stopColor="#6E5E4D" />
          </linearGradient>
        </defs>
        <rect width="400" height="330" fill="url(#wallBefore)" />
        <rect y="330" width="400" height="170" fill="url(#floorBefore)" />
        <rect x="70" y="260" width="160" height="70" fill="#6E6556" opacity="0.65" rx="4" />
        <rect x="260" y="220" width="80" height="110" fill="#7A6E5D" opacity="0.55" rx="3" />
        <circle cx="340" cy="210" r="6" fill="#E8D394" opacity="0.7" />
      </svg>
      {/* After (clipped) */}
      <svg
        className="room-svg"
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      >
        <defs>
          <linearGradient id="wallAfter" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#EFE9DC" />
            <stop offset="1" stopColor="#D9CFBB" />
          </linearGradient>
          <linearGradient id="floorAfter" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#B89874" />
            <stop offset="1" stopColor="#8F7250" />
          </linearGradient>
        </defs>
        <rect width="400" height="330" fill="url(#wallAfter)" />
        <rect y="330" width="400" height="170" fill="url(#floorAfter)" />
        <ellipse cx="200" cy="440" rx="170" ry="36" fill="#C07C5E" opacity="0.55" />
        <rect x="60" y="310" width="200" height="90" rx="18" fill="#8DA592" />
        <rect x="60" y="290" width="200" height="40" rx="12" fill="#9CB89A" />
        <rect x="70" y="300" width="55" height="28" rx="8" fill="#FFFFFF" opacity="0.5" />
        <rect x="135" y="300" width="55" height="28" rx="8" fill="#FFFFFF" opacity="0.4" />
        <rect x="200" y="300" width="55" height="28" rx="8" fill="#E8D394" opacity="0.7" />
        <rect x="285" y="330" width="60" height="60" rx="6" fill="#6E5141" />
        <rect x="290" y="320" width="50" height="10" rx="3" fill="#543F33" />
        <rect x="300" y="240" width="30" height="90" rx="5" fill="#3A4E3A" />
        <ellipse cx="315" cy="240" rx="32" ry="26" fill="#4E6A4F" />
        <ellipse cx="300" cy="225" rx="18" ry="22" fill="#5A7A5B" />
        <ellipse cx="330" cy="228" rx="20" ry="24" fill="#3E5C3F" />
        <rect x="120" y="130" width="80" height="100" fill="#FFFFFF" stroke="#1F2A1E" strokeWidth="1" opacity="0.9" />
        <rect x="128" y="138" width="64" height="84" fill="#C8D6C3" />
        <line x1="280" y1="0" x2="280" y2="80" stroke="#1F2A1E" strokeWidth="0.5" />
        <ellipse cx="280" cy="95" rx="30" ry="14" fill="#E8D394" />
      </svg>

      <div className="ba-tag left">Vorher</div>
      <div className="ba-tag right">Nachher</div>

      <div
        className="ba-split"
        style={{ left: `calc(${split}% - 1.5px)` }}
        onMouseDown={(e) => { dragging.current = true; setFromClientX(e.clientX); }}
      >
        <div className="ba-handle">
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" stroke="#1F2A1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="price-pin" style={{ top: "56%", left: "14%" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--sage)" }} />
        <div>
          <div className="mono">IKEA</div>
          <b>€599</b>
        </div>
      </div>
      <div className="price-pin" style={{ top: "66%", right: "14%" }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--clay)" }} />
        <div>
          <div className="mono">Otto</div>
          <b>€179</b>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ LEGAL SHELL ═══════════════ */

function LegalShell({ title, children, onBack }: { title: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)" }}>
      <nav className="nav">
        <div className="wrap nav-inner">
          <button onClick={onBack} style={{ background: "none", padding: 0 }}>
            <div className="logo"><span className="logo-dot" />Reroom</div>
          </button>
          <button onClick={onBack} className="btn btn-ghost" style={{ marginLeft: "auto" }}>
            <ArrowBack size={14} /> Zurück
          </button>
        </div>
      </nav>
      <div className="legal-wrap">
        <h1>{title}</h1>
        {children}
      </div>
      <footer className="footer" style={{ padding: "40px 0 30px" }}>
        <div className="wrap foot-bottom" style={{ border: 0, margin: 0, padding: 0 }}>
          <div>© {new Date().getFullYear()} SIMPLI GMBH · BIELEFELD</div>
          <div>MADE WITH ♡ IN DEUTSCHLAND</div>
        </div>
      </footer>
    </div>
  );
}

function ImpressumPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Impressum" onBack={onBack}>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>Simpli GmbH<br />Am Lenkwerk 9<br />33609 Bielefeld<br />Deutschland</p>
      <h2>Vertreten durch</h2>
      <p>Geschäftsführer: Tim Hoppe &amp; Dennis Melson</p>
      <h2>Kontakt</h2>
      <p>Telefon: +49 15888 725814<br />E-Mail: info@simpli.bot</p>
      <h2>Registereintrag</h2>
      <p>Handelsregister: Amtsgericht Bielefeld<br />Registernummer: HRB 44387</p>
      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE326245802</p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>Tim Hoppe<br />Am Lenkwerk 9<br />33609 Bielefeld</p>
      <h2>EU-Streitschlichtung</h2>
      <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <h2>Haftung für Inhalte</h2>
      <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
      <h2>Haftung für Links</h2>
      <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.</p>
      <h2>Urheberrecht</h2>
      <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
    </LegalShell>
  );
}

function DatenschutzPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Datenschutzerklärung" onBack={onBack}>
      <h2>1. Datenschutz auf einen Blick</h2>
      <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
      <p><strong>Verantwortlich:</strong><br />Simpli GmbH, Am Lenkwerk 9, 33609 Bielefeld<br />E-Mail: info@simpli.bot, Telefon: +49 15888 725814</p>
      <h2>2. Hosting</h2>
      <p>Diese Website wird bei einem externen Dienstleister gehostet (Art. 6 Abs. 1 lit. b DSGVO).</p>
      <h2>3. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten.</p>
      <h2>4. Datenerfassung</h2>
      <p>Der Provider erhebt automatisch Informationen in Server-Log-Dateien.</p>
      <h2>5. Google Fonts</h2>
      <p>Diese Seite nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten.</p>
      <h2>6. KI-generierte Inhalte</h2>
      <p>Reroom nutzt KI zur Generierung von Raumdesign-Vorschlägen. Hochgeladene Fotos werden an Google Gemini und OpenAI übermittelt.</p>
      <h2>7. Zahlungsabwicklung</h2>
      <p>Wir nutzen Stripe für die Zahlungsabwicklung (Art. 6 Abs. 1 lit. b DSGVO).</p>
    </LegalShell>
  );
}

function KontaktPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Kontakt" onBack={onBack}>
      <p style={{ fontSize: 18 }}>Wir freuen uns, von dir zu hören.</p>
      <h2>E-Mail</h2>
      <p><a href="mailto:info@simpli.bot">info@simpli.bot</a></p>
      <h2>Telefon</h2>
      <p><a href="tel:+4915888725814">+49 15888 725814</a> (Mo–Fr, 9–17 Uhr)</p>
      <h2>Adresse</h2>
      <p>Simpli GmbH, Am Lenkwerk 9, 33609 Bielefeld</p>
    </LegalShell>
  );
}

/* ═══════════════ FEATURE CARDS DATA ═══════════════ */

const FEAT_ICONS = {
  home: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-8.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  shop: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M6 7h12l-1 13H7L6 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M9 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
  finder: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.6" /><path d="M9 6l1.5-2h3L15 6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  heart: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  swap: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  family: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" /><path d="M4 21a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.6" /></svg>
  ),
  cart: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M4 7l8 5 8-5M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l2-2h12l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
  ),
  spark: (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
  ),
} as const;

/* ═══════════════ MAIN APP ═══════════════ */

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.location.hash = p === "home" ? "" : p;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace("#", "") as Page;
      if (["datenschutz", "impressum", "kontakt"].includes(hash)) setPage(hash);
      else setPage("home");
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const goToApp = () => { window.location.href = APP_URL; };

  if (page === "impressum") return <ImpressumPage onBack={() => navigate("home")} />;
  if (page === "datenschutz") return <DatenschutzPage onBack={() => navigate("home")} />;
  if (page === "kontakt") return <KontaktPage onBack={() => navigate("home")} />;

  const faqs = [
    { q: "Sind die Möbel wirklich kaufbar?", a: "Ja. Jedes Möbelstück im KI‑Bild wird mit echten Produkten von über 40 Händlern abgeglichen — inkl. IKEA, Otto, Home24 und Westwing. Tippe an, kauf direkt." },
    { q: "Was, wenn mir das Ergebnis nicht gefällt?", a: "Regeneriere so oft du willst. Oder tausche einzelne Möbel aus, ohne den ganzen Raum neu generieren zu müssen." },
    { q: "Wie lange dauert das?", a: "Ungefähr 20 Sekunden pro Rendering. Kaffee‑Zeit." },
    { q: "Kann ich mit meiner Familie teilen?", a: "Absolut. Teile einen Link per WhatsApp. Kommentare und Reaktionen kommen direkt in deine App zurück." },
    { q: "Bleiben meine Räume und Varianten gespeichert?", a: "Ja — unter „Mein Zuhause“. Alles bleibt erhalten. Du kannst Varianten vergleichen, umbenennen und jederzeit neue hinzufügen." },
    { q: "Was ist mit Datenschutz?", a: "Deine Fotos werden in der EU verarbeitet und nach 30 Tagen automatisch gelöscht. Kein Training auf deinen Daten. DSGVO‑konform." },
  ];

  return (
    <div>
      {/* RIBBON */}
      <div className="ribbon"><span>Neu</span> Für die ersten 1.000 Familien: 3 Räume gratis generieren</div>

      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-inner">
          <div className="logo"><span className="logo-dot" />Reroom</div>
          <div className="nav-links">
            <a href="#how">So geht's</a>
            <a href="#features">Features</a>
            <a href="#stimmen">Stimmen</a>
            <a href="#preis">Preise</a>
            <a href="#faq">FAQ</a>
          </div>
          <button className="btn btn-ghost" onClick={goToApp} style={{ marginLeft: "auto" }}>Einloggen</button>
          <button className="btn btn-dark" onClick={goToApp}>Kostenlos starten</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <div className="eyebrow">
              <span className="avatars"><span /><span /><span /></span>
              4.812 Mamas haben ihr Zuhause schon neu erfunden
            </div>
            <h1>Ein Foto.<br />Ein neues <em>Zuhause.</em></h1>
            <p className="hero-sub">
              Reroom verwandelt dein Foto in deine Traum‑Einrichtung — mit echten,
              kaufbaren Möbeln von 40+ deutschen Händlern. Kein Pinterest‑Sammeln mehr.
              Kein Stundenlang‑Scrollen. Nur du, dein Raum, und der Moment, in dem alles passt.
            </p>
            <div className="hero-ctas">
              <button className="btn btn-forest btn-lg" onClick={goToApp}>
                <span>Raum fotografieren</span>
                <ArrowRight />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={goToApp}>Video ansehen (90 Sek.)</button>
            </div>
            <div className="hero-trust">
              <span><b>20 Sek.</b> pro Rendering</span>
              <span className="dot" />
              <span><b>40+</b> Händler</span>
              <span className="dot" />
              <span>Sofa Bjerke auch nachts um 2 kaufbar</span>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* RETAILERS */}
      <section className="wrap retailers">
        <div className="retailers-row">
          <div className="retailers-lbl">Echte Möbel von</div>
          <div className="retailers-logos">
            <span>IKEA</span><span>Otto</span><span>Home24</span><span>Westwing</span>
            <span>Loberon</span><span>Depot</span><span>connox</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap how" id="how">
        <div className="how-head">
          <div className="kicker">So geht's · 3 Schritte</div>
          <h2 style={{ marginTop: 12 }}>Von <em>leerer Wand</em><br />zu fertigem Warenkorb.</h2>
          <p>Keine Pinterest‑Boards. Keine Möbelhausrunden mit drei quengelnden Kindern. Ein Foto reicht.</p>
        </div>
        <div className="steps">
          {/* Step 01 */}
          <div className="step">
            <div className="step-num">01 · FOTO</div>
            <div className="step-visual" style={{ background: "linear-gradient(135deg,#B8AE97,#756B57)" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 240" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
                <rect x="30" y="30" width="240" height="180" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <rect x="40" y="40" width="12" height="12" fill="none" stroke="#fff" strokeWidth="1.5" />
                <rect x="248" y="40" width="12" height="12" fill="none" stroke="#fff" strokeWidth="1.5" />
                <circle cx="150" cy="210" r="20" fill="#fff" />
                <circle cx="150" cy="210" r="14" fill="#9CB89A" />
              </svg>
            </div>
            <h3 className="step-title">Raum <em>fotografieren.</em></h3>
            <p className="step-desc">Weiter Winkel, Tageslicht. Die KI erkennt Maße, Fenster, Stil.</p>
          </div>
          {/* Step 02 */}
          <div className="step">
            <div className="step-num">02 · STIL + BUDGET</div>
            <div className="step-visual" style={{ background: "var(--bg2)" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 240" style={{ position: "absolute", inset: 0 }}>
                <rect x="20" y="20" width="80" height="100" rx="8" fill="#9CB89A" />
                <rect x="110" y="20" width="80" height="100" rx="8" fill="#C07C5E" />
                <rect x="200" y="20" width="80" height="100" rx="8" fill="#E8D394" />
                <rect x="20" y="130" width="260" height="6" rx="3" fill="#D5CDB9" />
                <circle cx="130" cy="133" r="10" fill="#2F4A34" />
                <text x="20" y="168" fontFamily="Geist Mono" fontSize="10" fill="#7A827A" letterSpacing="1.5">BUDGET</text>
                <text x="20" y="190" fontFamily="Instrument Serif" fontSize="28" fill="#1F2A1E">€1.200</text>
              </svg>
            </div>
            <h3 className="step-title">Stil + <em>Budget</em> wählen.</h3>
            <p className="step-desc">8+ Looks von Skandi bis Boho. Wir bleiben im Rahmen.</p>
          </div>
          {/* Step 03 */}
          <div className="step">
            <div className="step-num">03 · KAUFEN</div>
            <div className="step-visual" style={{ background: "var(--forest)" }}>
              <svg width="100%" height="100%" viewBox="0 0 300 240" style={{ position: "absolute", inset: 0 }}>
                <rect x="20" y="30" width="260" height="40" rx="10" fill="#fff" opacity="0.95" />
                <rect x="30" y="42" width="16" height="16" rx="4" fill="#9CB89A" />
                <text x="56" y="55" fontFamily="Geist" fontSize="10" fill="#1F2A1E" fontWeight="500">Sofa Bjerke · IKEA</text>
                <text x="250" y="55" fontFamily="Instrument Serif" fontSize="14" fill="#1F2A1E">€599</text>
                <rect x="20" y="80" width="260" height="40" rx="10" fill="#fff" opacity="0.95" />
                <rect x="30" y="92" width="16" height="16" rx="4" fill="#C07C5E" />
                <text x="56" y="105" fontFamily="Geist" fontSize="10" fill="#1F2A1E" fontWeight="500">Teppich Berber · Otto</text>
                <text x="250" y="105" fontFamily="Instrument Serif" fontSize="14" fill="#1F2A1E">€179</text>
                <rect x="20" y="130" width="260" height="40" rx="10" fill="#fff" opacity="0.95" />
                <rect x="30" y="142" width="16" height="16" rx="4" fill="#E8D394" />
                <text x="56" y="155" fontFamily="Geist" fontSize="10" fill="#1F2A1E" fontWeight="500">Pendellampe · Westwing</text>
                <text x="250" y="155" fontFamily="Instrument Serif" fontSize="14" fill="#1F2A1E">€139</text>
                <rect x="80" y="190" width="140" height="30" rx="99" fill="#9CB89A" />
                <text x="150" y="210" textAnchor="middle" fontFamily="Geist" fontSize="11" fill="#1F2A1E" fontWeight="600">Jetzt kaufen — €917</text>
              </svg>
            </div>
            <h3 className="step-title">Ein <em>Warenkorb</em>, 6 Shops.</h3>
            <p className="step-desc">Wir checken Verfügbarkeit, Lieferzeit und Preis. Du klickst einmal.</p>
          </div>
        </div>
      </section>

      {/* FEATURE: Mein Zuhause */}
      <section className="feature" id="features">
        <div className="wrap feature-grid">
          <div className="feature-copy">
            <div className="kicker">Feature · Mein Zuhause</div>
            <h2 style={{ marginTop: 14 }}>Jedes Zimmer,<br /><em>jede Idee</em> — gespeichert.</h2>
            <p>
              Lege einmal dein Wohnzimmer an. Generiere dann so oft du willst: Boho heute, Skandi
              morgen, Japandi übernächste Woche. Alles bleibt erhalten. Vergleiche Varianten nebeneinander, teile mit deinem Partner, entscheide in Ruhe.
            </p>
            <ul className="feature-bullets">
              <li><span className="check">✓</span> Unbegrenzt viele Räume pro Haushalt</li>
              <li><span className="check">✓</span> Bis zu 10 Varianten pro Raum</li>
              <li><span className="check">✓</span> Preis‑Tracking: dein Warenkorb altert mit dir</li>
            </ul>
            <button className="btn btn-forest btn-lg" onClick={goToApp}>Jetzt anfangen</button>
          </div>
          <div className="feature-visual">
            <div style={{ position: "absolute", inset: 0, padding: 32, background: "var(--bg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
                <div>
                  <div className="kicker">HALLO, ANNA</div>
                  <div style={{ fontFamily: "var(--ff-display)", fontSize: 40, lineHeight: 1, letterSpacing: -1, marginTop: 6 }}>Mein <em>Zuhause.</em></div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 99, background: "var(--clay)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>A</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                {[{ n: "4", l: "Räume" }, { n: "10", l: "Varianten" }, { n: "€1.187", l: "Warenkorb" }].map((s, i) => (
                  <div key={i} style={{ background: "#fff", border: "0.5px solid var(--hair)", borderRadius: 12, padding: 10, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--ff-display)", fontSize: 22 }}>{s.n}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Wohnzimmer", meta: "4 Varianten · vor 2 Std.", tag: "Boho", grad: "linear-gradient(135deg,#9CB89A,#4E6A4F)" },
                  { name: "Schlafzimmer", meta: "2 Varianten · gestern", tag: "Skandi", grad: "linear-gradient(135deg,#1F2A1E,#3A463A)" },
                  { name: "Lenas Zimmer", meta: "3 Varianten · vor 3 Tagen", tag: "Cottage", grad: "linear-gradient(135deg,#C07C5E,#E8D394)" },
                ].map((r) => (
                  <div key={r.name} style={{ background: "#fff", border: "0.5px solid var(--hair)", borderRadius: 14, padding: 10, display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 62, height: 62, borderRadius: 10, background: r.grad }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "var(--ff-display)", fontSize: 20, lineHeight: 1 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{r.meta}</div>
                    </div>
                    <div style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, background: "var(--bg2)" }}>{r.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE: Produkt-Finder */}
      <section className="feature" style={{ background: "var(--bg2)" }}>
        <div className="wrap feature-grid reverse">
          <div className="feature-copy">
            <div className="kicker">Feature · Produkt‑Finder</div>
            <h2 style={{ marginTop: 14 }}>Du <em>siehst</em> es.<br />Wir <em>finden</em> es.</h2>
            <p>
              Im Café ein Sessel entdeckt? Bei der Freundin den Teppich gesehen? Mach ein Foto —
              unser Finder identifiziert Möbelstücke und zeigt dir ähnliche Modelle zu jedem Budget bei
              deutschen Händlern.
            </p>
            <ul className="feature-bullets">
              <li><span className="check">✓</span> Match‑Genauigkeit bis 98%</li>
              <li><span className="check">✓</span> 24 Alternativen im Schnitt, sortierbar nach Preis</li>
              <li><span className="check">✓</span> Speichern, mit Partner teilen, später kaufen</li>
            </ul>
            <button className="btn btn-forest btn-lg" onClick={goToApp}>Finder ausprobieren</button>
          </div>
          <div className="feature-visual" style={{ background: "var(--ink)" }}>
            <div style={{ position: "absolute", inset: 0, padding: 28, color: "#fff" }}>
              <div style={{ fontFamily: "var(--ff-mono)", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>ERKANNT IN 1,2 SEK.</div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
                <div style={{ width: 72, height: 72, borderRadius: 12, background: "var(--clay)" }} />
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>Couchtisch · Rund · Eiche</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>24 Treffer bei 9 Händlern</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                {[
                  { m: "98%", r: "IKEA", n: "Lundby", p: "€249", c: "var(--clay)" },
                  { m: "94%", r: "OTTO", n: "Beistelltisch", p: "€199", c: "var(--moss)" },
                  { m: "91%", r: "HOME24", n: "Rund Massiv", p: "€329", c: "var(--butter)" },
                ].map((card) => (
                  <div key={card.r} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, overflow: "hidden" }}>
                    <div style={{ aspectRatio: "1", background: card.c, opacity: 0.8, position: "relative" }}>
                      <div style={{ position: "absolute", top: 6, left: 6, padding: "3px 7px", background: "var(--forest)", color: "#fff", borderRadius: 99, fontSize: 9, fontFamily: "var(--ff-mono)" }}>{card.m}</div>
                    </div>
                    <div style={{ padding: 8 }}>
                      <div style={{ fontFamily: "var(--ff-mono)", fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>{card.r}</div>
                      <div style={{ fontSize: 11, marginTop: 2 }}>{card.n}</div>
                      <div style={{ fontFamily: "var(--ff-display)", fontSize: 14, marginTop: 2 }}>{card.p}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="wrap feat-grid">
        <div className="feat-head">
          <div>
            <div className="kicker">Alles drin</div>
            <h2 style={{ marginTop: 12 }}>Mehr als nur <em>ein Render.</em></h2>
          </div>
          <div style={{ fontSize: 14, color: "var(--inkSoft)", maxWidth: 320 }}>
            Reroom ist eine komplette Einrichtungs‑App — vom ersten Gedanken bis zum letzten Klick.
          </div>
        </div>
        <div className="feat-cards">
          <div className="feat-card"><div className="ico">{FEAT_ICONS.home}</div><h3>Mein <em>Zuhause</em></h3><p>Alle Räume, alle Varianten, immer da. Wechsle den Stil, nicht das Zimmer.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.shop}</div><h3><em>Shop</em></h3><p>Stöbere durch 80.000+ Möbel von 40+ deutschen Händlern — alles auf einer Seite.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.finder}</div><h3>Produkt‑<em>Finder</em></h3><p>Foto machen, Ähnliches finden. 24 Alternativen pro Möbelstück im Schnitt.</p></div>
          <div className="feat-card accent"><div className="ico">{FEAT_ICONS.heart}</div><h3 style={{ color: "#fff" }}>Favoriten & <em style={{ color: "var(--butter)" }}>Preisalarm</em></h3><p>Sammle Stücke, vergleiche mit der Familie, werde benachrichtigt wenn der Preis fällt.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.swap}</div><h3>Einzelne <em>Stücke tauschen</em></h3><p>Sofa passt, Teppich nicht? Tausche einzelne Möbel — ohne den ganzen Raum neu zu generieren.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.family}</div><h3>Mit der <em>Familie</em> teilen</h3><p>Partner, Oma, beste Freundin — WhatsApp‑Link, Stimmen kommen direkt zurück.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.cart}</div><h3>Ein <em>Warenkorb</em></h3><p>6 Shops, eine Bestellung. Wir bündeln Versand und zeigen die schnellste Lieferoption.</p></div>
          <div className="feat-card"><div className="ico">{FEAT_ICONS.spark}</div><h3>In <em>20 Sekunden</em></h3><p>Eine Kaffee‑Pause. So lange dauert ein Rendering. Abends auf der Couch, morgens fertig.</p></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="tests" id="stimmen">
        <div className="wrap">
          <div className="tests-head">
            <div className="kicker">Stimmen</div>
            <h2 style={{ marginTop: 12 }}>Warum Mamas <em>wiederkommen.</em></h2>
          </div>
          <div className="t-row">
            <div className="tcard">
              <div className="q">„Ich hatte das Wohnzimmer seit vier Jahren nicht mehr angefasst. In einem Nachmittag: drei Varianten, alle bezahlbar, eine umgesetzt."</div>
              <div className="who">
                <div className="av" style={{ background: "var(--clay)" }}>KE</div>
                <div><div className="n">Katrin E.</div><div className="meta">MÜNCHEN · 2 KINDER</div></div>
              </div>
            </div>
            <div className="tcard">
              <div className="q">„Mein Mann und ich haben seit zehn Jahren gestritten, welche Farbe das Schlafzimmer haben soll. Reroom hat in 20 Sekunden entschieden — und wir waren beide zufrieden."</div>
              <div className="who">
                <div className="av" style={{ background: "var(--sage)", color: "var(--forest)" }}>SM</div>
                <div><div className="n">Sabine M.</div><div className="meta">LEIPZIG · 1 KIND</div></div>
              </div>
            </div>
            <div className="tcard">
              <div className="q">„Ich dachte, KI‑Möbel sind Spielerei. Aber jedes Stück war echt kaufbar. Ich hab unser Kinderzimmer für €640 neu eingerichtet — Dinge aus fünf verschiedenen Shops."</div>
              <div className="who">
                <div className="av" style={{ background: "var(--butter)", color: "var(--ink)" }}>JR</div>
                <div><div className="n">Julia R.</div><div className="meta">HAMBURG · 3 KINDER</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing" id="preis">
        <div className="wrap">
          <div className="pricing-head">
            <div className="kicker">Preise</div>
            <h2 style={{ marginTop: 12 }}>Fair. Kein <em>Abo‑Zwang.</em></h2>
            <p>Die ersten 3 Räume sind gratis. Kein Kleingedrucktes. Die Möbel kosten, was sie im Shop kosten.</p>
          </div>
          <div className="plans">
            <div className="plan">
              <div className="plan-top"><h3>Schnupper</h3></div>
              <div className="price">€0<small>/ immer</small></div>
              <ul>
                <li>3 Räume, je 1 Variante</li>
                <li>Standard‑Stile</li>
                <li>Zugriff auf Shop & Finder</li>
                <li>WhatsApp‑Teilen</li>
              </ul>
              <button className="btn btn-ghost cta" onClick={goToApp}>Kostenlos starten</button>
            </div>
            <div className="plan pop">
              <div className="plan-top"><h3>Zuhause</h3><span className="tag">BELIEBT</span></div>
              <div className="price">€12<small className="muted">/ Monat</small></div>
              <ul>
                <li>Unbegrenzt Räume + Varianten</li>
                <li>Alle Stile, inkl. saisonale Drops</li>
                <li>Preis‑Alarme & Wunschlisten</li>
                <li>Priorisierte Rendering‑Queue</li>
                <li>Familien‑Sharing (bis zu 4 Personen)</li>
              </ul>
              <button className="btn btn-sage cta" onClick={goToApp}>7 Tage gratis testen</button>
            </div>
            <div className="plan">
              <div className="plan-top"><h3>Profi</h3></div>
              <div className="price">€39<small>/ Monat</small></div>
              <ul>
                <li>Alles aus „Zuhause"</li>
                <li>Für Interior‑Designer & Makler</li>
                <li>Kundenprojekte & Whitelabel</li>
                <li>Export als Moodboard (PDF)</li>
                <li>API‑Zugang</li>
              </ul>
              <button className="btn btn-ghost cta" onClick={goToApp}>Profi anfragen</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="wrap faq-grid">
          <div>
            <div className="kicker">FAQ</div>
            <h2 style={{ marginTop: 12 }}>Fragen,<br />die wirklich <em>jede Mama</em> stellt.</h2>
            <p style={{ marginTop: 16 }}>
              Noch eine Frage? Schreib uns auf <a href="mailto:info@simpli.bot" style={{ borderBottom: "0.5px solid currentColor" }}>info@simpli.bot</a> — wir antworten innerhalb eines Tages.
            </p>
          </div>
          <div>
            {faqs.map((f, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <h3>{f.q}<span className="plus">{openFaq === i ? "−" : "+"}</span></h3>
                <p className="ans">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="wrap cta-inner">
          <div className="kicker" style={{ color: "rgba(255,255,255,0.6)" }}>Bereit?</div>
          <h2 style={{ marginTop: 14, color: "#fff" }}>Ein Foto. Ein neues <em>Zuhause.</em></h2>
          <p>Fang mit dem Zimmer an, das dich seit Monaten nervt. In 20 Sekunden siehst du, was möglich ist.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-sage btn-lg" onClick={goToApp}>Raum fotografieren</button>
            <button className="btn btn-ghost btn-lg" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.2)" }} onClick={goToApp}>Beispiele ansehen</button>
          </div>
          <div style={{ marginTop: 20, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "var(--ff-mono)", letterSpacing: 0.5 }}>
            KEINE KREDITKARTE · IN 30 SEK. STARTKLAR
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo"><span className="logo-dot" />Reroom</div>
              <p>KI‑Interior für Mamas, die ihr Zuhause neu gestalten — mit echten, kaufbaren Möbeln.</p>
            </div>
            <div className="foot-col">
              <h4>Produkt</h4>
              <ul>
                <li><a href={APP_URL}>Mein Zuhause</a></li>
                <li><a href={APP_URL}>Shop</a></li>
                <li><a href={APP_URL}>Produkt‑Finder</a></li>
                <li><a href={APP_URL}>Favoriten</a></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Unternehmen</h4>
              <ul>
                <li><a href="#stimmen">Stimmen</a></li>
                <li><a href="#preis">Preise</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><button onClick={() => navigate("kontakt")}>Kontakt</button></li>
              </ul>
            </div>
            <div className="foot-col">
              <h4>Rechtliches</h4>
              <ul>
                <li><button onClick={() => navigate("datenschutz")}>Datenschutz</button></li>
                <li><button onClick={() => navigate("impressum")}>Impressum</button></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <div>© {new Date().getFullYear()} SIMPLI GMBH · BIELEFELD</div>
            <div>MADE WITH ♡ IN DEUTSCHLAND</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
