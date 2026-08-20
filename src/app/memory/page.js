"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

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
    padding: 2rem;
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
  
  .memory-card {
    position: relative;
    z-index: 10;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(244, 166, 193, 0.3);
    border-radius: 15px;
    padding: 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transform: scale(0.9);
    animation: pop-in 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    max-width: 450px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    border: 3px solid rgba(244, 166, 193, 0.4);
    transition: transform 0.3s ease;
  }
  
  .image-wrapper:hover {
    transform: scale(1.02);
  }

  .image-wrapper img {
    width: 100%;
    height: auto;
    display: block;
  }

  .memory-text {
    margin-top: 2.5rem;
    font-size: 2rem;
    font-family: var(--font-playfair), serif;
    font-style: italic;
    color: #F4A6C1;
    text-align: center;
    text-shadow: 0 2px 10px rgba(244, 166, 193, 0.3);
  }

  @keyframes pop-in {
    0% { opacity: 0; transform: scale(0.9) translateY(20px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }

  @media (max-width: 600px) {
    .memory-card { padding: 1.5rem; }
    .memory-text { font-size: 1.5rem; margin-top: 1.5rem; }
  }
`;

const Moon = () => (
  <svg className="moon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M70,10 C40,10 20,35 20,60 C20,85 45,95 65,95 C45,85 35,65 35,45 C35,25 50,15 70,10 Z" fill="#F4D793" />
  </svg>
);

export default function MemoryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "vw",
      top: Math.random() * 100 + "vh",
      size: Math.random() * 2 + 1 + "px",
      duration: Math.random() * 3 + 2 + "s",
      delay: Math.random() * 2 + "s",
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

      <div className="memory-card">
        <div className="image-wrapper">
          <img src="/our-image.jpeg" alt="Our beautiful memory" />
        </div>
        <p className="memory-text">A beautiful memory ✨</p>
      </div>
    </div>
  );
}
