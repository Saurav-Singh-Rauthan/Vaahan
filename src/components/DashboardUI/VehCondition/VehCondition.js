import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import Styles from "./VehCondition.module.css";
import check from "../../../assests/check.gif";
import wrong from "../../../assests/wrong.gif";

const VehCondition = (props) => {
  let condition = "good";
  let msg = "";
  const [loadState, setloadState] = useState(0);

  const loadComplete = () => {
    setloadState(1);
  };

  const goodCon = (
    <img
      className={Styles.img}
      src={check}
      alt="good condition"
      onLoad={loadComplete}
      style={{
        textAlign: "center",
        display: loadState === 1 ? "inline-block" : "none",
      }}
    />
  );
  const badCon = (
    <img
      className={Styles.img}
      src={wrong}
      alt="bad condition"
      onLoad={loadComplete}
      style={{
        display: loadState === 1 ? "inline-block" : "none",
      }}
    />
  );
  
  if (Math.abs(props.last - props.current) >= 10) {
    condition = "bad";
  }

  if (condition === "good") {
    msg = "Vehicle is in perfect condition";
  } else {
    msg = "Vehicle needs maintainence!!";
  }

  return (
    <div className={Styles.container}>
      {condition === "good" ? goodCon : badCon}
      {loadState === 1 ? null : (
        <Skeleton variant="rectangular" width="100%" height={"100%"} />
      )}
      <p
        style={{
          fontSize: 18,
          color: condition === "good" ? "#75c9b7" : "red",
        }}
      >
        {loadState === 1 ? msg : null}
      </p>
    </div>
  );
};

export default VehCondition;
