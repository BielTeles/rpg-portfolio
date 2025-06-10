import { useState, useEffect, useCallback } from 'react';
import { ANIMATION_CONFIG } from '@/config/constants';

interface MagicParticle {
  id: number;
  x: number;
  y: number;
}

export const useMagicParticles = (isClient: boolean) => {
  const [magicParticles, setMagicParticles] = useState<MagicParticle[]>([]);

  // Optimized particle creation
  const createParticle = useCallback((): MagicParticle => ({
    id: Date.now() + Math.random(),
    x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
    y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
  }), []);

  // Create particles for dice roll
  const createDiceParticles = useCallback((count: number = 8) => {
    if (!isClient || typeof window === 'undefined') return;
    
    const diceParticles = Array.from({ length: count }, (_, i) => ({
      id: Date.now() + i,
      x: (window.innerWidth * 0.2) + (Math.random() * 100 - 50),
      y: (window.innerHeight * 0.5) + (Math.random() * 100 - 50)
    }));
    
    setMagicParticles(prev => [...prev, ...diceParticles]);
  }, [isClient]);

  // Magic particle system with proper cleanup and throttling
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // Reduced frequency for better performance
        setMagicParticles(prev => {
          // Keep only last 15 particles for better performance
          const newParticles = prev.slice(-14);
          return [...newParticles, createParticle()];
        });
      }
    }, 4000); // Increased interval for less CPU usage

    return () => clearInterval(interval);
  }, [isClient, createParticle]);

  // Cleanup particles with debounced removal
  useEffect(() => {
    if (magicParticles.length === 0) return;
    
    const timeouts = magicParticles.map(particle => 
      setTimeout(() => {
        setMagicParticles(prev => prev.filter(p => p.id !== particle.id));
      }, ANIMATION_CONFIG.PARTICLE_LIFESPAN)
    );

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [magicParticles]);

  return {
    magicParticles,
    createDiceParticles
  };
}; 