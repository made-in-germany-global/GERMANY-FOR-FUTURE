import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faChartLine, faSeedling } from '@fortawesome/free-solid-svg-icons';

// Define props interface for InfoSection
interface InfoSectionProps {
  language?: string;
}

// Define translations for InfoSection content
const TRANSLATIONS: Record<string, {
  title: string;
  description: string;
  qualityTitle: string;
  qualityText: string;
  globalReachTitle: string;
  globalReachText: string;
  technologyTitle: string;
  technologyText: string;
}> = {
  en: {
    title: "QUALITY CRAFTSMANSHIP, GLOBAL REACH, AND TECHNOLOGICAL LEADERSHIP",
    description: "Rooted in German excellence, we prioritize precision engineering, worldwide collaboration, and advanced technology to deliver reliable solutions that meet the demands of a dynamic global market.",
    qualityTitle: "UNMATCHED QUALITY:",
    qualityText: "Our rigorous standards and skilled craftsmanship ensure durable, high-performing products for clients.",
    globalReachTitle: "GLOBAL REACH:",
    globalReachText: "We establish strong, lasting partnerships across diverse international markets with expertise.",
    technologyTitle: "TECHNOLOGICAL EDGE:",
    technologyText: "Advanced innovations streamline operations and deliver tailored, efficient solutions to clients."
  },
  de: {
    title: "QUALITÄT, GLOBALE REICHWEITE UND TECHNOLOGISCHE FÜHRUNG",
    description: "Mit Wurzeln in deutscher Exzellenz setzen wir auf präzise Ingenieurskunst, weltweite Zusammenarbeit und fortschrittliche Technologie, um verlässliche Lösungen für einen dynamischen globalen Markt zu bieten.",
    qualityTitle: "UNVERGLEICHLICHE QUALITÄT:",
    qualityText: "Strenge Standards und meisterliches Handwerk garantieren langlebige, leistungsstarke Produkte.",
    globalReachTitle: "GLOBALE REICHWEITE:",
    globalReachText: "Wir bauen starke, dauerhafte Partnerschaften in vielfältigen internationalen Märkten auf.",
    technologyTitle: "TECHNOLOGISCHER VORSPRUNG:",
    technologyText: "Moderne Innovationen optimieren Abläufe und bieten maßgeschneiderte, effiziente Lösungen."
  },
  es: {
    title: "CALIDAD ARTESANAL, ALCANCE GLOBAL Y LIDERAZGO TECNOLÓGICO",
    description: "Arraigados en la excelencia alemana, priorizamos la ingeniería precisa, la colaboración mundial y la tecnología avanzada para ofrecer soluciones fiables que satisfacen las demandas de un mercado global dinámico.",
    qualityTitle: "CALIDAD INIGUALABLE:",
    qualityText: "Estándares estrictos y artesanía experta aseguran productos duraderos y eficientes.",
    globalReachTitle: "ALCANCE GLOBAL:",
    globalReachText: "Formamos asociaciones fuertes y duraderas en diversos mercados internacionales.",
    technologyTitle: "VENTAJA TECNOLÓGICA:",
    technologyText: "Innovaciones avanzadas optimizan procesos y ofrecen soluciones efectivas personalizadas."
  },
  fr: {
    title: "QUALITÉ ARTISANALE, PORTÉE GLOBALE ET LEADERSHIP TECHNOLOGIQUE",
    description: "Enracinés dans l’excellence allemande, nous privilégions l’ingénierie précise, la collaboration mondiale et la technologie avancée pour fournir des solutions fiables répondant aux exigences d’un marché mondial dynamique.",
    qualityTitle: "QUALITÉ INÉGALÉE:",
    qualityText: "Normes strictes et savoir-faire garantissent des produits durables et performants.",
    globalReachTitle: "PORTÉE GLOBALE:",
    globalReachText: "Nous créons des partenariats solides et durables sur divers marchés mondiaux.",
    technologyTitle: "AVANTAGE TECHNOLOGIQUE:",
    technologyText: "Innovations de pointe rationalisent les opérations et offrent des solutions sur mesure."
  },
  it: {
    title: "QUALITÀ ARTIGIANALE, PORTATA GLOBALE E LEADERSHIP TECNOLOGICO",
    description: "Radicate nell’eccellenza tedesca, diamo priorità all’ingegneria precisa, alla collaborazione globale e alla tecnologia avanzata per offrire soluzioni affidabili che soddisfano le esigenze di un mercato globale dinamico.",
    qualityTitle: "QUALITÀ INEGUAGLIABILE:",
    qualityText: "Standard rigorosi e maestria artigianale assicurano prodotti durevoli e performanti.",
    globalReachTitle: "PORTATA GLOBALE:",
    globalReachText: "Costruiamo partnership solide e durature in vari mercati internazionali.",
    technologyTitle: "VANTAGGIO TECNOLOGICO:",
    technologyText: "Innovazioni avanzate ottimizzano i processi e offrono soluzioni efficienti su misura."
  },
  nl: {
    title: "KWALITEITSVAKMANSCHAP, GLOBAAL BEREIK EN TECHNOLOGISCH LEIDERSCHAP",
    description: "Geworteld in Duitse excellentie, geven wij prioriteit aan precisie-engineering, wereldwijde samenwerking en geavanceerde technologie om betrouwbare oplossingen te bieden die voldoen aan de eisen van een dynamische wereldmarkt.",
    qualityTitle: "ONGEËVENAARDE KWALITEIT:",
    qualityText: "Strenge normen en vakmanschap garanderen duurzame, hoogwaardige producten voor klanten.",
    globalReachTitle: "GLOBAAL BEREIK:",
    globalReachText: "We smeden sterke, blijvende partnerschappen in diverse wereldmarkten met expertise.",
    technologyTitle: "TECHNOLOGISCH VOORDEEL:",
    technologyText: "Geavanceerde innovaties stroomlijnen processen en leveren maatwerkoplossingen efficiënt."
  },
  sa: {
    title: "جودة الصنعة، الانتشار العالمي والريادة التكنولوجية",
    description: "متجذرون في التميز الألماني، نحن نركز على الهندسة الدقيقة، التعاون العالمي والتكنولوجيا المتقدمة لتقديم حلول موثوقة تلبي متطلبات السوق العالمي الديناميكي.",
    qualityTitle: "جودة لا تضاهى:",
    qualityText: "معايير صارمة ومهارة حرفية تضمن منتجات متينة وعالية الأداء.",
    globalReachTitle: "الانتشار العالمي:",
    globalReachText: "نؤسس شراكات قوية ودائمة عبر أسواق عالمية متنوعة.",
    technologyTitle: "التفوق التكنولوجي:",
    technologyText: "الابتكارات المتطورة تبسط العمليات وتقدم حلولًا فعالة مخصصة."
  },
  hk: {
    title: "德國工藝品質、全球覆蓋與技術領先",
    description: "植根於德國卓越傳統，我們專注於精準工程、全球合作及先進技術，提供可靠解決方案，滿足動態全球市場的需求。",
    qualityTitle: "無與倫比的品質:",
    qualityText: "嚴格標準與精湛工藝確保產品耐用且性能卓越。",
    globalReachTitle: "全球覆蓋:",
    globalReachText: "我們在多樣化的國際市場建立穩固且持久的合作。",
    technologyTitle: "技術優勢:",
    technologyText: "尖端創新優化運營並提供高效、定制的解決方案。"
  },
  sg: {
    title: "德国工艺品质、全球覆盖与技术领先",
    description: "植根于德国卓越传统，我们专注于精准工程、全球合作及先进技术，提供可靠解决方案，满足动态全球市场的需求。",
    qualityTitle: "无与伦比的品质:",
    qualityText: "严格标准与精湛工艺确保产品耐用且性能卓越。",
    globalReachTitle: "全球覆盖:",
    globalReachText: "我们在多样化的国际市场建立稳固且持久的合作。",
    technologyTitle: "技术优势:",
    technologyText: "尖端创新优化运营并提供高效、定制的解决方案。"
  },
  kr: {
    title: "독일 장인정신 품질, 글로벌 확장, 기술 리더십",
    description: "독일의 우수성에 뿌리를 두고, 우리는 정밀 엔지니어링, 글로벌 협력, 첨단 기술에 중점을 두어 역동적인 글로벌 시장의 요구를 충족하는 신뢰할 수 있는 솔루션을 제공합니다.",
    qualityTitle: "타의 추종을 불허하는 품질:",
    qualityText: "엄격한 기준과 숙련된 기술로 내구성과 성능을 보장합니다.",
    globalReachTitle: "글로벌 확장:",
    globalReachText: "다양한 국제 시장에서 강력하고 지속적인 파트너십을 구축합니다.",
    technologyTitle: "기술 우위:",
    technologyText: "최첨단 혁신으로 운영을 간소화하고 맞춤형 솔루션을 제공합니다."
  },
  jp: {
    title: "ドイツの職人技品質、グローバル展開、技術的リーダーシップ",
    description: "ドイツの卓越性に根ざし、精密工学、グローバルな協力、先進技術を重視し、ダイナミックなグローバル市場の要求に応える信頼性の高いソリューションを提供します。",
    qualityTitle: "比類なき品質:",
    qualityText: "厳格な基準と熟練技術で耐久性と性能を確保します。",
    globalReachTitle: "グローバル展開:",
    globalReachText: "多様な国際市場で強固で持続的なパートナーシップを築きます。",
    technologyTitle: "技術的優位性:",
    technologyText: "最先端技術で業務を効率化し、カスタム解決策を提供します。"
  },
  za: {
    title: "KWALITEITSVAKMANSKAP, GLOBAAL BEREIK EN TEGNOLOGIESE LEIERSKAP",
    description: "Gewortel in Duitse uitnemendheid, fokus ons op presiese ingenieurswese, wêreldwye samewerking en gevorderde tegnologie om betroubare oplossings te lewer wat voldoen aan die eise van ’n dinamiese globale mark.",
    qualityTitle: "ONGEËWENAARDE KWALITEIT:",
    qualityText: "Streng standaarde en vakmanskap waarborg duursaamheid en prestasie.",
    globalReachTitle: "GLOBAAL BEREIK:",
    globalReachText: "Ons bou sterk, blywende vennootskappe in diverse globale markte.",
    technologyTitle: "TEGNOLOGIESE VOORSPRONG:",
    technologyText: "Nuutste innovasies stroomlyn prosesse en bied pasgemaakte oplossings."
  },
};

