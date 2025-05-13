import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Facebook, 
  Linkedin,
  Building2,
  X,
  Copy
} from 'lucide-react';

// Define translations for LogoModal content
const TRANSLATIONS: Record<string, {
  companyName: string;
  headquarters: string;
  description: string;
  contactTitle: string;
  phone: string;
  email: string;
  socialMedia: string;
}> = {
  en: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Headquarters: London, United Kingdom",
    description: "MADE IN GERMANY ©  engineering in precision manufacturing.",
    contactTitle: "Contact Us",
    phone: "WhatsApp: +49 15753703790",
    email: "Email: info@made-in-germany.uk",
    socialMedia: "Follow us on social media"
  },
  de: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Hauptsitz: London, Vereinigtes Königreich",
    description: "Präzision trifft Innovation: MADE IN GERMANY ©  – Qualität ohne Kompromisse.",
    contactTitle: "Kontaktieren Sie uns",
    phone: "WhatsApp: +49 15753703790",
    email: "E-Mail: info@made-in-germany.uk",
    socialMedia: "Folgen Sie uns in sozialen Medien"
  },
  es: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Sede: Londres, Reino Unido",
    description: "Ingeniería MADE IN GERMANY ©  en fabricación de precisión.",
    contactTitle: "Contáctenos",
    phone: "WhatsApp: +49 15753703790",
    email: "Correo: info@made-in-germany.uk",
    socialMedia: "Síguenos en redes sociales"
  },
  fr: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Siège: Londres, Royaume-Uni",
    description: "Ingénierie MADE IN GERMANY ©  dans la fabrication de précision.",
    contactTitle: "Contactez-nous",
    phone: "WhatsApp: +49 15753703790",
    email: "Email: info@made-in-germany.uk",
    socialMedia: "Suivez-nous sur les réseaux sociaux"
  },
  it: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Sede: Londra, Regno Unito",
    description: "Ingegneria MADE IN GERMANY ©  nella produzione di precisione.",
    contactTitle: "Contattaci",
    phone: "WhatsApp: +49 15753703790",
    email: "Email: info@made-in-germany.uk",
    socialMedia: "Seguici sui social media"
  },
  nl: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Hoofdkantoor: Londen, Verenigd Koninkrijk",
    description: "MADE IN GERMANY ©  ingenieurskunst in precisiefabricage.",
    contactTitle: "Neem contact met ons op",
    phone: "WhatsApp: +49 15753703790",
    email: "E-mail: info@made-in-germany.uk",
    socialMedia: "Volg ons op sociale media"
  },
  sa: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "المقر الرئيسي: لندن، المملكة المتحدة",
    description: "هندسة MADE IN GERMANY ©  في التصنيع الدقيق.",
    contactTitle: "اتصل بنا",
    phone: "واتساب: +49 15753703790",
    email: "البريد الإلكتروني: info@made-in-germany.uk",
    socialMedia: "تابعنا على وسائل التواصل الاجتماعي"
  },
  hk: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "總部：倫敦，英國",
    description: "MADE IN GERMANY ©  工程在精密製造中。",
    contactTitle: "聯繫我們",
    phone: "WhatsApp：+49 15753703790",
    email: "電子郵件：info@made-in-germany.uk",
    socialMedia: "在社交媒體上關注我們"
  },
  sg: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "总部：伦敦，英国",
    description: "MADE IN GERMANY ©  工程在精密制造中。",
    contactTitle: "联系我们",
    phone: "WhatsApp：+49 15753703790",
    email: "电子邮件：info@made-in-germany.uk",
    socialMedia: "在社交媒体上关注我们"
  },
  za: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "Hoofkantoor: Londen, Verenigde Koninkryk",
    description: "MADE IN GERMANY ©  ingenieurskunst in presisievervaardiging.",
    contactTitle: "Kontak ons",
    phone: "WhatsApp: +49 15753703790",
    email: "E-pos: info@made-in-germany.uk",
    socialMedia: "Volg ons op sosiale media"
  },
  kr: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "본사: 런던, 영국",
    description: "MADE IN GERMANY ©  엔지니어링 정밀 제조.",
    contactTitle: "문의하기",
    phone: "왓츠앱: +49 15753703790",
    email: "이메일: info@made-in-germany.uk",
    socialMedia: "소셜 미디어에서 팔로우하세요"
  },
  jp: {
    companyName: "MADE IN GERMANY ©  AG - UK LIMITED",
    headquarters: "本社：ロンドン、イギリス",
    description: "MADE IN GERMANY ©  工学による精密製造。",
    contactTitle: "お問い合わせ",
    phone: "ワッツアップ: +49 15753703790",
    email: "メール：info@made-in-germany.uk",
    socialMedia: "ソーシャルメディアでフォローしてください"
  }
};

