import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Check, Copy } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import AllyncLogo from '@/assets/images/logos/logo-white.svg';
import { DEMO_CREDENTIALS, ROUTES } from '@/utils/constants';
import { GlowInput, BottomGradient } from '@/components/common';
import { LayoutTextFlip } from '@/components/ui/LayoutTextFlip';
import { LinkPreview } from '@/components/ui/LinkPreview';

export const Login = () => {
  const storedUser = useAuthStore((state) => state.user);
  const storedRememberMe = useAuthStore((state) => state.rememberMe);
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState(storedRememberMe && storedUser ? storedUser.email : '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(storedRememberMe);
  const [copiedField, setCopiedField] = useState<'email' | 'password' | null>(null);

  const handleCopy = async (text: string, field: 'email' | 'password') => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const success = login(email, password, rememberMe);

    if (success) {
      navigate(ROUTES.selectSector);
    } else {
      setError('Invalid credentials. Please use demo account.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
          {/* Slogan Section with Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            {/* Logo + Brand Name Row */}
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
                <div className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.1] p-2.5 flex items-center justify-center shadow-lg shadow-purple-500/10">
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
          </motion.div>

          {/* Login Card - Glassmorphism */}
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
            {/* Welcome Text */}
            <div className="text-center mb-6">
              <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl font-semibold text-white"
              >
                Welcome Back
              </motion.h2>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-white/50 text-sm mt-1"
              >
                Sign in to continue to your dashboard
              </motion.p>
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

            {/* Form */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">
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

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">
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
                      className="text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                  required
                />
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    rememberMe
                      ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] border-transparent'
                      : 'bg-white/[0.05] border-white/[0.2] group-hover:border-white/[0.3]'
                  }`}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span
                  onClick={() => setRememberMe(!rememberMe)}
                  className="text-sm text-[#94a3b8] group-hover:text-white transition-colors select-none"
                >
                  Remember me
                </span>
              </label>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="group/btn relative w-full overflow-hidden bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] bg-[length:200%_100%] text-white font-semibold py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
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
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(99, 102, 241, 0.3)',
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
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        &rarr;
                      </motion.span>
                    </>
                  )}
                </span>
                <BottomGradient primaryColor="#06b6d4" secondaryColor="#ec4899" />
              </motion.button>
            </motion.form>
          </div>

          {/* Demo Credentials */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="relative inline-flex items-center gap-4 rounded-2xl px-6 py-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300">
              {/* Glass shimmer */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />

              {/* Content */}
              <span className="relative z-10 text-base font-semibold text-white/60">
                Demo
              </span>
              <div className="relative z-10 flex items-center gap-2 bg-white/[0.06] rounded-xl px-4 py-2">
                <code className="text-base font-mono font-semibold text-[#a78bfa]">
                  {DEMO_CREDENTIALS.email}
                </code>
                <motion.button
                  type="button"
                  onClick={() => handleCopy(DEMO_CREDENTIALS.email, 'email')}
                  className="text-white/40 hover:text-white/80 transition-colors ml-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
              <div className="relative z-10 w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="relative z-10 flex items-center gap-2 bg-white/[0.06] rounded-xl px-4 py-2">
                <code className="text-base font-mono font-semibold text-[#67e8f9]">
                  {DEMO_CREDENTIALS.password}
                </code>
                <motion.button
                  type="button"
                  onClick={() => handleCopy(DEMO_CREDENTIALS.password, 'password')}
                  className="text-white/40 hover:text-white/80 transition-colors ml-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {copiedField === 'password' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  );
};
