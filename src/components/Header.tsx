import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Home, Leaf, Lightbulb, Globe, Cpu, Calendar, Mail, Sun, Moon, Menu, X } from 'lucide-react';
import LanguageModal from './LanguageModal';

const FLAGS = [
  { code: 'de', country: 'Germany', path: '/flag/germany.gif' },
  { code: 'en', country: 'United Kingdom', path: '/flag/uk.gif' },
  { code: 'es', country: 'Spain', path: '/flag/spain.gif' },
  { code: 'fr', country: 'France', path: '/flag/french.gif' },
  // Add more languages from the first header if needed
];

const TRANSLATIONS = {
  en: {
    Home: 'Home',
    Sustainability: 'Sustainability',
    Innovation: 'Innovation',
    GlobalImpact: 'Global Impact',
    FutureTech: 'Future Tech',
    Events: 'Events',
    Contact: 'Contact',
    ThemeToggle: 'Toggle theme',
    Language: 'Language',
    HomeTip: 'Welcome to our hub for German sustainability and innovation',
    SustainabilityTip: 'Explore Germany’s initiatives in renewable energy and green technologies',
    InnovationTip: 'Discover cutting-edge innovations in AI, robotics, and medicine from Germany',
    GlobalImpactTip: 'Learn how German technology is making a worldwide difference',
    FutureTechTip: 'Glimpse into the future with quantum computing and environmental tech',
    EventsTip: 'Stay updated with conferences and exhibitions on innovation',
    ContactTip: 'Reach out for inquiries, partnerships, and collaborations',
    ThemeToggleTip: 'Switch between light and dark mode',
    LanguageTip: 'Choose your language to experience the site in your preferred language',
  },
  de: {
    Home: 'Startseite',
    Sustainability: 'Nachhaltigkeit',
    Innovation: 'Innovation',
    GlobalImpact: 'Globale Wirkung',
    FutureTech: 'Zukunftstechnologie',
    Events: 'Veranstaltungen',
    Contact: 'Kontakt',
    ThemeToggle: 'Thema wechseln',
    Language: 'Sprache',
    HomeTip: 'Willkommen in unserem Zentrum für deutsche Nachhaltigkeit und Innovation',
    SustainabilityTip: 'Entdecken Sie Deutschlands Initiativen in erneuerbarer Energie und grünen Technologien',
    InnovationTip: 'Erfahren Sie mehr über bahnbrechende Innovationen in KI, Robotik und Medizin aus Deutschland',
    GlobalImpactTip: 'Erfahren Sie, wie deutsche Technologie weltweit einen Unterschied macht',
    FutureTechTip: 'Ein Blick in die Zukunft mit Quantencomputing und Umwelttechnologie',
    EventsTip: 'Bleiben Sie auf dem Laufenden mit Konferenzen und Ausstellungen zu Innovation',
    ContactTip: 'Kontaktieren Sie uns für Anfragen, Partnerschaften und Kooperationen',
    ThemeToggleTip: 'Wechseln Sie zwischen hellem und dunklem Modus',
    LanguageTip: 'Wählen Sie Ihre Sprache, um die Website in Ihrer bevorzugten Sprache zu erleben',
  },
  es: {
    Home: 'Inicio',
    Sustainability: 'Sostenibilidad',
    Innovation: 'Innovación',
    GlobalImpact: 'Impacto Global',
    FutureTech: 'Tecnología del Futuro',
    Events: 'Eventos',
    Contact: 'Contacto',
    ThemeToggle: 'Cambiar tema',
    Language: 'Idioma',
    HomeTip: 'Bienvenido a nuestro centro de sostenibilidad e innovación alemana',
    SustainabilityTip: 'Explora las iniciativas de Alemania en energía renovable y tecnologías verdes',
    InnovationTip: 'Descubre innovaciones de vanguardia en IA, robótica y medicina desde Alemania',
    GlobalImpactTip: 'Aprende cómo la tecnología alemana está marcando una diferencia mundial',
    FutureTechTip: 'Echa un vistazo al futuro con la informática cuántica y la tecnología ambiental',
    EventsTip: 'Mantente actualizado con conferencias y exposiciones sobre innovación',
    ContactTip: 'Contáctanos para consultas, asociaciones y colaboraciones',
    ThemeToggleTip: 'Cambia entre el modo claro y oscuro',
    LanguageTip: 'Elige tu idioma para experimentar el sitio en tu idioma preferido',
  },
  fr: {
    Home: 'Accueil',
    Sustainability: 'Durabilité',
    Innovation: 'Innovation',
    GlobalImpact: 'Impact Global',
    FutureTech: 'Technologie du Futur',
    Events: 'Événements',
    Contact: 'Contact',
    ThemeToggle: 'Changer de thème',
    Language: 'Langue',
    HomeTip: 'Bienvenue dans notre centre pour la durabilité et l’innovation allemande',
    SustainabilityTip: 'Découvrez les initiatives allemandes en matière d’énergie renouvelable et de technologies vertes',
    InnovationTip: 'Découvrez des innovations de pointe en IA, robotique et médecine en provenance d’Allemagne',
    GlobalImpactTip: 'Apprenez comment la technologie allemande fait une différence à l’échelle mondiale',
    FutureTechTip: 'Un aperçu de l’avenir avec l’informatique quantique et la technologie environnementale',
    EventsTip: 'Restez informé des conférences et expositions sur l’innovation',
    ContactTip: 'Contactez-nous pour des demandes, partenariats et collaborations',
    ThemeToggleTip: 'Passez du mode clair au mode sombre',
    LanguageTip: 'Choisissez votre langue pour découvrir le site dans votre langue préférée',
  },
};

