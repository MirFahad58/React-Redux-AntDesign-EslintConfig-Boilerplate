import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Card,
  Layout,
  Spin,
  Avatar,
  Modal
} from "antd";
import {
  colors,
  isMobile,
  textColor,
  sizes
} from "../../../constants/constants";
import { connect } from "react-redux";
import TripRequestComponent from "../../../components/tripRequestCard/tripRequestCard";
import StatusComponent from "../../../components/statusComponent/statusComponent";
import GraphComponent from "../../../components/graphComponent/graphComponent";
import MapComponent from "../../../components/mapComponent/mapComponent";
import openSocket from "socket.io-client";
import UponTrips from "./uponTrips";
import { driverAppGpsSocket } from "../../../constants/config";
import * as Actions from "./action/actionCreater";
import * as ActionsGlobal from "../sidebar/action/actionCreater";
import MainModal from "../../../components/modals/mainModal";
import { Images } from "../../../public/asset";
import StatusComponent2 from "../../../components/statusComponent/statusComponent2";
import DetailComponent from "../../../components/statusComponent/detailComponent";
const { Sider } = Layout;
const socket = openSocket(driverAppGpsSocket, {
  transports: ["websocket"],
  upgrade: false
});
class Dashboard extends Component {
  // This Dashboard class is the 1st page that comes after User Login

  constructor(props) {
    super(props);
    this.state = {
      nextModal: null,
      selectModalVisible: false,
      OnlineDrivers: []
    };
  }

