const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    // date: "Date",
    // duration: "Total Workout Duration",
    // exercises: "Exercises Performed",
    // weight: "Total Weight Lifted",
    // totalSets: "Total Sets Performed",
    // totalReps: "Total Reps Performed",
    // totalDistance: "Total Distance Covered"
      day: { 
      type: Date, 
      required: true, 
      default: Date.now 
  },
  exercises: [{
    type: {
        type: String,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    distance: {
        type: Number,
        trim: true,
    },
    duration: {
        type: Number,
        trim: true,
    },
    weight: {
        type: Number,
        trim: true,
    },
    sets: {
        type: Number,
        trim: true,
    },
    reps: {
        type: Number,
        trim: true,
    },

}]

})
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;