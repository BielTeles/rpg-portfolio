import { useState, useEffect } from 'react';

/**
 * Hook de Analytics com temática RPG
 * Tracks visitantes como "viajantes", projetos visualizados, etc.
 */

export interface VisitorData {
  id: string;
  timestamp: number;
  country?: string;
  city?: string;
  userAgent: string;
  sessionDuration: number;
  pagesVisited: string[];
  projectsViewed: number[];
  achievementsUnlocked: string[];
}

export interface AnalyticsStats {
  totalTravelers: number;
  activeTravelers: number;
  topCountries: { country: string; count: number }[];
  totalProjectViews: number;
  topProjects: { projectId: number; views: number; title: string }[];
  sessionDuration: number;
  achievementsUnlocked: number;
  dailyVisitors: { date: string; count: number }[];
}

const STORAGE_KEYS = {
  VISITORS: 'rpg_portfolio_visitors',
  CURRENT_SESSION: 'rpg_portfolio_current_session',
  ANALYTICS_STATS: 'rpg_portfolio_analytics',
} as const;

// Simula dados de países para demonstração (em produção usaria API real)
const DEMO_COUNTRIES = [
  'Brazil', 'United States', 'Germany', 'Japan', 'Canada', 
  'United Kingdom', 'France', 'Australia', 'Netherlands', 'Sweden'
];

