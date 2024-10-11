import "./Style.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { getAccount } from "./Utils";
import { Container, Typography, Box, Paper } from "@mui/material";

export default function NeoPage() {
  const [token, setToken] = useState(null);
  const [account, setAccount] = useState([]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setToken(event.target.value);
      localStorage.setItem("apiToken", event.target.value);
    }
  };

  return (
    <html>
      <Container maxWidth="md" className="full-page">
        <Box my={4}>
          <Typography variant="h3" component="h4" gutterBottom>
            Account Configuration API
          </Typography>
          <Typography variant="body1">
            This API is used to get account related info from
            account/configuration
          </Typography>

          <Paper elevation={6}>
            <Box p={3} borderRadius={20} bgcolor="background.paper">
              <form className="form-token">
                <TextField
                  required
                  label="API Token"
                  variant="outlined"
                  fullWidth
                  className="config-input"
                  id="token"
                  name="token"
                  onKeyDown={handleKeyPress}
                />
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="account-fetch-cta"
                    onClick={async () => {
                      const accountData = await getAccount(
                        localStorage.getItem("apiToken")
                      );
                      setAccount(accountData);
                    }}
                  >
                    Get Account
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>

          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Account related info:
            </Typography>
            <Paper elevation={20}>
              <Box p={2} className="account-json">
                <pre>
                  <code>{JSON.stringify(account, null, 2)}</code>
                </pre>
              </Box>
            </Paper>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </html>
  );
}
