const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
//Logging in the dev environment
app.use(logger("dev"));
//MongoSetup
const dbName = "fitnesstracker"
const mongoConfig = {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`, mongoConfig);

const db = require("./models/Workout");

//Express setup
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes

//Basic HTML Routes
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '/public/exercise.html'));
  });
app.get("/stats",(req,res) =>{
  res.sendFile(path.join(__dirname, '/public/stats.html'));
  });

//Get the last workout
app.get("/api/workouts", (req, res) => {
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
app.put("/api/workouts/:id", (req, res) => {
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
app.post("/api/workouts", (req, res) => {
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
app.get("/api/workouts/range", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
