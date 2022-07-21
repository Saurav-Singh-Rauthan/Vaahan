import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import NavbarDesk from "./NavbarDesk/NavbarDesk";
import NavbarMob from "./NavbarMob/NavbarMob";

import Styles from "./Navbar.module.css";

const navbar = (props) => {
  return (
    <div className={Styles.navbar}>
      <div className={Styles.logo}>
        <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
          Vaahan
        </NavLink>
      </div>
      <NavbarDesk isAuthenticated={props.isAuthenticated} />
      <NavbarMob isAuthenticated={props.isAuthenticated} />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(navbar);
