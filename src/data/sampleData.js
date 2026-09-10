export const sampleGeneralInfo = {
  firstName: "FIRST",
  lastName: "LAST",
  headline: "Software Engineer ⋄ Computer & Control Engineer ",
  location: "Cairo, Egypt",
  email: "x@gmail.com",
  phone: "+020123456789",
  bio: "Passionate Software Engineer with experience in React, JavaScript and Node.js. Interested in building scalable web applications and solving real-world problems.",
  links: [
    {
      id: crypto.randomUUID(),
      title: "LinkedIn",
      customTitle: "",
      url: "https://linkedin.com/in/X",
    },
    {
      id: crypto.randomUUID(),
      title: "GitHub",
      customTitle: "",
      url: "https://github.com/X",
    },
  ],
};

export const sampleEducation = [
  {
    id: crypto.randomUUID(),
    schoolName: "Mansoura University",
    study: "B.S. in Computer Engineering,",
    place: "Location",
    grade: "3.9/4.0",
    subTitle: "",
    linkText: "",
    linkUrl: "",
    bullets:
      "Programming Coursework: Programming Languages, Algorithms & Data Structures, OOP & Design\nCSE Coursework: Digital Systems, Computer Architecture",
    durationType: "date",
    startDate: "2021-09-01",
    endDate: "2026-06-01",
    customDuration: "",
    isCurrent: false,
  },
  {
    id: crypto.randomUUID(),
    schoolName: "OSSU & MOOCs",
    study: "Self-Education",
    place: "",
    grade: "",
    subTitle:
      "OSSU lists Computer Science courses from Stanford University, University of Washington.",
    linkText: "Portfolio Link",
    linkUrl: "https://example.com/portfolio",
    bullets:
      "Programming Coursework: Algorithms, Systems, and Software Architecture",
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
    category: "Technical",
    skills: [
      { id: crypto.randomUUID(), name: "Skill 1" },
      { id: crypto.randomUUID(), name: "Skill 2" },
    ],
  },
  {
    id: crypto.randomUUID(),
    category: "Others",
    skills: [
      { id: crypto.randomUUID(), name: "Skill 1" },
      { id: crypto.randomUUID(), name: "Skill 2" },
    ],
  },
  {
    id: crypto.randomUUID(),
    category: "Languages",
    skills: [
      { id: crypto.randomUUID(), name: "Arabic (Native)" },
      { id: crypto.randomUUID(), name: "English (Professional)" },
    ],
  },
];
export const sampleWork = [
  {
    id: crypto.randomUUID(),
    position: "Role",
    companyName: "Company Name",
    location: "Location",
    companyDescription: "Company description",
    responsibilities: [
      "Achieved X% As Measured by Y by using/doing Z.",
      "Achieved X% growth for XYZ using A, B, and C skills.",
      "Led XYZ which led to X% of improvement in ABC",
      "Developed XYZ that did A, B, and C using X, Y, and Z.",
    ].join("\n"),
    durationType: "date",
    customDuration: "",
    startDate: "2021-09-01",
    endDate: "2026-06-01",
    isCurrent: false,
    linkText: "",
    linkUrl: "",
  },
  {
    id: crypto.randomUUID(),
    position: "Freelance Software Engineer",
    companyName: "Upwork",
    location: "",
    companyDescription: "",
    responsibilities: "",
    durationType: "date",
    customDuration: "",
    startDate: "2021-09-01",
    endDate: "2026-06-01",
    isCurrent: false,
    linkText: "Link",
    linkUrl: "https://upwork.com",
  },
];
