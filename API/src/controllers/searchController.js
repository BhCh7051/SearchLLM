// backend/src/controllers/searchController.js
import { rephraseInput, generateAnswer, generateFollowUpQuestions } from '../services/LLMService.js';
import { searchWeb } from '../services/searchService.js';
import { processAndVectorize } from '../services/embeddingService.js';
import { fetchAndProcessContent } from '../utils/textProcessing.js';
import { handleError } from '../utils/errorHandler.js';
import { config } from '../config/config.js';

export const handleSearch = async (req, res) => {
  // req.body.message: required
  if (!req.body || !req.body.message)  {
    return handleError(res, { message: 'Missing required input' });
  }
  try {
    const { 
      message, 
      returnSources = config.returnSources,
      returnFollowUpQuestions = config.returnFollowUpQuestions,
      embedSourcesInLLMResponse = config.embedSourcesInLLMResponse,
      textChunkSize = config.textChunkSize,
      textChunkOverlap = config.textChunkOverlap,
      numberOfSimilarityResults = config.numberOfSimilarityResults,
      numberOfPagesToScan = config.numberOfPagesToScan,
    } = req.body;
    // Rephrase the query for better search results
    const rephrasedQuery = await rephraseInput(message);
    
    // Get search results
    const searchResults = await searchWeb(rephrasedQuery);
    const processedDocs = await Promise.all(
      searchResults.organic
        .slice(0, numberOfPagesToScan)
        .map(doc => fetchAndProcessContent(doc))
    );

    // Process and vectorize content
    // const vectorizedResults = processedDocs
    const vectorizedResults = await Promise.all(
      processedDocs
        .filter(doc => doc && doc.content.length > 250)
        .map(doc => processAndVectorize(
          doc.content, 
          { title: doc.title, link: doc.link }, 
          message, 
          textChunkSize, 
          textChunkOverlap,
          numberOfSimilarityResults
        ))
    );

    // Generate answer
    const chatCompletion = await generateAnswer(message, vectorizedResults);
    
    // Stream the response
    let responseTotal = "";
    for await (const chunk of chatCompletion) {
      if (chunk.choices[0].delta && chunk.choices[0].finish_reason !== "stop") {
        responseTotal += chunk.choices[0].delta.content;
      } else {
        // Prepare final response
        const response = {
          answer: responseTotal
        };

        if (returnSources) {
          response.sources = processedDocs.map(doc => ({
            title: doc.title,
            link: doc.link
          }));
        }

        if (returnFollowUpQuestions) {
          response.followUpQuestions = await generateFollowUpQuestions(responseTotal);
        }

        res.json(response);
      }
    }
  } catch (error) {
    handleError(res, error);
  }
};