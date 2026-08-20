"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// ==========================================
// CONFIGURATION CONSTANTS
// ==========================================
const FIANCEE_NAME = "My Love";
const YOUR_NAME = "Your Future Husband";
const MESSAGE = `जगातल्या सर्वात amazing व्यक्तीला Happy Birthday! तुझ्यासोबतचा प्रत्येक दिवस एखाद्या सुंदर dream सारखा आहे. तुला माझ्या life मध्ये पाहुन मी स्वतःला खूप lucky समजते. आपण share केलेल्या सगळ्या सुंदर क्षणांसाठी आणि भविष्यात येणाऱ्या अशाच अनेक गोड क्षणांसाठी... I love you more than words can say.`;

// ==========================================
// CSS STYLES
// ==========================================
const styles = `
  .page-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #0B1026, #1B2151, #060814);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: var(--font-quicksand), sans-serif;
  }

  .moon {
    position: absolute;
    top: 5%;
    right: 10%;
    width: 100px;
    height: 100px;
    filter: drop-shadow(0 0 20px rgba(244, 215, 147, 0.6));
    z-index: 1;
  }

  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle linear infinite;
  }

  .balloon {
    position: absolute;
    bottom: -140px;
    animation: float-up ease-in infinite;
    z-index: 2;
    cursor: crosshair;
  }

  .balloon svg {
    animation: sway ease-in-out infinite alternate;
    transform-origin: center bottom;
    transition: transform 0.1s ease;
  }
  
  .balloon:hover svg {
    filter: brightness(1.1);
  }

  .balloon.popped svg {
    display: none;
  }
  
  .emoji-floater {
    position: absolute;
    bottom: -50px;
    animation: float-up ease-in infinite, sway ease-in-out infinite alternate;
    z-index: 1;
    font-size: 1.5rem;
    opacity: 0.8;
  }

  .sparkle {
    position: fixed;
    pointer-events: none;
    z-index: 3;
    animation: pop-sparkle 0.5s ease-out forwards;
  }

  .hero {
    text-align: center;
    z-index: 10;
    margin-bottom: 2rem;
  }

  .eyebrow {
    font-size: 1.2rem;
    font-style: normal;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: var(--font-quicksand), sans-serif;
    color: #F4D793;
    opacity: 0.9;
    margin-bottom: 0.5rem;
  }

  .headline {
    font-size: 4rem;
    font-family: var(--font-playfair), serif;
    font-style: italic;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    animation: glow-pulse 3s ease-in-out infinite alternate;
  }
  
  .sub-headline {
    font-size: 2.5rem;
    font-family: var(--font-playfair), serif;
    color: #F4A6C1;
    margin-top: 0.5rem;
  }

  .scene {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: flex-end;
    gap: 20px;
    margin-top: 2rem;
  }

  .teddy-bear {
    width: 150px;
    animation: bear-bob 3s ease-in-out infinite alternate;
  }

  .cake-container {
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
    width: 200px;
  }
  
  .cake-container:hover {
    transform: scale(1.05);
  }

  .flame {
    transform-origin: bottom center;
    animation: flicker 0.1s ease-in-out infinite alternate;
    transition: opacity 1s ease, transform 1s ease;
  }

  .flame.blown-out {
    opacity: 0;
    transform: scale(0);
    animation: none;
  }

  .message-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(244, 166, 193, 0.5); /* Soft pink border */
    border-radius: 20px;
    padding: 3rem;
    width: 90%;
    max-width: 600px;
    text-align: center;
    z-index: 20;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .message-card.visible {
    animation: fade-up 1.5s forwards ease-out;
    pointer-events: auto;
  }

  .message-text {
    font-size: 1.25rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #fff;
  }

  .signature {
    font-size: 1.5rem;
    font-family: var(--font-playfair), serif;
    font-style: italic;
    color: #F4D793; /* Gold */
  }

  .continue-button {
    margin-top: 2rem;
    padding: 0.8rem 2.5rem;
    background: rgba(244, 215, 147, 0.1);
    border: 1px solid #F4D793;
    color: #F4D793;
    border-radius: 50px;
    font-size: 1.1rem;
    font-family: var(--font-quicksand), sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: button-glow 2s infinite alternate;
  }

  .continue-button:hover {
    background: rgba(244, 215, 147, 0.3);
    transform: scale(1.05);
  }

  .confetti-piece {
    position: fixed;
    width: 10px;
    height: 20px;
    background: #F4A6C1;
    z-index: 30;
    animation: confetti-fall 3s linear forwards;
    opacity: 0;
  }

  /* Keyframes */
  @keyframes float-up {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    8%   { opacity: 1; }
    100% { transform: translateY(-115vh) translateX(20px); opacity: 0.9; }
  }

  @keyframes sway {
    0%, 100% { transform: rotate(-4deg); }
    50%      { transform: rotate(4deg); }
  }

  @keyframes pop-sparkle {
    0% { opacity: 1; transform: scale(0.5); }
    100% { opacity: 0; transform: scale(2); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @keyframes bear-bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(-10px); }
  }

  @keyframes flicker {
    0% { transform: scale(1) skewX(-2deg); opacity: 0.9; }
    100% { transform: scale(1.1) skewX(2deg); opacity: 1; }
  }

  @keyframes glow-pulse {
    0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(244, 215, 147, 0.2); }
    100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(244, 215, 147, 0.4); }
  }
  
  @keyframes button-glow {
    0% { box-shadow: 0 0 5px rgba(244, 215, 147, 0.2); }
    100% { box-shadow: 0 0 20px rgba(244, 215, 147, 0.6); }
  }

  @keyframes fade-up {
    0% { opacity: 0; transform: translate(-50%, -30%); }
    100% { opacity: 1; transform: translate(-50%, -50%); }
  }

  @keyframes confetti-fall {
    0% { opacity: 1; transform: translateY(-100px) rotate(0deg); }
    100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
  }

  @media (max-width: 768px) {
    .headline { font-size: 2.5rem; }
    .sub-headline { font-size: 1.8rem; }
    .scene { flex-direction: column; align-items: center; }
    .message-card { padding: 2rem; }
    .message-text { font-size: 1.1rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .star, .balloon, .balloon svg, .emoji-floater, .teddy-bear, .flame, .headline, .message-card.visible, .confetti-piece {
      animation: none !important;
    }
    .balloon, .emoji-floater { display: none; }
    .message-card { transition: opacity 0.5s ease; }
    .message-card.visible { opacity: 1; transform: translate(-50%, -50%); }
  }
`;

