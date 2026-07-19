import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import "./PlantOfWeek.css";
const PlantOfWeek=()=> {
  return (
    <section className="section potw">
      <div className="container potw-box">
        <div className="potw-image">
          <img
            src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1100&q=90"
            alt="Monstera"
          />
          <span>
            <Leaf size={16} /> Plant of the week
          </span>
        </div>
        <div className="potw-copy">
          <span className="eyebrow">This week’s favorite</span>
          <h2 className="section-title">
            Meet Monstera,
            <br />
            the joyful giant.
          </h2>
          <p className="section-copy">
            Bold, sculptural and surprisingly easy-going. Give it bright
            indirect light and water when the soil is partly dry.
          </p>
          <div className="potw-stats">
            <span>
              <b>Easy</b>
              <small>Care level</small>
            </span>
            <span>
              <b>Weekly</b>
              <small>Watering</small>
            </span>
            <span>
              <b>Bright</b>
              <small>Indirect light</small>
            </span>
          </div>
          <Link to="/plant/1" className="btn btn-primary">
            Meet Monstera <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default PlantOfWeek;
