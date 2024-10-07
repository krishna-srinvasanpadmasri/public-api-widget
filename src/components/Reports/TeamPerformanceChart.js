import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeamPerformanceChart = ({ data }) => {
  const chartData = data[0].series[0].values.map((item) => ({
    name: item.key.split(".")[1].replace(/_/g, " "),
    value: parseFloat(item.value),
  }));

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TeamPerformanceChart;
