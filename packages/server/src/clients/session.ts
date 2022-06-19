import axios, { AxiosInstance } from "axios";
import { Inject, Service } from "typedi";
import { Config } from "../config";
import { LoggerService } from "../services/LoggerService";

interface VerifyResponse {
  email: string;
}

@Service()
export class SessionServiceClient {
  private client: AxiosInstance;

  private logger = new LoggerService("session service client");

  constructor(@Inject("config") config: Config) {
    this.client = axios.create({
      baseURL: config.sessionService.url,
    });
  }

  verify = async (token: string) => {
    try {
      const response = await this.client.post<VerifyResponse>("/verify", {
        token,
      });
      return response.data;
    } catch (e: any) {
      this.logger.log(e.message);
      return;
    }
  };
}
