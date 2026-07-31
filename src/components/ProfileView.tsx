import React, { useState } from 'react';
import { BookOpen, Flame, Award, Sparkles, Plus, X, TrendingUp, Target, BarChart2, Zap, RotateCcw, AlertTriangle } from 'lucide-react';
import { User } from '../types';
import { ResetConfirmModal } from './ResetConfirmModal';

interface ProfileViewProps {
  user: User | null;
  onUpdateInterests: (interests: string[]) => void;
  onResetUserData?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateInterests, onResetUserData }) => {
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  if (!user) {

    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl">
          👤
        </div>
        <h2 className="text-xl font-bold text-gray-900">로그인이 필요합니다</h2>
        <p className="text-xs text-gray-500">
          프로필을 확인하고 경험치를 관리하려면 먼저 로그인해주세요.
        </p>
      </div>
    );
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    if (!user.interests.includes(newTag.trim())) {
      onUpdateInterests([...user.interests, newTag.trim()]);
    }
    setNewTag('');
    setShowTagInput(false);
  };

  const handleRemoveTag = (tag: string) => {
    onUpdateInterests(user.interests.filter((t) => t !== tag));
  };

  const stats = user.predictionStats || {
    accuracy: 0,
    averageError: 0,
    totalPredictions: 0,
    correctPredictions: 0,
    currentStreak: 0,
    bestStreak: 0,
    rankingScore: 0,
  };

  const isNewUser = user.readArticlesCount === 0 && stats.totalPredictions === 0;

  const concepts = [
    { name: 'GPU', score: isNewUser ? 0 : 25 },
    { name: 'ETF', score: isNewUser ? 0 : 30 },
    { name: 'PER', score: isNewUser ? 0 : 10 },
    { name: '금리', score: isNewUser ? 0 : 40 },
    { name: '반도체', score: isNewUser ? 0 : 65 },
    { name: '시가총액', score: isNewUser ? 0 : 15 },
    { name: '공급망', score: isNewUser ? 0 : 20 },
    { name: '배당금', score: isNewUser ? 0 : 5 },
    { name: '실적발표', score: isNewUser ? 0 : 35 },
  ];

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6 pb-12">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-2xl font-serif">
          {user.avatar}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-xs text-gray-500">Lv.{user.level} · 무럭무럭 성장하는 투자자</p>
            </div>
            <span className="text-xs text-gray-400">다음 레벨까지 {user.nextLevelXp - user.xp} XP</span>
          </div>

          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full"
              style={{ width: `${Math.min(100, (user.xp / user.nextLevelXp) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 text-center space-y-1">
          <BookOpen className="w-5 h-5 mx-auto text-emerald-700" />
          <div className="text-xl font-extrabold text-gray-900">{user.readArticlesCount}</div>
          <div className="text-xs text-gray-400">읽은 기사</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 text-center space-y-1">
          <Flame className="w-5 h-5 mx-auto text-rose-500" />
          <div className="text-xl font-extrabold text-gray-900">{user.streakDays}일</div>
          <div className="text-xs text-gray-400">연속 학습</div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-5 text-center space-y-1">
          <Award className="w-5 h-5 mx-auto text-amber-500" />
          <div className="text-xl font-extrabold text-gray-900">{user.earnedBadgesCount}</div>
          <div className="text-xs text-gray-400">획득 배지</div>
        </div>
      </div>

      {/* [NEW] Prediction Stats Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="font-bold text-base text-white">뉴스 투자 예측 대시보드</h2>
          </div>
          <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
            총 {stats.rankingScore}점 획득
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
            <Target className="w-4 h-4 mx-auto text-emerald-400 mb-1" />
            <p className="text-lg font-black text-white">{stats.accuracy.toFixed(1)}%</p>
            <p className="text-[11px] text-slate-300">예측 성공률 ({stats.correctPredictions}/{stats.totalPredictions})</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
            <BarChart2 className="w-4 h-4 mx-auto text-blue-400 mb-1" />
            <p className="text-lg font-black text-white">{stats.averageError.toFixed(1)}pt</p>
            <p className="text-[11px] text-slate-300">평균 포인트 오차</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
            <Zap className="w-4 h-4 mx-auto text-amber-400 mb-1" />
            <p className="text-lg font-black text-amber-300">{stats.currentStreak}회 연속</p>
            <p className="text-[11px] text-slate-300">현재 연속 정답</p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 border border-white/10 text-center">
            <Award className="w-4 h-4 mx-auto text-purple-400 mb-1" />
            <p className="text-lg font-black text-purple-300">{stats.bestStreak}회</p>
            <p className="text-[11px] text-slate-300">최고 연속 기록</p>
          </div>
        </div>
      </div>

      {/* Interests Tags Section */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-base text-gray-900">나의 관심사</h2>
          <button
            onClick={() => setShowTagInput(!showTagInput)}
            className="text-xs text-emerald-800 font-semibold flex items-center gap-1 hover:underline"
          >
            <Plus className="w-3.5 h-3.5" /> 관심사 추가
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {user.interests.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-100"
            >
              <span>🧪 {tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-rose-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {showTagInput && (
            <form onSubmit={handleAddTag} className="inline-flex items-center gap-1">
              <input
                type="text"
                autoFocus
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="예: 애플, 이차전지"
                className="px-3 py-1 bg-gray-50 border border-gray-300 text-xs rounded-full focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-2.5 py-1 bg-emerald-800 text-white text-xs font-semibold rounded-full"
              >
                추가
              </button>
            </form>
          )}
        </div>
      </div>

      {/* AI Comprehension Analysis */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="font-serif font-bold text-base text-gray-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            AI 이해도 분석
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            클릭한 단어와 예측 정확도를 바탕으로 시사 상식 이해도를 측정해요.
          </p>
        </div>

        <div className="space-y-3">
          {concepts.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-800">
                <span>💡 {item.name}</span>
                <span>{item.score}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Data Danger Reset Section */}
      <div className="bg-rose-50/70 border border-rose-200/90 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-rose-950">계정 데이터 관리 및 초기화</h3>
            <p className="text-xs text-rose-700 mt-0.5">
              학습 및 투자 예측 기록, 포인트, 레벨 등 모든 게임 데이터를 초기화합니다. (로그인 유지)
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          계정 초기화
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={() => {
          setIsResetModalOpen(false);
          if (onResetUserData) {
            onResetUserData();
          }
        }}
      />
    </div>
  );
};

