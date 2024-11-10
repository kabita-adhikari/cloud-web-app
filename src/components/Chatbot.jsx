// Chatbot.js
import { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([
    "Welcome to the Weather Chatbot!",
    "Ask me about the weather by entering a location.",
    "Type 'quit' to exit the chatbot.",
  ]);
  
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase() === "quit") {
      setMessages([...messages, "Goodbye!"]);
      return;
    }
    setMessages([...messages, `You asked about: ${userInput}`]);
    setUserInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chat-bubble">
        {messages.map((message, idx) => (
          <p key={idx} className="chatbot-response">{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userInput} 
          onChange={(e) => setUserInput(e.target.value)} 
          placeholder="Enter a location..."
          className="user-input"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
