import React from 'react';
import { AlertTriangle, Trash2, X, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-rose-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-rose-50 border-b border-rose-100 p-6 flex items-start justify-between relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shrink-0">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h2 className="text-lg font-black text-rose-950">계정 데이터 초기화</h2>
                <p className="text-xs text-rose-700 mt-0.5">주의: 게임 진행 데이터만 기본값으로 리셋됩니다.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-rose-400 hover:text-rose-700 p-1 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
            <p className="font-bold text-slate-900 text-sm">
              계정 데이터를 초기화하시겠습니까?
            </p>
            <p className="text-slate-600">
              초기화하면 아래 모든 학습 및 투자 게임 데이터가 초기 기본값으로 완전히 삭제됩니다.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <span className="font-bold text-slate-800 block mb-1">🔥 삭제 대상 데이터:</span>
              <ul className="grid grid-cols-2 gap-1.5 text-slate-600 list-disc list-inside text-[11px]">
                <li>보유 포인트</li>
                <li>레벨 (Lv.1)</li>
                <li>경험치 (0 XP)</li>
                <li>랭킹 점수 (0pt)</li>
                <li>업적 진행도</li>
                <li>도전과제 목록</li>
                <li>뉴스 예측 기록</li>
                <li>뉴스 읽은 기록</li>
                <li>관심사 및 태그</li>
                <li>프로필 통계 데이터</li>
              </ul>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
              <span>회원 계정 및 로그인 정보는 유지되며 게임 데이터만 리셋됩니다. 이 작업은 되돌릴 수 없습니다.</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-2xl transition-all text-xs"
            >
              취소
            </button>
            <button
              onClick={onConfirmReset}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-2xl transition-all text-xs shadow-lg shadow-rose-600/20 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              초기화 실행
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
