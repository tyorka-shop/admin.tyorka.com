import { Inject, Service } from "typedi";
import { OAuth2Client } from "google-auth-library";
import { Config } from "../config";

@Service()
export class OAuth {
  private client: OAuth2Client | undefined;

  constructor(@Inject('config') private config: Config) {
    const { client_id } = config.google_sign_in_button;
    this.client = new OAuth2Client(client_id);
  }

  verify = async (token: string) => {
    if (!this.client) {
      throw new Error("OAuth2Client is undefined");
    }
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.config.google_sign_in_button.client_id,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new Error("Payload is empty");
    }
    const { email } = payload;
    if (!email || !this.config.granted_emails.includes(email)) {
      throw new Error("Not granted");
    }
    return email;
  };
}
