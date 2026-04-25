import { useState, useEffect, useRef } from "react";
import img1 from "./assets/1.jpeg";
import img2 from "./assets/2.jpeg";
import img3 from "./assets/3.jpeg";
import img4 from "./assets/4.jpeg";
import img5 from "./assets/5.jpeg";
import img6 from "./assets/6.jpeg";
 
const memories = [
  {
    id: 1,
    image: img1,
    title: "Our First Date",
    date: "15 January 2026",
    location: "Chittagong",
    description: "Me and you — that’s all I need. Noha..",
  },
  {
    id: 2,
    image: img2,
    title: "Me and My Forever 💖",
    date: "January 2026",
    location: "Chittagong",
    description: "I found my forever in a single moment with you..",
  },
  {
    id: 3,
    image: img3,
    title: "Selfie with my Chinese",
    date: "January 2026",
    location: "Patenga Beach",
    description: "Life feels perfect with you.",
  },
  {
    id: 4,
    image: img4,
    title: "Just us…",
    date: "January 2026",
    location: "Patenga Beach",
    description: "Every moment with you feels like a beautiful scene from a movie.",
  },
  {
    id: 5,
    image: img5,
    title: "Just perfect",
    date: "Special Day 2026",
    location: "Patenga Beach",
    description: "A day filled with love, laughter, and unforgettable moments.",
  },
  {
    id: 6,
    image: img6,
    title: "My everything.",
    date: "My Best Day In Life",
    location: "Patenga Beach",
    description: "The simple moments that mean everything to me.",
  },
];
 
function FloatingHeart({ style }) {
  return (
    <div style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <svg viewBox="0 0 32 32" width="100%" height="100%" fill="currentColor">
        <path d="M16 28s-14-9.5-14-18a8 8 0 0 1 14-5.3A8 8 0 0 1 30 10c0 8.5-14 18-14 18z" />
      </svg>
    </div>
  );
}
 
function Candle({ x, color }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      <rect x="-4" y="-28" width="8" height="28" rx="3" fill={color} />
      <ellipse cx="0" cy="-30" rx="5" ry="8" fill="#FFD700" opacity="0.9" />
      <ellipse cx="0" cy="-34" rx="3" ry="5" fill="#FF8C00" opacity="0.8" />
      <ellipse cx="0" cy="-37" rx="2" ry="3" fill="#FFF" opacity="0.6" />
    </g>
  );
}
 
