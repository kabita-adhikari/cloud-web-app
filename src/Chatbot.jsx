import React, { useState } from 'react';
import './App.css'

function Chatbot() {
  const [messages, setMessages] = useState([
    'Welcome to the Weather Chatbot!',
    'Ask me about the weather by entering a location.',
    'Type "quit" to exit the chatbot.'
  ]);
  const [userInput, setUserInput] = useState('');
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Display a chatbot message
  function displayChatbotMessage(message) {
    setMessages((prevMessages) => [...prevMessages, `Chatbot: ${message}`]);
  }

  // Display user input
  function displayUserInput(input) {
    setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
  }

  // Process the user input and fetch weather data
  function processUserInput() {
    const location = userInput;
    displayUserInput(location);
    setUserInput('');

    if (location.toLowerCase() === 'quit') {
      displayChatbotMessage('Goodbye!');
      return;
    }

    const apiUrl = 'http://api.weatherstack.com/current';
    const apiKey = import.meta.env.VITE_CHATBOT_WEATHERSTACK_API_KEY; // Replace with your actual weatherstack API key

    // Make API request to Weatherstack
    fetch(`${apiUrl}?access_key=${apiKey}&query=${location}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          displayChatbotMessage(`Unable to retrieve weather information for ${location}. Please try again.`);
        } else {
          const weather = {
            location: location,
            temperature: data.current.temperature,
            description: data.current.weather_descriptions[0],
            windSpeed: data.current.wind_speed,
            pressure: data.current.pressure,
            humidity: data.current.humidity,
            visibility: data.current.visibility,
            uvIndex: data.current.uv_index,
            background: 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg', // Default background image
          };

          setWeatherInfo(weather);

          displayWeather(weather);
        }
      })
      .catch(() => {
        displayChatbotMessage('Failed to fetch weather information. Please try again later.');
      });
  }

  // Display weather information
  function displayWeather(weather) {
    const weatherMessages = [
      `Here's the current weather update for ${weather.location}: The weather is ${weather.description} ☀️, with a temperature of ${weather.temperature}°C 🌡️.`,
      `There is a gentle breeze 🌬️, with wind speeds reaching ${weather.windSpeed} km/h. The air pressure stands at ${weather.pressure} mb, and the humidity is at ${weather.humidity}% 💧.`,
    
      `In terms of visibility, the conditions are clear with a range of ${weather.visibility} km 🌤️. Additionally, the UV index is ${weather.uvIndex} 🌞, so please take appropriate precautions if you're heading outside, especially if the UV index is high.`
    ];
    

    weatherMessages.forEach((msg) => displayChatbotMessage(msg));
  }

  // Handle user input submission (Enter key press)
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      processUserInput();
    }
  }

  return (
    <div className="chatbot-container" style={{ backgroundImage: `url(${weatherInfo?.background || 'default-image-url'})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
      <div className="chat-log">
        {messages.map((message, index) => (
          <div key={index} className={message.startsWith('Chatbot') ? 'chat-bubble' : 'user-input'}>
            {message}
          </div>
        ))}
      </div>

      <input
        id="user-input"
        type="text"
        value={userInput}  // Make sure this is bound to state
        onChange={(e) => setUserInput(e.target.value)}  // Update state when input changes
        onKeyDown={handleKeyDown}
        placeholder="Enter a location..."
        className="focus:outline-none w-full text-[#212121] text-base placeholder-gray-500"
      />
       

      <button onClick={processUserInput} className="send-button">Send</button>

      
    </div>
  );
}

export default Chatbot;
