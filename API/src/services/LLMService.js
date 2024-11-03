// backend/src/services/LLMService.js
import OpenAI from 'openai';
import { config } from '../config/config.js';

const openai = new OpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: config.groqApiKey,
});

export const rephraseInput = async (inputString) => {
  console.log(inputString);
  const response = await openai.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: "You are a rephraser and always respond with a rephrased version of the input that is given to a search engine API. Always be succint and use the same words as the input." },
      { role: "user", content: inputString },
    ],
  });
  console.log(response.choices);
  return response.choices[0].message.content;
};

export const generateAnswer = async (message, sources) => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `"Here is my query: ${message}. Provide a comprehensive, well-structured answer in markdown format, with inline citations as numbered references (e.g., [1]). Format equations and formulas using appropriate markdown syntax (e.g., LaTeX-style for complex equations: $E = mc^2$ for inline and $$E = mc^2$$ for display mode). Include headings, bullet points, or tables as needed for clarity. If no relevant sources are available, respond with 'No relevant results found"`
      },
      { role: "user", content: `Here are the top results from a similarity search: ${JSON.stringify(sources)}.` }
    ],
    stream: true,
    // model: "mixtral-8x7b-32768"
    model: "llama3-8b-8192"
  });
};

export const generateFollowUpQuestions = async (responseText) => {
  const response = await openai.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: "You are a question generator. Generate 3 follow-up questions based on the provided text. Return the questions in an array format." },
      {
        role: "user",
        content: `Generate 3 follow-up questions based on the following text:\n\n${responseText}\n\nReturn the questions in the following format: ["Question 1", "Question 2", "Question 3"]`
      }
    ],
  });
  console.log(response.choices[0].message.content);
  return JSON.parse(response.choices[0].message.content);
};


