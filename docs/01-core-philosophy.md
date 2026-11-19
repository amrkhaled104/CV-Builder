# 🧠 01. Core Philosophy & Design Principles

[← Back to Documentation Hub](./README.md) &bull; [Next: Features Guide →](./02-features-guide.md)

---

## 📌 The Problem with Typical Resume Builders

Most commercial resume builders (Canva, Novoresume, Zety) cater to graphic designers, marketers, and general corporate roles. They optimize for visual flashiness rather than engineering substance.

### Common Pitfalls of Typical Resumes:
1. ❌ **Two-Column Designs:** Confuse ATS parsers by interleaving left and right text streams, and waste horizontal whitespace.
2. ❌ **Arbitrary Skill Gauges:** Showing progress bars like *"80% in Python"* or *"4/5 stars in Java"* signals inexperience to technical interviewers.
3. ❌ **Soft-Wrapping & Broken Searchability:** Text rendering that wraps or hyphenates key technologies (e.g., breaking `Java` across lines) breaks recruiter `Ctrl+F` searches.
4. ❌ **Color Overload & Headshots:** Distracting visual elements that violate US/Canada/EU tech hiring standards and introduce bias.

---

## 🎯 The Foundation: Omar Shawky's Guidelines

This application was engineered specifically around the guidelines compiled in [Omar Shawky's CS Resume Guide](https://omarshawky1.github.io/portfolio/resume.html), tailored for tech applicants targeting FAANG+ and Fortune 500 companies in North America and Europe.

```
       ┌─────────────────────────────────────────────────────────┐
       │                Omar Shawky's Core Rules                 │
       ├─────────────────────────────────────────────────────────┤
       │  1. Single-Column Only      → Predictable reading flow  │
       │  2. Strict 1-Page Rule      → High density, zero fluff  │
       │  3. Perfect Punctuation     → Joel Spolsky rule         │
       │  4. Searchable Black/White  → Flawless Ctrl+F & ATS     │
       │  5. Impact Metrics (XYZ)    → Measurable engineering    │
       └─────────────────────────────────────────────────────────┘
```

---

## 🏛️ The Three Golden Pillars

### 1. The Single-Column Mandate
Recruiters spend an average of **6 to 8 seconds** on an initial resume screen. A single-column layout:
- Controls the exact scanning sequence of the recruiter's eye (Top to Bottom).
- Guarantees 100% deterministic parsing in every ATS (Workday, Greenhouse, Lever, Taleo).
- Eliminates margin waste and maximizes usable horizontal space for code metrics.

### 2. The Joel Spolsky Screening Rule
> *"Don't think of a résumé as a way to get a job: think of it as a way to give some hiring manager an excuse to hit DELETE. At least technically, your résumé has to be perfect to survive... Would I reject someone just because they don't quite understand the relationship between the comma and the space? Well, not necessarily. But when I have to find two summer interns out of 300 applicants... there's just no reason a college graduate can't get this right."*
> — **Joel Spolsky**, Co-Founder of Stack Overflow

Hiring managers at top tech firms receive hundreds of qualified applicants per position. Any surface-level defect—inconsistent dates, missing spaces after commas, unformatted bullet points—serves as an instant screening filter.

### 3. The Strict One-Page Constraint
Unless you have 7+ years of industry experience, a software engineering resume must fit on **exactly one page**. 
- A resume spilling onto page 2 by 3 or 4 lines signals a lack of conciseness.
- CV Builder enforces this via a real-time **A4 1-Page Boundary Indicator** and density presets (`Compact`, `Normal`, `Spacious`) to ensure your content fills exactly one page.

---

## 🔗 Next Steps

- Explore the tool's capabilities: [02. Features Guide →](./02-features-guide.md)
- Learn how to write high-converting bullets: [03. Resume Writing Guide →](./03-writing-guide.md)
- Inspect the codebase architecture: [04. Architecture & Code →](./04-architecture-and-code.md)
