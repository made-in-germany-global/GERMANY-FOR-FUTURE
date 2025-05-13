import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Globe } from 'lucide-react';

// Define props interface for LegalAndProtection
interface LegalAndProtectionProps {
  language?: string;
}

// Define translations for LegalAndProtection content
const TRANSLATIONS: Record<string, {
  title: string; // Base title without "MADE IN GERMANY ©" for consistent coloring
  subHeading: string;
  legalContact: {
    name: string;
    address: string;
    phone1: string;
    phone2: string;
    fax: string;
    email: string;
    website: string;
  };
  additionalContent: string;
}> = {
  en: {
    title: "Legal Excellence & Customer Protection",
    subHeading: "At MADE IN GERMANY AG - UK LIMITED, we prioritize your protection and security, fostering trust through unparalleled reliability and legal expertise.",
    legalContact: {
      name: "Law Firm Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Germany",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "As MADE IN GERMANY AG - UK LIMITED, we are steadfast in our commitment to making customer protection our foremost priority. Our mission is to underscore the safety and security of our clients, establishing a foundation of trust through dependable legal services. Reliability is at the heart of everything we do. Partnering with Law Firm Bernd Fiessler, we deliver comprehensive legal solutions—ranging from stringent regulatory compliance to robust intellectual property safeguards and strategic business protection. With decades of expertise in German and international law, our team ensures that your rights, assets, and interests are defended with precision and integrity. Contact us to experience how our dedication to reliability and customer-centric protection sets us apart."
  },
  de: {
    title: "Rechtliche Exzellenz & Kundenschutz",
    subHeading: "Bei MADE IN GERMANY AG - UK LIMITED stellen wir Ihren Schutz und Ihre Sicherheit an erste Stelle und schaffen Vertrauen durch unübertroffene Zuverlässigkeit und rechtliche Kompetenz.",
    legalContact: {
      name: "Rechtsanwaltskanzlei Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Deutschland",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "Als MADE IN GERMANY AG - UK LIMITED verpflichten wir uns nachhaltig dazu, den Schutz unserer Kunden zur obersten Priorität zu machen. Unser Ziel ist es, die Sicherheit und den Schutz unserer Kunden hervorzuheben, um eine Grundlage des Vertrauens durch verlässliche juristische Dienstleistungen zu schaffen. Zuverlässigkeit steht im Mittelpunkt all unserer Bemühungen. In Zusammenarbeit mit der Rechtsanwaltskanzlei Bernd Fiessler bieten wir umfassende rechtliche Lösungenvon strikter Einhaltung gesetzlicher Vorschriften über starke Schutzmechanismen für geistiges Eigentum bis hin zu strategischem Geschäftsschutz. Mit jahrzehntelanger Erfahrung im deutschen und internationalen Recht stellt unser Team sicher, dass Ihre Rechte, Vermögenswerte und Interessen mit Präzision und Integrität verteidigt werden. Kontaktieren Sie uns, um zu erfahren, wie unsere Hingabe an Zuverlässigkeit und kundenzentrierten Schutz uns auszeichnet."
  },
  es: {
    title: "Excelencia Legal y Protección al Cliente",
    subHeading: "En MADE IN GERMANY AG - UK LIMITED, priorizamos su protección y seguridad, fomentando la confianza a través de una fiabilidad incomparable y experiencia legal.",
    legalContact: {
      name: "Bufete Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Alemania",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "Como MADE IN GERMANY AG - UK LIMITED, estamos firmemente comprometidos a hacer de la protección de nuestros clientes nuestra máxima prioridad. Nuestro objetivo es destacar la seguridad y la protección de nuestros clientes, estableciendo una base de confianza mediante servicios legales confiables. La fiabilidad es el núcleo de todo lo que hacemos. En colaboración con el Bufete Bernd Fiessler, ofrecemos soluciones legales integrales, desde el cumplimiento estricto de regulaciones hasta salvaguardas sólidas para la propiedad intelectual y protección estratégica de negocios. Con décadas de experiencia en derecho alemán e internacional, nuestro equipo asegura que sus derechos, activos e intereses sean defendidos con precisión e integridad. Contáctenos para descubrir cómo nuestra dedicación a la fiabilidad y la protección centrada en el cliente nos distingue."
  },
  fr: {
    title: "Excellence Juridique & Protection des Clients",
    subHeading: "Chez MADE IN GERMANY AG - UK LIMITED, nous plaçons votre protection et votre sécurité au premier plan, renforçant la confiance par une fiabilité inégalée et une expertise juridique.",
    legalContact: {
      name: "Cabinet Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Allemagne",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "En tant que MADE IN GERMANY AG - UK LIMITED, nous nous engageons résolument à faire de la protection de nos clients notre priorité absolue. Nous visons à mettre en avant la sécurité et la protection de nos clients afin d’établir une base de confiance grâce à des services juridiques fiables. La fiabilité est au cœur de toutes nos actions. En partenariat avec le Cabinet Bernd Fiessler, nous proposons des solutions juridiques exhaustivesallant d’une conformité rigoureuse aux réglementations à des protections robustes pour la propriété intellectuelle, en passant par une sauvegarde stratégique de votre entreprise. Forts de décennies d’expertise en droit allemand et international, notre équipe veille à ce que vos droits, actifs et intérêts soient défendus avec précision et intégrité. Contactez-nous pour découvrir comment notre engagement envers la fiabilité et une protection centrée sur le client nous démarque."
  },
  it: {
    title: "Eccellenza Legale & Protezione del Cliente",
    subHeading: "Presso MADE IN GERMANY AG - UK LIMITED, diamo priorità alla vostra protezione e sicurezza, costruendo fiducia attraverso affidabilità senza pari e competenza legale.",
    legalContact: {
      name: "Studio Legale Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Germania",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "Come MADE IN GERMANY AG - UK LIMITED, siamo fermamente impegnati a rendere la protezione dei nostri clienti la nostra massima priorità. Il nostro obiettivo è enfatizzare la sicurezza e la protezione dei nostri clienti per instaurare una base di fiducia attraverso servizi legali affidabili. L’affidabilità è al centro di tutto ciò che facciamo. In collaborazione con lo Studio Legale Bernd Fiessler, offriamo soluzioni legali completedal rispetto rigoroso delle normative alla protezione solida della proprietà intellettuale, fino alla tutela strategica della vostra attività. Con decenni di esperienza nel diritto tedesco e internazionale, il nostro team garantisce che i vostri diritti, beni e interessi siano difesi con precisione e integrità. Contattateci per scoprire come la nostra dedizione all’affidabilità e alla protezione incentrata sul cliente ci distingue."
  },
  nl: {
    title: "Juridische Excellentie & Klantbescherming",
    subHeading: "Bij MADE IN GERMANY AG - UK LIMITED stellen wij uw bescherming en veiligheid voorop, en bouwen wij vertrouwen op door ongeëvenaarde betrouwbaarheid en juridische expertise.",
    legalContact: {
      name: "Advocatenkantoor Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Duitsland",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "Als MADE IN GERMANY AG - UK LIMITED zijn wij vastberaden om de bescherming van onze klanten onze hoogste prioriteit te maken. Wij streven ernaar om de veiligheid en bescherming van onze klanten te benadrukken, waarmee wij een fundament van vertrouwen leggen door middel van betrouwbare juridische diensten. Betrouwbaarheid vormt de kern van al onze inspanningen. Samen met Advocatenkantoor Bernd Fiessler bieden wij uitgebreide juridische oplossingenvan strikte naleving van regelgeving tot robuuste bescherming van intellectueel eigendom en strategische bedrijfsbescherming. Met tientallen jaren ervaring in Duits en internationaal recht zorgt ons team ervoor dat uw rechten, activa en belangen met precisie en integriteit worden verdedigd. Neem contact met ons op om te ervaren hoe onze toewijding aan betrouwbaarheid en klantgerichte bescherming ons onderscheidt."
  },
  sa: {
    title: "التميز القانوني وحماية العملاء",
    subHeading: "في MADE IN GERMANY AG - UK LIMITED، نضع حمايتكم وأمانكم في صدارة أولوياتنا، ونعزز الثقة من خلال الموثوقية اللا مثيل لها والخبرة القانونية.",
    legalContact: {
      name: "مكتب المحاماة بيرند فيسلر",
      address: "لانجينر لاندستر. 171، 27580 بريمرهافن - ليه، ألمانيا",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "كشركة MADE IN GERMANY AG - UK LIMITED، نحن ملتزمون بجعل حماية عملائنا أولويتنا القصوى. نسعى للتأكيد على أمان وحماية عملائنا لبناء أساس من الثقة من خلال تقديم خدمات قانونية موثوقة. الموثوقية هي جوهر كل ما نقوم به. بالتعاون مع مكتب المحاماة بيرند فيسلر، نقدم حلولاً قانونية شاملةبدءًا من الالتزام الصارم باللوائح، وصولاً إلى حماية قوية للملكية الفكرية والحماية الاستراتيجية للأعمال. مع عقود من الخبرة في القانون الألماني والدولي، يضمن فريقنا الدفاع عن حقوقكم وأصولكم ومصالحكم بدقة ونزاهة. تواصلوا معنا لتكتشفوا كيف تميزنا التزامنا بالموثوقية والحماية المركزة على العملاء."
  },
  hk: {
    title: "法律卓越與客戶保護",
    subHeading: "喺 MADE IN GERMANY AG - UK LIMITED，我哋將您嘅保護同安全放喺首位，通過無與倫比嘅可靠性同法律專長建立信任。",
    legalContact: {
      name: "Bernd Fiessler 律師事務所",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, 德國",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "作為 MADE IN GERMANY AG - UK LIMITED，我哋堅定不移咁將客戶保護定為我哋嘅首要任務。我哋致力於強調客戶嘅安全同保護，通過可靠嘅法律服務建立信任基礎。可靠性係我哋一切行動嘅核心。聯同 Bernd Fiessler 律師事務所，我哋提供全面嘅法律解決方案從嚴格遵守規範，到強力保護知識產權同策略性業務保障。憑藉喺德國同國際法律方面嘅數十年經驗，我哋嘅團隊確保您嘅權利、資產同利益得到精準同誠信嘅捍衛。請聯繫我哋，體驗我哋對可靠性同以客戶為中心嘅保護嘅承諾點樣令我哋與眾不同。"
  },
  sg: {
    title: "法律卓越与客户保护",
    subHeading: "在 MADE IN GERMANY AG - UK LIMITED，我们将您的保护与安全置于首位，通过无与伦比的可靠性和法律专长建立信任。",
    legalContact: {
      name: "Bernd Fiessler 律师事务所",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, 德国",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "作为 MADE IN GERMANY AG - UK LIMITED，我们坚定不移地将客户保护定为我们的首要任务。我们致力于强调客户的安全与保护，通过可靠的法律服务建立信任基础。可靠性是我们一切行动的核心。联合 Bernd Fiessler 律师事务所，我们提供全面的法律解决方案从严格遵守规范，到强力保护知识产权和策略性业务保障。凭借在德国和国际法律方面的数十年经验，我们的团队确保您的权利、资产和利益得到精准和诚信的捍卫。请联系我们，体验我们对可靠性和以客户为中心的保护的承诺如何令我们与众不同。"
  },
  za: {
    title: "Juridiese Uitnemendheid & Kliëntebeskerming",
    subHeading: "By MADE IN GERMANY AG - UK LIMITED plaas ons u beskerming en veiligheid eerste, en bou ons vertroue deur ongeëwenaarde betroubaarheid en juridiese kundigheid.",
    legalContact: {
      name: "Prokureursfirma Bernd Fiessler",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, Duitsland",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "As MADE IN GERMANY AG - UK LIMITED is ons onwrikbaar daartoe verbind om kliëntebeskerming ons topprioriteit te maak. Ons streef daarna om die veiligheid en beskerming van ons kliënte te beklemtoon, en bou ’n fondament van vertroue deur betroubare juridiese dienste. Betroubaarheid is die kern van alles wat ons doen. In samewerking met Prokureursfirma Bernd Fiessler lewer ons omvattende juridiese oplossingsvan streng nakoming van regulasies tot kragtige beskerming van intellektuele eiendom en strategiese besigheidsbeskerming. Met dekades se ondervinding in Duitse en internasionale reg verseker ons span dat u regte, bates en belange met presisie en integriteit verdedig word. Kontak ons om te ervaar hoe ons toewyding aan betroubaarheid en kliëntgesentreerde beskerming ons uitstaan."
  },
  kr: {
    title: "법률 우수성 및 고객 보호",
    subHeading: "MADE IN GERMANY AG - UK LIMITED에서는 고객의 보호와 안전을 최우선으로 하여, 비교할 수 없는 신뢰성과 법률 전문성을 통해 신뢰를 구축합니다.",
    legalContact: {
      name: "Bernd Fiessler 법률 사무소",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, 독일",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "MADE IN GERMANY AG - UK LIMITED로서 우리는 고객 보호를 최우선 과제로 삼겠다는 확고한 의지를 가지고 있습니다. 우리는 고객의 안전과 보호를 강조하여 신뢰할 수 있는 법률 서비스를 통해 신뢰의 기반을 구축하고자 합니다. 신뢰성은 우리가 하는 모든 일의 핵심입니다. Bernd Fiessler 법률 사무소와 협력하여, 엄격한 규제 준수에서부터 강력한 지적 재산권 보호, 그리고 전략적인 비즈니스 보호에 이르기까지 포괄적인 법률 솔루션을 제공합니다. 독일 및 국제 법률에서 수십 년간 쌓아온 전문성을 바탕으로, 우리 팀은 귀하의 권리, 자산, 그리고 이익이 정밀함과 성실함으로 보호받도록 보장합니다. 저희에게 연락하여 신뢰성과 고객 중심의 보호에 대한 우리의 헌신이 어떻게 차별화되는지 경험해 보십시오."
  },
  jp: {
    title: "法的卓越性と顧客保護",
    subHeading: "MADE IN GERMANY AG - UK LIMITEDでは、お客様の保護と安全を最優先とし、比類のない信頼性と法的専門知識を通じて信頼を築きます。",
    legalContact: {
      name: "Bernd Fiessler 法律事務所",
      address: "Langener Landstr. 171, 27580 Bremerhaven - Lehe, ドイツ",
      phone1: "+49 471/9812502",
      phone2: "+49 4745/931393",
      fax: "0471/9812541",
      email: "info@fiessler-rechtsanwaelte.de",
      website: "www.fiessler-rechtsanwaelte.de"
    },
    additionalContent: "MADE IN GERMANY AG - UK LIMITEDとして、私たちは顧客保護を最優先事項とする揺るぎない決意を持っています。私たちはお客様の安全と保護を強調し、信頼性の高い法的サービスを通じて信頼の基盤を築くことを目指します。信頼性は私たちのすべての行動の中心です。Bernd Fiessler 法律事務所と連携し、厳格な規制遵守から強固な知的財産保護、戦略的なビジネス保護に至るまで、包括的な法的ソリューションを提供します。ドイツおよび国際法における数十年の専門知識を活かし、私たちのチームは貴社の権利、資産、利益が正確かつ誠実に守られることを保証します。お問い合わせいただければ、信頼性と顧客中心の保護に対する私たちの献身がどのように際立っているかをご体験いただけます。"
  }
};

const LegalAndProtection: React.FC<LegalAndProtectionProps> = ({ language = 'en' }) => {
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  // Define "MADE IN GERMANY ©" with German flag colors
  const madeInGermany = (
    <span>
      <span className="text-[#0B111F]">Made </span>
      <span className="text-[#d00b10]">in </span>
      <span className="text-[#ffcc00]">Germany</span>
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#FFFFFF] font-sans">
      {/* Blue Separator Line at the Top */}
      <div className="w-full h-1 bg-[#0B111F] mb-10" />

      <div className="max-w-7xl mx-auto px-0">
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-6 py-16 flex flex-col justify-center items-center text-center gap-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B111F] mb-6 leading-tight">
              {translations.title}
              <br />
              {madeInGermany}
              <span className="text-[#0B111F]"> AG - UK Limited</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-0 max-w-2xl mx-auto">
              {translations.subHeading}
            </p>
          </motion.div>

          {/* Legal Contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-[#0B111F] rounded-2xl p-6 border border-gray-800 backdrop-blur-xl overflow-hidden max-w-3xl w-full"
          >
            <div className="absolute inset-0 bg-[#0B111F] opacity-80" />
            <div className="relative z-10 flex flex-col space-y-2 items-center text-center">
              <h3 className="text-xl font-bold text-white">{translations.legalContact.name}</h3>
              <p className="text-gray-200">{translations.legalContact.address}</p>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#FFFFFF]" />
                <a href={`tel:${translations.legalContact.phone1}`} className="text-gray-200 hover:text-[#d00b10] transition-colors">
                  {translations.legalContact.phone1}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#FFFFFF]" />
                <a href={`tel:${translations.legalContact.phone2}`} className="text-gray-200 hover:text-[#d00b10] transition-colors">
                  {translations.legalContact.phone2}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#FFFFFF]" />
                <span className="text-gray-200">Fax: {translations.legalContact.fax}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#FFFFFF]" />
                <a href={`mailto:${translations.legalContact.email}`} className="text-gray-200 hover:text-[#d00b10] transition-colors">
                  {translations.legalContact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#FFFFFF]" />
                <a href={`https://${translations.legalContact.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#d00b10] transition-colors">
                  {translations.legalContact.website}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Additional Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative bg-[#0B111F] rounded-2xl p-8 border border-gray-800 backdrop-blur-xl overflow-hidden max-w-3xl w-full"
          >
            <div className="absolute inset-0 bg-[#0B111F] opacity-80" />
            <div className="relative z-10">
              <p className="text-gray-200 text-center">{translations.additionalContent}</p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default LegalAndProtection;