import { open } from "fs/promises";
import { printErrorMsg } from "../helpers/utils.js";

export const createFile = async (filePath) => {
  try {
    const fileHandle = await open(filePath, "wx");
    await fileHandle.close();
  } catch {
    printErrorMsg();
  }
};
