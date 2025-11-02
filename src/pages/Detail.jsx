import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./detail.css"; // 👈 import CSS file

export default function HeritageDetail() {
  const { id } = useParams();
  const [heritage, setHeritage] = useState(null);

  useEffect(() => {
    fetch("/heritageData.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        setHeritage(found);
      });
  }, [id]);

  if (!heritage) return <div className="loading">Loading...</div>;

  return (
    <div className="heritage-detail">
      {/* 🎥 HERO VIDEO SECTION */}
      <div className="hero-container">
        <iframe
          src={`${heritage.videoUrl}?autoplay=1&mute=1&loop=1&playlist=${heritage.videoUrl.split("/embed/")[1]}&controls=0`}
          title={heritage.name}
          allow="autoplay; fullscreen"
          frameBorder="0"
          className="hero-video"
        ></iframe>

        <div className="hero-overlay"></div>

        <div className="hero-text">
          <h1>{heritage.name}</h1>
          <p className="location">{heritage.location}</p>
          <Link to="/" className="back-btn">← Back to List</Link>
        </div>
      </div>

      {/* 📜 DETAIL SECTION */}
      <div className="detail-section">
        <h2>About {heritage.name}</h2>
        <p className="description">{heritage.description}</p>
        <span className="tag">{heritage.category}</span>
      </div>
    </div>
  );
}
