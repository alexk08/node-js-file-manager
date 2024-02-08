import { createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const decompress = async (pathToArchive, pathToDestination) => {
  try {
    const archiveName = pathToArchive.split("/").at(-1);

    const pathToFile =
      pathToDestination.at(-1) === "/"
        ? `${pathToDestination}${archiveName}`.split(".br")[0]
        : `${pathToDestination}/${archiveName}`.split(".br")[0];

    const brotli = createBrotliDecompress();
    const source = createReadStream(pathToArchive);
    const destination = createWriteStream(pathToFile);

    await pipeline(source, brotli, destination);
  } catch (err) {
    printErrorMsg();
  }
};
