/**
 * Design system: dark editorial portfolio (purple-toned)
 * - Typography: Space Grotesk display, DM Sans body, Instrument Serif italic accents
 * - Motion: scroll-reveal via <Reveal>, custom magnetic / ghost buttons, glass cards
 * - Layout: editorial container max-w 1360px with generous padding & hairline rules
 */
import { Navbar } from "@/components/portfolio/Navbar";
import { Cursor } from "@/components/portfolio/Cursor";
import { Reveal } from "@/components/portfolio/Reveal";

const portrait = "/manus-storage/portrait_00422057.jpg";
const projectEato = "/manus-storage/project-eato_5f80870e.jpg";
const projectBalance = "/manus-storage/project-balanceflow_883c51a4.jpg";
const projectNest = "/manus-storage/project-nest_d9ae7d54.jpg";
const projectPlaybook = "/manus-storage/project-playbook_79402323.jpg";
const projectCaretap = "/manus-storage/project-caretap_72c5e22e.jpg";

/* ---------- DATA ---------- */

const services = [
  { n: "01", title: "UI/UX Design", desc: "Interfaces that feel inevitable — clear flows, deliberate hierarchy, real users at the centre." },
  { n: "02", title: "Brand Identity", desc: "Visual systems with a point of view. Marks, type, and voice that compound over time." },
  { n: "03", title: "Web Design", desc: "Editorial sites and marketing surfaces engineered for clarity, speed and conversion." },
  { n: "04", title: "Mobile App Design", desc: "Native-feeling iOS & Android experiences with rigorous attention to gesture and motion." },
  { n: "05", title: "Design Systems", desc: "Token-driven libraries in Figma that scale across teams without losing craft." },
  { n: "06", title: "Framer Development", desc: "Production builds in Framer with motion, CMS and pixel-honest fidelity." },
];

const projects = [
  {
    img: projectEato,
    cat: "Mobile · Food Delivery",
    title: "EATO",
    desc: "A seamless food delivery app — warm, intuitive and built around the ordering rhythm.",
    tags: ["iOS", "Mobile App", "UI/UX"],
    href: "https://www.behance.net/gallery/243901837/EATO-A-Seamless-Food-Delivery-App",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    img: projectBalance,
    cat: "Fintech · Dashboard",
    title: "BalanceFlow",
    desc: "A personal finance command-centre that reframes balance, income and outcome.",
    tags: ["Fintech", "Dashboard"],
    href: "https://www.behance.net/gallery/244920275/BalanceFlow-Personal-Finance-Fintech-Dashboard",
    span: "md:col-span-1 md:row-span-2",
  },
  {
    img: projectNest,
    cat: "Web · Coworking",
    title: "NEST Corner",
    desc: "A coworking space web design — calm, editorial and built to convert curious visitors into members.",
    tags: ["Web Design", "Branding"],
    href: "https://www.behance.net/gallery/246723179/NEST-Corner-Coworking-Space-Web-Design",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    img: projectPlaybook,
    cat: "Web · Editorial",
    title: "The Daily Playbook",
    desc: "A sports news editorial experience — bold typography, rhythmic layouts, story-first hierarchy.",
    tags: ["Editorial", "Web Design"],
    href: "https://www.behance.net/gallery/246720335/The-Daily-Playbook-Sports-News-Editorial-Web-Design",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    img: projectCaretap,
    cat: "Healthcare · App",
    title: "CareTap",
    desc: "Bridging patients and professional medical care in a single, considered tap.",
    tags: ["Healthcare", "Mobile App"],
    href: "https://www.behance.net/gallery/243907819/CareTap-Medical-Appointment-Healthcare-App",
    span: "md:col-span-3 md:row-span-1",
  },
];

