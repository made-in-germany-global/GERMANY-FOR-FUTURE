import React from 'react';
import { X, Globe, MapPin } from 'lucide-react';

// Define domain interface
interface Domain {
  url: string;
  flag: string;
  country: string;
}

// Define props interface
interface DomainsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  regionaleDomains: Domain[];
  subdomainsEuropa: Domain[];
  subdomainsAmerika: Domain[];
  subdomainsAsien: Domain[];
  subdomainsNahost: Domain[];
  subdomainsAfrika: Domain[];
}

// Define translations for DomainsModal content
const TRANSLATIONS: Record<string, {
  modalTitle: string;
  closeModal: string;
}> = {
  en: {
    modalTitle: "Complete Global Domain Network",
    closeModal: "Close"
  },
  de: {
    modalTitle: "Komplettes globales Domain-Netzwerk",
    closeModal: "Schließen"
  },
  es: {
    modalTitle: "Red global completa de dominios",
    closeModal: "Cerrar"
  },
  fr: {
    modalTitle: "Réseau mondial complet de domaines",
    closeModal: "Fermer"
  },
  it: {
    modalTitle: "Rete globale completa di domini",
    closeModal: "Chiudere"
  },
  nl: {
    modalTitle: "Volledig wereldwijd domeinnetwerk",
    closeModal: "Sluiten"
  },
  sa: {
    modalTitle: "شبكة المجالات العالمية الكاملة",
    closeModal: "إغلاق"
  },
  hk: {
    modalTitle: "完整全球域名網絡",
    closeModal: "關閉"
  },
  sg: {
    modalTitle: "完整全球域名网络",
    closeModal: "关闭"
  },
  za: {
    modalTitle: "Volledige wêreldwye domeinnetwerk",
    closeModal: "Sluit"
  },
  kr: {
    modalTitle: "완전한 글로벌 도메인 네트워크",
    closeModal: "닫기"
  },
  jp: {
    modalTitle: "完全なグローバルドメインネットワーク",
    closeModal: "閉じる"
  },
};

// Define flag mappings
const DOMAIN_flag: Record<string, string> = {
  // Main Domains
  "made-in-germany.world": '/flag/world.gif',
  "made-in-germany-first.com": '/flag/germany.gif',
  "made-in-germany.asia": '/flag/singapore.gif',
  "made-in-germany.africa": '/flag/south-africa.gif',
  "made-in-germany.lat": '/flag/spain.gif',
  "made-in-germany-arab.com": '/flag/arab-league.gif',
  "made-in-germany-arabia.com": '/flag/arab-league.gif',
  "made-in-germany.my": '/flag/malaysia.gif',
  "made-in-germany.com.in": '/flag/india.gif',
  "madeingermany.in": '/flag/india.gif',
  "made-in-germany.china": '/flag/china.gif',

  // Subdomains: Europa
  "made-in-germany.global/de": '/flag/germany.gif',
  "made-in-germany.global/fr": '/flag/french.gif',
  "made-in-germany.global/es": '/flag/spain.gif',
  "made-in-germany.global/it": '/flag/italy.gif',
  "made-in-germany.global/nl": '/flag/netherlands.gif',
  "made-in-germany.global/pl": '/flag/poland.gif',
  "made-in-germany.global/se": '/flag/sweden.gif',
  "made-in-germany.global/ch": '/flag/switzerland.gif',
  "made-in-germany.global/at": '/flag/austria.gif',
  "made-in-germany.global/uk": '/flag/uk.gif',
  "made-in-germany.global/fi": '/flag/finland.gif',
  "made-in-germany.global/ir": '/flag/ireland.gif',

  // Subdomains: Amerika
  "made-in-germany.global/us": '/flag/united-states.gif',
  "made-in-germany.global/ca": '/flag/canada.gif',
  "made-in-germany.global/mx": '/flag/mexico.gif',
  "made-in-germany.global/br": '/flag/brazil.gif',
  "made-in-germany.global/ar": '/flag/argentina.gif',
  "made-in-germany.global/co": '/flag/colombia.gif',

  // Subdomains: Asien
  "made-in-germany.global/cn": '/flag/china.gif',
  "made-in-germany.global/in": '/flag/india.gif',
  "made-in-germany.global/jp": '/flag/japan.gif',
  "made-in-germany.global/kr": '/flag/south-korea.gif',
  "made-in-germany.global/id": '/flag/indonesia.gif',
  "made-in-germany.global/th": '/flag/thailand.gif',
  "made-in-germany.global/vn": '/flag/vietnam.gif',
  "made-in-germany.global/ph": '/flag/philippines.gif',
  "made-in-germany.global/sg": '/flag/singapore.gif',

  // Subdomains: Nahost (Middle East)
  "made-in-germany.global/ae": '/flag/arab.gif',
  "made-in-germany.global/sa": '/flag/saudi.gif',
  "made-in-germany.global/eg": '/flag/egypt.gif',
  "made-in-germany.global/qa": '/flag/qatar.gif',
  "made-in-germany.global/kw": '/flag/kuwait.gif',
  "made-in-germany.global/om": '/flag/oman.gif',

  // Subdomains: Afrika
  "made-in-germany.global/za": '/flag/south-africa.gif',
  "made-in-germany.global/ng": '/flag/niger.gif',
  "made-in-germany.global/ma": '/flag/morocco.gif',
  "made-in-germany.global/ke": '/flag/kenya.gif',
  "made-in-germany.global/gh": '/flag/ghana.gif',
  "made-in-germany.global/ci": '/flag/chile.gif',
};

