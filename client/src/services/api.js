// src/services/api.js
import axios from 'axios';
// REACT_APP_API_URL
const API_BASE_URL =  process.env.REACT_APP_API_URL || 'http://localhost:3005'; // Adjust with your backend's URL

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
