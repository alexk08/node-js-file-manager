import { createReadStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const readFile = async (path) => {
  try {
    const readableStream = createReadStream(path);

    readableStream
      .on("error", () => {
        printErrorMsg();
      })
      .pipe(process.stdout);
  } catch {
    printErrorMsg();
  }
};
