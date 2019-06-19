// Modules 
const express = require('express')
const app = express()

const hbs = require('hbs')
const path = require('path')

// load geocode and forecast 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// set up the handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialPath)

// set up the static directory
app.use(express.static(staticPath))

app.get('', function(req, res){
    res.render('weather')
})

app.get('/weather', function(req, res){

    if(!req.query.address){
        return res.send({
            error : "You must provide the address"
        })
    }
    
    // supply the parameters to geocode 
    geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, {forecastData} = {})=>{
            if(error){
                return res.send({error})  
            }

            res.send({
                forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/help', function(req, res){
    res.render('help')
})

app.get('/about', function(req, res){
    res.render('about')
})

app.listen(3000, () => {
    console.log("You are on port 3000......")
})

