import PlantGrid from "../components/PlantGrid/PlantGrid";
const Plants=()=> {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Greenery for every space</span>
          <h1 className="section-title">Explore our plants</h1>
          <p className="section-copy">
            Healthy, characterful indoor plants selected to thrive alongside
            you.
          </p>
        </div>
      </section>
      <PlantGrid />
    </>
  );
}
export default Plants;
