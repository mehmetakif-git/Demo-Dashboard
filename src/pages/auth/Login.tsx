import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight, Copy, Check,
  LayoutDashboard, Calculator, Target, CheckSquare,
  Shield, FolderOpen, Star, ChevronLeft, ChevronRight, Loader2, Users,
  Clock, TrendingUp
} from 'lucide-react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useAuthStore } from '@/store/authStore';
import AllyncLogo from '@/assets/images/logos/logo-white.svg';
import { DEMO_CREDENTIALS, ROUTES } from '@/utils/constants';

// Screenshot imports
import screenshotDashboard from '@/assets/screenshots/dashboard.webp';
import screenshotHR from '@/assets/screenshots/hr.webp';
import screenshotCRM from '@/assets/screenshots/crm.webp';
import screenshotAccounting from '@/assets/screenshots/accounting.webp';
import screenshotTasks from '@/assets/screenshots/tasks.webp';
import screenshotAccess from '@/assets/screenshots/access.webp';
import screenshotFiles from '@/assets/screenshots/files.webp';
// Profile picture imports for testimonials
import ppMichael from '@/assets/images/profiles/pp-1.webp';
import ppSarah from '@/assets/images/profiles/pp-2.webp';
import ppEmily from '@/assets/images/profiles/pp-4.webp';
import ppDavid from '@/assets/images/profiles/pp-5.webp';
import { GlowInput, BottomGradient } from '@/components/common';
import { LayoutTextFlip } from '@/components/ui/LayoutTextFlip';
import { LinkPreview } from '@/components/ui/LinkPreview';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

// Module data for left panel carousel
const modules = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    title: 'Dashboard',
    description: 'View all your KPIs on a single screen. Real-time metrics, charts, and insights to keep your finger on the pulse.',
    color: 'from-blue-500 to-cyan-500',
    screenshot: screenshotDashboard
  },
  {
    id: 'hr',
    icon: Users,
    title: 'HR Management',
    description: 'Manage employee data, leave tracking, performance reviews, and payroll from a single platform.',
    color: 'from-green-500 to-emerald-500',
    screenshot: screenshotHR
  },
  {
    id: 'crm',
    icon: Target,
    title: 'CRM',
    description: 'Strengthen customer relationships. Optimize lead tracking, sales pipeline, and client communication.',
    color: 'from-purple-500 to-pink-500',
    screenshot: screenshotCRM
  },
  {
    id: 'accounting',
    icon: Calculator,
    title: 'Accounting',
    description: 'Invoices, payments, income-expense tracking, and financial reports to keep your finances in control.',
    color: 'from-orange-500 to-amber-500',
    screenshot: screenshotAccounting
  },
  {
    id: 'tasks',
    icon: CheckSquare,
    title: 'Task Management',
    description: 'Track projects and tasks with Kanban boards. Boost team productivity and collaboration.',
    color: 'from-indigo-500 to-violet-500',
    screenshot: screenshotTasks
  },
  {
    id: 'access',
    icon: Shield,
    title: 'Access Control',
    description: 'CCTV integration, door access cards, and visitor management to ensure security.',
    color: 'from-red-500 to-rose-500',
    screenshot: screenshotAccess
  },
  {
    id: 'files',
    icon: FolderOpen,
    title: 'File Management',
    description: 'Organize, share, and securely store your documents. Version control included.',
    color: 'from-teal-500 to-cyan-500',
    screenshot: screenshotFiles
  }
];

// Testimonials for right panel
const testimonials = [
  {
    quote: "This platform increased our operational efficiency by 40%. We manage all processes from one place.",
    author: "Michael Johnson",
    role: "General Manager",
    company: "FitZone Gyms",
    rating: 5,
    avatar: ppMichael
  },
  {
    quote: "Customer tracking and project management have never been easier. Our team is very satisfied.",
    author: "Sarah Williams",
    role: "Co-Founder",
    company: "Creative Agency",
    rating: 5,
    avatar: ppSarah
  },
  {
    quote: "Managing our real estate portfolio is now much easier. All listings and clients in one place.",
    author: "David Miller",
    role: "CEO",
    company: "Premier Real Estate",
    rating: 5,
    avatar: ppDavid
  },
  {
    quote: "24/7 support and ease of use made this exactly what we were looking for. Highly recommended.",
    author: "Emily Chen",
    role: "Operations Manager",
    company: "EventPro Organization",
    rating: 5,
    avatar: ppEmily
  }
];

