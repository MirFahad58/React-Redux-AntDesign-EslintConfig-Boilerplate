import React, { Component } from "react";
import { Row, Col, Form, Input, Button, Layout, message} from "antd";
import { connect } from "react-redux";
import * as Actions from "../signup/action/actionCreater";
import { Images } from "../../public/asset";
import { colors } from "../../constants/constants";
const { Footer } = Layout;

class AuthScreenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    const { SET_LOADING_FALSE } = this.props;
    SET_LOADING_FALSE(false)
  }
  handleSubmit = e => {
    const {onUserAuthenticate , content}=this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        const hello = async () => {
          let response  = await onUserAuthenticate({userId:content.userId,code:values.code});
          console.log(response)
          if (response.payload.data!=='') {
            localStorage.setItem('AUTH_TOKEN',response.payload.data.jwtToken);
            this.props.history.push('/loggedin')

            message.success('You are Now Authenticated')

          }
        }
        hello()
      }
    });
  };

   inter = setInterval(() => {
     const { timer,onChangeCodeTimer } =  this.props;
     if (timer>=1) {
       onChangeCodeTimer(timer-1)
     }
   }, 1000);
  renderResendCode=()=>{
    const { timer,onChangeCodeTimer,onUserRequsestCode,content, } =  this.props;
    if (timer<2) {
      return(
        <span style={{color:colors.primaryColor,cursor:"pointer",marginRight:15}} onClick={()=>{onChangeCodeTimer(60); onUserRequsestCode({userId:content.userId})}}>Resend</span>

      )
    }
    else{
      return(
        <span style={{color:colors.whiteDull,marginRight:5}}>{timer}</span>
      )
    }
  }
  render() {
    const { loading}= this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <div className="login_container">
          <div className="login_sub_container">
            <Row type="flex" justify="center" align="middle">
              <div className="login_text_container">
                <h3 className="login_text_container_heading">
                  Validate Yourself
                </h3>
                
              </div>
            </Row>
            <Row type="flex" justify="center" align="middle">
              <div className="login_authentication_container">
                <div style={{ textAlign: "center", padding: 15 }}>
                  <img src={Images.LOGO_WHITE} width={200} height={70} alt="" />
                </div>
                <Row>
                  <Col offset={2} span={20}>
                    <h6 className="login_text_container_description2" style={{margin:4}}>
                  Code is sended to your 
                    </h6>
                    <h6 className="login_text_container_description2" style={{margin:10}}>
                  Mobile Number: +92XXX-XXXX710
                    </h6>
                    <Form onSubmit={this.handleSubmit} spellCheck={true}>
                      <Form.Item>
                        {getFieldDecorator("code", {
                          rules: [
                            {
                              required: true,
                              message: "Please Enter Code sended to your mobile Number"
                            }
                          ]
                        })(
                          <Input
                            type="text"
                            size="large"
                            placeholder="Enter Code"
                          />
                        )}
                      </Form.Item>
                      
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        style={{marginBottom:20}}
                      >
                          Authenticate
                      </Button>
                    </Form>
                    <h6 className="login_text_container_description2" style={{marginBottom:25}}>
                      {this.renderResendCode()}
                    </h6>
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
                width: "100%"
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
        </div>
      </Layout>
    );
  }
}
const AuthScreen = Form.create()(AuthScreenForm);

const mapStateToProps = ({ signup }) => ({
  content:signup.content,
  loading: signup.loading,
  err:signup.err,
  success:signup.success,
  timer:signup.codeTimer,
});
const mapDispatchToProps = dispatch => ({
  onUserAuthenticate: (data) =>
    dispatch(Actions.onUserAuthenticate(data)),
  onUserRequsestCode: (data) =>
    dispatch(Actions.onUserRequsestCode(data)),
  onChangeCodeTimer: time =>
    dispatch(Actions.ON_CHANGE_CODE_TIMER(time)),
  SET_LOADING_FALSE: (data) =>
    dispatch(Actions.SET_LOADING_FALSE(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthScreen);