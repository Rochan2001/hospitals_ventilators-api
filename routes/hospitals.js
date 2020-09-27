const router = require("express").Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

router.use(bodyParser.json());

//get all the hospitals
router.route("/").get((req, res) => {
  db.collection("hospital")
    .find({})
    .toArray(function (err, hospitals) {
      if (err) throw err;
      res.json(hospitals);
    });
});

//get hospital by name
router.route("/:name").get((req, res) => {
  db.collection("hospital")
    .find({ name: req.params.name + " hospital" })
    .toArray(function (err, hospitals) {
      if (err) throw err;
      res.json(hospitals);
    });
});

//add a hospital
router.route("/add").post((req, res) => {
  db.collection("hospital").insertOne(req.body, function (err, hospital) {
    if (err) throw err;
    res.json("hospital added");
  });
});

//delete a hospital using id
router.route("/:id").delete((req, res) => {
  var myquery = { _id: new mongodb.ObjectID(req.params.id) };
  db.collection("hospital").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    else res.json("Hospital deleted");
  });
});

//update a hospital using id
router.route("/update/:id").post((req, res) => {
  var myquery = { _id: new mongodb.ObjectID(req.params.id) };
  console.log(req.body);
  var newvalues = { $set: req.body };
  db.collection("hospital").updateOne(myquery, newvalues, function (
    err,
    hospital
  ) {
    if (err) throw err;
    res.json("Hospital updated");
  });
});

module.exports = router;
