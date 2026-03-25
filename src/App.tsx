import { useState, useEffect, useRef, useCallback } from "react";

const APP_URL = "https://web-production-e82a5.up.railway.app?login=true";
type Page = "home" | "datenschutz" | "impressum" | "kontakt";

function MIcon({ name, fill, size = 24, className = "" }: { name: string; fill?: boolean; size?: number; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontSize: size, fontVariationSettings: fill ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}
    >
      {name}
    </span>
  );
}

function BeforeAfter() {
  const [split, setSplit] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSplit(Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100)));
  };
  return (
    <div ref={containerRef} className="relative aspect-[16/10] rounded-[1rem] overflow-hidden cursor-col-resize select-none ambient-shadow"
      onMouseMove={e => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}>
      <img src="/showcase-before-1.png" alt="Vorher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 left-4 px-4 py-2 bg-black/40 backdrop-blur-md text-white text-xs font-bold rounded-lg tracking-widest uppercase z-20">Vorher</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <img src="/showcase-after-2.png" alt="Nachher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 px-4 py-2 terracotta-gradient text-white text-xs font-bold rounded-lg tracking-widest uppercase z-20">Nachher</div>
      </div>
      <div className="absolute top-0 bottom-0 z-30" style={{ left: `${split}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-white/50" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white ambient-shadow flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
          <MIcon name="unfold_more" size={20} className="text-on-surface" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ LEGAL PAGES ═══════════════ */

function LegalShell({ title, children, onBack }: { title: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="min-h-[100dvh] w-full bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <span className="text-2xl font-bold tracking-tighter text-primary font-headline">Reroom</span>
          </button>
          <button onClick={onBack} className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1">
            <MIcon name="arrow_back" size={18} /> Zurück
          </button>
        </div>
      </nav>
      <div className="pt-28 pb-20 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-10">{title}</h1>
        <div className="prose-legal text-on-surface-variant text-[15px] leading-relaxed space-y-6">{children}</div>
      </div>
      <footer className="border-t border-outline-variant/30 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-outline">&copy; {new Date().getFullYear()} Simpli GmbH. Alle Rechte vorbehalten.</div>
      </footer>
    </div>
  );
}

function ImpressumPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Impressum" onBack={onBack}>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Angaben gemäß § 5 TMG</h2><p>Simpli GmbH<br />Am Lenkwerk 9<br />33609 Bielefeld<br />Deutschland</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Vertreten durch</h2><p>Geschäftsführer: Tim Hoppe &amp; Dennis Melson</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Kontakt</h2><p>Telefon: +49 15888 725814<br />E-Mail: info@simpli.bot</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Registereintrag</h2><p>Handelsregister: Amtsgericht Bielefeld<br />Registernummer: HRB 44387</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Umsatzsteuer-ID</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE326245802</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>Tim Hoppe<br />Am Lenkwerk 9<br />33609 Bielefeld</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">EU-Streitschlichtung</h2><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Haftung für Inhalte</h2><p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Haftung für Links</h2><p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Urheberrecht</h2><p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p></div>
    </LegalShell>
  );
}

function DatenschutzPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Datenschutzerklärung" onBack={onBack}>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">1. Datenschutz auf einen Blick</h2><h3 className="font-semibold text-on-surface mt-4 mb-1">Allgemeine Hinweise</h3><p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p><h3 className="font-semibold text-on-surface mt-4 mb-1">Datenerfassung auf dieser Website</h3><p><strong className="text-on-surface">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br /><br />Simpli GmbH<br />Am Lenkwerk 9<br />33609 Bielefeld<br />E-Mail: info@simpli.bot<br />Telefon: +49 15888 725814</p><h3 className="font-semibold text-on-surface mt-4 mb-1">Wie erfassen wir Ihre Daten?</h3><p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.</p><h3 className="font-semibold text-on-surface mt-4 mb-1">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3><p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">2. Hosting</h2><p>Diese Website wird bei einem externen Dienstleister gehostet. Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2><h3 className="font-semibold text-on-surface mt-4 mb-1">Datenschutz</h3><p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">4. Datenerfassung auf dieser Website</h2><h3 className="font-semibold text-on-surface mt-4 mb-1">Server-Log-Dateien</h3><p>Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">5. Plugins und Tools</h2><h3 className="font-semibold text-on-surface mt-4 mb-1">Google Fonts</h3><p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Google Fonts.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">6. KI-generierte Inhalte</h2><p>Reroom nutzt künstliche Intelligenz zur Generierung von Raumdesign-Vorschlägen. Dabei werden von Ihnen hochgeladene Fotos an KI-Dienste (Google Gemini, OpenAI) übermittelt und verarbeitet.</p></div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">7. Zahlungsabwicklung</h2><p>Für die Zahlungsabwicklung nutzen wir den Dienst Stripe. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.</p></div>
    </LegalShell>
  );
}

function KontaktPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Kontakt" onBack={onBack}>
      <p className="text-lg text-on-surface">Du hast eine Frage, ein Problem oder möchtest uns einfach Feedback geben? Wir freuen uns, von dir zu hören.</p>
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 space-y-5">
        <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5"><MIcon name="mail" fill size={22} className="text-primary" /></div><div><h3 className="text-base font-bold text-on-surface">E-Mail</h3><a href="mailto:info@simpli.bot" className="text-primary hover:underline">info@simpli.bot</a><p className="text-sm text-on-surface-variant mt-1">Wir antworten in der Regel innerhalb von 24 Stunden.</p></div></div>
        <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5"><MIcon name="phone" fill size={22} className="text-primary" /></div><div><h3 className="text-base font-bold text-on-surface">Telefon</h3><a href="tel:+4915888725814" className="text-primary hover:underline">+49 15888 725814</a><p className="text-sm text-on-surface-variant mt-1">Mo–Fr, 9–17 Uhr</p></div></div>
        <div className="flex items-start gap-4"><div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5"><MIcon name="location_on" fill size={22} className="text-primary" /></div><div><h3 className="text-base font-bold text-on-surface">Adresse</h3><p>Simpli GmbH<br />Am Lenkwerk 9<br />33609 Bielefeld</p></div></div>
      </div>
      <div><h2 className="text-lg font-bold text-on-surface mb-2">Betreiber</h2><p>Reroom ist ein Produkt der Simpli GmbH.<br />Geschäftsführer: Tim Hoppe &amp; Dennis Melson<br />Handelsregister: Amtsgericht Bielefeld, HRB 44387<br />USt-IdNr: DE326245802</p></div>
    </LegalShell>
  );
}

/* ═══════════════ MAIN APP ═════���═════════ */

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const navigate = useCallback((p: Page) => { setPage(p); window.location.hash = p === "home" ? "" : p; window.scrollTo(0, 0); }, []);

  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [videoEnded, setVideoEnded] = useState(false);
  const [heroStage, setHeroStage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const redesignVideoRef = useRef<HTMLVideoElement>(null);
  const [redesignPaused, setRedesignPaused] = useState(false);
  const zimmerVideoRef = useRef<HTMLVideoElement>(null);
  const [zimmerPaused, setZimmerPaused] = useState(false);
  const osternVideoRef = useRef<HTMLVideoElement>(null);
  const [osternPaused, setOsternPaused] = useState(false);
  const romantischVideoRef = useRef<HTMLVideoElement>(null);
  const [romantischPaused, setRomantischPaused] = useState(false);
  const [osternFinished, setOsternFinished] = useState(false);

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

  useEffect(() => { if (videoEnded && heroStage === 0) setHeroStage(1); }, [videoEnded, heroStage]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setVisibleSections((prev) => new Set([...prev, entry.target.id]));
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const vis = (id: string) => visibleSections.has(id);
  const goToApp = () => window.location.href = APP_URL;

  if (page === "impressum") return <ImpressumPage onBack={() => navigate("home")} />;
  if (page === "datenschutz") return <DatenschutzPage onBack={() => navigate("home")} />;
  if (page === "kontakt") return <KontaktPage onBack={() => navigate("home")} />;

  return (
    <div className="min-h-[100dvh] w-full bg-surface overflow-x-hidden selection:bg-primary-fixed-dim">

      {/* ═══════════════ NAV ═══════════════ */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500" style={{
        backgroundColor: scrollY > 50 ? "rgba(250,249,245,0.88)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(24px) saturate(1.3)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(222,192,183,0.4)" : "1px solid transparent",
      }}>
        <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
          <div className="text-2xl font-bold tracking-tighter text-primary font-headline">Reroom</div>
          <div className="hidden md:flex gap-10">
            <a href="#features" className="font-headline tracking-tight text-on-surface-variant hover:text-primary cursor-pointer transition-all text-sm font-semibold">Features</a>
            <a href="#how" className="font-headline tracking-tight text-on-surface-variant hover:text-primary cursor-pointer transition-all text-sm font-semibold">So geht&apos;s</a>
            <a href="#proof" className="font-headline tracking-tight text-on-surface-variant hover:text-primary cursor-pointer transition-all text-sm font-semibold">Ergebnisse</a>
            <a href="#pricing" className="font-headline tracking-tight text-on-surface-variant hover:text-primary cursor-pointer transition-all text-sm font-semibold">Preise</a>
          </div>
          <button onClick={goToApp} className="terracotta-gradient text-white px-7 py-2.5 rounded-xl text-sm font-bold hover:scale-[1.02] transition-transform duration-200 active:scale-95 shadow-lg shadow-primary/20">
            Kostenlos starten
          </button>
        </div>
      </nav>

      {/* ══��════════════ HERO — Video Background ════���══════════ */}
      <header className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
        <video ref={videoRef} autoPlay muted playsInline onEnded={() => { setVideoEnded(true); setHeroPaused(true); }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.75) saturate(1.1)" }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {heroPaused && (
          <button onClick={() => { const v = videoRef.current; if (v) { v.currentTime = 0; v.play(); setHeroPaused(false); setVideoEnded(false); } }}
            className="absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md ambient-shadow flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <MIcon name="play_arrow" fill size={28} className="text-primary ml-0.5" />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-surface pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: videoEnded ? 1 : 0, background: "radial-gradient(ellipse 70% 60% at center, rgba(250,249,245,0.94) 0%, rgba(250,249,245,0.65) 50%, transparent 75%)" }} />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-5xl px-8 text-center">
          {/* Eyebrow */}
          <span className={`inline-block tracking-[0.2em] text-primary uppercase mb-6 font-bold text-xs transition-all duration-700 ${heroStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onTransitionEnd={() => { if (heroStage === 1) setHeroStage(2); }}>
            Die Zukunft des Einrichtens
          </span>
          {/* Headline */}
          <h1 className={`text-5xl md:text-7xl font-headline font-extrabold tracking-tight text-on-surface mb-8 leading-[1.08] transition-all duration-800 ${heroStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ textShadow: "0 0 40px rgba(250,249,245,0.9), 0 0 80px rgba(250,249,245,0.5)" }}
            onTransitionEnd={() => heroStage === 2 && setHeroStage(4)}>
            Bevor du kaufst — sieh,<br />wie es <span className="text-primary italic">wirklich</span> aussieht
          </h1>
          {/* Subline */}
          <p className={`text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ textShadow: "0 0 20px rgba(250,249,245,0.9)" }}>
            Verwandle deine Räume in Sekunden mit künstlicher Intelligenz. Schluss mit Fehlkäufen und Zweifeln.
          </p>
          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onTransitionEnd={() => heroStage === 4 && setHeroStage(5)}>
            <button onClick={goToApp} className="terracotta-gradient text-white px-10 py-5 rounded-xl text-lg font-bold hover:scale-[1.05] transition-all ambient-shadow">
              Kostenlos ausprobieren
            </button>
            <a href="#how" className="glass-panel ghost-border text-on-surface px-10 py-5 rounded-xl text-lg font-bold hover:bg-surface-container transition-all flex items-center justify-center gap-2">
              <MIcon name="play_circle" fill size={22} /> Video ansehen
            </a>
          </div>
          {/* Stats */}
          <div className={`flex items-center justify-center gap-8 mt-12 pt-8 border-t border-on-surface/8 transition-all duration-700 ${heroStage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {[
              { val: "2.000", label: "Gratis-Credits" },
              { val: "25+", label: "Design-Stile" },
              { val: "30.000+", label: "echte Produkte" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-on-surface font-headline">{s.val}</span>
                <span className="text-xs text-on-surface-variant font-medium">{s.label}</span>
              </div>
            )).reduce((acc: React.ReactNode[], el, i) => i === 0 ? [el] : [...acc, <div key={`sep-${i}`} className="w-px h-8 bg-outline-variant/40" />, el], [])}
          </div>
        </div>
      </header>

      {/* ��══════════════ PAIN — Brief ══════════════��� */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div id="pain" data-animate className={`max-w-3xl mx-auto bg-white p-12 md:p-20 rounded-xl ambient-shadow ghost-border transition-all duration-700 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="mb-12">
            <p className="font-handwritten text-2xl text-secondary mb-2">An dich,</p>
            <p className="text-on-surface-variant italic">der gerade vor einer leeren Wand oder einem überfüllten Zimmer steht...</p>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-on-surface-variant">
            <p>Kennst du das? Du verbringst Stunden auf Pinterest. Du sammelst Kataloge. Du schleppst Farbkarten nach Hause und hältst sie gegen das Licht – morgens, mittags, abends.</p>
            <p>Und doch bleibt dieses nagende Gefühl: <span className="text-on-surface font-semibold">"Wird das wirklich passen?"</span></p>
            <p>Du kaufst diesen wunderschönen Samtsessel in Terracotta, nur um festzustellen, dass er in deinem Wohnzimmer nicht wie ein Design-Statement wirkt, sondern wie ein Fremdkörper. Die Wandfarbe, die im Laden "Sanftes Salbei" hieß, sieht plötzlich aus wie ein Krankenhausflur.</p>
            <p>Einrichten sollte Freude machen. Stattdessen ist es oft purer Stress. Die Angst vor dem teuren Fehlkauf blockiert dich. Dein Zuhause ist der Ort, an dem deine Seele atmen sollte – kein Ort für Kompromisse.</p>
            <p>Genau deshalb haben wir <span className="text-primary font-bold">Reroom</span> erschaffen. Damit du nicht mehr raten musst. Damit du die Magie deines Zuhauses spüren kannst, bevor die erste Schraube gedreht ist.</p>
            <p className="text-on-surface font-semibold text-xl leading-snug pt-4">Du kannst es jetzt einfach <span className="text-primary">sehen</span> — bevor du irgendwas kaufst.</p>
          </div>
          <div className="mt-12 pt-12 border-t border-outline-variant/20">
            <p className="text-on-surface-variant italic">— Das Reroom Team</p>
            <p className="text-on-surface-variant/50 text-sm mt-2">P.S. Die ersten 2.000 Credits sind kostenlos.</p>
            <button onClick={goToApp} className="mt-6 terracotta-gradient text-white px-8 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all ambient-shadow">
              Jetzt kostenlos ausprobieren
            </button>
          </div>
        </div>
      </section>

      {/* ═��═════════════ FEATURES — Bento Grid ═══════════════ */}
      <section id="features" className="py-24 px-8 max-w-7xl mx-auto">
        <div id="section-features" data-animate className={`text-center mb-20 transition-all duration-700 ${vis("section-features") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-6">Deine Vision, Realität in Sekunden</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto text-lg">Entdecke die Werkzeuge, die aus einem Foto dein Traumzuhause machen.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Feature 1: Komplett-Redesign — 8 cols */}
          <div id="feat-redesign" data-animate className={`lg:col-span-8 bg-surface-container rounded-xl overflow-hidden flex flex-col md:flex-row group transition-all duration-700 hover:bg-surface-container-high ghost-border ${vis("feat-redesign") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="p-10 flex flex-col justify-center flex-1">
              <div className="w-12 h-12 terracotta-gradient rounded-lg flex items-center justify-center text-white mb-6">
                <MIcon name="auto_fix_high" />
              </div>
              <h3 className="text-3xl font-headline font-bold mb-4">Komplett-Redesign</h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                Lade ein Foto hoch und wähle aus über 25+ kuratierten Design-Stilen. Von Skandinavisch-Minimal bis Modern-Industrial.
              </p>
              <div className="flex flex-wrap gap-2">
                {["BOHEMIAN", "MINIMALIST", "JAPANDI", "MID-CENTURY"].map(s => (
                  <span key={s} className="px-3 py-1 bg-white/50 rounded-full text-xs font-bold text-secondary">{s}</span>
                ))}
              </div>
            </div>
            <div className="flex-1 min-h-[300px] relative">
              <video ref={redesignVideoRef} autoPlay muted playsInline
                className="w-full h-full object-cover"
                onEnded={() => setRedesignPaused(true)}>
                <source src="/demo-redesign.mp4" type="video/mp4" />
              </video>
              {redesignPaused && (
                <button onClick={() => { const v = redesignVideoRef.current; if (v) { v.currentTime = 0; v.play(); setRedesignPaused(false); } }}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 cursor-pointer">
                  <span className="material-symbols-outlined text-white text-6xl opacity-80 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                </button>
              )}
            </div>
          </div>

          {/* Feature 2: Kinderzimmer / Zimmer einrichten — 4 cols */}
          <div id="feat-zimmer" data-animate className={`lg:col-span-4 bg-[#f0f4f4] rounded-xl overflow-hidden group transition-all duration-700 hover:shadow-xl ghost-border ${vis("feat-zimmer") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "100ms" }}>
            <div className="relative h-64">
              <video ref={zimmerVideoRef} autoPlay muted playsInline
                className="w-full h-full object-cover"
                onEnded={() => setZimmerPaused(true)}>
                <source src="/demo-kinderzimmer.mp4" type="video/mp4" />
              </video>
              {zimmerPaused && (
                <button onClick={() => { const v = zimmerVideoRef.current; if (v) { v.currentTime = 0; v.play(); setZimmerPaused(false); } }}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                  <div className="w-14 h-14 rounded-full bg-white/90 ambient-shadow flex items-center justify-center hover:scale-105 transition-transform">
                    <MIcon name="play_arrow" fill size={32} className="text-secondary ml-0.5" />
                  </div>
                </button>
              )}
              <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full flex items-center gap-2 z-10">
                <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
                <span className="text-[10px] font-bold tracking-wider">LIVE DEMO</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-headline font-bold mb-3">Zimmer einrichten</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">Spezielle Vorlagen für Kinderzimmer, Home Office oder Schlafzimmer. Funktional und ästhetisch.</p>
            </div>
          </div>

          {/* Feature 3: Tisch & Deko — 4 cols */}
          <div id="feat-deko" data-animate className={`lg:col-span-4 bg-surface-container-low rounded-xl overflow-hidden ghost-border transition-all duration-700 ${vis("feat-deko") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="p-8">
              <h3 className="text-2xl font-headline font-bold mb-3">Tisch &amp; Deko</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-4">Plane den perfekten Anlass. Von der festlichen Ostertafel bis zum romantischen Dinner.</p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { icon: "egg_alt", label: "Ostern", c: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]" },
                  { icon: "park", label: "Weihnachten", c: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]" },
                  { icon: "cake", label: "Geburtstag", c: "bg-primary-fixed/50 text-primary border-primary-fixed-dim/50" },
                  { icon: "dinner_dining", label: "Dinner", c: "bg-surface-container-high text-on-surface border-outline-variant/40" },
                ].map((o, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold ${o.c}`}>
                    <MIcon name={o.icon} fill size={12} />{o.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 p-1">
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <video ref={osternVideoRef} autoPlay muted playsInline
                  className="w-full h-full object-cover"
                  onEnded={() => { setOsternPaused(true); setOsternFinished(true); const v = romantischVideoRef.current; if (v) { v.currentTime = 0; v.play(); } }}>
                  <source src="/demo-ostern.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Ostern</span>
                </div>
                {osternPaused && (
                  <button onClick={() => { const v = osternVideoRef.current; if (v) { v.currentTime = 0; v.play(); setOsternPaused(false); } }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                    <div className="w-10 h-10 rounded-full bg-white/90 ambient-shadow flex items-center justify-center"><MIcon name="play_arrow" fill size={22} className="text-tertiary ml-0.5" /></div>
                  </button>
                )}
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden group">
                <video ref={romantischVideoRef} muted playsInline
                  className="w-full h-full object-cover"
                  onEnded={() => setRomantischPaused(true)}>
                  <source src="/demo-romantisch.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Romantisch</span>
                </div>
                {(romantischPaused || !osternFinished) && (
                  <button onClick={() => { const v = romantischVideoRef.current; if (v) { v.currentTime = 0; v.play(); setRomantischPaused(false); setOsternFinished(true); } }}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                    <div className="w-10 h-10 rounded-full bg-white/90 ambient-shadow flex items-center justify-center"><MIcon name="play_arrow" fill size={22} className="text-tertiary ml-0.5" /></div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Feature 4: Testimonial CTA — 8 cols, Teal */}
          <div className="lg:col-span-8 bg-tertiary-container text-white rounded-xl p-12 flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10 max-w-md">
              <h3 className="text-3xl font-headline font-bold mb-6 italic">"Es fühlte sich an wie Zauberei."</h3>
              <p className="opacity-80 leading-relaxed mb-8">Schließe dich tausenden Design-Liebhabern an, die ihr Zuhause mit Reroom verwandelt haben.</p>
              <button onClick={goToApp} className="bg-white text-tertiary px-8 py-3 rounded-xl font-bold hover:bg-surface-bright transition-all active:scale-95">Jetzt ausprobieren</button>
            </div>
            <div className="hidden md:block absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-20">
              <span className="material-symbols-outlined text-[20rem]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how" className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <h2 id="section-how" data-animate className={`text-center text-4xl font-headline font-extrabold mb-16 transition-all duration-700 ${vis("section-how") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            In 3 Schritten zum Wohnglück
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {[
              { icon: "photo_camera", title: "1. Foto machen", desc: "Fotografiere deinen Raum, so wie er jetzt ist. Egal ob vollgestellt oder leer." },
              { icon: "palette", title: "2. Stil wählen", desc: "Wähle deinen Wunsch-Stil oder lass dich von unserer KI inspirieren." },
              { icon: "shopping_bag", title: "3. Staunen & Kaufen", desc: "Betrachte dein Redesign und kaufe die passenden Möbel direkt über unsere Partner." },
            ].map((s, i) => (
              <div key={i} id={`step-${i}`} data-animate className={`text-center relative z-10 transition-all duration-700 ${vis(`step-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mx-auto mb-8 ghost-border ambient-shadow">
                  <MIcon name={s.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-on-surface-variant">{s.desc}</p>
              </div>
            ))}
            <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-outline-variant/20 z-0" />
          </div>
        </div>
      </section>

      {/* ═���═════════════ PROOF — Before/After ════��══════════ */}
      <section id="proof" className="py-24 px-8 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div id="section-proof" data-animate className={`mb-16 transition-all duration-700 ${vis("section-proof") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h2 className="text-4xl font-headline font-extrabold mb-4">Echte Verwandlungen</h2>
            <p className="text-on-surface-variant max-w-lg">Erlebe den Unterschied zwischen "Vorher" und der "KI-Magie".</p>
          </div>

          <div id="proof-slider" data-animate className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${vis("proof-slider") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <BeforeAfter />
            <p className="text-center text-sm text-on-surface-variant mt-4">Ziehe den Slider um Vorher/Nachher zu vergleichen</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 max-w-5xl mx-auto">
            {[
              { icon: "auto_awesome", title: "KI-Raumanalyse", desc: "Erkennt Farben, Materialien und Licht. Vorschläge, die zu deinem Raum passen." },
              { icon: "compare", title: "Preisvergleich", desc: "Preise von IKEA, Amazon, Otto, Westwing, Home24. Besten Deal finden." },
              { icon: "tune", title: "Dezent bis komplett", desc: "Intensitäts-Regler: ein paar Akzente oder alles neu — du entscheidest." },
              { icon: "touch_app", title: "Alles klickbar", desc: "Tippe auf ein Möbelstück und sieh sofort Preis und Kaufoption." },
            ].map((f, i) => (
              <div key={i} id={`prooffeat-${i}`} data-animate className={`bg-white rounded-xl p-6 ghost-border ambient-shadow transition-all duration-700 ${vis(`prooffeat-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 terracotta-gradient rounded-lg flex items-center justify-center text-white mb-4">
                  <MIcon name={f.icon} fill size={20} />
                </div>
                <h3 className="text-sm font-bold text-on-surface mb-2">{f.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════��══════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-24 px-8 max-w-7xl mx-auto">
        <div id="section-pricing" data-animate className={`text-center mb-16 transition-all duration-700 ${vis("section-pricing") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="text-4xl font-headline font-extrabold mb-4">Finde den passenden Plan</h2>
          <p className="text-on-surface-variant">Beginne kostenlos und upgrade, wenn du mehr Inspiration brauchst.</p>
        </div>
        <div id="pricing-cards" data-animate className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-4xl mx-auto transition-all duration-700 delay-200 ${vis("pricing-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Starter */}
          <div className="bg-surface-container-low rounded-xl p-10 flex flex-col ghost-border">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-headline font-extrabold mb-6">€0 <span className="text-lg font-normal text-on-surface-variant">/ mtl.</span></div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> 3 Redesigns pro Monat</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> Alle 25+ Stile</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> Preisvergleich</li>
            </ul>
            <button onClick={goToApp} className="w-full py-4 rounded-xl border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-all">Gratis starten</button>
          </div>
          {/* Plus — highlighted */}
          <div className="bg-white rounded-xl p-10 flex flex-col border-2 border-primary relative ambient-shadow scale-105 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 terracotta-gradient text-white px-4 py-1 rounded-full text-xs font-bold">MEISTGEWÄHLT</div>
            <h3 className="text-xl font-bold mb-2">Plus</h3>
            <div className="text-4xl font-headline font-extrabold mb-6">€19,99 <span className="text-lg font-normal text-on-surface-variant">/ mtl.</span></div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface"><MIcon name="check_circle" fill size={20} className="text-primary" /> ~45 Designs / Monat</li>
              <li className="flex items-center gap-3 text-on-surface"><MIcon name="check_circle" fill size={20} className="text-primary" /> 25+ Premium Stile</li>
              <li className="flex items-center gap-3 text-on-surface"><MIcon name="check_circle" fill size={20} className="text-primary" /> Preisvergleich</li>
              <li className="flex items-center gap-3 text-on-surface"><MIcon name="check_circle" fill size={20} className="text-primary" /> Prioritäts-Generierung</li>
            </ul>
            <button onClick={goToApp} className="w-full py-4 rounded-xl terracotta-gradient text-white font-bold hover:scale-[1.02] transition-all">Jetzt upgraden</button>
          </div>
          {/* Mega */}
          <div className="bg-surface-container-low rounded-xl p-10 flex flex-col ghost-border">
            <h3 className="text-xl font-bold mb-2">Mega</h3>
            <div className="text-4xl font-headline font-extrabold mb-6">€39,99 <span className="text-lg font-normal text-on-surface-variant">/ mtl.</span></div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> ~100 Designs / Monat</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> Alles in Plus</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> Bester Credit-Preis</li>
              <li className="flex items-center gap-3 text-on-surface-variant"><MIcon name="check_circle" fill size={20} className="text-tertiary" /> Premium Support</li>
            </ul>
            <button onClick={goToApp} className="w-full py-4 rounded-xl border border-secondary text-secondary font-bold hover:bg-secondary hover:text-white transition-all">Profi werden</button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══���═══════════ */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary" style={{ background: "linear-gradient(135deg, #842503 0%, #a43c1a 60%, #88503e 100%)" }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold mb-8">Bereit, dein Zuhause neu zu entdecken?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Hör auf zu zweifeln. Fang an zu gestalten. Dein Traumzuhause ist nur einen Klick entfernt.
          </p>
          <button onClick={goToApp} className="bg-white text-primary px-12 py-6 rounded-xl text-xl font-extrabold hover:scale-[1.05] transition-all ambient-shadow">
            Jetzt kostenlos starten
          </button>
        </div>
      </section>

      {/* ══════════���════ FOOTER ══��════════════ */}
      <footer className="bg-secondary w-full py-16 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="text-lg font-bold text-surface">Reroom</div>
            <p className="text-sm leading-relaxed text-surface/80">&copy; {new Date().getFullYear()} Simpli GmbH.<br />Curating the soul of your home.</p>
            <div className="flex gap-4">
              <a href="mailto:info@simpli.bot" className="text-surface/60 hover:text-primary transition-colors"><MIcon name="mail" /></a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-surface font-bold uppercase tracking-wider text-xs">Produkt</h4>
            <nav className="flex flex-col gap-2">
              <a href="#features" className="text-surface/60 hover:text-surface transition-colors text-sm">Features</a>
              <a href="#pricing" className="text-surface/60 hover:text-surface transition-colors text-sm">Preise</a>
              <a href="#proof" className="text-surface/60 hover:text-surface transition-colors text-sm">Ergebnisse</a>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-surface font-bold uppercase tracking-wider text-xs">Rechtliches</h4>
            <nav className="flex flex-col gap-2">
              <button onClick={() => navigate("datenschutz")} className="text-surface/60 hover:text-surface transition-colors text-sm text-left">Datenschutz</button>
              <button onClick={() => navigate("impressum")} className="text-surface/60 hover:text-surface transition-colors text-sm text-left">Impressum</button>
              <button onClick={() => navigate("kontakt")} className="text-surface/60 hover:text-surface transition-colors text-sm text-left">Kontakt</button>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="text-surface font-bold uppercase tracking-wider text-xs">Folge uns</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-surface/60 hover:text-surface transition-colors text-sm">Instagram</a>
              <a href="#" className="text-surface/60 hover:text-surface transition-colors text-sm">Pinterest</a>
              <a href="#" className="text-surface/60 hover:text-surface transition-colors text-sm">TikTok</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
