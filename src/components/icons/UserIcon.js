import React from "react";
import PropTypes from "prop-types";

const UserIcon = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <clipPath id="a">
        <path
          data-name="Rect\xE1ngulo 280"
          style={{
            stroke: "#707070",
            fill: "currentColor",
          }}
          d="M0 0h21v21H0z"
        />
      </clipPath>
    </defs>
    <g
      data-name="Enmascarar grupo 152"
      style={{
        clipPath: "url(#a)",
      }}
    >
      <g data-name="Grupo 1255">
        <path
          data-name="Trazado 183"
          d="M20.59 18.805c-.6-1.386-3.517-2.3-5.45-3.16s-1.67-1.375-1.743-2.089c-.01-.094-.01-.2-.021-.3a5.969 5.969 0 0 0 1.564-2.331.438.438 0 0 0 .021-.063c.073-.2.136-.41.2-.63a1.238 1.238 0 0 0 .8-1.029 2.058 2.058 0 0 0 .263-1.134 1.169 1.169 0 0 0-.62-1.082v-.12a16.6 16.6 0 0 0-.231-2.814 4.5 4.5 0 0 0-.147-.651A4.778 4.778 0 0 0 13.545.966a5.249 5.249 0 0 0-6.069 0A4.778 4.778 0 0 0 5.8 3.4a4.5 4.5 0 0 0-.147.651 17.749 17.749 0 0 0-.231 2.814v.105c-.3.115-.578.42-.641 1.092A2.058 2.058 0 0 0 5.04 9.2c.105.462.367.955.829 1.029a5.526 5.526 0 0 0 .2.63c0 .011.011.031.011.042l.01.021a5.782 5.782 0 0 0 1.6 2.363 2.217 2.217 0 0 1-.021.273c-.074.714.136 1.229-1.806 2.089S1.008 17.419.409 18.805A3.5 3.5 0 0 0 .052 21h20.895a3.5 3.5 0 0 0-.357-2.195Z"
          style={{
            fillRule: "evenodd",
            fill: "currentColor",
          }}
        />
      </g>
    </g>
  </svg>
)

UserIcon.propTypes = {
    className: PropTypes.string,
};

UserIcon.defaultProps = {
    className: "",
};

export default UserIcon;