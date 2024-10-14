import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const copyFile = async (pathToFile, pathToNewDirectory) => {
  try {
    const readableStream = createReadStream(pathToFile);
    const filename = pathToFile.split("/").at(-1);

    const pathToCopiedFile =
      pathToNewDirectory.at(-1) === "/"
        ? `${pathToNewDirectory}${filename}`
        : `${pathToNewDirectory}/${filename}`;

    const writableStream = createWriteStream(pathToCopiedFile);
    await pipeline(readableStream, writableStream);
  } catch {
    printErrorMsg();
  }
};
