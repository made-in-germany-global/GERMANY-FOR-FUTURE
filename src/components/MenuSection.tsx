import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Award, Briefcase, ShoppingCart, Ship, Globe, Leaf, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SecondNavigationBar() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Who we are',
      icon: Award,
      tooltip: 'Learn about our mission and team',
      dropdown: true,
      items: [
        { name: 'Vision & Values', path: '/comingsoon' },
        { name: 'Team', path: '/comingsoon' },
        { name: 'Press & Media', path: '/comingsoon' },
      ],
    },
    {
      title: 'German Manufacturers',
      icon: Briefcase,
      tooltip: 'Explore German manufacturing excellence',
      dropdown: true,
      items: [
        { name: 'Become a Partner', path: '/comingsoon' },
        { name: 'Product Categories', path: '/comingsoon' },
        { name: 'Manufacturing Excellence', path: '/comingsoon' },
      ],
    },
    {
      title: 'Buyers & Distributors',
      icon: ShoppingCart,
      tooltip: 'Solutions for buyers and distributors',
      dropdown: true,
      items: [
        { name: 'I’m a Buyer', path: '/comingsoon' },
        { name: 'Business Inquiry', path: '/comingsoon' },
        { name: 'Sample Orders', path: '/comingsoon' },
      ],
    },
    {
      title: 'Import & Logistics',
      icon: Ship,
      tooltip: 'Streamlined import and logistics services',
      dropdown: true,
      items: [
        { name: 'Container Options', path: '/comingsoon' },
        { name: 'Shipping Process', path: '/comingsoon' },
        { name: 'Warehousing in Germany', path: '/comingsoon' },
      ],
    },
    {
      title: 'Sustainability',
      icon: Leaf,
      tooltip: 'Germany’s commitment to sustainable practices',
      dropdown: true,
      items: [
        { name: 'Renewable Energy', path: '/sustainability/renewable-energy' },
        { name: 'Circular Economy', path: '/sustainability/circular-economy' },
        { name: 'Climate Action', path: '/sustainability/climate-action' },
        { name: 'Green Mobility', path: '/sustainability/green-mobility' },
      ],
    },
    {
      title: 'Innovation',
      icon: Cpu,
      tooltip: 'Cutting-edge technologies from Germany',
      dropdown: true,
      items: [
        { name: 'AI & Automation', path: '/innovation/ai-automation' },
        { name: 'Smart Cities', path: '/innovation/smart-cities' },
        { name: 'Digital Health', path: '/innovation/digital-health' },
        { name: 'Research & Development', path: '/innovation/research-development' },
      ],
    },
  ];

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleMouseEnterDropdown = (index) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(index);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const showTooltip = (index) => {
    setActiveTooltip(index);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-[#000A00] shadow-md border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Menu */}
        <div className="flex justify-center h-16">
          <div className="hidden md:flex items-center justify-center">
            <div className="flex space-x-6">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center"
                  onMouseEnter={() => handleMouseEnterDropdown(index)}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  {/* Icon with Tooltip */}
                  {item.icon && (
                    <div
                      className="relative"
                      onMouseEnter={() => showTooltip(index)}
                      onMouseLeave={hideTooltip}
                    >
                      <item.icon className="mr-2 h-5 w-5 text-yellow-500" />
                      {item.tooltip && activeTooltip === index && (
                        <div className="absolute z-50 w-64 rounded-md shadow-lg transition-all duration-300 ease-in-out transform left-1/2 -translate-x-1/2 top-full mt-2">
                          <div className="rounded-md bg-[#000A00] border border-gray-700 shadow-xl p-2 text-sm text-gray-300">
                            {item.tooltip}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Text with Dropdown */}
                  <div className="relative group">
                    <button
                      className="inline-flex items-center px-3 pt-1 text-sm font-medium text-gray-300 hover:text-white border-b-2 border-transparent hover:border-yellow-500 transition duration-150 ease-in-out h-16"
                    >
                      {item.title}
                      {item.dropdown && (
                        <>
                          <ChevronDown
                            className={`ml-1 h-4 w-4 ${activeDropdown === index ? 'hidden' : 'block'}`}
                          />
                          <ChevronUp
                            className={`ml-1 h-4 w-4 ${activeDropdown === index ? 'block' : 'hidden'}`}
                          />
                        </>
                      )}
                    </button>
                    {/* Dropdown */}
                    {item.dropdown && activeDropdown === index && (
                      <div className="absolute z-40 w-56 rounded-md shadow-lg transition-all duration-300 ease-in-out transform left-1/2 -translate-x-1/2 top-full mt-2">
                        <div className="rounded-md bg-[#000A00] border border-gray-800 shadow-xl">
                          <div className="py-1">
                            {item.items.map((subItem, subIndex) => (
                              <button
                                key={subIndex}
                                onClick={() => navigate(subItem.path)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none transition duration-150 ease-in-out"
                              >
                                {subItem.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden absolute right-4 flex items-center h-16">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
            >
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:text-white focus:bg-gray-800 transition duration-150 ease-in-out"
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5 text-yellow-500" />}
                {item.title}
                {item.dropdown && (
                  activeDropdown === index ? (
                    <ChevronUp className="ml-auto h-5 w-5" />
                  ) : (
                    <ChevronDown className="ml-auto h-5 w-5" />
                  )
                )}
              </button>
              {item.dropdown && activeDropdown === index && (
                <div className="bg-[#000A00] pl-12 pt-2 pb-3 space-y-1">
                  {item.items.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => navigate(subItem.path)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white transition duration-150 ease-in-out"
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}