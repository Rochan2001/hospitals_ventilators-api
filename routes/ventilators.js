const router = require("express").Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

router.use(bodyParser.json());

router.route("/").get((req, res) => {
  db.collection("ventilator")
    .find({})
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

router.route("/hospitalName/:hospName").get((req, res) => {
  db.collection("ventilator")
    .find({ name: req.params.hospName + " hospital" })
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

router.route("/status/:status").get((req, res) => {
  db.collection("ventilator")
    .find({ status: req.params.status })
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

router.route("/add").post((req, res) => {
  db.collection("ventilator").insertOne(req.body, function (err, ventilator) {
    if (err) throw err;
    res.json("ventilator added");
  });
});

router.route("/update/:id").post((req, res) => {
  var myquery = { _id: new mongodb.ObjectID(req.params.id) };
  console.log(req.body);
  var newvalues = { $set: req.body };
  db.collection("ventilator").updateOne(myquery, newvalues, function (
    err,
    ventilator
  ) {
    if (err) throw err;
    res.json("ventilator updated");
  });
});

router.route("/:id").delete((req, res) => {
  var myquery = { _id: new mongodb.ObjectID(req.params.id) };
  db.collection("ventilator").deleteOne(myquery, function (err, ventilator) {
    if (err) throw err;
    else res.json("ventilator deleted");
  });
});

module.exports = router;
