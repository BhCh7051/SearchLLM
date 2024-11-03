// tests/searchService.test.js
import { searchWeb } from '../services/searchService';

describe('Search Service', () => {
  it('should fetch search results', async () => {
    const query = 'AI in healthcare';
    const response = await searchWeb(query);
    expect(response.organic).toBeDefined();
    expect(response.organic).toHaveLength(4);
  });

  it('should handle API failure gracefully', async () => {
    try {
      await searchWeb('');
    } catch (error) {
      expect(error.message).toContain('Search API error');
    }
  });
});
