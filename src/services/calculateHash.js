import { createHash } from "crypto";
import { createReadStream } from "fs";
import { printErrorMsg } from "../helpers/utils.js";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");

  const input = createReadStream(filePath);
  input
    .on("readable", () => {
      const data = input.read();
      if (data)
        hash.update(data).on("error", () => {
          printErrorMsg();
        });
      else {
        console.log(`${hash.digest("hex")}\n`);
      }
    })
    .on("error", () => {
      printErrorMsg();
    });
};
