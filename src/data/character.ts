import type { CharacterData } from '@/types/character';
import { SKILL_CATEGORIES, LANGUAGE_LEVELS } from '@/config/constants';

/**
 * Dados centrais do personagem - Gabriel Teles Rosa
 * Mantém apenas informações essenciais do personagem principal
 */
export const characterData: CharacterData = {
  name: "Gabriel Teles Rosa",
  class: "Frontend Developer",
  race: "Human",
  level: 24,
  experience: 65,
  background: "Digital Adventurer & Esports Legend",
  location: "Goiânia, Goiás, Brazil",
  education: "Software Engineering - UFG/BR (2021 - Current)",
  bio: "Frontend Developer passionate about creating epic digital experiences. When not coding, you'll find me mastering RPG campaigns or leading teams to victory in esports.",
  languages: [
    { name: "Portuguese", level: LANGUAGE_LEVELS.NATIVE, proficiency: 100 },
    { name: "English", level: LANGUAGE_LEVELS.ADVANCED, proficiency: 85 },
    { name: "Japanese", level: LANGUAGE_LEVELS.BASIC, proficiency: 25 }
  ],
  
  // Main Attributes (D&D style)
  attributes: {
    strength: 18,      // Team Leadership & Project Management
    dexterity: 16,     // Code Agility & Quick Learning
    constitution: 17,  // Persistence & Resilience
    intelligence: 15,  // Technical Knowledge (Growing)
    wisdom: 19,        // Gaming Strategy & RPG Mastery
    charisma: 18       // Team Management & Communication
  },
  
  // Technical Skills (Real levels)
  skills: [
    { name: 'HTML', level: 70, category: SKILL_CATEGORIES.FRONTEND },
    { name: 'CSS', level: 70, category: SKILL_CATEGORIES.FRONTEND },
    { name: 'JavaScript', level: 60, category: SKILL_CATEGORIES.LANGUAGE },
    { name: 'React', level: 50, category: SKILL_CATEGORIES.FRAMEWORK },
    { name: 'Next.js', level: 50, category: SKILL_CATEGORIES.FRAMEWORK },
    { name: 'TypeScript', level: 50, category: SKILL_CATEGORIES.LANGUAGE },
    { name: 'Tailwind CSS', level: 50, category: SKILL_CATEGORIES.STYLING },
    { name: 'Python', level: 60, category: SKILL_CATEGORIES.LANGUAGE },
    { name: 'C', level: 60, category: SKILL_CATEGORIES.LANGUAGE },
    { name: 'Git', level: 50, category: SKILL_CATEGORIES.TOOLS },
    { name: 'Node.js', level: 30, category: SKILL_CATEGORIES.BACKEND },
    { name: 'C#', level: 40, category: SKILL_CATEGORIES.LANGUAGE },
    { name: 'RPG Mastering', level: 80, category: SKILL_CATEGORIES.LEGENDARY },
    { name: 'Team Leadership', level: 85, category: SKILL_CATEGORIES.MANAGEMENT }
  ],
  
  // Saving Throws
  savingThrows: {
    problemSolving: 85,
    teamManagement: 90,
    adaptability: 80,
    creativity: 75
  }
}; 