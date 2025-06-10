'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { 
  Sword, 
  Shield, 
  Github, 
  Linkedin, 
  Mail, 
  Dice6,
  Star,
  Users,
  BookOpen,
  Brain,
  Zap,
  Heart,
  Eye,
  Target,
  ExternalLink,
  Calendar,
  MapPin,
  Send,
  Trophy,
  Scroll,
  Castle,
  Swords,
  Award,
  Crown,
  Sparkles,
  Zap as Lightning,
  Sun,
  Moon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Activity,
  Globe
} from 'lucide-react';

// Configuration
const GITHUB_USERNAME = "BielTeles"; // Seu username real do GitHub
const EMAILJS_CONFIG = {
  serviceId: "service_bpyl2gf", // Configure no EmailJS
  templateId: "template_hqz4mhe", // Configure no EmailJS  
  publicKey: "yXFKdDDUe3SPb33gR" // Configure no EmailJS
};

// Importa dados da nova estrutura organizada
import { characterData, questLog, adventureTimeline, hallOfFame } from '@/data';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';





export default function HomePage() {
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showAnalyticsDashboard, setShowAnalyticsDashboard] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    questType: '',
    message: ''
  });
  
  // Theme state for Day/Night Mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Interactive animations state
  // const [hoveredSkill, setHoveredSkill] = useState<string | null>(null); // Removed unused state
  const [achievementUnlocked, setAchievementUnlocked] = useState<number | null>(null);
  const [spellCasting, setSpellCasting] = useState(false);
  const [magicParticles, setMagicParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Email sending state
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  
  // Analytics hook
  const { trackProjectView } = useAnalytics();

  // Client-side check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('rpg-portfolio-theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    }
  }, []);

  // Magic particle system with proper cleanup - OTIMIZADO
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.75) { // Reduzido para 25% (era 30%) - menos CPU
        setMagicParticles(prev => {
          // Keep only last 18 particles (era 20) - menos memoria  
          const newParticles = prev.slice(-17);
          return [
            ...newParticles,
            {
              id: Date.now() + Math.random(),
              x: Math.random() * (window?.innerWidth || 1920),
              y: Math.random() * (window?.innerHeight || 1080)
            }
          ];
        });
      }
    }, 3500); // Aumentado para 3.5s (era 3s) - menos processamento

    return () => clearInterval(interval);
  }, [isClient]);

  // Cleanup particles with proper dependency - OTIMIZADO
  useEffect(() => {
    if (magicParticles.length === 0) return;
    
    const timeouts = magicParticles.map(particle => 
      setTimeout(() => {
        setMagicParticles(prev => prev.filter(p => p.id !== particle.id));
      }, 2800) // Reduzido para 2.8s (era 3s) - cleanup mais rápido
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [magicParticles]); // Trigger on particle changes

  // Mouse tracking for cursor glow with proper cleanup - OTIMIZADO
  useEffect(() => {
    if (!isClient) return;
    
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Usar requestAnimationFrame para performance suave
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const glow = document.getElementById('cursor-glow');
        if (glow) {
          glow.style.transform = `translate(${e.clientX - 192}px, ${e.clientY - 192}px)`;
          glow.style.opacity = '1';
        }
      });
    };

    const handleMouseLeave = () => {
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.opacity = '0';
      }
    };

    // Adicionar { passive: true } para melhor performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClient]);

  // Save theme preference and apply
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('rpg-portfolio-theme', newTheme ? 'dark' : 'light');
    }
    
    // Spell casting animation
    setSpellCasting(true);
    setTimeout(() => setSpellCasting(false), 1000);
  };

  // Enhanced dice roll with magic effects
  const rollDice = () => {
    if (isRolling) return; // Prevent multiple rolls
    
    setIsRolling(true);
    setSpellCasting(true);
    
    // Create magic particles around dice with safety check
    if (isClient && typeof window !== 'undefined') {
      const diceParticles = Array.from({length: 8}, (_, i) => ({
        id: Date.now() + i,
        x: (window.innerWidth * 0.2) + (Math.random() * 100 - 50),
        y: (window.innerHeight * 0.5) + (Math.random() * 100 - 50)
      }));
      setMagicParticles(prev => [...prev, ...diceParticles]);
    }
    
    setTimeout(() => {
      setDiceRoll(Math.floor(Math.random() * 20) + 1);
      setIsRolling(false);
      setSpellCasting(false);
    }, 1500);
  };

  // Achievement unlock animation with safety checks
  const triggerAchievement = (achievementId: number) => {
    if (achievementUnlocked) return; // Prevent multiple achievements
    
    setAchievementUnlocked(achievementId);
    setSpellCasting(true);
    
    // Create celebration particles with safety check
    if (isClient && typeof window !== 'undefined') {
      const celebrationParticles = Array.from({length: 15}, (_, i) => ({
        id: Date.now() + i + 1000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * (window.innerHeight * 0.3)
      }));
      setMagicParticles(prev => [...prev, ...celebrationParticles]);
    }
    
    setTimeout(() => {
      setAchievementUnlocked(null);
      setSpellCasting(false);
    }, 2000);
  };

  // Function to calculate attribute modifier (D&D style)
  const getModifier = (score: number): number => {
    return Math.floor((score - 10) / 2);
  };

  const formatModifier = (modifier: number): string => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 border-green-600';
      case 'Medium': return 'text-yellow-600 border-yellow-600';
      case 'Hard': return 'text-orange-600 border-orange-600';
      case 'Epic': return 'text-purple-600 border-purple-600';
      case 'Legendary': return 'text-red-600 border-red-600';
      case 'Rare': return 'text-blue-600 border-blue-600';
      default: return 'text-gray-600 border-gray-600';
    }
  };

  // Enhanced contact form submission with EmailJS
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setEmailStatus('error');
      setEmailMessage('Please fill in all required fields!');
      setTimeout(() => setEmailStatus('idle'), 3000);
      return;
    }

    setEmailStatus('sending');
    setSpellCasting(true);
    
    // Create spell casting particles
    if (isClient && typeof window !== 'undefined') {
      const spellParticles = Array.from({length: 20}, (_, i) => ({
        id: Date.now() + i + 2000,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
      }));
      setMagicParticles(prev => [...prev, ...spellParticles]);
    }

    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        quest_type: contactForm.questType || 'General Quest',
        message: contactForm.message,
        to_name: 'Gabriel Teles Rosa',
        reply_to: contactForm.email
      };

      // Method 1: EmailJS - ATIVO!
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      // Method 2: Fallback - Desativado (EmailJS está funcionando)
      // const emailContent = `
      // NEW QUEST REQUEST FROM PORTFOLIO! 🎮⚔️
      // From: ${contactForm.name} (${contactForm.email})
      // Quest Type: ${contactForm.questType || 'General Quest'}
      // Message: ${contactForm.message}
      // Sent from RPG Portfolio
      // `.trim();
      // await navigator.clipboard.writeText(emailContent);
      
      setEmailStatus('success');
      setEmailMessage('Quest request sent successfully! Check your email for confirmation.');
      
      // Clear form
      setContactForm({ name: '', email: '', questType: '', message: '' });
      
      // Trigger achievement
      triggerAchievement(7);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailStatus('error');
      setEmailMessage('Quest request failed to send. Please try again or contact directly.');
    }

    setSpellCasting(false);
    setTimeout(() => setEmailStatus('idle'), 5000);
  };

  // Open GitHub profile
  const openGitHub = () => {
    window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank');
    triggerAchievement(6);
  };

  const getCertificationType = (type: string): string => {
    switch (type) {
      case 'Common': return 'text-gray-600 border-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 border-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 border-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 border-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 border-gray-600 bg-gray-100';
    }
  };

  // Theme classes
  const themeClasses = {
    // Background and main container
    background: isDarkMode ? 'bg-gray-900' : '',
    
    // Character sheet sections
    header: isDarkMode 
      ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-gray-100' 
      : 'bg-gradient-to-r from-amber-100 to-yellow-50 border-amber-800 text-amber-900',
    
    attributes: isDarkMode 
      ? 'bg-gradient-to-br from-red-900 to-red-800 border-red-600 text-red-100'
      : 'bg-gradient-to-br from-red-50 to-red-100 border-red-800 text-red-900',
    
    skills: isDarkMode 
      ? 'bg-gradient-to-br from-blue-900 to-blue-800 border-blue-600 text-blue-100'
      : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-800 text-blue-900',
    
    savingThrows: isDarkMode 
      ? 'bg-gradient-to-br from-green-900 to-green-800 border-green-600 text-green-100'
      : 'bg-gradient-to-br from-green-50 to-green-100 border-green-800 text-green-900',
    
    languages: isDarkMode 
      ? 'bg-gradient-to-br from-teal-900 to-teal-800 border-teal-600 text-teal-100'
      : 'bg-gradient-to-br from-teal-50 to-teal-100 border-teal-800 text-teal-900',
    
    actions: isDarkMode 
      ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-600 text-purple-100'
      : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-800 text-purple-900',
    
    questLog: isDarkMode 
      ? 'bg-gradient-to-br from-indigo-900 to-indigo-800 border-indigo-600 text-indigo-100'
      : 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-800 text-indigo-900',
    
    timeline: isDarkMode 
      ? 'bg-gradient-to-br from-orange-900 to-orange-800 border-orange-600 text-orange-100'
      : 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-800 text-orange-900',
    
    hallOfFame: isDarkMode 
      ? 'bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-600 text-yellow-100'
      : 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-800 text-yellow-900',
    
    contact: isDarkMode 
      ? 'bg-gradient-to-br from-amber-900 to-amber-800 border-amber-600 text-amber-100'
      : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-800 text-amber-900',
    
    footer: isDarkMode 
      ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600 text-gray-100'
      : 'bg-gradient-to-r from-amber-100 to-yellow-50 border-amber-800 text-amber-900',
    
    // Card backgrounds
    card: isDarkMode ? 'bg-gray-700/80' : 'bg-white/80',
    
    // Button styles
    button: isDarkMode 
      ? 'bg-gray-700 hover:bg-gray-600 border-gray-500'
      : 'bg-purple-700 hover:bg-purple-800 border-purple-600',
      
    // Text colors
    textPrimary: isDarkMode ? 'text-gray-100' : 'text-amber-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-amber-800',
    textTertiary: isDarkMode ? 'text-gray-400' : 'text-amber-700'
  };

  // MEMOIZED COMPONENTS - Para evitar re-renders desnecessários
  // Hooks devem vir ANTES de qualquer early return!
  // Memoized static data to prevent unnecessary re-renders
  useMemo(() => characterData.skills, []);
  useMemo(() => questLog, []);
  useMemo(() => adventureTimeline, []);
  useMemo(() => hallOfFame, []);

  // Don't render particles and window-dependent features on server
  if (!isClient) {
  return (
      <div className={`min-h-screen relative p-4 transition-colors duration-500 ${themeClasses.background}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚔️</div>
            <h1 className="text-2xl font-fantasy">Loading Epic Portfolio...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative p-4 transition-colors duration-500 ${themeClasses.background} overflow-hidden`}>
      
      {/* MAGIC PARTICLES - OTIMIZADO */}
      {magicParticles.map(particle => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: particle.x,
            y: particle.y,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.2, 0], // Reduzido de 1.5 para 1.2 - menos GPU
            y: particle.y - 80, // Reduzido de 100 para 80 - menos movimento
            rotate: 270 // Reduzido de 360 para 270 - menos rotação
          }}
          transition={{ 
            duration: 2.5, // Reduzido de 3 para 2.5s - cleanup mais rápido
            ease: "easeOut"
          }}
          className={`fixed pointer-events-none text-xl z-40 ${
            isDarkMode ? 'text-blue-400' : 'text-purple-500'
          }`}
          style={{ 
            left: particle.x, 
            top: particle.y,
            willChange: 'transform, opacity' // GPU optimization
          }}
        >
          ✨
        </motion.div>
      ))}
      
      {/* SPELL CASTING OVERLAY */}
      {spellCasting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1 }}
          className={`fixed inset-0 pointer-events-none z-30 ${
            isDarkMode 
              ? 'bg-gradient-radial from-blue-500/20 to-transparent' 
              : 'bg-gradient-radial from-purple-500/20 to-transparent'
          }`}
        />
      )}

      {/* ACHIEVEMENT UNLOCKED NOTIFICATION */}
      {achievementUnlocked && (
        <motion.div
          initial={{ scale: 0, y: -100, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0, y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-lg shadow-2xl border-4 border-yellow-600"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-4xl mb-2"
            >
              🏆
            </motion.div>
            <h3 className="font-fantasy text-xl font-bold">ACHIEVEMENT UNLOCKED!</h3>
            <p className="text-sm">Epic Portfolio Visitor!</p>
          </div>
        </motion.div>
      )}
      
      {/* ANALYTICS DASHBOARD BUTTON */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 0.3 }}
        onClick={() => setShowAnalyticsDashboard(!showAnalyticsDashboard)}
        className="fixed top-6 right-20 z-50 p-3 rounded-full shadow-2xl transition-all duration-300 bg-blue-600 hover:bg-blue-500 text-white"
        title="Tavern Analytics Dashboard"
      >
        <Activity className="w-6 h-6" />
      </motion.button>

      {/* THEME TOGGLE BUTTON - Enhanced */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.1, 
          rotate: isDarkMode ? 180 : -180,
          boxShadow: isDarkMode 
            ? "0 0 20px rgba(250, 204, 21, 0.5)" 
            : "0 0 20px rgba(147, 51, 234, 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ delay: 0.5 }}
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-2xl transition-all duration-300 ${
          isDarkMode 
            ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' 
            : 'bg-purple-700 hover:bg-purple-600 text-white'
        }`}
        title={isDarkMode ? 'Cast Daylight Spell' : 'Cast Darkness Spell'}
      >
        <motion.div
          animate={spellCasting ? { rotate: 360 } : {}}
          transition={{ duration: 1 }}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* CHARACTER SHEET CONTAINER */}
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER - Character Info - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: isDarkMode 
              ? "0 0 30px rgba(59, 130, 246, 0.3)" 
              : "0 0 30px rgba(217, 119, 6, 0.3)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`border-4 rounded-lg p-6 shadow-2xl parchment-shadow paper-texture relative cursor-pointer ${themeClasses.header}`}
          onClick={() => triggerAchievement(1)}
        >
          <motion.div 
            className="absolute inset-0 rounded-lg"
            animate={isDarkMode ? {
              boxShadow: [
                "inset 0 0 20px rgba(59, 130, 246, 0.1)",
                "inset 0 0 40px rgba(59, 130, 246, 0.2)",
                "inset 0 0 20px rgba(59, 130, 246, 0.1)"
              ]
            } : {
              boxShadow: [
                "inset 0 0 20px rgba(217, 119, 6, 0.1)",
                "inset 0 0 40px rgba(217, 119, 6, 0.2)",
                "inset 0 0 20px rgba(217, 119, 6, 0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left relative z-10">
             
             {/* Character Name */}
             <div className="md:col-span-2">
               <h1 className={`font-fantasy text-4xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-amber-900'}`}>
                 {characterData.name}
               </h1>
               <div className="space-y-2">
                 <div className={`flex flex-wrap gap-4 ${isDarkMode ? 'text-gray-300' : 'text-amber-800'}`}>
                   <span><strong>Class:</strong> {characterData.class}</span>
                   <span><strong>Race:</strong> {characterData.race}</span>
                   <span><strong>Background:</strong> {characterData.background}</span>
                 </div>
                 <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-amber-700'}`}>
                   <div className="flex items-center gap-2 mb-1">
                     <BookOpen className="w-4 h-4" />
                     <span><strong>Education:</strong> {characterData.education}</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <MapPin className="w-4 h-4" />
                     <span><strong>Location:</strong> {characterData.location}</span>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Level & XP */}
             <div className="text-center">
               <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 border-2 ${
                 isDarkMode 
                   ? 'bg-gray-700 border-gray-500' 
                   : 'bg-amber-200 border-amber-700'
               }`}>
                 <Star className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-amber-700'}`} />
                 <span className={`font-fantasy text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-amber-900'}`}>
                   Level {characterData.level}
                 </span>
               </div>
               <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-amber-700'}`}>
                 XP: {characterData.experience}/100
               </div>
                           </div>
          </div>
        </motion.div>

        {/* REORGANIZED CHARACTER SHEET LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* TOP LEFT - Attributes + D20 Roll */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
            }}
            className={`lg:col-span-6 border-4 rounded-lg p-6 shadow-xl parchment-shadow paper-texture relative ${themeClasses.attributes}`}
          >
            <h2 className="font-fantasy text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <Shield className="w-6 h-6" />
              ATTRIBUTES
            </h2>
            
            <div className="space-y-4">
              {Object.entries(characterData.attributes).map(([attr, value], index) => {
                const modifier = getModifier(value);
                const icons = {
                  strength: Target,
                  dexterity: Zap,
                  constitution: Heart,
                  intelligence: Brain,
                  wisdom: Eye,
                  charisma: Users
                };
                const Icon = icons[attr as keyof typeof icons];
                
                return (
                  <motion.div 
                    key={attr} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      x: 10,
                      boxShadow: isDarkMode 
                        ? "0 10px 20px rgba(239, 68, 68, 0.3)" 
                        : "0 10px 20px rgba(185, 28, 28, 0.3)"
                    }}
                    className={`flex items-center justify-between rounded-lg p-3 border-2 cursor-pointer ${themeClasses.card} ${isDarkMode ? 'border-red-500' : 'border-red-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className={`w-5 h-5 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`} />
                      </motion.div>
                      <span className={`font-fantasy font-bold capitalize ${isDarkMode ? 'text-red-100' : 'text-red-900'}`}>
                        {attr === 'strength' ? 'STR' :
                         attr === 'dexterity' ? 'DEX' :
                         attr === 'constitution' ? 'CON' :
                         attr === 'intelligence' ? 'INT' :
                         attr === 'wisdom' ? 'WIS' : 'CHA'}
                      </span>
                    </div>
                    <div className="text-right">
                      <motion.div 
                        className={`font-fantasy text-xl font-bold ${isDarkMode ? 'text-red-100' : 'text-red-900'}`}
                        whileHover={{ scale: 1.2 }}
                      >
                        {value}
                      </motion.div>
                      <div className={`text-sm ${isDarkMode ? 'text-red-300' : 'text-red-700'}`}>
                        {formatModifier(modifier)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Epic D20 Roll Section */}
            <div className="mt-6 text-center">
              <motion.div className="relative">
                {/* Mystical Aura Effect */}
                {isRolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1.3
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-lg shadow-2xl shadow-red-500/50"
                  />
                )}
                
                <motion.button
                  onClick={rollDice}
                  whileHover={!isRolling ? { 
                    scale: 1.05,
                    y: -3,
                    boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                    background: "linear-gradient(135deg, #dc2626, #ea580c)"
                  } : {}}
                  whileTap={{ scale: 0.95 }}
                  animate={isRolling ? { 
                    y: -5,
                    boxShadow: "0 15px 35px rgba(239, 68, 68, 0.6)"
                  } : {}}
                  transition={{ 
                    duration: isRolling ? 1.5 : 0.3,
                    type: "spring",
                    damping: 15
                  }}
                  className={`relative w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-xl border-2 border-red-500/50 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-red-700 to-red-600' 
                      : 'bg-gradient-to-r from-red-700 to-red-800'
                  } ${isRolling ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  disabled={isRolling}
                >
                  <motion.div
                    animate={isRolling ? { 
                      rotate: 1080,
                      scale: 1.2
                    } : {}}
                    whileHover={!isRolling ? { 
                      rotate: 15,
                      scale: 1.1 
                    } : {}}
                    transition={{ 
                      duration: isRolling ? 1.5 : 0.3,
                      ease: isRolling ? "easeOut" : "easeInOut"
                    }}
                    className="relative"
                  >
                    <Dice6 className="w-6 h-6" />
                    {/* Sparkle Effect */}
                    {isRolling && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-1 -right-1 text-yellow-300 text-xs"
                      >
                        ✨
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.span
                    animate={isRolling ? { 
                      scale: 1.05,
                      textShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
                    } : {}}
                    className="font-fantasy"
                  >
                    {isRolling ? '🔮 Conjurando Magias...' : `🎲 Rolar D20 ${diceRoll ? `(${diceRoll})` : ''}`}
                  </motion.span>
                </motion.button>
              </motion.div>
              
              {/* Epic Result Display */}
              {diceRoll && (
                <motion.div
                  initial={{ 
                    scale: 0, 
                    rotate: -180,
                    y: 50,
                    opacity: 0
                  }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0,
                    y: 0,
                    opacity: 1
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -3,
                    boxShadow: diceRoll === 20 ? 
                      "0 15px 35px rgba(34, 197, 94, 0.5)" : 
                      diceRoll >= 15 ? "0 15px 35px rgba(59, 130, 246, 0.5)" :
                      diceRoll >= 10 ? "0 15px 35px rgba(168, 85, 247, 0.5)" :
                      "0 15px 35px rgba(239, 68, 68, 0.5)"
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 12,
                    delay: 0.3
                  }}
                  className={`mt-4 p-4 rounded-xl border-3 cursor-pointer backdrop-blur-sm relative overflow-hidden ${
                    diceRoll === 20 ? 'bg-gradient-to-r from-green-400/90 to-emerald-500/90 border-green-400 shadow-green-500/50' :
                    diceRoll >= 15 ? 'bg-gradient-to-r from-blue-400/90 to-indigo-500/90 border-blue-400 shadow-blue-500/50' :
                    diceRoll >= 10 ? 'bg-gradient-to-r from-purple-400/90 to-violet-500/90 border-purple-400 shadow-purple-500/50' :
                    'bg-gradient-to-r from-red-400/90 to-rose-500/90 border-red-400 shadow-red-500/50'
                  } shadow-2xl`}
                >
                  {/* Animated Background Pattern */}
                  <motion.div
                    animate={{ 
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: diceRoll === 20 ? 
                        "radial-gradient(circle, #22c55e 1px, transparent 1px)" :
                        "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
                      backgroundSize: "20px 20px"
                    }}
                  />
                  
                                      <motion.div 
                      className="relative z-10 text-center"
                      animate={diceRoll === 20 ? {
                        scale: 1.05
                      } : {}}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      style={{
                        textShadow: diceRoll === 20 ? "0 0 15px rgba(34, 197, 94, 0.9)" : "none"
                      }}
                    >
                    {/* Dice Value */}
                    <motion.div 
                      className="text-4xl font-fantasy font-bold text-white mb-2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", damping: 10 }}
                    >
                      {diceRoll}
                    </motion.div>
                    
                    {/* Result Message */}
                    <motion.span 
                      className="font-fantasy text-lg font-bold text-white block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      {diceRoll === 20 ? '🏆 ACERTO CRÍTICO ÉPICO!' : 
                       diceRoll >= 15 ? '⭐ Sucesso Excepcional!' : 
                       diceRoll >= 10 ? '👑 Sucesso Heroico!' : 
                       diceRoll === 1 ? '💀 FALHA CRÍTICA CATASTRÓFICA!' :
                       '⚔️ Falha Épica...'}
                    </motion.span>
                    
                    {/* Additional Effects for Critical Hits */}
                    {diceRoll === 20 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-2 text-yellow-200 text-sm"
                      >
                        ✨ Magia Ancestral Desbloqueada! ✨
                      </motion.div>
                    )}
                    
                    {diceRoll === 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className="mt-2 text-red-200 text-sm"
                      >
                        🌊 Os Deuses não estão satisfeitos...
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* TOP RIGHT - Proficiencies */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`lg:col-span-6 border-4 rounded-lg p-6 shadow-xl parchment-shadow paper-texture relative ${themeClasses.skills}`}
          >
            <h2 className="font-fantasy text-2xl font-bold text-blue-900 mb-4 text-center flex items-center justify-center gap-2">
              <Sword className="w-6 h-6" />
              PROFICIENCIES
            </h2>
            
            {/* Skills Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {characterData.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 8px 16px rgba(29, 78, 216, 0.3)"
                  }}
                  className="bg-white/70 rounded-lg p-3 border-2 border-blue-700 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-fantasy font-bold text-blue-900 text-sm">{skill.name}</span>
                    <span className="text-xs bg-blue-200 px-2 py-1 rounded text-blue-800 font-code">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1 bg-blue-200 rounded-full h-2 mr-2 border border-blue-700">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="font-code text-blue-900 font-bold text-sm">{skill.level}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* BOTTOM LEFT - Saving Throws & Languages */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-6 space-y-4"
          >
            
            {/* Saving Throws - Redesigned */}
            <div className={`border-4 rounded-lg p-5 shadow-xl parchment-shadow paper-texture relative ${themeClasses.savingThrows}`}>
              <h2 className="font-fantasy text-xl font-bold text-green-900 mb-4 text-center flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                SAVING THROWS
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(characterData.savingThrows).map(([save, value], index) => (
                  <motion.div 
                    key={save} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 6px 12px rgba(22, 163, 74, 0.3)"
                    }}
                    className="bg-white/80 rounded-lg p-3 border-2 border-green-700 cursor-pointer"
                  >
                    <div className="text-center">
                      <div className="font-fantasy font-bold text-green-900 text-sm mb-1">
                        {save === 'problemSolving' ? 'Problem Solving' :
                         save === 'teamManagement' ? 'Team Management' :
                         save === 'adaptability' ? 'Adaptability' : 'Creativity'}
                      </div>
                      <div className="font-code text-green-900 font-bold text-lg">
                        {formatModifier(Math.floor((value - 50) / 10))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages - Compact Layout */}
            <div className={`border-4 rounded-lg p-5 shadow-xl parchment-shadow paper-texture relative ${themeClasses.languages}`}>
              <h2 className="font-fantasy text-xl font-bold text-teal-900 mb-4 text-center flex items-center justify-center gap-2">
                <Globe className="w-5 h-5" />
                LANGUAGES
              </h2>
              
              <div className="space-y-2">
                {characterData.languages.map((lang, index) => (
                  <motion.div 
                    key={lang.name} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      x: 5,
                      boxShadow: "0 4px 8px rgba(20, 184, 166, 0.3)"
                    }}
                    className="bg-white/80 rounded-lg p-3 border-2 border-teal-700 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-fantasy font-bold text-teal-900 text-sm">{lang.name}</span>
                      <span className="text-xs bg-teal-200 px-2 py-1 rounded text-teal-800 font-code">
                        {lang.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex-1 bg-teal-200 rounded-full h-2 mr-2 border border-teal-700">
                        <div 
                          className="bg-gradient-to-r from-teal-600 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${lang.proficiency}%` }}
                        />
                      </div>
                      <span className="font-code text-teal-900 font-bold text-xs">{lang.proficiency}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

                    {/* BOTTOM RIGHT - Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-6"
          >
            <div className={`border-4 rounded-lg p-5 shadow-xl parchment-shadow paper-texture relative ${themeClasses.actions}`}>
              <h2 className="font-fantasy text-xl font-bold text-purple-900 mb-4 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                QUICK ACTIONS
              </h2>
              
              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <motion.a
                  href="https://www.linkedin.com/in/gabriel-teles-8881a3202/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ 
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 8px 16px rgba(0, 119, 181, 0.4)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md border border-blue-500/30"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="font-fantasy text-sm">LinkedIn</span>
                </motion.a>
                
                <motion.button 
                  onClick={openGitHub}
                  whileHover={{ 
                    scale: 1.03,
                    y: -2,
                    boxShadow: isDarkMode ? "0 8px 16px rgba(75, 85, 99, 0.4)" : "0 8px 16px rgba(55, 65, 81, 0.4)"
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md border ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white border-gray-500/30' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white border-gray-600/30'
                  }`}
                >
                  <Github className="w-4 h-4" />
                  <span className="font-fantasy text-sm">GitHub</span>
                </motion.button>
              </div>
              
              {/* Primary Contact Action */}
              <motion.button 
                onClick={() => document.getElementById('tavern-contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 10px 20px rgba(147, 51, 234, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg border border-purple-500/30"
              >
                <Mail className="w-5 h-5" />
                <span className="font-fantasy">Start Epic Quest</span>
              </motion.button>
              
              {/* Stats Mini Display */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/60 rounded-lg p-2 border border-purple-300">
                  <div className="font-fantasy text-xs text-purple-800 font-bold">Projects</div>
                  <div className="font-code text-lg font-bold text-purple-900">{questLog.length}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-purple-300">
                  <div className="font-fantasy text-xs text-purple-800 font-bold">Skills</div>
                  <div className="font-code text-lg font-bold text-purple-900">{characterData.skills.length}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-purple-300">
                  <div className="font-fantasy text-xs text-purple-800 font-bold">Level</div>
                  <div className="font-code text-lg font-bold text-purple-900">{characterData.level}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* QUEST LOG SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className={`border-4 rounded-lg p-8 shadow-xl parchment-shadow paper-texture relative ${themeClasses.questLog}`}
        >
          <h2 className="font-fantasy text-3xl font-bold text-indigo-900 mb-6 text-center flex items-center justify-center gap-2">
            <Scroll className="w-8 h-8" />
            QUEST LOG
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questLog.map((quest, index) => (
              <motion.div
                key={quest.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.2 }}
                className="bg-white/80 rounded-lg p-6 border-3 border-indigo-700 shadow-lg card-hover"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{quest.image}</div>
                  <h3 className="font-fantasy text-xl font-bold text-indigo-900">{quest.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 ${getDifficultyColor(quest.difficulty)}`}>
                    {quest.difficulty}
                  </span>
                </div>
                
                <p className="text-indigo-800 text-sm mb-4">{quest.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-fantasy font-bold text-indigo-900 mb-2">Equipment Used:</h4>
                  <div className="flex flex-wrap gap-1">
                    {quest.technologies.map((tech) => (
                      <span key={tech} className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded text-xs font-code">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-fantasy font-bold text-indigo-900 mb-2">Rewards Gained:</h4>
                  <ul className="text-sm text-indigo-800">
                    {quest.rewards.map((reward, idx) => (
                      <li key={idx} className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-yellow-600" />
                        {reward}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2">
                  <a
                    href={quest.githubUrl}
                    onClick={() => trackProjectView(quest.id)}
                    className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-2 px-3 rounded text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  <a
                    href={quest.liveUrl}
                    onClick={() => trackProjectView(quest.id)}
                    className="flex-1 bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-3 rounded text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ADVENTURE TIMELINE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`border-4 rounded-lg p-8 shadow-xl parchment-shadow paper-texture relative ${themeClasses.timeline}`}
        >
          <h2 className="font-fantasy text-3xl font-bold text-orange-900 mb-6 text-center flex items-center justify-center gap-2">
            <Castle className="w-8 h-8" />
            ADVENTURE TIMELINE
          </h2>
          
          <div className="space-y-6">
            {adventureTimeline.map((adventure, index) => (
              <motion.div
                key={adventure.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 + index * 0.2 }}
                className="bg-white/80 rounded-lg p-6 border-3 border-orange-700 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="font-fantasy text-xl font-bold text-orange-900">{adventure.guild}</h3>
                    <p className="text-orange-800 font-semibold">{adventure.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-orange-700">
                      <Calendar className="w-4 h-4" />
                      <span className="font-code text-sm">{adventure.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-700">
                      <MapPin className="w-4 h-4" />
                      <span className="font-code text-sm">{adventure.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-fantasy font-bold text-orange-900 mb-2">Epic Achievements:</h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      {adventure.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Swords className="w-3 h-3 text-orange-600" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-fantasy font-bold text-orange-900 mb-2">Technologies Mastered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {adventure.technologies.map((tech) => (
                        <span key={tech} className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-xs font-code">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* HALL OF FAME SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className={`border-4 rounded-lg p-8 shadow-xl parchment-shadow paper-texture relative ${themeClasses.hallOfFame}`}
        >
          <h2 className="font-fantasy text-3xl font-bold text-yellow-900 mb-6 text-center flex items-center justify-center gap-2">
            <Crown className="w-8 h-8" />
            HALL OF FAME
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Certifications */}
            <div>
              <h3 className="font-fantasy text-2xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6" />
                Epic Certifications
              </h3>
              
              <div className="space-y-4">
                {hallOfFame.certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className="bg-white/80 rounded-lg p-4 border-3 border-yellow-700 shadow-lg card-hover"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{cert.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-fantasy font-bold text-yellow-900">{cert.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold border-2 ${getCertificationType(cert.type)}`}>
                            {cert.type}
                          </span>
                        </div>
                        <p className="text-sm text-yellow-700 mb-1">{cert.issuer} • {cert.date}</p>
                        <p className="text-sm text-yellow-800 mb-3">{cert.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {cert.skills.map((skill) => (
                            <span key={skill} className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-xs font-code">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        {cert.url && (
                          <a
                            href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-yellow-700 hover:text-yellow-900 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Achievements */}
            <div>
              <h3 className="font-fantasy text-2xl font-bold text-yellow-900 mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6" />
                Achievement Unlocked
              </h3>
              
              <div className="space-y-4">
                {hallOfFame.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.6 + index * 0.1 }}
                    className={`bg-white/80 rounded-lg p-4 border-3 shadow-lg card-hover ${
                      achievement.unlocked 
                        ? 'border-yellow-700' 
                        : 'border-gray-400 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className={`font-fantasy font-bold ${
                            achievement.unlocked ? 'text-yellow-900' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h4>
                          {achievement.unlocked && (
                            <Sparkles className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <p className={`text-sm mb-2 ${
                          achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'
                        }`}>
                          {achievement.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 border border-gray-400">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                                achievement.unlocked 
                                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' 
                                  : 'bg-gradient-to-r from-blue-500 to-blue-400'
                              }`}
                              style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                            />
                          </div>
                          <span className={`text-xs font-code ${
                            achievement.unlocked ? 'text-yellow-900' : 'text-gray-600'
                          }`}>
                            {achievement.progress}/{achievement.maxProgress}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Epic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="mt-8 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-lg p-6 border-3 border-yellow-800"
          >
            <h3 className="font-fantasy text-xl font-bold text-yellow-900 mb-4 text-center flex items-center justify-center gap-2">
              <Lightning className="w-6 h-6" />
              Epic Statistics
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.totalXP.toLocaleString()}</div>
                <div className="text-xs text-yellow-700 font-fantasy">Total XP</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.projectsCompleted}</div>
                <div className="text-xs text-yellow-700 font-fantasy">Projects</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.linesOfCode.toLocaleString()}</div>
                <div className="text-xs text-yellow-700 font-fantasy">Lines of Code</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.coffeeConsumed.toLocaleString()}</div>
                <div className="text-xs text-yellow-700 font-fantasy">☕ Coffees</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.bugsFixed}</div>
                <div className="text-xs text-yellow-700 font-fantasy">🐛 Bugs Fixed</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.happyClients}</div>
                <div className="text-xs text-yellow-700 font-fantasy">😊 Happy Clients</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.valorantWins}</div>
                <div className="text-xs text-yellow-700 font-fantasy">🎯 Valorant Wins</div>
              </div>
              
              <div className="bg-white/70 rounded-lg p-3 border-2 border-yellow-700">
                <div className="text-xl font-bold text-yellow-900">{hallOfFame.stats.rpgSessions}</div>
                <div className="text-xs text-yellow-700 font-fantasy">🎲 RPG Sessions</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* TAVERN CONTACT SECTION */}
        <motion.div
          id="tavern-contact"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className={`border-4 rounded-lg p-8 shadow-xl parchment-shadow paper-texture relative ${themeClasses.contact}`}
        >
          <h2 className="font-fantasy text-3xl font-bold text-amber-900 mb-6 text-center flex items-center justify-center gap-2">
            <Mail className="w-8 h-8" />
            THE TAVERN - REQUEST A QUEST
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-amber-800 mb-6 font-fantasy italic">
              &ldquo;Greetings, fellow adventurer! Seeking a skilled developer for your next quest? 
              Fill out this enchanted scroll and I shall respond with haste!&rdquo;
            </p>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-900 font-fantasy font-bold mb-2">
                    Adventurer Name *
                  </label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-3 py-2 border-2 border-amber-700 rounded-lg bg-white/80 text-amber-900 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-amber-900 font-fantasy font-bold mb-2">
                    Magic Messenger (Email) *
                  </label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({...prev, email: e.target.value}))}
                    className="w-full px-3 py-2 border-2 border-amber-700 rounded-lg bg-white/80 text-amber-900 focus:outline-none focus:border-amber-600"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-amber-900 font-fantasy font-bold mb-2">
                  Quest Type
                </label>
                <select
                  value={contactForm.questType}
                  onChange={(e) => setContactForm(prev => ({...prev, questType: e.target.value}))}
                  className="w-full px-3 py-2 border-2 border-amber-700 rounded-lg bg-white/80 text-amber-900 focus:outline-none focus:border-amber-600"
                >
                  <option value="">Choose your adventure...</option>
                  <option value="website">Website Creation Quest</option>
                  <option value="webapp">Web Application Quest</option>
                  <option value="consultation">Strategy Consultation</option>
                  <option value="collaboration">Long-term Partnership</option>
                  <option value="other">Other Epic Quest</option>
                </select>
              </div>
              
              <div>
                <label className="block text-amber-900 font-fantasy font-bold mb-2">
                  Quest Details *
                </label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({...prev, message: e.target.value}))}
                  rows={4}
                  className="w-full px-3 py-2 border-2 border-amber-700 rounded-lg bg-white/80 text-amber-900 focus:outline-none focus:border-amber-600"
                  placeholder="Describe your quest in detail... What challenges await? What treasures do you seek to create?"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={emailStatus === 'sending'}
                whileHover={{ scale: emailStatus === 'sending' ? 1 : 1.05 }}
                whileTap={{ scale: emailStatus === 'sending' ? 1 : 0.95 }}
                className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:shadow-lg flex items-center justify-center gap-2 ${
                  emailStatus === 'sending' 
                    ? 'bg-amber-600 cursor-not-allowed'
                    : emailStatus === 'success'
                    ? 'bg-green-600 hover:bg-green-700'
                    : emailStatus === 'error'
                    ? 'bg-red-800 hover:bg-red-900'
                    : 'bg-gradient-to-r from-amber-600 to-red-700 hover:from-amber-700 hover:to-red-800'
                } text-white`}
              >
                {emailStatus === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Casting Spell...
                  </>
                ) : emailStatus === 'success' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Quest Sent Successfully!
                  </>
                ) : emailStatus === 'error' ? (
                  <>
                    <AlertCircle className="w-5 h-5" />
                    Spell Failed - Try Again
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Quest Request
                  </>
                )}
              </motion.button>

              {/* Email Status Message */}
              {emailMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 p-4 rounded-lg text-center font-medium shadow-lg ${
                    emailStatus === 'success' 
                      ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                      : 'bg-red-100 text-red-800 border-2 border-red-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {emailStatus === 'success' ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <AlertCircle className="w-5 h-5" />
                    )}
                    {emailMessage}
                  </div>
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* FOOTER - Flavor Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className={`border-4 rounded-lg p-4 shadow-xl parchment-shadow paper-texture relative ${themeClasses.footer}`}
        >
          <p className="text-center text-amber-900 font-fantasy italic">
            &ldquo;From Goiânia to the digital realms - a Software Engineering student who conquers both virtual battlegrounds and code challenges. 
            4x Valorant Champion, RPG Master, polyglot developer (PT/EN/JP) creating epic web experiences!&rdquo;
          </p>
        </motion.div>
      </div>

      {/* ANALYTICS DASHBOARD MODAL */}
      {showAnalyticsDashboard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-900/60 backdrop-blur-sm"
          onClick={() => setShowAnalyticsDashboard(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-amber-50 rounded-lg border-8 border-amber-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6 border-b-4 border-amber-800 pb-4">
              <h2 className="text-2xl font-bold text-amber-900">📊 Registro da Taverna</h2>
              <button
                onClick={() => setShowAnalyticsDashboard(false)}
                className="p-2 text-amber-700 hover:text-amber-900 hover:bg-amber-200 rounded-lg transition-colors border-2 border-amber-600"
              >
                ✕
              </button>
            </div>
            
            <AnalyticsDashboard isDarkMode={isDarkMode} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
