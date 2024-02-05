import { readdir } from "fs/promises";
import { ENOENT, ERROR_MESSAGE } from "./helpers/constants.mjs";

export const list = async (dirPath) => {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });

    const entities = files
      .map((file) => ({
        name: file.name,
        type: file.isFile() ? "file" : "directory",
      }))
      .reduce(
        (result, file) =>
          file.type === "file"
            ? { ...result, files: [...result.files, file] }
            : { ...result, directories: [...result.directories, file] },
        {
          files: [],
          directories: [],
        }
      );
    return [...entities.directories.sort(), ...entities.files.sort()];
  } catch (err) {
    if (err.code === ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};
