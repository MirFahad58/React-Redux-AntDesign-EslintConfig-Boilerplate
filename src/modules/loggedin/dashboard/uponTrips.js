// this  Table Claass is for Upcoming and Ongoing Trips Table on Dashboard
// Trips
import React, { Component } from "react";
import { Table, Tabs } from "antd";
import { isMobile, colors } from "../../../constants/constants";
import * as ActionsGlobal from "../sidebar/action/actionCreater";
import * as ActionsTrips from "../trips/action/actionCreater";

import { connect } from "react-redux";

// Data and Coulms of this section is for Upcoming and Ongoing Tables
const TabPane = Tabs.TabPane;
const columns = [
  {
    title: "No",
    width: 100,
    dataIndex: "order",
    key: "order"
  },
  {
    title: "From",
    dataIndex: "from",
    width: 150,
    key: "from"
  },
  {
    title: "To",
    dataIndex: "to",
    width: 150,
    key: "to"
  },
  {
    title: "Client",
    dataIndex: "client",
    width: 150,
    key: "client"
  },
  {
    title: "Trucks/Broker",
    dataIndex: "trucks",
    width: 150,
    key: "trucks"
  },
  {
    title: "Phone no.",
    dataIndex: "phone",
    width: 150,
    key: "phone"
  }
];
const data = [];
for (let index = 0; index < 10; index++) {
  data.push({
    key: index,
    order: `TRP${index}`,
    from: `Karachi${index}`,
    to: `Hyderabad${index}`,
    client: `Vivek${index}`,
    trucks: `Mazda${index}`,
    phone: `phoneNumber${index}`
  });
}
class UponTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upData: [],
      upData2: [],
      visible: false
    };
  }
  componentWillReceiveProps(next) {
    if (next.allUpcomingTrips !== this.props.allUpcomingTrips) {
      const { allUpcomingTrips } = next;
      this.state.upData.length = 0;
      allUpcomingTrips.map((val, ind) => {
        this.state.upData.push({
          _id: val._id,
          key: ind,
          order: val.tripId,
          from:
            val.tripRequestInformation.pickupLocation.street +
            " " +
            val.tripRequestInformation.pickupLocation.city,
          to:
            val.tripRequestInformation.dropoffLocation.street +
            " " +
            val.tripRequestInformation.dropoffLocation.city,
          client: val.clientInformation
            ? val.clientInformation.name
            : val.userInformation.name,
          trucks: val.assignedTo
            ? val.assignedTo.map((val2, ind2) =>
                val2.vehiclePlateNo
                  ? val2.vehiclePlateNo + ", "
                  : val2.brokerDriver + "(" + val2.brokerVehicle + "), "
              )
            : "",
          phone: val.clientInformation
            ? val.clientInformation.primaryNumber
            : val.userInformation.name + "(Self)"
        });
      });
      this.setState({ upData: this.state.upData });
    }
    if (next.allOngoingTrips !== this.props.allOngoingTrips) {
      const { allOngoingTrips } = next;
      this.state.upData2.length = 0;
      allOngoingTrips.map((val, ind) => {
        this.state.upData2.push({
          _id: val._id,
          key: ind,
          order: val.tripId,
          from:
            val.tripRequestInformation.pickupLocation.street +
            " " +
            val.tripRequestInformation.pickupLocation.city,
          to:
            val.tripRequestInformation.dropoffLocation.street +
            " " +
            val.tripRequestInformation.dropoffLocation.city,
          client: val.clientInformation
            ? val.clientInformation.name
            : val.userInformation.name,
          trucks: val.assignedTo
            ? val.assignedTo.map((val2, ind2) =>
                val2.vehiclePlateNo
                  ? val2.vehiclePlateNo + ", "
                  : val2.brokerDriver + "(" + val2.brokerVehicle + "), "
              )
            : "",
          phone: val.clientInformation
            ? val.clientInformation.primaryNumber
            : val.userInformation.name + "(Self)"
        });
      });
      this.setState({ upData2: this.state.upData2 });
    }
  }
  componentWillMount() {
    const { allUpcomingTrips, allOngoingTrips } = this.props;
    if (allUpcomingTrips !== undefined) {
      this.state.upData.length = 0;
      allUpcomingTrips.map((val, ind) => {
        this.state.upData.push({
          key: ind,
          _id: val._id,
          order: val.tripId,
          from:
            val.tripRequestInformation.pickupLocation.street +
            " " +
            val.tripRequestInformation.pickupLocation.city,
          to:
            val.tripRequestInformation.dropoffLocation.street +
            " " +
            val.tripRequestInformation.dropoffLocation.city,
          client: val.clientInformation
            ? val.clientInformation.name
            : val.userInformation.name,
          trucks: val.assignedTo
            ? val.assignedTo.map((val2, ind2) =>
                val2.vehiclePlateNo
                  ? val2.vehiclePlateNo + ", "
                  : val2.brokerDriver + "(" + val2.brokerVehicle + "), "
              )
            : "",
          phone: val.clientInformation
            ? val.clientInformation.primaryNumber
            : val.userInformation.name + "(Self)"
        });
      });
      this.setState({ upData: this.state.upData });
    }
    if (allOngoingTrips !== undefined) {
      this.state.upData2.length = 0;
      allOngoingTrips.map((val, ind) => {
        this.state.upData2.push({
          key: ind,
          _id: val._id,
          order: val.tripId,
          from:
            val.tripRequestInformation.pickupLocation.street +
            " " +
            val.tripRequestInformation.pickupLocation.city,
          to:
            val.tripRequestInformation.dropoffLocation.street +
            " " +
            val.tripRequestInformation.dropoffLocation.city,
          client: val.clientInformation
            ? val.clientInformation.name
            : val.userInformation.name,
          trucks: val.assignedTo
            ? val.assignedTo.map((val2, ind2) =>
                val2.vehiclePlateNo
                  ? val2.vehiclePlateNo + ", "
                  : val2.brokerDriver + "(" + val2.brokerVehicle + "), "
              )
            : "",
          phone: val.clientInformation
            ? val.clientInformation.primaryNumber
            : val.userInformation.name + "(Self)"
        });
      });
      this.setState({ upData2: this.state.upData2 });
    }
  }
  onTableOneRowClick = () => {
    this.props.history.push("/loggedin/clientManagement");
  };
  render() {
    return (
      <div
        className="ant-card"
        style={{
          height: "64%",
          borderColor: "rgba(0,0,0,0.12)",
          borderWidth: 1,
          borderStyle: "groove",
          marginTop: "20px",
          padding: 10
        }}
      >
        <Tabs
          tabBarStyle={{
            textUnderlinePosition: "top",
            scale: "20px"
          }}
          style={{
            fontSize: "2px",
            color: "rgba(0, 0, 0, 0.45)"
          }}
          tabBarExtraContent={
            isMobile ? (
              false
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "5px"
                }}
              >
                {/*<Input suffix={<Icon type="search" />} />*/}
              </div>
            )
          }
          defaultActiveKey="1"
        >
          <TabPane tab="Upcoming" key="1">
            <Table
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    const {
                      onChangeDetailData,
                      onChangeNavName,
                      ON_TRIP_UPON_PUSH_TO_ARRAY
                    } = this.props;
                    let data = [];
                    data.push({
                      _id: record._id,
                      tripId: record.order,
                      clientName: record.client,
                      from: record.from,
                      to: record.to,
                      tripDate: false,
                      clientPicture: false
                    });
                    ON_TRIP_UPON_PUSH_TO_ARRAY(data);
                    onChangeDetailData({
                      id: record._id,
                      type: "Trips"
                    });
                    onChangeNavName({
                      first: "Trips",
                      second: "TRP#" + record.order
                    });
                    this.props.history.push("/loggedIn/trips");
                    // window.location.reload();
                  }
                };
              }}
              dataSource={this.state.upData}
              columns={columns}
              pagination={false}
              style={{ minHeight: 300, height: 300, cursor: "pointer" }}
              bodyStyle={{
                minHeight: this.state.upData.length !== 0 ? 280 : 140,
                height: this.state.upData.length !== 0 ? 280 : 140
              }}
              size="middle"
              scroll={{ x: 850, y: false }}
            />
            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  fontSize: 14,
                  color: colors.primaryColor,
                  cursor: "pointer"
                }}
                onClick={() => {
                  const {
                    onChangeFilterData,
                    onChangeNavName,
                    onChangeDetailData,
                    ON_SET_DETAIL_DATA_FALSE
                  } = this.props;
                  onChangeFilterData({
                    status: "Upcoming",
                    open: true,
                    type: "Trips"
                  });
                  ON_SET_DETAIL_DATA_FALSE(false);
                  onChangeDetailData({
                    id: "",
                    type: "Trips"
                  });
                  onChangeNavName({
                    first: "Trips",
                    second: "Upcoming"
                  });
                  // this.props.history.push("/nav")
                  this.props.history.push("/loggedIn/trips");
                }}
              >
                See All Upcoming Trips
              </span>
            </div>
          </TabPane>
          <TabPane tab="Ongoing" key="2">
            <Table
              onRow={(record, index) => {
                return {
                  onClick: () => {
                    const {
                      onChangeDetailData,
                      onChangeNavName,
                      ON_TRIP_UPON_PUSH_TO_ARRAY
                    } = this.props;
                    let data = [];
                    data.push({
                      _id: record._id,
                      tripId: record.order,
                      clientName: record.client,
                      from: record.from,
                      to: record.to,
                      tripDate: false,
                      clientPicture: false
                    });
                    ON_TRIP_UPON_PUSH_TO_ARRAY(data);
                    onChangeDetailData({
                      type: "Trips",
                      id: record._id
                    });

                    onChangeNavName({
                      first: "Trips",
                      second: "TRP#" + record.order
                    });
                    // this.props.history.push("/nav")
                    this.props.history.push("/loggedIn/trips");
                    // window.location.reload();
                  }
                };
              }}
              dataSource={this.state.upData2}
              columns={columns}
              pagination={false}
              style={{ minHeight: 300, height: 300 }}
              bodyStyle={{
                minHeight: this.state.upData2.length !== 0 ? 280 : 140,
                height: this.state.upData2.length !== 0 ? 280 : 140
              }}
              size="middle"
              scroll={{ x: 850, y: false }}
            />
            <div style={{ marginTop: 10 }}>
              <span
                style={{
                  fontSize: 14,
                  color: colors.primaryColor,
                  cursor: "pointer"
                }}
                onClick={() => {
                  const {
                    onChangeFilterData,
                    onChangeNavName,
                    onChangeDetailData,
                    ON_SET_DETAIL_DATA_FALSE
                  } = this.props;
                  onChangeFilterData({
                    status: "Ongoing",
                    open: true,
                    type: "Trips"
                  });
                  ON_SET_DETAIL_DATA_FALSE(false);
                  onChangeDetailData({
                    id: "",
                    type: "Trips"
                  });
                  onChangeNavName({
                    first: "Trips",
                    second: "Ongoing"
                  });
                  // this.props.history.push("/nav")
                  this.props.history.push("/loggedIn/trips");
                }}
              >
                See All Ongoing Trips
              </span>
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
const mapStateToProps = ({ global }) => ({
  allUpcomingTrips: global.allUpcomingTrips.reverse(),
  allOngoingTrips: global.allOngoingTrips.reverse(),
  filters: global.filters
});
const mapDispatchToProps = dispatch => ({
  onChangeDetailData: data =>
    dispatch(ActionsGlobal.ON_CHANGE_DETAIL_DATA(data)),
  onChangeNavName: navName =>
    dispatch(ActionsGlobal.ON_CHANGE_NAV_NAME(navName)),
  onChangeFilterData: filter =>
    dispatch(ActionsGlobal.ON_CHANGE_FILTER_DATA(filter)),
  ON_TRIP_UPON_PUSH_TO_ARRAY: data =>
    dispatch(ActionsTrips.ON_TRIP_UPON_PUSH_TO_ARRAY(data)),
  // onChangeFilterData: filter =>
  // dispatch(ActionsGlobal.ON_CHANGE_FILTER_DATA(filter)),
  ON_SET_DETAIL_DATA_FALSE: data =>
    dispatch(ActionsTrips.ON_SET_DETAIL_DATA_FALSE(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UponTrips);
