/**
 * Constantes centralizadas da aplicação
 * Evita valores mágicos espalhados pelo código
 */

// Application Configuration
export const APP_CONFIG = {
  GITHUB_USERNAME: "BielTeles",
  PORTFOLIO_TITLE: "Gabriel Teles Rosa - RPG Portfolio",
  PORTFOLIO_DESCRIPTION: "Frontend Developer & RPG Master - Epic Digital Adventures",
  AUTHOR: "Gabriel Teles Rosa",
  SITE_URL: "https://gabrielteles-portfolio.vercel.app", // Atualize com seu domínio
} as const;

// EmailJS Configuration
export const EMAIL_CONFIG = {
  SERVICE_ID: "service_bpyl2gf",
  TEMPLATE_ID: "template_hqz4mhe",
  PUBLIC_KEY: "yXFKdDDUe3SPb33gR",
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  DICE_ANIMATION_DURATION: 1000,
  PARTICLE_LIFESPAN: 3000,
  MAGIC_PARTICLE_COUNT: 20,
  SPELL_CASTING_DURATION: 2000,
  ACHIEVEMENT_DISPLAY_DURATION: 3000,
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  STORAGE_KEY: 'rpg-portfolio-theme',
  DEFAULT_THEME: 'light',
} as const;

// RPG Game Constants
export const RPG_CONFIG = {
  MAX_LEVEL: 100,
  DICE_SIDES: 20,
  CRITICAL_HIT_THRESHOLD: 20,
  CRITICAL_FAIL_THRESHOLD: 1,
  EXPERIENCE_TO_NEXT_LEVEL: 100,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  GITHUB: `https://github.com/${APP_CONFIG.GITHUB_USERNAME}`,
  LINKEDIN: "https://www.linkedin.com/in/gabriel-teles-8881a3202/",
  EMAIL: "devteles@gmail.com",
} as const;

// SEO Meta Tags
export const SEO_CONFIG = {
  KEYWORDS: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "RPG",
    "Portfolio",
    "Web Developer",
    "Gabriel Teles Rosa",
    "Goiânia",
    "Brazil"
  ] as string[],
  OPEN_GRAPH: {
    TYPE: "website",
    LOCALE: "pt_BR",
    SITE_NAME: APP_CONFIG.PORTFOLIO_TITLE,
  }
} as const;

// Limites e valores de gameplay
export const GAME_CONSTANTS = {
  MAX_LEVEL: 100,
  MAX_SKILL_LEVEL: 100,
  MAX_ATTRIBUTE_SCORE: 20,
  MIN_ATTRIBUTE_SCORE: 1,
  XP_PER_LEVEL: 1000,
  MAX_PROGRESS_BAR: 100,
} as const;

// Categorias de skills disponíveis
export const SKILL_CATEGORIES = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend', 
  LANGUAGE: 'Language',
  FRAMEWORK: 'Framework',
  STYLING: 'Styling',
  TOOLS: 'Tools',
  MANAGEMENT: 'Management',
  LEGENDARY: 'Legendary',
} as const;

// Níveis de dificuldade de quests
export const QUEST_DIFFICULTY = {
  COMMON: 'Common',
  RARE: 'Rare', 
  EPIC: 'Epic',
  LEGENDARY: 'Legendary',
} as const;

// Status possíveis de quests
export const QUEST_STATUS = {
  COMPLETED: 'Completed',
  ONGOING: 'Ongoing',
  PLANNED: 'Planned',
} as const;

// Níveis de proficiência em idiomas
export const LANGUAGE_LEVELS = {
  NATIVE: 'Native',
  ADVANCED: 'Advanced',
  INTERMEDIATE: 'Intermediate', 
  BASIC: 'Basic',
} as const;

// Tipos de certificação
export const CERTIFICATION_TYPES = {
  COMMON: 'Common',
  RARE: 'Rare',
  EPIC: 'Epic', 
  LEGENDARY: 'Legendary',
} as const;

// Estados do formulário de contato
export const EMAIL_STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// Cores por categoria/dificuldade (Tailwind classes)
export const CATEGORY_COLORS = {
  [SKILL_CATEGORIES.FRONTEND]: 'from-blue-500 to-cyan-500',
  [SKILL_CATEGORIES.BACKEND]: 'from-green-500 to-emerald-500',
  [SKILL_CATEGORIES.LANGUAGE]: 'from-purple-500 to-violet-500',
  [SKILL_CATEGORIES.FRAMEWORK]: 'from-orange-500 to-amber-500',
  [SKILL_CATEGORIES.STYLING]: 'from-pink-500 to-rose-500',
  [SKILL_CATEGORIES.TOOLS]: 'from-gray-500 to-slate-500',
  [SKILL_CATEGORIES.MANAGEMENT]: 'from-indigo-500 to-blue-500',
  [SKILL_CATEGORIES.LEGENDARY]: 'from-yellow-400 to-yellow-600',
} as const;

export const DIFFICULTY_COLORS = {
  [QUEST_DIFFICULTY.COMMON]: 'from-gray-400 to-gray-600',
  [QUEST_DIFFICULTY.RARE]: 'from-blue-400 to-blue-600', 
  [QUEST_DIFFICULTY.EPIC]: 'from-purple-400 to-purple-600',
  [QUEST_DIFFICULTY.LEGENDARY]: 'from-yellow-400 to-orange-500',
} as const;

// Animações e efeitos
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// URLs e links externos
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/BielTeles',
  LINKEDIN: 'https://www.linkedin.com/in/gabriel-teles-8881a3202/',
  EMAIL: 'devteles@gmail.com',
} as const; 