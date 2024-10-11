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


const TeamPerformanceChart = ({ data, widgetName = "dummy" }) => {
  const chartData = data[0].series[0].values.map((item) => ({
    name: item.key,
    value: parseFloat(item.value),
  }));

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        {widgetName}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
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
    </div>
  );
};

export default TeamPerformanceChart;
