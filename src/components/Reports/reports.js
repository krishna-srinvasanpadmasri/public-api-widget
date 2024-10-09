import { getHistoricalMetric } from "./Utils";
import React, { useState } from "react";
import "react-datetime/css/react-datetime.css";
import dayjs from "dayjs";
import "./Style.css";
import { Button } from "@mui/material";
import TeamPerformanceChart from "./TeamPerformanceChart";
import SyncIcon from "@mui/icons-material/Sync";

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
  const [avgRTThisWeekData, setAvgRTThisWeekData] = useState(null);
  const [avgRTLastWeekData, setAvgRTLastWeekData] = useState(null);
  const [minRTThisWeekData, setminRTThisWeekData] = useState(null);
  const token = localStorage.getItem("apiToken");
  const twoWeeksBefore = dayjs()
    .subtract(14, "day")
    .format("YYYY-MM-DDTHH:mm:ss");
  const oneWeekBefore = dayjs()
    .subtract(7, "day")
    .format("YYYY-MM-DDTHH:mm:ss"); // Subtract 7 days
  const today = dayjs().format("YYYY-MM-DDTHH:mm:ss");
  const [startDateTime1, setEndDateTime1] = useState(`${twoWeeksBefore}Z`);
  const [startDateTime, setStartDateTime] = useState(`${oneWeekBefore}Z`);
  const [endDateTime, setEndDateTime] = useState(`${today}Z`);
  let avgFRTData =
    avgFRTThisWeekData === null ? chartData.data : avgFRTThisWeekData.data;
  let avgFRTDataLastWeek =
    avgFRTLastWeekData === null ? chartData.data : avgFRTLastWeekData.data;
  let minFRTData =
    minFRTThisWeekData === null ? chartData.data : minFRTThisWeekData.data;
  let avgRTData =
    avgRTThisWeekData === null ? chartData.data : avgRTThisWeekData.data;
  let avgRTDataLastWeek =
    avgRTLastWeekData === null ? chartData.data : avgRTLastWeekData.data;
  let minRTData =
    minFRTThisWeekData === null ? chartData.data : minRTThisWeekData.data;

  return (
    <div className="container">
      <div className="button-container">
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
              startDateTime1,
              startDateTime,
              "avg"
            );
            const minhisroticFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "min"
            );
            const avghistoricRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime,
              endDateTime,
              "avg"
            );
            const avghistoricRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime1,
              startDateTime,
              "avg"
            );
            const minhisroticRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime,
              endDateTime,
              "min"
            );
            setAvgFRTThisWeekData(avghistoricFRTThisWeekData);
            setAvgFRTLastWeekData(avghistoricFRTLastWeekData);
            setminFRTThisWeekData(minhisroticFRTThisWeekData);
            setAvgRTThisWeekData(avghistoricRTThisWeekData);
            setAvgRTLastWeekData(avghistoricRTLastWeekData);
            setminRTThisWeekData(minhisroticRTThisWeekData);
            // chartData = avgFRTThisWeekData;
          }}
          className="fetch-cta"
        >
          <SyncIcon />
        </Button>
      </div>
      <div className="widget-container">
        <TeamPerformanceChart
          data={avgFRTData}
          widgetName="Average Team Performance This Week"
          className="this-week-widget"
        />
        <TeamPerformanceChart
          data={avgFRTDataLastWeek}
          widgetName="Average Team Performance Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={minFRTData}
          widgetName="Minimum Team Performance Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={minFRTData}
          widgetName="Minimum Team Performance This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={avgRTData}
          widgetName="Average Team Performance RT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={avgRTDataLastWeek}
          widgetName="Average Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={minFRTData}
          widgetName="Minimum Team Performance Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          widgetName="Minimum Team Performance RT This Week"
          data={minRTData}
          className="this-week-widget"
        />
      </div>
    </div>
  );
}
