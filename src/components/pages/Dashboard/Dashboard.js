import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Styles from "./Dashboard.module.css";
import Countuptab from "../../DashboardUI/CountupTab/Countuptab";
import MileageChart from "../../DashboardUI/MileageChart/MileageChart";
import VehCondition from "../../DashboardUI/VehCondition/VehCondition";
import RadarMileage from "../../DashboardUI/RadarMileage/RadarMileage";
import Cover from "../../Cover/Cover";

const Dashboard = (props) => {
  const vehicles = ["Activa 4g", "TVS Victor GL", "R15 v4"];

  return (
    <React.Fragment>
      <Cover />
      <div className={Styles.VehInfo}>
        <p>
          Greetings! {"   "}
          <span style={{ color: "#75c9b7" }}>Saurav Singh Rauthan</span>{" "}
        </p>
        <div className={Styles.selectCont}>
          <FormControl fullWidth variant="filled">
            <InputLabel
              id="demo-simple-select-label"
              sx={{ color: "#75c9b7 !important", maxWidth: "80%" }}
            >
              Selected Vehicle
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className={Styles.selectInp}
              // value={age}
              label="Age"
              // onChange={handleChange}
              sx={{
                color: "#75c9b7 !important",
                minWidth: "250px",
                maxWidth: "80%",
              }}
              defaultValue={"Activa 4g"}
            >
              {vehicles.map((vehName) => {
                return (
                  <MenuItem value={vehName} key={vehName}>
                    {vehName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
