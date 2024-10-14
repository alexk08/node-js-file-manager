import { rename } from "fs/promises";
import { printErrorMsg } from "../helpers/utils.js";

export const renameFile = async (pathToFile, newFileName) => {
  try {
    const filename = pathToFile.split("/").at(-1);
    const [basePath] = pathToFile.split(filename);

    const pathToCopiedFile = `${basePath}${newFileName}`;

    await rename(pathToFile, pathToCopiedFile);
  } catch (err) {
    printErrorMsg();
  }
};
