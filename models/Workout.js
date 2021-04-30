const mongoose = require("mongoose");
// need /workouts
// need /workouts/range
const Schema = mongoose.Schema;
const workout = new Schema({
    // date: "Date",
    // totalDuration: "Total Workout Duration",
    // numExercises: "Exercises Performed",
    // totalWeight: "Total Weight Lifted",
    // totalSets: "Total Sets Performed",
    // totalReps: "Total Reps Performed",
    // totalDistance: "Total Distance Covered"
    date: {
        type: Date,
        default: Date.now
    },
    totalDuration: {
        type: Number,
        trim: true,
        required: "Product name is required"
    },
    numExercises: {
        type: Number,
        trim: true,
        required: "Category name is required"
    },
    totalWeight: {
        type: Number,
        trim: true,
        required: "Product description is required"
    },
    totalSets: {
        type: Number,
        trim: true,
        required: "Product price is required"
    },
    totalReps: {
        type: Number,
        trim: true,
        required: "Product price is required"
    },
    totalDistance: {
        type: Number,
        trim: true,
        required: "Product price is required"
    },
});
const Workout = mongoose.model("Workout", workout);
module.exports = Workout;