import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, TrendingDown } from 'lucide-react';
import { mockStockData } from '../mockData';

interface StockChartModalProps {
  onBack: () => void;
}

export const StockChartModal: React.FC<StockChartModalProps> = ({ onBack }) => {
  const [period, setPeriod] = useState<'1일' | '5일' | '1개월' | '6개월' | '1년'>('5일');

  // Convert SVG coordinates for line chart
  const minVal = Math.min(...mockStockData.map((d) => d.value)) - 5;
  const maxVal = Math.max(...mockStockData.map((d) => d.value)) + 5;
  const width = 800;
  const height = 240;

  const points = mockStockData
    .map((d, index) => {
      const x = (index / (mockStockData.length - 1)) * width;
      const y = height - ((d.value - minVal) / (maxVal - minVal)) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="max-w-4xl w-full mx-auto space-y-6 pb-12">
      {/* Top Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 hover:text-black transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>브리핑으로</span>
      </button>

      {/* Main Stock Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">인베스코 QQQ 신탁</span>
          <button
            onClick={() => {}}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>새로고침</span>
          </button>
        </div>

        <h1 className="text-3xl font-serif font-bold text-gray-900 mt-1">QQQ</h1>

        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-3xl font-extrabold text-gray-900">670.15</span>
          <span className="text-sm font-semibold text-gray-500">USD</span>
          <div className="flex items-center gap-1 text-sm font-bold text-rose-600">
            <TrendingDown className="w-4 h-4" />
            <span>38.82 (5.48%)</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>실시간 시세</span>
        </div>
      </div>

      {/* Period Tabs */}
      <div className="flex items-center gap-2 pt-2">
        {(['1일', '5일', '1개월', '6개월', '1년'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              period === p
                ? 'bg-[#1a1c1e] text-white shadow-xs'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chart Box matching photo 2 */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs relative">
        <div className="w-full h-64">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Gradient Fill under path */}
            <polygon
              points={`0,${height} ${points} ${width},${height}`}
              fill="url(#chartGradient)"
            />

            {/* Line Path */}
            <polyline
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>

        {/* X Axis Time Labels */}
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 border-t border-gray-100 pt-3">
          <span>오전 01:15</span>
          <span>오후 10:45</span>
          <span>오전 02:45</span>
          <span>오전 12:15</span>
          <span>오전 04:15</span>
          <span>오전 01:45</span>
          <span>오후 11:32</span>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <p className="text-xs text-gray-400 leading-relaxed">
        시세는 Yahoo Finance 공개 데이터를 기반으로 하며, 실제 거래 기준 시세와 약간의 시차가 있을 수 있어요. 15초마다 자동으로 새로고침돼요.
      </p>
    </div>
  );
};
