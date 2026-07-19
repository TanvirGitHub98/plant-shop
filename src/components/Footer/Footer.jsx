import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import "./Footer.css";
const Footer=()=> {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="footer-logo">
            <Leaf />
            GreenNest
          </Link>
          <p>Thoughtful plants and practical care for calmer, greener homes.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">About</Link>
          <Link to="/plants">Our Plants</Link>
          <a href="mailto:hello@greennest.com">Contact</a>
        </div>
        <div>
          <h4>Support</h4>
          <a href="#care">Care Guide</a>
          <a href="#">Privacy Policy</a>
          <a href="#">FAQs</a>
        </div>
        <div>
          <h4>Stay connected</h4>
          <div className="socials">
            <a href="#">IG</a>
            <a href="#">f</a>
            <a href="#">P</a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        © 2025 GreenNest. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;