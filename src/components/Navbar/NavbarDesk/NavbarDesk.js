import React from "react";
import { NavLink } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import Styles from "./NavbarDesk.module.css";

const navbarDesk = (props) => {
  let links = (
    <React.Fragment>
      <NavLink
        className={({ isActive }) =>
          isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
        }
        to="/account"
      >
        <AccountCircleIcon />
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
        }
        to="/help"
      >
        <HelpIcon />
      </NavLink>
    </React.Fragment>
  );

  // if (!props.isAuthenticated) {
  // links = (
  //   <NavLink
  //     className={({ isActive }) =>
  //       isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
  //     }
  //     to="/auth"
  //   >
  //     Login / Register
  //   </NavLink>
  // );
  // }

  return (
    <React.Fragment>
      <div className={Styles.links}>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/"
        >
          HOME
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/dashboard"
        >
          DASHBOARD
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? [Styles.active, Styles.link].join(" ") : Styles.link
          }
          to="/fuel-prices"
        >
          FUEL PRICES
        </NavLink>
      </div>

      <div className={Styles.links}>{links}</div>
    </React.Fragment>
  );
};

export default navbarDesk;
