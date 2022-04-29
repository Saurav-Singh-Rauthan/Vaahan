import React from "react";

import Styles from "./Fuelprice.module.css";
import CountUp from "react-countup";

const Fuelprice = (props) => {
  return (
    <div className={Styles.container}>
      <p>
        Fuel Prices for <span className={Styles.textOG}>{props.district}</span>{" "}
        , <span className={Styles.textOG}>{props.state}</span> is
      </p>
      <div className={Styles.priceContainer}>
        <div className={Styles.price} style={{ color: "green" }}>
          <CountUp
            start={0}
            end={props.price.petrol}
            duration={1.3}
            decimals={2}
            decimal="."
            className={Styles.priceVal}
            prefix="₹"
          />
          <p>Petrol</p>
        </div>
        <div className={Styles.price} style={{ color: "blue" }}>
          <CountUp
            start={0}
            end={props.price.diesel}
            duration={1}
            decimals={2}
            decimal="."
            className={Styles.priceVal}
            prefix="₹"
          />
          <p>Diesel</p>
        </div>
      </div>
    </div>
  );
};

export default Fuelprice;
