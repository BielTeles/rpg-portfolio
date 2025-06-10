import type { Quest } from '@/types/character';
import { QUEST_DIFFICULTY, QUEST_STATUS } from '@/config/constants';

/**
 * Dados das Quests (Projetos)
 * Centraliza informações sobre projetos realizados
 */
export const questLog: Quest[] = [
  {
    id: 1,
    title: "Bazar da Danny",
    description: "E-commerce website with modern design and user-friendly interface for local business growth.",
    difficulty: QUEST_DIFFICULTY.EPIC,
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    status: QUEST_STATUS.ONGOING,
    rewards: ["Client Satisfaction", "Real-world Experience", "E-commerce Skills"],
    githubUrl: "#", // Código privado - em desenvolvimento
    liveUrl: "#", // Em desenvolvimento
    image: "🛍️"
  },
  {
    id: 2,
    title: "Elaria RPG Character Sheet",
    description: "Interactive digital character sheet for RPG campaigns with automated calculations and spell management.",
    difficulty: QUEST_DIFFICULTY.LEGENDARY,
    technologies: ["React", "JavaScript", "Local Storage"],
    status: QUEST_STATUS.ONGOING,
    rewards: ["Gaming Community Impact", "Complex State Management", "UX Design"],
    githubUrl: "https://github.com/BielTeles/ElariaReactSheet",
    liveUrl: "https://elaria-sheet.vercel.app",
    image: "🎲"
  },
  {
    id: 3,
    title: "Ecxus Stock App",
    description: "Modern web-based inventory management system with real-time tracking and analytics.",
    difficulty: QUEST_DIFFICULTY.EPIC,
    technologies: ["Next.js", "TypeScript", "Supabase"],
    status: QUEST_STATUS.ONGOING,
    rewards: ["Web Development", "Database Management", "Business Logic"],
    githubUrl: "https://github.com/BielTeles/ecxus-stock-app",
    liveUrl: "#", // Em desenvolvimento
    image: "📦"
  },
  {
    id: 4,
    title: "EstudosDevWeb",
    description: "Personal learning project showcasing web development fundamentals and progressive skill building.",
    difficulty: QUEST_DIFFICULTY.RARE, 
    technologies: ["HTML", "CSS", "JavaScript"],
    status: QUEST_STATUS.ONGOING,
    rewards: ["Continuous Learning", "Skill Documentation", "Portfolio Building"],
    githubUrl: "https://github.com/BielTeles/EstudosDevWeb",
    liveUrl: "#", // Em desenvolvimento
    image: "📚"
  }
]; 