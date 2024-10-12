import "./Style.css";
import { getHeaderText } from "./Utils";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import Tooltip from "@mui/material/Tooltip";
import ArticleSharpIcon from "@mui/icons-material/ArticleSharp";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import InsightsSharpIcon from "@mui/icons-material/InsightsSharp";
import Configuration from "../configuration";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Header() {
  const [titleText, setTitleText] = useState("Home");
  // let text = getHeaderText();
  // setTitleText(text);
  // debugger;
  return (
    <div className="container">
      <header>
        <section className="header-title-line">
          <h1 class="image-container"></h1>
          <h1>{titleText}</h1>
          <button class="menu-button">
            <div class="menu-icon"></div>
          </button>
        </section>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <a href="#">
                  <Tooltip title="Home" placement="right" arrow>
                    <HomeSharpIcon />
                  </Tooltip>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/solution-articles">
                <a href="#">
                  <Tooltip title="Solution articles" placement="right" arrow>
                    <ArticleSharpIcon />
                  </Tooltip>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/chat-widget">
                <a href="#">
                  <Tooltip title="Conversation seeder" placement="right" arrow>
                    <MessageSharpIcon />
                  </Tooltip>
                </a>
              </Link>
            </li>
            <li>
              <a href="#">
                <Link to="/reports">
                  <Tooltip title="Create reports" placement="right" arrow>
                    <InsightsSharpIcon />
                  </Tooltip>
                </Link>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      {/* <Configuration /> */}
    </div>
  );
}
