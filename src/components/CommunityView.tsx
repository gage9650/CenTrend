import React, { useState } from 'react';
import { CommunityPost, User, NewsArticle } from '../types';
import { 
  Heart, 
  MessageSquare, 
  Search, 
  Eye, 
  Flame, 
  Share2
} from 'lucide-react';

interface CommunityViewProps {
  posts: CommunityPost[];
  user: User | null;
  articles: NewsArticle[];
  onSelectPost: (post: CommunityPost) => void;
  onLikePost: (postId: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  user,
  articles,
  onSelectPost,
  onLikePost,
}) => {
  const [activeTab, setActiveTab] = useState<'전체' | '인기 만화' | '개념 추천' | '기술 분석'>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesTab = activeTab === '전체' || post.category === activeTab;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            만화 추천 커뮤니티 <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            유저들이 공유한 4컷 만화를 읽고 추천과 댓글로 소통해보세요!
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['전체', '인기 만화', '개념 추천', '기술 분석'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/80'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="제목, 유저 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-56 bg-white border border-gray-200 text-xs pl-9 pr-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Community Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
          >
            {/* Post Author Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {post.authorAvatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">{post.authorName}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.2 rounded-md">
                      Lv.{post.authorLevel}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">{post.createdAt}</p>
                </div>
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                {post.category}
              </span>
            </div>

            {/* Title & Summary */}
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-gray-900 group-hover:text-black leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </div>

            {/* 4-Panel Comic Mini Preview Row */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {post.cartoonPanels.slice(0, 4).map((panel) => (
                <div
                  key={panel.panelNumber}
                  className="bg-gray-50 rounded-xl p-2 border border-gray-100 text-center space-y-1 group-hover:bg-emerald-50/30 transition-colors"
                >
                  <span className="text-[9px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded-sm border border-gray-200">
                    {panel.panelNumber}컷
                  </span>
                  <p className="text-[10px] font-bold text-gray-800 line-clamp-1">{panel.title}</p>
                </div>
              ))}
            </div>

            {/* Stats Bar (Likes, Comments, Views) */}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onLikePost(post.id);
                  }}
                  className={`flex items-center gap-1 font-semibold hover:text-rose-600 transition-colors ${
                    post.isLiked ? 'text-rose-600' : ''
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                  <span>{post.likesCount}</span>
                </button>

                <div className="flex items-center gap-1 font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount || post.comments.length}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium">
                <Eye className="w-3.5 h-3.5" />
                <span>{post.views}회 읽음</span>
              </div>
            </div>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center text-gray-400 text-xs border border-gray-200 space-y-2">
            <Share2 className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="font-bold text-gray-700 text-sm">해당 카테고리의 게시글이 없습니다</p>
            <p>다양한 카테고리의 4컷 만화 브리핑을 확인해보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};
