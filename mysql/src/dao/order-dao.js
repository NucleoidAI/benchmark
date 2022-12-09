const Order = require("../models/order");
const InvalidOrder = require("../errors/invalid-order");
const InvalidItem = require("../errors/invalid-item");
const Item = require("../models/item");

async function create(order) {
  try {
    const result = await Order.create({ ...order });
    return result.toJSON();
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw new InvalidOrder("INVALID_ITEM");
    }
  }
}

async function read(id) {
  const order = await Order.findByPk(id);
  return order ? order.toJSON() : null;
}

async function update(id, order) {
  let result;

  try {
    [result] = await Order.update(order, { where: { id } });
  } catch (err) {
    if (err.name === "SequelizeForeignKeyConstraintError") {
      throw new InvalidOrder("INVALID_ITEM");
    }
  }

  if (result !== 1) {
    throw new InvalidItem("MISSING_RECORD");
  }
}

async function del(id) {
  const result = await Order.destroy({ where: { id } });

  if (result !== 1) {
    throw new InvalidOrder("MISSING_RECORD");
  }
}

async function list() {
  const result = await Order.findAll({ include: Item });
  return result.map((r) => r.toJSON());
}

module.exports = { create, read, update, del, list };
