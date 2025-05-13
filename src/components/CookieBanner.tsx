import React, { useState } from 'react';
import { Info } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm p-3 flex items-center justify-between z-50">
      <div className="flex items-start space-x-4 max-w-6xl flex-1 pr-6">
        <div className="flex-shrink-0 mt-0.5">
          <div className="rounded-full border border-gray-400 w-5 h-5 flex items-center justify-center">
            <Info size={12} className="text-gray-700" />
          </div>
        </div>
        <p className="text-xs text-gray-800">
          We use optional cookies to improve your experience on our websites, such as through social media 
          connections, and to display personalized advertising based on your online activity. If you reject optional 
          cookies, only cookies necessary to provide you the services will be used. You may change your selection by 
          clicking "Manage Cookies" at the bottom of the page.{' '}
          <a href="#" className="text-blue-600">Privacy Statement</a>{' '}
          <a href="#" className="text-blue-600">Third-Party Cookies</a>
        </p>
      </div>
      <div className="flex items-center space-x-4 flex-shrink-0 ml-6">
        <button 
          onClick={() => setIsVisible(false)}
          className="px-5 py-1.5 bg-white text-gray-800 border border-gray-300 rounded hover:bg-gray-50 text-xs whitespace-nowrap"
        >
          Accept
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="px-5 py-1.5 bg-white text-gray-800 border border-gray-300 rounded hover:bg-gray-50 text-xs whitespace-nowrap"
        >
          Reject
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="px-5 py-1.5 bg-white text-gray-800 border border-gray-300 rounded hover:bg-gray-50 text-xs whitespace-nowrap"
        >
          Manage cookies
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;