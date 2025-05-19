import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const messages = [
  " ✨ Cutest moment, frozen in time with love.\n(Drama Queen 👑)",
  " 📸  The peace of the temple, the fun of a bike ride, and the colors of Holi - all together, this day became the ultimate adventure.\n(Holi time💕)",
  " 😊 That smile still lights up everything around.\n(Earrings 🫠)",
  " 😉 The night out was also fun, but your talks on the tea date outweighed everything.\n(Chai date 😁😁)",
  " 🌟 A memory to cherish forever, just like you.\n(Saree 😍😍)",
  " 🤗 Drops of rain, the breeze of a bike ride, the taste of kachori, and then a photo with your smile.\n(Photo Time 😝)",
];

const photos = [
  { src: "images/img1.jpg", alt: "Memory 1" },
  { src: "images/photo2.jpg", alt: "Memory 5" },
  { src: "images/img3.jpg", alt: "Memory 3" },
  { src: "images/photo4.jpg", alt: "Memory 7" },
  { src: "images/img4.jpg", alt: "Memory 4" },
  { src: "images/photo3.jpg", alt: "Memory 6" },
];

// Updated typeWriter function with timeout cancellation
function typeWriter(text, setText, typingRef) {
  let i = 0;
  setText("");

  // Clear any existing timeout to prevent overlapping typing
  if (typingRef.current) {
    clearTimeout(typingRef.current);
  }

  function type() {
    if (i < text.length) {
      setText((prev) => prev + text.charAt(i));
      i++;
      typingRef.current = setTimeout(type, 50);
    }
  }
  type();
}

const Memories = () => {
  const navigate = useNavigate();
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [typedMessage, setTypedMessage] = useState("");
  const typingRef = useRef(null); // Use ref to store typing timeout

  useEffect(() => {
    const interval = setInterval(() => {
      const fallContainer = document.getElementById("fall-container");
      if (!fallContainer) return;
      for (let i = 0; i < 3; i++) {
        const fall = document.createElement("div");
        fall.className = "fall-item";
        if (Math.random() > 0.5) {
          fall.textContent = "❤️";
          fall.style.fontSize = "22px";
        } else {
          fall.textContent = "✨";
          fall.style.fontSize = "20px";
        }
        fall.style.left = Math.random() * 100 + "vw";
        fall.style.animationDuration = 4 + Math.random() * 3 + "s";
        fallContainer.appendChild(fall);

        setTimeout(() => {
          fall.remove();
        }, 8000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const showNextPhoto = () => {
    const nextIndex =
      highlightIndex === null ? 0 : (highlightIndex + 1) % photos.length;
    setHighlightIndex(nextIndex);
    typeWriter(messages[nextIndex], setTypedMessage, typingRef);
  };

  return (
    <>
      <style>{`
        .nav-buttons {
          position: fixed;
          bottom: 20px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          box-sizing: border-box;
          z-index: 10;
        }
        .nav-btn {
          background: linear-gradient(to right, #f472b6, #c084fc);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        .nav-btn:hover {
          transform: scale(1.05);
        }
        body, html {
          margin: 0; padding: 0; overflow-x: hidden; font-family: 'Segoe UI', sans-serif; background-color: #ffe4f0;
        }
        h1 {
          font-size: 2.5em;
          color: #e11d48;
          margin-top: 50px;
          margin-bottom: 10px;
          text-align: center;
        }
        p {
          font-size: 1.1em;
          color: #6b7280;
          max-width: 700px;
          margin: auto;
          margin-bottom: 30px;
          text-align: center;
          white-space: pre-line;
        }
        .photos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .photo-box {
          border-radius: 20px;
          overflow: hidden;
          width: 200px;
          height: 250px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          transition: transform 0.3s ease-in-out, filter 0.3s ease;
          cursor: pointer;
        }
        .photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .photo-box:hover {
          transform: scale(1.05);
        }
        .photo-box.blurred {
          filter: blur(4px);
          opacity: 0.5;
          pointer-events: none;
        }
        .highlighted-section {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 30px;
          margin-top: 30px;
          margin-bottom: 50px;
          text-align: center;
        }
        .highlighted-photo {
          width: 220px;
          height: 280px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          border: 4px solid #f472b6;
        }
        .center-button {
          display: flex;
          justify-content: center;
          margin: 30px 0;
        }
        .btn-slide {
          background: linear-gradient(to right, #f472b6, #c084fc);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
          transition: transform 0.2s;
        }
        .btn-slide:hover {
          transform: scale(1.05);
        }
        .highlighted-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .message-card {
          background-color: white;
          padding: 20px 25px;
          border-radius: 20px;
          max-width: 300px;
          min-height: 100px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
          color: #e11d48;
          font-size: 1.1rem;
          line-height: 1.5;
          white-space: pre-line;
        }
        #fall-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
          pointer-events: none;
          z-index: 999;
        }
        .fall-item {
          position: absolute;
          top: -50px;
          width: 30px;
          height: 30px;
          opacity: 0.8;
          animation: fall 6s linear forwards;
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        @media (max-width: 600px) {
          .photos {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      <div id="fall-container"></div>

      <h1>Lovely Photo Of You</h1>
      <p>
        “I’m just thinking 🤔 these cute photos need to be kept safe, otherwise,
        just like your smile, I’ll have to secretly keep admiring them!” 🌸💖
      </p>

      <div className="center-button">
        <button className="btn-slide" onClick={showNextPhoto}>
          Click on this and see 😲 
          Click again for the next photo
        </button>
      </div>

      <div className="photos">
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`photo-box ${
              highlightIndex !== null && i !== highlightIndex ? "blurred" : ""
            }`}
            onClick={() => {
              setHighlightIndex(i);
              typeWriter(messages[i], setTypedMessage, typingRef);
            }}
          >
            <img src={photo.src} alt={photo.alt} />
          </div>
        ))}
      </div>

      {highlightIndex !== null && (
        <div className="highlighted-section">
          <div className="highlighted-photo">
            <img
              src={photos[highlightIndex].src}
              alt={photos[highlightIndex].alt}
            />
          </div>
          <div className="message-card">{typedMessage}</div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => navigate(-1)}>
          🔙 Previous
        </button>
        <button className="nav-btn" onClick={() => navigate("/cake")}>
          Next 🔜
        </button>
      </div>
    </>
  );
};

export default Memories;
