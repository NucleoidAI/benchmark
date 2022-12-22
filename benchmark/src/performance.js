const request = require("./scenario");
const count = parseInt(process.argv[2] || 1);

const promises = [];

const before = Date.now();
for (let i = 0; i < count; i++) {
  const promise = request.run(i);
  promises.push(promise);
}

Promise.all(promises).then(() => {
  const after = Date.now();
  console.log(after - before);
});
