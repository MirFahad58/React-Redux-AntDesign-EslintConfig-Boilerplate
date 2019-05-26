import React from "react";
import RequestModal from "./requestModal/requestModal";
import PropTypes from "prop-types";
import DriverModal from "./driverModal/driverModal";
import MarkeetRequestModal from "./requestModal/markeetRequestModal";

const MainModal = props => {
  const { modalType } = props;
  if (modalType === "request") {
    return <RequestModal {...props} />;
  } else if (modalType === "markeet") {
    return <MarkeetRequestModal {...props} />;
  } else if (modalType === "driver") {
    return <DriverModal {...props} />;
  }
};
export default MainModal;
MainModal.propTypes = {
  modalType: PropTypes.string.isRequired
};
