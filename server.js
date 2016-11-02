const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
const publicPath = path.join(__dirname, '/public');
const partialsPath = path.join(__dirname, '/views/partials');


app.set('view engine', 'hbs');

hbs.registerPartials(partialsPath);


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
    
// });

app.use(express.static(publicPath));


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        message: 'Welcome to home page!!!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
        currentYear: new Date().getFullYear()
    });
})


app.get('/bad', (req, res) => {
    res.send({
        error: 'unable to handle request'
    });
})


app.listen(port, () => {
    console.log(`server started on port ${port}`);
});