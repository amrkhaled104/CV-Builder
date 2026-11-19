# 📄 CV Builder

> A developer-first, ATS-optimized resume workspace for software engineers and Computer Science graduates targeting FAANG+ and Fortune 500 companies.

---

## ⚡ Overview

Most commercial resume builders prioritize decorative graphic templates that fail Applicant Tracking Systems (ATS) and irritate technical hiring managers. 

**CV Builder** enforces the battle-tested conventions of technical hiring:
- 📑 **Single-Column Architecture:** 100% predictable top-to-bottom ATS parsing order.
- 🎯 **LaTeX & Deedy Aesthetics:** Clean horizontal dividers, right-aligned dates, and academic typography.
- 📏 **Strict 1-Page Constraint:** Real-time A4 boundary guide and density presets (`Compact`, `Normal`, `Spacious`).
- 🤖 **Built-in ATS & Quality Linter:** Instant feedback on punctuation errors (Joel Spolsky rule), action verbs, and Google XYZ metrics.
- 💾 **Data Portability:** Browser-native storage with offline JSON export and import.
- 🖨️ **Zero-Loss Print-to-PDF:** Native browser vector PDF export with zero pixelation or soft-wrap glitches.

---

## 📖 Comprehensive Documentation

Explore the complete modular documentation suite in the [`docs/`](./docs/README.md) directory:

- 🧠 [**01. Core Philosophy**](./docs/01-core-philosophy.md): Engineering principles, Omar Shawky's guidelines, single-column mandate, and the Joel Spolsky screening rule.
- 🛠️ [**02. Features Guide**](./docs/02-features-guide.md): Complete walkthrough of the SaaS UI, ATS auditor, typography scoping, section reordering, and PDF export.
- ✍️ [**03. Technical Resume Writing Guide**](./docs/03-writing-guide.md): Google's XYZ formula (`Accomplished X by Y doing Z`), strong action verbs cheat sheet, and skills categorization.
- 🏗️ [**04. Architecture & Technical Breakdown**](./docs/04-architecture-and-code.md): Deep dive into React 19, TypeScript state coordination, storage auto-migrations, and print stylesheet mechanics.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/cv-builder.git
   cd cv-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run ESLint checks:**
   ```bash
   npm run lint
   ```

---

## 🏛️ Credits & References

- Designed around the best practices compiled in [Omar Shawky's CS Resume Guide](https://omarshawky1.github.io/portfolio/resume.html).
- Layout inspired by popular academic $\LaTeX$ formats (Jake's Resume, Deedy Resume).
- Bullet writing structure based on Laszlo Bock's Google XYZ formula (*Work Rules!*).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
