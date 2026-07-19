import "./Experts.css";
const experts = [
  [
    "Maya Chen",
    "Indoor Plant Specialist",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Daniel Reed",
    "Plant Health Expert",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Sofia Patel",
    "Eco Styling Consultant",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
  ],
  [
    "Noah Kim",
    "Urban Gardening Coach",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
  ],
];
const  Experts=()=> {
  return (
    <section className="section experts">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">People behind the plants</span>
          <h2 className="section-title">Meet our green experts</h2>
        </div>
        <div className="expert-grid">
          {experts.map(([n, s, i]) => (
            <article key={n}>
              <img src={i} alt={n} />
              <h3>{n}</h3>
              <p>{s}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Experts;
