import { inject, observer } from "mobx-react";
import React from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import theme from "styled-theming";

import { AuthStore } from "../store/authStore";
import { CommonStore } from "../store/commonStore";
import { User, UserStore } from "../store/userStore";

import { ThemeToggleContext } from "./../ThemeContext";

export interface HeaderProfileProps {
  self: User | null;
}

const HeaderProfile = inject("authStore")(
  withRouter(
    observer(
      ({
        authStore,
        history,
        self
      }: RouteComponentProps &
        HeaderProfileProps & { authStore?: AuthStore }) => {
        const color = theme("mode", {
          light: "rgba(0, 0, 0, 0.65)",
          dark: "rgba(0, 0, 0, 0.65)"
        });

        const Wrapper = styled.div`
          color: ${color};
        `;

        const onLogout = () => {
          authStore?.logout();
        };

        if (!self) {
          return (
            <div className="header__profile">
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          );
        }

        return (
          <Wrapper className="header__profile">
            <div className="header__profile-badge">
              <img src={self.photo && self.photo.thumbnailUrl} />
              <span>{self.displayName}</span>
            </div>
            <button onClick={onLogout}>Logout</button>
          </Wrapper>
        );
      }
    )
  )
);

const Header = inject(
  "commonStore",
  "userStore"
)(
  observer(
    ({
      commonStore,
      userStore,
      children
    }: {
      commonStore?: CommonStore;
      userStore?: UserStore;
      children?: React.ReactNode[];
    }) => {
      if (!userStore || !commonStore) {
        return null;
      }

      return (
        <div id="header" className="flex-row flex--aligned">
          <Link to="/">
            <div className="app-header flex-row flex--aligned">
              <span className="app-header__logo">
                <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" />
              </span>
              <span className="app-header__title">SPA - Case Study</span>
            </div>
          </Link>
          <div className="flex-spacer" />
          {children}
          <ThemeToggleContext.Consumer>
            {({ themeState, toggleTheme }) => (
              <React.Fragment>
                <span className="app-header__theme-text">
                  Enter the dark mode
                </span>
                <label onClick={toggleTheme} className="switch">
                  <input checked={themeState.mode === "dark"} type="checkbox" />
                  <span className="slider round" />
                </label>
              </React.Fragment>
            )}
          </ThemeToggleContext.Consumer>

          <HeaderProfile self={userStore.self} />
        </div>
      );
    }
  )
);

export default Header;
