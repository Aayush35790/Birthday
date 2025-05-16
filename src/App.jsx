import React, { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Memories from "./pages/Memories";
import Cake from "./pages/Cake";
import Gift from "./pages/gift";

export default function App() {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch((e) => {
          console.log("Error playing audio:", e);
        });
    }
  };

  return (
    <BrowserRouter>
      <audio ref={audioRef} id="bgMusic" loop>
        <source src="/music/music1.mp3" type="audio/mp3" />
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
        <Route path="/cake" element={<Cake />} /> {/* Added Cake route */}
        <Route path="/gift" element={<Gift />} />
      </Routes>
    </BrowserRouter>
  );
}
