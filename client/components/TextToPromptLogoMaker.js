import axios from 'axios';
import { useState } from 'react';

const TextToPromptLogoMaker = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [primaryColors, setPrimaryColors] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [symbolOrMascot, setSymbolOrMascot] = useState('');
  const [style, setStyle] = useState('');
  const [additionalElements, setAdditionalElements] = useState('');
  const [themes, setThemes] = useState('');
  const [generatedLogos, setGeneratedLogos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const prompt = `Create a logo only style for the '${teamName}' basketball team. The logo should feature ${symbolOrMascot}, symbolizing speed and agility. Use ${primaryColors} as the primary colors, with a touch of ${secondaryColor} for contrast. Incorporate ${additionalElements} in the design. The style should be ${style}, suitable for team jerseys and merchandise. Emphasize the themes of ${themes}.`;
    setIsLoading(true);
    try {
      const response = await axios.post('/api/logo', { prompt });
      const logoUrl = response.data.imageUrl;
      setGeneratedLogos([...generatedLogos, { prompt, logoUrl }]);
      // Reset form
      setTeamName('');
      setPrimaryColors('');
      setSecondaryColor('');
      setSymbolOrMascot('');
      setStyle('');
      setAdditionalElements('');
      setThemes('');
    } catch (error) {
      console.error('Failed to generate logo:', error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="max-w-lg mx-auto my-4">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-4 py-2 border-b border-gray-300 text-lg font-semibold">
          Generate Logo from Prompt
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={primaryColors} onChange={(e) => setPrimaryColors(e.target.value)} placeholder="Primary Colors" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} placeholder="Secondary Color" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={symbolOrMascot} onChange={(e) => setSymbolOrMascot(e.target.value)} placeholder="Symbol or Mascot" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Style" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={additionalElements} onChange={(e) => setAdditionalElements(e.target.value)} placeholder="Additional Elements" className="w-full p-2 border border-gray-300 rounded mb-2"/>
          <input type="text" value={themes} onChange={(e) => setThemes(e.target.value)} placeholder="Themes" className="w-full p-2 border border-gray-300 rounded mb-4"/>
          <button type="submit" disabled={isLoading} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full">
  {isLoading ? 'Generating...' : 'Generate'}
</button>
        </form>
        <div className="p-4">
          {generatedLogos.map((item, index) => (
            <div key={index} className="my-4">
              <img src={item.logoUrl} alt={`Logo for prompt`} className="w-64 h-64 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextToPromptLogoMaker;
