'use client';

import Image from 'next/image';
import { useEffect, type CSSProperties, type ReactNode } from 'react';

const LINKEDIN = 'https://www.linkedin.com/in/mahin-bharathwaj-344b8a31b/';
const GITHUB = 'https://github.com/Mahin2076';

const projects = [
  {
    number: '01',
    title: 'Foundry',
    label: 'hackathon track winner',
    description:
      'an agentic software factory that researches where a product can win, then turns the idea into a shipped experience.',
    outcome: 'idea → shipped',
    tags: ['ai agents', 'autonomous workflows', 'product'],
  },
  {
    number: '02',
    title: 'Vero',
    label: '2nd place · los altos hacks',
    description:
      'a real-time misinformation detector that analyzes headlines and turns noisy information into a clearer decision.',
    outcome: 'live analysis',
    tags: ['machine learning', 'real-time', 'signal'],
  },
  {
    number: '03',
    title: 'BattleBets',
    label: 'battlebots ai build night',
    description:
      'historical fight intelligence meets live computer vision to update win probabilities while two robots are still in the arena.',
    outcome: 'live odds',
    tags: ['computer vision', 'data', 'prediction'],
  },
  {
    number: '04',
    title: 'Grizzly Hacks',
    label: 'tech director · community builder',
    description:
      'a student hackathon platform and community made to give young builders a real place to start, ship, and find their people.',
    outcome: '600+ builders',
    tags: ['community', 'systems', 'partnerships'],
    href: 'https://grizzlyhacks.com',
  },
];

const experience = [
  {
    year: '2026',
    role: 'researcher',
    org: 'ucla',
    detail:
      'studied why manufacturing robots struggled during tesla’s model 3 ramp; research published in ucla’s abstract booklet.',
  },
  {
    year: '2025—26',
    role: 'tech director',
    org: 'grizzly hacks',
    detail:
      'built the technical backbone for a growing student builder community and its hackathon experiences.',
  },
  {
    year: '2025',
    role: 'mechatronics intern',
    org: 'uc berkeley nuclear engineering',
    detail:
      'worked on hardware at the radwatch / dosenet lab, where sensing, physical systems, and public impact meet.',
    href: 'https://radwatch.berkeley.edu/team/mahin-bharathwaj/',
  },
];

