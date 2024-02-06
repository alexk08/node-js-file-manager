import { cwd, stdout, exit, stdin, argv } from "process";
import { exec, spawn } from "child_process";
import { homedir } from "os";
import { list } from "./ls.mjs";
import { getDirname } from "./helpers/utils.mjs";

const userName = argv?.at(-1);
const greeting = `Welcome to the File Manager, ${userName}!\n`;
const pathMessage = `You are currently in ${cwd()}\n`;
stdout.write(greeting);
stdout.write(pathMessage);

const echoInput = async (chunk) => {
  const chunkStringified = chunk.toString().trim();

  if (chunkStringified === ".exit") {
    const closeMessage = `Thank you for using File Manager, ${userName}, goodbye!\n`;
    stdout.write(closeMessage);
    exit(0);
  }

  if (chunkStringified === "ls") {
    console.table(await list(cwd()));
  }

  if (chunkStringified === "up") {
    spawn("cd", ["../"], {
      stdio: ["pipe", "pipe", "inherit", "ipc"],
      cwd: getDirname(import.meta.url),
    });
  }

  if (chunkStringified.startsWith("cd")) {
    spawn(chunkStringified, { cwd: getDirname(import.meta.url) });
  }

  stdout.write(pathMessage);
};

stdin.on("data", echoInput);
