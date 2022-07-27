import * as actions from "./actionTypes";
import axiosV from "../../../axiosVahan";

const setdetails = (email, id, state, district, vehicles, username) => {
  return {
    type: actions.USER_FETCH,
    email,
    id,
    state,
    district,
    vehicles,
    username,
  };
};

const fetchFailed = () => {
  return {
    type: actions.USER_FAILED,
  };
};

export const fetchUserDetails = () => {
  return (dispatch) => {
    axiosV
      .get(
        `/users.json?auth=${localStorage.getItem(
          "token"
        )}&orderBy="email"&equalTo="${localStorage.getItem("email")}"`
      )
      .then((res) => {
        const key = Object.keys(res.data)[0];
        dispatch(
          setdetails(
            res.data[key].email,
            key,
            res.data[key].state,
            res.data[key].district,
            res.data[key].vehicles,
            res.data[key].username
          )
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchFailed());
      });
  };
};

export const isNewMonth = (rec, userId, code) => {
  return (dispatch) => {
    const latestRecord = new Date(rec.last_updated).getMonth();
    const currDate = new Date().getMonth();

    console.log(latestRecord, currDate, rec);
    if (latestRecord < currDate) {
      console.log("next month", rec);
      let record = {
        name: rec.name,
        last_odometer: rec.last_odometer,
        last_fuel: rec.last_fuel,
        last_fuelcost: rec.last_fuelcost,
        last_distance: rec.last_distance,
        last_updated: rec.last_updated,
        mileage: {
          last_entry: 0,
          mileage_list: [
            rec.mileage.mileage_list[
              rec.mileage.last_entry > 0
                ? rec.mileage.last_entry - 1
                : rec.mileage.last_entry
            ],
          ],
        },
        monthly_spending: rec.last_fuelcost,
        monthly_distanceTravelled: rec.last_distance,
        average_mileage: rec.average_mileage,
        prev_month: {
          avg:
            Math.abs(latestRecord - currDate) === 1 ? rec.average_mileage : 0,
          spendings:
            Math.abs(latestRecord - currDate) === 1
              ? Math.abs(rec.monthly_spending - rec.last_fuelcost)
              : 0,
          distance:
            Math.abs(latestRecord - currDate) === 1
              ? Math.abs(rec.monthly_distanceTravelled - rec.last_distance)
              : 0,
        },
      };

      axiosV
        .put(
          `/users/${userId}/vehicles/${code}.json?auth=${localStorage.getItem(
            "token"
          )}`,
          record
        )
        .then((res) => {
          console.log(res, "new month updated");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