// Define country mappings
const DOMAIN_COUNTRIES: Record<string, string> = {
  // Main Domains
  "made-in-germany.world": "Global",
  "made-in-germany-first.com": "Germany",
  "made-in-germany.asia": "Asia (Singapore)",
  "made-in-germany.africa": "Africa (South Africa)",
  "made-in-germany.lat": "Latin America (Spain)",
  "made-in-germany-arab.com": "Arab League",
  "made-in-germany-arabia.com": "Arab League",
  "made-in-germany.my": "Malaysia",
  "made-in-germany.com.in": "India",
  "madeingermany.in": "India",
  "made-in-germany.china": "China",

  // Subdomains: Europa
  "made-in-germany.global/de": "Germany",
  "made-in-germany.global/fr": "France",
  "made-in-germany.global/es": "Spain",
  "made-in-germany.global/it": "Italy",
  "made-in-germany.global/nl": "Netherlands",
  "made-in-germany.global/pl": "Poland",
  "made-in-germany.global/se": "Sweden",
  "made-in-germany.global/ch": "Switzerland",
  "made-in-germany.global/at": "Austria",
  "made-in-germany.global/uk": "United Kingdom",
  "made-in-germany.global/fi": "Finland",
  "made-in-germany.global/ir": "Ireland",

  // Subdomains: Amerika
  "made-in-germany.global/us": "United States",
  "made-in-germany.global/ca": "Canada",
  "made-in-germany.global/mx": "Mexico",
  "made-in-germany.global/br": "Brazil",
  "made-in-germany.global/ar": "Argentina",
  "made-in-germany.global/co": "Colombia",

  // Subdomains: Asien
  "made-in-germany.global/cn": "China",
  "made-in-germany.global/in": "India",
  "made-in-germany.global/jp": "Japan",
  "made-in-germany.global/kr": "South Korea",
  "made-in-germany.global/id": "Indonesia",
  "made-in-germany.global/th": "Thailand",
  "made-in-germany.global/vn": "Vietnam",
  "made-in-germany.global/ph": "Philippines",
  "made-in-germany.global/sg": "Singapore",

  // Subdomains: Nahost (Middle East)
  "made-in-germany.global/ae": "United Arab Emirates",
  "made-in-germany.global/sa": "Saudi Arabia",
  "made-in-germany.global/eg": "Egypt",
  "made-in-germany.global/qa": "Qatar",
  "made-in-germany.global/kw": "Kuwait",
  "made-in-germany.global/om": "Oman",

  // Subdomains: Afrika
  "made-in-germany.global/za": "South Africa",
  "made-in-germany.global/ng": "Nigeria",
  "made-in-germany.global/ma": "Morocco",
  "made-in-germany.global/ke": "Kenya",
  "made-in-germany.global/gh": "Ghana",
  "made-in-germany.global/ci": "Ivory Coast",
};

const DomainsModal: React.FC<DomainsModalProps> = ({
  isOpen,
  onClose,
  language,
  regionaleDomains,
  subdomainsEuropa,
  subdomainsAmerika,
  subdomainsAsien,
  subdomainsNahost,
  subdomainsAfrika,
}) => {
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide"
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(16px)',
        padding: '2rem 0',
      }}
    >
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes text-glow {
            0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.3); }
            50% { text-shadow: 0 0 16px rgba(255, 255, 255, 0.5); }
          }
        `}
      </style>
      <div className="min-h-full flex items-start justify-center px-4">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl w-full max-w-5xl my-8 ring-1 ring-white/20 relative backdrop-blur-sm">
          {/* White Grid Background */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
          {/* Modal Header */}
          <div className="sticky top-[-35px] px-6 py-5 flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-lg z-10">
            <div className="flex items-center gap-3 mt-5">
              <div className="absolute top-4 left-4 right-4 flex space-x-1 h-1">
                <div className="w-1/3 bg-black rounded-full"></div>
                <div className="w-1/3 bg-red-600 rounded-full"></div>
                <div className="w-1/3 bg-yellow-400 rounded-full"></div>
              </div>
              <Globe className="h-8 w-8 text-gray-200 animate-[spin-slow_10s_linear_infinite]" />
              <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-text-glow">
                {translations.modalTitle}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center mt-5 w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 hover:bg-gray-700 transition-all duration-300 shadow-md"
            >
              <X className="h-6 w-6 text-gray-200" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6">
            <div className="space-y-12">
              {/* Regionale & marktrelevante Domains */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Regionale & marktrelevante Domains</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {regionaleDomains.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subdomains: Europa */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Subdomains: Europa</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subdomainsEuropa.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subdomains: Amerika */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Subdomains: Amerika</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subdomainsAmerika.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subdomains: Asien */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Subdomains: Asien</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subdomainsAsien.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subdomains: Nahost */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Subdomains: Nahost</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subdomainsNahost.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subdomains: Afrika */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-6 w-6 text-gray-200" />
                  <h4 className="text-2xl text-gray-200 font-semibold">Subdomains: Afrika</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {subdomainsAfrika.map((domain, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-all duration-300 shadow-lg hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-400 font-medium">
                        {DOMAIN_COUNTRIES[domain.url]}
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden shadow-md shadow-black/50 transition-shadow duration-300">
                          <img
                            src={DOMAIN_flag[domain.url] || '/flag/default.gif'}
                            alt={`${DOMAIN_COUNTRIES[domain.url]} flag`}
                            className="w-full h-full object-cover transition-transform duration-300"
                          />
                        </div>
                        <a
                          href={`https://${domain.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-200 font-semibold transition-colors duration-300 truncate"
                        >
                          {domain.url}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainsModal;