import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./Hero.css";
const slides = [
  {
    tag: "Bring nature home",
    title: "Grow a calmer space, one leaf at a time.",
    copy: "Thoughtfully chosen indoor plants, simple care guidance, and expert help whenever you need it.",
    img: "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1400&q=90",
  },
  {
    tag: "Plants made simple",
    title: "Beautiful greens for every kind of home.",
    copy: "From low-light corners to bright windows, find a plant that feels at home with you.",
    img: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1400&q=90",
  },
  {
    tag: "Nurture with confidence",
    title: "Expert advice for healthier, happier plants.",
    copy: "Book a personal consultation and give your indoor garden exactly what it needs.",
    img: "https://images.unsplash.com/photo-1600411832986-5a4477b64a1c?auto=format&fit=crop&w=1400&q=90",
  },
];
export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % 3), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{s.tag}</span>
          <h1>{s.title}</h1>
          <p>{s.copy}</p>
          <div className="hero-actions">
            <Link to="/plants" className="btn btn-primary">
              Explore plants <ArrowRight size={17} />
            </Link>
            <a href="#care" className="text-link">
              View care guide
            </a>
          </div>
          <div className="hero-dots">
            {slides.map((_, x) => (
              <button
                aria-label={`Slide ${x + 1}`}
                className={i === x ? "on" : ""}
                onClick={() => setI(x)}
                key={x}
              />
            ))}
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-shape" />
          <img key={s.img} src={s.img} alt="Indoor plants" />
          <span className="plant-note">
            <b>Freshly rooted</b>
            <small>Healthy plants, carefully packed</small>
          </span>
          <button className="hero-arrow left" onClick={() => setI((i + 2) % 3)}>
            <ChevronLeft />
          </button>
          <button
            className="hero-arrow right"
            onClick={() => setI((i + 1) % 3)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
