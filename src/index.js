const { fork } = require("child_process");

const pNumber = 5;

const processes = [];
for (let i = 0; i < pNumber; i++) {
  processes.push(fork("./src/request.js"));
}

const list = [];
let counter = 0;

processes.forEach((p) => {
  p.on("message", (msg) => list.push(msg));
  p.on("exit", () => ++counter === pNumber && printResult());
});

function printResult() {
  console.log(
    list,
    list.length,
    "avg :",
    list.reduce((prev, curr) => {
      return curr.time + prev;
    }, 0) / list.length
  );
}
