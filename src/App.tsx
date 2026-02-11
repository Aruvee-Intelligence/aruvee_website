import { BrowserRouter as Router, Routes, Route, NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Users, 
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
function Navigation() {
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
          <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '12px' }}>
            Request Demo
          </a>
        </div>
      </div>
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
function HomePage() {
  return (
    <div className="page">
      {/* Hero */}
      <section className="section-hero">
        <DynamicBackground />
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div style={{ maxWidth: '720px' }}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-title"
              style={{ fontSize: '3rem', color: 'var(--white)', marginBottom: '1.25rem' }}
            >
              <span className="gradient-text">AI Agents</span> for the Semiconductor Industry
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              style={{ fontSize: '1rem', color: 'var(--gray-400)', marginBottom: '2rem', maxWidth: '540px', lineHeight: 1.6 }}
            >
              AI agents that work alongside your engineers like trusted colleagues—automating yield analysis, 
              process troubleshooting, and equipment diagnostics. Reduce response time from hours to minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="cta-buttons"
            >
              <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">
                Request Demo
              </a>
              <Link to="/product" className="btn btn-outline-light">
                See How It Works
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* AI Agents -->
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
            <p>Free pilot program with guaranteed ROI metrics</p>
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
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
            <p>Enterprise-grade architecture</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="business-grid"
          >
            <motion.div variants={fadeIn} className="business-card">
              <h3>Smart query routing</h3>
              <p>Questions automatically routed to the right agent. Context-aware processing ensures accurate, relevant responses every time.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="business-card">
              <h3>Knowledge database</h3>
              <p>Structured repository of process specs, equipment manuals, and historical resolutions. Captures and preserves tribal knowledge.</p>
            </motion.div>
            <motion.div variants={fadeIn} className="business-card">
              <h3>Adaptive learning</h3>
              <p>Agents improve from feedback. Custom training on your specific processes, equipment, and issue patterns.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Integration */}
      <section className="section section-dark">
        <div className="container">
          <div className="platform-demo">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-info"
            >
              <h3>Connects to your existing systems</h3>
              <p>No rip-and-replace. Aruvee integrates with your current infrastructure and starts delivering value immediately.</p>
              <ul className="feature-list">
                <li>MES integration (Camstar, PROMIS, etc.)</li>
                <li>SPC systems (InfinityQS, etc.)</li>
                <li>Equipment interfaces (SECS/GEM)</li>
                <li>Data historians</li>
                <li>On-premise or cloud deployment</li>
              </ul>
              <a href="mailto:ponmithiran@aruvee.sg" className="btn btn-primary">Discuss Your Setup</a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="platform-visual"
            >
              <div className="platform-header">
                <span className="platform-logo">Integration</span>
              </div>
              <div style={{ padding: '1.5rem', color: 'var(--gray-400)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ background: 'var(--navy-light)', padding: '1rem', textAlign: 'center' }}>
                    <strong style={{ color: 'var(--white)' }}>Your MES / SPC / Equipment</strong>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>↓</div>
                  <div style={{ background: 'var(--primary)', padding: '1rem', textAlign: 'center' }}>
                    <strong style={{ color: 'var(--white)' }}>Aruvee Platform</strong>
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '1.5rem' }}>↓</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div style={{ background: 'var(--navy-light)', padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--gray-300)' }}>Insights</span>
                    </div>
                    <div style={{ background: 'var(--navy-light)', padding: '0.75rem', textAlign: 'center', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--gray-300)' }}>Actions</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
            <p>Free pilot with guaranteed ROI measurement</p>
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
  const team = [
    { name: 'Ponmithiran', role: 'Founder & CEO', bio: 'Ex-AMD Senior Data Scientist. 7+ years in semiconductor AI.' },
    { name: 'Ying Xi', role: 'Data Scientist', bio: 'NTU Computing. Ex-AMD AI Research Intern.' },
  ];

  return (
    <div className="page" style={{ paddingTop: '72px' }}>
      {/* Mission */}
      <section className="section-hero" style={{ minHeight: '60vh' }}>
        <DynamicBackground />
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="tag"
            style={{ marginBottom: '24px' }}
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
            style={{ fontSize: '3rem', color: 'var(--white)', marginTop: '24px' }}
          >
            Capture Knowledge.<br />
            <span className="gradient-text">Scale Expertise.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontSize: '1.125rem', color: 'var(--gray-400)', marginTop: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Semiconductor manufacturing is losing decades of institutional knowledge 
            to retirement. Aruvee captures that expertise in AI agents that work 
            alongside your teams—24/7, across every shift.
          </motion.p>
        </div>
      </section>

      {/* Team */}
      <section className="section section-dark">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header center"
          >
            <h2>Team</h2>
            <p>Deep expertise in semiconductors and AI</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid-2"
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeIn} className="card" style={{ textAlign: 'center' }}>
                <div 
                  className="card-icon" 
                  style={{ margin: '0 auto 20px', width: '80px', height: '80px', borderRadius: '0', background: 'var(--primary)' }}
                >
                  <Users size={32} color="white" />
                </div>
                <h3 className="card-title">{member.name}</h3>
                <p style={{ color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '12px' }}>
                  {member.role}
                </p>
                <p className="card-text">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
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
            <h2>Join the Pilot Program</h2>
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