const process = [
  { n: "01", t: "Discover", d: "Interviews, audits, business and user goals — set the brief." },
  { n: "02", t: "Research", d: "Synthesis, competitive teardown, jobs-to-be-done mapping." },
  { n: "03", t: "Wireframe", d: "Architecture, flows, low-fi explorations to derisk the shape." },
  { n: "04", t: "Design", d: "High fidelity craft, components, motion language, edge cases." },
  { n: "05", t: "Prototype", d: "Interactive prototypes & usability rounds to validate." },
  { n: "06", t: "Deliver", d: "Tokens, hand-off, design ops — and a system that ships." },
];

const skills = [
  { name: "UI Design", v: 96 },
  { name: "UX Research", v: 88 },
  { name: "Figma", v: 98 },
  { name: "Design Systems", v: 92 },
  { name: "Framer", v: 84 },
  { name: "Prototyping", v: 94 },
  { name: "Webflow", v: 78 },
  { name: "Branding", v: 86 },
];

const testimonials = [
  {
    name: "Ayesha Karim",
    role: "Founder, Northline Studio",
    quote:
      "Rubayet thinks in systems and ships with the patience of a craftsman. Our product finally feels like a brand.",
    rating: 5,
  },
  {
    name: "Daniyal Khan",
    role: "Product Lead, BalanceFlow",
    quote:
      "Rare combination of editorial taste and product rigour. Every screen reads like it had a hundred small decisions behind it.",
    rating: 5,
  },
  {
    name: "Sara Lindgren",
    role: "Design Manager, Orbit",
    quote:
      "He raised the bar for the entire team. Calm, sharp, fast — the dashboard is the best work we've shipped.",
    rating: 5,
  },
];

