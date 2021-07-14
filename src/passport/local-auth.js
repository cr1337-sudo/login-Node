const passport = require("passport");
const LocalStatregy = require("passport-local").Strategy;
const User = require("../models/User")


//Esto se encarga de enviar entre pestañas los datos del usuario
passport.serializeUser((user, done) => {
   //Serializar datos
   done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user)
})

//LocalStrategy recibe dos parametros
//Primero los datos
//Segundo un callback donde se especifica como se manejan esos datos
passport.use("local-signup", new LocalStatregy({
   usernameField: "email",
   passwordField: "password",
   passReqToCallback: true
   //Permite que se envien más datos, además de los necesarios para la autenticacion
   //Ej: nombre, foto, etc
}, async (req, email, password, done) => {
   const repeatedUser = await User.findOne({ email })
   if (repeatedUser) return done(null, false, req.flash("signupMessage", "Email is already taken"))

   const user = new User({ email });
   user.password = user.encryptPassword(password)
   await user.save()
   //Donde hace terminar el proceso de registro
   done(null, user)


}))

passport.use("local-signin", new LocalStatregy({
   usernameField: "email",
   passwordField: "password",
   passReqToCallback: true
}, async (req, email, password, done) => {

   const user = await User.findOne({ email })
   if (user) {
      if (!user.comparePassword(password)) {
         return done(null, false, req.flash("signupMessage", "Incorrect password"))
      }
      done(null, user)
   }
}))