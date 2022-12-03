const uuid = require("uuid").v4;
const { faker } = require("@faker-js/faker");

const axios = require("axios");

const nucURL = "http://localhost:3000/api/";
const expressURL = "http://localhost:5000/";

const baseURL = nucURL;

const requests = [
  {
    url: baseURL,
    method: "get",
    body: {},
  },
  {
    url: baseURL + "items",
    method: "get",
    body: {},
  },
  {
    url: baseURL + "items",
    method: "post",
    body: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
  } /*
  {
    url: baseURL + "items/" + Math.floor(Math.random() * 1000),
    method: "get",
    body: {},
  },
  {
    url: baseURL + "items/" + Math.floor(Math.random() * 1000),
    method: "post",
    body: { name: faker.commerce.product(), barcode: faker.datatype.uuid() },
  },*/,
];

async function request() {
  const req = requests[Math.floor(Math.random() * requests.length)];

  const start = Date.now();
  await axios({ method: req.method, url: req.url, data: req.body });
  const end = Date.now();

  process.send({ id: uuid(), time: end - start });
}

request();
