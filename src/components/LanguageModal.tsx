import React from 'react';
import { X } from 'lucide-react';

const LANGUAGES = [
  { code: 'de', name: 'Deutsch', flag: '/flag/germany.gif' },
  { code: 'en', name: 'English', flag: '/flag/uk.gif' },
  { code: 'es', name: 'Español', flag: '/flag/spain.gif' },
  { code: 'fr', name: 'Français', flag: '/flag/french.gif' },
  { code: 'it', name: 'Italiano', flag: '/flag/italy.gif' },
  { code: 'nl', name: 'Dutch', flag: '/flag/netherlands.gif' },
  { code: 'sa', name: 'العربية (السعودية)', flag: '/flag/saudi.gif' },
  { code: 'hk', name: '繁體中文', flag: '/flag/hong-kong.gif' },
  { code: 'sg', name: '简体中文', flag: '/flag/singapore.gif' },
  { code: 'za', name: 'Afrikaans', flag: '/flag/south-africa.gif' },
  { code: 'kr', name: '한국어', flag: '/flag/south-korea.gif' },
  { code: 'jp', name: '日本語', flag: '/flag/japan.gif' }
];

const LanguageModal = ({ onClose, onSelectLanguage }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0B111F] rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl lg:max-w-4xl ring-1 ring-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
        <div className="sticky top-0 px-4 sm:px-6 py-4 flex items-center justify-between border-b border-white/10 bg[#121A2A] backdrop-blur-sm">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
            SELECT LANGUAGE
          </h2>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/9 hover:bg-white/10 transition-colors duration-200"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                onClick={() => onSelectLanguage(language.code)}
                className="group flex items-center gap-3 p-3 sm:p-4 rounded-lg bg-[#121A2A] hover:bg-white/10 transition-all duration-200 text-left relative overflow-hidden hover:shadow-lg hover:shadow-white/5"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden shadow-lg shadow-black/50 group-hover:shadow-white/20 transition-shadow duration-200">
                  <img
                    src={language.flag}
                    alt={`${language.name} flag`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <span className="text-sm sm:text-base text-white/90 font-medium group-hover:text-white transition-colors duration-200 truncate">
                  {language.name}
                </span>
                <div className="absolute inset-0 ring-1 ring-white/10 rounded-lg group-hover:ring-white/20 transition-all duration-200" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;