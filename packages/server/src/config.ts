import { promises as fs } from "fs";
import { Container } from "typedi";
import { join } from "path";
import { ConfigSchema } from "./schemas/config";
import { ConfigIndex } from "./interfaces/config";

export type Config = Omit<ConfigIndex, "jwt"> & {
  jwt: ConfigIndex["jwt"] & {
    privateKey: string;
    cert: string;
  };
};

const loadConfig = async (): Promise<Config> => {
  const filename = join(process.cwd(), "config.json");

  console.log("Loading config from", filename);

  const content = await fs.readFile(filename, "utf8");
  const { value: config, error } = ConfigSchema.validate(JSON.parse(content));

  if (!config) {
    console.error(error);
    throw new Error("Invalid config file");
  }

  return {
    ...config,
    jwt: {
      ...config.jwt,
      privateKey: await fs.readFile(config.jwt.private_key_filename, "utf8"),
      cert: await fs.readFile(config.jwt.public_key_filename, "utf8"),
    },
  };
};

export const setupConfig = async () => {
  Container.set("config", await loadConfig());
};
