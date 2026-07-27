# 🏗️ Architecture

CentLand는 단순한 뉴스 요약 서비스가 아니라,
사용자의 관심 종목과 이해도를 기반으로 경제 뉴스를 개인화하여
학습 경험을 제공하는 AI 기반 플랫폼입니다.

---

## Overall Architecture

```text
                        User
                          │
                          ▼
             관심 산업 · 관심 종목 등록
                          │
                          ▼
                  News Collection AI
        (뉴스 / 공시 / 논문 / 시장 정보 수집)
                          │
                          ▼
                 Impact Analysis AI
          (관심 종목 영향도 및 핵심 키워드 분석)
                          │
                          ▼
              Historical Analysis AI
        (과거 유사 사례 및 시장 반응 분석)
                          │
                          ▼
            AI Summary & Comic Generator
       (4컷 만화 + 학생 맞춤형 뉴스 요약 생성)
                          │
                          ▼
                 Learning Analysis AI
      (읽기 시간 · 클릭 · 이해도 데이터 분석)
                          │
                          ▼
             Personalized Recommendation
      (개인 맞춤 기사 및 경제 개념 추천)
                          │
                          ▼
          Challenge & Reward System (OGQ 이모티콘)
