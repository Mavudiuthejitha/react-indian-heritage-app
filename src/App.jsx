import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import VirtualTours from "./pages/VirtualTours";
import Dashboard from "./pages/Dashboard";
import HeritageDetail from "./pages/HeritageDetail"; // ⬅️ new import
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AppProvider } from "./context/AppContext";
import "./styles/App.css";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app-root d-flex flex-column min-vh-100">
          <Navbar />
          <main className="flex-grow-1 container my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/virtual-tours" element={<VirtualTours />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/heritage/:id" element={<HeritageDetail />} /> {/* 👈 New route */}
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
