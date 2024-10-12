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
export async function getAllChannels(token) {
  try {
    const response = await fetch(`v2/channels`, {
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

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("Error while fetching all channels", err);
  }
  return null;
}

export async function getChannelAlias(token, channelName) {
  try {
    let allChannelDetails = await getAllChannels(token);
    let channelDetails = allChannelDetails["channels"].filter(
      (channel) => channel.name === channelName
    );
    return channelDetails[0].id;
  } catch (err) {
    console.error("Error while fetching all channels", err);
  }
}
export async function getAllGroups(token) {
  try {
    const response = await fetch(`v2/groups`, {
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

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("Error while fetching all groups", err);
  }
  return null;
}

export async function getgroupAlias(token, groupName) {
  try {
    let allgroupDetails = await getAllGroups(token);
    let groupDetails = allgroupDetails["groups"].filter(
      (group) => group.name === groupName
    );
    return groupDetails[0].id;
  } catch (err) {
    console.error("Error while fetching group alias", err);
  }
}

export async function getAllAgents(token) {
  try {
    const response = await fetch(`v2/agents`, {
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

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("Error while fetching all agents", err);
  }
  return null;
}

export async function getagentAlias(token, agentEmail) {
  try {
    let allagentDetails = await getAllAgents(token);
    let agentDetails = allagentDetails["agents"].filter(
      (agent) => agent.email === agentEmail
    );
    return agentDetails[0].id;
  } catch (err) {
    console.error("Error while fetching agent alias", err);
  }
}
