import React from "react";

import Styles from "./VehCondition.module.css";
import check from "../../../assests/check.gif";
import wrong from "../../../assests/wrong.gif";

const VehCondition = (props) => {
  let condition = "bad";
  let msg = "";

  if (condition === "good") {
    msg = "Vehicle is in perfect condition";
  } else {
    msg = "Vehicle needs maintainence!!";
  }

  return (
    <div className={Styles.container}>
      {condition === "good" ? (
        <img className={Styles.img} src={check} alt="" />
      ) : (
        <img className={Styles.img} src={wrong} alt="" />
      )}
      <p
        style={{
          fontSize: 18,
          color: condition === "good" ? "#75c9b7" : "red",
        }}
      >
        {msg}
      </p>
    </div>
  );
};

export default VehCondition;
