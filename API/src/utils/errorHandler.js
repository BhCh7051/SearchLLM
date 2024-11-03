
// backend/src/utils/errorHandler.js
export const handleError = (res, error) => {
    console.error('Error:', error);
    
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    
    res.status(statusCode).json({
      error: {
        message,
        status: statusCode
      }
    });
  };