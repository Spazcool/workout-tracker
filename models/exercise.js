const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({

  type: {
    type: String,
    trim: true,
    required: 'Type is required',
    default: 'cardio',
    // todo add a custom validation for both cardio and resistance string match
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    default: 'Unnamed Exercise',
  },
  distance: {
    type: Number,
    required: 'Distance is required',
    default: 0,
  },
  duration: {
    type: Number,
    required: 'Duration is required',
    default: 0,
  },
  weight: {
    type: Number,
    required: 'Weight is required',
    default: 0,
  },
  sets: {
    type: Number,
    required: 'Sets is required',
    default: 0,
  },
  reps: {
    type: Number,
    required: 'Reps is required',
    default: 0,
  },
  id: {
    type: Number,
    required: 'Id is required',
  }

  // password: {
  //   type: String,
  //   trim: true,
  //   required: "Password is Required",
  //   //TODO EXAMPLE OF CUSTOM VALIDATION
  //   validate: [
  //     ({length}) => length >= 6,
  //     "Password should be longer."
  //   ]
  // },

  // email: {
  //   type: String,
  //   unique: true,
  //   //todo EXAMPLE OF MATCH METHOD
  //   match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  // },

  // lastUpdated: Date,
  // fullName: String
});

// ExerciseSchema.methods.setFullName = function() {
//   this.fullName = `${this.firstName} ${this.lastName}`;
// };

// ExerciseSchema.methods.lastUpdatedDate = function() {
//   this.lastUpdated = Date.now();
// };

// This creates our model from the above schema, using mongoose's model method
const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
