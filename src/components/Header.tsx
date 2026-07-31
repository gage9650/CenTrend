import React from 'react';
import { User } from '../types';
import { Flame, LogIn, LogOut, User as UserIcon, Download } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  isLanding: boolean;
  setIsLanding: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenLogin,
  onLogout,
  onNavigateHome,
  isLanding,
  setIsLanding,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center justify-between shadow-xs">
      {/* Brand Logo */}
      <div 
        onClick={() => {
          setIsLanding(false);
          onNavigateHome();
        }}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
          C
        </div>
        <span className="font-serif text-xl font-bold tracking-tight text-gray-900 group-hover:text-black">
          CentLand
        </span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        

        {isLanding ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLanding(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            >
              대시보드로
            </button>
            {user ? (
              <div className="flex items-center gap-2 border-l pl-3 border-gray-200">
                <span className="text-sm font-medium text-gray-800">{user.name}님</span>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-gray-100"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 hover:bg-black rounded-full transition-colors shadow-xs"
              >
                로그인
              </button>
            )}
          </div>
        ) : (
          <>
            {user && (
              <>
                {/* Flame / Streak Badge */}
                <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-xs font-semibold border border-red-100">
                  <Flame className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{user.streakDays}일 연속</span>
                </div>

                {/* Level Badge */}
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-100">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.level}
                  </span>
                  <span>Lv.{user.level}</span>
                </div>
              </>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-800 bg-gray-100 rounded-full border border-gray-200">
                  <UserIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gray-900 hover:bg-black rounded-full transition-all shadow-xs"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>로그인</span>
              </button>
            )}
          </>
        )}
      </div>
    </header>
  );
};
