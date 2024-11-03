// backend/src/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config/config.js';
import { handleSearch } from './controllers/searchController.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined')); // Add logger middleware for requests

// Custom middleware to log responses
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    console.log(`Response: ${body}`);
    return originalSend.apply(this, arguments);
  };
  next();
});

app.post('/', handleSearch);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

export default app;
