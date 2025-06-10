import type { 
  CharacterData, 
  Quest, 
  Achievement,
  ContactForm,
  Certification,
  AdventureExperience
} from '@/types/character';
import { 
  SKILL_CATEGORIES,
  QUEST_DIFFICULTY,
  QUEST_STATUS,
  LANGUAGE_LEVELS,
  CERTIFICATION_TYPES
} from '@/config/constants';
import { 
  isValidLevel, 
  isValidAttribute, 
  isValidSkillLevel 
} from '@/utils/character';

/**
 * Validadores para garantir integridade dos dados
 * Previne bugs e garante consistência do modelo
 */

/**
 * Resultado de validação
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Valida dados do personagem
 */
export const validateCharacterData = (character: CharacterData): ValidationResult => {
  const errors: string[] = [];

  // Validações básicas
  if (!character.name?.trim()) {
    errors.push('Nome do personagem é obrigatório');
  }

  if (!character.class?.trim()) {
    errors.push('Classe do personagem é obrigatória');
  }

  if (!isValidLevel(character.level)) {
    errors.push('Nível do personagem deve estar entre 1 e 100');
  }

  if (character.experience < 0) {
    errors.push('Experiência não pode ser negativa');
  }

  // Validação dos atributos
  Object.entries(character.attributes).forEach(([attr, value]) => {
    if (!isValidAttribute(value)) {
      errors.push(`Atributo ${attr} deve estar entre 1 e 20`);
    }
  });

  // Validação das skills
  character.skills.forEach((skill, index) => {
    if (!skill.name?.trim()) {
      errors.push(`Skill ${index + 1} deve ter um nome`);
    }

    if (!isValidSkillLevel(skill.level)) {
      errors.push(`Nível da skill ${skill.name} deve estar entre 0 e 100`);
    }

    if (!Object.values(SKILL_CATEGORIES).includes(skill.category)) {
      errors.push(`Categoria da skill ${skill.name} é inválida`);
    }
  });

  // Validação dos idiomas
  character.languages.forEach((language, index) => {
    if (!language.name?.trim()) {
      errors.push(`Idioma ${index + 1} deve ter um nome`);
    }

    if (!Object.values(LANGUAGE_LEVELS).includes(language.level)) {
      errors.push(`Nível do idioma ${language.name} é inválido`);
    }

    if (language.proficiency < 0 || language.proficiency > 100) {
      errors.push(`Proficiência do idioma ${language.name} deve estar entre 0 e 100`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida dados de uma quest
 */
export const validateQuest = (quest: Quest): ValidationResult => {
  const errors: string[] = [];

  if (!quest.title?.trim()) {
    errors.push('Título da quest é obrigatório');
  }

  if (!quest.description?.trim()) {
    errors.push('Descrição da quest é obrigatória');
  }

  if (!Object.values(QUEST_DIFFICULTY).includes(quest.difficulty)) {
    errors.push('Dificuldade da quest é inválida');
  }

  if (!Object.values(QUEST_STATUS).includes(quest.status)) {
    errors.push('Status da quest é inválido');
  }

  if (!Array.isArray(quest.technologies) || quest.technologies.length === 0) {
    errors.push('Quest deve ter pelo menos uma tecnologia');
  }

  if (!Array.isArray(quest.rewards) || quest.rewards.length === 0) {
    errors.push('Quest deve ter pelo menos uma recompensa');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida dados de uma experiência profissional
 */
export const validateAdventureExperience = (experience: AdventureExperience): ValidationResult => {
  const errors: string[] = [];

  if (!experience.guild?.trim()) {
    errors.push('Nome da empresa/guilda é obrigatório');
  }

  if (!experience.role?.trim()) {
    errors.push('Cargo/função é obrigatório');
  }

  if (!experience.period?.trim()) {
    errors.push('Período de trabalho é obrigatório');
  }

  if (!Array.isArray(experience.achievements) || experience.achievements.length === 0) {
    errors.push('Experiência deve ter pelo menos uma conquista');
  }

  if (!Array.isArray(experience.technologies) || experience.technologies.length === 0) {
    errors.push('Experiência deve ter pelo menos uma tecnologia');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida dados de uma certificação
 */
export const validateCertification = (certification: Certification): ValidationResult => {
  const errors: string[] = [];

  if (!certification.title?.trim()) {
    errors.push('Título da certificação é obrigatório');
  }

  if (!certification.issuer?.trim()) {
    errors.push('Emissor da certificação é obrigatório');
  }

  if (!certification.date?.trim()) {
    errors.push('Data da certificação é obrigatória');
  }

  if (!Object.values(CERTIFICATION_TYPES).includes(certification.type)) {
    errors.push('Tipo da certificação é inválido');
  }

  if (!Array.isArray(certification.skills) || certification.skills.length === 0) {
    errors.push('Certificação deve ter pelo menos uma skill associada');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida dados de um achievement
 */
export const validateAchievement = (achievement: Achievement): ValidationResult => {
  const errors: string[] = [];

  if (!achievement.title?.trim()) {
    errors.push('Título do achievement é obrigatório');
  }

  if (!achievement.description?.trim()) {
    errors.push('Descrição do achievement é obrigatória');
  }

  if (achievement.progress < 0) {
    errors.push('Progresso do achievement não pode ser negativo');
  }

  if (achievement.maxProgress <= 0) {
    errors.push('Progresso máximo do achievement deve ser maior que zero');
  }

  if (achievement.progress > achievement.maxProgress) {
    errors.push('Progresso não pode ser maior que o progresso máximo');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida formulário de contato
 */
export const validateContactForm = (form: ContactForm): ValidationResult => {
  const errors: string[] = [];

  if (!form.name?.trim()) {
    errors.push('Nome é obrigatório');
  }

  if (!form.email?.trim()) {
    errors.push('Email é obrigatório');
  } else if (!isValidEmail(form.email)) {
    errors.push('Email deve ter um formato válido');
  }

  if (!form.questType?.trim()) {
    errors.push('Tipo de quest é obrigatório');
  }

  if (!form.message?.trim()) {
    errors.push('Mensagem é obrigatória');
  } else if (form.message.length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida formato de email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Valida se uma string não está vazia ou só com espaços
 */
export const isNonEmptyString = (value: string): boolean => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Valida se um array não está vazio
 */
export const isNonEmptyArray = <T>(array: T[]): boolean => {
  return Array.isArray(array) && array.length > 0;
};

/**
 * Valida se um número está dentro de um range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Sanitiza string removendo caracteres especiais
 */
export const sanitizeString = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

/**
 * Valida lista completa de dados do portfólio
 */
export const validatePortfolioData = (data: {
  character: CharacterData;
  quests: Quest[];
  experiences: AdventureExperience[];
  certifications: Certification[];
  achievements: Achievement[];
}): ValidationResult => {
  const allErrors: string[] = [];

  // Valida personagem
  const characterValidation = validateCharacterData(data.character);
  if (!characterValidation.isValid) {
    allErrors.push(...characterValidation.errors.map(err => `Personagem: ${err}`));
  }

  // Valida quests
  data.quests.forEach((quest, index) => {
    const questValidation = validateQuest(quest);
    if (!questValidation.isValid) {
      allErrors.push(...questValidation.errors.map(err => `Quest ${index + 1}: ${err}`));
    }
  });

  // Valida experiências
  data.experiences.forEach((exp, index) => {
    const expValidation = validateAdventureExperience(exp);
    if (!expValidation.isValid) {
      allErrors.push(...expValidation.errors.map(err => `Experiência ${index + 1}: ${err}`));
    }
  });

  // Valida certificações
  data.certifications.forEach((cert, index) => {
    const certValidation = validateCertification(cert);
    if (!certValidation.isValid) {
      allErrors.push(...certValidation.errors.map(err => `Certificação ${index + 1}: ${err}`));
    }
  });

  // Valida achievements
  data.achievements.forEach((achievement, index) => {
    const achievementValidation = validateAchievement(achievement);
    if (!achievementValidation.isValid) {
      allErrors.push(...achievementValidation.errors.map(err => `Achievement ${index + 1}: ${err}`));
    }
  });

  return {
    isValid: allErrors.length === 0,
    errors: allErrors
  };
}; 