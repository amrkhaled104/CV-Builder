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
    subTitle: "OSSU lists Computer Science courses from Stanford University, University of Washington.",
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