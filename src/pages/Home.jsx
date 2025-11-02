import React from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Indian Heritage Explorer</h1>
        <p className="lead">Discover monuments, historical places and virtual tours across India.</p>
        <div>
          <Link to="/explore" className="btn btn-primary me-2">Explore Sites</Link>
          <Link to="/virtual-tours" className="btn btn-outline-primary">Virtual Tours</Link>
        </div>
      </section>

      <section>
        <h3>Why this app?</h3>
        <p>This project demonstrates React component design, routing, state management and mock API integration for your SDP.</p>
      </section>
    </div>
  );
}
