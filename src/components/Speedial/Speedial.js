import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

const actions = [
  { icon: <SpeedDialIcon />, name: "Add Record", link: "/add-record" },
  { icon: <AccountCircleIcon />, name: "User", link: "/account" },
  { icon: <LocalGasStationIcon />, name: "Prices", link: "/fuel-prices" },
];

const Speedial = (props) => {
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

export default Speedial;
