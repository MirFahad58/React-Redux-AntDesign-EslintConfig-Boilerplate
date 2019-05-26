import { combineReducers } from "redux";
import dashboardReducer from "../modules/loggedin/dashboard/reducer/index";
import globalReducer from '../modules/loggedin/sidebar/reducer/index';
import signupReducer from '../modules/signup/reducer/index';



export default combineReducers({
  dashboard: dashboardReducer,
  global: globalReducer,
  signup: signupReducer,
});
