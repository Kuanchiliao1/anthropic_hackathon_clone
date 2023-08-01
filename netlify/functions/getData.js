// netlify/functions/getData.js

const fetch = require('node-fetch');

const apiKey = process.env.ANTHROPIC_API_KEY;

export const handler = async (prompt) => {
  try {
    const response = await fetch('https://api.anthropic.com/v1/complete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        max_tokens_to_sample: 3000,
        model: 'claude-2',
        prompt,
      }),
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
