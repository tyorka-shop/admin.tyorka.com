import { exec, spawn } from "child_process";

let isActive = false;
let out = "";
let lastResult = 0;

function getsStatus() {
  if (isActive) {
    return "pending";
  }
  if (lastResult === 0) {
    return "success";
  }
  return "failure";
}

export function build() {
  if (isActive) {
    throw new Error("build already started");
  }
  isActive = true;
  out = "";
  const cmd = spawn("yarn", ["build"], { cwd: "/home/kazatca/tyorka.com" });

  cmd.stdout.on("data", (data: Buffer) => {
    out += data.toString("ascii");
  });

  cmd.stderr.on("data", (data: Buffer) => {
    out += data.toString("ascii");
  });

  cmd.on("close", (code) => {
    isActive = false;
    lastResult = code;
  });

  return cmd;
}

export function getLog() {
  var AnsiTerminal = require("node-ansiterminal").AnsiTerminal;
  var AnsiParser = require("node-ansiparser");
  var terminal = new AnsiTerminal(300, 5000, 5000);
  var parser = new AnsiParser(terminal);
  parser.parse(out);
  const log = terminal.toString();

  return {
    log,
    status: getsStatus(),
  };
}
