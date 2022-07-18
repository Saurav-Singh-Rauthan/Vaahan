import React from "react";
import { NavLink } from "react-router-dom";

import Styles from "./Cover.module.css";

const Cover = (props) => {
  return (
    <div
      className={Styles.container}
      style={{ display: props.showCover === true ? "block" : "none" }}
    >
      <div className={Styles.remCov}>
        <NavLink to="/auth">Sign In / Sign Up</NavLink>
        <p>to use the feature </p>
      </div>
    </div>
  );
};

export default Cover;
