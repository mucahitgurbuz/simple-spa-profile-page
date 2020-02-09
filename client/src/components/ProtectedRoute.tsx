import { inject, observer } from 'mobx-react';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserStore } from '../store/userStore';

export default inject('userStore')(
  observer(({ userStore, ...rest }: { userStore: UserStore }) => {
    if (userStore.self) { return <Route {...rest} />; }
    return <Redirect to="/login" />;
  })
);
