const request = require('request')

function forecast(latitude, longitude, callback){

    const URL = 'https://api.darksky.net/forecast/4b97b6b35a2a4c6a209559bf43b5659d/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({url : URL, json : true}, function(error, response){
        if(error){
            callback("Unable to connect to forecast service", undefined)
        }else if(response.body.error){
            callback(response.body.error, undefined)
        }else{
            callback(undefined, {
                forecastData : response.body.daily.data[0].summary + ' It is currently ' +
                response.body.currently.temperature + ' degrees out. This high today is ' +  response.body.daily.data[0].temperatureHigh +' with a low of ' + response.body.daily.data[0].temperatureLow +'. The probability of having rain in the next hour is ' +
                response.body.hourly.data[0].precipProbability + '.'
            })
        }
    })
}

module.exports = forecast