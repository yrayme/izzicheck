import React from "react";
import PropTypes from "prop-types";

const FaqIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M0 10a10 10 0 1 1 10 10A10.011 10.011 0 0 1 0 10Zm2 0a8 8 0 1 0 8-8 8.01 8.01 0 0 0-8 8Zm7 4.98v-6a1 1 0 0 1 2 0v6a1 1 0 1 1-2 0Zm0-9.929a1 1 0 1 1 1 1 1 1 0 0 1-1-1Z"
      style={{
        fill: "currentColor",
      }}
      data-name="Grupo 1277"
    />
  </svg>
)

FaqIcon.propTypes = {
    className: PropTypes.string,
};

FaqIcon.defaultProps = {
    className: "",
};

export default FaqIcon;