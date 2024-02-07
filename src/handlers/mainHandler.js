import { list, changeDirectory, removeFile } from "../services/index.js";
import { printInvalidMsg, printCurrentPathMsg } from "../helpers/utils.js";

const handler = async (cmd) => {
  if (cmd === "ls") {
    const fileList = await list(process.cwd());
    console.table(fileList);
    return;
  }

  if (cmd.startsWith("cd ")) {
    const path = cmd.slice(2).trim();
    changeDirectory(path);
    return;
  }

  if (cmd === "up") {
    changeDirectory("..");
    return;
  }

  if (cmd.startsWith("rm ")) {
    const path = cmd.slice(2).trim();
    removeFile(path);
    return;
  }

  printInvalidMsg();
};

export const mainHandler = async (cmd, closeCallback) => {
  if (cmd === ".exit") {
    closeCallback();
    return;
  }

  await handler(cmd);

  printCurrentPathMsg();
};
