import React, { useMemo, useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// Define brand interface
interface Brand {
  name: string;
  logo: string;
}

// Define props interface
interface GermanBrandsSliderProps {
  language?: string;
}

// Define translations
const TRANSLATIONS: Record<string, {
  headline: string;
}> = {
  de: {
    headline: 'Premium Deutsche Marken',
  },
  en: {
    headline: 'Premium German Brands',
  },
};

const GermanBrandsSlider: React.FC<GermanBrandsSliderProps> = ({ language = 'de' }) => {
  const translations = TRANSLATIONS[language] || TRANSLATIONS['de'];
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize brands data
  const brands: Brand[] = useMemo(
    () => [
      { name: 'Mercedes-Benz', logo: '/germanlogo/mercedes.svg' },
      { name: 'BMW', logo: '/germanlogo/bmw.svg' },
      { name: 'Adidas', logo: '/germanlogo/adidas.png' },
      { name: 'Siemens', logo: '/germanlogo/siemens.png' },
      { name: 'Porsche', logo: '/germanlogo/porsche.png' },
      { name: 'Audi', logo: '/germanlogo/audi.png' },
      { name: 'Volkswagen', logo: '/germanlogo/volkswagen.png' },
      { name: 'Bosch', logo: '/germanlogo/bosch.png' },
      { name: 'DHL', logo: '/germanlogo/dhl.png' },
      { name: 'Deutsche Bahn', logo: '/germanlogo/deutsche-bahn.png' },
      { name: 'Lufthansa Cargo', logo: '/germanlogo/lufthansa-cargo.png' },
      { name: 'Bayer', logo: '/germanlogo/bayer.png' },
    ],
    []
  );

  // Duplicate brands for seamless looping
  const doubledBrands = useMemo(() => [...brands, ...brands], [brands]);

  // Animation setup for marquee
  useEffect(() => {
    const startAnimation = async () => {
      await controls.start({
        x: '-50%',
        transition: {
          x: { repeat: Infinity, repeatType: 'loop', duration: 24, ease: 'linear' },
        },
      });
    };
    startAnimation();

    return () => controls.stop();
  }, [controls]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full mb-10 bg-gradient-to-br from-gray-900 to-black py-16 overflow-hidden"
      aria-label="Premium German Brands Slider"
    >
      {/* Decorative Elements */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"
      />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-black rounded-full blur-3xl opacity-20 animate-[spin_20s_linear_infinite]" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-900 rounded-full blur-3xl opacity-20 animate-[spin_20s_linear_infinite_reverse]" />
      <div className="absolute top-4 left-4 right-4 flex space-x-1 h-1">
        <div className="w-1/3 bg-black rounded-full" />
        <div className="w-1/3 bg-red-600 rounded-full" />
        <div className="w-1/3 bg-yellow-400 rounded-full" />
      </div>

      {/* Headline */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-[text-glow_3s_ease-in-out_infinite]"
        >
          {translations.headline}
        </motion.h2>
      </div>

      {/* Infinite Slider Container */}
      <div className="relative w-full">
        <motion.div
          ref={containerRef}
          animate={controls}
          className="flex space-x-8 py-8 w-max"
        >
          {doubledBrands.map((brand, index) => (
            <motion.div
              key={`brand-${brand.name}-${index}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-none w-[200px]"
            >
              <div
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl transition-colors duration-300 hover:bg-gray-700 ring-1 ring-white/20 backdrop-blur-sm relative"
                role="img"
                aria-label={`${brand.name} brand logo`}
              >
                {/* Grid background for brand box */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px] opacity-10 rounded-xl overflow-hidden"
                />
                <div className="relative h-[100px] mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-700 to-gray-800">
                  <img
                    src={brand.logo || '/germanlogo/fallback.png'}
                    alt={`${brand.name} brand logo`}
                    className="w-full h-full object-contain p-4 relative z-10"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-white font-medium text-lg text-center truncate relative z-10">
                  {brand.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GermanBrandsSlider;