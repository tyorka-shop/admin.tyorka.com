import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Inject, Service } from "typedi";
import Koa from 'koa'
import { Config } from '../config'
import { OAuth } from "../oauth";

interface Payload extends JwtPayload {
  email: string;
}

@Service()
export class Auth {

  @Inject('config')
  private config: Config

  @Inject(() => OAuth)
  private oauth: OAuth

  createToken = async (email: string): Promise<string> =>
    new Promise((resolve, reject) => {
      sign(
        { email, exp: Math.floor(Date.now() / 1000) + this.config.jwt.token_lifespan },
        this.config.jwt.privateKey,
        { algorithm: "RS256" },
        (err, token) => {
          if (err || !token) return reject(err || "token is undefined");
          resolve(token);
        }
      );
    });

  private decode = async (token: string): Promise<Payload> =>
    new Promise((resolve, reject) => {
      verify(token, this.config.jwt.cert, function (err, decoded) {
        if (err || !decoded) return reject(err || "decoded is undefined");
        resolve(decoded as Payload);
      });
    });

  verifyToken = async (token: string): Promise<{ email: string }> => {
    const { exp, email } = await this.decode(token);
    if (!exp || exp < Math.floor(Date.now() / 1000)) {
      throw new Error("token is expired");
    }

    if(!this.config.granted_emails.includes(email)) {
      throw new Error('not granted');
    }

    return { email };
  };

  login = async (credential: string) => {

    const email = await this.oauth.verify(credential);
    console.log('Success login', email);

    const token = await this.createToken(email);

    return {
      token,
      expires: new Date((Math.floor(Date.now() / 1000) + this.config.jwt.token_lifespan) * 1000)
    }
  }

  extract = async (ctx: Koa.Context) => {
    const token = ctx.cookies.get("access_token");
    if (!token) {
      return;
    }
    try {
      return await this.verifyToken(token);
    } catch (e) {
      return;
    }
  }
}
