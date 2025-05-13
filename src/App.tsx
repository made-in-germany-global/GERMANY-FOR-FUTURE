import React, { useState, useEffect, Component, ErrorInfo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import GoUpButton from './components/GoUpButton';
import SupportButton from './components/SupportButton';
import MenuSection from './components/MenuSection';
import AudioControl from './AudioControl';
import Header from './components/Header';
import StartPage from './components/StartPage';

// Define interface for Header props
interface HeaderProps {
  onLanguageChange: (languageCode: string) => void;
}

// Define interface for SEO props
interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  language: string;
  canonical?: string;
}

// Define interface for ErrorBoundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Define interface for PreloaderText props
interface PreloaderTextProps {
  year: string;
}

// Error Boundary Component to catch rendering errors
class ErrorBoundary extends Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-lg mb-4">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button
            className="px-4 py-2 bg-[#10B981] text-white rounded hover:bg-[#059669] transition duration-200"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// SEO Component to manage meta tags
const SEO: React.FC<SEOProps> = ({ title, description, keywords, language, canonical }) => {
  const hreflangLinks = [
    { code: 'en', href: window.location.origin + window.location.pathname },
    { code: 'de', href: window.location.origin + window.location.pathname },
  ];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Germany for Future" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {hreflangLinks.map((link) => (
        <link
          key={link.code}
          rel="alternate"
          hrefLang={link.code}
          href={link.href}
        />
      ))}
      <html lang={language} />
    </Helmet>
  );
};

// PreloaderText Component
const PreloaderText: React.FC<PreloaderTextProps> = ({ year }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <motion.div 
        className="space-y-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="  text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-900">
          GERMANY  
        </div>
        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wider">
         FOR FUTURE
        </div>
      </motion.div>
      
      <LoadingBar />
      
      <motion.div 
        className="flex items-center space-x-2 text-sm md:text-base font-medium tracking-widest whitespace-nowrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <span className="text-white">EXCELLENCE THAT MOVES THE WORLD </span>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(144, 206, 177, 0.26)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-green-900 hover:from-green-500 hover:to-green-990 text-white px-4 py-2 rounded-lg font-medium text-sm transition duration-300 shadow-[0_0_10px_rgba(144, 206, 177, 0.26)] flex items-center justify-center"
        >
          <span className="text-black">FOR</span>
          <span className="text-[#DD0000] mx-1">THE</span>
          <span className="text-[#FFCE00]">WORLD</span>
        </motion.button>
      </motion.div>
      
      <motion.div 
        className="text-sm md:text-base text-gray-400 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        OVER 100 YEARS OF PREMIUM QUALITY
      </motion.div>
    </div>
  );
};

// LoadingBar Component
const LoadingBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="w-full max-w-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden ring-1 ring-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-green-900 rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-gray-400 text-sm">LOAD QUALITY</span>
        <span className="text-green-500 text-sm font-medium">{progress}%</span>
      </div>
    </motion.div>
  );
};

