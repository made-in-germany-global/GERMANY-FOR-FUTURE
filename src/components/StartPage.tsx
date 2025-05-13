import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe, ArrowRight, CheckCircle, Leaf, Cpu, Stethoscope, Car, Coffee, Building } from 'lucide-react';

const LandingPage = () => {
  const [language, setLanguage] = useState('en');
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    en: {
      hero: {
        headline: "Germany for Future",
        subheadline: "Shaping Tomorrow with German Innovation",
        description: "Connecting the world with export-ready innovation – engineered in Germany.",
        cta1: "Discover Solutions",
        cta2: "Become a Partner"
      },
      mission: {
        headline: "Our Mission: Driving the Future with Quality & Vision",
        text: "Germany for Future is committed to promoting German innovations that solve global challenges. We spotlight companies that deliver excellence in engineering, sustainability, and technological advancement – shaping a better future for all."
      },
      offer: {
        headline: "What We Offer",
        items: [
          { title: "Export-Ready Innovation", description: "Curated products and solutions from trusted German manufacturers" },
          { title: "B2B Matchmaking", description: "Direct access to partners, suppliers, and buyers worldwide" },
          { title: "Scalable Opportunities", description: "Support for sustainable and high-growth partnerships" },
          { title: "Centralized Platform", description: "One place to discover, connect, and manage global supply" },
          { title: "Multilingual Support", description: "Communication without barriers" }
        ]
      },
      industries: {
        headline: "Industries We Serve",
        intro: "We focus on high-impact sectors where German innovation leads global standards:",
        sectors: [
          { title: "Engineering & Machinery", icon: "Cpu" },
          { title: "Green Tech & Renewable Energy", icon: "Leaf" },
          { title: "Medical & Health Technology", icon: "Stethoscope" },
          { title: "Automotive & Mobility", icon: "Car" },
          { title: "Food Processing & Equipment", icon: "Coffee" },
          { title: "Construction & Infrastructure", icon: "Building" },
          { title: "Chemical & Industrial Solutions", icon: "Leaf" }
        ]
      },
      why: {
        headline: "Why Choose Germany for Future?",
        text: "We go beyond listings. Our platform is built on verified quality, transparent communication, and long-term thinking. We help you connect with real manufacturers and future-focused enterprises that deliver what they promise."
      },
      stats: {
        headline: "German Innovation in Numbers",
        items: [
          { number: "30,000+", description: "Export-Ready Solutions" },
          { number: "2,500+", description: "Verified Companies" },
          { number: "92%", description: "On-Time Delivery" },
          { number: "60+", description: "Countries Served" }
        ]
      },
      testimonials: {
        headline: "What Our Partners Say",
        items: [
          {
            quote: "Germany for Future helped us find exactly what we needed - high-quality machinery with excellent support.",
            author: "Akihiko Tanaka",
            position: "Director of Operations, Nihon Tech Industries"
          },
          {
            quote: "From first contact to final delivery, the process was seamless and professional. German quality meets global service.",
            author: "Maria Rodriguez",
            position: "Chief Innovation Officer, GreenSolutions Brazil"
          }
        ]
      },
      finalCta: {
        headline: "Ready to Take the Next Step?",
        text: "Let's talk about how German innovation can elevate your business. Whether you're looking to source, invest, or collaborate – we're here to help.",
        cta1: "Explore Solutions",
        cta2: "Contact Us"
      }
    },
    de: {
      hero: {
        headline: "Germany for Future",
        subheadline: "Die Zukunft mit deutscher Innovation gestalten",
        description: "Wir verbinden die Welt mit exportbereiten Innovationen – entwickelt in Deutschland.",
        cta1: "Lösungen entdecken",
        cta2: "Partner werden"
      },
      mission: {
        headline: "Unsere Mission: Die Zukunft mit Qualität & Vision gestalten",
        text: "Germany for Future setzt sich für die Förderung deutscher Innovationen ein, die globale Herausforderungen lösen. Wir stellen Unternehmen in den Mittelpunkt, die Exzellenz in den Bereichen Technik, Nachhaltigkeit und technologischer Fortschritt bieten – und so eine bessere Zukunft für alle gestalten."
      },
      offer: {
        headline: "Unser Angebot",
        items: [
          { title: "Exportbereite Innovation", description: "Kuratierte Produkte und Lösungen von vertrauenswürdigen deutschen Herstellern"},
          { title: "Exportbereite Innovation", description: "Kuratierte Produkte und Lösungen von vertrauenswürdigen deutschen Herstellern" },
          { title: "B2B-Matchmaking", description: "Direkter Zugang zu Partnern, Lieferanten und Käufern weltweit" },
          { title: "Skalierbare Möglichkeiten", description: "Unterstützung für nachhaltige Partnerschaften mit hohem Wachstumspotenzial" },
          { title: "Zentrale Plattform", description: "Ein Ort zum Entdecken, Verbinden und Verwalten globaler Lieferketten" },
          { title: "Mehrsprachiger Support", description: "Kommunikation ohne Barrieren" }
        ]
      },
      industries: {
        headline: "Branchen, die wir bedienen",
        intro: "Wir konzentrieren uns auf wirkungsvolle Sektoren, in denen deutsche Innovation globale Standards setzt:",
        sectors: [
          { title: "Maschinenbau & Ingenieurwesen", icon: "Cpu" },
          { title: "Grüne Technologie & Erneuerbare Energien", icon: "Leaf" },
          { title: "Medizin- & Gesundheitstechnik", icon: "Stethoscope" },
          { title: "Automobil & Mobilität", icon: "Car" },
          { title: "Lebensmittelverarbeitung & -ausrüstung", icon: "Coffee" },
          { title: "Bau & Infrastruktur", icon: "Building" },
          { title: "Chemische & Industrielle Lösungen", icon: "Leaf" }
        ]
      },
      why: {
        headline: "Warum Germany for Future wählen?",
        text: "Wir gehen über Auflistungen hinaus. Unsere Plattform basiert auf nachgewiesener Qualität, transparenter Kommunikation und langfristigem Denken. Wir helfen Ihnen, sich mit echten Herstellern und zukunftsorientierten Unternehmen zu verbinden, die ihre Versprechen einhalten."
      },
      stats: {
        headline: "Deutsche Innovation in Zahlen",
        items: [
          { number: "30.000+", description: "Exportbereite Lösungen" },
          { number: "2.500+", description: "Verifizierte Unternehmen" },
          { number: "92%", description: "Pünktliche Lieferung" },
          { number: "60+", description: "Bediente Länder" }
        ]
      },
      testimonials: {
        headline: "Was unsere Partner sagen",
        items: [
          {
            quote: "Germany for Future half uns genau das zu finden, was wir brauchten - hochwertige Maschinen mit exzellentem Support.",
            author: "Akihiko Tanaka",
            position: "Betriebsleiter, Nihon Tech Industries"
          },
          {
            quote: "Vom ersten Kontakt bis zur endgültigen Lieferung war der Prozess nahtlos und professionell. Deutsche Qualität trifft auf globalen Service.",
            author: "Maria Rodriguez",
            position: "Chief Innovation Officer, GreenSolutions Brazil"
          }
        ]
      },
      finalCta: {
        headline: "Bereit für den nächsten Schritt?",
        text: "Lassen Sie uns darüber sprechen, wie deutsche Innovation Ihr Unternehmen voranbringen kann. Ob Sie nach Bezugsquellen suchen, investieren oder zusammenarbeiten möchten – wir sind für Sie da.",
        cta1: "Lösungen erkunden",
        cta2: "Kontaktieren Sie uns"
      }
    }
  };

  const currentContent = content[language];

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="h-8 w-8 text-green-400" />;
      case 'Leaf': return <Leaf className="h-8 w-8 text-green-400" />;
      case 'Stethoscope': return <Stethoscope className="h-8 w-8 text-green-400" />;
      case 'Car': return <Car className="h-8 w-8 text-green-400" />;
      case 'Coffee': return <Coffee className="h-8 w-8 text-green-400" />;
      case 'Building': return <Building className="h-8 w-8 text-green-400" />;
      default: return <Leaf className="h-8 w-8 text-green-400" />;
    }
  };

  const images = {
    hero: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470",
    leaf: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1632",
    tech: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1472",
    forest: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1474",
    modern: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?auto=format&fit=crop&w=1364",
    green: "https://images.unsplash.com/photo-1611569151253-3cee26d12882?auto=format&fit=crop&w=1474",
    future: "https://images.unsplash.com/photo-1548407260-da850faa41e3?auto=format&fit=crop&w=1487"
  };

  return (
    <div className="flex flex-col items-center w-full px-4 space-y-10 py-12 bg-[#FFFFFF] font-inter">
      {/* Overlay Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none z-0" />

      {/* Language Selector */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-4 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(10,107,13,0.3)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
          className="flex items-center text-sm font-medium bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-700 shadow-[0_0_10px_rgba(107,114,128,0.3)]"
          aria-label={language === 'en' ? 'Switch to Deutsch' : 'Switch to English'}
        >
          <Globe className="h-4 w-4 mr-1 text-green-400" />
          {language === 'en' ? 'Deutsch' : 'English'}
        </motion.button>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollPosition * 0.2}px)`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-3">
            {currentContent.hero.headline}
          </h1>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-6">
            {currentContent.hero.subheadline}
          </h2>
          <p className="text-lg text-gray-300 mb-10">{currentContent.hero.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(10,107,13,0.7)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-[#0F2415] hover:from-green-700 hover:to-[#0A6B0D] text-white font-medium px-10 py-3 rounded-lg flex items-center gap-1 shadow-[0_0_10px_rgba(10,107,13,0.5)]"
              aria-label={currentContent.hero.cta1}
            >
              {currentContent.hero.cta1}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(107,114,128,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 bg-gray-800 text-gray-200 font-medium px-8 py-3 rounded-lg hover:bg-gray-700 shadow-[0_0_10px_rgba(107,114,128,0.3)]"
              aria-label={currentContent.hero.cta2}
            >
              {currentContent.hero.cta2}
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block p-1.5 rounded-xl bg-gradient-to-r from-green-600 to-[#0F2415] mb-8">
            <span className="inline-block bg-gray-900 rounded-lg px-4 py-1 text-green-400 font-medium text-sm">Our Vision</span>
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-6">
            {currentContent.mission.headline}
          </h2>
          <p className="text-lg text-gray-300">{currentContent.mission.text}</p>
        </div>
      </motion.section>

      {/* Offer Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 text-center mb-12">
          {currentContent.offer.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContent.offer.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(10,107,13,0.5)' }}
              className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">{item.title}</h3>
                  <p className="text-base text-gray-300">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Industries Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className=" relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
       
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 rounded-2xl" />
        <div className="relative z-20 text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4">
            {currentContent.industries.headline}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">{currentContent.industries.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentContent.industries.sectors.map((sector, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(10,107,13,0.5)' }}
                className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  {renderIcon(sector.icon)}
                </div>
                <h3 className="text-xl font-medium text-white">{sector.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 text-center mb-12">
          {currentContent.stats.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentContent.stats.items.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2">{stat.number}</p>
              <p className="text-base text-gray-300">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="inline-block p-1.5 rounded-xl bg-gradient-to-r from-green-600 to-[#0F2415] mb-6">
              <span className="inline-block bg-gray-900 rounded-lg px-4 py-1 text-green-400 font-medium text-sm">Why Us</span>
            </div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-6">
              {currentContent.why.headline}
            </h2>
            <p className="text-lg text-gray-300 mb-8">{currentContent.why.text}</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-base text-gray-300">{language === 'en' ? 'Quality-verified partnerships' : 'Qualitätsgeprüfte Partnerschaften'}</span>
              </li>
              <li className="flex items-center">
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-base text-gray-300">{language === 'en' ? 'Secure business transactions' : 'Sichere Geschäftstransaktionen'}</span>
              </li>
              <li className="flex items-center">
                <div className="w-12 h-12 bg-green-900/50 rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-base text-gray-300">{language === 'en' ? 'End-to-end support' : 'Umfassende Unterstützung'}</span>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <img src={images.modern} alt="German Innovation" className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="  relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
       
        <div className="rounded-2xl absolute inset-0 bg-gray-900/90 z-10" />
        <div className="relative z-20">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 text-center mb-12">
            {currentContent.testimonials.headline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentContent.testimonials.items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 0 15px rgba(10,107,13,0.5)' }}
                className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="text-green-400 mb-4">{"★".repeat(5)}</div>
                <p className="text-base text-gray-300 italic mb-6">"{item.quote}"</p>
                <div className="flex items-center">
                  <div className="bg-gray-900 border border-gray-700 rounded-full h-12 w-12 flex items-center justify-center mr-4 text-green-400">
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-medium text-white">{item.author}</h4>
                    <p className="text-sm text-gray-400">{item.position}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="relative w-full max-w-7xl mx-auto py-8 px-6 md:px-12 rounded-2xl shadow-2xl ring-1 ring-white/20 bg-gradient-to-br from-gray-900 to-black z-10"
      >
        <div
          className="rounded-2xl absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${images.future})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="rounded-2xl absolute inset-0 bg-gradient-to-r from-gray-900 to-black/80 z-10" />
        <div className="relative z-20 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-6">
            {currentContent.finalCta.headline}
          </h2>
          <p className="text-lg text-gray-300 mb-10">{currentContent.finalCta.text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(10,107,13,0.7)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-[#0F2415] hover:from-green-700 hover:to-[#0A6B0D] text-white font-medium px-10 py-3 rounded-lg flex items-center gap-1 shadow-[0_0_10px_rgba(10,107,13,0.5)]"
              aria-label={currentContent.finalCta.cta1}
            >
              {currentContent.finalCta.cta1}
              <ArrowRight className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(107,114,128,0.3)' }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-600 bg-gray-800 text-gray-200 font-medium px-8 py-3 rounded-lg hover:bg-gray-700 shadow-[0_0_10px_rgba(107,114,128,0.3)]"
              aria-label={currentContent.finalCta.cta2}
            >
              {currentContent.finalCta.cta2}
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;