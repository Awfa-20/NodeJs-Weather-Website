const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=d6a9a7c4ec49d0377c25d75069a6a223&query=' + latitude + ',' + longitude


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,' the Weather is '+ body.current.weather_descriptions[0]+ ' It is currently ' + body.current.temperature + ' degress out. It feels like ' + body.current.feelslike + ' degree.')
        }
    })
}

module.exports = forecast