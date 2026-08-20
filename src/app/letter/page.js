"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

// ==========================================
// CONFIGURATION CONSTANTS
// ==========================================
const LETTER_PARAGRAPHS = [
  "तुम्हाला ३ एप्रिल आठवतंय का? 📅 त्या दिवशी तुम्ही मला एक video पाठवला होता. मी तो बघितला... आणि काहीच रिप्लाय नाही दिला. 🙈 मला माहितीये, तुम्हाला तेव्हा नक्कीच वाटलं असेल की माझ्या डोक्यात काय चाललंय. काही दिवसांनंतर, तुम्ही अजून एक video पाठवलात — आणि तेव्हा मी finally तुम्हाला विचारलं की तुम्हाला काही बोलायचं आहे का. 💬 तुम्ही नाही म्हणालात. पण कसं कोण जाणे, त्या एका छोट्याश्या क्षणापासून, आपली journey through text हळूहळू सुरू झाली. 📱✨",
  "आपण बोलायला लागलो, सावकाश, जपत, एका वेळी एका message मधून एकमेकांना समजून घेत. 💌",
  "मग एक दिवस, माझ्या आईने मला तुमच्याबद्दल विचारलं. 👩‍👧 मला माहित नाही का, पण second thought न देता मी हो म्हणाले — मी ready आहे. 💖 मी फक्त तिला एवढंच सांगितलं की मला आधी तुमच्याशी एकदा बोलायचं आहे.",
  "त्या रात्री, आमची सगळी family एकत्र बसली आणि आपल्याबद्दल बोलत होती. 🏡 माझ्या बाबांनी मला तुमच्याबद्दल गोष्टी सांगितल्या, आणि मी त्यांना सारखे प्रश्न विचारत राहिले — तुम्ही कसे आहात, कोणत्या स्वभावाचे आहात. 🤔 मग त्यांनी मला एकच गोष्ट विचारली: तू ready आहेस का? मी हो म्हणाले. 💕 त्याच रात्री, बाबांनी तुम्हाला message केला आणि सांगितलं की ते उद्या तुमच्या घरी येतील. आणि त्या रात्री, आपल्या बाबांचं पहिल्यांदा एकमेकांशी बोलणं झालं. 📞🤝",
  "एका आठवड्यानंतर, तुम्ही माझ्या बाबांना विचारलंत की आपण पुण्याला तुमच्या घरी येऊन बोलू शकतो का. 🚗 बाबा म्हणाले की माझ्या exams चालू आहेत. 📚 पण तुम्ही म्हणालात नाही — तुम्हाला स्वतः येऊन त्यांच्या मुलीशी बोलायचं आहे. 🥺 म्हणून २७ एप्रिलला, संध्याकाळी, तुम्ही तुमच्या parents सोबत आलात, आणि आपण finally बोललो — face to face, सर्वांसमोर. 😳 आणि तोच दिवस होता जेव्हा आपलं सगळं official झालं. 🎉💍",
  "त्यानंतर, मी माझ्या घरच्यांना सांगितलं की मला स्वतः तुम्हाला personally भेटायचं आहे. आणि ७ मे, २०२६ ला, आपण finally भेटलो. 🗓️ तुम्ही मला घ्यायला आला होतात. त्या दिवशी तुम्ही खूप handsome दिसत होतात. 🥰 पहिल्या पाच, कदाचित सात मिनिटांसाठी, आपल्या दोघांपैकी कुणीच एक शब्दही नाही बोललं. 🙊 आणि मग, अचानक आपण बोलायला सुरुवात केली — आणि तेव्हापासून आपण खरंच थांबलोच नाही. ♾️❤️",
  "त्या दिवशी आपण Lavasa ला गेलो. 🏞️ मी तिथे आधी कधीच गेले नव्हते — ती माझी first time होती, आणि ती पण तुमच्यासोबत. आता ती जगातली माझी सर्वात favourite place आहे. 🌍✨",
  "त्या दिवसापासून आजपर्यंत, मी तुमच्यासोबत खूप खुश आहे. 😊 मला माहितीये मी कधीकधी थोडी crazy वागते 🤪, पण तरीही तुम्ही मला नेहमीच समजून घेता. तेव्हापासून प्रत्येक दिवशी, मला तुमची असल्याचा खूप lucky feel होतो. 🍀💘",
  "म्हणून आज, तुमच्या birthday ला, मला तुम्हाला फक्त एवढंच सांगायचं आहे — माझ्या आयुष्याच्या शेवटपर्यंत, तुमची ही मुलगी तुम्हाला सोडून कुठेही जाणार नाहीये. 🔒❤️ मला तुम्हाला life मध्ये खूप successful झालेलं पाहायचं आहे. 🌟 आणि तुमची पहिली car 🚘 — मला माहितीये बाकी सर्वांसाठी ती फक्त एक car असेल, पण माझ्यासाठी ती नेहमीच special असेल, कारण ती आपल्या story चा एक भाग आहे. 🛣️",
  "Life मध्ये ups and downs येत राहतील. 🎢 पण काहीही झालं तरी, मी तुमच्यासोबत आहे. Forever. 🤝💖",
  "I love you. ❤️🥺",
  "— तुमचीच 🤍✨"
];

