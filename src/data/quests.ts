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
  },
  {
    id: 5,
    title: "Python Documentation Page",
    description: "Comprehensive technical documentation page about Python programming language, created as part of freeCodeCamp Responsive Web Design certification.",
    difficulty: QUEST_DIFFICULTY.EPIC,
    technologies: ["HTML5", "CSS3", "Responsive Design"],
    status: QUEST_STATUS.COMPLETED,
    rewards: ["Documentation Skills", "CSS Mastery", "freeCodeCamp Certification"],
    githubUrl: "https://github.com/BielTeles/freeCodeCamp-documentationpage",
    liveUrl: "https://bielteles.github.io/freeCodeCamp-documentationpage",
    image: "📖"
  },
  {
    id: 6,
    title: "Personal Portfolio",
    description: "Responsive portfolio website showcasing personal projects, skills and contact information. Built following freeCodeCamp's design principles.",
    difficulty: QUEST_DIFFICULTY.RARE,
    technologies: ["HTML5", "CSS3", "Flexbox", "Grid Layout"],
    status: QUEST_STATUS.COMPLETED,
    rewards: ["Portfolio Development", "Personal Branding", "Responsive Design"],
    githubUrl: "https://github.com/BielTeles/freeCodeCamp-Portfolio",
    liveUrl: "https://bielteles.github.io/freeCodeCamp-Portfolio",
    image: "💼"
  },
  {
    id: 7,
    title: "Product Landing Page",
    description: "Modern product landing page with interactive elements, embedded video, and email signup form. Part of freeCodeCamp's Responsive Web Design projects.",
    difficulty: QUEST_DIFFICULTY.RARE,
    technologies: ["HTML5", "CSS3", "JavaScript", "Flexbox"],
    status: QUEST_STATUS.COMPLETED,
    rewards: ["Landing Page Design", "Form Validation", "Marketing Skills"],
    githubUrl: "https://github.com/BielTeles/freeCodeCamp-landing-page",
    liveUrl: "https://bielteles.github.io/freeCodeCamp-landing-page",
    image: "🚀"
  },
  {
    id: 8,
    title: "Learning Site 1",
    description: "Educational web platform focused on teaching programming fundamentals and web development concepts through interactive lessons and exercises.",
    difficulty: QUEST_DIFFICULTY.EPIC,
    technologies: ["HTML", "CSS", "JavaScript", "Educational Design"],
    status: QUEST_STATUS.COMPLETED,
    rewards: ["Educational Content", "User Experience", "Teaching Skills"],
    githubUrl: "https://github.com/BielTeles/learningsite1",
    liveUrl: "https://bielteles.github.io/learningsite1",
    image: "🎓"
  }
]; 