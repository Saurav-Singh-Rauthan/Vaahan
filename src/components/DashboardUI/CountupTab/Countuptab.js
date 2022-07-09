import React from "react";

import Styles from "./Countuptab.module.css";
import CountUp from "react-countup";
import PaidIcon from "@mui/icons-material/Paid";
import SpeedIcon from "@mui/icons-material/Speed";
import StraightenIcon from "@mui/icons-material/Straighten";

const Countuptab = (props) => {
  let pref = "";
  let suff = "";
  let icon = null;
  let text = "";

  if (props.type === "mileage") {
    suff = " Kmpl";
    icon = <SpeedIcon sx={{ height: 48, width: 48, color: "orange" }} />;
    text = "Mileage";
  } else if (props.type === "dist") {
    suff = " Kms";
    icon = (
      <StraightenIcon
        sx={{ height: 48, width: 48, color: "rgb(22, 18, 63)" }}
      />
    );
    text = "Distance Covered";
  } else {
    pref = "₹ ";
    icon = (
      <PaidIcon sx={{ height: 48, width: 48, color: "rgb(117, 201, 183)" }} />
    );
    text = "Money Spent";
  }

  return (
    <div className={Styles.container}>
      <div className={Styles.iconCont}>{icon}</div>
      <div className={Styles.content}>
        <div className={Styles.value}>
          <CountUp
            start={0}
            duration={1}
            end={500}
            prefix={pref}
            suffix={suff}
          />
        </div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Countuptab;
