# Architecture

## 🏗 System Architecture

```mermaid
flowchart LR

subgraph User
    A[👤 Student]
end

subgraph AI
    B[📰 News Collection]
    C[📊 Impact Analysis]
    D[📚 Historical Analysis]
    E[🧠 AI Summary]
end

subgraph Learning
    F[🎨 4-Cut Comic]
    G[📖 Detailed Summary]
    H[📈 Learning Analysis]
    I[🎯 Personalized Recommendation]
end

subgraph Reward
    J[🏆 Challenge]
    K[🎁 OGQ Reward]
end

A --> B
B --> C
C --> D
D --> E
E --> F
F --> G
G --> H
H --> I
I --> J
J --> K
```

## Tech Stack

Frontend,

- Next.js

- React

- TypeScript

- TailwindCSS

Backend

- Supabase (예정)

AI

- OpenAI API (예정)

News

- NewsAPI (예정)
