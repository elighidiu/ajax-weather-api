// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f553ea1ef891582d4233868a79cc11e9
(() => {

    let cityField = document.getElementById("city");
    let searchButton  = document.getElementById("search");
    let city;

    cityField.addEventListener("change",  getInput);
    searchButton.addEventListener("click", function(){
        removeData();    
        weatherData(city);  
       
         
    });
    
    //using Axios library to get the current weather 
    async function weatherData(city) {
        try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f553ea1ef891582d4233868a79cc11e9`); // added units as metrics to display the temperature in Celsius as per api documentation

        console.log(response);

        getCurrentWeather(response.data.city.name, response.data.list[0].main.temp); //displays the city name, temperature and date for current time

        //LINE 27 -> 53 HAVE BEEN REPLACED WITH FUNCTION displayDailyForecast

        // var dayOne = filterDate(response.data.list, 0);
        // var dayTwo = filterDate(response.data.list, 1);
        // var dayThree = filterDate(response.data.list, 2);
        // var dayFour = filterDate(response.data.list, 3);
        // var dayFive = filterDate(response.data.list, 4);

        //    for(let i=0; i<=4; i++){
        //         displayDate(i);
        //     }
             

        // dayOne.forEach((element) => {
        //     displayForecast(element, 0);
        // });
        // dayTwo.forEach((element) => {
        //     displayForecast(element, 1);
        // });
        // dayThree.forEach((element) => {
        //     displayForecast(element, 2);
        // });
    
        // dayFour.forEach((element) => {
        //     displayForecast(element, 3);
        // });
        // dayFive.forEach((element) => {
        //     displayForecast(element, 4);
        // });

        displayFiveDaysForecast(response.data.list); //display daily weather information for each day
        
        } catch (error) {
        console.error(error);
        }
    }
  
    function displayFiveDaysForecast(weatherData){
        for(let i=0; i<=4; i++){
            displayDate(i); // displays the date for each day 
            var filteredDate = filterDate(weatherData, i);
            filteredDate.forEach(element => displayForecast(element, i)); //foreach goes through each element in the date array created and displays the weather information
       }
    }

    // get the input city from the user     
    function getInput(e){
        city = e.target.value;
        return city;
    };

    function displayForecast(weatherDetails, index){        
        let card = document.getElementsByClassName("card")[index];
       
        let weatherText = document.createElement("p"); 

        weatherText.innerHTML = `${weatherDetails.dt_txt.slice(10,16)} - ${weatherDetails.main.temp}&#8451; - ${weatherDetails.weather[0].main}`; //slice(10,16) selects only the hour & minutes information from the date

        card.appendChild(weatherText);   
    }

    function appendZeroes(n){
        if(n <= 9){
          return "0" + n;
        }
        return n;
      }
      
   function getCurrentDate(addedDay){
        let current_datetime = new Date(); //gets today date
        dateTime = current_datetime.addDays(addedDay); //addDays adds x(addedDay) numbers of days to the current date
        //let dateTime = current_datetime.setDate(current_datetime.getDate()+addedDay);
        //console.log(dateTime);

        let formatted_date = dateTime.getFullYear() + "-" + appendZeroes((dateTime.getMonth() + 1)) + "-" + appendZeroes(dateTime.getDate()); //getMonth() + 1 is used to return the correct month, as getMonth returns the index of the month begining from 0
      
        return formatted_date; 
    
   }

   Date.prototype.addDays = function(days) { //copied the function. need to look more how to rewrite or understand
       var date = new Date(this.valueOf());
       date.setDate(date.getDate()+ days);
       return date;
   }

  function filterDate(weatherDetails, addedDay){ // argument use will be response.data.list - an array with weather info for various periods over the days
      let filterInfo = weatherDetails.filter((element) =>{ 
            var sliceDate = element.dt_txt.slice(0,10); //gets the date removing the hour and min info
            if(sliceDate===getCurrentDate(addedDay)){ //checks if the date we got from the list is the same with the required date (current date, +1, +2, +3, +4)
                return element; 
        }
        });
    return filterInfo; //returns the array with the information filtered by date
  } 


  function getCurrentWeather(location, temperature){
        document.getElementById("location").innerHTML=`${location} ${temperature}&#8451;`;
        document.getElementById("date").innerText=`${formatDate(getCurrentDate(0))}`; // function formatDate takes as argument the date string returned by getCurrentDate function 

  }

  //this function chnages the format from yyyy-mm-dd into dd-mm-yyyy
  function formatDate(dateString){ 
      let year = dateString.slice(0,4); 
      let month = dateString.slice(5,7);
      let day = dateString.slice(8,10);
    return `${day}-${month}-${year}`;
  }

  //removes content for all elements with class card and position 0 -> 4
 function removeData(){
     for(let i=0; i<=4; i++){
        document.getElementsByClassName("card")[i].innerHTML=""; 
     }
      
  }

  //this function creates the h2 element where the date will be displayed
  function displayDate(index){
      let card = document.getElementsByClassName("card")[index]; //the index will be a value from 0 to 4 corresponding to the position in HTML doc
      let heading = document.createElement("h2");
      heading.innerHTML = formatDate(getCurrentDate(index)); //takes the corresponding date, changes its format and adds it in the heading h2
      card.appendChild(heading);
  } 
  


})();