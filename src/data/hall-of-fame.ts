import type { HallOfFame } from '@/types/character';
import { CERTIFICATION_TYPES } from '@/config/constants';

/**
 * Dados do Hall of Fame
 * Centraliza certificações, achievements e estatísticas
 */
export const hallOfFame: HallOfFame = {
  certifications: [
    {
      id: 1,
      title: "Introdução ao Node.js",
      issuer: "Rocketseat",
      date: "2025",
      description: "Curso completo de Node.js cobrindo fundamentos, APIs, banco de dados e desenvolvimento backend.",
      skills: ["Node.js", "JavaScript", "APIs", "Backend"],
      type: CERTIFICATION_TYPES.EPIC,
      url: "https://app.rocketseat.com.br/certificates/27d5ee52-7241-4aa5-a6ac-bb934e15faad",
      icon: "🚀"
    },
    {
      id: 2,
      title: "JavaScript",
      issuer: "Rocketseat",
      date: "2025",
      description: "Fundamentos e conceitos avançados de JavaScript para desenvolvimento web moderno.",
      skills: ["JavaScript", "ES6+", "DOM", "Promises"],
      type: CERTIFICATION_TYPES.EPIC,
      url: "https://app.rocketseat.com.br/certificates/94a359d2-0d2c-4175-b750-ff200e250cdc",
      icon: "📜"
    },
    {
      id: 3,
      title: "Fundamentos de HTML e CSS",
      issuer: "Rocketseat",
      date: "2025",
      description: "Base sólida em HTML e CSS para criação de interfaces web responsivas e modernas.",
      skills: ["HTML", "CSS", "Flexbox", "Grid"],
      type: CERTIFICATION_TYPES.RARE,
      url: "https://app.rocketseat.com.br/certificates/5f8f430d-6c8f-41cf-a928-b42f4339af21",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Fundamentos do React",
      issuer: "Rocketseat",
      date: "2025",
      description: "Introdução ao React com componentes, hooks e gerenciamento de estado.",
      skills: ["React", "Components", "Hooks", "State"],
      type: CERTIFICATION_TYPES.EPIC,
      url: "https://app.rocketseat.com.br/certificates/ca3b152d-4347-4637-84f5-03fc5685e7c4",
      icon: "⚛️"
    },
    {
      id: 5,
      title: "Aprofundando em Hooks",
      issuer: "Rocketseat",
      date: "2025",
      description: "Hooks avançados do React para gerenciamento de estado e efeitos colaterais.",
      skills: ["React Hooks", "useState", "useEffect", "Custom Hooks"],
      type: CERTIFICATION_TYPES.RARE,
      url: "https://app.rocketseat.com.br/certificates/0d15ed85-e396-445a-ad84-d45a486aa890",
      icon: "🔗"
    },
    {
      id: 6,
      title: "Integrando Frontend e Backend",
      issuer: "Rocketseat",
      date: "2025",
      description: "Integração entre aplicações frontend e backend com APIs REST.",
      skills: ["API Integration", "HTTP", "Fetch", "Full Stack"],
      type: CERTIFICATION_TYPES.EPIC,
      url: "https://app.rocketseat.com.br/certificates/df693163-8549-4239-9e93-38fa17ce0761",
      icon: "🔄"
    },
    {
      id: 7,
      title: "Fundamentos de IA",
      issuer: "Rocketseat",
      date: "2025",
      description: "Introdução aos conceitos de Inteligência Artificial e Machine Learning.",
      skills: ["AI", "Machine Learning", "Python", "Data Science"],
      type: CERTIFICATION_TYPES.LEGENDARY,
      url: "https://app.rocketseat.com.br/certificates/c5c8d783-356d-4e8f-b735-7302aef8314e",
      icon: "🤖"
    },
    {
      id: 8,
      title: "Fundamentos do .NET",
      issuer: "Rocketseat",
      date: "2025",
      description: "Introdução ao desenvolvimento com .NET e C#.",
      skills: [".NET", "C#", "Backend", "Microsoft"],
      type: CERTIFICATION_TYPES.RARE,
      url: "https://app.rocketseat.com.br/certificates/7f73268d-552a-4045-a764-249472d94dfb",
      icon: "🔷"
    },
    {
      id: 9,
      title: "Imersão Front-End",
      issuer: "Alura",
      date: "2024",
      description: "Imersão prática em desenvolvimento frontend com tecnologias modernas.",
      skills: ["Frontend", "HTML", "CSS", "JavaScript"],
      type: CERTIFICATION_TYPES.EPIC,
      url: "https://cursos.alura.com.br/immersion/certificate/9349cfcc-6b3d-4dfa-811f-e8259eb94be5",
      icon: "💻"
    },
    {
      id: 10,
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      issuer: "Udemy",
      date: "2025",
      description: "Bootcamp completo de Python com 100 dias de código prático, cobrindo desde fundamentos até projetos avançados.",
      skills: ["Python", "Programming", "Data Structures", "Web Development", "APIs"],
      type: CERTIFICATION_TYPES.LEGENDARY,
      url: "https://ude.my/UC-34bc8e3d-58c0-469f-9c3b-77a0465d1ad6",
      icon: "🐍"
    }
  ],
  
  achievements: [
    {
      id: 1,
      title: "4x Valorant Goiano Champion",
      description: "Conquered the Goiás state championship four consecutive times",
      progress: 4,
      maxProgress: 4,
      unlocked: true,
      icon: "🏆"
    },
    {
      id: 2,
      title: "Vice-Champion Brazilian Valorant",
      description: "Reached the finals of the Brazilian national championship",
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      icon: "🥈"
    },
    {
      id: 3,
      title: "RPG Campaign Master",
      description: "Successfully mastered multiple RPG campaigns bringing joy to friends",
      progress: 50,
      maxProgress: 50,
      unlocked: true,
      icon: "🎲"
    },
    {
      id: 4,
      title: "Frontend Developer",
      description: "Mastered modern frontend development stack",
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      icon: "💻"
    },
    {
      id: 5,
      title: "Project Manager",
      description: "Led successful team projects and deliveries",
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      icon: "📋"
    },
    {
      id: 6,
      title: "GitHub Explorer",
      description: "Shared epic code repositories with the community",
      progress: 2,
      maxProgress: 3,
      unlocked: false,
      icon: "⭐"
    },
    {
      id: 7,
      title: "Quest Giver",
      description: "Received collaboration requests from other adventurers",
      progress: 0,
      maxProgress: 1,
      unlocked: false,
      icon: "📜"
    }
  ],
  
  stats: {
    totalXP: 47250,
    projectsCompleted: 4,
    linesOfCode: 15420,
    coffeeConsumed: 687,
    bugsFixed: 342,
    happyClients: 12,
    valorantWins: 1247,
    rpgSessions: 89,
    yearsExperience: 3,
    technologiesMastered: 15
  }
}; 