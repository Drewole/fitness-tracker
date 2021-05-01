const router = require('express').Router();
const path = require("path");
const db = require('../models/Workout.js');

//Basic HTML Routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"));
  });
app.get("/stats",(req,res) =>{
  res.sendFile(path.join(__dirname + "/public/stats.html"))
  });

//Get the last workout
router.get("/api/workouts", (req, res) => {
    db.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
    ])
        .sort({ day: -1 })
        .limit(1)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

//Find a workout by ID and update it.
router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(
        req.params.id, 
        { 
            $push: 
            { 
                exercises: req.body 
            } 
        },
        { new: true }
        )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//Add New
router.post("/api/workouts", (req, res) => {
    body = req.body;
    db.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//Get Range of Workouts
router.get("/api/workouts/range", (req, res) => {
    db.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
    ])
    .sort( { day: -1 })
    .limit(7)
    .then(dbWorkout => {
        //console.log("dbWorkout", dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;