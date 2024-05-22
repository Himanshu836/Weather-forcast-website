var weatherApi ="/weather";
const weatherForm = document.querySelector("form")
const search =document.querySelector("input")
// console.log(search)
const weatherIcon = document.querySelector(".weatherIcon i")
const weatherCondition = document.querySelector(".weatherCondition")
const tempElement = document.querySelector(".temperature span")

const dateElement = document.querySelector(".date")
const locationElement = document.querySelector(".place")

const currentDate = new Date();
const options = {month : "long"}
const monthName =currentDate.toLocaleString("en-us",options)

dateElement.textContent=currentDate.getDate()+","+monthName;

if("geolocation" in navigator){
  locationElement.textContent=("Loading...")
  navigator.geolocation.getCurrentPosition(
    function (position){
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
      fetch(apiUrl)
      .then((res)=>res.json())
      .then((data)=>{
        if(data && data.address && data.address.city){
          const city = data.address.city;
          showData(city)
        }else{
          console.log("City not found")
        }
      }).catch((err)=>{
        console.log(err)
      })
    },function (error){
      console.log(error.message)
    }
  )
}else{
  console.log("Geoolocation not found.")
}


weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    locationElement.textContent="Loading..."
    weatherIcon.className="";
    tempElement.textContent="";
    weatherCondition.textContent="";
    showData(search.value)
})

// console.log(search.value)
function showData(city){
    // console.log(city.value)
    getWeatherData(city,(result)=>{
        // console.log(result)
        if(result.cod === 200){
          if(result.weather[0].description == "rain" ||result.weather[0].description =="fog"){
            weatherIcon.className = "wi wi-day-cloudy" + result.weather[0].description;
          }else{
            weatherIcon.className = "wi wi-day-cloudy"
          }
         
          locationElement.textContent=result?.name
          tempElement.textContent = (result?.main?.temp-273.5).toFixed(2)+String.fromCharCode(176)
          weatherCondition.textContent = result?.weather[0].description?.toUpperCase()
        }else{
          locationElement.textContent ="city not found"
        }
    })
}

function getWeatherData(city, callback) {
    const locationApi = weatherApi + "?address=" + city;
    fetch(locationApi).then((response) => {
      response.json().then((response) => {
        callback(response);
      });
    });
  }