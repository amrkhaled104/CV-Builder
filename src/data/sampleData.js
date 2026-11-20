import { generateId } from "../utils/id";

export function createSampleData() {
  const generalInfo = {
    firstName: "Amr",
    lastName: "Khaled",
    headline: "Software Engineer",
    location: "Cairo, Egypt",
    email: "amr.khaled@example.com",
    phone: "+20 101 234 5678",
    bio: "Software Engineer with hands-on experience in building scalable web architectures, distributed systems, and backend performance optimization using React, TypeScript, Node.js, and Redis.",
    links: [
      {
        id: generateId(),
        title: "LinkedIn",
        customTitle: "",
        url: "https://linkedin.com/in/amrkhaled",
      },
      {
        id: generateId(),
        title: "GitHub",
        customTitle: "",
        url: "https://github.com/amrkhaled",
      },
    ],
  };

  const educationList = [
    {
      id: generateId(),
      schoolName: "Mansoura University",
      study: "B.S. in Computer Engineering",
      place: "Mansoura, Egypt",
      grade: "3.9/4.0",
      subTitle: "Faculty of Engineering",
      linkText: "",
      linkUrl: "",
      bullets:
        "Programming Coursework: Algorithms & Data Structures, Operating Systems, Database Systems, Computer Networks\nCSE Coursework: Distributed Systems, Computer Architecture, Object-Oriented Design",
      durationType: "date",
      startDate: "2021-09-01",
      endDate: "2026-06-01",
      customDuration: "",
      isCurrent: false,
    },
    {
      id: generateId(),
      schoolName: "OSSU & MOOCs",
      study: "Self-Directed Computer Science Curriculum",
      place: "Online",
      grade: "",
      subTitle:
        "Completed rigorous coursework equivalent to a full undergraduate CS curriculum from Stanford and UW.",
      linkText: "Curriculum",
      linkUrl: "https://github.com/ossu/computer-science",
      bullets:
        "Coursework: Advanced Algorithms, Software Architecture, Distributed Systems Engineering",
      durationType: "date",
      startDate: "2021-10-01",
      endDate: "",
      customDuration: "",
      isCurrent: true,
    },
  ];

  const skillList = [
    {
      id: generateId(),
      category: "Languages",
      skills: [
        { id: generateId(), name: "C++" },
        { id: generateId(), name: "Python" },
        { id: generateId(), name: "TypeScript" },
        { id: generateId(), name: "JavaScript" },
        { id: generateId(), name: "SQL" },
        { id: generateId(), name: "Go" },
      ],
    },
    {
      id: generateId(),
      category: "Frameworks & Libraries",
      skills: [
        { id: generateId(), name: "React" },
        { id: generateId(), name: "Node.js" },
        { id: generateId(), name: "Express" },
        { id: generateId(), name: "Next.js" },
        { id: generateId(), name: "FastAPI" },
      ],
    },
    {
      id: generateId(),
      category: "Developer Tools",
      skills: [
        { id: generateId(), name: "Git" },
        { id: generateId(), name: "Docker" },
        { id: generateId(), name: "Kubernetes" },
        { id: generateId(), name: "Linux" },
        { id: generateId(), name: "Redis" },
        { id: generateId(), name: "PostgreSQL" },
        { id: generateId(), name: "GitHub Actions" },
      ],
    },
  ];

  const workList = [
    {
      id: generateId(),
      position: "Software Engineer",
      companyName: "Tech Solutions",
      location: "Cairo, Egypt",
      companyDescription: "High-concurrency web platforms and cloud infrastructure",
      responsibilities: [
        "Achieved 35% reduction in API response latency by designing a multi-layer Redis caching architecture.",
        "Spearheaded microservices migration for payment gateway, increasing transaction throughput by 40%.",
        "Led automated test coverage expansion from 45% to 88% across 14 core backend services.",
        "Developed real-time event analytics pipeline processing 2M+ daily events using Kafka and Node.js.",
      ].join("\n"),
      durationType: "date",
      customDuration: "",
      startDate: "2023-07-01",
      endDate: "2025-01-01",
      isCurrent: false,
      linkText: "Company Website",
      linkUrl: "https://example.com",
    },
    {
      id: generateId(),
      position: "Freelance Software Engineer",
      companyName: "Upwork",
      location: "Remote",
      companyDescription: "Full-stack client projects and performance optimization",
      responsibilities: [
        "Delivered 12+ production web applications with 100% on-time milestone delivery.",
        "Optimized client database queries and indices, cutting average page load times by 50%.",
      ].join("\n"),
      durationType: "date",
      customDuration: "",
      startDate: "2021-09-01",
      endDate: "2023-06-01",
      isCurrent: false,
      linkText: "Upwork Profile",
      linkUrl: "https://upwork.com",
    },
  ];

  const projectList = [
    {
      id: generateId(),
      title: "Distributed Task Queue",
      tagline: "High-throughput asynchronous job processor built in TypeScript and Redis",
      description: [
        "Built distributed task queue engine handling 10k+ concurrent background jobs with zero message drop.",
        "Engineered fault-tolerant retry mechanism with exponential backoff and dead-letter queue isolation.",
        "Optimized worker memory usage, reducing background processor CPU utilization by 25%.",
      ].join("\n"),
      durationType: "date",
      startDate: "2024-01-01",
      endDate: "2024-04-01",
      customDuration: "",
      isCurrent: false,
      links: [
        {
          id: generateId(),
          title: "GitHub Repo",
          customTitle: "",
          url: "https://github.com/amrkhaled/task-queue",
        },
        {
          id: generateId(),
          title: "Live Demo",
          customTitle: "",
          url: "https://demo.example.com",
        },
      ],
    },
  ];

  const customSections = [
    {
      id: "custom-open-source-projects",
      title: "OPEN SOURCE PROJECTS",
      items: [
        {
          id: generateId(),
          title: "Chromium",
          tagline: "Open-source browser codebase powering Google Chrome, Edge, and Brave",
          description: [
            "Fixed memory regression in V8 garbage collection pipeline by auditing weak callback lifecycle.",
            "Implemented automated layout regression test suite covering CSS Grid subpixel snapping.",
          ].join("\n"),
          durationType: "date",
          startDate: "2024-03-01",
          endDate: "2024-09-01",
          customDuration: "",
          isCurrent: false,
          links: [
            {
              id: generateId(),
              title: "PR #14285",
              customTitle: "",
              url: "https://chromium-review.googlesource.com/c/chromium/src/+/14285",
            },
            {
              id: generateId(),
              title: "GitHub Mirror",
              customTitle: "",
              url: "https://github.com/chromium/chromium",
            },
          ],
        },
      ],
    },
  ];

  return {
    generalInfo,
    educationList,
    skillList,
    workList,
    projectList,
    customSections,
  };
}

// Export pre-instantiated presets for backward compatibility
const defaultSample = createSampleData();
export const sampleGeneralInfo = defaultSample.generalInfo;
export const sampleEducation = defaultSample.educationList;
export const sampleSkills = defaultSample.skillList;
export const sampleWork = defaultSample.workList;
export const sampleProjects = defaultSample.projectList;
export const sampleCustomSections = defaultSample.customSections;
