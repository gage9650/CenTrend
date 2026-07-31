import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, Share2, Sparkles, Building, Handshake, LineChart, GraduationCap, Car, Box, Cpu, Landmark, Send, Check } from 'lucide-react';
import { NewsArticle, Comment, User } from '../types';

interface CartoonModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  user: User | null;
  onShareToCommunity: (article: NewsArticle) => void;
}

export const CartoonModal: React.FC<CartoonModalProps> = ({
  article,
  onClose,
  user,
  onShareToCommunity,
}) => {
  const [likes, setLikes] = useState(article?.likesCount || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'cm-1',
      authorName: '주린이탈출',
      authorAvatar: '주',
      authorLevel: 3,
      content: '4컷 만화로 보니까 중요한 핵심 흐름이 한눈에 들어오네요! 강추입니다!',
      createdAt: '10분 전',
      likes: 5,
    },
    {
      id: 'cm-2',
      authorName: '투자개미',
      authorAvatar: '투',
      authorLevel: 5,
      content: '어려운 반도체 용어들이 말풍선에 잘 풀어져 있어서 넘 재미있어요.',
      createdAt: '2분 전',
      likes: 2,
    }
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [selectedKeyTerm, setSelectedKeyTerm] = useState<{ term: string; def: string } | null>(null);
  const [isShared, setIsShared] = useState(false);

  if (!article) return null;

  const handleToggleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: Comment = {
      id: 'cm_' + Date.now(),
      authorName: user?.name || '익명 유저',
      authorAvatar: user?.avatar || '익',
      authorLevel: user?.level || 1,
      content: newCommentText.trim(),
      createdAt: '방금 전',
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleShare = () => {
    onShareToCommunity(article);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2500);
  };

  const renderVisualIcon = (iconName?: string) => {
    switch (iconName) {
      case 'building':
        return <Building className="w-6 h-6 text-amber-600" />;
      case 'handshake':
        return <Handshake className="w-6 h-6 text-emerald-600" />;
      case 'chart':
        return <LineChart className="w-6 h-6 text-rose-600" />;
      case 'graduation':
        return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 'car':
        return <Car className="w-6 h-6 text-purple-600" />;
      case 'box':
        return <Box className="w-6 h-6 text-amber-700" />;
      case 'chip':
        return <Cpu className="w-6 h-6 text-emerald-700" />;
      default:
        return <Landmark className="w-6 h-6 text-gray-700" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-100">
              {article.category} 4컷 만화
            </span>
            <span className="text-xs text-gray-400">{article.source} · {article.publishedTime}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 leading-snug">
            {article.title}
          </h2>

          <p className="text-xs sm:text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
            💡 <span className="font-semibold text-gray-800">요약:</span> {article.summary}
          </p>
        </div>

        {/* 4 Panels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {article.cartoonPanels.map((panel) => (
            <div
              key={panel.panelNumber}
              className="bg-[#fcfcfd] rounded-2xl border border-gray-200 p-4 space-y-3 relative hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-gray-900">
                  {panel.title}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {renderVisualIcon(panel.visualIcon)}
                </div>
              </div>

              {/* Scene Description */}
              <p className="text-xs text-gray-500 leading-relaxed italic">
                "{panel.sceneDescription}"
              </p>

              {/* Speech Bubble */}
              <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-3 relative text-xs font-medium text-emerald-950 shadow-2xs">
                {panel.characterSpeaker && (
                  <span className="block text-[10px] font-bold text-emerald-800 mb-0.5">
                    🗣️ {panel.characterSpeaker}
                  </span>
                )}
                "{panel.speechBubble}"
              </div>

              {/* Key Term Tag */}
              {panel.keyTerm && (
                <button
                  onClick={() =>
                    setSelectedKeyTerm({
                      term: panel.keyTerm!,
                      def: panel.keyTermDefinition || '경제 용어 설명입니다.',
                    })
                  }
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors self-start"
                >
                  <span>🔍 {panel.keyTerm}</span>
                  <span className="text-[9px] text-amber-600">(해설보기)</span>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Key Term Explanation Tooltip/Modal if selected */}
        {selectedKeyTerm && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start justify-between">
            <div>
              <h4 className="font-bold text-xs text-amber-900 mb-1">
                📖 핵심 용어: {selectedKeyTerm.term}
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                {selectedKeyTerm.def}
              </p>
            </div>
            <button
              onClick={() => setSelectedKeyTerm(null)}
              className="text-amber-700 hover:text-amber-950 font-bold text-xs p-1"
            >
              닫기
            </button>
          </div>
        )}

        {/* Key Takeaways */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 space-y-2">
          <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            핵심 요약 포인트 3가지
          </h4>
          <ul className="space-y-1 text-xs text-gray-600 list-disc list-inside">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Action Buttons: Like / Recommend / Share */}
        <div className="flex items-center justify-between border-t border-b border-gray-100 py-3 mb-6">
          <div className="flex items-center gap-3">
            {/* Like Button */}
            <button
              onClick={handleToggleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isLiked
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>추천 {likes}</span>
            </button>

            {/* Share to Community Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition-colors border border-blue-100"
            >
              {isShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              <span>{isShared ? '커뮤니티 공유 완료!' : '커뮤니티에 추천하기'}</span>
            </button>
          </div>

          <div className="text-xs text-gray-400">
            댓글 {comments.length}개
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h3 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-700" />
            만화 추천 소통 댓글
          </h3>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="만화 소감이나 의견을 자유롭게 남겨보세요..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-hidden focus:border-black transition-colors"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-4 py-2.5 bg-[#1a1c1e] hover:bg-black disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>등록</span>
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-2.5">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="p-3 bg-gray-50/70 rounded-xl border border-gray-100 flex items-start justify-between text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px]">
                    {comment.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-gray-900">{comment.authorName}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-md font-semibold">
                        Lv.{comment.authorLevel}
                      </span>
                      <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.content}</p>
                  </div>
                </div>

                <button className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-emerald-700 transition-colors">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{comment.likes}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
