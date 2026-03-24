import { useState, useEffect, useRef } from "react";

const APP_URL = "https://reroom.app"; // TODO: update with real app URL

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
    <div ref={containerRef} className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-col-resize select-none shadow-card-lg"
      onMouseMove={e => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={e => handleMove(e.touches[0].clientX)}>
      <img src="/showcase-before-1.png" alt="Vorher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute top-4 left-4 px-4 py-2 bg-on-surface/50 text-on-primary text-xs font-bold rounded-full backdrop-blur-sm tracking-wide uppercase">Vorher</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <img src="/showcase-after-2.png" alt="Nachher" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-full tracking-wide uppercase">Nachher</div>
      </div>
      <div className="absolute top-0 bottom-0" style={{ left: `${split}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-[2px] bg-surface-container-lowest/90 shadow-lg" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface-container-lowest shadow-card-lg flex items-center justify-center">
          <MIcon name="drag_indicator" size={18} className="text-on-surface" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div className="min-h-[100dvh] w-full bg-surface overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrollY > 50 ? "rgba(250,249,245,0.88)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(24px) saturate(1.3)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(222,192,183,0.4)" : "1px solid transparent",
        }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MIcon name="auto_awesome" fill size={26} className="text-primary" />
            <span className="font-display text-xl font-extrabold text-on-surface tracking-tight">Reroom</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">So geht's</a>
            <a href="#proof" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Ergebnisse</a>
            <a href="#pricing" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Preise</a>
          </div>
          <button onClick={goToApp} className="px-6 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-full hover:bg-primary/90 active:scale-[0.97] transition-all shadow-card">
            Kostenlos starten
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline onEnded={() => setVideoEnded(true)}
          className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.7) saturate(1.1)" }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 85% 75% at center, transparent 20%, var(--color-surface) 72%),
            linear-gradient(to bottom, var(--color-surface) 0%, transparent 18%, transparent 78%, var(--color-surface) 100%),
            linear-gradient(to right, var(--color-surface) 0%, transparent 14%, transparent 86%, var(--color-surface) 100%)`
        }} />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: videoEnded ? 1 : 0, background: "radial-gradient(ellipse 70% 60% at center, rgba(250,249,245,0.94) 0%, rgba(250,249,245,0.65) 50%, transparent 75%)" }} />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20 transition-all duration-1000 ease-out"
          style={{ opacity: videoEnded ? 1 : 0, transform: videoEnded ? "translateY(0)" : "translateY(28px)" }}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/40 mb-8 shadow-card">
            <MIcon name="auto_awesome" fill size={18} className="text-primary" />
            <span className="text-sm font-bold text-primary tracking-wide">Dein persönlicher KI-Interior-Designer</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.05] mb-6"
            style={{ textShadow: "0 0 30px rgba(250,249,245,0.9), 0 0 60px rgba(250,249,245,0.5)" }}>
            Dein Traumzimmer in<br /><span className="text-primary">Sekunden.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface/75 leading-relaxed max-w-[52ch] mx-auto mb-10"
            style={{ textShadow: "0 0 20px rgba(250,249,245,0.9)" }}>
            Schluss mit endlosem Pinterest-Scrollen und teuren Interior-Beratern. Foto machen, Stil wählen — fertig. Die KI macht den Rest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goToApp}
              className="group px-8 py-4 bg-primary text-on-primary text-base font-bold rounded-2xl hover:bg-primary/90 active:scale-[0.97] transition-all shadow-[0_8px_30px_-4px_rgba(164,60,26,0.35)] flex items-center justify-center gap-3">
              Jetzt kostenlos designen
              <MIcon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#how" className="px-8 py-4 glass-panel text-on-surface text-base font-bold rounded-2xl border border-outline-variant/40 hover:border-primary/30 hover:shadow-card-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-card">
              In 60 Sekunden verstehen
            </a>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-on-surface/8">
            {[{ n: "2.000", l: "Gratis-Credits" }, { n: "25+", l: "Design-Stile" }, { n: "3.500+", l: "echte Produkte" }].map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                {i > 0 && <div className="hidden" />}
                <span className="text-2xl font-extrabold text-on-surface font-display">{s.n}</span>
                <span className="text-xs text-on-surface-variant font-medium">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/40 to-surface pointer-events-none" />
        <div id="pain" data-animate className={`max-w-3xl mx-auto px-6 md:px-12 text-center relative transition-all duration-700 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-6">Kennst du das?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: "schedule", text: "Stundenlang auf Pinterest scrollen und am Ende mehr verwirrt als vorher" },
              { icon: "payments", text: "Interior-Berater kosten 500\u20AC+ — und du weißt vorher nicht, ob dir das Ergebnis gefällt" },
              { icon: "shopping_cart", text: "Das perfekte Möbelstück finden, aber nicht wissen wo man es kaufen kann" },
            ].map((p, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 text-left">
                <div className="w-12 h-12 rounded-xl bg-error-container/50 flex items-center justify-center mb-4">
                  <MIcon name={p.icon} size={24} className="text-on-error-container" />
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{p.text}</p>
              </div>
            ))}
          </div>
          <p className="text-lg text-on-surface-variant mt-8 font-medium">
            Du brauchst keinen teuren Berater. Du brauchst <span className="text-primary font-bold">Reroom</span>.
          </p>
        </div>
      </section>

      {/* FULL REDESIGN */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div id="section-redesign" data-animate className={`transition-all duration-700 ${vis("section-redesign") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Full Redesign</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3 leading-tight">Dein Zimmer.<br />Komplett neu gedacht.</h2>
              <p className="text-lg text-on-surface-variant mt-4 leading-relaxed">Fotografiere deinen Raum und lass die KI ein komplett neues Design erstellen — mit echten Möbeln, die du direkt kaufen kannst.</p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: "palette", text: "25+ Stile frei kombinierbar" },
                  { icon: "tune", text: "Intensität stufenlos einstellbar" },
                  { icon: "shopping_bag", text: "Jedes Möbelstück klickbar & kaufbar" },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                    <MIcon name={f.icon} fill size={20} className="text-primary" />
                    <span className="text-sm font-medium">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div id="redesign-video" data-animate className={`transition-all duration-700 delay-200 ${vis("redesign-video") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="rounded-3xl overflow-hidden border border-outline-variant/30 shadow-card-lg">
                <video autoPlay muted loop playsInline className="w-full aspect-[4/3] object-cover">
                  <source src="/demo-redesign.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEKORIEREN */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/30 to-surface pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
            <div id="deko-videos" data-animate className={`order-2 md:order-1 grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${vis("deko-videos") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                { video: "/demo-ostern.mp4", label: "Ostern" },
                { video: "/demo-romantisch.mp4", label: "Romantischer Abend" },
              ].map((uc, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-outline-variant/30 shadow-card-lg">
                  <video autoPlay muted loop playsInline className="w-full aspect-[3/4] object-cover">
                    <source src={uc.video} type="video/mp4" />
                  </video>
                  <div className="p-3 bg-surface-container-lowest text-center">
                    <span className="text-sm font-bold text-on-surface">{uc.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div id="section-deko" data-animate className={`order-1 md:order-2 transition-all duration-700 ${vis("section-deko") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="text-sm font-bold text-tertiary tracking-[0.15em] uppercase">Dekorieren</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3 leading-tight">Dekoriere für<br />jeden Anlass.</h2>
              <p className="text-lg text-on-surface-variant mt-4 leading-relaxed">Ostern, Weihnachten, romantischer Abend — fotografiere deinen Tisch oder deine Ecke, wähle den Anlass und die KI zaubert die perfekte Deko.</p>
              <ul className="mt-6 space-y-3">
                {[
                  { icon: "calendar_month", text: "Saisonale Anlässe auf Knopfdruck" },
                  { icon: "photo_camera", text: "Tisch, Ecke oder ganzen Raum dekorieren" },
                  { icon: "auto_awesome", text: "KI wählt passende Deko-Elemente" },
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                    <MIcon name={f.icon} fill size={20} className="text-tertiary" />
                    <span className="text-sm font-medium">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-20 md:py-28 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-how" data-animate className={`mb-14 transition-all duration-700 ${vis("section-how") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">So einfach geht's</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">3 Schritte zum Traumzimmer</h2>
            <p className="text-lg text-on-surface-variant mt-3 max-w-[50ch]">Kein Zeichnen, kein Messen, kein Warten. In unter einer Minute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "photo_camera", title: "Foto machen", desc: "Fotografiere deinen Raum oder lade ein Bild hoch. Die KI erkennt automatisch Raumtyp, Farben und Möbel.", color: "primary", bgColor: "bg-primary-fixed/40" },
              { step: "02", icon: "palette", title: "Stil wählen", desc: "Wähle aus 25+ Stilen — Scandi, Japandi, Mid-Century, Boho. Stelle die Intensität ein. Fertig.", color: "secondary", bgColor: "bg-secondary-fixed/40" },
              { step: "03", icon: "shopping_bag", title: "Produkte kaufen", desc: "Jedes Möbelstück ist klickbar. Vergleiche Preise bei IKEA, Otto, Amazon — und kaufe direkt.", color: "tertiary", bgColor: "bg-tertiary-fixed/30" },
            ].map((s, i) => (
              <div key={i} id={`step-${i}`} data-animate className={`group transition-all duration-700 ${vis(`step-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 120}ms` }}>
                <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/30 hover:border-primary/20 hover:shadow-card-hover transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-2xl ${s.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform`}>
                    <MIcon name={s.icon} fill size={28} className={`text-${s.color}`} />
                  </div>
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-5xl font-display font-extrabold text-surface-container-high">{s.step}</span>
                    <h3 className="text-xl font-bold text-on-surface">{s.title}</h3>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/30 to-surface pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div id="section-proof" data-animate className={`mb-14 transition-all duration-700 ${vis("section-proof") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Ergebnisse</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">Sieh selbst, was die KI kann</h2>
          </div>
          <div id="proof-demo" data-animate className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${vis("proof-demo") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <BeforeAfter />
            <p className="text-center text-sm text-on-surface-variant mt-4">Ziehe den Slider um Vorher/Nachher zu vergleichen</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 max-w-4xl mx-auto">
            {[
              { icon: "auto_awesome", title: "KI-Raumanalyse", desc: "GPT-4o erkennt Farben, Materialien und Licht. Die Produktvorschläge passen wirklich zu deinem Raum." },
              { icon: "compare", title: "Preisvergleich inklusive", desc: "Jedes Produkt mit Preisen von IKEA, Amazon, Otto, Westwing, Home24. Du findest den besten Deal." },
              { icon: "tune", title: "25+ Stile, dein Mix", desc: "70% Scandi + 30% Japandi? Kein Problem. Mische Stile, stelle die Intensität ein." },
              { icon: "touch_app", title: "Jedes Möbelstück klickbar", desc: "Tippe auf ein Möbelstück im Design und sieh sofort, was es kostet und wo du es kaufen kannst." },
            ].map((f, i) => (
              <div key={i} id={`feat-${i}`} data-animate className={`bg-surface-container-lowest rounded-2xl p-7 border border-outline-variant/30 transition-all duration-700 ${vis(`feat-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center">
                    <MIcon name={f.icon} fill size={22} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-on-surface">{f.title}</h3>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-pricing" data-animate className={`text-center mb-14 transition-all duration-700 ${vis("section-pricing") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Preise</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">Starte kostenlos. Upgraden wenn du willst.</h2>
            <p className="text-lg text-on-surface-variant mt-3 max-w-[45ch] mx-auto">Keine Kreditkarte. Keine Verpflichtung. 2.000 Credits zum Ausprobieren.</p>
          </div>
          <div id="pricing-cards" data-animate className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto transition-all duration-700 delay-200 ${vis("pricing-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { name: "Starter", price: "0", period: "zum Start", credits: "2.000", desc: "Perfekt zum Ausprobieren", features: ["~10 Designs", "Alle 25+ Stile", "Preisvergleich"], cta: "Kostenlos starten", highlight: false },
              { name: "Plus", price: "19,99", period: "/Monat", credits: "9.000", desc: "Für Viel-Designer", features: ["~45 Designs", "Alle Stile + Mix", "Preisvergleich", "Prioritäts-Generierung"], cta: "Plus wählen", highlight: true },
              { name: "Mega", price: "39,99", period: "/Monat", credits: "20.000", desc: "Für Profis & Teams", features: ["~100 Designs", "Alles aus Plus", "Bester Credit-Preis", "Premium Support"], cta: "Mega wählen", highlight: false },
            ].map((tier, i) => (
              <div key={i} className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col ${tier.highlight ? "bg-primary text-on-primary border-primary shadow-[0_8px_30px_-4px_rgba(164,60,26,0.3)] scale-[1.02]" : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/20 hover:shadow-card-hover"}`}>
                {tier.highlight && <div className="text-xs font-bold tracking-wide uppercase mb-3 text-primary-fixed">Beliebteste Wahl</div>}
                <h3 className={`text-xl font-bold ${tier.highlight ? "" : "text-on-surface"}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`text-4xl font-extrabold font-display ${tier.highlight ? "" : "text-on-surface"}`}>{tier.price === "0" ? "Gratis" : `\u20AC${tier.price}`}</span>
                  {tier.price !== "0" && <span className={`text-sm ${tier.highlight ? "text-on-primary/70" : "text-on-surface-variant"}`}>{tier.period}</span>}
                </div>
                <p className={`text-sm mt-1 ${tier.highlight ? "text-on-primary/70" : "text-on-surface-variant"}`}>{tier.credits} Credits — {tier.desc}</p>
                <ul className="mt-5 space-y-2.5 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <MIcon name="check_circle" fill size={18} className={tier.highlight ? "text-primary-fixed" : "text-primary"} />
                      <span className={tier.highlight ? "text-on-primary/90" : "text-on-surface-variant"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={goToApp} className={`mt-6 w-full py-3.5 rounded-2xl font-bold text-sm active:scale-[0.97] transition-all ${tier.highlight ? "bg-surface-container-lowest text-primary hover:bg-surface-container-low shadow-card" : "bg-primary text-on-primary hover:bg-primary/90 shadow-card"}`}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-cta" data-animate className={`relative bg-inverse-surface rounded-[2.5rem] p-10 md:p-16 overflow-hidden transition-all duration-700 ${vis("section-cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/12 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tertiary/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-inverse-on-surface/10 border border-inverse-on-surface/15 mb-8">
                <MIcon name="verified" fill size={18} className="text-inverse-primary" />
                <span className="text-sm font-bold text-inverse-primary">Die Reroom-Garantie</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-inverse-on-surface tracking-tight leading-tight mb-5">
                Gefällt dir dein Design nicht?<br /><span className="text-inverse-primary">Credits zurück.</span>
              </h2>
              <p className="text-lg text-inverse-on-surface/60 leading-relaxed max-w-[50ch] mx-auto mb-4">
                2.000 Credits zum Testen. Keine Kreditkarte. Kein Abo. Wenn du nach dem ersten Design nicht begeistert bist — kein Problem.
              </p>
              <p className="text-sm text-inverse-on-surface/40 mb-10">Über 3.500 Produkte von echten Shops. 25+ Stile. In Sekunden.</p>
              <button onClick={goToApp} className="group px-10 py-4 bg-inverse-on-surface text-inverse-surface text-base font-bold rounded-2xl hover:bg-inverse-on-surface/90 active:scale-[0.97] transition-all shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)] inline-flex items-center gap-3">
                Jetzt dein Zimmer verwandeln
                <MIcon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-outline-variant/30 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <MIcon name="auto_awesome" fill size={20} className="text-primary" />
              <span className="font-display text-lg font-bold text-on-surface tracking-tight">Reroom</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <a href="#" className="hover:text-on-surface transition-colors">Datenschutz</a>
              <a href="#" className="hover:text-on-surface transition-colors">Impressum</a>
              <a href="#" className="hover:text-on-surface transition-colors">Kontakt</a>
            </div>
            <p className="text-sm text-outline">&copy; {new Date().getFullYear()} Reroom. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
