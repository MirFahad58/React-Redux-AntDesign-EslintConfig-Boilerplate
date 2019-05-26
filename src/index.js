import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import reduxStore from "./redux/store";
import "./public/css/index.css";
import Sidebar from "./modules/loggedin/sidebar/sidebar";
import AuthScreen from "./modules/authentication/authentication";
import SignUp from "./modules/signup/signup";
import Login from "./modules/Login/login";

const configureStore = () => reduxStore;

if (localStorage.getItem("TRUKKR_TOKEN")) {

  ReactDOM.render(
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Switch>
          <Route path="/loggedIn" component={Sidebar} />
          <Route path="/" component={Sidebar} />
          <Switch />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
} else if (localStorage.getItem("TRUKKR_AUTH_TOKEN")) {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthScreen} />
          <Route path="/" component={AuthScreen} />
          <Switch />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}
else {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/" component={Login} />

          <Switch />
        </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
}
// here is comments 

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