/* ---------- SECTIONS ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-36 md:pt-44 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="container-editorial relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                Hey, I'm Shah Rubayet
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-6 font-display font-bold leading-[1.02] tracking-tight text-5xl md:text-6xl lg:text-[64px]">
                A UI/UX{" "}
                <span className="font-serif-italic normal-case text-accent">&amp; Brand</span>{" "}
                Designer
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted-foreground text-pretty">
                Transforming ideas into intuitive, editorial digital products —
                interfaces, brand systems and prototypes for teams who care about craft.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#work" className="magnetic-btn">
                  View Projects
                  <span className="arrow">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <a href="/cv.pdf" download className="ghost-btn">
                  Download My CV
                </a>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — portrait */}
          <div className="lg:col-span-7 relative">
            <Reveal delay={200}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-tr from-accent/20 via-transparent to-olive/10 rounded-[2.5rem] blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card aspect-[5/4] md:aspect-[4/3]">
                  <img
                    src={portrait}
                    alt="Portrait of Shah Rubayet Ahmed"
                    width={1280}
                    height={960}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Floating UI cards */}
                <div className="glass absolute -left-4 md:-left-10 bottom-10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
                  <div className="size-9 rounded-full bg-accent/20 grid place-items-center text-accent">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20l9-16H3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Available
                    </div>
                    <div className="text-sm">For Q1 ‘26 projects</div>
                  </div>
                </div>

                <div className="glass absolute -right-3 md:-right-8 top-10 rounded-2xl px-4 py-3 shadow-2xl">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Based in
                  </div>
                  <div className="text-sm font-medium">Dhaka, BD — UTC+6</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hero footer features strip */}
        <Reveal delay={400}>
          <div className="mt-20 md:mt-28 hairline pt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["User-Centered Design", "Engaging experiences tailored to your audience."],
              ["Brand Identity & Strategy", "Visual storytelling that makes your brand unforgettable."],
              ["Responsive & Modern UI", "Pixel-perfect designs optimised for every device."],
              ["Seamless Prototypes", "Interactive mockups ready for engineering hand-off."],
            ].map(([t, d]) => (
              <div key={t}>
                <div className="text-[11px] uppercase tracking-[0.22em] font-medium">{t}</div>
                <div className="mt-3 text-[13px] leading-relaxed text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Tools() {
  const tools = [
    { name: "Figma", slug: "figma" },
    { name: "Framer", slug: "framer" },
    { name: "Adobe XD", slug: "adobexd" },
    { name: "Photoshop", slug: "adobephotoshop" },
    { name: "Illustrator", slug: "adobeillustrator" },
  ];
  return (
    <section className="py-20 md:py-24 border-y border-border">
      <div className="container-editorial">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Tools)</div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl leading-tight max-w-xl">
                Software I design <span className="font-serif-italic normal-case text-accent">with</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              A focused, opinionated toolkit — Figma for product, Framer & Webflow for the web,
              and the Adobe suite for brand and editorial craft.
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 grid grid-cols-3 md:grid-cols-5 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {tools.map((t) => (
              <div
                key={t.slug}
                className="group bg-background flex flex-col items-center justify-center gap-3 py-8 px-4 transition-colors hover:bg-card"
                title={t.name}
              >
                <img
                  src={`https://cdn.simpleicons.org/${t.slug}/ffffff`}
                  alt={`${t.name} logo`}
                  width={36}
                  height={36}
                  loading="lazy"
                  className="size-9 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground group-hover:text-foreground transition-colors">
                  {t.name}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(About)</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95]">
              Crafting meaningful
              <span className="block">
                <span className="font-serif-italic normal-case text-accent">digital</span> experiences
              </span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:pt-10">
          <Reveal delay={150}>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              I'm <span className="text-foreground">Shah Rubayet Ahmed</span> — a UI/UX & brand designer based in Dhaka.
              I help founders and product teams turn ambiguous problems into clear,
              user-centered products with a strong editorial voice.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              I trained through the Google UX Design Certificate and Grameenphone Academy's
              Figma Design System program, and I've been shipping work across SaaS, fintech,
              healthcare and food delivery since.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10 grid grid-cols-3 gap-6 hairline pt-8">
              {[
                ["1+", "Years designing"],
                ["20+", "Projects shipped"],
                ["10+", "Happy clients"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-4xl md:text-5xl">{k}</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-28 md:py-36 border-t border-border">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <Reveal>
            <div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Services)</div>
              <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] max-w-2xl">
                What I can <span className="font-serif-italic normal-case text-accent">build</span> for you
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Six core practices — combined when a project needs more than one,
              and never bolted on for the sake of scope.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="group relative bg-background p-8 md:p-10 h-full transition-colors duration-500 hover:bg-card">
                <div className="flex items-start justify-between">
                  <div className="text-[11px] tracking-[0.3em] text-muted-foreground">{s.n}</div>
                  <div className="size-9 rounded-full border border-border grid place-items-center transition-transform duration-500 group-hover:rotate-45 group-hover:border-accent">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-12 font-display text-3xl md:text-4xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="py-28 md:py-40 border-t border-border">
      <div className="container-editorial">
        <div className="flex items-end justify-between gap-8">
          <Reveal>
            <div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Selected Work)</div>
              <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95]">
                Featured <span className="font-serif-italic normal-case text-accent">projects</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150} className="hidden md:block">
            <a href="#contact" className="ghost-btn">
              All Case Studies
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 md:auto-rows-[280px] gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className={`${p.span} col-span-1 h-full`}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card group block h-full"
              >
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card h-full min-h-[280px]">
                  <img
                    src={p.img}
                    alt={`${p.title} — ${p.cat}`}
                    loading="lazy"
                    className="project-img absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[11px] tracking-[0.22em] uppercase">
                    <span className="text-foreground/80">{p.cat}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                      View
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-3xl md:text-5xl leading-none">{p.title}</h3>
                    <p className="mt-3 max-w-md text-[13px] text-muted-foreground">{p.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-border bg-background/40 backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="py-28 md:py-36 border-t border-border">
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
          <Reveal>
            <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Process)</div>
            <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[0.95]">
              A streamlined process for{" "}
              <span className="font-serif-italic normal-case text-accent">exceptional</span> design
            </h2>
            <p className="mt-6 text-sm text-muted-foreground max-w-sm leading-relaxed">
              A clear, repeatable system — six steps that turn ambiguity into a polished, shippable product.
            </p>
          </Reveal>
        </div>

        <ul className="lg:col-span-8 flex flex-col">
          {process.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <li className="group grid grid-cols-12 items-baseline gap-6 py-8 border-t border-border last:border-b">
                <span className="col-span-2 md:col-span-1 text-[11px] tracking-[0.3em] text-muted-foreground">
                  {p.n}
                </span>
                <h3 className="col-span-10 md:col-span-4 font-display text-3xl md:text-4xl transition-colors group-hover:text-accent">
                  {p.t}
                </h3>
                <p className="col-span-12 md:col-span-7 text-sm text-muted-foreground leading-relaxed">
                  {p.d}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-28 md:py-36 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 ambient-glow opacity-60 pointer-events-none" />
      <div className="container-editorial relative">
        <Reveal>
          <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Words)</div>
          <h2 className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] max-w-3xl">
            Kind things <span className="font-serif-italic normal-case text-accent">people</span> have said
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="glass rounded-3xl p-8 h-full flex flex-col">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-6 text-lg leading-relaxed text-pretty">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                  <div className="size-11 rounded-full bg-gradient-to-br from-accent/40 to-olive/40 grid place-items-center font-display text-base">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-0.5">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="py-28 md:py-36 border-t border-border">
      <div className="container-editorial grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Toolkit)</div>
            <h2 className="mt-5 font-display text-5xl md:text-6xl leading-[0.95]">
              Skills sharpened over <span className="font-serif-italic normal-case text-accent">years</span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 50}>
              <div>
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-xl tracking-wider">{s.name.toUpperCase()}</div>
                  <div className="text-[11px] tracking-[0.2em] text-muted-foreground">{s.v}%</div>
                </div>
                <div className="mt-3 h-px bg-border relative overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-[1400ms] ease-out"
                    style={{ width: `${s.v}%` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 md:py-48 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="container-editorial text-center relative">
        <Reveal>
          <div className="text-[11px] tracking-[0.32em] uppercase text-muted-foreground">(Contact)</div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 font-display text-6xl md:text-[10vw] leading-[0.9]">
            Let's make
            <span className="block">
              <span className="font-serif-italic normal-case text-accent">something</span> great
            </span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-lg mx-auto text-muted-foreground">
            Available for select UI/UX, brand and Framer engagements from Q1 2026.
            Reach out — I read every message personally.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex justify-center">
            <a href="mailto:shahrubayet@gmail.com" className="magnetic-btn">
              shahrubayet@gmail.com
              <span className="arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={350}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-3xl mx-auto rounded-2xl overflow-hidden">
            {[
              { label: "Cell", value: "+880 1619 868693", href: "tel:+8801619868693" },
              { label: "Email", value: "shahrubayet@gmail.com", href: "mailto:shahrubayet@gmail.com" },
              { label: "LinkedIn", value: "shah-rubayet-ahmed", href: "https://www.linkedin.com/in/shah-rubayet-ahmed" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="bg-background px-6 py-7 text-left hover:bg-card transition-colors group"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{c.label}</div>
                <div className="mt-3 text-sm md:text-base text-foreground break-all group-hover:text-accent transition-colors">
                  {c.value}
                </div>
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={400}>
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
            {[
              { name: "LinkedIn", href: "https://www.linkedin.com/in/shah-rubayet-ahmed" },
              { name: "Behance", href: "https://www.behance.net/shahrubayet" },
              { name: "Dribbble", href: "#" },
              { name: "Instagram", href: "#" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline hover:text-foreground transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container-editorial flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-accent" />
          <span className="font-display text-base tracking-[0.2em]">SHAH RUBAYET</span>
        </a>
        <div className="flex flex-wrap gap-6 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <a href="#work" className="hover:text-foreground">Work</a>
          <a href="#about" className="hover:text-foreground">About</a>
          <a href="#services" className="hover:text-foreground">Services</a>
          <a href="#contact" className="hover:text-foreground">Contact</a>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">© 2026 — Dhaka</span>
          <a href="#top" className="ghost-btn !py-2 !px-3" aria-label="Back to top">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="relative noise">
      <Cursor />
      <Navbar />
      <Hero />
      <Tools />
      <About />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
