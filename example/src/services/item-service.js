const itemDAO = require("../dao/item-dao");

async function create(item) {
  return itemDAO.create(item);
}

async function read(id) {
  return itemDAO.read(id);
}

async function update(id, item) {
  await itemDAO.update(id, item);
}

async function del(id) {
  await itemDAO.del(id);
}

async function list(name) {
  return itemDAO.list(name);
}

module.exports = { create, read, update, del, list };
