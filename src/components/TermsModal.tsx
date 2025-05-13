import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  faFileContract,
  faBriefcase,
  faHandshake,
  faMoneyBillWave
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define props interface for TermsModal
interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

// Define the info box interface
interface InfoBox {
  icon: any;
  title: string;
  content: string;
  expandedContent: string;
}
// Define translations for TermsModal content
const TRANSLATIONS: Record<string, {
  headerTitle: string;
  introTitle: string;
  contactInfo: string;
  introImageAlt: string;
  infoBoxes: InfoBox[];
  buttonShowLess: string;
  buttonLearnMore: string;
  footerText: string;
}> = {
  en: { // English (United Kingdom)
    headerTitle: "TERMS AND CONDITIONS",
    introTitle: "Our Commitment to Clear and Fair Terms",
    contactInfo: "For optimal communication, please include a daytime contact number when emailing us at info@made-in-germany.uk. We are also accessible via leading messenger services, ensuring efficient and cost-effective interaction. For the swiftest response, utilize our expertly designed contact form, a hallmark of German precision, allowing you to connect with us seamlessly via phone, email, messenger, or the form itself.",
    introImageAlt: "Terms and Conditions",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Scope of Application",
        content: "These General Terms and Conditions (hereinafter 'T&C') govern all contracts concluded between MADE-IN-GERMANY, located at Victoria House 38 Surrey Quays Road, London, England, SE16 7DX, and the customer via the website https://made-in-germany.world.",
        expandedContent: "These terms establish a clear framework for your engagement with our services, delineating the rights and obligations of both parties with the precision and reliability characteristic of German standards."
      },
      {
        icon: faBriefcase,
        title: "Subject Matter",
        content: "MADE-IN-GERMANY provides professional services in the field of remote call centers, with detailed offerings outlined on our website.",
        expandedContent: "Our service portfolio is meticulously curated to meet the highest standards, ensuring clarity and transparency in every offering, as befits the reputation of German engineering."
      },
      {
        icon: faHandshake,
        title: "Contract Conclusion",
        content: "The presentation of services on our website constitutes an invitation to submit an order, not a legally binding offer.",
        expandedContent: "The contract formation process is initiated upon submission of your order and finalized with our acceptance, ensuring a transparent and legally sound agreement that reflects our commitment to precision."
      },
      {
        icon: faMoneyBillWave,
        title: "Prices and Payment",
        content: "Service prices are clearly stated on the website and include statutory value-added tax, ensuring full transparency.",
        expandedContent: "We uphold a rigorous pricing policy, inclusive of all applicable taxes, and offer multiple secure payment methods to facilitate seamless transactions, aligning with the efficiency of German standards."
      }
    ],
    buttonShowLess: "Show Less",
    buttonLearnMore: "Learn More",
    footerText: "Committed to Excellence with German Precision"
  },
  de: { // Deutsch (Germany)
    headerTitle: "ALLGEMEINE GESCHÄFTSBEDINGUNGEN",
    introTitle: "Unsere Verpflichtung zu klaren und fairen Bedingungen",
    contactInfo: "Für optimale Kommunikation geben Sie bitte eine Tageskontaktnummer bei E-Mails an info@made-in-germany.uk an. Wir sind auch über führende Messenger-Dienste erreichbar, um effiziente und kostengünstige Interaktionen zu gewährleisten. Für die schnellste Antwort nutzen Sie unser präzise gestaltetes Kontaktformular, ein Markenzeichen deutscher Präzision, das Ihnen ermöglicht, uns nahtlos per Telefon, E-Mail, Messenger oder Formular zu erreichen.",
    introImageAlt: "Allgemeine Geschäftsbedingungen",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Anwendungsbereich",
        content: "Diese Allgemeinen Geschäftsbedingungen (nachfolgend 'AGB') regeln alle Verträge zwischen MADE-IN-GERMANY, mit Sitz in Victoria House 38 Surrey Quays Road, London, England, SE16 7DX, und dem Kunden über die Website https://made-in-germany.world.",
        expandedContent: "Diese Bedingungen schaffen einen klaren Rahmen für Ihre Interaktion mit unseren Dienstleistungen und definieren die Rechte und Pflichten beider Parteien mit der Präzision und Zuverlässigkeit, die deutsche Standards auszeichnen."
      },
      {
        icon: faBriefcase,
        title: "Vertragsgegenstand",
        content: "MADE-IN-GERMANY bietet professionelle Dienstleistungen im Bereich externer Callcenter an, deren Details auf unserer Website aufgeführt sind.",
        expandedContent: "Unser Dienstleistungsportfolio ist sorgfältig gestaltet, um höchste Standards zu erfüllen, und gewährleistet Klarheit sowie Transparenz bei jedem Angebot, wie es die Reputation deutscher Ingenieurskunst verlangt."
      },
      {
        icon: faHandshake,
        title: "Vertragsschluss",
        content: "Die Darstellung der Dienstleistungen auf unserer Website stellt eine Aufforderung zur Abgabe einer Bestellung dar, kein rechtliches bindendes Angebot.",
        expandedContent: "Der Vertragsschlussprozess beginnt mit der Abgabe Ihrer Bestellung und wird durch unsere Annahme abgeschlossen, wodurch ein transparentes und rechtliches fundiertes Abkommen gewährleistet wird, das unser Engagement für Präzision widerspiegelt."
      },
      {
        icon: faMoneyBillWave,
        title: "Preise und Zahlung",
        content: "Die Preise für die Dienstleistungen sind auf der Website klar angegeben und enthalten die gesetzliche Mehrwertsteuer, um volle Transparenz zu gewährleisten.",
        expandedContent: "Wir verfolgen eine strenge Preispolitik, die alle anfallenden Steuern umfasst, und bieten mehrere sichere Zahlungsmethoden an, um reibungslose Transaktionen im Sinne deutscher Effizienzstandards zu ermöglichen."
      }
    ],
    buttonShowLess: "Weniger Anzeigen",
    buttonLearnMore: "Mehr Erfahren",
    footerText: "Verpflichtet zu Exzellenz mit deutscher Präzision"
  },
  es: { // Español (Spain)
    headerTitle: "TÉRMINOS Y CONDICIONES",
    introTitle: "Nuestro Compromiso con Términos Claros y Justos",
    contactInfo: "Para una comunicación óptima, incluya un número de contacto diurno al enviarnos un correo electrónico a info@made-in-germany.uk. Además, estamos disponibles a través de servicios de mensajería líderes, garantizando una interacción eficiente y económica. Para la respuesta más rápida, utilice nuestro formulario de contacto diseñado con precisión alemana, permitiéndole conectarse con nosotros sin inconvenientes por teléfono, correo electrónico, mensajería o el formulario mismo.",
    introImageAlt: "Términos y Condiciones",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Ámbito de Aplicación",
        content: "Estos Términos y Condiciones Generales (en adelante 'T&C') rigen todos los contratos celebrados entre MADE-IN-GERMANY, con sede en Victoria House 38 Surrey Quays Road, Londres, Inglaterra, SE16 7DX, y el cliente a través del sitio web https://made-in-germany.world.",
        expandedContent: "Estos términos establecen un marco claro para su interacción con nuestros servicios, definiendo los derechos y obligaciones de ambas partes con la precisión y fiabilidad que caracterizan los estándares alemanes."
      },
      {
        icon: faBriefcase,
        title: "Objeto del Contrato",
        content: "MADE-IN-GERMANY ofrece servicios profesionales en el ámbito de centros de llamadas remotos, con detalles específicos enumerados en nuestro sitio web.",
        expandedContent: "Nuestra cartera de servicios está cuidadosamente diseñada para cumplir con los más altos estándares, asegurando claridad y transparencia en cada oferta, acorde con la reputación de la ingeniería alemana."
      },
      {
        icon: faHandshake,
        title: "Conclusión del Contrato",
        content: "La presentación de servicios en nuestro sitio web constituye una invitación a realizar un pedido, no una oferta legalmente vinculante.",
        expandedContent: "El proceso de formación del contrato se inicia con la presentación de su pedido y se finaliza con nuestra aceptación, garantizando un acuerdo transparente y legalmente sólido que refleja nuestro compromiso con la precisión."
      },
      {
        icon: faMoneyBillWave,
        title: "Precios y Pago",
        content: "Los precios de los servicios se indican claramente en el sitio web e incluyen el impuesto al valor agregado legal, asegurando total transparencia.",
        expandedContent: "Mantenemos una política de precios rigurosa, que incluye todos los impuestos aplicables, y ofrecemos múltiples métodos de pago seguros para facilitar transacciones fluidas, alineadas con los estándares de eficiencia alemana."
      }
    ],
    buttonShowLess: "Mostrar Menos",
    buttonLearnMore: "Saber Más",
    footerText: "Comprometidos con la Excelencia con Precisión Alemana"
  },
  fr: { // Français (France)
    headerTitle: "CONDITIONS GÉNÉRALES",
    introTitle: "Notre Engagement envers des Conditions Claires et Équitables",
    contactInfo: "Pour une communication optimale, veuillez inclure un numéro de contact diurne dans vos e-mails envoyés à info@made-in-germany.uk. Nous sommes également accessibles via les principaux services de messagerie, garantissant une interaction efficace et économique. Pour une réponse rapide, utilisez notre formulaire de contact conçu avec la précision allemande, vous permettant de nous joindre sans effort par téléphone, e-mail, messagerie ou le formulaire lui-même.",
    introImageAlt: "Conditions Générales",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Champ d’Application",
        content: "Ces Conditions Générales (ci-après 'CG') régissent tous les contrats conclus entre MADE-IN-GERMANY, situé à Victoria House 38 Surrey Quays Road, Londres, Angleterre, SE16 7DX, et le client via le site web https://made-in-germany.world.",
        expandedContent: "Ces conditions établissent un cadre clair pour votre interaction avec nos services, définissant les droits et obligations des deux parties avec la précision et la fiabilité caractéristiques des normes allemandes."
      },
      {
        icon: faBriefcase,
        title: "Objet du Contrat",
        content: "MADE-IN-GERMANY propose des services professionnels dans le domaine des centres d’appels à distance, avec des détails précis répertoriés sur notre site web.",
        expandedContent: "Notre portefeuille de services est minutieusement conçu pour répondre aux plus hautes normes, garantissant clarté et transparence dans chaque offre, conformément à la réputation de l’ingénierie allemande."
      },
      {
        icon: faHandshake,
        title: "Conclusion du Contrat",
        content: "La présentation des services sur notre site web constitue une invitation à soumettre une commande, et non une offre juridiquement contraignante.",
        expandedContent: "Le processus de formation du contrat commence lorsque vous soumettez votre commande et est finalisé par notre acceptation, assurant un accord transparent et juridiquement solide qui reflète notre engagement envers la précision."
      },
      {
        icon: faMoneyBillWave,
        title: "Prix et Paiement",
        content: "Les prix des services sont clairement indiqués sur le site web et incluent la taxe sur la valeur ajoutée légale, garantissant une transparence totale.",
        expandedContent: "Nous maintenons une politique de tarification rigoureuse, incluant toutes les taxes applicables, et proposons plusieurs méthodes de paiement sécurisées pour faciliter des transactions fluides, en accord avec les normes d’efficacité allemandes."
      }
    ],
    buttonShowLess: "Montrer Moins",
    buttonLearnMore: "En Savoir Plus",
    footerText: "Engagés pour l’Excellence avec la Précision Allemande"
  },
  it: { // Italiano (Italy)
    headerTitle: "TERMINI E CONDIZIONI",
    introTitle: "Il Nostro Impegno per Termini Chiari ed Equi",
    contactInfo: "Per una comunicazione ottimale, includi un numero di contatto diurno quando ci invii un’e-mail a info@made-in-germany.uk. Inoltre, siamo disponibili tramite i principali servizi di messaggistica, garantendo un’interazione efficiente e conveniente. Per una risposta rapida, utilizza il nostro modulo di contatto progettato con la precisione tedesca, permettendoti di contattarci senza problemi tramite telefono, e-mail, messaggistica o il modulo stesso.",
    introImageAlt: "Termini e Condizioni",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Ambito di Applicazione",
        content: "Questi Termini e Condizioni Generali (di seguito 'T&C') regolano tutti i contratti stipulati tra MADE-IN-GERMANY, con sede in Victoria House 38 Surrey Quays Road, Londra, Inghilterra, SE16 7DX, e il cliente tramite il sito web https://made-in-germany.world.",
        expandedContent: "Questi termini stabiliscono un quadro chiaro per la tua interazione con i nostri servizi, definendo i diritti e gli obblighi di entrambe le parti con la precisione e l’affidabilità caratteristiche degli standard tedeschi."
      },
      {
        icon: faBriefcase,
        title: "Oggetto del Contratto",
        content: "MADE-IN-GERMANY offre servizi professionali nel campo dei call center remoti, con dettagli specifici elencati sul nostro sito web.",
        expandedContent: "Il nostro portafoglio di servizi è accuratamente progettato per soddisfare i più alti standard, garantendo chiarezza e trasparenza in ogni offerta, in linea con la reputazione dell’ingegneria tedesca."
      },
      {
        icon: faHandshake,
        title: "Conclusione del Contratto",
        content: "La presentazione dei servizi sul nostro sito web costituisce un invito a presentare un ordine, non un’offerta legalmente vincolante.",
        expandedContent: "Il processo di formazione del contratto inizia quando invii il tuo ordine ed è finalizzato con la nostra accettazione, garantendo un accordo trasparente e giuridicamente valido che riflette il nostro impegno per la precisione."
      },
      {
        icon: faMoneyBillWave,
        title: "Prezzi e Pagamento",
        content: "I prezzi dei servizi sono chiaramente indicati sul sito web e includono l’imposta sul valore aggiunto prevista dalla legge, assicurando totale trasparenza.",
        expandedContent: "Manteniamo una politica di prezzi rigorosa, che include tutte le tasse applicabili, e offriamo molteplici metodi di pagamento sicuri per facilitare transazioni fluide, in linea con gli standard di efficienza tedeschi."
      }
    ],
    buttonShowLess: "Mostra Meno",
    buttonLearnMore: "Scopri di Più",
    footerText: "Impegnati per l’Eccellenza con Precisione Tedesca"
  },
  nl: { // Dutch (Netherlands)
    headerTitle: "ALGEMENE VOORWAARDEN",
    introTitle: "Onze Toewijding aan Duidelijke en Eerlijke Voorwaarden",
    contactInfo: "Voor optimale communicatie, voeg alstublieft een dagcontactnummer toe bij het sturen van een e-mail naar info@made-in-germany.uk. Wij zijn ook bereikbaar via toonaangevende messengerservices, wat zorgt voor efficiënte en kosteneffectieve interactie. Voor de snelste reactie, maak gebruik van ons met Duitse precisie ontworpen contactformulier, waarmee u ons naadloos kunt bereiken via telefoon, e-mail, messenger of het formulier zelf.",
    introImageAlt: "Algemene Voorwaarden",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Toepassingsbereik",
        content: "Deze Algemene Voorwaarden (hierna 'AV') zijn van toepassing op alle overeenkomsten gesloten tussen MADE-IN-GERMANY, gevestigd te Victoria House 38 Surrey Quays Road, Londen, Engeland, SE16 7DX, en de klant via de website https://made-in-germany.world.",
        expandedContent: "Deze voorwaarden bieden een helder kader voor uw interactie met onze diensten, waarbij de rechten en verplichtingen van beide partijen worden gedefinieerd met de precisie en betrouwbaarheid die kenmerkend zijn voor Duitse normen."
      },
      {
        icon: faBriefcase,
        title: "Onderwerp van de Overeenkomst",
        content: "MADE-IN-GERMANY biedt professionele diensten aan op het gebied van externe callcenters, met specifieke details vermeld op onze website.",
        expandedContent: "Ons dienstenaanbod is zorgvuldig samengesteld om te voldoen aan de hoogste normen, met duidelijkheid en transparantie in elk aanbod, zoals passend bij de reputatie van Duitse ingenieurskunst."
      },
      {
        icon: faHandshake,
        title: "Sluiting van de Overeenkomst",
        content: "De presentatie van diensten op onze website vormt een uitnodiging om een bestelling te plaatsen, geen juridisch bindend aanbod.",
        expandedContent: "Het proces van contractvorming start bij het indienen van uw bestelling en wordt voltooid met onze acceptatie, wat een transparante en juridisch solide overeenkomst garandeert die ons streven naar precisie weerspiegelt."
      },
      {
        icon: faMoneyBillWave,
        title: "Prijzen en Betaling",
        content: "De prijzen voor de diensten zijn duidelijk vermeld op de website en zijn inclusief de wettelijke btw, wat volledige transparantie waarborgt.",
        expandedContent: "Wij hanteren een strikt prijsbeleid, inclusief alle toepasselijke belastingen, en bieden diverse veilige betaalmethoden om soepele transacties te faciliteren, in lijn met de efficiëntienormen van Duitsland."
      }
    ],
    buttonShowLess: "Toon Minder",
    buttonLearnMore: "Leer Meer",
    footerText: "Toegewijd aan Excellentie met Duitse Precisie"
  },
  sa: { // العربية (السعودية) - Arabic (Saudi Arabia)
    headerTitle: "الشروط والأحكام",
    introTitle: "التزامنا بشروط واضحة وعادلة",
    contactInfo: "للحصول على أفضل تواصل، يرجى تضمين رقم اتصال نهاري عند إرسال بريد إلكتروني إلى info@made-in-germany.uk. نحن أيضًا متاحون عبر خدمات المراسلة الرائدة، مما يضمن تفاعلاً فعالاً وذا تكلفة منخفضة. للحصول على استجابة سريعة، استخدم نموذج الاتصال الخاص بنا المصمم بدقة ألمانية، مما يتيح لك التواصل معنا بسلاسة عبر الهاتف، البريد الإلكتروني، المراسلة، أو النموذج نفسه.",
    introImageAlt: "الشروط والأحكام",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "نطاق التطبيق",
        content: "تُطبق هذه الشروط والأحكام العامة (المشار إليها فيما بعد بـ 'الشروط') على جميع العقود المبرمة بين MADE-IN-GERMANY، الكائنة في Victoria House 38 Surrey Quays Road، لندن، إنجلترا، SE16 7DX، والعميل عبر الموقع الإلكتروني https://made-in-germany.world.",
        expandedContent: "تحدد هذه الشروط إطارًا واضحًا لتفاعلك مع خدماتنا، مع توضيح حقوق وواجبات الطرفين بدقة وموثوقية تتماشى مع المعايير الألمانية."
      },
      {
        icon: faBriefcase,
        title: "موضوع العقد",
        content: "تقدم MADE-IN-GERMANY خدمات مهنية في مجال مراكز الاتصال عن بُعد، مع تفاصيل محددة مدرجة على موقعنا الإلكتروني.",
        expandedContent: "تم تصميم محفظة خدماتنا بعناية لتلبية أعلى المعايير، مما يضمن الوضوح والشفافية في كل عرض، بما يتماشى مع سمعة الهندسة الألمانية."
      },
      {
        icon: faHandshake,
        title: "إبرام العقد",
        content: "عرض الخدمات على موقعنا الإلكتروني يشكل دعوة لتقديم طلب، وليس عرضًا ملزمًا قانونيًا.",
        expandedContent: "تبدأ عملية تشكيل العقد عند تقديم طلبك وتنتهي بقبولنا، مما يضمن اتفاقًا شفافًا وسليمًا قانونيًا يعكس التزامنا بالدقة."
      },
      {
        icon: faMoneyBillWave,
        title: "الأسعار والدفع",
        content: "تُذكر أسعار الخدمات بوضوح على الموقع الإلكتروني وتشمل ضريبة القيمة المضافة القانونية، مما يضمن الشفافية الكاملة.",
        expandedContent: "نحافظ على سياسة تسعير صارمة تشمل جميع الضرائب المطبقة، ونقدم طرق دفع آمنة متعددة لتسهيل المعاملات السلسة، بما يتماشى مع معايير الكفاءة الألمانية."
      }
    ],
    buttonShowLess: "عرض أقل",
    buttonLearnMore: "معرفة المزيد",
    footerText: "ملتزمون بالتميز بدقة ألمانية"
  },
  hk: { // 繁體中文 (Hong Kong) - Traditional Chinese
    headerTitle: "條款與條件",
    introTitle: "我們對清晰公正條款的承諾",
    contactInfo: "為確保最佳溝通，請喺寄電郵畀我哋時一併提供一個日間聯絡號碼至 info@made-in-germany.uk。我哋亦透過領先嘅通訊軟件提供服務，確保高效同經濟嘅互動。為獲得最快回覆，請使用我哋以德國精確度設計嘅聯絡表格，容許你透過電話、電郵、通訊軟件或表格本身靈活聯繫我哋。",
    introImageAlt: "條款與條件",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "適用範圍",
        content: "本通用條款與條件（以下簡稱「條款」）適用於 MADE-IN-GERMANY（位於 Victoria House 38 Surrey Quays Road，倫敦，英格蘭，SE16 7DX）與客戶通過網站 https://made-in-germany.world 訂立的所有合同。",
        expandedContent: "這些條款為您與我們服務的互動提供了一個清晰的框架，詳細規定雙方的權利和義務，體現德國標準的精確性和可靠性。"
      },
      {
        icon: faBriefcase,
        title: "合同標的",
        content: "MADE-IN-GERMANY 提供遠程呼叫中心的專業服務，具體細節列於我們的網站上。",
        expandedContent: "我們的服務組合經過精心設計，以符合最高標準，確保每項服務的清晰度和透明度，符合德國工程的聲譽。"
      },
      {
        icon: faHandshake,
        title: "合同締結",
        content: "我們網站上的服務展示構成提交訂單的邀請，而非具有法律約束力的要約。",
        expandedContent: "合同形成過程在您提交訂單時開始，並在我們接受時完成，確保雙方達成透明且法律上健全的協議，反映我們對精確性的承諾。"
      },
      {
        icon: faMoneyBillWave,
        title: "價格與付款",
        content: "服務價格在網站上清楚列明，並包含法定增值稅，確保完全透明。",
        expandedContent: "我們堅持嚴格的定價政策，包含所有適用稅費，並提供多種安全付款方式，以確保交易順暢，符合德國效率標準。"
      }
    ],
    buttonShowLess: "顯示較少",
    buttonLearnMore: "了解更多",
    footerText: "致力於以德國精確度追求卓越"
  },
  sg: { // 简体中文 (Singapore) - Simplified Chinese
    headerTitle: "条款与条件",
    introTitle: "我们对清晰公正条款的承诺",
    contactInfo: "为确保最佳沟通，请在发送电子邮件至 info@made-in-germany.uk 时一并提供一个白天联系号码。我们还通过常用消息服务提供支持，确保快速且成本效益高的沟通。使用我们的联系表格是与我们联系的一种特别有效的方式，可以快速处理你的询问。这样，你就可以通过你喜欢的方式灵活地联系我们——无论是电话、电子邮件、消息服务还是我们的联系表格。",
    introImageAlt: "条款与条件",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "适用范围",
        content: "本通用条款与条件（以下简称「条款」）适用于 MADE-IN-GERMANY（位于 Victoria House 38 Surrey Quays Road，伦敦，英格兰，SE16 7DX）与客户通过网站 https://made-in-germany.world 订立的所有合同。",
        expandedContent: "这些条款为您与我们服务的互动提供了一个清晰的框架，详细规定双方的权利和义务，体现德国标准的精确性和可靠性。"
      },
      {
        icon: faBriefcase,
        title: "合同标的",
        content: "MADE-IN-GERMANY 提供远程呼叫中心的专业服务，具体细节列于我们的网站上。",
        expandedContent: "我们的服务组合经过精心设计，以符合最高标准，确保每项服务的清晰度和透明度，符合德国工程的声誉。"
      },
      {
        icon: faHandshake,
        title: "合同缔结",
        content: "我们网站上的服务展示构成提交订单的邀请，而非具有法律约束力的要约。",
        expandedContent: "合同形成过程在您提交订单时开始，并在我们接受时完成，确保双方达成透明且法律上健全的协议，反映我们对精确性的承诺。"
      },
      {
        icon: faMoneyBillWave,
        title: "价格与付款",
        content: "服务价格在网站上清楚列明，并包含法定增值税，确保完全透明。",
        expandedContent: "我们坚持严格的定价政策，包含所有适用税费，并提供多种安全付款方式，以确保交易顺畅，符合德国效率标准。"
      }
    ],
    buttonShowLess: "显示较少",
    buttonLearnMore: "了解更多",
    footerText: "致力于以德国精确度追求卓越"
  },
  za: { // Afrikaans (South Africa)
    headerTitle: "TERME EN VOORWAARDES",
    introTitle: "Ons Toewyding aan Duidelike en Billike Voorwaardes",
    contactInfo: "Vir optimale kommunikasie, voeg asseblief 'n dagkontaknommer by wanneer jy 'n e-pos stuur na info@made-in-germany.uk. Ons is ook bereikbaar via toonaangewende boodskapdienste, wat effektiewe en koste-effektiewe interaksie verseker. Vir die vinnigste respons, gebruik ons met Duitse presisie ontwerpte kontakvorm, wat jou toelaat om ons naadloos te bereik via telefoon, e-pos, boodskapper of die vorm self.",
    introImageAlt: "Terme en Voorwaardes",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "Toepassingsgebied",
        content: "Hierdie Algemene Terme en Voorwaardes (hierna 'T&V') is van toepassing op alle kontrakte tussen MADE-IN-GERMANY, geleë te Victoria House 38 Surrey Quays Road, Londen, Engeland, SE16 7DX, en die kliënt via die webwerf https://made-in-germany.world.",
        expandedContent: "Hierdie terme skep 'n duidelike raamwerk vir u interaksie met ons dienste, met die verduideliking van die regte en verpligtinge van beide partye met die presisie en betroubaarheid kenmerkend van Duitse standaarde."
      },
      {
        icon: faBriefcase,
        title: "Onderwerp van die Kontrak",
        content: "MADE-IN-GERMANY bied professionele dienste aan op die gebied van afgeleë oproepsentrums, met spesifieke besonderhede op ons webwerf gelys.",
        expandedContent: "Ons diensportefeulje is noukeurig saamgestel om aan die hoogste standaarde te voldoen, met duidelikheid en deursigtigheid in elke aanbod, soos dit die reputasie van Duitse ingenieurskuns betaam."
      },
      {
        icon: faHandshake,
        title: "Kontraksluiting",
        content: "Die aanbieding van dienste op ons webwerf vorm 'n uitnodiging om 'n bestelling in te dien, nie 'n wettig bindende aanbod nie.",
        expandedContent: "Die kontrakvormingsproses begin wanneer u u bestelling indien en word met ons aanvaarding gefinaliseer, wat 'n deursigtige en wettig soliede ooreenkoms waarborg wat ons verbintenis tot presisie weerspieël."
      },
      {
        icon: faMoneyBillWave,
        title: "Pryse en Betaling",
        content: "Die pryse vir die dienste word duidelik op die webwerf aangedui en sluit die wettige belasting op toegevoegde waarde in, wat volledige deursigtigheid verseker.",
        expandedContent: "Ons handhaaf 'n streng prysbeleid, insluitend alle toepaslike belastings, en bied verskeie veilige betaalmetodes om gladde transaksies te fasiliteer, in lyn met die doeltreffendheid van Duitse standaarde."
      }
    ],
    buttonShowLess: "Wys Minder",
    buttonLearnMore: "Leer Meer",
    footerText: "Toegewyd aan Uitnemendheid met Duitse Presisie"
  },
  kr: { // 한국어 (South Korea) - Korean
    headerTitle: "이용 약관",
    introTitle: "명확하고 공정한 조건에 대한 우리의 약속",
    contactInfo: "최적의 커뮤니케이션을 위해 info@made-in-germany.uk로 이메일을 보낼 때 낮 시간에 연락할 수 있는 전화번호도 함께 제공해 주세요. 또한, 빠르고 비용 효율적인 소통을 보장하기 위해 주요 메신저 서비스를 통해 연락하실 수 있습니다. 가장 빠른 응답을 원하시면 독일 정밀 기술로 설계된 연락 양식을 이용해 주세요. 이를 통해 전화, 이메일, 메신저, 또는 연락 양식 등 여러분이 선호하는 방식으로 유연하게 저희에게 연락할 수 있습니다。",
    introImageAlt: "이용 약관",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "적용 범위",
        content: "이 일반 이용 약관(이하 '약관')은 MADE-IN-GERMANY(주소: Victoria House 38 Surrey Quays Road, 런던, 잉글랜드, SE16 7DX)와 고객 간에 웹사이트 https://made-in-germany.world를 통해 체결된 모든 계약에 적용됩니다.",
        expandedContent: "이 약관은 귀하와 당사 서비스 간의 상호작용에 명확한 틀을 제공하며, 양 당사자의 권리와 의무를 독일 표준의 정확성과 신뢰성에 맞춰 명시합니다."
      },
      {
        icon: faBriefcase,
        title: "계약 주제",
        content: "MADE-IN-GERMANY는 원격 콜센터 분야에서 전문적인 서비스를 제공하며, 자세한 내용은 당사 웹사이트에 나열되어 있습니다.",
        expandedContent: "당사의 서비스 포트폴리오는 최고 표준을 충족하도록 세심하게 구성되었으며, 모든 제공 사항에서 명확성과 투명성을 보장하여 독일 엔지니어링의 명성에 부합합니다."
      },
      {
        icon: faHandshake,
        title: "계약 체결",
        content: "당사 웹사이트에서 서비스를 제시하는 것은 법적 구속력이 있는 제안을 구성하지 않으며, 주문을 제출하라는 초대입니다.",
        expandedContent: "계약 형성 과정은 귀하가 주문을 제출할 때 시작되며 당사의 수락으로 완료되어 양 당사자 간의 투명하고 법적으로 건전한 합의를 보장하며, 이는 정확성에 대한 우리의 약속을 반영합니다."
      },
      {
        icon: faMoneyBillWave,
        title: "가격 및 결제",
        content: "서비스 가격은 웹사이트에 명확히 명시되어 있으며 법정 부가가치세를 포함하여 완전한 투명성을 보장합니다.",
        expandedContent: "우리는 적용 가능한 모든 세금을 포함한 엄격한 가격 정책을 유지하며, 원활한 거래를 촉진하기 위해 여러 안전한 결제 방법을 제공하여 독일 효율성 표준에 부합합니다."
      }
    ],
    buttonShowLess: "줄이기",
    buttonLearnMore: "더 알아보기",
    footerText: "독일 정밀함으로 탁월함에 전념합니다"
  },
  jp: { // 日本語 (Japan) - Japanese
    headerTitle: "利用規約",
    introTitle: "明確かつ公正な条件への私たちの取り組み",
    contactInfo: "最適なコミュニケーションのために、info@made-in-germany.ukにメールを送信する際に日中に連絡できる電話番号もご提供ください。また、一般的なメッセージングサービスを通じてご連絡いただければ、迅速かつコスト効率の高いコミュニケーションをお約束します。最速の回答を得るには、ドイツの精密さで設計されたお問い合わせフォームをご利用ください。これにより、電話、メール、メッセージング、またはお問い合わせフォームなど、あなたが好む方法で柔軟に私たちに連絡できます。",
    introImageAlt: "利用規約",
    infoBoxes: [
      {
        icon: faFileContract,
        title: "適用範囲",
        content: "この一般利用規約（以下「規約」）は、MADE-IN-GERMANY（住所：Victoria House 38 Surrey Quays Road、ロンドン、イングランド、SE16 7DX）と顧客の間でウェブサイト https://made-in-germany.world を通じて締結されたすべての契約に適用されます。",
        expandedContent: "この規約は、お客様と当社のサービスとのやり取りに明確な枠組みを提供し、ドイツの基準に特徴的な精密さと信頼性をもって両当事者の権利と義務を明示します。"
      },
      {
        icon: faBriefcase,
        title: "契約の対象",
        content: "MADE-IN-GERMANYはリモートコールセンターの分野で専門的なサービスを提供し、詳細は当社ウェブサイトに記載されています。",
        expandedContent: "当社のサービスポートフォリオは最高基準を満たすよう慎重に設計されており、すべての提供内容において明確さと透明性を保証し、ドイツの工学の名声に適合しています。"
      },
      {
        icon: faHandshake,
        title: "契約の締結",
        content: "当社ウェブサイトでのサービスの提示は、法的に拘束力のあるオファーを構成するものではなく、注文を提出する招待です。",
        expandedContent: "契約の形成プロセスは、お客様が注文を提出したときに開始され、当社の受諾によって完了し、両当事者間の透明かつ法的に健全な合意を保証し、精密さへの私たちの取り組みを反映します。"
      },
      {
        icon: faMoneyBillWave,
        title: "価格と支払い",
        content: "サービスの価格はウェブサイトに明確に記載されており、法定付加価値税を含み、完全な透明性を確保しています。",
        expandedContent: "当社は適用されるすべての税金を含む厳格な価格政策を維持し、スムーズな取引を促進するために複数の安全な支払い方法を提供し、ドイツの効率性基準に適合しています。"
      }
    ],
    buttonShowLess: "少なく見る",
    buttonLearnMore: "もっと知る",
    footerText: "ドイツの精密さで卓越性を追求します"
  }
};

