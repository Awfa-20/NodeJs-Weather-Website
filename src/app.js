// @ts-nocheck
const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 

// defined path for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templetes/views')
const partialsPath= path.join(__dirname, '../templetes/partials')


// set up handlebers engine  and view locataion
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Aufa Alkarfan'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Aufa Alkarfan'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        helpText: ' this is help me text',
        title: 'Help',
        name: 'Aufa Alkarfan'
    })
})

app.get('/weather', (req, res)=>{

    if (!req.query.address) {
        return res.send({
            error: ' you must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if ( error ){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: "partly cloudy",
    //     location: "philadelphia",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title:'404 PAge',
        name: 'Aufa Alkarfan',
        errorMsg:'This help articl not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title:'404 PAge',
        name: 'Aufa Alkarfan',
        errorMsg:'This page not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Using Express Server On port 3000.')
})