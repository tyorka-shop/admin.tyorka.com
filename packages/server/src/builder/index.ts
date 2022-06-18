import { spawn } from "child_process";
import { Inject, Service } from "typedi";
import { Config } from "../config";
import { Build } from "../entity/Build";
import { BuildStatus } from "../types/BuildStatus";
import { Storage } from "../storage";

@Service()
export class Builder {
  private currentBuild: Build | undefined

  @Inject(() => Storage)
  private storage: Storage;

  @Inject("config")
  private config: Config;

  async build() {
    if (this.currentBuild) {
      throw new Error("build already started");
    }

    this.currentBuild = await this.storage.builds.save(this.storage.builds.create());

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

    cmd.stdout.on("data", async (data: Buffer) => {
      if(!this.currentBuild) return;
      this.currentBuild.log += data.toString("ascii");
      await this.storage.builds.save(this.currentBuild);
    });

    cmd.stderr.on("data", async (data: Buffer) => {
      if(!this.currentBuild) return;
      this.currentBuild.log += data.toString("ascii");
      await this.storage.builds.save(this.currentBuild);
    });

    cmd.on("close", async (code) => {
      if(!this.currentBuild) return;
      this.currentBuild.status = code === 0 ? BuildStatus.DONE : BuildStatus.FAILURE;

      this.currentBuild.duration = Date.now() - +new Date(this.currentBuild.date);
      await this.storage.builds.save(this.currentBuild);
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

    if(!this.currentBuild) return;

    return {
      ...this.currentBuild,
      log: this.currentBuild?.log.replace(/\[.{2}/g, '')
    };
  }
}
