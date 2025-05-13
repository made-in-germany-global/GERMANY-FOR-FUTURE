import React, { useState, useRef, useEffect } from 'react';
import { XIcon, MessageCircleIcon, SendIcon, ChevronRightIcon, PaperclipIcon, UserIcon, ChevronDownIcon } from 'lucide-react';

const SupportButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('support');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  const [chatMessages, setChatMessages] = useState<Array<{type: string, content: string, time: string}>>([
    {type: 'system', content: 'Welcome to our support chat! How can we help you today?', time: formatTime(new Date())},
    {type: 'system', content: 'Our support team usually responds within 5 minutes during business hours.', time: formatTime(new Date())}
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Your ${inquiryType} inquiry has been sent. We will get back to you soon!`);
    setMessage('');
    setEmail('');
    setName('');
    setUploadedFiles([]);
    setIsOpen(false);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      type: 'user',
      content: chatInput,
      time: formatTime(new Date())
    };
    
    setChatMessages([...chatMessages, newUserMessage]);
    setChatInput('');
    
    // Simulate AI or agent response after a short delay
    setTimeout(() => {
      // Randomize between AI and human agent responses for demonstration
      const responseType = Math.random() > 0.5 ? 'ai' : 'agent';
      let responseContent = '';
      
      if (responseType === 'ai') {
        responseContent = "I'm the AI assistant. Let me help you with your question. If you need more specific assistance, I'll connect you with a human agent.";
      } else {
        responseContent = "This is Sophie from customer support. I see you have a question. How can I assist you today?";
      }
      
      setChatMessages(prev => [...prev, {
        type: responseType,
        content: responseContent,
        time: formatTime(new Date())
      }]);
    }, 1500);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      
      // Simulate file upload process
      setTimeout(() => {
        const newFiles = Array.from(e.target.files || []).map(file => file.name);
        setUploadedFiles([...uploadedFiles, ...newFiles]);
        setIsUploading(false);
        
        // Reset the input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 1000);
    }
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file !== fileName));
  };

  // FAQ data
  const faqItems = [
    {
      question: "What does 'Made in Germany' certification mean?",
      answer: "Products with our certification are manufactured entirely in Germany, meeting strict quality and production standards."
    },
    {
      question: "How can manufacturers apply for certification?",
      answer: "Manufacturers can apply through our membership section. We conduct thorough verification of production facilities and processes."
    },
    {
      question: "How long does certification take?",
      answer: "The certification process typically takes 4-6 weeks, including facility inspections and documentation review."
    },
    {
      question: "What benefits do certified manufacturers receive?",
      answer: "Certified manufacturers gain access to our global marketplace, digital badge for marketing, and networking opportunities with premium retailers."
    },
    {
      question: "How can I verify if a product is genuinely certified?",
      answer: "All certified products have a unique QR code that can be scanned to verify authenticity on our official database."
    },
    {
      question: "What industries are eligible for certification?",
      answer: "We certify manufacturers across all industries including automotive, electronics, pharmaceuticals, textiles, machinery, and consumer goods."
    },
    {
      question: "Are there annual renewal requirements?",
      answer: "Yes, certified companies undergo annual audits to ensure continued compliance with our quality standards."
    }
  ];

  return (
    <>
      {/* Support Button */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 flex items-center justify-center space-x-2 w-32 sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-md bg-yellow-400 text-[#0B111F] font-medium transition-all duration-300 hover:bg-yellow-500 hover:text-[#0B111F] active:transform active:scale-95 z-50"
        aria-label="Support"
      >
        <MessageCircleIcon className="w-5 h-5 animate-bounce" />
        <span>SUPPORT</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Modal Container */}
          <div className="relative w-full max-w-3xl bg-[#0B111F] border border-gray-700 rounded-lg overflow-hidden shadow-2xl animate-fade-in">
            {/* Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            ></div>

            {/* Modal Header with Logo */}
            <div className="relative flex items-center px-6 py-4 bg-[#151D2C] border-b border-gray-700">
              <div className="flex items-center flex-1">
                <img
                  src="/made-in-germany-logo-english-white.png"
                  alt="Made in Germany"
                  className="h-8 mr-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  {activeTab === 'support' && 'Create Support Ticket'}
                  {activeTab === 'chat' && 'Live Support Chat'}
                  {activeTab === 'faq' && 'Frequently Asked Questions'}
                  {activeTab === 'contact' && 'Contact Information'}
                </h3>
              </div>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                aria-label="Close"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="relative flex items-center border-b border-gray-700 bg-[#151D2C]/70">
              <button
                onClick={() => setActiveTab('support')}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === 'support'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Support Ticket
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === 'chat'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === 'faq'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  activeTab === 'contact'
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Contact
              </button>
            </div>

            <div className="flex flex-col md:flex-row min-h-[400px]">
              {/* Left decorative element for larger screens */}
              <div className="hidden md:block md:w-1/6 bg-[#151D2C]/70 relative overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="h-full flex flex-col justify-center">
                  <div className="border-l-8 border-black h-24 mx-auto"></div>
                  <div className="border-l-8 border-[#DD0000] h-24 mx-auto"></div>
                  <div className="border-l-8 border-[#FFCE00] h-24 mx-auto"></div>
                </div>
              </div>

              {/* Content area */}
              <div className="flex-1">
                {/* Modal Content - Support Form */}
                {activeTab === 'support' && (
                  <div className="relative p-6 overflow-y-auto max-h-[60vh]">
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm">
                        Submit a support ticket and our team will get back to you as soon as possible.
                      </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2 bg-[#151D2C] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          placeholder="Your name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2 bg-[#151D2C] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-300 mb-1">
                          Inquiry Type
                        </label>
                        <div className="relative">
                          <select
                            id="inquiryType"
                            value={inquiryType}
                            onChange={(e) => setInquiryType(e.target.value)}
                            className="w-full px-4 py-2 bg-[#151D2C] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent pr-10"
                            required
                          >
                            <option value="general">General Inquiry</option>
                            <option value="buyer">Buyer Support</option>
                            <option value="manufacturer">Manufacturer Support</option>
                            <option value="certification">Certification Process</option>
                            <option value="technical">Technical Issue</option>
                          </select>
                          <ChevronDownIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 bg-[#151D2C] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      {/* File upload section */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Attachments (Optional)
                        </label>
                        <div className="mt-1 flex items-center">
                          <button
                            type="button"
                            onClick={handleFileUpload}
                            className="px-3 py-2 bg-[#151D2C] border border-gray-700 rounded-md text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                          >
                            <PaperclipIcon className="w-4 h-4" />
                            <span>Attach Files</span>
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={handleFileChange}
                          />
                          {isUploading && (
                            <span className="ml-3 text-sm text-yellow-400">Uploading...</span>
                          )}
                        </div>

                        {/* Display uploaded files */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-[#151D2C] p-2 rounded-md border border-gray-700">
                                <span className="text-sm text-gray-300 truncate max-w-xs">{file}</span>
                                <button
                                  type="button"
                                  onClick={() => removeFile(file)}
                                  className="text-gray-400 hover:text-red-400 transition-colors"
                                >
                                  <XIcon className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-yellow-400 text-[#0B111F] font-medium rounded-md hover:bg-yellow-500 transition-colors"
                        >
                          Submit Ticket
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Modal Content - Live Chat */}
                {activeTab === 'chat' && (
                  <div className="relative flex flex-col h-[60vh]">
                    {/* Chat messages area */}
                    <div 
                      ref={chatContainerRef}
                      className="flex-1 p-4 overflow-y-auto space-y-4"
                    >
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div 
                            className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 relative ${
                              msg.type === 'user' 
                                ? 'bg-yellow-400 text-[#0B111F]' 
                                : msg.type === 'system' 
                                  ? 'bg-gray-700 text-white' 
                                  : msg.type === 'ai'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-600 text-white'
                            }`}
                          >
                            {msg.type === 'agent' && (
                              <div className="flex items-center mb-1">
                                <UserIcon className="w-4 h-4 mr-1" />
                                <span className="text-xs font-medium">Support Agent</span>
                              </div>
                            )}
                            {msg.type === 'ai' && (
                              <div className="flex items-center mb-1">
                                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                                  <circle cx="12" cy="12" r="2" />
                                </svg>
                                <span className="text-xs font-medium">AI Assistant</span>
                              </div>
                            )}
                            <p className="text-sm">{msg.content}</p>
                            <span className="text-xs opacity-70 mt-1 block text-right">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat input area */}
                    <div className="p-3 bg-[#151D2C] border-t border-gray-700">
                      <form onSubmit={handleChatSubmit} className="flex space-x-2">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 bg-[#0B111F] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-[#0B111F] font-medium rounded-md flex items-center space-x-1 transition-all"
                          disabled={!chatInput.trim()}
                        >
                          <SendIcon className="w-4 h-4" />
                        </button>
                      </form>
                      <div className="mt-2 text-xs text-gray-400 text-center">
                        Powered by Smart AI Support – Human Help Always Available
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Content - FAQ */}
                {activeTab === 'faq' && (
                  <div className="relative p-6 overflow-y-auto max-h-[60vh]">
                    <div className="mb-4">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search FAQ..."
                          className="w-full px-4 py-2 pl-10 bg-[#151D2C] border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        />
                        <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {faqItems.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
                        >
                          <details className="group">
                            <summary className="flex items-center justify-between p-4 bg-[#151D2C] cursor-pointer">
                              <h4 className="text-sm font-medium text-white pr-2">{item.question}</h4>
                              <ChevronRightIcon className="w-5 h-5 text-yellow-400 group-open:rotate-90 transition-transform" />
                            </summary>
                            <div className="p-4 bg-[#0B111F] border-t border-gray-700">
                              <p className="text-sm text-gray-300">{item.answer}</p>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Content - Contact Information */}
                {activeTab === 'contact' && (
                  <div className="relative p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Head Office
                        </h4>
                        <div className="space-y-2 text-gray-300 text-sm pl-6">
                          <p>Made in Germany Certification GmbH</p>
                          <p>Industriestraße 45</p>
                          <p>10115 Berlin, Germany</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                          </svg>
                          Contact Details
                        </h4>
                        <div className="space-y-2 text-gray-300 text-sm pl-6">
                          <p>Email: support@madeingermany.com</p>
                          <p>Phone: +49 30 123456789</p>
                          <p>Hours: Monday-Friday, 9:00-18:00 CET</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                          </svg>
                          Email Departments
                        </h4>
                        <div className="space-y-2 text-gray-300 text-sm pl-6">
                          <p>General: info@madeingermany.com</p>
                          <p>Certification: certification@madeingermany.com</p>
                          <p>Press: press@madeingermany.com</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Follow Us
                        </h4>
                        <div className="flex space-x-4 mt-2 pl-6">
                          <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                          <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.168 22 17.031 22 12.04c0-5.523-4.477-10-10-10zm0 0l.117.007c.033.002.066.005.1.005.034 0 .067-.003.1-.005L12 2.04z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportButton;