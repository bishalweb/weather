let weather = {
    apiKey: "7616b1593eb7200bc60fa818bb129f72",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid="
        + this.apiKey
      )
      .then((response) => {
        if(!response.ok) {
          alert("No weather found.");
          throw new Error("No Weather found.");
        }
        return response.json();
    })
      .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      console.log(name,icon,description,temp,humidity,speed);
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
      document.querySelector(".description").innerText =  description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".speed").innerText = "Wind Speed: " + speed + "km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage = "url('https://picsum.photos/1600/900?random" + name + "')";
    },
    search: function() {
      this.fetchWeather(document.querySelector(".search-bar").value);
    }
  };

  document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
  });

  document.querySelector(".search-bar").addEventListener("keyup", function(){
    if(event.key === "Enter"){
      weather.search();
    }
  });

  weather.fetchWeather("Kathmandu");