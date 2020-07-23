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

// Routes
app.get("/api/workouts", (req, res) => {
  // call to mongo db for all the workouts
  // res.json(data)
});

app.get("/api/workouts/range", (req, res) => {
  // call to mongo db for all the workouts
  // res.json(data)
});

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

// db.Note.create(body)
// .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))

  db.Exercise.create(tempExercise)
    .then((data) => {
      const exId = data._id;
      console.log(1, exId, id)
      db.Workout.findByIdAndUpdate(
        { _id: id },
        { $push: { exercises: exId } },
        (err, result) => {
          if(err){
            console.log(err)
            // res.send(err)
        }else{
          console.log(result)
            // res.send(result)
        }
        }
      )
        // .then((data) => {
        //   console.log(2, data)
        //   res.json(data)})
        // .catch(err => {
        //   console.log(3, err)

        //   res.json(err)});
    })
    .catch(err => {
      console.log(4, err)

      res.json(err)});
})

app.post("/api/workouts", (req, res) => {

  // const tempWorkout = new Workout();
  db.Workout.create({})
    .then(data => res.json(data))
    .catch(err => res.json(err));
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
