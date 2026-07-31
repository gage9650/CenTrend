export interface StockItem {
  id: string;
  name: string;
  ticker: string;
  price: string;
  currency: string;
  changeRate: string;
  isUp: boolean;
  category?: string;
}

export interface UserPredictionStats {
  accuracy: number; // 성공률 (%)
  averageError: number; // 평균 오차 (포인트)
  totalPredictions: number; // 총 예측 수
  correctPredictions: number; // 정답 수
  currentStreak: number; // 현재 연속 정답
  bestStreak: number; // 최고 연속 정답
  rankingScore: number; // 총 뉴스 예측 점수
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  interests: string[];
  readArticlesCount: number;
  earnedBadgesCount: number;
  predictionStats?: UserPredictionStats;
}

export interface CartoonPanel {
  panelNumber: number;
  title: string;
  sceneDescription: string;
  characterSpeaker?: string;
  speechBubble: string;
  visualIcon?: string;
  keyTerm?: string;
  keyTermDefinition?: string;
}

export interface NewsArticle {
  id: string;
  category: string;
  readStatus: boolean;
  title: string;
  source: string;
  publishedTime: string;
  readTime: string;
  impactRating: number;
  iconType: 'chip' | 'bank' | 'phone' | 'car' | 'box' | 'chart';
  summary: string;
  likesCount: number;
  commentsCount: number;
  cartoonPanels: CartoonPanel[];
  keyTakeaways: string[];
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorLevel: number;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  title: string;
  category: string;
  authorName: string;
  authorLevel: number;
  authorAvatar: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  newsTitle?: string;
  summary: string;
  cartoonPanels: CartoonPanel[];
  comments: Comment[];
  views: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: string;
  currentCount: number;
  targetCount: number;
  rewardXp: number;
  isCompleted: boolean;
  icon: string;
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  isUnlocked: boolean;
  description: string;
}

export interface UserRank {
  rank: number;
  name: string;
  level: number;
  xp: number;
  streak: number;
  badges: number;
  avatar: string;
  predictionScore?: number;
  totalScore?: number;
}

// ==================== [뉴스 투자 예측 관련 추가 모델] ====================

export type PredictionDifficulty = '쉬움' | '보통' | '어려움';
export type PredictionType = 'direction' | 'points';

export interface PredictionNews {
  id: string;
  title: string;
  content: string;
  company: string;
  source?: string;
  stockTicker?: string;
  difficulty: PredictionDifficulty;
  createdAt: string;
  actualChange: number; // 예: +21 또는 -15
  actualDirection: '상승' | '하락';
  explanation: string; // 결과 해설 (왜 이 변동이 일어났는지)
  category: string;
  chartData?: { time: string; price: number }[]; // 시각화용 단순 주가 그래프
}

export interface Prediction {
  id: string;
  userId: string;
  newsId: string;
  predictionType: PredictionType;
  predictedDirection?: '상승' | '하락';
  predictedPoints?: number;
  actualPoints: number;
  earnedScore: number;
  earnedXp: number;
  isCorrect: boolean;
  errorMargin?: number;
  submittedAt: string;
}

// ==================== [실시간 주식 차트 관련 추가 모델] ====================

export type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y';

export interface StockChartPoint {
  time: string;
  price: number;
  volume: number;
  open?: number;
  high?: number;
  low?: number;
}

export interface StockDataSource {
  apiName: string;
  sourceProvider: string;
  updateInterval: string;
  status: 'active' | 'simulation';
  description: string;
}

export interface StockDetailMetrics {
  currentPrice: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  volume: number;
  marketCap: string;
  per: number;
  changeAmount: number;
  changePercent: number;
  isUp: boolean;
  lastUpdated: string;
  dataSource?: StockDataSource;
}

