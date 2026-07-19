import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section
      className="page-hero"
      style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}
    >
      <div>
        <span className="eyebrow">404</span>
        <h1 className="section-title">This leaf wandered away.</h1>
        <Link className="btn btn-primary" to="/">
          Return home
        </Link>
      </div>
    </section>
  );
}
