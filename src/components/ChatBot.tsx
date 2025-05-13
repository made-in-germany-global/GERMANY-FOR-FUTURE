import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,              // Used for close button
  Search,         // Used in search bar
  ChevronRight,   // Used for expandable question toggle
  MessageCircle,  // Used in footer and some questions
  Truck,          // Used in logistics-related questions
  Globe,          // Used for "General Questions" section title
  Package,        // Used for product-related questions
  Briefcase,      // Used in partnership-related questions
  MapPin,         // Used for market-related questions
  Handshake,      // Used for "Distribution and Partnership" section title and questions
  Shield,         // Used for security and compliance questions
  DollarSign,     // Used for pricing and financial questions
  Factory,        // Used for manufacturing-related questions
  Users,          // Used for small business and partner-related questions
  Leaf,           // Used for sustainability questions
  Clock,          // Used for time-related questions
  Languages,      // Used for language support question
  Building,       // Used for "Quality and Standards" section title
  Award,          // Used for quality and reputation questions
  Plane,          // Used for "Logistics and Global Trade" section title and transport questions
  BarChart,       // Used for metrics and pricing questions
  Lock,           // Used for security and exclusivity questions
  Share2,         // Used for marketing and promotion questions
  Star,           // Used for benefits and innovation questions
  CheckCircle,    // Used for verification and support questions
  Settings,       // Used for customization and certification questions
  Globe2,         // Used for global reach questions
  Wrench          // Replacement for Plane, used for engineering/maintenance questions
} from 'lucide-react';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

interface Question {
  question: string;
  answer: string;
  icon: JSX.Element;
}

interface Section {
  title: string;
  icon: JSX.Element;
  questions: Question[];
}

