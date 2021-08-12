const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();//creating to store express application


//paths to express config
const publicDirectoryPath = path.join(__dirname, '../public')//importing HTML file to app.js
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handlbar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//setup static directories to serve
app.use(express.static(publicDirectoryPath))//loading HTML file to home page

//home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rohan'
    })
})

//about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Rohan'
    })
})

//help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rohan'
    })
})

//weather page endpoint
app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'please enter location to search weather !'
        })
    }

    const location = req.query.location

    geocode(location, (error, { latitude, longitude, location }={}) => {

        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.location,
                location,
                forcast: forecastData,
            })
        })
    })
})

// app.get('/product',(req,res)=>{
//     if(!req.query.search){
//     return res.send({
//             errormsg:'please enter search terms'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         product:[]
//     })
// })

//error of help page
app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Rohan',
        errormsg: 'Help Artical Not Found !'
    })
})

//error page for all
app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Rohan',
        errormsg: 'Page Not Found!'
    })
})

app.listen(3000, () => {
    console.log('server is up on port number 3000')
})//starting the server

// app.get('',(req,res)=>{
    //     res.send('<h1> Hello express </h1>')
    // })//display text on home page


    // app.get('/help',(req,res)=>{
        //     res.send([{
//         name:"aaaa"
//     },{
//         name:"bbbbbbb",
//         age:10
//     }])
// })//display text on root page


// app.get('/about',(req,res)=>{
//     res.send('<h1>About express </h1>')
// })
