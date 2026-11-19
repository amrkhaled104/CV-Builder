# CV Builder

A tool to build clean, single-column software engineering resumes tailored for tech industry standards and Applicant Tracking Systems (ATS).

The layout and design rules are based on [Omar Shawky's Resume Guide](https://omarshawky1.github.io/portfolio/resume.html).

---

## Key Principles

- **Single-Column Only**: Avoids ATS parsing bugs and gives the applicant full control over reading order.
- **Academic and LaTeX Aesthetics**: Clean horizontal section lines, right-aligned dates, and consistent typography without distracting graphics.
- **Strict One-Page Limit**: Real-time A4 boundary guide and density presets (Compact, Normal, Spacious) to ensure the resume fits cleanly on one page.
- **Built-in Quality Audit**: Instant checks for punctuation spacing (the Joel Spolsky rule), action verbs, and quantifiable metrics (Google's XYZ formula).
- **Zero-Loss PDF Print**: Direct browser print-to-PDF with selectable, searchable vector text and zero image rasterization.
- **Local and Private**: All data stays in your browser. Supports full JSON export and import for backups.

---

## Documentation

Full developer documentation is located in the `docs/` folder:

- [Documentation Index](./docs/README.md): Hub connecting all guides.
- [Architecture](./docs/architecture.md): Project structure, state management, storage, and print engine.
- [Features Guide](./docs/features.md): Overview of all user-facing features and components.
- [Resume Rules](./docs/resume-rules.md): Formatting constraints based on Omar Shawky's guide.
- [Contributing Guide](./docs/contributing.md): How to set up locally, add new fields or sections, and test your changes.

---

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm

### Installation and Running

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cv-builder.git
   cd cv-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Run ESLint checks:
   ```bash
   npm run lint
   ```

---

## References

- [Omar Shawky's Resume Guide](https://omarshawky1.github.io/portfolio/resume.html)
- Laszlo Bock's Google XYZ formula (*Work Rules!*)
- Jake's Resume and Deedy Resume LaTeX formats

---

## License

This project is open source and available under the [MIT License](LICENSE).
