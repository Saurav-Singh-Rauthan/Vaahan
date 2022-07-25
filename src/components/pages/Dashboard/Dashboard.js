import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { connect } from "react-redux";

import Styles from "./Dashboard.module.css";
import Countuptab from "../../DashboardUI/CountupTab/Countuptab";
import MileageChart from "../../DashboardUI/MileageChart/MileageChart";
import VehCondition from "../../DashboardUI/VehCondition/VehCondition";
import RadarMileage from "../../DashboardUI/RadarMileage/RadarMileage";
import Cover from "../../Cover/Cover";
import * as actions from "../../Store/actions/index";

const Dashboard = (props) => {
  const [selectedVeh, setselectedVeh] = useState(null);
  let vehicles = [""];

  useEffect(() => {
    props.fetch_userDetails();
  }, []);

  const vehSelectHandler = (event) => {
    const selectedVeh =
      props.vehicles[
        Object.keys(props.vehicles).filter(
          (veh) => props.vehicles[veh].name === event.target.value
        )[0]
      ];

    console.log(selectedVeh);
    setselectedVeh(selectedVeh);
  };

  const dashboardComps = (
    <React.Fragment>
      <div>
        <div className={Styles.MonthStats}>Monthly Stats</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" value={selectedVeh?.monthly_spending} />
          <Countuptab type="mileage" value={selectedVeh?.average_mileage} />
          <Countuptab
            type="dist"
            value={selectedVeh?.monthly_distanceTravelled}
          />
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Relative Performance</div>
        <div className={Styles.mileageComp}>
          <div className={Styles.mileageCompDiv}>
            <MileageChart
              data={selectedVeh?.mileage.mileage_list}
              userMileage={selectedVeh?.average_mileage}
            />
          </div>
          <div className={Styles.mileageCompDiv}>
            <VehCondition />
          </div>
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Last Trip</div>
        <div className={Styles.monthlydetails}>
          <Countuptab type="money" value={selectedVeh?.last_fuelcost} />
          <Countuptab
            type="mileage"
            value={
              selectedVeh?.mileage.mileage_list[
                `${(selectedVeh.mileage.last_entry - 1) % 50}`
              ].mileage
            }
          />
          <Countuptab type="dist" value={selectedVeh?.last_distance} />
        </div>
      </div>

      <div>
        <div className={Styles.MonthStats}>Previous Performance</div>
        <div className={Styles.mileageCompPrev}>
          <div className={Styles.mileageCompPrevDiv}>
            <RadarMileage data={selectedVeh?.mileage.mileage_list} />
          </div>
          <div className={Styles.mileageCompPrevDiv}>
            <MileageChart data={selectedVeh?.mileage.mileage_list} />
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

  if (props.vehicles) {
    vehicles = Object.keys(props.vehicles).map((veh) => {
      return props.vehicles[veh].name;
    });
  }

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
              label="Age"
              onChange={(event) => vehSelectHandler(event)}
              sx={{
                color: "#75c9b7 !important",
                minWidth: "250px",
                maxWidth: "80%",
              }}
              defaultValue={""}
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
      {selectedVeh !== null ? (
        dashboardComps
      ) : (
        <p
          style={{ display: "flex", width: "fit-content", margin: "8rem auto" }}
        >
          Choose a vehicle to continue
        </p>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    vehicles: state.user.vehicles,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetch_userDetails: () => {
      dispatch(actions.fetchUserDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
