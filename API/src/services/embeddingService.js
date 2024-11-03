

// backend/src/services/embeddingService.js
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const embeddings = new HuggingFaceInferenceEmbeddings();

export const processAndVectorize = async (content, metadata, query, textChunkSize, textChunkOverlap,numberOfSimilarityResults) => {
  const splitText = await new RecursiveCharacterTextSplitter({
    chunkSize: textChunkSize,
    chunkOverlap: textChunkOverlap
  }).splitText(content);
  
  const vectorStore = await MemoryVectorStore.fromTexts(
    splitText,
    metadata,
    embeddings
  );
  
  return await vectorStore.similaritySearch(query, numberOfSimilarityResults);
};



