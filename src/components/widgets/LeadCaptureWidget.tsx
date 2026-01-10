import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
import type { LottieRefCurrentProps } from 'lottie-react';
import customerSupportAnimation from '@/assets/lotties-icon/Customer Support.json';
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
  User,
  Building2,
  Phone,
} from 'lucide-react';

const COMPANY_EMAIL = 'info@allyncai.com';
const PHONE_NUMBER = '+97451079565';

// Glassmorphism input styles
const inputClassName = "w-full px-4 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#94B4C1]/50 focus:bg-white/[0.05] transition-all";
const selectClassName = "w-full px-4 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-[#94B4C1]/50 focus:bg-white/[0.05] transition-all cursor-pointer";

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

    // Create mailto link with form data
    const subject = `Contact Request from ${formData.name}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message || 'No message provided'}`;

    // Open email client
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Simulate sending delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30"
        >
          <Check size={40} className="text-green-400" />
        </motion.div>
        <h4 className="text-white font-semibold text-lg mb-2">Email Client Opened!</h4>
        <p className="text-white/60 text-sm">Complete sending in your email app.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-[#94B4C1] hover:text-[#94B4C1] text-sm font-medium transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Full Name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <div className="relative">
        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="email"
          placeholder="Email Address *"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <div className="relative">
        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <div className="relative">
        <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <textarea
        placeholder="Your Message..."
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClassName} resize-none`}
      />
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full py-3 bg-gradient-to-r from-[#547792] to-[#94B4C1] text-white rounded-xl font-medium text-sm overflow-hidden disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer group"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening Email...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>
    </form>
  );
};

// WhatsApp Contact Component
const WhatsAppContact = () => {
  const defaultMessage = 'Hello, I reviewed the demo panel and would like more information.';

  const openWhatsApp = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="text-center py-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20"
      >
        <DotLottieReact
          src="/src/assets/lotties-icon/whatsappp-icon.lottie"
          loop
          autoplay
          style={{ width: 56, height: 56 }}
        />
      </motion.div>
      <h4 className="text-white font-semibold text-lg mb-2">Contact via WhatsApp</h4>
      <p className="text-white/50 text-sm mb-5">
        Reach us instantly via WhatsApp. We'll answer your questions right away.
      </p>
      <motion.button
        onClick={openWhatsApp}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-green-500/20"
      >
        <MessageSquare size={20} />
        Chat on WhatsApp
      </motion.button>
      <p className="text-white/30 text-xs mt-4">Available 24/7</p>
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

    // Create mailto link with form data
    const subject = `Demo Request from ${formData.company || formData.name}`;
    const body = `DEMO REQUEST

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Sector: ${formData.sector || 'Not specified'}
Employee Count: ${formData.employeeCount || 'Not specified'}`;

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-[#547792]/20 to-[#94B4C1]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#94B4C1]/30"
        >
          <Calendar size={40} className="text-[#94B4C1]" />
        </motion.div>
        <h4 className="text-white font-semibold text-lg mb-2">Email Client Opened!</h4>
        <p className="text-white/60 text-sm">Complete sending to request your demo.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-[#94B4C1] hover:text-[#94B4C1] text-sm font-medium transition-colors cursor-pointer"
        >
          Request another demo
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Full Name *"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="email"
            placeholder="Email *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`${inputClassName} pl-11`}
          />
        </div>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="tel"
            placeholder="Phone *"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`${inputClassName} pl-11`}
          />
        </div>
      </div>
      <div className="relative">
        <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          placeholder="Company Name *"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={`${inputClassName} pl-11`}
        />
      </div>
      <select
        value={formData.sector}
        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
        className={selectClassName}
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
        className={selectClassName}
      >
        <option value="">Employee Count</option>
        {employeeCounts.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full py-3 bg-gradient-to-r from-[#547792] to-[#94B4C1] text-white rounded-xl font-medium text-sm overflow-hidden disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer group"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Opening Email...
          </>
        ) : (
          <>
            <Calendar size={18} />
            Request Demo
          </>
        )}
      </motion.button>
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
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg bg-white/[0.05] backdrop-blur-3xl border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#213448] via-[#547792] to-[#94B4C1] p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
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
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-10 h-10 bg-[#547792]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap size={20} className="text-[#94B4C1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Fast Setup</h4>
                    <p className="text-white/40 text-xs">Ready to use in 7 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield size={20} className="text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">100% Secure</h4>
                    <p className="text-white/40 text-xs">Your data under your control</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-10 h-10 bg-[#94B4C1]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Headphones size={20} className="text-[#94B4C1]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">24/7 Support</h4>
                    <p className="text-white/40 text-xs">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-10 h-10 bg-[#EAE0CF]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings size={20} className="text-[#EAE0CF]" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Customizable</h4>
                    <p className="text-white/40 text-xs">Tailored to your needs</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <motion.button
                  onClick={() => {
                    onClose();
                    onOpenWidget();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-[#547792] to-[#94B4C1] text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#94B4C1]/20"
                >
                  <Calendar size={20} />
                  Request Free Demo
                </motion.button>
                <motion.button
                  onClick={() => {
                    window.open(
                      `https://wa.me/${PHONE_NUMBER}?text=Hello, I reviewed the demo panel and would like pricing information.`,
                      '_blank'
                    );
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-green-500/20"
                >
                  <MessageSquare size={20} />
                  Chat on WhatsApp
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-3 text-white/40 hover:text-white transition-colors text-sm cursor-pointer"
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

