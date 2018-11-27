// root file in our projecconst app

const express = require("express");
/* generating our express application.
app will be used to configure the different route handlers.
app represents the underlying express server from now on.
*/
const app = express();

// create route handler and associate it with the express app
// route handler that is listening to HTTP GET requests on the specified route ('/')
// The arrow function is called automatically by express whenever a request comes in on the route.
app.get("/", (req, res) => {
  // immediatly close the request and
  // send a json object as response back to the browser that send a request
  res.send({ hi: "there" });
});

/* get the dynamic port Heroku provides us with.
   look at the underlying environment and see if they have declared a port for us to use OR
   in case we are running this code in a development environment, use 5000 (because process.env is not defined) */
const PORT = process.env.PORT || 5000;
// Express tells NodeJS to listen for incoming requests on a specific port
app.listen(PORT);
