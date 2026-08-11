"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  experiences,
  profile,
  projectRails,
  projects,
  skillGroups,
  socialLinks,
  type Project,
} from "../data/portfolio";

const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

function ProjectArtwork({ project, hero = false }: { project: Project; hero?: boolean }) {
  const style = { "--project-accent": project.accent } as CSSProperties;

  return (
    <div
      className={`project-art project-art--${project.art}${hero ? " project-art--hero" : ""}`}
      style={style}
      aria-hidden="true"
    >
      <div className="art-chrome">
        <span />
        <span />
        <span />
      </div>

      {project.art === "clinic" && (
        <div className="clinic-art">
          <div className="clinic-shell">
            <div className="clinic-heading"><span>PATIENTS</span><b>Clinic records</b></div>
            <div className="clinic-search">Search by name or PHN</div>
            <div className="clinic-patients">
              <span><i>AS</i><b>Active record</b><small>PHN 045-265</small></span>
              <span><i>MK</i><b>Patient profile</b><small>3 notes</small></span>
              <span><i>JD</i><b>Patient profile</b><small>Updated</small></span>
            </div>
          </div>
          <div className="clinic-panel">
            <small>TESTED WORKFLOWS</small>
            <b>23 scenarios</b>
            <span>auth · records · notes</span>
            <i /><i /><i />
          </div>
        </div>
      )}

      {project.art === "buddy" && (
        <div className="buddy-art">
          <div className="buddy-filters">
            <small>MATCH BY COURSE</small>
            <b>SENG 310</b>
            <span /><span /><span />
          </div>
          <div className="buddy-board">
            <div className="buddy-profile"><small>92% MATCH</small><span>PS</span><b>Afternoons</b></div>
            <div className="buddy-profile"><small>86% MATCH</small><span>AK</span><b>Library</b></div>
            <div className="buddy-profile buddy-profile--muted"><small>78% MATCH</small><span>JM</span><b>Online</b></div>
          </div>
          <div className="buddy-readout"><small>STUDY MATCHES</small><b>3 compatible peers</b></div>
        </div>
      )}

      {project.art === "map" && (
        <div className="map-art">
          <span className="map-orbit map-orbit--one" />
          <span className="map-orbit map-orbit--two" />
          <span className="map-land map-land--one" />
          <span className="map-land map-land--two" />
          <span className="trail-path trail-path--one" />
          <span className="trail-path trail-path--two" />
          <span className="trail-point trail-point--one" />
          <span className="trail-point trail-point--two" />
          <span className="trail-point trail-point--three" />
          <div className="map-readout"><small>ROUTE ENGINE</small><b>03 ranked routes</b></div>
        </div>
      )}

      {project.art === "world" && (
        <div className="world-art">
          <div className="voxel-sun" />
          <div className="voxel-ground">
            {[0, 1, 2, 3, 4, 5, 6].map((block) => <span key={block} />)}
          </div>
          <div className="voxel-tower"><i /><i /><i /></div>
          <div className="world-label"><small>WORLD / UVIC</small><b>Walk the campus</b></div>
        </div>
      )}

      {project.art === "testing" && (
        <div className="testing-art">
          <div className="testing-maze" aria-hidden="true">
            <span className="testing-player" />
            <span className="testing-ghost testing-ghost--one" />
            <span className="testing-ghost testing-ghost--two" />
          </div>
          <div className="testing-panel">
            <small>JUNIT / GRADLE</small>
            <b>37 / 37</b>
            <span>tests passing</span>
            <i /><i /><i />
          </div>
        </div>
      )}

      {project.art === "terminal" && (
        <div className="terminal-art">
          <div className="terminal-top"><span>csc360 — shell</span><i>● ● ●</i></div>
          <code>
            <span><b>$</b> ./simple_shell</span>
            <span><b>shell %</b> jobs</span>
            <span className="terminal-muted">[1] running  process_2048</span>
            <span><b>shell %</b> signal -s INT</span>
            <span className="terminal-cursor">_</span>
          </code>
        </div>
      )}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Prabhnoor Singh, home">
          <span className="brand-mark" aria-hidden="true">PS</span>
          <span className="brand-copy"><b>Prabhnoor</b><small>Software developer</small></span>
        </a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " primary-navigation--open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            className="nav-resume"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onOpenProject }: { onOpenProject: (project: Project, trigger: HTMLButtonElement) => void }) {
  const featuredProject = projects[0];

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="availability"><span aria-hidden="true" /> {profile.availability}</p>
          <p className="hero-role">{profile.role}</p>
          <h1 id="hero-title">{profile.headline}</h1>
          <p className="hero-positioning">{profile.positioning}</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#projects" data-analytics-event="hero-projects">
              Explore projects <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button--secondary"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="hero-resume"
            >
              View résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
          <dl className="hero-facts" aria-label="Portfolio highlights">
            <div><dt>{String(projects.length).padStart(2, "0")}</dt><dd>selected builds</dd></div>
            <div><dt>03</dt><dd>product surfaces</dd></div>
            <div><dt>BC</dt><dd>{profile.location}</dd></div>
          </dl>
        </div>

        <div className="hero-feature" aria-label={`Featured project: ${featuredProject.title}`}>
          <div className="hero-feature__frame">
            <ProjectArtwork project={featuredProject} hero />
            <div className="hero-feature__meta">
              <div>
                <span>NOW FEATURING</span>
                <h2>{featuredProject.title}</h2>
                <p>{featuredProject.summary}</p>
              </div>
              <button
                type="button"
                className="round-action"
                aria-label={`Open ${featuredProject.title} project details`}
                onClick={(event) => onOpenProject(featuredProject, event.currentTarget)}
              >
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
          <div className="hero-feature__note"><span>01</span> Featured case study</div>
        </div>
      </div>
      <a className="scroll-cue" href="#projects"><span>Scroll to explore</span><i aria-hidden="true" /></a>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project, trigger: HTMLButtonElement) => void }) {
  return (
    <article className="project-card" role="listitem">
      <button
        type="button"
        className="project-card__button"
        aria-label={`Open ${project.title} project details`}
        aria-haspopup="dialog"
        onClick={(event) => onOpen(project, event.currentTarget)}
      >
        <ProjectArtwork project={project} />
        <span className="project-card__index" aria-hidden="true">0{projects.indexOf(project) + 1}</span>
        <span className="project-card__copy">
          <span className="project-card__eyebrow">{project.eyebrow}</span>
          <strong>{project.title}</strong>
          <span className="project-card__summary">{project.summary}</span>
          <span className="tag-list" aria-label="Technologies">
            {project.technologies.slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
          </span>
          <span className="card-action">View case study <i aria-hidden="true">↗</i></span>
        </span>
      </button>
    </article>
  );
}

function ProjectRail({
  rail,
  onOpen,
}: {
  rail: (typeof projectRails)[number];
  onOpen: (project: Project, trigger: HTMLButtonElement) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const railProjects = rail.projectIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  const move = (direction: -1 | 1) => {
    trackRef.current?.scrollBy({
      left: direction * Math.max(trackRef.current.clientWidth * 0.82, 320),
      behavior: "smooth",
    });
  };

  return (
    <section className="project-rail" aria-labelledby={`${rail.id}-title`}>
      <div className="rail-heading">
        <div>
          <p className="section-eyebrow">{rail.eyebrow}</p>
          <h3 id={`${rail.id}-title`}>{rail.title}</h3>
          <p>{rail.description}</p>
        </div>
        <div className="rail-controls" aria-label={`${rail.title} navigation`}>
          <button type="button" onClick={() => move(-1)} aria-label={`Scroll ${rail.title} left`} aria-controls={`${rail.id}-track`}>←</button>
          <button type="button" onClick={() => move(1)} aria-label={`Scroll ${rail.title} right`} aria-controls={`${rail.id}-track`}>→</button>
        </div>
      </div>
      <div
        ref={trackRef}
        id={`${rail.id}-track`}
        className="rail-track"
        role="list"
        aria-label={`${rail.title} projects`}
      >
        {railProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

function ProjectDialog({
  project,
  dialogRef,
  onClose,
}: {
  project: Project | null;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onClose: () => void;
}) {
  return (
    <dialog ref={dialogRef} className="project-dialog" onClose={onClose} aria-labelledby={project ? "dialog-title" : undefined}>
      {project && (
        <div className="dialog-shell" style={{ "--project-accent": project.accent } as CSSProperties}>
          <div className="dialog-art"><ProjectArtwork project={project} /></div>
          <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close project details">×</button>
          <div className="dialog-content">
            <div className="dialog-lead">
              <p className="section-eyebrow">{project.category} · case study</p>
              <h2 id="dialog-title">{project.title}</h2>
              <p>{project.summary}</p>
              <div className="dialog-links">
                {project.demoUrl && <a className="button button--primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer">Open live project <span aria-hidden="true">↗</span></a>}
                {project.githubUrl && <a className="button button--secondary" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View GitHub repository <span aria-hidden="true">↗</span></a>}
                {!project.demoUrl && !project.githubUrl && <p className="dialog-availability">Project materials available on request.</p>}
              </div>
            </div>

            <div className="case-grid">
              <section><span>01 / Problem</span><h3>What needed clarity</h3><p>{project.problem}</p></section>
              <section><span>02 / Contribution</span><h3>What I owned</h3><p>{project.contribution}</p></section>
              <section><span>03 / Build</span><h3>How it works</h3><p>{project.implementation}</p></section>
              <section><span>04 / Result</span><h3>What it demonstrates</h3><p>{project.outcome}</p></section>
            </div>

            <div className="dialog-details">
              <div>
                <p className="detail-label">Key features</p>
                <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </div>
              <div>
                <p className="detail-label">Technical challenge</p>
                <p>{project.challenge}</p>
              </div>
            </div>

            <div className="dialog-stack">
              <p className="detail-label">Technology</p>
              <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

function NoScriptProjectArchive() {
  return (
    <noscript>
      <section className="noscript-projects" aria-labelledby="noscript-projects-title">
        <div className="section-intro">
          <p className="section-eyebrow">Project archive / no JavaScript</p>
          <h2 id="noscript-projects-title">Case studies, kept readable.</h2>
          <p>The interactive project viewer is unavailable, so the core case-study notes are included below.</p>
        </div>
        <div className="noscript-projects__list">
          {projects.map((project) => (
            <details key={project.id}>
              <summary>{project.title} <span>{project.category}</span></summary>
              <div>
                <p><b>Problem:</b> {project.problem}</p>
                <p><b>Contribution:</b> {project.contribution}</p>
                <p><b>Implementation:</b> {project.implementation}</p>
                <p><b>Outcome:</b> {project.outcome}</p>
                {project.demoUrl && <p><a href={project.demoUrl}>Open live project</a></p>}
                {project.githubUrl && <p><a href={project.githubUrl}>View GitHub repository</a></p>}
                {!project.demoUrl && !project.githubUrl && <p><b>Availability:</b> Project materials available on request.</p>}
              </div>
            </details>
          ))}
        </div>
      </section>
    </noscript>
  );
}

function Experience() {
  return (
    <section id="experience" className="content-section experience-section" aria-labelledby="experience-title">
      <div className="section-intro">
        <p className="section-eyebrow">Experience / 2023—Now</p>
        <h2 id="experience-title">Technical curiosity.<br />Real-world reliability.</h2>
        <p>Software projects sit alongside customer-facing work where communication, ownership, and composure matter every day.</p>
      </div>
      <ol className="timeline">
        {experiences.map((item, index) => (
          <li key={`${item.organization}-${item.role}`}>
            <div className="timeline-marker"><span>0{index + 1}</span></div>
            <article>
              <div className="timeline-heading"><div><p>{item.organization}</p><h3>{item.role}</h3></div><span>{item.dates}</span></div>
              <p className="timeline-summary">{item.summary}</p>
              <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="content-section skills-section" aria-labelledby="skills-title">
      <div className="section-intro section-intro--row">
        <div><p className="section-eyebrow">Capabilities / Toolkit</p><h2 id="skills-title">Built across the stack.</h2></div>
        <p>No percentage bars—just the technologies used across the work shown here.</p>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article key={group.title}>
            <span className="skill-number">0{index + 1}</span>
            <h3>{group.title}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="content-section about-section" aria-labelledby="about-title">
      <div className="about-card">
        <div className="about-monogram" aria-hidden="true"><span>PS</span><i /></div>
        <div className="about-copy">
          <p className="section-eyebrow">About / Prabhnoor Singh</p>
          <h2 id="about-title">I like the moment when a difficult system starts to feel simple.</h2>
          <div className="about-text">
            <p>I’m a Computer Science student and software developer in Victoria, BC, interested in the space where strong engineering meets thoughtful interaction design. My projects move between tested software, patient-data tools, human-centred prototypes, requirements work, systems programming, and browser-based 3D—different surfaces connected by the same goal: make the underlying complexity easier to understand and use.</p>
            <p>I care about maintainable components, responsive behaviour, accessibility, and the final layer of polish that makes software feel considered. Outside the code, customer-facing work has strengthened how I communicate, prioritize, and stay useful when the pace picks up. I’m currently looking for opportunities to contribute, learn quickly, and ship with a collaborative team.</p>
          </div>
          <div className="about-signals"><span>Based in {profile.location}</span><span>Open to software opportunities</span></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-orbit" aria-hidden="true"><span /><span /><i /></div>
      <div className="contact-copy">
        <p className="section-eyebrow">Contact / Next step</p>
        <h2 id="contact-title">Have a problem worth building for?</h2>
        <p>{profile.availability} If a role or project could be a fit, I’d be glad to hear the context.</p>
        <a className="button button--light" href={`mailto:${profile.email}`} data-analytics-event="contact-email">Start a conversation <span aria-hidden="true">↗</span></a>
      </div>
      <div className="contact-links">
        {socialLinks.map((link) => (
          <a key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
            <span>{link.label}</span><b>{link.value}</b><i aria-hidden="true">↗</i>
          </a>
        ))}
        <a href={profile.resume} target="_blank" rel="noopener noreferrer"><span>Résumé</span><b>Open PDF</b><i aria-hidden="true">↗</i></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="brand" href="#top" aria-label="Back to top"><span className="brand-mark" aria-hidden="true">PS</span><span className="brand-copy"><b>Prabhnoor Singh</b><small>Software developer</small></span></a>
      <p>Designed for clarity. Built with React, TypeScript, and a little cinematic energy.</p>
      <div><span>© {new Date().getFullYear()} Prabhnoor Singh</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}

export function PortfolioExperience() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger;
    setSelectedProject(project);
  };

  useEffect(() => {
    if (selectedProject && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selectedProject]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main-content">
        <Hero onOpenProject={openProject} />
        <section id="projects" className="projects-section" aria-labelledby="projects-title">
          <div className="projects-overview">
            <div><p className="section-eyebrow">Selected work / {String(projects.length).padStart(2, "0")} builds</p><h2 id="projects-title">A portfolio you can browse,<br />then dig into.</h2></div>
            <p>Each card opens a focused case study with the problem, contribution, implementation, and outcome—no hover required.</p>
          </div>
          {projectRails.map((rail) => <ProjectRail key={rail.id} rail={rail} onOpen={openProject} />)}
        </section>
        <NoScriptProjectArchive />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog
        project={selectedProject}
        dialogRef={dialogRef}
        onClose={() => {
          setSelectedProject(null);
          window.requestAnimationFrame(() => lastTriggerRef.current?.focus());
        }}
      />
    </>
  );
}
