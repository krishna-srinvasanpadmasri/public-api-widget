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
  const [minFRTLastWeekData, setminFRTLastWeekData] = useState(null);
  const [maxFRTThisWeekData, setmaxFRTThisWeekData] = useState(null);
  const [maxFRTLastWeekData, setmaxFRTLastWeekData] = useState(null);
  const [medianFRTThisWeekData, setmedianFRTThisWeekData] = useState(null);
  const [medianFRTLastWeekData, setmedianFRTLastWeekData] = useState(null);
  const [p90FRTThisWeekData, setp90FRTThisWeekData] = useState(null);
  const [p90FRTLastWeekData, setp90FRTLastWeekData] = useState(null);

  const [avgRTThisWeekData, setAvgRTThisWeekData] = useState(null);
  const [avgRTLastWeekData, setAvgRTLastWeekData] = useState(null);
  const [minRTThisWeekData, setminRTThisWeekData] = useState(null);
  const [minRTLastWeekData, setminRTLastWeekData] = useState(null);
  const [maxRTThisWeekData, setmaxRTThisWeekData] = useState(null);
  const [maxRTLastWeekData, setmaxRTLastWeekData] = useState(null);
  const [medianRTThisWeekData, setmedianRTThisWeekData] = useState(null);
  const [medianRTLastWeekData, setmedianRTLastWeekData] = useState(null);
  const [p90RTThisWeekData, setp90RTThisWeekData] = useState(null);
  const [p90RTLastWeekData, setp90RTLastWeekData] = useState(null);
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
  let minFRTDataLastWeek =
    minFRTLastWeekData === null ? chartData.data : minFRTLastWeekData.data;
  let maxFRTData =
    maxFRTThisWeekData === null ? chartData.data : maxFRTThisWeekData.data;
  let maxFRTDataLastWeek =
    maxFRTLastWeekData === null ? chartData.data : maxFRTLastWeekData.data;
  let p90FRTData =
    p90FRTThisWeekData === null ? chartData.data : p90FRTThisWeekData.data;
  let p90FRTDataLastWeek =
    p90FRTLastWeekData === null ? chartData.data : p90FRTLastWeekData.data;
  let medianFRTData =
    medianFRTThisWeekData === null
      ? chartData.data
      : medianFRTThisWeekData.data;
  let medianFRTDataLastWeek =
    medianFRTLastWeekData === null
      ? chartData.data
      : medianFRTLastWeekData.data;
  let avgRTData =
    avgRTThisWeekData === null ? chartData.data : avgRTThisWeekData.data;
  let avgRTDataLastWeek =
    avgRTLastWeekData === null ? chartData.data : avgRTLastWeekData.data;
  let minRTData =
    minRTThisWeekData === null ? chartData.data : minRTThisWeekData.data;
  let minRTDataLastWeek =
    minRTLastWeekData === null ? chartData.data : minRTLastWeekData.data;
  let maxRTData =
    maxRTThisWeekData === null ? chartData.data : maxRTThisWeekData.data;
  let maxRTDataLastWeek =
    maxRTLastWeekData === null ? chartData.data : maxRTLastWeekData.data;
  let p90RTData =
    p90RTThisWeekData === null ? chartData.data : p90RTThisWeekData.data;
  let p90RTDataLastWeek =
    p90RTLastWeekData === null ? chartData.data : p90RTLastWeekData.data;
  let medianRTData =
    medianRTThisWeekData === null ? chartData.data : medianRTThisWeekData.data;
  let medianRTDataLastWeek =
    medianRTLastWeekData === null ? chartData.data : medianRTLastWeekData.data;

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
            const minhisroticFRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime1,
              startDateTime,
              "min"
            );
            const maxhisroticFRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime1,
              startDateTime,
              "max"
            );
            const maxhisroticFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "max"
            );
            const medianhisroticFRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime1,
              startDateTime,
              "median"
            );
            const medianhisroticFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "median"
            );
            const p90hisroticFRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime1,
              startDateTime,
              "p90"
            );
            const p90hisroticFRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.first_response_time",
              startDateTime,
              endDateTime,
              "p90"
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
            const minhisroticRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime1,
              startDateTime,
              "min"
            );
            const maxhisroticRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime1,
              startDateTime,
              "max"
            );
            const maxhisroticRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime,
              endDateTime,
              "max"
            );
            const medianhisroticRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime1,
              startDateTime,
              "median"
            );
            const medianhisroticRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime,
              endDateTime,
              "median"
            );
            const p90hisroticRTLastWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime1,
              startDateTime,
              "p90"
            );
            const p90hisroticRTThisWeekData = await getHistoricalMetric(
              token,
              "team_performance.response_time",
              startDateTime,
              endDateTime,
              "p90"
            );

            setAvgFRTThisWeekData(avghistoricFRTThisWeekData);
            setAvgFRTLastWeekData(avghistoricFRTLastWeekData);
            setminFRTThisWeekData(minhisroticFRTThisWeekData);
            setminFRTLastWeekData(minhisroticFRTLastWeekData);
            setmaxFRTThisWeekData(maxhisroticFRTThisWeekData);
            setmaxFRTLastWeekData(maxhisroticFRTLastWeekData);
            setmedianFRTThisWeekData(medianhisroticFRTThisWeekData);
            setmedianFRTLastWeekData(medianhisroticFRTLastWeekData);
            setp90FRTThisWeekData(p90hisroticFRTThisWeekData);
            setp90FRTLastWeekData(p90hisroticFRTLastWeekData);

            setAvgRTThisWeekData(avghistoricRTThisWeekData);
            setAvgRTLastWeekData(avghistoricRTLastWeekData);
            setminRTThisWeekData(minhisroticRTThisWeekData);
            setminRTLastWeekData(minhisroticRTLastWeekData);
            setmaxRTThisWeekData(maxhisroticRTThisWeekData);
            setmaxRTLastWeekData(maxhisroticRTLastWeekData);
            setmedianRTThisWeekData(medianhisroticRTThisWeekData);
            setmedianRTLastWeekData(medianhisroticRTLastWeekData);
            setp90RTThisWeekData(p90hisroticRTThisWeekData);
            setp90RTLastWeekData(p90hisroticRTLastWeekData);
            // chartData = avgFRTThisWeekData;
          }}
          className="fetch-cta"
        >
          <SyncIcon />
        </Button>
      </div>
      {/* FRT DATA */}
      <div className="widget-container">
        <TeamPerformanceChart
          data={avgFRTDataLastWeek}
          widgetName="Average Team Performance FRT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={avgFRTData}
          widgetName="Average Team Performance FRT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={minFRTData}
          widgetName="Minimum Team Performance FRT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={minFRTDataLastWeek}
          widgetName="Minimum Team Performance FRT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={maxFRTData}
          widgetName="Max Team Performance FRT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={maxFRTDataLastWeek}
          widgetName="Max Team Performance FRT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={medianFRTData}
          widgetName="Median Team Performance FRT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={medianFRTDataLastWeek}
          widgetName="Median Team Performance FRT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={p90FRTData}
          widgetName="p90 Team Performance FRT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={p90FRTDataLastWeek}
          widgetName="p90 Team Performance FRT This Week"
          className="this-week-widget"
        />
        {/* RT DATA */}
        <TeamPerformanceChart
          data={avgRTDataLastWeek}
          widgetName="Average Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={avgRTData}
          widgetName="Average Team Performance RT This Week"
          className="this-week-widget"
        />
        <TeamPerformanceChart
          data={minRTDataLastWeek}
          widgetName="Minimum Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          widgetName="Minimum Team Performance RT This Week"
          data={minRTData}
          className="this-week-widget"
        />
        <TeamPerformanceChart
          data={maxRTData}
          widgetName="Max Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={maxRTDataLastWeek}
          widgetName="Max Team Performance RT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={medianRTData}
          widgetName="Median Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={medianRTDataLastWeek}
          widgetName="Median Team Performance RT This Week"
          className="this-week-widget"
        />

        <TeamPerformanceChart
          data={p90RTData}
          widgetName="p90 Team Performance RT Last Week"
          className="last-week-widget"
        />
        <TeamPerformanceChart
          data={p90RTDataLastWeek}
          widgetName="p90 Team Performance RT This Week"
          className="this-week-widget"
        />
      </div>
    </div>
  );
}
