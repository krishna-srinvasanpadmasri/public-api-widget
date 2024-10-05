export async function getHistoricalMetric(
  token,
  metric,
  start_time,
  end_time,
  aggregator
) {
  try {
    const response = await fetch(
      `v2/metrics/historical?metric=${metric}&start=${start_time}&end=${end_time}&aggregator=${aggregator}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const metricData = await response.json(); // Parse the JSON from the response
    return metricData;
  } catch (err) {
    console.error("Error While Fetching data: ", err);
  }
  return null;
}
