import { dirname } from "path";
import { fileURLToPath } from "url";
import { rm } from "fs/promises";
import { ENOENT, ERROR_MESSAGE } from "../helpers/constants.mjs";

export const getFilename = (url) => fileURLToPath(url);
export const getDirname = (url) => dirname(getFilename(url));
export const removeFile = async (path) => {
  try {
    await rm(path);
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};