const globalStyles = `
@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes pulse {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 0.2;
  }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const EnhancedTooltip = ({ content, isVisible, isDarkTheme, parentRect }) => {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isVisible && tooltipRef.current && parentRect) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      let left = parentRect.left + parentRect.width / 2 - tooltipRect.width / 2;
      const top = parentRect.bottom + 8;

      if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }
      if (left < 10) {
        left = 10;
      }

      setPosition({ top, left });
    }
  }, [isVisible, parentRect]);

  if (!isVisible) return null;

  return (
    <div
      ref={tooltipRef}
      className={`fixed z-[1000] px-4 py-2 rounded-xl shadow-2xl
        bg-green-900/90 text-white border border-green-500/30
        w-max max-w-40 transition-all duration-200 ease-in-out backdrop-blur-sm
        transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        animation: 'tooltipFadeIn 0.2s ease-out',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(34, 197, 94, 0.2)',
      }}
    >
      <div className="text-xs font-light leading-tight">{content}</div>
      <div
        className={`absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0
          border-l-[6px] border-l-transparent
          border-r-[6px] border-r-transparent
          border-b-[6px] border-b-green-900/90`}
      ></div>
      <div
        className={`absolute inset-0 rounded-xl bg-green-500/10
          opacity-20 blur-md -z-10 animate-[pulse_2s_ease-in-out_infinite]`}
      ></div>
    </div>
  );
};

