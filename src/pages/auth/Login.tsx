import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import LightPillar from '@/components/ui/LightPillar';
import AllyncLogo from '@/assets/images/logos/allync-logo.svg';
import { DEMO_CREDENTIALS, ROUTES } from '@/utils/constants';

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
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Light Pillar Background Effect */}
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="normal"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
        >
          {/* Login Card - Glassmorphism */}
          <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-8 shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:pointer-events-none">
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="w-20 h-20 mx-auto rounded-xl bg-white/[0.05] border border-white/[0.1] p-3 flex items-center justify-center mb-4"
              >
                <img src={AllyncLogo} alt="Allync Logo" className="w-14 h-14" />
              </motion.div>
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-white"
              >
                Allync
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[#94a3b8] text-sm mt-1"
              >
                Enterprise Management Platform
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
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg py-3 pl-11 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/[0.1] rounded-lg py-3 pl-11 pr-11 text-white placeholder-white/40 focus:outline-none focus:border-[#8b5cf6]/50 focus:ring-1 focus:ring-[#8b5cf6]/50 focus:bg-white/[0.08] transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </motion.form>
          </div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-lg px-4 py-2">
              <span className="text-[#64748b] text-sm">Demo:</span>
              <code className="text-[#6366f1] text-sm font-mono">{DEMO_CREDENTIALS.email}</code>
              <span className="text-[#64748b]">|</span>
              <code className="text-[#6366f1] text-sm font-mono">{DEMO_CREDENTIALS.password}</code>
            </div>
          </motion.div>
        </motion.div>
    </div>
  );
};
