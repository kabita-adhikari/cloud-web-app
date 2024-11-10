$(document).ready(function() {
    // Select elements
    var chatLog = $('#chat-log');
    var userInput = $('#user-input');
  
    // Display chatbot message
    function displayChatbotMessage(message) {
      var chatBubble = $('<div>').addClass('chat-bubble');
      chatBubble.text(message);
      chatLog.append(chatBubble);
    }
  
    // Display user input
    function displayUserInput(input) {
      var userBubble = $('<div>').addClass('user-input');
      userBubble.text(input);
      chatLog.append(userBubble);
    }
  
    // Display weather information
    function displayWeatherInfo(weather) {
      var weatherContainer = $('<div>').addClass('weather-info');
      var location = $('<p>').text('The Weather in ' + weather.location + ' is ' + weather.description);
      weatherContainer.append(location);
  
      var temperature = $('<p>').text('Temperature: ' + weather.temperature + '°C');
      weatherContainer.append(temperature);
  
      var windSpeed = $('<p>').text('Wind Speed: ' + weather.windSpeed + ' km/h');
      weatherContainer.append(windSpeed);
  
      var pressure = $('<p>').text('Pressure: ' + weather.pressure + ' mb');
      weatherContainer.append(pressure);
  
      var humidity = $('<p>').text('Humidity: ' + weather.humidity + '%');
      weatherContainer.append(humidity);
  
      var visibility = $('<p>').text('Visibility: ' + weather.visibility + ' km');
      weatherContainer.append(visibility);
  
      var uvIndex = $('<p>').text('UV Index: ' + weather.uvIndex);
      weatherContainer.append(uvIndex);
  
      chatLog.append(weatherContainer);
    }
  
    // Display company logo
    function displayCompanyLogo(logoUrl) {
      var logoContainer = $('<div>').addClass('logo-container');
      var logoImage = $('<img>').attr('src', logoUrl);
      logoContainer.append(logoImage);
      chatLog.append(logoContainer);
    }
  
    // Process user input and retrieve weather information
    function processUserInput() {
      var location = userInput.val();
      displayUserInput(location);
      userInput.val('');
  
      if (location.toLowerCase() === 'quit') {
        displayChatbotMessage('Chatbot: Goodbye!');
        return;
      }
  
      var apiUrl = 'http://api.weatherstack.com/current';
      var apiKey = 'c9c0e5b8df7f4b89f74ccf8f9a6bf007'; //  weatherstack API key
  
      // Make API request to Weatherstack
      $.get(apiUrl, {
        access_key: apiKey,
        query: location
      }).done(function(data) {
        if (data.success === false) {
          displayChatbotMessage('Chatbot: Unable to retrieve weather information for ' + location + '. Please try again.');
        } else {
          var temperature = data.current.temperature;
          var description = data.current.weather_descriptions[0];
          var windSpeed = data.current.wind_speed;
          var pressure = data.current.pressure;
          var humidity = data.current.humidity;
          var visibility = data.current.visibility;
          var uvIndex = data.current.uv_index;
          var background = 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg'; // Replace with the URL of your default background image
          var weather = {
            background: background,
            location: location,
            temperature: temperature,
            description: description,
            windSpeed: windSpeed,
            pressure: pressure,
            humidity: humidity,
            visibility: visibility,
            uvIndex: uvIndex
          };
  
          // Clear existing chat bubbles and company logo
          chatLog.empty();
          displayCompanyLogo('https://assets-global.website-files.com/6064b31ff49a2d31e0493af1/639dcdedbeb26a76d9c0ba14_weatherstack.svg'); // Replace with the URL of your company logo image
  
          // Display weather image and weather information
          displayWeather(weather);
          displayWeatherInfo(weather);
        }
      }).fail(function() {
        displayChatbotMessage('Chatbot: Failed to fetch weather information. Please try again later.');
      });
    }
  
    // Handle user input submission
    $('#user-input').on('keydown', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        processUserInput();
      }
    });
  
    // Initial chatbot message
    displayChatbotMessage('Chatbot: Welcome to the Weather Chatbot!');
    displayChatbotMessage('Chatbot: Ask me about the weather by entering a location.');
    displayChatbotMessage('Chatbot: Type "quit" to exit the chatbot.');
  
    // Display default background image
    var defaultBackgroundImage = 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg'; // Replace with the URL of your default background image
    $('body').css({
      'background-image': 'url(' + defaultBackgroundImage + ')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });
  });