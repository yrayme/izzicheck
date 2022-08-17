import React from "react";
import PropTypes from "prop-types";

const BranchesIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className}>
     <defs>
      <clipPath id="a">
        <path
          data-name="Rect\xE1ngulo 279"
          style={{
            stroke: "#707070",
            fill: "currentColor",
          }}
          d="M0 0h21v21H0z"
        />
      </clipPath>
    </defs>
    <g
      data-name="Enmascarar grupo 151"
      style={{
        clipPath: "url(#a)",
      }}
    >
      <g data-name="Grupo 1254">
        <path
          data-name="Trazado 182"
          d="M18.818 3.808c-.01-.021-.01-.031-.021-.042l-.031-.094h-.01a1.045 1.045 0 0 0-.9-.524H3.168a1.036 1.036 0 0 0-.965.64L0 8.916h.021a2.622 2.622 0 1 0 5.245 0 2.622 2.622 0 1 0 5.245 0 2.622 2.622 0 1 0 5.245 0 2.622 2.622 0 1 0 5.245 0ZM3.168 2.1h14.685a1.049 1.049 0 0 0 0-2.1H3.168a1.049 1.049 0 0 0 0 2.1ZM16.8 16.783H4.217v-4.2h-2.1v7.347a1.052 1.052 0 0 0 1.049 1.049h14.687A1.052 1.052 0 0 0 18.9 19.93v-7.343h-2.1Z"
          style={{
            fillRule: "evenodd",
            fill: "currentColor",
          }}
          transform="translate(0 .011)"
        />
      </g>
    </g>
  </svg>
)

BranchesIcon.propTypes = {
    className: PropTypes.string,
};

BranchesIcon.defaultProps = {
    className: "",
};

export default BranchesIcon;