export async function createUser(token, userPayload) {
  try {
    const response = await fetch("/v2/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        first_name: `${userPayload["firstName"]}`,
        last_name: `${userPayload["LastName"]}`,
        email: `${userPayload["email"]}`,
        avatar: {
          url: "https://images.indianexpress.com/2022/04/kgf-2-1200.jpg?w=389",
        },
        properties: `${userPayload["properties"]}`,
      },
    });

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userDetails = await response.json(); // Parse the JSON from the response

    return userDetails;
  } catch (err) {
    console.error("User Create Error: ", err);
  }

  return null;
}

export async function updateUser(token, userPayload) {
  try {
    const response = await fetch(`/v2/users/${userPayload["user_alias"]}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        first_name: `${userPayload["firstName"]}`,
        last_name: `${userPayload["LastName"]}`,
        email: `${userPayload["email"]}`,
        avatar: {
          url: "https://images.indianexpress.com/2022/04/kgf-2-1200.jpg?w=389",
        },
        properties: `${userPayload["properties"]}`,
      },
    });

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userDetails = await response.json(); // Parse the JSON from the response

    return userDetails;
  } catch (err) {
    console.error("User Create Error: ", err);
  }
  return null;
}

export async function createConversation(
  token,
  userPayload,
  conversationPayload,
  appPayload,
  channelPayload,
  messageText
) {
  try {
    const response = await fetch(`/v2/conversations`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: {
        app_id: `${appPayload["app_alias"]}`,
        channel_id: `${channelPayload["channel_alias"]}`,
        messages: [
          {
            app_id: `${conversationPayload["app_alias"]}`,
            actor_type: "user",
            actor_id: `${userPayload["user_alias"]}`,
            channel_id: `${channelPayload["channel_alias"]}`,
            message_type: "normal",
            message_parts: [
              {
                text: {
                  content: `${messageText}`,
                },
              },
            ],
          },
        ],
        status: "new",
        users: [{ id: `${userPayload["user_alias"]}` }],
      },
    });

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("User Create Error: ", err);
  }
  return null;
}

export async function sendTextMessage(
  token,
  userPayload,
  messageText,
  conversationPayload
) {
  try {
    const response = await fetch(
      `/v2/conversations/${conversationPayload["conversation_alias"]}/messages`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: {
          actor_id: `${userPayload["user_alias"]}`,
          message_type: "normal",
          actor_type: "user",
          message_parts: [
            {
              text: {
                content: `${messageText}`,
              },
            },
          ],
        },
      }
    );

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("User Create Error: ", err);
  }
  return null;
}
