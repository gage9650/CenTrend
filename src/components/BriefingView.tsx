import React, { useState } from 'react';
import { RefreshCw, Sparkles, Star, ChevronRight, TrendingDown, Cpu, Landmark, Smartphone, Car, Box, Layers, Send, Loader2 } from 'lucide-react';
import { NewsArticle, User } from '../types';

interface BriefingViewProps {
  user: User | null;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenStockChart: () => void;
  onGenerateCustomCartoon: (topic: string) => Promise<void>;
  isGenerating: boolean;
}

export const BriefingView: React.FC<BriefingViewProps> = ({
  user,
  articles,
  onSelectArticle,
  onOpenStockChart,
  onGenerateCustomCartoon,
  isGenerating,
}) => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [customTopic, setCustomTopic] = useState('');

  const renderIcon = (type: NewsArticle['iconType']) => {
    switch (type) {
      case 'chip':
        return <Cpu className="w-5 h-5 text-gray-700" />;
      case 'bank':
        return <Landmark className="w-5 h-5 text-gray-700" />;
      case 'phone':
        return <Smartphone className="w-5 h-5 text-gray-700" />;
      case 'car':
        return <Car className="w-5 h-5 text-gray-700" />;
      case 'box':
        return <Box className="w-5 h-5 text-gray-700" />;
      default:
        return <Layers className="w-5 h-5 text-gray-700" />;
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim() || isGenerating) return;
    onGenerateCustomCartoon(customTopic);
    setCustomTopic('');
  };

  return (
    <div className="max-w-4xl w-full mx-auto space-y-8 pb-12">
      {/* Date and Greeting Header */}
      <div>
        <div className="text-xs text-gray-500 font-medium mb-1">7월 28일 화요일</div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 flex items-center gap-2">
          좋은 아침이에요, {user?.name || '방문자'}님 ☀️
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          관심 종목과 관련된 뉴스 {articles.length}개를 준비했어요.
        </p>
      </div>

      {/* Stock Mini Card (Invesco QQQ) */}
      <div 
        onClick={onOpenStockChart}
        className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer max-w-xs group"
      >
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>인베스코 QQQ 신탁</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-bold text-gray-900 text-lg group-hover:text-emerald-700 transition-colors">QQQ</span>
          <div className="flex items-center gap-1 text-xs font-semibold text-rose-600">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>5.41%</span>
          </div>
        </div>

        {/* Red Sparkline SVG */}
        <div className="w-full h-10 pt-1">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
            <path
              d="M 0,10 Q 20,5 40,15 T 80,25 T 120,20 T 160,35 T 200,32"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* AI Realtime Briefing Control Panel */}
      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI 실시간 브리핑 & 4컷만화 생성기</h3>
              <p className="text-xs text-gray-500">
                원하는 종목 뉴스나 경제 키워드를 입력하시면 AI가 즉시 4컷 만화로 재구성해드려요.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {}}
              title="새로고침"
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-emerald-100/60 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Toggle Switch */}
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`w-11 h-6 rounded-full transition-colors p-1 relative flex items-center ${
                aiEnabled ? 'bg-emerald-700' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  aiEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Custom AI Comic Generator Input */}
        {aiEnabled && (
          <form onSubmit={handleCustomSubmit} className="flex gap-2 pt-1">
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="예: 금리 인하 소식, 테슬라 로보택시, 삼성전자 실적..."
              className="flex-1 px-4 py-2 bg-white rounded-xl border border-emerald-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-emerald-600 transition-all"
            />
            <button
              type="submit"
              disabled={isGenerating || !customTopic.trim()}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>만화 그리는 중...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>AI 만화 생성</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Briefing Section Title */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h2 className="font-serif font-bold text-xl text-gray-900">오늘의 브리핑</h2>
        <span className="text-xs text-gray-400">영향도 높은 순</span>
      </div>

      {/* Articles List (6 Cards) */}
      <div className="space-y-3">
        {articles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
          >
            {/* Left Category Icon */}
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 transition-colors">
              {renderIcon(art.iconType)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                  {art.category}
                </span>
                {art.readStatus && (
                  <span className="text-[11px] text-gray-400">읽음</span>
                )}
              </div>

              <h3 className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-emerald-800 transition-colors truncate">
                {art.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span>{art.source}</span>
                <span>·</span>
                <span>{art.publishedTime}</span>
                <span>·</span>
                <span>{art.readTime}</span>
                <span className="hidden sm:inline">·</span>
                {/* Rating Stars */}
                <div className="hidden sm:flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < art.impactRating ? 'fill-amber-400' : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] text-gray-500 ml-1">
                    영향도 {art.impactRating >= 5 ? '매우 높음' : art.impactRating >= 4 ? '높음' : '보통'}
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
          </div>
        ))}
      </div>

      {/* AI Recommendation Section at Bottom */}
      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
        <div className="text-xs font-semibold text-blue-800">AI 추천</div>
        <h3 className="font-serif font-bold text-gray-900 text-base">
          이 개념들, 조금 더 살펴볼까요?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-white rounded-xl border border-blue-100 p-3.5 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                💡
              </div>
              <div>
                <div className="font-bold text-xs text-gray-900">GPU</div>
                <div className="text-[11px] text-gray-500 line-clamp-1">
                  NVIDIA, 차세대 AI 칩 '루빈' 양산 일정 앞당긴다
                </div>
              </div>
            </div>
            <button className="text-xs text-blue-600 font-semibold flex items-center gap-0.5 hover:underline shrink-0">
              읽어보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-blue-100 p-3.5 flex items-center justify-between hover:border-blue-300 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                📦
              </div>
              <div>
                <div className="font-bold text-xs text-gray-900">ETF</div>
                <div className="text-[11px] text-gray-500 line-clamp-1">
                  미국 중앙은행, 이번 달 금리 동결... 시장은 '안도'
                </div>
              </div>
            </div>
            <button className="text-xs text-blue-600 font-semibold flex items-center gap-0.5 hover:underline shrink-0">
              읽어보기 <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
