import React, { Component } from "react";
import { Upload, Icon, Modal, message } from "antd";
import * as ActionsGlobal from "../../modules/loggedin/sidebar/action/actionCreater";
import { connect } from "react-redux";

class UploadSingleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      loading: false
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
    formData.append("image", fileList[0].originFileObj);
    const hello = async () => {
      let response = await uploadSingleImageAction(formData);
      if (response.payload.data !== "") {
        this.state.fileList.length = 0;
        this.state.fileList.push({
          uid: 0,
          name: "profilePic.png",
          status: "done",
          url: response.payload.data.imageURL
        });
        this.setState({
          fileList: this.state.fileList,
          loading: false
        });
        this.props.getImageUrlFromChild(response.payload.data.imageURL);
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
        <div>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            onRemove={e => {
              this.props.getImageUrlFromChild(false);
              this.setState({ fileList: [] });
            }}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </div>
      </div>
    );
  }
  componentDidMount() {
    if (this.props.profile) {
      this.state.fileList.length = 0;
      this.state.fileList.push({
        uid: 0,
        name: "profilePic.png",
        status: "done",
        url: this.props.profile
      });
      this.setState({
        fileList: this.state.fileList,
        loading: false
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
)(UploadSingleImage);
