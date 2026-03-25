import { useState, useEffect, useRef, useCallback } from "react";

const APP_URL = "https://web-production-e82a5.up.railway.app";
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

function LegalShell({ title, children, onBack }: { title: string; children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="min-h-[100dvh] w-full bg-surface">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2.5 hover:opacity-70 transition-opacity">
            <MIcon name="auto_awesome" fill size={26} className="text-primary" />
            <span className="font-display text-xl font-extrabold text-on-surface tracking-tight">Reroom</span>
          </button>
          <button onClick={onBack} className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1">
            <MIcon name="arrow_back" size={18} />
            Zurück
          </button>
        </div>
      </nav>
      <div className="pt-28 pb-20 max-w-3xl mx-auto px-6 md:px-12">
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-10">{title}</h1>
        <div className="prose-legal text-on-surface-variant text-[15px] leading-relaxed space-y-6">
          {children}
        </div>
      </div>
      <footer className="border-t border-outline-variant/30 py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center text-sm text-outline">
          &copy; {new Date().getFullYear()} Simpli GmbH. Alle Rechte vorbehalten.
        </div>
      </footer>
    </div>
  );
}

function ImpressumPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Impressum" onBack={onBack}>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Angaben gemäß § 5 TMG</h2>
        <p>
          Simpli GmbH<br />
          Am Lenkwerk 9<br />
          33609 Bielefeld<br />
          Deutschland
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Vertreten durch</h2>
        <p>Geschäftsführer: Tim Hoppe &amp; Dennis Melson</p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Kontakt</h2>
        <p>
          Telefon: +49 15888 725814<br />
          E-Mail: info@simpli.bot
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Registereintrag</h2>
        <p>
          Handelsregister: Amtsgericht Bielefeld<br />
          Registernummer: HRB 44387
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Umsatzsteuer-ID</h2>
        <p>
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
          DE326245802
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>
          Tim Hoppe<br />
          Am Lenkwerk 9<br />
          33609 Bielefeld
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">EU-Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit.
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Haftung für Inhalte</h2>
        <p>
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
          allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
          zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p>
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
          Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
          der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Haftung für Links</h2>
        <p>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
          Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
          Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Urheberrecht</h2>
        <p>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
          Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
        </p>
      </div>
    </LegalShell>
  );
}

function DatenschutzPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Datenschutzerklärung" onBack={onBack}>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">1. Datenschutz auf einen Blick</h2>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Allgemeine Hinweise</h3>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
          passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen
          Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Datenerfassung auf dieser Website</h3>
        <p>
          <strong className="text-on-surface">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:<br /><br />
          Simpli GmbH<br />
          Am Lenkwerk 9<br />
          33609 Bielefeld<br />
          E-Mail: info@simpli.bot<br />
          Telefon: +49 15888 725814
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Wie erfassen wir Ihre Daten?</h3>
        <p>
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.&thinsp;B. um
          Daten handeln, die Sie in ein Kontaktformular eingeben.
        </p>
        <p>
          Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
          IT-Systeme erfasst. Das sind vor allem technische Daten (z.&thinsp;B. Internetbrowser, Betriebssystem oder
          Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Wofür nutzen wir Ihre Daten?</h3>
        <p>
          Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
          Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
        <p>
          Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
          gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
          oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben,
          können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht,
          unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
          Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">2. Hosting</h2>
        <p>
          Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten,
          die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
          es sich v.&thinsp;a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
          Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
        </p>
        <p>
          Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
          bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
          effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1
          lit. f DSGVO).
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Datenschutz</h3>
        <p>
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
          personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
          dieser Datenschutzerklärung.
        </p>
        <p>
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.&thinsp;B. bei der Kommunikation per E-Mail)
          Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
          nicht möglich.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
          eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf
          erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Recht auf Datenübertragbarkeit</h3>
        <p>
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
          automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format
          aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen
          verlangen, erfolgt dies nur, soweit es technisch machbar ist.
        </p>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Auskunft, Löschung und Berichtigung</h3>
        <p>
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
          Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
          der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie
          zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">4. Datenerfassung auf dieser Website</h2>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Server-Log-Dateien</h3>
        <p>
          Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
          die Ihr Browser automatisch an uns übermittelt. Dies sind:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Browsertyp und Browserversion</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p className="mt-3">
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
          Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">5. Plugins und Tools</h2>
        <h3 className="font-semibold text-on-surface mt-4 mb-1">Google Fonts</h3>
        <p>
          Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts,
          die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten
          Fonts in Ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.
        </p>
        <p>
          Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen.
          Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde.
          Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">6. KI-generierte Inhalte</h2>
        <p>
          Reroom nutzt künstliche Intelligenz (KI) zur Generierung von Raumdesign-Vorschlägen. Dabei werden
          von Ihnen hochgeladene Fotos an KI-Dienste (Google Gemini, OpenAI) übermittelt und verarbeitet.
          Die hochgeladenen Bilder werden ausschließlich zur Erstellung der Designvorschläge verwendet
          und nicht für Trainingszwecke der KI-Modelle eingesetzt. Die Verarbeitung erfolgt auf Grundlage
          Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) bzw. zur Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO).
        </p>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">7. Zahlungsabwicklung</h2>
        <p>
          Für die Zahlungsabwicklung nutzen wir den Dienst Stripe (Stripe, Inc., 510 Townsend Street,
          San Francisco, CA 94103, USA). Bei einem Kauf werden die zur Zahlungsabwicklung erforderlichen
          Daten an Stripe übermittelt. Stripe verarbeitet diese Daten gemäß seiner eigenen Datenschutzrichtlinie.
          Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).
        </p>
      </div>
    </LegalShell>
  );
}

function KontaktPage({ onBack }: { onBack: () => void }) {
  return (
    <LegalShell title="Kontakt" onBack={onBack}>
      <p className="text-lg text-on-surface">
        Du hast eine Frage, ein Problem oder möchtest uns einfach Feedback geben? Wir freuen uns, von dir zu hören.
      </p>
      <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/30 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MIcon name="mail" fill size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">E-Mail</h3>
            <a href="mailto:info@simpli.bot" className="text-primary hover:underline">info@simpli.bot</a>
            <p className="text-sm text-on-surface-variant mt-1">Wir antworten in der Regel innerhalb von 24 Stunden.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MIcon name="phone" fill size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">Telefon</h3>
            <a href="tel:+4915888725814" className="text-primary hover:underline">+49 15888 725814</a>
            <p className="text-sm text-on-surface-variant mt-1">Mo–Fr, 9–17 Uhr</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <MIcon name="location_on" fill size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">Adresse</h3>
            <p>
              Simpli GmbH<br />
              Am Lenkwerk 9<br />
              33609 Bielefeld
            </p>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold text-on-surface mb-2">Betreiber</h2>
        <p>
          Reroom ist ein Produkt der Simpli GmbH.<br />
          Geschäftsführer: Tim Hoppe &amp; Dennis Melson<br />
          Handelsregister: Amtsgericht Bielefeld, HRB 44387<br />
          USt-IdNr: DE326245802
        </p>
      </div>
    </LegalShell>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.location.hash = p === "home" ? "" : p;
    window.scrollTo(0, 0);
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [videoEnded, setVideoEnded] = useState(false);
  const [heroStage, setHeroStage] = useState(0); // 0=hidden, 1=eyebrow, 2=typing line1, 3=typing line2, 4=sub+buttons, 5=stats
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

  // Hash routing
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

  useEffect(() => {
    if (videoEnded && heroStage === 0) setHeroStage(1);
  }, [videoEnded, heroStage]);

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
    <div className="min-h-[100dvh] w-full bg-surface overflow-x-hidden">

      {/* ═══════════════ NAV ═══════════════ */}
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
            <a href="#how" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">So geht&apos;s</a>
            <a href="#proof" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Ergebnisse</a>
            <a href="#pricing" className="text-sm font-semibold text-on-surface-variant hover:text-on-surface transition-colors">Preise</a>
          </div>
          <button onClick={goToApp} className="px-6 py-2.5 bg-primary text-on-primary text-sm font-bold rounded-full hover:bg-primary/90 active:scale-[0.97] transition-all shadow-card">
            Kostenlos starten
          </button>
        </div>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <video ref={videoRef} autoPlay muted playsInline onEnded={() => { setVideoEnded(true); setHeroPaused(true); }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.7) saturate(1.1)", transform: "translateZ(0)", backfaceVisibility: "hidden" }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {heroPaused && (
          <button onClick={() => { const v = videoRef.current; if (v) { v.currentTime = 0; v.play(); setHeroPaused(false); setVideoEnded(false); } }}
            className="absolute bottom-8 right-8 z-20 w-14 h-14 rounded-full bg-surface-container-lowest/80 backdrop-blur-md shadow-card-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <MIcon name="play_arrow" fill size={28} className="text-primary ml-0.5" />
          </button>
        )}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 85% 75% at center, transparent 20%, var(--color-surface) 72%),
            linear-gradient(to bottom, var(--color-surface) 0%, transparent 18%, transparent 78%, var(--color-surface) 100%),
            linear-gradient(to right, var(--color-surface) 0%, transparent 14%, transparent 86%, var(--color-surface) 100%)`
        }} />
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{ opacity: videoEnded ? 1 : 0, background: "radial-gradient(ellipse 70% 60% at center, rgba(250,249,245,0.94) 0%, rgba(250,249,245,0.65) 50%, transparent 75%)" }} />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-surface to-transparent pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 py-20">
          {/* Eyebrow — fade in */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/40 mb-8 shadow-card transition-all duration-700 ${heroStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onTransitionEnd={() => { if (heroStage === 1) setHeroStage(2); }}>
            <MIcon name="auto_awesome" fill size={18} className="text-primary" />
            <span className="text-sm font-bold text-primary tracking-wide">Dein persönlicher KI-Interior-Designer</span>
          </div>

          {/* Headline — fade in */}
          <h1 className={`font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.05] mb-6 transition-all duration-800 ${heroStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ textShadow: "0 0 30px rgba(250,249,245,0.9), 0 0 60px rgba(250,249,245,0.5)" }}
            onTransitionEnd={() => heroStage === 2 && setHeroStage(4)}>
            Bevor du kaufst —<br /><span className="text-primary">sieh, wie es wirklich aussieht.</span>
          </h1>

          {/* Subline — fade in */}
          <p className={`text-lg md:text-xl text-on-surface/75 leading-relaxed max-w-[52ch] mx-auto mb-10 transition-all duration-700 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ textShadow: "0 0 20px rgba(250,249,245,0.9)" }}>
            Ein Foto, ein Stil, wenige Sekunden. Und du weißt endlich, ob das Sofa, die Wandfarbe oder die Tisch-Deko wirklich passt — bevor du einen Cent ausgibst.
          </p>

          {/* Buttons — fade in */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-200 ${heroStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            onTransitionEnd={() => heroStage === 4 && setHeroStage(5)}>
            <button onClick={goToApp}
              className="group px-8 py-4 bg-primary text-on-primary text-base font-bold rounded-2xl hover:bg-primary/90 active:scale-[0.97] transition-all shadow-[0_8px_30px_-4px_rgba(164,60,26,0.35)] flex items-center justify-center gap-3">
              Jetzt kostenlos designen
              <MIcon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#how" className="px-8 py-4 glass-panel text-on-surface text-base font-bold rounded-2xl border border-outline-variant/40 hover:border-primary/30 hover:shadow-card-lg active:scale-[0.97] transition-all flex items-center justify-center gap-2 shadow-card">
              In 60 Sekunden verstehen
            </a>
          </div>

          {/* Stats — fade in */}
          <div className={`flex items-center justify-center gap-8 mt-12 pt-8 border-t border-on-surface/8 transition-all duration-700 ${heroStage >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-on-surface font-display">2.000</span>
              <span className="text-xs text-on-surface-variant font-medium">Gratis-Credits</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/40" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-on-surface font-display">25+</span>
              <span className="text-xs text-on-surface-variant font-medium">Design-Stile</span>
            </div>
            <div className="w-px h-8 bg-outline-variant/40" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-extrabold text-on-surface font-display">30.000+</span>
              <span className="text-xs text-on-surface-variant font-medium">echte Produkte</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PAIN — Brief an die Leserin ═══════════════ */}
      <section className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/20 to-surface pointer-events-none" />
        <div id="pain" data-animate className={`max-w-[720px] mx-auto px-6 md:px-12 relative transition-all duration-700 ${vis("pain") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Brief-Papier */}
          <div className="relative bg-surface-container-lowest rounded-[2rem] px-8 md:px-14 py-12 md:py-16 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_8px_40px_rgba(0,0,0,0.03)]">
            {/* Linker Briefpapier-Strich */}
            <div className="absolute left-4 md:left-8 top-10 bottom-10 w-[2px] rounded-full bg-primary-fixed-dim/30" />

            {/* Absender */}
            <div className="flex items-center gap-2 mb-10 pl-4 md:pl-6">
              <MIcon name="auto_awesome" fill size={18} className="text-primary/60" />
              <span className="text-xs font-bold text-primary/50 tracking-[0.2em] uppercase">Ein ehrliches Wort von Reroom</span>
            </div>

            <div className="text-on-surface-variant text-[17px] md:text-lg leading-[1.85] space-y-5 pl-4 md:pl-6">
              <p className="text-on-surface font-semibold text-xl md:text-2xl leading-snug">
                Das Teuerste ist nicht das falsche Möbelstück — sondern ein Zuhause, das du nur <span className="text-primary">okay</span> findest, statt es zu <span className="text-primary">lieben</span>.
              </p>
              <p className="text-on-surface font-medium">
                Wir kennen das. Weil wir genauso sind.
              </p>
              <p>
                Du scrollst abends durch Pinterest. Speicherst Bilder. Hunderte. Dieses Wohnzimmer in Greige-Tönen. Diese Küche mit den offenen Regalen. Dieses Kinderzimmer, das aussieht wie aus einem skandinavischen Katalog.
              </p>
              <p>
                Du weißt <span className="text-on-surface font-semibold">ganz genau</span>, was dir gefällt.
              </p>
              <p className="text-on-surface font-medium">
                Das war noch nie dein Problem.
              </p>

              {/* Trennlinie */}
              <div className="w-12 h-px bg-outline-variant/40 my-2" />

              <p>
                Dein Problem beginnt am Samstag im Baumarkt. 200 Farbtöne auf winzigen Kärtchen. „Greige" heißt der eine, „Sandstein" der andere — und beide sehen unter Neonlicht identisch aus. Du nimmst einen mit nach Hause, hältst ihn an die Wand und denkst: <span className="text-on-surface font-semibold italic">&ldquo;Sieht das jetzt gut aus oder einfach nur grau?&rdquo;</span>
              </p>
              <p className="text-on-surface font-medium">
                Also lässt du es. Erstmal.
              </p>
              <p>
                Oder du bestellst das Sofa. Das, was online <span className="text-on-surface font-semibold">so unglaublich toll</span> aussah. Auf dem Foto. Im perfekt ausgeleuchteten Showroom. Bei dir im Wohnzimmer steht es dann da wie ein Fremdkörper. Zu groß. Falscher Farbton. Passt nicht zum Boden. Retournieren? Mit dem Karton, der den halben Flur blockiert?
              </p>
              <p className="text-on-surface font-medium">
                Nee.
              </p>
              <p>
                Also bleibt es stehen. Und du gewöhnst dich dran. Wie an die leere Ecke im Schlafzimmer. Da fehlt irgendwas — ein Sessel vielleicht? Eine Stehlampe? Ein Regal? Du überlegst seit Monaten, aber jede Idee fühlt sich an wie ein <span className="text-on-surface font-semibold">Blindflug mit echtem Geld</span>.
              </p>
              <p>
                Und dann Ostern. Oder der Geburtstag. Oder einfach mal ein schönes Dinner. Du willst den Tisch hübsch decken, aber woher die Ideen nehmen? Die Deko bei Depot sieht im Laden gut aus — aber bei dir auf dem Tisch? Keine Ahnung.
              </p>
              <p className="text-on-surface font-medium">
                Also passiert... erstmal nichts.
              </p>
              <p>
                Wieder ein Monat. Das Zimmer sieht noch genauso aus. Die Ecke ist noch leer. Der Esstisch noch kahl. Und dieser Gedanke bleibt:
              </p>
              <p className="text-on-surface font-bold text-xl md:text-2xl text-center italic py-2">
                &ldquo;Irgendwann mache ich das mal.&rdquo;
              </p>

              {/* Trennlinie */}
              <div className="w-12 h-px bg-primary/20 my-2 mx-auto" />

              <p className="text-on-surface font-medium text-lg md:text-xl">
                Hier sind die guten Nachrichten:
              </p>
              <p>
                Du musst nicht mehr raten. Nicht mehr hoffen, dass es passt. Nicht mehr 200€ für ein Kissen-und-Decken-Set ausgeben, das dann doch nicht zum Rest passt.
              </p>
              <p className="text-on-surface font-semibold text-xl md:text-2xl leading-snug">
                Du kannst es jetzt einfach <span className="text-primary">sehen</span> — bevor du irgendwas kaufst.
              </p>
              <p>
                Ein Foto von deinem Raum. Ein Stil deiner Wahl. Und in wenigen Sekunden zeigt dir die KI, wie dein Zimmer mit neuen Möbeln, einer neuen Wandfarbe oder einer komplett neuen Einrichtung aussehen würde.
              </p>
              <p className="text-on-surface font-medium">
                Alles echt. Alles kaufbar. Mit Preisvergleich.
              </p>
              <p>
                Kein Blindflug mehr. Kein Raten. Kein <span className="text-on-surface font-semibold italic">&ldquo;Irgendwann&rdquo;</span>.
              </p>
            </div>

            {/* Unterschrift + CTA */}
            <div className="mt-10 pl-4 md:pl-6 flex flex-col items-start gap-6">
              <div>
                <p className="text-on-surface-variant italic text-base">— Das Reroom Team</p>
                <p className="text-on-surface-variant/50 text-sm mt-1">P.S. Die ersten 2.000 Credits sind kostenlos.</p>
              </div>
              <button onClick={goToApp}
                className="group px-8 py-4 bg-primary text-on-primary text-base font-bold rounded-2xl hover:bg-primary/90 active:scale-[0.97] transition-all shadow-[0_8px_30px_-4px_rgba(164,60,26,0.35)] flex items-center gap-3">
                Jetzt kostenlos ausprobieren
                <MIcon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES — Flowing sections ═══════════════ */}
      <div className="relative">

        {/* ── FULL REDESIGN — Text links, Video rechts ── */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
              <div id="section-redesign" data-animate className={`transition-all duration-700 ${vis("section-redesign") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Full Redesign</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3 leading-tight">Dein Zuhause.<br />Komplett neu gedacht.</h2>
                <p className="text-lg text-on-surface-variant mt-4 leading-relaxed">Fotografiere deinen Raum und lass die KI ein komplett neues Design erstellen — mit echten Möbeln, die du direkt kaufen kannst.</p>
                <ul className="mt-6 space-y-3">
                  {[
                    { icon: "palette", text: "25+ Stile frei kombinierbar" },
                    { icon: "tune", text: "Von dezent bis komplett neu — du entscheidest wie mutig" },
                    { icon: "shopping_bag", text: "Jedes Möbelstück klickbar & kaufbar" },
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                      <MIcon name={f.icon} fill size={20} className="text-primary" />
                      <span className="text-sm font-medium">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="redesign-video" data-animate className={`relative transition-all duration-700 delay-200 ${vis("redesign-video") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="relative overflow-hidden rounded-3xl">
                  <video ref={redesignVideoRef} autoPlay muted playsInline
                    className="w-full aspect-[4/3] object-cover"
                    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform", isolation: "isolate" }}
                    onEnded={() => setRedesignPaused(true)}>
                    <source src="/demo-redesign.mp4" type="video/mp4" />
                  </video>
                  {/* Gradient fade edges */}
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(to right, var(--color-surface) 0%, transparent 8%, transparent 92%, var(--color-surface) 100%), linear-gradient(to bottom, var(--color-surface) 0%, transparent 6%, transparent 94%, var(--color-surface) 100%)"
                  }} />
                  {redesignPaused && (
                    <button onClick={() => { const v = redesignVideoRef.current; if (v) { v.currentTime = 0; v.play(); setRedesignPaused(false); } }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                      <div className="w-16 h-16 rounded-full bg-surface-container-lowest/90 shadow-card-lg flex items-center justify-center hover:scale-105 transition-transform">
                        <MIcon name="play_arrow" fill size={36} className="text-primary ml-1" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ZIMMER EINRICHTEN — Video links, Text rechts ── */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
              <div id="zimmer-video" data-animate className={`order-2 md:order-1 relative transition-all duration-700 ${vis("zimmer-video") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <div className="relative overflow-hidden rounded-3xl">
                  <video ref={zimmerVideoRef} autoPlay muted playsInline
                    className="w-full aspect-[4/3] object-cover"
                    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform", isolation: "isolate" }}
                    onEnded={() => setZimmerPaused(true)}>
                    <source src="/demo-kinderzimmer.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: "linear-gradient(to right, var(--color-surface) 0%, transparent 8%, transparent 92%, var(--color-surface) 100%), linear-gradient(to bottom, var(--color-surface) 0%, transparent 6%, transparent 94%, var(--color-surface) 100%)"
                  }} />
                  {zimmerPaused && (
                    <button onClick={() => { const v = zimmerVideoRef.current; if (v) { v.currentTime = 0; v.play(); setZimmerPaused(false); } }}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                      <div className="w-16 h-16 rounded-full bg-surface-container-lowest/90 shadow-card-lg flex items-center justify-center hover:scale-105 transition-transform">
                        <MIcon name="play_arrow" fill size={36} className="text-secondary ml-1" />
                      </div>
                    </button>
                  )}
                </div>
              </div>
              <div id="section-zimmer" data-animate className={`order-1 md:order-2 transition-all duration-700 ${vis("section-zimmer") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                <span className="text-sm font-bold text-secondary tracking-[0.15em] uppercase">Zimmer einrichten</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3 leading-tight">Jedes Zimmer.<br /><span className="text-secondary">Perfekt eingerichtet.</span></h2>
                <p className="text-lg text-on-surface-variant mt-4 leading-relaxed">Kinderzimmer, Schlafzimmer, Home-Office — fotografiere den Raum und die KI richtet ihn komplett ein. Mit echten Möbeln aus über 30.000 Produkten.</p>
                <ul className="mt-6 space-y-3">
                  {[
                    { icon: "child_care", text: "Kinderzimmer altersgerecht gestalten" },
                    { icon: "bed", text: "Schlafzimmer, Bad, Küche — jeder Raum" },
                    { icon: "shopping_bag", text: "Alle Möbel direkt kaufbar mit Preisvergleich" },
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-on-surface-variant">
                      <MIcon name={f.icon} fill size={20} className="text-secondary" />
                      <span className="text-sm font-medium">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TISCH-DEKO — Text links, Videos rechts (sequential) ── */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div id="section-deko" data-animate className={`transition-all duration-700 ${vis("section-deko") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
                {/* Text links */}
                <div>
                  <span className="text-sm font-bold text-tertiary tracking-[0.15em] uppercase">Neu: Tisch &amp; Deko</span>
                  <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3 leading-tight">
                    Dein Tisch, fertig<br /><span className="text-tertiary">dekoriert.</span>
                  </h2>
                  <p className="text-lg text-on-surface-variant mt-4 leading-relaxed">
                    Foto vom Tisch machen, Anlass wählen — und in wenigen Sekunden siehst du, wie dein Tisch perfekt gedeckt aussieht. Jedes Teil direkt kaufbar.
                  </p>
                  {/* Anlass-Chips */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {[
                      { icon: "egg_alt", label: "Ostern", color: "bg-[#FFF3E0] text-[#E65100] border-[#FFE0B2]" },
                      { icon: "park", label: "Weihnachten", color: "bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]" },
                      { icon: "cake", label: "Geburtstag", color: "bg-primary-fixed/50 text-primary border-primary-fixed-dim/50" },
                      { icon: "local_florist", label: "Frühling", color: "bg-[#FCE4EC] text-[#C62828] border-[#F8BBD0]" },
                      { icon: "celebration", label: "Silvester", color: "bg-[#EDE7F6] text-[#4527A0] border-[#D1C4E9]" },
                      { icon: "dinner_dining", label: "Dinner", color: "bg-surface-container-high text-on-surface border-outline-variant/40" },
                      { icon: "edit", label: "Eigene Idee...", color: "bg-surface-container text-on-surface-variant border-outline-variant/30" },
                    ].map((o, i) => (
                      <div key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold cursor-default select-none ${o.color}`}>
                        <MIcon name={o.icon} fill size={14} />
                        {o.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos rechts — nacheinander */}
                <div className="flex gap-4">
                  {/* Ostern */}
                  <div className="flex-1 relative overflow-hidden rounded-3xl">
                    <video ref={osternVideoRef} autoPlay muted playsInline
                      className="w-full aspect-[3/4] object-cover"
                      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform", isolation: "isolate" }}
                      onEnded={() => {
                        setOsternPaused(true);
                        setOsternFinished(true);
                        // Start the second video
                        const v = romantischVideoRef.current;
                        if (v) { v.currentTime = 0; v.play(); }
                      }}>
                      <source src="/demo-ostern.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 6%, transparent 94%, var(--color-surface) 100%), linear-gradient(to right, transparent 90%, var(--color-surface) 100%)"
                    }} />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-sm font-bold text-on-surface/80 drop-shadow-sm">Ostern</span>
                    </div>
                    {osternPaused && (
                      <button onClick={() => { const v = osternVideoRef.current; if (v) { v.currentTime = 0; v.play(); setOsternPaused(false); } }}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                        <div className="w-12 h-12 rounded-full bg-surface-container-lowest/90 shadow-card-lg flex items-center justify-center hover:scale-105 transition-transform">
                          <MIcon name="play_arrow" fill size={28} className="text-tertiary ml-0.5" />
                        </div>
                      </button>
                    )}
                  </div>
                  {/* Romantischer Abend — paused initially, plays after Ostern ends */}
                  <div className="flex-1 relative overflow-hidden rounded-3xl">
                    <video ref={romantischVideoRef} muted playsInline
                      className="w-full aspect-[3/4] object-cover"
                      style={{ transform: "translateZ(0)", backfaceVisibility: "hidden", willChange: "transform", isolation: "isolate" }}
                      onEnded={() => setRomantischPaused(true)}>
                      <source src="/demo-romantisch.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 pointer-events-none" style={{
                      background: "linear-gradient(to bottom, var(--color-surface) 0%, transparent 6%, transparent 94%, var(--color-surface) 100%), linear-gradient(to left, transparent 90%, var(--color-surface) 100%)"
                    }} />
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <span className="text-sm font-bold text-on-surface/80 drop-shadow-sm">Romantischer Abend</span>
                    </div>
                    {/* Show play button if not yet started or if finished */}
                    {(romantischPaused || !osternFinished) && (
                      <button onClick={() => { const v = romantischVideoRef.current; if (v) { v.currentTime = 0; v.play(); setRomantischPaused(false); setOsternFinished(true); } }}
                        className="absolute inset-0 flex items-center justify-center cursor-pointer z-10">
                        <div className="w-12 h-12 rounded-full bg-surface-container-lowest/90 shadow-card-lg flex items-center justify-center hover:scale-105 transition-transform">
                          <MIcon name="play_arrow" fill size={28} className="text-tertiary ml-0.5" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>{/* End flowing features wrapper */}

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how" className="py-20 md:py-28 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-how" data-animate className={`mb-14 transition-all duration-700 ${vis("section-how") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">So einfach geht&apos;s</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">
              3 Schritte. Wenige Sekunden.
            </h2>
            <p className="text-lg text-on-surface-variant mt-3 max-w-[50ch]">
              Kein Zeichnen, kein Messen, kein Warten. Handy raus — los geht&apos;s.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "photo_camera", title: "Foto machen", desc: "Fotografiere deinen Raum — muss nicht aufgeräumt sein. Die KI erkennt Raumtyp, Farben und Möbel automatisch.", color: "primary", bgColor: "bg-primary-fixed/40" },
              { step: "02", icon: "palette", title: "Stil wählen", desc: "Skandinavisch, Boho, Japandi, Modern — 25+ Stile. Stell ein, wie stark die Veränderung sein soll.", color: "secondary", bgColor: "bg-secondary-fixed/40" },
              { step: "03", icon: "shopping_bag", title: "Staunen & kaufen", desc: "In wenigen Sekunden siehst du dein Zimmer — neu gestaltet. Jedes Produkt ist real, klickbar und mit Preisvergleich.", color: "tertiary", bgColor: "bg-tertiary-fixed/30" },
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

      {/* ═══════════════ PROOF — Ergebnisse ═══════════════ */}
      <section id="proof" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface-container-low/30 to-surface pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
          <div id="section-proof" data-animate className={`mb-14 transition-all duration-700 ${vis("section-proof") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Ergebnisse</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">
              Sieh selbst, was die KI kann
            </h2>
          </div>
          <div id="proof-demo" data-animate className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${vis("proof-demo") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <BeforeAfter />
            <p className="text-center text-sm text-on-surface-variant mt-4">
              Ziehe den Slider um Vorher/Nachher zu vergleichen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 max-w-4xl mx-auto">
            {[
              { icon: "auto_awesome", title: "KI-Raumanalyse", desc: "Erkennt deine Farben, Materialien und Licht. Vorschläge, die wirklich zu deinem Raum passen — nicht random aus einem Katalog." },
              { icon: "compare", title: "Preisvergleich inklusive", desc: "Jedes Produkt mit Preisen von IKEA, Amazon, Otto, Westwing, Home24. Du findest den besten Deal — ohne selbst zu suchen." },
              { icon: "tune", title: "Von dezent bis komplett neu", desc: "Intensitäts-Regler: nur ein paar neue Kissen — oder ich will hier alles anders. Du entscheidest, wie mutig es wird." },
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

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-pricing" data-animate className={`text-center mb-14 transition-all duration-700 ${vis("section-pricing") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-primary tracking-[0.15em] uppercase">Preise</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mt-3">
              Starte kostenlos. Upgrade wenn du willst.
            </h2>
            <p className="text-lg text-on-surface-variant mt-3 max-w-[50ch] mx-auto">
              Keine Kreditkarte. Keine Verpflichtung. 2.000 Credits zum Ausprobieren.
            </p>
          </div>
          <div id="pricing-cards" data-animate className={`grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto transition-all duration-700 delay-200 ${vis("pricing-cards") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {[
              { name: "Starter", price: "0", period: "zum Start", credits: "2.000", desc: "Zum Ausprobieren", features: ["~10 Designs", "Alle 25+ Stile", "Preisvergleich", "Tisch-Deko"], cta: "Kostenlos starten", highlight: false },
              { name: "Plus", price: "19,99", period: "/Monat", credits: "9.000", desc: "Für dein Projekt", features: ["~45 Designs", "Alle Stile + Mix", "Preisvergleich", "Tisch-Deko", "Prioritäts-Generierung"], cta: "Plus wählen", highlight: true },
              { name: "Mega", price: "39,99", period: "/Monat", credits: "20.000", desc: "Wenn du jedes Zimmer anpackst", features: ["~100 Designs", "Alles aus Plus", "Bester Credit-Preis", "Premium Support"], cta: "Mega wählen", highlight: false },
            ].map((tier, i) => (
              <div key={i} className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col ${tier.highlight ? "bg-primary text-on-primary border-primary shadow-[0_8px_30px_-4px_rgba(164,60,26,0.3)] scale-[1.02]" : "bg-surface-container-lowest border-outline-variant/30 hover:border-primary/20 hover:shadow-card-hover"}`}>
                {tier.highlight && <div className="text-xs font-bold tracking-wide uppercase mb-3 text-primary-fixed">Beliebteste Wahl</div>}
                <h3 className={`text-xl font-bold ${tier.highlight ? "" : "text-on-surface"}`}>{tier.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`text-4xl font-extrabold font-display ${tier.highlight ? "" : "text-on-surface"}`}>{tier.price === "0" ? "Gratis" : `€${tier.price}`}</span>
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

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div id="section-cta" data-animate className={`relative bg-inverse-surface rounded-[2.5rem] p-10 md:p-16 overflow-hidden transition-all duration-700 ${vis("section-cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/12 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tertiary/8 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-inverse-on-surface tracking-tight leading-tight mb-5">
                Du weißt, dass da mehr geht.<br /><span className="text-inverse-primary">Jetzt siehst du es.</span>
              </h2>
              <p className="text-lg text-inverse-on-surface/60 leading-relaxed max-w-[50ch] mx-auto mb-4">
                Ein Foto. Wenige Sekunden. Und du siehst dein Zuhause so, wie du es dir immer vorgestellt hast.
                Kein Risiko — 2.000 Credits zum Testen, keine Kreditkarte.
              </p>
              <p className="text-sm text-inverse-on-surface/40 mb-10">
                Über 30.000 Produkte von echten Shops. 25+ Stile. Preisvergleich inklusive.
              </p>
              <button onClick={goToApp} className="group px-10 py-4 bg-inverse-on-surface text-inverse-surface text-base font-bold rounded-2xl hover:bg-inverse-on-surface/90 active:scale-[0.97] transition-all shadow-[0_8px_30px_-4px_rgba(0,0,0,0.3)] inline-flex items-center gap-3">
                Jetzt kostenlos starten
                <MIcon name="arrow_forward" size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-outline-variant/30 py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <MIcon name="auto_awesome" fill size={20} className="text-primary" />
              <span className="font-display text-lg font-bold text-on-surface tracking-tight">Reroom</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-on-surface-variant">
              <button onClick={() => navigate("datenschutz")} className="hover:text-on-surface transition-colors">Datenschutz</button>
              <button onClick={() => navigate("impressum")} className="hover:text-on-surface transition-colors">Impressum</button>
              <button onClick={() => navigate("kontakt")} className="hover:text-on-surface transition-colors">Kontakt</button>
            </div>
            <p className="text-sm text-outline">&copy; {new Date().getFullYear()} Simpli GmbH. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
