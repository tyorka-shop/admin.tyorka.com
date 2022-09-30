import { makeAutoObservable, observable } from "mobx";

export class Auth {
  @observable
  token: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    console.log(token);
    this.token = token;
  }
}
