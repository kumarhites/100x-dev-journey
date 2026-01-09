function run() {
  console.log("start");

  Promise.resolve().then(() => {
    console.log("promise 1");

    Promise.resolve().then(() => {
      console.log("promise 2");
    });
  });

  setTimeout(() => {
    console.log("timeout 1");

    setTimeout(() => {
      console.log("timeout 2");

      console.log("end");
    }, 0);
  }, 0);
}


run();