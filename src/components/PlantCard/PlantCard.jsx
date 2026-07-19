import { Link } from "react-router-dom";
import { Star, ArrowUpRight } from "lucide-react";
import "./PlantCard.css";
const PlantCard=({ p })=> {
  return (
    <article className="plant-card">
      <div className="card-img">
        <img src={p.image} alt={p.plantName} />
        <span>{p.careLevel}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <small>{p.category}</small>
          <b>
            <Star size={14} fill="currentColor" /> {p.rating}
          </b>
        </div>
        <h3>{p.plantName}</h3>
        <div className="card-bottom">
          <strong>${p.price}.00</strong>
          <Link to={`/plant/${p.plantId}`}>
            <ArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
export default PlantCard;
