import { useEffect, useState } from "react";
import PlantCard from "../PlantCard/PlantCard";
import "./PlantGrid.css";

const PlantGrid=({ limit, title, subtitle })=> {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/plants.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Plant data could not be loaded");
        }

        return response.json();
      })
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load plants.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="section">
        <p className="section-copy">Loading plants...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <p className="error">{error}</p>
      </section>
    );
  }

  const displayedPlants = limit
    ? plants.slice(0, limit)
    : plants;

  return (
    <section className="section plants-section">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Our collection</span>

            <h2 className="section-title">
              {title || "Find your perfect plant"}
            </h2>

            <p className="section-copy">
              {subtitle ||
                "Explore resilient greens for every room and routine."}
            </p>
          </div>
        </div>

        <div className="plant-grid">
          {displayedPlants.map((plant) => (
            <PlantCard
              key={plant.plantId}
              p={plant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default PlantGrid