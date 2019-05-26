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
    
    };
  }

  componentDidMount() {
    window.onpopstate = e => {
     
    };
    
  }
 
  //  this portion is for step no1 validation

  // this will return err in step 2
  render() {

    const { Footer } = antd.Layout;
    return (
      <main>
        <div className="signup_view">
          SignUp
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
