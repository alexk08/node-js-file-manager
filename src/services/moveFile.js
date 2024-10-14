import { printErrorMsg } from "../helpers/utils.js";
import { copyFile } from "./copyFile.js";
import { removeFile } from "./removeFile.js";

export const moveFile = async (pathToFile, pathToNewDirectory) => {
  try {
    await copyFile(pathToFile, pathToNewDirectory);
    await removeFile(pathToFile);
  } catch {
    printErrorMsg();
  }
};
