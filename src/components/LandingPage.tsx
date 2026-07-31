import React from 'react';
import { 
  Building2, 
  Handshake, 
  TrendingUp, 
  GraduationCap, 
  Target, 
  Newspaper, 
  Image as ImageIcon, 
  Trophy,
  Star,
  LogIn
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onGoDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin, onGoDashboard }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-900 flex flex-col justify-between p-6 sm:p-12 animate-fade-in">
      {/* Top Header */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black text-white font-serif font-bold text-lg flex items-center justify-center shadow-xs">
            C
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-gray-900">CentLand</span>
        </div>

        <button
          onClick={onGoDashboard}
          className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-full transition-all shadow-2xs"
        >
          대시보드로
        </button>
      </div>

      {/* Main Hero Section */}
      <div className="max-w-6xl mx-auto w-full my-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Copy */}
        <div className="space-y-6">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-200/60">
            학생을 위한 AI 투자 학습 플랫폼
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.2] font-serif text-gray-950">
            내가 좋아하는 종목으로,<br />
            경제를 <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy underline-offset-8">만화처럼</span> 읽는다.
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal max-w-xl">
            NVIDIA, 삼성전자, QQQ... 내가 고른 관심 종목의 뉴스를 AI가 매일 브리핑해줘요. 어려운 용어는 클릭 한 번으로, 어려운 기사는 4컷 만화로 쉽게 이해해요.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onOpenLogin}
              className="bg-gray-950 hover:bg-black text-white text-sm font-bold px-7 py-3.5 rounded-2xl flex items-center gap-2 shadow-md transition-all hover:scale-[1.02]"
            >
              <LogIn className="w-4 h-4" />
              <span>로그인</span>
            </button>
            <span className="text-xs text-gray-400 font-medium">
              가입 30초 · 신용카드 필요 없음
            </span>
          </div>
        </div>

        {/* Right 4-Panel Comic Card Preview Mockup (Matching Image 5) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xl max-w-md w-full space-y-4 transform hover:rotate-1 transition-transform">
            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-[11px] font-extrabold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md border border-amber-100">
                오늘의 브리핑
              </span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>

            <h3 className="text-sm font-extrabold text-gray-900 leading-snug">
              NVIDIA, 차세대 AI 칩 ‘루빈’ 양산 일정 앞당긴다
            </h3>

            {/* 4 Comic Panels Mockup Boxes */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Panel 1 */}
              <div className="bg-gray-50 rounded-2xl h-28 border border-gray-100 flex flex-col items-center justify-center p-3 text-center">
                <Building2 className="w-7 h-7 text-amber-600 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">1컷: 속도전</span>
              </div>

              {/* Panel 2 */}
              <div className="bg-gray-50 rounded-2xl h-28 border border-gray-100 flex flex-col items-center justify-center p-3 text-center">
                <Handshake className="w-7 h-7 text-emerald-600 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">2컷: 수요 폭발</span>
              </div>

              {/* Panel 3 */}
              <div className="bg-gray-50 rounded-2xl h-28 border border-gray-100 flex flex-col items-center justify-center p-3 text-center">
                <TrendingUp className="w-7 h-7 text-indigo-600 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">3컷: K-반도체</span>
              </div>

              {/* Panel 4 */}
              <div className="bg-gray-50 rounded-2xl h-28 border border-gray-100 flex flex-col items-center justify-center p-3 text-center">
                <GraduationCap className="w-7 h-7 text-blue-600 mb-1" />
                <span className="text-[10px] font-bold text-gray-500">4컷: 투자 포인트</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Feature Cards - Image 5 */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
        {/* Feature 1 */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">관심 종목 선택</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            산업, 기업, ETF까지 나만의 관심사를 골라요
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Newspaper className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">오늘의 브리핑</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            AI가 매일 관련 뉴스를 영향도와 함께 정리해요
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">4컷 만화 요약</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            어려운 기사를 만화로 30초 만에 이해해요
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white/80 backdrop-blur-xs rounded-3xl p-5 border border-gray-200/80 shadow-2xs space-y-2">
          <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-gray-900">도전과제 & 보상</h4>
          <p className="text-xs text-gray-500 leading-relaxed">
            레벨업하고 배지, 이모티콘을 모아요
          </p>
        </div>
      </div>
    </div>
  );
};
