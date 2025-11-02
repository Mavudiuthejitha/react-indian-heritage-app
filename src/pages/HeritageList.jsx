import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWikiData } from "../utils/wikiAPI";
import DarkModeToggle from "../components/DarkModeToggle";
import "./detail.css";

export default function HeritageDetail() {
  const { id } = useParams();
  const [heritageData, setHeritageData] = useState([]);
  const [heritage, setHeritage] = useState(null);
  const [wikiInfo, setWikiInfo] = useState(null);
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // ✅ Fetch the JSON file dynamically from /public
  useEffect(() => {
    fetch("/heritageData.json")
      .then((res) => res.json())
      .then((data) => {
        setHeritageData(data);
        const found = data.find((h) => h.id === parseInt(id));
        setHeritage(found);
      })
      .catch((err) => console.error("Error loading JSON:", err));
  }, [id]);

  // ✅ Fetch Wikipedia data
  useEffect(() => {
    if (heritage) fetchWikiData(heritage.name).then((data) => setWikiInfo(data));
  }, [heritage]);

  // ✅ Load YouTube API + autoplay video
  useEffect(() => {
    if (!heritage) return;

    // Load API once
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("ytplayer", {
        videoId: heritage.videoId, // ✅ Use videoId directly from JSON
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          enablejsapi: 1,
          modestbranding: 1,
        },
        events: {
          onReady: (e) => {
            e.target.playVideo();
            e.target.mute();
            setPlayer(e.target);
          },
        },
      });
      setPlayer(newPlayer);
    };
  }, [heritage]);

  const toggleMute = () => {
    if (player) {
      if (isMuted) player.unMute();
      else player.mute();
      setIsMuted(!isMuted);
    }
  };

  const skip = (seconds) => {
    if (player) {
      const t = player.getCurrentTime();
      player.seekTo(t + seconds, true);
    }
  };

  if (!heritage) return <h2>Loading heritage details...</h2>;

  return (
    <div className="detail-page">
      <DarkModeToggle />

      {/* 🎥 Hero video container */}
      <div className="video-container">
        <div id="ytplayer" className="hero-video"></div>

        <div className="video-controls">
          <button onClick={() => skip(-10)}>⏪ 10s</button>
          <button onClick={toggleMute}>
            {isMuted ? "🔇 Unmute" : "🔊 Mute"}
          </button>
          <button onClick={() => skip(10)}>10s ⏩</button>
        </div>

        <div className="video-overlay">
          <h1>{heritage.name}</h1>
          <p>{heritage.location}</p>
        </div>
      </div>

      {/* 🏛 Info Section */}
      <div className="info-section">
        <h2>About {heritage.name}</h2>
        <p>{wikiInfo?.extract || heritage.description}</p>

        <div className="heritage-details">
          <p><strong>Country:</strong> {heritage.country}</p>
          <p><strong>State:</strong> {heritage.state}</p>
          <p><strong>Location:</strong> {heritage.location}</p>
          <p><strong>Timings:</strong> {heritage.timing}</p>
        </div>

        {wikiInfo?.images?.length > 0 && (
          <div className="wiki-images">
            {wikiInfo.images.slice(0, 8).map((img, i) => (
              <img key={i} src={img} alt={heritage.name} />
            ))}
          </div>
        )}

        <Link to="/" className="back-link">← Back to Heritage List</Link>
      </div>
    </div>
  );
}
