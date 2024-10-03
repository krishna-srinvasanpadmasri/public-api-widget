import "./Style.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer } from "react-toastify";
import { getAccount } from "./Utils";

export default function NeoPage() {
  const [token, setToken] = useState(null);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setToken(event.target.value);
    }
  };
  const [account, setAccount] = useState([]);

  return (
    <>
      <p>
        This api is used to get account related info: from account/configuration
      </p>
      <div>
        <TextField
          required
          label="Required"
          defaultValue="<token>"
          variant="filled"
          className="config-input"
          id="token"
          name="token"
          onKeyDown={handleKeyPress}
        />
      </div>
      <Button
        variant="contained"
        className="get-account-cta"
        onClick={async () => {
          const accountData = await getAccount(token);
          setAccount(accountData);
        }}
      >
        Get Account
      </Button>
      <div>
        <h1>Account related info:</h1>
        <div className="account-json">
          <pre>
            <code>{JSON.stringify(account)}</code>
          </pre>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
