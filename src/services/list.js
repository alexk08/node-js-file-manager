import { readdir } from "fs/promises";
import { printErrorMsg } from "../helpers/utils.js";

export const list = async (dirPath) => {
  try {
    const files = await readdir(dirPath, { withFileTypes: true });

    const entities = files
      .sort((a, b) => a.name.localeCompare(b.name))
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
    console.table([...entities.directories, ...entities.files]);
  } catch {
    printErrorMsg();
  }
};
