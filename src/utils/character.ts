import type { 
  CharacterData, 
  Skill, 
  Quest, 
  Achievement,
  HallOfFameStats 
} from '@/types/character';
import { 
  GAME_CONSTANTS, 
  SKILL_CATEGORIES,
  QUEST_DIFFICULTY,
  QUEST_STATUS 
} from '@/config/constants';

/**
 * Utilitários para manipulação de dados do personagem
 * Centraliza lógica de cálculos e transformações
 */

/**
 * Calcula o XP necessário para o próximo nível
 */
export const calculateXPForNextLevel = (currentLevel: number): number => {
  return currentLevel * GAME_CONSTANTS.XP_PER_LEVEL;
};

/**
 * Calcula a porcentagem de progresso para o próximo nível
 */
export const calculateLevelProgress = (currentXP: number, currentLevel: number): number => {
  const xpForCurrentLevel = (currentLevel - 1) * GAME_CONSTANTS.XP_PER_LEVEL;
  const xpForNextLevel = currentLevel * GAME_CONSTANTS.XP_PER_LEVEL;
  const progressXP = currentXP - xpForCurrentLevel;
  const neededXP = xpForNextLevel - xpForCurrentLevel;
  
  return Math.min(Math.max((progressXP / neededXP) * 100, 0), 100);
};

/**
 * Calcula nível baseado no XP total
 */
export const calculateLevelFromXP = (totalXP: number): number => {
  return Math.floor(totalXP / GAME_CONSTANTS.XP_PER_LEVEL) + 1;
};

/**
 * Filtra skills por categoria
 */
export const getSkillsByCategory = (skills: Skill[], category: keyof typeof SKILL_CATEGORIES): Skill[] => {
  return skills.filter(skill => skill.category === SKILL_CATEGORIES[category]);
};

/**
 * Ordena skills por nível (decrescente)
 */
export const sortSkillsByLevel = (skills: Skill[]): Skill[] => {
  return [...skills].sort((a, b) => b.level - a.level);
};

/**
 * Calcula o nível médio de skills de uma categoria
 */
export const getAverageSkillLevel = (skills: Skill[], category?: keyof typeof SKILL_CATEGORIES): number => {
  const filteredSkills = category ? getSkillsByCategory(skills, category) : skills;
  
  if (filteredSkills.length === 0) return 0;
  
  const total = filteredSkills.reduce((sum, skill) => sum + skill.level, 0);
  return Math.round(total / filteredSkills.length);
};

/**
 * Obtém a skill de maior nível
 */
export const getTopSkill = (skills: Skill[]): Skill | null => {
  if (skills.length === 0) return null;
  return skills.reduce((top, current) => current.level > top.level ? current : top);
};

/**
 * Filtra quests por status
 */
export const getQuestsByStatus = (quests: Quest[], status: keyof typeof QUEST_STATUS): Quest[] => {
  return quests.filter(quest => quest.status === QUEST_STATUS[status]);
};

/**
 * Filtra quests por dificuldade
 */
export const getQuestsByDifficulty = (quests: Quest[], difficulty: keyof typeof QUEST_DIFFICULTY): Quest[] => {
  return quests.filter(quest => quest.difficulty === QUEST_DIFFICULTY[difficulty]);
};

/**
 * Calcula pontuação de uma quest baseada na dificuldade
 */
export const calculateQuestScore = (difficulty: Quest['difficulty']): number => {
  const scoreMap = {
    [QUEST_DIFFICULTY.COMMON]: 100,
    [QUEST_DIFFICULTY.RARE]: 250,
    [QUEST_DIFFICULTY.EPIC]: 500,
    [QUEST_DIFFICULTY.LEGENDARY]: 1000,
  };
  
  return scoreMap[difficulty] || 0;
};

/**
 * Calcula XP total baseado nas quests completadas
 */
export const calculateTotalXPFromQuests = (quests: Quest[]): number => {
  return getQuestsByStatus(quests, 'COMPLETED')
    .reduce((total, quest) => total + calculateQuestScore(quest.difficulty), 0);
};

/**
 * Filtra achievements desbloqueados
 */
export const getUnlockedAchievements = (achievements: Achievement[]): Achievement[] => {
  return achievements.filter(achievement => achievement.unlocked);
};

/**
 * Calcula porcentagem de progresso de um achievement
 */
export const calculateAchievementProgress = (achievement: Achievement): number => {
  return Math.min((achievement.progress / achievement.maxProgress) * 100, 100);
};

/**
 * Verifica se um achievement está próximo de ser desbloqueado (80%+)
 */
export const isAchievementNearCompletion = (achievement: Achievement): boolean => {
  return !achievement.unlocked && calculateAchievementProgress(achievement) >= 80;
};

/**
 * Formata números grandes com sufixos (K, M, etc.)
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Calcula estatísticas resumidas do personagem
 */
export const getCharacterSummary = (character: CharacterData, quests: Quest[], stats: HallOfFameStats) => {
  const completedQuests = getQuestsByStatus(quests, 'COMPLETED');
  const topSkill = getTopSkill(character.skills);
  const totalAttributePoints = Object.values(character.attributes).reduce((sum, attr) => sum + attr, 0);
  
  return {
    totalLevel: character.level,
    totalXP: stats.totalXP,
    completedQuests: completedQuests.length,
    totalQuests: quests.length,
    topSkill: topSkill ? { name: topSkill.name, level: topSkill.level } : null,
    averageAttributes: Math.round(totalAttributePoints / 6),
    totalSkills: character.skills.length,
    progressToNextLevel: calculateLevelProgress(stats.totalXP, character.level),
  };
};

/**
 * Valida se um nível está dentro dos limites permitidos
 */
export const isValidLevel = (level: number): boolean => {
  return level >= 1 && level <= GAME_CONSTANTS.MAX_LEVEL;
};

/**
 * Valida se um atributo está dentro dos limites permitidos
 */
export const isValidAttribute = (value: number): boolean => {
  return value >= GAME_CONSTANTS.MIN_ATTRIBUTE_SCORE && 
         value <= GAME_CONSTANTS.MAX_ATTRIBUTE_SCORE;
};

/**
 * Valida se um skill level está dentro dos limites permitidos
 */
export const isValidSkillLevel = (level: number): boolean => {
  return level >= 0 && level <= GAME_CONSTANTS.MAX_SKILL_LEVEL;
}; 