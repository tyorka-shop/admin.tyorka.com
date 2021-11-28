import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Config } from '../config'
import { Inject, Service } from "typedi";

interface Payload extends JwtPayload {
  email: string;
}

@Service()
export class JWT {

  @Inject('config')
  private config: Config

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
}
