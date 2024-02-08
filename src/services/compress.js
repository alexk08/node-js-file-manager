import { createBrotliCompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const compress = async (pathToFile, pathToDestination) => {
  try {
    const filename = pathToFile.split("/").at(-1);

    const pathToArchive =
      pathToDestination.at(-1) === "/"
        ? `${pathToDestination}${filename}.br`
        : `${pathToDestination}/${filename}.br`;

    const brotli = createBrotliCompress();
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathToArchive);

    await pipeline(source, brotli, destination);
  } catch (err) {
    printErrorMsg();
  }
};
