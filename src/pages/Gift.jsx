import { useEffect, useState } from "react";

export default function Gift() {
  const [showGift, setShowGift] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const container = document.querySelector(".falling-container");
    if (!container) return;

    const interval = setInterval(() => {
      const emojis = ["❤️", "🎈", "✨"];
      for (let i = 0; i < 5; i++) {
        const el = document.createElement("div");
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = "absolute";
        el.style.top = "-30px";
        el.style.left = Math.random() * 100 + "vw";
        el.style.fontSize = "24px";
        el.style.animation = `fall ${2 + Math.random() * 2}s linear forwards`;
        container.appendChild(el);
        setTimeout(() => el.remove(), 5000);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setShowGift(false);
    setShowPhoto(true);

    const text = ` Devi your birthday gift is a flower bouquet. It’s a little late 😅 — but just like I said, it might be late, but it'll be worth it! So... how was the gift? 😄
And let me wish you one last time...

Thought I would impress with tulips… When I look at you, the real blush is hidden in your eyes.
Happy Birthday, Kiran👻
Not just today, but the whole year should be like this — because you deserve non-stop pampering 😁💕`;

    let i = 0;
    const speed = 40;
    setTypedText("");
    function type() {
      if (i < text.length) {
        setTypedText((prev) => prev + text.charAt(i));
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  };

  return (
    <>
      <style>{`
        body {
          margin: 0; padding: 0; background: linear-gradient(to right, #fbc2eb, #a6c1ee);
          height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow-y: auto;
        }
        .falling-container {
          pointer-events: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 1;
        }
        @keyframes fall {
          to { transform: translateY(100vh); opacity: 0; }
        }
        .gift-box {
          width: 180px; height: 180px; background: linear-gradient(145deg, #ff416c, #ff4b2b);
          border-radius: 20px; box-shadow: 0 8px 15px rgba(0,0,0,0.3);
          cursor: pointer; display: flex; justify-content: center; align-items: center;
          position: relative; user-select: none; z-index: 10;
        }
        .ribbon-vertical, .ribbon-horizontal {
          position: absolute; background: linear-gradient(145deg, #fff0f2, #fcd8de);
          border-radius: 10px;
        }
        .ribbon-vertical {
          top: 0; left: 50%; width: 35px; height: 100%; transform: translateX(-50%);
          box-shadow: inset 2px 0 5px rgba(255, 255, 255, 0.8), inset -2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }
        .ribbon-horizontal {
          top: 50%; left: 0; width: 100%; height: 35px; transform: translateY(-50%);
          box-shadow: inset 2px 0 5px rgba(255, 255, 255, 0.8), inset -2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 2;
        }
        .bow {
          position: absolute; top: 20px; left: 50%; width: 70px; height: 60px;
          transform: translateX(-50%);
          display: flex; justify-content: center; align-items: center; gap: 6px;
          z-index: 3;
        }
        .bow-part {
          width: 32px; height: 60px; background: linear-gradient(145deg, #fff0f2, #fcd8de);
          border-radius: 50% 50% 0 0;
          transform-origin: bottom center;
          animation: bowPulse 2.5s ease-in-out infinite;
        }
        .bow-part.left {
          border-radius: 60% 40% 0 0; transform: rotate(-25deg); animation-delay: 0s;
        }
        .bow-part.right {
          border-radius: 40% 60% 0 0; transform: rotate(25deg); animation-delay: 1.25s;
        }
        .bow-knot {
          position: absolute; top: 40px; left: 50%; width: 18px; height: 18px;
          background: #ff416c; border-radius: 50%; transform: translateX(-50%);
          animation: knotPulse 2.5s ease-in-out infinite;
          z-index: 4;
        }
        @keyframes bowPulse {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.1); }
        }
        @keyframes knotPulse {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.2); }
        }
        .revealed-photo {
  max-width: 80vw;
  max-height: 50vh;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  margin: 40px auto 20px; /* center horizontally with auto margins and more top margin */
  display: block; /* to apply horizontal centering */
  object-fit: cover;
  position: relative;
  z-index: 20;
}
        .typewriter-text {
          font-size: 1.3rem; font-style: italic; font-weight: 700;
          font-family: 'Georgia', serif; max-width: 700px; text-align: center;
          background: rgba(255,255,255,0.75); padding: 25px 35px;
          border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          white-space: pre-wrap; border-right: 3px solid rgba(0,0,0,0.6);
          margin-bottom: 40px; line-height: 1.5; position: relative; z-index: 20;
        }
        .nav-buttons {
  position: fixed;
  bottom: 20px;
  left: 20px;    /* changed from center to left */
  display: flex;
  justify-content: flex-start;
  z-index: 30;
  width: auto; /* no full width */
}
       .nav-btn {
  background: linear-gradient(to right, #f472b6, #c084fc);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
       .nav-btn:hover {
  transform: scale(1.05);
}
      `}</style>

      <div className="falling-container"></div>

      {showGift ? (
        <div className="gift-box" title="Click me!" onClick={handleClick}>
          <div className="ribbon-vertical"></div>
          <div className="ribbon-horizontal"></div>
          <div className="bow">
            <div className="bow-part left"></div>
            <div className="bow-part right"></div>
            <div className="bow-knot"></div>
          </div>
        </div>
      ) : (
        <>
          <img
  src={`${import.meta.env.BASE_URL}images/final_photo.png`}
  alt="Birthday"
  className="revealed-photo"
/>

          <div className="typewriter-text">{typedText}</div>
        </>
      )}

      <div className="nav-buttons">
        <button className="nav-btn" onClick={() => history.back()}>
          🔙 Previse
        </button>
      </div>
    </>
  );
}