// ==========================================
// SVGS
// ==========================================
const Moon = () => (
  <svg className="moon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M70,10 C40,10 20,35 20,60 C20,85 45,95 65,95 C45,85 35,65 35,45 C35,25 50,15 70,10 Z" fill="#F4D793" />
  </svg>
);

const Balloon = ({ color, style }) => {
  const colorId = color.replace("#", "");
  return (
    <svg style={style} viewBox="0 0 100 125" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`bg-${colorId}`} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor={color} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="45" rx="38" ry="45" fill={`url(#bg-${colorId})`} />
      <path d="M50 90 L44 98 L56 98 Z" fill={color} />
      <line x1="50" y1="98" x2="50" y2="125" stroke="rgba(251,247,240,0.5)" strokeWidth="2" />
    </svg>
  );
};

const TeddyBear = () => (
  <svg className="teddy-bear" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="25" fill="#8B5A2B" />
    <circle cx="50" cy="50" r="15" fill="#D2B48C" />
    <circle cx="150" cy="50" r="25" fill="#8B5A2B" />
    <circle cx="150" cy="50" r="15" fill="#D2B48C" />
    <circle cx="100" cy="90" r="60" fill="#8B5A2B" />
    <ellipse cx="100" cy="110" rx="35" ry="25" fill="#D2B48C" />
    <ellipse cx="100" cy="100" rx="10" ry="7" fill="#000" />
    <path d="M100 107 Q100 120 110 120" stroke="#000" strokeWidth="2" fill="none" />
    <path d="M100 107 Q100 120 90 120" stroke="#000" strokeWidth="2" fill="none" />
    <circle cx="75" cy="75" r="7" fill="#000" />
    <circle cx="77" cy="73" r="2" fill="#fff" />
    <circle cx="125" cy="75" r="7" fill="#000" />
    <circle cx="127" cy="73" r="2" fill="#fff" />
    <ellipse cx="100" cy="170" rx="65" ry="50" fill="#8B5A2B" />
    <ellipse cx="100" cy="175" rx="40" ry="30" fill="#D2B48C" />
    <ellipse cx="40" cy="140" rx="20" ry="40" fill="#8B5A2B" transform="rotate(30 40 140)" />
    <ellipse cx="160" cy="140" rx="20" ry="40" fill="#8B5A2B" transform="rotate(-30 160 140)" />
  </svg>
);

