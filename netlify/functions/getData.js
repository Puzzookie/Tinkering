// netlify/functions/getData.js

const fetch = require('node-fetch'); // Node.js equivalent of the Fetch API

exports.handler = async (event, context) => {
  const { FIREBASE_DB_URL } = process.env;

  if (!FIREBASE_DB_URL) {
    return {
      statusCode: 500,
      body: 'Firebase Realtime Database URL is not configured.',
    };
  }

  try {
    const response = await fetch(`${FIREBASE_DB_URL}.json`);
    if (!response.ok) {
      throw Error('Failed to retrieve data from Firebase.');
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`,
    };
  }
};
