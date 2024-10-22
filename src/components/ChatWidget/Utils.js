import { faker } from "@faker-js/faker";
import { httpFetch } from "../service/fetchService";
export async function createUser(token, userPayload) {
  try {
    const response = await fetch("/v2/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: userPayload,
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

export async function createConversation(token, channelAlias) {
  try {
    const userPayload = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
    };

    const userCreateResponse = await createUser(
      token,
      JSON.stringify(userPayload)
    );

    const userAlias = userCreateResponse["id"];
    const conversationCreatePayload = {
      channel_id: channelAlias,
      messages: [
        {
          actor_type: "user",
          actor_id: userAlias,
          channel_id: channelAlias,
          message_type: "normal",
          message_parts: [
            {
              text: {
                content:
                  "This is a sample conversation created via public api seeder",
              },
            },
          ],
        },
      ],
      status: "new",
      users: [
        {
          id: userAlias,
        },
      ],
    };
    const response = await fetch(`/v2/conversations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversationCreatePayload),
    });

    // `response` is the promise's resolved value, which contains the API response
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const conversationDetails = await response.json(); // Parse the JSON from the response

    return conversationDetails;
  } catch (err) {
    console.error("Conversation create Error: ", err);
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
  return {};
}

export async function getChannelAlias(token, channelName) {
  const allChannelDetails = await getAllChannels(token);
  if (allChannelDetails) {
    const channelDetails = allChannelDetails["channels"].find(
      (channel) => channel.name === channelName
    );
    if (channelDetails) {
      return channelDetails.id;
    } else {
      console.error("No channels found with the given channel alias");
    }
  } else {
    console.error("Unable to fetch channel details", allChannelDetails);
    return "";
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

export async function runParallelConversations(
  apiToken,
  channelAlias,
  conversationCount
) {
  const promises = [];

  for (let i = 1; i <= parseInt(conversationCount); i++) {
    promises.push(createConversation(apiToken, channelAlias));
  }

  try {
    await Promise.all(promises);
  } catch (error) {
    console.error("Error creating conversations:", error);
  }
}