const Cake = ({ candlesBlownOut, onClick }) => (
  <div className="cake-container" onClick={onClick}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="180" rx="90" ry="15" fill="#EAEAEA" />
      <ellipse cx="100" cy="182" rx="90" ry="15" fill="none" stroke="#ccc" strokeWidth="2" />
      <path d="M30 175 Q100 190 170 175 L170 120 Q100 135 30 120 Z" fill="#F4A6C1" />
      <path d="M30 120 Q100 135 170 120 Q100 105 30 120 Z" fill="#D98A9F" />
      <path d="M50 125 Q100 135 150 125 L150 80 Q100 90 50 80 Z" fill="#fff" />
      <path d="M50 80 Q100 90 150 80 Q100 70 50 80 Z" fill="#E8E8E8" />
      <rect x="75" y="45" width="8" height="35" fill="#8FE3CF" rx="2" />
      <rect x="117" y="45" width="8" height="35" fill="#8FE3CF" rx="2" />
      <path d="M75 50 Q79 55 83 50 M75 60 Q79 65 83 60 M75 70 Q79 75 83 70" stroke="#fff" strokeWidth="1" fill="none" />
      <path d="M117 50 Q121 55 125 50 M117 60 Q121 65 125 60 M117 70 Q121 75 125 70" stroke="#fff" strokeWidth="1" fill="none" />
      
      <g className={`flame ${candlesBlownOut ? 'blown-out' : ''}`}>
        <path d="M79 40 C75 35 75 25 79 20 C83 25 83 35 79 40 Z" fill="#F4D793" />
        <path d="M79 38 C77 34 77 28 79 24 C81 28 81 34 79 38 Z" fill="#FF9A00" />
      </g>
      <g className={`flame ${candlesBlownOut ? 'blown-out' : ''}`}>
        <path d="M121 40 C117 35 117 25 121 20 C125 25 125 35 121 40 Z" fill="#F4D793" />
        <path d="M121 38 C119 34 119 28 121 24 C123 28 123 34 121 38 Z" fill="#FF9A00" />
      </g>
    </svg>
  </div>
);

