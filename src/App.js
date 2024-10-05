import "./App.css";
import NeoPage from "./components/NeoPage/NeoPage";
import { Routes, Route } from "react-router-dom";
import ChatWidget from "./components/ChatWidget/chatWidget";
import Reports from "./components/Reports/reports";
import SolutionArticle from "./components/solutionArticle";
import Header from "./components/Header/header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<NeoPage />} />
        <Route path="/solution-articles" element={<SolutionArticle />} />
        <Route path="/chat-widget" element={<ChatWidget />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}
