import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import Styles from "./Cover.module.css";

const Cover = (props) => {
  return (
    <div
      className={Styles.container}
      style={{ display: !props.isAuthenticated === true ? "block" : "none" }}
    >
      <div className={Styles.remCov}>
        <NavLink to="/auth">Sign In / Sign Up</NavLink>
        <p>to use the feature </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Cover);
