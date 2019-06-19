// fetch the weather info from the api
console.log('Client is waiting...')


const weatherForm = document.getElementById('main-form')
const search = document.getElementById('location')
const forecast_message = document.getElementById('weather-message')
const location_message = document.getElementById('location-message')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    const searchItem = search.value

    forecast_message.textContent = 'loading...'
    location_message.textContent = ''
    
    
    fetch('http://localhost:3000/weather?address=' + searchItem).then((response) => {
    
        response.json().then((data) => {
            if(data.error){
                forecast_message.textContent = data.error
            }else{
                location_message.textContent = data.location
                forecast_message.textContent = data.forecastData
            }
        })
    })

    
})