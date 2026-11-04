import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Code2,
  Command, Github, Instagram, Layers3, Mail, Menu, MoveUpRight,
  Palette, Sparkles, X, Zap,
} from "lucide-react";
import { projects, skills } from "./data/projects.js";

const navItems = [
  ["Work", "#work"], ["About", "#about"], ["Services", "#services"], ["Contact", "#contact"],
];

function Reveal({ children, delay = 0, className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="Sandy Coder home">
        <span className="brand-mark">S<span>.</span></span>
        <span className="brand-name">SANDY<span>CODER</span></span>
      </a>
      <nav className={`desktop-nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a className="nav-cta" href="mailto:hello@sandycoder.dev">Let's talk <ArrowUpRight size={14} /></a>
      </nav>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}

function OrbScene() {
  return (
    <div className="orb-scene" aria-label="Abstract purple three-dimensional artwork" role="img">
      <div className="orb-glow" />
      <div className="orb">
        <div className="orb-shine" />
        <div className="orb-core" />
      </div>
      <div className="orbit orbit-one"><span /></div>
      <div className="orbit orbit-two"><span /></div>
      <div className="orbit orbit-three"><span /></div>
      <div className="orb-label label-top">CREATIVE<br />DEVELOPMENT</div>
      <div className="orb-label label-bottom">EST. 2025 <i>✳</i> INDIA</div>
      <div className="orb-cross cross-one">✳</div>
      <div className="orb-cross cross-two">✦</div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy">
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="status-dot" /> INDEPENDENT CREATIVE DEVELOPER
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.18 }}>
          I build digital<br />things with <em>feeling.</em>
        </motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}>
          I'm Sandy — a frontend developer with a designer's eye. I turn ambitious ideas into thoughtful, interactive experiences for the web.
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <a className="button button-primary" href="#work">Explore selected work <ArrowUpRight size={17} /></a>
          <a className="text-link" href="#about">A little about me <ArrowDownRight size={16} /></a>
        </motion.div>
      </div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.86, rotate: -7 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}>
        <OrbScene />
      </motion.div>
      <div className="hero-bottom">
        <span>DESIGN MINDED. CODE DRIVEN.</span>
        <a href="#work">SCROLL TO EXPLORE <ArrowDownRight size={14} /></a>
        <span className="hero-index">01 / 06</span>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Technologies and capabilities">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {["FRONTEND DEVELOPMENT", "INTERACTION DESIGN", "CREATIVE CODE", "DIGITAL EXPERIENCES", "UI / UX"].map((item) => (
              <span key={item}>{item}<Asterisk size={17} /></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ index, kicker, title, accent, note }) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-kicker"><span>{index}</span> {kicker}</div>
        <h2>{title} <em>{accent}</em></h2>
      </div>
      {note && <p>{note}</p>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <Reveal delay={index * 0.08} className={`project-card ${project.featured ? "project-featured" : ""}`}>
      <a href={project.href} target={project.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="project-link" aria-label={`View ${project.name}`}>
        <div className="project-image-wrap">
          <img src={project.image} alt={`${project.name} project preview`} loading="lazy" />
          <span className="project-number">{project.number} / 06</span>
          <span className="project-open"><ArrowUpRight size={20} /></span>
        </div>
        <div className="project-meta">
          <div><span className="project-category">{project.category}</span><h3>{project.name}</h3></div>
          <p>{project.description}</p>
        </div>
        <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </a>
    </Reveal>
  );
}

function Work() {
  return (
    <section className="work-section section-shell section-pad" id="work">
      <SectionHeading index="01" kicker="SELECTED PROJECTS" title="A few things I've" accent="made." note="A selection of experiments, useful products and digital experiences. Always learning, always building." />
      <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.number} project={project} index={index} />)}</div>
      <div className="work-footnote"><span>MORE EXPERIMENTS IN PROGRESS</span><span>BUILT WITH CURIOSITY <Sparkles size={14} /></span></div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-shell section-pad" id="about">
      <SectionHeading index="02" kicker="A LITTLE INTRODUCTION" title="Developer by craft." accent="Curious by nature." />
      <div className="about-grid">
        <Reveal className="about-statement">
          <span className="about-symbol">“</span>
          <p>I care about the details people feel — the rhythm of an interaction, the clarity of a layout, and the small moments that make a product memorable.</p>
        </Reveal>
        <Reveal delay={0.12} className="about-copy">
          <p>I'm Sandy, an independent frontend developer from India. I enjoy combining design thinking with code to create fast, responsive and expressive websites.</p>
          <p>My process is hands-on: explore an idea, prototype the experience, build it carefully, and keep refining until it feels right.</p>
          <a className="inline-link" href="https://github.com/SandeepCoder09" target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={15} /></a>
        </Reveal>
      </div>
      <div className="skills-panel">
        <div className="skills-heading"><span>TOOLS & TECHNOLOGIES</span><span>MY CURRENT TOOLKIT</span></div>
        <div className="skills-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
      </div>
    </section>
  );
}

const services = [
  { icon: <Code2 />, number: "01", title: "Frontend development", body: "Responsive, accessible interfaces with clean components and thoughtful interactions." },
  { icon: <Palette />, number: "02", title: "UI & experience design", body: "Clear visual systems and user journeys that make products feel effortless." },
  { icon: <Layers3 />, number: "03", title: "Web experiences", body: "Landing pages, portfolios and small business websites built to make an impression." },
  { icon: <Zap />, number: "04", title: "Creative interactions", body: "Motion, micro-interactions and playful details that bring interfaces to life." },
];

function Services() {
  return (
    <section className="services-section section-shell section-pad" id="services">
      <SectionHeading index="03" kicker="WHAT I CAN HELP WITH" title="Good ideas deserve" accent="great execution." />
      <div className="services-grid">
        {services.map((service, index) => (
          <Reveal delay={index * 0.07} className="service-card" key={service.number}>
            <div className="service-top"><span>{service.number}</span><span className="service-icon">{service.icon}</span></div>
            <h3>{service.title}</h3><p>{service.body}</p><ArrowUpRight className="service-arrow" size={18} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section section-shell section-pad" id="contact">
      <div className="contact-card">
        <div className="contact-orbit" aria-hidden="true" />
        <div className="section-kicker"><span>04</span> HAVE A GOOD ONE IN MIND?</div>
        <h2>Let's make<br /><em>something matter.</em></h2>
        <p>Have a project, an idea, or just want to say hello? My inbox is open.</p>
        <a className="button button-light" href="mailto:hello@sandycoder.dev">Start a conversation <ArrowUpRight size={17} /></a>
        <span className="contact-side-note">GOOD THINGS START WITH A HELLO</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section-shell">
      <a className="brand footer-brand" href="#top"><span className="brand-mark">S<span>.</span></span><span className="brand-name">SANDY<span>CODER</span></span></a>
      <span className="footer-note">DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span>
      <div className="social-links">
        <a href="https://github.com/SandeepCoder09" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
        <a href="https://instagram.com/sandycoder09" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
        <a href="mailto:hello@sandycoder.dev" aria-label="Email"><Mail size={17} /></a>
      </div>
      <span className="copyright">© {new Date().getFullYear()} SANDY CODER</span>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "Sandy Coder — Creative Developer";
  }, []);
  return (
    <>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}