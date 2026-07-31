import React from 'react';
import { User } from '../types';
import { Newspaper, Trophy, Flame, User as UserIcon, TrendingUp } from 'lucide-react';

export type TabType = 'briefing' | 'prediction' | 'quests' | 'rankings' | 'profile';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user }) => {
  const menuItems = [
    { id: 'briefing', label: '오늘의 브리핑', icon: Newspaper },
    { id: 'prediction', label: '뉴스 투자 예측', icon: TrendingUp },
    { id: 'quests', label: '도전과제', icon: Trophy },
    { id: 'rankings', label: '인기 순위', icon: Flame },
    { id: 'profile', label: '프로필', icon: UserIcon },
  ] as const;

  return (
    <aside className="w-64 shrink-0 bg-white min-h-[calc(100vh-57px)] border-r border-gray-100 p-4 flex flex-col justify-between">
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-gray-950 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Status Card at Bottom of Sidebar */}
      {user && (
        <div className="bg-[#EAF5F0] rounded-2xl p-4 border border-[#D3EADF]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-800">
              Lv.{user.level} · {user.name}
            </span>
            {user.predictionStats && (
              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                {user.predictionStats.rankingScore} pt
              </span>
            )}
          </div>
          <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden mb-1.5">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-500">
            다음 레벨까지 {user.nextLevelXp - user.xp} XP
          </p>
        </div>
      )}
    </aside>
  );
};
