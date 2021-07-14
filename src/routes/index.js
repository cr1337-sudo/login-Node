const { Router } = require("express");
const router = Router()
const passport = require("passport");

const checkAuthentication = (req, res, next) => {
   if (req.isAuthenticated()) return next();
   res.redirect("/")

}


router.get("/", (req, res) => {
   res.render("index")
});

router.get("/signup", (req, res, next) => {
   res.render("signup")
})

router.post("/signup", passport.authenticate("local-signup", {
   successRedirect: "/profile",
   failureRedirect: "/signup",
   passReqToCallback: true
}))

router.get("/signin", (req, res, next) => {
   res.render("signin")
})

router.post("/signin", passport.authenticate("local-signin", {
   successRedirect: "/profile",
   failureRedirect: "/signin",
   passReqToCallback: true
}))


router.get("/profile", checkAuthentication, (req, res, next) => {
   console.log(req.user)
   res.send("PROFILE")
})


router.get("/logout", (req, res, next) => {
   req.logout();
   res.redirect("/")
})


module.exports = router;