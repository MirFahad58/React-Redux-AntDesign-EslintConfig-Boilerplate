import { Button, Col, Form, Icon, Input, Layout, Row, message } from "antd";
import React, * as react from "react";
import { connect } from "react-redux";
import { Images } from "../../public/asset";
import "../../public/css/App.css";
import * as Actions from "../signup/action/actionCreater";
import * as ActionsGlobal from "../loggedin/sidebar/action/actionCreater";

import { colors } from "../../constants/constants";

const { Footer } = Layout;

class LoginForm extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleSubmit = e => {
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
              message.success("You are logged in");

              localStorage.setItem(
                "APP_TOKEN",
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
                "APP_AUTH_TOKEN",
                response.payload.data.jwtToken
              );
              this.props.history.push("/auth");
              message.success("You are logged in");
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
      }
    });
  };

  componentDidMount() {
    const { SET_LOADING_FALSE } = this.props;
    SET_LOADING_FALSE(false);
  }
  
  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="bottomSpace" className="login_sub_container">
          <div>
            <Row type="flex" justify="center">
              <div
                style={{
                  borderRadius: "4px",
                  width: "850px",
                  height: "520px",
                  backgroundColor: "white"
                }}
                className="borderremove"
              >
                <Row>
                  <Col
                    xs={0}
                    sm={0}
                    md={10}
                    lg={10}
                    style={{ minHeight: "520px" }}
                  >
                    <img
                      alt="pak"
                      src={Images.TRUKKR}
                      style={{
                        width: "100%",
                        height: "520px",
                        objectFit: "fill"
                      }}
                    />
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={14}
                    lg={14}
                    style={{ height: "520px" }}
                  >
                    <div
                      className="widthIssue"
                      style={{
                        paddingRight: "10%",
                        marginLeft: "15%",
                        width: "80%"
                      }}
                    >
                      <Row>
                        <Col
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
                              style={{ paddingTop: "10%" }}
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
                              Trucking with Ease
                            </p>
                          </div>
                        </Col>
                      </Row>

                      <Form
                        style={{ marginTop: "60px" }}
                        spellCheck="true"
                        onSubmit={this.handleSubmit}
                      >
                        <div className="Iinput">
                          <Form.Item>
                            {getFieldDecorator("username", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input your email or mobile!"
                                }
                              ]
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                placeholder="Email,Mobile or Username"
                              />
                            )}
                          </Form.Item>
                        </div>
                        <div className="Iinput">
                          <Form.Item>
                            {getFieldDecorator("password", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please input your Password!"
                                }
                              ]
                            })(
                              <Input
                                prefix={
                                  <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                type="password"
                                placeholder="Password"
                              />
                            )}
                          </Form.Item>
                        </div>

                        <Form.Item>
                          <div className="Iinput">
                            <Button
                              block
                              loading={loading}
                              disabled={loading}
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              Log in
                            </Button>
                          </div>
                          <center className="Makecenter">
                            {" "}
                            <a className="login-form-forgot" href="">
                              Forgot password
                            </a>
                            <div style={{ marginTop: "60px" }}>
                              {" "}
                              Don't have an account?{" "}
                              <span
                                onClick={() => {
                                  this.props.history.push("/signup");
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
                        </Form.Item>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </Row>
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
            </Footer>6
          </div>
        </div>
      </div>
    );
  }
}
const Login = Form.create()(LoginForm);
const mapStateToProps = ({ signup }) => ({
  loading: signup.loading,
  err: signup.err,
  success: signup.success
});
const mapDispatchToProps = dispatch => ({
  onUserSignIn: data => dispatch(Actions.onUserSignIn(data)),
  SET_LOADING_FALSE: data => dispatch(Actions.SET_LOADING_FALSE(data)),

  onChangeActiveNav: activeNav =>
    dispatch(ActionsGlobal.ON_CHANGE_ACTIVE_NAV(activeNav)),
  onChangeNavName: navName =>
    dispatch(ActionsGlobal.ON_CHANGE_NAV_NAME(navName)),
  onChangeDetailData: data =>
    dispatch(ActionsGlobal.ON_CHANGE_DETAIL_DATA(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
