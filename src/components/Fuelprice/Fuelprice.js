import React from "react";

import Styles from "./Fuelprice.module.css";
import CountUp from "react-countup";
import Skeleton from "@mui/material/Skeleton";

const Fuelprice = (props) => {
  return (
    <div className={Styles.container}>
      <p>
        Fuel Prices for <span className={Styles.textOG}>{props.district}</span>{" "}
        , <span className={Styles.textOG}>{props.state}</span> is
      </p>
      {props.price ? (
        <div className={Styles.priceContainer}>
          <div className={Styles.price} style={{ color: "green" }}>
            <CountUp
              start={0}
              end={props.price?.petrol}
              duration={1}
              decimals={2}
              delay={0.3}
              decimal="."
              className={Styles.priceVal}
              prefix="₹"
            />
            <p>Petrol</p>
          </div>
          <div className={Styles.price} style={{ color: "blue" }}>
            <CountUp
              start={0}
              end={props.price?.diesel}
              duration={1}
              decimals={2}
              delay={0.3}
              decimal="."
              className={Styles.priceVal}
              prefix="₹"
            />
            <p>Diesel</p>
          </div>
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={
            window.outerWidth > 768
              ? { margin: "4rem auto", height: "200px", width: "60%" }
              : { margin: "4rem auto", height: "155px", width: "90%" }
          }
        />
      )}
    </div>
  );
};

export default Fuelprice;
