import { Routes, Route } from "react-router-dom";
import NeoPage from "./neoPage";
import ChatWidget from "./chatWidget";
import Reports from "./reports";
import SolutionArticle from "./solutionArticle";
// import {Link} from 'react-router-dom';
export default function routes() {
  return (
    <Routes>
      <Route path="/" element={<NeoPage />} />
      <Route path="/solution-articles" element={<SolutionArticle />} />
      <Route path="/chat-widget" element={<ChatWidget />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}
