import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Styles from "./NavbarMob.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavbarMob = (props) => {
  const [drawerState, setdrawerState] = useState(Styles.close);

  const openDrawerHandler = () => {
    setdrawerState(Styles.open);
  };

  const closeDrawerHandler = () => {
    setdrawerState(Styles.close);
  };

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
    <div className={Styles.container}>
      <div className={Styles.hamburger}>
        <MenuIcon onClick={openDrawerHandler} />
      </div>
      <div
        onClick={closeDrawerHandler}
        className={[Styles.NavModal, drawerState].join(" ")}
      >
        <div className={Styles.logoSec}>
          <div className={Styles.logo}>
            <NavLink style={{ color: "white", textDecoration: "none" }} to="/">
              Vaahan
            </NavLink>
          </div>
          <CloseIcon onClick={closeDrawerHandler} />
        </div>

        {/* Icons */}
        <div className={Styles.links}>{links}</div>

        <div className={Styles.linksVert}>
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
      </div>
    </div>
  );
};

export default NavbarMob;
