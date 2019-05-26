import * as antd from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Parallax from "parallax-js";
import { colors, isMobile } from "../../constants/constants.js";
import cities from "../../constants/jsons/cities.json";
import { Images } from "../../public/asset";
import "../../public/css/App.css";
import * as ActionsGlobal from "../loggedin/sidebar/action/actionCreater";
import * as Actions from "./action/actionCreater";

const Option = antd.Select.Option;
const childrenCities = [];
childrenCities.length = 0;
if (cities["Pakistan"] === undefined) {
} else {
  cities["Pakistan"].forEach(element => {
    childrenCities.push(<Option key={element}>{element}</Option>);
  });
}
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,

      signin: "signin",

      usernameTooltip: false,
      passwordTooltip: false,

      signupFirstName: false,
      signupLastName: false,
      signupEmail: false,
      signupPassword: false,
      signupMobile: false,
      signupCity: false,
      signupAddress: false,
      signupCompanyName: false,

      recoverAccountToolTip: false,

      recoverCodeToolTip: false,

      resetPasswordToolTip: false,
      resetPasswordToolTip2: false
    };
  }

  componentDidMount() {
    window.onpopstate = e => {
      if (this.state.signin === "recovery code") {
        this.props.history.push("/forgot-password");
        this.setState({ signin: "forgot password" });
      } else {
        this.props.history.push("/");
        this.setState({ signin: "signin" });
      }
    };
    console.log(this.props.location);
    var scene = document.getElementById("scene");
    var parallaxInstance = new Parallax(scene,{
      relativeInput: true,
      limitX:10,
      limitY:10,
      scalarX :0.5,
      scalarY:0.4
    });
    parallaxInstance.friction(0.2, 0.2,0.1,0.1);
  }
  handleSubmitForgotPassword = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("handlesubmit called");
        console.log("Received values of form: ", values);
        this.setState({ signin: "recovery code" });
      } else {
        if (err.recoverEmail) {
          this.setState({ recoverAccountToolTip: true });
        }
      }
    });
  };
  handleSubmitRecoverCode = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.history.push("/reset-password");
        this.setState({ signin: "reset password" });
      } else {
        if (err.recoverCode) {
          this.setState({ recoverCodeToolTip: true });
        }
      }
    });
  };
  handleSubmitResetPassword = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (values.resetPassword === values.resetPassword2) {
        } else {
          antd.message.error("Password does not match");
        }
      } else {
        if (err.resetPassword) {
          this.setState({ resetPasswordToolTip: true });
        }
        if (err.resetPassword2) {
          this.setState({ resetPasswordToolTip2: true });
        }
      }
    });
  };

  handleSubmitSignIn = e => {
    e.preventDefault();
    const {
      onUserSignIn,
      onChangeActiveNav,
      onChangeNavName,
      onChangeDetailData
    } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const hello = async () => {
          let response = await onUserSignIn({
            emailOrPhone: values.username,
            password: values.password
          });
          if (response.payload.data !== "") {
            if (response.payload.data.user) {
              this.props.history.push("/loggedIn");
              antd.message.success("You are logged in");

              localStorage.setItem(
                "TRUKKR_TOKEN",
                response.payload.data.jwtToken
              );
              onChangeActiveNav(["sub0"]);
              onChangeNavName({ first: "Dashboard" });
              onChangeDetailData({ type: "Dashboard", id: "" });

              setTimeout(() => {
                window.location.reload();
              }, 0);
            } else {
              localStorage.setItem(
                "TRUKKR_AUTH_TOKEN",
                response.payload.data.jwtToken
              );
              this.props.history.push("/auth");
              antd.message.success("You are logged in");
              onChangeActiveNav(["sub0"]);
              onChangeNavName({ first: "Dashboard" });
              onChangeDetailData({ type: "Dashboard", id: "" });

              setTimeout(() => {
                window.location.reload();
              }, 0);
            }
          }
        };
        hello();
      } else {
        if (err.username) {
          this.setState({ usernameTooltip: true });
        }
        if (err.password) {
          this.setState({ passwordTooltip: true });
        }
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("SignUp");
        const {
          onUserSignUp,
          onChangeDetailData,
          onChangeActiveNav,
          onChangeNavName
        } = this.props;
        const data = {
          name: values.name + " " + values.lastName,
          password: values.passwordSignup,
          email: values.email,
          companyName: values.companyName,
          phoneNumber: values.prefix + values.phone,
          address: { street: values.address, city: values.city },
          profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Gevu4Tk803Ydc4VywH_ANoJSf3B6rnuI64IChMJSdw9qfR7s",
          accountCreatedDate: moment().toISOString(),
          type: "Transporter",
          estimatedFleetSize: { min: 1, max: 5 },
          companyNumber: null
        };

        const hello = async () => {
          let response = await onUserSignUp(data);
          if (response.payload.data !== "") {
            onChangeActiveNav(["sub0"]);
            onChangeNavName({ first: "Dashboard" });

            onChangeDetailData({ type: "Dashboard", id: "" });

            localStorage.setItem(
              "TRUKKR_AUTH_TOKEN",
              response.payload.data.jwtToken
            );
            this.props.history.push("/auth");

            antd.message.success("Account Created");
            setTimeout(() => {
              window.location.reload();
            }, 0);
          }
        };
        hello();
      } else {
        console.log(err);
        if (err.email) {
          this.setState({ signupEmail: true });
        }
        if (err.passwordSignup) {
          this.setState({ signupPassword: true });
        }

        if (err.phone) {
          this.setState({ signupMobile: true });
        }
        if (err.city) {
          this.setState({ signupCity: true });
        }
        if (err.companyName) {
          this.setState({ signupCompanyName: true });
        }
        if (err.name) {
          this.setState({ signupFirstName: true });
        }
        if (err.lastName) {
          this.setState({ signupLastName: true });
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentWillMount() {
    const { SET_LOADING_FALSE } = this.props;
    SET_LOADING_FALSE(false);
  }

  renderSignUp = () => {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator("prefix", {
      initialValue: "+92"
    })(<antd.Select disabled style={{ width: 70 }} />);

    if (this.state.signin === "signin") {
      return (
        <div
          className="animated  zoomIn faster"
          style={{
            paddingRight: "10%",
            marginLeft: "15%",
            width: "80%",
            height: "600px"
          }}
        >
          <antd.Row>
            <antd.Col
              style={{borderRadius:"5px"}}
              xm={24}
              sm={24}
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xxl={{ span: 24 }}
              xl={{ span: 24 }}
              span={24}
            >
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ marginTop: "20%" }}
                  width="50%"
                  height="40%"
                  src={Images.LOGO_TRUKKR}
                  alt="trukkr"
                />

                <p
                  style={{
                    fontSize: "15px",
                    color: "silver",
                    paddingTop: "5%"
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur.
                </p>
              </div>
            </antd.Col>
          </antd.Row>

          <antd.Form
            style={{ marginTop: "30px" }}
            spellCheck="true"
            onSubmit={this.handleSubmitSignIn}
          >
            <div className="Iinput">
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  onClick={() => {
                    this.setState({
                      usernameTooltip: false
                    });
                  }}
                  placement="right"
                  title="Please enter email or mobile"
                  visible={isMobile ? false : this.state.usernameTooltip}
                >
                  {getFieldDecorator("username", {
                    rules: [
                      {
                        required: true,
                        message: isMobile ? "Please enter email or mobile" : " "
                      }
                    ]
                  })(
                    <antd.Input
                      onChange={() => {
                        this.setState({ usernameTooltip: false });
                      }}
                      size="large"
                      prefix={
                        <antd.Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Email or Mobile"
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
            </div>
            <div className="Iinput">
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  style={{ backgroundColor: "red" }}
                  onClick={() => {
                    this.setState({
                      passwordTooltip: false
                    });
                  }}
                  placement="right"
                  title="Please input password"
                  visible={isMobile ? false : this.state.passwordTooltip}
                >
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: isMobile ? "Please enter password" : " "
                      }
                    ]
                  })(
                    <antd.Input
                      size="large"
                      onChange={() => {
                        this.setState({
                          passwordTooltip: false
                        });
                      }}
                      prefix={
                        <antd.Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
            </div>

            <antd.Form.Item>
              <div className="Iinput">
                <antd.Button
                  size="large"
                  block
                  loading={loading}
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log in
                </antd.Button>
              </div>
              <center className="Makecenter">
                <div style={{ marginTop: "10px" }}>
                  <Link
                    to="/forgot-password"
                    onClick={() => {
                      this.setState({ signin: "forgot password" });
                    }}
                    className="login-form-forgot"
                    href=""
                  >
                    Forgot password
                  </Link>
                </div>
                <div style={{ marginTop: "110px" }}>
                  {" "}
                  Don't have an account?{" "}
                  <span
                    onClick={() => {
                      this.props.history.push("/signup");
                      this.setState({ signin: "signup" });
                    }}
                    style={{
                      color: colors.primaryColor,
                      cursor: "pointer"
                    }}
                  >
                    Register now!
                  </span>
                </div>{" "}
              </center>
            </antd.Form.Item>
          </antd.Form>
        </div>
      );
    } else if (this.state.signin === "signup") {
      return (
        <div style={{ backgroundColor: "white", height: "100%",borderRadius:"5px" }}>
          <div
            className="animated  zoomIn faster"
            style={{
              width: "100%",
              height: "558px",
              paddingleft: "10%",
              paddingRight: "10%"
            }}
          >
            <div
              style={{
                marginTop: "10%",
                textAlign: "center",
                paddingLeft: "15%"
              }}
            >
              <h1 className="issueSolve">Signup</h1>
            </div>
            <div style={{ textAlign: "center", paddingLeft: "15%" }}>
              <p
                style={{
                  marginTop: "-2%",
                  color: "silver"
                }}
              >
                Privacy Policy Terms of Service
              </p>
            </div>
            <div style={{ paddingLeft: "15%" }}>
              <antd.Form spellCheck="true" onSubmit={this.handleSubmit}>
                <antd.Row>
                  <antd.Col
                    md={12}
                    lg={12}
                    xs={24}
                    sm={24}
                    style={{ marginTop: "4%" }}
                  >
                    <div className="marginRigh">
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupFirstName: false
                            });
                          }}
                          placement="left"
                          title="Please enter first name"
                          visible={
                            isMobile ? false : this.state.signupFirstName
                          }
                        >
                          {getFieldDecorator("name", {
                            rules: [
                              {
                                required: true,
                                message: isMobile
                                  ? "Please enter first name"
                                  : " "
                              }
                            ]
                          })(
                            <antd.Input
                              size="large"
                              minLength={3}
                              type="text"
                              placeholder="First Name*"
                            />
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                  <antd.Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    span={12}
                    style={{ marginTop: "4%" }}
                  >
                    <div className="marginLef mobileMargin">
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupLastName: false
                            });
                          }}
                          placement="right"
                          title="Please enter last name"
                          visible={isMobile ? false : this.state.signupLastName}
                        >
                          {getFieldDecorator("lastName", {
                            rules: [
                              {
                                required: true,
                                message: isMobile
                                  ? "Please enter last name"
                                  : " ",
                                whitespace: true
                              }
                            ]
                          })(
                            <antd.Input
                              size="large"
                              minLength={3}
                              placeholder="Last Name*"
                            />
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                </antd.Row>
                <antd.Row>
                  <antd.Col span={24}>
                    <div className="mobileMargin" style={{ marginTop: "-3%" }}>
                      <antd.Form.Item>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupEmail: false
                            });
                          }}
                          placement="right"
                          title="Please enter correct email"
                          visible={isMobile ? false : this.state.signupEmail}
                        >
                          {getFieldDecorator("email", {
                            rules: [
                              {
                                type: "email",
                                required: true,
                                message: isMobile ? "Please enter email" : " "
                              }
                            ]
                          })(
                            <div>
                              <antd.Input
                                size="large"
                                onBlur={this.handleConfirmBlur}
                                placeholder="Email Address*"
                              />
                            </div>
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                </antd.Row>
                <antd.Row>
                  <antd.Col span={24}>
                    <div style={{ marginTop: "-3%" }}>
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupPassword: false
                            });
                          }}
                          placement="right"
                          title="Please enter Password"
                          visible={isMobile ? false : this.state.signupPassword}
                        >
                          {getFieldDecorator("passwordSignup", {
                            rules: [
                              {
                                required: true,
                                message: isMobile
                                  ? "Please enter password"
                                  : " "
                              }
                            ]
                          })(
                            <antd.Input
                              onClick={() => {
                                this.setState({
                                  signupPassword: false
                                });
                              }}
                              onChange={() => {
                                this.setState({
                                  signupPassword: false
                                });
                              }}
                              size="large"
                              onBlur={this.handleConfirmBlur}
                              minLength={6}
                              type="password"
                              placeholder="Password*"
                            />
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                </antd.Row>
                <antd.Row>
                  <antd.Col span={24}>
                    {" "}
                    <div style={{ marginTop: "-3%" }}>
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupMobile: false
                            });
                          }}
                          placement="right"
                          title="Please enter phone number"
                          visible={isMobile ? false : this.state.signupMobile}
                        >
                          {getFieldDecorator("phone", {
                            rules: [
                              {
                                required: true,
                                message: isMobile
                                  ? "Please enter phone number"
                                  : " "
                              }
                            ]
                          })(
                            <antd.Input
                              size="large"
                              onBlur={this.handleConfirmBlur}
                              maxLength={10}
                              pattern="^[0-9]*$"
                              addonBefore={prefixSelector}
                              placeholder="Mobile"
                              style={{ width: "100%" }}
                            />
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                </antd.Row>
                <antd.Row>
                  <antd.Col
                    md={12}
                    lg={12}
                    xs={24}
                    sm={24}
                    style={{ marginTop: "-3%" }}
                  >
                    <div className="marginRigh">
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onChange={() => {
                            this.setState({
                              signupCity: false
                            });
                          }}
                          placement="left"
                          title="Please select city"
                          visible={isMobile ? false : this.state.signupCity}
                        >
                          {getFieldDecorator("city", {
                            rules: [
                              {
                                required: true,
                                message: isMobile ? "Please select city" : " "
                              }
                            ]
                          })(
                            <antd.Select
                              onChange={() => {
                                this.setState({
                                  signupCity: false
                                });
                              }}
                              size="large"
                              showSearch
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              placeholder="City"
                            >
                              {childrenCities}
                            </antd.Select>
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                  <antd.Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    span={12}
                    style={{ marginTop: "-3%" }}
                  >
                    <div className="marginLef issueSolve1">
                      <antd.Form.Item hasFeedback>
                        <antd.Tooltip
                          onClick={() => {
                            this.setState({
                              signupAddress: false
                            });
                          }}
                          placement="right"
                          title="Please enter address"
                          visible={isMobile ? false : this.state.signupAddress}
                        >
                          {getFieldDecorator("address", {
                            rules: [{ whitespace: true }]
                          })(
                            <antd.Input
                              size="large"
                              type="text"
                              placeholder="Address"
                            />
                          )}
                        </antd.Tooltip>
                      </antd.Form.Item>
                    </div>
                  </antd.Col>
                </antd.Row>

                <antd.Row>
                  <antd.Col span={24}> </antd.Col>
                </antd.Row>

                <antd.Col span={24}>
                  {" "}
                  <antd.Form.Item style={{ marginTop: "-3%" }} hasFeedback>
                    <antd.Tooltip
                      onClick={() => {
                        this.setState({
                          signupCompanyName: false
                        });
                      }}
                      placement="right"
                      title="Please enter company name"
                      visible={isMobile ? false : this.state.signupCompanyName}
                    >
                      {getFieldDecorator("companyName", {
                        rules: [
                          {
                            required: true,
                            message: isMobile
                              ? "Please enter company name"
                              : " ",
                            whitespace: true
                          }
                        ]
                      })(
                        <antd.Input size="large" placeholder="Company Name*" />
                      )}
                    </antd.Tooltip>
                  </antd.Form.Item>
                </antd.Col>
                <antd.Col span={24}>
                  {" "}
                  <antd.Form.Item style={{ marginTop: "-3%" }}>
                    <antd.Button
                      size="large"
                      loading={loading}
                      disabled={loading}
                      style={{ width: "100%" }}
                      type="primary"
                      htmlType="submit"
                    >
                      Sign Up
                    </antd.Button>
                  </antd.Form.Item>
                </antd.Col>

                <antd.Col span={24}>
                  <div style={{ marginLeft: "20%" }}>
                    Already have an account?{" "}
                    <Link
                      onClick={() => {
                        this.setState({ signin: "signin" });
                      }}
                      to="/"
                    >
                      Login
                    </Link>
                  </div>
                </antd.Col>
              </antd.Form>
            </div>
          </div>
        </div>
      );
    } else if (this.state.signin === "reset password") {
      console.log("reset password");
      return (
        <antd.Col
          style={{ width: "90%", backgroundColor: "white",borderRadius:"5px" }}
          xs={24}
          sm={24}
          md={13}
          lg={13}
        >
          <div
            style={{
              height: "600px",
              backgroundColor: "white",

              paddingLeft: "15%",
              paddingTop: "30%"
            }}
          >
            <center>
              <h1>Reset Password</h1>
              <article style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                You are almost there to reset your password
              </article>
            </center>
            <antd.Form onSubmit={this.handleSubmitResetPassword}>
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  onClick={() => {
                    this.setState({
                      resetPasswordToolTip: false
                    });
                  }}
                  placement="right"
                  title="Please enter new password"
                  visible={isMobile ? false : this.state.resetPasswordToolTip}
                >
                  {getFieldDecorator("resetPassword", {
                    rules: [
                      {
                        required: true,
                        message: isMobile ? "Please enter new password" : " "
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <antd.Input
                      type="password"
                      style={{ marginTop: "7%" }}
                      size="large"
                      placeholder="New Password "
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  onClick={() => {
                    this.setState({
                      resetPasswordToolTip2: false
                    });
                  }}
                  placement="right"
                  title="Please enter confirm password"
                  visible={isMobile ? false : this.state.resetPasswordToolTip2}
                >
                  {getFieldDecorator("resetPassword2", {
                    rules: [
                      {
                        required: true,
                        message: isMobile
                          ? "Please enter confirm password"
                          : " "
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(
                    <antd.Input
                      type="password"
                      onBlur={this.handleConfirmBlur}
                      size="large"
                      placeholder="Confirm Password"
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
              <antd.Button
                htmlType="submit"
                className="btn"
                size="large"
                type="primary"
                block
              >
                Done
              </antd.Button>
            </antd.Form>
          </div>
        </antd.Col>
      );
    } else if (this.state.signin === "recovery code") {
      return (
        <antd.Col
          xs={24}
          sm={24}
          md={13}
          lg={13}
          style={{ width: "100%", backgroundColor: "white",borderRadius:"5px" }}
        >
          <div
            style={{
              height: "600px",
              backgroundColor: "white",
              paddingRight: "10%",

              paddingLeft: "15%",
              paddingTop: "30%"
            }}
          >
            <center>
              <h1>Recover Account</h1>
              <article style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                A four digit code has been sent to your mobile number
                '0324*****17' please enter it here
              </article>
            </center>
            <antd.Form
              spellCheck="true"
              onSubmit={this.handleSubmitRecoverCode}
            >
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  onClick={() => {
                    this.setState({
                      recoverCodeToolTip: false
                    });
                  }}
                  placement="right"
                  title="Please enter 4 digit code"
                  visible={isMobile ? false : this.state.recoverCodeToolTip}
                >
                  {getFieldDecorator("recoverCode", {
                    rules: [
                      {
                        required: true,
                        message: isMobile ? "Please enter 4 digit code" : " "
                      }
                    ]
                  })(
                    <antd.Input
                      onChange={() => {
                        this.setState({ recoverAccountToolTip: false });
                      }}
                      onBlur={this.handleConfirmBlur}
                      style={{ marginTop: "8%" }}
                      size="large"
                      maxLength="4"
                      minLength="4"
                      onBlur={this.handleConfirmBlur}
                      placeholder="Enter 4 Digit Code"
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
              <antd.Button
                htmlType="submit"
                className="btn"
                size="large"
                type="primary"
                block
              >
                Next
              </antd.Button>
            </antd.Form>
            <center>
              <p style={{ position: "absolute", top: "90%", left: "30%" }}>
                Did Not Recieved yet? <a href="/">Send Again</a>
              </p>
            </center>
          </div>
        </antd.Col>
      );
    } else if (this.state.signin === "forgot password") {
      return (
        <antd.Col
          xs={24}
          sm={24}
          md={13}
          lg={13}
          xl={13}
          style={{ width: "90%", backgroundColor: "white",borderRadius:"5px" }}
        >
          <div
            style={{
              height: "600px",
              backgroundColor: "white",

              paddingLeft: "15%",
              paddingTop: "30%"
            }}
          >
            <center>
              <h1>Recover Account</h1>
              <article style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                Enter email address or mobile number associated with your trukkr
                account
              </article>
            </center>
            <antd.Form
              spellCheck="true"
              onSubmit={this.handleSubmitForgotPassword}
            >
              <antd.Form.Item hasFeedback>
                <antd.Tooltip
                  onClick={() => {
                    this.setState({
                      recoverAccountToolTip: false
                    });
                  }}
                  placement="right"
                  title="Please input email or mobile"
                  visible={isMobile ? false : this.state.recoverAccountToolTip}
                >
                  {getFieldDecorator("recoverEmail", {
                    rules: [
                      {
                        required: true,
                        message: isMobile ? "Please enter email or mobile" : " "
                      }
                    ]
                  })(
                    <antd.Input
                      onChange={() => {
                        this.setState({ recoverAccountToolTip: false });
                      }}
                      onBlur={this.handleConfirmBlur}
                      size="large"
                      style={{ marginTop: "8%" }}
                      type="primary"
                      placeholder="Enter Email or Mobile Number"
                    />
                  )}
                </antd.Tooltip>
              </antd.Form.Item>
              <antd.Form.Item>
                <antd.Button
                  htmlType="submit"
                  type="primary"
                  disabled={loading}
                  size="large"
                  loading={loading}
                  className="btn"
                  style={{ marginTop: "0%" }}
                  block
                >
                  Next
                </antd.Button>
              </antd.Form.Item>
            </antd.Form>
            <center>
              <p style={{ position: "absolute", top: "90%", left: "30%" }}>
                Don't You Remeber? <a href="/">Contact Support</a>
              </p>
            </center>
          </div>
        </antd.Col>
      );
    }
  };
  //  this portion is for step no1 validation

  // this will return err in step 2
  render() {

    const { Footer } = antd.Layout;
    return (
      <main>
        <div className="signup_view">
          <antd.Row type="flex" justify="center" align="middle">
            <div
              // animated slideInRight
              className="borderremove"
               
            >
              <antd.Row>
                <antd.Col
                  // style={{ background:require("../../public/asset/paralex slice/0.png")}}
                  sm={0}
                  xs={0}
                  md={11}
                  lg={11}
                  style={{borderRadius:"5px"}}
                 
                >
                  {/* <div  > */}
                  <div
                    id="scene"
                    style={{height:"600px",overflow:"hidden",borderRadius:"5px"}}
                  >
                    <div data-depth="0.7">
                      <img 
                        height="650px"
                        width="450"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10
                        }}
                        src={require("../../public/asset/paralex slice/0.png")}
                        alt="missing"
                        
                      />
                    </div>
                    <div data-depth="0.1">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/1.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div data-depth="0.2">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/2.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div data-depth="0.4">
                      <img
                        height="600px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/3.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    
                    <div data-depth="0.5">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/4.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div data-depth="0.8">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/5.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div data-depth="1">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/6.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10


                        }}
                      />
                    </div>
                    <div data-depth="1.3">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/7.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div data-depth="1.5">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/8.png")}
                        alt="missing"
                        style={{
                          objectFit: "fill",
                          marginLeft:-15,
                          marginTop:-10

                        }}
                      />
                    </div>
                    <div style={{align:'center'}} data-depth="1.8">
                      <img
                        height="650px"
                        width="450px"

                        src={require("../../public/asset/paralex slice/9.png")}
                        alt="missing"
                        style={{
                          marginLeft:-15,
                          marginTop:-10,
                          objectFit: "fill"
                        }}
                      />
                    </div>
                  </div>
                  {/* </div> */}
                </antd.Col>

                <antd.Col
                  style={{ backgroundColor: "white",borderRadius:"5px" }}
                  sm={24}
                  xm={24}
                  md={13}
                  lg={13}
                >
                  {this.renderSignUp()}
                </antd.Col>
              </antd.Row>
            </div>
          </antd.Row>

          <Footer
            className="login_footer_main"
            style={{
              backgroundColor: "rgba(11,11,11,0.3)",
              position: "fixed",
              bottom: "0",
              height: "1%",
              width: "100%"
            }}
          >
            <h4 className="login_footer_text">
              Trukkr. All Rights Reserved © 2019 | Developed by{" "}
              <b>Trukkr Team</b>
            </h4>
          </Footer>
        </div>
      </main>
    );
  }
}
const mapStateToProps = ({ signup }) => ({
  loading: signup.loading,
  err: signup.err,
  success: signup.success
});
const mapDispatchToProps = dispatch => ({
  onUserSignIn: data => dispatch(Actions.onUserSignIn(data)),
  onUserSignUp: data => dispatch(Actions.onUserSignUp(data)),
  SET_LOADING_FALSE: data => dispatch(Actions.SET_LOADING_FALSE(data)),
  onChangeActiveNav: activeNav =>
    dispatch(ActionsGlobal.ON_CHANGE_ACTIVE_NAV(activeNav)),
  onChangeNavName: navName =>
    dispatch(ActionsGlobal.ON_CHANGE_NAV_NAME(navName)),
  onChangeDetailData: data =>
    dispatch(ActionsGlobal.ON_CHANGE_DETAIL_DATA(data))
});
const signup = antd.Form.create()(SignUp);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(signup);
