import { Button, Form, Icon, Input, message, Upload } from "antd";
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
import AvatarCrop from "./../components/AvatarCrop";

const FormItem = Form.Item;
const buttonStyle = {
  width: 120
};

type RegisterScreenProps = RouteComponentProps &
  FormComponentProps & {
    authStore: AuthStore;
    userStore: UserStore;
  };

interface RegisterScreenState {
  avatarUrl: string | undefined;
  avatarLoading: boolean;
  avatarObj: object | null;
  uploadClicked: boolean;
  modalVisible: boolean;
}

@inject("authStore")
@inject("userStore")
@observer
class RegisterScreen extends React.Component<
  RegisterScreenProps,
  RegisterScreenState
> {
  public readonly state = {
    avatarUrl: undefined,
    avatarLoading: false,
    avatarObj: null,
    uploadClicked: false,
    modalVisible: false
  };
  public avatarCropRef: React.RefObject<AvatarCrop>;
  public componentWillMount() {
    this.avatarCropRef = React.createRef<AvatarCrop>();
    this.props.authStore.reset();
  }

  public handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.setState(
        {
          uploadClicked: true
        },
        () => {
          if (!err && !!this.state.avatarObj) {
            this.props.authStore
              .register({ ...values, avatar: this.state.avatarObj })
              .then(() => {
                if (!this.props.authStore.error) {
                  message.success(
                    "Register successful, redirecting to login...",
                    1.5
                  );
                  setTimeout(() => this.props.history.push("/login"), 1500);
                }
              });
          }
        }
      );
    });
  };

  public compareToFirstPassword = (
    rule: any,
    value: string,
    callback: (reason?: string) => void
  ) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback(
        `inconsistent password, ${value} vs ${form.getFieldValue("password")}`
      );
    } else {
      callback();
    }
  };

  public handleAvatarChange = (file: File) => {
    this.setState(
      {
        avatarLoading: true
      },
      () => {
        const reader: FileReader = new FileReader();

        reader.addEventListener("load", () => {
          this.setState(
            {
              avatarObj: file,
              avatarUrl:
                (reader.result && reader.result.toString()) || undefined,
              avatarLoading: false
            },
            () => {
              if (this.avatarCropRef && this.avatarCropRef.current) {
                this.avatarCropRef.current.showModal();
              }
            }
          );
        });
        reader.readAsDataURL(file);
      }
    );

    return false;
  };

  public handleUploadClick = () => {
    this.setState({
      uploadClicked: true
    });
  };

  public handleEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      this.handleUploadClick();
    }
  };

  public showModal = () => {
    this.setState({ modalVisible: true });
  };

  public handleOk = () => {
    this.setState({ modalVisible: false });
  };

  public handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  public handleAvatarCrop = (croppedImage: string, croppedImageObj: File) => {
    this.setState({
      avatarObj: croppedImageObj,
      avatarUrl: croppedImage,
      modalVisible: false
    });
  };

  public render() {
    const { userStore, authStore } = this.props;

    if (userStore.self) {
      message.info(
        `Hello ${userStore.self.displayName}, you are already logged in.`,
        0.8
      );
      return <Redirect to="/" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="full-page-form__container">
        <Form
          onSubmit={this.handleSubmit}
          className="full-page-form__content"
          id="register-form"
        >
          <h1 className="full-page-form__header"> Registration Form </h1>
          <hr className="full-page-form__divider" />
          <FormItem>
            {getFieldDecorator("fName", {
              rules: [
                { required: true, message: "Please input your first name!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="First Name"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("lName", {
              rules: [
                { required: true, message: "Please input your last name!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Last Name"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("userCode", {
              rules: [
                { required: true, message: "Please input your user code!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="User Code"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email address!" },
                {
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="E-mail address"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your password!" },
                {
                  pattern: /^(?=.*[A-Za-zöÖçÇşŞğĞüÜıİ])(?=.*\d)[A-Za-zöÖçÇşŞğĞüÜıİ\d]{8,}$/,
                  message:
                    "Password must contain minimum eight characters, at least one letter and one number"
                }
              ]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("passwordConfirm", {
              rules: [
                { required: true, message: "Please confirm your password!" },
                {
                  validator: this.compareToFirstPassword,
                  message: "Two passwords that you enter is inconsistent!"
                }
              ]
            })(
              <Input
                type="password"
                prefix={
                  <Icon type="reload" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Repeat Password"
              />
            )}
          </FormItem>
          <FormItem>
            <div
              className={`flex-row flex--centered ant-form-item-control${
                !this.state.avatarObj && this.state.uploadClicked
                  ? " has-error"
                  : ""
              }`}
            >
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={this.handleAvatarChange}
              >
                {this.state.avatarUrl ? (
                  <img
                    src={this.state.avatarUrl}
                    className="avatar-preview"
                    alt="avatar-preview"
                  />
                ) : (
                  <span
                    onClick={this.handleUploadClick}
                    role="button"
                    tabIndex={0}
                    onKeyPress={this.handleEnterPress}
                  >
                    <Icon
                      type={this.state.avatarLoading ? "loading" : "upload"}
                    />
                    <div className="ant-upload-text"> Upload </div>
                  </span>
                )}
                {!this.state.avatarObj && this.state.uploadClicked && (
                  <div className="ant-form-explain">Required!</div>
                )}
              </Upload>
            </div>
          </FormItem>
          <ErrorContainer error={authStore.error} />
          <FormItem>
            <div className="space-evenly">
              <Button
                type="primary"
                icon="enter"
                style={buttonStyle}
                htmlType="submit"
                loading={authStore.inProgress}
              >
                Submit
              </Button>
            </div>
          </FormItem>
          <div className="space-between">
            <Link to="/">
              <Button htmlType="button" icon="left">
                Homepage
              </Button>
            </Link>
            <Link to="/login">
              <Button htmlType="button" icon="login">
                Login
              </Button>
            </Link>
          </div>
        </Form>
        <AvatarCrop
          ref={this.avatarCropRef}
          modalTitle="Avatar Crop"
          avatarUrl={this.state.avatarUrl}
          onCropComplete={this.handleAvatarCrop}
        />
      </div>
    );
  }
}

export default Form.create()(withRouter(RegisterScreen));
