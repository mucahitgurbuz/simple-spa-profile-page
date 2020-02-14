import { Button, Form, Icon, Input, message } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import {
  Link,
  Redirect,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import { FormComponentProps } from "antd/lib/form";
import ErrorContainer from "../components/FormErrorContainer";
import { AuthStore } from "../store/authStore";
import { UserStore } from "../store/userStore";

const FormItem = Form.Item;
const buttonStyle = {
  width: 120
};
const prefixIconStyle = {
  color: "rgba(0,0,0,.25)"
};

type LoginScreenProps = RouteComponentProps &
  FormComponentProps & {
    authStore: AuthStore;
    userStore: UserStore;
  };

@inject("authStore")
@inject("userStore")
@observer
class LoginScreen extends React.Component<LoginScreenProps, {}> {
  public componentWillMount() {
    this.props.authStore.reset();
  }

  public componentDidMount() {
    if (this.props.userStore.self) {
      message.success(
        `Hello ${this.props.userStore.self.displayName}, you are now logged in.`,
        0.8
      );
    }
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.authStore
          .login(values.userCode, values.password)
          .then(() => {
            if (!this.props.authStore.error) {
              this.props.history.push("/");
            }
          });
      }
    });
  };

  public render() {
    const { userStore, authStore } = this.props;

    if (userStore.self) {
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="full-page-form__container">
        <Form onSubmit={this.handleSubmit} className="full-page-form__content">
          <div className="centered">
            <span>Put logo here</span>
          </div>
          <FormItem>
            {getFieldDecorator("userCode", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={prefixIconStyle} />}
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={prefixIconStyle} />}
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <ErrorContainer error={authStore.error} />
          <FormItem>
            <div className="space-evenly">
              <Button
                type="primary"
                icon="login"
                style={buttonStyle}
                htmlType="submit"
                loading={authStore.inProgress}
              >
                Log in
              </Button>
            </div>
          </FormItem>
          <div className="space-between">
            <Link to="/">
              <Button htmlType="button" icon="left">
                Homepage
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(withRouter(LoginScreen));
