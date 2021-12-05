import { spawn } from "child_process";
import { Service } from "typedi";
import { Build } from "../types/Build";
import { BuildStatus } from "../types/BuildStatus";

@Service()
export class Builder {
  private status: BuildStatus = BuildStatus.DONE;
  private log = "";

  build() {
    if (this.status === BuildStatus.PENDING) {
      throw new Error("build already started");
    }
    this.status = BuildStatus.PENDING;
    this.log = "";
    const cmd = spawn("yarn", ["build"], { cwd: "/home/kazatca/tyorka.com" });

    cmd.stdout.on("data", (data: Buffer) => {
      this.log += data.toString("ascii");
    });

    cmd.stderr.on("data", (data: Buffer) => {
      this.log += data.toString("ascii");
    });

    cmd.on("close", (code) => {
      this.status = code === 0 ? BuildStatus.DONE : BuildStatus.FAILURE;
    });

    return {
      pid: cmd.pid,
    };
  }

  getStatus(): Build {
    var AnsiTerminal = require("node-ansiterminal").AnsiTerminal;
    var AnsiParser = require("node-ansiparser");
    var terminal = new AnsiTerminal(1000, 5000, 5000);
    var parser = new AnsiParser(terminal);
    parser.parse(this.log);

    const log = terminal.toString().trim().replace(/\s{10,}/g, ' ')

    return {
      log,
      status: this.status,
    };
  }
}
