import React from 'react';
import { CheckCircle2, Flame, Brain, Landmark, LineChart, Award, Box, Sparkles } from 'lucide-react';
import { Quest, Badge, User } from '../types';

interface QuestsViewProps {
  user: User | null;
  quests: Quest[];
  badges: Badge[];
}

export const QuestsView: React.FC<QuestsViewProps> = ({ user, quests, badges }) => {
  const completedCount = quests.filter((q) => q.isCompleted).length;

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif font-bold text-gray-900">도전과제</h1>
        <p className="text-xs text-gray-500 mt-1">
          {completedCount}/{quests.length}개 완료 · 꾸준히 읽으면 레벨이 올라가요
        </p>
      </div>

      {/* Top Black Level XP Card matching photo 3 */}
      {user && (
        <div className="bg-[#1a1c1e] text-white rounded-3xl p-6 shadow-md space-y-3">
          <div className="flex items-center justify-between font-bold text-sm">
            <span className="text-amber-400">Lv.{user.level}</span>
            <span className="text-xs text-gray-300">
              {user.xp} / {user.nextLevelXp} XP
            </span>
          </div>

          <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden p-0.5 border border-gray-700">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (user.xp / user.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Quests List */}
      <div className="space-y-3">
        <h2 className="font-serif font-bold text-lg text-gray-900">진행 중인 도전과제</h2>

        <div className="space-y-3">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                    quest.isCompleted
                      ? 'bg-emerald-800 text-white'
                      : 'bg-amber-50 text-amber-700 border border-amber-100'
                  }`}
                >
                  {quest.isCompleted ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : quest.icon === 'brain' ? (
                    <Brain className="w-5 h-5" />
                  ) : quest.icon === 'bank' ? (
                    <Landmark className="w-5 h-5" />
                  ) : quest.icon === 'chart' ? (
                    <LineChart className="w-5 h-5" />
                  ) : (
                    <Flame className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-sm">{quest.title}</h3>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md">
                      +{quest.rewardXp} XP
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{quest.description}</p>
                </div>
              </div>

              <div className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-xl shrink-0">
                {quest.currentCount}/{quest.targetCount}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badge Collection Section matching photo 3 */}
      <div className="space-y-3">
        <h2 className="font-serif font-bold text-lg text-gray-900">배지 컬렉션</h2>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`rounded-2xl border p-4 text-center space-y-2 flex flex-col items-center justify-center transition-all ${
                badge.isUnlocked
                  ? 'bg-emerald-50/60 border-emerald-200 shadow-xs'
                  : 'bg-gray-50/60 border-gray-100 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  badge.isUnlocked ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-800 block line-clamp-1">
                {badge.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* OGQ Emoticon Section matching photo 3 */}
      <div className="bg-gray-50/70 border border-gray-200/80 rounded-2xl p-5 space-y-3">
        <h3 className="font-bold text-xs text-gray-700">OGQ 이모티콘 스티커 보관함</h3>
        <div className="flex items-center justify-around text-2xl pt-1">
          <span>📉</span>
          <span>📈</span>
          <span>📚</span>
          <span>🚀</span>
          <span>😴</span>
        </div>
      </div>
    </div>
  );
};
