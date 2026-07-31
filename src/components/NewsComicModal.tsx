import React, { useState } from 'react';
import { NewsArticle, User, Comment } from '../types';
import { 
  ArrowLeft, 
  Heart, 
  MessageSquare, 
  Sparkles, 
  Star, 
  HelpCircle,
  Building2,
  Handshake,
  TrendingUp,
  GraduationCap,
  Car,
  HardDrive,
  Cpu,
  Landmark,
  Send,
  ThumbsUp,
  X
} from 'lucide-react';

interface NewsComicModalProps {
  article: NewsArticle;
  user: User | null;
  onClose: () => void;
  onLikeArticle: (articleId: string) => void;
  onAddComment: (articleId: string, commentText: string) => void;
  onShareToCommunity?: (article: NewsArticle) => void;
}

export const NewsComicModal: React.FC<NewsComicModalProps> = ({
  article,
  user,
  onClose,
  onLikeArticle,
  onAddComment,
}) => {
  const [commentInput, setCommentInput] = useState('');
  const [selectedKeyTerm, setSelectedKeyTerm] = useState<{ term: string; def: string } | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(article.likesCount ?? 0);
  const [comments, setComments] = useState<Comment[]>(article.comments || []);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
      onLikeArticle(article.id);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: Comment = {
      id: `c_${Date.now()}`,
      authorName: user?.name || '익명 개미',
      authorAvatar: user?.avatar || '익',
      authorLevel: user?.level || 1,
      content: commentInput.trim(),
      createdAt: '방금 전',
      likes: 0,
      isLiked: false,
    };

    setComments([newComment, ...comments]);
    onAddComment(article.id, commentInput);
    setCommentInput('');
  };

  const renderVisualIcon = (iconName?: string) => {
    switch (iconName) {
      case 'building':
        return <Building2 className="w-8 h-8 text-amber-600" />;
      case 'handshake':
        return <Handshake className="w-8 h-8 text-emerald-600" />;
      case 'chart':
        return <TrendingUp className="w-8 h-8 text-indigo-600" />;
      case 'graduation':
        return <GraduationCap className="w-8 h-8 text-blue-600" />;
      case 'car':
        return <Car className="w-8 h-8 text-rose-600" />;
      case 'box':
        return <HardDrive className="w-8 h-8 text-purple-600" />;
      case 'chip':
        return <Cpu className="w-8 h-8 text-sky-600" />;
      case 'bank':
        return <Landmark className="w-8 h-8 text-amber-700" />;
      default:
        return <Sparkles className="w-8 h-8 text-emerald-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs overflow-y-auto flex justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-[#FBFBFB] w-full max-w-3xl rounded-3xl border border-gray-200 shadow-2xl my-auto overflow-hidden flex flex-col max-h-[92vh]">
        {/* Sticky Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>브리핑으로</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                isLiked
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>추천 {likesCount}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Article Header Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                {article.category}
              </span>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                📰 뉴스 원문 출처: {article.source}
              </span>
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < article.impactRating ? 'fill-amber-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {article.title}
            </h1>

            <p className="text-xs text-gray-500">
              보도 및 게시 시각: {article.publishedTime} · 소요시간: {article.readTime}
            </p>
          </div>

          {/* 4-PANEL COMIC GRID (4컷 만화) */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-200/90 shadow-xs">
            <div className="text-center mb-4">
              <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">
                4컷 만화 요약
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {article.cartoonPanels.map((panel) => (
                <div
                  key={panel.panelNumber}
                  className="bg-[#FAFAFA] rounded-2xl p-4 border border-gray-200 flex flex-col justify-between hover:border-emerald-300 transition-all relative group"
                >
                  {/* Panel Top Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-gray-800 bg-gray-200 px-2 py-0.5 rounded-md">
                      {panel.panelNumber}컷
                    </span>
                    <span className="text-xs font-bold text-gray-700">{panel.title}</span>
                  </div>

                  {/* Scene Illustration Visual Card */}
                  <div className="h-32 bg-white rounded-xl border border-gray-200/80 flex flex-col items-center justify-center p-3 text-center my-2 shadow-2xs group-hover:bg-emerald-50/20 transition-colors">
                    {renderVisualIcon(panel.visualIcon)}
                    <p className="text-[11px] text-gray-600 font-medium mt-2 line-clamp-2">
                      {panel.sceneDescription}
                    </p>
                  </div>

                  {/* Character Speech Bubble */}
                  <div className="mt-2 bg-emerald-50/90 border border-emerald-200/80 rounded-xl p-2.5 relative">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span className="text-[10px] font-bold text-emerald-900">
                        {panel.characterSpeaker || 'AI 튜터'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-800 font-medium leading-relaxed">
                      "{panel.speechBubble}"
                    </p>
                  </div>

                  {/* Key Term Popup Trigger */}
                  {panel.keyTerm && (
                    <button
                      onClick={() =>
                        setSelectedKeyTerm({
                          term: panel.keyTerm!,
                          def: panel.keyTermDefinition || '용어 설명이 준비되어 있습니다.',
                        })
                      }
                      className="mt-2 text-left flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors"
                    >
                      <HelpCircle className="w-3 h-3" />
                      <span>{panel.keyTerm}</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways Section */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>핵심 요약 포인트</span>
            </h3>

            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Comment & Community Section */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>댓글 {comments.length}개</span>
              </h3>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                placeholder={user ? "이 만화에 대해 자유롭게 의견을 남겨보세요..." : "로그인 후 댓글 작성이 가능합니다"}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1 disabled:opacity-40 transition-colors shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>등록</span>
              </button>
            </form>

            {/* Comment List */}
            <div className="space-y-3 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {comment.authorAvatar}
                      </div>
                      <span className="text-xs font-bold text-gray-800">{comment.authorName}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded-md">
                        Lv.{comment.authorLevel}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">{comment.createdAt}</span>
                  </div>
                  <p className="text-xs text-gray-700 pl-8">{comment.content}</p>
                </div>
              ))}

              {comments.length === 0 && (
                <div className="text-center py-6 text-xs text-gray-400">
                  아직 남겨진 댓글이 없습니다. 첫 댓글의 주인공이 되어보세요!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Term Modal Popup */}
      {selectedKeyTerm && (
        <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-gray-200 space-y-3 animate-scale-up">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                💡 경제 용어 사전
              </span>
              <button
                onClick={() => setSelectedKeyTerm(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-base font-extrabold text-gray-900">{selectedKeyTerm.term}</h4>
            <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
              {selectedKeyTerm.def}
            </p>
            <button
              onClick={() => setSelectedKeyTerm(null)}
              className="w-full bg-gray-900 hover:bg-black text-white text-xs font-semibold py-2 rounded-xl"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
