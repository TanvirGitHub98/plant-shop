import { Droplets, SunMedium, Sprout } from "lucide-react";
import "./CareTips.css";
const tips = [
  {
    I: Droplets,
    n: "Water wisely",
    d: "Check the top two inches of soil. Water only when it feels dry, then let excess drain.",
  },
  {
    I: SunMedium,
    n: "Find soft light",
    d: "Most indoor plants love bright, indirect sunlight away from harsh afternoon rays.",
  },
  {
    I: Sprout,
    n: "Feed with care",
    d: "Use a balanced fertilizer during spring and summer, and let plants rest in winter.",
  },
];
const CareTips=()=> {
  return (
    <section id="care" className="section care">
      <div className="container">
        <div className="care-heading">
          <span className="eyebrow">Grow with confidence</span>
          <h2 className="section-title">
            Small rituals.
            <br />
            Thriving plants.
          </h2>
        </div>
        <div className="tips">
          {tips.map(({ I, n, d }, x) => (
            <article key={n}>
              <span className="tip-num">0{x + 1}</span>
              <div className="tip-icon">
                <I />
              </div>
              <h3>{n}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default CareTips; 
