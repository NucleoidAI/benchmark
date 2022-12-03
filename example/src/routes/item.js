const router = require("express").Router();
const Item = require("../models/item");

router.post("/", async function (req, res, next) {
  const { name, barcode } = req.body;
  const result = await Item.create({ name, barcode });
  res.json(result);
});

router.get("/", async function (req, res, next) {
  const result = await Item.findAll({});
  res.json(result);
});

router.post("/:id", async function (req, res, next) {
  const { name, barcode } = req.body;
  const result = await Item.update(
    { name, barcode },
    { where: { id: req.params.id } }
  );
  res.json(result);
});

router.get("/:id", async function (req, res, next) {
  const items = await Item.findByPk(req.params.id);
  res.json(items);
});

router.delete("/:id", async function (req, res, next) {
  const result = await Item.destroy({ where: { id: req.params.id } });
  res.json(result);
});

module.exports = router;
