const orderDAO = require("../dao/order-dao");

async function create(order) {
  return orderDAO.create(order);
}

async function read(id) {
  return orderDAO.read(id);
}

async function update(id, order) {
  await orderDAO.update(id, order);
}

async function del(id) {
  await orderDAO.del(id);
}

async function list() {
  return orderDAO.list();
}

module.exports = { create, read, update, del, list };
