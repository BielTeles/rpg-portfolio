import { useState, useCallback } from 'react';
import { RPG_CONFIG, ANIMATION_CONFIG } from '@/config/constants';

export const useDiceRoll = (
  createDiceParticles: (count?: number) => void,
  setSpellCasting: (casting: boolean) => void
) => {
  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = useCallback(() => {
    if (isRolling) return; // Prevent multiple rolls
    
    setIsRolling(true);
    setSpellCasting(true);
    
    // Create magic particles around dice
    createDiceParticles(8);
    
    setTimeout(() => {
      const roll = Math.floor(Math.random() * RPG_CONFIG.DICE_SIDES) + 1;
      setDiceRoll(roll);
      setIsRolling(false);
      setSpellCasting(false);
    }, ANIMATION_CONFIG.DICE_ANIMATION_DURATION);
  }, [isRolling, createDiceParticles, setSpellCasting]);

  return {
    diceRoll,
    isRolling,
    rollDice
  };
}; 