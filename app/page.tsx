'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';

const LINKEDIN = 'https://www.linkedin.com/in/mahin-bharathwaj-344b8a31b/';
const GITHUB = 'https://github.com/Mahin2076';

const projects = [
  {
    number: '01',
    title: 'Foundry',
    kicker: 'Track Winner · Zero Downtime Hackathon',
    description:
      'An agentic software factory that researches where a product can win, then turns the idea into a shipped experience — landing page included.',
    result: 'SHIP → 03:00',
    tags: ['AI agents', 'Autonomous workflows', 'Observability'],
    accent: 'lime',
  },
  {
    number: '02',
    title: 'Vero',
    kicker: '2nd Place · Los Altos Hacks',
    description:
      'A real-time misinformation detector that analyzes headlines, flags unreliable content, and turns noisy information into a clear decision.',
    result: '98% ACCURACY',
    tags: ['Machine learning', 'Real-time analysis', 'Product'],
    accent: 'blue',
  },
  {
    number: '03',
    title: 'BattleBets',
    kicker: 'BattleBots AI Build Night',
    description:
      'Historical fight intelligence meets live computer vision to update win probabilities while two robots are still in the arena.',
    result: 'LIVE ODDS',
    tags: ['Computer vision', 'Data pipelines', 'Prediction'],
    accent: 'orange',
  },
  {
    number: '04',
    title: 'Grizzly Hacks',
    kicker: 'Tech Director · Community Builder',
    description:
      'A student hackathon platform and community engineered to give young builders a real place to start, ship, and find their people.',
    result: '600+ BUILDERS',
    tags: ['Community', 'Systems', 'Partnerships'],
    accent: 'pink',
    href: 'https://grizzlyhacks.com',
  },
];

const timeline = [
  {
    year: '2026',
    role: 'Researcher',
    org: 'UCLA',
    detail:
      'Studied why manufacturing robots struggled during Tesla’s Model 3 ramp; research published in UCLA’s abstract booklet.',
  },
  {
    year: '2025—26',
    role: 'Tech Director',
    org: 'Grizzly Hacks',
    detail:
      'Built the technical backbone for a rapidly growing student builder community and its hackathon experiences.',
  },
  {
    year: '2025',
    role: 'Mechatronics Intern',
    org: 'UC Berkeley Nuclear Engineering',
    detail:
      'Worked on hardware at the RadWatch / DoseNet lab, where sensing, physical systems, and public impact collide.',
    href: 'https://radwatch.berkeley.edu/team/mahin-bharathwaj/',
  },
];

const disciplines = ['AI AGENTS', 'ROBOTICS', 'COMPUTER VISION', 'MECHATRONICS', 'RESEARCH', 'COMMUNITY'];

