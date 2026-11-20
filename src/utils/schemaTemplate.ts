/**
 * Sample template JSON illustrating the valid CV Builder schema.
 * Used for user guidance, schema documentation, and downloadable sample templates.
 */
export const CV_TEMPLATE_OBJECT = {
  generalInfo: {
    firstName: "John",
    lastName: "Doe",
    headline: "Software Engineer",
    phone: "+1 555 123 4567",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Results-driven Software Engineer with experience in distributed systems, web architectures, and performance optimization.",
    links: [
      {
        id: "link-1",
        title: "LinkedIn",
        customTitle: "",
        url: "https://linkedin.com/in/johndoe",
      },
      {
        id: "link-2",
        title: "GitHub",
        customTitle: "",
        url: "https://github.com/johndoe",
      },
    ],
  },
  educationList: [
    {
      id: "edu-1",
      schoolName: "University of California, Berkeley",
      study: "B.S. in Computer Science",
      place: "Berkeley, CA",
      grade: "3.8 / 4.0",
      subTitle: "School of Engineering",
      linkText: "",
      linkUrl: "",
      bullets:
        "Relevant Coursework: Data Structures, Algorithms, Distributed Systems, Database Management Systems",
      durationType: "date",
      startDate: "2018-09",
      endDate: "2022-05",
      customDuration: "",
      isCurrent: false,
    },
  ],
  workList: [
    {
      id: "work-1",
      companyName: "Acme Cloud Systems",
      position: "Software Engineer",
      responsibilities:
        "Engineered real-time telemetry pipeline using Go and Kafka, reducing latency by 42% across 10M+ daily events.\nSpearheaded migration of legacy monolith to containerized microservices on Kubernetes, improving deployment frequency by 3x.\nArchitected automated CI/CD pipeline using GitHub Actions, cutting release turnaround time from 2 hours to 15 minutes.",
      location: "San Francisco, CA",
      companyDescription: "Cloud Infrastructure",
      linkText: "acmecloud.com",
      linkUrl: "https://acmecloud.com",
      durationType: "date",
      startDate: "2022-06",
      endDate: "",
      customDuration: "",
      isCurrent: true,
    },
  ],
  projectList: [
    {
      id: "proj-1",
      title: "Distributed Task Scheduler",
      tagline: "Fault-tolerant job scheduler in Go",
      description:
        "Implemented leader election using Raft consensus, guaranteeing zero task loss across abrupt node crashes.\nDesigned RESTful API and WebSocket dashboard serving 500+ concurrent requests with sub-10ms response latency.",
      durationType: "date",
      startDate: "2023-01",
      endDate: "2023-05",
      customDuration: "",
      isCurrent: false,
      links: [
        {
          id: "plink-1",
          title: "GitHub",
          customTitle: "",
          url: "https://github.com/johndoe/task-scheduler",
        },
      ],
    },
  ],
  skillList: [
    {
      id: "skill-1",
      category: "Languages",
      skills: [
        { id: "s-1", name: "TypeScript" },
        { id: "s-2", name: "Go" },
        { id: "s-3", name: "Python" },
        { id: "s-4", name: "SQL" },
      ],
    },
    {
      id: "skill-2",
      category: "Technologies & Tools",
      skills: [
        { id: "s-5", name: "React" },
        { id: "s-6", name: "Node.js" },
        { id: "s-7", name: "Docker" },
        { id: "s-8", name: "Kubernetes" },
        { id: "s-9", name: "PostgreSQL" },
      ],
    },
  ],
  customSections: [],
  sectionOrder: ["summary", "education", "experience", "projects", "skills"],
};

/**
 * Returns formatted JSON string of the template schema.
 */
export function getCvTemplateJsonString(): string {
  return JSON.stringify(CV_TEMPLATE_OBJECT, null, 2);
}

/**
 * Triggers a client-side download of the cv-template.json file.
 */
export function downloadCvTemplateJson(): void {
  const jsonString = getCvTemplateJsonString();
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cv-template.json";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
