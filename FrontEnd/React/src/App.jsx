//import { useState } from 'react'

import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import DashboardPage from "./Pages/DashboardPage.jsx";
import RequestPage from "./Pages/RequestPage";
import OfferPage from "./Pages/OfferPage";
import ChatPage from "./Pages/ChatPage";
import { MantineProvider } from "@mantine/core";

// 1. Import necessary components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile.jsx";
function App() {
  return (
    <>
      <MantineProvider>
        <Router>
          <div className="App">
            <Sidebar />
            <main className="content-area">
              <Routes>
                <Route  path="/dashboard"element={<DashboardPage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/offer" element={<OfferPage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </MantineProvider>
    </>
  );
}

export default App;
