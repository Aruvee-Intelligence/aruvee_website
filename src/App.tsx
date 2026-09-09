import posthog from 'posthog-js';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImage from './assets/hero-chip.png';

import { 
  Cpu, 
  ArrowRight,
  BarChart3,
  Settings,
  Shield
} from 'lucide-react';
import logoSvg from './assets/aruvee_logo.svg';
import footerLogoSvg from './assets/aruvee_logo.svg';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Dynamic Background Animation Component
function DynamicBackground() {
  return (
    <div className="dynamic-bg">
      {/* Animated gradient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      
      {/* Animated grid */}
      <div className="animated-grid">
        <div className="grid-line grid-line-h" style={{ top: '20%' }} />
        <div className="grid-line grid-line-h" style={{ top: '40%' }} />
        <div className="grid-line grid-line-h" style={{ top: '60%' }} />
        <div className="grid-line grid-line-h" style={{ top: '80%' }} />
        <div className="grid-line grid-line-v" style={{ left: '20%' }} />
        <div className="grid-line grid-line-v" style={{ left: '40%' }} />
        <div className="grid-line grid-line-v" style={{ left: '60%' }} />
        <div className="grid-line grid-line-v" style={{ left: '80%' }} />
      </div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
      
      {/* Circuit pattern overlay */}
      <div className="circuit-pattern" />
    </div>
  );
}

// Navigation Component
function CountdownBanner({ onClick }: { onClick: () => void }) {
  const [timeLeft, setTimeLeft] = useState('48:00:00');

  useEffect(() => {
    const cycleMs = 48 * 60 * 60 * 1000;
    const update = () => {
      const now = Date.now();
      const remaining = cycleMs - (now % cycleMs);
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeLeft(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#FF6558',
        color: '#fff',
        textAlign: 'center',
        padding: '10px 0',
        fontWeight: 600,
        fontSize: '14px',
        zIndex: 3,
        cursor: 'pointer',
      }}
    >
      Free pilot promotion ends in {timeLeft} hours!    </div>
  );
}
function Navigation() {const [showModal, setShowModal] = useState(false);
const [email, setEmail] = useState('');
const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');
  await fetch('https://formspree.io/f/xjyvvkal', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(e.target as HTMLFormElement),
  });
  setStatus('sent');
};
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={logoSvg} alt="Aruvee" style={{ height: '32px', width: 'auto' }} />
          <span>Aruvee</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            Home
          </NavLink>
          <NavLink to="/product" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Product
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <button
            onClick={() => {
            posthog.capture('demo_button_clicked', { location: 'nav' });
            setShowModal(true);
          }}
          className="btn btn-primary"
          style={{ padding: '10px 20px' }}
          >
            Start Free Pilot
          </button>
        </div>
      </div>{showModal && (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
    <div style={{ background: '#0F1420', border: '1px solid #333E52', borderRadius: 12, padding: '2rem', maxWidth: 380, width: '90%' }}>
      {status === 'sent' ? (
        <>
          <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Thanks — we'll be in touch.</p>
          <button onClick={() => { setShowModal(false); setStatus('idle'); setEmail(''); }} className="btn btn-outline-light">Close</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>See Aruvee in action</p>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #333E52', background: '#151B29', color: '#fff', marginBottom: '1rem' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send request'}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-light">Cancel</button>
          </div>
        </form>
      )}
    </div>
  </div>
)}
    </nav>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <img src={footerLogoSvg} alt="Aruvee" style={{ height: '32px', width: 'auto' }} />
        </Link>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/product" className="footer-link">Product</Link>
          <Link to="/about" className="footer-link">About</Link>
          <a href="mailto:ponmithiran@aruvee.sg" className="footer-link">Contact</a>
        </div>
        <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>
          © 2026 Aruvee. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Home Page
