// netlify/functions/getData.js

const needle = require('needle');

exports.handler = async (event, context) => {
  const { FIREBASE_DB_URL } = process.env;

  if (!FIREBASE_DB_URL) {
    return {
      statusCode: 500,
      body: 'Firebase Realtime Database URL is not configured.',
    };
  }

  try {
    const response = await needle('get', `${FIREBASE_DB_URL}.json`);

    if (response.statusCode !== 200) {
      throw new Error('Failed to retrieve data from Firebase.');
    }

    const data = response.body;
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
