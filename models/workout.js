const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

// ExerciseSchema.methods.setFullName = function() {
//   this.fullName = `${this.firstName} ${this.lastName}`;
// };

// ExerciseSchema.methods.lastUpdatedDate = function() {
//   this.lastUpdated = Date.now();
// };

// This creates our model from the above schema, using mongoose's model method
const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
