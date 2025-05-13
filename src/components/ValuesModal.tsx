import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faGlobe, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { X } from 'lucide-react';

interface ValuesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CONTENT = {
  title: "Wertegemeinschaft MADE IN GERMANY ©",
  subtitle: "Was uns verbindet.",
  heroContent: `Unsere Wertegemeinschaft steht für Qualität, Verlässlichkeit, Verantwortung und Innovation – Eigenschaften, die seit Jahrzehnten mit dem Gütesiegel MADE IN GERMANY © verknüpft sind. Hier treffen sich Hersteller, Partner und Kunden, die an nachhaltige Wirtschaft, vertrauensvolle Zusammenarbeit und zukunftsorientiertes Denken glauben. Diese Plattform vereint nicht nur Produkte, sondern auch Haltung. Gemeinsam stärken wir den Ruf Deutschlands in der Welt – transparent, modern und fair.`,
  infoBoxes: [
    {
      title: "Qualität & Verlässlichkeit",
      content: `MADE IN GERMANY © steht für höchste Standards und langlebige Produkte. Unsere Gemeinschaft verpflichtet sich, diese Qualität in jeder Zusammenarbeit zu gewährleisten.`,
      expandedContent: `Von der Produktion bis zur Auslieferung: Unsere Partner setzen auf Präzision und Vertrauen, um die Erwartungen unserer Kunden weltweit zu übertreffen.`
    },
    {
      title: "Nachhaltigkeit & Verantwortung",
      content: `Wir fördern eine Wirtschaft, die Umwelt und Gesellschaft respektiert. Nachhaltigkeit ist für uns kein Trend, sondern eine Verpflichtung.`,
      expandedContent: `Durch verantwortungsvolle Prozesse und transparente Lieferketten schaffen wir Werte, die über den Moment hinaus Bestand haben.`
    },
    {
      title: "Innovation & Zukunft",
      content: `Zukunftsorientiertes Denken treibt uns an. Wir verbinden traditionelle Werte mit modernen Technologien, um die Welt von morgen zu gestalten.`,
      expandedContent: `Unsere Plattform ist ein Raum für kreative Lösungen und Partnerschaften, die Innovationen fördern und globale Herausforderungen meistern.`
    }
  ],
  buttonShowLess: "Weniger anzeigen",
  buttonLearnMore: "Mehr erfahren",
  buttonClose: "SCHLIESSEN",
  footerText: "Mit deutscher Präzision, Ihr MADE IN GERMANY © Team"
};

const ValuesModal: React.FC<ValuesModalProps> = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
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
              @keyframes gridPulse {
                0% { opacity: 0.2; }
                50% { opacity: 0.4; }
                100% { opacity: 0.2; }
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
              .tooltip {
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                position: absolute;
                top: 100%;
                right: 0;
                background-color: #1f2937;
                color: #fff;
                text-align: center;
                padding: 5px 10px;
                border-radius: 6px;
                font-size: 0.875rem;
                white-space: nowrap;
                z-index: 10;
              }
              .tooltip-container:hover .tooltip {
                visibility: visible;
                opacity: 1;
              }
            `}
          </style>
          {/* Fixed Background with Image */}
          <div className="fixed inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=60')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                filter: 'blur(8px)',
              }}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/70" />
          </div>
          {/* Modal Content with Scroll and Grid Background */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
            className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl ring-2 ring-blue-500/50 w-full max-w-[95%] sm:max-w-4xl md:max-w-6xl lg:max-w-8xl mx-4 my-8 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none animate-[gridPulse_5s_ease-in-out_infinite]"
            />
            {/* Sticky Header */}
            <motion.div
              className="sticky top-0 z-20 flex justify-between items-center p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-black border-b border-gray-600"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              >
                {CONTENT.title}
              </motion.h2>
              <div className="relative tooltip-container">
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(59,130,246,0.7)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white shadow-lg"
                  aria-label="Close"
                >
                  <X size={24} />
                </motion.button>
                <span className="tooltip">{CONTENT.buttonClose}</span>
              </div>
            </motion.div>

            {/* Scrollable Content with Hidden Scrollbar */}
            <div className="relative z-10 flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8">
              {/* Hero Section */}
              <motion.div
                className="text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h3
                  variants={itemVariants}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 sm:mb-6 md:mb-8"
                >
                  {CONTENT.subtitle}
                </motion.h3>
                <motion.p
                  variants={itemVariants}
                  className="text-left text-sm sm:text-base text-gray-300 leading-relaxed mb-6"
                >
                  {CONTENT.heroContent}
                </motion.p>
                <motion.div
                  className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-6 overflow-hidden mobile-image-container"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src="/made-in-germany-value-code.png"
                    alt="Values illustration"
                    className="w-full h-full object-contain sm:object-cover md:object-contain lg:object-contain object-center mobile-image rounded-lg"
                    onLoad={() => setImageLoaded(true)}
                    style={{
                      opacity: imageLoaded ? 1 : 0,
                      transition: 'opacity 0.5s ease-in-out'
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Info Boxes */}
              <motion.div
                className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {CONTENT.infoBoxes.map((box, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="p-4 sm:p-6 rounded-xl bg-gray-800/80 border border-gray-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FontAwesomeIcon
                        icon={index === 0 ? faHandshake : index === 1 ? faGlobe : faLightbulb}
                        className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                      />
                      <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{box.title}</h3>
                    </div>
                    <div className="text-gray-300 space-y-3">
                      <motion.div
                        initial={false}
                        animate={{ height: 'auto' }}
                        className="text-sm sm:text-base leading-relaxed"
                      >
                        {box.content.split('\n').map((line, i) => (
                          <p key={i} className="mb-1">{line.trim()}</p>
                        ))}
                      </motion.div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSection(index)}
                        className="mt-4 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-200 hover:shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                      >
                        <span>{expandedSection === index ? CONTENT.buttonShowLess : CONTENT.buttonLearnMore}</span>
                      </motion.button>
                      <AnimatePresence>
                        {expandedSection === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pt-3 text-sm sm:text-base text-gray-400 leading-relaxed"
                          >
                            <p>{box.expandedContent}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer */}
              <motion.div
                className="mt-8 border-t border-gray-600 pt-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {CONTENT.footerText}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValuesModal;