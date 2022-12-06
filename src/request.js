const uuid = require("uuid").v4;
const { faker } = require("@faker-js/faker");

const axios = require("axios");

const nucURL = "http://localhost:3000/api/";
const expressURL = "http://localhost:5000/";

const baseURL = nucURL;

const api = {
  "GET/": {
    url: baseURL,
    method: "get",
    body: {},
  },
  "GET/items": {
    url: baseURL + "items",
    method: "get",
    body: {},
  },
  "GET/items/{id}": (id) => {
    return {
      url: baseURL + "items/" + id,
      method: "get",
      body: {},
    };
  },
  "POST/items": {
    url: baseURL + "items",
    method: "post",
    body: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
  },
  "POST/items/{id}": (id) => {
    return {
      url: baseURL + "items/" + id,
      method: "post",
      body: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
    };
  },
  "GET/orders": {
    url: baseURL + "orders",
    method: "get",
    body: {},
  },
  "GET/orders/{id}": (id) => {
    return {
      url: baseURL + "orders/" + id,
      method: "get",
      body: {},
    };
  },
  "POST/orders": (itemID) => {
    return {
      url: baseURL + "orders",
      method: "post",
      body: { item: itemID, qty: faker.datatype.number },
    };
  },
  "POST/orders/{orderID}": ({ itemID, orderID }) => {
    return {
      url: baseURL + "orders/" + orderID,
      method: "post",
      body: { item: itemID, qty: faker.datatype.number },
    };
  },
};

async function request(req) {
  const start = Date.now();
  const result = await axios({
    method: req.method,
    url: req.url,
    data: req.body,
  });
  const end = Date.now();

  return { result: result, time: end - start };
}

async function sleep(sec) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, sec * 1000)
  );
}

async function runScenario() {
  const t1 = await request(api["POST/items"]);
  await sleep(1);
  const t2 = await request(api["POST/items"]);
  await sleep(1);
  const t3 = await request(api["GET/items/{id}"](t2.result.data.id));
  await sleep(2);
  const t4 = await request(api["POST/orders"](t2.result.data.id));
  await sleep(1);
  const t5 = await request(api["GET/orders/{id}"](t4.result.data.id));

  const avgTime = (t1.time + t2.time + t3.time + t4.time + t5.time) / 5;

  process.send({ id: uuid(), time: avgTime });
}

runScenario();
