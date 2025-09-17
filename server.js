require("dotenv").config();
const express=require("express");
const app=express();
const path=require("path");
//const fetch = require("node-fetch"); // CommonJS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running at Port http://localhost:${PORT}`);
});

app.get("/",(req,res)=>{
     res.render("home.ejs",{ data: null });
});

app.get("/weather/city",async (req,res)=>{
    const city=req.query.city;
    const apiKey=process.env.API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
   // console.log(url);
    const response= await fetch(url);
    const weather= await response.json();
     //console.log(data.main.temp);
    res.render("report.ejs",{weather});

});

