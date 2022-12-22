const Item = require("../models/item");
const InvalidItem = require("../errors/invalid-item");

async function create(item) {
  try {
    const result = await Item.create(item);
    return result.toJSON();
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new InvalidItem("INVALID_BARCODE");
    }
  }
}

async function read(id) {
  const item = await Item.findByPk(id);
  return item ? item.toJSON() : null;
}

async function update(id, item) {
  let result;

  try {
    [result] = await Item.update(item, { where: { id } });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw new InvalidItem("INVALID_BARCODE");
    }
  }

  if (result !== 1) {
    throw new InvalidItem("MISSING_RECORD");
  }
}

async function del(id) {
  const result = await Item.destroy({ where: { id } });

  if (result !== 1) {
    throw new InvalidItem("MISSING_RECORD");
  }
}

async function list(name) {
  const result = await Item.findAll({ name });
  return result.map((r) => r.toJSON());
}

module.exports = { create, read, update, del, list };
