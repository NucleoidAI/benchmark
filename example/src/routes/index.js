const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.json({ message: "Hello World" });
});

module.exports = router;
