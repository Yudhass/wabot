import { spawn } from "child_process";

(function start() {
  const x = spawn(process.argv0, ["main.js"], {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });
  x.on("message", (msg) => {
    if (msg === "restart") {
      x.kill();
      x.once("exit", start);
    }
  });
  x.on("exit", (code) => {
    if (code) {
      start();
    }
  });
  x.on("error", console.log);
})();