// Stats data
const stats = [
  { value: 100, suffix: '+', label: 'Active Businesses' },
  { value: 500, suffix: '+', label: 'Users' },
  { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
  { value: 24, suffix: '/7', label: 'Support' }
];

export const Login = () => {
  const navigate = useNavigate();
  const storedUser = useAuthStore((state) => state.user);
  const storedRememberMe = useAuthStore((state) => state.rememberMe);
  const login = useAuthStore((state) => state.login);

  // Form state
  const [email, setEmail] = useState(storedRememberMe && storedUser ? storedUser.email : '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(storedRememberMe);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  // Animation state
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Spotlight tour state
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const demoButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-rotate modules (every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentModuleIndex((prev) => (prev + 1) % modules.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Show spotlight after 5 seconds delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpotlight(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Disable scroll when spotlight is active (but keep scrollbar visible)
  useEffect(() => {
    if (!showSpotlight) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [showSpotlight]);

  // Update spotlight position when shown
  useEffect(() => {
    if (showSpotlight && demoButtonRef.current) {
      const rect = demoButtonRef.current.getBoundingClientRect();
      setSpotlightPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, [showSpotlight]);

  // Handle window resize
  useEffect(() => {
    if (!showSpotlight) return;

    const handleResize = () => {
      if (demoButtonRef.current) {
        const rect = demoButtonRef.current.getBoundingClientRect();
        setSpotlightPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showSpotlight]);

  const dismissSpotlight = () => {
    setShowSpotlight(false);
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, field: 'email' | 'password') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(email, password, rememberMe);

    if (success) {
      navigate(ROUTES.selectSector);
    } else {
      setError('Invalid credentials. Please use demo account.');
    }

    setIsLoading(false);
  };

  // Quick demo login
  const handleDemoLogin = async () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password, rememberMe);

    if (success) {
      navigate(ROUTES.selectSector);
    }

    setIsLoading(false);
  };

  // Navigate modules
  const prevModule = () => {
    setCurrentModuleIndex((prev) => (prev - 1 + modules.length) % modules.length);
  };

  const nextModule = () => {
    setCurrentModuleIndex((prev) => (prev + 1) % modules.length);
  };

  const currentModule = modules[currentModuleIndex];
  const currentTestimonial = testimonials[currentTestimonialIndex];
  const ModuleIcon = currentModule.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#547792]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#94B4C1]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAE0CF]/10 rounded-full blur-[150px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

        {/* LEFT PANEL - Module Showcase */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block lg:col-span-3"
        >
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 h-[600px] flex flex-col shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
            {/* Header */}
            <div className="relative z-10 mb-6">
              <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-1">
                Platform Features
              </h3>
              <p className="text-white/40 text-xs">
                Full control with {modules.length} modules
              </p>
            </div>

            {/* Module Carousel */}
            <div className="relative z-10 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentModuleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col"
                >
                  {/* Module Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center shadow-lg`}>
                      {ModuleIcon && <ModuleIcon size={24} className="text-white" />}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{currentModule.title}</h4>
                      <p className="text-white/40 text-xs">Module {currentModuleIndex + 1}/{modules.length}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {currentModule.description}
                  </p>

                  {/* Screenshot */}
                  <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden relative group">
                    {/* Actual Screenshot Image */}
                    <img
                      src={currentModule.screenshot}
                      alt={`${currentModule.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const placeholder = target.nextElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'flex';
                      }}
                    />
                    {/* Fallback Placeholder (hidden by default) */}
                    <div className="absolute inset-0 items-center justify-center hidden">
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentModule.color} opacity-20 mx-auto mb-3`} />
                        <p className="text-white/20 text-xs">Screenshot</p>
                      </div>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#213448] via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
              <button
                onClick={prevModule}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} className="text-white/60" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {modules.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentModuleIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentModuleIndex
                        ? 'w-6 bg-[#94B4C1]'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextModule}
                className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={16} className="text-white/60" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* CENTER - Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            {/* Logo + Brand Name */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-center mb-6"
            >
              <LinkPreview
                url="https://allyncai.com"
                width={300}
                height={200}
                className="flex items-center gap-4 text-white hover:opacity-90 transition-opacity"
              >
                {/* Logo */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#94B4C1] to-[#547792] p-2.5 flex items-center justify-center shadow-lg shadow-[#94B4C1]/25">
                  <img src={AllyncLogo} alt="Allync Logo" className="w-10 h-10" />
                </div>
                {/* Brand Name */}
                <h1 className="text-4xl font-bold text-white">
                  Allync
                </h1>
              </LinkPreview>
            </motion.div>

            {/* Text Flip Slogan */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-2"
            >
              <LayoutTextFlip
                text="Manage Your"
                words={['Business', 'Team', 'Projects', 'Growth', 'Success']}
                duration={2500}
                textClassName="text-xl md:text-2xl text-white/80"
                wordClassName="text-xl md:text-2xl"
              />
            </motion.div>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/50 text-sm mt-4"
            >
              Enterprise Management Platform
            </motion.p>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md">
            <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-white mb-1">Welcome Back</h2>
                <p className="text-white/50 text-sm">Sign in to continue to your dashboard</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6"
                >
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <GlowInput
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    icon={<Mail className="w-5 h-5" />}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-white/60 text-sm font-medium mb-2">
                    Password
                  </label>
                  <GlowInput
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    icon={<Lock className="w-5 h-5" />}
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-white/40 hover:text-white/60 transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                    required
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${
                        rememberMe
                          ? 'bg-[#94B4C1] border-[#94B4C1]'
                          : 'border-white/20 group-hover:border-white/40'
                      }`}
                    >
                      {rememberMe && <Check size={14} className="text-white" />}
                    </div>
                    <span
                      onClick={() => setRememberMe(!rememberMe)}
                      className="text-white/60 text-sm select-none"
                    >
                      Remember me
                    </span>
                  </label>
                  <button type="button" className="text-[#94B4C1] text-sm hover:text-[#EAE0CF] transition-colors cursor-pointer">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-[#547792] via-[#94B4C1] to-[#547792] bg-[length:200%_100%] text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 cursor-pointer"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                  whileHover={{
                    boxShadow: '0 0 30px rgba(148, 180, 193, 0.5), 0 0 60px rgba(84, 119, 146, 0.3)',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={18} />
                      </>
                    )}
                  </span>
                  <BottomGradient primaryColor="#06b6d4" secondaryColor="#ec4899" />
                </motion.button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.08]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-transparent text-white/40 text-sm">or</span>
                  </div>
                </div>

                {/* Demo Login Button */}
                <div className={`relative ${showSpotlight ? 'z-60' : ''}`}>
                  <motion.button
                    ref={demoButtonRef}
                    type="button"
                    onClick={() => {
                      if (showSpotlight) {
                        dismissSpotlight();
                      }
                      handleDemoLogin();
                    }}
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-3.5 bg-white/[0.05] border border-white/[0.08] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <DotLottieReact
                      src="/src/assets/lotties-icon/rocket.lottie"
                      loop
                      autoplay
                      style={{ width: 20, height: 20 }}
                    />
                    Quick Demo Login
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-4"
            >
              <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
                <span className="text-white/40">Demo</span>

                <button
                  onClick={() => copyToClipboard(DEMO_CREDENTIALS.email, 'email')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors group cursor-pointer"
                >
                  <span className="text-white/70 font-mono text-xs">{DEMO_CREDENTIALS.email}</span>
                  {copiedField === 'email' ? (
                    <Check size={12} className="text-green-400" />
                  ) : (
                    <Copy size={12} className="text-white/40 group-hover:text-white/60" />
                  )}
                </button>

                <button
                  onClick={() => copyToClipboard(DEMO_CREDENTIALS.password, 'password')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] rounded-lg hover:bg-white/[0.1] transition-colors group cursor-pointer"
                >
                  <span className="text-[#94B4C1] font-mono text-xs">{DEMO_CREDENTIALS.password}</span>
                  {copiedField === 'password' ? (
                    <Check size={12} className="text-green-400" />
                  ) : (
                    <Copy size={12} className="text-white/40 group-hover:text-white/60" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-white/30 text-xs">
              <DotLottieReact
                src="/src/assets/lotties-icon/Security Shield.lottie"
                loop
                autoplay
                style={{ width: 16, height: 16 }}
              />
              <span>256-bit SSL Secure Connection</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL - Stats & Testimonials */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:block lg:col-span-3"
        >
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-3xl p-6 h-[600px] flex flex-col shadow-2xl before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
            {/* Stats Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-3 mb-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 text-center shadow-lg shadow-black/30"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-[#94B4C1] to-[#EAE0CF] bg-clip-text text-transparent">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={'decimals' in stat ? stat.decimals : 0}
                      duration={1.5}
                    />
                  </div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="relative z-10 border-t border-white/[0.05] my-4" />

            {/* Testimonials */}
            <div className="relative z-10 flex-1 flex flex-col min-h-0 overflow-hidden">
              <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-4 flex-shrink-0">
                Customer Reviews
              </h3>

              <div className="flex-1 relative min-h-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonialIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col"
                  >
                    {/* Quote */}
                    <div className="flex-1 min-h-0 overflow-hidden">
                      <div className="text-2xl text-[#94B4C1]/30 mb-1">"</div>
                      <p className="text-white/70 text-sm leading-relaxed italic line-clamp-4">
                        {currentTestimonial.quote}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex-shrink-0 flex items-center gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={i < currentTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
                        />
                      ))}
                    </div>

                    {/* Author */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <div className="text-white font-medium text-xs">{currentTestimonial.author}</div>
                        <div className="text-white/40 text-[10px]">{currentTestimonial.role}, {currentTestimonial.company}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Testimonial Dots */}
              <div className="flex-shrink-0 flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-white/[0.05]">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonialIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentTestimonialIndex
                        ? 'w-6 bg-[#94B4C1]'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="relative z-10 flex-shrink-0 mt-4 pt-4 border-t border-white/[0.05]">
              <div className="flex items-center justify-center gap-4 text-white/30 text-xs">
                <div className="flex items-center gap-1.5 group cursor-default">
                  <Shield size={14} className="group-hover:text-white/50 transition-colors" />
                  <span className="group-hover:text-white/50 transition-colors">GDPR</span>
                </div>
                <div className="flex items-center gap-1.5 group cursor-default">
                  <Clock size={14} className="group-hover:text-white/50 transition-colors" />
                  <span className="group-hover:text-white/50 transition-colors">24/7</span>
                </div>
                <div className="flex items-center gap-1.5 group cursor-default">
                  <TrendingUp size={14} className="group-hover:text-white/50 transition-colors" />
                  <span className="group-hover:text-white/50 transition-colors">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Spotlight Tour Overlay */}
      <AnimatePresence mode="sync">
        {showSpotlight && spotlightPosition.width > 0 && (
          <motion.div
            key="spotlight-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            {/* Dark Overlay with Spotlight Cutout */}
            <div
              className="absolute inset-0 pointer-events-auto"
              onClick={dismissSpotlight}
              style={{
                background: `radial-gradient(ellipse ${spotlightPosition.width + 40}px ${spotlightPosition.height + 40}px at ${spotlightPosition.x + spotlightPosition.width / 2}px ${spotlightPosition.y + spotlightPosition.height / 2}px, transparent 0%, rgba(0, 0, 0, 0.85) 100%)`
              }}
            />

            {/* Pulsing Ring around highlighted button */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                left: spotlightPosition.x - 4,
                top: spotlightPosition.y - 4,
                width: spotlightPosition.width + 8,
                height: spotlightPosition.height + 8,
              }}
            >
              <div className="absolute inset-0 rounded-xl border-2 border-[#94B4C1]/50 animate-pulse" />
              <div className="absolute inset-0 rounded-xl border border-[#94B4C1]/30 animate-ping" style={{ animationDuration: '2s' }} />
            </motion.div>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{
                left: spotlightPosition.x + spotlightPosition.width / 2 - 140,
                top: spotlightPosition.y - 160,
              }}
            >
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white/10" />

              {/* Tooltip Content */}
              <div className="relative bg-white/[0.05] backdrop-blur-2xl border border-white/[0.12] rounded-2xl p-5 w-[280px] shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.1] before:to-transparent before:pointer-events-none">
                <div className="relative z-10 mb-2">
                  <span className="text-white text-lg font-bold">Start Here!</span>
                </div>
                <p className="relative z-10 text-white/90 text-sm font-medium leading-relaxed mb-3">
                  Click this button to instantly login with demo credentials and explore the platform.
                </p>
                <p className="relative z-10 text-red-400 text-xs font-medium">
                  Click anywhere to dismiss
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