// Pages where widget should NOT be shown
const EXCLUDED_PATHS = ['/', '/login', '/select-sector'];

// Popup interval in milliseconds (2 minutes)
const POPUP_INTERVAL = 2 * 60 * 1000;

// Props interface for LeadCaptureWidget
interface LeadCaptureWidgetProps {
  forceShow?: boolean;
  spotlightActive?: boolean;
  onSpotlightClick?: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

// Main Lead Capture Widget Component
export const LeadCaptureWidget = ({
  forceShow = false,
  spotlightActive = false,
  onSpotlightClick,
  buttonRef
}: LeadCaptureWidgetProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'whatsapp' | 'demo'>('contact');
  const [showPopup, setShowPopup] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const internalButtonRef = useRef<HTMLButtonElement>(null);
  const actualButtonRef = buttonRef || internalButtonRef;

  // Check if we're on an excluded path (login, onboarding, etc.)
  const isModuleSelectionPath = location.pathname === '/module-selection';
  const isExcludedPath = EXCLUDED_PATHS.some(path => location.pathname === path) || (isModuleSelectionPath && !forceShow);

  // Reset popup timer when popup is closed
  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  // Show popup every 2 minutes while browsing inside dashboard
  useEffect(() => {
    // Don't show on excluded paths or when spotlight is active
    if (isExcludedPath || spotlightActive) {
      return;
    }

    const timer = setInterval(() => {
      // Only show if widget is not already open and spotlight is not active
      if (!isOpen && !spotlightActive) {
        setShowPopup(true);
      }
    }, POPUP_INTERVAL);

    return () => clearInterval(timer);
  }, [isExcludedPath, isOpen, spotlightActive]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Ensure widget and popup can NEVER be open when spotlight is active
  useEffect(() => {
    if (spotlightActive) {
      if (isOpen) {
        setIsOpen(false);
      }
      if (showPopup) {
        setShowPopup(false);
      }
    }
  }, [spotlightActive, isOpen, showPopup]);

  // Don't render anything on excluded paths
  if (isExcludedPath) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div className={`fixed bottom-4 right-4 ${spotlightActive ? 'z-[70]' : 'z-50'}`}>
        <AnimatePresence mode="wait">
          {!isOpen && (
            <motion.button
              ref={actualButtonRef}
              key="trigger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // If spotlight is active, only dismiss the tour - never open the widget
                if (spotlightActive) {
                  onSpotlightClick?.();
                  return; // Explicitly prevent any further action
                }
                setIsOpen(true);
              }}
              className="cursor-pointer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              whileHover={spotlightActive ? {} : { scale: 1.1 }}
              whileTap={spotlightActive ? {} : { scale: 0.95 }}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={customerSupportAnimation}
                loop
                autoplay
                style={{ width: 80, height: 80 }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Expanded Widget */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="widget"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute bottom-0 right-0 w-[340px] bg-white/[0.05] backdrop-blur-3xl border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Glass shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#547792] to-[#94B4C1] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Get in Touch</h3>
                      <p className="text-white/70 text-xs">How can we help you?</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="relative flex border-b border-white/[0.08]">
                {[
                  { id: 'contact', label: 'Form', icon: Mail },
                  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                  { id: 'demo', label: 'Demo', icon: Calendar },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`relative flex-1 py-3 text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'text-[#94B4C1]'
                          : 'text-white/40 hover:text-white/60'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Icon size={14} />
                        {tab.label}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#547792] to-[#94B4C1]"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="relative p-4 max-h-[400px] overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {activeTab === 'contact' && <ContactForm />}
                    {activeTab === 'whatsapp' && <WhatsAppContact />}
                    {activeTab === 'demo' && <DemoRequest />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="relative px-4 py-3 border-t border-white/[0.05] bg-white/[0.02]">
                <p className="text-center text-white/30 text-xs">
                  Powered by <span className="text-[#94B4C1]">Allync</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup Modal */}
      <InterestPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
        onOpenWidget={() => {
          setShowPopup(false);
          setIsOpen(true);
          setActiveTab('demo');
        }}
      />
    </>
  );
};

export default LeadCaptureWidget;
