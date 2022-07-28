import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Speedial = (props) => {
  const actions = [
    { icon: <HomeIcon />, name: "Home", link: "/" },
    { icon: <DashboardIcon />, name: "Dashboard", link: "/dashboard" },
    { icon: <SpeedDialIcon />, name: "Add Record", link: "/add-record" },
    { icon: <LocalGasStationIcon />, name: "Prices", link: "/fuel-prices" },
    {
      icon: <AccountCircleIcon />,
      name: "Account",
      link: props.isAuthenticated ? "/account" : "/auth",
    },
  ];

  let navigate = useNavigate();
  const [open, setopen] = useState(false);

  const actionHandler = (link) => {
    setopen(false);
    navigate(link);
  };

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{
        position: "fixed",
        bottom: 70,
        right: 32,
        zIndex: 102,
      }}
      icon={<SpeedDialIcon />}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => actionHandler(action.link)}
        />
      ))}
    </SpeedDial>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Speedial);
