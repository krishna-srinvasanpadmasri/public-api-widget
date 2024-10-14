import React, { useState, useEffect } from "react";
import {
  getAllAgents,
  getAllChannels,
  getAllGroups,
  getChannelAlias,
  runParallelConversations,
} from "./Utils";
import {
  Autocomplete,
  TextField,
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import "./Style.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function ChatWidget() {
  const [channelNames, setChannelNames] = useState([]);
  const [groupNames, setGroupNames] = useState([]);
  const [agentNames, setAgentNames] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [conversationCount, setConversationCount] = useState(1);
  const [conversationDelay, setConversationDelay] = useState(1);
  function showToaster(successText) {
    toast.success(successText, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      intent: "success",
    });
  }

  const fetchData = async (fetchFunction, setStateFunction) => {
    try {
      const response = await fetchFunction(localStorage.getItem("apiToken"));
      const names = response[Object.keys(response)[0]].map(
        (item) => item.name || item.email
      );

      setStateFunction(names);
      if (fetchFunction === getAllAgents && groupNames.size > 0) {
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(getAllChannels, setChannelNames);
    fetchData(getAllGroups, setGroupNames);
    fetchData(getAllAgents, setAgentNames);
  }, []);
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      if (e.currentTarget.ariaLabel === "agent-dd") {
        setSelectedAgent(e.target.value);
      } else if (e.currentTarget.ariaLabel === "group-dd") {
        setSelectedGroup(e.target.value);
      } else if (e.currentTarget.ariaLabel === "channel-dd") {
        setSelectedChannel(e.target.value);
      } else if (e.currentTarget.ariaLabel === "count-dd") {
        setConversationCount(e.target.value);
      } else if (e.currentTarget.ariaLabel === "delay-dd") {
        setConversationDelay(e.target.value);
      }
    }
  };

  const handleCreateConversation = async (event) => {
    let apiToken = localStorage.getItem("apiToken");
    const channelAlias = await getChannelAlias(apiToken, selectedChannel);
    // for (let i = 1; i <= parseInt(conversationCount); i++) {
    //   await createConversation(apiToken, channelAlias);
    // }

    runParallelConversations(apiToken, channelAlias, conversationCount);

    showToaster("Conversation created successfully!");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
    >
      <Paper elevation={10} className="container">
        <Box p={5}>
          <Typography variant="h4" gutterBottom>
            Create Conversation
          </Typography>
          <Box my={3}>
            <Autocomplete
              options={channelNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Channel"
                  onKeyDown={handleInputChange}
                  aria-label="channel-dd"
                />
              )}
              fullWidth
            />
          </Box>
          <Box my={3}>
            <Autocomplete
              options={groupNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Group"
                  onKeyDown={handleInputChange}
                  aria-label="group-dd"
                />
              )}
              fullWidth
            />
          </Box>
          <Box my={3}>
            <Autocomplete
              options={agentNames}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Agent"
                  aria-label="agent-dd"
                  onKeyDown={handleInputChange}
                  name="agent-dd"
                />
              )}
              fullWidth
            />
          </Box>
          <Box my={3}>
            <Autocomplete
              options={[
                { label: "1", id: 1 },
                { label: "2", id: 2 },
                { label: "3", id: 3 },
                { label: "4", id: 4 },
                { label: "5", id: 5 },
                { label: "negative", id: 6 },
              ]}
              renderInput={(params) => (
                <TextField {...params} label="Customer satisfaction score" />
              )}
              class="mandate-input-field config-input"
              disableClearable={true}
              size="small"
            />
          </Box>
          <Box my={3}>
            <TextField
              label="Delay"
              type="number"
              onKeyDown={handleInputChange}
              fullWidth
            />
          </Box>
          <Box my={3}>
            <TextField
              label="Number of conversations to be created"
              type="number"
              onKeyDown={handleInputChange}
              aria-label="count-dd"
              defaultValue={1}
              fullWidth
            />
          </Box>
          <input
            type="checkbox"
            id="myCheckbox"
            name="myCheckbox"
            style={{ width: "20px", height: "20px" }}
          />
          &nbsp;Check this to create the conversation as full interaction with
          CSAT Score
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            className="submit-cta"
            onClick={handleCreateConversation}
            fullWidth
          >
            Create Conversation
          </Button>
        </Box>
        <ToastContainer />
      </Paper>
    </Box>
  );
}
