// Single source of truth for resume content.
// Rendered both on the web page (src/pages/index.astro) and the print page
// (src/pages/resume/print.astro) that Playwright turns into the PDF.
// Edit here, run `npm run build:full` to regenerate both.

export type Link = { label: string; href: string };

export type Role = {
  title: string;
  start: string; // "Aug 2025"
  end: string; // "Present" | "Jan 2024"
  bullets: string[];
};

export type CompanyGroup = {
  company: string;
  roles: Role[]; // newest first
};

export type Project = {
  title: string;
  link?: Link;
  body: string;
};

export type Resume = {
  name: string;
  initials: string;
  headline: string;
  positioning: string;
  summary: string[];
  location: string;
  email: string;
  links: {
    site: Link;
    ambr: Link;
    linkedin: Link;
    github: Link;
  };
  projects: Project[];
  experience: CompanyGroup[];
  education: {
    school: string;
    degree: string;
    detail?: string;
  };
  credentials: string[];
  pdfFile: string;
};

export const resume: Resume = {
  name: "Andrew Kincaid",
  initials: "AK",
  headline: "Engineering leader building the systems underwriters actually use.",
  positioning: "Senior Manager, Underwriting Systems",
  summary: [
    "I lead engineering at the intersection of insurance, platform design, and applied AI — turning underwriter workflows into production systems for MGAs and carriers.",
    "I run a team of eight (four internal, four forward-deployed from our platform vendor) and own the rating and integration backbone for a multi-MGA book moving to a unified policy admin platform: roughly 1,000 insureds quoted and ~$15M in bound premium per month.",
    "Background spans rating-agency quant work (AM Best), a 0→1 platform build (Koffie), and platform-scale consolidation across 12 MGAs (Acrisure). AIAF; SOA Exams P and FM.",
  ],
  location: "Amityville, NY",
  email: "hello@kincaid.io",
  links: {
    site: { label: "kincaid.io", href: "https://kincaid.io" },
    ambr: { label: "getambr.app", href: "https://getambr.app" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/a-t-kin" },
    github: { label: "GitHub", href: "https://github.com/atkincaid74" },
  },
  projects: [
    {
      title: "AMBR",
      link: { label: "getambr.app", href: "https://getambr.app" },
      body: "Baby-tracking iOS app I built as a hobby project and shipped to the App Store as a paid product after spotting a gap in the category. Daycares hand parents logs in dozens of one-off formats; I use Claude to extend AMBR's parser to new formats so parents can import logs directly without manual cleanup.",
    },
    {
      title: "Claude at Acrisure",
      body: "Use Claude daily across our platform work. Built an MCP server wrapping a third-party vendor system we previously had to operate by hand — turning a click-through admin workflow into a tool surface my team and our agents can call directly.",
    },
  ],
  experience: [
    {
      company: "Acrisure",
      roles: [
        {
          title: "Sr. Manager, Underwriting Systems",
          start: "Aug 2025",
          end: "Present",
          bullets: [
            "Run one roadmap across two reporting lines: four internal engineers and a four-person forward-deployed team from our platform vendor. Own the integration surface, escalation paths, and shared definition of done — the operational reality of building on a platform we don't control.",
            "Own the rating and integration backbone — a Python monolith I built from the first commit — that processes ~1,000 insured quotes per month and ~$15M in bound premium, serving as the system of record across MGA verticals and external integration partners.",
            "Drive the consolidation of 12 MGAs (each effectively an independent operating company under Acrisure's M&A umbrella) onto a shared policy admin platform — five migrations in flight, three live in production. Aligning database, accounting, and policy lifecycle (status, binding, issuance) across the book.",
            "Make the key design decisions for how business workflow is implemented in the new policy admin system — often defining the process itself alongside underwriters before it can be built.",
            "Serve as the translation layer between underwriting, actuarial, business leadership, and platform engineering; the person who turns a meeting into a spec and a spec into code.",
            "Own state reporting (via Incypher), audit trails, and PII handling across the platform; partnering on SOC 2 work currently in flight.",
          ],
        },
        {
          title: "Backend Team Lead",
          start: "Feb 2024",
          end: "Aug 2025",
          bullets: [
            "Promoted from this role to Sr. Manager. Led a 2–3 engineer backend team and stood up the underwriting platform modernization effort 0→1 — the program that became today's policy admin build.",
            "Architected the first generation of our raters, workflow system, and integration surface — now owned at platform scale.",
            "Translated underwriting and business requirements into durable backend services, establishing patterns still used today.",
          ],
        },
      ],
    },
    {
      company: "Koffie Financial",
      roles: [
        {
          title: "Backend Services Team Lead",
          start: "May 2022",
          end: "Jan 2024",
          bullets: [
            "Took the commercial insurance platform 0→1 as the founding backend lead — quoting, binding, issuance, endorsements, and the underlying data model from scratch.",
            "Replaced a vendor-built Excel rater with a Python rater on a custom DSL — moving rating logic into version control and giving actuarial a readable, auditable model they could contribute to. Designed the DSL specifically so state DOI reviewers could read and reason about the rater during rate filings.",
            "Led the backend team (2–3 engineers), partnering daily with underwriting, actuarial, product, and compliance.",
            "Established CI/CD, testing, and documentation practices the team still runs on; mentored engineers through the shift from scripts to services.",
          ],
        },
        {
          title: "Software Engineer",
          start: "Sep 2021",
          end: "Jun 2022",
          bullets: [
            "Shipped early backend services and helped set the technical direction that carried into my time as team lead.",
            "Built close working relationships with underwriting and product — the foundation for every later leadership role.",
          ],
        },
      ],
    },
    {
      company: "AM Best",
      roles: [
        {
          title: "Quantitative Analyst (Associate → II)",
          start: "Jun 2017",
          end: "Sep 2021",
          bullets: [
            "Developed and maintained the Python analytical package housing the capital adequacy model, projection model, and supporting credit-rating tooling used by the Quantitative Analysis team.",
            "Led design and implementation of the team's first formal CI/CD pipeline (Azure DevOps); designed schemas for the analytical and reporting pipelines; contributed to a Vue.js SPA and Django REST API serving internal analysts and external clients.",
            "Started by converting Excel/VBA models into Python — first exposure to treating insurance models as software. Promoted twice over four years.",
          ],
        },
      ],
    },
  ],
  education: {
    school: "Muhlenberg College",
    degree: "B.S., Mathematics",
    detail: "Football team captain",
  },
  credentials: [
    "Associate in Insurance Accounting and Finance (AIAF)",
    "Society of Actuaries — Exam P and Exam FM",
  ],
  pdfFile: "/andrew-kincaid-resume.pdf",
};
