import React, { useState, useEffect } from 'react';
import MegaMenu from './MegaMenu';

// Define props interface for HeroSection
interface HeroSectionProps {
  language?: string;
}

// Define slide interfaces
interface MainSlide {
  image: string;
  title: string;
  description: string;
}

interface SideSlide {
  image: string;
  title: string;
}

interface FeatureBox {
  title: string;
  description: string;
  image: string;
}

// Define translations for HeroSection content in 12 languages
const TRANSLATIONS: Record<string, {
  mainSlides: MainSlide[];
  sideSlides: SideSlide[];
  featureBoxes: FeatureBox[];
}> = {
  en: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Precision in Every Shipment', description: 'Streamlined logistics and top-tier warehousing for global trade efficiency.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Global Trade, German Quality', description: 'Reliability and innovation driving international supply chains forward.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Smart Warehousing Solutions', description: 'Advanced inventory management ensuring seamless B2B operations.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Efficiency in Motion', description: 'Optimized cargo handling for smooth and secure global deliveries.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Compact Solutions, Maximum Impact', description: 'Scalable logistics tailored for international trade success.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Reliable Transport, German Precision', description: 'High-performance trucking solutions ensuring on-time deliveries worldwide.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Smart Packaging, Secure Delivery', description: 'Innovative solutions for safe, efficient, and sustainable logistics.' },
      { image: '/hero/made-in-germany-train.webp', title: 'High-Speed Logistics, Trusted Quality', description: 'Rail freight solutions for fast and cost-effective bulk transport.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Industrial Excellence, Unmatched Standards', description: 'State-of-the-art facilities for high-volume production and distribution.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'German Automotive Mastery' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Cutting-Edge Electronics' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Advanced Chemical Solutions' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Engineering Innovation' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Premium Consumer Goods' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Excellence in Pharmaceuticals' }
    ],
    featureBoxes: [
      { title: 'Quality Assured', description: 'Every product meets the German standards', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Global Shipping', description: 'Fast and secure worldwide delivery', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Premium Support', description: '24/7 dedicated customer service', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Certified Products', description: 'All products meet international standards', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  de: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Präzision bei jedem Versand', description: 'Optimierte Logistik und erstklassige Lagerhaltung für globale Handelseffizienz.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Globaler Handel, Deutsche Qualität', description: 'Zuverlässigkeit und Innovation treiben internationale Lieferketten voran.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Intelligente Lagerlösungen', description: 'Fortschrittliches Bestandsmanagement für reibungslose B2B-Operationen.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Effizienz in Bewegung', description: 'Optimiertes Frachtmanagement für reibungslose und sichere globale Lieferungen.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Kompakte Lösungen, Maximale Wirkung', description: 'Skalierbare Logistik für internationalen Handelserfolg.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Zuverlässiger Transport, Deutsche Präzision', description: 'Leistungsstarke LKW-Lösungen für pünktliche Lieferungen weltweit.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Intelligente Verpackung, Sichere Lieferung', description: 'Innovative Lösungen für sichere, effiziente und nachhaltige Logistik.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Hochgeschwindigkeitslogistik, Vertraute Qualität', description: 'Schienengüterlösungen für schnellen und kosteneffizienten Massentransport.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Industrielle Exzellenz, Unübertroffene Standards', description: 'Modernste Einrichtungen für großvolumige Produktion und Distribution.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Deutsche Automobil-Meisterschaft' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Spitzenelektronik' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Fortgeschrittene Chemielösungen' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Technische Innovation' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Premium-Konsumgüter' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Exzellenz in Pharmazeutika' }
    ],
    featureBoxes: [
      { title: 'Qualität Gesichert', description: 'Jedes Produkt erfüllt deutsche Standards', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Globaler Versand', description: 'Schnelle und sichere weltweite Lieferung', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Premium-Unterstützung', description: '24/7 engagierter Kundenservice', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Zertifizierte Produkte', description: 'Alle Produkte erfüllen internationale Standards', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  es: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Precisión en Cada Envío', description: 'Logística optimizada y almacenamiento de primer nivel para la eficiencia del comercio global.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Comercio Global, Calidad Alemana', description: 'Fiabilidad e innovación impulsando las cadenas de suministro internacionales.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Soluciones de Almacenamiento Inteligente', description: 'Gestión avanzada de inventarios para operaciones B2B sin interrupciones.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Eficiencia en Movimiento', description: 'Manejo optimizado de carga para entregas globales fluidas y seguras.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Soluciones Compactas, Máximo Impacto', description: 'Logística escalable adaptada al éxito del comercio internacional.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Transporte Confiable, Precisión Alemana', description: 'Soluciones de transporte de alto rendimiento para entregas puntuales en todo el mundo.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Embalaje Inteligente, Entrega Segura', description: 'Soluciones innovadoras para una logística segura, eficiente y sostenible.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Logística de Alta Velocidad, Calidad Confiable', description: 'Soluciones de carga ferroviaria para un transporte masivo rápido y rentable.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Excelencia Industrial, Estándares Inigualables', description: 'Instalaciones de última generación para producción y distribución de gran volumen.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Maestría Automotriz Alemana' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Electrónica de Vanguardia' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Soluciones Químicas Avanzadas' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Innovación en Ingeniería' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Bienes de Consumo Premium' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Excelencia en Farmacéuticos' }
    ],
    featureBoxes: [
      { title: 'Calidad Garantizada', description: 'Cada producto cumple con los estándares alemanes', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Envío Global', description: 'Entrega rápida y segura a nivel mundial', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Soporte Premium', description: 'Servicio al cliente dedicado 24/7', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Productos Certificados', description: 'Todos los productos cumplen con estándares internacionales', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  fr: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Précision dans Chaque Expédition', description: 'Logistique rationalisée et entreposage de premier ordre pour une efficacité commerciale mondiale.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Commerce Mondial, Qualité Allemande', description: 'Fiabilité et innovation propulsant les chaînes d’approvisionnement internationales.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Solutions d’Entreposage Intelligentes', description: 'Gestion avancée des stocks assurant des opérations B2B fluides.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Efficacité en Mouvement', description: 'Manutention optimisée des marchandises pour des livraisons mondiales fluides et sécurisées.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Solutions Compactes, Impact Maximal', description: 'Logistique évolutive adaptée au succès du commerce international.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Transport Fiable, Précision Allemande', description: 'Solutions de camionnage performantes garantissant des livraisons à temps dans le monde entier.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Emballage Intelligent, Livraison Sûre', description: 'Solutions innovantes pour une logistique sûre, efficace et durable.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Logistique à Haute Vitesse, Qualité Fiable', description: 'Solutions de fret ferroviaire pour un transport en vrac rapide et économique.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Excellence Industrielle, Normes Inégalées', description: 'Installations de pointe pour la production et la distribution à grand volume.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Maîtrise Automobile Allemande' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Électronique de Pointe' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Solutions Chimiques Avancées' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Innovation en Ingénierie' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Produits de Consommation Premium' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Excellence en Pharmaceutique' }
    ],
    featureBoxes: [
      { title: 'Qualité Assurée', description: 'Chaque produit répond aux normes allemandes', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Expédition Mondiale', description: 'Livraison rapide et sécurisée dans le monde entier', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Support Premium', description: 'Service client dédié 24/7', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Produits Certifiés', description: 'Tous les produits répondent aux normes internationales', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  it: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Precisione in Ogni Spedizione', description: 'Logistica semplificata e magazzinaggio di alto livello per l’efficienza del commercio globale.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Commercio Globale, Qualità Tedesca', description: 'Affidabilità e innovazione che spingono avanti le catene di approvvigionamento internazionali.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Soluzioni di Magazzinaggio Intelligenti', description: 'Gestione avanzata delle scorte per operazioni B2B senza intoppi.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Efficienza in Movimento', description: 'Gestione ottimizzata del carico per consegne globali fluide e sicure.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Soluzioni Compatte, Massimo Impatto', description: 'Logistica scalabile su misura per il successo del commercio internazionale.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Trasporto Affidabile, Precisione Tedesca', description: 'Soluzioni di trasporto ad alte prestazioni per consegne puntuali in tutto il mondo.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Imballaggio Intelligente, Consegna Sicura', description: 'Soluzioni innovative per una logistica sicura, efficiente e sostenibile.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Logistica ad Alta Velocità, Qualità Affidabile', description: 'Soluzioni di trasporto ferroviario per un trasporto di massa veloce ed economico.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Eccellenza Industriale, Standard Ineguagliabili', description: 'Strutture all’avanguardia per produzione e distribuzione ad alto volume.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Maestria Automobilistica Tedesca' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Elettronica all’Avanguardia' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Soluzioni Chimiche Avanzate' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Innovazione Ingegneristica' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Beni di Consumo Premium' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Eccellenza nei Farmaceutici' }
    ],
    featureBoxes: [
      { title: 'Qualità Garantita', description: 'Ogni prodotto soddisfa gli standard tedeschi', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Spedizione Globale', description: 'Consegna rapida e sicura in tutto il mondo', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Supporto Premium', description: 'Servizio clienti dedicato 24/7', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Prodotti Certificati', description: 'Tutti i prodotti soddisfano gli standard internazionali', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  nl: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Precisie bij Elke Verzending', description: 'Gestroomlijnde logistiek en topklasse opslag voor wereldwijde handelsefficiëntie.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Wereldhandel, Duitse Kwaliteit', description: 'Betrouwbaarheid en innovatie drijven internationale toeleveringsketens vooruit.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Slimme Opslagoplossingen', description: 'Geavanceerd voorraadbeheer voor naadloze B2B-operaties.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Efficiëntie in Beweging', description: 'Geoptimaliseerde vrachtafhandeling voor soepele en veilige wereldwijde leveringen.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Compacte Oplossingen, Maximaal Effect', description: 'Schaalbare logistiek op maat voor internationaal handelssucces.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Betrouwbaar Transport, Duitse Precisie', description: 'Hoogwaardige vrachtwagenoplossingen die wereldwijd op tijd leveren.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Slim Verpakken, Veilige Levering', description: 'Innovatieve oplossingen voor veilige, efficiënte en duurzame logistiek.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Hogesnelheidslogistiek, Vertrouwde Kwaliteit', description: 'Spoorgoederenoplossingen voor snel en kosteneffectief bulktransport.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Industriële Excellentie, Ongeëvenaarde Standaarden', description: 'State-of-the-art faciliteiten voor productie en distributie op grote schaal.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Duitse Automobielmeesterschap' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Geavanceerde Elektronica' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Geavanceerde Chemische Oplossingen' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Technische Innovatie' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Premium Consumentengoederen' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Excellentie in Farmaceutica' }
    ],
    featureBoxes: [
      { title: 'Kwaliteit Gegarandeerd', description: 'Elk product voldoet aan Duitse normen', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Wereldwijde Verzending', description: 'Snelle en veilige levering wereldwijd', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Premium Ondersteuning', description: '24/7 toegewijde klantenservice', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Gecertificeerde Producten', description: 'Alle producten voldoen aan internationale normen', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  sa: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'الدقة في كل شحنة', description: 'لوجستيات مبسطة وتخزين عالي الجودة لكفاءة التجارة العالمية.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'التجارة العالمية، الجودة الألمانية', description: 'الموثوقية والابتكار يدفعان سلاسل التوريد الدولية إلى الأمام.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'حلول التخزين الذكية', description: 'إدارة مخزون متقدمة لضمان عمليات B2B سلسة.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'الكفاءة في الحركة', description: 'معالجة الشحنات المثلى لتسليم عالمي سلس وآمن.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'حلول مدمجة، تأثير كبير', description: 'لوجستيات قابلة للتطوير مصممة لنجاح التجارة الدولية.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'نقل موثوق، دقة ألمانية', description: 'حلول نقل عالية الأداء تضمن التسليم في الوقت المحدد عالميًا.' },
      { image: '/hero/made-in-germany-box.webp', title: 'تغليف ذكي، تسليم آمن', description: 'حلول مبتكرة للوجستيات آمنة وفعالة ومستدامة.' },
      { image: '/hero/made-in-germany-train.webp', title: 'لوجستيات عالية السرعة، جودة موثوقة', description: 'حلول شحن السكك الحديدية لنقل كميات كبيرة بسرعة وتكلفة مناسبة.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'التميز الصناعي، معايير لا مثيل لها', description: 'مرافق حديثة للإنتاج والتوزيع بكميات كبيرة.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'إتقان السيارات الألمانية' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'إلكترونيات متطورة' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'حلول كيميائية متقدمة' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'ابتكار هندسي' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'سلع استهلاكية متميزة' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'التميز في الأدوية' }
    ],
    featureBoxes: [
      { title: 'جودة مضمونة', description: 'كل منتج يلبي المعايير الألمانية', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'شحن عالمي', description: 'تسليم سريع وآمن عالميًا', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'دعم متميز', description: 'خدمة عملاء مخصصة 24/7', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'منتجات معتمدة', description: 'جميع المنتجات تلبي المعايير الدولية', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  ae: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'الدقة في كل شحنة', description: 'لوجستيات مبسطة وتخزين عالي الجودة لكفاءة التجارة العالمية.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'التجارة العالمية، الجودة الألمانية', description: 'الموثوقية والابتكار يدفعان سلاسل التوريد الدولية إلى الأمام.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'حلول التخزين الذكية', description: 'إدارة مخزون متقدمة لضمان عمليات B2B سلسة.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'الكفاءة في الحركة', description: 'معالجة الشحنات المثلى لتسليم عالمي سلس وآمن.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'حلول مدمجة، تأثير كبير', description: 'لوجستيات قابلة للتطوير مصممة لنجاح التجارة الدولية.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'نقل موثوق، دقة ألمانية', description: 'حلول نقل عالية الأداء تضمن التسليم في الوقت المحدد عالميًا.' },
      { image: '/hero/made-in-germany-box.webp', title: 'تغليف ذكي، تسليم آمن', description: 'حلول مبتكرة للوجستيات آمنة وفعالة ومستدامة.' },
      { image: '/hero/made-in-germany-train.webp', title: 'لوجستيات عالية السرعة، جودة موثوقة', description: 'حلول شحن السكك الحديدية لنقل كميات كبيرة بسرعة وتكلفة مناسبة.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'التميز الصناعي، معايير لا مثيل لها', description: 'مرافق حديثة للإنتاج والتوزيع بكميات كبيرة.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'إتقان السيارات الألمانية' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'إلكترونيات متطورة' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'حلول كيميائية متقدمة' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'ابتكار هندسي' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'سلع استهلاكية متميزة' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'التميز في الأدوية' }
    ],
    featureBoxes: [
      { title: 'جودة مضمونة', description: 'كل منتج يلبي المعايير الألمانية', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'شحن عالمي', description: 'تسليم سريع وآمن عالميًا', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'دعم متميز', description: 'خدمة عملاء مخصصة 24/7', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'منتجات معتمدة', description: 'جميع المنتجات تلبي المعايير الدولية', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  hk: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: '每件貨物的精準', description: '簡化的物流和頂級倉儲，提升全球貿易效率。' },
      { image: '/hero/made-in-germany-container-ship.webp', title: '全球貿易，德國品質', description: '可靠性和創新推動國際供應鏈前進。' },
      { image: '/hero/made-in-germany-warehouse.webp', title: '智能倉儲解決方案', description: '先進的庫存管理，確保無縫B2B運作。' },
      { image: '/hero/made-in-germany-cargo.webp', title: '高效運輸', description: '優化的貨物處理，實現順暢安全的全球交付。' },
      { image: '/hero/made-in-germany-small-container.webp', title: '緊湊解決方案，最大影響', description: '可擴展的物流，專為國際貿易成功量身定制。' },
      { image: '/hero/made-in-germany-truck.webp', title: '可靠運輸，德國精準', description: '高效卡車解決方案，確保全球準時交付。' },
      { image: '/hero/made-in-germany-box.webp', title: '智能包裝，安全交付', description: '創新解決方案，實現安全、高效和可持續的物流。' },
      { image: '/hero/made-in-germany-train.webp', title: '高速物流，可信品質', description: '鐵路貨運解決方案，實現快速且成本效益高的批量運輸。' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: '工業卓越，無與倫比的標準', description: '最先進的設施，滿足大規模生產和分銷需求。' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: '德國汽車精湛技藝' },
      { image: '/hero/made-in-germany-electronics.webp', title: '尖端電子產品' },
      { image: '/hero/made-in-germany-chemical.webp', title: '先進化學解決方案' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: '工程創新' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: '高端消費品' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: '製藥卓越' }
    ],
    featureBoxes: [
      { title: '品質保證', description: '每件產品均符合德國標準', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: '全球運輸', description: '快速安全的全球配送', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: '優質支援', description: '24/7專屬客戶服務', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: '認證產品', description: '所有產品符合國際標準', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  tw: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: '每件貨物的精準', description: '簡化的物流和頂級倉儲，提升全球貿易效率。' },
      { image: '/hero/made-in-germany-container-ship.webp', title: '全球貿易，德國品質', description: '可靠性和創新推動國際供應鏈前進。' },
      { image: '/hero/made-in-germany-warehouse.webp', title: '智能倉儲解決方案', description: '先進的庫存管理，確保無縫B2B運作。' },
      { image: '/hero/made-in-germany-cargo.webp', title: '高效運輸', description: '優化的貨物處理，實現順暢安全的全球交付。' },
      { image: '/hero/made-in-germany-small-container.webp', title: '緊湊解決方案，最大影響', description: '可擴展的物流，專為國際貿易成功量身定制。' },
      { image: '/hero/made-in-germany-truck.webp', title: '可靠運輸，德國精準', description: '高效卡車解決方案，確保全球準時交付。' },
      { image: '/hero/made-in-germany-box.webp', title: '智能包裝，安全交付', description: '創新解決方案，實現安全、高效和可持續的物流。' },
      { image: '/hero/made-in-germany-train.webp', title: '高速物流，可信品質', description: '鐵路貨運解決方案，實現快速且成本效益高的批量運輸。' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: '工業卓越，無與倫比的標準', description: '最先進的設施，滿足大規模生產和分銷需求。' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: '德國汽車精湛技藝' },
      { image: '/hero/made-in-germany-electronics.webp', title: '尖端電子產品' },
      { image: '/hero/made-in-germany-chemical.webp', title: '先進化學解決方案' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: '工程創新' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: '高端消費品' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: '製藥卓越' }
    ],
    featureBoxes: [
      { title: '品質保證', description: '每件產品均符合德國標準', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: '全球運輸', description: '快速安全的全球配送', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: '優質支援', description: '24/7專屬客戶服務', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: '認證產品', description: '所有產品符合國際標準', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  sg: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: '每件货物的精准', description: '简化的物流和顶级仓储，提升全球贸易效率。' },
      { image: '/hero/made-in-germany-container-ship.webp', title: '全球贸易，德国品质', description: '可靠性和创新推动国际供应链前进。' },
      { image: '/hero/made-in-germany-warehouse.webp', title: '智能仓储解决方案', description: '先进的库存管理，确保无缝B2B运作。' },
      { image: '/hero/made-in-germany-cargo.webp', title: '高效运输', description: '优化的货物处理，实现顺畅安全的全球交付。' },
      { image: '/hero/made-in-germany-small-container.webp', title: '紧凑解决方案，最大影响', description: '可扩展的物流，专为国际贸易成功量身定制。' },
      { image: '/hero/made-in-germany-truck.webp', title: '可靠运输，德国精准', description: '高效卡车解决方案，确保全球准时交付。' },
      { image: '/hero/made-in-germany-box.webp', title: '智能包装，安全交付', description: '创新解决方案，实现安全、高效和可持续的物流。' },
      { image: '/hero/made-in-germany-train.webp', title: '高速物流，可信品质', description: '铁路货运解决方案，实现快速且成本效益高的批量运输。' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: '工业卓越，无与伦比的标准', description: '最先进的设施，满足大规模生产和分销需求。' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: '德国汽车精湛技艺' },
      { image: '/hero/made-in-germany-electronics.webp', title: '尖端电子产品' },
      { image: '/hero/made-in-germany-chemical.webp', title: '先进化学解决方案' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: '工程创新' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: '高端消费品' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: '製药卓越' }
    ],
    featureBoxes: [
      { title: '品质保证', description: '每件产品均符合德国标准', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: '全球运输', description: '快速安全的全球配送', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: '优质支持', description: '24/7专属客户服务', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: '认证产品', description: '所有产品符合国际标准', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  },
  za: {
    mainSlides: [
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Presisie in Elke Versending', description: 'Gestroomlynde logistiek en topklas pakhuise vir globale handelseffektiwiteit.' },
      { image: '/hero/made-in-germany-container-ship.webp', title: 'Globale Handel, Duitse Kwaliteit', description: 'Betroubaarheid en innovasie dryf internasionale voorsieningskettings vorentoe.' },
      { image: '/hero/made-in-germany-warehouse.webp', title: 'Slimme Pakhuisoplossings', description: 'Gevorderde voorraadbestuur wat naatlose B2B-bedrywighede verseker.' },
      { image: '/hero/made-in-germany-cargo.webp', title: 'Effektiwiteit in Beweging', description: 'Geoptimaliseerde vraghantering vir gladde en veilige globale aflewerings.' },
      { image: '/hero/made-in-germany-small-container.webp', title: 'Kompakte Oplossings, Maksimum Impak', description: 'Skaalbare logistiek aangepas vir internasionale handelssukses.' },
      { image: '/hero/made-in-germany-truck.webp', title: 'Betroubare Vervoer, Duitse Presisie', description: 'Hoëprestasie vragmotoroplossings wat wêreldwyd betyds aflewer.' },
      { image: '/hero/made-in-germany-box.webp', title: 'Slimme Verpakking, Veilige Aflewering', description: 'Innoverende oplossings vir veilige, doeltreffende en volhoubare logistiek.' },
      { image: '/hero/made-in-germany-train.webp', title: 'Hoëspoedlogistiek, Betroubare Kwaliteit', description: 'Spoorvragoplossings vir vinnige en kostedoeltreffende grootmaatvervoer.' },
      { image: '/hero/made-in-germany-warehouse-hall.webp', title: 'Industriële Uitnemendheid, Ongeëwenaarde Standaarde', description: 'Voorpunt-fasiliteite vir hoëvolume produksie en verspreiding.' }
    ],
    sideSlides: [
      { image: '/hero/made-in-germany-automobiles.webp', title: 'Duitse Motorvaardigheid' },
      { image: '/hero/made-in-germany-electronics.webp', title: 'Voorpunt Elektronika' },
      { image: '/hero/made-in-germany-chemical.webp', title: 'Gevorderde Chemiese Oplossings' },
      { image: '/hero/made-in-germany-engineering-machinery.webp', title: 'Ingenieursinnovasie' },
      { image: '/hero/made-in-germany-consumer-goods.webp', title: 'Premium Verbruikersgoedere' },
      { image: '/hero/made-in-germany-pharmacy.webp', title: 'Uitnemendheid in Farmaseutika' }
    ],
    featureBoxes: [
      { title: 'Kwaliteit Verseker', description: 'Elke produk voldoen aan Duitse standaarde', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80' },
      { title: 'Globale Versending', description: 'Vinnige en veilige wêreldwye aflewering', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80' },
      { title: 'Premium Ondersteuning', description: '24/7 toegewyde kliëntediens', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80' },
      { title: 'Gesertifiseerde Produkte', description: 'Alle produkte voldoen aan internasionale standaarde', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
    ]
  }
};

// CarouselIndicators Component
const CarouselIndicators = ({ total, current, onClick, className }: { total: number; current: number; onClick: (index: number) => void; className: string }) => (
  <div className={`flex gap-2 sm:gap-3 ${className}`}>
    {Array.from({ length: total }).map((_, index) => {
      const isActive = index === current;
      let bgColor = index % 3 === 0 ? (isActive ? 'bg-black' : 'bg-black/60') :
                    index % 3 === 1 ? (isActive ? 'bg-red-600' : 'bg-red-600/60') :
                    (isActive ? 'bg-yellow-500' : 'bg-yellow-500/60');
      
      return (
        <button
          key={index}
          onClick={() => onClick(index)}
          className={`group relative h-1 w-8 sm:w-12 rounded-full overflow-hidden transition-all duration-500 ease-in-out 
            ${isActive ? 'w-10 sm:w-16' : 'hover:w-10 sm:hover:w-14'} ${bgColor}`}
          aria-label={`Go to slide ${index + 1}`}
        >
          <div
            className={`absolute inset-0 w-full ${isActive ? 'animate-progress' : ''}`}
            style={{
              background: `linear-gradient(to right, 
                ${index % 3 === 0 ? 'rgba(0,0,0,0.8)' : 
                  index % 3 === 1 ? 'rgba(220,0,0,0.8)' : 
                  'rgba(255,206,0,0.8)'
                }, transparent)`,
              transform: isActive ? 'translateX(-100%)' : 'translateX(0)',
            }}
          />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      );
    })}
  </div>
);

export default function HeroSection({ language = 'en' }: HeroSectionProps) {
  const [mainSlideIndex, setMainSlideIndex] = useState(0);
  const [sideSlideIndex, setSideSlideIndex] = useState(0);
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setMainSlideIndex((prev) => (prev + 1) % translations.mainSlides.length);
    }, 5000);

    const sideInterval = setInterval(() => {
      setSideSlideIndex((prev) => (prev + 1) % translations.sideSlides.length);
    }, 5000);

    return () => {
      clearInterval(mainInterval);
      clearInterval(sideInterval);
    };
  }, [translations.mainSlides.length, translations.sideSlides.length]);

  return (
    <div className="bg-gradient-to-br from-white to-white mb-10">
      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .animate-progress {
          animation: progress 5s linear infinite;
        }
      `}</style>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8">
        <div className="flex flex-col gap-0">
          {/* Top Section: MegaMenu and Sliders */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* MegaMenu */}
            <div className="relative w-full lg:w-72 z-10">
              <MegaMenu />
            </div>
            
            {/* Main Slider */}
            <div className="flex-1">
              <div className="relative w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden">
                {translations.mainSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform 
                      ${index === mainSlideIndex ? 
                        'opacity-100 translate-x-0' : 
                        index < mainSlideIndex ? 
                          'opacity-0 -translate-x-full' : 
                          'opacity-0 translate-x-full'
                      }`}
                  >
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8">
                      <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
                        {slide.title}
                      </h2>
                      <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/80 transform transition-all duration-700 delay-300 translate-y-0 opacity-100">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                ))}
                <CarouselIndicators
                  total={translations.mainSlides.length}
                  current={mainSlideIndex}
                  onClick={setMainSlideIndex}
                  className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 py-2 rounded-full"
                />
              </div>
            </div>

            {/* Side Slider */}
            <div className="w-full lg:w-72">
              <div className="relative w-full h-[150px] xs:h-[180px] sm:h-[200px] md:h-[250px] lg:h-[400px] rounded-xl overflow-hidden">
                {translations.sideSlides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 transform
                      ${index === sideSlideIndex ? 
                        'opacity-100 scale-100' : 
                        'opacity-0 scale-110'}`}
                  >
                    <img 
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3 sm:p-4">
                      <h3 className="text-base xs:text-lg sm:text-xl font-bold text-white transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                ))}
                <CarouselIndicators
                  total={translations.sideSlides.length}
                  current={sideSlideIndex}
                  onClick={setSideSlideIndex}
                  className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-4 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Feature Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-6">
            {translations.featureBoxes.map((box, index) => (
              <div
                key={index}
                className="relative w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden"
                style={{
                  backgroundImage: `url(${box.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#151925]" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-[#151925]">
                  <div className="flex flex-col items-center text-white">
                    <h3 className="text-xs sm:text-sm md:text-base font-medium mb-0.5 sm:mb-1 text-center">{box.title}</h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-white/80 text-center">{box.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}