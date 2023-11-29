import axios from 'axios';
import { useState } from 'react';

const ChatComponent = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      console.log("User input is empty.");
      return; // Do not send request if userInput is empty
    }

    const updatedConversation = [...conversation, { role: 'user', content: userInput }];
    setConversation(updatedConversation);

    try {
      const response = await axios.post('https://chatbot-ai-murex.vercel.app/api/chat', { messages: updatedConversation });
      const aiResponse = response.data.result;

      setConversation([...updatedConversation, { role: 'assistant', content: aiResponse }]);
      setUserInput('');
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-4 py-2 border-b border-gray-300 text-lg font-semibold">
        Chat with Assistant
      </div>
      <div className="p-4 max-h-96 overflow-y-auto" style={{ minHeight: '300px' }}>
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === 'user'
                ? 'flex justify-end items-end'
                : 'flex justify-start items-end'
            }`}
          >
            <div
              className={`${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-500 text-white'
              } rounded-lg p-2 max-w-2/3`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 border border-gray-300 rounded-full"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  );
};

export default ChatComponent;
