import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const { prompt } = req.body;

    // Validate prompt
    if (typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    // Call the OpenAI API for image generation
    // Adjust the endpoint and parameters according to the specific API model you're using
    // The example below is hypothetical and should be updated based on actual API documentation
    const imageResponse = await openai.createImage({
      prompt: prompt,
      n: 1, // Number of images to generate
      // Include other necessary parameters as per the API documentation
    });

    // Assuming the API returns an array of images, we take the first one
    const imageUrl = imageResponse.data[0].url; // Adjust this based on the actual API response structure
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
