import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import heritageData from "../../public/heritageData.json";


import { fetchWikiData } from "../utils/wikiAPI";
import "./detail.css";
import ReactPlayer from "react-player";



export default function HeritageDetail() {
  const { id } = useParams();
  const heritage = heritageData.find((h) => h.id === parseInt(id));
  const [wikiInfo, setWikiInfo] = useState(null);
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (heritage) fetchWikiData(heritage.name).then(setWikiInfo);
  }, [heritage]);

  useEffect(() => {
    const loadYT = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
        tag.onload = initPlayer;
      } else initPlayer();
    };

    const initPlayer = () => {
      if (playerRef.current) {
        const newPlayer = new window.YT.Player(playerRef.current, {
          videoId: heritage.videoId,
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            playsinline: 1,
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
      }
    };
    loadYT();
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
      const current = player.getCurrentTime();
      player.seekTo(current + seconds, true);
    }
  };

  if (!heritage) return <h2>Heritage Not Found</h2>;

  return (
    <div className="detail-page">
      <div className="hero-section">
        <div className="video-wrapper">
          <div ref={playerRef} id="hero-video"></div>

          <div className="video-overlay">
            <div className="hero-text">
              <h1>{heritage.name}</h1>
              <p>{heritage.location}</p>
            </div>

            <div className="video-controls">
              <button onClick={() => skip(-10)}>⏪ 10s</button>
              <button onClick={toggleMute}>{isMuted ? "🔇 Unmute" : "🔊 Mute"}</button>
              <button onClick={() => skip(10)}>10s ⏩</button>
            </div>
          </div>
        </div>
      </div>

      <div className="info-container">
        <div className="info-card">
          <h2>About {heritage.name}</h2>
          <p>{wikiInfo?.extract || "Loading historical details..."}</p>

          <div className="meta-info">
            <p><strong>Country:</strong> {heritage.country}</p>
            <p><strong>State:</strong> {heritage.state}</p>
            <p><strong>Location:</strong> {heritage.location}</p>
            <p><strong>Timings:</strong> {heritage.timing}</p>
          </div>
        </div>

        {wikiInfo?.images && (
          <div className="gallery-container">
            <h3>Gallery</h3>
            <div className="gallery-grid">
              {wikiInfo.images.slice(0, 8).map((img, i) => (
                <img key={i} src={img} alt={heritage.name} />
              ))}
            </div>
          </div>
        )}

        <Link className="back-link" to="/">← Back to Heritage List</Link>
      </div>
    </div>
  );
}
