import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  faDatabase,
  faUserTie,
  faLock,
  faShield,
  faUserCheck,
  faBell,
  faCopyright,
  faFile,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

// Define props interface for DataProtectionModal
interface DataProtectionModalProps {
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
  en: {
    headerTitle: "DATA PROTECTION",
    introTitle: "Safeguarding Your Privacy with Precision",
    contactInfo: "For optimal communication, please include a daytime contact number when emailing us at info@made-in-germany.uk. We are also accessible via leading messenger services, ensuring efficient and cost-effective interaction. For the swiftest response, utilize our expertly designed contact form, a hallmark of German precision, allowing you to connect with us seamlessly via phone, email, messenger, or the form itself.",
    introImageAlt: "Data Protection",
    infoBoxes: [
      {
        icon: faShield,
        title: "Introduction",
        content: "MADE-IN-GERMANY is committed to the highest standards of personal data protection. We handle your personal data with the utmost confidentiality, adhering strictly to applicable data protection laws and this privacy policy.",
        expandedContent: "This privacy policy provides detailed insights into the nature, scope, and purpose of personal data collection and usage on our website. Our goal is to ensure a secure and trustworthy digital experience, reflecting the precision and reliability synonymous with German engineering."
      },
      {
        icon: faUserTie,
        title: "Responsible Party",
        content: "The entity responsible for data processing on this website, in accordance with the General Data Protection Regulation (GDPR), is MADE-IN-GERMANY, represented by Andreas Thommen. Contact: Phone: +49 (0) 40 55123-10, Email: info@made-in-germany.uk, Address: Victoria House 38 Surrey Quays Road, London, England, SE16 7DX.",
        expandedContent: "For inquiries regarding data protection, our dedicated Data Protection Officer is available to assist. This officer oversees compliance with data protection regulations and is committed to addressing your concerns with professionalism and expertise."
      },
      {
        icon: faDatabase,
        title: "Data Collection",
        content: "Upon visiting our website, data is automatically transmitted to our server and temporarily stored. This includes the IP address, date and time of access, accessed files, and additional technical information essential for operation.",
        expandedContent: "These data are processed to ensure a stable connection, optimize user experience, and maintain system security and stability—standards upheld with the meticulous care characteristic of German craftsmanship."
      },
      {
        icon: faLock,
        title: "Data Disclosure",
        content: "Your personal data is disclosed only in compliance with legal requirements, such as fulfilling contractual obligations or meeting regulatory mandates.",
        expandedContent: "Data sharing with third parties occurs solely when necessary for contract fulfillment or with your explicit consent. MADE-IN-GERMANY guarantees that no data will be shared without your prior approval, ensuring trust and transparency."
      },
      {
        icon: faUserCheck,
        title: "Your Rights",
        content: "You are entitled to request information, correction, deletion, and restriction of the processing of your personal data, in line with GDPR provisions.",
        expandedContent: "You may revoke consent to data processing at any time. Additionally, you have the right to data portability and the ability to file a complaint with a supervisory authority if a data protection breach is suspected, reflecting our commitment to your control over your information."
      },
      {
        icon: faBell,
        title: "Right of Objection",
        content: "You may object to the processing of your data if it is based on legitimate interests, provided there are no overriding justifiable grounds.",
        expandedContent: "Objections can be submitted via email or letter to MADE-IN-GERMANY. Upon receipt, we will cease processing the data unless compelling legitimate reasons for continued processing can be demonstrated, ensuring your preferences are respected."
      },
      {
        icon: faCopyright,
        title: "Data Security",
        content: "MADE-IN-GERMANY employs state-of-the-art security measures to protect your data from unauthorized access, loss, or misuse.",
        expandedContent: "Our robust security framework includes advanced encryption technologies and regular system audits, embodying the precision and reliability of German engineering to safeguard your information at all times."
      },
      {
        icon: faFile,
        title: "Updates & Changes",
        content: "This privacy policy is subject to periodic updates to reflect evolving legal standards or enhancements to our services. Please review the latest version on our website.",
        expandedContent: "We reserve the right to amend this policy to comply with new regulations or service improvements. The most current version is always accessible on our website, ensuring ongoing transparency and alignment with best practices."
      }
    ],
    buttonShowLess: "Show Less",
    buttonLearnMore: "Learn More",
    footerText: "Committed to Your Privacy with German Precision"
  },
  de: {
    headerTitle: "DATENSCHUTZ",
    introTitle: "Ihre Privatsphäre mit Präzision geschützt",
    contactInfo: "Für optimale Kommunikation geben Sie bitte eine Tageskontaktnummer bei E-Mails an info@made-in-germany.uk an. Wir sind auch über führende Messenger-Dienste erreichbar, um effiziente und kostengünstige Interaktionen zu gewährleisten. Für die schnellste Antwort nutzen Sie unser präzise gestaltetes Kontaktformular, ein Markenzeichen deutscher Präzision, das Ihnen nahtlos per Telefon, E-Mail, Messenger oder Formular zu erreichen ermöglicht.",
    introImageAlt: "Datenschutz",
    infoBoxes: [
      {
        icon: faShield,
        title: "Einführung",
        content: "MADE-IN-GERMANY verpflichtet sich zu den höchsten Standards beim Schutz Ihrer persönlichen Daten. Wir behandeln Ihre Daten vertraulich und in strikter Übereinstimmung mit den gesetzlichen Datenschutzvorschriften und dieser Datenschutzerklärung.",
        expandedContent: "Diese Datenschutzerklärung informiert Sie detailliert über Art, Umfang und Zweck der Erhebung und Nutzung persönlicher Daten auf unserer Website. Unser Ziel ist es, Ihnen ein sicheres und vertrauenswürdiges digitales Erlebnis zu bieten, das die Präzision und Zuverlässigkeit der deutschen Ingenieurskunst widerspiegelt."
      },
      {
        icon: faUserTie,
        title: "Verantwortliche Stelle",
        content: "Die für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) verantwortliche Stelle ist MADE-IN-GERMANY, vertreten durch Andreas Thommen. Kontakt: Telefon: +49 (0) 40 55123-10, E-Mail: info@made-in-germany.uk, Adresse: Victoria House 38 Surrey Quays Road, London, England, SE16 7DX.",
        expandedContent: "Bei Fragen zum Datenschutz steht unser engagierter Datenschutzbeauftragter zur Verfügung. Dieser überwacht die Einhaltung der Datenschutzvorschriften und beantwortet Ihre Anliegen mit Professionalität und Fachkompetenz."
      },
      {
        icon: faDatabase,
        title: "Datenerhebung",
        content: "Beim Besuch unserer Website werden Daten automatisch an unseren Server übermittelt und temporär gespeichert. Dazu gehören IP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Dateien sowie weitere technische Informationen.",
        expandedContent: "Diese Daten werden verarbeitet, um eine stabile Verbindung zu gewährleisten, die Nutzererfahrung zu optimieren und die Systemsicherheit sowie Stabilität zu erhalten – Standards, die mit der akribischen Sorgfalt deutscher Handwerkskunst aufrechterhalten werden."
      },
      {
        icon: faLock,
        title: "Datenweitergabe",
        content: "Ihre persönlichen Daten werden nur gemäß gesetzlicher Vorgaben weitergegeben, etwa zur Erfüllung von Verträgen oder gesetzlichen Verpflichtungen.",
        expandedContent: "Eine Weitergabe an Dritte erfolgt ausschließlich, wenn sie zur Vertragserfüllung notwendig ist oder Sie ausdrücklich zustimmen. MADE-IN-GERMANY garantiert, dass keine Daten ohne Ihre vorherige Zustimmung an Dritte weitergegeben werden, um Vertrauen und Transparenz zu sichern."
      },
      {
        icon: faUserCheck,
        title: "Ihre Rechte",
        content: "Sie haben Anspruch auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer persönlichen Daten gemäß DSGVO.",
        expandedContent: "Sie können Ihre Einwilligung zur Datenverarbeitung jederzeit widerrufen. Zudem stehen Ihnen das Recht auf Datenübertragbarkeit sowie die Möglichkeit zu, bei Verdacht auf einen Datenschutzverstoß eine Beschwerde bei einer Aufsichtsbehörde einzureichen – ein Zeichen unseres Engagements für Ihre Kontrolle über Ihre Informationen."
      },
      {
        icon: faBell,
        title: "Widerspruchsrecht",
        content: "Sie können der Verarbeitung Ihrer Daten widersprechen, wenn diese auf berechtigten Interessen beruht und keine überwiegenden Gründe dagegen sprechen.",
        expandedContent: "Der Widerspruch kann per E-Mail oder Brief an MADE-IN-GERMANY gerichtet werden. Nach Erhalt hören wir mit der Verarbeitung der betroffenen Daten auf, es sei denn, wir können zwingende legitime Gründe für die Fortsetzung nachweisen, um Ihre Präferenzen zu respektieren."
      },
      {
        icon: faCopyright,
        title: "Datensicherheit",
        content: "MADE-IN-GERMANY setzt modernste Sicherheitsmaßnahmen ein, um Ihre Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.",
        expandedContent: "Unser umfassendes Sicherheitskonzept umfasst fortschrittliche Verschlüsselungstechniken und regelmäßige Systemüberprüfungen, die die Präzision und Zuverlässigkeit der deutschen Ingenieurskunst verkörpern, um Ihre Informationen jederzeit zu schützen."
      },
      {
        icon: faFile,
        title: "Aktualisierungen & Änderungen",
        content: "Diese Datenschutzerklärung wird regelmäßig aktualisiert, um sich an sich entwickelnde gesetzliche Standards oder Verbesserungen unserer Dienstleistungen anzupassen. Bitte prüfen Sie die neueste Version auf unserer Website.",
        expandedContent: "Wir behalten uns das Recht vor, diese Richtlinie anzupassen, um neuen Vorschriften oder Service-Verbesserungen zu entsprechen. Die aktuellste Version ist jederzeit auf unserer Website einsehbar, um anhaltende Transparenz und Einhaltung der Best Practices zu gewährleisten."
      }
    ],
    buttonShowLess: "Weniger Anzeigen",
    buttonLearnMore: "Mehr Erfahren",
    footerText: "Verpflichtet zu Ihrer Privatsphäre mit deutscher Präzision"
  },
  es: {
    headerTitle: "PROTECCIÓN DE DATOS",
    introTitle: "Protegiendo su privacidad con precisión",
    contactInfo: "Para una comunicación óptima, incluya un número de contacto diurno al enviarnos un correo electrónico a info@made-in-germany.uk. Además, estamos disponibles a través de servicios de mensajería líderes, garantizando una interacción eficiente y económica. Para la respuesta más rápida, utilice nuestro formulario de contacto diseñado con precisión alemana, permitiéndole conectarse con nosotros sin inconvenientes por teléfono, correo electrónico, mensajería o el formulario mismo.",
    introImageAlt: "Protección de Datos",
    infoBoxes: [
      {
        icon: faShield,
        title: "Introducción",
        content: "MADE-IN-GERMANY se compromete a los más altos estándares de protección de datos personales. Tratamos sus datos con la máxima confidencialidad, cumpliendo estrictamente con las leyes de protección de datos y esta política de privacidad.",
        expandedContent: "Esta política de privacidad detalla la naturaleza, alcance y propósito de la recolección y uso de datos personales en nuestro sitio web. Nuestro objetivo es garantizar una experiencia digital segura y confiable, reflejando la precisión y fiabilidad asociadas con la ingeniería alemana."
      },
      {
        icon: faUserTie,
        title: "Parte Responsable",
        content: "La entidad responsable del procesamiento de datos en este sitio web, conforme al Reglamento General de Protección de Datos (RGPD), es MADE-IN-GERMANY, representada por Andreas Thommen. Contacto: Teléfono: +49 (0) 40 55123-10, Correo electrónico: info@made-in-germany.uk, Dirección: Victoria House 38 Surrey Quays Road, Londres, Inglaterra, SE16 7DX.",
        expandedContent: "Para consultas sobre protección de datos, nuestro dedicado Oficial de Protección de Datos está a su disposición. Este oficial supervisa el cumplimiento de las normativas y responde a sus inquietudes con profesionalismo y experiencia."
      },
      {
        icon: faDatabase,
        title: "Recolección de Datos",
        content: "Al visitar nuestro sitio web, los datos se transmiten automáticamente a nuestro servidor y se almacenan temporalmente. Esto incluye la dirección IP, fecha y hora de acceso, archivos consultados y otra información técnica esencial.",
        expandedContent: "Estos datos se procesan para asegurar una conexión estable, optimizar la experiencia del usuario y mantener la seguridad y estabilidad del sistema, estándares mantenidos con el cuidado meticuloso característico de la artesanía alemana."
      },
      {
        icon: faLock,
        title: "Divulgación de Datos",
        content: "Sus datos personales solo se divulgan en cumplimiento con requisitos legales, como el cumplimiento de obligaciones contractuales o mandatos regulatorios.",
        expandedContent: "La compartición de datos con terceros ocurre únicamente cuando es necesaria para cumplir un contrato o con su consentimiento explícito. MADE-IN-GERMANY garantiza que no se compartirán datos sin su aprobación previa, asegurando confianza y transparencia."
      },
      {
        icon: faUserCheck,
        title: "Sus Derechos",
        content: "Tiene derecho a solicitar información, corrección, eliminación y restricción del procesamiento de sus datos personales, de acuerdo con las disposiciones del RGPD.",
        expandedContent: "Puede revocar su consentimiento al procesamiento de datos en cualquier momento. Además, tiene derecho a la portabilidad de datos y a presentar una queja ante una autoridad supervisora si sospecha una violación de la protección de datos, reflejando nuestro compromiso con su control sobre su información."
      },
      {
        icon: faBell,
        title: "Derecho de Oposición",
        content: "Puede oponerse al procesamiento de sus datos si se basa en intereses legítimos y no hay razones justificadas que prevalezcan.",
        expandedContent: "Las oposiciones pueden enviarse por correo electrónico o carta a MADE-IN-GERMANY. Tras recibirla, cesaremos el procesamiento de los datos afectados, a menos que podamos demostrar motivos legítimos imperiosos para continuar, respetando sus preferencias."
      },
      {
        icon: faCopyright,
        title: "Seguridad de Datos",
        content: "MADE-IN-GERMANY emplea medidas de seguridad de vanguardia para proteger sus datos contra accesos no autorizados, pérdidas o mal uso.",
        expandedContent: "Nuestro marco de seguridad robusto incluye tecnologías de cifrado avanzadas y auditorías regulares, encarnando la precisión y fiabilidad de la ingeniería alemana para proteger su información en todo momento."
      },
      {
        icon: faFile,
        title: "Actualizaciones y Cambios",
        content: "Esta política de privacidad se actualiza periódicamente para reflejar estándares legales en evolución o mejoras en nuestros servicios. Por favor, revise la versión más reciente en nuestro sitio web.",
        expandedContent: "Nos reservamos el derecho de modificar esta política para cumplir con nuevas regulaciones o mejoras de servicio. La versión más actualizada está siempre disponible en nuestro sitio web, asegurando transparencia continua y alineación con las mejores prácticas."
      }
    ],
    buttonShowLess: "Mostrar Menos",
    buttonLearnMore: "Saber Más",
    footerText: "Comprometidos con su privacidad con precisión alemana"
  },
  fr: {
    headerTitle: "PROTECTION DES DONNÉES",
    introTitle: "Protéger votre vie privée avec précision",
    contactInfo: "Pour une communication optimale, veuillez inclure un numéro de contact diurne dans vos e-mails envoyés à info@made-in-germany.uk. Nous sommes également accessibles via les principaux services de messagerie, garantissant une interaction efficace et économique. Pour une réponse rapide, utilisez notre formulaire de contact conçu avec la précision allemande, vous permettant de nous joindre sans effort par téléphone, e-mail, messagerie ou le formulaire lui-même.",
    introImageAlt: "Protection des Données",
    infoBoxes: [
      {
        icon: faShield,
        title: "Introduction",
        content: "MADE-IN-GERMANY s'engage aux plus hauts standards de protection des données personnelles. Nous traitons vos données avec la plus grande confidentialité, en respectant strictement les lois sur la protection des données et cette politique de confidentialité.",
        expandedContent: "Cette politique de confidentialité fournit des détails sur la nature, l'étendue et l'objectif de la collecte et de l'utilisation des données personnelles sur notre site web. Notre objectif est de garantir une expérience numérique sécurisée et fiable, reflétant la précision et la fiabilité associées à l'ingénierie allemande."
      },
      {
        icon: faUserTie,
        title: "Partie Responsable",
        content: "L'entité responsable du traitement des données sur ce site web, conformément au Règlement Général sur la Protection des Données (RGPD), est MADE-IN-GERMANY, représentée par Andreas Thommen. Contact : Téléphone : +49 (0) 40 55123-10, Email : info@made-in-germany.uk, Adresse : Victoria House 38 Surrey Quays Road, Londres, Angleterre, SE16 7DX.",
        expandedContent: "Pour toute question concernant la protection des données, notre Officier de Protection des Données dédié est à votre disposition. Cet officier supervise le respect des réglementations et répond à vos préoccupations avec professionnalisme et expertise."
      },
      {
        icon: faDatabase,
        title: "Collecte de Données",
        content: "Lors de votre visite sur notre site web, des données sont automatiquement transmises à notre serveur et stockées temporairement. Cela inclut l'adresse IP, la date et l'heure d'accès, les fichiers consultés et d'autres informations techniques essentielles.",
        expandedContent: "Ces données sont traitées pour assurer une connexion stable, optimiser l'expérience utilisateur et maintenir la sécurité et la stabilité du système, des standards maintenus avec le soin méticuleux propre à l'artisanat allemand."
      },
      {
        icon: faLock,
        title: "Divulgation de Données",
        content: "Vos données personnelles ne sont divulguées qu'en conformité avec les exigences légales, comme l'exécution d'obligations contractuelles ou des mandats réglementaires.",
        expandedContent: "Le partage de données avec des tiers n'a lieu que si cela est nécessaire pour remplir un contrat ou avec votre consentement explicite. MADE-IN-GERMANY garantit qu'aucune donnée ne sera partagée sans votre approbation préalable, assurant confiance et transparence."
      },
      {
        icon: faUserCheck,
        title: "Vos Droits",
        content: "Vous avez le droit de demander des informations, une correction, une suppression et une restriction du traitement de vos données personnelles, conformément aux dispositions du RGPD.",
        expandedContent: "Vous pouvez révoquer votre consentement au traitement des données à tout moment. De plus, vous disposez du droit à la portabilité des données et pouvez déposer une plainte auprès d'une autorité de contrôle en cas de suspicion de violation de la protection des données, reflétant notre engagement à vous donner le contrôle sur vos informations."
      },
      {
        icon: faBell,
        title: "Droit d’Opposition",
        content: "Vous pouvez vous opposer au traitement de vos données si celui-ci repose sur des intérêts légitimes et qu'il n'existe pas de raisons prépondérantes contraires.",
        expandedContent: "Les oppositions peuvent être soumises par e-mail ou courrier à MADE-IN-GERMANY. Après réception, nous cesserons de traiter les données concernées, sauf si nous pouvons démontrer des motifs légitimes impérieux pour continuer, respectant ainsi vos préférences."
      },
      {
        icon: faCopyright,
        title: "Sécurité des Données",
        content: "MADE-IN-GERMANY utilise des mesures de sécurité de pointe pour protéger vos données contre les accès non autorisés, les pertes ou les abus.",
        expandedContent: "Notre cadre de sécurité robuste inclut des technologies de cryptage avancées et des audits réguliers, incarnant la précision et la fiabilité de l'ingénierie allemande pour protéger vos informations en tout temps."
      },
      {
        icon: faFile,
        title: "Mises à Jour et Modifications",
        content: "Cette politique de confidentialité est mise à jour périodiquement pour refléter les normes légales en évolution ou les améliorations de nos services. Veuillez consulter la dernière version sur notre site web.",
        expandedContent: "Nous nous réservons le droit de modifier cette politique pour se conformer à de nouvelles réglementations ou améliorations de service. La version la plus récente est toujours disponible sur notre site web, assurant une transparence continue et une alignement avec les meilleures pratiques."
      }
    ],
    buttonShowLess: "Montrer Moins",
    buttonLearnMore: "En Savoir Plus",
    footerText: "Engagés pour votre vie privée avec la précision allemande"
  },
  it: {
    headerTitle: "PROTEZIONE DEI DATI",
    introTitle: "Proteggere la tua privacy con precisione",
    contactInfo: "Per una comunicazione ottimale, includi un numero di contatto diurno quando ci invii un’e-mail a info@made-in-germany.uk. Inoltre, siamo disponibili tramite i principali servizi di messaggistica, garantendo un’interazione efficiente e conveniente. Per una risposta rapida, utilizza il nostro modulo di contatto progettato con la precisione tedesca, permettendoti di contattarci senza problemi tramite telefono, e-mail, messaggistica o il modulo stesso.",
    introImageAlt: "Protezione dei Dati",
    infoBoxes: [
      {
        icon: faShield,
        title: "Introduzione",
        content: "MADE-IN-GERMANY si impegna ai più alti standard di protezione dei dati personali. Gestiamo i tuoi dati con la massima riservatezza, rispettando rigorosamente le leggi sulla protezione dei dati e questa politica sulla privacy.",
        expandedContent: "Questa politica sulla privacy fornisce dettagli sulla natura, l'ambito e lo scopo della raccolta e dell'uso dei dati personali sul nostro sito web. Il nostro obiettivo è garantire un'esperienza digitale sicura e affidabile, riflettendo la precisione e l'affidabilità associate all'ingegneria tedesca."
      },
      {
        icon: faUserTie,
        title: "Parte Responsabile",
        content: "L'entità responsabile del trattamento dei dati su questo sito web, ai sensi del Regolamento Generale sulla Protezione dei Dati (GDPR), è MADE-IN-GERMANY, rappresentata da Andreas Thommen. Contatto: Telefono: +49 (0) 40 55123-10, Email: info@made-in-germany.uk, Indirizzo: Victoria House 38 Surrey Quays Road, Londra, Inghilterra, SE16 7DX.",
        expandedContent: "Per domande sulla protezione dei dati, il nostro dedicato Responsabile della Protezione dei Dati è a tua disposizione. Questo ufficiale supervisiona il rispetto delle normative e risponde alle tue preoccupazioni con professionalità ed esperienza."
      },
      {
        icon: faDatabase,
        title: "Raccolta dei Dati",
        content: "Quando visiti il nostro sito web, i dati vengono trasmessi automaticamente al nostro server e memorizzati temporaneamente. Ciò include l'indirizzo IP, la data e l'ora di accesso, i file consultati e altre informazioni tecniche essenziali.",
        expandedContent: "Questi dati sono elaborati per garantire una connessione stabile, ottimizzare l'esperienza utente e mantenere la sicurezza e la stabilità del sistema, standard mantenuti con la cura meticolosa tipica dell'artigianato tedesco."
      },
      {
        icon: faLock,
        title: "Divulgazione dei Dati",
        content: "I tuoi dati personali vengono divulgati solo in conformità con i requisiti legali, come l'adempimento di obblighi contrattuali o mandati normativi.",
        expandedContent: "La condivisione dei dati con terze parti avviene solo se necessaria per adempiere a un contratto o con il tuo consenso esplicito. MADE-IN-GERMANY garantisce che nessun dato sarà condiviso senza la tua approvazione preventiva, assicurando fiducia e trasparenza."
      },
      {
        icon: faUserCheck,
        title: "I Tuoi Diritti",
        content: "Hai il diritto di richiedere informazioni, correzione, cancellazione e restrizione del trattamento dei tuoi dati personali, in linea con le disposizioni del GDPR.",
        expandedContent: "Puoi revocare il consenso al trattamento dei dati in qualsiasi momento. Inoltre, hai diritto alla portabilità dei dati e puoi presentare un reclamo a un'autorità di controllo se sospetti una violazione della protezione dei dati, riflettendo il nostro impegno a darti il controllo sulle tue informazioni."
      },
      {
        icon: faBell,
        title: "Diritto di Opposizione",
        content: "Puoi opporti al trattamento dei tuoi dati se si basa su interessi legittimi e non ci sono motivi prevalenti contrari.",
        expandedContent: "Le opposizioni possono essere inviate via e-mail o lettera a MADE-IN-GERMANY. Dopo averle ricevute, cesseremo di elaborare i dati interessati, a meno che non possiamo dimostrare motivi legittimi imperativi per continuare, rispettando così le tue preferenze."
      },
      {
        icon: faCopyright,
        title: "Sicurezza dei Dati",
        content: "MADE-IN-GERMANY utilizza misure di sicurezza all'avanguardia per proteggere i tuoi dati da accessi non autorizzati, perdite o abusi.",
        expandedContent: "Il nostro robusto quadro di sicurezza include tecnologie di crittografia avanzate e audit regolari, incarnando la precisione e l'affidabilità dell'ingegneria tedesca per proteggere le tue informazioni in ogni momento."
      },
      {
        icon: faFile,
        title: "Aggiornamenti e Modifiche",
        content: "Questa politica sulla privacy viene aggiornata periodicamente per riflettere standard legali in evoluzione o miglioramenti ai nostri servizi. Si prega di consultare l'ultima versione sul nostro sito web.",
        expandedContent: "Ci riserviamo il diritto di modificare questa politica per conformarci a nuove normative o miglioramenti dei servizi. La versione più recente è sempre disponibile sul nostro sito web, garantendo una trasparenza continua e un allineamento con le migliori pratiche."
      }
    ],
    buttonShowLess: "Mostra di Meno",
    buttonLearnMore: "Scopri di Più",
    footerText: "Impegnati per la tua privacy con precisione tedesca"
  },
  nl: {
    headerTitle: "GEGEVENSBESCHERMING",
    introTitle: "Uw privacy met precisie beschermd",
    contactInfo: "Voor optimale communicatie, voeg alstublieft een dagcontactnummer toe bij het sturen van een e-mail naar info@made-in-germany.uk. Wij zijn ook bereikbaar via toonaangevende messengerservices, wat zorgt voor efficiënte en koste-effectieve interactie. Voor de snelste reactie, maak gebruik van ons met Duitse precisie ontworpen contactformulier, waarmee u ons naadloos kunt bereiken via telefoon, e-mail, messenger of het formulier zelf.",
    introImageAlt: "Gegevensbescherming",
    infoBoxes: [
      {
        icon: faShield,
        title: "Inleiding",
        content: "MADE-IN-GERMANY verbindt zich tot de hoogste standaarden voor de bescherming van uw persoonlijke gegevens. Wij behandelen uw gegevens vertrouwelijk en in strikte overeenstemming met de wettelijke gegevensbeschermingsvoorschriften en deze privacyverklaring.",
        expandedContent: "Deze privacyverklaring biedt gedetailleerde inzichten in de aard, omvang en het doel van het verzamelen en gebruiken van persoonlijke gegevens op onze website. Ons doel is om een veilige en betrouwbare digitale ervaring te garanderen, die de precisie en betrouwbaarheid van de Duitse ingenieurskunst weerspiegelt."
      },
      {
        icon: faUserTie,
        title: "Verantwoordelijke Partij",
        content: "De entiteit verantwoordelijk voor de gegevensverwerking op deze website, conform de Algemene Verordening Gegevensbescherming (AVG), is MADE-IN-GERMANY, vertegenwoordigd door Andreas Thommen. Contact: Telefoon: +49 (0) 40 55123-10, E-mail: info@made-in-germany.uk, Adres: Victoria House 38 Surrey Quays Road, Londen, Engeland, SE16 7DX.",
        expandedContent: "Voor vragen over gegevensbescherming staat onze toegewijde Functionaris voor Gegevensbescherming tot uw beschikking. Deze officier superviseert de naleving van de voorschriften en beantwoordt uw zorgen met professionaliteit en expertise."
      },
      {
        icon: faDatabase,
        title: "Gegevensverzameling",
        content: "Bij het bezoeken van onze website worden gegevens automatisch naar onze server verzonden en tijdelijk opgeslagen. Dit omvat het IP-adres, datum en tijd van toegang, geraadpleegde bestanden en aanvullende technische informatie essentieel voor de werking.",
        expandedContent: "Deze gegevens worden verwerkt om een stabiele verbinding te garanderen, de gebruikerservaring te optimaliseren en de systeembeveiliging en stabiliteit te behouden – standaarden die met de zorgvuldige precisie van de Duitse ambachtskunst worden nageleefd."
      },
      {
        icon: faLock,
        title: "Gegevensverstrekking",
        content: "Uw persoonlijke gegevens worden alleen verstrekt in overeenstemming met wettelijke vereisten, zoals het nakomen van contractuele verplichtingen of regelgevende mandaten.",
        expandedContent: "Het delen van gegevens met derden vindt uitsluitend plaats wanneer dit nodig is voor contractuitvoering of met uw uitdrukkelijke toestemming. MADE-IN-GERMANY garandeert dat geen gegevens zonder uw voorafgaande goedkeuring worden gedeeld, wat vertrouwen en transparantie waarborgt."
      },
      {
        icon: faUserCheck,
        title: "Uw Rechten",
        content: "U heeft recht op informatie, correctie, verwijdering en beperking van de verwerking van uw persoonlijke gegevens, in lijn met de AVG-bepalingen.",
        expandedContent: "U kunt te allen tijde uw toestemming voor gegevensverwerking intrekken. Daarnaast heeft u recht op gegevensoverdraagbaarheid en kunt u een klacht indienen bij een toezichthoudende autoriteit bij vermoeden van een datalek, wat ons engagement toont om u controle te geven over uw informatie."
      },
      {
        icon: faBell,
        title: "Recht van Bezwaar",
        content: "U kunt bezwaar maken tegen de verwerking van uw gegevens als deze gebaseerd is op gerechtvaardigde belangen en er geen doorslaggevende redenen tegen zijn.",
        expandedContent: "Bezwaar kan per e-mail of brief aan MADE-IN-GERMANY worden ingediend. Na ontvangst stoppen we met het verwerken van de betreffende gegevens, tenzij we overtuigende gerechtvaardigde gronden voor voortzetting kunnen aantonen, waarbij uw voorkeuren worden gerespecteerd."
      },
      {
        icon: faCopyright,
        title: "Gegevensbeveiliging",
        content: "MADE-IN-GERMANY maakt gebruik van ultramoderne beveiligingsmaatregelen om uw gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik.",
        expandedContent: "Ons robuuste beveiligingskader omvat geavanceerde encryptietechnieken en regelmatige audits, die de precisie en betrouwbaarheid van de Duitse ingenieurskunst belichamen om uw informatie altijd te beschermen."
      },
      {
        icon: faFile,
        title: "Updates & Wijzigingen",
        content: "Deze privacyverklaring wordt periodiek bijgewerkt om veranderende wettelijke normen of verbeteringen aan onze diensten te weerspiegelen. Controleer de nieuwste versie op onze website.",
        expandedContent: "Wij behouden ons het recht voor om deze verklaring aan te passen om te voldoen aan nieuwe regelgeving of serviceverbeteringen. De meest recente versie is altijd beschikbaar op onze website, waarmee we continue transparantie en afstemming op best practices garanderen."
      }
    ],
    buttonShowLess: "Toon Minder",
    buttonLearnMore: "Meer Informatie",
    footerText: "Toegewijd aan uw privacy met Duitse precisie"
  },
  sa: {
    headerTitle: "حماية البيانات",
    introTitle: "حماية خصوصيتك بدقة",
    contactInfo: "للحصول على أفضل تواصل، يرجى تضمين رقم اتصال نهاري عند إرسال بريد إلكتروني إلى info@made-in-germany.uk. نحن أيضًا متاحون عبر خدمات المراسلة الرائدة، مما يضمن تفاعلاً فعالاً وذا تكلفة منخفضة. للحصول على استجابة سريعة، استخدم نموذج الاتصال الخاص بنا المصمم بدقة ألمانية، مما يتيح لك التواصل معنا بسلاسة عبر الهاتف، البريد الإلكتروني، المراسلة، أو النموذج نفسه.",
    introImageAlt: "حماية البيانات",
    infoBoxes: [
      {
        icon: faShield,
        title: "المقدمة",
        content: "تتميز MADE-IN-GERMANY بالالتزام بأعلى معايير حماية البيانات الشخصية. نحن نتعامل مع بياناتك الشخصية بسرية تامة، مع الالتزام الصارم بالقوانين المتعلقة بحماية البيانات وهذه السياسة الخصوصية.",
        expandedContent: "توفر لك هذه السياسة الخصوصية تفاصيل دقيقة حول طبيعة ونطاق وغرض جمع واستخدام البيانات الشخصية على موقعنا الإلكتروني. نهدف إلى ضمان تجربة رقمية آمنة وموثوقة، تعكس الدقة والمصداقية المرتبطة بالهندسة الألمانية."
      },
      {
        icon: faUserTie,
        title: "الجهة المسؤولة",
        content: "الجهة المسؤولة عن معالجة البيانات على هذا الموقع بمعنى اللائحة العامة لحماية البيانات (GDPR) هي MADE-IN-GERMANY، ممثلة بأندرياس تومن. الاتصال: الهاتف: +49 (0) 40 55123-10، البريد الإلكتروني: info@made-in-germany.uk، العنوان: Victoria House 38 Surrey Quays Road، لندن، إنجلترا، SE16 7DX.",
        expandedContent: "لأي استفسارات تتعلق بحماية البيانات، يمكنك التواصل مع مسؤول حماية البيانات المكرس لدينا. هذا المسؤول يشرف على الالتزام باللوائح ويجيب على مخاوفك باحترافية وخبرة."
      },
      {
        icon: faDatabase,
        title: "جمع البيانات",
        content: "عند زيارة موقعنا الإلكتروني، يتم إرسال البيانات تلقائيًا إلى خادمنا وتخزينها مؤقتًا. يشمل ذلك عنوان IP وتاريخ ووقت الوصول والملفات المستعرضة ومعلومات تقنية إضافية أساسية.",
        expandedContent: "تُعالج هذه البيانات لضمان اتصال مستقر، تحسين تجربة المستخدم، وصيانة أمان واستقرار النظام – معايير تُحافظ عليها بدقة فائقة خاصة بالحرفية الألمانية."
      },
      {
        icon: faLock,
        title: "الكشف عن البيانات",
        content: "يتم الكشف عن بياناتك الشخصية فقط في الامتثال للمتطلبات القانونية، مثل تنفيذ الالتزامات التعاقدية أو التوجيهات التنظيمية.",
        expandedContent: "يتم مشاركة البيانات مع أطراف ثالثة فقط عندما يكون ذلك ضروريًا لتنفيذ العقد أو بموافقتك الصريحة. تضمن MADE-IN-GERMANY عدم مشاركة أي بيانات بدون موافقتك المسبقة، مما يضمن الثقة والشفافية."
      },
      {
        icon: faUserCheck,
        title: "حقوقك",
        content: "لديك الحق في طلب المعلومات والتصحيح والحذف وتقييد معالجة بياناتك الشخصية، وفقًا لأحكام اللائحة العامة لحماية البيانات.",
        expandedContent: "يمكنك سحب موافقتك على معالجة البيانات في أي وقت. كما لديك حق نقل البيانات وقدرة على تقديم شكوى إلى هيئة رقابية إذا شككت في انتهاك حماية البيانات، مما يعكس التزامنا بمنحك السيطرة على معلوماتك."
      },
      {
        icon: faBell,
        title: "حق الاعتراض",
        content: "يمكنك الاعتراض على معالجة بياناتك إذا كانت تستند إلى مصالح مشروعة ولا توجد أسباب متفوقة ضدها.",
        expandedContent: "يمكن تقديم الاعتراض عبر البريد الإلكتروني أو الرسالة إلى MADE-IN-GERMANY. بعد الاستلام، سنوقف معالجة البيانات المعنية ما لم نتمكن من إثبات أسباب مشروعة قوية للاستمرار، مع احترام تفضيلاتك."
      },
      {
        icon: faCopyright,
        title: "أمان البيانات",
        content: "تستخدم MADE-IN-GERMANY أحدث تدابير الأمان لحماية بياناتك من الوصول غير المصرح به أو الفقدان أو الاستخدام السيئ.",
        expandedContent: "إطار الأمان القوي لدينا يشمل تقنيات تشفير متقدمة وتدقيقات منتظمة، مما يجسد الدقة والمصداقية للهندسة الألمانية لحماية معلوماتك في جميع الأوقات."
      },
      {
        icon: faFile,
        title: "التحديثات والتغييرات",
        content: "تخضع هذه السياسة الخصوصية لتحديثات دورية لتعكس المعايير القانونية المتطورة أو التحسينات في خدماتنا. يرجى مراجعة النسخة الأحدث على موقعنا الإلكتروني.",
        expandedContent: "نحتفظ بالحق في تعديل هذه السياسة للامتثال للوائح جديدة أو تحسينات الخدمات. النسخة الأحدث متوفرة دائمًا على موقعنا الإلكتروني، مما يضمن الشفافية المستمرة والتوافق مع أفضل الممارسات."
      }
    ],
    buttonShowLess: "عرض أقل",
    buttonLearnMore: "معرفة المزيد",
    footerText: "ملتزمون بحماية خصوصيتك بدقة ألمانية"
  },
  hk: {
    headerTitle: "數據保護",
    introTitle: "以精確保護你的隱私",
    contactInfo: "為確保最佳溝通，請喺寄電郵畀我哋時一併提供一個日間聯絡號碼至 info@made-in-germany.uk。我哋亦透過領先嘅通訊軟件提供服務，確保高效同經濟嘅互動。為獲得最快回覆，請使用我哋以德國精確度設計嘅聯絡表格，容許你透過電話、電郵、通訊軟件或表格本身靈活聯繫我哋。",
    introImageAlt: "數據保護",
    infoBoxes: [
      {
        icon: faShield,
        title: "引言",
        content: "MADE-IN-GERMANY致力於最高標準嘅個人數據保護。我哋以最高保密性處理你嘅個人數據，嚴格遵守適用嘅數據保護法律同呢個隱私政策。",
        expandedContent: "呢個隱私政策提供詳細資訊，講述喺我哋網站上收集同使用個人數據嘅性質、範圍同目的。吾哋嘅目標係確保一個安全同值得信賴嘅數碼體驗，反映德國工程嘅精確同可靠性。"
      },
      {
        icon: faUserTie,
        title: "負責方",
        content: "根據《通用數據保護條例》（GDPR），負責喺呢個網站處理數據嘅實體係MADE-IN-GERMANY，由Andreas Thommen代表。聯繫方式：電話：+49 (0) 40 55123-10，電郵：info@made-in-germany.uk，地址：Victoria House 38 Surrey Quays Road，倫敦，英格蘭，SE16 7DX。",
        expandedContent: "如有任何關於數據保護嘅問題，吾哋嘅專注數據保護官隨時為你提供協助。呢個官員負責監督遵守規例同專業回應你嘅關注。"
      },
      {
        icon: faDatabase,
        title: "數據收集",
        content: "當你訪問我哋嘅網站時，數據會自動傳送至我哋嘅服務器並暫時儲存。包括IP地址、訪問日期/時間、所瀏覽嘅文件同其他技術資訊。",
        expandedContent: "呢啲數據用於確保穩定嘅連接，優化用戶體驗同維持系統安全同穩定 – 標準以德國工藝嘅精細照顧維持。"
      },
      {
        icon: faLock,
        title: "數據披露",
        content: "你嘅個人數據只會喺符合法律要求時披露，例如履行合約義務或滿足監管要求。",
        expandedContent: "數據同第三方分享只會喺履行合約必要或你明確同意時發生。MADE-IN-GERMANY保證無你事先批准唔會分享數據，確保信任同透明度。"
      },
      {
        icon: faUserCheck,
        title: "你的權利",
        content: "你有權要求資訊、更正、刪除同限制處理你嘅個人數據，符合GDPR條款。",
        expandedContent: "你隨時可以撤回對數據處理嘅同意。加上你有數據可攜帶權，如懷疑有數據保護違規，可以向監管機構投訴，顯示我哋對你控制你資訊嘅承諾。"
      },
      {
        icon: faBell,
        title: "反對權",
        content: "如果數據處理基於合法利益，且無相反壓倒性理由，你可以反對處理你嘅數據。",
        expandedContent: "反對可以透過電郵或信函提交畀MADE-IN-GERMANY。收到後，吾哋會停止處理相關數據，除非能證明有強烈嘅合法理由繼續，尊重你嘅偏好。"
      },
      {
        icon: faCopyright,
        title: "數據安全",
        content: "MADE-IN-GERMANY採用最先進嘅安全措施，保護你嘅數據免受未經授權嘅訪問、損失或濫用。",
        expandedContent: "我哋嘅強大安全框架包括先進嘅加密技術同定期審計，體現德國工程嘅精確同可靠性，隨時保護你嘅信息。"
      },
      {
        icon: faFile,
        title: "更新與更改",
        content: "呢個隱私政策定期更新，以反映演變嘅法律標準或我哋服務嘅提升。請喺我哋網站上查看最新版本。",
        expandedContent: "我哋保留喺必要時調整呢個政策嘅權利，以符合新法規或服務改進。最新的版本隨時喺我哋網站上搵到，確保持續嘅透明度同最佳實踐嘅一致性。"
      }
    ],
    buttonShowLess: "顯示較少",
    buttonLearnMore: "了解更多",
    footerText: "致力於以德國精確度保護你嘅隱私"
  },
  sg: {
    headerTitle: "数据保护",
    introTitle: "以精准保护你的隐私",
    contactInfo: "为确保最佳沟通，请在发送电子邮件至 info@made-in-germany.uk 时一并提供一个白天联系号码。我们还通过常用消息服务提供支持，确保快速且成本效益高的沟通。使用我们的联系表格是与我们联系的一种特别有效的方式，可以快速处理你的询问。这样，你就可以通过你喜欢的方式灵活地联系我们——无论是电话、电子邮件、消息服务还是我们的联系表格。",
    introImageAlt: "数据保护",
    infoBoxes: [
      {
        icon: faShield,
        title: "引言",
        content: "MADE-IN-GERMANY 致力于最高标准的个人数据保护。我们以高度保密的方式处理你的个人数据，严格遵守适用的数据保护法律和本隐私政策。",
        expandedContent: "我们的隐私政策详细说明了在我们网站上收集和使用个人数据的性质、范围和目的。我们的目标是确保一个安全且值得信赖的数字体验，反映德国工程的精准和可靠性。"
      },
      {
        icon: faUserTie,
        title: "负责方",
        content: "根据《通用数据保护条例》（GDPR），负责在本网站处理数据的是 MADE-IN-GERMANY，由 Andreas Thommen 代表。联系方式：电话：+49 (0) 40 55123-10，电子邮件：info@made-in-germany.uk，地址：Victoria House 38 Surrey Quays Road，伦敦，英格兰，SE16 7DX。",
        expandedContent: "如有任何关于数据保护的问题，我们的专职数据保护官随时为您提供协助。该官员负责监督合规性，并以专业和经验回应您的关切。"
      },
      {
        icon: faDatabase,
        title: "数据收集",
        content: "当你访问我们的网站时，数据会自动发送到我们的服务器并临时存储。这包括 IP 地址、访问日期/时间、访问的文件以及其他必要的技术信息。",
        expandedContent: "这些数据用于确保稳定的连接，优化用户体验并维护系统安全和稳定性——这些标准以德国工艺的细致关怀得以维持。"
      },
      {
        icon: faLock,
        title: "数据披露",
        content: "你的个人数据仅在符合法律要求时披露，例如履行合同义务或满足监管要求。",
        expandedContent: "数据与第三方的分享仅在履行合同必要或你明确同意时发生。MADE-IN-GERMANY 保证未经你事先批准不会分享数据，确保信任和透明度。"
      },
      {
        icon: faUserCheck,
        title: "你的权利",
        content: "你有权请求信息、更正、删除和限制处理你的个人数据，符合 GDPR 规定。",
        expandedContent: "你可随时撤销对数据处理的同意。此外，你拥有数据可携权，如怀疑数据保护违规，可向监管机构投诉，体现我们让你掌控自己信息的承诺。"
      },
      {
        icon: faBell,
        title: "反对权",
        content: "如果数据处理基于合法利益，且无相反压倒性理由，你可以反对处理你的数据。",
        expandedContent: "反对可通过电子邮件或信函提交给 MADE-IN-GERMANY。收到后，我们将停止处理相关数据，除非能证明有强有力的合法理由继续，尊重你的偏好。"
      },
      {
        icon: faCopyright,
        title: "数据安全",
        content: "MADE-IN-GERMANY 采用最先进的安全措施，保护你的数据免受未经授权的访问、丢失或滥用。",
        expandedContent: "我们的强大安全框架包括先进的加密技术和定期审计，体现德国工程的精准和可靠性，随时保护你的信息。"
      },
      {
        icon: faFile,
        title: "更新与更改",
        content: "本隐私政策定期更新，以反映不断变化的法律标准或我们服务的改进。请查看我们网站上的最新版本。",
        expandedContent: "我们保留在必要时调整本政策的权利，以符合新法规或服务改进。最新的版本始终可在我们网站上找到，确保持续的透明度和最佳实践的一致性。"
      }
    ],
    buttonShowLess: "显示较少",
    buttonLearnMore: "了解更多",
    footerText: "致力于以德国精准保护你的隐私"
  },
  za: {
    headerTitle: "DATA BESKERMING",
    introTitle: "Jou privaatheid met presisie beskerm",
    contactInfo: "Vir optimale kommunikasie, voeg asseblief 'n dagkontaknommer by wanneer jy 'n e-pos stuur na info@made-in-germany.uk. Ons is ook bereikbaar via toonaangewende boodskapdienste, wat effektiewe en koste-effektiewe interaksie verseker. Vir die vinnigste respons, gebruik ons met Duitse presisie ontwerpte kontakvorm, wat jou toelaat om ons naadloos te bereik via telefoon, e-pos, boodskapper of die vorm self.",
    introImageAlt: "Data Beskerming",
    infoBoxes: [
      {
        icon: faShield,
        title: "Inleiding",
        content: "MADE-IN-GERMANY verbind hom tot die hoogste standaarde vir die beskerming van jou persoonlike data. Ons hanteer jou data vertroulik en in strikte ooreenstemming met die wettige databeskermingsregulasies en hierdie privaatheidsbeleid.",
        expandedContent: "Hierdie privaatheidsbeleid gee gedetailleerde insig in die aard, omvang en doel van die insameling en gebruik van persoonlike data op ons webwerf. Ons doel is om 'n veilige en betroubare digitale ervaring te waarborg, wat die presisie en betroubaarheid van die Duitse ingenieurskuns weerspieël."
      },
      {
        icon: faUserTie,
        title: "Verantwoordelike Party",
        content: "Die entiteit verantwoordelik vir dataverwerking op hierdie webwerf, ooreenkomstig die Algemene Databeskermingsverordening (GDPR), is MADE-IN-GERMANY, verteenwoordig deur Andreas Thommen. Kontak: Telefoon: +49 (0) 40 55123-10, E-pos: info@made-in-germany.uk, Adres: Victoria House 38 Surrey Quays Road, Londen, Engeland, SE16 7DX.",
        expandedContent: "Vir navrae oor databeskerming is ons toegewyde Databeskermingsbeampte beskikbaar om te help. Hierdie beampte hou toesig oor nakoming van regulasies en beantwoord jou bekommernisse met professionaliteit en kundigheid."
      },
      {
        icon: faDatabase,
        title: "Data-insameling",
        content: "Wanneer jy ons webwerf besoek, word data outomaties na ons bediener gestuur en tydelik gestoor. Dit sluit die IP-adres, datum en tyd van toegang, geraadpleegde lêers en addisionele tegniese inligting in.",
        expandedContent: "Hierdie data word verwerk om 'n stabiele verbinding te verseker, die gebruikerservaring te optimaliseer en die stelsel se veiligheid en stabiliteit te handhaaf – standaarde wat met die noukeurige sorg van Duitse vakmanskap gehandhaaf word."
      },
      {
        icon: faLock,
        title: "Data-openbaarmaking",
        content: "Jou persoonlike data word slegs bekendgemaak in ooreenstemming met wettige vereistes, soos die nakoming van kontrakverpligtinge of regulerende mandaten.",
        expandedContent: "Die deel van data met derdepartye geskied slegs indien nodig vir kontrakuitvoering of met jou uitdruklike toestemming. MADE-IN-GERMANY verseker dat geen data sonder jou voorafgaande goedkeuring gedeel word nie, wat vertroue en deursigtigheid waarborg."
      },
      {
        icon: faUserCheck,
        title: "Jou Regte",
        content: "Jy het reg op inligting, korreksie, verwydering en beperking van die verwerking van jou persoonlike data, in lyn met GDPR-bepalings.",
        expandedContent: "Jy kan te eniger tyd jou toestemming vir dataverwerking intrek. Verder het jy reg op data-oordraagbaarheid en kan jy 'n klag by 'n toesighoudende owerheid indien by vermoede van 'n databeskermingsoortreding, wat ons verbintenis tot jou beheer oor jou inligting weerspieël."
      },
      {
        icon: faBell,
        title: "Reg van Beswaar",
        content: "Jy kan beswaar maak teen die verwerking van jou data as dit op wettige belange berus en daar geen oorheersende redes teen is nie.",
        expandedContent: "Beswaar kan per e-pos of brief aan MADE-IN-GERMANY gerig word. Na ontvangs staak ons die verwerking van die betrokke data, tensy ons dwingende wettige gronde vir voortsetting kan bewys, met respek vir jou voorkeure."
      },
      {
        icon: faCopyright,
        title: "Data Sekuriteit",
        content: "MADE-IN-GERMANY gebruik die mees gevorderde sekuriteitsmaatreëls om jou data te beskerm teen ongemagtigde toegang, verlies of misbruik.",
        expandedContent: "Ons robuuste sekuriteitsraamwerk sluit gevorderde enkripsietegnieke en gereelde oudits in, wat die presisie en betroubaarheid van die Duitse ingenieurskuns beliggaam om jou inligting te alle tye te beskerm."
      },
      {
        icon: faFile,
        title: "Opdaterings & Veranderinge",
        content: "Hierdie privaatheidsbeleid word periodiek opgedateer om veranderende wettige norme of verbeterings aan ons dienste te weerspieël. Kontroleer die nuutste weergawe op ons webwerf.",
        expandedContent: "Ons behou die reg voor om hierdie beleid aan te pas om te voldoen aan nuwe regulasies of diensverbeterings. Die mees onlangse weergawe is altyd beskikbaar op ons webwerf, wat voortdurende deursigtigheid en belyning met beste praktyke waarborg."
      }
    ],
    buttonShowLess: "Wys Minder",
    buttonLearnMore: "Leer Meer",
    footerText: "Toegewyd aan jou privaatheid met Duitse presisie"
  },
  kr: {
    headerTitle: "데이터 보호",
    introTitle: "정확성으로 당신의 프라이버시를 보호",
    contactInfo: "최적의 커뮤니케이션을 위해 info@made-in-germany.uk로 이메일을 보낼 때 낮 시간에 연락할 수 있는 전화번호도 함께 제공해 주세요. 또한, 빠르고 비용 효율적인 소통을 보장하기 위해 주요 메신저 서비스를 통해 연락하실 수 있습니다. 가장 빠른 응답을 원하시면 독일 정밀 기술로 설계된 연락 양식을 이용해 주세요. 이를 통해 전화, 이메일, 메신저, 또는 연락 양식 등 여러분이 선호하는 방식으로 유연하게 저희에게 연락할 수 있습니다.",
    introImageAlt: "데이터 보호",
    infoBoxes: [
      {
        icon: faShield,
        title: "소개",
        content: "MADE-IN-GERMANY는 개인 데이터 보호의 최고 기준을 준수합니다. 우리는 당신의 개인 데이터를 최고 수준의 기밀로 취급하며, 적용 가능한 데이터 보호법과 이 개인정보 보호정책을 엄격히 준수합니다.",
        expandedContent: "이 개인정보 보호정책은 우리 웹사이트에서 개인 데이터의 수집 및 사용의 성격, 범위, 목적에 대한 상세한 통찰을 제공합니다. 우리는 독일 엔지니어링의 정밀성과 신뢰성을 반영한 안전하고 신뢰할 수 있는 디지털 경험을 보장하려고 합니다."
      },
      {
        icon: faUserTie,
        title: "책임 당사자",
        content: "일반 데이터 보호 규정(GDPR)에 따라 이 웹사이트의 데이터 처리를 책임지는 기관은 MADE-IN-GERMANY이며, Andreas Thommen이 대표합니다. 연락처: 전화: +49 (0) 40 55123-10, 이메일: info@made-in-germany.uk, 주소: Victoria House 38 Surrey Quays Road, 런던, 잉글랜드, SE16 7DX.",
        expandedContent: "데이터 보호에 관한 질문이 있으면, 전담 데이터 보호 담당자에게 연락할 수 있습니다. 이 담당자는 규정 준수를 감독하며, 전문성과 경험을 바탕으로 당신의 우려에 응답합니다."
      },
      {
        icon: faDatabase,
        title: "데이터 수집",
        content: "당신이 우리 웹사이트를 방문하면 데이터가 자동으로 서버로 전송되어 일시적으로 저장됩니다. 여기에는 IP 주소, 접속 날짜/시간, 접근한 파일 및 운영에 필수적인 추가 기술 정보가 포함됩니다.",
        expandedContent: "이 데이터는 안정적인 연결을 보장하고, 사용자 경험을 최적화하며, 시스템 보안과 안정성을 유지하기 위해 처리됩니다. 이는 독일 장인의 세심한 주의를 반영한 기준입니다."
      },
      {
        icon: faLock,
        title: "데이터 공개",
        content: "당신의 개인 데이터는 계약 이행이나 규제 의무와 같은 법적 요구 사항에 따라 공개됩니다.",
        expandedContent: "데이터는 계약 이행에 필요하거나 당신의 명시적 동의가 있을 경우에만 제3자에게 전달됩니다. MADE-IN-GERMANY는 당신의 사전 승인 없이 데이터를 공유하지 않으며, 이는 신뢰와 투명성을 보장합니다."
      },
      {
        icon: faUserCheck,
        title: "당신의 권리",
        content: "GDPR 조항에 따라 정보, 수정, 삭제, 처리 제한에 대한 권리가 있습니다.",
        expandedContent: "언제든지 데이터 처리에 대한 동의를 철회할 수 있으며, 데이터 이동성 권리와 데이터 보호 위반이 의심될 경우 감독 기관에 불만을 제기할 수 있습니다. 이는 당신이 자신의 정보에 대한 통제를 가질 수 있도록 하는 우리의 약속입니다."
      },
      {
        icon: faBell,
        title: "반대 권리",
        content: "데이터 처리가 정당한 이익에 기반하고 반대할 압도적인 이유가 없는 경우, 데이터 처리에 반대할 수 있습니다.",
        expandedContent: "반대는 이메일이나 편지로 MADE-IN-GERMANY에 제출할 수 있습니다. 수신 후, 처리에 대한 강력한 정당한 근거를 입증하지 않는 한 관련 데이터를 더 이상 처리하지 않으며, 이는 당신의 선호를 존중합니다."
      },
      {
        icon: faCopyright,
        title: "데이터 보안",
        content: "MADE-IN-GERMANY는 최신 보안 조치를 사용하여 당신의 데이터를 무단 액세스, 손실, 또는 오용으로부터 보호합니다.",
        expandedContent: "우리의 강력한 보안 프레임워크는 고급 암호화 기술과 정기적인 시스템 감사를 포함하며, 이는 독일 엔지니어링의 정밀성과 신뢰성을 구현하여 당신의 정보를 항상 보호합니다."
      },
      {
        icon: faFile,
        title: "업데이트 및 변경",
        content: "이 개인정보 보호정책은 진화하는 법적 기준이나 서비스 개선을 반영하기 위해 주기적으로 업데이트됩니다. 웹사이트에서 최신 버전을 확인해 주세요.",
        expandedContent: "우리는 새로운 규제나 서비스 개선에 맞춰 이 정책을 수정할 권리를 보유합니다. 최신 버전은 언제든지 웹사이트에서 확인 가능하며, 이는 지속적인 투명성과 모범 사례에의 정합성을 보장합니다."
      }
    ],
    buttonShowLess: "덜 보기",
    buttonLearnMore: "더 알아보기",
    footerText: "독일 정밀함으로 당신의 프라이버시를 보호합니다"
  },
  jp: {
    headerTitle: "データ保護",
    introTitle: "精密さであなたのプライバシーを守る",
    contactInfo: "最適なコミュニケーションのために、info@made-in-germany.ukにメールを送る際に日中に連絡できる電話番号もご提供ください。また、一般的なメッセージングサービスを通じてご連絡いただければ、迅速かつコスト効率の高いコミュニケーションをお約束します。最速の回答を得るには、ドイツの精密さで設計された連絡フォームをご利用ください。これにより、電話、メール、メッセージング、またはお問い合わせフォームなど、あなたが好む方法で柔軟に私たちに連絡できます。",
    introImageAlt: "データ保護",
    infoBoxes: [
      {
        icon: faShield,
        title: "はじめに",
        content: "MADE-IN-GERMANYは、個人データの保護において最高水準を追求します。私たちはあなたの個人データを最高の機密性で扱い、適用されるデータ保護法およびこのプライバシーポリシーに厳密に従います。",
        expandedContent: "このプライバシーポリシーは、当ウェブサイトでの個人データの収集と使用の性質、範囲、目的に関する詳細な洞察を提供します。私たちは、ドイツの工学に象徴される精密さと信頼性を反映した、安全かつ信頼性の高いデジタル体験を保証することを目指します。"
      },
      {
        icon: faUserTie,
        title: "責任者",
        content: "一般データ保護規則（GDPR）の意味において、このウェブサイトのデータ処理を担当するエンティティは、Andreas Thommenが代表するMADE-IN-GERMANYです。連絡先：電話：+49 (0) 40 55123-10、メール：info@made-in-germany.uk、住所：Victoria House 38 Surrey Quays Road、ロン ドン、イングランド、SE16 7DX。",
        expandedContent: "データ保護に関する質問がある場合、専任のデータ保護責任者がサポートを提供します。この責任者は規制の遵守を監督し、プロフェッショナリズムと専門知識を持ってあなたの懸念に対応します。"
      },
      {
        icon: faDatabase,
        title: "データ収集",
        content: "当ウェブサイトを訪問すると、データが自動的にサーバーに送信され、一時的に保存されます。これにはIPアドレス、アクセス日時、アクセスしたファイル、および運用に必要な追加技術情報が含まれます。",
        expandedContent: "これらのデータは、安定した接続を確保し、ユーザー体験を最適化し、システムのセキュリティと安定性を維持するために処理されます。これはドイツの職人技の細心の注意を反映した基準です。"
      },
      {
        icon: faLock,
        title: "データの開示",
        content: "あなたの個人データは、契約の履行や規制上の義務など、法律要件に沿ってのみ開示されます。",
        expandedContent: "データは契約履行に必要であるか、あなたの明示的な同意がある場合にのみ第三者に渡されます。MADE-IN-GERMANYは、あなたの事前承認なしにデータを共有せず、信頼と透明性を確保します。"
      },
      {
        icon: faUserCheck,
        title: "あなたの権利",
        content: "GDPRの規定に基づき、情報、修正、削除、個人データの処理制限を求める権利があります。",
        expandedContent: "いつでもデータ処理に対する同意を撤回でき、データポータビリティの権利があり、データ保護違反が疑われる場合は監督機関に苦情を申し立てることができます。これはあなたが自分の情報に対してコントロールを持つことを可能にする私たちの約束です。"
      },
      {
        icon: faBell,
        title: "異議申し立ての権利",
        content: "データ処理が正当な利益に基づいており、反対する圧倒的な理由がない場合、データ処理に異議を唱えることができます。",
        expandedContent: "異議はメールまたは手紙でMADE-IN-GERMANYに提出できます。受領後、処理に対する強力な正当な理由を証明できない限り、関連データをこれ以上処理せず、あなたの好みを尊重します。"
      },
      {
        icon: faCopyright,
        title: "データセキュリティ",
        content: "MADE-IN-GERMANYは、最新のセキュリティ対策を採用し、あなたのデータを不正アクセス、紛失、または誤使用から保護します。",
        expandedContent: "私たちの堅牢なセキュリティフレームワークには、先進的な暗号化技術と定期的なシステム監査が含まれ、ドイツの工学の精密さと信頼性を体現し、常にあなたの情報を保護します。"
      },
      {
        icon: faFile,
        title: "更新と変更",
        content: "このプライバシーポリシーは、進化する法的基準やサービスの向上を反映して定期的に更新されます。ウェブサイトで最新バージョンをご確認ください。",
        expandedContent: "私たちは、新しい規制やサービス改善に適応するためにこのポリシーを修正する権利を留保します。最新バージョンはいつでもウェブサイトで確認でき、継続的な透明性とベストプラクティスの整合性を保証します。"
      }
    ],
    buttonShowLess: "表示を減らす",
    buttonLearnMore: "詳しく知る",
    footerText: "ドイツの精密さであなたのプライバシーを守ります"
  }
};

const DataProtectionModal: React.FC<DataProtectionModalProps> = ({ isOpen, onClose, language = 'en' }) => {
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
  };return (
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
                    whileHover={{ scale: 1.05, backgroundColor: '' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-[#FFFFFF] rounded-[5px] transition-colors flex items-center gap-2 border border-[#0B111F] text-xs sm:text-sm mobile-close-button"
                  >
                    <span className="font-medium">Close </span>
                    <FontAwesomeIcon icon={faXmark} size="sm" className="sm:size-lg hidden sm:inline" />
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
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-5"
                >
                  {translations.introTitle}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-left text-sm sm:text-base text-gray-400 mb-0"
                >
                  {renderContactInfo()}
                </motion.p>
                  {/* Mobile-only spacer - top */}
                  <div className="h-10 sm:h-0 md:h-0 lg:h-0"></div>
                <motion.div
                  className="mt-[-30px] relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mb-0 rounded-2xl overflow-hidden mobile-image-container"
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
                className="mt-[-60px] sm:px-6 md:px- grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
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
                    }}
                  >
                    <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <FontAwesomeIcon icon={box.icon} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#FFFFFF]" />
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

export default DataProtectionModal;