import React, { useState } from 'react';
import { 
  PredictionNews, 
  Prediction, 
  PredictionDifficulty, 
  PredictionType, 
  UserPredictionStats 
} from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Search, 
  Filter, 
  ArrowRight, 
  BarChart2, 
  Info,
  RotateCcw,
  Clock,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PredictionViewProps {
  newsList: PredictionNews[];
  userPredictions: Prediction[];
  stats: UserPredictionStats;
  onSubmitPrediction: (
    newsId: string, 
    type: PredictionType, 
    direction?: '상승' | '하락', 
    points?: number
  ) => void;
}

export const PredictionView: React.FC<PredictionViewProps> = ({
  newsList,
  userPredictions,
  stats,
  onSubmitPrediction,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('전체');
  const [selectedCompany, setSelectedCompany] = useState<string>('전체');
  const [activeNews, setActiveNews] = useState<PredictionNews | null>(null);
  const [predictionType, setPredictionType] = useState<PredictionType>('direction');
  const [selectedDirection, setSelectedDirection] = useState<'상승' | '하락'>('상승');
  const [inputPoints, setInputPoints] = useState<string>('');
  const [recentResult, setRecentResult] = useState<{
    news: PredictionNews;
    prediction: Prediction;
  } | null>(null);

  // Filter companies list
  const companies = ['전체', ...Array.from(new Set(newsList.map((n) => n.company)))];

  const filteredNews = newsList.filter((news) => {
    const diffMatch = selectedDifficulty === '전체' || news.difficulty === selectedDifficulty;
    const compMatch = selectedCompany === '전체' || news.company === selectedCompany;
    return diffMatch && compMatch;
  });

  const getNewsPrediction = (newsId: string) => {
    return userPredictions.find((p) => p.newsId === newsId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeNews) return;

    if (predictionType === 'points') {
      const pts = parseInt(inputPoints, 10);
      if (isNaN(pts)) {
        alert('올바른 포인트 숫자를 입력해주세요. (예: +20, -10)');
        return;
      }
      onSubmitPrediction(activeNews.id, 'points', pts >= 0 ? '상승' : '하락', pts);
    } else {
      onSubmitPrediction(activeNews.id, 'direction', selectedDirection, undefined);
    }

    // Find result after state tick
    const actualPts = activeNews.actualChange;
    const actualDir = activeNews.actualDirection;

    let earnedScore = 0;
    let isCorrect = false;
    let errorMargin = 0;

    if (predictionType === 'direction') {
      isCorrect = selectedDirection === actualDir;
      earnedScore = isCorrect ? 80 : 20;
    } else {
      const pts = parseInt(inputPoints, 10) || 0;
      errorMargin = Math.abs(pts - actualPts);
      if (errorMargin === 0) earnedScore = 100;
      else if (errorMargin <= 2) earnedScore = 90;
      else if (errorMargin <= 5) earnedScore = 70;
      else if (errorMargin <= 10) earnedScore = 50;
      else earnedScore = 20;
      isCorrect = errorMargin <= 5;
    }

    const newPrediction: Prediction = {
      id: `pred_${Date.now()}`,
      userId: 'user_1',
      newsId: activeNews.id,
      predictionType,
      predictedDirection: predictionType === 'direction' ? selectedDirection : (parseInt(inputPoints, 10) >= 0 ? '상승' : '하락'),
      predictedPoints: predictionType === 'points' ? parseInt(inputPoints, 10) : undefined,
      actualPoints: actualPts,
      earnedScore,
      earnedXp: earnedScore,
      isCorrect,
      errorMargin,
      submittedAt: '방금 전',
    };

    setRecentResult({
      news: activeNews,
      prediction: newPrediction,
    });

    setActiveNews(null);
    setInputPoints('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Stats Overview */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>실시간 AI 주가 예측 경기장</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              뉴스 보고 주가 변동 예측하기
            </h1>
            <p className="text-emerald-100/80 text-sm mt-1 max-w-xl leading-relaxed">
              최신 실시간 이슈 뉴스를 분석하고 상승/하락 방향이나 오차 포인트를 적중하여 연속 정답 보너스와 점수를 획득하세요!
            </p>
          </div>

          {/* User Score Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xs text-emerald-200 flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                연속 정답
              </div>
              <div className="text-xl font-extrabold text-amber-300 mt-0.5">
                {stats.currentStreak}연속
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xs text-emerald-200 flex items-center justify-center gap-1">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                적중률
              </div>
              <div className="text-xl font-extrabold text-white mt-0.5">
                {stats.accuracy.toFixed(1)}%
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xs text-emerald-200 flex items-center justify-center gap-1">
                <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
                평균 오차
              </div>
              <div className="text-xl font-extrabold text-blue-300 mt-0.5">
                {stats.averageError.toFixed(1)}pt
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 text-center">
              <div className="text-xs text-emerald-200 flex items-center justify-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                예측 점수
              </div>
              <div className="text-xl font-extrabold text-purple-300 mt-0.5">
                {stats.rankingScore}점
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-medium text-sm">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>조건 필터:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
            {['전체', '쉬움', '보통', '어려움'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedDifficulty === diff
                    ? 'bg-white text-emerald-700 shadow-sm font-bold'
                    : 'hover:text-slate-900'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Company Filter Dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="bg-slate-100 border border-slate-200 text-xs text-slate-800 font-medium rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {companies.map((comp) => (
              <option key={comp} value={comp}>
                {comp === '전체' ? '🏢 전체 종목/기업' : comp}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* News Grid (30 Items List) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.map((news) => {
          const userPred = getNewsPrediction(news.id);

          return (
            <div
              key={news.id}
              className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between hover:shadow-md ${
                userPred
                  ? 'border-slate-200 bg-slate-50/50'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-xs">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {news.company}
                    </span>
                    <span className="text-[11px] font-bold text-slate-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      📰 {news.source || '금융/시사 뉴스'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        news.difficulty === '쉬움'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : news.difficulty === '보통'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {news.difficulty}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {news.createdAt}
                  </span>
                </div>

                {/* News Title */}
                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 mb-2">
                  {news.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                  {news.content}
                </p>
              </div>

              {/* Action Button or Already Predicted Status */}
              <div className="pt-3 border-t border-slate-100 mt-2">
                {userPred ? (
                  <div className="flex items-center justify-between text-xs bg-slate-100/80 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                      {userPred.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                      <span>
                        예측 완료 ({userPred.predictionType === 'direction' ? userPred.predictedDirection : `${userPred.predictedPoints! > 0 ? '+' : ''}${userPred.predictedPoints}pt`})
                      </span>
                    </div>
                    <span className="font-extrabold text-emerald-600">
                      +{userPred.earnedScore}점
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveNews(news)}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm group"
                  >
                    <span>투자 예측 참여하기</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Prediction Modal */}
      <AnimatePresence>
        {activeNews && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100"
            >
              {/* Modal Header */}
              <div className="bg-slate-900 text-white p-6 relative">
                <button
                  onClick={() => setActiveNews(null)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-white text-xl"
                >
                  ✕
                </button>
                <div className="inline-flex items-center gap-2 flex-wrap bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-xs font-bold mb-2">
                  <span>{activeNews.company}</span>
                  <span>·</span>
                  <span>📰 출처: {activeNews.source || '금융/시사 뉴스'}</span>
                  <span>·</span>
                  <span>{activeNews.difficulty} 난이도</span>
                </div>
                <h2 className="text-lg font-bold leading-snug">{activeNews.title}</h2>
              </div>

              {/* News Body */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  {activeNews.content}
                </div>

                {/* Prediction Mode Select */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    예측 방식 선택
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPredictionType('direction')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        predictionType === 'direction'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ① 방향 예측 (상승/하락)
                    </button>

                    <button
                      type="button"
                      onClick={() => setPredictionType('points')}
                      className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        predictionType === 'points'
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-800 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Target className="w-4 h-4 text-indigo-600" />
                      ② 변동폭 포인트 예측
                    </button>
                  </div>
                </div>

                {/* Direction Mode UI */}
                {predictionType === 'direction' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      주가 방향을 선택해주세요
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedDirection('상승')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          selectedDirection === '상승'
                            ? 'border-emerald-500 bg-emerald-500 text-white font-bold shadow-md'
                            : 'border-slate-200 hover:border-emerald-300 text-slate-700'
                        }`}
                      >
                        <TrendingUp className="w-6 h-6" />
                        <span className="text-sm font-extrabold">상승 (Bullish)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedDirection('하락')}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                          selectedDirection === '하락'
                            ? 'border-rose-500 bg-rose-500 text-white font-bold shadow-md'
                            : 'border-slate-200 hover:border-rose-300 text-slate-700'
                        }`}
                      >
                        <TrendingDown className="w-6 h-6" />
                        <span className="text-sm font-extrabold">하락 (Bearish)</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Points Mode UI */}
                {predictionType === 'points' && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      예상 변동 포인트를 입력하세요 (양수: 상승 / 음수: 하락)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={inputPoints}
                        onChange={(e) => setInputPoints(e.target.value)}
                        placeholder="예: +21 또는 -15"
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 font-extrabold text-lg rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 text-center"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 text-center">
                      오차 0 = 100점 / 오차 1~2 = 90점 / 오차 3~5 = 70점 / 오차 6~10 = 50점
                    </p>
                  </div>
                )}

                {/* Submit Action */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  예측 제출 및 결과 확인
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Result Display Modal */}
      <AnimatePresence>
        {recentResult && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 md:p-8 border border-slate-100 text-center space-y-6"
            >
              {/* Animation Header */}
              <div className="flex flex-col items-center">
                {recentResult.prediction.isCorrect ? (
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 animate-bounce shadow-md">
                    <Sparkles className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                    <Info className="w-8 h-8" />
                  </div>
                )}

                <h2 className="text-2xl font-black text-slate-900">
                  {recentResult.prediction.isCorrect ? '🎉 예측 적중 성공!' : '📊 예측 분석 결과'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  실제 뉴스 결과와 오차를 분석했습니다.
                </p>
              </div>

              {/* Comparison Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">나의 예측</span>
                  <span className="font-bold text-slate-900">
                    {recentResult.prediction.predictionType === 'direction'
                      ? recentResult.prediction.predictedDirection
                      : `${recentResult.prediction.predictedPoints! > 0 ? '+' : ''}${recentResult.prediction.predictedPoints}pt`}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500 font-medium">실제 뉴스 결과</span>
                  <span className="font-extrabold text-emerald-600">
                    {recentResult.news.actualDirection} ({recentResult.news.actualChange > 0 ? '+' : ''}
                    {recentResult.news.actualChange}pt)
                  </span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">획득 예측 점수 / 경험치</span>
                  <span className="font-black text-purple-600 text-sm">
                    +{recentResult.prediction.earnedScore}점 (+{recentResult.prediction.earnedXp} XP)
                  </span>
                </div>
              </div>

              {/* Explanation Card */}
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl text-left">
                <h4 className="text-xs font-bold text-emerald-900 mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600" />
                  사후 해설 리포트
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {recentResult.news.explanation}
                </p>
              </div>

              <button
                onClick={() => setRecentResult(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-2xl transition-all text-xs"
              >
                확인 및 랭킹에 반영하기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
