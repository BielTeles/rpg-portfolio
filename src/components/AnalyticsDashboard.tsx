'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Eye, 
  Trophy, 
  Clock, 
  TrendingUp,
  Star,
  Activity,
  Calendar
} from 'lucide-react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { formatLargeNumber } from '@/utils/character';

/**
 * Dashboard de Analytics com temática RPG
 * Shows visitor statistics, most viewed projects, etc.
 */

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  isDarkMode: boolean;
}

const StatCard = ({ title, value, subtitle, icon, trend, isDarkMode }: StatCardProps) => (
  <motion.div
    className={`relative p-6 rounded-lg border-4 overflow-hidden ${
      isDarkMode 
        ? 'border-purple-500 bg-gray-800' 
        : 'border-amber-700 bg-amber-50'
    }`}
    whileHover={{ scale: 1.02, y: -2 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* Medieval Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className={`absolute top-2 right-2 text-6xl ${
        isDarkMode ? 'text-purple-300' : 'text-amber-800'
      }`}>
        {icon}
      </div>
    </div>
    
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 border-2 rounded-lg ${
          isDarkMode 
            ? 'bg-purple-900 border-purple-600' 
            : 'bg-amber-200 border-amber-600'
        }`}>
          <div className={isDarkMode ? 'text-purple-100' : 'text-amber-800'}>
            {icon}
          </div>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center text-sm font-bold ${trend >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      
      <div className={`text-3xl font-bold mb-1 ${
        isDarkMode ? 'text-purple-100' : 'text-amber-900'
      }`}>
        {typeof value === 'number' ? formatLargeNumber(value) : value}
      </div>
      
      <div className={`text-sm font-bold ${
        isDarkMode ? 'text-purple-200' : 'text-amber-800'
      }`}>{title}</div>
      
      {subtitle && (
        <div className={`text-xs mt-1 ${
          isDarkMode ? 'text-purple-300' : 'text-amber-700'
        }`}>{subtitle}</div>
      )}
    </div>
  </motion.div>
);

interface CountryItemProps {
  country: string;
  count: number;
  percentage: number;
  flag: string;
  isDarkMode: boolean;
}

const CountryItem = ({ country, count, percentage, flag, isDarkMode }: CountryItemProps) => (
  <motion.div 
    className={`flex items-center justify-between p-3 border-2 rounded-lg ${
      isDarkMode 
        ? 'bg-gray-700/70 border-purple-600' 
        : 'bg-amber-100/70 border-amber-600'
    }`}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center space-x-3">
      <span className="text-2xl">{flag}</span>
      <div>
        <div className={`font-bold ${
          isDarkMode ? 'text-purple-100' : 'text-amber-900'
        }`}>{country}</div>
        <div className={`text-sm ${
          isDarkMode ? 'text-purple-300' : 'text-amber-700'
        }`}>{count} travelers</div>
      </div>
    </div>
    
    <div className="flex items-center space-x-2">
      <div className={`font-bold ${
        isDarkMode ? 'text-purple-100' : 'text-amber-900'
      }`}>{percentage}%</div>
      <div className={`w-20 h-2 border rounded-full overflow-hidden ${
        isDarkMode 
          ? 'bg-gray-600 border-purple-600' 
          : 'bg-amber-300 border-amber-600'
      }`}>
        <motion.div 
          className={`h-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-600 to-purple-400' 
              : 'bg-gradient-to-r from-amber-600 to-yellow-600'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  </motion.div>
);

interface ProjectStatsProps {
  projects: { projectId: number; views: number; title: string }[];
  isDarkMode: boolean;
}

const ProjectStats = ({ projects, isDarkMode }: ProjectStatsProps) => {
  const maxViews = Math.max(...projects.map(p => p.views), 1);
  
  return (
    <div className="space-y-3">
      {projects.map((project, index) => (
        <motion.div 
          key={project.projectId}
          className={`flex items-center justify-between p-4 border-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700/70 border-purple-600' 
              : 'bg-amber-100/70 border-amber-600'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
              index === 0 ? 'bg-yellow-400 border-yellow-600 text-yellow-900' : 
              index === 1 ? 'bg-amber-300 border-amber-600 text-amber-900' : 'bg-orange-400 border-orange-600 text-orange-900'
            }`}>
              {index + 1}
            </div>
            <div>
              <div className={`font-bold ${
                isDarkMode ? 'text-purple-100' : 'text-amber-900'
              }`}>{project.title}</div>
              <div className={`text-sm ${
                isDarkMode ? 'text-purple-300' : 'text-amber-700'
              }`}>{project.views} views</div>
            </div>
          </div>
          
          <div className="w-24 h-3 bg-amber-300 border border-amber-600 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${
                index === 0 ? 'bg-gradient-to-r from-yellow-500 to-yellow-700' :
                index === 1 ? 'bg-gradient-to-r from-amber-500 to-amber-700' :
                'bg-gradient-to-r from-orange-500 to-orange-700'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${(project.views / maxViews) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

interface DailyChartProps {
  data: { date: string; count: number }[];
  isDarkMode: boolean;
}

const DailyChart = ({ data, isDarkMode }: DailyChartProps) => {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  return (
    <div className="flex items-end justify-between h-32 px-2">
      {data.map((day, index) => (
        <div key={day.date} className="flex flex-col items-center space-y-2">
          <motion.div 
            className={`w-8 border-2 rounded-t-md ${
              isDarkMode 
                ? 'bg-gradient-to-t from-purple-700 to-purple-400 border-purple-800' 
                : 'bg-gradient-to-t from-amber-700 to-yellow-500 border-amber-800'
            }`}
            style={{ 
              height: `${(day.count / maxCount) * 100}%`,
              minHeight: day.count > 0 ? '8px' : '2px'
            }}
            initial={{ height: 0 }}
            animate={{ height: `${(day.count / maxCount) * 100}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          />
          <div className={`text-xs font-bold transform rotate-45 origin-bottom-left ${
            isDarkMode ? 'text-purple-300' : 'text-amber-700'
          }`}>
            {new Date(day.date).toLocaleDateString('en-US', { 
              day: '2-digit', 
              month: '2-digit' 
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

interface AnalyticsDashboardProps {
  isDarkMode: boolean;
}

export const AnalyticsDashboard = ({ isDarkMode }: AnalyticsDashboardProps) => {
  const { stats, currentSession, formatDuration } = useAnalytics();

  // Maps countries to flags (emoji)
  const getCountryFlag = (country: string): string => {
    const flags: { [key: string]: string } = {
      'Brazil': '🇧🇷',
      'United States': '🇺🇸',
      'Germany': '🇩🇪',
      'Japan': '🇯🇵',
      'Canada': '🇨🇦',
      'United Kingdom': '🇬🇧',
      'France': '🇫🇷',
      'Australia': '🇦🇺',
      'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪',
    };
    return flags[country] || '🌍';
  };

  const totalCountries = stats.topCountries.reduce((sum, c) => sum + c.count, 0);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2 
          className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-purple-100' : 'text-amber-900'}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          📊 Tavern Registry
        </motion.h2>
        <p className={`font-bold ${isDarkMode ? 'text-purple-200' : 'text-amber-700'}`}>
          Statistics of travelers who visited these lands
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Travelers"
          value={stats.totalTravelers}
          subtitle="Since the adventure began"
          icon={<Users className="w-6 h-6" />}
          trend={12}
          isDarkMode={isDarkMode}
        />
        
        <StatCard
          title="Active Travelers"
          value={stats.activeTravelers}
          subtitle="Last hour"
          icon={<Activity className="w-6 h-6" />}
          isDarkMode={isDarkMode}
        />
        
        <StatCard
          title="Projects Viewed"
          value={stats.totalProjectViews}
          subtitle="Total views"
          icon={<Eye className="w-6 h-6" />}
          trend={8}
          isDarkMode={isDarkMode}
        />
        
        <StatCard
          title="Achievements Unlocked"
          value={stats.achievementsUnlocked}
          subtitle="Collective achievements"
          icon={<Trophy className="w-6 h-6" />}
          trend={15}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <motion.div 
          className={`rounded-lg border-4 p-6 ${
            isDarkMode 
              ? 'bg-gray-800 border-purple-500' 
              : 'bg-amber-50 border-amber-700'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Globe className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-amber-700'}`} />
            <h3 className={`text-xl font-bold ${
              isDarkMode ? 'text-purple-100' : 'text-amber-900'
            }`}>🌍 Travelers Map</h3>
          </div>
          
          <div className="space-y-3">
            {stats.topCountries.map((country) => (
              <CountryItem
                key={country.country}
                country={country.country}
                count={country.count}
                percentage={Math.round((country.count / totalCountries) * 100)}
                flag={getCountryFlag(country.country)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          
          {stats.topCountries.length === 0 && (
            <div className={`text-center py-8 font-bold ${
              isDarkMode ? 'text-purple-300' : 'text-amber-700'
            }`}>
              🗺️ Waiting for travelers to arrive...
            </div>
          )}
        </motion.div>

        {/* Top Projects */}
        <motion.div 
          className={`rounded-lg border-4 p-6 ${
            isDarkMode 
              ? 'bg-gray-800 border-purple-500' 
              : 'bg-amber-50 border-amber-700'
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-yellow-600" />
            <h3 className={`text-xl font-bold ${
              isDarkMode ? 'text-purple-100' : 'text-amber-900'
            }`}>🏆 Popular Projects</h3>
          </div>
          
          {stats.topProjects.length > 0 ? (
            <ProjectStats projects={stats.topProjects} isDarkMode={isDarkMode} />
          ) : (
            <div className={`text-center py-8 font-bold ${
              isDarkMode ? 'text-purple-300' : 'text-amber-700'
            }`}>
              📜 No projects viewed yet...
            </div>
          )}
        </motion.div>
      </div>

      {/* Daily Visitors Chart */}
      <motion.div 
        className={`rounded-lg border-4 p-6 ${
          isDarkMode 
            ? 'bg-gray-800 border-purple-500' 
            : 'bg-amber-50 border-amber-700'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-amber-700'}`} />
          <h3 className={`text-xl font-bold ${
            isDarkMode ? 'text-purple-100' : 'text-amber-900'
          }`}>📈 Visitors in the Last 7 Days</h3>
        </div>
        
        <DailyChart data={stats.dailyVisitors} isDarkMode={isDarkMode} />
      </motion.div>

      {/* Current Session Info */}
      {currentSession && (
        <motion.div 
          className={`rounded-lg border-4 p-6 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-purple-500' 
              : 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-700'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Clock className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-amber-700'}`} />
            <h3 className={`text-xl font-bold ${
              isDarkMode ? 'text-purple-100' : 'text-amber-900'
            }`}>⏱️ Your Current Session</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDarkMode ? 'text-purple-100' : 'text-amber-900'
              }`}>
                {formatDuration(currentSession.sessionDuration)}
              </div>
              <div className={`text-sm font-bold ${
                isDarkMode ? 'text-purple-300' : 'text-amber-700'
              }`}>Time at tavern</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDarkMode ? 'text-purple-100' : 'text-amber-900'
              }`}>
                {getCountryFlag(currentSession.country || 'Brazil')} {currentSession.country}
              </div>
              <div className={`text-sm font-bold ${
                isDarkMode ? 'text-purple-300' : 'text-amber-700'
              }`}>Traveler origin</div>
            </div>
            
            <div className="text-center">
              <div className={`text-2xl font-bold ${
                isDarkMode ? 'text-purple-100' : 'text-amber-900'
              }`}>
                {currentSession.projectsViewed.length}
              </div>
              <div className={`text-sm font-bold ${
                isDarkMode ? 'text-purple-300' : 'text-amber-700'
              }`}>Projects explored</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalyticsDashboard; 