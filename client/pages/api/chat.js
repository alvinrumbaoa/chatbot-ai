import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const { messages } = req.body;

    // Validate messages
    if (!Array.isArray(messages) || messages.some(msg => typeof msg.content !== 'string')) {
      return res.status(400).json({ error: 'Invalid input format' });
    }

    // Call the OpenAI Chat API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages
    });

    const aiResponse = completion.choices[0].message.content;
    res.status(200).json({ result: aiResponse });
  } catch (error) {
    console.error('OpenAI API call failed:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
}
