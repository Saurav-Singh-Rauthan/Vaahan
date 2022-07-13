import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import Styles from "./MileageChart.module.css";

const MileageChart = (props) => {
  const data = [
    { name: "a", val: 20 },
    { name: "b", val: 70 },
    { name: "c", val: 50 },
    { name: "d", val: 40 },
    { name: "e", val: 100 },
  ];

  return (
    <div className={Styles.container}>
      <LineChart
        width={"auto"}
        height={300}
        data={data}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="val" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default MileageChart;
