export async function getAccount(token) {
  try {
    const response = await fetch("/v2/accounts/configuration", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const accountDetails = await response.json(); // Parse the JSON from the response

    return accountDetails;
  } catch (err) {
    console.error("Account Fetch Error: ", err);
  }

  return null;
}
