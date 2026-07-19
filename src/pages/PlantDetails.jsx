import { useLoaderData, useParams } from "react-router-dom";
import { use, useState } from "react";
import { Star, PackageCheck, Leaf, ShieldCheck } from "lucide-react";
import ProtectedRoute from "../Routes/ProtectedRoute/ProtectedRoute";
import "./PlantDetails.css";
import { AuthContext } from "../context/AuthContext";
export default function PlantDetails() {
  return (
    <ProtectedRoute>
      <Details />
    </ProtectedRoute>
  );
}
function Details() {

  const plants=useLoaderData();
  console.log(plants)  
  const { id } = useParams(),
    { user } = use(AuthContext),
    p = plants.find((x) => String(x.plantId) === id);
  const [name, setName] = useState(user?.displayName || ""),
    [email, setEmail] = useState(user?.email || ""),
    [toast, setToast] = useState("");
  if (!p) return <p>Plant not found.</p>;
  const book = (e) => {
    e.preventDefault();
    setToast(`Consultation booked for ${p.plantName}!`);
    setName("");
    setEmail("");
    setTimeout(() => setToast(""), 3500);
  };
  return (
    <div className="details-page">
      <div className="container details-grid">
        <div className="details-image">
          <img src={p.image} alt={p.plantName} />
          <span>{p.careLevel} care</span>
        </div>
        <div className="details-info">
          <span className="eyebrow">{p.category}</span>
          <h1>{p.plantName}</h1>
          <div className="details-rating">
            <Star size={17} fill="currentColor" /> {p.rating} • by{" "}
            {p.providerName}
          </div>
          <p>{p.description}</p>
          <div className="price-row">
            <strong>${p.price}.00</strong>
            <span>
              <PackageCheck /> {p.availableStock} plants in stock
            </span>
          </div>
          <div className="details-perks">
            <div>
              <Leaf />
              <span>
                <b>Care level</b>
                <small>{p.careLevel}</small>
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <b>Healthy arrival</b>
                <small>Quality checked</small>
              </span>
            </div>
          </div>
          <form onSubmit={book} className="booking">
            <h2>Book a plant consultation</h2>
            <p>Get personal care advice from a GreenNest expert.</p>
            <label>
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="btn btn-primary">Book now</button>
          </form>
        </div>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
