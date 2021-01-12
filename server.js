t// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const listening = function() {
    console.log(`Server is up and running on ${port}`);
}

const server = app.listen(port, listening);


//Create a POST route
const postInfo = function(req,res) {
    console.log(req.body);
    newEntry = {
        name: req.body.name,
        date: req.body.date,
        current: req.body.current,
        min: req.body.min,
        max: req.body.max,
        sky: req.body.sky,
        feel: req.body.feels
    }
   projectData = newEntry;
    res.send(projectData);
}


app.post('/weather',postInfo);

//Create a GET request function

const getData = function(req,res) {
    res.send(projectData);
}

app.get('/all',getData);