const Sparkle = () => (
  <svg viewBox="0 0 100 100" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#F4D793" />
    <circle cx="20" cy="20" r="5" fill="#F4A6C1" />
    <circle cx="80" cy="20" r="5" fill="#8FE3CF" />
    <circle cx="20" cy="80" r="5" fill="#C9B6E4" />
    <circle cx="80" cy="80" r="5" fill="#F4A6C1" />
  </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function BirthdayPage() {
  const router = useRouter();
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [poppedBalloons, setPoppedBalloons] = useState(new Set());
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      top: Math.random() * 60 + "vh",
      size: Math.random() * 2 + 1 + "px",
      duration: Math.random() * 3 + 2 + "s",
      delay: Math.random() * 2 + "s",
    }));
  }, []);

  const balloons = useMemo(() => {
    const BALLOON_COLORS = ["#F4A6C1", "#8FE3CF", "#F4D793", "#C9B6E4", "#F2867B"];
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      color: BALLOON_COLORS[i % BALLOON_COLORS.length],
      left: 5 + i * 11 + Math.random() * 5 + "vw",
      delay: "-" + (Math.random() * 6) + "s",
      duration: 10 + Math.random() * 6 + "s",
      size: 55 + Math.random() * 25 + "px",
      swayDuration: 3 + Math.random() * 2 + "s",
    }));
  }, []);

  const emojis = useMemo(() => {
    const EMOJIS = ["🤍", "✨", "💫", "🎈", "🌸"];
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      char: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100 + "vw",
      delay: "-" + (Math.random() * 15) + "s",
      duration: 12 + Math.random() * 8 + "s",
      swayDuration: 3 + Math.random() * 3 + "s",
    }));
  }, []);

  const handleCakeClick = () => {
    if (candlesBlownOut) return;
    setCandlesBlownOut(true);
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: 20 + Math.random() * 60 + "vw",
      color: ["#F4A6C1", "#8FE3CF", "#F4D793", "#C9B6E4", "#F2867B"][
        Math.floor(Math.random() * 5)
      ],
      duration: Math.random() * 2 + 2 + "s",
    }));
    setConfetti(newConfetti);
  };

  const handleBalloonClick = (b, e) => {
    if (poppedBalloons.has(b.id)) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setPoppedBalloons((prev) => new Set(prev).add(b.id));
    
    const newSparkle = {
      id: Math.random(),
      left: rect.left + rect.width / 2 - 20 + "px",
      top: rect.top + rect.height / 2 - 20 + "px",
    };
    
    setSparkles((prev) => [...prev, newSparkle]);
    
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 500);
  };

  return (
    <div className="page-container">
      <style>{styles}</style>
      
      {/* Background Elements */}
      <Moon />
      {mounted && stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
      
      {mounted && emojis.map((e) => (
        <div
          key={`emoji-${e.id}`}
          className="emoji-floater"
          style={{
            left: e.left,
            animationDuration: `${e.duration}, ${e.swayDuration}`,
            animationDelay: `${e.delay}, 0s`,
          }}
        >
          {e.char}
        </div>
      ))}

      {mounted && balloons.map((b) => (
        <div
          key={`balloon-${b.id}`}
          className={`balloon ${poppedBalloons.has(b.id) ? "popped" : ""}`}
          onClick={(e) => handleBalloonClick(b, e)}
          style={{
            left: b.left,
            animationDuration: b.duration,
            animationDelay: b.delay,
          }}
        >
          <Balloon color={b.color} style={{
            width: b.size,
            height: "auto",
            animationDuration: b.swayDuration,
          }} />
        </div>
      ))}

      {sparkles.map((s) => (
        <div
          key={`sparkle-${s.id}`}
          className="sparkle"
          style={{ left: s.left, top: s.top }}
        >
          <Sparkle />
        </div>
      ))}

      {/* Hero Section */}
      <div className="hero">
        <p className="eyebrow">🌙 माझ्या future husband साठी एक छोटंसं surprise ✨</p>
        <h1 className="headline">🎉 Happy Birthday 🎂</h1>
        <h2 className="sub-headline">{FIANCEE_NAME}</h2>
      </div>

      {/* Interactive Scene */}
      <div className="scene">
        <TeddyBear />
        <Cake candlesBlownOut={candlesBlownOut} onClick={handleCakeClick} />
      </div>

      {/* Message Reveal Card */}
      <div className={`message-card ${candlesBlownOut ? "visible" : ""}`}>
        <p className="message-text">{MESSAGE}</p>
        <p className="signature">— तुझीच 🤍</p>
        <button 
          className="continue-button"
          onClick={() => router.push("/birthday")}
        >
          💌 Continue
        </button>
      </div>

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={`confetti-${c.id}`}
          className="confetti-piece"
          style={{
            left: c.left,
            top: "50%",
            backgroundColor: c.color,
            animationDuration: c.duration,
          }}
        />
      ))}
    </div>
  );
}
