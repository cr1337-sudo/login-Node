const express = require('express')
const port = process.env.PORT || 3000
const path = require("path")
const ejs = require("ejs-mate")
const indexRouter = require("./routes/index")
const morgan = require('morgan')
const passport = require('passport')
const session = require("express-session")
const flash = require("connect-flash")

//Initializations
const app = express()
require("./database")
require("./passport/local-auth")

//Settings
app.set("views", path.join(__dirname, "views"))
app.engine("ejs", ejs)
app.set("view engine", "ejs")

//Midlewares
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))//false porque solo recibe texto
app.use(session({
   secret: "mysecretsession",
   resave: false,
   saveUninitialized: false
}))
app.use(flash())//Debe ir despues de sesiones y antes de passport
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
   app.locals.signupMessage = req.flash("signupMessage")
   next()
})

//Routes
app.use("/", indexRouter)


app.listen(port, () => console.log(`Example app listening on port port!`))