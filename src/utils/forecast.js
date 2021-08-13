const request = require('request')

const forecast=(longitude,latitude,callback) => {
    const url='http://api.weatherstack.com/current?access_key=c4893cae1f414a401f546d2e6a2804b1&query='+latitude+','+longitude+'&units=f'

    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect with server!!!',undefined)
        }
        else if (body.error){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] +", its currently "+ (body.current.temperature) +" degrees but it feels like "+(body.current.feelslike) +" degrees outside. Humdity is "+(body.current.humidity) +"% period")
        }
    })
}

module.exports =forecast