  componentWillMount() {
    const {
      onChangeActiveNav,
      onChangeNavName,
      onChangeDetailData
    } = this.props;
    onChangeDetailData({ type: "Dashboard", id: "" });
    onChangeActiveNav(["sub0"]);
    onChangeNavName({ first: "Dashboard" });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.allDrivers !== nextProps.allDrivers) {
      let allDrivers = new Array();
      this.state.OnlineDrivers.length = 0;
      nextProps.allDrivers.map((val, ind) => {
        if (val.connectionStatus === "Connected") {
          allDrivers[val.driverId] = new Array();
          allDrivers[val.driverId].push({
            name: val.name,
            phoneNumber: val.phoneNumber,
            localId: val.driverId,
            lat: 0,
            long: 0
          });
        }
      });
      this.setState({ OnlineDrivers: allDrivers });
    }
  }
  componentDidMount() {
    // this code is for getting location from socket.io for all drivers
    this.state.OnlineDrivers.length = 0;
    let allDrivers = new Array();
    let id = new Array();
    this.props.allDrivers.map((val, ind) => {
      if (val.connectionStatus === "Connected") {
        allDrivers[val.driverId] = new Array();
        allDrivers[val.driverId].push({
          name: val.name,
          phoneNumber: val.phoneNumber,
          localId: val.driverId,
          lat: 0,
          long: 0
        });
      }
    });
    allDrivers.map((val, ind) => {
      id.push(val[0].localId);
    });
    socket.emit("join", id);
    socket.on("newMessage", msg => {});
    socket.on("driverUpdates", data => {
      if (this.state.OnlineDrivers[data.token]) {
        this.state.OnlineDrivers[data.token][0].lat = Number(data.lat);
        this.state.OnlineDrivers[data.token][0].long = Number(data.long);
        this.setState({ OnlineDrivers: this.state.OnlineDrivers });
      }
    });
    this.setState({ OnlineDrivers: allDrivers });
  }

  selectModal = () => {
    if (this.state.nextModal === true) {
      const { requestModalVisible, tripRequestDetail } = this.props;

      return (
        <MainModal
          visible={requestModalVisible}
          modalType={"request"}
          data={tripRequestDetail}
        />
      );
    } else if (this.state.nextModal === false) {
      const { requestModalVisible, tripRequestDetail } = this.props;
      return (
        <MainModal
          visible={requestModalVisible}
          modalType={"markeet"}
          history={this.props.history}
          data={tripRequestDetail}
        />
      );
    }
  };

  handleTR = val => {
    this.setState({ nextModal: val });
  };

  render() {
    const {
      onChangeRequestModalVisible,
      logData,
      allTripRequests,
      allBrokers,
      allVehicles,
      allClients,
      loading2,
      ON_CHANGE_REQUEST_DETAIL_NULL
    } = this.props;
    return (
      <div className="dashboardMain">
        {!loading2 ? (
          <div>
            {this.selectModal()}
            <Modal
              title={
                <span style={{ fontSize: sizes.h5, fontWeight: 400 }}>
                  Add Trip Request
                </span>
              }
              footer={null}
              header={null}
              visible={this.state.selectModalVisible}
              onCancel={() => {
                this.setState({ selectModalVisible: false });
              }}
              width={600}
              bodyStyle={{ padding: 10, borderRadius: 1 }}
            >
              <div style={{ textAlign: "center" }}>
                <span>Please Chose your trip Request Type</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                <Col span={12}>
                  <div
                    style={{
                      margin: 10,
                      justifyContent: "center",
                      textAlign: "center",
                      borderColor: colors.backColor,
                      borderWidth: 1,
                      borderStyle: "solid",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      onChangeRequestModalVisible(true);
                      this.setState({
                        selectModalVisible: false,
                        nextModal: false
                      });
                    }}
                  >
                    <Avatar
                      src={Images.WORLD}
                      style={{ margin: 20 }}
                      size={70}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 20
                      }}
                    >
                      <span
                        style={{
                          fontSize: sizes.h2,
                          color: textColor.text_midle
                        }}
                      >
                        Market Trip Request
                      </span>
                      <span
                        style={{
                          fontSize: sizes.h4,
                          color: textColor.text_light
                        }}
                      >
                        Post Trip in Market
                      </span>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    style={{
                      margin: 10,
                      justifyContent: "center",
                      textAlign: "center",
                      borderColor: colors.backColor,
                      borderWidth: 1,
                      borderStyle: "solid",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      onChangeRequestModalVisible(true);
                      this.setState({
                        selectModalVisible: false,
                        nextModal: true
                      });
                    }}
                  >
                    <Avatar
                      src={Images.USER}
                      style={{ margin: 20 }}
                      size={70}
                    />

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 20
                      }}
                    >
                      <span
                        style={{
                          fontSize: sizes.h2,
                          color: textColor.text_midle
                        }}
                      >
                        Internal Trip Request
                      </span>
                      <span
                        style={{
                          fontSize: sizes.h4,
                          color: textColor.text_light
                        }}
                      >
                        Assign and Manage Trip
                      </span>
                    </div>
                  </div>
                </Col>
              </div>
            </Modal>

            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={14}
                xl={14}
                xxl={14}
                span={14}
                style={{ padding: 10 }}
              >
                <h2 style={{ color: textColor.text_light, fontSize: sizes.h1 }}>
                  Log
                </h2>
                <Card
                  size="small"
                  style={{
                    height: "100%",
                    borderColor: "rgba(0,0,0,0.12)",
                    borderWidth: 1,
                    borderStyle: "groove"
                  }}
                >
                  <Row>
                    <StatusComponent
                      type="Drivers"
                      type2="Connected"
                      value1={logData.totalDrivers}
                      value2={logData.totalOnlineDrivers}
                      status="normal"
                      color="#1890FF"
                    />
                    <StatusComponent
                      type="Trips"
                      type2="Ongoing"
                      value1={
                        logData.totalUpcomingTrips + logData.totalOngoingTrips
                      }
                      value2={logData.totalOngoingTrips}
                      status="success"
                      color="#4EE1B4"
                    />
                    <StatusComponent2
                      type="Upcoming"
                      type2="Ended"
                      value1={logData.totalUpcomingTrips}
                      value2={logData.totalEndedTrips}
                      status="normal"
                      color="#7875E6"
                    />
                  </Row>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={10}
                xl={10}
                xxl={10}
                span={10}
                style={{ padding: 10 }}
              >
                <h2 style={{ color: textColor.text_light, fontSize: sizes.h1 }}>
                  summary
                  {/* Trips Completed */}
                </h2>
                <Card
                  size="small"
                  style={{
                    height: "100%",
                    borderColor: "rgba(0,0,0,0.12)",
                    borderWidth: 1,
                    borderStyle: "groove"
                  }}
                >
                  <DetailComponent
                    value1={"Total"}
                    value2={allBrokers}
                    value3={"Transporters"}
                    picture={Images.BROKER}
                  />
                  <DetailComponent
                    value1={"Total"}
                    value2={allVehicles}
                    value3={"Vehicles"}
                    picture={Images.TRUCK_ONE}
                  />
                  <DetailComponent
                    value1={"Total"}
                    value2={allClients}
                    value3={"Clients"}
                    picture={Images.WORLD}
                    border={false}
                  />
                </Card>
              </Col>
            </Row>
            <Layout
              style={{
                height: "700px",
                backgroundColor: "#EBEBEB",
                marginBottom: 150
              }}
            >
              <Sider
                theme="light"
                style={{
                  backgroundColor: "rgba(0,0,0,0.001)",
                  padding: 10,
                  minHeight: 100,
                  height: "100%"
                }}
                width={isMobile ? window.innerWidth : 350}
              >
                <h2 style={{ color: textColor.text_light, fontSize: sizes.h1 }}>
                  Requests
                </h2>
                <Card
                  size="small"
                  header={null}
                  style={{
                    borderColor: "rgba(0,0,0,0.12)",
                    borderWidth: 1,
                    borderStyle: "groove",
                    height: "725px"
                  }}
                >
                  <div>
                    <Button
                      type="dashed"
                      size="default"
                      style={{
                        width: "100%",
                        marginTop: 10,
                        color: colors.primaryColor
                      }}
                      onClick={() => {
                        this.setState({ selectModalVisible: true });
                        ON_CHANGE_REQUEST_DETAIL_NULL(false);
                      }}
                    >
                      <Icon
                        style={{ color: colors.primaryColor }}
                        type="plus-circle"
                      />
                      Add Request
                    </Button>
                  </div>
                  <div className="hoverScrollTripRequest">
                    {allTripRequests.length !== 0 &&
                    allTripRequests.length !== undefined ? (
                      allTripRequests.map((val, ind) => {
                        let name =
                          val.type == "Local"
                            ? val.clientInformation.name
                            : "Self";
                        return (
                          <TripRequestComponent
                            key={ind}
                            handleTR={this.handleTR}
                            clientName={name}
                            tripId={val.tripRequestId}
                            date={val.requestedTime}
                            tripPickUpLocation={val.pickupLocation.street}
                            tripDropOffLocation={val.dropoffLocation.street}
                            pickUpCity={val.pickupLocation.city}
                            dropOffCity={val.dropoffLocation.city}
                            id={val._id}
                            type={val.type}
                            history={this.props.history}
                          />
                        );
                      })
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Avatar
                          size="large"
                          style={{
                            width: 110,
                            height: 90,
                            marginTop: "50%",
                            opacity: 0.5
                          }}
                          src={Images.NO_DATA}
                        />
                        <h1
                          style={{
                            color: colors.black,
                            fontSize: sizes.h4,
                            opacity: 0.4
                          }}
                        >
                          No Trip requests found
                        </h1>
                      </div>
                    )}
                  </div>
                </Card>
              </Sider>
              <Col
                className="display1"
                style={{
                  padding: 10,
                  height: "700px"
                }}
              >
                <h2 style={{ color: textColor.text_light, fontSize: sizes.h1 }}>
                  Drivers Map
                </h2>
                <MapComponent
                  markersArray={this.state.OnlineDrivers}
                  height={"230px"}
                />

                <h2
                  style={{
                    color: textColor.text_light,
                    fontSize: sizes.h1,
                    marginTop: "20px"
                  }}
                >
                  Trips
                </h2>
                <UponTrips history={this.props.history} />
              </Col>
            </Layout>
            <div
              style={{
                marginTop: window.innerHeight < 600 ? 210 : 80,
                height: "70vh",
                marginBottom: 200
              }}
              className="Colo"
            >
              <Col
                span={24}
                style={{
                  padding: 10
                }}
              >
                <h2 style={{ color: textColor.text_light, fontSize: sizes.h1 }}>
                  Drivers Map
                </h2>
                <MapComponent
                  markersArray={this.state.OnlineDrivers}
                  height={"230px"}
                />
                <h2
                  style={{
                    color: textColor.text_light,
                    fontSize: sizes.h1,
                    marginTop: 10
                  }}
                >
                  Trips
                </h2>
                <UponTrips history={this.props.history} />
              </Col>
            </div>
          </div>
        ) : (
          <Spin
            style={{ marginTop: "10%" }}
            tip={"Getting Data..."}
            size="large"
            spinning={loading2}
            indicator={<Icon type="loading" style={{ fontSize: 25 }} spin />}
          >
            <div>
              <Col>
                <Row>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={14}
                    xl={14}
                    xxl={14}
                    span={14}
                    style={{ padding: 10 }}
                  >
                    <h2
                      style={{
                        color: textColor.text_light,
                        fontSize: sizes.h1
                      }}
                    >
                      Log
                    </h2>
                    <Card
                      size="small"
                      style={{
                        height: "100%",
                        borderColor: "rgba(0,0,0,0.12)",
                        borderWidth: 1,
                        borderStyle: "groove"
                      }}
                    >
                      <Row>
                        <StatusComponent
                          type="Drivers"
                          type2="Online"
                          value1={logData.totalDrivers}
                          value2={logData.totalOnlineDrivers}
                          status="normal"
                        />
                        <StatusComponent
                          type="Trips"
                          type2="Ongoing"
                          value1={logData.totalTrips}
                          value2={logData.totalOngoingTrips}
                          status="success"
                        />
                        <StatusComponent
                          type="Upcoming"
                          type2="Ended"
                          value1={logData.totalUpcomingTrips}
                          value2={logData.totalEndedTrips}
                          status="normal"
                        />
                      </Row>
                    </Card>
                  </Col>
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={10}
                    xxl={10}
                    span={10}
                    style={{ padding: 10 }}
                  >
                    <h2
                      style={{
                        color: textColor.text_light,
                        fontSize: sizes.h1
                      }}
                    >
                      Trips Completed
                    </h2>
                    <GraphComponent />
                  </Col>
                </Row>
              </Col>
              <Layout style={{ height: window.innerHeight - 300 }}>
                <Sider
                  theme="light"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.001)",
                    padding: 10,
                    minHeight: 100,
                    height: "100%"
                  }}
                  width={isMobile ? window.innerWidth : 350}
                >
                  <h2
                    style={{ color: textColor.text_light, fontSize: sizes.h1 }}
                  >
                    Requests
                  </h2>
                  <Card
                    size="small"
                    header={null}
                    style={{
                      borderColor: "rgba(0,0,0,0.12)",
                      borderWidth: 1,
                      borderStyle: "groove",
                      height: "682px"
                    }}
                  >
                    <div>
                      <Button
                        type="dashed"
                        size="default"
                        style={{
                          width: "100%",
                          marginTop: 10,
                          color: colors.primaryColor
                        }}
                        onClick={() => {
                          ON_CHANGE_REQUEST_DETAIL_NULL(false);
                          onChangeRequestModalVisible(true);
                        }}
                      >
                        <Icon
                          style={{ color: colors.primaryColor }}
                          type="plus-circle"
                        />
                        Add Request
                      </Button>
                    </div>
                    <div
                      style={{
                        overflowY: "scroll",
                        marginTop: 10,
                        height: "570px"
                      }}
                    >
                      {allTripRequests.length !== 0 ? (
                        allTripRequests.reverse().map((val, ind) => {
                          let name =
                            val.type == "Local"
                              ? "Client Name"
                              : "Self";
                          return (
                            <TripRequestComponent
                              key={ind}
                              clientName={name}
                              tripId={val.tripRequestId}
                              date={val.requestedTime}
                              tripPickUpLocation={val.pickupLocation.street}
                              tripDropOffLocation={val.dropoffLocation.street}
                              pickUpCity={val.pickupLocation.city}
                              dropOffCity={val.dropoffLocation.city}
                              id={val._id}
                              type={val.type}
                            />
                          );
                        })
                      ) : (
                        <Icon type="loading" />
                      )}
                    </div>
                  </Card>
                </Sider>
                <Col
                  className="display1"
                  style={{
                    padding: 10
                  }}
                >
                  <h2
                    style={{ color: textColor.text_light, fontSize: sizes.h1 }}
                  >
                    Drivers Map
                  </h2>
                  <MapComponent markersArray={[]} height={"230px"} />
                  <h2
                    style={{
                      color: textColor.text_light,
                      fontSize: sizes.h1,
                      marginTop: "20px"
                    }}
                  >
                    Trips
                  </h2>
                  <UponTrips />
                </Col>
              </Layout>
              <div
                style={{ marginTop: window.innerHeight < 600 ? 210 : 80 }}
                className="Colo"
              >
                <Col
                  span={24}
                  style={{
                    padding: 10
                  }}
                >
                  <h2
                    style={{ color: textColor.text_light, fontSize: sizes.h1 }}
                  >
                    Drivers Map
                  </h2>
                  <MapComponent markersArray={[]} height={"230px"} />
                  <h2
                    style={{
                      color: textColor.text_light,
                      fontSize: sizes.h1,
                      marginTop: 10
                    }}
                  >
                    Trips
                  </h2>
                  <UponTrips />
                </Col>
              </div>
            </div>
          </Spin>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ dashboard, global, signup }) => ({
  requestModalVisible: dashboard.requestModalVisilbe,
  logData: global.logData,
  userInfo: signup.content,
  allTripRequests: global.allTripRequests.reverse(),
  tripRequestDetail: dashboard.tripRequestDetail,
  loading2: dashboard.loading2,
  allDrivers: global.allDrivers,
  allBrokers: global.allBrokers ? global.allBrokers.length : 0,
  allClients: global.allClients ? global.allClients.length : 0,
  allVehicles: global.allVehicles ? global.allVehicles.length : 0
});
const mapDispatchToProps = dispatch => ({
  onChangeRequestModalVisible: visible =>
    dispatch(Actions.ON_CHANGE_REQUEST_MODAL_VISIBLE(visible)),
  ON_CHANGE_REQUEST_DETAIL_NULL: data =>
    dispatch(Actions.ON_CHANGE_REQUEST_DETAIL_NULL(data)),

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
)(Dashboard);
