import { useContext, useState } from "react";

import { useLoaderData, useParams } from "react-router-dom";

import { Star, PackageCheck, Leaf, ShieldCheck } from "lucide-react";

import { AuthContext } from "../context/AuthContext";
import "./PlantDetails.css";

const PlantDetails = () => {
  const plants = useLoaderData();
  const { id } = useParams();

  const { user } = useContext(AuthContext);

  const selectedPlant = plants.find(
    (plant) => String(plant.plantId) === String(id),
  );

  const [customerName, setCustomerName] = useState(user?.displayName || "");

  const [customerEmail, setCustomerEmail] = useState(user?.email || "");

  const [successMessage, setSuccessMessage] = useState("");

  if (!selectedPlant) {
    return (
      <section className="page-hero">
        <div className="container">
          <h1 className="section-title">Plant not found</h1>
        </div>
      </section>
    );
  }

  const handleBookConsultation = (event) => {
    event.preventDefault();

    setSuccessMessage(`Consultation booked for ${selectedPlant.plantName}!`);

    setCustomerName("");
    setCustomerEmail("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  };

  return (
    <div className="details-page">
      <div className="container details-grid">
        <div className="details-image">
          <img src={selectedPlant.image} alt={selectedPlant.plantName} />

          <span>{selectedPlant.careLevel} care</span>
        </div>

        <div className="details-info">
          <span className="eyebrow">{selectedPlant.category}</span>

          <h1>{selectedPlant.plantName}</h1>

          <div className="details-rating">
            <Star size={17} fill="currentColor" />

            {selectedPlant.rating}

            <span>•</span>

            <span>by {selectedPlant.providerName}</span>
          </div>

          <p>{selectedPlant.description}</p>

          <div className="price-row">
            <strong>BDT-{selectedPlant.price}.00</strong>

            <span>
              <PackageCheck />
              {selectedPlant.availableStock} plants in stock
            </span>
          </div>

          <div className="details-perks">
            <div>
              <Leaf />

              <span>
                <b>Care level</b>

                <small>{selectedPlant.careLevel}</small>
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

          <form className="booking" onSubmit={handleBookConsultation}>
            <h2>Book a plant consultation</h2>

            <p>Get personal care advice from a GreenNest expert.</p>

            <label htmlFor="customerName">
              Name
              <input
                id="customerName"
                type="text"
                required
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
            </label>

            <label htmlFor="customerEmail">
              Email
              <input
                id="customerEmail"
                type="email"
                required
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Book now
            </button>
          </form>
        </div>
      </div>

      {successMessage && <div className="toast">{successMessage}</div>}
    </div>
  );
};

export default PlantDetails;
