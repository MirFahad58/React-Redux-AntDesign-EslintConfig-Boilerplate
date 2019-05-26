import React, { Component } from "react";
import { Upload, Icon, Modal, message } from "antd";
import * as ActionsGlobal from "../../modules/loggedin/sidebar/action/actionCreater";
import { connect } from "react-redux";

class UploadImageMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      loading: false,
      counter: 0
    };
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList, file }) => {
    const { uploadSingleImageAction } = this.props;
    this.setState({ loading: true });
    // EXAMPLE: post form-data with 'axios'
    const formData = new FormData();
    formData.append("image", fileList[this.state.counter].originFileObj);
    const hello = async () => {
      let response = await uploadSingleImageAction(formData);
      if (response.payload.data !== "") {
        this.state.fileList.push({
          uid: this.state.counter,
          name: "profilePic.png",
          status: "done",
          url: response.payload.data.imageURL
        });
        this.state.counter = this.state.counter + 1;
        this.setState({
          fileList: this.state.fileList,
          loading: false,
          counter: this.state.counter
        });
        let MURL = [];
        this.state.fileList.map((val, ind) => {
          MURL.push(val.url);
        });
        this.props.getMultiImageUrlFromChild(MURL);
        message.success("uploaded");
      }
    };
    hello();
  };

  render() {
    const { previewVisible, previewImage, fileList, loading } = this.state;
    const uploadButton = (
      <div>
        {!loading ? (
          <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </div>
        ) : (
          <div>
            <Icon type="loading" />
          </div>
        )}
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={val => this.handleChange(val)}
          onRemove={e => {
            // this.props.getImageUrlFromChild(false)
            this.state.counter = this.state.counter - 1;
            this.setState({
              fileList: this.state.fileList.filter(val => val.uid !== e.uid),
              counter: this.state.counter
            });
            let MURL = [];
            this.state.fileList.map((val, ind) => {
              MURL.push(val.url);
            });
            this.props.getMultiImageUrlFromChild(MURL);
          }}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.picsArray.length !== 0) {
      let c = 0;
      this.state.fileList.length = 0;
      this.props.picsArray.map((val, ind) => {
        this.state.fileList.push({
          uid: ind,
          name: "profilePic.png",
          status: "done",
          url: val
        });
        c = ind;
      });
      this.setState({
        fileList: this.state.fileList,
        loading: false,
        counter: c + 1
      });
    }
  }
}
const mapStateToProps = ({ global }) => ({
  allVehicles: global.allVehicles
});
const mapDispatchToProps = dispatch => ({
  uploadSingleImageAction: navName =>
    dispatch(ActionsGlobal.uploadSingleImageAction(navName))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadImageMultiple);
