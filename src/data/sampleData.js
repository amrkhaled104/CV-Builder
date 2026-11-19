export const sampleGeneralInfo = {
  firstName: "Amr",
  lastName: "Khaled",
  headline: "Software Engineer | Distributed Systems & Web Platforms",
  location: "Cairo, Egypt",
  email: "amr.khaled@example.com",
  phone: "+20 123 456 7890",
  bio: "Software Engineer with hands-on experience in building scalable web architectures, distributed systems, and backend performance optimization using React, TypeScript, Node.js, and Redis.",
  links: [
    {
      id: crypto.randomUUID(),
      title: "LinkedIn",
      customTitle: "",
      url: "https://linkedin.com/in/amrkhaled",
    },
    {
      id: crypto.randomUUID(),
      title: "GitHub",
      customTitle: "",
      url: "https://github.com/amrkhaled",
    },
  ],
};

export const sampleEducation = [
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
    schoolName: "OSSU & MOOCs",
    study: "Self-Directed Computer Science Curriculum",
    place: "Online",
    grade: "",
    subTitle:
      "Completed rigorous coursework equivalent to a full undergraduate CS curriculum from Stanford and UW.",
    linkText: "Curriculum Verification",
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

export const sampleSkills = [
  {
    id: crypto.randomUUID(),
    category: "Languages",
    skills: [
      { id: crypto.randomUUID(), name: "C++" },
      { id: crypto.randomUUID(), name: "Python" },
      { id: crypto.randomUUID(), name: "TypeScript" },
      { id: crypto.randomUUID(), name: "JavaScript" },
      { id: crypto.randomUUID(), name: "SQL" },
      { id: crypto.randomUUID(), name: "Go" },
    ],
  },
  {
    id: crypto.randomUUID(),
    category: "Frameworks & Libraries",
    skills: [
      { id: crypto.randomUUID(), name: "React" },
      { id: crypto.randomUUID(), name: "Node.js" },
      { id: crypto.randomUUID(), name: "Express" },
      { id: crypto.randomUUID(), name: "Next.js" },
      { id: crypto.randomUUID(), name: "FastAPI" },
    ],
  },
  {
    id: crypto.randomUUID(),
    category: "Developer Tools",
    skills: [
      { id: crypto.randomUUID(), name: "Git" },
      { id: crypto.randomUUID(), name: "Docker" },
      { id: crypto.randomUUID(), name: "Kubernetes" },
      { id: crypto.randomUUID(), name: "Linux" },
      { id: crypto.randomUUID(), name: "Redis" },
      { id: crypto.randomUUID(), name: "PostgreSQL" },
      { id: crypto.randomUUID(), name: "GitHub Actions" },
    ],
  },
];

export const sampleWork = [
  {
    id: crypto.randomUUID(),
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
    id: crypto.randomUUID(),
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

export const sampleProjects = [
  {
    id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
        title: "GitHub Repo",
        customTitle: "",
        url: "https://github.com/amrkhaled/task-queue",
      },
      {
        id: crypto.randomUUID(),
        title: "Live Demo",
        customTitle: "",
        url: "https://demo.example.com",
      },
    ],
  },
];

export const sampleCustomSections = [
  {
    id: "custom-open-source-projects",
    title: "OPEN SOURCE PROJECTS",
    items: [
      {
        id: crypto.randomUUID(),
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
            id: crypto.randomUUID(),
            title: "PR #14285",
            customTitle: "",
            url: "https://chromium-review.googlesource.com/c/chromium/src/+/14285",
          },
          {
            id: crypto.randomUUID(),
            title: "GitHub Mirror",
            customTitle: "",
            url: "https://github.com/chromium/chromium",
          },
        ],
      },
    ],
  },
];
