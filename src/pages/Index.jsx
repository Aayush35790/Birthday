import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Index({ musicPlaying, onPlayMusic }) {
  const [confettiElems, setConfettiElems] = useState([]);
  const [heartElems, setHeartElems] = useState([]);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const confettis = [];
    for (let i = 0; i < 70; i++) {
      confettis.push({
        id: i,
        left: Math.random() * 100 + "vw",
        top: Math.random() * -150 + "px",  // thoda upar se start
        duration: (Math.random() * 3 + 2) + "s",
        bgColor: ['#f43f5e', '#facc15', '#10b981', '#3b82f6'][Math.floor(Math.random() * 4)]
      });
    }
    setConfettiElems(confettis);

    const hearts = [];
    for (let i = 0; i < 30; i++) {
      hearts.push({
        id: i,
        left: Math.random() * 100 + "vw",
        top: Math.random() * -150 + "px",
        duration: (Math.random() * 4 + 2) + "s"
      });
    }
    setHeartElems(hearts);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body,html,#root {
          height: 100%;
          font-family: 'Segoe UI', sans-serif;
          background: #fbcfe8;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
          position: relative;
        }
        .card {
          background: #f9a8d4;
          color: #be185d;
          width: 100%;
          max-width: 500px;
          padding: 30px 20px;
          border-radius: 20px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          z-index: 2;
          position: relative;
        }
        h1 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        .btn, .play-btn {
          background: linear-gradient(to right, #ec4899, #8b5cf6);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
          margin: 10px 5px;
        }
        .btn:hover, .play-btn:hover {
          transform: scale(1.05);
        }
        .play-btn {
          margin-top: 10px;
        }
        .confetti, .heart {
          position: absolute;
          width: 14px;
          height: 14px;
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          opacity: 0.9;
          z-index: 1;
        }
        .heart::before,
        .heart::after {
          content: "";
          position: absolute;
          width: 14px;
          height: 14px;
          background: red;
          border-radius: 50%;
        }
        .heart::before {
          top: 0;
          left: 7px;
        }
        .heart::after {
          top: -7px;
          left: 0;
        }
        .heart {
          background: red;
          transform: rotate(-45deg);
        }
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        /* Volume slider container fixed top right */
        .volume-control {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 160px;
          background: rgba(255,255,255,0.8);
          border-radius: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          z-index: 9999;
          user-select: none;
          flex-direction: column;
        }
        .volume-slider {
          -webkit-appearance: none;
          width: 120px;
          height: 6px;
          background: #ec4899;
          border-radius: 3px;
          outline: none;
          transform: rotate(-90deg);
          cursor: pointer;
        }
        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #be185d;
          transition: background-color 0.2s ease;
        }
        .volume-slider::-webkit-slider-thumb:hover {
          background: #a78bfa;
        }
        .volume-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #8b5cf6;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #be185d;
          transition: background-color 0.2s ease;
        }
        .volume-slider::-moz-range-thumb:hover {
          background: #a78bfa;
        }
        .volume-label {
          font-size: 0.9rem;
          margin-bottom: 8px;
          color: #be185d;
          user-select: none;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          font-weight: 600;
        }
        @media (max-width: 480px) {
          h1 {
            font-size: 1.4rem;
          }
          .btn, .play-btn {
            padding: 10px 20px;
            font-size: 0.95rem;
          }
          .volume-control {
            width: 30px;
            height: 120px;
          }
          .volume-slider {
            width: 90px;
          }
        }
        @media (max-width: 320px) {
          h1 {
            font-size: 1.2rem;
          }
          .btn, .play-btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
          .volume-control {
            width: 28px;
            height: 100px;
          }
          .volume-slider {
            width: 80px;
          }
        }
      `}</style>

      <audio
        ref={audioRef}
        id="bgMusic"
        loop
        src="/music/music1.mp3"
      />

      <div className="card">
        <h1>Happy Birthday, Betal! 👻🎉🎂</h1>
        <Link to="/memories">
          <button className="btn">Let's Go! ✨</button>
        </Link>
        <button
          className="play-btn"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.play();
              onPlayMusic();
            }
          }}
          disabled={musicPlaying}
        >
          {musicPlaying ? "🎵 Music Playing..." : "🎵 Play Music"}
        </button>
      </div>

      {/* Fullscreen fixed container for confetti and hearts */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
          overflow: "visible",
        }}
      >
        {confettiElems.map(({ id, left, top, duration, bgColor }) => (
          <div
            key={"confetti-" + id}
            className="confetti"
            style={{ left, top, animationDuration: duration, backgroundColor: bgColor }}
          />
        ))}

        {heartElems.map(({ id, left, top, duration }) => (
          <div
            key={"heart-" + id}
            className="heart"
            style={{ left, top, animationDuration: duration }}
          />
        ))}
      </div>

      {/* Volume control */}
      {musicPlaying && (
        <div className="volume-control" title="Volume Control">
          <div className="volume-label">🔊</div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider"
            orient="vertical"
          />
        </div>
      )}
    </>
  );
}
