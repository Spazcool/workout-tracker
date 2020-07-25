const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const path = require("path");
const db = require('./models')
const app = express();
const root = { root: path.join(__dirname, './public') };

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

// ------------------ API ROUTES ------------------
// getLastWorkout
app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});

// getWorkoutsInRange
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find()
    .populate('exercises')
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});

// ADD EXERCISE
app.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const tempExercise = {
    type : body.type,
    distance : body.distance,
    duration : body.duration,
    weight : body.weight,
    reps : body.reps,
    sets : body.sets,
    name : body.name,
  };

  db.Exercise.create(tempExercise)
    .then((data) => {
      db.Workout.findByIdAndUpdate(
        { _id: id },
        {
          $push: { exercises: data._id },
          $inc: { totalDuration: data.duration}
        },
        (err, result) => {
          if (err) {
            res.send(err)
          } else {
            res.send(result)
          }
        }
      )
    })
    .catch(err => res.json(err));
});

// CREATE WORKOUT
app.post("/api/workouts", (req, res) => {
  db.Workout.create({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

// ------------------ PUBLIC ROUTES ------------------
app.get('/', (req, res) => res.sendFile('./html/index.html', root));
app.get('/exercise', (req, res) => res.sendFile('./html/exercise.html', root));
app.get('/stats', (req, res) => res.sendFile('./html/stats.html', root));
app.get('*', (req, res) => res.sendFile('./html/index.html', root));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
