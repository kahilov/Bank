const express = require("express");
const app = express();
const api = require("./routes/api");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/bankDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});

app.use("/", api);

const port = 4000;

app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
