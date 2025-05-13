import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faDatabase, faUserTie, faShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { X, Phone, Mail, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define props interface for ImprintModal
interface ImprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

// Define translations for ImprintModal content
const TRANSLATIONS: Record<string, {
  title: string;
  heroTitle: string;
  contactInfo: string;
  infoBoxes: {
    title: string;
    content: string;
    expandedContent: string;
  }[];
  buttonShowLess: string;
  buttonLearnMore: string;
  buttonClose: string;
  footerText: string;
}> = {
  en: {
    title: "IMPRINT",
    heroTitle: "Excellence in Service – Your German Engineering Partner",
    contactInfo: "For optimal communication, please include a daytime contact number when emailing us at info@made-in-germany.uk. We are also accessible via leading messenger services, ensuring efficient and cost-effective interaction. For the swiftest response, utilize our expertly designed contact form, a hallmark of German precision, allowing you to connect with us seamlessly via phone, email, messenger, or the form itself.",
    infoBoxes: [
      {
        title: "Company Information",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Represented by CEO:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **Email:**
                  info@made-in-germany.uk
                  **Legal Coordinator:**
                  Martin Bührmann
                  m.buehrmann@made-in-germany.global
                  **Responsible for the content:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, London, England, SE16 7DX`,
        expandedContent: `As a proud representative of German engineering, we uphold the highest standards of transparency and legal compliance. Our dedicated team ensures all information is meticulously accurate and current, reflecting the precision synonymous with MADE IN GERMANY © .`
      },
      {
        title: "Disclaimer",
        content: `As a service provider, we take full responsibility for our own content under applicable international laws. We are not obligated to monitor third-party information or investigate potential illegal activities unless required by law. Obligations to remove or block content remain intact, with liability commencing only upon knowledge of a specific infringement, which we address immediately upon detection.`,
        expandedContent: `Our commitment to excellence, rooted in German engineering principles, ensures continuous monitoring and updating of content to meet rigorous international standards while delivering exceptional value to our global audience.`
      },
      {
        title: "Copyright",
        content: `All content and works on this site, crafted by our team, are protected under international copyright laws. Reproduction, processing, distribution, or any exploitation beyond the scope of copyright requires written consent from the respective author or creator. Downloads and copies are permitted solely for private, non-commercial use, reflecting our dedication to intellectual property integrity.`,
        expandedContent: `Embodying the MADE IN GERMANY ©  ethos, we safeguard intellectual property with utmost diligence, ensuring compliance with international copyright laws while fostering innovation and creativity.`
      }
    ],
    buttonShowLess: "Show Less",
    buttonLearnMore: "Learn More",
    buttonClose: "Close",
    footerText: "With German Precision, Your MADE IN GERMANY ©  Team"
  },
  de: {
    title: "IMPRESSUM",
    heroTitle: "Exzellenz im Service – Ihr deutscher Ingenieurpartner",
    contactInfo: "Für optimale Kommunikation geben Sie bitte eine Tageskontaktnummer bei E-Mails an info@made-in-germany.uk an. Wir sind auch über führende Messenger-Dienste erreichbar, um effiziente und kostengünstige Interaktionen zu gewährleisten. Für die schnellste Antwort nutzen Sie unser präzise gestaltetes Kontaktformular, ein Markenzeichen deutscher Präzision, das Ihnen ermöglicht, uns nahtlos per Telefon, E-Mail, Messenger oder Formular zu erreichen.",
    infoBoxes: [
      {
        title: "Firmeninformationen",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Vertreten durch Geschäftsführer:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **E-Mail:**
                  info@made-in-germany.uk
                  **Rechtlicher Koordinator:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Verantwortlich für den Inhalt:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, London, England, SE16 7DX`,
        expandedContent: `Als stolzer Vertreter deutscher Ingenieurskunst halten wir die höchsten Standards an Transparenz und gesetzlicher Einhaltung ein. Unser engagiertes Team stellt sicher, dass alle Informationen mit der Präzision, die für MADE IN GERMANY ©  steht, akkurat und aktuell sind.`
      },
      {
        title: "Haftungsausschluss",
        content: `Als Diensteanbieter übernehmen wir die volle Verantwortung für unsere eigenen Inhalte gemäß geltenden internationalen Gesetzen. Wir sind nicht verpflichtet, fremde Informationen zu überwachen oder nach potenziellen illegalen Aktivitäten zu forschen, es sei denn, dies ist gesetzlich vorgeschrieben. Verpflichtungen zur Entfernung oder Sperrung von Inhalten bleiben bestehen, wobei die Haftung erst bei Kenntnis einer konkreten Verletzung beginnt, die wir sofort beheben.`,
        expandedContent: `Unser Engagement für Exzellenz, verwurzelt in den Prinzipien deutscher Ingenieurskunst, sichert eine kontinuierliche Überwachung und Aktualisierung des Inhalts, um internationale Standards zu erfüllen und unserem globalen Publikum außergewöhnlichen Wert zu bieten.`
      },
      {
        title: "Urheberrecht",
        content: `Alle Inhalte und Werke auf dieser Seite, von unserem Team gestaltet, sind durch internationale Urheberrechtsgesetze geschützt. Vervielfältigung, Bearbeitung, Verbreitung oder jede Nutzung außerhalb der Urheberrechtsgrenzen erfordert die schriftliche Zustimmung des jeweiligen Autors oder Schöpfers. Downloads und Kopien sind ausschließlich für privaten, nicht-kommerziellen Gebrauch erlaubt, was unsere Hingabe an die Integrität des geistigen Eigentums widerspiegelt.`,
        expandedContent: `In der Tradition von MADE IN GERMANY ©  schützen wir geistiges Eigentum mit höchster Sorgfalt und stellen die Einhaltung internationaler Urheberrechtsgesetze sicher, während wir Innovation und Kreativität fördern.`
      }
    ],
    buttonShowLess: "Weniger anzeigen",
    buttonLearnMore: "Mehr erfahren",
    buttonClose: "SCHLIESSEN",
    footerText: "Mit deutscher Präzision, Ihr MADE IN GERMANY ©  Team"
  },
  es: {
    title: "IMPRENTA",
    heroTitle: "Excelencia en Servicio – Su Socio de Ingeniería Alemana",
    contactInfo: "Para una comunicación óptima, incluya un número de contacto diurno al enviarnos un correo electrónico a info@made-in-germany.uk. También estamos disponibles a través de los principales servicios de mensajería, garantizando una interacción eficiente y económica. Para la respuesta más rápida, utilice nuestro formulario de contacto diseñado con precisión alemana, permitiéndole conectarse con nosotros sin inconvenientes por teléfono, correo electrónico, mensajería o el formulario mismo.",
    infoBoxes: [
      {
        title: "Información de la Empresa",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Representado por CEO:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **Correo electrónico:**
                  info@made-in-germany.uk
                  **Coordinador Legal:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Responsable del contenido:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, Londres, Inglaterra, SE16 7DX`,
        expandedContent: `Como orgulloso representante de la ingeniería alemana, mantenemos los más altos estándares de transparencia y cumplimiento legal. Nuestro equipo dedicado asegura que toda la información sea meticulosamente precisa y actual, reflejando la precisión sinónimo de MADE IN GERMANY © .`
      },
      {
        title: "Descargo de responsabilidad",
        content: `Como proveedores de servicios, asumimos plena responsabilidad por nuestro contenido bajo las leyes internacionales aplicables. No estamos obligados a monitorear información de terceros ni a investigar posibles actividades ilegales a menos que la ley lo requiera. Las obligaciones de eliminar o bloquear contenido permanecen vigentes, con responsabilidad que comienza solo al conocer una infracción específica, la cual abordamos de inmediato.`,
        expandedContent: `Nuestro compromiso con la excelencia, arraigado en los principios de la ingeniería alemana, asegura una supervisión y actualización continua del contenido para cumplir con rigurosos estándares internacionales y ofrecer un valor excepcional a nuestra audiencia global.`
      },
      {
        title: "Derechos de autor",
        content: `Todo el contenido y las obras en este sitio, creados por nuestro equipo, están protegidos por leyes internacionales de derechos de autor. La reproducción, procesamiento, distribución o cualquier explotación más allá de los límites del derecho de autor requiere el consentimiento escrito del autor o creador respectivo. Las descargas y copias están permitidas únicamente para uso privado y no comercial, reflejando nuestro compromiso con la integridad de la propiedad intelectual.`,
        expandedContent: `Encarnando el espíritu de MADE IN GERMANY © , protegemos la propiedad intelectual con el mayor cuidado, asegurando el cumplimiento de las leyes internacionales de derechos de autor mientras fomentamos la innovación y la creatividad.`
      }
    ],
    buttonShowLess: "Mostrar menos",
    buttonLearnMore: "Saber más",
    buttonClose: "CERRAR",
    footerText: "Con Precisión Alemana, Su Equipo MADE IN GERMANY © "
  },
  fr: {
    title: "MENTIONS LÉGALES",
    heroTitle: "Excellence au Service – Votre Partenaire en Ingénierie Allemande",
    contactInfo: "Pour une communication optimale, veuillez inclure un numéro de contact diurne dans vos e-mails envoyés à info@made-in-germany.uk. Nous sommes également accessibles via les principaux services de messagerie, garantissant une interaction efficace et économique. Pour une réponse rapide, utilisez notre formulaire de contact conçu avec la précision allemande, vous permettant de nous joindre sans effort par téléphone, e-mail, messagerie ou le formulaire lui-même.",
    infoBoxes: [
      {
        title: "Informations sur l'Entreprise",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Représenté par PDG:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **Email:**
                  info@made-in-germany.uk
                  **Coordinateur Juridique:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Responsable du contenu:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, Londres, Angleterre, SE16 7DX`,
        expandedContent: `En tant que fier représentant de l’ingénierie allemande, nous maintenons les plus hauts standards de transparence et de conformité légale. Notre équipe dédiée garantit que toutes les informations sont minutieusement précises et à jour, reflétant la précision emblématique de MADE IN GERMANY © .`
      },
      {
        title: "Avertissement",
        content: `En tant que prestataire de services, nous assumons pleinement la responsabilité de notre contenu sous les lois internationales applicables. Nous ne sommes pas tenus de surveiller les informations de tiers ou d’enquêter sur d’éventuelles activités illégales sauf si la loi l’exige. Les obligations de suppression ou de blocage du contenu restent intactes, la responsabilité commençant uniquement à la connaissance d’une infraction spécifique, que nous traitons immédiatement.`,
        expandedContent: `Notre engagement envers l’excellence, ancré dans les principes de l’ingénierie allemande, assure une surveillance et une mise à jour continues du contenu pour répondre aux normes internationales rigoureuses tout en offrant une valeur exceptionnelle à notre audience mondiale.`
      },
      {
        title: "Droits d’auteur",
        content: `Tous les contenus et œuvres de ce site, créés par notre équipe, sont protégés par les lois internationales sur le droit d’auteur. Toute reproduction, traitement, distribution ou exploitation au-delà des limites du droit d’auteur nécessite le consentement écrit de l’auteur ou du créateur respectif. Les téléchargements et copies sont autorisés uniquement pour un usage privé et non commercial, témoignant de notre dévouement à l’intégrité de la propriété intellectuelle.`,
        expandedContent: `Portant l’esprit de MADE IN GERMANY © , nous protégeons la propriété intellectuelle avec le plus grand soin, assurant le respect des lois internationales sur le droit d’auteur tout en favorisant l’innovation et la créativité.`
      }
    ],
    buttonShowLess: "Montrer moins",
    buttonLearnMore: "En savoir plus",
    buttonClose: "FERMER",
    footerText: "Avec la Précision Allemande, Votre Équipe MADE IN GERMANY © "
  },
  it: {
    title: "IMPRESSUM",
    heroTitle: "Eccellenza nel Servizio – Il Tuo Partner di Ingegneria Tedesca",
    contactInfo: "Per una comunicazione ottimale, includi un numero di contatto diurno quando ci invii un’e-mail a info@made-in-germany.uk. Siamo anche raggiungibili tramite i principali servizi di messaggistica, garantendo un’interazione efficiente e conveniente. Per una risposta rapida, utilizza il nostro formulario di contatto progettato con la precisione tedesca, permettendoti di contattarci senza problemi tramite telefono, e-mail, messaggistica o il formulario stesso.",
    infoBoxes: [
      {
        title: "Informazioni sull'Azienda",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Rappresentato da CEO:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **Email:**
                  info@made-in-germany.uk
                  **Coordinatore Legale:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Responsabile dei contenuti:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, Londra, Inghilterra, SE16 7DX`,
        expandedContent: `Come orgoglioso rappresentante dell’ingegneria tedesca, manteniamo i più alti standard di trasparenza e conformità legale. Il nostro team dedicato garantisce che tutte le informazioni siano accuratamente precise e aggiornate, riflettendo la precisione sinonimo di MADE IN GERMANY © .`
      },
      {
        title: "Esclusione di responsabilità",
        content: `Come fornitori di servizi, ci assumiamo piena responsabilità per i nostri contenuti secondo le leggi internazionali applicabili. Non siamo obbligati a monitorare le informazioni di terze parti o ad indagare su possibili attività illegali a meno che non sia richiesto dalla legge. Gli obblighi di rimozione o blocco dei contenuti rimangono invariati, con responsabilità che inizia solo alla conoscenza di una specifica violazione, che affrontiamo immediatamente.`,
        expandedContent: `Il nostro impegno per l’eccellenza, radicato nei principi dell’ingegneria tedesca, assicura un monitoraggio e un aggiornamento continui dei contenuti per soddisfare rigorosi standard internazionali, offrendo un valore eccezionale al nostro pubblico globale.`
      },
      {
        title: "Diritti d’autore",
        content: `Tutti i contenuti e le opere su questo sito, creati dal nostro team, sono protetti dalle leggi internazionali sul diritto d’autore. La riproduzione, l’elaborazione, la distribuzione o qualsiasi sfruttamento oltre i limiti del diritto d’autore richiede il consenso scritto dell’autore o del creatore rispettivo. I download e le copie sono permessi solo per uso privato e non commerciale, testimoniando il nostro impegno per l’integrità della proprietà intellettuale.`,
        expandedContent: `Rappresentando lo spirito di MADE IN GERMANY © , proteggiamo la proprietà intellettuale con la massima cura, garantendo il rispetto delle leggi internazionali sul diritto d’autore mentre promuoviamo innovazione e creatività.`
      }
    ],
    buttonShowLess: "Mostra meno",
    buttonLearnMore: "Scopri di più",
    buttonClose: "CHIUDI",
    footerText: "Con Precisione Tedesca, Il Tuo Team MADE IN GERMANY © "
  },
  nl: {
    title: "IMPRESSUM",
    heroTitle: "Uitmuntendheid in Service – Uw Duitse Ingenieurs Partner",
    contactInfo: "Voor optimale communicatie, voeg alstublieft een dagkontaktnummer toe bij het sturen van een e-mail naar info@made-in-germany.uk. Wij zijn ook bereikbaar via toonaangevende messengerservices, wat zorgt voor efficiënte en koste-effectieve interactie. Voor de snelste reactie, maak gebruik van ons met Duitse precisie ontworpen contactformulier, waarmee u ons naadloos kunt bereiken via telefoon, e-mail, messenger of het formulier zelf.",
    infoBoxes: [
      {
        title: "Bedrijfsinformatie",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Vertegenwoordigd door CEO:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **E-mail:**
                  info@made-in-germany.uk
                  **Juridisch Coördinator:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Verantwoordelijk voor de inhoud:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, Londen, Engeland, SE16 7DX`,
        expandedContent: `Als trotse vertegenwoordiger van de Duitse ingenieurskunst handhaven wij de hoogste standaarden van transparantie en wettelijke naleving. Ons toegewijde team zorgt ervoor dat alle informatie met de precisie die kenmerkend is voor MADE IN GERMANY © , akkuraat en actueel is.`
      },
      {
        title: "Disclaimer",
        content: `Als dienstverlener nemen wij volledige verantwoordelijkheid voor onze eigen inhoud onder toepasselijke internationale wetten. Wij zijn niet verplicht om informatie van derden te monitoren of omstandigheden te onderzoeken die wijzen op illegale activiteiten, tenzij dit wettelijk vereist is. Verplichtingen om inhoud te verwijderen of te blokkeren onder de wet blijven van kracht, waarbij aansprakelijkheid pas begint bij kennis van een specifieke overtreding, die wij onmiddellijk aanpakken.`,
        expandedContent: `Onze toewijding aan uitmuntendheid, geworteld in de beginsels van Duitse ingenieurskunst, zorgt voor continue monitoring en updating van inhoud om internationale standaarden te voldoen en uitzonderlijke waarde te bieden aan ons wereldwijde publiek.`
      },
      {
        title: "Auteursrecht",
        content: `Alle inhoud en werken op deze site, gecreëerd door ons team, zijn beschermd onder internationale auteursrechtwetten. Duplikasie, verwerking, distributie of enige exploitatie buiten de grenzen van het auteursrecht vereist schriftelijke toestemming van de respectieve auteur of maker. Downloads en kopieën zijn uitsluitend toegestaan voor privé, niet-commercieel gebruik, wat onze toewijding aan de integriteit van intellectueel eigendom weerspiegelt.`,
        expandedContent: `In de geest van MADE IN GERMANY ©  beschermen wij intellectuele eigendomsrechten met de grootst mogelijke zorg, waarborgend nakoming van internationale auteursrechtwetten terwijl wij innovatie en creativiteit stimuleren.`
      }
    ],
    buttonShowLess: "Toon minder",
    buttonLearnMore: "Meer informatie",
    buttonClose: "SLUITEN",
    footerText: "Met Duitse Precisie, Uw MADE IN GERMANY ©  Team"
  },
  sa: {
    title: "بصمة",
    heroTitle: "التميز في الخدمة – شريكك في الهندسة الألمانية",
    contactInfo: "للحصول على أفضل تواصل، يرجى تضمين رقم اتصال نهاري عند إرسال بريد إلكتروني إلى info@made-in-germany.uk. نحن أيضًا متاحون عبر خدمات المراسلة الرائدة، مما يضمن تفاعلاً فعالاً وذا تكلفة منخفضة. للحصول على استجابة سريعة، استخدم نموذج الاتصال الخاص بنا المصمم بدقة ألمانية، مما يتيح لك التواصل معنا بسلاسة عبر الهاتف، البريد الإلكتروني، المراسلة، أو النموذج نفسه.",
    infoBoxes: [
      {
        title: "معلومات الشركة",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **يمثلها الرئيس التنفيذي:**
                  أندرياس تومن
                  **واتساب:**
                  +49 (0) 1575 370 3790
                  **البريد الإلكتروني:**
                  info@made-in-germany.uk
                  **المنسق القانوني:**
                  مارتن بوهرمان
                  m.bührmann@made-in-germany.global
                  **المسؤول عن المحتوى:**
                  MADE IN GERMANY ©  AG - UK LIMITED، Victoria House، 38 Surrey Quays Road، لندن، إنجلترا، SE16 7DX`,
        expandedContent: `كممثل فخور للهندسة الألمانية، نحن نحافظ على أعلى معايير الشفافية والامتثال القانوني. فريقنا المكرس يضمن أن تكون جميع المعلومات دقيقة ومحدثة بدقة تعكس سمة MADE IN GERMANY © .`
      },
      {
        title: "إخلاء المسؤولية",
        content: `كمقدمي خدمات، نتحمل مسؤولية كاملة عن محتوياتنا الخاصة وفقًا للقوانين الدولية المعمول بها. لسنا ملزمين بمراقبة المعلومات من طرف ثالث أو التحقيق في النشاطات غير القانونية المحتملة ما لم تكن مطلوبة قانونًا. الالتزامات بإزالة أو حظر المحتوى تبقى سارية، مع بدء المسؤولية فقط عند معرفة انتهاك محدد، ونعالجه فورًا.`,
        expandedContent: `التزامنا بالتميز، مستند إلى مبادئ الهندسة الألمانية، يضمن مراقبة وتحديث المحتوى المستمر لتلبية المعايير الدولية الصارمة مع تقديم قيمة استثنائية لجمهورنا العالمي.`
      },
      {
        title: "حقوق الطبع والنشر",
        content: `كل المحتوى والأعمال على هذا الموقع، المصممة بواسطة فريقنا، محمية بموجب قوانين حقوق الطبع والنشر الدولية. التكرار، المعالجة، التوزيع، أو أي استغلال خارج حدود حقوق الطبع والنشر يتطلب موافقة كتابية من المؤلف أو المنشئ المعني. التنزيلات والنسخ مسموح بها فقط للاستخدام الخاص غير التجاري، مما يعكس التزامنا بسلامة الملكية الفكرية.`,
        expandedContent: `معبرين عن روح MADE IN GERMANY © ، نحمي الملكية الفكرية بدقة عالية، مضمنين الامتثال لقوانين حقوق الطبع والنشر الدولية مع تعزيز الابتكار والإبداع.`
      }
    ],
    buttonShowLess: "عرض أقل",
    buttonLearnMore: "معرفة المزيد",
    buttonClose: "إغلاق",
    footerText: "بدقة ألمانية، فريقك MADE IN GERMANY © "
  },
  hk: {
    title: "版權聲明",
    heroTitle: "服務卓越 – 您的德國工程夥伴",
    contactInfo: "為確保最佳溝通，請喺寄電郵畀我哋時一併提供一個日間聯絡號碼至 info@made-in-germany.uk。我哋亦透過領先嘅通訊軟件提供服務，確保高效同經濟嘅互動。為獲得最快回覆，請使用我哋以德國精確度設計嘅聯絡表格，容許你透過電話、電郵、通訊軟件或表格本身靈活聯繫我哋。",
    infoBoxes: [
      {
        title: "公司資訊",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **行政總裁代表:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **電郵:**
                  info@made-in-germany.uk
                  **法律協調員:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **負責內容:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, 倫敦, 英格蘭, SE16 7DX`,
        expandedContent: `作為德國工程嘅驕傲代表，我哋維持最高嘅透明度同法律合規標準。吾哋嘅專注團隊確保所有資訊以MADE IN GERMANY © 嘅精確度，準確同更新。`
      },
      {
        title: "免責聲明",
        content: `作為服務提供者，我哋根據適用嘅國際法律對呢啲頁面嘅自有內容負責。我哋無義務監控第三方傳輸或儲存嘅資訊，或調查可能顯示非法活動嘅情況，除非法律要求。移除或阻止資訊使用嘅義務唔受影響，責任只喺知道具體違規行為時先有可能，吾哋會即刻處理相應嘅違規行為。`,
        expandedContent: `我哋對卓越嘅承諾，植根於德國工程原則，確保持續監控同更新內容，以符合嚴格嘅國際標準，同時為全球觀眾提供超卓價值。`
      },
      {
        title: "版權",
        content: `網站運營者喺呢啲頁面創建嘅所有內容同作品受國際版權法約束。複製、加工、分發同任何超出版權法限制嘅利用行為，需得到相關作者或創作者嘅書面同意。呢個網站嘅下載同複製僅限私人非商業用途，反映我哋對知識產權完整性嘅承諾。`,
        expandedContent: `體現MADE IN GERMANY © 嘅精神，我哋以最高嘅專注力保護知識產權，確保符合國際版權法，同時推動創新同創意。`
      }
    ],
    buttonShowLess: "顯示較少",
    buttonLearnMore: "了解更多",
    buttonClose: "關閉",
    footerText: "以德國精確度，您的MADE IN GERMANY © 團隊"
  },
  sg: {
    title: "版权声明",
    heroTitle: "服务卓越 – 您的德国工程伙伴",
    contactInfo: "为确保最佳沟通，请在发送电子邮件至 info@made-in-germany.uk 时一并提供一个白天联系号码。我们还通过领先的消息服务提供支持，确保高效且经济实惠的互动。为获得最快回复，请使用我们以德国精度设计联系表格，允许您通过电话、电子邮件、消息服务或表格本身灵活联系我们。",
    infoBoxes: [
      {
        title: "公司信息",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **首席执行官代表:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **电子邮件:**
                  info@made-in-germany.uk
                  **法律协调员:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **负责内容:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, 伦敦, 英格兰, SE16 7DX`,
        expandedContent: `作为德国工程的骄傲代表，我们保持最高的透明度和法律合规标准。我们的专注团队确保所有信息以MADE IN GERMANY © 的精度，准确且更新。`
      },
      {
        title: "免责声明",
        content: `作为服务提供者，我们根据适用的国际法律对这些页面上的自有内容负责。我们无义务监控第三方传输或存储的信息，或调查可能显示非法活动的情况，除非法律要求。移除或阻止信息使用的义务不受影响，责任仅在知道具体违规行为时才有可能，我们会立即处理相应的违规行为。`,
        expandedContent: `我们对卓越的承诺，植根于德国工程原则，确保持续监控和更新内容，以符合严格的国际标准，同时为全球观众提供超卓价值。`
      },
      {
        title: "版权",
        content: `网站运营者创建的这些页面上的所有内容和工作受国际版权法约束。复制、加工、分发以及任何超出版权法限制的利用行为，需得到相关作者或创作者的书面同意。本网站的下载和复制仅限私人非商业用途，反映我们对知识产权完整性的承诺。`,
        expandedContent: `体现MADE IN GERMANY © 的精神，我们以最高专注力保护知识产权，确保符合国际版权法，同时推动创新和创意。`
      }
    ],
    buttonShowLess: "显示较少",
    buttonLearnMore: "了解更多",
    buttonClose: "关闭",
    footerText: "以德国精度，您的MADE IN GERMANY © 团队"
  },
  za: {
    title: "AFDRUK",
    heroTitle: "Uitnemendheid in Diens – Jou Duitse Ingenieurs Vennoot",
    contactInfo: "Vir optimale kommunikasie, voeg asseblief 'n dagkontaknommer by wanneer jy 'n e-pos stuur na info@made-in-germany.uk. Ons is ook bereikbaar via toonaangewende boodskappendiensse, wat effektiewe en koste-effektiewe interaksie verseker. Vir die vinnigste respons, gebruik ons met Duitse presisie ontwerpte kontakvorm, wat jou toelaat om ons naadloos te bereik via telefoon, e-pos, boodskapper of die vorm self.",
    infoBoxes: [
      {
        title: "Maatskappy Inligting",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **Verteenwoordig deur HUB:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **E-pos:**
                  info@made-in-germany.uk
                  **Juridiese Koördineerder:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **Verantwoordelik vir die inhoud:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, Londen, Engeland, SE16 7DX`,
        expandedContent: `As 'n trotse verteenwoordiger van Duitse ingenieurskuns, handhaaf ons die hoogste standaarde van deursigtigheid en wettelike nakoming. Ons toegewyde span verseker dat alle inligting met die presisie wat kenmerkend is vir MADE IN GERMANY © , akkuraat en op datum is.`
      },
      {
        title: "Vrywaring",
        content: `As diensverskaffer neem ons volle verantwoordelikheid vir ons eie inhoud onder toepaslike internasionale wette. Ons is nie verplig om derdeparty-inligting te monitor of omstandighede wat op onwettige aktiwiteite dui te ondersoek nie, tensy dit wettiglik vereis word. Verpligtinge om inhoud te verwyder of te blokkeer bly onaangetas, met aanspreeklikheid wat eers begin by kennis van 'n spesifieke oortreding, wat ons onmiddellik aanspreek.`,
        expandedContent: `Ons toewyding aan uitnemendheid, gewortel in die beginsels van Duitse ingenieurskuns, verseker deurlopende monitering en opdatering van inhoud om internasionale standaarde te voldoen en uitsonderlike waarde te lewer aan ons globale gehoor.`
      },
      {
        title: "Kopiereg",
        content: `Alle inhoud en werke op hierdie webwerf, geskep deur ons span, is beskerm deur internasionale kopieregwetgewing. Duplikasie, verwerking, verspreiding of enige uitbuiting buite die grense van kopiereg vereis skriftelike toestemming van die onderskeie outeur of skepper. Aflaaie en kopieë is slegs toegelaat vir private, nie-kommersiële gebruik, wat ons toewyding aan die integriteit van intellektuele eiendom weerspieël.`,
        expandedContent: `In die gees van MADE IN GERMANY ©  beskerm ons intellektuele eiendomsregte met uiterste sorg, waarborgend nakoming van internasionale kopieregwetgewing terwyl ons innovasie en kreatiwiteit aanmoedig.`
      }
    ],
    buttonShowLess: "Wys minder",
    buttonLearnMore: "Leer meer",
    buttonClose: "SLUIT",
    footerText: "Met Duitse Presisie, Jou MADE IN GERMANY ©  Span"
  },
  kr: {
    title: "임프린트",
    heroTitle: "서비스의 우수성 – 귀하의 독일 엔지니어링 파트너",
    contactInfo: "최적의 커뮤니케이션을 위해 info@made-in-germany.uk로 이메일을 보낼 때 낮 시간에 연락할 수 있는 번호를 포함해 주세요. 저희는 주요 메신저 서비스를 통해 연락이 가능하며, 효율적이고 비용 효율적인 상호작용을 보장합니다. 가장 빠른 응답을 원하시면 독일 정밀 기술로 설계된 연락 양식을 이용해 주세요. 이를 통해 전화, 이메일, 메신저, 또는 양식 자체를 통해 원활하게 저희와 연결하실 수 있습니다.",
    infoBoxes: [
      {
        title: "회사 정보",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **최고경영자 대표:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **이메일:**
                  info@made-in-germany.uk
                  **법률 조정자:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **콘텐츠 책임자:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, 런던, 잉글랜드, SE16 7DX`,
        expandedContent: `독일 엔지니어링의 자랑스러운 대표로서, 저희는 투명성과 법적 준수에 있어 최고의 기준을 유지합니다. 저희 헌신적인 팀은 MADE IN GERMANY © 의 정밀함을 반영하여 모든 정보가 정확하고 최신 상태임을 보장합니다.`
      },
      {
        title: "면책 조항",
        content: `서비스 제공자로서 저희는 적용 가능한 국제법에 따라 자체 콘텐츠에 대해 전적인 책임을 집니다. 법률에 의해 요구되지 않는 한, 제3자가 전송하거나 저장한 정보를 모니터링하거나 불법 활동을 나타낼 수 있는 상황을 조사할 의무는 없습니다. 콘텐츠를 제거하거나 차단해야 하는 의무는 유지되며, 구체적인 위반 사항을 알게 된 시점부터 책임이 발생하며, 이를 즉시 처리합니다.`,
        expandedContent: `독일 엔지니어링 원칙에 뿌리를 둔 저희의 우수성에 대한 약속은 콘텐츠를 지속적으로 모니터링하고 업데이트하여 엄격한 국제 표준을 충족하고 글로벌 사용자에게 탁월한 가치를 제공합니다.`
      },
      {
        title: "저작권",
        content: `이 사이트의 모든 콘텐츠와 작품은 저희 팀이 제작한 것으로, 국제 저작권법의 보호를 받습니다. 저작권법의 범위를 넘어서는 복제, 가공, 배포 또는 어떠한 활용도 관련 저자 또는 창작자의 서면 동의가 필요합니다. 다운로드와 복사는 개인적, 비상업적 용도로만 허용되며, 이는 지적 재산권의 무결성에 대한 저희의 헌신을 반영합니다.`,
        expandedContent: `MADE IN GERMANY © 의 정신을 구현하며, 저희는 지적 재산권을 최대한 신중히 보호하며, 국제 저작권법을 준수하면서 혁신과 창의성을 장려합니다.`
      }
    ],
    buttonShowLess: "덜 보기",
    buttonLearnMore: "더 알아보기",
    buttonClose: "닫기",
    footerText: "독일 정밀함으로, 귀하의 MADE IN GERMANY ©  팀"
  },
  jp: {
    title: "インプリント",
    heroTitle: "サービスにおける卓越性 – あなたのドイツ工学のパートナー",
    contactInfo: "最適なコミュニケーションのために、info@made-in-germany.ukにメールを送る際に日中の連絡先番号を必ずご提供ください。主要なメッセンジャーサービスを通じて連絡も可能で、効率的かつコスト効率の高い相互作用を保証します。最速の回答を得るには、ドイツの精密さで設計された連絡フォームをご利用ください。これにより、電話、メール、メッセンジャー、またはフォーム自体を通じてスムーズに私たちに連絡できます。",
    infoBoxes: [
      {
        title: "会社情報",
        content: `MADE IN GERMANY ©  AG - UK LIMITED
                  **CEOによる代表:**
                  Andreas Thommen
                  **WhatsApp:**
                  +49 (0) 1575 370 3790
                  **メール:**
                  info@made-in-germany.uk
                  **法務コーディネーター:**
                  Martin Bührmann
                  m.bührmann@made-in-germany.global
                  **コンテンツの責任者:**
                  MADE IN GERMANY ©  AG - UK LIMITED, Victoria House, 38 Surrey Quays Road, ロンドン, イングランド, SE16 7DX`,
        expandedContent: `ドイツ工学の誇り高い代表として、私たちは透明性と法令遵守の最高基準を維持します。献身的なチームが、MADE IN GERMANY © の精密さを反映し、すべての情報が正確かつ最新であることを保証します。`
      },
      {
        title: "免責事項",
        content: `サービス提供者として、私たちは適用可能な国際法に基づき独自のコンテンツに全責任を負います。法律で要求されない限り、第三者が送信または保存した情報を監視したり、違法行為を示す可能性のある状況を調査する義務はありません。コンテンツの削除またはブロック義務は影響を受けず、具体的な違反を知った時点から責任が発生し、即座に対応します。`,
        expandedContent: `ドイツ工学の原則に根ざした卓越性への取り組みにより、コンテンツを継続的に監視・更新し、厳しい国際基準を満たしつつ、グローバルな視聴者に卓越した価値を提供します。`
      },
      {
        title: "著作権",
        content: `このサイト上のすべてのコンテンツと作品は、チームによって作成され、国際著作権法によって保護されています。著作権法の範囲を超える複製、加工、配布、またはあらゆる形態の利用には、該当する著者または創作者の書面による同意が必要です。ダウンロードとコピーは私的かつ非商業的な使用に限定され、知的財産の完全性への献身を示しています。`,
        expandedContent: `MADE IN GERMANY © の精神を体現し、知的財産権を最大限の注意を持って保護し、国際著作権法を遵守しながら革新と創造性を促進します。`
      }
    ],
    buttonShowLess: "少なく見る",
    buttonLearnMore: "さらに詳しく",
    buttonClose: "閉じる",
    footerText: "ドイツの精密さで、貴方のMADE IN GERMANY © チーム"
  }
};

const ImprintModal: React.FC<ImprintModalProps> = ({ isOpen, onClose, language = 'en' }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<string>('');
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
    onClose();
    navigate('/contactform');
    window.scrollTo(0, 0);
  };

  const handleCopyPhone = () => {
    const phoneNumber = '+4915753703790';
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        setCopyStatus('Phone number copied');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => console.error('Failed to copy phone:', err));
  };

  const handleCopyEmail = () => {
    const email = 'info@made-in-germany.uk';
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopyStatus('Email copied');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => console.error('Failed to copy email:', err));
  };

  const handleCopyLegalEmail = () => {
    const legalEmail = 'm.bührmann@made-in-germany.global';
    navigator.clipboard.writeText(legalEmail)
      .then(() => {
        setCopyStatus('Legal email copied');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => console.error('Failed to copy legal email:', err));
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

  const renderFirstBoxContent = (content: string) => {
    const lines = content.split('\n').map(line => line.trim());
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          if (line.startsWith('**')) {
            const cleanedLine = line.replace(/\*\*/g, '');
            return (
              <p key={i} className="font-bold text-white text-sm sm:text-base">{cleanedLine}</p>
            );
          } else if (line === 'Andreas Thommen' || line === 'أندرياس تومن' || line === 'Martin Bührmann' || line === 'مارتن بوهرمان') {
            return <p key={i} className="ml-2 text-gray-300">{line}</p>;
          } else if (line.includes('+49 (0) 1575 370 3790')) {
            return (
              <div key={i} className="flex items-center gap-2 ml-2">
                <Phone className="w-4 h-4 text-[#FFFFFF]" />
                <span className="text-gray-300">{line}</span>
                <button
                  onClick={handleCopyPhone}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Copy phone number"
                >
                  <Copy className={`w-4 h-4 ${copyStatus === 'Phone number copied' ? 'text-green-400' : 'text-gray-300'}`} />
                </button>
              </div>
            );
          } else if (line.includes('info@made-in-germany.uk')) {
            return (
              <div key={i} className="flex items-center gap-2 ml-2">
                <Mail className="w-4 h-4 text-[#FFFFFF]" />
                <span className="text-gray-300">{line}</span>
                <button
                  onClick={handleCopyEmail}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Copy email"
                >
                  <Copy className={`w-4 h-4 ${copyStatus === 'Email copied' ? 'text-green-400' : 'text-gray-300'}`} />
                </button>
              </div>
            );
          } else if (line.includes('m.bührmann@made-in-germany.global')) {
            return (
              <div key={i} className="flex items-center gap-2 ml-2">
                <Mail className="w-4 h-4 text-[#FFFFFF]" />
                <span className="text-gray-300">{line}</span>
                <button
                  onClick={handleCopyLegalEmail}
                  className="p-1 hover:bg-gray-700 rounded transition-colors"
                  title="Copy legal email"
                >
                  <Copy className={`w-4 h-4 ${copyStatus === 'Legal email copied' ? 'text-green-400' : 'text-gray-300'}`} />
                </button>
              </div>
            );
          }
          return <p key={i} className="mb-1 text-gray-300">{line}</p>;
        })}
        {copyStatus && (
          <div className="mt-2 text-green-400 text-sm animate-fade-in">{copyStatus}</div>
        )}
      </div>
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
              .animate-fade-in {
                animation: fadeIn 0.3s ease-in;
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
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
              className="relative w-full max-w-[95%] sm:max-w-4xl md:max-w-6xl lg:max-w-8xl mb-6 sm:mb-10 rounded-2xl border border-[#0F1627] shadow-xl"
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
                    {translations.title}
                  </motion.h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="px-4 py-2 sm:px-6 sm:py-3 text-[#FFFFFF] rounded-[5px] transition-colors flex items-center gap-2 border border-[#0B111F] text-xs sm:text-sm mobile-close-button"
                    aria-label="Close"
                  >
                    <span>{translations.buttonClose}</span>
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
                  {translations.heroTitle}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-left text-sm sm:text-base text-gray-400 leading-relaxed"
                >
                  {renderContactInfo()}
                </motion.p>

                <div className="h-10 sm:h-0 md:h-0 lg:h-0"></div>

                <motion.div
                  className="mt-[-30px] relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mb-4 sm:mb-0 md:mb-0 overflow-hidden mobile-image-container"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src={language === 'de' ? "/impressum-made-in-germany.webp" : "/imprint-made-in-germany-english.webp"}
                    alt="Imprint illustration"
                    className="w-full h-full object-contain sm:object-cover md:object-contain lg:object-contain object-center mobile-image rounded-lg"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out'
                    }}
                  />
                </motion.div>

                <div className="h-10 sm:h-0 md:h-0 lg:h-0"></div>
              </motion.div>

              {/* Info Boxes */}
              <motion.div
                className="mt-[-60px] sm:px-6 md:px-8 grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
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
                        icon={index === 0 ? faShield : index === 1 ? faUserTie : faDatabase}
                        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 text-[#FFFFFF]"
                      />
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">{box.title}</h3>
                    </div>
                    <div className="text-gray-300 space-y-3 sm:space-y-4">
                      <motion.div
                        initial={false}
                        animate={{ height: 'auto' }}
                        className="text-sm sm:text-base leading-relaxed"
                      >
                        {index === 0 ? renderFirstBoxContent(box.content) : (
                          box.content.split('\n').map((line, i) => (
                            <p key={i} className="mb-1">{line.trim()}</p>
                          ))
                        )}
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#1a2336' }}
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
                            className="overflow-hidden pt-3 sm:pt-4 text-sm sm:text-base text-gray-400 leading-relaxed"
                          >
                            <p>{box.expandedContent}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

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

export default ImprintModal;