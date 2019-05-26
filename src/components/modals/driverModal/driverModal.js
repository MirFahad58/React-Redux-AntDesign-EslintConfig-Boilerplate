import React, { Component } from "react";
import {
  Modal,
  Col,
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  message
} from "antd";
import { connect } from "react-redux";
import * as Actions from "../../../modules/loggedin/driverManagement/action/actionCreater";
import * as ActionsGlobal from "../../../modules/loggedin/sidebar/action/actionCreater";
import * as ActionsDetail from "../../../modules/loggedin/detail/action/actionCreater";

import ModalCompoentLeftComtent from "../../modalComponentLeftContent/modalComponentLeftViewContent";
import { Images } from "../../../public/asset/index";
import { sizes, textColor } from "../../../constants/constants";
import ApnaDivider from "../../apnaDivider/apnaDivider";
import moment from "moment";
import cities from "../../../constants/jsons/cities.json";
import UploadSingleImage from "../../uploadImage/uploadImageSingle";
import UploadImageMultiple from "../../uploadImage/uploadImageMultiple";
const Option = Select.Option;
const childrenCities = [];
childrenCities.length = 0;
if (cities["Pakistan"] === undefined) {
} else {
  cities["Pakistan"].forEach(element => {
    childrenCities.push(<Option key={element}>{element}</Option>);
  });
}
class DriverModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: false,
      multiUrl1: [],
      picArra: [
        "https://elasticbeanstalk-us-east-1-435177095658.s3.amazonaws.com/fda135e0-6e5f-11e9-9a6e-93292be1f397",
        "https://elasticbeanstalk-us-east-1-435177095658.s3.amazonaws.com/0055f5a0-6e60-11e9-9a6e-93292be1f397",
        "https://elasticbeanstalk-us-east-1-435177095658.s3.amazonaws.com/02552100-6e60-11e9-9a6e-93292be1f397",
        "https://elasticbeanstalk-us-east-1-435177095658.s3.amazonaws.com/04725bb0-6e60-11e9-9a6e-93292be1f397"
      ]
    };
  }
  getImageUrlFromChild = imageUrl => {
    if (imageUrl === false) {
      this.setState({ profilePic: false });
    } else {
      this.setState({ profilePic: imageUrl });
    }
  };

  getMultiImageUrlFromChild1 = urls => {
    this.setState({ multiUrl1: urls });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          onDriverAddRequest,
          userInfo,
          onChangeDriverModalVisible,
          onAddDriversPush,
          onGetLogData,
          onDriverEditRequest,
          onAllDriversInfoGet,
          onChangeNavName,
          onAllVehiclesInfoGet,
          onGetDetailDriverData
        } = this.props;
        if (
          moment(values.DOIssue).toDate() > moment(values.DOExpiry).toDate()
        ) {
          message.info("Issue Date Should Be Greater Than Expiry Date");
        } else if (userInfo !== "") {
          const data = {
            name: values.fullName, // this field is required and should be between 3 to 50 character long
            email: null, // this field is optional and should be email
            phoneNumber: "+92" + values.mobileNumber, // this field is required and should be phone number
            profilePicture: this.state.profilePic
              ? this.state.profilePic
              : this.state.picArra[Math.floor(Math.random() * Math.floor(3))], //this field is optional and should be valid url
            documentPictures:
              this.state.multiUrl1.length !== 0 ? this.state.multiUrl1 : null, // this field is optional and should be array
            address: {
              street: values.streetAddress ? values.streetAddress : null,
              city: values.city ? values.city : null
            }, // this field is object and is optional
            licence: {
              number: values.licenseNumber ? values.licenseNumber : null,
              dateOfIssue: values.DOIssue
                ? moment(values.DOIssue).toISOString()
                : null,
              dateOfExpiry: values.DOExpiry
                ? moment(values.DOExpiry).toISOString()
                : null
            }, //this field is optional and should be string
            cnicNo: values.cnic ? values.cnic : null, //this field is required and should be string
            accountCreatedDate: moment().toISOString(), //this field is required and should be iso date,
            currentAssignVehicle: values.selctVehicle
              ? values.selctVehicle
              : null, // this field is optional and should be mongosoe id
            userId: userInfo.user._id // this field is required and should be mongoose id
          };
          const data2 = {
            driverId: this.props.data ? this.props.data._id : "",
            name: values.fullName, // this field is required and should be between 3 to 50 character long
            email: null, // this field is optional and should be email
            phoneNumber: "+92" + values.mobileNumber, // this field is required and should be phone number
            profilePicture: this.state.profilePic
              ? this.state.profilePic
              : this.state.picArra[Math.floor(Math.random() * Math.floor(3))], //this field is optional and should be valid url
            documentPictures:
              this.state.multiUrl1.length !== 0 ? this.state.multiUrl1 : null, // this field is optional and should be array
            address: {
              street: values.streetAddress ? values.streetAddress : null,
              city: values.city ? values.city : null
            }, // this field is object and is optional
            licence: {
              number: values.licenseNumber ? values.licenseNumber : null,
              dateOfIssue: values.DOIssue
                ? moment(values.DOIssue).toISOString()
                : null,
              dateOfExpiry: values.DOExpiry
                ? moment(values.DOExpiry).toISOString()
                : null
            }, //this field is optional and should be string
            cnicNo: values.cnic ? values.cnic : null, //this field is required and should be string
            currentAssignVehicle: values.selctVehicle
              ? values.selctVehicle
              : null, // this field is optional and should be mongosoe id
            userId: userInfo.user._id // this field is required and should be mongoose id
          };
          if (this.props.data) {
            const hello = async () => {
              let response = await onDriverEditRequest(data2);
              if (response.payload.data !== "") {
                onChangeDriverModalVisible(false);
                message.success("Driver Updated");
                onChangeNavName({
                  first: "Drivers",
                  second: values.fullName
                });
                onAllDriversInfoGet({ id: userInfo.user._id });
                onAllVehiclesInfoGet({ id: userInfo.user._id });
                onGetDetailDriverData({
                  id: this.props.data._id,
                  userId: userInfo.user._id
                });
              }
            };
            hello();
          } else {
            const hello = async () => {
              let response = await onDriverAddRequest(data);
              if (response.payload.data !== "") {
                onChangeDriverModalVisible(false);
                onAllVehiclesInfoGet({ id: userInfo.user._id });
                onAddDriversPush(response.payload.data);
                onGetLogData({ id: userInfo.user._id });
                message.success("Driver Added");
              }
            };
            hello();
          }
        }
      }
    });
  };
  render() {
    const {
      driverModalVisible,
      onChangeDriverModalVisible,
      loading,
      allVehicles
    } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={null}
        footer={null}
        header={null}
        visible={driverModalVisible}
        onOk={() => {
          alert("OK");
        }}
        maskClosable={false}
        onCancel={() => {
          onChangeDriverModalVisible(false);
        }}
        width={900}
        bodyStyle={{ padding: 0, borderRadius: 0 }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="hideSideModal"
            style={{ height: 580, width: 400, backgroundColor: "#22A7F0" }}
          >
            <ModalCompoentLeftComtent
              mainHeading={"Add Driver"}
              extraText={"Add Driver Details"}
              Image={Images.DRIVER_LOGO}
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
            <Form onSubmit={this.handleSubmit} spellCheck={true}>
              <ApnaDivider text={"Personal Information"} />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "70%"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Col span={9} style={{ paddingTop: 5 }}>
                      <span
                        style={{
                          fontSize: sizes.h3,
                          color: textColor.text_dark
                        }}
                      >
                        * Name :
                      </span>
                    </Col>
                    <Col span={15}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Form.Item hasFeedback>
                          {getFieldDecorator("fullName", {
                            rules: [
                              {
                                required: true,
                                message: "Please Enter Name (min:3)",
                                min: 3,
                                max: 50
                              }
                            ]
                          })(
                            <Input
                              style={{
                                width: 230,
                                paddingRight: 10,
                                marginLeft: -8
                              }}
                              placeholder="Enter Full Name"
                              type="text"
                            />
                          )}
                        </Form.Item>
                      </div>
                    </Col>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Col span={9} style={{ paddingTop: 5 }}>
                      <span
                        style={{
                          fontSize: sizes.h3,
                          color: textColor.text_dark
                        }}
                      >
                        * Mobile :
                      </span>
                    </Col>
                    <Col span={15}>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Col span={5}>
                          <Input
                            style={{
                              borderRadius: 0,
                              marginLeft: -8,
                              marginTop: 3.5
                            }}
                            defaultValue="+92"
                            disabled
                          />
                        </Col>
                        <Col span={15}>
                          <Form.Item hasFeedback>
                            {getFieldDecorator("mobileNumber", {
                              rules: [
                                {
                                  required: true,
                                  message: "Please Enter Mobile No",
                                  min: 10,
                                  max: 10
                                }
                              ]
                            })(
                              <Input
                                pattern="^()-{0,1}3{1}\d{2}-{0,1}\d{7}$|^0{0,1}3{1}\d{10}$|^0{0,1}3{1}\d{2}-\d{7}$"
                                style={{
                                  width: 180,
                                  marginLeft: -8
                                }}
                                placeholder="Enter Mobile No"
                                type="text"
                              />
                            )}
                          </Form.Item>
                        </Col>
                      </div>
                    </Col>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    paddingLeft: 40
                  }}
                >
                  <UploadSingleImage
                    getImageUrlFromChild={this.getImageUrlFromChild}
                    profile={this.state.profilePic}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    * Address :
                  </span>
                </Col>
                <Col span={18}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Form.Item>
                      {getFieldDecorator("streetAddress", {})(
                        <Input
                          style={{ width: 230, marginRight: 10 }}
                          placeholder="Enter Street Address"
                          type="text"
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("city", {})(
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          style={{ width: 154, marginLeft: 10 }}
                          placeholder="Select City"
                        >
                          {childrenCities}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </Col>
              </div>
              <ApnaDivider text={"Documents"} />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    CNIC Number :
                  </span>
                </Col>
                <Col span={18}>
                  <Form.Item hasFeedback>
                    {getFieldDecorator("cnic", {
                      rules: [
                        {
                          min: 13,
                          max: 13
                        }
                      ]
                    })(
                      <Input
                        style={{ width: "100%" }}
                        placeholder="Enter CNIC Number (Optional) i.e 4410377409332"
                        type="number"
                      />
                    )}
                  </Form.Item>
                </Col>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    License Number :
                  </span>
                </Col>
                <Col span={18}>
                  <Form.Item>
                    {getFieldDecorator("licenseNumber", {})(
                      <Input
                        style={{ width: "100%", marginRight: 10 }}
                        placeholder="Enter License Number (Optional)"
                        type="text"
                      />
                    )}
                  </Form.Item>
                </Col>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    * License Info :
                  </span>
                </Col>
                <Col span={18}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Form.Item>
                      {getFieldDecorator("DOIssue", {})(
                        <DatePicker
                          placeholder="Date of Issue"
                          style={{ width: 190, marginRight: 10 }}
                          format={["DD/MM/YYYY", "DD/MM/YY"]}
                        />
                      )}
                    </Form.Item>
                    <Form.Item>
                      {getFieldDecorator("DOExpiry", {})(
                        <DatePicker
                          placeholder="Date of Expiry"
                          style={{ width: 190, marginRight: 10 }}
                          format={["DD/MM/YYYY", "DD/MM/YY"]}
                        />
                      )}
                    </Form.Item>
                  </div>
                </Col>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    Document :
                  </span>
                </Col>
                <Col span={18}>
                  <UploadImageMultiple
                    getMultiImageUrlFromChild={this.getMultiImageUrlFromChild1}
                    picsArray={this.state.multiUrl1}
                  />
                </Col>
              </div>
              <ApnaDivider text={"Chose Vehicle"} />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={6} style={{ paddingTop: 5 }}>
                  <span
                    style={{ fontSize: sizes.h3, color: textColor.text_dark }}
                  >
                    Assign Vehicle :
                  </span>
                </Col>
                <Col span={18}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Form.Item>
                      {getFieldDecorator("selctVehicle", {})(
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          style={{ width: 200, paddingRight: 10 }}
                          placeholder="Select a Vehicle"
                        >
                          <Option key={1} value={null}>
                            none
                          </Option>
                          {allVehicles.map((val, key) => {
                            return (
                              <Option key={key + 1} value={val._id}>
                                {val.plateNo}
                              </Option>
                            );
                          })}
                        </Select>
                      )}
                    </Form.Item>
                    <span
                      style={{
                        marginLeft: 20,
                        paddingTop: 5,
                        color: textColor.text_light
                      }}
                    >
                      You can always Assign later
                    </span>
                  </div>
                </Col>
              </div>
              <div>
                <div style={{ float: "right" }}>
                  <Button
                    type="default"
                    style={{ marginRight: "20px" }}
                    onClick={() => {
                      onChangeDriverModalVisible(false);
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    );
  }
  componentDidMount() {
    const { data } = this.props;
    if (data) {
      if (
        data.documentPictures !== null &&
        data.documentPictures !== undefined
      ) {
        let vPics = [];
        data.documentPictures.map((val, ind) => {
          vPics.push(val);
        });
        this.setState({ multiUrl1: vPics });
      }
      this.setState({ profilePic: data.profilePicture });
      this.props.form.setFields({
        fullName: {
          value: this.props.data.name ? this.props.data.name : ""
        },
        mobileNumber: {
          value: this.props.data.phoneNumber
            ? this.props.data.phoneNumber.substring(3)
            : ""
        },
        streetAddress: {
          value: this.props.data.address ? this.props.data.address.street : ""
        },
        city: {
          value: this.props.data.address ? this.props.data.address.city : ""
        },
        cnic: {
          value: this.props.data.cnicNo ? this.props.data.cnicNo : ""
        },
        licenseNumber: {
          value: this.props.data.licence ? this.props.data.licence.number : ""
        },
        DOIssue: {
          value: this.props.data.licence
            ? moment(this.props.data.licence.dateOfIssue)
            : ""
        },
        DOExpiry: {
          value: this.props.data.licence
            ? moment(this.props.data.licence.dateOfExpiry)
            : ""
        },
        selctVehicle: {
          value: this.props.data.vehicleInformation
            ? this.props.data.vehicleInformation._id
            : null
        }
      });
    }
  }
}
const DriverModal = Form.create()(DriverModalForm);

const mapStateToProps = ({ drivers, signup, global }) => ({
  driverModalVisible: drivers.driverModalVisible,
  userInfo: signup.content,
  loading: drivers.loading,
  allVehicles: global.allVehicles
});
const mapDispatchToProps = dispatch => ({
  onChangeDriverModalVisible: visible =>
    dispatch(Actions.ON_CHANGE_DRIVER_MODAL_VISIBLE(visible)),
  onDriverAddRequest: data => dispatch(Actions.onDriverAddRequest(data)),
  onAddDriversPush: data =>
    dispatch(ActionsGlobal.ON_DRIVER_ADDED_PUSH_TO_ALL(data)),
  onGetLogData: data => dispatch(ActionsGlobal.onGetLogData(data)),

  onDriverEditRequest: data => dispatch(Actions.onDriverEditRequest(data)),
  onAllDriversInfoGet: data =>
    dispatch(ActionsGlobal.onAllDriversInfoGet(data)),
  onAllVehiclesInfoGet: data =>
    dispatch(ActionsGlobal.onAllVehiclesInfoGet(data)),
  onChangeNavName: navName =>
    dispatch(ActionsGlobal.ON_CHANGE_NAV_NAME(navName)),
  onGetDetailDriverData: data =>
    dispatch(ActionsDetail.onGetDetailDriverData(data))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DriverModal);
