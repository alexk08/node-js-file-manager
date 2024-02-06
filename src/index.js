import { argv } from "process";
import { getDirname } from "./helpers/utils.mjs";
import { spawn } from "child_process";
import { homedir } from "os";

class FileManager {
  constructor() {}

  init() {
    const userName = argv.at(2)?.split("=")?.at(1) ?? "dear anon";
    const filename = `${getDirname(import.meta.url)}/childProcess.js`;
    const cp = spawn("node", [filename, userName], {
      stdio: ["pipe", "pipe", "inherit", "ipc"],
      cwd: homedir(),
    });

    process.stdin.pipe(cp.stdin);
    cp.stdout.pipe(process.stdout);

    cp.on("error", (error) => {
      console.error(`Error in child process: ${error.message}`);
    });

    cp.on("exit", () => {});
  }
}

new FileManager().init();
