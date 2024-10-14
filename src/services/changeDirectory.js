import { printErrorMsg } from "../helpers/utils.js";

export const changeDirectory = (path) => {
  try {
    process.chdir(path);
  } catch {
    printErrorMsg();
  }
};
