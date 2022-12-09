const { faker } = require("@faker-js/faker");
const axios = require("axios").default;
const { equal } = require("assert");

const url = "https://nucleoid.com/sandbox/84a63e3e-93f5-4014-b6c1-c62ebfe2500c";

const steps = [
  // 0 Create item
  async () => {
    const { status, data } = await axios({
      method: "post",
      url: `${url}/api/items`,
      data: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
    });
    equal(status, 200);
    return data;
  },
  // 1 Get item
  async (item) => {
    const { status } = await axios({
      method: "get",
      url: `${url}/api/items/${item.id}`,
    });
    equal(status, 200);
  },
  // 2 Update item
  async (item) => {
    const { status } = await axios({
      method: "post",
      url: `${url}/api/items/${item.id}`,
      data: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
    });
    equal(status, 200);
  },
  // 3 List item
  async (item) => {
    const { status } = await axios({
      method: "get",
      url: `${url}/api/items`,
      params: {
        name: item.name,
      },
    });
    equal(status, 200);
  },
  // 4 Create order
  async (item) => {
    const { status, data } = await axios({
      method: "post",
      url: `${url}/api/orders`,
      data: { item: item.id, qty: faker.datatype.number() },
    });
    equal(status, 200);
    return data;
  },
  // 5 Get order
  async (item, order) => {
    const { status } = await axios({
      method: "get",
      url: `${url}/api/orders/${order.id}`,
    });
    equal(status, 200);
  },
  // 6 Update order
  async (item, order) => {
    const { status } = await axios({
      method: "post",
      url: `${url}/api/orders/${order.id}`,
      data: { item: item.id, qty: faker.datatype.number() },
    });
    equal(status, 200);
  },
  // 7 List order
  async () => {
    const { status } = await axios({
      method: "get",
      url: `${url}/api/orders`,
    });
    equal(status, 200);
  },
];
async function run() {
  const item = await steps[0]();
  await steps[1](item);
  await steps[2](item);
  await steps[3](item);
  const order = await steps[4](item);
  await steps[5](item, order);
  await steps[6](item, order);
  await steps[7](item, order);
}

module.exports = { run };
