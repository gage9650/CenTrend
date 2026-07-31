import React, { useState } from 'react';
import { UserRank, User } from '../types';
import { Crown, TrendingUp } from 'lucide-react';

interface RankingViewProps {
  rankings: UserRank[];
  currentUser: User | null;
}

export const RankingView: React.FC<RankingViewProps> = ({
  rankings,
  currentUser,
}) => {
  const [period, setPeriod] = useState<'주간' | '월간' | '전체'>('주간');

  // Compute total list including currentUser dynamically
  let allRankings: (UserRank & { isMe?: boolean })[] = [];

  if (currentUser) {
    const myPredScore = currentUser.predictionStats?.rankingScore || 0;
    const myTotalScore = currentUser.xp + myPredScore;

    const myRankEntry: UserRank & { isMe?: boolean } = {
      rank: 0,
      name: `${currentUser.name} (나)`,
      level: currentUser.level,
      xp: currentUser.xp,
      streak: currentUser.streakDays,
      badges: currentUser.earnedBadgesCount,
      avatar: currentUser.avatar,
      predictionScore: myPredScore,
      totalScore: myTotalScore,
      isMe: true,
    };

    // Filter out any potential duplicates or old '나' entries from rankings list
    const otherRankings = rankings.filter(
      (r) => !r.name.includes('(나)') && r.name !== currentUser.name
    );

    const combined = [...otherRankings, myRankEntry];
    combined.sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));

    allRankings = combined.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  } else {
    allRankings = rankings.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }

  const myRanking = allRankings.find((r) => r.isMe);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0">
            🥇
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0">
            🥈
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 font-extrabold text-sm flex items-center justify-center shadow-sm shrink-0">
            🥉
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            명예의 전당 랭킹 <Crown className="w-6 h-6 text-amber-500 fill-amber-400" />
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            뉴스 학습 XP와 투자 예측 점수를 합산한 종합 리더보드 순위입니다.
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 shadow-xs self-start sm:self-auto">
          {(['주간', '월간', '전체'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                period === p ? 'bg-slate-950 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* User Status Card */}
      {currentUser && myRanking && (
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-extrabold text-base border border-white/30">
              {currentUser.avatar}
            </div>
            <div>
              <p className="text-xs text-emerald-200 font-semibold">나의 현재 순위</p>
              <p className="text-lg font-black">{currentUser.name} ({myRanking.rank}위)</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-right">
            <div>
              <p className="text-[11px] text-emerald-200 font-semibold">학습 경험치</p>
              <p className="text-sm font-bold">{currentUser.xp} XP</p>
            </div>
            <div className="border-l border-white/20 pl-6">
              <p className="text-[11px] text-emerald-200 font-semibold">투자 예측 점수</p>
              <p className="text-sm font-bold text-amber-300">
                +{currentUser.predictionStats?.rankingScore || 0}pt
              </p>
            </div>
            <div className="border-l border-white/20 pl-6">
              <p className="text-[11px] text-emerald-200 font-semibold">총 종합점수</p>
              <p className="text-base font-black text-emerald-300">
                {myRanking.totalScore}점
              </p>
            </div>
          </div>
        </div>
      )}

      {/* USERS RANKING LIST */}
      <div className="space-y-3">
        {allRankings.map((userRank) => {
          const predScore = userRank.predictionScore || 0;
          const totalScore = userRank.totalScore || userRank.xp + predScore;
          const isMe = userRank.isMe;

          return (
            <div
              key={userRank.rank + '-' + userRank.name}
              className={`rounded-3xl p-5 border transition-all flex items-center justify-between ${
                isMe
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-4">
                {getRankBadge(userRank.rank)}

                <div className={`w-10 h-10 rounded-2xl font-bold text-sm flex items-center justify-center shrink-0 shadow-sm ${
                  isMe ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-white'
                }`}>
                  {userRank.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-slate-900">{userRank.name}</h3>
                    <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                      Lv.{userRank.level}
                    </span>
                    {isMe && (
                      <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                        내 계정
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>연속 {userRank.streak}일</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <TrendingUp className="w-3 h-3" /> 예측 {predScore}pt
                    </span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-base font-black text-slate-900">{totalScore}점</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  상위 {Math.min(100, Math.max(1, Math.round((userRank.rank / allRankings.length) * 100)))}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

