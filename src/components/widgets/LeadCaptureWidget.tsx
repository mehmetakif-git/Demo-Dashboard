import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  X,
  Send,
  Mail,
  MessageSquare,
  Calendar,
  Check,
  Loader2,
  Sparkles,
  Zap,
  Shield,
  Headphones,
  Settings,
} from 'lucide-react';

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check size={32} className="text-green-400" />
        </div>
        <h4 className="text-white font-medium mb-2">Thank You!</h4>
        <p className="text-gray-400 text-sm">We'll get back to you as soon as possible.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Full Name *"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <input
        type="email"
        placeholder="Email Address *"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <input
        type="text"
        placeholder="Company Name"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500"
      />
      <textarea
        placeholder="Your Message..."
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 resize-none"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send
          </>
        )}
      </button>
    </form>
  );
};

// WhatsApp Contact Component
const WhatsAppContact = () => {
  const phoneNumber = '+905551234567';
  const defaultMessage = 'Hello, I reviewed the demo panel and would like more information.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="text-center py-4">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-green-400 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
      <h4 className="text-white font-medium mb-2">Contact via WhatsApp</h4>
      <p className="text-gray-400 text-sm mb-4">
        Reach us instantly via WhatsApp. We'll answer your questions right away.
      </p>
      <button
        onClick={openWhatsApp}
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <MessageSquare size={20} />
        Chat on WhatsApp
      </button>
      <p className="text-gray-500 text-xs mt-3">Business hours: Mon-Fri 9:00 AM - 6:00 PM</p>
    </div>
  );
};

// Demo Request Component
const DemoRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employeeCount: '',
    sector: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sectors = [
    'Gym & Fitness',
    'Manpower & Staffing',
    'Real Estate',
    'Advertising Agency',
    'Events Management',
    'Other',
  ];

  const employeeCounts = ['1-10', '11-50', '51-200', '201-500', '500+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar size={32} className="text-purple-400" />
        </div>
        <h4 className="text-white font-medium mb-2">Demo Request Received!</h4>
        <p className="text-gray-400 text-sm">Our team will contact you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Full Name *"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
      />
      <div className="grid grid-cols-2 gap-2">
        <input
          type="email"
          placeholder="Email *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
        />
        <input
          type="tel"
          placeholder="Phone *"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
        />
      </div>
      <input
        type="text"
        placeholder="Company Name *"
        required
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500"
      />
      <select
        value={formData.sector}
        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
      >
        <option value="">Select Sector</option>
        {sectors.map((sector) => (
          <option key={sector} value={sector}>
            {sector}
          </option>
        ))}
      </select>
      <select
        value={formData.employeeCount}
        onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
        className="w-full px-3 py-2 bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
      >
        <option value="">Employee Count</option>
        {employeeCounts.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Calendar size={16} />
            Request Demo
          </>
        )}
      </button>
    </form>
  );
};

// Interest Popup Component
interface InterestPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWidget: () => void;
}

const InterestPopup = ({ isOpen, onClose, onOpenWidget }: InterestPopupProps) => {
  if (!isOpen) return null;

  const phoneNumber = '+905551234567';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-[#0f0f1a] border border-[#1e1e3a] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <X size={24} />
              </button>
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Want This System for Your Company?
              </h2>
              <p className="text-white/80">If you liked the demo, let us prepare a custom offer for you!</p>
            </div>

            {/* Features */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Fast Setup</h4>
                    <p className="text-gray-400 text-xs">Ready to use in 7 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">100% Secure</h4>
                    <p className="text-gray-400 text-xs">Your data under your control</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">24/7 Support</h4>
                    <p className="text-gray-400 text-xs">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings size={20} className="text-orange-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Customizable</h4>
                    <p className="text-gray-400 text-xs">Tailored to your needs</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenWidget();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Calendar size={20} />
                  Request Free Demo
                </button>
                <button
                  onClick={() => {
                    window.open(
                      `https://wa.me/${phoneNumber}?text=Hello, I reviewed the demo panel and would like pricing information.`,
                      '_blank'
                    );
                  }}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare size={20} />
                  Chat on WhatsApp
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Remind me later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Lead Capture Widget Component
export const LeadCaptureWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'whatsapp' | 'demo'>('contact');
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Auto-show popup after 30 seconds of browsing (only once)
  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('leadPopupShown');
    if (popupShown) {
      setHasShownPopup(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!hasShownPopup) {
        setShowPopup(true);
        setHasShownPopup(true);
        sessionStorage.setItem('leadPopupShown', 'true');
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [hasShownPopup]);

  // Track page visits and show popup after 5+ pages
  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem('pageVisitCount') || '0', 10);
    localStorage.setItem('pageVisitCount', String(visitCount + 1));

    if (visitCount >= 5 && !hasShownPopup) {
      const popupShown = sessionStorage.getItem('leadPopupShown');
      if (!popupShown) {
        setShowPopup(true);
        setHasShownPopup(true);
        sessionStorage.setItem('leadPopupShown', 'true');
      }
    }
  }, [hasShownPopup]);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
      >
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              key="trigger"
              onClick={() => setIsOpen(true)}
              className="relative w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <MessageCircle size={24} />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-medium">
                1
              </span>
              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-25" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="w-80 bg-[#0f0f1a] border border-[#1e1e3a] rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold">Get in Touch</h3>
                    <p className="text-white/80 text-sm">How can we help you?</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#1e1e3a]">
                <button
                  onClick={() => setActiveTab('contact')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'contact'
                      ? 'text-indigo-400 border-b-2 border-indigo-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Mail size={16} className="inline mr-1" />
                  Form
                </button>
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'whatsapp'
                      ? 'text-green-400 border-b-2 border-green-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <MessageSquare size={16} className="inline mr-1" />
                  WhatsApp
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'demo'
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Calendar size={16} className="inline mr-1" />
                  Demo
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'contact' && <ContactForm />}
                    {activeTab === 'whatsapp' && <WhatsAppContact />}
                    {activeTab === 'demo' && <DemoRequest />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Popup Modal */}
      <InterestPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onOpenWidget={() => {
          setIsOpen(true);
          setActiveTab('demo');
        }}
      />
    </>
  );
};

export default LeadCaptureWidget;