export const useAnalytics = () => {
  const [stats, setStats] = useState<AnalyticsStats>({
    totalTravelers: 0,
    activeTravelers: 0,
    topCountries: [],
    totalProjectViews: 0,
    topProjects: [],
    sessionDuration: 0,
    achievementsUnlocked: 0,
    dailyVisitors: [],
  });

  const [currentSession, setCurrentSession] = useState<VisitorData | null>(null);

  // Inicializa sessão do visitante
  const initializeSession = () => {
    if (typeof window === 'undefined') return; // Protege contra SSR
    
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const country = DEMO_COUNTRIES[Math.floor(Math.random() * DEMO_COUNTRIES.length)];
    
    const newSession: VisitorData = {
      id: sessionId,
      timestamp: Date.now(),
      country,
      city: `City in ${country}`,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      sessionDuration: 0,
      pagesVisited: ['home'],
      projectsViewed: [],
      achievementsUnlocked: [],
    };

    setCurrentSession(newSession);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(newSession));
    
    // Adiciona à lista de visitantes
    const visitors = getStoredVisitors();
    visitors.push(newSession);
    localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(visitors));
    
    updateAnalyticsStats();
  };

  // Recupera visitantes salvos
  const getStoredVisitors = (): VisitorData[] => {
    if (typeof window === 'undefined') return []; // Protege contra SSR
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VISITORS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // Atualiza duração da sessão
  const updateSessionDuration = () => {
    if (typeof window === 'undefined' || !currentSession) return; // Protege contra SSR

    const duration = Date.now() - currentSession.timestamp;
    const updatedSession = { ...currentSession, sessionDuration: duration };
    
    setCurrentSession(updatedSession);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(updatedSession));
    
    // Atualiza na lista de visitantes também
    const visitors = getStoredVisitors();
    const index = visitors.findIndex(v => v.id === currentSession.id);
    if (index !== -1) {
      visitors[index] = updatedSession;
      localStorage.setItem(STORAGE_KEYS.VISITORS, JSON.stringify(visitors));
    }
  };

  // Registra visualização de projeto
  const trackProjectView = (projectId: number) => {
    if (typeof window === 'undefined' || !currentSession) return; // Protege contra SSR

    const updatedSession = {
      ...currentSession,
      projectsViewed: [...new Set([...currentSession.projectsViewed, projectId])]
    };

    setCurrentSession(updatedSession);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(updatedSession));
    updateAnalyticsStats();
  };

  // Registra achievement desbloqueado
  const trackAchievement = (achievementId: string) => {
    if (typeof window === 'undefined' || !currentSession) return; // Protege contra SSR

    const updatedSession = {
      ...currentSession,
      achievementsUnlocked: [...new Set([...currentSession.achievementsUnlocked, achievementId])]
    };

    setCurrentSession(updatedSession);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(updatedSession));
    updateAnalyticsStats();
  };

  // Atualiza estatísticas gerais
  const updateAnalyticsStats = () => {
    const visitors = getStoredVisitors();
    const now = Date.now();
    const oneHourAgo = now - (60 * 60 * 1000);
    
    // Visitantes ativos (última hora)
    const activeTravelers = visitors.filter(v => v.timestamp > oneHourAgo).length;
    
    // Top países
    const countryCount: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      if (visitor.country) {
        countryCount[visitor.country] = (countryCount[visitor.country] || 0) + 1;
      }
    });
    
    const topCountries = Object.entries(countryCount)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Projetos mais visualizados
    const projectViews: { [key: number]: number } = {};
    visitors.forEach(visitor => {
      visitor.projectsViewed.forEach(projectId => {
        projectViews[projectId] = (projectViews[projectId] || 0) + 1;
      });
    });

    const topProjects = Object.entries(projectViews)
      .map(([projectId, views]) => ({ 
        projectId: parseInt(projectId), 
        views, 
        title: getProjectTitle(parseInt(projectId))
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);

    // Visitantes diários (últimos 7 dias)
    const dailyVisitors = generateDailyVisitors(visitors);

    // Total de achievements
    const totalAchievements = visitors.reduce((total, visitor) => 
      total + visitor.achievementsUnlocked.length, 0
    );

    const newStats: AnalyticsStats = {
      totalTravelers: visitors.length,
      activeTravelers,
      topCountries,
      totalProjectViews: Object.values(projectViews).reduce((a, b) => a + b, 0),
      topProjects,
      sessionDuration: currentSession?.sessionDuration || 0,
      achievementsUnlocked: totalAchievements,
      dailyVisitors,
    };

    setStats(newStats);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ANALYTICS_STATS, JSON.stringify(newStats));
    }
  };

  // Helper para obter título do projeto
  const getProjectTitle = (projectId: number): string => {
    const titles: { [key: number]: string } = {
      1: 'Bazar da Danny',
      2: 'Elaria RPG Character Sheet',
      3: 'EstoqueApp',
      4: 'EstudosDevWeb',
    };
    return titles[projectId] || `Projeto ${projectId}`;
  };

  // Gera dados de visitantes diários
  const generateDailyVisitors = (visitors: VisitorData[]) => {
    const days = 7;
    const dailyData = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);
      
      const count = visitors.filter(v => 
        v.timestamp >= dayStart.getTime() && v.timestamp <= dayEnd.getTime()
      ).length;
      
      dailyData.push({ date: dateStr, count });
    }
    
    return dailyData;
  };

  // Limpa dados (útil para desenvolvimento)
  const clearAnalyticsData = () => {
    if (typeof window === 'undefined') return; // Protege contra SSR
    
    localStorage.removeItem(STORAGE_KEYS.VISITORS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.ANALYTICS_STATS);
    setCurrentSession(null);
    setStats({
      totalTravelers: 0,
      activeTravelers: 0,
      topCountries: [],
      totalProjectViews: 0,
      topProjects: [],
      sessionDuration: 0,
      achievementsUnlocked: 0,
      dailyVisitors: [],
    });
  };

  // Formata duração em formato legível
  const formatDuration = (milliseconds: number): string => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Inicialização do hook
  useEffect(() => {
    // Só executa no cliente (não no servidor)
    if (typeof window === 'undefined') return;
    
    // Verifica se já existe uma sessão
    const storedSession = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        setCurrentSession(session);
      } catch {
        initializeSession();
      }
    } else {
      initializeSession();
    }

    // Carrega stats salvos
    const storedStats = localStorage.getItem(STORAGE_KEYS.ANALYTICS_STATS);
    if (storedStats) {
      try {
        setStats(JSON.parse(storedStats));
      } catch {
        updateAnalyticsStats();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Atualiza duração da sessão a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      updateSessionDuration();
      updateAnalyticsStats();
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession]);

  return {
    stats,
    currentSession,
    trackProjectView,
    trackAchievement,
    formatDuration,
    clearAnalyticsData,
    updateAnalyticsStats,
  };
}; 