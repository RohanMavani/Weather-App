const request = require('request')


function geoCode(address, callback){
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmttNTI1MiIsImEiOiJjanZ5Nml0ankwY290NGFxdnUyZno0Ym1wIn0.RJ4Ir3Y_E_1RLHq4OHtuRg'

    request({url : URL, json: true } , function(error, response){

        if(error){
            callback("Unable to connect to weather service", undefined)
        } else if(response.body.features.length === 0){
            callback("Not able to find the location. Try another search..", undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
        
    })
}


module.exports = geoCode