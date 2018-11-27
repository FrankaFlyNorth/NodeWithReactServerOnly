const express = require("express");
// import passport for authentification with google
const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20").Strategy;
// import client keys for our auth strategies
const keys = require("./config/keys");

/* generating our express application.
app will be used to configure the different route handlers.
app represents the underlying express server from now on.
*/
const app = express();

/* Tell the general passport that there is a strategy that specifies on google auth
   and tell it to use this.
   Give client id and client secret which are provided directly from the google services */
passport.use(
  new GoogleStategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback" // route the user is going to be send to after they grants permission to our app on google
    },
    // call back function is called when we successfully exchanged our code for a user profile
    (accessToken, refreshToken, profile, done) => {
      console.log("access token: ", accessToken);
      console.log("refresh token: ", refreshToken);
      console.log("profile    ", profile);
    }
  )
);

// route handler to start passport flow
app.get(
  "/auth/google/",
  // "google" is associated with the googleStrategy internally
  passport.authenticate("google", {
    // asking google to give us access to the users profile and email
    scope: ["profile", "email"]
  })
);

// this time passport sees the code inside the url, that google returned to us
// so it knows that we are trying to get the actual user data this time (not like the route handler above)
app.get("/auth/google/callback", passport.authenticate("google"));

/* get the dynamic port Heroku provides us with.
   look at the underlying environment and see if they have declared a port for us to use OR
   in case we are running this code in a development environment, use 5000 (because process.env is not defined) */
const PORT = process.env.PORT || 5000;
// Express tells NodeJS to listen for incoming requests on a specific port
app.listen(PORT);
