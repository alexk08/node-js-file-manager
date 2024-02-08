import { createInterface } from "readline";
import { homedir } from "os";
import { printCloseMsg, printCurrentPathMsg, printGreetingMsg } from "./helpers/utils.js";
import { mainHandler } from "./handlers/mainHandler.js";

const init = () => {
  const { argv, stdin: input, stdout: output, chdir } = process;
  const userName = argv.at(2)?.split("=")?.at(1) ?? "dear anon";

  chdir(homedir());
  printGreetingMsg(userName);
  printCurrentPathMsg();

  const rl = createInterface({
    input,
    output,
    prompt: "",
  });

  rl.on("line", async (cmd) => {
    process.stdout.write("\n");

    if (cmd === ".exit") {
      rl.close();
      return;
    }

    await mainHandler(cmd);

    printCurrentPathMsg();
  });

  rl.once("close", () => printCloseMsg(userName));
};

init();
