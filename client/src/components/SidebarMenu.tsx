import { Icon, Menu } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import defaultUserImage from './../images/default-user.jpg';

import { CommonStore } from '../store/commonStore';
import { UserStore } from '../store/userStore';
import YImage from './YImage';

const SidebarMenu = inject('commonStore', 'userStore')(
  withRouter(
    observer(({ commonStore, userStore, children, history }: RouteComponentProps & {
      commonStore?: CommonStore, userStore?: UserStore, children?: React.ReactNode[]
    }) => {
      if (!commonStore || !userStore) {
        return null;
      }

      const onClick = ({ key }: { key: string }) => {
        commonStore.handleSidebarKeySelection(key);
        console.log(`Option ${key} clicked`);
        switch (key) {
          case '1':
            break;
          default:
            break;
        }
      };

      return (
        <nav id="menu" className={commonStore.isSidebarActive ? 'open' : ''}>
          {children}
          <div className="flex-col">
            <div className="sidebar-menu__logo flex--align-self-center">
              <YImage
                src={userStore.self ? userStore.self.photo.thumbnailUrl : defaultUserImage}
                alt={userStore.self ? userStore.self.displayName : ''}
              />
            </div>
            <div className="sidebar-menu__identity flex--align-self-center">
              {userStore.self ? userStore.self.displayName : 'New User'}
            </div>
            <div className="sidebar-menu__title flex--align-self-center">
              <i>Welcome!</i>
            </div>
          </div>
          <Menu selectedKeys={[`${commonStore.sidebarSelectedKey}`]} mode="inline" onClick={onClick}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="inbox" />
              <span>Option 3</span>
            </Menu.Item>
          </Menu>
        </nav>
      );
    })
  )
);

export default SidebarMenu;
