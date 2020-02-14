import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// pages
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

const withLayout = Child => {
  const WrappedComponent = props => (
    <Layout>
      <Child {...props} />
    </Layout>
  );

  return WrappedComponent;
};

@inject("userStore", "commonStore")
@withRouter
@observer
class Routes extends Component {
  static propTypes = {
    commonStore: PropTypes.object.isRequired,
    userStore: PropTypes.object.isRequired
  };
  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.userStore
        .updateSelf()
        .catch(() => this.props.commonStore.setToken(undefined))
        .finally(() => this.props.commonStore.setAppLoaded());
    }
  }
  render() {
    if (this.props.commonStore.isAppLoaded) {
      // token is present but user is not loaded yet
      return (
        <Switch>
          <Route path="/login" component={LoginScreen} />
          {this.props.userStore.self ? (
            <Route exact path="/" component={withLayout(HomeScreen)} />
          ) : (
            <Route path="/" component={LoginScreen} />
          )}
        </Switch>
      );
    }
    return <span> Loading ... </span>;
  }
}

export default Routes;
