// backend/src/utils/textProcessing.js
import {load} from 'cheerio';

export const fetchAndProcessContent = async ({ title, link }) => {
  try {
    const response = await fetch(link);
    if (!response.ok) return null;
    
    const html = await response.text();
    const content = extractMainContent(html);
    
    return { title, link, content };
  } catch (error) {
    console.error(`Error fetching content from ${link}:`, error);
    return null;
  }
};

export const extractMainContent = (html) => {
  const $ = load(html);
  
  // Remove unnecessary elements
  $('script, style, head, nav, footer, iframe, img').remove();
  
  // Get text content and clean it
  return $('body')
    .text()
    .replace(/\s+/g, ' ')
    .trim();
};