function HomePage() {const [showModal, setShowModal] = useState(false);
const [email, setEmail] = useState('');
const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('sending');
  await fetch('https://formspree.io/f/xjyvvkal', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(e.target as HTMLFormElement),
  });
  setStatus('sent');
};
  return (
    <div className="page">
      {/* Hero */}
            <section
        className="section-hero"
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        {/* <DynamicBackground /> */}
        <div className="hero-scrim"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(90deg, #0F1420 0%, #0F1420 25%, rgba(15,20,32,0.6) 50%, transparent 78%)',
          }}
        />
        <div className="container" style={{ maxWidth: '1280px', marginLeft: '4%', marginRight: 'auto', position: 'relative', zIndex: 2 }}>
          <motion.div style={{ maxWidth: '720px' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-title"
              style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1.25rem' }}
>
              <span style={{ color: '#FF6558' }}>AI agents</span> for semiconductor engineering
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontSize: '1.2rem', color: 'var(--gray-100)', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.6 }}
>
              Cut yield excursion root cause time from days to minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="cta-buttons"
            >
            <button
              onClick={() => {
                posthog.capture('demo_button_clicked', { location: 'hero' });
                setShowModal(true);
              }}
             className="btn btn-primary"
            >
               Start Free Pilot
            </button>
            </motion.div>
          </motion.div>
        </div>
        <CountdownBanner
          onClick={() => {
            posthog.capture('demo_button_clicked', { location: 'banner' });
            setShowModal(true);
          }}
        />
      </section> {showModal && (
  <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
    <div style={{ background: '#0F1420', border: '1px solid #333E52', borderRadius: 12, padding: '2rem', maxWidth: 380, width: '90%' }}>
      {status === 'sent' ? (
        <>
          <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Thanks — we'll be in touch.</p>
          <button onClick={() => { setShowModal(false); setStatus('idle'); setEmail(''); }} className="btn btn-outline-light">Close</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <p style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1rem' }}>See Aruvee in action</p>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #333E52', background: '#151B29', color: '#fff', marginBottom: '1rem' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send request'}
            </button>
            <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-light">Cancel</button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

      {/* AI Agents */}
      <section className="section section-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>AI agents for every role</h2>
            <p>Colleagues that never clock out—specialized agents working alongside your team 24/7</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-grid"
          >
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Settings size={24} />
              </div>
              <h3>Process Expert</h3>
              <p>Instant process troubleshooting. Analyzes SPC data, identifies excursions, recommends corrective actions in real-time.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <BarChart3 size={24} />
              </div>
              <h3>Yield Analyst</h3>
              <p>Automated yield correlation. Finds patterns across parameters that humans miss. Prioritizes actions by impact.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Cpu size={24} />
              </div>
              <h3>Equipment Engineer</h3>
              <p>Predictive maintenance alerts. Monitors chamber health, predicts failures ahead of time, optimizes PM schedules.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Quality Lead</h3>
              <p>Automated compliance monitoring. Flags quality deviations instantly, generates audit-ready reports automatically.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Platform Preview */}
      <section className="section section-dark">
        <div className="container">
          <div className="platform-demo">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-visual"
            >
              <div className="platform-header">
                <span className="platform-logo">Aruvee</span>
                <div className="agent-tags">
                  <span className="agent-tag process">Process</span>
                  <span className="agent-tag yield">Yield</span>
                  <span className="agent-tag equipment">Equipment</span>
                </div>
              </div>
              <div className="chat-messages">
                <div className="chat-message user">
                  Why did yield drop on Line 4 last shift?
                </div>
                <div className="chat-message agent">
                  Root cause: CVD chamber 4B pressure drift detected. Strong correlation with yield loss identified. Multiple wafers affected. Recommend immediate PM. Significant cost impact if delayed.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-info"
            >
              <h3>Natural language, real answers</h3>
              <p>Ask questions in plain English. Get actionable insights with business impact quantified.</p>
              <ul className="feature-list">
                <li>Query across all fab data sources</li>
                <li>Automatic correlation analysis</li>
                <li>Cost impact calculation</li>
                <li>Recommended actions with priority</li>
              </ul>
              <Link to="/product" className="btn btn-primary">See Full Demo</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Aruvee */}
      <section className="section section-gray">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Why Aruvee</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="business-grid"
          >
            <motion.div variants={fadeIn} className="business-card">
              <h3>Built for semiconductors</h3>
              <p>Not a generic AI tool. Trained on semiconductor processes, equipment specs, and failure modes. Understands your domain.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="business-card">
              <h3>Captures tribal knowledge</h3>
              <p>Your senior engineers' expertise, codified and available 24/7. Stop losing institutional knowledge when people leave.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="business-card">
              <h3>Deploys in weeks</h3>
              <p>Connects to your MES, SPC, and equipment data. No rip-and-replace. Start seeing ROI in the first month.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header center"
          >
            <h2>See it in your fab</h2>
            <p>Design partnership program with guaranteed ROI metrics</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-buttons"
            style={{ justifyContent: 'center' }}
          >
            <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">Schedule Demo</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Product Page
function ProductPage() {
  return (
    <div className="page" style={{ paddingTop: '72px' }}>
      {/* Hero */}
      <section className="section-hero" style={{ minHeight: '60vh' }}>
        <DynamicBackground />
        <div className="container" style={{ maxWidth: '1280px', marginLeft: '4%', marginRight: 'auto', position: 'relative', zIndex: 2 }}>
          <motion.div style={{ maxWidth: '720px' }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="tag"
              style={{ marginBottom: '24px' }}
            >
              Product
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title"
              style={{ fontSize: '3rem', color: 'var(--white)', marginTop: '24px' }}
            >
              The <span className="gradient-text">Aruvee</span> platform
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: '1rem', color: 'var(--gray-400)', marginTop: '20px', maxWidth: '540px' }}
            >
              Multi-agent AI system designed for semiconductor fabs. One platform, all your engineering workflows automated.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Platform Demo */}
      <section className="section section-light">
        <div className="container">
          <div className="platform-demo">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-visual"
            >
              <div className="platform-header">
                <span className="platform-logo">Aruvee</span>
              </div>
              <div className="chat-messages">
                <div className="chat-message user">
                  Summarize Line 3 performance this week
                </div>
                <div className="chat-message agent">
                  Line 3 weekly summary: Yield above target. Excursions detected - both CVD-related, resolved quickly. Equipment uptime strong. Top issue: Chamber 3A showing early drift. Recommend PM soon.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-info"
            >
              <h3>Ask anything about your fab</h3>
              <p>Natural language queries across all your data. The platform correlates information from MES, SPC, equipment logs, and quality systems automatically.</p>
              <ul className="feature-list">
                <li>Cross-system data correlation</li>
                <li>Historical trend analysis</li>
                <li>Predictive alerts</li>
                <li>Actionable recommendations</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Agents Detail */}
      <section className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>Specialized AI agents</h2>
            <p>Each agent trained on semiconductor-specific knowledge</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="features-grid"
          >
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Settings size={24} />
              </div>
              <h3>Process Expert</h3>
              <p><strong style={{ color: 'var(--primary)' }}>Faster troubleshooting.</strong> Real-time SPC analysis, excursion detection, and corrective action recommendations. Trained on process recipes and historical issue resolutions.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <BarChart3 size={24} />
              </div>
              <h3>Yield Analyst</h3>
              <p><strong style={{ color: 'var(--primary)' }}>Yield improvement.</strong> Correlates parameters automatically. Identifies yield limiters and prioritizes actions by business impact.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Cpu size={24} />
              </div>
              <h3>Equipment Engineer</h3>
              <p><strong style={{ color: 'var(--primary)' }}>Reduced unplanned downtime.</strong> Predictive maintenance with advance warnings. Chamber health monitoring. PM schedule optimization.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="feature-card">
              <div className="card-icon">
                <Shield size={24} />
              </div>
              <h3>Quality Lead</h3>
              <p><strong style={{ color: 'var(--primary)' }}>Faster compliance reporting.</strong> Automated quality monitoring and deviation alerts. Audit-ready report generation. SPC rule violation tracking.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section section-gray">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2>How it works</h2>
            <p>Connects to what you have. Adapts to how your fab runs. Works where your team already works.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid-3"
          >
            <motion.div variants={fadeIn} className="card">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                Step 1
              </div>
              <h3 className="card-title">Connect your systems</h3>
              <p className="card-text" style={{ marginBottom: '1rem' }}>No rip-and-replace. Aruvee plugs into what you already run:</p>
              <ul className="feature-list" style={{ marginBottom: 0 }}>
                <li>MES (Camstar, PROMIS, etc.)</li>
                <li>SPC systems (InfinityQS, etc.)</li>
                <li>Equipment interfaces (SECS/GEM)</li>
                <li>Data historians</li>
                <li>Wikis, JIRA/Confluence, Git & design specs</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                Step 2
              </div>
              <h3 className="card-title">Aruvee adapts to your environment</h3>
              <p className="card-text" style={{ marginBottom: '1rem' }}>Your data is used as context only—never for training—and it stays yours:</p>
              <ul className="feature-list" style={{ marginBottom: 0 }}>
                <li>Grounded in your processes, tools, and recipes</li>
                <li>Draws on your engineers' tribal knowledge</li>
                <li>Learns continuously from your team's feedback</li>
                <li>Runs in your environment—on-premise or cloud</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="card">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px' }}>
                Step 3
              </div>
              <h3 className="card-title">Agents join your team</h3>
              <p className="card-text">Right in Slack or Teams—no new tools to learn.</p>
              <div className="chat-messages" style={{ marginTop: '1rem' }}>
                <div className="chat-message user">
                  <strong style={{ display: 'block', fontSize: '0.7rem', marginBottom: '2px', opacity: 0.85 }}>Engineer</strong>
                  Why is yield drifting?
                </div>
                <div className="chat-message agent">
                  <strong style={{ display: 'block', fontSize: '0.7rem', marginBottom: '2px', color: 'var(--primary)' }}>Yield Agent</strong>
                  CVD chamber drift on Line 3. Suggested PM today.
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--gray-500)', marginTop: '1rem' }}>
                Feels like another colleague on the channel.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-buttons"
            style={{ justifyContent: 'center', marginTop: '3rem' }}
          >
            <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">Discuss Your Setup</a>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-light">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header center"
          >
            <h2>Ready to see Aruvee?</h2>
            <p>Design partnership with guaranteed ROI measurement</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-buttons"
            style={{ justifyContent: 'center' }}
          >
            <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">Request Demo</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="page" style={{ paddingTop: '72px' }}>
      {/* Mission */}
      <section className="section-hero" style={{ minHeight: '50vh' }}>
        <DynamicBackground />
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tag"
            style={{ marginBottom: '24px' }}
          >
            Our Mission
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
            style={{ fontSize: '3rem', color: 'var(--white)', marginTop: '24px' }}
          >
            Scale semiconductor <span className="gradient-text">Revenue</span><br />
            without growing Opex
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.125rem', color: 'var(--gray-400)', marginTop: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Aruvee turns engineering efficiency into operating leverage. Our AI
            agents compress root-cause analysis from days to minutes, lift yield
            and tool availability, and unlock fab capacity you've already paid
            for—driving revenue growth on a flat cost base. More output per
            engineer. More wafers per fab. More earnings per dollar of opex.
          </motion.p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section section-gray">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header center"
          >
            <h2>Be our Design Partner</h2>
            <p>Be among the first to deploy agentic AI in your fab</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-buttons"
            style={{ justifyContent: 'center' }}
          >
            <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">
              Contact Us <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Main App
function App() {
  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navigation />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
