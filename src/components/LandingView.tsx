import React from 'react';
import { Target, Newspaper, LayoutGrid, Trophy, ArrowRight, Building, Handshake, LineChart, GraduationCap } from 'lucide-react';

interface LandingViewProps {
  onOpenLogin: () => void;
  onGoToApp: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onOpenLogin, onGoToApp }) => {
  return (
    <div className="w-full min-h-[calc(100vh-57px)] bg-[#fbfbfd] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full mx-auto space-y-16">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-block px-3.5 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-full border border-emerald-100/80">
              학생을 위한 AI 투자 학습 플랫폼
            </div>

            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-[1.25] tracking-tight">
              내가 좋아하는 종목으로,<br />
              경제를 <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">만화처럼</span> 읽는다.
            </h1>

            <p className="text-gray-600 text-base leading-relaxed max-w-xl">
              NVIDIA, 삼성전자, QQQ... 내가 고른 관심 종목의 뉴스를 AI가 매일 브리핑해줘요. 어려운 용어는 클릭 한 번으로, 어려운 기사는 4컷 만화로 쉽게 이해해요.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenLogin}
                className="px-7 py-3.5 bg-[#1a1c1e] hover:bg-black text-white font-medium text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>로그인</span>
                <span className="text-xs text-gray-400 font-normal">· 가입 30초 · 신용카드 필요 없음</span>
              </button>

              <button
                onClick={onGoToApp}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm rounded-2xl border border-gray-200 transition-all flex items-center gap-2 shadow-xs"
              >
                <span>브리핑 미리보기</span>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Right Cartoon Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-gray-100 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full border border-amber-100">
                  오늘의 브리핑
                </span>
                <div className="text-amber-400 text-xs">★★★★★</div>
              </div>

              <h3 className="font-serif font-bold text-gray-900 text-base mb-4 line-clamp-1">
                NVIDIA, 차세대 AI 칩 '루빈' 양산 일정 앞당긴다
              </h3>

              {/* 4 Panels Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center group hover:bg-emerald-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600">1컷: 속도전 개시</span>
                </div>

                <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center group hover:bg-emerald-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600">2컷: 왜 앞당길까</span>
                </div>

                <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center group hover:bg-emerald-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center mb-2">
                    <LineChart className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600">3컷: 메모리 반도체</span>
                </div>

                <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 p-4 flex flex-col items-center justify-center text-center group hover:bg-emerald-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-2">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-gray-600">4컷: 투자 영향</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-gray-400">클릭하면 만화 본문과 AI 용어해설이 열립니다</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards (4 Cards Grid matching photo 5) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">관심 종목 선택</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              산업, 기업, ETF까지 나만의 관심사를 골라요
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Newspaper className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">오늘의 브리핑</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              AI가 매일 관련 뉴스를 영향도와 함께 정리해요
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">4컷 만화 요약</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              어려운 기사를 만화로 30초 만에 이해해요
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">도전과제 & 보상</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              레벨업하고 배지, 이모티콘을 모아요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