const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const handleContactFormClick = () => {
    onClose(); // Close the modal
    navigate('/contactform'); // Navigate to the contact form page
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const renderContactInfo = () => {
    const text = translations.contactInfo;
    const contactFormText = language === 'de' ? 'Kontaktformulars' : 'contact form';
    const parts = text.split(contactFormText);
    return (
      <>
        {parts[0]}
        <span
          onClick={handleContactFormClick}
          className="text-[#FFFFFF] cursor-pointer hover:underline"
        >
          {contactFormText}
        </span>
        {parts[1]}
      </>
    );
    };
    
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(12px)',
              padding: '1rem 0',
            }}
            onClick={handleBackdropClick}
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
                @media (max-width: 640px) {
                  .mobile-image-container {
                    height: auto !important;
                    max-height: 50vh;
                  }
                  .mobile-image {
                    height: auto;
                    max-height: 50vh;
                    object-fit: contain;
                  }
                  .mobile-close-button {
                    position: absolute;
                    top: 0.25rem;
                    right: 0.5rem;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                  }
                  .mobile-header-title {
                    margin-top: 2rem;
                  }
                }
              `}
            </style>
            <div className="min-h-full flex items-start justify-center px-2 sm:px-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
                className="relative w-full max-w-[95%] sm:max-w-4xl md:max-w-6xl lg:max-w-8xl mb-6 sm:mb-10 rounded-2xl border border-[#121A2A]"
                style={{ background: '#0B111F' }}
              >
                {/* Header */}
                <motion.div
                  className="relative p-4 sm:p-6 md:p-8 border-b border-gray-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <motion.h2
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mobile-header-title"
                    >
                      {translations.headerTitle}
                    </motion.h2>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="px-4 py-2 sm:px-6 sm:py-3 text-[#FFFFFF] rounded-[5px] transition-colors flex items-center gap-2 border border-[#0B111F] text-xs sm:text-sm mobile-close-button"
                      aria-label="Close"
                    >
                      <span>Close</span>
                      <X className="w-4 h-4 sm:w-6 sm:h-6 hidden sm:block" />
                    </motion.button>
                  </div>
                </motion.div>
    
                {/* Hero Section with Image */}
                <motion.div
                  className="p-4 sm:p-6 md:p-8 text-center"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.h3
                    variants={itemVariants}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 md:mb-8"
                  >
                    {translations.introTitle}
                  </motion.h3>
                  <motion.p
                    variants={itemVariants}
                    className="text-left text-sm sm:text-base text-gray-400"
                  >
                    {renderContactInfo()}
                  </motion.p>
                  {/* Mobile-only spacer - top */}
                  <div className="h-10 sm:h-0 md:h-0 lg:h-0"></div>
                  <motion.div
                    className="mt-[-30px] relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden mobile-image-container"
                  >
                    <img
                      src={language === 'de' ? "/impressum-made-in-germany.webp" : "/imprint-made-in-germany-english.webp"}
                      alt={translations.introImageAlt}
                      className="w-full h-full radius-[50px] object-contain sm:object-cover md:object-contain lg:object-contain object-center mobile-image"
                      onLoad={() => setImageLoaded(true)}
                      style={{
                        opacity: imageLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out'
                      }}
                    />
                  </motion.div>
                  
                  {/* Mobile-only spacer - bottom */}
                  <div className="h-20 sm:h-0 md:h-0 lg:h-0"></div>
                </motion.div>
    
                {/* Info Boxes */}
                <motion.div
                  className="mt-[-60px] sm:px-6 md:px-8 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {translations.infoBoxes.map((box, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="p-4 sm:p-6 md:p-8 rounded-2xl bg-[#0F1627] backdrop-blur-sm border border-gray-600 transition-all duration-300"
                      style={{
                        boxShadow: expandedSection === index ? '0 0 20px rgba(245, 163, 3, 0.2)' : 'none'
                      }}
                    >
                      <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <FontAwesomeIcon
                          icon={box.icon}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#FFFFFF]"
                        />
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">{box.title}</h3>
                      </div>
                      <div className="text-gray-300 space-y-3 sm:space-y-4">
                        <motion.div
                          initial={false}
                          animate={{ height: 'auto' }}
                          className="text-sm sm:text-base"
                        >
                          {box.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-2">{line.trim()}</p>
                          ))}
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: '#0B111F' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSection(index)}
                          className="mt-4 sm:mt-6 w-full px-4 py-2 sm:px-6 sm:py-3 rounded-[5px] bg-[#0B111F] text-white text-xs sm:text-sm font-medium transition-all duration-200 hover:bg-[#0B111F] hover:text-white hover:shadow-[0px_0px_10px_3px_#0B111F]"
                        >
                          <span>{expandedSection === index ? translations.buttonShowLess : translations.buttonLearnMore}</span>
                        </motion.button>
                        <AnimatePresence>
                          {expandedSection === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden pt-3 sm:pt-4 text-sm sm:text-base text-gray-400"
                            >
                              <p>{box.expandedContent}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
    
                {/* Added spacer div */}
                <div className="h-6 sm:h-8 md:h-10 lg:h-12"></div>
    
                {/* Footer */}
                <motion.div
                  className="p-4 sm:p-6 md:p-8 border-t border-gray-600 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFFFFF]">
                    {translations.footerText}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
    };
    
    export default TermsModal;