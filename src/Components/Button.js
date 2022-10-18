import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
const Button = ({ color, text, icon, onClick }) => {
  return (
    <button
      className="btn"
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {icon && (
        <FontAwesomeIcon
          color="white"
          icon={icon === "edit" ? faPen : faXmarkCircle}
        ></FontAwesomeIcon>
      )}
      {text}
    </button>
  );
};

Button.defaultProps = {
  color: "green",
};
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  onclick: PropTypes.func,
};

export default Button;
