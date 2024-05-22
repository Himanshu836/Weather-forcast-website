const { json } = require("express");
const request = require("request")

const openWeatherMap = {
    BASE_URL:"https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"2d6b2c46411c84d3bd7c6673d69a615d"
}

const WeatherData = (address, callback)=>{
    const url = openWeatherMap.BASE_URL+encodeURIComponent(address)+"&APPID="+openWeatherMap.SECRET_KEY;
    console.log(url)
    request({url,json:true},(error,data)=>{
        if(error){
            callback("unable to fetch data.Please try again later"+error)
        }
        callback(false,data?.body);
    })
}

module.exports =WeatherData;