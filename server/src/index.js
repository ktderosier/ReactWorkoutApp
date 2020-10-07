const express = require('express')
const session = require('express-session');
const bodyParser     = require('body-parser');
require('./mongo');

//variables
const port = 3001

//setup
const app = express();

// SET UP CORS AS MIDDLEWARE, SO any client can make a request to our server
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
const userRouter = require("./routes/userRoutes");
const exercisesRouter = require("./routes/exercisesRoutes");
const workoutsRouter = require("./routes/workoutsRoutes");

// //middleware
// app.use(express.json()); //parse JSON body
// app.use(session({
//     secret: "fluffy window cat", //a random string do not copy this value or your stuff will get hacked
//     resave: false,
//     saveUninitialized: false 
// }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/exercises", exercisesRouter);
app.use("/api/workouts", workoutsRouter);


// Start server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))