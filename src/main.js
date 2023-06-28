// Bring in express and create app
let express = require("express");
let app = express();

// File to hold environment variables
require("dotenv").config();

// Give abilty to parse json
app.use(express.json());

// Connecting to routes defined in routes.js
let routes = require("./routes");
app.use(routes);

// Defining PORT, and telling it to use whatever is defined in environment
// If none use 9005
let PORT = process.env.PORT || 9005;


// Console log when app connects to port
app.listen(PORT, function(){
  console.log("ToDo app started on port ", PORT);
});