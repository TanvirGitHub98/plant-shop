import Hero from "../components/Hero/Hero";
import PlantGrid from "../components/PlantGrid/PlantGrid";
import CareTips from "../components/CareTips/CareTips";
import Experts from "../components/Experts/Experts";
import PlantOfWeek from "../components/PlantOfWeek/PlantOfWeek";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
export default function Home() {
  return (
    <>
      <Hero />
      <PlantGrid
        limit={6}
        title="Top Rated Indoor Plants"
        subtitle="Handpicked greens, loved by plant parents."
      />
      <CareTips />
      <PlantOfWeek />
      <Experts />
    </>
  );
}
