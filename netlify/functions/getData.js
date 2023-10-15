exports.handler = async (event) => {
    const { FIREBASE_DB_URL } = process.env;
  
    if (!FIREBASE_DB_URL) {
      return {
        statusCode: 500,
        body: 'Firebase Realtime Database URL is not configured.',
      };
    }
  
    try {
      const response = await fetch(`${FIREBASE_DB_URL}.json`); // Use fetch for edge functions
  
      if (response.ok) {
        const data = await response.json();
  
        // Create a response object with custom headers
        const headers = {
          "Access-Control-Allow-Origin": "https://emailauth-e6005.web.app",
          "Cache-Control": "public, max-age=180" // Set max-age to 180 seconds (3 minutes)
        };
  
        return {
          statusCode: 200,
          body: JSON.stringify(data),
          headers, // Include custom headers in the response
        };
      } else {
        throw new Error('Failed to retrieve data from Firebase.');
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error.message}`,
      };
    }
  };
  
