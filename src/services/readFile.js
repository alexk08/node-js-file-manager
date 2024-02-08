import { createReadStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const readFile = async (path) => {
  try {
    const readableStream = createReadStream(path);

    readableStream
      .on("error", () => {
        printErrorMsg();
      })
      .on("end", () => {
        process.stdout.write("\n\n");
      })
      .pipe(process.stdout);
  } catch {
    printErrorMsg();
  }
};
