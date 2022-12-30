const router = require("express").Router();
const Item = require("../dto/item");
const itemService = require("../services/item-service");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    barcode: Joi.string().required(),
  });
  const { name, barcode } = Joi.attempt(req.body, schema);

  const item = new Item(name, barcode);
  const result = await itemService.create(item);

  res.json({ ...result });
});

router.get("/:id", async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { id } = Joi.attempt(req.params, schema);

  const item = await itemService.read(id);

  item ? res.json(item) : res.status(404).end();
});

router.post("/:id", async (req, res) => {
  const paramsSchema = Joi.object({
    id: Joi.number().required(),
  });
  const bodySchema = Joi.object({
    name: Joi.string().required(),
    barcode: Joi.string().required(),
  });

  const { id } = Joi.attempt(req.params, paramsSchema);
  const { name, barcode } = Joi.attempt(req.body, bodySchema);

  await itemService.update(id, { name, barcode });

  res.status(200).end();
});

router.delete("/:id", async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { id } = Joi.attempt(req.params, schema);
  await itemService.del(id);
  res.status(200).end();
});

router.get("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { name } = Joi.attempt(req.query, schema);
  const result = await itemService.list(name);

  res.json(result);
});

module.exports = router;
