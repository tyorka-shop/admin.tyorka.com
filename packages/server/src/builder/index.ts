import { spawn } from "child_process";
import { Inject, Service } from "typedi";
import { Config } from "../config";
import { Store } from "../store";
import { Build } from "../types/Build";
import { BuildStatus } from "../types/BuildStatus";

@Service()
export class Builder {
  private currentBuild: Build | undefined

  @Inject(() => Store)
  private store: Store;

  @Inject("config")
  private config: Config;

  build() {
    if (this.currentBuild) {
      throw new Error("build already started");
    }
    this.currentBuild = Build.create();

    const env = Object.keys(process.env)
      .filter((key) => !key.match(/NODE/i))
      .reduce((result, key) => {
        result[key] = process.env[key];
        return result;
      }, {} as Record<string, any>);

    const cmd = spawn("make", {
      cwd: this.config.publicSite.folder,
      env: {
        ...env,
        XDG_CONFIG_HOME: this.config.publicSite.folder
      },
    });

    cmd.stdout.on("data", (data: Buffer) => {
      if(!this.currentBuild) return;
      this.currentBuild.log += data.toString("ascii");
    });

    cmd.stderr.on("data", (data: Buffer) => {
      if(!this.currentBuild) return;
      this.currentBuild.log += data.toString("ascii");
    });

    cmd.on("close", async (code) => {
      if(!this.currentBuild) return;
      this.currentBuild.status = code === 0 ? BuildStatus.DONE : BuildStatus.FAILURE;
      this.currentBuild.duration = Date.now() - this.currentBuild.date;
      await this.store.publish(this.currentBuild);
      this.currentBuild = undefined
    });

    return {
      pid: cmd.pid,
    };
  }

  getStatus(): Build | undefined{
    // var AnsiTerminal = require("node-ansiterminal").AnsiTerminal;
    // var AnsiParser = require("node-ansiparser");
    // var terminal = new AnsiTerminal(1000, 5000, 5000);
    // var oldInstX = terminal.inst_x
    // terminal.inst_x = (flag: string) => {
    //   if(flag.charCodeAt(0) === 10) {
    //     oldInstX.call(terminal, flag)
    //     oldInstX.call(terminal, '\r');
    //     return;
    //   }
    //   return oldInstX.call(terminal, flag)
    // }
    // var parser = new AnsiParser(terminal);
    // parser.parse(this.log);

    // const log = terminal.toString().trim()

    return this.currentBuild;
  }
}
