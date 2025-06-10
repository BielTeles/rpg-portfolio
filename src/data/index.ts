/**
 * Arquivo central de dados do portfólio
 * Re-exporta todos os dados organizados em módulos separados
 * Facilita importação e manutenção
 */

// Dados do personagem principal
export { characterData } from './character';

// Dados dos projetos (quests)
export { questLog } from './quests';

// Dados das experiências profissionais
export { adventureTimeline } from './experiences';

// Dados do hall da fama (certificações, achievements, stats)
export { hallOfFame } from './hall-of-fame';

// Re-exporta types para conveniência
export type {
  CharacterData,
  Quest,
  AdventureExperience,
  HallOfFame,
  Skill,
  Achievement,
  Certification,
  ContactForm,
  Language,
  Attribute,
  SavingThrows,
  HallOfFameStats,
  MagicParticle,
  ThemeClasses,
  EmailStatus
} from '@/types/character'; 