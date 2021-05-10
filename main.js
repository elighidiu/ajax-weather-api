// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f553ea1ef891582d4233868a79cc11e9
(() => {

    let cityField = document.getElementById("city");
    let searchButton  = document.getElementById("search");
    let city;

    cityField.addEventListener("change",  getInput);
    searchButton.addEventListener("click", function(){
        weatherData(city);            
    });

    //using Axios library to get the current weather 
    async function weatherData(city) {
        try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=6&appid=f553ea1ef891582d4233868a79cc11e9`); // added units as metrics to display the temperature in Celsius as per api documentation
       
        response.data.list.forEach((element, index) => {
            console.log(element.main.temp);
           // displayForecast(city, element.main.temp, index);
            displayForecast(city, element, index);
        });
        
        
        console.log(response);
      

        } catch (error) {
        console.error(error);
        }
    }
 
    // get the input city from the user     
    function getInput(e){
        city = e.target.value;
        return city;
    };

    function displayForecast(location, weatherDetails, index){
       
        //document.getElementsByTagName("p")[index].innerHTML=`There are ${temperature}&#8451; in ${location}`;
        let card = document.getElementsByClassName("card")[index];

        let tempText = document.createElement("p");
        let weatherText = document.createElement("p");
        
        //console.log(card);
        tempText.innerHTML = `There are ${weatherDetails.main.temp}&#8451; in ${location}`;
        weatherText.innerHTML = `There are ${weatherDetails.weather[0].main} : ${weatherDetails.weather[0].description} in ${location}`;

        card.appendChild(tempText);
        card.appendChild(weatherText);
        
    }

})();