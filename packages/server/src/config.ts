import fs from "fs";
import { Container } from "typedi";
import { join } from "path";

interface JWTConfig {
  token_lifespan: number;
  privateKey: string;
  cert: string;
}

export interface Config {
  jwt: JWTConfig;
  storeFolder: string;
  imagesFolder: string;
  google_sign_in_button: {
    client_id: string;
  };
  granted_emails: string[];
  client_url: string;
}

type ConfigInJSON = Omit<Config, "jwt"> & {
  jwt: {
    token_lifespan: number;
    private_key_filename: string;
    public_key_filename: string;
  };
};

const readFile = async (filename: string): Promise<string> =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, "utf-8", (err, content) => {
      if (err) return reject(err);
      resolve(content);
    });
  });

export const setupConfig = async () => {
  const filename = join(process.cwd(), "config.json");

  console.log('Loading config from', filename);

  const content = await readFile(filename);
  const config = JSON.parse(content) as ConfigInJSON;

  const enrichedConfig: Config = {
    ...config,
    jwt: {
      token_lifespan: config.jwt.token_lifespan,
      privateKey: await readFile(config.jwt.private_key_filename),
      cert: await readFile(config.jwt.public_key_filename),
    },
  };

  Container.set("config", enrichedConfig);
};
