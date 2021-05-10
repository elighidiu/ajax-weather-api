// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f553ea1ef891582d4233868a79cc11e9

//using Axios library to get the api 
async function getData() {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f553ea1ef891582d4233868a79cc11e9`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
}
//var city = "Antwerp";
getData();