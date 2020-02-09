import { Provider } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

// stores
import authStore from './store/authStore';
import commonStore from './store/commonStore';
import userStore from './store/userStore';

import Routes from './Routes';

const stores = {
  authStore,
  userStore,
  commonStore,
};

const App: React.StatelessComponent<{}> = () => (
  <Provider {...stores}>
    <Router>
      <Routes />
    </Router>
  </Provider>
);

export default App;
