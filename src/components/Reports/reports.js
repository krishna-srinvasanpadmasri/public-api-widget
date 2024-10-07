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
  const [avgFRTThisWeekData, setAvgFRTThisWeekData] = useState(null);
  const [avgFRTLastWeekData, setAvgFRTLastWeekData] = useState(null);
  const [minFRTThisWeekData, setminFRTThisWeekData] = useState(null);
  const token = localStorage.getItem("apiToken");
  const twoWeeksBefore = dayjs()
    .subtract(14, "day")
    .format("YYYY-MM-DDTHH:mm:ss");
  const oneWeekBefore = dayjs()
    .subtract(14, "day")
    .format("YYYY-MM-DDTHH:mm:ss"); // Subtract 7 days
  const today = dayjs().format("YYYY-MM-DDTHH:mm:ss");
  const [endDateTime2, setEndDateTime2] = useState(`${twoWeeksBefore}Z`);
  const [startDateTime, setStartDateTime] = useState(`${oneWeekBefore}Z`);
  const [endDateTime, setEndDateTime] = useState(`${today}Z`);
  let avgFRTData =
    avgFRTThisWeekData === null ? chartData.data : avgFRTThisWeekData.data;
  let avgFRTDataLastWeek =
    avgFRTLastWeekData === null ? chartData.data : avgFRTLastWeekData.data;
  let minFRTData =
    minFRTThisWeekData === null ? chartData.data : avgFRTThisWeekData.data;
  return (
    <>
      <div className="result-wrapper">
        <Button
          onClick={async () => {
            const avghistoricFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "avg"
            );
            const avghistoricFRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              endDateTime,
              endDateTime2,
              "avg"
            );
            const minhisroticFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "min"
            );
            setAvgFRTThisWeekData(avghistoricFRTThisWeekData);
            setAvgFRTLastWeekData(avghistoricFRTLastWeekData);
            setminFRTThisWeekData(minhisroticFRTThisWeekData);
            // chartData = avgFRTThisWeekData;
          }}
        >
          Refresh Data
        </Button>
      </div>
      <div className="widget-container">
        <h3 className="this-week-widget-title">
          Average Team Performance This Week
        </h3>
        <TeamPerformanceChart data={avgFRTData} className="this-week-widget" />
        <h3 className="last-week-widget-title">
          Average Team Performance Last Week
        </h3>
        <TeamPerformanceChart
          data={avgFRTDataLastWeek}
          className="last-week-widget"
        />
        <h3 className="this-week-widget-title">
          Minimum Team Performance This Week
        </h3>
        <TeamPerformanceChart data={minFRTData} className="this-week-widget" />
      </div>
    </>
  );
}
