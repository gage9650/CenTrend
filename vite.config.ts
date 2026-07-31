import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

function apiPlugin(): Plugin {
  return {
    name: 'express-api',
    configureServer(server) {
      const app = express();
      app.use(express.json());

      const getGeminiClient = () => {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('GEMINI_API_KEY environment variable is missing.');
        }
        return new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });
      };

      app.get('/api/health', (_req, res) => {
        res.json({ status: 'ok', time: new Date().toISOString() });
      });

      app.post('/api/generate-cartoon', async (req, res) => {
        try {
          const { topic, stock } = req.body;
          if (!topic) {
            return res.status(400).json({ error: 'Topic is required' });
          }
          const ai = getGeminiClient();
          const prompt = `주제: "${topic}" ${stock ? `(관심 종목: ${stock})` : ""}이 뉴스나 경제 이슈를 4컷 만화 스토리로 변환해줘.사회초년생이나 초보 투자자도 이해하기 쉬운 한국어로 명확하게 재구성해줘.1컷부터 4컷까지 기승전결이 있도록 구성해줘.`;

          const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: prompt,
            config: {
              systemInstruction: '너는 복잡한 경제 뉴스를 친근한 4컷 만화 시나리오로 풀어내는 AI 경제 튜터야. 모든 응답은 반드시 지정된 JSON 구조여야 해.',
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING, description: '만화 제목' },
                  category: { type: Type.STRING, description: '카테고리 (예: 반도체, 금리, 전기차, ETF)' },
                  summary: { type: Type.STRING, description: '만화 한 줄 요약' },
                  impactRating: { type: Type.NUMBER, description: '시장 영향도 (1~5)' },
                  panels: {
                    type: Type.ARRAY,
                    description: '4컷 정보',
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        panelNumber: { type: Type.NUMBER, description: '1~4' },
                        title: { type: Type.STRING, description: '컷 소제목' },
                        sceneDescription: { type: Type.STRING, description: '시각적 배경 상황' },
                        characterSpeaker: { type: Type.STRING, description: '말하는 사람' },
                        speechBubble: { type: Type.STRING, description: '말풍선 대사' },
                        visualIcon: { type: Type.STRING, description: '추천 아이콘' },
                        keyTerm: { type: Type.STRING, description: '핵심 용어' },
                        keyTermDefinition: { type: Type.STRING, description: '용어 설명' }
                      },
                      required: ['panelNumber', 'title', 'sceneDescription', 'speechBubble']
                    }
                  },
                  keyTakeaways: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: '핵심 요점 3가지'
                  }
                },
                required: ['title', 'category', 'summary', 'impactRating', 'panels', 'keyTakeaways']
              }
            }
          });

          const text = response.text || '{}';
          const cartoonData = JSON.parse(text);
          res.json({ success: true, cartoon: cartoonData });
        } catch (error: any) {
          console.error('Error generating cartoon:', error);
          res.status(500).json({
            success: false,
            error: error?.message || 'Failed to generate cartoon',
          });
        }
      });

      server.middlewares.use(app);
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
