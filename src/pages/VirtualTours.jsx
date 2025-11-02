import React from "react";
import VirtualTourCard from "../components/VirtualTourCard";

const sampleTours = [
  { id: 1, title: "Taj Mahal Virtual Tour", short: "360° tour of the Taj Mahal.", image: "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg", url: "https://artsandculture.google.com/project/taj-mahal" },
  { id: 2, title: "Hampi Walkthrough", short: "Explore Hampi ruins virtually.", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Hampi_Monuments.jpg", url: "https://artsandculture.google.com/entity/hampi" }
];

export default function VirtualTours() {
  return (
    <div>
      <h2>Virtual Tours</h2>
      <p className="text-muted">Click a tour to open (opens in a new tab).</p>
      <div className="card-grid">
        {sampleTours.map(t => <VirtualTourCard tour={t} key={t.id} />)}
      </div>
    </div>
  );
}
