import { spawn } from "child_process";
import { Inject, Service } from "typedi";
import { Config } from "../config";
import { Store } from "../store";
import { Build } from "../types/Build";
import { BuildStatus } from "../types/BuildStatus";

@Service()
export class Builder {
  private status: BuildStatus = BuildStatus.DONE;
  private log = "";

  @Inject(() => Store)
  private store: Store

  @Inject('config')
  private config: Config

  build() {
    if (this.status === BuildStatus.PENDING) {
      throw new Error("build already started");
    }
    this.status = BuildStatus.PENDING;
    this.log = "";
    const cmd = spawn("make", { cwd: this.config.publicSite.folder });

    cmd.stdout.on("data", (data: Buffer) => {
      this.log += data.toString("ascii");
    });

    cmd.stderr.on("data", (data: Buffer) => {
      this.log += data.toString("ascii");
    });

    cmd.on("close", (code) => {
      this.status = code === 0 ? BuildStatus.DONE : BuildStatus.FAILURE;
      if(code === 0){
        this.store.publish();
      }
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
