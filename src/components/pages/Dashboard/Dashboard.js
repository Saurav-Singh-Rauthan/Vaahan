import React from "react";

import Styles from "./Dashboard.module.css";
import Countuptab from "../../DashboardUI/CountupTab/Countuptab";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <div>
        <div className={Styles.MonthStats}>Monthly Stats</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" />
          <Countuptab type="mileage" />
          <Countuptab type="dist" />
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Relative Performance</div>
        <div className={Styles.mileageComp}>
          <div></div>
          <div></div>
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Last Trip</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" />
          <Countuptab type="mileage" />
          <Countuptab type="dist" />
        </div>
      </div>

      <div style={{marginBottom: "2rem"}}>
        <div className={Styles.MonthStats}>Last Month</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" />
          <Countuptab type="mileage" />
          <Countuptab type="dist" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
