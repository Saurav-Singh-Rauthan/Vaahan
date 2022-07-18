import React from "react";
import { Link } from "react-router-dom";

import Styles from "./Cover.module.css";

const Cover = (props) => {
  return (
    <div
      className={Styles.container}
      style={{ display: props.showCover === true ? "block" : "none" }}
    >
      <div className={Styles.remCov}>
        <Link to="auth">Sign In / Sign Up</Link>
        <p>to use the feature </p>
      </div>
    </div>
  );
};

export default Cover;
