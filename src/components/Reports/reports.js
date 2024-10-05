import { getHistoricalMetric } from "./Utils";
import React, { useState, useEffect } from "react";
import "react-datetime/css/react-datetime.css";
import dayjs from "dayjs";
import "./Style.css";
import { Button } from "@mui/material";
import TeamPerformanceChart from "./TeamPerformanceChart";

export default function Reports() {
  let chartData = {
    metrics: ["team_performance"],
    start: "2024-09-04T00:00:00.000Z",
    end: "2024-10-04T23:00:00.000Z",
    filters: {
      metric_filters: [],
    },
    aggregator: "avg",
    data: [
      {
        groupings: [],
        series: [
          {
            start: "2024-09-04T00:00:00.000Z",
            end: "2024-10-04T23:00:00.000Z",
            values: [
              {
                key: "team_performance.first_response_time",
                value: "0",
              },
              {
                key: "team_performance.response_time",
                value: "0",
              },
              {
                key: "team_performance.resolution_time",
                value: "0",
              },
              {
                key: "team_performance.wait_time",
                value: "0",
              },
            ],
          },
        ],
      },
    ],
  };
  const [metricData, setMetricData] = useState(null);
  const token = localStorage.getItem("apiToken");
  const oneWeekBefore = dayjs()
    .subtract(7, "day")
    .format("YYYY-MM-DDTHH:mm:ss"); // Subtract 7 days
  const today = dayjs().format("YYYY-MM-DDTHH:mm:ss");
  const [startDateTime, setStartDateTime] = useState(`${oneWeekBefore}Z`);
  const [endDateTime, setEndDateTime] = useState(`${today}Z`);
  let data = metricData === null ? chartData.data : metricData.data;
  return (
    <>
      <div className="result-wrapper">
        <Button
          onClick={async () => {
            const historicTeamPerformanceData = await getHistoricalMetric(
              token,
              "team_performance",
              startDateTime,
              endDateTime,
              "avg"
            );
            setMetricData(historicTeamPerformanceData);
            chartData = metricData;
          }}
        >
          Refresh Data
        </Button>
      </div>
      <div className="widget-container">
        <h3 className="widget-title">Average Team Performance Chart</h3>
        <TeamPerformanceChart data={data} className="widget" />
      </div>
    </>
  );
}