interface LogoModalProps {
  isVisible?: boolean;
  onClose: () => void;
  language?: string;
  style?: React.CSSProperties; // Added style prop for dynamic positioning
}

const LogoModal = ({ isVisible = false, onClose, language = 'en', style }: LogoModalProps) => {
  const [copyStatus, setCopyStatus] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Update isScrolled based on scroll position (threshold can be adjusted)
      setIsScrolled(window.scrollY > 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const phoneNumber = t.phone.replace(/[^\d+]/g, '');
  const emailAddress = t.email.split(': ')[1] || t.email;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        setCopyStatus('Phone number copied');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => console.error('Failed to copy phone number:', err));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
      .then(() => {
        setCopyStatus('Email copied');
        setTimeout(() => setCopyStatus(''), 2000);
      })
      .catch((err) => console.error('Failed to copy email:', err));
  };

  return (
    <div
      className={`absolute z-50 w-[550px] ml-[-100px] max-w-[550px] min-w-[90%] ${isScrolled ? 'mt-4' : 'mt-[88px]'} animate-slide-in`}
      style={style} // Apply dynamic style prop for positioning
    >
      <div className="mx-4">
        <div className="shadow-2xl rounded-xl overflow-hidden relative">
          <button 
            onClick={onClose}
            className="absolute right-2 top-2 z-10 w-6 h-6 rounded-full bg-gray-200/50 flex items-center justify-center hover:bg-gray-300/50 transition-colors"
          >
            <X className="h-4 w-4 text-gray-700" />
          </button>

          <div className="flex flex-col md:flex-row">
            <div className="bg-[#0B111F] text-white p-4 w-full md:w-1/2">
              <div className="h-full flex flex-col justify-between">
                <div className="flex mb-3">
                  <img
                    src={localStorage.getItem("customIcon") || "/made-in-germany-logo-english-white.png"} 
                    alt="MADE IN GERMANY © "
                    className="w-[150px] h-[50px] object-contain"
                  />
                </div>

                <div className="mb-4 space-y-3">
                  <h2 className="text-xs font-bold whitespace-nowrap">{t.companyName}</h2>
                  <ul className="space-y-2 text-gray-300 text-xs">
                    <li className="flex items-center gap-2">
                      <Building2 className="h-3 w-3 text-[#FFFFFF]" />
                      {t.headquarters}
                    </li>
                  </ul>
                </div>

                <div className="text-xs font-medium text-gray-300 border-l-2 border-[#FFFFFF] pl-2">
                  {t.description}
                </div>
              </div>
            </div>

            <div className="bg-[#0B111F] text-white p-4 w-full md:w-1/2 relative flex items-center">
              <div className="space-y-4 w-full">
                <div className="space-y-2">
                  <h3 className="text-sm font-bold">{t.contactTitle}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs gap-2 group">
                      <a 
                        href={`https://wa.me/${phoneNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                      >
                        <Phone className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        {t.phone}
                      </a>
                      <button
                        onClick={handleCopyPhone}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copy phone number"
                      >
                        <Copy className={`h-3 w-3 ${copyStatus === 'Phone number copied' ? 'text-green-400' : 'text-gray-300'}`} />
                      </button>
                    </div>
                    <div className="flex items-center text-xs gap-2 group">
                      <a 
                        href={`mailto:${emailAddress}`}
                        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
                      >
                        <Mail className="h-3 w-3 group-hover:rotate-12 transition-transform" />
                        {t.email}
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                        title="Copy email"
                      >
                        <Copy className={`h-3 w-3 ${copyStatus === 'Email copied' ? 'text-green-400' : 'text-gray-300'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs">{t.socialMedia}</p>
                  <div className="flex gap-2">
                    <a 
                      href="mailto:info@made-in-germany.uk"
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors group"
                      title="Email"
                    >
                      <Mail className="h-3 w-3 group-hover:scale-110 transition-transform" />
                    </a>
                    <a 
                      href="https://www.facebook.com/madeingermany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors group"
                      title="Facebook"
                    >
                      <Facebook className="h-3 w-3 group-hover:scale-110 transition-transform" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/madeingermany"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors group"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-3 w-3 group-hover:scale-110 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
              {copyStatus && (
                <div className="absolute bottom-2 left-4 right-4 bg-green-600/80 text-white text-xs py-1 px-2 rounded text-center transition-opacity duration-300">
                  {copyStatus}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoModal;