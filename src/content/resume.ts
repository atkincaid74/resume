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
    linkedin: Link;
    github: Link;
  };
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
    "I lead engineering at the intersection of insurance, platform design, and applied AI.",
    "I work directly with underwriters and business leaders to define how their work actually happens — often formalizing undocumented processes — and translate that into policy administration systems, raters, workflows, and integrations that scale in production.",
    "I own platforms end-to-end and manage teams across internal engineering and forward-deployed vendor partners.",
  ],
  location: "Amityville, NY",
  email: "hello@kincaid.io",
  links: {
    site: { label: "kincaid.io", href: "https://kincaid.io" },
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/a-t-kin" },
    github: { label: "GitHub", href: "https://github.com/atkincaid74" },
  },
  experience: [
    {
      company: "Acrisure",
      roles: [
        {
          title: "Sr. Manager, Underwriting Systems",
          start: "Aug 2025",
          end: "Present",
          bullets: [
            "Manage four internal engineers and direct a four-person forward-deployed team from our platform vendor — one roadmap across two reporting lines.",
            "Own the monolith API I built — the system of record for rating and integrations across internal and external systems. Roughly 1,000 insureds quoted and ~$15M in bound premium per month.",
            "Serve as the translation layer between underwriting, actuarial, business leadership, and platform engineering — the person who turns a meeting into a spec and a spec into code.",
            "Make the key design decisions for how business workflow lands in the new policy admin system — often defining the process itself with underwriters before it gets built.",
            "Drive the consolidation of multiple MGA verticals onto a shared, modern policy admin platform — unifying database and accounting, and standardizing policy lifecycle across the book.",
          ],
        },
        {
          title: "Backend Team Lead",
          start: "Feb 2024",
          end: "Aug 2025",
          bullets: [
            "Led a backend team of 2–3 engineers and stood up the underwriting platform modernization effort that became today's policy admin program.",
            "Architected the first generation of our raters, workflow system, and integration surface — now owned at platform scale.",
            "Translated underwriting and business requirements into durable backend services, establishing patterns still used today.",
            "Promoted to Sr. Manager after expanding scope beyond the original team charter.",
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
            "Built the full policy administration system from scratch — quoting, binding, issuance, endorsements, and the data model under all of it.",
            "Replaced a vendor-built Excel rater with a Python rater on a custom DSL — moving rating logic into version control and giving actuarial a readable, auditable model. Designed the DSL so state DOI reviewers could read and reason about the rater during rate filings.",
            "Led backend development for a commercial insurance platform, partnering daily with underwriting, actuarial, product, and compliance.",
            "Established CI/CD, testing, and documentation practices the team still runs on; mentored engineers through the shift from scripts to services.",
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
          title: "Quantitative Analyst (Associate → II)",
          start: "Jun 2017",
          end: "Sep 2021",
          bullets: [
            "Developed and maintained the Python analytical package housing the capital adequacy model, projection model, and supporting credit-rating tooling used by the Quantitative Analysis team.",
            "Led design and implementation of the team's first formal CI/CD pipeline (Azure DevOps); designed schemas for the analytical and reporting pipelines; contributed to a Vue.js SPA and Django REST API serving internal analysts and external clients.",
            "Started by converting Excel/VBA models into Python and consolidating standalone models into a single maintainable codebase.",
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
