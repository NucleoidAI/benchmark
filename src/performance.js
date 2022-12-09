const request = require("./scenario");

const count = 1;

const before = Date.now();
for (let i = 0; i < count; i++) {
  request.run(i);
}
const after = Date.now();

console.log(after - before);
