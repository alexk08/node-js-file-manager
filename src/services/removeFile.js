import { rm } from "fs/promises";
import { printErrorMsg } from "../helpers/utils.js";

export const removeFile = async (path) => {
  try {
    await rm(path);
  } catch {
    printErrorMsg();
  }
};
