import { action, observable } from 'mobx';
import agent from '../agent';
import { Body, CustomError } from '../types';
import commonStore, { Photo } from './commonStore';

export interface User {
  userCode: string,
  id: number,
  fName: string,
  lName: string,
  displayName: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  email: string,
  photo: Photo
}

export class UserStore {
  @observable public profileError: CustomError | null = null;
  @observable public passwordError: CustomError | null = null;
  @observable public activationError: CustomError | null = null;
  @observable public self: User | null;
  @observable public loadingSelf: boolean;
  @observable public loadingUser: boolean;
  @observable public deactivatingUser: boolean;
  @observable public activatingUser: boolean;
  @observable public loadingUserList: boolean;
  @observable public updatingUser: boolean;
  @observable public updatingUserPassword: boolean;
  @observable public updatingUserErrors: boolean;
  @observable public userList = [];
  @observable public currentUser: object;
  @observable public insertingUsers: boolean;
  @observable public userInsertError: CustomError | null = null;
  @observable public invitingUsers: CustomError | null = null;
  @observable public userInviteError: CustomError | null = null;

  constructor() {
    if (commonStore.token) {
      this.updateSelf().catch((err: any) => {
        console.error(err);
        console.log('AN INVALID TOKEN HAS BEEN SENT, TAKING EVASIVE ACTIONS.');
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
  public updateUser({ userCode, fName, lName, avatar }: { userCode: string, fName: string, lName: string, avatar?: File }) {
    this.updatingUser = true;
    this.profileError = null;
    return agent.User.save(userCode, fName, lName, avatar)
      .then(() => this.updateSelf())
      .catch(
        action((err: { response: { body: Body } }) => {
          const responseBody = err.response.body;
          this.profileError =
            {
              type: responseBody.content,
              details: responseBody.details,
            };
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  @action
  public updateUserPassword({ newPassword }: { newPassword: string }) {
    this.updatingUserPassword = true;
    this.passwordError = null;
    return agent.User.updatePassword(newPassword)
      .catch(
        action((err: { response: { body: Body } }) => {
          const responseBody = err.response.body;
          this.passwordError =
            {
              type: responseBody.content,
              details: responseBody.details,
            };
        })
      )
      .finally(
        action(() => {
          this.updatingUserPassword = false;
        })
      );
  }

  @action
  public forgetUser() {
    this.self = null;
  }

}

export default new UserStore();
