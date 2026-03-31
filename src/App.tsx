import { useState, useEffect, useRef, useCallback } from "react";

const APP_URL = "https://app.reroom.today?login=true";
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
    <div ref={containerRef} className="relative aspect-[16/10] rounded-[2rem] overflow-hidden cursor-col-resize select-none"
      style={{ boxShadow: "0 8px 40px rgba(164,60,26,0.06)" }}
      onMouseMove={e => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}>
      <img src="/showcase-before-1.png" alt="Vorher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 left-4 px-4 py-2 bg-black/20 backdrop-blur-md text-white text-[11px] font-medium rounded-full tracking-widest uppercase z-20">Vorher</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <img src="/showcase-after-2.png" alt="Nachher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 px-4 py-2 bg-primary/70 backdrop-blur-md text-white text-[11px] font-medium rounded-full tracking-widest uppercase z-20">Nachher</div>
      </div>
      <div className="absolute top-0 bottom-0 z-30" style={{ left: `${split}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[1.5px] bg-white/50" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <MIcon name="unfold_more" size={18} className="text-on-surface/40" />
        </div>
      </div>
    </div>
  );
}

/* Helper: Video section with play button */
function VideoBlock({ videoRef, paused, setPaused, src, className = "" }: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  paused: boolean;
  setPaused: (v: boolean) => void;
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative rounded-[2rem] overflow-hidden ${className}`} style={{ boxShadow: "0 8px 40px rgba(164,60,26,0.06)" }}>
      <video ref={videoRef} autoPlay muted playsInline
        className="w-full h-full object-cover"
        onEnded={() => setPaused(true)}>
        <source src={src} type="video/mp4" />
      </video>
      {paused && (
        <button onClick={() => { const v = videoRef.current; if (v) { v.currentTime = 0; v.play(); setPaused(false); } }}
          className="absolute inset-0 flex items-center justify-center cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <MIcon name="play_arrow" fill size={28} className="text-primary/80 ml-0.5" />
          </div>
        </button>
      )}
    </div>
  );
}

/* ═══════════════ LEGAL PAGES ═══════════════ */

function LegalShell({ title, children, onBack }: { title: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="min-h-[100dvh] w-full bg-[#faf8f6]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#faf8f6]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button onClick={onBack} className="hover:opacity-70 transition-opacity">
            <span className="text-xl font-semibold tracking-tight text-[#8b6f5e] font-headline">reroom</span>
          </button>
          <button onClick={onBack} className="text-sm text-[#8b6f5e]/60 hover:text-[#8b6f5e] transition-colors flex items-center gap-1">
            <MIcon name="arrow_back" size={16} /> Zurück
          </button>
        </div>
      </nav>
      <div className="pt-28 pb-20 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-headline text-3xl md:text-4xl font-semibold text-[#3d3028] tracking-tight mb-10">{title}</h1>
        <div className="text-[#8b6f5e] text-[15px] leading-relaxed space-y-6">{children}</div>
      </div>
      <footer className="py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-sm text-[#8b6f5e]/40">&copy; {new Date().getFullYear()} Simpli GmbH</div>
      </footer>
    </div>
  );
}

function ImpressumPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Impressum" onBack={onBack}>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Angaben gemäß § 5 TMG</h2><p>Simpli GmbH<br />Am Lenkwerk 9<br />33609 Bielefeld<br />Deutschland</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Vertreten durch</h2><p>Geschäftsführer: Tim Hoppe &amp; Dennis Melson</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Kontakt</h2><p>Telefon: +49 15888 725814<br />E-Mail: info@simpli.bot</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Registereintrag</h2><p>Handelsregister: Amtsgericht Bielefeld<br />Registernummer: HRB 44387</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Umsatzsteuer-ID</h2><p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />DE326245802</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2><p>Tim Hoppe<br />Am Lenkwerk 9<br />33609 Bielefeld</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">EU-Streitschlichtung</h2><p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p><p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Haftung für Inhalte</h2><p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Haftung für Links</h2><p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">Urheberrecht</h2><p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p></div>
    </LegalShell>
  );
}

function DatenschutzPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Datenschutzerklärung" onBack={onBack}>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">1. Datenschutz auf einen Blick</h2><p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p><p className="mt-3"><strong className="text-[#3d3028]">Verantwortlich:</strong><br />Simpli GmbH, Am Lenkwerk 9, 33609 Bielefeld<br />E-Mail: info@simpli.bot, Telefon: +49 15888 725814</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">2. Hosting</h2><p>Diese Website wird bei einem externen Dienstleister gehostet (Art. 6 Abs. 1 lit. b DSGVO).</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">3. Ihre Rechte</h2><p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">4. Datenerfassung</h2><p>Der Provider erhebt automatisch Informationen in Server-Log-Dateien.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">5. Google Fonts</h2><p>Diese Seite nutzt Google Fonts zur einheitlichen Darstellung von Schriftarten.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">6. KI-generierte Inhalte</h2><p>Reroom nutzt KI zur Generierung von Raumdesign-Vorschlägen. Hochgeladene Fotos werden an Google Gemini und OpenAI übermittelt.</p></div>
      <div><h2 className="text-lg font-semibold text-[#3d3028] mb-2">7. Zahlungsabwicklung</h2><p>Wir nutzen Stripe für die Zahlungsabwicklung (Art. 6 Abs. 1 lit. b DSGVO).</p></div>
    </LegalShell>
  );
}

function KontaktPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Kontakt" onBack={onBack}>
      <p className="text-lg text-[#3d3028]">Wir freuen uns, von dir zu hören.</p>
      <div className="space-y-4 mt-4">
        <p><strong className="text-[#3d3028]">E-Mail:</strong> <a href="mailto:info@simpli.bot" className="text-[#8b6f5e] hover:underline">info@simpli.bot</a></p>
        <p><strong className="text-[#3d3028]">Telefon:</strong> <a href="tel:+4915888725814" className="text-[#8b6f5e] hover:underline">+49 15888 725814</a> (Mo–Fr, 9–17 Uhr)</p>
        <p><strong className="text-[#3d3028]">Adresse:</strong> Simpli GmbH, Am Lenkwerk 9, 33609 Bielefeld</p>
      </div>
    </LegalShell>
  );
}

