import { action, observable } from "mobx";

import agent from "../agent";
import { Body, CustomError } from "../types";
import commonStore from "./commonStore";
import userStore from "./userStore";

export class AuthStore {
  @observable public inProgress: boolean = false;
  @observable public error: CustomError | null = null;

  @action
  public login(userCode: string, password: string): Promise<any> {
    this.inProgress = true;
    this.error = null;

    return agent.Auth.login(userCode, password)
      .then((body: Body) => commonStore.setToken(body.content))
      .then(() => userStore.updateSelf())
      .catch(
        action((err: { response: { body: Body } }) => {
          const responseBody: Body = err.response.body;
          this.error = {
            type: responseBody.content,
            details: responseBody.details
          };
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  @action
  public reset() {
    this.inProgress = false;
    this.error = null;
  }

  @action
  public logout() {
    this.error = null;
    this.inProgress = false;
    commonStore.setToken(null);
    userStore.forgetUser();
  }
}

export default new AuthStore();
