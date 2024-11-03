// backend/src/services/searchService.js
import fetch from 'node-fetch';
import { config } from '../config/config.js';

export const searchWeb = async (query) => {
  const response = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': config.serperApiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ q: query, gl: "in" })
  });
  
  if (!response.ok) {
    throw new Error(`Search API error: ${response.statusText}`);
  }
  
  return await response.json();
};