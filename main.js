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
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=f553ea1ef891582d4233868a79cc11e9`);
        
        document.getElementsByTagName("p")[0].innerHTML=`There are ${response.data.list[0].main.temp}&#8451; in ${city}`;
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

})();