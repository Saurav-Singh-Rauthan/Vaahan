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
  const data = [
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },

    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
    {
      name: "Page A",
      uv: 4000,
      mileage: 2400.41,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      mileage: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      mileage: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      mileage: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      mileage: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      mileage: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      mileage: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className={Styles.container}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis minTickGap={30}/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="mileage"
            stroke="#75c9b7"
            activeDot={{ r: 8 }}
          />
          <ReferenceDot
            x="25"
            y={4500}
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
