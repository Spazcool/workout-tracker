const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Number,
    default: new Date(),
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ],
  totalDuration: {
    type: Number,
    default: 0,
  }
});

WorkoutSchema.methods.calculateDurationTotal = (num) => {
  //make a db.Exercise call on all 
  this.totalDuration += num;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
