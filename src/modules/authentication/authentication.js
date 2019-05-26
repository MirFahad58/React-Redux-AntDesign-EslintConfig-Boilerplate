import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Layout, message, Tooltip } from "antd";
import { connect } from "react-redux";
import * as Actions from "../signup/action/actionCreater";
import Parallax from "parallax-js";
import { Images } from "../../public/asset";
import { colors } from "../../constants/constants";
// import "../../public/css/App.css"
const { Footer } = Layout;

class AuthScreenForm extends Component {
  constructor(props) {
    super(props);
    this.state = { verificationCode: false };
  }
  componentDidMount() {
    window.onpopstate = e => {
      localStorage.removeItem("TRUKKR_AUTH_TOKEN");
      this.props.history.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 0);
    };

    var scene = document.getElementById("scene");
    var parallaxInstance = new Parallax(scene,{
      relativeInput: true,
      limitX:10,
      limitY:10,
      scalarX :0.5,
      scalarY:0.4
    });
    parallaxInstance.friction(0.8, 0.8,0.7,0.7);
  }
  componentWillMount() {
    const { SET_LOADING_FALSE } = this.props;
    SET_LOADING_FALSE(false);
  }
  handleSubmit = e => {
    const { onUserAuthenticate, content } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const hello = async () => {
          let response = await onUserAuthenticate({
            userId: content.userId,
            code: values.code
          });
          if (response.payload.data !== "") {
            localStorage.removeItem("TRUKKR_AUTH_TOKEN");
            localStorage.setItem(
              "TRUKKR_TOKEN",
              response.payload.data.jwtToken
            );
            this.props.history.push("/loggedin");
            message.success("You are Now Authenticated");
            setTimeout(() => {
              window.location.reload();
            }, 50);
          }
        };
        hello();
      } else {
        this.setState({ verificationCode: true });
      }
    });
  };

  inter = setInterval(() => {
    const { timer, onChangeCodeTimer } = this.props;
    if (timer >= 1) {
      onChangeCodeTimer(timer - 1);
    }
  }, 1000);

  renderResendCode = () => {
    const {
      timer,
      onChangeCodeTimer,
      onUserRequsestCode,
      content
    } = this.props;
    if (timer < 1) {
      return (
        <span>
          Did Not Recieved Yet?{" "}
          <span
            style={{
              color: colors.primaryColor,
              cursor: "pointer",
              marginRight: 15
            }}
            onClick={() => {
              onChangeCodeTimer(60);
              onUserRequsestCode({ userId: content.userId });
            }}
          >
            Send Again
          </span>
        </span>
      );
    } else {
      console.log(timer);

      return (
        <span
          style={{
            color: colors.primaryColor,
            position: "absolute",
            left: "100px"
          }}
        >
          {timer}
        </span>
      );
    }
  };
  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <main>
        <div className="signup_view">
          <Row type="flex" justify="center" align="middle">
            <div className="borderremove">
              <Row>
                <Col
                  style={{ backgroundColor: "white" }}
                  sm={0}
                  xs={0}
                  md={11}
                  lg={11}
                >
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
                </Col>
                <Col
                  style={{ backgroundColor: "white" }}
                  xs={24}
                  sm={24}
                  md={13}
                  lg={13}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      paddingRight: "10%",
                      paddingLeft: "15%",
                      paddingTop: "30%",
                      width: "100%",
                      height: "600px"
                    }}
                  >
                    <center>
                      <h1>Verification</h1>
                      <article style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                        A four digit code has been sent to your number '
                        +92XXX-XXXX710' please enter it here to validate
                        yourself
                      </article>
                    </center>
                    <Form onSubmit={this.handleSubmit} spellCheck={true}>
                      <Form.Item>
                        <Tooltip
                          visible={this.state.verificationCode}
                          placement="right"
                          title="Enter correct code please"
                        >
                          {getFieldDecorator("code", {
                            rules: [
                              {
                                required: true,
                                message: " "
                              }
                            ]
                          })(
                            <Input
                              onClick={() => {
                                this.setState({ verificationCode: false });
                              }}
                              onChange={() => {
                                this.setState({ verificationCode: false });
                              }}
                              maxLength="4"
                              className="reduceTop"
                              style={{ marginTop: "8%" }}
                              type="primary"
                              size="large"
                              placeholder="Enter The 4 Digit Code"
                            />
                          )}
                        </Tooltip>
                      </Form.Item>
                      <Button
                        className="btn"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        block
                      >
                        Done
                      </Button>
                    </Form>

                    <center>
                      <p
                        style={{
                          position: "absolute",
                          top: "90%",
                          marginLeft: "13%"
                        }}
                      >
                        {this.renderResendCode()}{" "}
                      </p>
                    </center>
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
              width: "100%",
              height: "10px"
            }}
          >
            <div>
              <h4 className="login_footer_text">
                Trukkr. All Rights Reserved © 2019 | Developed by{" "}
                <b>Trukkr Team</b>
              </h4>
            </div>
          </Footer>
        </div>
      </main>
    );
  }
}
const AuthScreen = Form.create()(AuthScreenForm);

const mapStateToProps = ({ signup }) => ({
  content: signup.content,
  loading: signup.loading,
  err: signup.err,
  success: signup.success,
  timer: signup.codeTimer
});
const mapDispatchToProps = dispatch => ({
  onUserAuthenticate: data => dispatch(Actions.onUserAuthenticate(data)),
  onUserRequsestCode: data => dispatch(Actions.onUserRequsestCode(data)),
  onChangeCodeTimer: time => dispatch(Actions.ON_CHANGE_CODE_TIMER(time)),
  SET_LOADING_FALSE: data => dispatch(Actions.SET_LOADING_FALSE(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);
