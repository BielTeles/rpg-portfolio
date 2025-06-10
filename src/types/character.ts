/**
 * Character and RPG System Types
 * Definem a estrutura base do sistema RPG do portfólio
 */

/**
 * Atributos principais do personagem (sistema D&D)
 * Cada atributo representa uma característica específica
 */
export interface Attribute {
  /** Força - Liderança e gestão de projetos */
  strength: number;
  /** Destreza - Agilidade no código e aprendizado rápido */
  dexterity: number;
  /** Constituição - Persistência e resistência */
  constitution: number;
  /** Inteligência - Conhecimento técnico */
  intelligence: number;
  /** Sabedoria - Estratégia e experiência */
  wisdom: number;
  /** Carisma - Gestão de equipe e comunicação */
  charisma: number;
}

/**
 * Skill técnica do personagem
 * Representa conhecimentos e habilidades
 */
export interface Skill {
  /** Nome da habilidade/tecnologia */
  name: string;
  /** Nível de proficiência (0-100) */
  level: number;
  /** Categoria da skill para organização */
  category: 'Frontend' | 'Backend' | 'Language' | 'Framework' | 'Styling' | 'Tools' | 'Management' | 'Legendary';
}

export interface Language {
  name: string;
  level: 'Native' | 'Advanced' | 'Intermediate' | 'Basic';
  proficiency: number;
}

export interface SavingThrows {
  problemSolving: number;
  teamManagement: number;
  adaptability: number;
  creativity: number;
}

export interface CharacterData {
  name: string;
  class: string;
  race: string;
  level: number;
  experience: number;
  background: string;
  location: string;
  education: string;
  bio: string;
  languages: Language[];
  attributes: Attribute;
  skills: Skill[];
  savingThrows: SavingThrows;
}

// Project and Experience Types
export interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  technologies: string[];
  status: 'Completed' | 'Ongoing' | 'Planned';
  rewards: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

export interface AdventureExperience {
  id: number;
  guild: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

// Certification and Achievement Types
export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  type: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  url?: string;
  icon: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  icon: string;
}

export interface HallOfFameStats {
  totalXP: number;
  projectsCompleted: number;
  linesOfCode: number;
  coffeeConsumed: number;
  bugsFixed: number;
  happyClients: number;
  valorantWins: number;
  rpgSessions: number;
  yearsExperience: number;
  technologiesMastered: number;
}

export interface HallOfFame {
  certifications: Certification[];
  achievements: Achievement[];
  stats: HallOfFameStats;
}

// Contact Form Types
export interface ContactForm {
  name: string;
  email: string;
  questType: string;
  message: string;
}

export type EmailStatus = 'idle' | 'sending' | 'success' | 'error';

// Animation and UI Types
export interface MagicParticle {
  id: number;
  x: number;
  y: number;
}

export interface ThemeClasses {
  character: string;
  questLog: string;
  timeline: string;
  hallOfFame: string;
  contact: string;
  footer: string;
} 