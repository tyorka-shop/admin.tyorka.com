import { promises as fs } from "fs";
import { Container } from "typedi";
import { join } from "path";
import { ConfigSchema } from "./schemas/config";
import { ConfigIndex } from "./interfaces/config";

export type Config = ConfigIndex;

const loadConfig = async (): Promise<Config> => {
  const filename = join(process.cwd(), "config.json");

  console.log("Loading config from", filename);

  const content = await fs.readFile(filename, "utf8");
  const { value: config, error } = ConfigSchema.validate(JSON.parse(content));

  if (!config) {
    console.error(error);
    throw new Error("Invalid config file");
  }

  return config;
};

export const setupConfig = async () => {
  const config = await loadConfig();
  Container.set("config", config);
  return config;
};
