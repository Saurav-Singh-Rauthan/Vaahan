import React from "react";
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
  const data = [
    {
      range: "0-15 Kmpl",
      count: 120,
    },
    {
      range: "16-30 Kmpl",
      count: 98,
    },
    {
      range: "31-45 Kmpl",
      count: 86,
    },
    {
      range: "46-60 Kmpl",
      count: 99,
    },
    {
      range: "62-75 Kmpl",
      count: 85,
    },
    {
      range: "76-100 Kmpl",
      count: 65,
    },
  ];
  return (
    <div className={Styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
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
