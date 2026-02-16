import { Link } from "react-router-dom";
import "./homePage.css";

export default function HomePage() {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to DevGPT</h1>
          <p>Your AI-powered coding assistant for faster development</p>
          <Link to="/dashboard" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast</h3>
            <p>Get instant code suggestions and solutions</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Accurate</h3>
            <p>Powered by advanced AI models</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Your code and conversations are private</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Scalable</h3>
            <p>Works with projects of any size</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to boost your development?</h2>
        <p>Start using DevGPT today and write better code faster</p>
        <Link to="/dashboard" className="cta-button-secondary">
          Launch Dashboard
        </Link>
      </section>
    </div>
  );
}
