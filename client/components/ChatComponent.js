import axios from 'axios';
import { useState } from 'react';

const TextToPromptLogoMaker = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedLogos, setGeneratedLogos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      console.log("Prompt is empty.");
      return; // Do not send request if prompt is empty
    }

    try {
      const response = await axios.post('/api/logo', { prompt });
      const logoUrl = response.data.logoUrl;

      setGeneratedLogos([...generatedLogos, { prompt, logoUrl }]);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate logo:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-4 py-2 border-b border-gray-300 text-lg font-semibold">
          Generate Logo from Prompt
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter logo prompt..."
            className="w-full p-2 border border-gray-300 rounded-full"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Generate
          </button>
        </form>
        <div className="p-4">
          {generatedLogos.map((item, index) => (
            <div key={index} className="my-4">
              <p className="text-sm mb-2">{item.prompt}</p>
              <img src={item.logoUrl} alt={`Logo for ${item.prompt}`} className="w-64 h-64 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToPromptLogoMaker;
