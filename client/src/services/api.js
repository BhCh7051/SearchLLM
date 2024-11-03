// src/services/api.js
import axios from 'axios';
const API_BASE_URL =  "https://searchllm.onrender.com" ; // Adjust with your backend's URL
console.log('API_BASE_URL:', API_BASE_URL); // Log the API base URL

const postData = async (message) => {
    // Send a POST request to the API endpoint
    const data = {
        message,
        returnSources: true,
        returnFollowUpQuestions: true,
        embedSourcesInLLMResponse: true,
        textChunkSize: 800,
        textChunkOverlap: 200,
        numberOfSimilarityResults: 2,
        numberOfPagesToScan: 2
    };
    console.log('Sending data to the API:', data); // Log the data being sent

    try {
        const response = await axios.post(API_BASE_URL, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data to the API:', error);
        throw error;
    }
};

export default { postData };
