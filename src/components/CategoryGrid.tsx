import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Shield, CreditCard, Ban, Zap, Smartphone, Plane, 
  Hotel, Dumbbell, Heart, UtensilsCrossed, Home, Gift, Shirt, 
  Wine, Tv, Briefcase, Watch, Bike, Baby 
} from 'lucide-react';

// Define props interface for CategoryGrid
interface CategoryGridProps {
  language?: string;
}

// Define translations for CategoryGrid content in German
const TRANSLATIONS: Record<string, {
  categories: Array<{
    title: string;
    details: string[];
  }>;
}> = {
  de: {
    categories: [
      { 
        title: 'Automobilindustrie',
        details: [
          'Erleben Sie deutsche Ingenieurskunst mit unserer MADE IN GERMANY © Automobilindustrie, vertreten durch vertrauenswürdige Marken wie Mercedes-Benz.',
          'Unsere hochwertigen MADE IN GERMANY © Luxusfahrzeuge bieten Premium-Autos für die Elite der arabischen Welt.',
          'MADE IN GERMANY © Nutzfahrzeuge von MAN liefern zuverlässige deutsche Lastwagen für Afrikas anspruchsvolle Logistik.',
          'Investieren Sie in MADE IN GERMANY © Luxusautos wie BMW, gebaut mit deutscher Fahrzeughaltbarkeit für Asiens Märkte.',
          'Vertrauenswürdige deutsche Marken wie Volkswagen bieten MADE IN GERMANY © Exporte mit deutscher Automobil-Exzellenz für städtische Gebiete.',
          'Fahren Sie Premium-Autos von Audi, hochwertig MADE IN GERMANY ©, perfekt für Afrikas raue Straßen mit deutscher Qualität.',
          'Unsere MADE IN GERMANY © zuverlässigen deutschen Lastwagen zeigen deutsche Präzisionsprodukte für den Schwerlasttransport der arabischen Welt.',
          'Wählen Sie hochwertige MADE IN GERMANY © Elektro-Luxusfahrzeuge wie den BMW i4, eine Wahl führender deutscher Hersteller für Asien.',
          'Bosch und Continental bringen MADE IN GERMANY © Komponenten mit deutschen B2B-Lösungen und Automobil-Exzellenz weltweit.',
          'Mit deutscher Ingenieurskunst erfüllen unsere hochwertigen MADE IN GERMANY © Fahrzeuge globale Anforderungen an Premium-Autos.'
        ]
      },
      { 
        title: 'Erneuerbare Energien (Solartechnik)',
        details: [
          'Nutzen Sie deutsche Ingenieurskunst mit unserer MADE IN GERMANY © Kategorie Erneuerbare Energien, vertreten durch vertrauenswürdige Marken wie SMA Solar.',
          'Unsere hochwertige MADE IN GERMANY © Solartechnik bietet MADE IN GERMANY © Solarmodule für Afrikas ländliche Elektrifizierung.',
          'Vertrauenswürdige deutsche Marken wie Siemens Energy bieten deutsche Nachhaltigkeit mit MADE IN GERMANY © Solarenergie für Asien.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Q CELLS, die deutsche Solarinnovation in MADE IN GERMANY © Exporten für Wüsten zeigen.',
          'MADE IN GERMANY © Solarwatt liefert zuverlässige deutsche Solarsysteme mit deutschen Präzisionsprodukten für Asiens grüne Märkte.',
          'Entdecken Sie MADE IN GERMANY © Solarenergie von Heckert Solar, die deutsche Qualität für Afrikas netzunabhängige Lösungen gewährleistet.',
          'Vertrauenswürdige deutsche Marken wie Fronius bieten hochwertige MADE IN GERMANY © Wechselrichter für MADE IN GERMANY © Solarmodule weltweit.',
          'Steigern Sie die Effizienz mit deutscher Ingenieurskunst in BayWa r.e.’s MADE IN GERMANY © zuverlässigen deutschen Solarsystemen für Asien.',
          'Wählen Sie hochwertige MADE IN GERMANY © Wacker Chemie für MADE IN GERMANY © Exporte, ein führender deutscher Hersteller.',
          'Unsere MADE IN GERMANY © Solartechnik stärkt B2B-Käufer mit deutschen B2B-Lösungen und deutscher Solarinnovation.'
        ]
      },
      { 
        title: 'Medizintechnik',
        details: [
          'Verbessern Sie die Versorgung mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Medizintechnik-Kategorie, vertreten durch vertrauenswürdige Marken wie Siemens Healthineers.',
          'Unsere hochwertige MADE IN GERMANY © deutsche Medizintechnik bietet MADE IN GERMANY © Medizinprodukte für Asiens Krankenhäuser.',
          'Vertrauenswürdige deutsche Marken wie Fresenius liefern Präzisionsgesundheit mit MADE IN GERMANY © Gesundheitslösungen für Afrikas Kliniken.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Dräger-Ventilatoren, eine zuverlässige deutsche MedTech-Lösung für die arabische Welt.',
          'MADE IN GERMANY © Medizinprodukte von Carl Zeiss zeigen deutsche Gesundheitsinnovation mit deutscher Qualität.',
          'Unsere deutsche Medizintechnik bietet hochwertige MADE IN GERMANY © B. Braun-Sets für MADE IN GERMANY © Exporte in Afrika.',
          'Vertrauenswürdige deutsche Marken wie KARL STORZ bringen MADE IN GERMANY © Medizinprodukte für deutsche Präzisionsprodukte weltweit.',
          'Verbessern Sie Ergebnisse mit deutscher Ingenieurskunst in Ottobock’s MADE IN GERMANY © zuverlässiger deutscher MedTech für Mobilität.',
          'Wählen Sie hochwertige MADE IN GERMANY © Eppendorf für deutsche B2B-Lösungen in MADE IN GERMANY © Medizinprodukten.',
          'Mit MADE IN GERMANY © Gesundheitslösungen stellen unsere führenden deutschen Hersteller sicher, dass deutsche Medizintechnik für B2B hervorragt.'
        ]
      },
      { 
        title: 'Babyprodukte & -nahrung',
        details: [
          'Pflegen Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Kategorie Babyprodukte & -nahrung, vertreten durch vertrauenswürdige Marken wie HiPP.',
          'Unsere hochwertige MADE IN GERMANY © Babykost bietet MADE IN GERMANY © Säuglingsnahrung für Afrikas Babys.',
          'Vertrauenswürdige deutsche Marken wie Milupa bieten MADE IN GERMANY © Babyprodukte mit deutscher Ernährung für Asiens Kleinkinder.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Holle, eine erstklassige deutsche Ernährungswahl für MADE IN GERMANY © Exporte weltweit.',
          'MADE IN GERMANY © NUK-Flaschen liefern deutsche Ingenieurskunst und hochwertige MADE IN GERMANY © für deutsche Babyqualität.',
          'Unsere hochwertige Babykost von Bebivita gewährleistet MADE IN GERMANY © Säuglingsnahrung mit deutschen B2B-Lösungen.',
          'Vertrauenswürdige deutsche Marken wie Weleda bieten hochwertige MADE IN GERMANY © Babyprodukte für die Hautpflege.',
          'Steigern Sie die Sicherheit mit MADE IN GERMANY © Penaten, das deutsche Babypflege und führende deutsche Hersteller für Afrika verkörpert.',
          'Wählen Sie hochwertige MADE IN GERMANY © Pampers-Windeln, ein Marktführer bei MADE IN GERMANY © Babyprodukten mit deutschen Präzisionsprodukten.',
          'Mit deutscher Ernährung bietet unser MADE IN GERMANY © Sortiment deutsche Qualität für globale B2B-Märkte.'
        ]
      },
      { 
        title: 'Luxusgüter',
        details: [
          'Genießen Sie deutsche Ingenieurskunst mit unserer MADE IN GERMANY © Luxusgüter-Kategorie, vertreten durch vertrauenswürdige Marken wie Montblanc.',
          'Unsere hochwertigen MADE IN GERMANY © Luxusgüter bieten MADE IN GERMANY © Luxusartikel für die Elite der arabischen Welt.',
          'Vertrauenswürdige deutsche Marken wie Porsche Design liefern deutsche Luxushandwerkskunst mit MADE IN GERMANY © Luxusmarken.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Hugo Boss, eine erstklassige deutsche Luxuswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Luxusmarken von Rimowa zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Reiseprodukte.',
          'Unsere Luxusgüter bieten MADE IN GERMANY © Leica-Kameras mit deutschen Prestigeprodukten für Afrikas Kreative.',
          'Vertrauenswürdige deutsche Marken wie A. Lange & Söhne bieten hochwertige MADE IN GERMANY © Uhren für deutsche Qualität.',
          'Erleben Sie deutsche Ingenieurskunst in Meissen’s MADE IN GERMANY © Luxusartikeln, ein Symbol führender deutscher Hersteller für Asien.',
          'Wählen Sie hochwertige MADE IN GERMANY © Zwilling, ein Grundpfeiler der MADE IN GERMANY © Luxusmarken mit deutschen B2B-Lösungen.',
          'Mit deutschen Prestigeprodukten heben unsere MADE IN GERMANY © Luxusgüter B2B-Luxusmärkte weltweit an.'
        ]
      },
      { 
        title: 'Sportausrüstung',
        details: [
          'Hervorragend mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Sportausrüstung-Kategorie, vertreten durch vertrauenswürdige Marken wie Adidas.',
          'Unsere hochwertige MADE IN GERMANY © Sportausrüstung bietet MADE IN GERMANY © Sportgeräte für Afrikas Athleten.',
          'Vertrauenswürdige deutsche Marken wie Puma liefern deutsche Sportinnovation mit MADE IN GERMANY © Sportbekleidung für Asien.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Uvex, eine erstklassige deutsche Sportbekleidungswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Sportbekleidung von Bauerfeind zeigt deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Unterstützung.',
          'Unsere Sportausrüstung bietet MADE IN GERMANY © Jako mit deutscher Sportqualität für Asiens Teams.',
          'Vertrauenswürdige deutsche Marken wie Kettler bieten hochwertige MADE IN GERMANY © Sportgeräte für Fitness.',
          'Steigern Sie die Leistung mit MADE IN GERMANY © Canyon-Fahrrädern, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Völkl, das deutsche B2B-Lösungen in MADE IN GERMANY © Sportbekleidung verkörpert.',
          'Mit deutscher Sportinnovation treibt unsere MADE IN GERMANY © Sportausrüstung B2B-Sportmärkte an.'
        ]
      },
      { 
        title: 'Maschinenbau & Ingenieurwesen',
        details: [
          'Bauen Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Maschinenbau & Ingenieurwesen-Kategorie, vertreten durch vertrauenswürdige Marken wie Siemens.',
          'Unsere hochwertige MADE IN GERMANY © Maschinen bieten MADE IN GERMANY © Maschinen für Asiens industrielle Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Bosch Rexroth liefern deutsche Industriepräzision mit MADE IN GERMANY © Industriegeräten.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Krones, eine erstklassige deutsche Ausrüstungswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Industriegeräte von GEA zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Verarbeitung.',
          'Unsere Maschinen bieten MADE IN GERMANY © Trumpf mit deutscher Maschinenbauexzellenz für Afrikas Werkstätten.',
          'Vertrauenswürdige deutsche Marken wie Festo bieten hochwertige MADE IN GERMANY © Maschinen für Pneumatik.',
          'Verbessern Sie die Produktion mit MADE IN GERMANY © Liebherr-Kranen, ein führender deutscher Hersteller mit deutscher Qualität.',
          'Wählen Sie hochwertige MADE IN GERMANY © Jungheinrich, das deutsche B2B-Lösungen in MADE IN GERMANY © Industriegeräten verkörpert.',
          'Mit deutscher Maschinenbauexzellenz treibt unsere MADE IN GERMANY © Maschinen B2B-industriellen Erfolg weltweit an.'
        ]
      },
      { 
        title: 'Chemie & Pharma',
        details: [
          'Innovieren Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Chemie & Pharma-Kategorie, vertreten durch vertrauenswürdige Marken wie BASF.',
          'Unsere hochwertige MADE IN GERMANY © Chemikalien bieten MADE IN GERMANY © Chemikalien für Asiens Industriesektoren.',
          'Vertrauenswürdige deutsche Marken wie Bayer liefern deutsche Pharma-Exzellenz mit MADE IN GERMANY © Pharma-Lösungen für Afrika.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Merck, eine erstklassige deutsche Medikamentenwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Pharma-Lösungen von Evonik zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Spezialitäten.',
          'Unsere Pharma-Produkte bieten MADE IN GERMANY © Boehringer mit deutscher chemischer Innovation für Afrikas Gesundheit.',
          'Vertrauenswürdige deutsche Marken wie Henkel bieten hochwertige MADE IN GERMANY © Chemikalien für Klebstoffe.',
          'Fördern Sie das Wohlbefinden mit MADE IN GERMANY © Beiersdorf, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Symrise, das deutsche B2B-Lösungen in MADE IN GERMANY © Pharma-Lösungen verkörpert.',
          'Mit deutscher Pharma-Exzellenz bedient unsere MADE IN GERMANY © Pharmaindustrie globale B2B-Gesundheitsmärkte.'
        ]
      },
      { 
        title: 'Elektrotechnik',
        details: [
          'Elektrisieren Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Elektrotechnik-Kategorie, vertreten durch vertrauenswürdige Marken wie Siemens.',
          'Unsere hochwertige MADE IN GERMANY © Elektrotechnik bietet MADE IN GERMANY © elektrische Systeme für Asiens Stromnetze.',
          'Vertrauenswürdige deutsche Marken wie Phoenix Contact liefern deutsche Energieinnovation mit MADE IN GERMANY © Energielösungen.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Hager, eine erstklassige deutsche Elektronikwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Energielösungen von Rittal zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Gehäuse.',
          'Unsere Elektrotechnik bietet MADE IN GERMANY © Lapp mit deutscher elektrischer Präzision für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Osram bieten hochwertige MADE IN GERMANY © elektrische Systeme für Beleuchtung.',
          'Energie mit MADE IN GERMANY © Busch-Jaeger, ein führender deutscher Hersteller mit deutscher Qualität.',
          'Wählen Sie hochwertige MADE IN GERMANY © AEG, das deutsche B2B-Lösungen in MADE IN GERMANY © Energielösungen verkörpert.',
          'Mit deutscher Energieinnovation unterstützt unsere MADE IN GERMANY © Elektrotechnik B2B-Infrastruktur.'
        ]
      },
      { 
        title: 'Lebensmittel & Getränke',
        details: [
          'Genießen Sie deutsche Ingenieurskunst in unserer MADE IN GERMANY © Lebensmittel & Getränke-Kategorie, vertreten durch vertrauenswürdige Marken wie Dr. Oetker.',
          'Unsere hochwertige MADE IN GERMANY © Lebensmittel & Getränke bieten MADE IN GERMANY © Lebensmittelprodukte für Asiens Küchen.',
          'Vertrauenswürdige deutsche Marken wie Radeberger liefern deutsche kulinarische Exzellenz mit MADE IN GERMANY © kulinarischen Waren.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Dallmayr, eine erstklassige deutsche Geschmackswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © kulinarische Waren von Haribo zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Süßigkeiten.',
          'Unsere Lebensmittel & Getränke bieten MADE IN GERMANY © Ritter Sport mit deutscher Lebensmittelqualität für Afrikas Märkte.',
          'Vertrauenswürdige deutsche Marken wie Bahlsen bieten hochwertige MADE IN GERMANY © Lebensmittelprodukte für Kekse.',
          'Verbessern Sie den Geschmack mit MADE IN GERMANY © Kühne, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © WMF, das deutsche B2B-Lösungen in MADE IN GERMANY © kulinarischen Waren verkörpert.',
          'Mit deutscher kulinarischer Exzellenz begeistern unsere MADE IN GERMANY © Lebensmittel & Getränke B2B-kulinarische Märkte.'
        ]
      },
      { 
        title: 'Baumaterialien',
        details: [
          'Bauen Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Baumaterialien-Kategorie, vertreten durch vertrauenswürdige Marken wie HeidelbergCement.',
          'Unsere hochwertige MADE IN GERMANY © Baumaterialien bieten MADE IN GERMANY © Bauprodukte für Asiens Projekte.',
          'Vertrauenswürdige deutsche Marken wie Knauf liefern deutsche Bauexzellenz mit MADE IN GERMANY © Baulösungen.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Sto, eine erstklassige deutsche Materialwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Baulösungen von Schüco zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Produkte.',
          'Unsere Baumaterialien bieten MADE IN GERMANY © Hörmann mit deutscher Bauqualität für Afrikas Bauprojekte.',
          'Vertrauenswürdige deutsche Marken wie Wienerberger bieten hochwertige MADE IN GERMANY © Bauprodukte.',
          'Verstärken Sie mit MADE IN GERMANY © Sika, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Peri, das deutsche B2B-Lösungen in MADE IN GERMANY © Baulösungen verkörpert.',
          'Mit deutscher Bauexzellenz unterstützen unsere MADE IN GERMANY © Baumaterialien B2B-Projekte.'
        ]
      },
      { 
        title: 'Textilien & Bekleidung',
        details: [
          'Stilvoll mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Textilien & Bekleidung-Kategorie, vertreten durch vertrauenswürdige Marken wie Hugo Boss.',
          'Unsere hochwertige MADE IN GERMANY © Textilien & Bekleidung bieten MADE IN GERMANY © Mode für Asiens Märkte.',
          'Vertrauenswürdige deutsche Marken wie Adidas liefern deutsche Textilinnovation mit MADE IN GERMANY © Bekleidung für Afrika.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Puma, eine erstklassige deutsche Kleidungswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Bekleidung von Trigema zeigt deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Basics.',
          'Unsere Textilien & Bekleidung bieten MADE IN GERMANY © Marc O’Polo mit deutscher Modequalität für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Jack Wolfskin bieten hochwertige MADE IN GERMANY © Mode für Outdoor-Aktivitäten.',
          'Heben Sie sich ab mit MADE IN GERMANY © S.Oliver, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Strellson, das deutsche B2B-Lösungen in MADE IN GERMANY © Bekleidung verkörpert.',
          'Mit deutscher Textilinnovation verbessern unsere MADE IN GERMANY © Textilien & Bekleidung B2B-Mode.'
        ]
      },
      { 
        title: 'Möbel & Haushalt',
        details: [
          'Einrichten mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Möbel & Haushalt-Kategorie, vertreten durch vertrauenswürdige Marken wie Hülsta.',
          'Unsere hochwertige MADE IN GERMANY © Möbel & Haushalt bieten MADE IN GERMANY © Haushaltswaren für Asiens Häuser.',
          'Vertrauenswürdige deutsche Marken wie Bulthaup liefern deutsche Design-Exzellenz mit MADE IN GERMANY © Haushaltsartikeln.',
          'Investieren Sie in hochwertige MADE IN GERMANY © WMF, eine erstklassige deutsche Einrichtungswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Haushaltsartikel von Zwilling zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Produkte.',
          'Unsere Möbel & Haushalt bieten MADE IN GERMANY © Villeroy & Boch mit deutscher Haushaltsqualität für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Nolte bieten hochwertige MADE IN GERMANY © Haushaltswaren für Schränke.',
          'Verbessern Sie mit MADE IN GERMANY © Hansgrohe, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Duravit, das deutsche B2B-Lösungen in MADE IN GERMANY © Haushaltsartikeln verkörpert.',
          'Mit deutscher Design-Exzellenz bereichern unsere MADE IN GERMANY © Möbel & Haushalt B2B-Häuser.'
        ]
      },
      { 
        title: 'Logistik & Transport',
        details: [
          'Bewegen Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Logistik & Transport-Kategorie, vertreten durch vertrauenswürdige Marken wie DHL.',
          'Unsere hochwertige MADE IN GERMANY © Logistik & Transport bieten MADE IN GERMANY © Logistiklösungen für Asiens Handel.',
          'Vertrauenswürdige deutsche Marken wie DB Schenker liefern deutsche Transportpräzision mit MADE IN GERMANY © Transportdiensten.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Lufthansa Cargo, eine erstklassige deutsche Versandwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Transportdienste von Kuehne+Nagel zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Lösungen.',
          'Unsere Logistik & Transport bieten MADE IN GERMANY © Hellmann mit deutscher Logistikexzellenz für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Deutsche Bahn bieten hochwertige MADE IN GERMANY © Logistiklösungen.',
          'Optimieren Sie mit MADE IN GERMANY © Hapag-Lloyd, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Rhenus, das deutsche B2B-Lösungen in MADE IN GERMANY © Transportdiensten verkörpert.',
          'Mit deutscher Transportpräzision optimieren unsere MADE IN GERMANY © Logistik & Transport B2B-Lieferketten.'
        ]
      },
      { 
        title: 'IT & Software',
        details: [
          'Innovieren Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © IT & Software-Kategorie, vertreten durch vertrauenswürdige Marken wie SAP.',
          'Unsere hochwertige MADE IN GERMANY © IT & Software bieten MADE IN GERMANY © Softwarelösungen für Asiens Unternehmen.',
          'Vertrauenswürdige deutsche Marken wie Siemens Digital liefern deutsche Technologieinnovation mit MADE IN GERMANY © Technologielösungen.',
          'Investieren Sie in hochwertige MADE IN GERMANY © TeamViewer, eine erstklassige deutsche IT-Wahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Technologielösungen von Software AG zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Produkte.',
          'Unsere IT & Software bieten MADE IN GERMANY © Atoss mit deutscher IT-Exzellenz für Afrikas Arbeitskräfte.',
          'Vertrauenswürdige deutsche Marken wie Nemetschek bieten hochwertige MADE IN GERMANY © Softwarelösungen.',
          'Transformieren Sie mit MADE IN GERMANY © Suse Linux, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Raisin, das deutsche B2B-Lösungen in MADE IN GERMANY © Technologielösungen verkörpert.',
          'Mit deutscher Technologieinnovation treiben unsere MADE IN GERMANY © IT & Software B2B-digitalen Erfolg an.'
        ]
      },
      { 
        title: 'Verpackungslösungen',
        details: [
          'Verpacken Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Verpackungslösungen-Kategorie, vertreten durch vertrauenswürdige Marken wie Krones.',
          'Unsere hochwertige MADE IN GERMANY © Verpackungslösungen bieten MADE IN GERMANY © Verpackungssysteme für Asiens Industrien.',
          'Vertrauenswürdige deutsche Marken wie Bosch Packaging liefern deutsche Verpackungspräzision mit MADE IN GERMANY © Verpackungstechnologie.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Multivac, eine erstklassige deutsche Verpackungswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Verpackungstechnologie von Tetra Pak zeigt deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Lösungen.',
          'Unsere Verpackungslösungen bieten MADE IN GERMANY © Sidel mit deutscher Verpackungsexzellenz für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Schubert bieten hochwertige MADE IN GERMANY © Verpackungssysteme.',
          'Optimieren Sie mit MADE IN GERMANY © Beumer, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Sealed Air, das deutsche B2B-Lösungen in MADE IN GERMANY © Verpackungstechnologie verkörpert.',
          'Mit deutscher Verpackungspräzision verbessern unsere MADE IN GERMANY © Verpackungslösungen B2B-Produktion.'
        ]
      },
      { 
        title: 'Landwirtschaft & Geräte',
        details: [
          'Landwirtschaft mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Landwirtschaft & Geräte-Kategorie, vertreten durch vertrauenswürdige Marken wie Claas.',
          'Unsere hochwertige MADE IN GERMANY © Landwirtschaft & Geräte bieten MADE IN GERMANY © Landwirtschaftsgeräte für Asiens Felder.',
          'Vertrauenswürdige deutsche Marken wie Fendt liefern deutsche landwirtschaftliche Präzision mit MADE IN GERMANY © landwirtschaftlicher Ausrüstung.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Amazone, eine erstklassige deutsche Landwirtschaftswahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © landwirtschaftliche Ausrüstung von Lemken zeigt deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Lösungen.',
          'Unsere Landwirtschaft & Geräte bieten MADE IN GERMANY © Horsch mit deutscher Landwirtschaftsexzellenz für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Stihl bieten hochwertige MADE IN GERMANY © Landwirtschaftsgeräte für Schneidearbeiten.',
          'Wachsen Sie mit MADE IN GERMANY © Krone, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Grimme, das deutsche B2B-Lösungen in MADE IN GERMANY © landwirtschaftlicher Ausrüstung verkörpert.',
          'Mit deutscher landwirtschaftlicher Präzision steigern unsere MADE IN GERMANY © Landwirtschaft & Geräte B2B-Erträge.'
        ]
      },
      { 
        title: 'Kosmetik & Hautpflege',
        details: [
          'Strahlen Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Kosmetik & Hautpflege-Kategorie, vertreten durch vertrauenswürdige Marken wie Nivea.',
          'Unsere hochwertige MADE IN GERMANY © Kosmetik & Hautpflege bieten MADE IN GERMANY © Schönheitsprodukte für Asiens Märkte.',
          'Vertrauenswürdige deutsche Marken wie Babor liefern deutsche Hautpflegeinnovation mit MADE IN GERMANY © Hautpflegelösungen.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Weleda, eine erstklassige deutsche Kosmetikwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Hautpflegelösungen von Dr. Hauschka zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Produkte.',
          'Unsere Kosmetik & Hautpflege bieten MADE IN GERMANY © Kneipp mit deutscher Schönheitsqualität für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Sebamed bieten hochwertige MADE IN GERMANY © Schönheitsprodukte.',
          'Verschönern Sie mit MADE IN GERMANY © Lavera, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Annemarie Börlind, das deutsche B2B-Lösungen in MADE IN GERMANY © Hautpflegelösungen verkörpert.',
          'Mit deutscher Hautpflegeinnovation glänzen unsere MADE IN GERMANY © Kosmetik & Hautpflege für B2B-Schönheit.'
        ]
      },
      { 
        title: 'Sicherheit & Schutz',
        details: [
          'Sichern Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Sicherheit & Schutz-Kategorie, vertreten durch vertrauenswürdige Marken wie Dräger.',
          'Unsere hochwertige MADE IN GERMANY © Sicherheit & Schutz bieten MADE IN GERMANY © Sicherheitslösungen für Asiens Industrien.',
          'Vertrauenswürdige deutsche Marken wie Bosch Security liefern deutsche Sicherheitspräzision mit MADE IN GERMANY © Sicherheitsausrüstung.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Siemens, eine erstklassige deutsche Schutzwahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Sicherheitsausrüstung von Dormakaba zeigt deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Lösungen.',
          'Unsere Sicherheit & Schutz bieten MADE IN GERMANY © Hella mit deutscher Sicherheitsexzellenz für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Abus bieten hochwertige MADE IN GERMANY © Sicherheitslösungen.',
          'Schützen Sie mit MADE IN GERMANY © Uvex, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © SICK, das deutsche B2B-Lösungen in MADE IN GERMANY © Sicherheitsausrüstung verkörpert.',
          'Mit deutscher Sicherheitspräzision schützen unsere MADE IN GERMANY © Sicherheit & Schutz B2B-Operationen.'
        ]
      },
      { 
        title: 'Unterhaltungselektronik',
        details: [
          'Begeistern Sie mit deutscher Ingenieurskunst in unserer MADE IN GERMANY © Unterhaltungselektronik-Kategorie, vertreten durch vertrauenswürdige Marken wie Siemens.',
          'Unsere hochwertige MADE IN GERMANY © Unterhaltungselektronik bieten MADE IN GERMANY © Elektronik für Asiens Haushalte.',
          'Vertrauenswürdige deutsche Marken wie Bosch liefern deutsche Technologieexzellenz mit MADE IN GERMANY © Technologiegeräten für Afrika.',
          'Investieren Sie in hochwertige MADE IN GERMANY © Miele, eine erstklassige deutsche Gerätewahl für MADE IN GERMANY © Exporte.',
          'MADE IN GERMANY © Technologiegeräte von Grundig zeigen deutsche Ingenieurskunst für hochwertige MADE IN GERMANY © Lösungen.',
          'Unsere Unterhaltungselektronik bieten MADE IN GERMANY © Loewe mit deutscher Elektronikqualität für Afrikas Bedürfnisse.',
          'Vertrauenswürdige deutsche Marken wie Sennheiser bieten hochwertige MADE IN GERMANY © Elektronik für Klang.',
          'Verbessern Sie mit MADE IN GERMANY © AEG, ein führender deutscher Hersteller mit deutschen Präzisionsprodukten.',
          'Wählen Sie hochwertige MADE IN GERMANY © Liebherr, das deutsche B2B-Lösungen in MADE IN GERMANY © Technologiegeräten verkörpert.',
          'Mit deutscher Technologieexzellenz heben unsere MADE IN GERMANY © Unterhaltungselektronik B2B-Lebensqualität.'
        ]
      }
    ]
  }
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ language = 'de' }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => {
    const translations = TRANSLATIONS[language] || TRANSLATIONS['de'];
    return translations.categories.map((category, index) => ({
      icon: [
        <LineChart size={24} key="line-chart" />,
        <Shield size={24} key="shield" />,
        <CreditCard size={24} key="credit-card" />,
        <Ban size={24} key="ban" />,
        <Zap size={24} key="zap" />,
        <Smartphone size={24} key="smartphone" />,
        <Plane size={24} key="plane" />,
        <Hotel size={24} key="hotel" />,
        <Dumbbell size={24} key="dumbbell" />,
        <Heart size={24} key="heart" />,
        <UtensilsCrossed size={24} key="utensils-crossed" />,
        <Home size={24} key="home" />,
        <Gift size={24} key="gift" />,
        <Shirt size={24} key="shirt" />,
        <Wine size={24} key="wine" />,
        <Tv size={24} key="tv" />,
        <Briefcase size={24} key="briefcase" />,
        <Watch size={24} key="watch" />,
        <Bike size={24} key="bike" />,
        <Baby size={24} key="baby" />
      ][index],
      title: category.title,
      details: category.details
    }));
  }, [language]);

  // Handle category selection with scroll-to-details
  const handleCategoryClick = (index: number) => {
    if (selectedCategory === index) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(index);
    }
  };

  // Scroll to details panel when selected
  useEffect(() => {
    if (selectedCategory !== null && detailsRef.current && gridRef.current) {
      const timeout = setTimeout(() => {
        const detailsRect = detailsRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const detailsBottom = detailsRect.top + detailsRect.height;
        const visibleDetailsHeight = viewportHeight - detailsRect.top;

        if (visibleDetailsHeight < detailsRect.height / 2) {
          const scrollPosition = window.scrollY + detailsRect.top - (viewportHeight / 2) + (detailsRect.height / 4);
          window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [selectedCategory]);

  return (
    <div className="mt-10 mb-10 max-w-7xl mx-auto">
      {/* Category Grid */}
      <motion.div
        ref={gridRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl p-6 ring-1 ring-white/20 overflow-hidden backdrop-blur-sm"
      >
        {/* Background Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"
        />
        {/* Decorative Elements */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-black rounded-full blur-3xl opacity-20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-900 rounded-full blur-3xl opacity-20 animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute top-4 left-4 right-4 flex space-x-1 h-1">
          <div className="w-1/3 bg-black rounded-full" />
          <div className="w-1/3 bg-red-600 rounded-full" />
          <div className="w-1/3 bg-yellow-400 rounded-full" />
        </div>

        {categories.map((category, index) => (
          <motion.div
            key={`category-${index}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 transition-colors duration-300 shadow-lg cursor-pointer
              ${selectedCategory === index ? 'ring-2 ring-white/30' : ''}`}
            onClick={() => handleCategoryClick(index)}
            onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(index)}
            role="button"
            tabIndex={0}
            aria-label={`Select ${category.title}`}
            aria-expanded={selectedCategory === index}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-full transition-colors duration-300
                  ${selectedCategory === index ? 'bg-white' : 'bg-gray-700 group-hover:bg-gray-600'}`}
              >
                <div
                  className={`transition-colors duration-300
                    ${selectedCategory === index ? 'text-[#06080D]' : 'text-gray-300 group-hover:text-white'}`}
                >
                  {category.icon}
                </div>
              </div>
              <span
                className={`text-base font-semibold transition-colors duration-300
                  ${selectedCategory === index ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}
              >
                {category.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Details Panel */}
      <AnimatePresence>
        {selectedCategory !== null && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl ring-1 ring-white/20 relative overflow-hidden backdrop-blur-sm"
          >
            {/* Background Grid */}
            <div
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"
            />
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl font-extrabold text-white mb-4 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-[text-glow_3s_ease-in-out_infinite]"
            >
              {categories[selectedCategory].title}
            </motion.h3>
            <ul className="text-gray-300 leading-relaxed list-disc pl-5 space-y-2">
              {categories[selectedCategory].details.map((item, idx) => (
                <motion.li
                  key={`detail-${selectedCategory}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                  className="text-sm"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryGrid;