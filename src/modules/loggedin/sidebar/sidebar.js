import React, { Component } from "react";
import {
  Layout,
  Menu,
  Icon,
  Badge,
  Avatar,
  BackTop,
  Row,
  Col,
  notification,
  Button
} from "antd";
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/dashboard";
import firbaseApp from "../../../firebaseConfig/firebase-config";

import { isMobile, colors } from "../../../constants/constants";
import { Images } from "../../../public/asset/index";
import { connect } from "react-redux";
import * as Actions from "./action/actionCreater";
const { Sider } = Layout;
const { SubMenu } = Menu;
const messaging = firbaseApp.messaging();
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "info",
      message: "Token will be displayed here..!",
      title: "Notifications will appear here..!",
      msgCount: "Notification Count: 0",
      accordionTabs: [],
      Link: "/LoggedIn",
      collapsed: false,
      logoText: isMobile ? (
        <img height={45} width={140} src={Images.MAIN} alt="ss" />
      ) : (
        <img height={55} width={160} src={Images.MAIN} alt="ss" />
      )
    };
  }

  handleBgCb = payload => {
    //     notification
    //     body: "test"
    // tag: "campaign_collapse_key_7118734475994776091"
    // title: "fahad"
    const payloadMsg = JSON.stringify(payload);
    const openNotification = () => {
      notification.open({
        placement: "bottomRight",
        message: payload.notification.title,
        description: payload.notification.body,
        duration: 15,
        icon: <Icon type="info-circle" style={{ color: "#108ee9" }} />
      });
    };
    // const accordionTab =
    //   <AccordionTab header={payload.notification.title}>
    //     {payloadMsg}
    //   </AccordionTab>;

    openNotification();

    // this.setState(...this.state, {
    //   accordionTabs: accordionTabList,
    //   msgCount: `Notification Count: ${accordionTabList.length}`
    // });
  };

  handleClick = () => {
    const { onGetPushNotiToken, userInfo } = this.props;
    messaging.onMessage(this.handleBgCb);
    messaging
      .requestPermission()
      .then(() => {
        messaging
          .getToken()
          .then(currentToken => {
            if (currentToken) {
              if (userInfo) {
                let data = {
                  userId: userInfo.user._id,
                  tokens: currentToken
                };
                onGetPushNotiToken(data);
              }
              // this.setState(...this.state, {
              //   status: "success",
              //   message: currentToken
              // });
              // sendTokenToServer(currentToken);
              // updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              // this.setState(...this.state, {
              //   status: "error",
              //   message:
              //     "No Instance ID token available. Request permission to generate one."
              // });
              // Show permission UI.
              // updateUIForPushPermissionRequired();
              // setTokenSentToServer(false);
            }
          })
          .catch(err => {
            // this.setState(...this.state, {
            //   status: "error",
            //   message: "An error occurred while retrieving token."
            // });
            // showToken('Error retrieving Instance ID token. ', err);
            // setTokenSentToServer(false);
          });
      })
      .catch(err => {});
  };

  componentWillMount() {
    const {
      onGetGlobalData,
      userInfo,
      onAllDriversInfoGet,
      onGetLogData,
      onAllVehiclesInfoGet,
      onAllClientsInfoGet,
      onAllBrokersInfoGet,
      onAllTripRequestInfoGet,
      onAllTripUcomingInfoGet,
      onAllTripOngoingInfoGet
    } = this.props;
    if (userInfo) {
      this.handleClick();
      onGetLogData({ id: userInfo.user._id });
      onAllDriversInfoGet({ id: userInfo.user._id });
      onAllVehiclesInfoGet({ id: userInfo.user._id });
      onAllClientsInfoGet({ id: userInfo.user._id });
      onAllBrokersInfoGet({ id: userInfo.user._id });
      onAllTripRequestInfoGet({ id: userInfo.user._id });
      onAllTripUcomingInfoGet({ id: userInfo.user._id });
      onAllTripOngoingInfoGet({ id: userInfo.user._id });
      onGetGlobalData({
        id: userInfo.user._id,
        accountType: "Transporter"
      });
    }
  }
  componentWillReceiveProps(next) {
    if (this.props.userInfo !== next.userInfo) {
      const {
        onGetGlobalData,
        userInfo,
        onAllDriversInfoGet,
        onGetLogData,
        onAllVehiclesInfoGet,
        onAllClientsInfoGet,
        onAllBrokersInfoGet,
        onAllTripRequestInfoGet,
        onAllTripUcomingInfoGet,
        onAllTripOngoingInfoGet
      } = next;
      if (next.userInfo) {
        this.handleClick();
        onGetLogData({ id: userInfo.user._id });
        onAllDriversInfoGet({ id: userInfo.user._id });
        onAllVehiclesInfoGet({ id: userInfo.user._id });
        onAllClientsInfoGet({ id: userInfo.user._id });
        onAllBrokersInfoGet({ id: userInfo.user._id });
        onAllTripRequestInfoGet({ id: userInfo.user._id });
        onAllTripUcomingInfoGet({ id: userInfo.user._id });
        onAllTripOngoingInfoGet({ id: userInfo.user._id });
        onGetGlobalData({
          id: userInfo.user._id,
          accountType: "Transporter"
        });
      }
    }
  }
  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  renderToogleButton = () => {
    if (isMobile) {
      return (
        <Button
          type="primary"
          onClick={() => {
            this.toggleCollapsed();
          }}
          style={{ marginBottom: 16 }}
        >
          <Icon type={this.state.collapsed ? "menu-fold" : "menu-unfold"} />
        </Button>
      );
    } else {
    }
  };
  render() {
    const {
      activeNav,
      onChangeActiveNav,
      navName,
      onChangeNavName,
      loading,
      userInfo,
      detail,
      onChangeDetailData,
      onChangeFilterData,
      ON_TRIP_UPON_PUSH_TO_ARRAY
    } = this.props;

    return (
      <Router>
        {!loading ? (
          <div className="loggedin_container">
            <Layout>
              <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.toggleCollapsed}
                collapsedWidth={200}
                trigger={null}
                width={isMobile ? 0 : detail.type === "Trips" ? 0 : detail.type === "Market" ? 0 : 240}
                theme="dark"

                // style={{backgroundColor:"#353b46"}}
              >
                <div className="loggedin_logo">{this.state.logoText}</div>

                <div className="loggedin_menuItem">
                  <Menu
                    style={{ width: isMobile ? 200 : detail.type === "Trips" ? 0 :  detail.type === "Market" ? 0 : 240 }}
                    theme="dark"
                    defaultSelectedKeys={activeNav}
                    mode="inline"
                    selectedKeys={activeNav}
                    defaultOpenKeys={activeNav}
                  >
                    <Menu.Item
                      key="sub0"
                      onClick={() => {
                        onChangeActiveNav(["sub0"]);
                        onChangeNavName({ first: "Dashboard" });
                      }}
                    >
                      <Link to="/loggedin">
                        <span>
                          <i
                            className="material-icons"
                            style={{
                              fontSize: "15px",
                              position: "relative",
                              top: "2px",
                              marginRight: "13px"
                            }}
                          >
                            dashboard
                          </i>
                        </span>

                        <span>Dashboard</span>
                      </Link>
                    </Menu.Item>

                    <SubMenu
                      key="sub1"
                      title={
                        <span>
                          <i
                            style={{
                              fontSize: "15px",
                              position: "relative",
                              top: "2px",
                              marginRight: "13px"
                            }}
                            className="material-icons"
                          >
                            build
                          </i>
                          <span>Fleet Management</span>
                        </span>
                      }
                    >
                      {/* <Menu.Item
                      key="sub1A"
                      onClick={() => {
                        onChangeActiveNav(["sub1", "sub1A"]);
                        onChangeNavName({
                          first: "Assign Vehicles",
                        });
                      }}
                    >
                      <Link to="/loggedin/assignVehicle">Assign Vehicles</Link>
                    </Menu.Item> */}
                      <Menu.Item
                        key="sub1B"
                        onClick={() => {
                          onChangeActiveNav(["sub1", "sub1B"]);
                          onChangeNavName({ first: "Drivers" });
                        }}
                      >
                        <Link to="/loggedin/drivers">
                          <i
                            className="material-icons"
                            style={{
                              fontSize: "15px",
                              marginRight: "8px",
                              position: "relative",
                              top: "2px"
                            }}
                          >
                            person
                          </i>
                          Driver Management
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="sub1C"
                        onClick={() => {
                          onChangeActiveNav(["sub1", "sub1C"]);
                          onChangeNavName({ first: "Vehicles" });
                        }}
                      >
                        <Link to="/loggedin/vehicles">
                          <i
                            className="material-icons"
                            style={{
                              fontSize: "15px",
                              marginRight: "8px",
                              position: "relative",
                              top: "2px"
                            }}
                          >
                            directions_bus
                          </i>
                          <span>Vehicle Management</span>
                        </Link>
                      </Menu.Item>
                      <Menu.Item
                        key="sub1D"
                        onClick={() => {
                          onChangeActiveNav(["sub1", "sub1D"]);
                          onChangeNavName({
                            first: "Transporters"
                          });
                        }}
                      >
                        <Link to="/loggedin/brokerManagement">
                          <i
                            className="material-icons"
                            style={{
                              fontSize: "15px",
                              marginRight: "8px",
                              position: "relative",
                              top: "2px"
                            }}
                          >
                            local_shipping
                          </i>
                          <span>Transporter Management</span>
                        </Link>
                      </Menu.Item>
                    </SubMenu>
                    <Menu.Item
                      key="sub2"
                      onClick={() => {
                        onChangeActiveNav(["sub2"]);
                        onChangeNavName({ first: "Reports" });
                      }}
                    >
                      <Link to="/loggedin/totalReports">
                        <i
                          className="material-icons"
                          style={{
                            fontSize: "15px",
                            position: "relative",
                            top: "2px",
                            marginRight: "13px"
                          }}
                        >
                          assignment
                        </i>
                        Reports
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="sub3"
                      onClick={() => {
                        onChangeActiveNav(["sub3"]);
                        onChangeNavName({ first: "Clients" });
                      }}
                    >
                      <Link to="/loggedin/clientManagement">
                        <i
                          className="material-icons"
                          style={{
                            fontSize: "15px",
                            position: "relative",
                            top: "2px",
                            marginRight: "13px"
                          }}
                        >
                          folder_shared
                        </i>
                        <span>Clients</span>
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      key="sub4"
                      onClick={() => {
                        onChangeActiveNav(["sub4"]);
                        onChangeNavName({ first: "Profile" });
                      }}
                    >
                      <Link to="/loggedIn/profile">
                        <i
                          className="material-icons"
                          style={{
                            fontSize: "15px",
                            position: "relative",
                            top: "2px",
                            marginRight: "13px"
                          }}
                        >
                          group
                        </i>
                        <span>Profile</span>
                      </Link>
                    </Menu.Item>
                  </Menu>
                </div>
              </Sider>

              <Layout.Content style={{ overflowY: "hidden" }}>
                <Layout.Header
                  style={{
                    paddingRight: 10,
                    paddingLeft: 2,

                    overflowY: "hidden"
                  }}
                >
                  <Row>
                    <Col
                      span={8}
                      xs={24}
                      sm={24}
                      md={8}
                      lg={8}
                      style={{ paddingLeft: 10 }}
                    >
                      {this.renderToogleButton()}
                      <span
                        style={{
                          color: "white",
                          fontWeight: 400,
                          fontSize: "16px",
                          cursor: "pointer"
                        }}
                      >
                        {Object.values(navName).map((val, key) => {
                          if (val !== undefined && val !== "") {
                            return (
                              <Link
                                key={key}
                                className="hoverLink"
                                onClick={() => {
                                  const {
                                    onChangeNavName,
                                    onChangeDetailData
                                  } = this.props;

                                  if (val === "Drivers") {
                                    onChangeActiveNav(["sub1", "sub1B"]);

                                    onChangeNavName({
                                      first: "Drivers"
                                    });
                                    onChangeDetailData({
                                      type: "Drivers",
                                      id: ""
                                    });
                                  }

                                  if (val === "Vehicles") {
                                    onChangeActiveNav(["sub1", "sub1C"]);
                                    onChangeNavName({
                                      first: "Vehicles"
                                    });
                                    onChangeDetailData({
                                      type: "Vehicles",
                                      id: ""
                                    });
                                  }
                                  if (val === "Transporters") {
                                    onChangeActiveNav(["sub1", "sub1D"]);
                                    onChangeNavName({
                                      first: "Transporters"
                                    });
                                    onChangeDetailData({
                                      type: "Transporters",
                                      id: ""
                                    });
                                  }
                                  if (val === "Clients") {
                                    onChangeActiveNav(["sub3"]);
                                    onChangeNavName({
                                      first: "Clients"
                                    });
                                    onChangeDetailData({
                                      type: "Clients",
                                      id: ""
                                    });
                                  }
                                }}
                                to={
                                  val === "Dashboard"
                                    ? "/loggedin"
                                    : val === "Drivers"
                                    ? "/loggedin/drivers"
                                    : val === "Vehicles"
                                    ? "/loggedin/vehicles"
                                    : val === "Transporters"
                                    ? "/loggedin/brokerManagement"
                                    : val === "Reports"
                                    ? "/loggedin/totalReports"
                                    : val === "Clients"
                                    ? "/loggedin/clientManagement"
                                    : val === "Profile"
                                    ? "/loggedIn/profile"
                                    : null
                                }
                              >
                                <Icon
                                  type={key === 0 ? null : "caret-right"}
                                  style={{ fontSize: "12px" }}
                                />{" "}
                                {val}{" "}
                              </Link>
                            );
                          }
                          {
                            /* return text; */
                          }
                        })}
                      </span>
                    </Col>

                    <Col span={16} xs={24} sm={24} md={16} lg={16}>
                      <div style={{ float: "right" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%"
                          }}
                        >
                          <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={
                              detail.type === "Trips" ? ["2"] : detail.type === "Market" ? ["3"] :["1"]
                            }
                            selectedKeys={
                              detail.type === "Trips" ? ["2"] :detail.type === "Market" ? ["3"] :["1"]
                            }
                            style={{ lineHeight: "64px", marginRight: 30 }}
                          >
                            <Menu.Item key="1">
                              <Link
                                to="/loggedIn"
                                onClick={() => {
                                  onChangeFilterData({
                                    type: "Trips",
                                    status: "All",
                                    open: false
                                  });

                                  onChangeActiveNav(["sub0"]);
                                  onChangeNavName({
                                    first: "Dashboard"
                                  });
                                  ON_TRIP_UPON_PUSH_TO_ARRAY(false);
                                  onChangeDetailData({
                                    type: "Dashboard",
                                    id: ""
                                  });
                                  this.props.history.push("/LoggedIn");
                                }}
                              >
                                Dashboard
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                              <Link
                                to="/loggedIn/trips"
                                
                                onClick={() => {
                                  ON_TRIP_UPON_PUSH_TO_ARRAY(false);
                                  onChangeFilterData({
                                    type: "Trips",
                                    status: "All",
                                    open: false
                                  });
                                  onChangeNavName({
                                    first: "Trips"
                                  });
                                  onChangeDetailData({
                                    type: "Trips",
                                    id: ""
                                  });
                                  this.props.history.push("/loggedIn/trips");
                                }}
                              >
                                Trips
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                              <Link
                                to="/loggedIn/market"
                                onClick={() => {
                                  // ON_TRIP_UPON_PUSH_TO_ARRAY(false);
                                  // onChangeFilterData({
                                  //   type: "Trips",
                                  //   status: "All",
                                  //   open: false
                                  // });
                                  onChangeNavName({
                                    first: "Market"
                                  });
                                  onChangeDetailData({
                                    type: "Market",
                                    id: ""
                                  });
                                  this.props.history.push("/loggedIn/market");
                                }}
                              >
                                Market
                              </Link>
                            </Menu.Item>
                          </Menu>
                          <div style={{ marginRight: 30, marginTop: 8 }}>
                            <Badge count={5}>
                              <Icon
                                type="bell"
                                theme="twoTone"
                                style={{ fontSize: 20 }}
                              />
                            </Badge>
                          </div>
                          <div style={{ marginRight: 15 }}>
                            <Link
                              to="/loggedIn/profile"
                              onClick={() => {
                                onChangeActiveNav(["sub4"]);
                                onChangeDetailData({
                                  type: "Dashboard",
                                  id: ""
                                });
                                onChangeNavName({
                                  first: "User",
                                  second: "Profile"
                                });
                              }}
                            >
                              <Avatar
                                style={{ backgroundColor: "#33abfb" }}
                                src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652__340.png"
                                icon="user"
                              />
                            </Link>
                          </div>
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <span
                              style={{
                                color: "white",
                                marginTop: 7,
                                marginLeft: 4,
                                marginRight: 8,
                                textAlign: "center",
                                cursor: "pointer"
                              }}
                              onClick={() => {
                                onChangeActiveNav(["sub4"]);
                                this.props.history.push("/loggedIn/profile");
                                onChangeNavName({
                                  first: "User",
                                  second: "Profile"
                                });
                                onChangeDetailData({
                                  type: "Dashboard",
                                  id: ""
                                });
                              }}
                            >
                              <Link
                                style={{ color: colors.whiteDull }}
                                to="/loggedIn/profile"
                              >
                                {userInfo !== ""
                                  ? userInfo.user.name.toUpperCase()
                                  : ""}
                              </Link>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Layout.Header>

                <div
                  style={{
                    width: "101%",
                    height: "100vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    backgroundColor: "#EBEBEB"
                  }}
                  id="scroll"
                >
                  <BackTop
                    visibilityHeight={200}
                    target={() => document.getElementById("scroll")}
                  />
                  <Switch>
                    <Route exact path="/loggedin" component={Dashboard} />
                    <Route exact path="/" component={Dashboard} />
                    {/* <Route exact path="/loggedin/drivers" component={Drivers} />
                    <Route
                      exact
                      path="/loggedin/brokerManagement"
                      component={Brokers}
                    />
                    <Route
                      exact
                      path="/loggedin/clientManagement"
                      component={Clients}
                    />
                    <Route
                      exact
                      path="/loggedin/vehicles"
                      component={Vehicles}
                    />
                    <Route exact path="/loggedin/detail" component={Detail} />
                    <Route exact path="/loggedin/profile" component={Profile} />
                    <Route
                      exact
                      path="/loggedin/totalReports"
                      component={Report}
                    />
                    <Route exact path="/loggedin/trips" component={Trips} />
                    <Route exact path="/loggedin/market" component={Market} /> */}

                  </Switch>
                </div>
              </Layout.Content>
            </Layout>
          </div>
        ) : (
          <Row type="flex" justify="center" align="middle">
            <Icon
              size="large"
              type="loading"
              style={{ fontSize: "50px", marginTop: "27%" }}
            />
          </Row>
        )}
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  activeNav: state.global.activeNav,
  navName: state.global.navName,
  globalData: state.global.globalData,
  userInfo: state.signup.content,
  driverInfo: state.drivers.driverData,
  allDrivers: state.global.allDrivers,
  loading: state.global.loading,
  detail: state.global.detail,
  filters: state.global.filters
});
const mapDispatchToProps = dispatch => ({
  onGetGlobalData: data => dispatch(Actions.onGetGlobalData(data)),
  onGetLogData: data => dispatch(Actions.onGetLogData(data)),
  onChangeActiveNav: activeNav =>
    dispatch(Actions.ON_CHANGE_ACTIVE_NAV(activeNav)),
  onChangeNavName: navName => dispatch(Actions.ON_CHANGE_NAV_NAME(navName)),

  onAllDriversInfoGet: data => dispatch(Actions.onAllDriversInfoGet(data)),
  onAllVehiclesInfoGet: data => dispatch(Actions.onAllVehiclesInfoGet(data)),
  onAllClientsInfoGet: data => dispatch(Actions.onAllClientsInfoGet(data)),
  onAllBrokersInfoGet: data => dispatch(Actions.onAllBrokersInfoGet(data)),
  onAllTripRequestInfoGet: data =>
    dispatch(Actions.onAllTripRequestInfoGet(data)),
  onAllTripUcomingInfoGet: data =>
    dispatch(Actions.onAllTripUcomingInfoGet(data)),
  onAllTripOngoingInfoGet: data =>
    dispatch(Actions.onAllTripOngoingInfoGet(data)),
  onChangeDetailData: data => dispatch(Actions.ON_CHANGE_DETAIL_DATA(data)),
  onChangeFilterData: filter => dispatch(Actions.ON_CHANGE_FILTER_DATA(filter)),
 
  onGetPushNotiToken: data => dispatch(Actions.onGetPushNotiToken(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