const TRANSLATIONS: Record<string, {
  headerTitle: string;
  headerSubtitle: string;
  searchPlaceholder: string;
  footerText: string;
  sections: Section[];
}> = {
  en: {
    headerTitle: "MADE IN GERMANY ©  Business Assistant",
    headerSubtitle: "Online and ready to assist with your global trade needs",
    searchPlaceholder: "Ask your question...",
    footerText: "Ask your question or browse the topics",
    sections: [
      {
        title: "General Questions about MADE IN GERMANY ©  Exports",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "What makes MADE IN GERMANY ©  products unique?", answer: "MADE IN GERMANY ©  products are renowned for their precision, quality, and innovation, backed by a long tradition of engineering excellence.", icon: <Award className="text-white" size={20} /> },
          { question: "Why should companies import MADE IN GERMANY ©  products?", answer: "These products offer reliability, durability, and advanced technology, making them highly sought after in global markets.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we ensure timely delivery worldwide?", answer: "We use a robust global logistics network including trains, ships, and cargo planes to deliver German products efficiently.", icon: <Truck className="text-white" size={20} /> },
          { question: "Which markets are key for MADE IN GERMANY ©  exports?", answer: "Asia, Africa, the Arab world, and wealthy nations like the USA and EU are prime markets for German goods.", icon: <MapPin className="text-white" size={20} /> },
          { question: "What types of products do we export?", answer: "We export automotive parts, machinery, electronics, pharmaceuticals, and more, all adhering to German quality standards.", icon: <Package className="text-white" size={20} /> },
          { question: "How do we support small businesses with exports?", answer: "We offer tailored logistics and competitive pricing to help small businesses access global markets with German products.", icon: <Users className="text-white" size={20} /> },
          { question: "What is the history behind MADE IN GERMANY © ?", answer: "The label originated in the late 19th century as a mark of quality, evolving into a global symbol of excellence.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do German exports impact the global economy?", answer: "German exports drive economic growth by supplying high-quality goods to industries worldwide.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "What are the most popular German export categories?", answer: "Automotive, machinery, and chemical products lead, followed by electronics and pharmaceuticals.", icon: <BarChart className="text-white" size={20} /> },
          { question: "How do we adapt to different market demands?", answer: "We customize products and logistics to meet the specific needs of each region.", icon: <Settings className="text-white" size={20} /> },
          { question: "Why is Germany a leader in manufacturing?", answer: "Germany excels due to its skilled workforce, advanced infrastructure, and focus on innovation.", icon: <Factory className="text-white" size={20} /> },
          { question: "What role does technology play in our exports?", answer: "Cutting-edge technology ensures our products remain competitive and meet modern demands.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we handle export regulations?", answer: "We comply with international trade laws and assist clients with regulatory requirements.", icon: <Shield className="text-white" size={20} /> },
          { question: "What is the volume of German exports annually?", answer: "Germany exports over €1.5 trillion worth of goods yearly, a significant global share.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "How do we ensure product authenticity?", answer: "We source directly from certified German manufacturers to guarantee authenticity.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "What are the benefits of exporting German goods?", answer: "Exporters gain access to premium markets and enhance their brand reputation.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we promote German exports globally?", answer: "Through trade fairs, partnerships, and digital marketing, we showcase German quality worldwide.", icon: <Share2 className="text-white" size={20} /> },
          { question: "What challenges do we face in exporting?", answer: "Tariffs, trade barriers, and logistics costs are managed with strategic planning.", icon: <Lock className="text-white" size={20} /> },
          { question: "How do we support export growth?", answer: "We invest in logistics infrastructure and market research to expand our reach.", icon: <Plane className="text-white" size={20} /> },
          { question: "What is the future of MADE IN GERMANY ©  exports?", answer: "Sustainability and digitalization will drive future growth in German exports.", icon: <Leaf className="text-white" size={20} /> },
          { question: "How do we handle customer inquiries about exports?", answer: "Our multilingual team provides prompt, detailed responses to all inquiries.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What sets German exports apart from competitors?", answer: "Superior quality, precision engineering, and a trusted brand reputation distinguish us.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we ensure export scalability?", answer: "We scale operations with flexible logistics and partnerships to meet demand.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What role do trade agreements play in our exports?", answer: "Trade agreements reduce barriers and open new markets for German goods.", icon: <Handshake className="text-white" size={20} /> },
          { question: "How do we address currency fluctuations in exports?", answer: "We use hedging strategies and flexible pricing to mitigate currency risks.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Distribution and Partnership Opportunities",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "How can companies partner with us for distribution?", answer: "We collaborate with global distributors to bring MADE IN GERMANY ©  products to their markets, offering tailored logistics and support.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "What benefits do distributors gain from us?", answer: "Distributors enjoy access to premium German products, competitive pricing, and our extensive logistics network.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Can we import products to Germany for distribution?", answer: "Yes, we facilitate imports from global companies to Germany, ensuring they meet our quality standards for distribution.", icon: <Package className="text-white" size={20} /> },
          { question: "What support do we provide to new partners?", answer: "New partners receive training, marketing support, and logistics coordination to ensure successful distribution.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we ensure fair pricing for distributors?", answer: "We negotiate directly with manufacturers to secure competitive prices, passing savings onto our distributors.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What types of partnerships do we offer?", answer: "We provide exclusive, non-exclusive, and regional distribution agreements based on partner needs.", icon: <Handshake className="text-white" size={20} /> },
          { question: "How do we select our distribution partners?", answer: "We choose partners based on market reach, reliability, and alignment with our quality standards.", icon: <Users className="text-white" size={20} /> },
          { question: "What is the process to become a distributor?", answer: "Interested companies submit an application, followed by a review and agreement process.", icon: <Settings className="text-white" size={20} /> },
          { question: "How do we train our distribution partners?", answer: "We offer product knowledge sessions, logistics training, and ongoing support.", icon: <Plane className="text-white" size={20} /> },
          { question: "What marketing support do we provide?", answer: "We supply promotional materials, digital campaigns, and co-branding opportunities.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Can distributors sell online?", answer: "Yes, we support e-commerce distribution with logistics and digital Planes.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "How do we handle distributor disputes?", answer: "We mediate fairly with clear communication and contractual guidelines.", icon: <Shield className="text-white" size={20} /> },
          { question: "What are the financial benefits for partners?", answer: "Partners gain high margins due to the premium value of German products.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "How do we ensure partner exclusivity?", answer: "Exclusive partners receive protected territories and priority supply.", icon: <Lock className="text-white" size={20} /> },
          { question: "What logistics support do partners receive?", answer: "We provide end-to-end shipping, tracking, and customs assistance.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we evaluate partner performance?", answer: "We track sales, customer feedback, and market penetration metrics.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Can partners distribute multiple product lines?", answer: "Yes, partners can handle diverse German product categories based on capacity.", icon: <Package className="text-white" size={20} /> },
          { question: "What is the minimum order for distributors?", answer: "Minimums vary by product but are designed to be accessible for all partners.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we onboard new distributors?", answer: "We guide them through contracts, training, and initial shipments seamlessly.", icon: <Star className="text-white" size={20} /> },
          { question: "What role do partners play in branding?", answer: "Partners co-promote the MADE IN GERMANY ©  brand while building their own reputation.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we support partner growth?", answer: "We offer scalability options and market expansion strategies.", icon: <Plane className="text-white" size={20} /> },
          { question: "Can partners suggest new products?", answer: "Yes, we welcome feedback to expand our offerings based on market needs.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What is the duration of partnership agreements?", answer: "Agreements typically last 1-3 years, renewable based on performance.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we protect partner investments?", answer: "We ensure stable supply chains and fair terms to safeguard investments.", icon: <Shield className="text-white" size={20} /> },
          { question: "What incentives do top distributors receive?", answer: "Top performers get priority pricing, bonuses, and exclusive opportunities.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logistics and Global Trade",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "How do we handle international shipping challenges?", answer: "Our advanced logistics solutions address customs, tariffs, and transportation hurdles to ensure smooth delivery.", icon: <Shield className="text-white" size={20} /> },
          { question: "What role does sustainability play in our logistics?", answer: "We prioritize eco-friendly shipping methods and packaging to reduce our carbon footprint.", icon: <Leaf className="text-white" size={20} /> },
          { question: "How do time zones affect our operations?", answer: "We operate with flexible schedules and digital Planes to coordinate across global time zones effectively.", icon: <Clock className="text-white" size={20} /> },
          { question: "What languages do we support for global trade?", answer: "We provide multilingual support including English, German, Arabic, Chinese, and more to facilitate smooth communication.", icon: <Languages className="text-white" size={20} /> },
          { question: "How do we ensure secure shipments?", answer: "We use encrypted tracking systems and trusted carriers to protect shipments worldwide.", icon: <Lock className="text-white" size={20} /> },
          { question: "What shipping methods do we use?", answer: "We utilize air, sea, rail, and road transport based on efficiency and cost.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we calculate shipping costs?", answer: "Costs are based on distance, weight, and transport mode, with transparent pricing.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "What is our average delivery time?", answer: "Delivery times vary by region, typically 3-14 days depending on the destination.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we track shipments?", answer: "Clients receive real-time updates via our encrypted tracking platform.", icon: <MapPin className="text-white" size={20} /> },
          { question: "What happens if a shipment is delayed?", answer: "We investigate, communicate updates, and expedite solutions promptly.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we handle customs clearance?", answer: "Our team manages documentation and compliance for seamless customs processing.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "What is our logistics capacity?", answer: "We handle thousands of shipments monthly with scalable infrastructure.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we optimize shipping routes?", answer: "We use AI-driven logistics to select the fastest and most cost-effective routes.", icon: <Settings className="text-white" size={20} /> },
          { question: "What insurance options do we offer?", answer: "We provide comprehensive shipment insurance for full protection.", icon: <Shield className="text-white" size={20} /> },
          { question: "How do we reduce logistics costs?", answer: "Bulk shipping, route optimization, and partnerships lower overall costs.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What role does technology play in logistics?", answer: "Automation and tracking tech enhance efficiency and transparency.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "How do we manage peak shipping seasons?", answer: "We scale capacity and prioritize shipments during high-demand periods.", icon: <Star className="text-white" size={20} /> },
          { question: "Can we ship to remote areas?", answer: "Yes, our network reaches even the most challenging destinations.", icon: <MapPin className="text-white" size={20} /> },
          { question: "How do we ensure cold chain logistics?", answer: "We use refrigerated transport for temperature-sensitive goods like pharmaceuticals.", icon: <Package className="text-white" size={20} /> },
          { question: "What is our return policy for shipments?", answer: "Returns are processed efficiently with clear guidelines for partners.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we handle fragile goods?", answer: "Special packaging and handling ensure fragile items arrive intact.", icon: <Shield className="text-white" size={20} /> },
          { question: "What certifications do our logistics hold?", answer: "We comply with ISO and international shipping standards.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we support urgent deliveries?", answer: "Express air shipping options are available for time-critical needs.", icon: <Plane className="text-white" size={20} /> },
          { question: "What is our global trade compliance strategy?", answer: "We stay updated on trade laws to ensure full compliance.", icon: <Lock className="text-white" size={20} /> },
          { question: "How do we adapt logistics for emergencies?", answer: "We activate contingency plans for rapid response in crises.", icon: <Plane className="text-white" size={20} /> }
        ]
      },
      {
        title: "Quality and Standards",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "How do we maintain German quality standards?", answer: "We work with certified German manufacturers and conduct rigorous quality checks on all products.", icon: <Plane className="text-white" size={20} /> },
          { question: "What industries do we serve with German products?", answer: "We distribute products for automotive, machinery, technology, healthcare, and more, all MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Why is German engineering trusted worldwide?", answer: "German engineering is synonymous with precision, innovation, and reliability, built over decades of expertise.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we certify imported products?", answer: "Imported products undergo strict testing to meet German safety and quality regulations before distribution.", icon: <Settings className="text-white" size={20} /> },
          { question: "What role does innovation play in our offerings?", answer: "We focus on cutting-edge German technology to provide innovative solutions to global markets.", icon: <Star className="text-white" size={20} /> },
          { question: "What quality certifications do we hold?", answer: "Our products meet DIN, ISO, and CE standards, ensuring top-tier quality.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we test product durability?", answer: "We conduct stress tests and long-term simulations to ensure durability.", icon: <Shield className="text-white" size={20} /> },
          { question: "What is our quality control process?", answer: "Every production stage is monitored, with final inspections before shipping.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we ensure consistency in quality?", answer: "Standardized processes and regular audits maintain consistent quality.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What materials do we use for German products?", answer: "We use high-grade materials sourced from trusted suppliers.", icon: <Package className="text-white" size={20} /> },
          { question: "How do we handle defective products?", answer: "Defective items are replaced promptly with full transparency.", icon: <Truck className="text-white" size={20} /> },
          { question: "What is the lifespan of our products?", answer: "German products are designed for longevity, often exceeding industry norms.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we ensure safety standards?", answer: "Products are tested for safety compliance with global regulations.", icon: <Lock className="text-white" size={20} /> },
          { question: "What role does R&D play in quality?", answer: "Research and development drive continuous improvement in our offerings.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we train manufacturers?", answer: "We provide guidelines and audits to ensure adherence to our standards.", icon: <Users className="text-white" size={20} /> },
          { question: "What is our warranty policy?", answer: "We offer comprehensive warranties tailored to each product category.", icon: <Shield className="text-white" size={20} /> },
          { question: "How do we address quality complaints?", answer: "We investigate and resolve issues quickly to maintain customer trust.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What makes our quality checks rigorous?", answer: "Multiple testing phases and expert oversight ensure no compromises.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we stay ahead in quality standards?", answer: "We adopt the latest industry advancements and exceed expectations.", icon: <Award className="text-white" size={20} /> },
          { question: "What is the role of precision in our products?", answer: "Precision engineering ensures flawless performance and reliability.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we ensure eco-friendly production?", answer: "We integrate sustainable practices into manufacturing processes.", icon: <Leaf className="text-white" size={20} /> },
          { question: "What testing facilities do we use?", answer: "State-of-the-art labs in Germany verify product quality.", icon: <Factory className="text-white" size={20} /> },
          { question: "How do we certify supplier quality?", answer: "Suppliers are audited regularly to meet our stringent criteria.", icon: <Settings className="text-white" size={20} /> },
          { question: "What is our approach to continuous improvement?", answer: "Feedback and innovation keep our standards evolving.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we guarantee customer satisfaction?", answer: "High-quality products and responsive support ensure satisfaction.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  de: {
    headerTitle: "MADE IN GERMANY ©  Geschäftsassistent",
    headerSubtitle: "Online und bereit, bei Ihren globalen Handelsbedürfnissen zu helfen",
    searchPlaceholder: "Stellen Sie Ihre Frage...",
    footerText: "Stellen Sie Ihre Frage oder durchsuchen Sie die Themen",
    sections: [
      {
        title: "Allgemeine Fragen zu MADE IN GERMANY ©  Exporten",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "Was macht MADE IN GERMANY ©  Produkte einzigartig?", answer: "MADE IN GERMANY ©  Produkte sind bekannt für ihre Präzision, Qualität und Innovation, gestützt auf eine lange Tradition der Ingenieurskunst.", icon: <Award className="text-white" size={20} /> },
          { question: "Warum sollten Unternehmen MADE IN GERMANY ©  Produkte importieren?", answer: "Diese Produkte bieten Zuverlässigkeit, Langlebigkeit und fortschrittliche Technologie, die weltweit gefragt sind.", icon: <Star className="text-white" size={20} /> },
          { question: "Wie stellen wir eine pünktliche Lieferung weltweit sicher?", answer: "Wir nutzen ein starkes globales Logistiknetzwerk mit Zügen, Schiffen und Frachtflugzeugen, um deutsche Produkte effizient zu liefern.", icon: <Truck className="text-white" size={20} /> },
          { question: "Welche Märkte sind Schlüssel für MADE IN GERMANY ©  Exporte?", answer: "Asien, Afrika, die arabische Welt und wohlhabende Nationen wie die USA und die EU sind Hauptmärkte für deutsche Waren.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Welche Produktarten exportieren wir?", answer: "Wir exportieren Autoteile, Maschinen, Elektronik, Pharmazeutika und mehr, alles nach deutschen Qualitätsstandards.", icon: <Package className="text-white" size={20} /> },
          { question: "Wie unterstützen wir kleine Unternehmen beim Export?", answer: "Wir bieten maßgeschneiderte Logistik und wettbewerbsfähige Preise, um kleinen Unternehmen den Zugang zu globalen Märkten zu ermöglichen.", icon: <Users className="text-white" size={20} /> },
          { question: "Was ist die Geschichte hinter MADE IN GERMANY © ?", answer: "Das Label entstand Ende des 19. Jahrhunderts als Qualitätsmerkmal und entwickelte sich zu einem globalen Symbol für Exzellenz.", icon: <Clock className="text-white" size={20} /> },
          { question: "Wie beeinflussen deutsche Exporte die Weltwirtschaft?", answer: "Deutsche Exporte fördern das Wirtschaftswachstum durch die Lieferung hochwertiger Güter an Industrien weltweit.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Was sind die beliebtesten deutschen Exportkategorien?", answer: "Automobilprodukte, Maschinen und chemische Erzeugnisse führen, gefolgt von Elektronik und Pharmazeutika.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Wie passen wir uns an unterschiedliche Marktanforderungen an?", answer: "Wir passen Produkte und Logistik an die spezifischen Bedürfnisse jeder Region an.", icon: <Settings className="text-white" size={20} /> },
          { question: "Warum ist Deutschland führend in der Fertigung?", answer: "Deutschland punktet mit qualifizierten Arbeitskräften, moderner Infrastruktur und einem Fokus auf Innovation.", icon: <Factory className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Technologie bei unseren Exporten?", answer: "Modernste Technologie stellt sicher, dass unsere Produkte wettbewerbsfähig bleiben und moderne Anforderungen erfüllen.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Wie gehen wir mit Exportvorschriften um?", answer: "Wir halten internationale Handelsgesetze ein und unterstützen Kunden bei regulatorischen Anforderungen.", icon: <Shield className="text-white" size={20} /> },
          { question: "Wie groß ist das Volumen der deutschen Exporte jährlich?", answer: "Deutschland exportiert jährlich Waren im Wert von über 1,5 Billionen Euro, ein bedeutender globaler Anteil.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Wie stellen wir die Authentizität der Produkte sicher?", answer: "Wir beziehen direkt von zertifizierten deutschen Herstellern, um Authentizität zu garantieren.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Welche Vorteile bietet der Export deutscher Waren?", answer: "Exporteure erhalten Zugang zu Premium-Märkten und steigern ihren Markenruf.", icon: <Star className="text-white" size={20} /> },
          { question: "Wie fördern wir deutsche Exporte weltweit?", answer: "Durch Messen, Partnerschaften und digitales Marketing präsentieren wir deutsche Qualität global.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Welche Herausforderungen begegnen uns beim Export?", answer: "Zölle, Handelsbarrieren und Logistikkosten werden durch strategische Planung bewältigt.", icon: <Lock className="text-white" size={20} /> },
          { question: "Wie fördern wir das Exportwachstum?", answer: "Wir investieren in Logistikinfrastruktur und Marktforschung, um unsere Reichweite zu erweitern.", icon: <Plane className="text-white" size={20} /> },
          { question: "Wie sieht die Zukunft der MADE IN GERMANY ©  Exporte aus?", answer: "Nachhaltigkeit und Digitalisierung werden das zukünftige Wachstum deutscher Exporte antreiben.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Wie bearbeiten wir Kundenanfragen zu Exporten?", answer: "Unser mehrsprachiges Team liefert schnelle, detaillierte Antworten auf alle Anfragen.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Was unterscheidet deutsche Exporte von Wettbewerbern?", answer: "Höhere Qualität, präzise Ingenieurskunst und ein vertrauenswürdiger Ruf heben uns ab.", icon: <Award className="text-white" size={20} /> },
          { question: "Wie stellen wir die Skalierbarkeit der Exporte sicher?", answer: "Wir skalieren mit flexibler Logistik und Partnerschaften, um die Nachfrage zu decken.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Welche Rolle spielen Handelsabkommen bei unseren Exporten?", answer: "Handelsabkommen reduzieren Barrieren und öffnen neue Märkte für deutsche Güter.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Wie gehen wir mit Währungsschwankungen bei Exporten um?", answer: "Wir nutzen Absicherungsstrategien und flexible Preise, um Währungsrisiken zu mindern.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Vertriebs- und Partnerschaftsmöglichkeiten",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "Wie können Unternehmen mit uns für den Vertrieb zusammenarbeiten?", answer: "Wir kooperieren mit globalen Vertriebspartnern, um MADE IN GERMANY ©  Produkte auf ihre Märkte zu bringen, mit maßgeschneiderter Logistik und Unterstützung.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "Welche Vorteile haben Vertriebspartner bei uns?", answer: "Vertriebspartner profitieren von Premium-Produkten aus Deutschland, wettbewerbsfähigen Preisen und unserem umfassenden Logistiknetzwerk.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Können wir Produkte nach Deutschland zur Verteilung importieren?", answer: "Ja, wir ermöglichen Importe von globalen Unternehmen nach Deutschland, die unseren Qualitätsstandards entsprechen.", icon: <Package className="text-white" size={20} /> },
          { question: "Welche Unterstützung bieten wir neuen Partnern?", answer: "Neue Partner erhalten Schulungen, Marketingunterstützung und Logistikkoordination für einen erfolgreichen Vertrieb.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Wie stellen wir faire Preise für Vertriebspartner sicher?", answer: "Wir verhandeln direkt mit Herstellern, um wettbewerbsfähige Preise zu sichern und diese an unsere Partner weiterzugeben.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Welche Arten von Partnerschaften bieten wir an?", answer: "Wir bieten exklusive, nicht-exklusive und regionale Vertriebsvereinbarungen je nach Partnerbedarf an.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Wie wählen wir unsere Vertriebspartner aus?", answer: "Wir wählen Partner nach Marktreichweite, Zuverlässigkeit und Übereinstimmung mit unseren Qualitätsstandards aus.", icon: <Users className="text-white" size={20} /> },
          { question: "Wie läuft der Prozess ab, um Vertriebspartner zu werden?", answer: "Interessierte Unternehmen reichen eine Bewerbung ein, gefolgt von einer Prüfung und Vertragsvereinbarung.", icon: <Settings className="text-white" size={20} /> },
          { question: "Wie schulen wir unsere Vertriebspartner?", answer: "Wir bieten Produktwissen, Logistikschulungen und fortlaufende Unterstützung an.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Welche Marketingunterstützung bieten wir?", answer: "Wir stellen Werbematerialien, digitale Kampagnen und Co-Branding-Möglichkeiten bereit.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Können Vertriebspartner online verkaufen?", answer: "Ja, wir unterstützen den E-Commerce-Vertrieb mit Logistik und digitalen Tools.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Wie gehen wir mit Streitigkeiten unter Vertriebspartnern um?", answer: "Wir vermitteln fair mit klarer Kommunikation und vertraglichen Richtlinien.", icon: <Shield className="text-white" size={20} /> },
          { question: "Welche finanziellen Vorteile haben Partner?", answer: "Partner erzielen hohe Margen dank des Premiumwerts deutscher Produkte.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Wie stellen wir die Exklusivität von Partnern sicher?", answer: "Exklusive Partner erhalten geschützte Gebiete und priorisierte Lieferungen.", icon: <Lock className="text-white" size={20} /> },
          { question: "Welche Logistikunterstützung erhalten Partner?", answer: "Wir bieten End-to-End-Versand, Tracking und Zollhilfe an.", icon: <Truck className="text-white" size={20} /> },
          { question: "Wie bewerten wir die Leistung unserer Partner?", answer: "Wir verfolgen Verkaufszahlen, Kundenfeedback und Marktpenetration.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Können Partner mehrere Produktlinien vertreiben?", answer: "Ja, Partner können je nach Kapazität verschiedene deutsche Produktkategorien handhaben.", icon: <Package className="text-white" size={20} /> },
          { question: "Was ist die Mindestbestellmenge für Vertriebspartner?", answer: "Mindestmengen variieren je nach Produkt, sind aber für alle Partner zugänglich gestaltet.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Wie integrieren wir neue Vertriebspartner?", answer: "Wir führen sie nahtlos durch Verträge, Schulungen und erste Lieferungen.", icon: <Star className="text-white" size={20} /> },
          { question: "Welche Rolle spielen Partner beim Branding?", answer: "Partner bewerben die Marke MADE IN GERMANY ©  mit und stärken ihren eigenen Ruf.", icon: <Award className="text-white" size={20} /> },
          { question: "Wie unterstützen wir das Wachstum unserer Partner?", answer: "Wir bieten Skalierungsoptionen und Strategien zur Marktexpansion.", icon: <Plane className="text-white" size={20} /> },
          { question: "Können Partner neue Produkte vorschlagen?", answer: "Ja, wir begrüßen Feedback, um unser Angebot an die Marktbedürfnisse anzupassen.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Wie lange dauern Partnerschaftsvereinbarungen?", answer: "Vereinbarungen laufen typischerweise 1-3 Jahre und sind leistungsabhängig verlängerbar.", icon: <Clock className="text-white" size={20} /> },
          { question: "Wie schützen wir die Investitionen unserer Partner?", answer: "Wir sichern stabile Lieferketten und faire Bedingungen, um Investitionen zu schützen.", icon: <Shield className="text-white" size={20} /> },
          { question: "Welche Anreize erhalten Top-Vertriebspartner?", answer: "Top-Performer erhalten Vorzugspreise, Boni und exklusive Möglichkeiten.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logistik und globaler Handel",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "Wie gehen wir mit internationalen Versandherausforderungen um?", answer: "Unsere fortschrittlichen Logistiklösungen bewältigen Zoll, Tarife und Transportprobleme für reibungslose Lieferungen.", icon: <Shield className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Nachhaltigkeit in unserer Logistik?", answer: "Wir setzen auf umweltfreundliche Versandmethoden und Verpackungen, um unseren CO₂-Fußabdruck zu reduzieren.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Wie beeinflussen Zeitzonen unsere Abläufe?", answer: "Wir arbeiten mit flexiblen Zeitplänen und digitalen Tools, um über globale Zeitzonen hinweg effektiv zu koordinieren.", icon: <Clock className="text-white" size={20} /> },
          { question: "Welche Sprachen unterstützen wir im globalen Handel?", answer: "Wir bieten mehrsprachige Unterstützung, einschließlich Englisch, Deutsch, Arabisch, Chinesisch und mehr, für reibungslose Kommunikation.", icon: <Languages className="text-white" size={20} /> },
          { question: "Wie sichern wir unsere Sendungen ab?", answer: "Wir verwenden verschlüsselte Tracking-Systeme und vertrauenswürdige Spediteure, um Sendungen weltweit zu schützen.", icon: <Lock className="text-white" size={20} /> },
          { question: "Welche Versandmethoden nutzen wir?", answer: "Wir verwenden Luft-, See-, Schienen- und Straßenverkehr je nach Effizienz und Kosten.", icon: <Truck className="text-white" size={20} /> },
          { question: "Wie berechnen wir die Versandkosten?", answer: "Die Kosten basieren auf Entfernung, Gewicht und Transportart mit transparenter Preisgestaltung.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Wie lange ist unsere durchschnittliche Lieferzeit?", answer: "Lieferzeiten variieren je nach Region, typischerweise 3-14 Tage je nach Zielort.", icon: <Clock className="text-white" size={20} /> },
          { question: "Wie verfolgen wir Sendungen?", answer: "Kunden erhalten Echtzeit-Updates über unsere verschlüsselte Tracking-Plattform.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Was passiert, wenn eine Sendung verspätet ist?", answer: "Wir untersuchen, kommunizieren Updates und beschleunigen Lösungen umgehend.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Wie handhaben wir die Zollabfertigung?", answer: "Unser Team kümmert sich um Dokumentation und Compliance für eine reibungslose Zollabwicklung.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Wie groß ist unsere Logistikkapazität?", answer: "Wir bewältigen monatlich Tausende von Sendungen mit skalierbarer Infrastruktur.", icon: <Plane className="text-white" size={20} /> },
          { question: "Wie optimieren wir Versandrouten?", answer: "Wir nutzen KI-gesteuerte Logistik, um die schnellsten und kosteneffizientesten Routen zu wählen.", icon: <Settings className="text-white" size={20} /> },
          { question: "Welche Versicherungsoptionen bieten wir an?", answer: "Wir bieten umfassende Versandversicherungen für vollständigen Schutz.", icon: <Shield className="text-white" size={20} /> },
          { question: "Wie senken wir Logistikkosten?", answer: "Massenversand, Routenoptimierung und Partnerschaften reduzieren die Gesamtkosten.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Technologie in der Logistik?", answer: "Automatisierung und Tracking-Technologie verbessern Effizienz und Transparenz.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Wie managen wir Spitzenversandzeiten?", answer: "Wir skalieren Kapazitäten und priorisieren Sendungen in Zeiten hoher Nachfrage.", icon: <Star className="text-white" size={20} /> },
          { question: "Können wir in abgelegene Gebiete liefern?", answer: "Ja, unser Netzwerk erreicht selbst die schwierigsten Zielorte.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Wie gewährleisten wir die Kühlkette?", answer: "Wir nutzen gekühlte Transporte für temperaturempfindliche Güter wie Pharmazeutika.", icon: <Package className="text-white" size={20} /> },
          { question: "Wie lautet unsere Rücknahmepolitik für Sendungen?", answer: "Rücksendungen werden effizient mit klaren Richtlinien für Partner abgewickelt.", icon: <Truck className="text-white" size={20} /> },
          { question: "Wie gehen wir mit zerbrechlichen Gütern um?", answer: "Spezielle Verpackungen und Handhabung sorgen dafür, dass zerbrechliche Artikel unversehrt ankommen.", icon: <Shield className="text-white" size={20} /> },
          { question: "Welche Zertifizierungen hat unsere Logistik?", answer: "Wir entsprechen ISO- und internationalen Versandstandards.", icon: <Award className="text-white" size={20} /> },
          { question: "Wie unterstützen wir dringende Lieferungen?", answer: "Express-Luftversandoptionen sind für zeitkritische Bedürfnisse verfügbar.", icon: <Plane className="text-white" size={20} /> },
          { question: "Was ist unsere Strategie zur Einhaltung des globalen Handels?", answer: "Wir bleiben über Handelsgesetze informiert, um volle Compliance sicherzustellen.", icon: <Lock className="text-white" size={20} /> },
          { question: "Wie passen wir die Logistik für Notfälle an?", answer: "Wir aktivieren Notfallpläne für schnelle Reaktionen in Krisen.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "Qualität und Standards",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "Wie halten wir deutsche Qualitätsstandards ein?", answer: "Wir arbeiten mit zertifizierten deutschen Herstellern und führen strenge Qualitätskontrollen an allen Produkten durch.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Welche Branchen beliefern wir mit deutschen Produkten?", answer: "Wir vertreiben Produkte für Automobil, Maschinenbau, Technologie, Gesundheitswesen und mehr, alles MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Warum vertraut man weltweit auf deutsches Engineering?", answer: "Deutsches Engineering steht für Präzision, Innovation und Zuverlässigkeit, aufgebaut über Jahrzehnte an Expertise.", icon: <Award className="text-white" size={20} /> },
          { question: "Wie zertifizieren wir importierte Produkte?", answer: "Importierte Produkte werden strengen Tests unterzogen, um deutsche Sicherheits- und Qualitätsvorschriften zu erfüllen.", icon: <Settings className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Innovation in unserem Angebot?", answer: "Wir setzen auf modernste deutsche Technologie, um innovative Lösungen für globale Märkte anzubieten.", icon: <Star className="text-white" size={20} /> },
          { question: "Welche Qualitätszertifikate besitzen wir?", answer: "Unsere Produkte erfüllen DIN-, ISO- und CE-Standards und garantieren höchste Qualität.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Wie testen wir die Haltbarkeit von Produkten?", answer: "Wir führen Belastungstests und Langzeitsimulationen durch, um die Haltbarkeit zu sichern.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Wie läuft unser Qualitätskontrollprozess ab?", answer: "Jede Produktionsstufe wird überwacht, mit abschließenden Inspektionen vor dem Versand.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Wie stellen wir Konsistenz in der Qualität sicher?", answer: "Standardisierte Prozesse und regelmäßige Audits gewährleisten gleichbleibende Qualität.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Welche Materialien verwenden wir für deutsche Produkte?", answer: "Wir nutzen hochwertige Materialien von vertrauenswürdigen Lieferanten.", icon: <Package className="text-white" size={20} /> },
          { question: "Wie gehen wir mit defekten Produkten um?", answer: "Defekte Artikel werden umgehend ersetzt, mit voller Transparenz.", icon: <Truck className="text-white" size={20} /> },
          { question: "Wie lange ist die Lebensdauer unserer Produkte?", answer: "Deutsche Produkte sind für Langlebigkeit ausgelegt und übertreffen oft Industriestandards.", icon: <Clock className="text-white" size={20} /> },
          { question: "Wie gewährleisten wir Sicherheitsstandards?", answer: "Produkte werden auf Sicherheitskonformität mit globalen Vorschriften geprüft.", icon: <Lock className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Forschung und Entwicklung bei der Qualität?", answer: "Forschung und Entwicklung fördern die kontinuierliche Verbesserung unserer Angebote.", icon: <Star className="text-white" size={20} /> },
          { question: "Wie schulen wir Hersteller?", answer: "Wir stellen Richtlinien und Audits bereit, um die Einhaltung unserer Standards sicherzustellen.", icon: <Users className="text-white" size={20} /> },
          { question: "Wie lautet unsere Garantiepolitik?", answer: "Wir bieten umfassende Garantien, die auf jede Produktkategorie zugeschnitten sind.", icon: <Shield className="text-white" size={20} /> },
          { question: "Wie gehen wir mit Qualitätsbeschwerden um?", answer: "Wir untersuchen und lösen Probleme schnell, um das Kundenvertrauen zu wahren.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Was macht unsere Qualitätsprüfungen so rigoros?", answer: "Mehrere Testphasen und Expertenaufsicht lassen keine Kompromisse zu.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Wie bleiben wir bei Qualitätsstandards führend?", answer: "Wir nehmen die neuesten Branchenfortschritte an und übertreffen Erwartungen.", icon: <Award className="text-white" size={20} /> },
          { question: "Welche Rolle spielt Präzision bei unseren Produkten?", answer: "Präzisionsingenieurwesen sichert makellose Leistung und Zuverlässigkeit.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Wie stellen wir umweltfreundliche Produktion sicher?", answer: "Wir integrieren nachhaltige Praktiken in die Fertigungsprozesse.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Welche Testeinrichtungen nutzen wir?", answer: "Modernste Labore in Deutschland überprüfen die Produktqualität.", icon: <Factory className="text-white" size={20} /> },
          { question: "Wie zertifizieren wir die Qualität der Lieferanten?", answer: "Lieferanten werden regelmäßig geprüft, um unsere strengen Kriterien zu erfüllen.", icon: <Settings className="text-white" size={20} /> },
          { question: "Wie gehen wir mit kontinuierlicher Verbesserung um?", answer: "Feedback und Innovation halten unsere Standards in Entwicklung.", icon: <Plane className="text-white" size={20} /> },
          { question: "Wie garantieren wir Kundenzufriedenheit?", answer: "Hochwertige Produkte und reaktionsschneller Support sichern Zufriedenheit.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },fr: {
    headerTitle: "Assistant Commercial MADE IN GERMANY © ",
    headerSubtitle: "En ligne et prêt à aider avec vos besoins commerciaux mondiaux",
    searchPlaceholder: "Posez votre question...",
    footerText: "Posez votre question ou parcourez les sujets",
    sections: [
      {
        title: "Questions Générales sur les Exportations MADE IN GERMANY © ",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "Qu'est-ce qui rend les produits MADE IN GERMANY ©  uniques ?", answer: "Les produits MADE IN GERMANY ©  sont réputés pour leur précision, leur qualité et leur innovation, soutenus par une longue tradition d'excellence en ingénierie.", icon: <Award className="text-white" size={20} /> },
          { question: "Pourquoi les entreprises devraient-elles importer des produits MADE IN GERMANY ©  ?", answer: "Ces produits offrent fiabilité, durabilité et technologie avancée, très recherchés sur les marchés mondiaux.", icon: <Star className="text-white" size={20} /> },
          { question: "Comment assurons-nous une livraison ponctuelle dans le monde entier ?", answer: "Nous utilisons un réseau logistique mondial robuste, incluant trains, navires et avions-cargos pour livrer efficacement les produits allemands.", icon: <Truck className="text-white" size={20} /> },
          { question: "Quels sont les marchés clés pour les exportations MADE IN GERMANY ©  ?", answer: "L'Asie, l'Afrique, le monde arabe et des nations prospères comme les États-Unis et l'UE sont des marchés prioritaires pour les produits allemands.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Quels types de produits exportons-nous ?", answer: "Nous exportons des pièces automobiles, des machines, de l'électronique, des produits pharmaceutiques et plus encore, tous conformes aux normes de qualité allemandes.", icon: <Package className="text-white" size={20} /> },
          { question: "Comment soutenons-nous les petites entreprises dans leurs exportations ?", answer: "Nous proposons une logistique sur mesure et des prix compétitifs pour aider les petites entreprises à accéder aux marchés mondiaux avec des produits allemands.", icon: <Users className="text-white" size={20} /> },
          { question: "Quelle est l'histoire derrière MADE IN GERMANY ©  ?", answer: "L'étiquette est née à la fin du 19e siècle comme marque de qualité, évoluant en un symbole mondial d'excellence.", icon: <Clock className="text-white" size={20} /> },
          { question: "Comment les exportations allemandes impactent-elles l'économie mondiale ?", answer: "Les exportations allemandes stimulent la croissance économique en fournissant des biens de haute qualité aux industries mondiales.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Quelles sont les catégories d'exportation allemandes les plus populaires ?", answer: "L'automobile, les machines et les produits chimiques dominent, suivis par l'électronique et les pharmaceutiques.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Comment nous adaptons-nous aux exigences des différents marchés ?", answer: "Nous personnalisons les produits et la logistique pour répondre aux besoins spécifiques de chaque région.", icon: <Settings className="text-white" size={20} /> },
          { question: "Pourquoi l'Allemagne est-elle leader dans la fabrication ?", answer: "L'Allemagne excelle grâce à sa main-d'œuvre qualifiée, son infrastructure avancée et son accent sur l'innovation.", icon: <Factory className="text-white" size={20} /> },
          { question: "Quel rôle joue la technologie dans nos exportations ?", answer: "Une technologie de pointe garantit que nos produits restent compétitifs et répondent aux exigences modernes.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Comment gérons-nous les réglementations d'exportation ?", answer: "Nous respectons les lois commerciales internationales et aidons les clients avec les exigences réglementaires.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quel est le volume des exportations allemandes annuelles ?", answer: "L'Allemagne exporte chaque année plus de 1,5 trillion d'euros de marchandises, une part importante à l'échelle mondiale.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Comment assurons-nous l'authenticité des produits ?", answer: "Nous nous approvisionnons directement auprès de fabricants allemands certifiés pour garantir l'authenticité.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Quels sont les avantages d'exporter des produits allemands ?", answer: "Les exportateurs accèdent à des marchés premium et renforcent leur réputation de marque.", icon: <Star className="text-white" size={20} /> },
          { question: "Comment promouvons-nous les exportations allemandes à l'échelle mondiale ?", answer: "À travers des salons commerciaux, des partenariats et du marketing numérique, nous mettons en avant la qualité allemande dans le monde.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Quels défis rencontrons-nous dans l'exportation ?", answer: "Les tarifs, les barrières commerciales et les coûts logistiques sont gérés grâce à une planification stratégique.", icon: <Lock className="text-white" size={20} /> },
          { question: "Comment favorisons-nous la croissance des exportations ?", answer: "Nous investissons dans l'infrastructure logistique et la recherche de marché pour élargir notre portée.", icon: <Plane className="text-white" size={20} /> },
          { question: "Quel est l'avenir des exportations MADE IN GERMANY ©  ?", answer: "La durabilité et la numérisation guideront la croissance future des exportations allemandes.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Comment traitons-nous les demandes des clients sur les exportations ?", answer: "Notre équipe multilingue fournit des réponses rapides et détaillées à toutes les demandes.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Qu'est-ce qui distingue les exportations allemandes des concurrents ?", answer: "Une qualité supérieure, une ingénierie précise et une réputation fiable nous démarquent.", icon: <Award className="text-white" size={20} /> },
          { question: "Comment assurons-nous l'évolutivité des exportations ?", answer: "Nous adaptons nos opérations avec une logistique flexible et des partenariats pour répondre à la demande.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quel rôle jouent les accords commerciaux dans nos exportations ?", answer: "Les accords commerciaux réduisent les barrières et ouvrent de nouveaux marchés pour les produits allemands.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Comment gérons-nous les fluctuations monétaires dans les exportations ?", answer: "Nous utilisons des stratégies de couverture et des prix flexibles pour minimiser les risques monétaires.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Opportunités de Distribution et de Partenariat",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "Comment les entreprises peuvent-elles s'associer avec nous pour la distribution ?", answer: "Nous collaborons avec des distributeurs mondiaux pour apporter les produits MADE IN GERMANY ©  sur leurs marchés, avec une logistique adaptée et un soutien.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "Quels avantages les distributeurs tirent-ils de nous ?", answer: "Les distributeurs bénéficient de produits allemands premium, de prix compétitifs et de notre vaste réseau logistique.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Pouvons-nous importer des produits en Allemagne pour la distribution ?", answer: "Oui, nous facilitons les importations d'entreprises mondiales en Allemagne, en veillant à ce qu'ils répondent à nos normes de qualité.", icon: <Package className="text-white" size={20} /> },
          { question: "Quel soutien offrons-nous aux nouveaux partenaires ?", answer: "Les nouveaux partenaires reçoivent des formations, un soutien marketing et une coordination logistique pour une distribution réussie.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Comment garantissons-nous des prix équitables pour les distributeurs ?", answer: "Nous négocions directement avec les fabricants pour obtenir des prix compétitifs, répercutant les économies sur nos distributeurs.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quels types de partenariats proposons-nous ?", answer: "Nous offrons des accords de distribution exclusifs, non exclusifs et régionaux selon les besoins des partenaires.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Comment sélectionnons-nous nos partenaires de distribution ?", answer: "Nous choisissons les partenaires selon leur portée de marché, leur fiabilité et leur alignement avec nos normes de qualité.", icon: <Users className="text-white" size={20} /> },
          { question: "Quel est le processus pour devenir distributeur ?", answer: "Les entreprises intéressées soumettent une candidature, suivie d'un examen et d'un accord.", icon: <Settings className="text-white" size={20} /> },
          { question: "Comment formons-nous nos partenaires de distribution ?", answer: "Nous proposons des sessions sur les connaissances produits, des formations logistiques et un soutien continu.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quel soutien marketing offrons-nous ?", answer: "Nous fournissons des supports promotionnels, des campagnes numériques et des opportunités de co-branding.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Les distributeurs peuvent-ils vendre en ligne ?", answer: "Oui, nous soutenons la distribution e-commerce avec des outils logistiques et numériques.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Comment gérons-nous les différends entre distributeurs ?", answer: "Nous médions équitablement avec une communication claire et des lignes directrices contractuelles.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quels sont les avantages financiers pour les partenaires ?", answer: "Les partenaires obtiennent des marges élevées grâce à la valeur premium des produits allemands.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Comment assurons-nous l'exclusivité des partenaires ?", answer: "Les partenaires exclusifs bénéficient de territoires protégés et d'une priorité d'approvisionnement.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quel soutien logistique les partenaires reçoivent-ils ?", answer: "Nous offrons une gestion complète des expéditions, un suivi et une assistance douanière.", icon: <Truck className="text-white" size={20} /> },
          { question: "Comment évaluons-nous la performance des partenaires ?", answer: "Nous suivons les ventes, les retours clients et les métriques de pénétration de marché.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Les partenaires peuvent-ils distribuer plusieurs gammes de produits ?", answer: "Oui, les partenaires peuvent gérer diverses catégories de produits allemands selon leur capacité.", icon: <Package className="text-white" size={20} /> },
          { question: "Quelle est la commande minimum pour les distributeurs ?", answer: "Les minimums varient selon le produit mais sont conçus pour être accessibles à tous les partenaires.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Comment intégrons-nous les nouveaux distributeurs ?", answer: "Nous les guidons à travers les contrats, les formations et les premières expéditions sans couture.", icon: <Star className="text-white" size={20} /> },
          { question: "Quel rôle les partenaires jouent-ils dans le branding ?", answer: "Les partenaires co-promouvoient la marque MADE IN GERMANY ©  tout en renforçant leur propre réputation.", icon: <Award className="text-white" size={20} /> },
          { question: "Comment soutenons-nous la croissance des partenaires ?", answer: "Nous proposons des options d'évolutivité et des stratégies d'expansion de marché.", icon: <Plane className="text-white" size={20} /> },
          { question: "Les partenaires peuvent-ils suggérer de nouveaux produits ?", answer: "Oui, nous accueillons les retours pour élargir notre offre selon les besoins du marché.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Quelle est la durée des accords de partenariat ?", answer: "Les accords durent généralement de 1 à 3 ans, renouvelables selon les performances.", icon: <Clock className="text-white" size={20} /> },
          { question: "Comment protégeons-nous les investissements des partenaires ?", answer: "Nous assurons des chaînes d'approvisionnement stables et des conditions équitables pour protéger les investissements.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quels incitatifs les meilleurs distributeurs reçoivent-ils ?", answer: "Les meilleurs performers obtiennent des prix prioritaires, des bonus et des opportunités exclusives.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logistique et Commerce Mondial",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "Comment gérons-nous les défis d'expédition internationale ?", answer: "Nos solutions logistiques avancées résolvent les problèmes de douanes, tarifs et obstacles au transport pour une livraison fluide.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quel rôle joue la durabilité dans notre logistique ?", answer: "Nous privilégions des méthodes d'expédition et des emballages écologiques pour réduire notre empreinte carbone.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Comment les fuseaux horaires affectent-ils nos opérations ?", answer: "Nous opérons avec des horaires flexibles et des outils numériques pour coordonner efficacement à travers les fuseaux horaires mondiaux.", icon: <Clock className="text-white" size={20} /> },
          { question: "Quelles langues soutenons-nous pour le commerce mondial ?", answer: "Nous offrons un soutien multilingue incluant l'anglais, l'allemand, l'arabe, le chinois et plus pour une communication fluide.", icon: <Languages className="text-white" size={20} /> },
          { question: "Comment assurons-nous la sécurité des expéditions ?", answer: "Nous utilisons des systèmes de suivi cryptés et des transporteurs fiables pour protéger les expéditions dans le monde entier.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quelles méthodes d'expédition utilisons-nous ?", answer: "Nous utilisons le transport aérien, maritime, ferroviaire et routier selon l'efficacité et le coût.", icon: <Truck className="text-white" size={20} /> },
          { question: "Comment calculons-nous les frais d'expédition ?", answer: "Les coûts sont basés sur la distance, le poids et le mode de transport, avec une tarification transparente.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Quel est notre délai de livraison moyen ?", answer: "Les délais varient selon la région, généralement de 3 à 14 jours selon la destination.", icon: <Clock className="text-white" size={20} /> },
          { question: "Comment suivons-nous les expéditions ?", answer: "Les clients reçoivent des mises à jour en temps réel via notre plateforme de suivi cryptée.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Que se passe-t-il si une expédition est retardée ?", answer: "Nous enquêtons, communiquons les mises à jour et accélérons les solutions rapidement.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Comment gérons-nous le dédouanement ?", answer: "Notre équipe s'occupe de la documentation et de la conformité pour un dédouanement sans accroc.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Quelle est notre capacité logistique ?", answer: "Nous gérons des milliers d'expéditions mensuelles avec une infrastructure évolutive.", icon: <Plane className="text-white" size={20} /> },
          { question: "Comment optimisons-nous les itinéraires d'expédition ?", answer: "Nous utilisons une logistique pilotée par IA pour sélectionner les itinéraires les plus rapides et économiques.", icon: <Settings className="text-white" size={20} /> },
          { question: "Quelles options d'assurance offrons-nous ?", answer: "Nous proposons une assurance complète pour une protection totale des expéditions.", icon: <Shield className="text-white" size={20} /> },
          { question: "Comment réduisons-nous les coûts logistiques ?", answer: "Les expéditions en vrac, l'optimisation des itinéraires et les partenariats réduisent les coûts globaux.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quel rôle joue la technologie dans la logistique ?", answer: "L'automatisation et la technologie de suivi améliorent l'efficacité et la transparence.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Comment gérons-nous les saisons de pointe pour l'expédition ?", answer: "Nous augmentons la capacité et priorisons les expéditions pendant les périodes de forte demande.", icon: <Star className="text-white" size={20} /> },
          { question: "Pouvons-nous expédier vers des zones reculées ?", answer: "Oui, notre réseau atteint même les destinations les plus difficiles.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Comment assurons-nous la logistique en chaîne du froid ?", answer: "Nous utilisons des transports réfrigérés pour les produits sensibles à la température comme les pharmaceutiques.", icon: <Package className="text-white" size={20} /> },
          { question: "Quelle est notre politique de retour pour les expéditions ?", answer: "Les retours sont traités efficacement avec des lignes directrices claires pour les partenaires.", icon: <Truck className="text-white" size={20} /> },
          { question: "Comment gérons-nous les marchandises fragiles ?", answer: "Un emballage spécial et une manipulation soignée garantissent que les articles fragiles arrivent intacts.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quelles certifications notre logistique possède-t-elle ?", answer: "Nous respectons les normes ISO et internationales d'expédition.", icon: <Award className="text-white" size={20} /> },
          { question: "Comment soutenons-nous les livraisons urgentes ?", answer: "Des options d'expédition express par avion sont disponibles pour les besoins critiques.", icon: <Plane className="text-white" size={20} /> },
          { question: "Quelle est notre stratégie de conformité au commerce mondial ?", answer: "Nous restons à jour sur les lois commerciales pour garantir une conformité totale.", icon: <Lock className="text-white" size={20} /> },
          { question: "Comment adaptons-nous la logistique aux urgences ?", answer: "Nous activons des plans d'urgence pour une réponse rapide en cas de crise.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "Qualité et Normes",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "Comment maintenons-nous les normes de qualité allemandes ?", answer: "Nous collaborons avec des fabricants allemands certifiés et effectuons des contrôles de qualité rigoureux sur tous les produits.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quelles industries approvisionnons-nous avec des produits allemands ?", answer: "Nous distribuons des produits pour l'automobile, les machines, la technologie, la santé et plus, tous MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Pourquoi l'ingénierie allemande est-elle reconnue mondialement ?", answer: "L'ingénierie allemande est synonyme de précision, d'innovation et de fiabilité, bâtie sur des décennies d'expertise.", icon: <Award className="text-white" size={20} /> },
          { question: "Comment certifions-nous les produits importés ?", answer: "Les produits importés subissent des tests stricts pour répondre aux réglementations allemandes de sécurité et de qualité.", icon: <Settings className="text-white" size={20} /> },
          { question: "Quel rôle joue l'innovation dans nos offres ?", answer: "Nous mettons l'accent sur la technologie allemande de pointe pour fournir des solutions innovantes aux marchés mondiaux.", icon: <Star className="text-white" size={20} /> },
          { question: "Quelles certifications de qualité possédons-nous ?", answer: "Nos produits respectent les normes DIN, ISO et CE, garantissant une qualité de premier ordre.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Comment testons-nous la durabilité des produits ?", answer: "Nous réalisons des tests de résistance et des simulations à long terme pour assurer la durabilité.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quel est notre processus de contrôle qualité ?", answer: "Chaque étape de production est surveillée, avec des inspections finales avant l'expédition.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Comment assurons-nous la cohérence de la qualité ?", answer: "Des processus standardisés et des audits réguliers maintiennent une qualité constante.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quels matériaux utilisons-nous pour les produits allemands ?", answer: "Nous utilisons des matériaux de haute qualité provenant de fournisseurs de confiance.", icon: <Package className="text-white" size={20} /> },
          { question: "Comment gérons-nous les produits défectueux ?", answer: "Les articles défectueux sont remplacés rapidement avec une transparence totale.", icon: <Truck className="text-white" size={20} /> },
          { question: "Quelle est la durée de vie de nos produits ?", answer: "Les produits allemands sont conçus pour une longévité, dépassant souvent les normes de l'industrie.", icon: <Clock className="text-white" size={20} /> },
          { question: "Comment garantissons-nous les normes de sécurité ?", answer: "Les produits sont testés pour leur conformité aux réglementations de sécurité mondiales.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quel rôle joue la R&D dans la qualité ?", answer: "La recherche et le développement favorisent une amélioration continue de nos offres.", icon: <Star className="text-white" size={20} /> },
          { question: "Comment formons-nous les fabricants ?", answer: "Nous fournissons des directives et des audits pour garantir le respect de nos normes.", icon: <Users className="text-white" size={20} /> },
          { question: "Quelle est notre politique de garantie ?", answer: "Nous offrons des garanties complètes adaptées à chaque catégorie de produits.", icon: <Shield className="text-white" size={20} /> },
          { question: "Comment traitons-nous les plaintes sur la qualité ?", answer: "Nous enquêtons et résolvons les problèmes rapidement pour maintenir la confiance des clients.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Qu'est-ce qui rend nos contrôles qualité rigoureux ?", answer: "Plusieurs phases de tests et une supervision experte ne laissent place à aucun compromis.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Comment restons-nous en avance sur les normes de qualité ?", answer: "Nous adoptons les dernières avancées de l'industrie et dépassons les attentes.", icon: <Award className="text-white" size={20} /> },
          { question: "Quel rôle joue la précision dans nos produits ?", answer: "L'ingénierie de précision garantit une performance impeccable et une fiabilité.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Comment assurons-nous une production écologique ?", answer: "Nous intégrons des pratiques durables dans les processus de fabrication.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Quelles installations de test utilisons-nous ?", answer: "Des laboratoires de pointe en Allemagne vérifient la qualité des produits.", icon: <Factory className="text-white" size={20} /> },
          { question: "Comment certifions-nous la qualité des fournisseurs ?", answer: "Les fournisseurs sont audités régulièrement pour répondre à nos critères stricts.", icon: <Settings className="text-white" size={20} /> },
          { question: "Quelle est notre approche de l'amélioration continue ?", answer: "Les retours et l'innovation maintiennent nos normes en évolution.", icon: <Plane className="text-white" size={20} /> },
          { question: "Comment garantissons-nous la satisfaction des clients ?", answer: "Des produits de haute qualité et un support réactif assurent la satisfaction.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },es: {
    headerTitle: "Asistente Comercial MADE IN GERMANY © ",
    headerSubtitle: "En línea y listo para ayudar con tus necesidades de comercio global",
    searchPlaceholder: "Haz tu pregunta...",
    footerText: "Haz tu pregunta o explora los temas",
    sections: [
      {
        title: "Preguntas Generales sobre Exportaciones MADE IN GERMANY © ",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "¿Qué hace únicos a los productos MADE IN GERMANY © ?", answer: "Los productos MADE IN GERMANY ©  son reconocidos por su precisión, calidad e innovación, respaldados por una larga tradición de excelencia en ingeniería.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Por qué deberían las empresas importar productos MADE IN GERMANY © ?", answer: "Estos productos ofrecen fiabilidad, durabilidad y tecnología avanzada, muy demandados en los mercados globales.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la entrega puntual en todo el mundo?", answer: "Utilizamos una red logística global robusta que incluye trenes, barcos y aviones de carga para entregar productos alemanes de manera eficiente.", icon: <Truck className="text-white" size={20} /> },
          { question: "¿Cuáles son los mercados clave para las exportaciones MADE IN GERMANY © ?", answer: "Asia, África, el mundo árabe y naciones prósperas como EE.UU. y la UE son mercados principales para los productos alemanes.", icon: <MapPin className="text-white" size={20} /> },
          { question: "¿Qué tipos de productos exportamos?", answer: "Exportamos piezas automotrices, maquinaria, electrónica, productos farmacéuticos y más, todos cumpliendo con los estándares de calidad alemanes.", icon: <Package className="text-white" size={20} /> },
          { question: "¿Cómo apoyamos a las pequeñas empresas con las exportaciones?", answer: "Ofrecemos logística personalizada y precios competitivos para ayudar a las pequeñas empresas a acceder a mercados globales con productos alemanes.", icon: <Users className="text-white" size={20} /> },
          { question: "¿Cuál es la historia detrás de MADE IN GERMANY © ?", answer: "La etiqueta surgió a finales del siglo XIX como un distintivo de calidad, evolucionando en un símbolo global de excelencia.", icon: <Clock className="text-white" size={20} /> },
          { question: "¿Cómo impactan las exportaciones alemanas en la economía mundial?", answer: "Las exportaciones alemanas impulsan el crecimiento económico al suministrar bienes de alta calidad a industrias globales.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "¿Cuáles son las categorías de exportación alemanas más populares?", answer: "Automóviles, maquinaria y productos químicos lideran, seguidos por electrónica y farmacéuticos.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Cómo nos adaptamos a las demandas de diferentes mercados?", answer: "Personalizamos productos y logística para satisfacer las necesidades específicas de cada región.", icon: <Settings className="text-white" size={20} /> },
          { question: "¿Por qué Alemania es líder en manufactura?", answer: "Alemania destaca por su fuerza laboral calificada, infraestructura avanzada y enfoque en la innovación.", icon: <Factory className="text-white" size={20} /> },
          { question: "¿Qué papel juega la tecnología en nuestras exportaciones?", answer: "La tecnología de vanguardia asegura que nuestros productos sigan siendo competitivos y cumplan con las demandas modernas.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Cómo manejamos las regulaciones de exportación?", answer: "Cumplimos con las leyes comerciales internacionales y ayudamos a los clientes con los requisitos regulatorios.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Cuál es el volumen de las exportaciones alemanas anuales?", answer: "Alemania exporta anualmente bienes por más de 1.5 billones de euros, una parte significativa a nivel global.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la autenticidad de los productos?", answer: "Nos abastecemos directamente de fabricantes alemanes certificados para garantizar la autenticidad.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cuáles son los beneficios de exportar productos alemanes?", answer: "Los exportadores acceden a mercados premium y mejoran su reputación de marca.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Cómo promovemos las exportaciones alemanas a nivel global?", answer: "A través de ferias comerciales, asociaciones y marketing digital, destacamos la calidad alemana en el mundo.", icon: <Share2 className="text-white" size={20} /> },
          { question: "¿Qué desafíos enfrentamos en la exportación?", answer: "Aranceles, barreras comerciales y costos logísticos se manejan con una planificación estratégica.", icon: <Lock className="text-white" size={20} /> },
          { question: "¿Cómo fomentamos el crecimiento de las exportaciones?", answer: "Invertimos en infraestructura logística e investigación de mercado para ampliar nuestro alcance.", icon: <Plane className="text-white" size={20} /> },
          { question: "¿Cuál es el futuro de las exportaciones MADE IN GERMANY © ?", answer: "La sostenibilidad y la digitalización impulsarán el crecimiento futuro de las exportaciones alemanas.", icon: <Leaf className="text-white" size={20} /> },
          { question: "¿Cómo manejamos las consultas de los clientes sobre exportaciones?", answer: "Nuestro equipo multilingüe ofrece respuestas rápidas y detalladas a todas las consultas.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "¿Qué distingue a las exportaciones alemanas de la competencia?", answer: "Una calidad superior, ingeniería precisa y una reputación confiable nos diferencian.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la escalabilidad de las exportaciones?", answer: "Escalamos operaciones con logística flexible y asociaciones para satisfacer la demanda.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Qué papel juegan los acuerdos comerciales en nuestras exportaciones?", answer: "Los acuerdos comerciales reducen barreras y abren nuevos mercados para los productos alemanes.", icon: <Handshake className="text-white" size={20} /> },
          { question: "¿Cómo manejamos las fluctuaciones monetarias en las exportaciones?", answer: "Usamos estrategias de cobertura y precios flexibles para mitigar riesgos monetarios.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Oportunidades de Distribución y Asociaciones",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "¿Cómo pueden las empresas asociarse con nosotros para la distribución?", answer: "Colaboramos con distribuidores globales para llevar productos MADE IN GERMANY ©  a sus mercados, ofreciendo logística personalizada y soporte.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "¿Qué beneficios obtienen los distribuidores de nosotros?", answer: "Los distribuidores disfrutan de productos alemanes premium, precios competitivos y nuestra extensa red logística.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "¿Podemos importar productos a Alemania para su distribución?", answer: "Sí, facilitamos las importaciones de empresas globales a Alemania, asegurando que cumplan con nuestros estándares de calidad.", icon: <Package className="text-white" size={20} /> },
          { question: "¿Qué apoyo ofrecemos a los nuevos socios?", answer: "Los nuevos socios reciben capacitación, soporte de marketing y coordinación logística para una distribución exitosa.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos precios justos para los distribuidores?", answer: "Negociamos directamente con los fabricantes para obtener precios competitivos, trasladando los ahorros a nuestros distribuidores.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Qué tipos de asociaciones ofrecemos?", answer: "Ofrecemos acuerdos de distribución exclusivos, no exclusivos y regionales según las necesidades de los socios.", icon: <Handshake className="text-white" size={20} /> },
          { question: "¿Cómo seleccionamos a nuestros socios de distribución?", answer: "Elegimos socios según su alcance de mercado, confiabilidad y alineación con nuestros estándares de calidad.", icon: <Users className="text-white" size={20} /> },
          { question: "¿Cuál es el proceso para convertirse en distribuidor?", answer: "Las empresas interesadas presentan una solicitud, seguida de una revisión y un acuerdo.", icon: <Settings className="text-white" size={20} /> },
          { question: "¿Cómo capacitamos a nuestros socios de distribución?", answer: "Ofrecemos sesiones de conocimiento del producto, capacitación logística y soporte continuo.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Qué soporte de marketing ofrecemos?", answer: "Proporcionamos materiales promocionales, campañas digitales y oportunidades de co-branding.", icon: <Share2 className="text-white" size={20} /> },
          { question: "¿Pueden los distribuidores vender en línea?", answer: "Sí, apoyamos la distribución en comercio electrónico con herramientas logísticas y digitales.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "¿Cómo manejamos disputas entre distribuidores?", answer: "Mediamos de manera justa con comunicación clara y directrices contractuales.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Cuáles son los beneficios financieros para los socios?", answer: "Los socios obtienen márgenes altos gracias al valor premium de los productos alemanes.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la exclusividad de los socios?", answer: "Los socios exclusivos reciben territorios protegidos y suministro prioritario.", icon: <Lock className="text-white" size={20} /> },
          { question: "¿Qué soporte logístico reciben los socios?", answer: "Ofrecemos gestión integral de envíos, seguimiento y asistencia aduanera.", icon: <Truck className="text-white" size={20} /> },
          { question: "¿Cómo evaluamos el desempeño de los socios?", answer: "Seguimos las ventas, retroalimentación de clientes y métricas de penetración de mercado.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Pueden los socios distribuir múltiples líneas de productos?", answer: "Sí, los socios pueden manejar diversas categorías de productos alemanes según su capacidad.", icon: <Package className="text-white" size={20} /> },
          { question: "¿Cuál es el pedido mínimo para los distribuidores?", answer: "Los mínimos varían según el producto, pero están diseñados para ser accesibles a todos los socios.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cómo integramos a nuevos distribuidores?", answer: "Los guiamos sin problemas a través de contratos, capacitaciones y envíos iniciales.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Qué papel juegan los socios en el branding?", answer: "Los socios co-promocionan la marca MADE IN GERMANY ©  mientras fortalecen su propia reputación.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Cómo apoyamos el crecimiento de los socios?", answer: "Ofrecemos opciones de escalabilidad y estrategias de expansión de mercado.", icon: <Plane className="text-white" size={20} /> },
          { question: "¿Pueden los socios sugerir nuevos productos?", answer: "Sí, acogemos retroalimentación para ampliar nuestra oferta según las necesidades del mercado.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "¿Cuál es la duración de los acuerdos de asociación?", answer: "Los acuerdos suelen durar de 1 a 3 años, renovables según el desempeño.", icon: <Clock className="text-white" size={20} /> },
          { question: "¿Cómo protegemos las inversiones de los socios?", answer: "Aseguramos cadenas de suministro estables y términos justos para proteger las inversiones.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Qué incentivos reciben los mejores distribuidores?", answer: "Los mejores desempeños obtienen precios prioritarios, bonos y oportunidades exclusivas.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logística y Comercio Global",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "¿Cómo manejamos los desafíos del envío internacional?", answer: "Nuestras soluciones logísticas avanzadas abordan aduanas, aranceles y obstáculos de transporte para una entrega fluida.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Qué papel juega la sostenibilidad en nuestra logística?", answer: "Priorizamos métodos de envío y empaques ecológicos para reducir nuestra huella de carbono.", icon: <Leaf className="text-white" size={20} /> },
          { question: "¿Cómo afectan las zonas horarias a nuestras operaciones?", answer: "Operamos con horarios flexibles y herramientas digitales para coordinar eficazmente a través de zonas horarias globales.", icon: <Clock className="text-white" size={20} /> },
          { question: "¿Qué idiomas apoyamos para el comercio global?", answer: "Ofrecemos soporte multilingüe, incluyendo inglés, alemán, árabe, chino y más, para una comunicación fluida.", icon: <Languages className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos envíos seguros?", answer: "Usamos sistemas de seguimiento encriptados y transportistas confiables para proteger los envíos en todo el mundo.", icon: <Lock className="text-white" size={20} /> },
          { question: "¿Qué métodos de envío utilizamos?", answer: "Utilizamos transporte aéreo, marítimo, ferroviario y por carretera según la eficiencia y el costo.", icon: <Truck className="text-white" size={20} /> },
          { question: "¿Cómo calculamos los costos de envío?", answer: "Los costos se basan en la distancia, el peso y el modo de transporte, con precios transparentes.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "¿Cuál es nuestro tiempo promedio de entrega?", answer: "Los tiempos varían según la región, generalmente de 3 a 14 días dependiendo del destino.", icon: <Clock className="text-white" size={20} /> },
          { question: "¿Cómo rastreamos los envíos?", answer: "Los clientes reciben actualizaciones en tiempo real a través de nuestra plataforma de seguimiento encriptada.", icon: <MapPin className="text-white" size={20} /> },
          { question: "¿Qué pasa si un envío se retrasa?", answer: "Investigamos, comunicamos actualizaciones y aceleramos soluciones rápidamente.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Cómo manejamos el despacho de aduanas?", answer: "Nuestro equipo gestiona la documentación y el cumplimiento para un despacho aduanero sin problemas.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cuál es nuestra capacidad logística?", answer: "Manejamos miles de envíos mensuales con una infraestructura escalable.", icon: <Plane className="text-white" size={20} /> },
          { question: "¿Cómo optimizamos las rutas de envío?", answer: "Usamos logística impulsada por IA para seleccionar las rutas más rápidas y rentables.", icon: <Settings className="text-white" size={20} /> },
          { question: "¿Qué opciones de seguro ofrecemos?", answer: "Proporcionamos un seguro integral para una protección total de los envíos.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Cómo reducimos los costos logísticos?", answer: "Envíos a granel, optimización de rutas y asociaciones reducen los costos generales.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Qué papel juega la tecnología en la logística?", answer: "La automatización y la tecnología de seguimiento mejoran la eficiencia y la transparencia.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "¿Cómo manejamos las temporadas pico de envío?", answer: "Aumentamos la capacidad y priorizamos envíos durante períodos de alta demanda.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Podemos enviar a áreas remotas?", answer: "Sí, nuestra red llega incluso a los destinos más desafiantes.", icon: <MapPin className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la logística de cadena de frío?", answer: "Usamos transporte refrigerado para bienes sensibles a la temperatura como farmacéuticos.", icon: <Package className="text-white" size={20} /> },
          { question: "¿Cuál es nuestra política de devolución para envíos?", answer: "Las devoluciones se procesan eficientemente con directrices claras para los socios.", icon: <Truck className="text-white" size={20} /> },
          { question: "¿Cómo manejamos mercancías frágiles?", answer: "Empaques especiales y manejo cuidadoso aseguran que los artículos frágiles lleguen intactos.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Qué certificaciones tiene nuestra logística?", answer: "Cumplimos con las normas ISO y estándares internacionales de envío.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Cómo apoyamos las entregas urgentes?", answer: "Ofrecemos opciones de envío exprés por avión para necesidades críticas de tiempo.", icon: <Plane className="text-white" size={20} /> },
          { question: "¿Cuál es nuestra estrategia de cumplimiento en el comercio global?", answer: "Nos mantenemos actualizados sobre las leyes comerciales para garantizar pleno cumplimiento.", icon: <Lock className="text-white" size={20} /> },
          { question: "¿Cómo adaptamos la logística para emergencias?", answer: "Activamos planes de contingencia para respuestas rápidas en crisis.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "Calidad y Estándares",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "¿Cómo mantenemos los estándares de calidad alemanes?", answer: "Trabajamos con fabricantes alemanes certificados y realizamos controles de calidad rigurosos en todos los productos.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Qué industrias abastecemos con productos alemanes?", answer: "Distribuimos productos para automóviles, maquinaria, tecnología, salud y más, todos MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "¿Por qué se confía en la ingeniería alemana a nivel mundial?", answer: "La ingeniería alemana es sinónimo de precisión, innovación y fiabilidad, construida sobre décadas de experiencia.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Cómo certificamos los productos importados?", answer: "Los productos importados pasan por pruebas estrictas para cumplir con las regulaciones alemanas de seguridad y calidad.", icon: <Settings className="text-white" size={20} /> },
          { question: "¿Qué papel juega la innovación en nuestras ofertas?", answer: "Nos enfocamos en tecnología alemana de punta para ofrecer soluciones innovadoras a los mercados globales.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Qué certificaciones de calidad tenemos?", answer: "Nuestros productos cumplen con las normas DIN, ISO y CE, garantizando calidad de primer nivel.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cómo probamos la durabilidad de los productos?", answer: "Realizamos pruebas de estrés y simulaciones a largo plazo para asegurar la durabilidad.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Cuál es nuestro proceso de control de calidad?", answer: "Cada etapa de producción es monitoreada, con inspecciones finales antes del envío.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos la consistencia en la calidad?", answer: "Procesos estandarizados y auditorías regulares mantienen una calidad constante.", icon: <BarChart className="text-white" size={20} /> },
          { question: "¿Qué materiales usamos para los productos alemanes?", answer: "Usamos materiales de alta calidad provenientes de proveedores confiables.", icon: <Package className="text-white" size={20} /> },
          { question: "¿Cómo manejamos productos defectuosos?", answer: "Los artículos defectuosos se reemplazan rápidamente con total transparencia.", icon: <Truck className="text-white" size={20} /> },
          { question: "¿Cuál es la vida útil de nuestros productos?", answer: "Los productos alemanes están diseñados para durar, superando a menudo las normas de la industria.", icon: <Clock className="text-white" size={20} /> },
          { question: "¿Cómo garantizamos los estándares de seguridad?", answer: "Los productos se prueban para cumplir con las regulaciones de seguridad globales.", icon: <Lock className="text-white" size={20} /> },
          { question: "¿Qué papel juega la I+D en la calidad?", answer: "La investigación y desarrollo impulsan la mejora continua de nuestras ofertas.", icon: <Star className="text-white" size={20} /> },
          { question: "¿Cómo capacitamos a los fabricantes?", answer: "Proporcionamos directrices y auditorías para asegurar el cumplimiento de nuestros estándares.", icon: <Users className="text-white" size={20} /> },
          { question: "¿Cuál es nuestra política de garantía?", answer: "Ofrecemos garantías integrales adaptadas a cada categoría de producto.", icon: <Shield className="text-white" size={20} /> },
          { question: "¿Cómo manejamos las quejas sobre calidad?", answer: "Investigamos y resolvemos problemas rápidamente para mantener la confianza de los clientes.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "¿Qué hace que nuestros controles de calidad sean rigurosos?", answer: "Múltiples fases de prueba y supervisión experta no permiten compromisos.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "¿Cómo nos mantenemos a la vanguardia en estándares de calidad?", answer: "Adoptamos los últimos avances de la industria y superamos expectativas.", icon: <Award className="text-white" size={20} /> },
          { question: "¿Qué papel juega la precisión en nuestros productos?", answer: "La ingeniería de precisión asegura un rendimiento impecable y fiabilidad.", icon: <Wrench className="text-white" size={20} /> },
          { question: "¿Cómo aseguramos una producción ecológica?", answer: "Integramos prácticas sostenibles en los procesos de fabricación.", icon: <Leaf className="text-white" size={20} /> },
          { question: "¿Qué instalaciones de prueba utilizamos?", answer: "Laboratorios de última generación en Alemania verifican la calidad de los productos.", icon: <Factory className="text-white" size={20} /> },
          { question: "¿Cómo certificamos la calidad de los proveedores?", answer: "Los proveedores son auditados regularmente para cumplir con nuestros criterios estrictos.", icon: <Settings className="text-white" size={20} /> },
          { question: "¿Cuál es nuestro enfoque hacia la mejora continua?", answer: "La retroalimentación y la innovación mantienen nuestros estándares en evolución.", icon: <Plane className="text-white" size={20} /> },
          { question: "¿Cómo garantizamos la satisfacción del cliente?", answer: "Productos de alta calidad y soporte receptivo aseguran la satisfacción.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  it: {
    headerTitle: "Assistente Commerciale MADE IN GERMANY © ",
    headerSubtitle: "Online e pronto ad assisterti con le tue esigenze di commercio globale",
    searchPlaceholder: "Fai la tua domanda...",
    footerText: "Fai la tua domanda o esplora gli argomenti",
    sections: [
      {
        title: "Domande Generali sulle Esportazioni MADE IN GERMANY © ",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "Cosa rende unici i prodotti MADE IN GERMANY © ?", answer: "I prodotti MADE IN GERMANY ©  sono rinomati per la loro precisione, qualità e innovazione, supportati da una lunga tradizione di eccellenza ingegneristica.", icon: <Award className="text-white" size={20} /> },
          { question: "Perché le aziende dovrebbero importare prodotti MADE IN GERMANY © ?", answer: "Questi prodotti offrono affidabilità, durata e tecnologia avanzata, molto ricercati nei mercati globali.", icon: <Star className="text-white" size={20} /> },
          { question: "Come garantiamo consegne puntuali in tutto il mondo?", answer: "Utilizziamo una solida rete logistica globale che include treni, navi e aerei cargo per consegnare i prodotti tedeschi in modo efficiente.", icon: <Truck className="text-white" size={20} /> },
          { question: "Quali sono i mercati chiave per le esportazioni MADE IN GERMANY © ?", answer: "Asia, Africa, il mondo arabo e nazioni ricche come gli USA e l’UE sono mercati principali per i prodotti tedeschi.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Quali tipi di prodotti esportiamo?", answer: "Esportiamo componenti automobilistici, macchinari, elettronica, prodotti farmaceutici e altro, tutti conformi agli standard di qualità tedeschi.", icon: <Package className="text-white" size={20} /> },
          { question: "Come supportiamo le piccole imprese con le esportazioni?", answer: "Offriamo logistica personalizzata e prezzi competitivi per aiutare le piccole imprese ad accedere ai mercati globali con prodotti tedeschi.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual è la storia dietro MADE IN GERMANY © ?", answer: "L’etichetta è nata alla fine del XIX secolo come marchio di qualità, evolvendosi in un simbolo globale di eccellenza.", icon: <Clock className="text-white" size={20} /> },
          { question: "Come influiscono le esportazioni tedesche sull’economia mondiale?", answer: "Le esportazioni tedesche stimolano la crescita economica fornendo beni di alta qualità alle industrie globali.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Quali sono le categorie di esportazione tedesche più popolari?", answer: "Automobili, macchinari e prodotti chimici sono in testa, seguiti da elettronica e farmaceutici.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Come ci adattiamo alle esigenze dei diversi mercati?", answer: "Personalizziamo prodotti e logistica per soddisfare le necessità specifiche di ogni regione.", icon: <Settings className="text-white" size={20} /> },
          { question: "Perché la Germania è leader nella manifattura?", answer: "La Germania eccelle grazie alla sua forza lavoro qualificata, infrastrutture avanzate e focus sull’innovazione.", icon: <Factory className="text-white" size={20} /> },
          { question: "Che ruolo gioca la tecnologia nelle nostre esportazioni?", answer: "La tecnologia all’avanguardia assicura che i nostri prodotti rimangano competitivi e soddisfino le richieste moderne.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Come gestiamo le normative sulle esportazioni?", answer: "Rispettiamo le leggi commerciali internazionali e assistiamo i clienti con i requisiti normativi.", icon: <Shield className="text-white" size={20} /> },
          { question: "Qual è il volume delle esportazioni tedesche annuali?", answer: "La Germania esporta ogni anno beni per oltre 1,5 trilioni di euro, una quota significativa a livello globale.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Come garantiamo l’autenticità dei prodotti?", answer: "Ci riforniamo direttamente da produttori tedeschi certificati per garantire l’autenticità.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Quali sono i vantaggi di esportare prodotti tedeschi?", answer: "Gli esportatori accedono a mercati premium e migliorano la reputazione del loro marchio.", icon: <Star className="text-white" size={20} /> },
          { question: "Come promuoviamo le esportazioni tedesche a livello globale?", answer: "Attraverso fiere commerciali, partnership e marketing digitale, mettiamo in mostra la qualità tedesca nel mondo.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Quali sfide affrontiamo nell’esportazione?", answer: "Tariffe, barriere commerciali e costi logistici sono gestiti con una pianificazione strategica.", icon: <Lock className="text-white" size={20} /> },
          { question: "Come favoriamo la crescita delle esportazioni?", answer: "Investiamo in infrastrutture logistiche e ricerche di mercato per ampliare la nostra portata.", icon: <Plane className="text-white" size={20} /> },
          { question: "Qual è il futuro delle esportazioni MADE IN GERMANY © ?", answer: "Sostenibilità e digitalizzazione guideranno la crescita futura delle esportazioni tedesche.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Come gestiamo le richieste dei clienti sulle esportazioni?", answer: "Il nostro team multilingue fornisce risposte rapide e dettagliate a tutte le domande.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Cosa distingue le esportazioni tedesche dai concorrenti?", answer: "Qualità superiore, ingegneria precisa e una reputazione affidabile ci differenziano.", icon: <Award className="text-white" size={20} /> },
          { question: "Come garantiamo la scalabilità delle esportazioni?", answer: "Scaliamo le operazioni con logistica flessibile e partnership per soddisfare la domanda.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Che ruolo giocano gli accordi commerciali nelle nostre esportazioni?", answer: "Gli accordi commerciali riducono le barriere e aprono nuovi mercati per i prodotti tedeschi.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Come gestiamo le fluttuazioni monetarie nelle esportazioni?", answer: "Utilizziamo strategie di copertura e prezzi flessibili per mitigare i rischi valutari.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Opportunità di Distribuzione e Partnership",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "Come possono le aziende collaborare con noi per la distribuzione?", answer: "Collaboriamo con distributori globali per portare i prodotti MADE IN GERMANY ©  nei loro mercati, offrendo logistica personalizzata e supporto.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "Quali vantaggi ottengono i distributori da noi?", answer: "I distributori beneficiano di prodotti tedeschi premium, prezzi competitivi e della nostra vasta rete logistica.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Possiamo importare prodotti in Germania per la distribuzione?", answer: "Sì, facilitiamo le importazioni da aziende globali in Germania, assicurando che soddisfino i nostri standard di qualità.", icon: <Package className="text-white" size={20} /> },
          { question: "Quale supporto offriamo ai nuovi partner?", answer: "I nuovi partner ricevono formazione, supporto marketing e coordinamento logistico per una distribuzione di successo.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Come garantiamo prezzi equi per i distributori?", answer: "Negoziamo direttamente con i produttori per ottenere prezzi competitivi, trasferendo i risparmi ai nostri distributori.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Che tipi di partnership offriamo?", answer: "Offriamo accordi di distribuzione esclusivi, non esclusivi e regionali in base alle esigenze dei partner.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Come selezioniamo i nostri partner di distribuzione?", answer: "Scegliamo i partner in base alla loro portata di mercato, affidabilità e allineamento con i nostri standard di qualità.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual è il processo per diventare distributore?", answer: "Le aziende interessate presentano una candidatura, seguita da una revisione e un accordo.", icon: <Settings className="text-white" size={20} /> },
          { question: "Come formiamo i nostri partner di distribuzione?", answer: "Offriamo sessioni di conoscenza del prodotto, formazione logistica e supporto continuo.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quale supporto marketing offriamo?", answer: "Forniamo materiali promozionali, campagne digitali e opportunità di co-branding.", icon: <Share2 className="text-white" size={20} /> },
          { question: "I distributori possono vendere online?", answer: "Sì, supportiamo la distribuzione e-commerce con strumenti logistici e digitali.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Come gestiamo le dispute tra distributori?", answer: "Mediazione equa con comunicazione chiara e linee guida contrattuali.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quali sono i vantaggi finanziari per i partner?", answer: "I partner ottengono margini elevati grazie al valore premium dei prodotti tedeschi.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Come garantiamo l’esclusività dei partner?", answer: "I partner esclusivi ricevono territori protetti e forniture prioritarie.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quale supporto logistico ricevono i partner?", answer: "Offriamo gestione completa delle spedizioni, tracciamento e assistenza doganale.", icon: <Truck className="text-white" size={20} /> },
          { question: "Come valutiamo le prestazioni dei partner?", answer: "Monitoriamo vendite, feedback dei clienti e metriche di penetrazione di mercato.", icon: <BarChart className="text-white" size={20} /> },
          { question: "I partner possono distribuire più linee di prodotti?", answer: "Sì, i partner possono gestire diverse categorie di prodotti tedeschi in base alla loro capacità.", icon: <Package className="text-white" size={20} /> },
          { question: "Qual è l’ordine minimo per i distributori?", answer: "I minimi variano a seconda del prodotto, ma sono progettati per essere accessibili a tutti i partner.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Come integriamo i nuovi distributori?", answer: "Li guidiamo senza problemi attraverso contratti, formazione e spedizioni iniziali.", icon: <Star className="text-white" size={20} /> },
          { question: "Che ruolo giocano i partner nel branding?", answer: "I partner co-promuovono il marchio MADE IN GERMANY ©  mentre rafforzano la propria reputazione.", icon: <Award className="text-white" size={20} /> },
          { question: "Come supportiamo la crescita dei partner?", answer: "Offriamo opzioni di scalabilità e strategie di espansione di mercato.", icon: <Plane className="text-white" size={20} /> },
          { question: "I partner possono suggerire nuovi prodotti?", answer: "Sì, accogliamo con favore i feedback per ampliare la nostra offerta in base alle esigenze del mercato.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Qual è la durata degli accordi di partnership?", answer: "Gli accordi durano generalmente da 1 a 3 anni, rinnovabili in base alle prestazioni.", icon: <Clock className="text-white" size={20} /> },
          { question: "Come proteggiamo gli investimenti dei partner?", answer: "Garantiamo catene di approvvigionamento stabili e termini equi per proteggere gli investimenti.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quali incentivi ricevono i migliori distributori?", answer: "I migliori performer ottengono prezzi prioritari, bonus e opportunità esclusive.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logistica e Commercio Globale",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "Come gestiamo le sfide delle spedizioni internazionali?", answer: "Le nostre soluzioni logistiche avanzate affrontano dogane, tariffe e ostacoli al trasporto per una consegna fluida.", icon: <Shield className="text-white" size={20} /> },
          { question: "Che ruolo gioca la sostenibilità nella nostra logistica?", answer: "Diamo priorità a metodi di spedizione e imballaggi ecologici per ridurre la nostra impronta di carbonio.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Come influiscono i fusi orari sulle nostre operazioni?", answer: "Operiamo con orari flessibili e strumenti digitali per coordinarci efficacemente tra i fusi orari globali.", icon: <Clock className="text-white" size={20} /> },
          { question: "Quali lingue supportiamo per il commercio globale?", answer: "Offriamo supporto multilingue, inclusi inglese, tedesco, arabo, cinese e altro, per una comunicazione fluida.", icon: <Languages className="text-white" size={20} /> },
          { question: "Come assicuriamo spedizioni sicure?", answer: "Utilizziamo sistemi di tracciamento criptati e vettori affidabili per proteggere le spedizioni in tutto il mondo.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quali metodi di spedizione utilizziamo?", answer: "Usiamo trasporto aereo, marittimo, ferroviario e su strada in base a efficienza e costi.", icon: <Truck className="text-white" size={20} /> },
          { question: "Come calcoliamo i costi di spedizione?", answer: "I costi si basano su distanza, peso e modalità di trasporto, con prezzi trasparenti.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Qual è il nostro tempo medio di consegna?", answer: "I tempi variano a seconda della regione, generalmente da 3 a 14 giorni in base alla destinazione.", icon: <Clock className="text-white" size={20} /> },
          { question: "Come tracciamo le spedizioni?", answer: "I clienti ricevono aggiornamenti in tempo reale tramite la nostra piattaforma di tracciamento criptata.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Cosa succede se una spedizione è in ritardo?", answer: "Indaghiamo, comunichiamo aggiornamenti e acceleriamo le soluzioni rapidamente.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Come gestiamo lo sdoganamento?", answer: "Il nostro team si occupa della documentazione e della conformità per uno sdoganamento senza intoppi.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Qual è la nostra capacità logistica?", answer: "Gestiamo migliaia di spedizioni mensili con un’infrastruttura scalabile.", icon: <Plane className="text-white" size={20} /> },
          { question: "Come ottimizziamo i percorsi di spedizione?", answer: "Usiamo logistica guidata dall’IA per selezionare i percorsi più veloci ed economici.", icon: <Settings className="text-white" size={20} /> },
          { question: "Quali opzioni di assicurazione offriamo?", answer: "Forniamo un’assicurazione completa per una protezione totale delle spedizioni.", icon: <Shield className="text-white" size={20} /> },
          { question: "Come riduciamo i costi logistici?", answer: "Spedizioni in blocco, ottimizzazione dei percorsi e partnership riducono i costi complessivi.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Che ruolo gioca la tecnologia nella logistica?", answer: "Automazione e tecnologia di tracciamento migliorano efficienza e trasparenza.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Come gestiamo le stagioni di punta per le spedizioni?", answer: "Aumentiamo la capacità e diamo priorità alle spedizioni durante i periodi di alta domanda.", icon: <Star className="text-white" size={20} /> },
          { question: "Possiamo spedire in aree remote?", answer: "Sì, la nostra rete raggiunge anche le destinazioni più difficili.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Come garantiamo la logistica a catena fredda?", answer: "Usiamo trasporti refrigerati per beni sensibili alla temperatura come i farmaceutici.", icon: <Package className="text-white" size={20} /> },
          { question: "Qual è la nostra politica di reso per le spedizioni?", answer: "I resi vengono elaborati in modo efficiente con linee guida chiare per i partner.", icon: <Truck className="text-white" size={20} /> },
          { question: "Come gestiamo merci fragili?", answer: "Imballaggi speciali e gestione attenta assicurano che gli articoli fragili arrivino integri.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quali certificazioni ha la nostra logistica?", answer: "Rispettiamo gli standard ISO e internazionali di spedizione.", icon: <Award className="text-white" size={20} /> },
          { question: "Come supportiamo le consegne urgenti?", answer: "Offriamo opzioni di spedizione espressa aerea per esigenze critiche di tempo.", icon: <Plane className="text-white" size={20} /> },
          { question: "Qual è la nostra strategia di conformità al commercio globale?", answer: "Rimaniamo aggiornati sulle leggi commerciali per garantire piena conformità.", icon: <Lock className="text-white" size={20} /> },
          { question: "Come adattiamo la logistica alle emergenze?", answer: "Attiviamo piani di contingenza per risposte rapide in caso di crisi.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "Qualità e Standard",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "Come manteniamo gli standard di qualità tedeschi?", answer: "Lavoriamo con produttori tedeschi certificati e conduciamo controlli di qualità rigorosi su tutti i prodotti.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quali industrie riforniamo con prodotti tedeschi?", answer: "Distribuiamo prodotti per automotive, macchinari, tecnologia, sanità e altro, tutti MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Perché l’ingegneria tedesca è affidabile a livello mondiale?", answer: "L’ingegneria tedesca è sinonimo di precisione, innovazione e affidabilità, costruita su decenni di esperienza.", icon: <Award className="text-white" size={20} /> },
          { question: "Come certifichiamo i prodotti importati?", answer: "I prodotti importati vengono sottoposti a test rigorosi per rispettare le normative tedesche di sicurezza e qualità.", icon: <Settings className="text-white" size={20} /> },
          { question: "Che ruolo gioca l’innovazione nelle nostre offerte?", answer: "Ci concentriamo sulla tecnologia tedesca all’avanguardia per fornire soluzioni innovative ai mercati globali.", icon: <Star className="text-white" size={20} /> },
          { question: "Quali certificazioni di qualità possediamo?", answer: "I nostri prodotti rispettano gli standard DIN, ISO e CE, garantendo una qualità di prim’ordine.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Come testiamo la durata dei prodotti?", answer: "Effettuiamo test di resistenza e simulazioni a lungo termine per garantire la durata.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Qual è il nostro processo di controllo qualità?", answer: "Ogni fase di produzione è monitorata, con ispezioni finali prima della spedizione.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Come assicuriamo la coerenza nella qualità?", answer: "Processi standardizzati e audit regolari mantengono una qualità costante.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quali materiali usiamo per i prodotti tedeschi?", answer: "Utilizziamo materiali di alta qualità provenienti da fornitori affidabili.", icon: <Package className="text-white" size={20} /> },
          { question: "Come gestiamo i prodotti difettosi?", answer: "Gli articoli difettosi vengono sostituiti rapidamente con piena trasparenza.", icon: <Truck className="text-white" size={20} /> },
          { question: "Qual è la durata dei nostri prodotti?", answer: "I prodotti tedeschi sono progettati per una lunga durata, superando spesso gli standard del settore.", icon: <Clock className="text-white" size={20} /> },
          { question: "Come garantiamo gli standard di sicurezza?", answer: "I prodotti vengono testati per la conformità alle normative di sicurezza globali.", icon: <Lock className="text-white" size={20} /> },
          { question: "Che ruolo gioca la R&S nella qualità?", answer: "Ricerca e sviluppo guidano il miglioramento continuo delle nostre offerte.", icon: <Star className="text-white" size={20} /> },
          { question: "Come formiamo i produttori?", answer: "Forniamo linee guida e audit per garantire il rispetto dei nostri standard.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual è la nostra politica di garanzia?", answer: "Offriamo garanzie complete adattate a ogni categoria di prodotto.", icon: <Shield className="text-white" size={20} /> },
          { question: "Come gestiamo i reclami sulla qualità?", answer: "Indaghiamo e risolviamo i problemi rapidamente per mantenere la fiducia dei clienti.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Cosa rende i nostri controlli di qualità rigorosi?", answer: "Più fasi di test e supervisione esperta non lasciano spazio a compromessi.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Come rimaniamo all’avanguardia negli standard di qualità?", answer: "Adottiamo gli ultimi progressi del settore e superiamo le aspettative.", icon: <Award className="text-white" size={20} /> },
          { question: "Che ruolo gioca la precisione nei nostri prodotti?", answer: "L’ingegneria di precisione garantisce prestazioni impeccabili e affidabilità.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Come assicuriamo una produzione ecologica?", answer: "Integriamo pratiche sostenibili nei processi di produzione.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Quali strutture di test utilizziamo?", answer: "Laboratori all’avanguardia in Germania verificano la qualità dei prodotti.", icon: <Factory className="text-white" size={20} /> },
          { question: "Come certifichiamo la qualità dei fornitori?", answer: "I fornitori vengono sottoposti a regolari audit per soddisfare i nostri criteri rigorosi.", icon: <Settings className="text-white" size={20} /> },
          { question: "Qual è il nostro approccio al miglioramento continuo?", answer: "Feedback e innovazione mantengono i nostri standard in evoluzione.", icon: <Plane className="text-white" size={20} /> },
          { question: "Come garantiamo la soddisfazione del cliente?", answer: "Prodotti di alta qualità e supporto reattivo assicurano la soddisfazione.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  pt: {
    headerTitle: "Assistente Comercial MADE IN GERMANY © ",
    headerSubtitle: "Online e pronto para ajudar com suas necessidades de comércio global",
    searchPlaceholder: "Faça sua pergunta...",
    footerText: "Faça sua pergunta ou explore os tópicos",
    sections: [
      {
        title: "Perguntas Gerais sobre Exportações MADE IN GERMANY © ",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "O que torna os produtos MADE IN GERMANY ©  únicos?", answer: "Os produtos MADE IN GERMANY ©  são conhecidos por sua precisão, qualidade e inovação, respaldados por uma longa tradição de excelência em engenharia.", icon: <Award className="text-white" size={20} /> },
          { question: "Por que as empresas deveriam importar produtos MADE IN GERMANY © ?", answer: "Esses produtos oferecem confiabilidade, durabilidade e tecnologia avançada, muito procurados nos mercados globais.", icon: <Star className="text-white" size={20} /> },
          { question: "Como garantimos entregas pontuais em todo o mundo?", answer: "Usamos uma robusta rede logística global que inclui trens, navios e aviões de carga para entregar produtos alemães de forma eficiente.", icon: <Truck className="text-white" size={20} /> },
          { question: "Quais são os mercados-chave para as exportações MADE IN GERMANY © ?", answer: "Ásia, África, o mundo árabe e nações ricas como os EUA e a UE são mercados principais para os produtos alemães.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Que tipos de produtos exportamos?", answer: "Exportamos peças automotivas, máquinas, eletrônicos, produtos farmacêuticos e mais, todos aderindo aos padrões de qualidade alemães.", icon: <Package className="text-white" size={20} /> },
          { question: "Como apoiamos pequenas empresas com exportações?", answer: "Oferecemos logística personalizada e preços competitivos para ajudar pequenas empresas a acessar mercados globais com produtos alemães.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual é a história por trás do MADE IN GERMANY © ?", answer: "O selo surgiu no final do século XIX como uma marca de qualidade, evoluindo para um símbolo global de excelência.", icon: <Clock className="text-white" size={20} /> },
          { question: "Como as exportações alemãs impactam a economia global?", answer: "As exportações alemãs impulsionam o crescimento econômico ao fornecer bens de alta qualidade para indústrias globais.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Quais são as categorias de exportação alemãs mais populares?", answer: "Automóveis, máquinas e produtos químicos lideram, seguidos por eletrônicos e farmacêuticos.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Como nos adaptamos às demandas de diferentes mercados?", answer: "Personalizamos produtos e logística para atender às necessidades específicas de cada região.", icon: <Settings className="text-white" size={20} /> },
          { question: "Por que a Alemanha é líder em manufatura?", answer: "A Alemanha se destaca por sua força de trabalho qualificada, infraestrutura avançada e foco em inovação.", icon: <Factory className="text-white" size={20} /> },
          { question: "Qual é o papel da tecnologia em nossas exportações?", answer: "A tecnologia de ponta garante que nossos produtos permaneçam competitivos e atendam às demandas modernas.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Como lidamos com as regulamentações de exportação?", answer: "Cumprimos as leis comerciais internacionais e ajudamos os clientes com os requisitos regulatórios.", icon: <Shield className="text-white" size={20} /> },
          { question: "Qual é o volume das exportações alemãs anuais?", answer: "A Alemanha exporta mais de 1,5 trilhão de euros em bens anualmente, uma parcela significativa global.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Como garantimos a autenticidade dos produtos?", answer: "Nos abastecemos diretamente de fabricantes alemães certificados para garantir a autenticidade.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Quais são os benefícios de exportar produtos alemães?", answer: "Os exportadores ganham acesso a mercados premium e fortalecem a reputação de sua marca.", icon: <Star className="text-white" size={20} /> },
          { question: "Como promovemos as exportações alemãs globalmente?", answer: "Por meio de feiras comerciais, parcerias e marketing digital, destacamos a qualidade alemã em todo o mundo.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Quais desafios enfrentamos na exportação?", answer: "Tarifas, barreiras comerciais e custos logísticos são gerenciados com planejamento estratégico.", icon: <Lock className="text-white" size={20} /> },
          { question: "Como fomentamos o crescimento das exportações?", answer: "Investimos em infraestrutura logística e pesquisa de mercado para expandir nosso alcance.", icon: <Plane className="text-white" size={20} /> },
          { question: "Qual é o futuro das exportações MADE IN GERMANY © ?", answer: "Sustentabilidade e digitalização impulsionarão o crescimento futuro das exportações alemãs.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Como lidamos com as consultas dos clientes sobre exportações?", answer: "Nossa equipe multilíngue fornece respostas rápidas e detalhadas a todas as perguntas.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "O que diferencia as exportações alemãs dos concorrentes?", answer: "Qualidade superior, engenharia precisa e uma reputação confiável nos distinguem.", icon: <Award className="text-white" size={20} /> },
          { question: "Como garantimos a escalabilidade das exportações?", answer: "Escalamos operações com logística flexível e parcerias para atender à demanda.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Qual é o papel dos acordos comerciais em nossas exportações?", answer: "Os acordos comerciais reduzem barreiras e abrem novos mercados para os produtos alemães.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Como lidamos com as flutuações monetárias nas exportações?", answer: "Usamos estratégias de hedge e preços flexíveis para mitigar riscos cambiais.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Oportunidades de Distribuição e Parcerias",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "Como as empresas podem se associar a nós para distribuição?", answer: "Colaboramos com distribuidores globais para levar produtos MADE IN GERMANY ©  aos seus mercados, oferecendo logística personalizada e suporte.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "Quais benefícios os distribuidores ganham conosco?", answer: "Os distribuidores têm acesso a produtos alemães premium, preços competitivos e nossa extensa rede logística.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Podemos importar produtos para a Alemanha para distribuição?", answer: "Sim, facilitamos importações de empresas globais para a Alemanha, garantindo que atendam aos nossos padrões de qualidade.", icon: <Package className="text-white" size={20} /> },
          { question: "Que suporte oferecemos aos novos parceiros?", answer: "Novos parceiros recebem treinamento, suporte de marketing e coordenação logística para uma distribuição bem-sucedida.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Como garantimos preços justos para os distribuidores?", answer: "Negociamos diretamente com fabricantes para obter preços competitivos, repassando as economias aos nossos distribuidores.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Que tipos de parcerias oferecemos?", answer: "Oferecemos acordos de distribuição exclusivos, não exclusivos e regionais, conforme as necessidades dos parceiros.", icon: <Handshake className="text-white" size={20} /> },
          { question: "Como selecionamos nossos parceiros de distribuição?", answer: "Escolhemos parceiros com base em alcance de mercado, confiabilidade e alinhamento com nossos padrões de qualidade.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual é o processo para se tornar um distribuidor?", answer: "Empresas interessadas enviam uma inscrição, seguida por uma revisão e acordo.", icon: <Settings className="text-white" size={20} /> },
          { question: "Como treinamos nossos parceiros de distribuição?", answer: "Oferecemos sessões de conhecimento do produto, treinamento logístico e suporte contínuo.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Que suporte de marketing fornecemos?", answer: "Fornecemos materiais promocionais, campanhas digitais e oportunidades de co-branding.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Os distribuidores podem vender online?", answer: "Sim, apoiamos a distribuição no comércio eletrônico com ferramentas logísticas e digitais.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Como lidamos com disputas entre distribuidores?", answer: "Mediamos de forma justa com comunicação clara e diretrizes contratuais.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quais são os benefícios financeiros para os parceiros?", answer: "Os parceiros obtêm margens altas devido ao valor premium dos produtos alemães.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Como garantimos a exclusividade dos parceiros?", answer: "Parceiros exclusivos recebem territórios protegidos e fornecimento prioritário.", icon: <Lock className="text-white" size={20} /> },
          { question: "Que suporte logístico os parceiros recebem?", answer: "Oferecemos gestão completa de envios, rastreamento e assistência alfandegária.", icon: <Truck className="text-white" size={20} /> },
          { question: "Como avaliamos o desempenho dos parceiros?", answer: "Acompanhamos vendas, feedback dos clientes e métricas de penetração de mercado.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Os parceiros podem distribuir várias linhas de produtos?", answer: "Sim, os parceiros podem gerenciar diversas categorias de produtos alemães com base em sua capacidade.", icon: <Package className="text-white" size={20} /> },
          { question: "Qual é o pedido mínimo para distribuidores?", answer: "Os mínimos variam por produto, mas são projetados para serem acessíveis a todos os parceiros.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Como integramos novos distribuidores?", answer: "Guiamos eles de forma fluida através de contratos, treinamentos e envios iniciais.", icon: <Star className="text-white" size={20} /> },
          { question: "Qual é o papel dos parceiros no branding?", answer: "Os parceiros co-promovem a marca MADE IN GERMANY ©  enquanto fortalecem sua própria reputação.", icon: <Award className="text-white" size={20} /> },
          { question: "Como apoiamos o crescimento dos parceiros?", answer: "Oferecemos opções de escalabilidade e estratégias de expansão de mercado.", icon: <Plane className="text-white" size={20} /> },
          { question: "Os parceiros podem sugerir novos produtos?", answer: "Sim, recebemos feedback para expandir nossa oferta com base nas necessidades do mercado.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "Qual é a duração dos acordos de parceria?", answer: "Os acordos geralmente duram de 1 a 3 anos, renováveis com base no desempenho.", icon: <Clock className="text-white" size={20} /> },
          { question: "Como protegemos os investimentos dos parceiros?", answer: "Garantimos cadeias de suprimento estáveis e termos justos para proteger os investimentos.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quais incentivos os melhores distribuidores recebem?", answer: "Os melhores desempenhos recebem preços prioritários, bônus e oportunidades exclusivas.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logística e Comércio Global",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "Como lidamos com os desafios de envio internacional?", answer: "Nossas soluções logísticas avançadas abordam alfândegas, tarifas e obstáculos de transporte para uma entrega tranquila.", icon: <Shield className="text-white" size={20} /> },
          { question: "Qual é o papel da sustentabilidade em nossa logística?", answer: "Priorizamos métodos de envio e embalagens ecológicas para reduzir nossa pegada de carbono.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Como os fusos horários afetam nossas operações?", answer: "Operamos com horários flexíveis e ferramentas digitais para coordenar eficazmente entre fusos horários globais.", icon: <Clock className="text-white" size={20} /> },
          { question: "Quais idiomas suportamos para o comércio global?", answer: "Oferecemos suporte multilíngue, incluindo inglês, alemão, árabe, chinês e mais, para uma comunicação fluida.", icon: <Languages className="text-white" size={20} /> },
          { question: "Como garantimos envios seguros?", answer: "Usamos sistemas de rastreamento criptografados e transportadoras confiáveis para proteger os envios em todo o mundo.", icon: <Lock className="text-white" size={20} /> },
          { question: "Quais métodos de envio utilizamos?", answer: "Utilizamos transporte aéreo, marítimo, ferroviário e rodoviário com base na eficiência e custo.", icon: <Truck className="text-white" size={20} /> },
          { question: "Como calculamos os custos de envio?", answer: "Os custos são baseados em distância, peso e modo de transporte, com preços transparentes.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Qual é o nosso tempo médio de entrega?", answer: "Os prazos variam por região, geralmente de 3 a 14 dias dependendo do destino.", icon: <Clock className="text-white" size={20} /> },
          { question: "Como rastreamos os envios?", answer: "Os clientes recebem atualizações em tempo real por meio de nossa plataforma de rastreamento criptografada.", icon: <MapPin className="text-white" size={20} /> },
          { question: "O que acontece se um envio atrasar?", answer: "Investigamos, comunicamos atualizações e aceleramos soluções rapidamente.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Como lidamos com o desembaraço alfandegário?", answer: "Nossa equipe gerencia a documentação e conformidade para um desembaraço alfandegário sem problemas.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Qual é a nossa capacidade logística?", answer: "Gerenciamos milhares de envios mensais com uma infraestrutura escalável.", icon: <Plane className="text-white" size={20} /> },
          { question: "Como otimizamos as rotas de envio?", answer: "Usamos logística orientada por IA para selecionar as rotas mais rápidas e econômicas.", icon: <Settings className="text-white" size={20} /> },
          { question: "Quais opções de seguro oferecemos?", answer: "Fornecemos seguro abrangente para proteção total dos envios.", icon: <Shield className="text-white" size={20} /> },
          { question: "Como reduzimos os custos logísticos?", answer: "Envios em massa, otimização de rotas e parcerias reduzem os custos gerais.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Qual é o papel da tecnologia na logística?", answer: "Automação e tecnologia de rastreamento melhoram a eficiência e transparência.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "Como gerenciamos as temporadas de pico de envio?", answer: "Aumentamos a capacidade e priorizamos envios durante períodos de alta demanda.", icon: <Star className="text-white" size={20} /> },
          { question: "Podemos enviar para áreas remotas?", answer: "Sim, nossa rede alcança até os destinos mais desafiadores.", icon: <MapPin className="text-white" size={20} /> },
          { question: "Como garantimos a logística de cadeia fria?", answer: "Usamos transporte refrigerado para bens sensíveis à temperatura, como farmacêuticos.", icon: <Package className="text-white" size={20} /> },
          { question: "Qual é a nossa política de devolução para envios?", answer: "As devoluções são processadas eficientemente com diretrizes claras para os parceiros.", icon: <Truck className="text-white" size={20} /> },
          { question: "Como lidamos com mercadorias frágeis?", answer: "Embalagens especiais e manuseio cuidadoso garantem que itens frágeis cheguem intactos.", icon: <Shield className="text-white" size={20} /> },
          { question: "Quais certificações nossa logística possui?", answer: "Cumprimos os padrões ISO e internacionais de envio.", icon: <Award className="text-white" size={20} /> },
          { question: "Como apoiamos entregas urgentes?", answer: "Oferecemos opções de envio expresso por via aérea para necessidades críticas de tempo.", icon: <Plane className="text-white" size={20} /> },
          { question: "Qual é a nossa estratégia de conformidade no comércio global?", answer: "Mantemo-nos atualizados sobre as leis comerciais para garantir total conformidade.", icon: <Lock className="text-white" size={20} /> },
          { question: "Como adaptamos a logística para emergências?", answer: "Ativamos planos de contingência para respostas rápidas em crises.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "Qualidade e Padrões",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "Como mantemos os padrões de qualidade alemães?", answer: "Trabalhamos com fabricantes alemães certificados e realizamos rigorosos controles de qualidade em todos os produtos.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Quais indústrias abastecemos com produtos alemães?", answer: "Distribuímos produtos para automotivo, máquinas, tecnologia, saúde e mais, todos MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Por que a engenharia alemã é confiável mundialmente?", answer: "A engenharia alemã é sinônimo de precisão, inovação e confiabilidade, construída ao longo de décadas de experiência.", icon: <Award className="text-white" size={20} /> },
          { question: "Como certificamos os produtos importados?", answer: "Os produtos importados passam por testes rigorosos para atender às regulamentações alemãs de segurança e qualidade.", icon: <Settings className="text-white" size={20} /> },
          { question: "Qual é o papel da inovação em nossas ofertas?", answer: "Focamos em tecnologia alemã de ponta para oferecer soluções inovadoras aos mercados globais.", icon: <Star className="text-white" size={20} /> },
          { question: "Quais certificações de qualidade possuímos?", answer: "Nossos produtos atendem aos padrões DIN, ISO e CE, garantindo qualidade de alto nível.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Como testamos a durabilidade dos produtos?", answer: "Realizamos testes de estresse e simulações de longo prazo para garantir a durabilidade.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Qual é o nosso processo de controle de qualidade?", answer: "Cada etapa da produção é monitorada, com inspeções finais antes do envio.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Como garantimos consistência na qualidade?", answer: "Processos padronizados e auditorias regulares mantêm a qualidade consistente.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Quais materiais usamos para os produtos alemães?", answer: "Usamos materiais de alta qualidade provenientes de fornecedores confiáveis.", icon: <Package className="text-white" size={20} /> },
          { question: "Como lidamos com produtos defeituosos?", answer: "Itens defeituosos são substituídos rapidamente com total transparência.", icon: <Truck className="text-white" size={20} /> },
          { question: "Qual é a vida útil dos nossos produtos?", answer: "Os produtos alemães são projetados para longevidade, frequentemente superando os padrões da indústria.", icon: <Clock className="text-white" size={20} /> },
          { question: "Como garantimos os padrões de segurança?", answer: "Os produtos são testados para conformidade com regulamentações de segurança globais.", icon: <Lock className="text-white" size={20} /> },
          { question: "Qual é o papel da P&D na qualidade?", answer: "Pesquisa e desenvolvimento impulsionam a melhoria contínua de nossas ofertas.", icon: <Star className="text-white" size={20} /> },
          { question: "Como treinamos os fabricantes?", answer: "Fornecemos diretrizes e auditorias para garantir a adesão aos nossos padrões.", icon: <Users className="text-white" size={20} /> },
          { question: "Qual é a nossa política de garantia?", answer: "Oferecemos garantias abrangentes adaptadas a cada categoria de produto.", icon: <Shield className="text-white" size={20} /> },
          { question: "Como lidamos com reclamações sobre qualidade?", answer: "Investigamos e resolvemos problemas rapidamente para manter a confiança dos clientes.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "O que torna nossos controles de qualidade rigorosos?", answer: "Múltiplas fases de teste e supervisão especializada não permitem concessões.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "Como nos mantemos à frente nos padrões de qualidade?", answer: "Adotamos os mais recentes avanços da indústria e superamos expectativas.", icon: <Award className="text-white" size={20} /> },
          { question: "Qual é o papel da precisão em nossos produtos?", answer: "A engenharia de precisão garante desempenho impecável e confiabilidade.", icon: <Wrench className="text-white" size={20} /> },
          { question: "Como garantimos uma produção ecológica?", answer: "Integramos práticas sustentáveis nos processos de fabricação.", icon: <Leaf className="text-white" size={20} /> },
          { question: "Quais instalações de teste usamos?", answer: "Laboratórios de ponta na Alemanha verificam a qualidade dos produtos.", icon: <Factory className="text-white" size={20} /> },
          { question: "Como certificamos a qualidade dos fornecedores?", answer: "Os fornecedores são auditados regularmente para atender aos nossos critérios rigorosos.", icon: <Settings className="text-white" size={20} /> },
          { question: "Qual é nossa abordagem para a melhoria contínua?", answer: "Feedback e inovação mantêm nossos padrões em evolução.", icon: <Plane className="text-white" size={20} /> },
          { question: "Como garantimos a satisfação do cliente?", answer: "Produtos de alta qualidade e suporte responsivo asseguram a satisfação.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  sa: {
    headerTitle: "مساعد الأعمال MADE IN GERMANY © ",
    headerSubtitle: "متواجد عبر الإنترنت وجاهز للمساعدة في احتياجات التجارة العالمية الخاصة بك",
    searchPlaceholder: "اطرح سؤالك...",
    footerText: "اطرح سؤالك أو تصفح المواضيع",
    sections: [
      {
        title: "أسئلة عامة حول الصادرات MADE IN GERMANY © ",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "ما الذي يجعل منتجات MADE IN GERMANY ©  فريدة؟", answer: "تشتهر منتجات MADE IN GERMANY ©  بدقتها وجودتها وابتكارها، مدعومة بتقليد طويل في التميز الهندسي.", icon: <Award className="text-white" size={20} /> },
          { question: "لماذا يجب على الشركات استيراد منتجات MADE IN GERMANY © ؟", answer: "تقدم هذه المنتجات الموثوقية والمتانة والتكنولوجيا المتقدمة، وهي مطلوبة بشدة في الأسواق العالمية.", icon: <Star className="text-white" size={20} /> },
          { question: "كيف نضمن التسليم في الوقت المحدد عالميًا؟", answer: "نستخدم شبكة لوجستية عالمية قوية تشمل القطارات والسفن وطائرات الشحن لتوصيل المنتجات الألمانية بكفاءة.", icon: <Truck className="text-white" size={20} /> },
          { question: "ما هي الأسواق الرئيسية للصادرات MADE IN GERMANY © ؟", answer: "آسيا وأفريقيا والعالم العربي والدول الغنية مثل الولايات المتحدة والاتحاد الأوروبي هي أسواق رئيسية للسلع الألمانية.", icon: <MapPin className="text-white" size={20} /> },
          { question: "ما أنواع المنتجات التي نصدرها؟", answer: "نصدر قطع غيار السيارات، والآلات، والإلكترونيات، والمنتجات الصيدلانية وأكثر، كلها تتوافق مع معايير الجودة الألمانية.", icon: <Package className="text-white" size={20} /> },
          { question: "كيف ندعم الشركات الصغيرة في التصدير؟", answer: "نقدم خدمات لوجستية مخصصة وأسعارًا تنافسية لمساعدة الشركات الصغيرة على الوصول إلى الأسواق العالمية بمنتجات ألمانية.", icon: <Users className="text-white" size={20} /> },
          { question: "ما هي قصة MADE IN GERMANY © ؟", answer: "ظهرت العلامة في أواخر القرن التاسع عشر كعلامة جودة، وتطورت لتصبح رمزًا عالميًا للتميز.", icon: <Clock className="text-white" size={20} /> },
          { question: "كيف تؤثر الصادرات الألمانية على الاقتصاد العالمي؟", answer: "تعزز الصادرات الألمانية النمو الاقتصادي من خلال توفير سلع عالية الجودة للصناعات العالمية.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "ما هي فئات التصدير الألمانية الأكثر شعبية؟", answer: "تتصدر السيارات والآلات والمنتجات الكيميائية، تليها الإلكترونيات والصيدلانيات.", icon: <BarChart className="text-white" size={20} /> },
          { question: "كيف نتكيف مع متطلبات الأسواق المختلفة؟", answer: "نخصص المنتجات والخدمات اللوجستية لتلبية احتياجات كل منطقة على حدة.", icon: <Settings className="text-white" size={20} /> },
          { question: "لماذا تتفوق ألمانيا في التصنيع؟", answer: "تتميز ألمانيا بقوة عاملة مؤهلة، وبنية تحتية متقدمة، وتركيز على الابتكار.", icon: <Factory className="text-white" size={20} /> },
          { question: "ما دور التكنولوجيا في صادراتنا؟", answer: "تضمن التكنولوجيا الحديثة بقاء منتجاتنا تنافسية وتلبي المتطلبات الحديثة.", icon: <Wrench className="text-white" size={20} /> },
          { question: "كيف نتعامل مع لوائح التصدير؟", answer: "نلتزم بالقوانين التجارية الدولية ونساعد العملاء في المتطلبات التنظيمية.", icon: <Shield className="text-white" size={20} /> },
          { question: "ما حجم الصادرات الألمانية السنوية؟", answer: "تصدر ألمانيا سنويًا بضائع بقيمة تزيد عن 1.5 تريليون يورو، وهي حصة كبيرة عالميًا.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "كيف نضمن أصالة المنتجات؟", answer: "نتعامل مباشرة مع الشركات المصنعة الألمانية المعتمدة لضمان الأصالة.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "ما فوائد تصدير المنتجات الألمانية؟", answer: "يحصل المصدرون على وصول إلى أسواق متميزة ويعززون سمعة علامتهم التجارية.", icon: <Star className="text-white" size={20} /> },
          { question: "كيف نروج للصادرات الألمانية عالميًا؟", answer: "من خلال المعارض التجارية، والشراكات، والتسويق الرقمي، نبرز الجودة الألمانية عالميًا.", icon: <Share2 className="text-white" size={20} /> },
          { question: "ما التحديات التي نواجهها في التصدير؟", answer: "يتم التعامل مع الرسوم الجمركية والحواجز التجارية وتكاليف الشحن عبر التخطيط الاستراتيجي.", icon: <Lock className="text-white" size={20} /> },
          { question: "كيف نشجع نمو الصادرات؟", answer: "نستثمر في البنية التحتية اللوجستية وأبحاث السوق لتوسيع نطاقنا.", icon: <Plane className="text-white" size={20} /> },
          { question: "ما مستقبل الصادرات MADE IN GERMANY © ؟", answer: "ستدفع الاستدامة والتكنولوجيا الرقمية نمو الصادرات الألمانية المستقبلي.", icon: <Leaf className="text-white" size={20} /> },
          { question: "كيف نعالج استفسارات العملاء حول الصادرات؟", answer: "يقدم فريقنا متعدد اللغات إجابات سريعة ومفصلة على جميع الاستفسارات.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "ما الذي يميز الصادرات الألمانية عن المنافسين؟", answer: "الجودة العالية، والهندسة الدقيقة، والسمعة الموثوقة تميزنا.", icon: <Award className="text-white" size={20} /> },
          { question: "كيف نضمن قابلية التوسع في الصادرات؟", answer: "نوسع العمليات مع لوجستيات مرنة وشراكات لتلبية الطلب.", icon: <BarChart className="text-white" size={20} /> },
          { question: "ما دور الاتفاقيات التجارية في صادراتنا؟", answer: "تقلل الاتفاقيات التجارية الحواجز وتفتح أسواقًا جديدة للسلع الألمانية.", icon: <Handshake className="text-white" size={20} /> },
          { question: "كيف نتعامل مع تقلبات العملات في الصادرات؟", answer: "نستخدم استراتيجيات التحوط والتسعير المرن لتقليل مخاطر العملات.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "فرص التوزيع والشراكات",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "كيف يمكن للشركات التعاون معنا للتوزيع؟", answer: "نتعاون مع موزعين عالميين لجلب منتجات MADE IN GERMANY ©  إلى أسواقهم، مع تقديم لوجستيات مخصصة ودعم.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "ما الفوائد التي يحصل عليها الموزعون منا؟", answer: "يستفيد الموزعون من منتجات ألمانية متميزة، وأسعار تنافسية، وشبكتنا اللوجستية الواسعة.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "هل يمكننا استيراد منتجات إلى ألمانيا للتوزيع؟", answer: "نعم، نحن نسهل استيراد المنتجات من الشركات العالمية إلى ألمانيا، مع ضمان مطابقتها لمعايير الجودة لدينا.", icon: <Package className="text-white" size={20} /> },
          { question: "ما الدعم الذي نقدمه للشركاء الجدد؟", answer: "يتلقى الشركاء الجدد تدريبًا، ودعمًا تسويقيًا، وتنسيقًا لوجستيًا لتوزيع ناجح.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "كيف نضمن أسعارًا عادلة للموزعين؟", answer: "نتفاوض مباشرة مع المصنعين للحصول على أسعار تنافسية، وننقل التوفير إلى موزعينا.", icon: <BarChart className="text-white" size={20} /> },
          { question: "ما أنواع الشراكات التي نقدمها؟", answer: "نقدم اتفاقيات توزيع حصرية وغير حصرية وإقليمية بناءً على احتياجات الشركاء.", icon: <Handshake className="text-white" size={20} /> },
          { question: "كيف نختار شركاء التوزيع لدينا؟", answer: "نختار الشركاء بناءً على نطاق السوق، والموثوقية، والتوافق مع معايير الجودة لدينا.", icon: <Users className="text-white" size={20} /> },
          { question: "ما هي عملية أن تصبح موزعًا؟", answer: "تقدم الشركات المهتمة طلبًا، يتبعه مراجعة واتفاقية.", icon: <Settings className="text-white" size={20} /> },
          { question: "كيف ندرب شركاء التوزيع لدينا؟", answer: "نقدم جلسات معرفة بالمنتج، وتدريبًا لوجستيًا، ودعمًا مستمرًا.", icon: <Wrench className="text-white" size={20} /> },
          { question: "ما الدعم التسويقي الذي نقدمه؟", answer: "نوفر مواد ترويجية، وحملات رقمية، وفرصًا للعلامة التجارية المشتركة.", icon: <Share2 className="text-white" size={20} /> },
          { question: "هل يمكن للموزعين البيع عبر الإنترنت؟", answer: "نعم، نحن ندعم التوزيع عبر التجارة الإلكترونية بأدوات لوجستية ورقمية.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "كيف نتعامل مع النزاعات بين الموزعين؟", answer: "نقوم بالوساطة بشكل عادل مع تواصل واضح وإرشادات تعاقدية.", icon: <Shield className="text-white" size={20} /> },
          { question: "ما الفوائد المالية للشركاء؟", answer: "يحقق الشركاء هوامش ربح عالية بفضل القيمة المتميزة للمنتجات الألمانية.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "كيف نضمن حصرية الشركاء؟", answer: "يحصل الشركاء الحصريون على مناطق محمية وإمدادات ذات أولوية.", icon: <Lock className="text-white" size={20} /> },
          { question: "ما الدعم اللوجستي الذي يحصل عليه الشركاء؟", answer: "نقدم إدارة كاملة للشحنات، والتتبع، والمساعدة الجمركية.", icon: <Truck className="text-white" size={20} /> },
          { question: "كيف نقيم أداء شركائنا؟", answer: "نراقب المبيعات، وتعليقات العملاء، ومقاييس اختراق السوق.", icon: <BarChart className="text-white" size={20} /> },
          { question: "هل يمكن للشركاء توزيع خطوط منتجات متعددة؟", answer: "نعم، يمكن للشركاء التعامل مع فئات مختلفة من المنتجات الألمانية بناءً على قدراتهم.", icon: <Package className="text-white" size={20} /> },
          { question: "ما هو الحد الأدنى للطلب للموزعين؟", answer: "تختلف الحدود الدنيا حسب المنتج، لكنها مصممة لتكون في متناول جميع الشركاء.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "كيف ندمج الموزعين الجدد؟", answer: "نرشدهم بسلاسة من خلال العقود، والتدريب، والشحنات الأولية.", icon: <Star className="text-white" size={20} /> },
          { question: "ما دور الشركاء في العلامة التجارية؟", answer: "يعزز الشركاء العلامة التجارية MADE IN GERMANY ©  بينما يقوون سمعتهم الخاصة.", icon: <Award className="text-white" size={20} /> },
          { question: "كيف ندعم نمو الشركاء؟", answer: "نقدم خيارات التوسع واستراتيجيات توسيع السوق.", icon: <Plane className="text-white" size={20} /> },
          { question: "هل يمكن للشركاء اقتراح منتجات جديدة؟", answer: "نعم، نحن نرحب بالتعليقات لتوسيع عروضنا بناءً على احتياجات السوق.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "ما مدة اتفاقيات الشراكة؟", answer: "تستمر الاتفاقيات عادة من سنة إلى ثلاث سنوات، قابلة للتجديد بناءً على الأداء.", icon: <Clock className="text-white" size={20} /> },
          { question: "كيف نحمي استثمارات الشركاء؟", answer: "نضمن سلاسل توريد مستقرة وشروطًا عادلة لحماية الاستثمارات.", icon: <Shield className="text-white" size={20} /> },
          { question: "ما الحوافز التي يحصل عليها أفضل الموزعين؟", answer: "يحصل الأفضل أداءً على أسعار أولوية، ومكافآت، وفرص حصرية.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "اللوجستيات والتجارة العالمية",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "كيف نتعامل مع تحديات الشحن الدولي؟", answer: "تعالج حلولنا اللوجستية المتقدمة الجمارك والتعريفات وعقبات النقل لضمان تسليم سلس.", icon: <Shield className="text-white" size={20} /> },
          { question: "ما دور الاستدامة في لوجستياتنا؟", answer: "نعطي الأولوية لطرق الشحن والتغليف الصديقة للبيئة لتقليل بصمتنا الكربونية.", icon: <Leaf className="text-white" size={20} /> },
          { question: "كيف تؤثر المناطق الزمنية على عملياتنا؟", answer: "نعمل بجداول زمنية مرنة وأدوات رقمية للتنسيق بفعالية عبر المناطق الزمنية العالمية.", icon: <Clock className="text-white" size={20} /> },
          { question: "ما اللغات التي ندعمها للتجارة العالمية؟", answer: "نقدم دعمًا متعدد اللغات يشمل الإنجليزية والألمانية والعربية والصينية وغيرها لتواصل سلس.", icon: <Languages className="text-white" size={20} /> },
          { question: "كيف نضمن شحنات آمنة؟", answer: "نستخدم أنظمة تتبع مشفرة وشركات نقل موثوقة لحماية الشحنات عالميًا.", icon: <Lock className="text-white" size={20} /> },
          { question: "ما طرق الشحن التي نستخدمها؟", answer: "نستخدم النقل الجوي والبحري والسكك الحديدية والبري بناءً على الكفاءة والتكلفة.", icon: <Truck className="text-white" size={20} /> },
          { question: "كيف نحسب تكاليف الشحن؟", answer: "تعتمد التكاليف على المسافة والوزن وطريقة النقل مع تسعير شفاف.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "ما هو متوسط وقت التسليم لدينا؟", answer: "تختلف المدة حسب المنطقة، عادةً من 3 إلى 14 يومًا بناءً على الوجهة.", icon: <Clock className="text-white" size={20} /> },
          { question: "كيف نتتبع الشحنات؟", answer: "يتلقى العملاء تحديثات فورية عبر منصة التتبع المشفرة الخاصة بنا.", icon: <MapPin className="text-white" size={20} /> },
          { question: "ماذا يحدث إذا تأخرت شحنة؟", answer: "نحقق ونبلغ التحديثات ونسرع الحلول بسرعة.", icon: <Wrench className="text-white" size={20} /> },
          { question: "كيف نتعامل مع التخليص الجمركي؟", answer: "يتولى فريقنا الوثائق والامتثال لضمان تخليص جمركي سلس.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "ما هي قدرتنا اللوجستية؟", answer: "نتعامل مع آلاف الشحنات شهريًا ببنية تحتية قابلة للتوسع.", icon: <Plane className="text-white" size={20} /> },
          { question: "كيف نُحسن مسارات الشحن؟", answer: "نستخدم لوجستيات مدعومة بالذكاء الاصطناعي لاختيار المسارات الأسرع والأكثر اقتصادًا.", icon: <Settings className="text-white" size={20} /> },
          { question: "ما خيارات التأمين التي نقدمها؟", answer: "نقدم تأمينًا شاملاً لحماية كاملة للشحنات.", icon: <Shield className="text-white" size={20} /> },
          { question: "كيف نُقلل تكاليف اللوجستيات؟", answer: "الشحن بالجملة، وتحسين المسارات، والشراكات تقلل التكاليف الإجمالية.", icon: <BarChart className="text-white" size={20} /> },
          { question: "ما دور التكنولوجيا في اللوجستيات؟", answer: "الأتمتة وتكنولوجيا التتبع تعزز الكفاءة والشفافية.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "كيف ندير مواسم الشحن القصوى؟", answer: "نزيد السعة ونعطي الأولوية للشحنات خلال فترات الطلب العالي.", icon: <Star className="text-white" size={20} /> },
          { question: "هل يمكننا الشحن إلى مناطق نائية؟", answer: "نعم، تصل شبكتنا حتى إلى الوجهات الأكثر تحديًا.", icon: <MapPin className="text-white" size={20} /> },
          { question: "كيف نضمن اللوجستيات المبردة؟", answer: "نستخدم النقل المبرد للسلع الحساسة للحرارة مثل الأدوية.", icon: <Package className="text-white" size={20} /> },
          { question: "ما هي سياسة الإرجاع للشحنات؟", answer: "تُعالج المرتجعات بكفاءة مع إرشادات واضحة للشركاء.", icon: <Truck className="text-white" size={20} /> },
          { question: "كيف نتعامل مع البضائع الهشة؟", answer: "التعبئة الخاصة والتعامل الحذر يضمنان وصول العناصر الهشة سليمة.", icon: <Shield className="text-white" size={20} /> },
          { question: "ما الشهادات التي تمتلكها لوجستياتنا؟", answer: "نلتزم بمعايير ISO والمعايير الدولية للشحن.", icon: <Award className="text-white" size={20} /> },
          { question: "كيف ندعم التوصيلات العاجلة؟", answer: "نقدم خيارات الشحن السريع الجوي لاحتياجات الوقت الحرجة.", icon: <Plane className="text-white" size={20} /> },
          { question: "ما هي استراتيجيتنا للامتثال للتجارة العالمية؟", answer: "نبقى على اطلاع بالقوانين التجارية لضمان الامتثال الكامل.", icon: <Lock className="text-white" size={20} /> },
          { question: "كيف نُكيف اللوجستيات للطوارئ؟", answer: "ننشط خطط الطوارئ للاستجابة السريعة في الأزمات.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "الجودة والمعايير",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "كيف نحافظ على معايير الجودة الألمانية؟", answer: "نتعاون مع مصنعين ألمان معتمدين ونجري فحوصات جودة صارمة على جميع المنتجات.", icon: <Wrench className="text-white" size={20} /> },
          { question: "ما الصناعات التي نزودها بالمنتجات الألمانية؟", answer: "نوزع المنتجات للسيارات، والآلات، والتكنولوجيا، والرعاية الصحية وأكثر، كلها MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "لماذا تُعتبر الهندسة الألمانية موثوقة عالميًا؟", answer: "الهندسة الألمانية مرادفة للدقة والابتكار والموثوقية، مبنية على عقود من الخبرة.", icon: <Award className="text-white" size={20} /> },
          { question: "كيف نُصادق على المنتجات المستوردة؟", answer: "تخضع المنتجات المستوردة لاختبارات صارمة لتلبية اللوائح الألمانية للسلامة والجودة.", icon: <Settings className="text-white" size={20} /> },
          { question: "ما دور الابتكار في عروضنا؟", answer: "نركز على التكنولوجيا الألمانية المتطورة لتقديم حلول مبتكرة للأسواق العالمية.", icon: <Star className="text-white" size={20} /> },
          { question: "ما شهادات الجودة التي نحملها؟", answer: "تتوافق منتجاتنا مع معايير DIN وISO وCE، مما يضمن جودة عالية.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "كيف نختبر متانة المنتجات؟", answer: "نجري اختبارات الإجهاد ومحاكاة طويلة الأمد لضمان المتانة.", icon: <Wrench className="text-white" size={20} /> },
          { question: "ما هو عملية مراقبة الجودة لدينا؟", answer: "يتم مراقبة كل مرحلة إنتاج مع تفتيش نهائي قبل الشحن.", icon: <Wrench className="text-white" size={20} /> },
          { question: "كيف نضمن الاتساق في الجودة؟", answer: "العمليات الموحدة والتدقيق المنتظم يحافظان على جودة متسقة.", icon: <BarChart className="text-white" size={20} /> },
          { question: "ما المواد التي نستخدمها للمنتجات الألمانية؟", answer: "نستخدم مواد عالية الجودة من موردين موثوقين.", icon: <Package className="text-white" size={20} /> },
          { question: "كيف نتعامل مع المنتجات المعيبة؟", answer: "يتم استبدال العناصر المعيبة بسرعة مع شفافية كاملة.", icon: <Truck className="text-white" size={20} /> },
          { question: "ما هي العمر الافتراضي لمنتجاتنا؟", answer: "تم تصميم المنتجات الألمانية للدوام، وغالبًا ما تتجاوز معايير الصناعة.", icon: <Clock className="text-white" size={20} /> },
          { question: "كيف نضمن معايير السلامة؟", answer: "يتم اختبار المنتجات للامتثال للوائح السلامة العالمية.", icon: <Lock className="text-white" size={20} /> },
          { question: "ما دور البحث والتطوير في الجودة؟", answer: "البحث والتطوير يدفعان التحسين المستمر لعروضنا.", icon: <Star className="text-white" size={20} /> },
          { question: "كيف ندرب المصنعين؟", answer: "نقدم إرشادات وتدقيقات لضمان الالتزام بمعاييرنا.", icon: <Users className="text-white" size={20} /> },
          { question: "ما هي سياسة الضمان لدينا؟", answer: "نقدم ضمانات شاملة مُصممة لكل فئة منتج.", icon: <Shield className="text-white" size={20} /> },
          { question: "كيف نتعامل مع شكاوى الجودة؟", answer: "نحقق ونحل المشكلات بسرعة للحفاظ على ثقة العملاء.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "ما الذي يجعل فحوصات الجودة لدينا صارمة؟", answer: "مراحل اختبار متعددة وإشراف خبراء لا يسمحان بالتهاون.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "كيف نبقى في صدارة معايير الجودة؟", answer: "نتبنى أحدث التطورات في الصناعة ونتجاوز التوقعات.", icon: <Award className="text-white" size={20} /> },
          { question: "ما دور الدقة في منتجاتنا؟", answer: "الهندسة الدقيقة تضمن أداءً مثاليًا وموثوقية.", icon: <Wrench className="text-white" size={20} /> },
          { question: "كيف نضمن إنتاجًا صديقًا للبيئة؟", answer: "ندمج الممارسات المستدامة في عمليات التصنيع.", icon: <Leaf className="text-white" size={20} /> },
          { question: "ما مرافق الاختبار التي نستخدمها؟", answer: "مختبرات متطورة في ألمانيا تتحقق من جودة المنتجات.", icon: <Factory className="text-white" size={20} /> },
          { question: "كيف نُصادق على جودة الموردين؟", answer: "يتم تدقيق الموردين بانتظام لتلبية معاييرنا الصارمة.", icon: <Settings className="text-white" size={20} /> },
          { question: "ما هو نهجنا للتحسين المستمر؟", answer: "التعليقات والابتكار يحافظان على تطور معاييرنا.", icon: <Plane className="text-white" size={20} /> },
          { question: "كيف نضمن رضا العملاء؟", answer: "منتجات عالية الجودة ودعم سريع الاستجابة يضمنان الرضا.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  hk: {
    headerTitle: "德國製造商業助理",
    headerSubtitle: "線上服務，隨時助您解決全球貿易需求",
    searchPlaceholder: "輸入您的問題...",
    footerText: "提出您的問題或瀏覽主題",
    sections: [
      {
        title: "關於德國製造出口的一般問題",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "德國製造的產品有什麼獨特之處？", answer: "德國製造的產品以其精準、品質和創新著稱，背後有悠久的工程卓越傳統支持。", icon: <Award className="text-white" size={20} /> },
          { question: "為什麼企業應進口德國製造的產品？", answer: "這些產品提供可靠性、耐用性和先進技術，在全球市場上需求旺盛。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何確保全球準時交付？", answer: "我們利用強大的全球物流網絡，包括火車、船隻和貨運飛機，高效交付德國產品。", icon: <Truck className="text-white" size={20} /> },
          { question: "德國製造出口的關鍵市場有哪些？", answer: "亞洲、非洲、阿拉伯世界以及美國和歐盟等富裕國家是德國產品的主要市場。", icon: <MapPin className="text-white" size={20} /> },
          { question: "我們出口什麼類型的產品？", answer: "我們出口汽車零件、機械、電子產品、藥品等，皆符合德國品質標準。", icon: <Package className="text-white" size={20} /> },
          { question: "我們如何支持小型企業出口？", answer: "我們提供定制物流和具競爭力的價格，幫助小型企業以德國產品進入全球市場。", icon: <Users className="text-white" size={20} /> },
          { question: "德國製造的歷史是什麼？", answer: "此標籤於19世紀末作為品質標誌出現，演變成全球卓越的象徵。", icon: <Clock className="text-white" size={20} /> },
          { question: "德國出口如何影響全球經濟？", answer: "德國出口通過為全球產業提供高品質商品推動經濟增長。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "德國最受歡迎的出口類別是什麼？", answer: "汽車、機械和化學產品領先，其次是電子產品和藥品。", icon: <BarChart className="text-white" size={20} /> },
          { question: "我們如何適應不同市場的需求？", answer: "我們定制產品和物流，以滿足每個地區的具體需求。", icon: <Settings className="text-white" size={20} /> },
          { question: "為什麼德國在製造業領先？", answer: "德國憑藉其高素質勞動力、先進基礎設施和創新焦點脫穎而出。", icon: <Factory className="text-white" size={20} /> },
          { question: "技術在我們的出口中扮演什麼角色？", answer: "尖端技術確保我們的產品保持競爭力並滿足現代需求。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何處理出口法規？", answer: "我們遵守國際貿易法並協助客戶滿足監管要求。", icon: <Shield className="text-white" size={20} /> },
          { question: "德國每年出口量是多少？", answer: "德國每年出口商品價值超過1.5萬億歐元，佔全球重要份額。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們如何確保產品真偽？", answer: "我們直接從德國認證製造商採購，確保產品真實性。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "出口德國產品有什麼好處？", answer: "出口商可進入高端市場並提升品牌聲譽。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何在全球推廣德國出口？", answer: "通過貿易展覽、合作夥伴關係和數碼營銷，我們在全球展示德國品質。", icon: <Share2 className="text-white" size={20} /> },
          { question: "我們在出口中面臨什麼挑戰？", answer: "關稅、貿易壁壘和物流成本通過策略規劃得以管理。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們如何促進出口增長？", answer: "我們投資於物流基礎設施和市場研究以擴大影響範圍。", icon: <Plane className="text-white" size={20} /> },
          { question: "德國製造出口的未來是什麼？", answer: "可持續性和數碼化將推動德國出口的未來增長。", icon: <Leaf className="text-white" size={20} /> },
          { question: "我們如何處理客戶關於出口的查詢？", answer: "我們的多語言團隊提供快速且詳細的回應。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "德國出口與競爭對手有何不同？", answer: "卓越品質、精準工程和可靠聲譽使我們脫穎而出。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何確保出口的可擴展性？", answer: "我們通過靈活物流和合作夥伴關係擴展運營以滿足需求。", icon: <BarChart className="text-white" size={20} /> },
          { question: "貿易協定在我們的出口中扮演什麼角色？", answer: "貿易協定減少障礙並為德國產品開闢新市場。", icon: <Handshake className="text-white" size={20} /> },
          { question: "我們如何處理出口中的貨幣波動？", answer: "我們使用對沖策略和靈活定價來減輕貨幣風險。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "分銷與合作機會",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "企業如何與我們合作進行分銷？", answer: "我們與全球分銷商合作，將德國製造產品引入其市場，提供定制物流和支持。", icon: <Briefcase className="text-white" size={20} /> },
          { question: "分銷商從我們獲得什麼好處？", answer: "分銷商享有優質德國產品、具競爭力的價格和我們廣泛的物流網絡。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們可以進口產品到德國進行分銷嗎？", answer: "可以，我們協助全球企業將產品進口到德國，確保符合我們的品質標準。", icon: <Package className="text-white" size={20} /> },
          { question: "我們為新合作夥伴提供什麼支持？", answer: "新合作夥伴獲得培訓、營銷支持和物流協調，以確保分銷成功。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何確保分銷商的公平價格？", answer: "我們直接與製造商談判，獲取具競爭力的價格，並將節省轉嫁給分銷商。", icon: <BarChart className="text-white" size={20} /> },
          { question: "我們提供什麼類型的合作關係？", answer: "我們提供獨家、非獨家和區域性分銷協議，根據合作夥伴需求定制。", icon: <Handshake className="text-white" size={20} /> },
          { question: "我們如何選擇分銷合作夥伴？", answer: "我們根據市場覆蓋、可靠性及與我們品質標準的契合度選擇合作夥伴。", icon: <Users className="text-white" size={20} /> },
          { question: "成為分銷商的流程是什麼？", answer: "有興趣的企業提交申請，隨後進行審查和協議簽署。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們如何培訓分銷合作夥伴？", answer: "我們提供產品知識課程、物流培訓和持續支持。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們提供什麼營銷支持？", answer: "我們提供促銷材料、數碼營銷活動和聯合品牌機會。", icon: <Share2 className="text-white" size={20} /> },
          { question: "分銷商可以在線銷售嗎？", answer: "可以，我們支持電子商務分銷，提供物流和數碼工具。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "我們如何處理分銷商之間的爭議？", answer: "我們以清晰的溝通和合同指引公平調解。", icon: <Shield className="text-white" size={20} /> },
          { question: "合作夥伴有哪些財務優勢？", answer: "合作夥伴因德國產品的高端價值獲得高利潤率。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們如何確保合作夥伴的獨家權益？", answer: "獨家合作夥伴獲得受保護的區域和優先供應。", icon: <Lock className="text-white" size={20} /> },
          { question: "合作夥伴獲得什麼物流支持？", answer: "我們提供全面的運輸管理、追蹤和海關協助。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何評估合作夥伴的表現？", answer: "我們追蹤銷售、客戶反饋和市場滲透指標。", icon: <BarChart className="text-white" size={20} /> },
          { question: "合作夥伴可以分銷多種產品線嗎？", answer: "可以，合作夥伴可根據能力處理多類德國產品。", icon: <Package className="text-white" size={20} /> },
          { question: "分銷商的最小訂單量是多少？", answer: "最低訂單量因產品而異，但設計為適合所有合作夥伴。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何整合新分銷商？", answer: "我們通過合同、培訓和初始運輸無縫引導新分銷商。", icon: <Star className="text-white" size={20} /> },
          { question: "合作夥伴在品牌推廣中扮演什麼角色？", answer: "合作夥伴共同推廣德國製造品牌，同時提升自身聲譽。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何支持合作夥伴的增長？", answer: "我們提供擴展選項和市場擴張策略。", icon: <Plane className="text-white" size={20} /> },
          { question: "合作夥伴可以建議新產品嗎？", answer: "可以，我們歡迎反饋以根據市場需求擴展產品範圍。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "合作協議的期限是多久？", answer: "協議通常為1至3年，根據表現可續約。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何保護合作夥伴的投資？", answer: "我們確保穩定的供應鏈和公平條款以保護投資。", icon: <Shield className="text-white" size={20} /> },
          { question: "表現最佳的分銷商有哪些獎勵？", answer: "表現最佳者獲得優先價格、獎金和獨家機會。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "物流與全球貿易",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "我們如何處理國際運輸挑戰？", answer: "我們的先進物流解決方案應對海關、關稅和運輸障礙，確保順暢交付。", icon: <Shield className="text-white" size={20} /> },
          { question: "可持續性在我們的物流中扮演什麼角色？", answer: "我們優先採用環保運輸方式和包裝，以減少碳足跡。", icon: <Leaf className="text-white" size={20} /> },
          { question: "時區如何影響我們的運營？", answer: "我們以靈活時間表和數碼工具有效協調全球時區。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們支持哪些語言進行全球貿易？", answer: "我們提供多語言支持，包括英語、德語、阿拉伯語、中文等，確保順暢溝通。", icon: <Languages className="text-white" size={20} /> },
          { question: "我們如何確保運輸安全？", answer: "我們使用加密追蹤系統和可靠運輸商，保護全球運輸安全。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們使用哪些運輸方式？", answer: "我們根據效率和成本採用空運、海運、鐵路和公路運輸。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何計算運輸成本？", answer: "成本基於距離、重量和運輸方式，定價透明。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們的平均交付時間是多少？", answer: "交付時間因地區而異，通常為3至14天，視目的地而定。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何追蹤運輸？", answer: "客戶通過我們的加密追蹤平台實時獲取更新。", icon: <MapPin className="text-white" size={20} /> },
          { question: "如果運輸延誤會怎樣？", answer: "我們調查、提供更新並迅速加速解決方案。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何處理海關清關？", answer: "我們的團隊管理文件和合規性，確保海關清關無縫進行。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們的物流能力如何？", answer: "我們每月處理數千次運輸，具備可擴展基礎設施。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們如何優化運輸路線？", answer: "我們使用人工智能驅動的物流選擇最快、最經濟的路線。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們提供什麼保險選擇？", answer: "我們提供全面保險，確保運輸全程受保護。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們如何降低物流成本？", answer: "批量運輸、路線優化和合作夥伴關係降低總成本。", icon: <BarChart className="text-white" size={20} /> },
          { question: "技術在物流中扮演什麼角色？", answer: "自動化和追蹤技術提升效率和透明度。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "我們如何管理運輸高峰期？", answer: "我們在高需求期間增加容量並優先處理運輸。", icon: <Star className="text-white" size={20} /> },
          { question: "我們可以運送到偏遠地區嗎？", answer: "可以，我們的網絡覆蓋最具挑戰性的目的地。", icon: <MapPin className="text-white" size={20} /> },
          { question: "我們如何確保冷鏈物流？", answer: "我們使用冷藏運輸處理溫度敏感貨物，如藥品。", icon: <Package className="text-white" size={20} /> },
          { question: "我們的運輸退貨政策是什麼？", answer: "退貨高效處理，並為合作夥伴提供清晰指引。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何處理易碎貨物？", answer: "特殊包裝和小心處理確保易碎品完好到達。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們的物流有哪些認證？", answer: "我們符合ISO和國際運輸標準。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何支持緊急交付？", answer: "我們提供空運快遞選項，滿足時間緊迫的需求。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們的全球貿易合規策略是什麼？", answer: "我們保持與貿易法規同步，確保完全合規。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們如何調整物流應對緊急情況？", answer: "我們啟動應急計劃，快速應對危機。", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "品質與標準",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "我們如何維持德國品質標準？", answer: "我們與德國認證製造商合作，對所有產品進行嚴格品質檢查。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們為哪些行業提供德國產品？", answer: "我們為汽車、機械、科技、醫療等行業分銷德國製造產品。", icon: <Factory className="text-white" size={20} /> },
          { question: "為什麼德國工程全球可信？", answer: "德國工程以精準、創新和可靠性著稱，建立在數十年經驗之上。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何認證進口產品？", answer: "進口產品經過嚴格測試，確保符合德國安全和品質法規。", icon: <Settings className="text-white" size={20} /> },
          { question: "創新在我們的產品中有什麼作用？", answer: "我們專注於德國尖端技術，為全球市場提供創新解決方案。", icon: <Star className="text-white" size={20} /> },
          { question: "我們有哪些品質認證？", answer: "我們的產品符合DIN、ISO和CE標準，保證頂級品質。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何測試產品耐用性？", answer: "我們進行壓力測試和長期模擬，確保產品耐用。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們的品質控制流程是什麼？", answer: "生產每階段皆受監控，發貨前進行最終檢查。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何確保品質一致性？", answer: "標準化流程和定期審計保持品質穩定。", icon: <BarChart className="text-white" size={20} /> },
          { question: "德國產品使用什麼材料？", answer: "我們使用來自可靠供應商的高品質材料。", icon: <Package className="text-white" size={20} /> },
          { question: "我們如何處理有缺陷產品？", answer: "缺陷產品快速更換，過程完全透明。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們的產品壽命有多長？", answer: "德國產品設計耐用，常超出行業標準。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何保證安全標準？", answer: "產品經測試，確保符合全球安全法規。", icon: <Lock className="text-white" size={20} /> },
          { question: "研發在品質中扮演什麼角色？", answer: "研發推動我們的產品持續改進。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何培訓製造商？", answer: "我們提供指引和審計，確保符合我們的標準。", icon: <Users className="text-white" size={20} /> },
          { question: "我們的保修政策是什麼？", answer: "我們提供針對各產品類別的全面保修。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們如何處理品質投訴？", answer: "我們迅速調查並解決問題，保持客戶信任。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "我們的品質檢查為何嚴格？", answer: "多階段測試和專家監督不容妥協。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何保持品質標準領先？", answer: "我們採用行業最新進展並超越期望。", icon: <Award className="text-white" size={20} /> },
          { question: "精準在我們的產品中扮演什麼角色？", answer: "精準工程確保卓越性能和可靠性。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何確保環保生產？", answer: "我們將可持續實踐融入製造流程。", icon: <Leaf className="text-white" size={20} /> },
          { question: "我們使用什麼測試設施？", answer: "德國尖端實驗室驗證產品品質。", icon: <Factory className="text-white" size={20} /> },
          { question: "我們如何認證供應商品質？", answer: "供應商定期接受審計，確保符合我們嚴格標準。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們對持續改進的態度是什麼？", answer: "反饋和創新讓我們的標準不斷進步。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們如何確保客戶滿意？", answer: "高品質產品和快速響應支持確保滿意度。", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  sg: {
    headerTitle: "德國製造商業助理",
    headerSubtitle: "線上服務，隨時助您解決全球貿易需求",
    searchPlaceholder: "輸入您的問題...",
    footerText: "提出您的問題或瀏覽主題",
    sections: [
      {
        title: "關於德國製造出口的一般問題",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "德國製造的產品有什麼獨特之處？", answer: "德國製造的產品以其精準、品質和創新著稱，背後有悠久的工程卓越傳統支持。", icon: <Award className="text-white" size={20} /> },
          { question: "為什麼企業應進口德國製造的產品？", answer: "這些產品提供可靠性、耐用性和先進技術，在全球市場上需求旺盛。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何確保全球準時交付？", answer: "我們利用強大的全球物流網絡，包括火車、船隻和貨運飛機，高效交付德國產品。", icon: <Truck className="text-white" size={20} /> },
          { question: "德國製造出口的關鍵市場有哪些？", answer: "亞洲、非洲、阿拉伯世界以及美國和歐盟等富裕國家是德國產品的主要市場。", icon: <MapPin className="text-white" size={20} /> },
          { question: "我們出口什麼類型的產品？", answer: "我們出口汽車零件、機械、電子產品、藥品等，皆符合德國品質標準。", icon: <Package className="text-white" size={20} /> },
          { question: "我們如何支持小型企業出口？", answer: "我們提供定制物流和具競爭力的價格，幫助小型企業以德國產品進入全球市場。", icon: <Users className="text-white" size={20} /> },
          { question: "德國製造的歷史是什麼？", answer: "此標籤於19世紀末作為品質標誌出現，演變成全球卓越的象徵。", icon: <Clock className="text-white" size={20} /> },
          { question: "德國出口如何影響全球經濟？", answer: "德國出口通過為全球產業提供高品質商品推動經濟增長。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "德國最受歡迎的出口類別是什麼？", answer: "汽車、機械和化學產品領先，其次是電子產品和藥品。", icon: <BarChart className="text-white" size={20} /> },
          { question: "我們如何適應不同市場的需求？", answer: "我們定制產品和物流，以滿足每個地區的具體需求。", icon: <Settings className="text-white" size={20} /> },
          { question: "為什麼德國在製造業領先？", answer: "德國憑藉其高素質勞動力、先進基礎設施和創新焦點脫穎而出。", icon: <Factory className="text-white" size={20} /> },
          { question: "技術在我們的出口中扮演什麼角色？", answer: "尖端技術確保我們的產品保持競爭力並滿足現代需求。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何處理出口法規？", answer: "我們遵守國際貿易法並協助客戶滿足監管要求。", icon: <Shield className="text-white" size={20} /> },
          { question: "德國每年出口量是多少？", answer: "德國每年出口商品價值超過1.5萬億歐元，佔全球重要份額。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們如何確保產品真偽？", answer: "我們直接從德國認證製造商採購，確保產品真實性。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "出口德國產品有什麼好處？", answer: "出口商可進入高端市場並提升品牌聲譽。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何在全球推廣德國出口？", answer: "通過貿易展覽、合作夥伴關係和數碼營銷，我們在全球展示德國品質。", icon: <Share2 className="text-white" size={20} /> },
          { question: "我們在出口中面臨什麼挑戰？", answer: "關稅、貿易壁壘和物流成本通過策略規劃得以管理。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們如何促進出口增長？", answer: "我們投資於物流基礎設施和市場研究以擴大影響範圍。", icon: <Plane className="text-white" size={20} /> },
          { question: "德國製造出口的未來是什麼？", answer: "可持續性和數碼化將推動德國出口的未來增長。", icon: <Leaf className="text-white" size={20} /> },
          { question: "我們如何處理客戶關於出口的查詢？", answer: "我們的多語言團隊提供快速且詳細的回應。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "德國出口與競爭對手有何不同？", answer: "卓越品質、精準工程和可靠聲譽使我們脫穎而出。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何確保出口的可擴展性？", answer: "我們通過靈活物流和合作夥伴關係擴展運營以滿足需求。", icon: <BarChart className="text-white" size={20} /> },
          { question: "貿易協定在我們的出口中扮演什麼角色？", answer: "貿易協定減少障礙並為德國產品開闢新市場。", icon: <Handshake className="text-white" size={20} /> },
          { question: "我們如何處理出口中的貨幣波動？", answer: "我們使用對沖策略和靈活定價來減輕貨幣風險。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "分銷與合作機會",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "企業如何與我們合作進行分銷？", answer: "我們與全球分銷商合作，將德國製造產品引入其市場，提供定制物流和支持。", icon: <Briefcase className="text-white" size={20} /> },
          { question: "分銷商從我們獲得什麼好處？", answer: "分銷商享有優質德國產品、具競爭力的價格和我們廣泛的物流網絡。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們可以進口產品到德國進行分銷嗎？", answer: "可以，我們協助全球企業將產品進口到德國，確保符合我們的品質標準。", icon: <Package className="text-white" size={20} /> },
          { question: "我們為新合作夥伴提供什麼支持？", answer: "新合作夥伴獲得培訓、營銷支持和物流協調，以確保分銷成功。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何確保分銷商的公平價格？", answer: "我們直接與製造商談判，獲取具競爭力的價格，並將節省轉嫁給分銷商。", icon: <BarChart className="text-white" size={20} /> },
          { question: "我們提供什麼類型的合作關係？", answer: "我們提供獨家、非獨家和區域性分銷協議，根據合作夥伴需求定制。", icon: <Handshake className="text-white" size={20} /> },
          { question: "我們如何選擇分銷合作夥伴？", answer: "我們根據市場覆蓋、可靠性及與我們品質標準的契合度選擇合作夥伴。", icon: <Users className="text-white" size={20} /> },
          { question: "成為分銷商的流程是什麼？", answer: "有興趣的企業提交申請，隨後進行審查和協議簽署。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們如何培訓分銷合作夥伴？", answer: "我們提供產品知識課程、物流培訓和持續支持。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們提供什麼營銷支持？", answer: "我們提供促銷材料、數碼營銷活動和聯合品牌機會。", icon: <Share2 className="text-white" size={20} /> },
          { question: "分銷商可以在線銷售嗎？", answer: "可以，我們支持電子商務分銷，提供物流和數碼工具。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "我們如何處理分銷商之間的爭議？", answer: "我們以清晰的溝通和合同指引公平調解。", icon: <Shield className="text-white" size={20} /> },
          { question: "合作夥伴有哪些財務優勢？", answer: "合作夥伴因德國產品的高端價值獲得高利潤率。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們如何確保合作夥伴的獨家權益？", answer: "獨家合作夥伴獲得受保護的區域和優先供應。", icon: <Lock className="text-white" size={20} /> },
          { question: "合作夥伴獲得什麼物流支持？", answer: "我們提供全面的運輸管理、追蹤和海關協助。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何評估合作夥伴的表現？", answer: "我們追蹤銷售、客戶反饋和市場滲透指標。", icon: <BarChart className="text-white" size={20} /> },
          { question: "合作夥伴可以分銷多種產品線嗎？", answer: "可以，合作夥伴可根據能力處理多類德國產品。", icon: <Package className="text-white" size={20} /> },
          { question: "分銷商的最小訂單量是多少？", answer: "最低訂單量因產品而異，但設計為適合所有合作夥伴。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何整合新分銷商？", answer: "我們通過合同、培訓和初始運輸無縫引導新分銷商。", icon: <Star className="text-white" size={20} /> },
          { question: "合作夥伴在品牌推廣中扮演什麼角色？", answer: "合作夥伴共同推廣德國製造品牌，同時提升自身聲譽。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何支持合作夥伴的增長？", answer: "我們提供擴展選項和市場擴張策略。", icon: <Plane className="text-white" size={20} /> },
          { question: "合作夥伴可以建議新產品嗎？", answer: "可以，我們歡迎反饋以根據市場需求擴展產品範圍。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "合作協議的期限是多久？", answer: "協議通常為1至3年，根據表現可續約。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何保護合作夥伴的投資？", answer: "我們確保穩定的供應鏈和公平條款以保護投資。", icon: <Shield className="text-white" size={20} /> },
          { question: "表現最佳的分銷商有哪些獎勵？", answer: "表現最佳者獲得優先價格、獎金和獨家機會。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "物流與全球貿易",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "我們如何處理國際運輸挑戰？", answer: "我們的先進物流解決方案應對海關、關稅和運輸障礙，確保順暢交付。", icon: <Shield className="text-white" size={20} /> },
          { question: "可持續性在我們的物流中扮演什麼角色？", answer: "我們優先採用環保運輸方式和包裝，以減少碳足跡。", icon: <Leaf className="text-white" size={20} /> },
          { question: "時區如何影響我們的運營？", answer: "我們以靈活時間表和數碼工具有效協調全球時區。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們支持哪些語言進行全球貿易？", answer: "我們提供多語言支持，包括英語、德語、阿拉伯語、中文等，確保順暢溝通。", icon: <Languages className="text-white" size={20} /> },
          { question: "我們如何確保運輸安全？", answer: "我們使用加密追蹤系統和可靠運輸商，保護全球運輸安全。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們使用哪些運輸方式？", answer: "我們根據效率和成本採用空運、海運、鐵路和公路運輸。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何計算運輸成本？", answer: "成本基於距離、重量和運輸方式，定價透明。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "我們的平均交付時間是多少？", answer: "交付時間因地區而異，通常為3至14天，視目的地而定。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何追蹤運輸？", answer: "客戶通過我們的加密追蹤平台實時獲取更新。", icon: <MapPin className="text-white" size={20} /> },
          { question: "如果運輸延誤會怎樣？", answer: "我們調查、提供更新並迅速加速解決方案。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何處理海關清關？", answer: "我們的團隊管理文件和合規性，確保海關清關無縫進行。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們的物流能力如何？", answer: "我們每月處理數千次運輸，具備可擴展基礎設施。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們如何優化運輸路線？", answer: "我們使用人工智能驅動的物流選擇最快、最經濟的路線。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們提供什麼保險選擇？", answer: "我們提供全面保險，確保運輸全程受保護。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們如何降低物流成本？", answer: "批量運輸、路線優化和合作夥伴關係降低總成本。", icon: <BarChart className="text-white" size={20} /> },
          { question: "技術在物流中扮演什麼角色？", answer: "自動化和追蹤技術提升效率和透明度。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "我們如何管理運輸高峰期？", answer: "我們在高需求期間增加容量並優先處理運輸。", icon: <Star className="text-white" size={20} /> },
          { question: "我們可以運送到偏遠地區嗎？", answer: "可以，我們的網絡覆蓋最具挑戰性的目的地。", icon: <MapPin className="text-white" size={20} /> },
          { question: "我們如何確保冷鏈物流？", answer: "我們使用冷藏運輸處理溫度敏感貨物，如藥品。", icon: <Package className="text-white" size={20} /> },
          { question: "我們的運輸退貨政策是什麼？", answer: "退貨高效處理，並為合作夥伴提供清晰指引。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們如何處理易碎貨物？", answer: "特殊包裝和小心處理確保易碎品完好到達。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們的物流有哪些認證？", answer: "我們符合ISO和國際運輸標準。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何支持緊急交付？", answer: "我們提供空運快遞選項，滿足時間緊迫的需求。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們的全球貿易合規策略是什麼？", answer: "我們保持與貿易法規同步，確保完全合規。", icon: <Lock className="text-white" size={20} /> },
          { question: "我們如何調整物流應對緊急情況？", answer: "我們啟動應急計劃，快速應對危機。", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "品質與標準",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "我們如何維持德國品質標準？", answer: "我們與德國認證製造商合作，對所有產品進行嚴格品質檢查。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們為哪些行業提供德國產品？", answer: "我們為汽車、機械、科技、醫療等行業分銷德國製造產品。", icon: <Factory className="text-white" size={20} /> },
          { question: "為什麼德國工程全球可信？", answer: "德國工程以精準、創新和可靠性著稱，建立在數十年經驗之上。", icon: <Award className="text-white" size={20} /> },
          { question: "我們如何認證進口產品？", answer: "進口產品經過嚴格測試，確保符合德國安全和品質法規。", icon: <Settings className="text-white" size={20} /> },
          { question: "創新在我們的產品中有什麼作用？", answer: "我們專注於德國尖端技術，為全球市場提供創新解決方案。", icon: <Star className="text-white" size={20} /> },
          { question: "我們有哪些品質認證？", answer: "我們的產品符合DIN、ISO和CE標準，保證頂級品質。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何測試產品耐用性？", answer: "我們進行壓力測試和長期模擬，確保產品耐用。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們的品質控制流程是什麼？", answer: "生產每階段皆受監控，發貨前進行最終檢查。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何確保品質一致性？", answer: "標準化流程和定期審計保持品質穩定。", icon: <BarChart className="text-white" size={20} /> },
          { question: "德國產品使用什麼材料？", answer: "我們使用來自可靠供應商的高品質材料。", icon: <Package className="text-white" size={20} /> },
          { question: "我們如何處理有缺陷產品？", answer: "缺陷產品快速更換，過程完全透明。", icon: <Truck className="text-white" size={20} /> },
          { question: "我們的產品壽命有多長？", answer: "德國產品設計耐用，常超出行業標準。", icon: <Clock className="text-white" size={20} /> },
          { question: "我們如何保證安全標準？", answer: "產品經測試，確保符合全球安全法規。", icon: <Lock className="text-white" size={20} /> },
          { question: "研發在品質中扮演什麼角色？", answer: "研發推動我們的產品持續改進。", icon: <Star className="text-white" size={20} /> },
          { question: "我們如何培訓製造商？", answer: "我們提供指引和審計，確保符合我們的標準。", icon: <Users className="text-white" size={20} /> },
          { question: "我們的保修政策是什麼？", answer: "我們提供針對各產品類別的全面保修。", icon: <Shield className="text-white" size={20} /> },
          { question: "我們如何處理品質投訴？", answer: "我們迅速調查並解決問題，保持客戶信任。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "我們的品質檢查為何嚴格？", answer: "多階段測試和專家監督不容妥協。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "我們如何保持品質標準領先？", answer: "我們採用行業最新進展並超越期望。", icon: <Award className="text-white" size={20} /> },
          { question: "精準在我們的產品中扮演什麼角色？", answer: "精準工程確保卓越性能和可靠性。", icon: <Wrench className="text-white" size={20} /> },
          { question: "我們如何確保環保生產？", answer: "我們將可持續實踐融入製造流程。", icon: <Leaf className="text-white" size={20} /> },
          { question: "我們使用什麼測試設施？", answer: "德國尖端實驗室驗證產品品質。", icon: <Factory className="text-white" size={20} /> },
          { question: "我們如何認證供應商品質？", answer: "供應商定期接受審計，確保符合我們嚴格標準。", icon: <Settings className="text-white" size={20} /> },
          { question: "我們對持續改進的態度是什麼？", answer: "反饋和創新讓我們的標準不斷進步。", icon: <Plane className="text-white" size={20} /> },
          { question: "我們如何確保客戶滿意？", answer: "高品質產品和快速響應支持確保滿意度。", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  za: {
    headerTitle: "MADE IN GERMANY ©  Business Assistant",
    headerSubtitle: "Online and ready to assist with your global trade needs",
    searchPlaceholder: "Ask your question...",
    footerText: "Ask your question or browse the topics",
    sections: [
      {
        title: "General Questions about MADE IN GERMANY ©  Exports",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "What makes MADE IN GERMANY ©  products unique?", answer: "MADE IN GERMANY ©  products are renowned for their precision, quality, and innovation, backed by a long tradition of engineering excellence.", icon: <Award className="text-white" size={20} /> },
          { question: "Why should companies import MADE IN GERMANY ©  products?", answer: "These products offer reliability, durability, and advanced technology, making them highly sought after in global markets.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we ensure timely delivery worldwide?", answer: "We use a robust global logistics network including trains, ships, and cargo planes to deliver German products efficiently.", icon: <Truck className="text-white" size={20} /> },
          { question: "Which markets are key for MADE IN GERMANY ©  exports?", answer: "Asia, Africa, the Arab world, and wealthy nations like the USA and EU are prime markets for German goods.", icon: <MapPin className="text-white" size={20} /> },
          { question: "What types of products do we export?", answer: "We export automotive parts, machinery, electronics, pharmaceuticals, and more, all adhering to German quality standards.", icon: <Package className="text-white" size={20} /> },
          { question: "How do we support small businesses with exports?", answer: "We offer tailored logistics and competitive pricing to help small businesses access global markets with German products.", icon: <Users className="text-white" size={20} /> },
          { question: "What is the history behind MADE IN GERMANY © ?", answer: "The label originated in the late 19th century as a mark of quality, evolving into a global symbol of excellence.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do German exports impact the global economy?", answer: "German exports drive economic growth by supplying high-quality goods to industries worldwide.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "What are the most popular German export categories?", answer: "Automotive, machinery, and chemical products lead, followed by electronics and pharmaceuticals.", icon: <BarChart className="text-white" size={20} /> },
          { question: "How do we adapt to different market demands?", answer: "We customize products and logistics to meet the specific needs of each region.", icon: <Settings className="text-white" size={20} /> },
          { question: "Why is Germany a leader in manufacturing?", answer: "Germany excels due to its skilled workforce, advanced infrastructure, and focus on innovation.", icon: <Factory className="text-white" size={20} /> },
          { question: "What role does technology play in our exports?", answer: "Cutting-edge technology ensures our products remain competitive and meet modern demands.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we handle export regulations?", answer: "We comply with international trade laws and assist clients with regulatory requirements.", icon: <Shield className="text-white" size={20} /> },
          { question: "What is the volume of German exports annually?", answer: "Germany exports over €1.5 trillion worth of goods yearly, a significant global share.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "How do we ensure product authenticity?", answer: "We source directly from certified German manufacturers to guarantee authenticity.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "What are the benefits of exporting German goods?", answer: "Exporters gain access to premium markets and enhance their brand reputation.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we promote German exports globally?", answer: "Through trade fairs, partnerships, and digital marketing, we showcase German quality worldwide.", icon: <Share2 className="text-white" size={20} /> },
          { question: "What challenges do we face in exporting?", answer: "Tariffs, trade barriers, and logistics costs are managed with strategic planning.", icon: <Lock className="text-white" size={20} /> },
          { question: "How do we support export growth?", answer: "We invest in logistics infrastructure and market research to expand our reach.", icon: <Plane className="text-white" size={20} /> },
          { question: "What is the future of MADE IN GERMANY ©  exports?", answer: "Sustainability and digitalization will drive future growth in German exports.", icon: <Leaf className="text-white" size={20} /> },
          { question: "How do we handle customer inquiries about exports?", answer: "Our multilingual team provides prompt, detailed responses to all inquiries.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What sets German exports apart from competitors?", answer: "Superior quality, precision engineering, and a trusted brand reputation distinguish us.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we ensure export scalability?", answer: "We scale operations with flexible logistics and partnerships to meet demand.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What role do trade agreements play in our exports?", answer: "Trade agreements reduce barriers and open new markets for German goods.", icon: <Handshake className="text-white" size={20} /> },
          { question: "How do we address currency fluctuations in exports?", answer: "We use hedging strategies and flexible pricing to mitigate currency risks.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Distribution and Partnership Opportunities",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "How can companies partner with us for distribution?", answer: "We collaborate with global distributors to bring MADE IN GERMANY ©  products to their markets, offering tailored logistics and support.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "What benefits do distributors gain from us?", answer: "Distributors enjoy access to premium German products, competitive pricing, and our extensive logistics network.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "Can we import products to Germany for distribution?", answer: "Yes, we facilitate imports from global companies to Germany, ensuring they meet our quality standards for distribution.", icon: <Package className="text-white" size={20} /> },
          { question: "What support do we provide to new partners?", answer: "New partners receive training, marketing support, and logistics coordination to ensure successful distribution.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we ensure fair pricing for distributors?", answer: "We negotiate directly with manufacturers to secure competitive prices, passing savings onto our distributors.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What types of partnerships do we offer?", answer: "We provide exclusive, non-exclusive, and regional distribution agreements based on partner needs.", icon: <Handshake className="text-white" size={20} /> },
          { question: "How do we select our distribution partners?", answer: "We choose partners based on market reach, reliability, and alignment with our quality standards.", icon: <Users className="text-white" size={20} /> },
          { question: "What is the process to become a distributor?", answer: "Interested companies submit an application, followed by a review and agreement process.", icon: <Settings className="text-white" size={20} /> },
          { question: "How do we train our distribution partners?", answer: "We offer product knowledge sessions, logistics training, and ongoing support.", icon: <Plane className="text-white" size={20} /> },
          { question: "What marketing support do we provide?", answer: "We supply promotional materials, digital campaigns, and co-branding opportunities.", icon: <Share2 className="text-white" size={20} /> },
          { question: "Can distributors sell online?", answer: "Yes, we support e-commerce distribution with logistics and digital Planes.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "How do we handle distributor disputes?", answer: "We mediate fairly with clear communication and contractual guidelines.", icon: <Shield className="text-white" size={20} /> },
          { question: "What are the financial benefits for partners?", answer: "Partners gain high margins due to the premium value of German products.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "How do we ensure partner exclusivity?", answer: "Exclusive partners receive protected territories and priority supply.", icon: <Lock className="text-white" size={20} /> },
          { question: "What logistics support do partners receive?", answer: "We provide end-to-end shipping, tracking, and customs assistance.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we evaluate partner performance?", answer: "We track sales, customer feedback, and market penetration metrics.", icon: <BarChart className="text-white" size={20} /> },
          { question: "Can partners distribute multiple product lines?", answer: "Yes, partners can handle diverse German product categories based on capacity.", icon: <Package className="text-white" size={20} /> },
          { question: "What is the minimum order for distributors?", answer: "Minimums vary by product but are designed to be accessible for all partners.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we onboard new distributors?", answer: "We guide them through contracts, training, and initial shipments seamlessly.", icon: <Star className="text-white" size={20} /> },
          { question: "What role do partners play in branding?", answer: "Partners co-promote the MADE IN GERMANY ©  brand while building their own reputation.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we support partner growth?", answer: "We offer scalability options and market expansion strategies.", icon: <Plane className="text-white" size={20} /> },
          { question: "Can partners suggest new products?", answer: "Yes, we welcome feedback to expand our offerings based on market needs.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What is the duration of partnership agreements?", answer: "Agreements typically last 1-3 years, renewable based on performance.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we protect partner investments?", answer: "We ensure stable supply chains and fair terms to safeguard investments.", icon: <Shield className="text-white" size={20} /> },
          { question: "What incentives do top distributors receive?", answer: "Top performers get priority pricing, bonuses, and exclusive opportunities.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "Logistics and Global Trade",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "How do we handle international shipping challenges?", answer: "Our advanced logistics solutions address customs, tariffs, and transportation hurdles to ensure smooth delivery.", icon: <Shield className="text-white" size={20} /> },
          { question: "What role does sustainability play in our logistics?", answer: "We prioritize eco-friendly shipping methods and packaging to reduce our carbon footprint.", icon: <Leaf className="text-white" size={20} /> },
          { question: "How do time zones affect our operations?", answer: "We operate with flexible schedules and digital Planes to coordinate across global time zones effectively.", icon: <Clock className="text-white" size={20} /> },
          { question: "What languages do we support for global trade?", answer: "We provide multilingual support including English, German, Arabic, Chinese, and more to facilitate smooth communication.", icon: <Languages className="text-white" size={20} /> },
          { question: "How do we ensure secure shipments?", answer: "We use encrypted tracking systems and trusted carriers to protect shipments worldwide.", icon: <Lock className="text-white" size={20} /> },
          { question: "What shipping methods do we use?", answer: "We utilize air, sea, rail, and road transport based on efficiency and cost.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we calculate shipping costs?", answer: "Costs are based on distance, weight, and transport mode, with transparent pricing.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "What is our average delivery time?", answer: "Delivery times vary by region, typically 3-14 days depending on the destination.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we track shipments?", answer: "Clients receive real-time updates via our encrypted tracking platform.", icon: <MapPin className="text-white" size={20} /> },
          { question: "What happens if a shipment is delayed?", answer: "We investigate, communicate updates, and expedite solutions promptly.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we handle customs clearance?", answer: "Our team manages documentation and compliance for seamless customs processing.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "What is our logistics capacity?", answer: "We handle thousands of shipments monthly with scalable infrastructure.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we optimize shipping routes?", answer: "We use AI-driven logistics to select the fastest and most cost-effective routes.", icon: <Settings className="text-white" size={20} /> },
          { question: "What insurance options do we offer?", answer: "We provide comprehensive shipment insurance for full protection.", icon: <Shield className="text-white" size={20} /> },
          { question: "How do we reduce logistics costs?", answer: "Bulk shipping, route optimization, and partnerships lower overall costs.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What role does technology play in logistics?", answer: "Automation and tracking tech enhance efficiency and transparency.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "How do we manage peak shipping seasons?", answer: "We scale capacity and prioritize shipments during high-demand periods.", icon: <Star className="text-white" size={20} /> },
          { question: "Can we ship to remote areas?", answer: "Yes, our network reaches even the most challenging destinations.", icon: <MapPin className="text-white" size={20} /> },
          { question: "How do we ensure cold chain logistics?", answer: "We use refrigerated transport for temperature-sensitive goods like pharmaceuticals.", icon: <Package className="text-white" size={20} /> },
          { question: "What is our return policy for shipments?", answer: "Returns are processed efficiently with clear guidelines for partners.", icon: <Truck className="text-white" size={20} /> },
          { question: "How do we handle fragile goods?", answer: "Special packaging and handling ensure fragile items arrive intact.", icon: <Shield className="text-white" size={20} /> },
          { question: "What certifications do our logistics hold?", answer: "We comply with ISO and international shipping standards.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we support urgent deliveries?", answer: "Express air shipping options are available for time-critical needs.", icon: <Plane className="text-white" size={20} /> },
          { question: "What is our global trade compliance strategy?", answer: "We stay updated on trade laws to ensure full compliance.", icon: <Lock className="text-white" size={20} /> },
          { question: "How do we adapt logistics for emergencies?", answer: "We activate contingency plans for rapid response in crises.", icon: <Plane className="text-white" size={20} /> }
        ]
      },
      {
        title: "Quality and Standards",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "How do we maintain German quality standards?", answer: "We work with certified German manufacturers and conduct rigorous quality checks on all products.", icon: <Plane className="text-white" size={20} /> },
          { question: "What industries do we serve with German products?", answer: "We distribute products for automotive, machinery, technology, healthcare, and more, all MADE IN GERMANY © .", icon: <Factory className="text-white" size={20} /> },
          { question: "Why is German engineering trusted worldwide?", answer: "German engineering is synonymous with precision, innovation, and reliability, built over decades of expertise.", icon: <Award className="text-white" size={20} /> },
          { question: "How do we certify imported products?", answer: "Imported products undergo strict testing to meet German safety and quality regulations before distribution.", icon: <Settings className="text-white" size={20} /> },
          { question: "What role does innovation play in our offerings?", answer: "We focus on cutting-edge German technology to provide innovative solutions to global markets.", icon: <Star className="text-white" size={20} /> },
          { question: "What quality certifications do we hold?", answer: "Our products meet DIN, ISO, and CE standards, ensuring top-tier quality.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we test product durability?", answer: "We conduct stress tests and long-term simulations to ensure durability.", icon: <Shield className="text-white" size={20} /> },
          { question: "What is our quality control process?", answer: "Every production stage is monitored, with final inspections before shipping.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we ensure consistency in quality?", answer: "Standardized processes and regular audits maintain consistent quality.", icon: <BarChart className="text-white" size={20} /> },
          { question: "What materials do we use for German products?", answer: "We use high-grade materials sourced from trusted suppliers.", icon: <Package className="text-white" size={20} /> },
          { question: "How do we handle defective products?", answer: "Defective items are replaced promptly with full transparency.", icon: <Truck className="text-white" size={20} /> },
          { question: "What is the lifespan of our products?", answer: "German products are designed for longevity, often exceeding industry norms.", icon: <Clock className="text-white" size={20} /> },
          { question: "How do we ensure safety standards?", answer: "Products are tested for safety compliance with global regulations.", icon: <Lock className="text-white" size={20} /> },
          { question: "What role does R&D play in quality?", answer: "Research and development drive continuous improvement in our offerings.", icon: <Star className="text-white" size={20} /> },
          { question: "How do we train manufacturers?", answer: "We provide guidelines and audits to ensure adherence to our standards.", icon: <Users className="text-white" size={20} /> },
          { question: "What is our warranty policy?", answer: "We offer comprehensive warranties tailored to each product category.", icon: <Shield className="text-white" size={20} /> },
          { question: "How do we address quality complaints?", answer: "We investigate and resolve issues quickly to maintain customer trust.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "What makes our quality checks rigorous?", answer: "Multiple testing phases and expert oversight ensure no compromises.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "How do we stay ahead in quality standards?", answer: "We adopt the latest industry advancements and exceed expectations.", icon: <Award className="text-white" size={20} /> },
          { question: "What is the role of precision in our products?", answer: "Precision engineering ensures flawless performance and reliability.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we ensure eco-friendly production?", answer: "We integrate sustainable practices into manufacturing processes.", icon: <Leaf className="text-white" size={20} /> },
          { question: "What testing facilities do we use?", answer: "State-of-the-art labs in Germany verify product quality.", icon: <Factory className="text-white" size={20} /> },
          { question: "How do we certify supplier quality?", answer: "Suppliers are audited regularly to meet our stringent criteria.", icon: <Settings className="text-white" size={20} /> },
          { question: "What is our approach to continuous improvement?", answer: "Feedback and innovation keep our standards evolving.", icon: <Plane className="text-white" size={20} /> },
          { question: "How do we guarantee customer satisfaction?", answer: "High-quality products and responsive support ensure satisfaction.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  kr: {
    headerTitle: "독일 제조 상업 비서",
    headerSubtitle: "온라인으로 글로벌 무역 요구를 돕기 위해 준비 완료",
    searchPlaceholder: "질문을 입력하세요...",
    footerText: "질문을 하거나 주제를 탐색하세요",
    sections: [
      {
        title: "독일 제조 수출에 관한 일반적인 질문",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "독일 제조 제품이 독특한 이유는 무엇인가요?", answer: "독일 제조 제품은 정밀성, 품질, 혁신으로 유명하며, 오랜 엔지니어링 우수성 전통에 의해 뒷받침됩니다.", icon: <Award className="text-white" size={20} /> },
          { question: "왜 기업들이 독일 제조 제품을 수입해야 하나요?", answer: "이 제품들은 신뢰성, 내구성, 첨단 기술을 제공하며, 글로벌 시장에서 큰 수요가 있습니다.", icon: <Star className="text-white" size={20} /> },
          { question: "전 세계적으로 제때 배송을 어떻게 보장하나요?", answer: "우리는 기차, 선박, 화물 항공기를 포함한 강력한 글로벌 물류 네트워크를 활용해 독일 제품을 효율적으로 배송합니다.", icon: <Truck className="text-white" size={20} /> },
          { question: "독일 제조 수출의 주요 시장은 어디인가요?", answer: "아시아, 아프리카, 아랍 세계, 그리고 미국 및 EU와 같은 부유한 국가들이 독일 제품의 주요 시장입니다.", icon: <MapPin className="text-white" size={20} /> },
          { question: "어떤 종류의 제품을 수출하나요?", answer: "우리는 자동차 부품, 기계, 전자제품, 의약품 등을 수출하며, 모두 독일 품질 기준을 따릅니다.", icon: <Package className="text-white" size={20} /> },
          { question: "소규모 기업의 수출을 어떻게 지원하나요?", answer: "맞춤형 물류와 경쟁력 있는 가격을 제공해 소규모 기업이 독일 제품으로 글로벌 시장에 진출하도록 돕습니다.", icon: <Users className="text-white" size={20} /> },
          { question: "독일 제조의 역사는 무엇인가요?", answer: "이 라벨은 19세기 말 품질의 상징으로 시작되어 글로벌 우수성의 상징으로 발전했습니다.", icon: <Clock className="text-white" size={20} /> },
          { question: "독일 수출이 세계 경제에 어떤 영향을 미치나요?", answer: "독일 수출은 글로벌 산업에 고품질 상품을 공급함으로써 경제 성장을 촉진합니다.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "가장 인기 있는 독일 수출 카테고리는 무엇인가요?", answer: "자동차, 기계, 화학 제품이 선두를 달리고 있으며, 그 다음으로 전자제품과 의약품이 있습니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "다양한 시장 요구에 어떻게 적응하나요?", answer: "우리는 각 지역의 특정 요구를 충족시키기 위해 제품과 물류를 맞춤화합니다.", icon: <Settings className="text-white" size={20} /> },
          { question: "왜 독일이 제조업에서 선두를 달리나요?", answer: "독일은 숙련된 노동력, 첨단 인프라, 혁신에 대한 집중으로 두각을 나타냅니다.", icon: <Factory className="text-white" size={20} /> },
          { question: "수출에서 기술이 어떤 역할을 하나요?", answer: "최첨단 기술은 우리 제품이 경쟁력을 유지하고 현대적 요구를 충족하도록 보장합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "수출 규정을 어떻게 처리하나요?", answer: "우리는 국제 무역법을 준수하며 고객이 규제 요구를 충족하도록 돕습니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "독일의 연간 수출량은 얼마나 되나요?", answer: "독일은 매년 1.5조 유로 이상의 상품을 수출하며, 이는 전 세계적으로 큰 비중을 차지합니다.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "제품의 진정성을 어떻게 보장하나요?", answer: "우리는 인증된 독일 제조업체로부터 직접 공급받아 진정성을 보장합니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "독일 제품 수출의 이점은 무엇인가요?", answer: "수출업자는 프리미엄 시장에 접근하고 브랜드 평판을 높일 수 있습니다.", icon: <Star className="text-white" size={20} /> },
          { question: "독일 수출을 글로벌하게 어떻게 홍보하나요?", answer: "무역 박람회, 파트너십, 디지털 마케팅을 통해 전 세계에 독일 품질을 알립니다.", icon: <Share2 className="text-white" size={20} /> },
          { question: "수출에서 어떤 도전에 직면하나요?", answer: "관세, 무역 장벽, 물류 비용은 전략적 계획으로 관리됩니다.", icon: <Lock className="text-white" size={20} /> },
          { question: "수출 성장을 어떻게 촉진하나요?", answer: "물류 인프라와 시장 조사에 투자하여 우리의 범위를 확장합니다.", icon: <Plane className="text-white" size={20} /> },
          { question: "독일 제조 수출의 미래는 무엇인가요?", answer: "지속 가능성과 디지털화가 독일 수출의 미래 성장을 이끌 것입니다.", icon: <Leaf className="text-white" size={20} /> },
          { question: "고객의 수출 문의를 어떻게 처리하나요?", answer: "다국어 팀이 모든 문의에 신속하고 상세하게 답변합니다.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "독일 수출이 경쟁자와 다른 점은 무엇인가요?", answer: "우수한 품질, 정밀 엔지니어링, 신뢰할 수 있는 평판이 우리를 차별화합니다.", icon: <Award className="text-white" size={20} /> },
          { question: "수출의 확장성을 어떻게 보장하나요?", answer: "유연한 물류와 파트너십으로 운영을 확장하여 수요를 충족합니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "무역 협정이 수출에서 어떤 역할을 하나요?", answer: "무역 협정은 장벽을 줄이고 독일 제품에 새로운 시장을 엽니다.", icon: <Handshake className="text-white" size={20} /> },
          { question: "수출에서 통화 변동을 어떻게 관리하나요?", answer: "헤지 전략과 유연한 가격 책정으로 통화 위험을 완화합니다.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "유통 및 파트너십 기회",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "기업들이 우리와 어떻게 유통 협력할 수 있나요?", answer: "우리는 글로벌 유통업체와 협력하여 독일 제조 제품을 그들의 시장에 공급하며, 맞춤형 물류와 지원을 제공합니다.", icon: <Briefcase className="text-white" size={20} /> },
          { question: "유통업체가 우리에게서 얻는 이점은 무엇인가요?", answer: "유통업체는 프리미엄 독일 제품, 경쟁력 있는 가격, 광범위한 물류 네트워크를 누릴 수 있습니다.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "독일로 제품을 수입해 유통할 수 있나요?", answer: "네, 우리는 글로벌 기업의 독일 수입을 지원하며, 품질 기준을 충족하도록 보장합니다.", icon: <Package className="text-white" size={20} /> },
          { question: "신규 파트너에게 어떤 지원을 제공하나요?", answer: "신규 파트너는 성공적인 유통을 위해 교육, 마케팅 지원, 물류 조정을 받습니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "유통업체에게 공정한 가격을 어떻게 보장하나요?", answer: "제조업체와 직접 협상하여 경쟁력 있는 가격을 확보하고, 이를 유통업체에 전달합니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "어떤 유형의 파트너십을 제공하나요?", answer: "파트너의 필요에 따라 독점, 비독점, 지역적 유통 계약을 제공합니다.", icon: <Handshake className="text-white" size={20} /> },
          { question: "유통 파트너를 어떻게 선택하나요?", answer: "시장 범위, 신뢰성, 우리 품질 기준과의 정합성에 따라 파트너를 선정합니다.", icon: <Users className="text-white" size={20} /> },
          { question: "유통업체가 되는 과정은 무엇인가요?", answer: "관심 있는 기업이 신청서를 제출하면 검토와 계약이 진행됩니다.", icon: <Settings className="text-white" size={20} /> },
          { question: "유통 파트너를 어떻게 교육하나요?", answer: "제품 지식 세션, 물류 교육, 지속적인 지원을 제공합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "어떤 마케팅 지원을 제공하나요?", answer: "홍보 자료, 디지털 캠페인, 공동 브랜딩 기회를 제공합니다.", icon: <Share2 className="text-white" size={20} /> },
          { question: "유통업체가 온라인으로 판매할 수 있나요?", answer: "네, 물류 및 디지털 도구로 전자상거래 유통을 지원합니다.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "유통업체 간 분쟁을 어떻게 처리하나요?", answer: "명확한 소통과 계약 가이드라인으로 공정하게 중재합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "파트너의 재정적 이점은 무엇인가요?", answer: "파트너는 독일 제품의 프리미엄 가치로 높은 마진을 얻습니다.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "파트너의 독점성을 어떻게 보장하나요?", answer: "독점 파트너는 보호된 지역과 우선 공급을 받습니다.", icon: <Lock className="text-white" size={20} /> },
          { question: "파트너가 받는 물류 지원은 무엇인가요?", answer: "완전한 배송 관리, 추적, 관세 지원을 제공합니다.", icon: <Truck className="text-white" size={20} /> },
          { question: "파트너 성과를 어떻게 평가하나요?", answer: "판매, 고객 피드백, 시장 침투 지표를 추적합니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "파트너가 여러 제품 라인을 유통할 수 있나요?", answer: "네, 파트너는 능력에 따라 다양한 독일 제품 카테고리를 다룰 수 있습니다.", icon: <Package className="text-white" size={20} /> },
          { question: "유통업체의 최소 주문량은 얼마인가요?", answer: "최소 주문량은 제품에 따라 다르며, 모든 파트너가 접근 가능하도록 설계되었습니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "신규 유통업체를 어떻게 통합하나요?", answer: "계약, 교육, 초기 배송을 통해 원활하게 안내합니다.", icon: <Star className="text-white" size={20} /> },
          { question: "파트너가 브랜딩에서 어떤 역할을 하나요?", answer: "파트너는 독일 제조 브랜드를 공동 홍보하며 자체 평판을 강화합니다.", icon: <Award className="text-white" size={20} /> },
          { question: "파트너의 성장을 어떻게 지원하나요?", answer: "확장 옵션과 시장 확장 전략을 제공합니다.", icon: <Plane className="text-white" size={20} /> },
          { question: "파트너가 신제품을 제안할 수 있나요?", answer: "네, 시장 요구에 따라 제품 범위를 확장하기 위해 피드백을 환영합니다.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "파트너십 계약 기간은 얼마나 되나요?", answer: "계약은 일반적으로 1~3년이며, 성과에 따라 갱신 가능합니다.", icon: <Clock className="text-white" size={20} /> },
          { question: "파트너의 투자를 어떻게 보호하나요?", answer: "안정적인 공급망과 공정한 조건으로 투자를 보호합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "최고 유통업체가 받는 인센티브는 무엇인가요?", answer: "최고 성과자는 우선 가격, 보너스, 독점 기회를 받습니다.", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "물류 및 글로벌 무역",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "국제 배송의 도전을 어떻게 처리하나요?", answer: "우리의 첨단 물류 솔루션은 관세, 세금, 운송 장애를 해결하여 원활한 배송을 보장합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "물류에서 지속 가능성이 어떤 역할을 하나요?", answer: "환경 친화적인 배송 방식과 포장을 우선시하여 탄소 발자국을 줄입니다.", icon: <Leaf className="text-white" size={20} /> },
          { question: "시간대가 운영에 어떤 영향을 미치나요?", answer: "유연한 일정과 디지털 도구로 글로벌 시간대를 효과적으로 조정합니다.", icon: <Clock className="text-white" size={20} /> },
          { question: "글로벌 무역을 위해 어떤 언어를 지원하나요?", answer: "영어, 독일어, 아랍어, 중국어 등 다국어 지원으로 원활한 소통을 제공합니다.", icon: <Languages className="text-white" size={20} /> },
          { question: "배송 안전을 어떻게 보장하나요?", answer: "암호화된 추적 시스템과 신뢰할 수 있는 운송업체로 전 세계 배송을 보호합니다.", icon: <Lock className="text-white" size={20} /> },
          { question: "어떤 배송 방법을 사용하나요?", answer: "효율성과 비용에 따라 항공, 해상, 철도, 도로 운송을 활용합니다.", icon: <Truck className="text-white" size={20} /> },
          { question: "배송 비용은 어떻게 계산하나요?", answer: "거리, 무게, 운송 방식에 따라 비용을 산정하며 투명한 가격을 제공합니다.", icon: <DollarSign className="text-white" size={20} /> },
          { question: "평균 배송 시간은 얼마나 되나요?", answer: "지역에 따라 다르며, 일반적으로 목적지에 따라 3~14일 소요됩니다.", icon: <Clock className="text-white" size={20} /> },
          { question: "배송을 어떻게 추적하나요?", answer: "고객은 암호화된 추적 플랫폼을 통해 실시간 업데이트를 받습니다.", icon: <MapPin className="text-white" size={20} /> },
          { question: "배송이 지연되면 어떻게 되나요?", answer: "조사 후 업데이트를 제공하고 신속히 해결책을 마련합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "통관은 어떻게 처리하나요?", answer: "우리 팀이 서류와 규정 준수를 관리하여 원활한 통관을 보장합니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "물류 용량은 어느 정도인가요?", answer: "확장 가능한 인프라로 매달 수천 건의 배송을 처리합니다.", icon: <Plane className="text-white" size={20} /> },
          { question: "배송 경로를 어떻게 최적화하나요?", answer: "AI 기반 물류로 가장 빠르고 경제적인 경로를 선택합니다.", icon: <Settings className="text-white" size={20} /> },
          { question: "어떤 보험 옵션을 제공하나요?", answer: "배송 전 과정을 보호하는 포괄적인 보험을 제공합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "물류 비용을 어떻게 줄이나요?", answer: "대량 배송, 경로 최적화, 파트너십으로 전체 비용을 절감합니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "물류에서 기술이 어떤 역할을 하나요?", answer: "자동화와 추적 기술로 효율성과 투명성을 높입니다.", icon: <Globe2 className="text-white" size={20} /> },
          { question: "배송 성수기를 어떻게 관리하나요?", answer: "수요가 높은 기간 동안 용량을 늘리고 배송을 우선 처리합니다.", icon: <Star className="text-white" size={20} /> },
          { question: "오지로 배송할 수 있나요?", answer: "네, 우리 네트워크는 가장 까다로운 목적지까지 도달합니다.", icon: <MapPin className="text-white" size={20} /> },
          { question: "냉장 물류는 어떻게 보장하나요?", answer: "의약품과 같은 온도 민감성 상품에 냉장 운송을 사용합니다.", icon: <Package className="text-white" size={20} /> },
          { question: "배송 반품 정책은 무엇인가요?", answer: "반품은 명확한 가이드라인으로 효율적으로 처리됩니다.", icon: <Truck className="text-white" size={20} /> },
          { question: "취약 물품을 어떻게 다루나요?", answer: "특수 포장과 신중한 취급으로 취약 물품이 손상 없이 도착하도록 합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "물류에 어떤 인증이 있나요?", answer: "ISO 및 국제 배송 표준을 준수합니다.", icon: <Award className="text-white" size={20} /> },
          { question: "긴급 배송을 어떻게 지원하나요?", answer: "시간이 중요한 요구에 항공 특송 옵션을 제공합니다.", icon: <Plane className="text-white" size={20} /> },
          { question: "글로벌 무역 준수 전략은 무엇인가요?", answer: "무역법을 최신 상태로 유지하여 완전한 준수를 보장합니다.", icon: <Lock className="text-white" size={20} /> },
          { question: "비상 상황에 물류를 어떻게 조정하나요?", answer: "위기 시 신속 대응을 위해 비상 계획을 가동합니다.", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "품질 및 표준",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "독일 품질 표준을 어떻게 유지하나요?", answer: "인증된 독일 제조업체와 협력하며 모든 제품에 엄격한 품질 검사를 실시합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "어떤 산업에 독일 제품을 공급하나요?", answer: "자동차, 기계, 기술, 의료 등에 독일 제조 제품을 배송합니다.", icon: <Factory className="text-white" size={20} /> },
          { question: "왜 독일 엔지니어링이 전 세계적으로 신뢰받나요?", answer: "독일 엔지니어링은 정밀성, 혁신, 신뢰성으로 유명하며 수십 년의 경험에 기반합니다.", icon: <Award className="text-white" size={20} /> },
          { question: "수입 제품을 어떻게 인증하나요?", answer: "수입 제품은 독일 안전 및 품질 규정을 충족하도록 엄격한 테스트를 거칩니다.", icon: <Settings className="text-white" size={20} /> },
          { question: "우리의 제공에서 혁신이 어떤 역할을 하나요?", answer: "최첨단 독일 기술에 집중하여 글로벌 시장에 혁신적 솔루션을 제공합니다.", icon: <Star className="text-white" size={20} /> },
          { question: "어떤 품질 인증을 보유하고 있나요?", answer: "우리의 제품은 DIN, ISO, CE 표준을 준수하며 최고 품질을 보장합니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "제품 내구성을 어떻게 테스트하나요?", answer: "스트레스 테스트와 장기 시뮬레이션을 통해 내구성을 확인합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "품질 관리 프로세스는 무엇인가요?", answer: "생산 각 단계를 모니터링하고 배송 전 최종 검사를 진행합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "품질의 일관성을 어떻게 보장하나요?", answer: "표준화된 프로세스와 정기적인 감사를 통해 품질을 유지합니다.", icon: <BarChart className="text-white" size={20} /> },
          { question: "독일 제품에 어떤 재료를 사용하나요?", answer: "신뢰할 수 있는 공급업체로부터 고품질 재료를 사용합니다.", icon: <Package className="text-white" size={20} /> },
          { question: "결함 있는 제품을 어떻게 처리하나요?", answer: "결함 제품은 완전한 투명성으로 신속히 교체됩니다.", icon: <Truck className="text-white" size={20} /> },
          { question: "제품 수명은 얼마나 되나요?", answer: "독일 제품은 오래 지속되도록 설계되었으며 종종 산업 표준을 초과합니다.", icon: <Clock className="text-white" size={20} /> },
          { question: "안전 표준을 어떻게 보장하나요?", answer: "제품은 글로벌 안전 규정을 준수하도록 테스트됩니다.", icon: <Lock className="text-white" size={20} /> },
          { question: "품질에서 R&D의 역할은 무엇인가요?", answer: "연구 개발은 우리의 제공을 지속적으로 개선합니다.", icon: <Star className="text-white" size={20} /> },
          { question: "제조업체를 어떻게 훈련시키나요?", answer: "가이드라인과 감사를 제공하여 우리 표준을 준수하도록 합니다.", icon: <Users className="text-white" size={20} /> },
          { question: "보증 정책은 무엇인가요?", answer: "각 제품 카테고리에 맞춘 포괄적인 보증을 제공합니다.", icon: <Shield className="text-white" size={20} /> },
          { question: "품질 불만을 어떻게 처리하나요?", answer: "신속히 조사하고 해결하여 고객 신뢰를 유지합니다.", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "왜 품질 검사가 엄격한가요?", answer: "다단계 테스트와 전문 감독으로 타협이 없습니다.", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "품질 표준에서 어떻게 앞서 나가나요?", answer: "최신 산업 발전을 채택하고 기대를 초과합니다.", icon: <Award className="text-white" size={20} /> },
          { question: "제품에서 정밀성이 어떤 역할을 하나요?", answer: "정밀 엔지니어링은 완벽한 성능과 신뢰성을 보장합니다.", icon: <Wrench className="text-white" size={20} /> },
          { question: "친환경 생산을 어떻게 보장하나요?", answer: "제조 과정에 지속 가능한 관행을 통합합니다.", icon: <Leaf className="text-white" size={20} /> },
          { question: "어떤 테스트 시설을 사용하나요?", answer: "독일의 최첨단 실험실에서 제품 품질을 검증합니다.", icon: <Factory className="text-white" size={20} /> },
          { question: "공급업체 품질을 어떻게 인증하나요?", answer: "공급업체는 엄격한 기준을 충족하도록 정기적으로 감사받습니다.", icon: <Settings className="text-white" size={20} /> },
          { question: "지속적 개선에 대한 접근 방식은 무엇인가요?", answer: "피드백과 혁신으로 표준을 계속 발전시킵니다.", icon: <Plane className="text-white" size={20} /> },
          { question: "고객 만족을 어떻게 보장하나요?", answer: "고품질 제품과 신속한 지원으로 만족을 보장합니다.", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  },
  jp: {
    headerTitle: "ドイツ製商業アシスタント",
    headerSubtitle: "オンラインでグローバルな貿易ニーズをサポートする準備ができています",
    searchPlaceholder: "質問を入力してください...",
    footerText: "質問をするか、トピックを探してください",
    sections: [
      {
        title: "ドイツ製輸出に関する一般的な質問",
        icon: <Globe className="text-white" size={24} />,
        questions: [
          { question: "ドイツ製製品がユニークな理由は何ですか？", answer: "ドイツ製製品は精度、品質、革新性で知られており、長年のエンジニアリング卓越性の伝統に支えられています。", icon: <Award className="text-white" size={20} /> },
          { question: "なぜ企業はドイツ製製品を輸入すべきですか？", answer: "これらの製品は信頼性、耐久性、先進技術を提供し、グローバル市場で高い需要があります。", icon: <Star className="text-white" size={20} /> },
          { question: "世界中で時間通りの配送をどのように保証しますか？", answer: "私たちは電車、船、貨物機を含む強力なグローバル物流ネットワークを活用して、ドイツ製品を効率的に配送します。", icon: <Truck className="text-white" size={20} /> },
          { question: "ドイツ製輸出の主要市場はどこですか？", answer: "アジア、アフリカ、アラブ世界、米国やEUなどの豊かな国々がドイツ製品の主要市場です。", icon: <MapPin className="text-white" size={20} /> },
          { question: "どのような製品を輸出していますか？", answer: "自動車部品、機械、電子機器、医薬品などを輸出しており、全てドイツの品質基準に準拠しています。", icon: <Package className="text-white" size={20} /> },
          { question: "中小企業への輸出支援はどのように行いますか？", answer: "カスタマイズされた物流と競争力のある価格を提供し、中小企業がドイツ製品でグローバル市場に進出するのを支援します。", icon: <Users className="text-white" size={20} /> },
          { question: "ドイツ製の歴史は何ですか？", answer: "このラベルは19世紀末に品質の証として生まれ、グローバルな卓越性の象徴へと進化しました。", icon: <Clock className="text-white" size={20} /> },
          { question: "ドイツの輸出が世界経済にどのように影響しますか？", answer: "ドイツの輸出は高品質な商品をグローバル産業に供給することで経済成長を促進します。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "最も人気のあるドイツ輸出カテゴリーは何ですか？", answer: "自動車、機械、化学製品がリードし、次に電子機器と医薬品が続きます。", icon: <BarChart className="text-white" size={20} /> },
          { question: "異なる市場の需要にどう適応しますか？", answer: "各地域の具体的なニーズを満たすために製品と物流をカスタマイズします。", icon: <Settings className="text-white" size={20} /> },
          { question: "なぜドイツが製造業でリーダーなのですか？", answer: "ドイツは熟練した労働力、先進的なインフラ、革新への注力で優れています。", icon: <Factory className="text-white" size={20} /> },
          { question: "輸出における技術の役割は何ですか？", answer: "最先端技術は当社の製品が競争力を維持し、現代の需要を満たすことを保証します。", icon: <Wrench className="text-white" size={20} /> },
          { question: "輸出規制をどのように扱いますか？", answer: "国際貿易法を遵守し、顧客が規制要件を満たすのを支援します。", icon: <Shield className="text-white" size={20} /> },
          { question: "ドイツの年間輸出量はどれくらいですか？", answer: "ドイツは年間1.5兆ユーロ以上の商品を輸出し、世界的に大きなシェアを占めています。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "製品の真正性をどう保証しますか？", answer: "認定されたドイツ製造業者から直接調達し、真正性を保証します。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "ドイツ製品を輸出する利点は何ですか？", answer: "輸出業者はプレミアム市場にアクセスし、ブランドの評判を高められます。", icon: <Star className="text-white" size={20} /> },
          { question: "ドイツ輸出をグローバルにどう宣伝しますか？", answer: "貿易フェア、パートナーシップ、デジタルマーケティングを通じて、世界にドイツ品質を紹介します。", icon: <Share2 className="text-white" size={20} /> },
          { question: "輸出でどのような課題に直面しますか？", answer: "関税、貿易障壁、物流コストは戦略的計画で管理されます。", icon: <Lock className="text-white" size={20} /> },
          { question: "輸出の成長をどう促進しますか？", answer: "物流インフラと市場調査に投資し、範囲を拡大します。", icon: <Plane className="text-white" size={20} /> },
          { question: "ドイツ製輸出の未来は何ですか？", answer: "持続可能性とデジタル化がドイツ輸出の将来の成長を牽引します。", icon: <Leaf className="text-white" size={20} /> },
          { question: "顧客の輸出に関する問い合わせをどう処理しますか？", answer: "多言語チームがすべての問い合わせに迅速かつ詳細に回答します。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "ドイツ輸出が競合他社と異なる点は何ですか？", answer: "優れた品質、精密なエンジニアリング、信頼性の高い評判が私たちを際立たせます。", icon: <Award className="text-white" size={20} /> },
          { question: "輸出の拡張性をどう保証しますか？", answer: "柔軟な物流とパートナーシップで運営を拡大し、需要に対応します。", icon: <BarChart className="text-white" size={20} /> },
          { question: "貿易協定が輸出でどのような役割を果たしますか？", answer: "貿易協定は障壁を減らし、ドイツ製品に新しい市場を開きます。", icon: <Handshake className="text-white" size={20} /> },
          { question: "輸出での通貨変動をどう管理しますか？", answer: "ヘッジ戦略と柔軟な価格設定で通貨リスクを軽減します。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "流通とパートナーシップの機会",
        icon: <Handshake className="text-white" size={24} />,
        questions: [
          { question: "企業はどのようにして私たちと流通で協力できますか？", answer: "私たちはグローバルな流通業者と協力し、ドイツ製製品を彼らの市場に届け、カスタマイズされた物流とサポートを提供します。", icon: <Briefcase className="text-white" size={20} /> },
          { question: "流通業者が私たちから得られる利点は何ですか？", answer: "流通業者はプレミアムなドイツ製品、競争力のある価格、広範な物流ネットワークを享受できます。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "ドイツに製品を輸入して流通できますか？", answer: "はい、グローバル企業からのドイツへの輸入を支援し、品質基準を満たすことを保証します。", icon: <Package className="text-white" size={20} /> },
          { question: "新しいパートナーにどのようなサポートを提供しますか？", answer: "新しいパートナーは成功した流通のためにトレーニング、マーケティング支援、物流調整を受けます。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "流通業者に公正な価格をどう保証しますか？", answer: "製造業者と直接交渉し競争力のある価格を確保し、その節約を流通業者に還元します。", icon: <BarChart className="text-white" size={20} /> },
          { question: "どのようなパートナーシップを提供しますか？", answer: "パートナーのニーズに応じて、独占的、非独占的、地域的な流通契約を提供します。", icon: <Handshake className="text-white" size={20} /> },
          { question: "流通パートナーをどう選びますか？", answer: "市場範囲、信頼性、当社の品質基準との整合性に基づいてパートナーを選びます。", icon: <Users className="text-white" size={20} /> },
          { question: "流通業者になるプロセスは何ですか？", answer: "興味のある企業が申請を提出し、その後審査と契約が行われます。", icon: <Settings className="text-white" size={20} /> },
          { question: "流通パートナーをどう訓練しますか？", answer: "製品知識セッション、物流トレーニング、継続的なサポートを提供します。", icon: <Wrench className="text-white" size={20} /> },
          { question: "どのようなマーケティング支援を提供しますか？", answer: "販促資料、デジタルキャンペーン、共同ブランディングの機会を提供します。", icon: <Share2 className="text-white" size={20} /> },
          { question: "流通業者はオンラインで販売できますか？", answer: "はい、物流とデジタルツールでEコマース流通をサポートします。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "流通業者間の紛争をどう処理しますか？", answer: "明確なコミュニケーションと契約ガイドラインで公正に調停します。", icon: <Shield className="text-white" size={20} /> },
          { question: "パートナーの財務的利点は何ですか？", answer: "パートナーはドイツ製品のプレミアム価値により高いマージンを得ます。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "パートナーの独占性をどう保証しますか？", answer: "独占パートナーは保護された地域と優先供給を受けます。", icon: <Lock className="text-white" size={20} /> },
          { question: "パートナーが受ける物流サポートは何ですか？", answer: "完全な配送管理、追跡、税関支援を提供します。", icon: <Truck className="text-white" size={20} /> },
          { question: "パートナーのパフォーマンスをどう評価しますか？", answer: "売上、顧客フィードバック、市場浸透指標を追跡します。", icon: <BarChart className="text-white" size={20} /> },
          { question: "パートナーは複数の製品ラインを流通できますか？", answer: "はい、パートナーは能力に応じて多様なドイツ製品カテゴリーを扱えます。", icon: <Package className="text-white" size={20} /> },
          { question: "流通業者の最低注文量はどれくらいですか？", answer: "最低注文量は製品により異なり、全パートナーが利用しやすいよう設計されています。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "新しい流通業者をどう統合しますか？", answer: "契約、トレーニング、初期配送を通じてスムーズに案内します。", icon: <Star className="text-white" size={20} /> },
          { question: "パートナーがブランディングで果たす役割は何ですか？", answer: "パートナーはドイツ製ブランドを共同で宣伝し、自身の評判を強化します。", icon: <Award className="text-white" size={20} /> },
          { question: "パートナーの成長をどう支援しますか？", answer: "拡張オプションと市場拡大戦略を提供します。", icon: <Plane className="text-white" size={20} /> },
          { question: "パートナーは新製品を提案できますか？", answer: "はい、市場ニーズに基づいてオファーを拡大するためのフィードバックを歓迎します。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "パートナーシップ契約の期間はどれくらいですか？", answer: "契約は通常1〜3年で、パフォーマンスに基づいて更新可能です。", icon: <Clock className="text-white" size={20} /> },
          { question: "パートナーの投資をどう保護しますか？", answer: "安定したサプライチェーンと公平な条件で投資を保護します。", icon: <Shield className="text-white" size={20} /> },
          { question: "優秀な流通業者が得るインセンティブは何ですか？", answer: "最高のパフォーマーは優先価格、ボーナス、独占機会を得ます。", icon: <DollarSign className="text-white" size={20} /> }
        ]
      },
      {
        title: "物流とグローバル貿易",
        icon: <Plane className="text-white" size={24} />,
        questions: [
          { question: "国際輸送の課題をどう処理しますか？", answer: "先進的な物流ソリューションで税関、関税、輸送障壁を解決し、スムーズな配送を保証します。", icon: <Shield className="text-white" size={20} /> },
          { question: "物流における持続可能性の役割は何ですか？", answer: "環境に優しい輸送方法と包装を優先し、カーボンフットプリントを削減します。", icon: <Leaf className="text-white" size={20} /> },
          { question: "タイムゾーンが運営にどう影響しますか？", answer: "柔軟なスケジュールとデジタルツールでグローバルなタイムゾーンを効果的に調整します。", icon: <Clock className="text-white" size={20} /> },
          { question: "グローバル貿易でどの言語をサポートしますか？", answer: "英語、ドイツ語、アラビア語、中国語など多言語サポートでスムーズなコミュニケーションを提供します。", icon: <Languages className="text-white" size={20} /> },
          { question: "輸送の安全をどう保証しますか？", answer: "暗号化された追跡システムと信頼できる運送会社で世界中の輸送を保護します。", icon: <Lock className="text-white" size={20} /> },
          { question: "どのような輸送方法を使用しますか？", answer: "効率性とコストに基づいて航空、海上、鉄道、道路輸送を活用します。", icon: <Truck className="text-white" size={20} /> },
          { question: "輸送コストはどう計算しますか？", answer: "距離、重量、輸送方法に基づいてコストを算出し、透明な価格を提供します。", icon: <DollarSign className="text-white" size={20} /> },
          { question: "平均配送時間はどのくらいですか？", answer: "地域により異なり、通常は目的地に応じて3〜14日かかります。", icon: <Clock className="text-white" size={20} /> },
          { question: "輸送をどう追跡しますか？", answer: "顧客は暗号化された追跡プラットフォームでリアルタイム更新を受け取ります。", icon: <MapPin className="text-white" size={20} /> },
          { question: "輸送が遅れた場合はどうなりますか？", answer: "調査し、更新を提供し、迅速に解決策を講じます。", icon: <Wrench className="text-white" size={20} /> },
          { question: "税関手続きをどう処理しますか？", answer: "当社のチームが書類とコンプライアンスを管理し、スムーズな税関手続きを保証します。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "物流能力はどの程度ですか？", answer: "拡張可能なインフラで毎月数千件の輸送を処理します。", icon: <Plane className="text-white" size={20} /> },
          { question: "輸送ルートをどう最適化しますか？", answer: "AI駆動の物流で最も速く経済的なルートを選択します。", icon: <Settings className="text-white" size={20} /> },
          { question: "どのような保険オプションを提供しますか？", answer: "輸送全体を保護する包括的な保険を提供します。", icon: <Shield className="text-white" size={20} /> },
          { question: "物流コストをどう削減しますか？", answer: "一括輸送、ルート最適化、パートナーシップで総コストを削減します。", icon: <BarChart className="text-white" size={20} /> },
          { question: "物流における技術の役割は何ですか？", answer: "自動化と追跡技術で効率性と透明性を高めます。", icon: <Globe2 className="text-white" size={20} /> },
          { question: "輸送のピークシーズンをどう管理しますか？", answer: "需要が高い期間に容量を増やし、輸送を優先します。", icon: <Star className="text-white" size={20} /> },
          { question: "僻地に輸送できますか？", answer: "はい、当社のネットワークは最も困難な目的地にも到達します。", icon: <MapPin className="text-white" size={20} /> },
          { question: "コールドチェーン物流をどう保証しますか？", answer: "医薬品などの温度に敏感な商品に冷蔵輸送を使用します。", icon: <Package className="text-white" size={20} /> },
          { question: "輸送の返品ポリシーは何ですか？", answer: "返品はパートナー向けの明確なガイドラインで効率的に処理されます。", icon: <Truck className="text-white" size={20} /> },
          { question: "壊れやすい商品をどう扱いますか？", answer: "特別な梱包と慎重な取り扱いで壊れやすい商品が無傷で届くようにします。", icon: <Shield className="text-white" size={20} /> },
          { question: "物流にはどのような認証がありますか？", answer: "ISOおよび国際輸送基準に準拠しています。", icon: <Award className="text-white" size={20} /> },
          { question: "緊急配送をどうサポートしますか？", answer: "時間に制約のあるニーズに航空エクスプレスオプションを提供します。", icon: <Plane className="text-white" size={20} /> },
          { question: "グローバル貿易コンプライアンス戦略は何ですか？", answer: "貿易法を最新に保ち、完全な遵守を保証します。", icon: <Lock className="text-white" size={20} /> },
          { question: "緊急事態に物流をどう調整しますか？", answer: "危機に迅速に対応するため、緊急計画を活性化します。", icon: <Wrench className="text-white" size={20} /> }
        ]
      },
      {
        title: "品質と基準",
        icon: <Building className="text-white" size={24} />,
        questions: [
          { question: "ドイツの品質基準をどう維持しますか？", answer: "認定されたドイツ製造業者と協力し、全製品に厳格な品質チェックを行います。", icon: <Wrench className="text-white" size={20} /> },
          { question: "どの産業にドイツ製品を供給しますか？", answer: "自動車、機械、技術、医療などの産業にドイツ製製品を配送します。", icon: <Factory className="text-white" size={20} /> },
          { question: "なぜドイツのエンジニアリングが世界で信頼されていますか？", answer: "ドイツのエンジニアリングは精度、革新性、信頼性で知られ、数十年間の経験に裏打ちされています。", icon: <Award className="text-white" size={20} /> },
          { question: "輸入製品をどう認証しますか？", answer: "輸入製品はドイツの安全および品質規制を満たすため厳格なテストを受けます。", icon: <Settings className="text-white" size={20} /> },
          { question: "私たちの提供における革新の役割は何ですか？", answer: "最先端のドイツ技術に焦点を当て、グローバル市場に革新的なソリューションを提供します。", icon: <Star className="text-white" size={20} /> },
          { question: "どのような品質認証を持っていますか？", answer: "当社の製品はDIN、ISO、CE基準に準拠し、最高品質を保証します。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "製品の耐久性をどうテストしますか？", answer: "ストレステストと長期シミュレーションで耐久性を確認します。", icon: <Wrench className="text-white" size={20} /> },
          { question: "品質管理プロセスは何ですか？", answer: "生産の各段階を監視し、出荷前に最終検査を行います。", icon: <Wrench className="text-white" size={20} /> },
          { question: "品質の一貫性をどう保証しますか？", answer: "標準化されたプロセスと定期的な監査で品質を維持します。", icon: <BarChart className="text-white" size={20} /> },
          { question: "ドイツ製品にどのような材料を使用しますか？", answer: "信頼できるサプライヤーからの高品質材料を使用します。", icon: <Package className="text-white" size={20} /> },
          { question: "欠陥製品をどう扱いますか？", answer: "欠陥製品は完全な透明性で迅速に交換されます。", icon: <Truck className="text-white" size={20} /> },
          { question: "製品の寿命はどのくらいですか？", answer: "ドイツ製品は長持ちするよう設計されており、業界基準をしばしば超えます。", icon: <Clock className="text-white" size={20} /> },
          { question: "安全基準をどう保証しますか？", answer: "製品はグローバル安全規制に準拠するようテストされます。", icon: <Lock className="text-white" size={20} /> },
          { question: "品質におけるR&Dの役割は何ですか？", answer: "研究開発は私たちの提供を継続的に改善します。", icon: <Star className="text-white" size={20} /> },
          { question: "製造業者をどう訓練しますか？", answer: "ガイドラインと監査を提供し、当社の基準を遵守させます。", icon: <Users className="text-white" size={20} /> },
          { question: "保証ポリシーは何ですか？", answer: "各製品カテゴリーに合わせた包括的な保証を提供します。", icon: <Shield className="text-white" size={20} /> },
          { question: "品質に関する苦情をどう処理しますか？", answer: "迅速に調査し解決することで顧客の信頼を維持します。", icon: <MessageCircle className="text-white" size={20} /> },
          { question: "品質チェックが厳格な理由は何ですか？", answer: "複数段階のテストと専門家による監督で妥協を許しません。", icon: <CheckCircle className="text-white" size={20} /> },
          { question: "品質基準でどうリードしますか？", answer: "業界の最新進展を採用し、期待を超えます。", icon: <Award className="text-white" size={20} /> },
          { question: "製品における精度の役割は何ですか？", answer: "精密なエンジニアリングは完璧な性能と信頼性を保証します。", icon: <Wrench className="text-white" size={20} /> },
          { question: "環境に優しい生産をどう保証しますか？", answer: "製造プロセスに持続可能な実践を統合します。", icon: <Leaf className="text-white" size={20} /> },
          { question: "どのようなテスト施設を使用しますか？", answer: "ドイツの最先端ラボで製品品質を検証します。", icon: <Factory className="text-white" size={20} /> },
          { question: "サプライヤーの品質をどう認証しますか？", answer: "サプライヤーは厳格な基準を満たすため定期的に監査されます。", icon: <Settings className="text-white" size={20} /> },
          { question: "継続的改善へのアプローチは何ですか？", answer: "フィードバックと革新で基準を進化させ続けます。", icon: <Plane className="text-white" size={20} /> },
          { question: "顧客満足をどう保証しますか？", answer: "高品質製品と迅速なサポートで満足を保証します。", icon: <Star className="text-white" size={20} /> }
        ]
      }
    ]
  }
    };
    
    const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose, language = 'en' }) => {
      const [searchQuery, setSearchQuery] = useState('');
      const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
    
      const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];
    
      useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
          if (e.key === 'Escape' && isOpen) {
            onClose();
          }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
      }, [isOpen, onClose]);
    
      const filterSections = (query: string) => {
        return translations.sections.map(section => ({
          ...section,
          questions: section.questions.filter(q => 
            q.question.toLowerCase().includes(query.toLowerCase()) ||
            q.answer.toLowerCase().includes(query.toLowerCase())
          )
        })).filter(section => section.questions.length > 0);
      };
      return (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-85"
              style={{ backdropFilter: 'blur(12px)' }}
              onClick={(e) => e.target === e.currentTarget && onClose()}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-[95%] max-w-6xl h-[90vh] bg-[#0B111F] border border-gray-800 rounded-[10px] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 sm:p-8 bg-[#0F1627] border-b border-gray-800 relative">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-auto sm:right-auto sm:relative px-4 py-2 sm:px-6 sm:py-3 text-white rounded-[5px] flex items-center gap-2 transition-colors text-xs sm:text-sm sm:order-1"
                  >
                    <span>Close</span>
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.button>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#0B111F]/10 rounded-lg">
                        <Truck className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-3xl font-bold text-white tracking-tight">{translations.headerTitle}</h2>
                        <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{translations.headerSubtitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Search */}
                <div className="p-4 sm:p-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={translations.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-[#0F1627] rounded-2xl text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#0B111scalF] border border-gray-800 text-sm sm:text-base"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
    
                {/* Questions */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-8 scrollbar-hide">
                  <div className="space-y-6 sm:space-y-8 pb-8">
                    <AnimatePresence>
                      {filterSections(searchQuery).map((section) => (
                        <motion.div
                          key={section.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-6 h-6 sm:w-8 sm:h-8">{section.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold text-white">{section.title}</h3>
                          </div>
                          <div className="space-y-4">
                            {section.questions.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl bg-[#0F1627] border border-gray-800 hover:border-[#0B111F]/30 transition-colors"
                              >
                                <button
                                  onClick={() => setExpandedQuestion(expandedQuestion === item.question ? null : item.question)}
                                  className="w-full p-4 sm:p-6 flex items-center justify-between text-left text-white hover:text-[#FFFFFF] transition-colors group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="p-1.5 bg-[#0B111F]/10 rounded-lg">{item.icon}</div>
                                    <span className="text-sm sm:text-base">{item.question}</span>
                                  </div>
                                  <ChevronRight 
                                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:text-white ${expandedQuestion === item.question ? 'rotate-90' : ''}`} 
                                  />
                                </button>
                                <AnimatePresence>
                                  {expandedQuestion === item.question && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="border-t border-gray-800 bg-[#0B111F] p-4 sm:p-6 text-gray-300 text-sm sm:text-base"
                                    >
                                      {item.answer}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
    
                {/* Footer */}
                <div className="p-4 sm:p-8 bg-[#0F1627] border-t border-gray-800">
                  <div className="flex items-center justify-center gap-3 text-gray-400">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-lg">{translations.footerText}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };
    
    // Custom styles for scrollbar hiding
    const styles = `
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    export default ChatBot;