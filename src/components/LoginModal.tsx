import React, { useState } from 'react';
import { X, Sparkles, LogIn, Lock, Mail, User as UserIcon, Check, ArrowRight } from 'lucide-react';
import { User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('email');
  const [name, setName] = useState('정민균');
  const [password, setPassword] = useState('password123');

  const demoAccounts: User[] = [
    {
      id: 'usr_iseul',
      name: '정민균',
      avatar: '이',
      level: 2,
      xp: 50,
      nextLevelXp: 500,
      streakDays: 3,
      interests: ['바이오', '테슬라', 'QQQ', '엔비디아'],
      readArticlesCount: 6,
      earnedBadgesCount: 1,
    },
    {
      id: 'usr_chulsoo',
      name: '김철수',
      email: 'chulsoo@centland.com',
      avatar: '김',
      level: 5,
      xp: 1250,
      nextLevelXp: 2000,
      streakDays: 14,
      interests: ['반도체', '애플', 'S&P500'],
      readArticlesCount: 24,
      earnedBadgesCount: 4,
    },
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim() || '신규 사용자',
      email: email.trim() || 'user@centland.com',
      avatar: (name.trim() || '신').charAt(0),
      level: 1,
      xp: 0,
      nextLevelXp: 500,
      streakDays: 0,
      interests: ['반도체', 'AI', '글로벌 증시'],
      readArticlesCount: 0,
      earnedBadgesCount: 0,
      predictionStats: {
        accuracy: 0,
        averageError: 0,
        totalPredictions: 0,
        correctPredictions: 0,
        currentStreak: 0,
        bestStreak: 0,
        rankingScore: 0,
      }
    };
    onLoginSuccess(newUser);
    onClose();
  };

  const handleSelectDemo = (demoUser: User) => {
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 space-y-5 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-black text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
              C
            </div>
            <div>
              <h2 className="font-serif font-bold text-base text-gray-900 leading-tight">
                CentLand {isSignUp ? '회원가입' : '로그인'}
              </h2>
              <p className="text-[11px] text-gray-400">AI 투자 만화 학습 시작하기</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-1 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Account Selector */}
        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            ⚡ 원클릭 데모 계정으로 체험
          </label>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.id}
                type="button"
                onClick={() => handleSelectDemo(acc)}
                className="bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 p-2.5 rounded-2xl flex items-center gap-2 text-left transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {acc.avatar}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-gray-900 group-hover:text-emerald-800 transition-colors truncate">
                    {acc.name}
                  </p>
                  <p className="text-[10px] text-gray-400">Lv.{acc.level} · {acc.streakDays}일 연속</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative text-center my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative bg-white px-2 text-[10px] font-bold text-gray-400">
            또는 이메일 직접 입력
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-3">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">이름</label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 사용자"
                  className="w-full bg-gray-50 border border-gray-200 text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">이메일 주소</label>
            <div className="relative">
              <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-gray-50 border border-gray-200 text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">비밀번호</label>
            <div className="relative">
              <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-50 border border-gray-200 text-xs pl-9 pr-3 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-950 hover:bg-black text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-[0.98]"
          >
            <LogIn className="w-4 h-4" />
            <span>{isSignUp ? '회원가입 완료 및 시작' : '로그인 하기'}</span>
          </button>
        </form>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center pt-1 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            {isSignUp ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 10초 회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
};
