import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WebhookPage from "./pages/WebhookPage.js";
import EventPage from "./pages/EvenPage.js";
import "./App.css"; // import the CSS file

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="app-title">AlgoHire Dashboard</h1>

        {/* Navigation */}
        <nav className="nav-bar">
          <Link to="/webhooks" className="nav-link blue-link">
            Webhooks
          </Link>
          <Link to="/events" className="nav-link green-link">
            Events
          </Link>
        </nav>

        <Routes>
          <Route path="/webhooks" element={<WebhookPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="*" element={<WebhookPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
