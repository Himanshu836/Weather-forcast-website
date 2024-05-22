const express = require("express")
const hbs = require("hbs")
const path = require("path")


const app = express()
const WeatherData=require("../utils/WeatherData")
// const exp = require("constants")
// const { title } = require("process")

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");


app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
    res.render("index",{title:"Weather App"})
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
      return res.json({message:"Address is required"})
    }
    WeatherData(req.query.address, (error, result) => {
      if (error) {
        return res.send(error);
      }
  
      res.send(result);
    });
  });

app.get("*",(req,res)=>{
    res.render("404",{title:"page not found"})
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})