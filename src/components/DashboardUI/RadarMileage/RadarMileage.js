import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

import Styles from "./RadarMileage.module.css";

const RadarMileage = (props) => {
  const [data, setdata] = useState({
    "0-15": 0,
    "16-30": 0,
    "31-45": 0,
    "46-60": 0,
    "61-75": 0,
    ">=75": 0,
  });

  useEffect(() => {
    props.data?.forEach((element) => {
      if (element.mileage >= 0 && element.mileage <= 15) {
        setdata((prevdata) => {
          return {
            ...prevdata,
            "0-15": prevdata["0-15"] + 1,
          };
        });
      } else if (element.mileage >= 16 && element.mileage <= 30) {
        setdata((prevdata) => {
          return {
            ...prevdata,
            "16-30": prevdata["16-30"] + 1,
          };
        });
      } else if (element.mileage >= 31 && element.mileage <= 45) {
        setdata((prevdata) => {
          return {
            ...prevdata,
            "31-45": prevdata["31-45"] + 1,
          };
        });
      } else if (element.mileage >= 46 && element.mileage <= 60) {
        setdata((prevdata) => {
          return {
            ...prevdata,
            "46-60": prevdata["46-60"] + 1,
          };
        });
      } else if (element.mileage >= 61 && element.mileage <= 75) {
        setdata((prevdata) => {
          return {
            ...prevdata,
            "61-75": prevdata["61-75"] + 1,
          };
        });
      } else {
        setdata((prevdata) => {
          return {
            ...prevdata,
            ">=75": prevdata[">=75"] + 1,
          };
        });
      }
    });
  }, []);

  let radarData = Object.keys(data).map((range) => {
    return { range: `${range} kmpl`, count: data[range] };
  });

  return (
    <div className={Styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="range" />
          <PolarRadiusAxis />
          <Radar
            dataKey="count"
            stroke="#75c9b7"
            fill="#75c9b7"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarMileage;
