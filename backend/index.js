// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
// Import routes
let apiRoutes = require("./api-routes");
// Use env files
require('dotenv').config()

// Using serverless
const serverless = require("serverless-http");


// set up cors
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, 
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); 

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// var mongoDBUrl = 'mongodb://localhost/ContactBook(TaskB)'
// console.log(process.env.isPROD)
// if (process.env.isPROD == 'True')
//     var mongoDBUrl = process.env.PRODUrl;

var mongodbUri = 'mongodb+srv://admin:admin@cluster0.pthalgf.mongodb.net/test';

// Connect to Mongoose and set connection variable
mongoose.connect(mongodbUri, 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true

});

var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("MongoDB is connected successfully!")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express!'));

// Use Api routes in the App
app.use('/api', apiRoutes);


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running ContactBook on port " + port);
});

//module.exports = app
module.exports.handler = serverless(app);
