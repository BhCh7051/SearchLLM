// tests/openaiService.test.js
import { rephraseInput, generateAnswer, generateFollowUpQuestions } from './services/LLMService';

jest.mock('LLM', () => ({
  chat: {
    completions: {
      create: jest.fn()
    }
  }
}));

describe('LLM Service', () => {
  it('should rephrase input correctly', async () => {
    const result = await rephraseInput('What is the weather today?');
    expect(result).toContain('weather');
  });

  it('should generate follow-up questions', async () => {
    const response = await generateFollowUpQuestions('Explain the process of photosynthesis.');
    expect(response).toHaveLength(3);
  });
});
