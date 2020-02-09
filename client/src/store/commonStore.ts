import { action, observable, reaction } from 'mobx';

export interface Photo {
  thumbnailUrl: string,
  originalUrl: string,
  createdAt: string,
  updatedAt: string,
  id: number,
  ofId: number,
  of: string,
}


export class CommonStore {
  @observable
  public token: string | null = localStorage.getItem('token');
  @observable
  public lang: string | null = localStorage.getItem('lang');
  @observable
  public isAppLoaded: boolean = false;
  @observable
  public isSidebarActive: boolean = false;
  @observable
  public sidebarSelectedKey: string = '';

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      }
    );
    reaction(
      () => this.lang,
      lang => {
        if (lang) {
          localStorage.setItem('lang', lang);
        } else {
          localStorage.removeItem('lang');
        }
      }
    );
  }

  @action
  public setToken(token: string | null) {
    this.token = token;
  }

  @action
  public setLang(lang: string) {
    this.lang = lang;
  }

  @action
  public setAppLoaded() {
    this.isAppLoaded = true;
  }

  @action
  public toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  @action
  public handleSidebarKeySelection(key: string) {
    this.sidebarSelectedKey = key;
  }
}

export default new CommonStore();
