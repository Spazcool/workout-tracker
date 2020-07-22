const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const path = require("path");

const Exercise = require("./models/exercise.js");
const Workout = require("./models/workout.js")
const app = express();
const root = { root: path.join(__dirname, './public') };

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/custommethoddb", { useNewUrlParser: true });

// Routes
app.get("/api/workouts", (req, res) => {
  console.log('moo')
  // call to mongo db for all the workouts
  // res.json(data)
});
app.get("/api/workouts/range", (req, res) => {
  // call to mongo db for all the workouts
  // res.json(data)
});

app.put("/api/workouts/:id", (req, res) => {
 
});

app.post("/api/workouts", (req, res) => {
  const body = req.body;
  console.log(body)
  // const tempExercise = new Exercise({
    // type : body.workoutData.type,
    // distance : body.workoutData.distance,
    // duration : body.workoutData.duration,
    // weight : body.workoutData.weight,
    // reps : body.workoutData.reps,
    // sets : body.workoutData.sets,
    // name : body.workoutData.name,
  // })
  const tempWorkout = {
    name : 'doug'
  }

  Workout.create(tempWorkout)
    .then(data => {
      console.log('data? ', data)
      // If saved successfully, send the the new User document to the client
      res.json(data);
    })
    .catch(err => {
      // If an error occurs, send the error to the client
      res.json(err);
    });
});

// ------------------ PUBLIC ----------------
app.get('/exercise', (req, res) => res.sendFile('exercise.html', root));

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//todo EXAMPLE OF POST TO MONGODB
// Route to post our form submission to mongoDB via mongoose
app.post("/submit", ({body}, res) => {
  // Create a new user using req.body

  // Update this route to run the `setFullName` and `lastUpdatedDate` methods before creating a new User
  // You must create these methods in the model.
  // const tempUser = new User({
  //   username : body.username,
  //   firstName : body.firstName,
  //   lastName : body.lastName,
  //   password : body.password,
  //   email : body.email,
  //   userCreated : body.userCreated,
  // })
  // tempUser.setFullName();
  // tempUser.lastUpdatedDate();
  // User.create(tempUser)
  //   .then(dbUser => {
  //     // If saved successfully, send the the new User document to the client
  //     res.json(dbUser);
  //   })
  //   .catch(err => {
  //     // If an error occurs, send the error to the client
  //     res.json(err);
  //   });
});