const InfoSection: React.FC<InfoSectionProps> = ({ language = 'en' }) => {
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  return (
    <div className="bg-[#0B111F] rounded-2xl w-full max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 px-8 py-20">
        {/* Left Section */}
        <div className="flex-1 max-w-xl mx-auto lg:pl-12">
          <h2 className="font-sans text-4xl font-bold text-white uppercase tracking-wide text-center leading-tight mb-8">
            {translations.title}
          </h2>
          <p className="text-white text-[20px] font-normal leading-relaxed text-center lg:text-left">
            {translations.description}
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 lg:pr-2">
          <div className="space-y-8">
            {/* Quality - White (#FFFFFF) */}
            <div className="flex items-start gap-4">
              <div className="text-white mt-1">
                <FontAwesomeIcon icon={faHandshake} size="5x" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold mb-3">
                  {translations.qualityTitle}
                </h3>
                <p className="text-white text-lg leading-relaxed">
                  {translations.qualityText}
                </p>
              </div>
            </div>

            {/* Global Reach - Red (#FF0000) */}
            <div className="flex items-start gap-8">
              <div className="text-[#FF0000]">
                <FontAwesomeIcon icon={faChartLine} size="5x" />
              </div>
              <div>
                <h3 className="text-[#FF0000] text-2xl font-bold mb-3">
                  {translations.globalReachTitle}
                </h3>
                <p className="text-[#FF0000] text-lg leading-relaxed">
                  {translations.globalReachText}
                </p>
              </div>
            </div>

            {/* Technology - Gold/Yellow (#FFCE00) */}
            <div className="flex items-start gap-8">
              <div className="text-[#FFCE00]">
                <FontAwesomeIcon icon={faSeedling} size="5x" />
              </div>
              <div>
                <h3 className="text-[#FFCE00] text-2xl font-bold mb-3">
                  {translations.technologyTitle}
                </h3>
                <p className="text-[#FFCE00] text-lg leading-relaxed">
                  {translations.technologyText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;