const FlagButton = ({ onClick, onMouseEnter, onMouseLeave, tooltip, isDarkTheme }) => {
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFlagIndex((prevIndex) =>
        prevIndex === FLAGS.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseEnter = () => {
    setShowTooltip(true);
    if (onMouseEnter) onMouseEnter();
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    if (onMouseLeave) onMouseLeave();
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex items-center justify-center h-8 w-8 rounded-full bg-[#1A361F] border border-[#244A2A] transition-all duration-200 hover:bg-[#244A2A] hover:shadow-[0_0_10px_rgba(34,197,94,0.5)]`}
        type="button"
      >
        <img
          src={FLAGS[currentFlagIndex].path}
          alt={FLAGS[currentFlagIndex].country}
          className="h-5 w-5 hover:opacity-80"
        />
      </button>
      <EnhancedTooltip
        content={tooltip}
        isVisible={showTooltip}
        isDarkTheme={isDarkTheme}
        parentRect={buttonRef.current?.getBoundingClientRect()}
      />
    </div>
  );
};

const GermanSustainabilityHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const [tooltips, setTooltips] = useState({
    home: false,
    sustainability: false,
    innovation: false,
    globalImpact: false,
    futureTech: false,
    events: false,
    contact: false,
    theme: false,
    language: false,
  });

  const buttonRefs = {
    home: useRef(null),
    sustainability: useRef(null),
    innovation: useRef(null),
    globalImpact: useRef(null),
    futureTech: useRef(null),
    events: useRef(null),
    contact: useRef(null),
    theme: useRef(null),
    language: useRef(null),
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inject global styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = globalStyles;
    document.head.appendChild(styleEl);
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  const handleThemeToggle = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleLanguageModalToggle = () => {
    setShowLanguageModal((prev) => !prev);
    setIsMobileMenuOpen(false); // Close mobile menu when opening modal
  };

  const handleSelectLanguage = useCallback((languageCode) => {
    setLanguage(languageCode);
    setShowLanguageModal(false);
  }, []);

  const showTooltip = (name) => {
    setTooltips((prev) => ({ ...prev, [name]: true }));
  };

  const hideTooltip = (name) => {
    setTooltips((prev) => ({ ...prev, [name]: false }));
  };

  // Button styles based on state
  const getButtonStyle = (isActive) => {
    return `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 text-sm font-medium whitespace-nowrap
      ${
        isDarkTheme
          ? isActive
            ? 'bg-green-800 text-white'
            : 'text-green-100 hover:bg-green-800/50'
          : isActive
          ? 'bg-green-700 text-white'
          : 'text-white hover:bg-green-700/30'
      }`;
  };

  return (
    <>
      <header
        className={`w-full z-40 transition-all duration-300 ${
          isScrolled ? 'fixed top-0 left-0 right-0 shadow-lg' : 'relative'
        } bg-[#000A00] text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 h-16 md:h-20">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <img
                src="/germany-for-future-logo-white.png"
                alt="German Innovation & Sustainability Logo"
                className="h-10 w-auto"
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <div className="relative">
                <button
                  ref={buttonRefs.home}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('home')}
                  onMouseLeave={() => hideTooltip('home')}
                >
                  <Home className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].Home}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].HomeTip}
                  isVisible={tooltips.home}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.home.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.sustainability}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('sustainability')}
                  onMouseLeave={() => hideTooltip('sustainability')}
                >
                  <Leaf className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].Sustainability}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].SustainabilityTip}
                  isVisible={tooltips.sustainability}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.sustainability.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.innovation}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('innovation')}
                  onMouseLeave={() => hideTooltip('innovation')}
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].Innovation}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].InnovationTip}
                  isVisible={tooltips.innovation}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.innovation.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.globalImpact}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('globalImpact')}
                  onMouseLeave={() => hideTooltip('globalImpact')}
                >
                  <Globe className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].GlobalImpact}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].GlobalImpactTip}
                  isVisible={tooltips.globalImpact}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.globalImpact.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.futureTech}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('futureTech')}
                  onMouseLeave={() => hideTooltip('futureTech')}
                >
                  <Cpu className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].FutureTech}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].FutureTechTip}
                  isVisible={tooltips.futureTech}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.futureTech.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.events}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('events')}
                  onMouseLeave={() => hideTooltip('events')}
                >
                  <Calendar className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].Events}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].EventsTip}
                  isVisible={tooltips.events}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.events.current?.getBoundingClientRect()}
                />
              </div>

              <div className="relative">
                <button
                  ref={buttonRefs.contact}
                  className={getButtonStyle(false)}
                  onMouseEnter={() => showTooltip('contact')}
                  onMouseLeave={() => hideTooltip('contact')}
                >
                  <Mail className="h-4 w-4" />
                  <span>{TRANSLATIONS[language].Contact}</span>
                </button>
                <EnhancedTooltip
                  content={TRANSLATIONS[language].ContactTip}
                  isVisible={tooltips.contact}
                  isDarkTheme={isDarkTheme}
                  parentRect={buttonRefs.contact.current?.getBoundingClientRect()}
                />
              </div>

              {/* Theme and Language Buttons */}
              <div className="flex items-center space-x-3 ml-2">
                <div className="relative">
                  <FlagButton
                    onClick={handleLanguageModalToggle}
                    onMouseEnter={() => showTooltip('language')}
                    onMouseLeave={() => hideTooltip('language')}
                    tooltip={TRANSLATIONS[language].LanguageTip}
                    isDarkTheme={isDarkTheme}
                  />
                </div>

                <div className="relative">
                  <button
                    ref={buttonRefs.theme}
                    onClick={handleThemeToggle}
                    className="p-2 rounded-full bg-[#1A361F] hover:bg-[#244A2A] transition-colors"
                    aria-label="Toggle theme"
                    onMouseEnter={() => showTooltip('theme')}
                    onMouseLeave={() => hideTooltip('theme')}
                  >
                    {isDarkTheme ? (
                      <Sun className="h-5 w-5 text-[#F9E68C]" />
                    ) : (
                      <Moon className="h-5 w-5 text-[#E0F5E6]" />
                    )}
                  </button>
                  <EnhancedTooltip
                    content={TRANSLATIONS[language].ThemeToggleTip}
                    isVisible={tooltips.theme}
                    isDarkTheme={isDarkTheme}
                    parentRect={buttonRefs.theme.current?.getBoundingClientRect()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A1C10] border-t border-[#1A361F]">
            <div className="flex flex-col space-y-1 p-4">
              <button className={getButtonStyle(false)}>
                <Home className="h-4 w-4" />
                <span>{TRANSLATIONS[language].Home}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Leaf className="h-4 w-4" />
                <span>{TRANSLATIONS[language].Sustainability}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Lightbulb className="h-4 w-4" />
                <span>{TRANSLATIONS[language].Innovation}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Globe className="h-4 w-4" />
                <span>{TRANSLATIONS[language].GlobalImpact}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Cpu className="h-4 w-4" />
                <span>{TRANSLATIONS[language].FutureTech}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Calendar className="h-4 w-4" />
                <span>{TRANSLATIONS[language].Events}</span>
              </button>

              <button className={getButtonStyle(false)}>
                <Mail className="h-4 w-4" />
                <span>{TRANSLATIONS[language].Contact}</span>
              </button>

              <div className="pt-2 flex justify-between items-center border-t border-[#1A361F] mt-2">
                <span className="text-sm text-[#A7D5AF]">
                  {TRANSLATIONS[language].Language}
                </span>
                <FlagButton
                  onClick={handleLanguageModalToggle}
                  tooltip={TRANSLATIONS[language].LanguageTip}
                  isDarkTheme={isDarkTheme}
                />
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-[#1A361F] mt-2">
                <span className="text-sm text-[#A7D5AF]">
                  {TRANSLATIONS[language].ThemeToggle}
                </span>
                <button
                  onClick={handleThemeToggle}
                  className="p-2 rounded-full bg-[#1A361F] hover:bg-[#244A2A] transition-colors"
                >
                  {isDarkTheme ? (
                    <Sun className="h-5 w-5 text-[#F9E68C]" />
                  ) : (
                    <Moon className="h-5 w-5 text-[#E0F5E6]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {showLanguageModal && (
        <LanguageModal
          onClose={handleLanguageModalToggle}
          onSelectLanguage={handleSelectLanguage}
        />
      )}
    </>
  );
};

export default GermanSustainabilityHeader;