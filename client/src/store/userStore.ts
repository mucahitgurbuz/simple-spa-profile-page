import { action, observable } from "mobx";
import agent from "../agent";
import {
  Award,
  Body,
  CustomError,
  Education,
  Experience,
  Interest,
  Publication,
  Skill
} from "../types";
import commonStore, { Photo } from "./commonStore";

export interface User {
  userCode: string;
  id: number;
  fName: string;
  lName: string;
  displayName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  photo: Photo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  publications: Publication[];
  awards: Award[];
  interests: Interest[];
}

export class UserStore {
  @observable
  public profileError: CustomError | null = null;
  @observable
  public self: User | null;
  @observable
  public loadingSelf: boolean;
  @observable
  public loadingUser: boolean;
  @observable
  public loadingUserList: boolean;
  @observable
  public userList = [];
  @observable
  public currentUser: object;

  constructor() {
    if (commonStore.token) {
      this.updateSelf().catch((err: any) => {
        console.error(err);
        console.log("AN INVALID TOKEN HAS BEEN SENT, TAKING EVASIVE ACTIONS.");
        // TODO show modal saying the token is wrong.
      });
    }
  }

  @action
  public updateSelf() {
    this.loadingSelf = true;
    return agent.Auth.current()
      .then(
        action((userResponse: Body) => {
          this.self = userResponse.status && userResponse.content;
        })
      )
      .finally(
        action(() => {
          this.loadingSelf = false;
        })
      );
  }

  @action
  public getUser(userCode: string) {
    this.loadingUser = true;
    return agent.User.single(userCode)
      .then(
        action((response: Body) => {
          this.currentUser = response.status && response.content;
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  @action
  public forgetUser() {
    this.self = null;
  }
}

export default new UserStore();
