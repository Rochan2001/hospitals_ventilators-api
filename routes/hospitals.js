const router = require("express").Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const verifyToken = require("../verify");

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
router.route("/add").post(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      db.collection("hospital").insertOne(req.body, function (err, hospital) {
        if (err) throw err;
        res.json("hospital added");
      });
    }
  });
});

//delete a hospital using id
router.route("/:id").delete(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      var myquery = { _id: new mongodb.ObjectID(req.params.id) };
      db.collection("hospital").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        else res.json("Hospital deleted");
      });
    }
  });
});

//update a hospital using id
router.route("/update/:id").post(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
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
    }
  });
});

module.exports = router;
