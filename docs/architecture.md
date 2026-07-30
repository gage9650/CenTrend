# Architecture

## 🏗 System Architecture

```mermaid
flowchart LR

subgraph User
    A[👤 Student]

subgraph AI
    B[📰 News Collection]
    C[📊 Impact Analysis]
    D[📚 Historical Analysis]
    E[🧠 AI Summary]

subgraph Learning
    F[🎨 4-Cut Comic]
    G[📖 Detailed Summary]
    H[📈 Learning Analysis]
    I[🎯 Personalized Recommendation]

subgraph Reward
    J[🏆 Challenge]
    K[🎁 OGQ Reward]

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
flowchart TD

A[👤 Student]

B[📰 News Collection]

C[📊 Impact Analysis]

D[📚 Historical Analysis]

E[🎨 4-Cut Comic]

F[📖 Summary]

G[📈 Learning Analysis]

H[🎯 Recommendation]

I[🏆 Challenge]

J[🎁 OGQ Reward]

A --> B --> C --> D --> E --> F --> G --> H --> I --> J

style A fill:#D6EAF8
style B fill:#F9E79F
style C fill:#F9E79F
style D fill:#F9E79F
style E fill:#FADBD8
style F fill:#FADBD8
style G fill:#D5F5E3
style H fill:#D5F5E3
style I fill:#E8DAEF
style J fill:#E8DAEF
```

## Tech Stack
