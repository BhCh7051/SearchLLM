// backend/src/config/config.js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3005,
  groqApiKey: process.env.GROQ_API_KEY,
  serperApiKey: process.env.SERPER_SEARCH_API_KEY,
  returnSources: true,
  returnFollowUpQuestions: true,
  embedSourcesInLLMResponse: true,
  textChunkSize: 800,
  textChunkOverlap: 200,
  numberOfSimilarityResults: 2,
  numberOfPagesToScan: 4
};