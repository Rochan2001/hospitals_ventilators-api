const router = require("express").Router();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

router.use(bodyParser.json());

router.route("/login").post((req, res) => {
  var id = req.body.id;
  var username = req.body.username;
  var hospital = req.body.hospital;
  // Mock user
  const user = {
    id: id,
    username: username,
    hospital: hospital,
  };
  console.log(user);
  jwt.sign({ user }, "secretkey", { expiresIn: "1200s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

module.exports = router;
