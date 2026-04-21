const { spawn } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const processes = [
  {
    name: "server",
    cwd: path.join(rootDir, "bookstore-app/server"),
  },
  {
    name: "client",
    cwd: path.join(rootDir, "bookstore-app/client"),
  },
];

const children = processes.map(({ name, cwd }) => {
  const child = spawn(npmCmd, ["run", "dev"], {
    cwd,
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    if (code !== 0) {
      console.error(`${name} exited with code ${code}`);
      shutdown(code || 1);
    }
  });

  return child;
});

let isShuttingDown = false;

function shutdown(code = 0) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  for (const child of children) {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  }

  process.exit(code);
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));
