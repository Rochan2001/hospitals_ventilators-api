const router = require("express").Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
const verifyToken = require("../verify");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

// get all ventilators
router.route("/").get((req, res) => {
  db.collection("ventilator")
    .find({})
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

// get ventilators according to the hospitalname
router.route("/hospitalName/:hospName").get((req, res) => {
  db.collection("ventilator")
    .find({ name: req.params.hospName + " hospital" })
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

// get ventilators according to the status
router.route("/status/:status").get((req, res) => {
  db.collection("ventilator")
    .find({ status: req.params.status })
    .toArray(function (err, ventilators) {
      if (err) throw err;
      res.json(ventilators);
    });
});

//add a ventilator
router.route("/add").post(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      db.collection("ventilator").insertOne(req.body, function (
        err,
        ventilator
      ) {
        if (err) throw err;
        res.json("ventilator added");
      });
    }
  });
});

//update a ventilator using id
router.route("/update/:id").post(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
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
    }
  });
});

// delete a ventilator by id
router.route("/:id").delete(verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      var myquery = { _id: new mongodb.ObjectID(req.params.id) };
      db.collection("ventilator").deleteOne(myquery, function (
        err,
        ventilator
      ) {
        if (err) throw err;
        else res.json("ventilator deleted");
      });
    }
  });
});

module.exports = router;
