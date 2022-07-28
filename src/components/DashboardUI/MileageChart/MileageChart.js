import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

import Styles from "./MileageChart.module.css";

const MileageChart = (props) => {
  const dataMin = props.data?.slice(0, 10);

  return (
    <div className={Styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={"auto"}
          height={"auto"}
          data={window.innerWidth > 768 ? props.data : dataMin}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis minTickGap={30} />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" height={48} />
          <Line
            type="monotone"
            dataKey="mileage"
            stroke="#75c9b7"
            activeDot={{ r: 8 }}
          />
          <ReferenceDot
            x={
              window.innerWidth > 768
                ? Math.floor(props.data?.length / 2)
                : Math.floor(dataMin.length / 2)
            }
            y={props.userMileage !== null ? props.userMileage : "-1"}
            r={5}
            isFront="true"
            label={{ value: "Your Mileage", angle: 0, position: "top" }}
            fill="#16123f"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MileageChart;