function Cake3D() {
  const canvasRef = useRef(null);
  const rotY = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const raf = useRef(null);
 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let angle = 0;
 
    function drawEllipse(cx, cy, rx, ry, color, stroke) {
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
    }
 
    function drawCylinder(cx, topY, botY, rx, ry, topColor, sideColor, rimColor) {
      // side
      ctx.beginPath();
      ctx.ellipse(cx, botY, rx, ry, 0, 0, Math.PI);
      ctx.lineTo(cx - rx, topY);
      ctx.ellipse(cx, topY, rx, ry, 0, Math.PI, 0);
      ctx.lineTo(cx + rx, botY);
      ctx.closePath();
      ctx.fillStyle = sideColor;
      ctx.fill();
      // top face
      drawEllipse(cx, topY, rx, ry, topColor, rimColor);
    }
 
    function drawCandle(cx, baseY, candleColor) {
      const h = 22, r = 5, ry2 = 3;
      drawCylinder(cx, baseY - h, baseY, r, ry2, candleColor, candleColor, "rgba(255,255,255,0.3)");
      // flame
      ctx.beginPath();
      ctx.ellipse(cx, baseY - h - 10, 5, 9, 0, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(cx, baseY - h - 12, 1, cx, baseY - h - 8, 9);
      grad.addColorStop(0, "#fff");
      grad.addColorStop(0.4, "#FFE066");
      grad.addColorStop(1, "rgba(255,120,0,0)");
      ctx.fillStyle = grad;
      ctx.fill();
    }
 
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const a = angle;
 
      // Shadow
      ctx.beginPath();
      ctx.ellipse(cx, 290, 90, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180,60,100,0.18)";
      ctx.fill();
 
      // Tier 1 (bottom)
      drawCylinder(cx, 195, 280, 85 + Math.sin(a) * 3, 22, "#E91E8C", "#C2185B", "#F48FB1");
      // Decoration dots tier 1
      for (let i = 0; i < 8; i++) {
        const da = (i / 8) * Math.PI * 2 + a;
        const dx = cx + Math.cos(da) * 75;
        const dy = 240 + Math.sin(da) * 15;
        ctx.beginPath();
        ctx.arc(dx, dy, 5, 0, Math.PI * 2);
        ctx.fillStyle = ["#FFD700", "#FF69B4", "#FFF", "#FF4081", "#FFE082"][i % 5];
        ctx.fill();
      }
 
      // Tier 2 (middle)
      drawCylinder(cx, 130, 200, 62 + Math.sin(a + 0.5) * 2, 16, "#F06292", "#AD1457", "#FCE4EC");
      for (let i = 0; i < 6; i++) {
        const da = (i / 6) * Math.PI * 2 + a * 1.3;
        const dx = cx + Math.cos(da) * 52;
        const dy = 165 + Math.sin(da) * 12;
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fillStyle = ["#FFF176", "#FF80AB", "#E1F5FE", "#FFAB40"][i % 4];
        ctx.fill();
      }
 
      // Tier 3 (top)
      drawCylinder(cx, 75, 135, 42 + Math.sin(a + 1) * 2, 11, "#F8BBD9", "#880E4F", "#FCE4EC");
 
      // Heart on top tier
      ctx.save();
      ctx.translate(cx, 85);
      ctx.fillStyle = "#FF1744";
      ctx.font = "bold 20px serif";
      ctx.textAlign = "center";
      ctx.fillText("♥", 0, 0);
      ctx.restore();
 
      // Candles
      const candleColors = ["#FF6F00", "#6A1B9A", "#1565C0", "#2E7D32", "#C62828"];
      [ -22, 0, 22].forEach((off, i) => {
        drawCandle(cx + off, 75, candleColors[i]);
      });
 
      // Frosting drips tier 2
      for (let i = 0; i < 5; i++) {
        const da = (i / 5) * Math.PI + a;
        const dx = cx + Math.cos(da) * 55;
        const dy = 200;
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.bezierCurveTo(dx - 4, dy + 12, dx + 4, dy + 18, dx, dy + 22);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.stroke();
      }
 
      angle += 0.008;
      raf.current = requestAnimationFrame(render);
    }
 
    render();
 
    const onDown = (e) => { dragging.current = true; lastX.current = e.clientX || e.touches?.[0]?.clientX; };
    const onMove = (e) => {
      if (!dragging.current) return;
      const x = e.clientX || e.touches?.[0]?.clientX;
      angle += (x - lastX.current) * 0.015;
      lastX.current = x;
    };
    const onUp = () => { dragging.current = false; };
 
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
 
    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);
 
  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={310}
      style={{ cursor: "grab", display: "block", margin: "0 auto" }}
    />
  );
}
 
