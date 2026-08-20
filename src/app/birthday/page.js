"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

const FOUR_CARDS = [
  "तुम्ही फक्त सोबत असण्याने माझा प्रत्येक दिवस brighter होतो. तुमची energy हीच माझी favorite magic आहे.",
  "तुमची smile ही या जगातली माझी सर्वात favorite गोष्ट आहे, आणि ती तुमच्या चेहऱ्यावर अशीच ठेवण्यासाठी मी आयुष्यभर प्रयत्न करेन.",
  "तुमचं प्रेम, तुमचा patience, आणि तुमच्या या incredible स्वभावासाठी मी खरोखरच खूप grateful आहे.",
  "आपल्या life च्या या wild adventures साठी, खूप साऱ्या हसण्यासाठी, आणि एकत्र beautiful memories बनवण्यासाठी... Cheers!"
];

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
  }

  .balloon svg {
    animation: sway ease-in-out infinite alternate;
    transform-origin: center bottom;
  }
  
  .emoji-floater {
    position: absolute;
    bottom: -50px;
    animation: float-up ease-in infinite, sway ease-in-out infinite alternate;
    z-index: 1;
    font-size: 1.5rem;
    opacity: 0.8;
  }

  .scene-wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: fade-up 1s ease-out forwards;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 90%;
    max-width: 900px;
    padding: 2rem;
  }

  .small-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 15px;
    padding: 2.5rem 2rem;
    text-align: center;
    color: #fff;
    font-size: 1.15rem;
    line-height: 1.6;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    opacity: 0;
    animation: fade-up-staggered 1s forwards ease-out;
  }
  
  .small-card:nth-child(1) { animation-delay: 0.2s; }
  .small-card:nth-child(2) { animation-delay: 0.6s; }
  .small-card:nth-child(3) { animation-delay: 1.0s; }
  .small-card:nth-child(4) { animation-delay: 1.4s; }

  .continue-button {
    margin-top: 3rem;
    padding: 1rem 3rem;
    background: rgba(244, 215, 147, 0.15);
    border: 1px solid #F4D793;
    color: #F4D793;
    border-radius: 50px;
    font-size: 1.2rem;
    font-family: var(--font-quicksand), sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    animation: button-glow 2s infinite alternate;
    opacity: 0;
    animation: fade-up-staggered 1s forwards ease-out 2s, button-glow 2s infinite alternate 3s;
  }

  .continue-button:hover {
    background: rgba(244, 215, 147, 0.4);
    transform: scale(1.05);
  }

  @keyframes float-up {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    8%   { opacity: 1; }
    100% { transform: translateY(-115vh) translateX(20px); opacity: 0.9; }
  }

  @keyframes sway {
    0%, 100% { transform: rotate(-4deg); }
    50%      { transform: rotate(4deg); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  
  @keyframes fade-up {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-up-staggered {
    0% { opacity: 0; transform: translateY(30px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes button-glow {
    0% { box-shadow: 0 0 5px rgba(244, 215, 147, 0.2); }
    100% { box-shadow: 0 0 20px rgba(244, 215, 147, 0.6); }
  }

  @media (max-width: 768px) {
    .cards-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
      padding: 1rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .star, .balloon, .balloon svg, .emoji-floater, .small-card, .continue-button {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
    }
    .balloon, .emoji-floater { display: none; }
  }
`;

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

export default function BirthdayPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

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

  return (
    <div className="page-container">
      <style>{styles}</style>
      
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
          className="balloon"
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

      <div className="scene-wrapper">
        <div className="cards-grid">
          {FOUR_CARDS.map((msg, index) => (
            <div key={index} className="small-card">
              {msg}
            </div>
          ))}
        </div>
        <button 
          className="continue-button"
          onClick={() => router.push("/letter")}
        >
          💖 माझं Letter वाचा
        </button>
      </div>
    </div>
  );
}
