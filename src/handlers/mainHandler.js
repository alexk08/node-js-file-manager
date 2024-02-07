import { list, changeDirectory, removeFile, readFile, createFile } from "../services/index.js";
import { printInvalidMsg, printCurrentPathMsg, getStringAfterCmd } from "../helpers/utils.js";

const handler = async (cmd) => {
  if (cmd === "ls") {
    await list(process.cwd());
    return;
  }

  if (cmd.startsWith("cd ")) {
    const path = getStringAfterCmd(cmd);
    changeDirectory(path);
    return;
  }

  if (cmd === "up") {
    changeDirectory("..");
    return;
  }

  if (cmd.startsWith("rm ")) {
    const path = getStringAfterCmd(cmd);
    await removeFile(path);
    return;
  }

  if (cmd.startsWith("cat ")) {
    const path = getStringAfterCmd(cmd, 3);
    readFile(path);
    return;
  }

  if (cmd.startsWith("add ")) {
    const fileName = getStringAfterCmd(cmd, 3);
    await createFile(fileName);
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