function ScrambleText({ children }: { children: string }) {
  const [text, setText] = useState(children);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function scramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (timer.current) clearInterval(timer.current);
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!';
    let frame = 0;
    timer.current = setInterval(() => {
      setText(
        children
          .split('')
          .map((character, index) => {
            if (character === ' ') return ' ';
            if (index < frame / 2) return character;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(''),
      );
      frame += 1;
      if (frame > children.length * 2) {
        if (timer.current) clearInterval(timer.current);
        setText(children);
      }
    }, 28);
  }

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  return <span onMouseEnter={scramble}>{text}</span>;
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = node.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        setValue(target);
        observer.disconnect();
        return;
      }
      const start = performance.now();
      const duration = 1250;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - progress, 4))));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.65 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={node}>{value}{suffix}</span>;
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const card = useRef<HTMLElement>(null);

  function tilt(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${x * 8}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${y * -8}deg`);
    event.currentTarget.style.setProperty('--light-x', `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty('--light-y', `${(y + 0.5) * 100}%`);
  }

  function reset() {
    card.current?.style.setProperty('--tilt-x', '0deg');
    card.current?.style.setProperty('--tilt-y', '0deg');
  }

  const cardContent = (
    <>
      <div className="project-topline">
        <span>{project.number} / SELECTED WORK</span>
        <span className="project-arrow">↗</span>
      </div>
      <div className="project-signal" aria-hidden="true">
        <span /><span /><span /><span /><span /><span /><span />
      </div>
      <div className="project-body">
        <p>{project.kicker}</p>
        <h3><ScrambleText>{project.title}</ScrambleText></h3>
        <p className="project-description">{project.description}</p>
      </div>
      <div className="project-result">{project.result}</div>
      <ul className="tag-list" aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </>
  );

  return (
    <article
      ref={card}
      className={`project-card project-${project.accent}`}
      onPointerMove={tilt}
      onPointerLeave={reset}
      data-reveal
      tabIndex={project.href ? -1 : 0}
    >
      {project.href ? (
        <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>
          {cardContent}
        </a>
      ) : cardContent}
    </article>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const loader = window.setTimeout(() => setLoaded(true), 900);
    const root = document.documentElement;

    const onPointer = (event: PointerEvent) => {
      root.style.setProperty('--cursor-x', `${event.clientX}px`);
      root.style.setProperty('--cursor-y', `${event.clientY}px`);
    };
    const onScroll = () => {
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', `${distance > 0 ? window.scrollY / distance : 0}`);
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    }, { threshold: 0.14 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(loader);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <div className={`loader ${loaded ? 'loader-finished' : ''}`} aria-hidden="true">
        <div className="loader-mark">MB<span>//</span></div>
        <div className="loader-copy"><span>INITIALIZING PORTFOLIO</span><span>BUILD 10.0</span></div>
        <div className="loader-track"><span /></div>
      </div>

      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />

      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="Mahin Bharathwaj, home">MB<span>//26</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="nav-contact" href={LINKEDIN} target="_blank" rel="noreferrer">Let&apos;s talk <span>↗</span></a>
        </div>
        <button
          className={`menu-button ${menuOpen ? 'menu-button-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`} aria-hidden={!menuOpen}>
        {['work', 'experience', 'about'].map((item, index) => (
          <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>{item}
          </a>
        ))}
        <a href={GITHUB} target="_blank" rel="noreferrer"><span>04</span>GitHub ↗</a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer"><span>05</span>LinkedIn ↗</a>
      </div>

      <main className="site-shell">
        <section className="hero" id="top">
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow"><span /> SYSTEM ONLINE · DANVILLE, CA</p>
            <h1>
              I build things that
              <span>shouldn&apos;t work.</span>
              Then make them win.
            </h1>
            <p className="hero-description">
              I&apos;m Mahin — a student builder turning weird, ambitious ideas into working systems across AI, robotics, and hardware.
            </p>
            <div className="hero-actions">
              <a className="cta cta-primary" href="#work">Explore my work <span>↘</span></a>
              <a className="cta cta-quiet" href={LINKEDIN} target="_blank" rel="noreferrer">Let&apos;s connect ↗</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Portrait of Mahin Bharathwaj">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="portrait-frame">
              <Image src="/assets/mahin.jpg" alt="Mahin Bharathwaj" width={500} height={500} priority />
              <div className="portrait-scan" />
              <span className="focus-corner focus-a" />
              <span className="focus-corner focus-b" />
            </div>
            <div className="win-badge"><strong>10</strong><span>HACKATHON<br />WINS</span></div>
            <div className="coordinates">37.8216° N<br />121.9999° W</div>
            <div className="portrait-caption">MAHIN BHARATHWAJ / BUILDER 001</div>
          </div>

          <div className="hero-stats" aria-label="Highlights">
            <div><strong>10×</strong><span>Hackathon winner</span></div>
            <div><strong>5.6K</strong><span>Builder community</span></div>
            <div><strong>600+</strong><span>Grizzly builders</span></div>
            <a href="#work" aria-label="Scroll to selected work">Scroll to build <i>↓</i></a>
          </div>
        </section>

        <div className="ticker" aria-label="Areas of work">
          <div>
            {[...disciplines, ...disciplines].map((item, index) => (
              <span key={`${item}-${index}`}>{item}<b>✳</b></span>
            ))}
          </div>
        </div>

        <section className="work-section section-pad" id="work">
          <header className="section-heading" data-reveal>
            <p>01 / SELECTED WORK</p>
            <h2>Built fast.<br /><em>Built to matter.</em></h2>
            <p className="section-intro">Experiments that escaped the group chat and became products, research, and communities.</p>
          </header>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
          </div>
        </section>

        <section className="manifesto-section">
          <div className="manifesto-index">02 / OPERATING SYSTEM</div>
          <div className="manifesto-copy" data-reveal>
            <p>Fast is good.</p>
            <p>Taste makes it <span>matter.</span></p>
          </div>
          <div className="manifesto-notes" data-reveal>
            <span>[01] FIND THE REAL PROBLEM</span>
            <span>[02] BUILD THE WEIRD VERSION</span>
            <span>[03] MAKE PEOPLE CARE</span>
          </div>
          <div className="radar" aria-hidden="true">
            <span className="radar-ring radar-ring-a" />
            <span className="radar-ring radar-ring-b" />
            <span className="radar-ring radar-ring-c" />
            <span className="radar-sweep" />
            <i className="radar-dot dot-a" /><i className="radar-dot dot-b" /><i className="radar-dot dot-c" />
          </div>
        </section>

        <section className="experience-section section-pad" id="experience">
          <header className="section-heading compact" data-reveal>
            <p>03 / FIELD NOTES</p>
            <h2>Research.<br /><em>Hardware. Impact.</em></h2>
          </header>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-row" key={`${item.org}-${item.year}`} data-reveal>
                <span className="timeline-number">0{index + 1}</span>
                <time>{item.year}</time>
                <div>
                  <p>{item.role}</p>
                  <h3>{item.org}</h3>
                </div>
                <p className="timeline-detail">{item.detail}</p>
                {item.href ? <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Read more about ${item.org}`}>↗</a> : <span className="timeline-mark">✳</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="score-section" aria-label="Hackathon record">
          <div className="score-grid" aria-hidden="true" />
          <div className="score-label" data-reveal>THE SCORE SO FAR</div>
          <div className="score-number" data-reveal><CountUp target={10} /></div>
          <div className="score-copy" data-reveal>
            <h2>Hackathon wins.<br />Zero plans to slow down.</h2>
            <p>From misinformation detection to voice-first AI and agentic software factories: every build is a new excuse to learn faster.</p>
          </div>
          <div className="score-stamp" aria-hidden="true"><span>WIN</span><span>BUILD</span><span>REPEAT</span></div>
        </section>

        <section className="about-section section-pad" id="about">
          <div className="about-portrait" data-reveal>
            <Image src="/assets/mahin.jpg" alt="Mahin Bharathwaj" width={700} height={700} />
            <div className="about-portrait-label">NOT A STOCK PHOTO / ACTUAL BUILDER</div>
          </div>
          <div className="about-copy" data-reveal>
            <p className="section-code">04 / ABOUT THE HUMAN</p>
            <h2>Student by age.<br /><em>Builder by default.</em></h2>
            <p>
              I work where software hits the physical world: AI agents, computer vision, robotics, mechatronics, and the communities that turn ideas into momentum.
            </p>
            <p>
              Previously at Berkeley&apos;s RadWatch / DoseNet lab. Research at UCLA. Tech Director at Grizzly Hacks. Usually somewhere between a whiteboard, a terminal, and a deadline that looked impossible yesterday.
            </p>
            <div className="about-links">
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub · @Mahin2076 <span>↗</span></a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
              <a href="https://grizzlyhacks.com" target="_blank" rel="noreferrer">Grizzly Hacks <span>↗</span></a>
              <a href="https://radwatch.berkeley.edu/team/mahin-bharathwaj/" target="_blank" rel="noreferrer">Berkeley RadWatch <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-orbit" aria-hidden="true"><span /><span /><span /></div>
          <p data-reveal>HAVE A WEIRD IDEA?</p>
          <h2 data-reveal>Let&apos;s build the thing<br />everyone says is <em>too much.</em></h2>
          <a className="contact-button" href={LINKEDIN} target="_blank" rel="noreferrer" data-reveal>
            <span>Start a conversation</span><b>↗</b>
          </a>
        </section>
      </main>

      <footer>
        <a className="wordmark" href="#top" aria-label="Back to top">MB<span>//26</span></a>
        <p>BUILDING FROM DANVILLE, CA · © {year}</p>
        <div className="footer-links">
          <a href={GITHUB} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}
