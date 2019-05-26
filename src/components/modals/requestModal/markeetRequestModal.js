import React, { Component } from "react";
import {
  Modal,
  Col,
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Popconfirm,
  Table,
  Row,
  message,
  InputNumber,
  TimePicker
} from "antd";
import { connect } from "react-redux";
import * as Actions from "../../../modules/loggedin/dashboard/action/actionCreater";
import ModalCompoentLeftComtent from "../../modalComponentLeftContent/modalComponentLeftViewContent";
import { Images } from "../../../public/asset/index";
import { sizes, textColor, colors } from "../../../constants/constants";
import * as ActionsTrips from "../../../modules/loggedin/trips/action/actionCreater";
import ApnaDivider from "../../apnaDivider/apnaDivider";
import TextArea from "antd/lib/input/TextArea";
import cities from "../../../constants/jsons/cities.json";
import * as ActionsGlobal from "../../../modules/loggedin/sidebar/action/actionCreater";
import moment from "moment";
const Option = Select.Option;
const childrenCities = [];
childrenCities.length = 0;
if (cities["Pakistan"] === undefined) {
} else {
  cities["Pakistan"].forEach(element => {
    childrenCities.push(<Option key={element}>{element}</Option>);
  });
}

class RequestModalForm extends Component {
  constructor(props) {
    super(props);
    const { getFieldDecorator } = this.props.form;

    this.state = {
      loading: false,
      form: "1st",
      newClient: false,
      vehicle: "",
      vehicleType: "",
      qty: 1,
      VehicleData: [],
      expanded: [],
      count1: 1,
      tripData: [],
      additional: false,
      allTypes: this.props.vehicleType
    };
    this.tripColumns = [
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Vehicle Cat:
          </span>
        ),
        dataIndex: "vehicle"
      },
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Type
          </span>
        ),
        dataIndex: "vehicleType"
      },
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Assign To
          </span>
        ),
        render: (text, Actions) => {
          const { allDrivers, allBrokers } = this.props;
          return (
            <Form.Item>
              {getFieldDecorator("assign" + text.key, {
                rules: [
                  {
                    required: true,
                    message: "Please Select Driver/Broker"
                  }
                ]
              })(
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) => {
                    if (typeof option.props.children === "string") {
                      return (
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }
                  }}
                  style={{ width: 180, marginTop: 20, lineHeight: 1 }}
                  placeholder="Select Broker or Driver"
                >
                  <Select.OptGroup label="Drivers">
                    {allDrivers && allDrivers.length !== 0
                      ? allDrivers.map((val, ind) => {
                          if (val.vehicleInformation) {
                            return (
                              <Option
                                key={val._id}
                                value={val._id}
                                onClick={() => {
                                  this.state.expanded.splice(text.key, 1);
                                  this.state.tripData[
                                    text.key - 1
                                  ].desc = false;
                                  this.state.tripData[text.key - 1].type =
                                    "driver";
                                  this.state.tripData[
                                    text.key - 1
                                  ].driverVehicleId =
                                    val.vehicleInformation._id;
                                  this.setState({
                                    expanded: this.state.expanded,
                                    tripData: this.state.tripData
                                  });
                                }}
                              >
                                {val.name + " "}
                                {"(" + val.vehicleInformation.plateNo + ")"}
                              </Option>
                            );
                          }
                        })
                      : ""}
                  </Select.OptGroup>
                  <Select.OptGroup label="Brokers">
                    {allBrokers
                      ? allBrokers.map((val, ind) => {
                          return (
                            <Option
                              key={val._id}
                              value={val._id}
                              onClick={() => {
                                this.state.expanded[text.key] = text.key;
                                this.state.tripData[text.key - 1].desc = true;
                                this.state.tripData[text.key - 1].type =
                                  "broker";
                                this.state.tripData[
                                  text.key - 1
                                ].driverVehicleId = "";

                                this.setState({
                                  expanded: this.state.expanded
                                });
                              }}
                            >
                              {val.name}
                            </Option>
                          );
                        })
                      : ""}
                  </Select.OptGroup>
                </Select>
              )}
            </Form.Item>
          );
        }
      }
    ];
    this.vehicleCol = [
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Vehicle
          </span>
        ),
        dataIndex: "vehicle"
      },
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Type
          </span>
        ),
        dataIndex: "vehicleType"
      },
      {
        title: (
          <span style={{ color: textColor.text_light, fontSize: sizes.h3 }}>
            Qty
          </span>
        ),
        dataIndex: "qty"
      },
      {
        title: "",
        dataIndex: "",
        key: "x",
        render: (text, record) =>
          this.state.VehicleData.length >= 1 ? (
            <Popconfirm
              title="Sure to remove?"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <Button
                shape="circle"
                size="small"
                icon="cross"
                type="ghost"
                style={{ color: "red", borderColor: "red" }}
              />
            </Popconfirm>
          ) : null
      }
    ];
  }

  filterType = key => {
    const { vehicleType } = this.props;
    this.setState({
      allTypes: vehicleType.filter(val => val.category === key)
    });
  };
  // this section delete rows from vehicle table
  handleDelete = key => {
    const dataSource = [...this.state.VehicleData];
    this.setState({ VehicleData: dataSource.filter(item => item.key !== key) });
  };
  // this will add row to the vehicle Table
  handleAdd = key => {
    if (
      this.state.vehicle !== "" &&
      this.state.vehicle !== undefined &&
      this.state.vehicleType !== "" &&
      this.state.vehicleType !== undefined &&
      this.state.qty > 0 &&
      this.state.qty !== "" &&
      this.state.qty !== undefined
    ) {
      const newData = {
        key: this.state.count1,
        vehicle: this.state.vehicle,
        vehicleType: this.state.vehicleType,
        vehicleTypeId: this.state.vehicleTypeId,
        qty: this.state.qty
      };
      this.setState({
        VehicleData: [...this.state.VehicleData, newData],
        count1: this.state.count1 + 1,
        vehicle: "",
        vehicleType: "",
        vehicleTypeId: "",
        qty: 1
      });
    } else {
      message.error("You have to Enter A vehicle and Type Information");
    }
  };

  // Ye save Draft pe call hoga
  handleSaveDraft = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let typeIdArray = [];
        this.state.VehicleData.map((val1, key1) => {
          for (let c = 1; c <= parseInt(val1.qty); c++) {
            typeIdArray.push(val1.vehicleTypeId);
          }
        });
        const {
          userInfo,
          onTripRequestAdd,
          onChangeRequestModalVisible,
          onAddTripRequestPush,
          onGetLogData,
          // data,
          onAllTripRequestInfoGet,
          onTripRequestEdit,
          ON_TRIP_REQUEST_PUSH_TO_ARRAY,
          onChangeFilterData,
          onChangeNavName,
          onChangeDetailData
        } = this.props;
        if (userInfo !== {}) {
          let data = {
            user: {
              userId: userInfo.user._id,
              accountType: "Transporter"
            },
            tripRequest: {
              type: "Market",
              newClient: false,
              client: userInfo.user._id,
              tripType: "Drop",
              requestedTime: moment().toISOString(),
              addedBy: {
                userType: "Transporter",
                user: userInfo.user._id
              },
              senderName: null,
              senderNumber: null,
              recieverName: null,
              recieverNumber: null,
              initialRequestedAmount: null, // this will be removed or make it null
              pickupLocation: {
                street: values.pickAddress,
                city: values.pickCity
              },
              dropoffLocation: {
                street: values.dropAddress,
                city: values.dropCity
              },
              pickupDate: moment(values.pickDate).toISOString(),
              dropoffDate: "2019-03-26T05:06:21+00:00" // do not remove just i send you null
            },
            vehicleRequest: {
              requestedBy: userInfo.user._id,
              vehicleType: typeIdArray,
              requestedLabour: null,
              additionalDescription: values.additional
            },
            goods: {
              goodsType: values.gType ? values.gType : [],
              weight: {
                quantity: values.gWeight ? parseInt(values.gWeight) : null,
                unit: values.gWeightType
              },
              goodsDescription: values.detail ? values.detail : null
            },
            client: {}
          };
          let data2 = {
            user: {
              userId: userInfo.user._id,
              accountType: "Transporter",
              tripRequestId: this.props.data ? this.props.data._id : ""
            },
            tripRequest: {
              type: "Market",
              newClient: false,
              client: userInfo.user._id,
              tripType: "Drop",
              requestedTime: moment().toISOString(),
              addedBy: {
                userType: "Transporter",
                user: userInfo.user._id
              },
              senderName: null,
              senderNumber: null,
              recieverName: null,
              recieverNumber: null,
              initialRequestedAmount: null, // this will be removed or make it null
              pickupLocation: {
                street: values.pickAddress,
                city: values.pickCity
              },
              dropoffLocation: {
                street: values.dropAddress,
                city: values.dropCity
              },
              pickupDate: moment(values.pickDate).toISOString(),
              dropoffDate: "2019-03-26T05:06:21+00:00" // do not remove just i send you null
            },
            vehicleRequest: {
              id: this.props.data
                ? this.props.data.vehicleRequestInformation._id
                : "",
              requestedBy: userInfo.user._id,
              vehicleType: typeIdArray,
              requestedLabour: null,
              additionalDescription: values.additional
            },
            goods: {
              id: this.props.data ? this.props.data.goodsInformation._id : "",
              goodsType: values.gType ? values.gType : null,
              weight: {
                quantity: values.gWeight ? parseInt(values.gWeight) : null,
                unit: values.gWeightType
              },
              goodsDescription: values.detail ? values.detail : null
            },
            client: {}
          };
          if (this.props.data) {
            const hello = async () => {
              let response = await onTripRequestEdit(data2);
              if (response.payload.data !== "") {
                onChangeRequestModalVisible(false);
                onAllTripRequestInfoGet({ id: userInfo.user._id });
                // onAddTripRequestPush(response.payload.data);
                message.success("Trip Request Updated");
              }
            };
            hello();
          } else {
            const hello = async () => {
              let response = await onTripRequestAdd(data);
              if (response.payload.data !== "") {
                let res = response.payload.data;
                onAddTripRequestPush(response.payload.data);
                onChangeRequestModalVisible(false);
                onGetLogData({ id: userInfo.user._id });
                message.success("Trip Request Added");
                let data2 = [];
                data2.push({
                  _id: res._id,
                  type: "Market",
                  tripRequestId: res.tripRequestId,
                  name: res.userInformation.name,
                  pickupLocation: {
                    street: res.pickupLocation.street,
                    city: res.pickupLocation.city
                  },
                  dropoffLocation: {
                    street: res.dropoffLocation.street,
                    city: res.dropoffLocation.city
                  },
                  requestedTime: res.requestedTime,
                  clientPicture: false
                });
                ON_TRIP_REQUEST_PUSH_TO_ARRAY(data2);
                onChangeFilterData({
                  status: "All",
                  open: false,
                  type: "Requests"
                });
                // ON_TRIP_UPON_PUSH_TO_ARRAY(false)
                onChangeNavName({
                  first: "Trips",
                  second: "Requests"
                });
                onChangeDetailData({
                  type: "Trips",
                  id: ""
                });
                this.props.history.push("/loggedIn/trips");
              }
            };
            hello();
          }
        }
      }
    });
  };

  renderForm = () => {
    const { getFieldDecorator } = this.props.form;
    const {
      onChangeRequestModalVisible,
      vehicalCat,
      goodsType,
      loading
    } = this.props;
    return (
      <div>
        <Form onSubmit={this.handleSaveDraft} spellCheck={true}>
          <ApnaDivider text={"Vehicles"} />
          <Row
            style={{ marginBottom: 20, height: "220px", overflow: "scroll" }}
          >
            <Col span={24}>
              <Table
                pagination={false}
                columns={this.vehicleCol}
                dataSource={this.state.VehicleData}
                size="middle"
              />
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 20
            }}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200, marginLeft: 10 }}
              value={this.state.vehicle ? this.state.vehicle : undefined}
              placeholder={"Vehicle Category"}
              onChange={(value, obj) => {
                this.filterType(obj.key);
                this.setState({ vehicle: value });
              }}
            >
              {vehicalCat
                ? vehicalCat.map((val, ind) => {
                    return (
                      <Option key={val._id} value={val.title}>
                        {val.title}
                      </Option>
                    );
                  })
                : ""}
            </Select>
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200, marginLeft: 10 }}
              value={
                this.state.vehicleType ? this.state.vehicleType : undefined
              }
              placeholder={"Vehicle Type"}
              onSelect={(e, v) => {
                this.setState({
                  vehicleType: v.props.children,
                  vehicleTypeId: e
                });
              }}
            >
              {this.state.allTypes
                ? this.state.allTypes.map((val, ind) => {
                    return (
                      <Option key={val._id} value={val._id}>
                        {val.title}
                      </Option>
                    );
                  })
                : ""}
            </Select>

            <InputNumber
              min={1}
              max={10}
              style={{ width: 80, marginLeft: 10 }}
              placeholder="Qty"
              onChange={e => {
                e ? this.setState({ qty: e }) : this.setState({ qty: 1 });
              }}
              value={this.state.qty}
            />
            <Button
              icon="plus"
              type="primary"
              shape="circle"
              size="small"
              style={{ marginLeft: 10, marginTop: 5 }}
              onClick={this.handleAdd}
            />
          </div>
          <ApnaDivider text={"Goods"} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Goods Type :
              </span>
            </Col>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("gType", {})(
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="select Googs Type (Optional)"
                  >
                    {goodsType
                      ? goodsType.map((val, ind) => {
                          return (
                            <Option key={val._id} value={val._id}>
                              {val.name}
                            </Option>
                          );
                        })
                      : ""}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Weight :
              </span>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={6}>
                  <Form.Item>
                    {getFieldDecorator("gWeightType", {
                      initialValue: "Kg"
                    })(
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Weight Type"
                      >
                        <Option key={1} value={"Kg"}>
                          Kg
                        </Option>
                        <Option key={2} value={"Ton"}>
                          Ton
                        </Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item>
                    {getFieldDecorator("gWeight", {})(
                      <InputNumber
                        style={{
                          width: "100%",
                          marginTop: 1,
                          marginRight: 10
                        }}
                        placeholder="Enter Weight (optional)"
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Details :
              </span>
            </Col>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("detail", {})(
                  <Input
                    style={{ width: "100%", marginRight: 10 }}
                    placeholder="write other relevent/important Information (optional)"
                    type="text"
                  />
                )}
              </Form.Item>
            </Col>
          </div>
          <ApnaDivider text={"Location"} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Pick Up :
              </span>
            </Col>
            <Col span={18}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Item>
                  {getFieldDecorator("pickAddress", {
                    rules: [
                      {
                        required: true,
                        message: "Please Enter PickUp street"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: 250, marginRight: 10 }}
                      placeholder="Enter Street Address"
                      type="text"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("pickCity", {
                    rules: [
                      {
                        required: true,
                        message: "Please Enter PickUp City"
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{ width: 134, marginLeft: 10 }}
                      placeholder="Select City"
                    >
                      {childrenCities}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </Col>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Pick up Date :
              </span>
            </Col>
            <Col span={18}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Item>
                  {getFieldDecorator("pickDate", {
                    rules: [
                      {
                        required: true,
                        message: "Please Select PickUp Date"
                      }
                    ]
                  })(
                    <DatePicker
                      placeholder="Select Date"
                      style={{ width: 250, marginRight: 10 }}
                      format={["DD/MM/YYYY", "DD/MM/YY"]}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("pickTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please Select PickUp Time"
                      }
                    ]
                  })(
                    <TimePicker
                      placeholder="Select Time"
                      style={{ width: 134, marginLeft: 10 }}
                      format={"hh:mm:a"}
                    />
                  )}
                </Form.Item>
              </div>
            </Col>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Dropoff :
              </span>
            </Col>
            <Col span={18}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Form.Item>
                  {getFieldDecorator("dropAddress", {
                    rules: [
                      {
                        required: true,
                        message: "Please Enter Drop street"
                      }
                    ]
                  })(
                    <Input
                      style={{ width: 250, marginRight: 10 }}
                      placeholder="Enter Street Address"
                      type="text"
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("dropCity", {
                    rules: [
                      {
                        required: true,
                        message: "Please Enter Dropoff City"
                      }
                    ]
                  })(
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{ width: 134, marginLeft: 10 }}
                      placeholder="Select City"
                    >
                      {childrenCities}
                    </Select>
                  )}
                </Form.Item>
              </div>
            </Col>
          </div>
          <ApnaDivider text={"Additional Info"} />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Col span={6} style={{ paddingTop: 5 }}>
              <span style={{ fontSize: sizes.h3, color: textColor.text_dark }}>
                Description :
              </span>
            </Col>
            <Col span={18}>
              <Form.Item>
                {getFieldDecorator("additional", {})(
                  <TextArea
                    style={{ width: "100%", marginRight: 10 }}
                    placeholder="write other relevent/important Information (optional)"
                    type="text"
                  />
                )}
              </Form.Item>
            </Col>
          </div>
          <div>
            <div style={{ float: "left" }}>
              <Button
                type="default"
                style={{ marginRight: "20px" }}
                onClick={() => {
                  onChangeRequestModalVisible(false);
                }}
              >
                Back
              </Button>
            </div>
            <div style={{ float: "right" }}>
              <Button
                type="primary"
                ghost
                loading={loading}
                disabled={loading}
                style={{ marginRight: 5 }}
                onClick={this.handleSaveDraft}
              >
                {this.props.data ? "Update" : "Post"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    );
  };

  render() {
    const { requestModalVisible, onChangeRequestModalVisible } = this.props;

    return (
      <Modal
        title={null}
        footer={null}
        header={null}
        visible={requestModalVisible}
        onOk={() => {
          alert("OK");
        }}
        maskClosable={false}
        onCancel={() => {
          onChangeRequestModalVisible(false);
        }}
        width={900}
        bodyStyle={{ padding: 0, borderRadius: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="hideSideModal"
            style={{ height: 580, width: 400, backgroundColor: "#4fc18c" }}
          >
            <ModalCompoentLeftComtent
              mainHeading={"Add Market Trip Request"}
              extraText={"Enter the Details of Market Trip Request"}
              Image={Images.TRIP}
            />
          </div>
          <div
            style={{
              width: "100%",
              height: 580,
              overflowY: "scroll",
              paddingTop: 30,
              paddingBottom: 45,
              paddingLeft: 45,
              paddingRight: 45
            }}
          >
            {this.renderForm()}
          </div>
        </div>
      </Modal>
    );
  }
  componentDidMount() {
    const { data } = this.props;
    if (data) {
      let ArrayofVehicleRequests = [];
      let counter = 1;
      let gTypeArr = [];
      if (data.goodsTypesInformation) {
        data.goodsTypesInformation.map((val2, ind2) => {
          gTypeArr.push(val2._id);
        });
      }
      if (data.vehicleTypeInformation) {
        data.vehicleTypeInformation.map((val, ind) => {
          ArrayofVehicleRequests.push({
            key: counter,
            vehicle: val.category,
            vehicleType: val.title,
            vehicleTypeId: val.id,
            qty: val.count
          });
          counter = counter + 1;
        });
      }
      this.setState({ VehicleData: ArrayofVehicleRequests, count1: counter });
      this.props.form.setFields({
        // client: {
        //   value: data.type=='Local'? data.clientInformation._id ? data.clientInformation._id : "" : ""
        // },
        gType: {
          value: data.goodsTypesInformation ? gTypeArr : []
        },
        gWeight: {
          value: data.goodsInformation.weight.quantity
            ? data.goodsInformation.weight.quantity
            : ""
        },
        gWeightType: {
          value: data.goodsInformation.weight.unit
            ? data.goodsInformation.weight.unit
            : ""
        },
        detail: {
          value: data.goodsInformation.goodsDescription
            ? data.goodsInformation.goodsDescription
            : ""
        },
        pickAddress: {
          value: data.pickupLocation.street ? data.pickupLocation.street : ""
        },
        pickCity: {
          value: data.pickupLocation.city ? data.pickupLocation.city : ""
        },
        dropAddress: {
          value: data.dropoffLocation.street ? data.dropoffLocation.street : ""
        },
        dropCity: {
          value: data.dropoffLocation.city ? data.dropoffLocation.city : ""
        },
        additional: {
          value: data.vehicleRequestInformation.additionalDescription
            ? data.vehicleRequestInformation.additionalDescription
            : ""
        },
        pickDate: {
          value: data.pickupDate ? moment(data.pickupDate) : ""
        },
        pickTime: {
          value: data.pickupDate ? moment(data.pickupDate) : ""
        }
      });
    }
  }
}
const MarkeetRequestModal = Form.create()(RequestModalForm);
const mapStateToProps = ({ dashboard, global, signup }) => ({
  requestModalVisible: dashboard.requestModalVisible,
  vehicalCat: global.globalData.vehicleCategory,
  vehicleType: global.globalData.vehicleType,
  allDrivers: global.allDrivers,
  allBrokers: global.allBrokers,
  goodsType: global.globalData.goodsType,
  allClients: global.allClients,
  userInfo: signup.content,
  newTripRequest: dashboard.newTripRequest,
  tripRequestDetail: dashboard.tripRequestDetail,
  loading: dashboard.loading
});
const mapDispatchToProps = dispatch => ({
  onChangeRequestModalVisible: visible =>
    dispatch(Actions.ON_CHANGE_REQUEST_MODAL_VISIBLE(visible)),
  onTripRequestAdd: data => dispatch(Actions.onTripRequestAdd(data)),
  onTripRequestEdit: data => dispatch(Actions.onTripRequestEdit(data)),
  onTripAdd: data => dispatch(Actions.onTripAdd(data)),
  onGetLogData: data => dispatch(ActionsGlobal.onGetLogData(data)),
  onAllTripRequestInfoGet: data =>
    dispatch(ActionsGlobal.onAllTripRequestInfoGet(data)),
  onAddTripRequestPush: data =>
    dispatch(ActionsGlobal.ON_TRIP_REQUEST_ADDED_PUSH_TO_ALL(data)),
  onAddTripPush: data =>
    dispatch(ActionsGlobal.ON_TRIP_ADDED_PUSH_TO_ALL(data)),
  ON_TRIP_REQUEST_PUSH_TO_ARRAY: data =>
    dispatch(ActionsTrips.ON_TRIP_REQUEST_PUSH_TO_ARRAY(data)),
  onChangeFilterData: filter =>
    dispatch(ActionsGlobal.ON_CHANGE_FILTER_DATA(filter)),
  onChangeNavName: navName =>
    dispatch(ActionsGlobal.ON_CHANGE_NAV_NAME(navName)),
  onChangeDetailData: data =>
    dispatch(ActionsGlobal.ON_CHANGE_DETAIL_DATA(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkeetRequestModal);
