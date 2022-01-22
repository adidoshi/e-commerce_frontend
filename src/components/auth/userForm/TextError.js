import React from "react";
import "./UserForm.css";

const TextError = (props) => {
  return <div className="errorMsg">{props.children}</div>;
};

export default TextError;
