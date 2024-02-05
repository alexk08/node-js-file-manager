import { readdir } from "fs/promises";
import { ENOENT, ERROR_MESSAGE } from "./helpers/constants.mjs";

export const list = async (dirPath) => {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });

    return files.map((file) => ({
      name: file.name,
      type: file.isFile() ? "file" : "directory",
    }));
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};
