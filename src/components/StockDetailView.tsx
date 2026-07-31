import React, { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  RotateCw,
  TrendingDown,
  TrendingUp,
  Clock,
  BarChart3,
  DollarSign,
  Layers,
  PieChart,
  Database,
  Info,
  CheckCircle2,
  Server,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Brush,
} from 'recharts';
import { StockItem, TimeRange, StockChartPoint, StockDetailMetrics } from '../types';
import { fetchStockChartData, fetchStockMetrics } from '../services/stockService';

interface StockDetailViewProps {
  stock?: StockItem | null;
  onBack: () => void;
}

export const StockDetailView: React.FC<StockDetailViewProps> = ({ stock, onBack }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>('1D');
  const [chartData, setChartData] = useState<StockChartPoint[]>([]);
  const [metrics, setMetrics] = useState<StockDetailMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<string>('');

  const displayStock: StockItem = stock || {
    id: '005930',
    name: '삼성전자',
    ticker: '005930',
    price: '73,800',
    currency: 'KRW',
    changeRate: '+1.42%',
    isUp: true,
    category: '국내 IT 대표주',
  };

  const ticker = displayStock.ticker || '005930';

  // Load Data function
  const loadStockData = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const [mRes, cRes] = await Promise.all([
        fetchStockMetrics(ticker),
        fetchStockChartData(ticker, timeRange),
      ]);
      setMetrics(mRes);
      setChartData(cRes);
      setLastRefreshTime(new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (err) {
      console.error('Error fetching stock data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [ticker, timeRange]);

  useEffect(() => {
    loadStockData(false);
  }, [loadStockData]);

  // 30초 자동 새로고침 타이머
  useEffect(() => {
    const timer = setInterval(() => {
      loadStockData(true);
    }, 30000);

    return () => clearInterval(timer);
  }, [loadStockData]);

  const timeRanges: { key: TimeRange; label: string }[] = [
    { key: '1D', label: '1일' },
    { key: '1W', label: '1주' },
    { key: '1M', label: '1개월' },
    { key: '3M', label: '3개월' },
    { key: '1Y', label: '1년' },
  ];

  const isUp = metrics ? metrics.isUp : displayStock.isUp;
  const chartColor = isUp ? '#10B981' : '#EF4444'; // Green or Red

  // Formatting helpers
  const formatNumber = (num: number) => num.toLocaleString('ko-KR');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Back Button & Control Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>브리핑 목록으로 돌아가기</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            마지막 수신: {lastRefreshTime || '방금 전'}
          </span>
          <button
            onClick={() => loadStockData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all shadow-xs disabled:opacity-50"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>30초 수동 갱신</span>
          </button>
        </div>
      </div>

      {/* Stock Subheader & Title */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">{displayStock.name}</span>
            {displayStock.category && (
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                {displayStock.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5 flex items-center gap-2">
            {displayStock.ticker}
          </h1>

          <div className="flex items-baseline gap-3 mt-2 flex-wrap">
            <span className="text-3xl font-black text-slate-900">
              {metrics ? formatNumber(metrics.currentPrice) : displayStock.price}
            </span>
            <span className="text-xs font-bold text-slate-400">{displayStock.currency}</span>

            <div
              className={`flex items-center gap-1 font-extrabold text-sm px-3 py-1 rounded-full border ${
                isUp
                  ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                  : 'text-rose-600 bg-rose-50 border-rose-200'
              }`}
            >
              {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>
                {metrics
                  ? `${metrics.changeAmount >= 0 ? '+' : ''}${formatNumber(metrics.changeAmount)} (${metrics.changePercent.toFixed(2)}%)`
                  : displayStock.changeRate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex md:flex-col items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 text-right">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-emerald-700">실시간 차트 파이프라인 가동 중</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">30초 자동 동기화 적용</p>
        </div>
      </div>

      {/* Interactive Time Range Tabs */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-1.5">
          {timeRanges.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTimeRange(tab.key)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                timeRange === tab.key
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] font-semibold text-slate-400 pr-2 hidden sm:block">
          마우스 오버 / 하단 브러시 드래그 가능
        </span>
      </div>

      {/* Recharts Main Chart Container */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs relative">
        {isLoading ? (
          <div className="h-80 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-slate-500">실시간 차트 데이터를 불러오는 중...</p>
          </div>
        ) : (
          <div className="w-full h-80 min-h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 15, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStockGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 11, fill: '#64748B' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => formatNumber(v)}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as StockChartPoint;
                      return (
                        <div className="bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl border border-slate-800 space-y-1 font-sans">
                          <p className="text-slate-400 font-semibold text-[10px]">{data.time}</p>
                          <p className="font-extrabold text-sm text-emerald-400">
                            {formatNumber(data.price)} {displayStock.currency}
                          </p>
                          {data.volume && (
                            <p className="text-[10px] text-slate-300">
                              거래량: {formatNumber(data.volume)} 주
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={chartColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorStockGradient)"
                  isAnimationActive={true}
                />
                <Brush
                  dataKey="time"
                  height={22}
                  stroke="#CBD5E1"
                  fill="#F8FAFC"
                  tickFormatter={() => ''}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Real-time Financial Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <DollarSign className="w-3.5 h-3.5 text-slate-500" />
            시가
          </div>
          <p className="text-sm font-black text-slate-900">
            {metrics ? formatNumber(metrics.openPrice) : '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-500">
            <TrendingUp className="w-3.5 h-3.5" />
            고가
          </div>
          <p className="text-sm font-black text-rose-600">
            {metrics ? formatNumber(metrics.highPrice) : '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-500">
            <TrendingDown className="w-3.5 h-3.5" />
            저가
          </div>
          <p className="text-sm font-black text-blue-600">
            {metrics ? formatNumber(metrics.lowPrice) : '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            거래량
          </div>
          <p className="text-sm font-black text-slate-900">
            {metrics ? `${(metrics.volume / 10000).toFixed(0)}만` : '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            시가총액
          </div>
          <p className="text-sm font-black text-slate-900">
            {metrics ? metrics.marketCap : '-'}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
            <PieChart className="w-3.5 h-3.5 text-slate-500" />
            PER
          </div>
          <p className="text-sm font-black text-slate-900">
            {metrics ? `${metrics.per}배` : '-'}
          </p>
        </div>
      </div>

      {/* Stock Data API & Source Provider Transparency Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                주식 차트 API 및 데이터 출처 안내
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 연동 완료
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                본 서비스에서 제공하는 주식 차트의 데이터 수신처 및 API 연동 구조입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Server className="w-3 h-3 text-emerald-400" /> 사용 API 명
            </div>
            <p className="font-black text-slate-100 text-xs">
              {metrics?.dataSource?.apiName || 'Finnhub Stock REST API / KRX Pipeline'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Info className="w-3 h-3 text-blue-400" /> 데이터 수신 출처
            </div>
            <p className="font-black text-slate-100 text-xs">
              {metrics?.dataSource?.sourceProvider || '한국거래소(KRX) / Finnhub Global Exchanges'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1 sm:col-span-2 md:col-span-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" /> 갱신 동기화 주기
            </div>
            <p className="font-black text-slate-100 text-xs">
              {metrics?.dataSource?.updateInterval || '30초 실시간 주기 자동 동기화'}
            </p>
          </div>
        </div>

        <div className="bg-slate-800/50 p-3.5 rounded-2xl border border-slate-700/50 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
          <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            {metrics?.dataSource?.description ||
              'Finnhub API Key가 설정되어 있는 경우 Finnhub.io 실시간 시세 서버와 직접 통신하며, Key가 없는 경우 KRX 증시 연동 파이프라인 엔진을 통해 30초 주기로 부드럽게 실시간 차트를 동기화합니다.'}
          </span>
        </div>
      </div>
    </div>
  );
};
