import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // More informative response for incorrect HTTP method
    return res.status(405).json({ error: 'Method Not Allowed, please use POST.' });
  }

  const { prompt } = req.body;

  // Improved prompt validation with specific error message
  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Invalid input format: prompt must be a non-empty string.' });
  }

  // Environment variable validation (optional, for clarity in error responses)
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set.');
    return res.status(500).json({ error: 'Internal server error. Please contact the administrator.' });
  }

  const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const body = {
    prompt: prompt,
    n: 1, // Adjust according to your needs
    size: "1024x1024", // Confirm this parameter with the latest OpenAI API documentation
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', body, { headers });
    const imageUrl = response.data.data[0].url; // Ensure this matches the structure of the response
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('OpenAI API call failed:', error.response ? error.response.data : error.message);

    // Providing more detailed error feedback
    if (error.response) {
      // OpenAI-specific error, passing along their error message
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      // General error (network issue, timeout, etc.)
      res.status(500).json({ error: 'Failed to process request due to internal server error.' });
    }
  }
}
