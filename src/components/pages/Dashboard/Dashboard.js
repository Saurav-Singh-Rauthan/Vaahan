import React from "react";

import Styles from "./Dashboard.module.css";
import Countuptab from "../../DashboardUI/CountupTab/Countuptab";
import MileageChart from "../../DashboardUI/MileageChart/MileageChart";
import VehCondition from "../../DashboardUI/VehCondition/VehCondition";
import RadarMileage from "../../DashboardUI/RadarMileage/RadarMileage";

const Dashboard = (props) => {
  return (
    <React.Fragment>
      <div className={Styles.VehInfo}>
        <p>
          Greetings! {"   "}
          <span style={{ color: "#75c9b7" }}>Saurav Singh Rauthan</span>{" "}
        </p>
        <div>
          Vehicle : <span style={{ color: "#75c9b7" }}>Activa 4g</span>
        </div>
      </div>

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
          <div className={Styles.mileageCompDiv}>
            <MileageChart />
          </div>
          <div className={Styles.mileageCompDiv}>
            <VehCondition />
          </div>
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

      <div>
        <div className={Styles.MonthStats}>Previous Performance</div>
        <div className={Styles.mileageCompPrev}>
          <div className={Styles.mileageCompPrevDiv}>
            <RadarMileage />
          </div>
          <div className={Styles.mileageCompPrevDiv}>
            <MileageChart />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "2rem" }}>
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
