import {
  list,
  changeDirectory,
  removeFile,
  readFile,
  createFile,
  copyFile,
  moveFile,
  renameFile,
  calculateHash,
  compress,
  decompress,
} from "../services/index.js";
import { printInvalidMsg, getStringAfterCmd } from "../helpers/utils.js";
import { homedir, cpus, EOL, userInfo, arch } from "os";

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

  if (cmd === "os --EOL") {
    console.log(`${JSON.stringify(EOL)}\n`);
    return;
  }

  if (cmd === "os --cpus") {
    const info = cpus().map(({ model, speed }) => ({ model, speed: `${speed / 1000} GHz` }));
    console.table(info);
    return;
  }

  if (cmd === "os --homedir") {
    console.log(`${homedir()}\n`);
    return;
  }

  if (cmd === "os --username") {
    console.log(`${userInfo().username}\n`);
    return;
  }

  if (cmd === "os --architecture") {
    console.log(`${arch()}\n`);
    return;
  }

  if (cmd.startsWith("hash ")) {
    const path = getStringAfterCmd(cmd, 4);
    calculateHash(path);
    return;
  }

  if (cmd.startsWith("compress ")) {
    const [pathToFile, pathToDestination] = getStringAfterCmd(cmd, 8).split(" ");
    compress(pathToFile, pathToDestination);
    return;
  }

  if (cmd.startsWith("decompress ")) {
    const [pathToArchive, pathToDestination] = getStringAfterCmd(cmd, 10).split(" ");
    decompress(pathToArchive, pathToDestination);
    return;
  }

  printInvalidMsg();
};
