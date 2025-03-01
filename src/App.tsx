import React, { useState, useEffect, useRef } from 'react';
import { PhoneCall, Menu, Bot, MessageSquare, Zap, ArrowRight, Calendar, Calculator, DollarSign, BarChart3, CheckCircle, Clock, Users, Headphones, MessageCircle, Phone, BellRing, BarChart, Target, Briefcase, Star, Quote, ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const [chatIndex, setChatIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // ROI Calculator state - separate values for each service
  const [inboundInquiries, setInboundInquiries] = useState<number | string>('');
  const [inboundClosingRate, setInboundClosingRate] = useState<number | string>('');
  const [inboundDollarsPerDeal, setInboundDollarsPerDeal] = useState<number | string>('');

  const [outboundLeadsReached, setOutboundLeadsReached] = useState<number | string>('');
  const [outboundClosingRate, setOutboundClosingRate] = useState<number | string>('');
  const [outboundDollarsPerDeal, setOutboundDollarsPerDeal] = useState<number | string>('');

  // Define the chat sequence (AI handles booking)
  const chatSequence = [
    { type: 'customer', message: "Hi, I'm interested in a Tesla Model 3 2019. Do you have any in stock?" },
    { type: 'bot', message: "Hello! Yes, we have this Tesla Model 3 (2019, Long Range) available:", image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=400&auto=format&fit=crop" },
    { type: 'customer', message: "Great! What's the price?" },
    { type: 'bot', message: "It's priced at $32,900 with 45,000 miles. Clean history and includes Autopilot." },
    { type: 'customer', message: "Can I schedule a test drive?" },
    { type: 'bot', message: "Absolutely! We have slots available tomorrow at 2 PM or Saturday at 11 AM. Which works better for you?" },
    { type: 'customer', message: "Tomorrow at 2 PM works for me." },
    { type: 'bot', message: "Great! Could you please provide your phone number so we can send you a confirmation?" },
    { type: 'customer', message: "Sure, it's 555-123-4567." },
    { type: 'bot', message: "Perfect! I've scheduled your test drive for tomorrow at 2 PM. You'll receive a confirmation text at 555-123-4567. Please bring your driver's license. Looking forward to seeing you!" }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Sales Manager",
      company: "Riverside Auto Group",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote: "The AI assistant has transformed how we handle inquiries. Our response time went from hours to seconds, and we've seen a 35% increase in appointments.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "General Manager",
      company: "Pacific Motors",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote: "The AI calling agent is incredible. It sounds completely natural and our customers love the immediate response. We've increased our lead conversion by 42%.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      position: "Owner",
      company: "Elite Auto Sales",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
      quote: "As a small dealership, we couldn't afford a 24/7 sales team. This solution changed everything - now we never miss an opportunity, even at 2 AM.",
      rating: 4
    }
  ];

  // FAQ data
  const faqData = [
    {
      question: "How does the AI chatbot work?",
      answer: "Our AI chatbot uses advanced natural language processing to understand customer inquiries and provide relevant, helpful responses. It can answer questions about inventory, pricing, features, and schedule appointments in real-time, 24/7."
    },
    {
      question: "Will the AI calling agent sound robotic?",
      answer: "Not at all. Our AI calling agent uses state-of-the-art voice technology that sounds completely natural. Most customers can't tell they're speaking with an AI, and the conversations flow naturally with appropriate pauses and intonation."
    },
    {
      question: "How does the system integrate with our existing systems?",
      answer: "Our solution seamlessly integrates with most major CRM systems, inventory management software, and calendar tools used by dealerships. Our team handles the entire setup process to ensure smooth data flow between systems."
    },
    {
      question: "How long does it take to implement?",
      answer: "Most dealerships are up and running within 1-2 weeks. This includes integration with your existing systems, training your team, and customizing the AI to match your dealership's voice and processes."
    },
    {
      question: "What kind of ROI can we expect?",
      answer: "Dealerships typically see a 3-5x return on investment within the first 3 months. This comes from increased lead capture, higher conversion rates, and more efficient use of your sales team's time."
    }
  ];

  // Toggle FAQ open/closed
  const toggleFaq = (index: number) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Cycle through messages in the sequence
  useEffect(() => {
    const maxIndex = chatSequence.length - 1;

    const timer = setTimeout(() => {
      if (chatIndex < maxIndex) {
        // Continue showing messages in current sequence
        setChatIndex(chatIndex + 1);
      } else {
        // When we reach the end, wait 4 seconds then restart the same sequence
        setTimeout(() => {
          setChatIndex(0);
        }, 4000); // 4 second delay before restarting
      }
    }, 2000); // Change message every 2 seconds

    return () => clearTimeout(timer);
  }, [chatIndex]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatIndex]);

  // Get current messages to display
  const currentMessages = chatSequence.slice(0, chatIndex + 1);

  // Calculate ROI for both services simultaneously
  // Inbound calculations
  const inboundCurrentCaptureRate = 0.4; // 40%
  const inboundImprovedCaptureRate = 0.9; // 90%

  const inboundInquiriesNum = typeof inboundInquiries === 'string' ? (inboundInquiries === '' ? 0 : parseInt(inboundInquiries)) : inboundInquiries;
  const inboundClosingRateNum = typeof inboundClosingRate === 'string' ? (inboundClosingRate === '' ? 0 : parseInt(inboundClosingRate)) : inboundClosingRate;
  const inboundDollarsPerDealNum = typeof inboundDollarsPerDeal === 'string' ? (inboundDollarsPerDeal === '' ? 0 : parseInt(inboundDollarsPerDeal)) : inboundDollarsPerDeal;

  const inboundCurrentCaptured = Math.round(inboundInquiriesNum * inboundCurrentCaptureRate);
  const inboundImprovedCaptured = Math.round(inboundInquiriesNum * inboundImprovedCaptureRate);

  const inboundCurrentSales = Math.round(inboundCurrentCaptured * (inboundClosingRateNum / 100));
  const inboundImprovedSales = Math.round(inboundImprovedCaptured * (inboundClosingRateNum / 100));

  const inboundCurrentRevenue = inboundCurrentSales * inboundDollarsPerDealNum;
  const inboundImprovedRevenue = inboundImprovedSales * inboundDollarsPerDealNum;
  const inboundAdditionalRevenue = inboundImprovedRevenue - inboundCurrentRevenue;

  // Outbound calculations
  const outboundCurrentReachRate = 1.0; // 100% baseline
  const outboundImprovedReachRate = 1.6; // 60% more with improved technology

  const outboundLeadsReachedNum = typeof outboundLeadsReached === 'string' ? (outboundLeadsReached === '' ? 0 : parseInt(outboundLeadsReached)) : outboundLeadsReached;
  const outboundClosingRateNum = typeof outboundClosingRate === 'string' ? (outboundClosingRate === '' ? 0 : parseInt(outboundClosingRate)) : outboundClosingRate;
  const outboundDollarsPerDealNum = typeof outboundDollarsPerDeal === 'string' ? (outboundDollarsPerDeal === '' ? 0 : parseInt(outboundDollarsPerDeal)) : outboundDollarsPerDeal;

  const outboundCurrentCaptured = Math.round(outboundLeadsReachedNum * outboundCurrentReachRate);
  const outboundImprovedCaptured = Math.round(outboundLeadsReachedNum * outboundImprovedReachRate);

  const outboundCurrentSales = Math.round(outboundCurrentCaptured * (outboundClosingRateNum / 100));
  const outboundImprovedSales = Math.round(outboundImprovedCaptured * (outboundClosingRateNum / 100));

  const outboundCurrentRevenue = outboundCurrentSales * outboundDollarsPerDealNum;
  const outboundImprovedRevenue = outboundImprovedSales * outboundDollarsPerDealNum;
  const outboundAdditionalRevenue = outboundImprovedRevenue - outboundCurrentRevenue;

  // Total additional revenue from both services
  const totalAdditionalRevenue = inboundAdditionalRevenue + outboundAdditionalRevenue;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-indigo-900 to-purple-900">
      {/* Navigation Bar */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1710950687020-9c2a9e5a8d0a?q=80&w=150&auto=format&fit=crop" 
                    alt="MotoLeads Logo" 
                    className="h-10"
                    onError={(e) => {
                      // Fallback to text if image fails to load
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const textElement = document.createElement('span');
                        textElement.className = 'text-xl font-bold text-white';
                        textElement.textContent = 'MotoLeads';
                        parent.appendChild(textElement);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#services-section" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md text-sm font-medium">Our Services</a>
                  <a href="#roi-calculator" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md text-sm font-medium">ROI Calculator</a>
                  <a href="#testimonials-section" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md text-sm font-medium">Testimonials</a>
                  <a href="#faq-section" className="text-white hover:bg-white hover:bg-opacity-10 px-3 py-2 rounded-md text-sm font-medium">FAQ</a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <a 
                  href="https://calendly.com/amin-usman-motoleads/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Request a Demo
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white hover:bg-opacity-10 focus:outline-none">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  <span className="block">Revolutionize Your</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Dealership Experience</span>
                </h1>
                <p className="mt-6 text-xl text-white text-opacity-90 max-w-lg">
                  MotoLeads combines advanced AI chatbots and human-like calling agents to transform how your dealership connects with car buyers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://calendly.com/amin-usman-motoleads/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-white bg-opacity-10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-opacity-20 transition-all flex items-center justify-center"
                >
                  Request a Demo <Zap className="ml-2 h-5 w-5" />
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" />
                </div>
                <p className="text-sm text-white"><span className="font-bold">500+</span> dealerships have seen proven results</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 transform -rotate-6"></div>
              <div className="relative bg-white bg-opacity-10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white border-opacity-20">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white text-opacity-80 text-sm">MotoLeads AI Assistant</div>
                </div>

                <div ref={chatContainerRef} className="space-y-2 h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {currentMessages.map((chat, index) => {
                    if (chat.type === 'customer') {
                      return (
                        <div key={index} className="flex items-start space-x-2 justify-end">
                          <div className="bg-blue-500 bg-opacity-50 rounded-lg rounded-tr-none py-2 px-3 text-white max-w-xs">
                            <p className="text-sm">{chat.message}</p>
                          </div>
                          <div className="bg-indigo-600 p-1.5 rounded-full flex-shrink-0">
                            <MessageSquare className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      );
                    } else if (chat.type === 'bot') {
                      return (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="bg-blue-600 p-1.5 rounded-full flex-shrink-0">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-gray-800 bg-opacity-50 rounded-lg rounded-tl-none py-2 px-3 text-white max-w-xs">
                            <p className="text-sm">{chat.message}</p>
                            {chat.image && (
                              <img 
                                src={chat.image} 
                                alt="Tesla Model 3" 
                                className="mt-2 rounded-lg w-full h-auto object-cover"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {/* Show typing indicator for the next message */}
                  {chatIndex < chatSequence.length - 1 && (
                    <div className="flex items-start space-x-2">
                      <div className="bg-blue-600 p-1.5 rounded-full flex-shrink-0">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-lg rounded-tl-none py-2 px-3 text-white max-w-xs">
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="h-1.5 w-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full py-2 px-4 text-sm text-white placeholder-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="absolute right-1.5 top-1.5 bg-blue-600 p-1.5 rounded-full">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div id="services-section" className="mt-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Our Services</h2>
              <p className="mt-2 text-base text-white text-opacity-80 max-w-2xl mx-auto">
                Discover how our AI-powered solutions can transform your dealership's customer engagement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inbound Service Benefits */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-xl border border-blue-500 border-opacity-30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inbound Service</h3>
                </div>
                
                <div className="mb-4 relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-white text-opacity-80 text-xs">Live Chatbot</div>
                  </div>

                  <div className="h-36 overflow-y-auto pr-2 space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="bg-blue-600 p-1.5 rounded-full flex-shrink-0">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-lg rounded-tl-none py-1.5 px-2 text-white max-w-xs">
                        <p className="text-xs">Hi there! How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 justify-end">
                      <div className="bg-blue-500 bg-opacity-50 rounded-lg rounded-tr-none py-1.5 px-2 text-white max-w-xs">
                        <p className="text-xs">Do you have any Ford F-150s in stock?</p>
                      </div>
                      <div className="bg-indigo-600 p-1.5 rounded-full flex-shrink-0">
                        <MessageSquare className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="bg-blue-600 p-1.5 rounded-full flex-shrink-0">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <div className="bg-gray-800 bg-opacity-50 rounded-lg rounded-tl-none py-1.5 px-2 text-white max-w-xs">
                        <p className="text-xs">Yes! We have several F-150s available. Would you like to see our current inventory?</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 relative">
                    <input 
                      type="text" 
                      placeholder="Type here..." 
                      className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-full py-1 px-3 text-xs text-white placeholder-white placeholder-opacity-50 focus:outline-none"
                    />
                    <button className="absolute right-1 top-1 bg-blue-600 p-1 rounded-full">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">24/7 AI Chatbot</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Human like call receiving agent</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Appointment Scheduling</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Instant Response</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">CRM Integration</h4>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center items-center">
                  <div className="bg-blue-700 bg-opacity-50 rounded-lg px-3 py-1.5">
                    <p className="text-sm text-white font-medium">125% more leads captured</p>
                  </div>
                </div>
              </div>

              {/* Outbound Service Benefits */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 shadow-xl border border-purple-500 border-opacity-30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="flex items-center mb-4">
                  <div className="bg-purple-500 bg-opacity-30 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Outbound Service</h3>
                </div>
                
                <div className="mb-4 relative bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white border-opacity-20">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white text-opacity-80 text-xs">AI Calling Demo</div>
                  </div>
                  <div className="aspect-video rounded-md overflow-hidden">
                    <iframe 
                      src="https://player.vimeo.com/video/876543210?autoplay=0&loop=0&title=0&byline=0&portrait=0" 
                      className="w-full h-full" 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                      title="AI Calling Demo">
                    </iframe>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Proactive Outreach</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Natural Conversations</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Lead Qualification</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">Follow-up Campaigns</h4>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-purple-300" />
                    </div>
                    <div className="ml-3">
                      <h4 className="text-white font-semibold">CRM Integration</h4>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center items-center">
                  <div className="bg-purple-700 bg-opacity-50 rounded-lg px-3 py-1.5">
                    <p className="text-sm text-white font-medium">60% more leads reached</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Calculator Section - Side by side services */}
          <div id="roi-calculator" className="mt-24">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Calculate Your ROI</h2>
              <p className="mt-2 text-base text-white text-opacity-80 max-w-2xl mx-auto">
                See how our AI solutions can boost your dealership's performance
              </p>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-2xl border border-white border-opacity-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Input Section - Side by side services */}
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Calculator className="mr-2 h-4 w-4" />
                    ROI Calculator
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Inbound Service */}
                    <div className="bg-blue-600 bg-opacity-20 rounded-lg p-3 border border-blue-500 border-opacity-30">
                      <h4 className="text-sm font-semibold text-white mb-2">Inbound Chatbot & Calling Agent</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">Monthly Inquiries</label>
                          <input 
                            type="text" 
                            value={inboundInquiries}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || /^\d+$/.test(value)) {
                                setInboundInquiries(value);
                              }
                            }}
                            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 px-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">Closing Rate (%)</label>
                          <input 
                            type="text" 
                            value={inboundClosingRate}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
                                setInboundClosingRate(value);
                              }
                            }}
                            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 px-2 text-smtext-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">$ Per Deal</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                              <DollarSign className="h-3 w-3 text-white text-opacity-70" />
                            </div>
                            <input 
                              type="text" 
                              value={inboundDollarsPerDeal}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                  setInboundDollarsPerDeal(value);
                                }
                              }}
                              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 pl-7 pr-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outbound Service */}
                    <div className="bg-purple-600 bg-opacity-20 rounded-lg p-3 border border-purple-500 border-opacity-30">
                      <h4 className="text-sm font-semibold text-white mb-2">Outbound Calling Agent</h4>
                      <div className="space-y-2">
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">Leads Reached</label>
                          <input 
                            type="text" 
                            value={outboundLeadsReached}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || /^\d+$/.test(value)) {
                                setOutboundLeadsReached(value);
                              }
                            }}
                            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 px-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">Closing Rate (%)</label>
                          <input 
                            type="text" 
                            value={outboundClosingRate}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (value === '' || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
                                setOutboundClosingRate(value);
                              }
                            }}
                            className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 px-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-white mb-1">$ Per Deal</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                              <DollarSign className="h-3 w-3 text-white text-opacity-70" />
                            </div>
                            <input 
                              type="text" 
                              value={outboundDollarsPerDeal}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\d+$/.test(value)) {
                                  setOutboundDollarsPerDeal(value);
                                }
                              }}
                              className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg py-1.5 pl-7 pr-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Section - Side by side metrics */}
                <div className="lg:col-span-5">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 shadow-lg h-full">
                    <h3 className="text-lg font-bold text-white flex items-center mb-3">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      Increase with AI Solutions
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Inbound Service Results */}
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-white">Inbound Service</p>
                          <div className="bg-blue-600 bg-opacity-30 rounded-full px-2 py-0.5">
                            <p className="text-xs text-white">125% more leads captured</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm text-white text-opacity-70 mr-1">Without AI:</span>
                            <span className="text-sm font-semibold text-white">{inboundCurrentCaptured} inquiries</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-white text-opacity-70 mr-1">With AI:</span>
                            <span className="text-sm font-semibold text-white">{inboundImprovedCaptured} inquiries</span>
                          </div>
                          <div className="flex items-center text-green-300 bg-green-500 bg-opacity-20 px-2 py-1 rounded text-sm mt-2">
                            +${inboundAdditionalRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Outbound Service Results */}
                      <div className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm font-medium text-white">Outbound Service</p>
                          <div className="bg-purple-600 bg-opacity-30 rounded-full px-2 py-0.5">
                            <p className="text-xs text-white">60% More Leads Reached</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <span className="text-sm text-white text-opacity-70 mr-1">Without AI:</span>
                            <span className="text-sm font-semibold text-white">{outboundCurrentCaptured} leads</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-white text-opacity-70 mr-1">With AI:</span>
                            <span className="text-sm font-semibold text-white">{outboundImprovedCaptured} leads</span>
                          </div>
                          <div className="flex items-center text-green-300 bg-green-500 bg-opacity-20 px-2 py-1 rounded text-sm mt-2">
                            +${outboundAdditionalRevenue.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Total Monthly Profit Increase - Full width */}
                      <div className="bg-green-500 bg-opacity-20 rounded-lg p-3 border border-green-500 border-opacity-30 mt-1 col-span-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-white">Total Monthly Profit Increase</p>
                          <p className="text-xl font-bold text-green-300">+${totalAdditionalRevenue.toLocaleString()}</p>
                        </div>
                        <div className="mt-2 w-full bg-white bg-opacity-10 rounded-full h-1.5">
                          <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, totalAdditionalRevenue > 0 ? 75 : 0)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div id="testimonials-section" className="mt-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">What Our Clients Say</h2>
              <p className="mt-2 text-base text-white text-opacity-80 max-w-2xl mx-auto">
                Hear from dealerships that have transformed their business with our AI solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20">
                   <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <h3 className="text-white font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-white text-opacity-70">{testimonial.position} at {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <Quote className="h-8 w-8 text-blue-400 opacity-50" />
                    <p className="mt-2 text-white text-opacity-90">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div id="faq-section" className="mt-24">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="mt-2 text-base text-white text-opacity-80 max-w-2xl mx-auto">
                Everything you need to know about our AI solutions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="text-white font-medium">{faq.question}</span>
                    {openFaqs.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-white" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-white" />
                    )}
                  </button>

                  {openFaqs.includes(index) && (
                    <div className="px-6 pb-4">
                      <p className="text-white text-opacity-80">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

              <div className="relative z-10 text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Dealership?</h2>
                <p className="text-lg text-white text-opacity-90 mb-8">
                  Join 500+ dealerships already using AI solutions to increase lead capture, improve response times, and drive more sales.
                </p>
                <a 
                  href="https://calendly.com/amin-usman-motoleads/30min" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 font-bold rounded-lg shadow-lg hover:bg-opacity-90 transition-colors text-lg"
                >
                  Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;