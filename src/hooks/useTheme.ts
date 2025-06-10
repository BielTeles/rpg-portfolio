import { useState, useEffect, useCallback } from 'react';
import { THEME_CONFIG } from '@/config/constants';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [spellCasting, setSpellCasting] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(THEME_CONFIG.STORAGE_KEY);
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_CONFIG.STORAGE_KEY, newTheme ? 'dark' : 'light');
    }
    
    // Spell casting animation
    setSpellCasting(true);
    setTimeout(() => setSpellCasting(false), 1000);
  }, [isDarkMode]);

  return {
    isDarkMode,
    spellCasting,
    toggleTheme
  };
}; 