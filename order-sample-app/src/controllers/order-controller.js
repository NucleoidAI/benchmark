const router = require("express").Router();
const Order = require("../dto/order");
const orderService = require("../services/order-service");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    item: Joi.number().required(),
    qty: Joi.number().required(),
  });
  const { item, qty } = Joi.attempt(req.body, schema);

  const order = new Order(item, qty);
  const result = await orderService.create(order);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { id } = Joi.attempt(req.params, schema);

  const order = await orderService.read(id);

  order ? res.json(order) : res.status(404).end();
});

router.post("/:id", async (req, res) => {
  const paramsSchema = Joi.object({
    id: Joi.number().required(),
  });
  const bodySchema = Joi.object({
    qty: Joi.number().required(),
    item: Joi.number().required(),
  });

  const { id } = Joi.attempt(req.params, paramsSchema);
  const { qty, item } = Joi.attempt(req.body, bodySchema);

  await orderService.update(id, { qty, item });

  res.status(200).end();
});

router.delete("/:id", async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { id } = Joi.attempt(req.params, schema);
  await orderService.del(id);
  res.status(200).end();
});

router.get("/", async (req, res) => {
  const result = await orderService.list();
  res.json(result);
});

module.exports = router;
