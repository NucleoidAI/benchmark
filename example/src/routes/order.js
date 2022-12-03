const router = require("express").Router();
const Order = require("../models/order");
const Item = require("../models/item");

router.post("/", async function (req, res, next) {
  const result = await Order.create({
    qty: req.body.qty,
    ItemId: req.body.id,
  });
  res.json(result);
});

router.get("/", async function (req, res, next) {
  const result = await Order.findAll({ include: Item });
  res.json(result);
});

router.get("/:id", async function (req, res, next) {
  const result = await Order.findByPk(req.params.id, { include: Item });
  res.json(result);
});

router.post("/:id", async function (req, res, next) {
  const result = await Order.update(
    {
      qty: req.body.qty,
      ItemId: req.body.item,
    },
    { where: { id: req.params.id } }
  );
  res.json(result);
});

router.delete("/:id", async function (req, res, next) {
  const result = await Order.destroy({ where: { id: req.params.id } });
  res.json(result);
});

module.exports = router;
