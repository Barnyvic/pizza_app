const express = require("express")
const { requiresAuth } = require('express-openid-connect');
require("dotenv").config()
const Port = process.env.PORT | 4000
const auth0Middleware = require("./auth/auth")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', 'views');
app.set('view engine', 'ejs');

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth0Middleware)


// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.render('index', {
        user: req.oidc.user,
    });
});

//Get profile
// Add the requiresAuth middleware for routes that require authentication
app.get('/profile', requiresAuth(), (req, res) => {
    console.log(req.oidc.user);
    res.render('profile', {
        user: req.oidc.user,
    });

});



//catch errors middleware
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});



app.listen(Port, ()=>{
  console.log(`server Running on ${Port}`);
})