import React, { useState, useEffect } from 'react';

// Define props interface for GoUpButton
interface GoUpButtonProps {
  language?: string;
}

// Define translations for GoUpButton content
const TRANSLATIONS: Record<string, { goUp: string }> = {
  en: {
    goUp: "BACK TO TOP"
  },
  de: {
    goUp: "NACH OBEN"
  },
  es: {
    goUp: "SUBIR"
  },
  fr: {
    goUp: "MONTER"
  },
  it: {
    goUp: "SALIRE"
  },
  nl: {
    goUp: "OMHOOG"
  },
  sa: {
    goUp: "ارجع للأعلى"
  },
  hk: {
    goUp: "向上"
  },
  sg: {
    goUp: "向上"
  },
  za: {
    goUp: "GAAN OP"
  },
  kr: {
    goUp: "위로 가기"
  },
  jp: {
    goUp: "上に上がる"
  }
};

const GoUpButton: React.FC<GoUpButtonProps> = ({ language = 'en' }) => {
  const [visible, setVisible] = useState(false);
  const [lowZIndex, setLowZIndex] = useState(false);
  const translations = TRANSLATIONS[language] || TRANSLATIONS['en'];

  useEffect(() => {
    const toggleVisibility = () => {
      const footer = document.querySelector('footer');
      const isMobile = window.innerWidth < 640; // Tailwind's 'sm' breakpoint is 640px
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is at the end of the page
      const isAtPageEnd = scrollPosition + windowHeight >= documentHeight - 10; // Small buffer for precision

      if (isAtPageEnd) {
        setVisible(false); // Hide button when at the end of the page
        setLowZIndex(false); // Reset z-index
        return;
      }

      if (isMobile && footer) {
        const footerRect = footer.getBoundingClientRect();
        
        // Check if the footer is in view (partially or fully)
        const isFooterInView = footerRect.top < windowHeight && footerRect.bottom > 0;
        // Check if the footer is fully in view (top of footer is at or above viewport top)
        const isFooterFullyInView = footerRect.top <= 0;

        if (isFooterInView) {
          if (isFooterFullyInView) {
            // Footer is fully in view: lower z-index to allow footer buttons to be clickable
            setLowZIndex(true);
            setVisible(scrollPosition > 300);
          } else {
            // Footer is partially in view: restore high z-index
            setLowZIndex(false);
            setVisible(scrollPosition > 300);
          }
        } else {
          // Footer is not in view: show button with high z-index if scrolled past 300px
          setLowZIndex(false);
          setVisible(scrollPosition > 300);
        }
      } else {
        // Desktop behavior: show button with high z-index when scrolled past 300px
        setLowZIndex(false);
        setVisible(scrollPosition > 300);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('resize', toggleVisibility); // Handle resize to update mobile/desktop check
    toggleVisibility(); // Initial check on mount

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('resize', toggleVisibility);
    };
  }, []); // Empty dependency array since we’re not relying on changing props/states within the effect

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 left-6 flex items-center justify-center space-x-2
                 w-32 sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md 
                 bg-[#0B111F] text-white font-medium 
                 transition-all duration-300 hover:bg-[#0B111F] hover:text-white 
                 active:transform active:scale-95
                 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                 ${lowZIndex ? 'z-10' : 'z-50'}`}
      aria-label="Go to top"
    >
      {/* Arrow animation */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="animate-bounce"
      >
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
      
      {/* GO UP text */}
      <span>{translations.goUp}</span>
    </button>
  );
};

export default GoUpButton;