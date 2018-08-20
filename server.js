const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000;
let app = express()

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server log')
        }
    })
    next()
})

// UNDER MAINTENANCE

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Under Maintenance',
//         welcomeMessage: 'We will be back soon',
//     })
// })

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbsA')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    // res.send('<h1>Hello World</h1>')
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the most awesome website ever'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "You are bad and you should feel bad"
    })
})

app.listen(port, () => {
    console.log('Server now listening on port ' + port)
})
