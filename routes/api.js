const router = require('express').Router();
const db = require('../models')

// getLastWorkout
router.get("/workouts", (req, res) => {
  db.Workout.find()
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});

// getWorkoutsInRange
router.get("/workouts/range", (req, res) => {
  db.Workout.find()
    .populate('exercises')
    .then((data) => res.json(data))
    .catch((err) => res.json(err))
});

// ADD EXERCISE
router.put("/workouts/:id", (req, res) => {
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
router.post("/workouts", (req, res) => {
  db.Workout.create({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
});

module.exports = router;
