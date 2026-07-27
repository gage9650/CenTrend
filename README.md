# CentLand

> **학생의 이해도를 기반으로 경제와 투자를 학습하는 AI 플랫폼**

CentLand는 학생들이 경제와 투자 뉴스를 쉽게 이해할 수 있도록 돕는 AI 기반 학습 플랫폼입니다.

기존 뉴스 서비스처럼 단순히 뉴스를 보여주거나 요약하는 것이 아니라,
사용자의 관심 종목과 이해도를 분석하여 **학생에게 맞는 학습 경험**을 제공합니다.

---

## Background

경제와 투자에 대한 관심은 점점 높아지고 있습니다.

하지만 학생들이 처음 접하는 경제 뉴스는 전문 용어가 많고,
내용이 길며, 어떤 부분이 중요한지 파악하기 어렵습니다.

많은 학생들은

- 무엇부터 공부해야 하는지 모릅니다.
- 뉴스를 읽다가 중간에 포기합니다.
- 어려운 용어 때문에 흥미를 잃습니다.
- 투자에 관심은 있지만 시작하지 못합니다.

CentLand는 이러한 문제를 해결하기 위해 시작되었습니다.

---

## Solution

CentLand는 사용자의 관심 종목을 기반으로 관련 뉴스를 분석하고,
학생의 수준에 맞게 학습 콘텐츠를 제공합니다.

단순한 뉴스 요약이 아니라

- 왜 이런 일이 발생했는지
- 과거에는 어떤 일이 있었는지
- 학생이 이해했는지
- 다음에는 무엇을 공부해야 하는지

까지 연결하는 것을 목표로 합니다.

---

## Features

### 1. Personalized Briefing

사용자가 등록한 관심 종목과 관련된 뉴스를 자동으로 제공합니다.

### 2. Impact Analysis

뉴스가 관심 종목에 어떤 영향을 줄 수 있는지 쉽게 설명합니다.

### 3. Historical Cases

과거 비슷한 사례와 당시 시장 반응을 함께 제공합니다.

### 4. 4-Cut Learning

학생이 빠르게 이해할 수 있도록 뉴스를 4컷 만화 형태로 요약합니다.

### 5. Detailed Summary

4컷 이후 더 자세한 내용을 제공합니다.

### 6. Learning Analysis

학생이 어떤 부분에서 어려움을 느끼는지 분석합니다.

### 7. Personalized Recommendation

이해도가 낮은 개념을 중심으로 새로운 기사를 추천합니다.

### 8. Challenge & Reward

도전과제와 OGQ 보상을 통해 꾸준한 학습을 유도합니다.

---

## User Flow

```text
관심 종목 등록

↓

오늘의 뉴스 브리핑

↓

영향도 분석

↓

과거 사례

↓

4컷 만화

↓

상세 요약

↓

이해도 분석

↓

맞춤 기사 추천

↓

도전과제

↓

OGQ 보상
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### State Management

- Zustand

### AI (Planned)

- OpenAI API

### Backend (Planned)

- Supabase

### Data (Planned)

- NewsAPI

---

## Project Structure

```text
app/
components/
store/
hooks/
types/
lib/
public/

docs/
```

---

## Documentation

프로젝트에 대한 자세한 내용은 `docs/`에서 확인할 수 있습니다.

| Document | Description |
|-----------|-------------|
| problem.md | 해결하려는 문제 |
| solution.md | 서비스 소개 |
| flow.md | 사용자 흐름 |
| architecture.md | 시스템 구조 |
| roadmap.md | 개발 계획 |

---

## Roadmap

### MVP

- 관심 종목 등록
- 뉴스 브리핑
- 4컷 학습
- 상세 요약

### Beta

- 실시간 뉴스 API
- AI 영향도 분석
- 이해도 분석

### Release

- OGQ 연동
- 모바일 앱
- 학습 통계

---

## Why CentLand?

기존 서비스는 뉴스를 요약하거나 번역하는 것에 집중합니다.

CentLand는

> **학생이 뉴스를 읽는 것이 아니라,
뉴스가 학생의 수준에 맞춰 변화하는 경험**

을 만드는 것을 목표로 합니다.

학생이 경제를 '읽는 것'이 아니라
'이해하는 것'이 CentLand의 핵심 가치입니다.
