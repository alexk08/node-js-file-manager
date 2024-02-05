import { argv } from "process";
import { createInterface } from "readline";
import { homedir } from "os";
import { stdin as input, stdout as output, cwd } from "process";
import { list } from "./ls.mjs";

class FileManager {
  _homedir = homedir();

  constructor() {}

  init() {
    const userName = argv.at(2)?.split("=")?.at(1) ?? "dear anon";

    const greeting = `Welcome to the File Manager, ${userName}!`;
    const pathMessage = `You are currently in ${cwd()}`;
    console.log(greeting);
    console.log(pathMessage);

    const rl = createInterface({
      input,
      output,
      terminal: false,
    });

    rl.addListener("SIGINT", () => {
      rl.close();
    });

    rl.on("line", async (line) => {
      if (line === ".exit") {
        rl.close();
        return;
      }

      if (line === "homedir") console.log(this._homedir);

      if (line === "ls") {
        console.table(await list(cwd()));
      }

      console.log(pathMessage);
    });

    rl.once("close", () => {
      const closeMessage = `Thank you for using File Manager, ${userName}, goodbye!`;
      console.log(closeMessage);
    });
  }
}

new FileManager().init();