// Main App component
const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [year] = useState(new Date().getFullYear().toString());
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const location = useLocation();

  // Language change handler
  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  useEffect(() => {
    console.log('App is rendering, loading state:', loading);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // SEO configuration for each route
  const getSEOConfig = () => {
    const baseUrl = window.location.origin;
    switch (location.pathname) {
      case '/':
        return {
          title: 'Germany for Future - Premium German Innovation',
          description: 'Discover the excellence of German innovation with Germany for Future.',
          keywords: 'Germany for Future, German innovation, premium quality, German craftsmanship',
          canonical: `${baseUrl}/`,
        };
      case '/membership':
        return {
          title: 'Membership - Germany for Future',
          description: 'Join the Germany for Future membership for exclusive access to premium German innovations.',
          keywords: 'Germany for Future membership, premium innovation, German quality',
          canonical: `${baseUrl}/membership`,
        };
      case '/madeingermanyaboutus':
        return {
          title: 'About Us - History of Germany for Future',
          description: 'Learn about the vision, values, and history behind Germany for Future.',
          keywords: 'Germany for Future about us, German history, premium quality',
          canonical: `${baseUrl}/madeingermanyaboutus`,
        };
      case '/buyers':
        return {
          title: 'For Buyers - Premium German Innovations',
          description: 'Global buyers, discover exclusively high-quality innovations from Germany.',
          keywords: 'Germany for Future buyers, German innovations, premium quality',
          canonical: `${baseUrl}/buyers`,
        };
      case '/pricing':
        return {
          title: 'Pricing - Germany for Future',
          description: 'Explore pricing plans for accessing premium German innovations and services.',
          keywords: 'Germany for Future pricing, premium innovations, German quality',
          canonical: `${baseUrl}/pricing`,
        };
      case '/madeingermanyformanufacturers':
        return {
          title: 'German Excellence - For Manufacturers',
          description: 'Join German Excellence for manufacturers of premium innovations.',
          keywords: 'Germany for Future manufacturers, German excellence, premium quality',
          canonical: `${baseUrl}/madeingermanyformanufacturers`,
        };
      case '/contactform':
        return {
          title: 'Contact Us - Germany for Future',
          description: 'Get in touch with Germany for Future for inquiries and support.',
          keywords: 'Germany for Future contact, premium innovations, German quality',
          canonical: `${baseUrl}/contactform`,
        };
      case '/recruitingform':
        return {
          title: 'Recruiting - Germany for Future',
          description: 'Join our team at Germany for Future. Submit your application today.',
          keywords: 'Germany for Future recruiting, careers, German quality',
          canonical: `${baseUrl}/recruitingform`,
        };
      case '/careers':
        return {
          title: 'Careers - Germany for Future',
          description: 'Explore career opportunities with Germany for Future.',
          keywords: 'Germany for Future careers, jobs, German quality',
          canonical: `${baseUrl}/careers`,
        };
      case '/comingsoon':
        return {
          title: 'Coming Soon - Germany for Future',
          description: 'Exciting new features and innovations are coming soon to Germany for Future.',
          keywords: 'Germany for Future coming soon, premium innovations, German quality',
          canonical: `${baseUrl}/comingsoon`,
        };
      case '/madeingermanyhistory':
        return {
          title: 'History - Germany for Future',
          description: 'Discover the rich history of Germany for Future and its commitment to quality.',
          keywords: 'Germany for Future history, German craftsmanship, premium quality',
          canonical: `${baseUrl}/madeingermanyhistory`,
        };
      case '/presscontact':
        return {
          title: 'Press Contact - Germany for Future',
          description: 'Contact our press team for media inquiries and information.',
          keywords: 'Germany for Future press, media contact, German quality',
          canonical: `${baseUrl}/presscontact`,
        };
      case '/legalandprotection':
        return {
          title: 'Legal & Protection - Germany for Future',
          description: 'Learn about our legal policies and data protection practices.',
          keywords: 'Germany for Future legal, data protection, German quality',
          canonical: `${baseUrl}/legalandprotection`,
        };
      case '/strategicinvestments':
        return {
          title: 'Strategic Investments - Germany for Future',
          description: 'Explore strategic investment opportunities with Germany for Future.',
          keywords: 'Germany for Future investments, strategic partnerships, German quality',
          canonical: `${baseUrl}/strategicinvestments`,
        };
      case '/madeingermanybread':
        return {
          title: 'Bread & Soul - Germany for Future',
          description: 'Explore the soul of German craftsmanship with Bread & Soul.',
          keywords: 'Germany for Future bread, German craftsmanship, premium quality',
          canonical: `${baseUrl}/madeingermanybread`,
        };
      case '/onehundredpercentmadeingermany':
        return {
          title: '100% Germany for Future - Quality and Innovation',
          description: 'Experience the highest quality and innovation with 100% Germany for Future innovations.',
          keywords: '100% Germany for Future, premium quality, German innovation',
          canonical: `${baseUrl}/onehundredpercentmadeingermany`,
        };
      case '/madeingermanyforbuyers':
        return {
          title: 'Germany for Future Platform for Buyers',
          description: 'Discover the Germany for Future platform for global buyers seeking premium innovations.',
          keywords: 'Germany for Future platform, buyers, premium German innovations',
          canonical: `${baseUrl}/madeingermanyforbuyers`,
        };
      default:
        return {
          title: 'Germany for Future',
          description: 'Germany for Future offers premium German innovations with unmatched quality.',
          keywords: 'Germany for Future, German innovations, premium quality',
          canonical: `${baseUrl}${location.pathname}`,
        };
    }
  };

  const seoConfig = getSEOConfig();

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className="flex flex-col min-h-screen bg-white">
          <SEO
            title={seoConfig.title}
            description={seoConfig.description}
            keywords={seoConfig.keywords}
            language={selectedLanguage}
            canonical={seoConfig.canonical}
          />
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black">
              <motion.div 
                className="relative w-full max-w-xl mx-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-[#000A00] to-black p-8 rounded-2xl shadow-2xl ring-1 ring-white/20 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none"
                  ></div>
                  
                  <div className="relative z-10">
                    <PreloaderText year={year} />
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              <CookieBanner />
              <Header onLanguageChange={handleLanguageChange} />
              <MenuSection />
              <div className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <StartPage />
                        <AudioControl />
                      </>
                    }
                  />
                </Routes>
              </div>
              <Footer onLanguageChange={handleLanguageChange} />
              <GoUpButton />
              <SupportButton />
            </>
          )}
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

// Main App wrapper with Router
const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

// Tailwind config (should be moved to tailwind.config.js)
const tailwindConfig = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 2s ease-out',
        gradient: 'gradient 8s ease infinite',
      },
    },
  },
};