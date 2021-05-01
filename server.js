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
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Routes
app.use(require("/routes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
