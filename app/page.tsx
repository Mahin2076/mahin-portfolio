'use client';

import Image from 'next/image';
import { useEffect, type CSSProperties } from 'react';

const LINKEDIN = 'https://www.linkedin.com/in/mahin-bharathwaj-344b8a31b/';
const GITHUB = 'https://github.com/Mahin2076';

const projects = [
  {
    number: '01',
    title: 'foundry',
    type: 'ai agents',
    description:
      'an agentic software factory that researches where a product can win, then turns the idea into a shipped experience.',
    result: 'track winner',
    detail: 'zero downtime hackathon',
  },
  {
    number: '02',
    title: 'vero',
    type: 'machine learning',
    description:
      'a real-time misinformation detector that analyzes headlines and turns noisy information into a clearer decision.',
    result: '2nd place',
    detail: 'los altos hacks',
  },
  {
    number: '03',
    title: 'battlebets',
    type: 'computer vision',
    description:
      'historical fight intelligence meets live vision to update win probabilities while two robots are still in the arena.',
    result: 'live odds',
    detail: 'battlebots ai build night',
  },
  {
    number: '04',
    title: 'grizzly hacks',
    type: 'community systems',
    description:
      'a student hackathon platform and community giving young builders a real place to start, ship, and find their people.',
    result: '600+ builders',
    detail: 'tech director',
    href: 'https://grizzlyhacks.com',
  },
];

const metrics = [
  {
    label: 'hackathon wins',
    value: '10×',
    note: 'across ai, hardware, robotics, and product',
    width: '100%',
  },
  {
    label: 'linkedin followers',
    value: '5k',
    note: 'a growing network of builders and researchers',
    width: '82%',
  },
  {
    label: 'builders reached',
    value: '600+',
    note: 'through student-led hackathon communities',
    width: '68%',
  },
];

const experience = [
  {
    year: '2026',
    role: 'researcher',
    org: 'ucla',
    detail:
      'studied why manufacturing robots struggled during tesla’s model 3 ramp; published in ucla’s abstract booklet.',
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

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('ready');
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      document.documentElement.classList.remove('ready');
      observer.disconnect();
    };
  }, []);

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="mark">
          mahin&apos;s portfolio
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">
            github
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">
            linkedin
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <p className="hero-name">mahin bharathwaj</p>
        <div className="portrait-frame">
          <Image
            src="/assets/mahin-headshot.png"
            alt="Mahin Bharathwaj"
            width={620}
            height={720}
            priority
          />
        </div>
        <p className="hero-line">
          student builder working across ai, robotics, and hardware.
        </p>
        <div className="command-bar">
          <code>$ open mahin&apos;s work</code>
          <a href="#work">enter →</a>
        </div>
        <div className="quick-links">
          <span>10× hackathon winner</span>
          <span>5k linkedin followers</span>
          <span>danville, california</span>
        </div>
        <a className="scroll-cue" href="#practice">
          scroll to inspect ↓
        </a>
      </section>

      <div className="content">
        <section className="text-section" id="practice" data-reveal>
          <div className="section-intro">
            <span>01</span>
            <h1>how i work</h1>
            <p>three principles</p>
          </div>
          <div className="manifesto">
            <h2>build the strange idea until it feels obvious.</h2>
            <ol>
              <li>
                <span>1.</span>
                <p>
                  start with a real problem, not a technology looking for one.
                </p>
              </li>
              <li>
                <span>2.</span>
                <p>
                  make the smallest version that proves the hard part works.
                </p>
              </li>
              <li>
                <span>3.</span>
                <p>
                  put it in front of people, learn quickly, and keep shipping.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="work-section" id="work">
          <div className="section-intro" data-reveal>
            <span>02</span>
            <h1>selected work</h1>
            <p>things i&apos;ve built</p>
          </div>
          <div className="project-table">
            {projects.map((project, index) => {
              const content = (
                <>
                  <span className="project-number">{project.number}</span>
                  <div className="project-title">
                    <h2>{project.title}</h2>
                    <span>{project.type}</span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-result">
                    <span>{project.result}</span>
                    <small>{project.detail}</small>
                  </div>
                  <span className="project-arrow">↗</span>
                </>
              );

              return (
                <article
                  key={project.title}
                  data-reveal
                  style={{ '--delay': `${index * 55}ms` } as CSSProperties}
                >
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`visit ${project.title}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div>{content}</div>
                  )}
                </article>
              );
            })}
          </div>
          <p className="table-note" data-reveal>
            more experiments and source code live on{' '}
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github →
            </a>
          </p>
        </section>

        <section className="metrics-section">
          <div className="section-intro" data-reveal>
            <span>03</span>
            <h1>signals</h1>
            <p>selected numbers</p>
          </div>
          <div className="metric-table">
            <div className="metric-head">
              <span>signal</span>
              <span>value</span>
              <span>relative scale</span>
              <span>context</span>
            </div>
            {metrics.map((metric, index) => (
              <div
                className="metric-row"
                data-reveal
                key={metric.label}
                style={
                  {
                    '--delay': `${index * 65}ms`,
                    '--metric-width': metric.width,
                  } as CSSProperties
                }
              >
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
                <div className="metric-track">
                  <i />
                </div>
                <small>{metric.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <div className="section-intro" data-reveal>
            <span>04</span>
            <h1>experience</h1>
            <p>where i&apos;ve learned</p>
          </div>
          <div className="experience-table">
            {experience.map((item, index) => (
              <article
                key={`${item.org}-${item.year}`}
                data-reveal
                style={{ '--delay': `${index * 65}ms` } as CSSProperties}
              >
                <span>{item.year}</span>
                <div>
                  <h2>{item.org}</h2>
                  <small>{item.role}</small>
                </div>
                <p>{item.detail}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`visit ${item.org}`}
                  >
                    ↗
                  </a>
                ) : (
                  <i>—</i>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="community-section">
          <div className="section-intro" data-reveal>
            <span>05</span>
            <h1>community</h1>
            <p>building is social</p>
          </div>
          <figure data-reveal>
            <div className="community-image">
              <Image
                src="/assets/community.png"
                alt="Mahin with friends"
                width={1036}
                height={1378}
              />
            </div>
            <figcaption>
              <span>people over platforms.</span>
              <p>5k linkedin followers · 600+ student builders reached</p>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">
                linkedin profile ↗
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="about-section" id="about" data-reveal>
          <div className="section-intro">
            <span>06</span>
            <h1>about</h1>
            <p>the short version</p>
          </div>
          <div className="about-grid">
            <h2>i&apos;m mahin.</h2>
            <div>
              <p>
                i&apos;m a student who likes building at the edge of software
                and the physical world. the best projects, to me, are surprising
                at first and obvious once you use them.
              </p>
              <p>
                right now i&apos;m exploring ai agents, robotics, computer
                vision, and the communities that help more young people become
                builders.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-section" data-reveal>
          <div className="section-intro">
            <span>07</span>
            <h1>contact</h1>
            <p>have a strange idea?</p>
          </div>
          <h2>let&apos;s build it.</h2>
          <div className="contact-command">
            <code>linkedin.com/in/mahin-bharathwaj</code>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              open ↗
            </a>
          </div>
          <div className="contact-links">
            <a href={GITHUB} target="_blank" rel="noreferrer">
              github
            </a>
            <span>·</span>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">
              linkedin
            </a>
          </div>
        </section>

        <footer>
          <span>mahin bharathwaj</span>
          <span>building between code and the real world.</span>
          <a href="#top">back to top ↑</a>
        </footer>
      </div>
    </main>
  );
}