/* ═══════════════ MAIN APP ═══════════════ */

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
  const dekoVideoRef = useRef<HTMLVideoElement>(null);
  const [dekoPaused, setDekoPaused] = useState(false);

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
      { threshold: 0.1 }
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
    <div className="min-h-[100dvh] w-full bg-[#faf8f6] overflow-x-hidden selection:bg-[#e8cfc5]">

      {/* ═══════════════ NAV — minimal ═══════════════ */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-700" style={{
        backgroundColor: scrollY > 60 ? "rgba(250,248,246,0.88)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
      }}>
        <div className="flex justify-between items-center px-6 sm:px-10 py-5 max-w-6xl mx-auto">
          <span className="text-lg font-semibold tracking-tight text-[#8b6f5e] font-headline">reroom</span>
          <div className="hidden md:flex gap-8">
            {["Features", "Ergebnisse", "Preise"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[13px] text-[#8b6f5e]/50 hover:text-[#8b6f5e] transition-colors tracking-wide">{l}</a>
            ))}
          </div>
          <button onClick={goToApp} className="bg-[#3d3028] text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-[#3d3028]/90 transition-colors">
            Starten
          </button>
        </div>
      </nav>

      {/* ═══════════════ HERO — Full screen video ═══════════════ */}
      <header className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline onEnded={() => { setVideoEnded(true); setHeroPaused(true); }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.65) saturate(0.95)" }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {heroPaused && (
          <button onClick={() => { const v = videoRef.current; if (v) { v.currentTime = 0; v.play(); setHeroPaused(false); setVideoEnded(false); } }}
            className="absolute bottom-8 right-8 z-20 w-11 h-11 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center hover:bg-white/70 transition-all cursor-pointer">
            <MIcon name="play_arrow" fill size={22} className="text-white ml-0.5" />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f6]/20 via-transparent to-[#faf8f6] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: videoEnded ? 1 : 0, background: "radial-gradient(ellipse 80% 50% at center 45%, rgba(250,248,246,0.95) 0%, rgba(250,248,246,0.5) 55%, transparent 80%)" }} />

        <div className="relative z-10 max-w-3xl px-6 text-center">
          <h1 className={`text-[2rem] sm:text-[3rem] md:text-[3.5rem] font-headline font-semibold tracking-tight text-[#3d3028] mb-6 leading-[1.12] transition-all duration-800 ${heroStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ textShadow: "0 0 80px rgba(250,248,246,0.95)" }}
            onTransitionEnd={() => heroStage === 2 && setHeroStage(4)}>
            Sieh, wie es wirklich<br />aussieht — bevor du kaufst
          </h1>
          <p className={`text-[15px] sm:text-lg text-[#8b6f5e] max-w-md mx-auto mb-10 leading-relaxed transition-all duration-700 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            style={{ textShadow: "0 0 40px rgba(250,248,246,0.95)" }}>
            Deine Räume, neu gedacht — in Sekunden.
          </p>
          <div className={`transition-all duration-700 delay-100 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            onTransitionEnd={() => heroStage === 4 && setHeroStage(5)}>
            <button onClick={goToApp} className="bg-[#3d3028] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#3d3028]/90 transition-all"
              style={{ boxShadow: "0 4px 20px rgba(61,48,40,0.2)" }}>
              Kostenlos ausprobieren
            </button>
          </div>
          <span className={`inline-block mt-8 text-[11px] tracking-[0.2em] text-[#8b6f5e]/40 uppercase transition-all duration-700 ${heroStage >= 1 ? "opacity-100" : "opacity-0"}`}
            onTransitionEnd={() => { if (heroStage === 1) setHeroStage(2); }}>
            2.000 Gratis-Credits
          </span>
        </div>
      </header>

      {/* ═══════════════ EMPATHY — 2 lines max ═══════════════ */}
      <section className="py-24 sm:py-36 px-6">
        <div id="pain" data-animate className={`max-w-lg mx-auto text-center transition-all duration-700 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[#8b6f5e]/60 text-[15px] leading-relaxed mb-6">
            Du sammelst Inspiration, vergleichst endlos — und fragst dich trotzdem:
          </p>
          <p className="text-[#3d3028] text-xl sm:text-2xl font-headline font-semibold leading-snug">
            &bdquo;Wird das wirklich so aussehen<br />in meinem Zuhause?&ldquo;
          </p>
        </div>
      </section>

      {/* ═══════════════ FEATURE 1 — Redesign (full width video) ═══════════════ */}
      <section id="features" className="pb-8 px-6 sm:px-10">
        <div id="feat-1" data-animate className={`max-w-5xl mx-auto transition-all duration-700 ${vis("feat-1") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.2em] text-[#8b6f5e]/40 uppercase">Feature</span>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028] mt-2">Komplett-Redesign</h2>
            <p className="text-[#8b6f5e]/60 text-[15px] mt-3 max-w-sm mx-auto">Ein Foto, ein Stil — und dein Raum ist verwandelt.</p>
          </div>
          <VideoBlock
            videoRef={redesignVideoRef}
            paused={redesignPaused}
            setPaused={setRedesignPaused}
            src="/demo-redesign.mp4"
            className="aspect-video w-full"
          />
        </div>
      </section>

      {/* ═══════════════ FEATURE 2 — Zimmer (full width video) ═══════════════ */}
      <section className="py-24 sm:py-36 px-6 sm:px-10">
        <div id="feat-2" data-animate className={`max-w-5xl mx-auto transition-all duration-700 ${vis("feat-2") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.2em] text-[#8b6f5e]/40 uppercase">Feature</span>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028] mt-2">Zimmer einrichten</h2>
            <p className="text-[#8b6f5e]/60 text-[15px] mt-3 max-w-sm mx-auto">Kinderzimmer, Schlafzimmer, Home Office — liebevoll gestaltet.</p>
          </div>
          <VideoBlock
            videoRef={zimmerVideoRef}
            paused={zimmerPaused}
            setPaused={setZimmerPaused}
            src="/demo-kinderzimmer.mp4"
            className="aspect-video w-full"
          />
        </div>
      </section>

      {/* ═══════════════ FEATURE 3 — Deko (full width video) ═══════════════ */}
      <section className="pb-24 sm:pb-36 px-6 sm:px-10">
        <div id="feat-3" data-animate className={`max-w-5xl mx-auto transition-all duration-700 ${vis("feat-3") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="text-center mb-10">
            <span className="text-[11px] tracking-[0.2em] text-[#8b6f5e]/40 uppercase">Feature</span>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028] mt-2">Tisch &amp; Deko</h2>
            <p className="text-[#8b6f5e]/60 text-[15px] mt-3 max-w-sm mx-auto">Ostern, Weihnachten, Dinner — der perfekte Anlass.</p>
          </div>
          <VideoBlock
            videoRef={dekoVideoRef}
            paused={dekoPaused}
            setPaused={setDekoPaused}
            src="/demo-ostern.mp4"
            className="aspect-video w-full"
          />
        </div>
      </section>

      {/* ═══════════════ PROOF — Before/After ═══════════════ */}
      <section id="ergebnisse" className="py-24 sm:py-36 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div id="section-proof" data-animate className={`text-center mb-12 transition-all duration-700 ${vis("section-proof") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028]">Vorher &amp; Nachher</h2>
            <p className="text-[#8b6f5e]/50 text-[15px] mt-3">Ziehe den Slider.</p>
          </div>
          <div id="proof-slider" data-animate className={`transition-all duration-700 delay-200 ${vis("proof-slider") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <BeforeAfter />
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW — 3 steps, minimal ═══════════════ */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 id="section-how" data-animate className={`text-center text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028] mb-16 transition-all duration-700 ${vis("section-how") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            So einfach geht&apos;s
          </h2>
          <div className="space-y-12">
            {[
              { num: "01", title: "Foto machen", desc: "Fotografiere deinen Raum — so wie er ist." },
              { num: "02", title: "Stil wählen", desc: "Wähle aus 25+ kuratierten Design-Stilen." },
              { num: "03", title: "Staunen", desc: "Sieh dein neues Zuhause — und finde passende Möbel." },
            ].map((s, i) => (
              <div key={i} id={`step-${i}`} data-animate className={`flex items-baseline gap-6 transition-all duration-700 ${vis(`step-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="text-[#8b6f5e]/20 text-3xl font-headline font-semibold">{s.num}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#3d3028] mb-1">{s.title}</h3>
                  <p className="text-[#8b6f5e]/60 text-[15px]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING — clean ═══════════════ */}
      <section id="preise" className="py-24 sm:py-36 px-6">
        <div className="max-w-3xl mx-auto">
          <div id="section-pricing" data-animate className={`text-center mb-14 transition-all duration-700 ${vis("section-pricing") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028]">Preise</h2>
            <p className="text-[#8b6f5e]/50 text-[15px] mt-3">Starte kostenlos. Upgrade wenn du möchtest.</p>
          </div>
          <div id="pricing-cards" data-animate className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-200 ${vis("pricing-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { name: "Starter", price: "0", features: ["3 Redesigns / Monat", "Alle 25+ Stile", "Preisvergleich"], cta: "Gratis starten", highlighted: false },
              { name: "Plus", price: "19,99", features: ["~45 Designs / Monat", "Premium Stile", "Preisvergleich", "Priorität"], cta: "Upgraden", highlighted: true },
              { name: "Mega", price: "39,99", features: ["~100 Designs / Monat", "Alles in Plus", "Bester Preis", "Premium Support"], cta: "Profi werden", highlighted: false },
            ].map((plan, i) => (
              <div key={i} className={`rounded-[1.5rem] p-7 flex flex-col ${plan.highlighted ? "bg-[#3d3028] text-white" : "bg-[#f0ece8]"}`}
                style={plan.highlighted ? { boxShadow: "0 8px 32px rgba(61,48,40,0.12)" } : {}}>
                <h3 className={`text-sm font-medium mb-3 ${plan.highlighted ? "text-white/60" : "text-[#8b6f5e]/60"}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-headline font-semibold">€{plan.price}</span>
                  <span className={`text-sm ${plan.highlighted ? "text-white/40" : "text-[#8b6f5e]/40"}`}>/mtl.</span>
                </div>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className={`text-sm flex items-center gap-2 ${plan.highlighted ? "text-white/70" : "text-[#8b6f5e]/70"}`}>
                      <span className={`w-1 h-1 rounded-full ${plan.highlighted ? "bg-white/30" : "bg-[#8b6f5e]/30"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={goToApp} className={`w-full py-3 rounded-full text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-white text-[#3d3028] hover:bg-white/90"
                    : "bg-[#3d3028] text-white hover:bg-[#3d3028]/90"
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA — just text ═══════════════ */}
      <section className="py-24 sm:py-36 px-6">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-handwritten text-2xl text-[#8b6f5e]/40 mb-4">Bereit?</p>
          <h2 className="text-2xl sm:text-3xl font-headline font-semibold text-[#3d3028] mb-8">
            Dein Zuhause wartet<br />auf dich.
          </h2>
          <button onClick={goToApp} className="bg-[#3d3028] text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-[#3d3028]/90 transition-all"
            style={{ boxShadow: "0 4px 20px rgba(61,48,40,0.15)" }}>
            Jetzt kostenlos starten
          </button>
        </div>
      </section>

      {/* ═══════════════ FOOTER — whisper quiet ═══════════════ */}
      <footer className="py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-[#8b6f5e]/35">
          <span className="font-headline font-semibold text-[#8b6f5e]/40 tracking-tight">reroom</span>
          <div className="flex gap-6">
            <button onClick={() => navigate("datenschutz")} className="hover:text-[#8b6f5e]/60 transition-colors">Datenschutz</button>
            <button onClick={() => navigate("impressum")} className="hover:text-[#8b6f5e]/60 transition-colors">Impressum</button>
            <button onClick={() => navigate("kontakt")} className="hover:text-[#8b6f5e]/60 transition-colors">Kontakt</button>
          </div>
          <span>&copy; {new Date().getFullYear()} Simpli GmbH</span>
        </div>
      </footer>
    </div>
  );
}