export default function App() {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [visible, setVisible] = useState(false);
  const hearts = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      left: `${(i * 37 + 11) % 100}%`,
      top: `${(i * 53 + 7) % 100}%`,
      size: 14 + (i % 5) * 8,
      delay: `${(i * 0.4) % 4}s`,
      duration: `${3 + (i % 4)}s`,
      color: ["#FF80AB","#F48FB1","#FF4081","#FFD6E0","#FF1744","#FCE4EC"][i % 6],
      opacity: 0.18 + (i % 4) * 0.07,
    }))
  ).current;
 
  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);
 
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400&display=swap');
 
    * { box-sizing: border-box; margin: 0; padding: 0; }
 
    body {
      font-family: 'Lato', sans-serif;
      background: #FFF0F5;
    }
 
    .page {
      min-height: 100vh;
      background: linear-gradient(135deg, #FFF0F5 0%, #FFE4EE 30%, #FFF3E0 60%, #FCE4EC 100%);
      width: 100%;
      overflow-x: hidden;
      text-align: center;
    }
 
    /* FLOATING HEARTS */
    .hearts-bg {
      position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden;
    }
    .heart {
      position: absolute;
      animation: floatHeart linear infinite;
    }
    @keyframes floatHeart {
      0%   { transform: translateY(0px) scale(1) rotate(-10deg); opacity: var(--op); }
      50%  { transform: translateY(-18px) scale(1.08) rotate(8deg); opacity: calc(var(--op) * 1.4); }
      100% { transform: translateY(0px) scale(1) rotate(-10deg); opacity: var(--op); }
    }
 
    /* HERO */
    .hero {
      position: relative; z-index: 1;
      padding: 64px 24px 48px;
      display: flex; flex-direction: column; align-items: center;
    }
    .date-badge {
      display: inline-block;
      background: linear-gradient(135deg, #FF4081, #FF80AB, #FF6EC7);
      color: #fff;
      font-family: 'Lato', sans-serif;
      font-weight: 300;
      letter-spacing: 0.25em;
      font-size: 13px;
      padding: 8px 28px;
      border-radius: 100px;
      margin-bottom: 24px;
      text-transform: uppercase;
      box-shadow: 0 4px 24px rgba(255,64,129,0.35);
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(48px, 10vw, 88px);
      font-weight: 700;
      background: linear-gradient(135deg, #C2185B, #E91E8C, #FF4081, #FF6EC7, #FF80AB);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.1;
      margin-bottom: 12px;
    }
    .hero-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(18px, 4vw, 28px);
      color: #AD1457;
      margin-bottom: 32px;
      opacity: 0.85;
    }
    .hero-desc {
      font-size: 16px;
      color: #7B3F60;
      max-width: 520px;
      line-height: 1.8;
      font-weight: 300;
      margin-bottom: 40px;
    }
    .cake-hint {
      font-size: 13px;
      color: #E91E8C;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
      opacity: 0.7;
    }
    .cake-wrap {
      background: radial-gradient(ellipse at center, rgba(255,105,180,0.12) 0%, transparent 70%);
      border-radius: 50%;
      padding: 12px;
      display: inline-block;
    }
 
    /* DIVIDER */
    .divider {
      display: flex; align-items: center; justify-content: center; gap: 16px;
      margin: 0 auto 48px;
      max-width: 320px;
    }
    .divider-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, transparent, #FF80AB, transparent);
    }
    .divider-heart { color: #FF4081; font-size: 18px; }
 
    /* MEMORIES */
    .memories-section {
      position: relative; z-index: 1;
      padding: 0 24px 80px;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(32px, 6vw, 52px);
      color: #880E4F;
      margin-bottom: 8px;
    }
    .section-sub {
      color: #AD1457;
      font-size: 15px;
      font-weight: 300;
      margin-bottom: 48px;
      opacity: 0.8;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .card {
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(233,30,140,0.10);
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: left;
    }
    .card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 12px 48px rgba(233,30,140,0.22);
    }
    .card-img-wrap {
      width: 100%;
      height: 250px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f8f8f8;
    }
    .card-img-wrap img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .card:hover .card-img-wrap img { transform: scale(1.1); }
    .card-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(136,14,79,0.75) 0%, transparent 55%);
      opacity: 0; transition: opacity 0.3s ease;
      display: flex; align-items: flex-end; padding: 16px;
    }
    .card:hover .card-overlay { opacity: 1; }
    .card-overlay p { color: #FFE4EE; font-size: 13px; line-height: 1.5; }
    .card-body { padding: 16px 18px; }
    .card-title { font-family: 'Playfair Display', serif; font-size: 18px; color: #880E4F; margin-bottom: 8px; }
    .card-meta { font-size: 12px; color: #C2185B; opacity: 0.75; display: flex; gap: 12px; flex-wrap: wrap; }
 
    /* MESSAGE */
    .message-section {
      position: relative; z-index: 1;
      padding: 0 24px 80px;
    }
    .message-card {
      max-width: 700px;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,228,238,0.88));
      backdrop-filter: blur(16px);
      border: 1.5px solid rgba(255,128,171,0.3);
      border-radius: 32px;
      padding: 56px 48px;
      box-shadow:
        0 0 0 6px rgba(255,64,129,0.05),
        0 8px 64px rgba(233,30,140,0.15),
        inset 0 1px 0 rgba(255,255,255,0.8);
      text-align: center;
    }
    .message-icon {
      font-size: 40px;
      display: block;
      margin-bottom: 20px;
      animation: heartbeat 1.4s ease-in-out infinite;
    }
    @keyframes heartbeat {
      0%,100% { transform: scale(1); }
      14% { transform: scale(1.18); }
      28% { transform: scale(1); }
      42% { transform: scale(1.12); }
      56% { transform: scale(1); }
    }
    .message-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(24px, 5vw, 38px);
      color: #880E4F;
      margin-bottom: 28px;
    }
    .message-p {
      color: #6D2B4E;
      font-size: 16px;
      line-height: 1.9;
      font-weight: 300;
      margin-bottom: 20px;
    }
    .message-quote {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(17px, 3.5vw, 22px);
      background: linear-gradient(135deg, #C2185B, #FF4081, #FF80AB);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-top: 28px;
      line-height: 1.6;
    }
    .hearts-row {
      color : red;
      display: flex; justify-content: center; gap: 10px;
      margin-top: 28px;
    }
    .hearts-row span {
      font-size: 20px;
      animation: heartbeat 1.4s ease-in-out infinite;
    }
    .hearts-row span:nth-child(2) { animation-delay: 0.2s; }
    .hearts-row span:nth-child(3) { animation-delay: 0.4s; }
    .hearts-row span:nth-child(4) { animation-delay: 0.6s; }
    .hearts-row span:nth-child(5) { animation-delay: 0.8s; }
 
    /* FOOTER */
    .footer {
      position: relative; z-index: 1;
      padding: 32px 24px;
      color: #C2185B;
      font-size: 14px;
      font-weight: 300;
      opacity: 0.75;
      text-align: center;
    }
 
    /* MODAL */
    .modal-bg {
      position: fixed; inset: 0;
      background: rgba(80,0,40,0.75);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex; align-items: center; justify-content: center;
      padding: 24px;
    }
    .modal {
      background: #fff;
      border-radius: 24px;
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow: hidden;
      box-shadow: 0 24px 80px rgba(136,14,79,0.4);
      text-align: left;
    }
    .modal-img { width: 100%; aspect-ratio: 16/9; object-fit: contain; display: block; }
    .modal-body { padding: 28px; }
    .modal-title { font-family: 'Playfair Display', serif; font-size: 26px; color: #880E4F; margin-bottom: 8px; }
    .modal-meta { font-size: 13px; color: #C2185B; opacity: 0.75; margin-bottom: 14px; }
    .modal-desc { color: #6D2B4E; font-size: 15px; line-height: 1.7; font-weight: 300; }
    .modal-close {
      position: absolute; top: 16px; right: 16px;
      width: 36px; height: 36px; border-radius: 50%;
      background: rgba(255,255,255,0.9);
      border: none; cursor: pointer; font-size: 20px; color: #880E4F;
      display: flex; align-items: center; justify-content: center;
    }
 
    /* FADE IN */
    .fade-up {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .fade-up.show {
      opacity: 1; transform: translateY(0);
    }
 
    @media (max-width: 600px) {
      .message-card { padding: 36px 24px; }
    }
  `;
 
  return (
    <>
      <style>{styles}</style>
      <div className="page">
        {/* Floating hearts background */}
        <div className="hearts-bg">
          {hearts.map((h, i) => (
            <div
              key={i}
              className="heart"
              style={{
                left: h.left,
                top: h.top,
                width: h.size,
                height: h.size,
                color: h.color,
                opacity: h.opacity,
                "--op": h.opacity,
                animationDuration: h.duration,
                animationDelay: h.delay,
              }}
            >
              ♥
            </div>
          ))}
        </div>
 
        {/* HERO */}
        <section className={`hero fade-up ${visible ? "show" : ""}`}>
          <div className="date-badge">✦ 26th April ✦<br/> Shurfaat Newaz Noha's Day</div>
          <h1 className="hero-title">Happy Birthday<br/> My Noha</h1>
          <p className="hero-subtitle">My Future Lawyer 💖</p>
          <p className="hero-desc">
            Hey <i><b>Noha</b></i> , you are the dream I never knew my heart was waiting for... On your special day, I just want to remind you how deeply you’ve filled my life with love, unforgettable memories. You’re not just part of my world you are the light that makes everything brighter. Being with you is the most beautiful gift I’ve ever known. I cherish you more with every heartbeat. 💫
          </p>
          <p className="cake-hint">✦ Drag or touch to spin the cake ✦</p>
          <div className="cake-wrap">
            <Cake3D />
          </div>
        </section>
 
        {/* Divider */}
        <div className="divider" style={{ zIndex: 1, position: "relative" }}>
          <div className="divider-line" />
          <span className="divider-heart">♥</span>
          <div className="divider-line" />
        </div>
 
        {/* MEMORIES */}
        <section className={`memories-section fade-up ${visible ? "show" : ""}`} style={{ transitionDelay: "0.2s" }}>
          <h2 className="section-title">You & Me</h2>
          <p className="section-sub">A collection of moments that make my heart smile ♥</p>
          <div className="grid">
            {memories.map((m) => (
              <div key={m.id} className="card" onClick={() => setSelectedMemory(m)}>
                <div className="card-img-wrap">
                  <img src={m.image} alt={m.title} />
                  <div className="card-overlay"><p>{m.description}</p></div>
                </div>
                <div className="card-body">
                  <div className="card-title">{m.title}</div>
                  <div className="card-meta">
                    {/* <span>🗓 {m.date}</span>
                    <span>📍 {m.location}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
 
        {/* Divider */}
        <div className="divider" style={{ zIndex: 1, position: "relative" }}>
          <div className="divider-line" />
          <span className="divider-heart">♥</span>
          <div className="divider-line" />
        </div>
 
        {/* MESSAGE */}
        <section className={`message-section fade-up ${visible ? "show" : ""}`} style={{ transitionDelay: "0.4s" }}>
          <div className="message-card">
            <span className="message-icon">💖</span>
            <h2 className="message-title">A Message From My Heart</h2>
            <p className="message-p">
              We’ve known each other since childhood and now here we are together ....now you mean everything to me. ❤️
I know today is so special for you and it hurts me that I can’t be there beside you to celebrate the way you deserve. But In sha Allah, from next year and every year I’ll be right there with you on all your special days.
I know life hasn’t been easy for you lately and I truly pray for your good health, peace and a life full of happiness…... of course, with me in it 😄 I promise I’ll always be there for you everywhere, every time, especially when you need me the most.
Every moment with you feels like a precious gift. On your special day, I just want to remind you how much you mean to me. You make my world so much brighter, so much warmer and so much more beautiful just by being in it....i love you so much Noha.



            </p>
            <p className="message-p">
              {/* I'm so proud of you and everything you've accomplished. Your brilliance,
              your passion for law, and your kind heart inspire me every single day.
              I can't wait to see all the incredible things you'll achieve as a lawyer. */}
            </p>
            <p className="message-quote">
              "Happy Birthday, my love Noha.🎂💖<br/>Here’s to celebrating not just this one, but an endless number of birthdays together—year after year—until the very end of our life, side by side"
            </p>
            <div className="hearts-row">
              <span>♥</span><span>♥</span><span>♥</span><span>♥</span><span>♥</span>
            </div>
          </div>
        </section>
 
        {/* FOOTER */}
        <footer className="footer">
          Made with ♥ for the most special person in my world. <br/>I love you, Noha. Happy Birthday again! - rf104🎉
        </footer>
 
        {/* MODAL */}
        {selectedMemory && (
          <div className="modal-bg" onClick={() => setSelectedMemory(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()} style={{ position: "relative" }}>
              <img className="modal-img" src={selectedMemory.image} alt={selectedMemory.title} />
              <button className="modal-close" onClick={() => setSelectedMemory(null)}>×</button>
              <div className="modal-body">
                <div className="modal-title">{selectedMemory.title}</div>
                <div className="modal-meta">🗓 {selectedMemory.date} &nbsp;·&nbsp; 📍 {selectedMemory.location}</div>
                <p className="modal-desc">{selectedMemory.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
 


