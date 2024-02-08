import {
  list,
  changeDirectory,
  removeFile,
  readFile,
  createFile,
  copyFile,
  moveFile,
  renameFile,
} from "../services/index.js";
import { printInvalidMsg, getStringAfterCmd } from "../helpers/utils.js";

export const mainHandler = async (cmd) => {
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

  if (cmd.startsWith("rn ")) {
    const [pathToFile, newFileName] = getStringAfterCmd(cmd).split(" ");
    renameFile(pathToFile, newFileName);
    return;
  }

  if (cmd.startsWith("cp ")) {
    const [pathToFile, pathToNewDirectory] = getStringAfterCmd(cmd).split(" ");
    await copyFile(pathToFile, pathToNewDirectory);
    return;
  }

  if (cmd.startsWith("mv ")) {
    const [pathToFile, pathToNewDirectory] = getStringAfterCmd(cmd).split(" ");
    await moveFile(pathToFile, pathToNewDirectory);
    return;
  }

  printInvalidMsg();
};
