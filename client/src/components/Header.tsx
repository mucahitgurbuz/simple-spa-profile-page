import { Button, Dropdown, Icon, Menu, message } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { AuthStore } from '../store/authStore';
import { CommonStore } from '../store/commonStore';
import { User, UserStore } from '../store/userStore';
import UserAvatar from './UserAvatar';

const ProfileDroprown = inject('authStore')(
  withRouter(
    observer(({ authStore, history }: RouteComponentProps & { authStore?: AuthStore }) => {
      if (!authStore) {
        return null;
      }
      const onClick = ({ key }: { key: string }) => {
        switch (key) {
          case 'logout':
            message.success('You have successfully logged out, redirecting to home page...', 1.5);
            setTimeout(() => authStore.logout(), 1500);
            break;
          case 'edit':
            history.push('/edit-profile');
            break;
          default:
            break;
        }
      };
      return (
        <Menu onClick={onClick}>
          <Menu.Item key="edit">
            <Icon type="edit" />
            Edit Profile
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">
            <Icon type="logout" />
            Log Out
          </Menu.Item>
        </Menu>
      );
    })
  )
);

export interface HeaderProfileProps {
  self: User | null
}

const HeaderProfile: React.SFC<HeaderProfileProps> = ({ self }) => {
  if (!self) {
    return (
      <div className="header__profile">
        <Link to="/login">
          <Button htmlType="button" ghost={true} icon="login">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button htmlType="button" ghost={true} icon="user">
            Register
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="header__profile">
      <Dropdown overlay={<ProfileDroprown />} trigger={['click']}>
        <Button htmlType="button" style={{ marginLeft: 8 }}>
          <UserAvatar fName={self.fName} lName={self.lName} url={self.photo && self.photo.thumbnailUrl} />
          {self.displayName} <Icon type="down" />
        </Button>
      </Dropdown>
    </div>
  );
};

const Header = inject('commonStore', 'userStore')(
  observer(({ commonStore, userStore, children }: { commonStore?: CommonStore, userStore?: UserStore, children?: React.ReactNode[] }) => {
    if (!userStore || !commonStore) {
      return null;
    }

    const toggle = () => {
      commonStore.toggleSidebar();
    };

    return (
      <div id="header" className="flex-row flex--aligned">
        <Link to="/">
          <div className="app-header flex-row flex--aligned">
            <span className="app-header__logo">[Put logo here]</span>
            <span className="app-header__title">App name here</span>
          </div>
        </Link>
        <div className="flex-spacer" />
        <Button
          htmlType="button"
          className="menu-toggle"
          icon={commonStore.isSidebarActive ? 'menu-fold' : 'menu-unfold'}
          onClick={toggle}
        />
        {children}
        <HeaderProfile self={userStore.self} />
      </div>
    )
  })
);



export default Header;
