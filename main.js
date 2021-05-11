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
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f553ea1ef891582d4233868a79cc11e9`); // added units as metrics to display the temperature in Celsius as per api documentation

        console.log(response);
            
        var dayOne = filterDate(response.data.list, 0);
        var dayTwo = filterDate(response.data.list, 1);
        var dayThree = filterDate(response.data.list, 2);
        var dayFour = filterDate(response.data.list, 3);
        var dayFive = filterDate(response.data.list, 4);

        document.getElementsByTagName("h2")[0].innerText= formatDate(getCurrentDate(0)); 
        document.getElementsByTagName("h2")[1].innerText= formatDate(getCurrentDate(1)); 
        document.getElementsByTagName("h2")[2].innerText= formatDate(getCurrentDate(2)); document.getElementsByTagName("h2")[3].innerText= formatDate(getCurrentDate(3)); document.getElementsByTagName("h2")[4].innerText= formatDate(getCurrentDate(4)); 
            
        getCurrentWeather(response.data.city.name, dayOne[0].main.temp);
             

        dayOne.forEach((element) => {
            displayForecast(element, 0);
        });
        dayTwo.forEach((element) => {
            displayForecast(element, 1);
        });
        dayThree.forEach((element) => {
            displayForecast(element, 2);
        });
        dayThree.forEach((element) => {
            displayForecast(element, 3);
        });
        dayFour.forEach((element) => {
            displayForecast(element, 4);
        });
        dayFive.forEach((element) => {
            displayForecast(element, 5);
        });

        

        } catch (error) {
        console.error(error);
        }
    }
  

    // get the input city from the user     
    function getInput(e){
        city = e.target.value;
        return city;
    };

    function displayForecast(weatherDetails, index){
       
        
        let card = document.getElementsByClassName("card")[index];

        //let tempText = document.createElement("p"); 
        let weatherText = document.createElement("p");
        
     
        //tempText.innerHTML = `There are ${weatherDetails.main.temp}&#8451; in ${location}`;
        weatherText.innerHTML = `${weatherDetails.dt_txt.slice(10,16)} - ${weatherDetails.main.temp}&#8451; - ${weatherDetails.weather[0].main}`;

        //card.appendChild(tempText);
        card.appendChild(weatherText);
        
    }

    function appendZeroes(n){
        if(n <= 9){
          return "0" + n;
        }
        return n;
      }
      
   function getCurrentDate(addedDay){
        let current_datetime = new Date();
        dateTime = current_datetime.addDays(addedDay);
        let formatted_date = dateTime.getFullYear() + "-" + appendZeroes((dateTime.getMonth() + 1)) + "-" + appendZeroes(dateTime.getDate());
        return formatted_date;
    
   }

   Date.prototype.addDays = function(days) {
       var date = new Date(this.valueOf());
       date.setDate(date.getDate()+ days);
       return date;
   }

  function filterDate(weatherDetails, addedDay){
      let filterInfo = weatherDetails.filter((element) =>{
            var sliceDate = element.dt_txt.slice(0,10);
            if(sliceDate===getCurrentDate(addedDay)){
            return element;
        }
        });
    return filterInfo;
  } 


  function getCurrentWeather(location, temperature){
        document.getElementById("location").innerHTML=`${location} ${temperature}&#8451;`;
        document.getElementById("date").innerText=`${formatDate(getCurrentDate(0))}`; 

  }

  function formatDate(dateString){
      let year = dateString.slice(0,4);
      let month = dateString.slice(5,7);
      let day = dateString.slice(8,10);
    return `${day}-${month}-${year}`;
  }

})();