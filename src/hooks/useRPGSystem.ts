import { useState, useEffect, useCallback } from 'react';
import type { MagicParticle, EmailStatus, ContactForm } from '@/types/character';
import { ANIMATION_CONFIG, RPG_CONFIG, EMAIL_CONFIG } from '@/config/constants';
import emailjs from '@emailjs/browser';

// Hook for RPG Dice System
export const useDiceRoll = () => {
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return;
    
    setIsRolling(true);
    setDiceRoll(null);
    
    // Simulate dice rolling animation
    const rollInterval = setInterval(() => {
      setDiceRoll(Math.floor(Math.random() * RPG_CONFIG.DICE_SIDES) + 1);
    }, 100);
    
    // Final result
    setTimeout(() => {
      clearInterval(rollInterval);
      const finalRoll = Math.floor(Math.random() * RPG_CONFIG.DICE_SIDES) + 1;
      setDiceRoll(finalRoll);
      setIsRolling(false);
    }, ANIMATION_CONFIG.DICE_ANIMATION_DURATION);
  }, [isRolling]);

  return { diceRoll, isRolling, rollDice };
};

// Hook for Magic Particle System
export const useMagicParticles = () => {
  const [magicParticles, setMagicParticles] = useState<MagicParticle[]>([]);

  const createParticles = useCallback((count: number = ANIMATION_CONFIG.MAGIC_PARTICLE_COUNT) => {
    const newParticles: MagicParticle[] = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
    }));

    setMagicParticles(prev => [...prev, ...newParticles]);

    // Auto cleanup particles
    setTimeout(() => {
      setMagicParticles(prev => 
        prev.filter(particle => !newParticles.some(newP => newP.id === particle.id))
      );
    }, ANIMATION_CONFIG.PARTICLE_LIFESPAN);
  }, []);

  const clearParticles = useCallback(() => {
    setMagicParticles([]);
  }, []);

  return { magicParticles, createParticles, clearParticles };
};

// Hook for Achievement System
export const useAchievements = () => {
  const [achievementUnlocked, setAchievementUnlocked] = useState<number | null>(null);

  const triggerAchievement = useCallback((achievementId: number) => {
    setAchievementUnlocked(achievementId);
    
    // Auto hide achievement notification
    setTimeout(() => {
      setAchievementUnlocked(null);
    }, ANIMATION_CONFIG.ACHIEVEMENT_DISPLAY_DURATION);
  }, []);

  return { achievementUnlocked, triggerAchievement };
};

// Hook for Contact Form System
export const useContactForm = () => {
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    questType: '',
    message: ''
  });
  
  const [emailStatus, setEmailStatus] = useState<EmailStatus>('idle');
  const [emailMessage, setEmailMessage] = useState('');
  const [spellCasting, setSpellCasting] = useState(false);

  const updateForm = useCallback((updates: Partial<ContactForm>) => {
    setContactForm(prev => ({ ...prev, ...updates }));
  }, []);

  const validateForm = useCallback((): boolean => {
    return !!(contactForm.name && contactForm.email && contactForm.message);
  }, [contactForm]);

  const resetForm = useCallback(() => {
    setContactForm({ name: '', email: '', questType: '', message: '' });
  }, []);

  const submitForm = useCallback(async (): Promise<boolean> => {
    if (!validateForm()) {
      setEmailStatus('error');
      setEmailMessage('Please fill in all required fields!');
      setTimeout(() => setEmailStatus('idle'), 3000);
      return false;
    }

    setEmailStatus('sending');
    setSpellCasting(true);

    try {
      const templateParams = {
        from_name: contactForm.name,
        from_email: contactForm.email,
        quest_type: contactForm.questType || 'General Quest',
        message: contactForm.message,
        to_name: 'Gabriel Teles Rosa',
        reply_to: contactForm.email
      };

      await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      setEmailStatus('success');
      setEmailMessage('Quest request sent successfully! Check your email for confirmation.');
      resetForm();
      
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      setEmailStatus('error');
      setEmailMessage('Quest request failed to send. Please try again or contact directly.');
      return false;
    } finally {
      setSpellCasting(false);
      setTimeout(() => setEmailStatus('idle'), 5000);
    }
  }, [contactForm, validateForm, resetForm]);

  return {
    contactForm,
    emailStatus,
    emailMessage,
    spellCasting,
    updateForm,
    submitForm,
    resetForm,
    validateForm
  };
};

// Hook for Theme System
export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('rpg-portfolio-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('rpg-portfolio-theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  }, []);

  return { isDarkMode, toggleTheme };
};

// Hook for RPG Calculations
export const useRPGCalculations = () => {
  const getModifier = useCallback((score: number): number => {
    return Math.floor((score - 10) / 2);
  }, []);

  const formatModifier = useCallback((modifier: number): string => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }, []);

  const getDifficultyColor = useCallback((difficulty: string): string => {
    switch (difficulty) {
      case 'Common': return 'text-gray-600 border-gray-600';
      case 'Rare': return 'text-blue-600 border-blue-600';
      case 'Epic': return 'text-purple-600 border-purple-600';
      case 'Legendary': return 'text-yellow-600 border-yellow-600';
      default: return 'text-gray-600 border-gray-600';
    }
  }, []);

  const getCertificationType = useCallback((type: string): string => {
    switch (type) {
      case 'Common': return 'text-gray-600 border-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 border-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 border-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 border-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 border-gray-600 bg-gray-100';
    }
  }, []);

  return {
    getModifier,
    formatModifier,
    getDifficultyColor,
    getCertificationType
  };
}; 