const disciplines = [
  'ai agents',
  'robotics',
  'computer vision',
  'mechatronics',
  'research',
  'community',
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      className={className}
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    const updateScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        '--scroll',
        `${height > 0 ? window.scrollY / height : 0}`,
      );
    };

    elements.forEach((element) => observer.observe(element));
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <main className="site-shell">
      <div className="scroll-line" aria-hidden="true" />

      <nav className="nav-pill" aria-label="Primary navigation">
        <a className="nav-name" href="#top">
          mahin.
        </a>
        <div className="nav-links">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            linkedin
          </a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="ambient-bubble bubble-one" aria-hidden="true" />
        <div className="ambient-bubble bubble-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow page-enter page-enter-one">
            <span className="status-dot" /> student builder · danville, ca
          </p>
          <h1 className="page-enter page-enter-two">
            i build with ai,
            <br />
            robotics, and hardware.
          </h1>
          <p className="hero-note page-enter page-enter-three">
            i like taking ambitious ideas and making them feel simple, useful,
            and real.
          </p>
          <div className="hero-actions page-enter page-enter-four">
            <a className="soft-button soft-button-light" href="#work">
              see my work <span>↓</span>
            </a>
            <a
              className="soft-button"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              github <span>↗</span>
            </a>
          </div>
        </div>

        <div className="portrait-wrap page-enter page-enter-three">
          <div className="portrait-orbit" aria-hidden="true" />
          <Image
            className="portrait"
            src="/assets/mahin.jpg"
            alt="Mahin Bharathwaj"
            width={540}
            height={620}
            priority
          />
          <p className="portrait-caption">curious by default.</p>
        </div>

        <div
          className="stat-row page-enter page-enter-four"
          aria-label="Highlights"
        >
          <span>10 hackathon wins</span>
          <span>600+ builders</span>
          <span>always learning</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...disciplines, ...disciplines].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item}
              <i>·</i>
            </span>
          ))}
        </div>
      </div>

      <section className="work-section paper-section" id="work">
        <Reveal className="section-heading">
          <p className="section-kicker">selected work · 01</p>
          <h2>
            some things
            <br />
            i&apos;ve made.
          </h2>
          <p className="section-note">
            small teams. weird ideas. real things that work.
          </p>
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <article className="project-card">
                <p className="project-number">{project.number}</p>
                <div className="project-main">
                  <p className="project-label">{project.label}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul
                    className="tag-list"
                    aria-label={`${project.title} topics`}
                  >
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-side">
                  <p>{project.outcome}</p>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`visit ${project.title}`}
                    >
                      ↗
                    </a>
                  ) : (
                    <span aria-hidden="true">↗</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <Reveal className="proof-heading">
          <p className="section-kicker">a few numbers · 02</p>
          <h2>
            quiet design.
            <br />
            loud results.
          </h2>
        </Reveal>
        <div className="proof-grid">
          <Reveal delay={60} className="proof-card proof-card-wide">
            <span className="proof-number">10×</span>
            <p>hackathon wins</p>
          </Reveal>
          <Reveal delay={120} className="proof-card">
            <span className="proof-number">600+</span>
            <p>student builders brought together</p>
          </Reveal>
          <Reveal delay={180} className="proof-card proof-card-soft">
            <span className="tiny-orbit" aria-hidden="true">
              <i />
            </span>
            <p>built across software, robots, hardware, and community.</p>
          </Reveal>
        </div>
      </section>

      <section className="experience-section paper-section" id="experience">
        <Reveal className="section-heading">
          <p className="section-kicker">experience · 03</p>
          <h2>
            where i&apos;ve
            <br />
            been learning.
          </h2>
          <p className="section-note">
            research labs, student communities, and a lot of building.
          </p>
        </Reveal>

        <div className="experience-list">
          {experience.map((item, index) => (
            <Reveal key={`${item.org}-${item.year}`} delay={index * 80}>
              <article className="experience-card">
                <p className="experience-year">{item.year}</p>
                <div>
                  <p className="experience-role">{item.role}</p>
                  <h3>{item.org}</h3>
                </div>
                <p className="experience-detail">{item.detail}</p>
                {item.href ? (
                  <a
                    className="circle-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`visit ${item.org}`}
                  >
                    ↗
                  </a>
                ) : (
                  <span className="circle-link" aria-hidden="true">
                    ·
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about-section" id="about">
        <Reveal className="about-visual">
          <div className="about-photo-shell">
            <Image
              className="about-photo"
              src="/assets/mahin.jpg"
              alt="Mahin smiling outdoors"
              width={760}
              height={900}
            />
            <span>hi :)</span>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={100}>
          <p className="section-kicker">about me · 04</p>
          <h2>i&apos;m mahin.</h2>
          <p>
            i&apos;m a student who likes building at the edge of software and
            the physical world. the best projects, to me, are surprising at
            first and obvious once you use them.
          </p>
          <p>
            right now i&apos;m exploring ai agents, robotics, computer vision,
            and the communities that help more young people become builders.
          </p>
          <div className="about-links">
            <a
              className="soft-button soft-button-light"
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
            >
              github <span>↗</span>
            </a>
            <a
              className="soft-button"
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
            >
              linkedin <span>↗</span>
            </a>
          </div>
        </Reveal>
      </section>

      <section className="contact-section" id="contact">
        <Reveal className="contact-bubble">
          <p>have a weird idea?</p>
          <h2>let&apos;s build it.</h2>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            say hello <span>↗</span>
          </a>
        </Reveal>
      </section>

      <footer>
        <a href="#top">mahin bharathwaj</a>
        <p>building between code and the real world.</p>
        <div>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
