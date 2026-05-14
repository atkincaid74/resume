// Tailored variant of the resume — rendered at /resume.
// Same shape and tone as src/content/resume.ts; copy is adjusted to lean
// into insurance platform modernization, underwriting workflow automation,
// and practical AI adoption rather than restating the generic positioning.

import type { Resume } from "./resume";

export const resume: Resume = {
  name: "Andrew Kincaid",
  initials: "AK",
  headline: "Engineering leader building the systems underwriters actually use.",
  positioning: "Senior Manager, Underwriting Systems",
  summary: [
    "Senior engineering leader specializing in insurance platform modernization, underwriting workflow automation, and AI-enabled operational transformation. Deep experience building and scaling policy administration systems, raters, and underwriting platforms in complex MGA environments, bridging underwriting, actuarial, operations, and engineering teams to formalize ambiguous business processes into scalable systems and automation. Hands-on across Python backend systems, workflow architecture, AI-assisted engineering practices, and operational tooling.",
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
            "Manage four internal engineers and direct a four-person forward-deployed vendor team, driving a single roadmap across two reporting lines.",
            "Built and own the core API platform — the system of record for rating and integrations across internal and external systems. Roughly 1,000 insureds quoted and ~$15M in bound premium per month.",
            "Serve as the translation layer between underwriting, actuarial, operations, business leadership, and platform engineering — formalizing ambiguous operational workflows into scalable systems, integrations, and automation.",
            "Make the key design decisions for how business workflow lands in the new policy admin system — often defining the process itself with underwriters before it gets built.",
            "Drive the consolidation of multiple MGA verticals onto a shared, modern policy admin platform — unifying database and accounting, and standardizing policy lifecycle across the book.",
            "Partner directly with underwriting leadership to formalize undocumented operational processes into scalable workflows, policy administration capabilities, rating logic, integrations, and automation systems.",
            "Introduced AI-assisted engineering and operational workflows, including building MCP-style tooling layers over policy administration systems to expose internal workflows as callable tools for automation, debugging, specification generation, and engineering acceleration.",
            "Drove practical adoption of LLM-assisted workflows across engineering and underwriting operations, focusing on productivity gains, faster iteration cycles, workflow automation, and internal tooling enablement rather than experimental AI research.",
          ],
        },
        {
          title: "Backend Team Lead",
          start: "Feb 2024",
          end: "Aug 2025",
          bullets: [
            "Led a backend team of 2–3 engineers and stood up the underwriting platform modernization effort that became today's policy admin program.",
            "Architected the first generation of our raters, workflow system, and integration surface — now owned at platform scale.",
            "Translated underwriting, actuarial, and operations requirements into durable backend services, establishing patterns still used today.",
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
            "Led backend development for a commercial insurance platform, partnering daily with underwriting, actuarial, and operations.",
            "Established CI/CD, testing, and documentation practices for the platform; mentored engineers through the shift from scripts to services.",
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
  pdfFile: "/andrew-kincaid-resume-cf.pdf",
};