// ==========================================
// CSS STYLES
// ==========================================
const styles = `
  .page-container {
    min-height: 100vh;
    background: linear-gradient(to bottom, #0B1026, #1B2151, #060814);
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: var(--font-quicksand), sans-serif;
    padding: 4rem 1rem;
  }

  .moon {
    position: fixed;
    top: 5%;
    right: 10%;
    width: 100px;
    height: 100px;
    filter: drop-shadow(0 0 20px rgba(244, 215, 147, 0.6));
    z-index: 1;
  }

  .star {
    position: fixed;
    background: white;
    border-radius: 50%;
    animation: twinkle linear infinite;
  }

  .balloon {
    position: fixed;
    bottom: -140px;
    animation: float-up ease-in infinite;
    z-index: 2;
  }

  .balloon svg {
    animation: sway ease-in-out infinite alternate;
    transform-origin: center bottom;
  }
  
  .emoji-floater {
    position: fixed;
    bottom: -50px;
    animation: float-up ease-in infinite, sway ease-in-out infinite alternate;
    z-index: 1;
    font-size: 1.5rem;
    opacity: 0.8;
  }

  /* Letter Card */
  .letter-card {
    position: relative;
    z-index: 10;
    width: 90%;
    max-width: 700px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(244, 166, 193, 0.3);
    border-radius: 10px;
    padding: 3rem 2.5rem;
    color: #fff;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    transform-origin: top center;
    opacity: 0;
    transform: scaleY(0.8);
    animation: unfold 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }

  .letter-header {
    font-family: var(--font-playfair), serif;
    font-style: italic;
    font-size: 2.5rem;
    color: #F4A6C1;
    text-align: center;
    margin-bottom: 2.5rem;
    text-shadow: 0 2px 10px rgba(244, 166, 193, 0.3);
  }

  .letter-text {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }

  .letter-text:last-of-type {
    font-family: var(--font-playfair), serif;
    font-style: italic;
    font-size: 1.5rem;
    color: #F4A6C1;
    text-align: right;
    margin-top: 3rem;
  }

  /* Reply Form */
  .reply-container {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px dashed rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .reply-label {
    font-size: 1.1rem;
    font-family: var(--font-playfair), serif;
    font-style: italic;
    color: #F4D793;
    margin-bottom: 1rem;
  }

  .reply-textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(244, 166, 193, 0.5);
    border-radius: 12px;
    padding: 1rem;
    color: #fff;
    font-family: var(--font-quicksand), sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    resize: vertical;
    min-height: 100px;
    outline: none;
    transition: all 0.3s ease;
  }

  .reply-textarea:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: #F4A6C1;
    box-shadow: 0 0 10px rgba(244, 166, 193, 0.2);
  }

  .send-button {
    margin-top: 1rem;
    padding: 0.8rem 2.5rem;
    background: linear-gradient(135deg, #F4A6C1, #C9B6E4);
    border: none;
    color: #0B1026;
    font-weight: bold;
    border-radius: 50px;
    font-size: 1.1rem;
    font-family: var(--font-quicksand), sans-serif;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: flex-end;
  }

  .send-button:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(244, 166, 193, 0.4);
  }

  .success-message {
    text-align: center;
    color: #fff;
    font-size: 1.2rem;
    animation: fade-up 1s forwards ease-out;
  }
  .success-icons {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  /* Video Player */
  .video-container {
    margin: 2rem 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .story-video {
    width: 100%;
    max-width: 400px;
    border-radius: 12px;
    border: 2px solid rgba(244, 166, 193, 0.4);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: #000;
  }

  /* Keyframes */
  @keyframes unfold {
    0% { opacity: 0; transform: scaleY(0.8) translateY(-20px); }
    100% { opacity: 1; transform: scaleY(1) translateY(0); }
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
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    .letter-card { padding: 2rem 1.5rem; }
    .letter-text { font-size: 1.1rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .star, .balloon, .balloon svg, .emoji-floater, .letter-card {
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

export default function LetterPage() {
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

      <div className="letter-card">
        <h1 className="letter-header">Our Little Journey ✨</h1>
        {LETTER_PARAGRAPHS.map((p, i) => (
          <div key={i}>
            <p className="letter-text">{p}</p>
            {/* Show the video exactly after the first paragraph where the video is mentioned */}
            {i === 0 && (
              <div className="video-container">
                <video controls className="story-video" src="/our-video.mp4">
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>
        ))}
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <button 
            style={{ padding: '0.8rem 2.5rem', background: 'linear-gradient(135deg, #F4A6C1, #C9B6E4)', border: 'none', color: '#0B1026', fontWeight: 'bold', borderRadius: '50px', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}
            onClick={() => router.push("/memory")}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(244, 166, 193, 0.4)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            📸 एक गोड आठवण (Next Page)
          </button>
        </div>
      </div>
    </div>
  );
}
