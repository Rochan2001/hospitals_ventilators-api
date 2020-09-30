var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

// create application/json parser

const hospitalsRouter = require("./routes/hospitals");
const ventilatorsRouter = require("./routes/ventilators");
const authentificationRouter = require("./routes/authentification");

const MongoClient = require("mongodb").MongoClient;

var app = express();

const url = "mongodb://127.0.0.1:27017";
const dbName = "hospitalInventory";
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db(dbName);
  console.log(`Connected Database: ${url}`);
  console.log(`Database : ${dbName}`);
  app.use("/hospitals", hospitalsRouter);
  app.use("/ventilators", ventilatorsRouter);
  app.use("/auth", authentificationRouter);
});

app.use(logger("dev"));

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
