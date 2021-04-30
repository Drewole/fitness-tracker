const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
//Logging in the dev environment
app.use(logger("dev"));

//MongoSetup
const dbName = "fitnesstracker"
const mongoConfig = {
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/${dbName}`, mongoConfig);

//Express setup
const PORT = process.env.PORT || 3000;

const User = require("./models/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", ({ body }, res) => {
  User.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
