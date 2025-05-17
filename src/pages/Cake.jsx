import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Cake = () => {
  const navigate = useNavigate();
  const [slicesLeft, setSlicesLeft] = useState(5);
  const [candlesExtinguished, setCandlesExtinguished] = useState(false);
  const [envelopeVisible, setEnvelopeVisible] = useState(false);
  const [envelopeFlipped, setEnvelopeFlipped] = useState(false);
  const [paperVisible, setPaperVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fallingContainerRef = useRef(null);

  // Birthday message text
  const messageText = ` 🎉 Happy Birthday, Kiran!
Today is your day, so just chill, pamper yourself, and ignore the world a little.
The way your smile freshens the mood, and today is also the reason to look double cute 😄
May your life be full of surprises, happiness and a little fun every year.🎂🎈 

Have an amazing day, Kiran 👻 `;

  // Extinguish candles on shake
  useEffect(() => {
    let lastShake = 0;

    function handleShake(event) {
      const acc = event.accelerationIncludingGravity;
      const total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (total > 30) {
        const now = Date.now();
        if (now - lastShake > 1000) {
          setCandlesExtinguished(true);
          lastShake = now;
        }
      }
    }

    window.addEventListener("devicemotion", handleShake);
    return () => window.removeEventListener("devicemotion", handleShake);
  }, []);

  // Handle cake slice cut
  const handleCutSlice = () => {
    if (slicesLeft <= 0) return;
    setSlicesLeft((prev) => prev - 1);
    if (slicesLeft === 1) {
      // After last slice, show envelope after delay
      setTimeout(() => {
        setEnvelopeVisible(true);
      }, 800);
    }
  };

  // Handle envelope flip and show paper message
  useEffect(() => {
    if (envelopeFlipped) {
      setTimeout(() => {
        setEnvelopeVisible(false);
        setPaperVisible(true);
      }, 900);
    }
  }, [envelopeFlipped]);

  // Typewriter effect for paper message
  useEffect(() => {
    if (!paperVisible) {
      setTypedText("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + messageText.charAt(i));
      i++;
      if (i >= messageText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [paperVisible]);

  // Falling items effect
  useEffect(() => {
    if (!fallingContainerRef.current) return;

    const types = ["❤️", "🎈", "✨"];

    function createFallingItem() {
      const item = document.createElement("div");
      item.textContent = types[Math.floor(Math.random() * types.length)];
      item.style.position = "absolute";
      item.style.top = "-50px";
      item.style.left = Math.random() * 100 + "vw";
      item.style.fontSize = "24px";
      item.style.pointerEvents = "none";
      item.style.animation = `fall ${Math.random() * 2 + 2}s linear forwards`;
      fallingContainerRef.current.appendChild(item);
      setTimeout(() => fallingContainerRef.current.removeChild(item), 5000);
    }

    const interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        createFallingItem();
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes flicker {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
          

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes dropPaper {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        body,html,#root {
          margin: 0; padding: 0; height: 100%;
          background: linear-gradient(to right, #fbc2eb, #a6c1ee);
          font-family: 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          justify-content: center;
          position: relative;
          user-select: none;
        }

        .falling-container {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          pointer-events: none;
          overflow: hidden;
          z-index: 9999;
        }

        .cake-container {
          position: relative;
          width: 200px;
          height: 180px;
          cursor: pointer;
          user-select: none;
        }

        .cake {
          width: 100%;
          height: 100px;
          background: #f0ba73;
          border-radius: 10px 10px 0 0;
          position: relative;
          display: flex;
          overflow: hidden;
        }

        .slice {
          width: 40px;
          height: 100%;
          background: #f0ba73;
          border-left: 1px solid #fff;
          border-right: 1px solid #fff;
        }

        .frosting {
          width: 100%;
          height: 30px;
          background: #fff;
          border-radius: 10px 10px 0 0;
          position: absolute;
          top: -30px;
          z-index: 2;
        }

        .candles {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
        }

        .candle {
          width: 8px;
          height: 30px;
          background: yellow;
          position: relative;
        }

        .flame {
          width: 10px;
          height: 10px;
          background: orange;
          border-radius: 50%;
          position: absolute;
          top: -10px;
          left: -1px;
          animation: flicker 0.2s infinite;
        }

        .knife {
          width: 100px;
          height: 10px;
          background: silver;
          position: absolute;
          top: 0;
          left: -120px;
          transform: rotate(20deg);
          transition: left 0.3s ease-in-out;
        }

        .knife.cut {
          left: 100px;
        }

        .table {
          width: 300px;
          height: 20px;
          background: #8b5e3c;
          margin-top: -10px;
          border-radius: 10px;
        }

        .tap-to-cut {
          font-size: 18px;
          margin-top: 10px;
          color: #fff;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 20px;
          border-radius: 25px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          user-select: none;
          cursor: pointer;
        }

        .tap-to-cut:hover {
          background: #ff6f91;
        }

        /* Envelope */
        .envelope-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
          perspective: 1200px;
          user-select: none;
        }

        .envelope {
          width: 280px;
          height: 160px;
          cursor: pointer;
          position: relative;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          transform-style: preserve-3d;
          transition: transform 0.8s ease;
        }

        .envelope.flipped {
          transform: rotateY(180deg);
        }

        .envelope-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
        }

        .envelope-inner > div {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          backface-visibility: hidden;
          top: 0;
          left: 0;
        }

        .envelope-back {
          background: #c084fc;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
          z-index: 2;
          transform: rotateY(0deg);
          border: 2px solid #9f6de0;
        }

        .envelope-front {
          background: #e0aaff;
          border-radius: 10px;
          border: 2px solid #9f6de0;
          transform: rotateY(180deg);
          box-shadow: inset 0 0 40px #d7a9ff;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 10px;
          position: relative;
        }

        .flap {
          width: 0;
          height: 0;
          border-left: 140px solid transparent;
          border-right: 140px solid transparent;
          border-bottom: 70px solid #c084fc;
          position: absolute;
          top: -70px;
          left: 0;
          border-radius: 0 0 15px 15px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .envelope-text {
          margin-top: 20px;
          font-size: 18px;
          color: #fff;
          animation: blink 1s infinite;
          user-select: none;
          cursor: pointer;
        }

        /* Paper Message */
        .paper {
          width: 320px;
          background: #fff;
          border-radius: 10px;
          padding: 25px;
          color: #333;
          font-size: 18px;
          line-height: 1.4;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          animation: dropPaper 0.6s ease forwards;
          white-space: pre-wrap;
          margin-top: 20px;
          user-select: none;
        }

        /* Navigation buttons */
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
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
          user-select: none;
        }

        .slice-hide {
  opacity: 0;
  transition: opacity 0.4s ease, transform 0.4s ease;
  transform: translateY(20px) scale(0.8);
}


        .nav-btn:hover {
          transform: scale(1.05);
        }
      `}</style>

      <div className="container">
        <div className="falling-container" ref={fallingContainerRef}></div>

        {!envelopeVisible && !paperVisible && (
          <div className="cake-container" onClick={handleCutSlice}>
            <div className={`knife ${slicesLeft < 5 ? "cut" : ""}`}></div>

            <div className="candles">
              {[0, 1, 2, 3, 4].map((i) => (
                <div className="candle" key={i}>
                  {!candlesExtinguished && <div className="flame" />}
                </div>
              ))}
            </div>

            <div className="frosting"></div>

            <div className="cake">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`slice ${i >= slicesLeft ? "slice-hide" : ""}`}
                ></div>
              ))}
            </div>

            <div className="table"></div>

            <div className="tap-to-cut">Do tap five times and see 😁 </div>
          </div>
        )}

        {envelopeVisible && (
          <div
            className="envelope-wrapper"
            onClick={() => setEnvelopeFlipped(true)}
          >
            <div className={`envelope ${envelopeFlipped ? "flipped" : ""}`}>
              <div className="envelope-inner">
                <div className="envelope-back">
                  <div className="flap"></div>
                </div>
                <div className="envelope-front">
                  <div>🎁 Click to open 🎁</div>
                </div>
              </div>
            </div>
            {!envelopeFlipped && (
              <div className="envelope-text">Tap to open</div>
            )}
          </div>
        )}
        <div className="nav-buttons">
          <button onClick={() => history.back()} className="nav-btn">
            🔙 Previse
          </button>
          <button onClick={() => navigate("/gift")} className="nav-btn">
            Suprise 🤪
          </button>
        </div>
        {paperVisible && (
          <div className="paper" aria-live="polite">
            {typedText}
          </div>
        )}
      </div>
    </>
  );
};

export default Cake;
