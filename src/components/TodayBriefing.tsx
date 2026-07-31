import React, { useState } from 'react';
import { NewsArticle, User, StockItem } from '../types';
import { defaultStockList } from '../mockData';
import { 
  Sparkles, 
  TrendingDown, 
  TrendingUp,
  Star, 
  Tv, 
  Building2, 
  Smartphone, 
  HardDrive, 
  Car, 
  Package, 
  ChevronRight,
  Plus,
  Loader2,
  CheckCircle2,
  X
} from 'lucide-react';

interface TodayBriefingProps {
  user: User | null;
  articles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenStockDetail: (stock: StockItem) => void;
  onGenerateCustomCartoon: (topic: string, stock: string) => Promise<void>;
  isGenerating: boolean;
}

export const TodayBriefing: React.FC<TodayBriefingProps> = ({
  user,
  articles,
  onSelectArticle,
  onOpenStockDetail,
  onGenerateCustomCartoon,
  isGenerating,
}) => {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [customTopic, setCustomTopic] = useState('');
  const [customStock, setCustomStock] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<{
    title: string;
    symbol: string;
    easyAnalogy: string;
    description: string;
    relatedStocks: string[];
    keyPoint: string;
  } | null>(null);

  // Stock management state
  const [stocks, setStocks] = useState<StockItem[]>(defaultStockList);
  const [selectedStock, setSelectedStock] = useState<StockItem>(defaultStockList[0]);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [newStockName, setNewStockName] = useState('');
  const [newStockTicker, setNewStockTicker] = useState('');
  const [newStockCategory, setNewStockCategory] = useState('');

  // Dynamic Date calculation
  const getFormattedDate = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayName = days[today.getDay()];
    return `${month}월 ${date}일 ${dayName}요일`;
  };

  // Dynamic Time-of-day Greeting & Emoji calculation
  const getDynamicGreeting = () => {
    const today = new Date();
    const hour = today.getHours();
    const dayOfWeek = today.getDay();

    const greetingsMorning = [
      '좋은 아침이에요',
      '상쾌한 아침이에요',
      '활기찬 아침이에요',
      '기분 좋은 아침이에요',
    ];
    const greetingsAfternoon = [
      '즐거운 오후예요',
      '활력 넘치는 오후예요',
      '알찬 오후예요',
      '여유로운 오후예요',
    ];
    const greetingsEvening = [
      '편안한 저녁이에요',
      '수고 많으셨던 하루예요',
      '여유로운 저녁이에요',
      '포근한 밤이에요',
    ];

    let text = '';
    let emoji = '☀️';

    if (hour >= 5 && hour < 12) {
      text = greetingsMorning[dayOfWeek % greetingsMorning.length];
      emoji = '☀️';
    } else if (hour >= 12 && hour < 18) {
      text = greetingsAfternoon[dayOfWeek % greetingsAfternoon.length];
      emoji = '🌤️';
    } else {
      text = greetingsEvening[dayOfWeek % greetingsEvening.length];
      emoji = '🌙';
    }

    return { text, emoji };
  };

  const { text: greetingText, emoji: greetingEmoji } = getDynamicGreeting();

  // Handle adding new stock
  const handleAddStockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStockName.trim()) return;

    const ticker = newStockTicker.trim() || newStockName.substring(0, 5).toUpperCase();
    const isUpRandom = Math.random() > 0.4;
    const randomPrice = (Math.random() * 200 + 50).toFixed(2);
    const randomChange = (Math.random() * 4 + 0.1).toFixed(2) + '%';

    const newStock: StockItem = {
      id: `stock_${Date.now()}`,
      name: newStockName.trim(),
      ticker: ticker,
      price: randomPrice,
      currency: 'USD',
      changeRate: randomChange,
      isUp: isUpRandom,
      category: newStockCategory.trim() || '관심 종목',
    };

    setStocks((prev) => [...prev, newStock]);
    setSelectedStock(newStock);
    setNewStockName('');
    setNewStockTicker('');
    setNewStockCategory('');
    setShowAddStockModal(false);
  };

  // Icon mapping
  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'chip':
        return <Tv className="w-5 h-5 text-gray-700" />;
      case 'bank':
        return <Building2 className="w-5 h-5 text-gray-700" />;
      case 'phone':
        return <Smartphone className="w-5 h-5 text-gray-700" />;
      case 'box':
        return <HardDrive className="w-5 h-5 text-gray-700" />;
      case 'car':
        return <Car className="w-5 h-5 text-gray-700" />;
      default:
        return <Package className="w-5 h-5 text-gray-700" />;
    }
  };

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim()) return;
    onGenerateCustomCartoon(customTopic, customStock);
    setCustomTopic('');
    setShowInput(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Date & Dynamic User Greeting */}
      <div>
        <p className="text-xs font-semibold text-gray-400 mb-1">{getFormattedDate()}</p>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          {greetingText}, {user?.name || '방문자'}님 <span className="text-2xl">{greetingEmoji}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          관심 종목과 관련된 뉴스 {articles.length}개와 4컷 만화를 준비했어요.
        </p>
      </div>

      {/* Stock Selection & Addition Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500">관심 종목 선택</span>
          <button
            onClick={() => setShowAddStockModal(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 transition-all flex items-center gap-1 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>종목 추가</span>
          </button>
        </div>

        {/* Stock Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {stocks.map((stock) => {
            const isSelected = selectedStock.id === stock.id;
            return (
              <button
                key={stock.id}
                onClick={() => setSelectedStock(stock)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gray-950 text-white border-gray-950 shadow-2xs'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border-gray-200/80'
                }`}
              >
                <span>{stock.ticker}</span>
                <span
                  className={`text-[10px] ${
                    isSelected
                      ? stock.isUp
                        ? 'text-emerald-300'
                        : 'text-red-300'
                      : stock.isUp
                      ? 'text-emerald-600'
                      : 'text-red-500'
                  }`}
                >
                  {stock.isUp ? `+${stock.changeRate}` : `-${stock.changeRate}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Active Stock Summary Card */}
      <div 
        onClick={() => onOpenStockDetail(selectedStock)}
        className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-gray-400">{selectedStock.name}</p>
              {selectedStock.category && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.2 rounded-md">
                  {selectedStock.category}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <h2 className="text-xl font-extrabold text-gray-900">{selectedStock.ticker}</h2>
              <span className="text-base font-bold text-gray-800">
                {selectedStock.price} {selectedStock.currency}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 font-bold text-sm px-3 py-1 rounded-full border ${
              selectedStock.isUp
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                : 'text-red-600 bg-red-50 border-red-100'
            }`}
          >
            {selectedStock.isUp ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{selectedStock.changeRate}</span>
          </div>
        </div>

        {/* Dynamic Sparkline SVG */}
        <div className="h-12 w-full mt-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 40">
            <path
              d={
                selectedStock.isUp
                  ? 'M 0,35 Q 30,28 60,30 T 120,20 T 180,22 T 240,10 T 300,5'
                  : 'M 0,10 Q 30,5 60,18 T 120,12 T 180,28 T 240,22 T 300,35'
              }
              fill="none"
              stroke={selectedStock.isUp ? '#10B981' : '#EF4444'}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* MODAL TO ADD CUSTOM STOCK */}
      {showAddStockModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>새 관심 종목 추가</span>
              </h3>
              <button
                onClick={() => setShowAddStockModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStockSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  종목명 / 회사명 <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="예: 현대차, MSFT, 비트코인 ETF"
                  value={newStockName}
                  onChange={(e) => setNewStockName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">티커 / 코드</label>
                  <input
                    type="text"
                    placeholder="예: 005380, MSFT"
                    value={newStockTicker}
                    onChange={(e) => setNewStockTicker(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">테마 / 섹터</label>
                  <input
                    type="text"
                    placeholder="예: 자동차, AI"
                    value={newStockCategory}
                    onChange={(e) => setNewStockCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStockModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!newStockName.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl disabled:opacity-50 shadow-xs"
                >
                  종목 추가
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Real-time Briefing Banner */}
      <div className="bg-gradient-to-r from-emerald-50/60 to-teal-50/40 rounded-3xl p-5 border border-emerald-100/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">AI 실시간 브리핑</h3>
              <p className="text-xs text-gray-500">
                커스텀 관심 종목 뉴스를 실제로 검색해서 만화로 만들어드려요
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInput(!showInput)}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white/80 rounded-full transition-colors"
              title="새 주제로 만화 만들기"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAiEnabled(!aiEnabled)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                aiEnabled ? 'bg-emerald-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  aiEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Form to request AI Gemini 4-panel cartoon */}
        {showInput && (
          <form onSubmit={handleGenerateSubmit} className="mt-3 pt-3 border-t border-emerald-200/50 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="궁금한 뉴스 주제 (예: 한국은행 금리인하, 엔비디아 실적발표)"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                className="flex-1 bg-white text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="text"
                placeholder="종목 (선택)"
                value={customStock}
                onChange={(e) => setCustomStock(e.target.value)}
                className="w-28 bg-white text-xs px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={isGenerating || !customTopic.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-50 shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>생성중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>4컷 만화 생성</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Briefing List Section Header */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-lg font-bold text-gray-900">오늘의 브리핑</h2>
        <span className="text-xs text-gray-400 font-medium">영향도 높은 순</span>
      </div>

      {/* News Article List Cards */}
      <div className="space-y-3">
        {articles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white rounded-3xl p-5 border border-gray-100 hover:border-gray-300/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-start gap-4">
              {/* Left Icon Square */}
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0 group-hover:bg-gray-200 transition-colors">
                {getCategoryIcon(article.iconType)}
              </div>

              {/* Center Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {article.category}
                  </span>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/80 flex items-center gap-1">
                    📰 출처: {article.source}
                  </span>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    {article.readStatus && (
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    )}
                    {article.readStatus ? '읽음' : '미읽음'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 group-hover:text-black line-clamp-1">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-400">
                  게시: {article.publishedTime} · 소요시간: {article.readTime}
                </p>

                {/* Stars & Impact Rating */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < article.impactRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-200 fill-gray-100'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">
                    영향도 {article.impactRating >= 5 ? '매우 높음' : '높음'}
                  </span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors shrink-0" />
          </div>
        ))}
      </div>

      {/* AI Concept Recommendation Box at Bottom */}
      <div className="bg-indigo-50/50 rounded-3xl p-5 border border-indigo-100/70 space-y-3">
        <div>
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">AI 개념 추천</span>
          <h3 className="text-base font-bold text-gray-900 mt-0.5">
            이 개념들, 조금 더 살펴볼까요?
          </h3>
          <p className="text-xs text-gray-500">클릭하시면 초보자도 이해하기 쉬운 개념 해설 팝업이 열립니다.</p>
        </div>

        <div className="space-y-2">
          {/* Concept Item 1 */}
          <div 
            onClick={() => setSelectedConcept({
              title: 'GPU (Graphic Processing Unit)',
              symbol: '🍕',
              easyAnalogy: '수백 명의 일꾼이 동시에 계산을 나눠서 수행하는 고속 멀티 작업반!',
              description: 'AI 딥러닝과 대규모 연산에 필수적인 핵심 반도체입니다. 엔비디아가 대표적이며, AI 시대에 수요가 급증하고 있습니다.',
              relatedStocks: ['NVIDIA', 'SK하이닉스', '삼성전자'],
              keyPoint: '차세대 AI 칩 루빈에 탑재되는 핵심 연산장치'
            })}
            className="bg-white rounded-2xl p-3.5 border border-gray-100 flex items-center justify-between hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-xs">
                🍕
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">GPU (그래픽 처리 장치)</p>
                <p className="text-[11px] text-gray-500">AI 연산의 핵심 반도체 개념 쉬운 해설 보기</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl flex items-center gap-1">
              개념 해설 💡
            </span>
          </div>

          {/* Concept Item 2 */}
          <div 
            onClick={() => setSelectedConcept({
              title: 'ETF (Exchange Traded Fund)',
              symbol: '📦',
              easyAnalogy: '여러 주식을 한 박스에 묶어 주식시장에서 과일 세트처럼 거래하는 펀드!',
              description: '개별 기업에 투자하는 위험을 줄이고, 다양한 우량 기업에 분산 투자할 수 있는 상장지수펀드입니다.',
              relatedStocks: ['KODEX 200', 'TIGER 미국S&P500', 'QQQ'],
              keyPoint: '금리 변동 및 증시 흐름에 안정적으로 투자하는 핵심 수단'
            })}
            className="bg-white rounded-2xl p-3.5 border border-gray-100 flex items-center justify-between hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                📦
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">ETF (상장지수펀드)</p>
                <p className="text-[11px] text-gray-500">분산 투자와 증시 지수 추종의 기본 개념</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl flex items-center gap-1">
              개념 해설 💡
            </span>
          </div>

          {/* Concept Item 3 */}
          <div 
            onClick={() => setSelectedConcept({
              title: 'HBM (High Bandwidth Memory)',
              symbol: '⚡',
              easyAnalogy: '데이터가 오가는 도로를 100차선으로 대폭 넓힌 초고속 메모리 고속도로!',
              description: 'GPU 옆에 수직으로 쌓아 올려 대용량 데이터를 지연 없이 빠르게 송수신하는 고대역폭 메모리 기술입니다.',
              relatedStocks: ['SK하이닉스', '삼성전자', '한미반도체'],
              keyPoint: 'AI 반도체 시장의 승패를 가르는 핵심 메모리 규격'
            })}
            className="bg-white rounded-2xl p-3.5 border border-gray-100 flex items-center justify-between hover:border-indigo-300 hover:shadow-md cursor-pointer transition-all shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                ⚡
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">HBM (고대역폭 메모리)</p>
                <p className="text-[11px] text-gray-500">차세대 AI 메모리의 필수 핵심 규격</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xl flex items-center gap-1">
              개념 해설 💡
            </span>
          </div>
        </div>
      </div>

      {/* Concept Explanation Modal Popup */}
      {selectedConcept && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-indigo-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
              <button
                onClick={() => setSelectedConcept(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                ✕
              </button>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-3">
                {selectedConcept.symbol}
              </div>
              <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full">
                핵심 금융 개념 레슨
              </span>
              <h2 className="text-xl font-extrabold mt-1">{selectedConcept.title}</h2>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              {/* Easy Analogy */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 space-y-1">
                <span className="font-extrabold text-amber-900 text-xs flex items-center gap-1">
                  💡 초등학생도 이해하는 1초 쉬운 비유
                </span>
                <p className="text-slate-800 font-bold leading-relaxed">
                  "{selectedConcept.easyAnalogy}"
                </p>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-xs">📖 상세 개념 정의</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedConcept.description}
                </p>
              </div>

              {/* Key Point */}
              <div className="space-y-1">
                <span className="font-bold text-slate-900 text-xs">🎯 왜 지금 중요할까요?</span>
                <p className="text-indigo-900 font-semibold bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
                  {selectedConcept.keyPoint}
                </p>
              </div>

              {/* Related Stocks */}
              <div className="space-y-1.5 pt-1">
                <span className="font-bold text-slate-900 text-xs">📈 관련 주요 종목 / 관련주</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedConcept.relatedStocks.map((stock, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-800 font-extrabold text-[11px] px-2.5 py-1 rounded-lg border border-slate-200">
                      {stock}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedConcept(null)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all text-xs"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
