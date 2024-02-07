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

  const closeReadLine = () => {
    rl.close();
  };

  rl.on("line", (cmd) => mainHandler(cmd, closeReadLine));

  rl.once("close", () => printCloseMsg(userName));
};

init();
