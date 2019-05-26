import React from "react";
import { Divider } from "antd";
import PropTypes from "prop-types";
import { textColor, sizes } from "../../constants/constants";

const ApnaDivider = props => {
  const { text } = props;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontSize: sizes.h4,
          color: textColor.text_light,
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: 130,
          height: "1.55em",
          whiteSpace: "nowrap"
        }}
      >
        {text}
      </span>
      <Divider style={{ marginTop: 8, paddingBottom: 0 }} />
    </div>
  );
};
export default ApnaDivider;
ApnaDivider.propTypes = {
  text: PropTypes.string
};
ApnaDivider.defaultProps = {
  text: ""
};
