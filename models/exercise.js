const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: { type: String },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  distance: { type: Number },
  duration: { type: Number },
  weight: { type: Number },
  sets: { type: Number },
  reps: { type: Number },
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
