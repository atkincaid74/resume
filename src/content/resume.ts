// Single source of truth for resume content.
// Rendered both on the web page (src/pages/index.astro) and the print page
// (src/pages/resume/print.astro) that Playwright turns into the PDF.
// Edit here, run `npm run build:full` to regenerate both.

export type Link = { label: string; href: string };

export type Role = {
  title: string;
  start: string; // "Aug 2025"
  end: string; // "Present" | "Jan 2024"
  summary?: string;
  bullets: string[];
};

export type CompanyGroup = {
  company: string;
  roles: Role[]; // newest first
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Resume = {
  name: string;
  initials: string;
  headline: string;
  positioning: string;
  summary: string;
  location: string;
  email: string;
  links: {
    site: Link;
    ambr: Link;
    linkedin: Link;
    github: Link;
  };
  highlights: { label: string; body: string }[];
  experience: CompanyGroup[];
  skills: SkillGroup[];
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
  summary:
    "I lead engineering at the intersection of insurance, platform design, and applied AI. My work lives where business process meets software: sitting with underwriters and business leaders, defining how their work actually happens, and turning that into policy admin systems, raters, workflows, and integrations that hold up in production. I own platforms end-to-end and manage teams across internal engineering and forward-deployed vendor partners.",
  location: "Amityville, NY",
  email: "hello@kincaid.io",
  links: {
    site: { label: "kincaid.io", href: "https://kincaid.io" },
    ambr: { label: "getambr.app", href: "https://getambr.app" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/andrew-kincaid" },
    github: { label: "GitHub", href: "https://github.com/kincaidio" },
  },
  highlights: [
    {
      label: "Platform ownership",
      body: "Designed and almost entirely built the monolith API powering underwriting — raters, workflows, and every internal and external integration run through it.",
    },
    {
      label: "Business-to-systems translation",
      body: "Partner with underwriters, actuaries, and business leaders to define the process itself, then design the software that supports it. In many cases I help the business codify its own workflow for the first time.",
    },
    {
      label: "Cross-team leadership",
      body: "Manage four internal engineers and direct a four-person forward-deployed team from our platform vendor — one unit shipping against one roadmap.",
    },
    {
      label: "Modernization at scale",
      body: "Leading the transition of multiple MGA verticals off legacy policy admin systems onto a modern, shared platform — standardizing workflows, accounting, and policy lifecycle across the book.",
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
          summary:
            "Own the modernization of multiple MGA verticals from legacy policy admin systems onto a modern, shared policy admin platform. Sit between business leadership, underwriting, actuarial, and engineering — and make the calls on how real-world workflow becomes real software.",
          bullets: [
            "Drive the transition of multiple MGA verticals off legacy policy admin platforms onto a modern, shared policy admin system — unifying them on one database and accounting ecosystem and aligning policy status, binding, and issuance across the book.",
            "Make the key design decisions for how business workflow is implemented in the new policy admin system — often defining the process itself alongside underwriters before it can be built.",
            "Manage four internal engineers and direct a four-person forward-deployed team from our platform vendor, running one roadmap across two reporting lines.",
            "Own the monolith API I built — the system of record for every rater and every integration with internal and external counterparties.",
            "Serve as the single translation layer between underwriting, actuarial, business leadership, and platform engineering; the person who turns a meeting into a spec and a spec into code.",
          ],
        },
        {
          title: "Backend Team Lead",
          start: "Feb 2024",
          end: "Aug 2025",
          bullets: [
            "Led a backend team of 2–3 engineers and kicked off the underwriting platform modernization effort that became our current policy admin program.",
            "Architected the first generation of our raters, workflow system, and integration surface — the same components I now own at platform scale.",
            "Translated underwriting and business requirements into durable backend services, building the patterns the wider team still uses today.",
            "Promoted into Sr. Manager after demonstrating ownership of scope far beyond the original team charter.",
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
            "Led the backend team powering a commercial insurance platform, partnering daily with underwriting, actuarial, product, and compliance.",
            "Built a full policy administration system from scratch — quoting, binding, issuance, endorsements, and the data model under all of it.",
            "Replaced a vendor-built Excel rater with a Python rater built on a custom DSL, moving rating logic into version control and giving business users a readable, auditable model they could contribute to.",
            "Established CI/CD, testing, and documentation practices the team still runs on; mentored engineers through the shift from scripts to services.",
            "Supported BI and data science with reporting, debugging, and visualization; helped shape forms, regulatory, and compliance workflows.",
          ],
        },
        {
          title: "Software Engineer",
          start: "Sep 2021",
          end: "Jun 2022",
          bullets: [
            "Shipped early backend services for the platform and helped set the technical direction that carried into my time as team lead.",
            "Built close working relationships with underwriting and product — the foundation for every later leadership role.",
          ],
        },
      ],
    },
    {
      company: "AM Best",
      roles: [
        {
          title: "Quantitative Analyst II",
          start: "Dec 2019",
          end: "Sep 2021",
          bullets: [
            "Developed and maintained a Python analytical package for the Quantitative Analysis Team, housing the capital adequacy model, projection model, and supporting credit-rating tooling.",
            "Designed database schemas and supporting objects for the team's analytical and reporting pipelines.",
            "Contributed to a Vue.js SPA and Django REST API serving internal analysts and external clients.",
            "Led design and implementation of CI/CD on Azure DevOps — first formal deployment pipeline the team ran.",
          ],
        },
        {
          title: "Quantitative Analyst",
          start: "Jun 2018",
          end: "Dec 2019",
          bullets: [
            "Built out new capabilities on the quantitative toolkit used across the ratings organization.",
            "Deepened the insurance-sector foundation that shapes how I build software today.",
          ],
        },
        {
          title: "Associate Analyst",
          start: "Jun 2017",
          end: "Jun 2018",
          bullets: [
            "Converted a suite of Excel/VBA models into Python and consolidated multiple standalone models into a single maintainable codebase.",
            "First exposure to treating insurance models as software — version-controlled, testable, reviewable.",
          ],
        },
      ],
    },
  ],
  skills: [
    {
      label: "Domain",
      items: [
        "Underwriting systems",
        "Policy administration",
        "Rating & raters",
        "Workflow automation",
        "Insurance operations",
        "Regulatory & compliance workflows",
      ],
    },
    {
      label: "Leadership",
      items: [
        "Direct engineering management",
        "Forward-deployed / vendor team direction",
        "Cross-functional stakeholder translation",
        "Platform roadmap ownership",
        "Mentorship & team growth",
      ],
    },
    {
      label: "Engineering",
      items: [
        "Python",
        "FastAPI",
        "Django",
        "SQL / PostgreSQL",
        "JavaScript / TypeScript",
        "Vue.js",
        "HTML / CSS",
        "GCP",
        "CI/CD",
        "API & integration design",
      ],
    },
    {
      label: "Applied AI",
      items: [
        "LLM-assisted workflows",
        "Document & form extraction",
        "Underwriter copilots",
        "Agentic automation for ops",
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
