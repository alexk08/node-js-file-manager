import { dirname } from "path";
import { fileURLToPath } from "url";
import { COLORS } from "./constants.js";

export const getFilename = (url) => fileURLToPath(url);
export const getDirname = (url) => dirname(getFilename(url));
export const getStringAfterCmd = (cmd, cmdLength = 2) => cmd.slice(cmdLength).trim();

export const printCurrentPathMsg = () => {
  console.log(COLORS.info, `You are currently in ${process.cwd()}\n`);
};

export const printGreetingMsg = (userName) => {
  console.log(COLORS.success, `Welcome to the File Manager, ${userName}!\n`);
};

export const printCloseMsg = (userName) => {
  console.log(COLORS.success, `Thank you for using File Manager, ${userName}, goodbye!\n`);
};

export const printInvalidMsg = () => {
  console.log(COLORS.warning, "Invalid input\n");
};

export const printErrorMsg = () => {
  console.log(COLORS.error, "Operation failed\n");
};
