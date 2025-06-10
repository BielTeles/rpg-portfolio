import type { AdventureExperience } from '@/types/character';

/**
 * Dados das Experiências Profissionais (Adventure Timeline)
 * Centraliza informações sobre experiências de trabalho
 */
export const adventureTimeline: AdventureExperience[] = [
  {
    id: 1,
    guild: "Ecxus Tecnologia",
    role: "Warehouse Manager & Procurement Lead",
    period: "03/2025 - Present",
    location: "Goiânia, GO",
    description: "Leading warehouse operations and procurement processes while developing innovative inventory management solutions.",
    achievements: [
      "Managing inventory systems and procurement processes",
      "Leading warehouse operations and logistics coordination",
      "Optimizing supply chain efficiency and cost management"
    ],
    technologies: ["Inventory Management", "Logistics", "Procurement", "Team Leadership"]
  },
  {
    id: 2,
    guild: "Chico Tendas",
    role: "Warehouse Manager & Procurement Lead",
    period: "02/2024 - 08/2024",
    location: "Goiânia, GO",
    description: "Managed large-scale operations including high-profile event production and team coordination.",
    achievements: [
      "Managed large-scale team operations",
      "Planned and executed Gustavo Lima's concert production",
      "Optimized inventory and procurement processes"
    ],
    technologies: ["Team Management", "Project Planning", "Operations"]
  },
  {
    id: 3,
    guild: "Ilha Service Tecnologia",
    role: "IT Support Specialist III",
    period: "09/2022 - 11/2022",
    location: "Goiânia, GO",
    description: "Provided critical IT support for Brazil's 2022 elections, ensuring system reliability during this crucial democratic process.",
    achievements: [
      "Configured voting machines OS for 2022 Brazilian Elections",
      "Provided critical technical support during election period",
      "Ensured system reliability under high-pressure conditions"
    ],
    technologies: ["System Administration", "Hardware Support", "Critical Operations"]
  },
  {
    id: 4,
    guild: "Brasil Telecom SA",
    role: "Call Center Agent",
    period: "12/2020 - 01/2021",
    location: "Goiânia, GO",
    description: "Delivered exceptional customer service while resolving complex technical issues in a fast-paced telecommunications environment.",
    achievements: [
      "Delivered exceptional customer service experience",
      "Resolved complex technical issues efficiently",
      "Maintained high performance metrics under pressure"
    ],
    technologies: ["Customer Service", "Communication", "Problem Solving"]
  }
]; 