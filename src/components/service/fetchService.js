const header = {
  Authorization: `Bearer ${localStorage.getItem("apiToken")}`,
  "Content-Type": "application/json",
};
// export async function httpGet(url) {
//   fetch(`v2/channels`, {
//     method: "GET",
//     headers: header,
//   });
// }
export async function httpFetch(endpoint, method, body) {
  const response = await fetch(endpoint, {
    method: method,
    headers: header,
    body: body,
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return null;
}
export async function httpPut(url) {}
export async function httpPatch(url) {}
