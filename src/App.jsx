import React, { useRef, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Memories from "./pages/Memories";
import Cake from "./pages/Cake";
import Gift from "./pages/Gift";

export default function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setMusicPlaying(true))
        .catch((e) => {
          console.log("Error playing audio:", e);
        });
    }
  };

  return (
    <Router>
      {/* ✅ Audio tag rendered only ONCE */}
      <audio ref={audioRef} id="bgMusic" loop preload="auto">
        <source src="music/music1.mp3" type="audio/mp3" />

        Your browser does not support the audio element.
      </audio>

      <Routes>
        <Route
          path="/"
          element={
            <Index musicPlaying={musicPlaying} onPlayMusic={handlePlayMusic} />
          }
        />
        <Route path="/memories" element={<Memories />} />
        <Route path="/cake" element={<Cake />} />
        <Route path="/gift" element={<Gift />} />
      </Routes>
    </Router>
  );
}
