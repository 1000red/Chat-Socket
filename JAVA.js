const worker = new Worker("worker.js");

worker.onmessage = function (e) {
  console.log("sum from Worker= ", e.data);
};

worker.onerror = function (error) {
  console.log("Error from Worker= ", error);
};

const largeNum = 10;
worker.postMessage(largeNum);
