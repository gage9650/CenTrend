import React, { useState } from 'react';
import { 
  NewsArticle, 
  CommunityPost, 
  User, 
  Quest, 
  Badge, 
  UserRank,
  StockItem,
  PredictionNews,
  Prediction,
  PredictionType,
  UserPredictionStats
} from './types';
import { 
  initialUser, 
  mockArticles, 
  mockCommunityPosts, 
  mockQuests, 
  mockBadges, 
  mockRankings,
  mockPredictionNews
} from './mockData';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { TodayBriefing } from './components/TodayBriefing';
import { NewsComicModal } from './components/NewsComicModal';
import { StockDetailView } from './components/StockDetailView';
import { QuestsView } from './components/QuestsView';
import { ProfileView } from './components/ProfileView';
import { RankingView } from './components/RankingView';
import { LoginModal } from './components/LoginModal';
import { LandingPage } from './components/LandingPage';
import { PredictionView } from './components/PredictionView';

export default function App() {
  const [user, setUser] = useState<User | null>(initialUser);
  const [activeTab, setActiveTab] = useState<TabType>('briefing');
  const [isLanding, setIsLanding] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Core Data States
  const [articles, setArticles] = useState<NewsArticle[]>(mockArticles);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [badges, setBadges] = useState<Badge[]>(mockBadges);
  const [rankings, setRankings] = useState<UserRank[]>(mockRankings);

  // Prediction Data States
  const [predictionNews, setPredictionNews] = useState<PredictionNews[]>(mockPredictionNews);
  const [userPredictions, setUserPredictions] = useState<Prediction[]>([]);

  // Selected Article for 4-panel comic view
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showStockDetail, setShowStockDetail] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<StockItem | undefined>(undefined);

  // AI Generation Loading State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Article selection & XP gain handler
  const handleSelectArticle = (article: NewsArticle) => {
    setArticles((prev) =>
      prev.map((a) => (a.id === article.id ? { ...a, readStatus: true } : a))
    );

    if (user && !article.readStatus) {
      const newXp = user.xp + 50;
      let newLevel = user.level;
      let newNextXp = user.nextLevelXp;

      if (newXp >= user.nextLevelXp) {
        newLevel += 1;
        newNextXp += 500;
        showToast(`🎉 레벨 업! Lv.${newLevel} 달성 (+50 XP)`);
      } else {
        showToast(`📖 만화 기사 읽기 완료! (+50 XP)`);
      }

      setUser({
        ...user,
        xp: newXp,
        level: newLevel,
        nextLevelXp: newNextXp,
        readArticlesCount: user.readArticlesCount + 1,
      });
    }

    setSelectedArticle(article);
  };

  const handleLikeArticle = (articleId: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId ? { ...a, likesCount: a.likesCount + 1 } : a
      )
    );
    showToast('❤️ 기사에 좋아요를 남겼습니다!');
  };

  const handleAddComment = (articleId: string, content: string) => {
    setArticles((prev) =>
      prev.map((a) =>
        a.id === articleId ? { ...a, commentsCount: a.commentsCount + 1 } : a
      )
    );
    showToast('💬 댓글이 작성되었습니다.');
  };

  const handleShareToCommunity = (article: NewsArticle) => {
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      title: `${article.title} - 4컷 만화 요약입니다!`,
      category: article.category,
      authorName: user?.name || '익명 유저',
      authorLevel: user?.level || 1,
      authorAvatar: user?.avatar || '익',
      createdAt: '방금 전',
      likesCount: 1,
      commentsCount: 0,
      isLiked: true,
      newsTitle: article.title,
      summary: article.summary,
      cartoonPanels: article.cartoonPanels,
      comments: [],
      views: 1,
    };

    setCommunityPosts([newPost, ...communityPosts]);
    showToast('🚀 커뮤니티에 성공적으로 공유되었습니다!');
  };

  // Generate Custom 4-Panel Cartoon via Server API
  const handleGenerateCustomCartoon = async (topic: string, stockSymbol?: string) => {
    setIsGenerating(true);
    showToast('🤖 AI가 뉴스 내용을 4컷 만화 시나리오로 변환 중입니다...');

    try {
      const response = await fetch('/api/generate-cartoon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, stock: stockSymbol }),
      });

      const data = await response.json();

      if (data.success && data.cartoon) {
        const generatedArticle: NewsArticle = {
          id: `art_ai_${Date.now()}`,
          category: data.cartoon.category || 'AI 이슈',
          readStatus: true,
          title: data.cartoon.title || topic,
          source: 'AI 튜터 생성',
          publishedTime: '방금 전',
          readTime: '2분 읽기',
          impactRating: data.cartoon.impactRating || 4,
          iconType: 'chip',
          summary: data.cartoon.summary || `${topic}에 대한 AI 요약 브리핑입니다.`,
          likesCount: 0,
          commentsCount: 0,
          comments: [],
          cartoonPanels: data.cartoon.panels || [],
          keyTakeaways: data.cartoon.keyTakeaways || [],
        };

        setArticles([generatedArticle, ...articles]);
        setSelectedArticle(generatedArticle);
        showToast('✨ AI 4컷 만화 생성이 완료되었습니다!');
      } else {
        throw new Error(data.error || 'AI 만화 생성 실패');
      }
    } catch (error) {
      console.error('Failed to generate cartoon via API:', error);
      // Fallback article
      const fallbackArticle: NewsArticle = {
        id: `art_fallback_${Date.now()}`,
        category: '경제 트렌드',
        readStatus: true,
        title: `뉴스 분석: ${topic}`,
        source: 'AI 트렌드 튜터',
        publishedTime: '방금 전',
        readTime: '2분 읽기',
        impactRating: 4,
        iconType: 'chart',
        summary: `${topic}과 관련된 주요 이슈를 4컷 만화로 재구성했습니다.`,
        likesCount: 0,
        commentsCount: 0,
        comments: [],
        keyTakeaways: [
          '해당 이슈는 주식 및 투자 시장에 즉각적인 영향을 미칠 수 있습니다.',
          '주요 종목의 수급 변화와 기업 실적 전망을 주시할 필요가 있습니다.'
        ],
        cartoonPanels: [
          {
            panelNumber: 1,
            title: '1컷: 속보 발생',
            sceneDescription: '전광판에서 새로운 이슈가 뜨는 장면',
            characterSpeaker: '뉴스 앵커',
            speechBubble: `${topic} 관련 최신 뉴스가 발표되었습니다!`,
            visualIcon: 'building',
            keyTerm: '시사 이슈',
            keyTermDefinition: '투자 시장에 큰 파급력을 미치는 주요 사건입니다.'
          },
          {
            panelNumber: 2,
            title: '2컷: 원인 분석',
            sceneDescription: '차트를 보며 원인을 분석한다.',
            characterSpeaker: '애널리스트',
            speechBubble: '글로벌 수급 불균형과 맞물려 파급력이 커지고 있어요!',
            visualIcon: 'handshake',
            keyTerm: '수급',
            keyTermDefinition: '매수세와 매도세의 힘겨루기 상태를 나타냅니다.'
          },
          {
            panelNumber: 3,
            title: '3컷: 파급 효과',
            sceneDescription: '기업들과 주식 시장의 차트 반응.',
            characterSpeaker: '시장 개미',
            speechBubble: '관련 섹터 기업들의 실적 전망치가 상향 조정되는군요!',
            visualIcon: 'chart',
            keyTerm: '모멘텀',
            keyTermDefinition: '주가 변동의 가속도를 나타내는 지표입니다.'
          },
          {
            panelNumber: 4,
            title: '4컷: 스마트 대응',
            sceneDescription: '현명한 판단을 내리는 모습.',
            characterSpeaker: '스마트 튜터',
            speechBubble: '단기 변동성에 흔들리지 말고 본질적인 가치를 주목하세요!',
            visualIcon: 'graduation',
            keyTerm: '가치 투자',
            keyTermDefinition: '기업의 내재 가치에 기반하여 투자하는 접근 방식입니다.'
          }
        ]
      };
      setArticles([fallbackArticle, ...articles]);
      setSelectedArticle(fallbackArticle);
      showToast('✨ AI 4컷 만화가 생성되었습니다!');
    } finally {
      setIsGenerating(false);
    }
  };

  // Prediction Submission Handler
  const handleSubmitPrediction = (
    newsId: string,
    type: PredictionType,
    direction?: '상승' | '하락',
    points?: number
  ) => {
    const newsItem = predictionNews.find((n) => n.id === newsId);
    if (!newsItem || !user) return;

    let earnedScore = 0;
    let isCorrect = false;
    let errorMargin = 0;

    if (type === 'direction') {
      isCorrect = direction === newsItem.actualDirection;
      earnedScore = isCorrect ? 80 : 20;
    } else {
      const inputPts = points || 0;
      errorMargin = Math.abs(inputPts - newsItem.actualChange);
      if (errorMargin === 0) earnedScore = 100;
      else if (errorMargin <= 2) earnedScore = 90;
      else if (errorMargin <= 5) earnedScore = 70;
      else if (errorMargin <= 10) earnedScore = 50;
      else earnedScore = 20;
      isCorrect = errorMargin <= 5;
    }

    const newPrediction: Prediction = {
      id: `pred_${Date.now()}`,
      userId: user.id,
      newsId,
      predictionType: type,
      predictedDirection: type === 'direction' ? direction : (points! >= 0 ? '상승' : '하락'),
      predictedPoints: type === 'points' ? points : undefined,
      actualPoints: newsItem.actualChange,
      earnedScore,
      earnedXp: earnedScore,
      isCorrect,
      errorMargin,
      submittedAt: '방금 전',
    };

    const updatedPredictions = [newPrediction, ...userPredictions];
    setUserPredictions(updatedPredictions);

    // Update Stats
    const prevStats = user.predictionStats || {
      accuracy: 66.7,
      averageError: 3.2,
      totalPredictions: 6,
      correctPredictions: 4,
      currentStreak: 2,
      bestStreak: 4,
      rankingScore: 380,
    };

    const totalCount = prevStats.totalPredictions + 1;
    const correctCount = prevStats.correctPredictions + (isCorrect ? 1 : 0);
    const newAccuracy = (correctCount / totalCount) * 100;
    const newStreak = isCorrect ? prevStats.currentStreak + 1 : 0;
    const bestStreak = Math.max(prevStats.bestStreak, newStreak);
    const totalScore = prevStats.rankingScore + earnedScore;
    const totalError = (prevStats.averageError * prevStats.totalPredictions) + errorMargin;
    const newAverageError = totalError / totalCount;

    const newStats: UserPredictionStats = {
      accuracy: newAccuracy,
      averageError: newAverageError,
      totalPredictions: totalCount,
      correctPredictions: correctCount,
      currentStreak: newStreak,
      bestStreak,
      rankingScore: totalScore,
    };

    // Update User XP
    const newXp = user.xp + earnedScore;
    let newLevel = user.level;
    let newNextXp = user.nextLevelXp;
    if (newXp >= newNextXp) {
      newLevel += 1;
      newNextXp += 500;
      showToast(`🎉 레벨 업! Lv.${newLevel} 달성! (+${earnedScore} 점/XP)`);
    } else {
      showToast(`🎯 투자 예측 참여 완료! (+${earnedScore} 점)`);
    }

    const updatedUser = {
      ...user,
      xp: newXp,
      level: newLevel,
      nextLevelXp: newNextXp,
      predictionStats: newStats,
    };
    setUser(updatedUser);

    // Update Quests Progression
    setQuests((prevQuests) =>
      prevQuests.map((q) => {
        let count = q.currentCount;
        if (q.title.includes('뉴스 예측 참여') && !q.isCompleted) {
          count = Math.min(q.targetCount, count + 1);
        }
        if (q.title.includes('방향 맞추기') && isCorrect && !q.isCompleted) {
          count = Math.min(q.targetCount, count + 1);
        }
        if (q.title.includes('포인트 예측 성공') && type === 'points' && errorMargin <= 5 && !q.isCompleted) {
          count = Math.min(q.targetCount, count + 1);
        }
        if (q.title.includes('연속 정답') && !q.isCompleted) {
          count = Math.min(q.targetCount, newStreak);
        }
        return {
          ...q,
          currentCount: count,
          isCompleted: count >= q.targetCount,
        };
      })
    );

    // Update Rankings Leaderboard
    setRankings((prev) =>
      prev.map((r) => {
        if (r.name.includes('이슬')) {
          return {
            ...r,
            xp: newXp,
            level: newLevel,
            predictionScore: totalScore,
            totalScore: newXp + totalScore,
          };
        }
        return r;
      })
    );
  };

  const handleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newIsLiked,
            likesCount: newIsLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      })
    );
  };

  // 계정 데이터 초기화 처리 함수 (회원 로그인 상태 유지)
  const handleResetUserData = () => {
    if (!user) return;

    const resetUser: User = {
      ...initialUser,
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      level: 1,
      xp: 0,
      nextLevelXp: 500,
      streakDays: 1,
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
      },
    };

    setUser(resetUser);
    setQuests(mockQuests);
    setUserPredictions([]);
    setArticles(mockArticles);
    setCommunityPosts(mockCommunityPosts);
    setRankings(mockRankings);

    setShowStockDetail(false);
    setActiveTab('briefing');
    showToast('🔄 계정 데이터가 성공적으로 초기화되었습니다.');
  };


  if (isLanding) {
    return (
      <>
        <LandingPage
          onOpenLogin={() => setShowLoginModal(true)}
          onGoDashboard={() => setIsLanding(false)}
        />
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={(loggedUser) => {
              setUser(loggedUser);
              setIsLanding(false);
              showToast(`환영합니다, ${loggedUser.name}님!`);
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans antialiased selection:bg-emerald-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-950 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800 animate-slide-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header
        user={user}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={() => setUser(null)}
        onNavigateHome={() => {
          setShowStockDetail(false);
          setActiveTab('briefing');
        }}
        isLanding={isLanding}
        setIsLanding={setIsLanding}
      />

      <div className="flex max-w-7xl mx-auto min-h-[calc(100vh-57px)]">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setShowStockDetail(false);
            setActiveTab(tab);
          }}
          user={user}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {showStockDetail ? (
            <StockDetailView stock={selectedStock} onBack={() => setShowStockDetail(false)} />
          ) : (
            <>
              {activeTab === 'briefing' && (
                <TodayBriefing
                  user={user}
                  articles={articles}
                  onSelectArticle={handleSelectArticle}
                  onOpenStockDetail={(stock) => {
                    setSelectedStock(stock);
                    setShowStockDetail(true);
                  }}
                  onGenerateCustomCartoon={handleGenerateCustomCartoon}
                  isGenerating={isGenerating}
                />
              )}

              {activeTab === 'prediction' && (
                <PredictionView
                  newsList={predictionNews}
                  userPredictions={userPredictions}
                  stats={user?.predictionStats || {
                    accuracy: 66.7,
                    averageError: 3.2,
                    totalPredictions: 6,
                    correctPredictions: 4,
                    currentStreak: 2,
                    bestStreak: 4,
                    rankingScore: 380,
                  }}
                  onSubmitPrediction={handleSubmitPrediction}
                />
              )}

              {activeTab === 'quests' && (
                <QuestsView
                  user={user}
                  quests={quests}
                  badges={badges}
                  onClaimQuestReward={(questId) => {
                    setQuests((prev) =>
                      prev.map((q) => (q.id === questId ? { ...q, isCompleted: true } : q))
                    );
                    showToast('🎁 보상 수령 완료!');
                  }}
                />
              )}

              {activeTab === 'rankings' && (
                <RankingView
                  rankings={rankings}
                  currentUser={user}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  user={user}
                  onUpdateInterests={(newInterests) => {
                    if (user) {
                      setUser({ ...user, interests: newInterests });
                      showToast('나의 관심사가 업데이트되었습니다.');
                    }
                  }}
                  onResetUserData={handleResetUserData}
                />
              )}

            </>
          )}
        </main>
      </div>

      {/* 4-Panel Cartoon Full Screen Modal View */}
      {selectedArticle && (
        <NewsComicModal
          article={selectedArticle}
          user={user}
          onClose={() => setSelectedArticle(null)}
          onLikeArticle={handleLikeArticle}
          onAddComment={handleAddComment}
        />
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            showToast(`환영합니다, ${loggedUser.name}님!`);
          }}
        />
      )}
    </div>
  );
}
