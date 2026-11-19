# User Guide: How to Build an Industry-Standard Resume

[Back to Docs Index](./README.md) | [Next: Features Guide](./features.md)

This guide walks you through building an Applicant Tracking System (ATS) compliant, FAANG-ready software engineering resume using CV Builder. Follow these steps to maximize your callback rate and avoid common mistakes that lead to automatic rejections.

---

## 1. Why Single-Column and ATS Compliance Matter

Most online resume builders use complex two-column grids, tables, progress bars, and embedded icons. While visually appealing to casual observers, they cause significant issues:

1. **ATS Parsing Glitches**: Many recruitment systems read text strictly from left to right across the full width of the page. Two-column resumes often get parsed with job titles from the left column mixed into dates or skills from the right column.
2. **Scan Fatigue**: Senior recruiters spend an average of 6 to 10 seconds on an initial resume screen. A single-column layout provides a predictable top-to-bottom reading path.
3. **Typography Standards**: Academic and engineering hiring standards favor clean typography (such as Latin Modern / LaTeX Serif or clean Sans-Serif) with clear horizontal rules over decorative graphics.

CV Builder enforces a strict single-column structure and generates selectable vector text on export, ensuring 100% accurate parsing by ATS engines.

---

## 2. Recommended Step-by-Step Workflow

### Step 1: Initialize Your Workspace
- If you are using the app for the first time, open the **File** menu in the top bar and click **Load Sample CV**.
- This loads a benchmark software engineer profile scoring 100% on the ATS audit, giving you a reference for tone, formatting, and density.
- You can overwrite each field with your own details as you proceed.

### Step 2: Determine Section Order
Click the **Sort** button in the header to reveal reordering arrows (`↑` and `↓`) on each section:

- **Students and Fresh Graduates**:
  - `Education` should appear immediately below `General Info`.
  - Follow with `Projects` or `Practical Experience`, then `Skills`.
- **Engineers with 1+ Years of Experience**:
  - `Practical Experience` should be positioned above `Education`.
  - Recruiters prioritize recent production impact over university coursework once you have professional experience.
- Click **Sort** again once your sections are ordered to lock the layout.

### Step 3: Write High-Impact Bullet Points (Google's XYZ Formula)
Avoid writing passive job duty descriptions such as:
- *Weak*: "Responsible for backend development and bug fixing."
- *Weak*: "Worked on an e-commerce website using React and Node.js."

Instead, use Google's XYZ formula:
> **Accomplished [X] as measured by [Y], by doing [Z]**

Every bullet should:
1. **Start with a strong past-tense action verb**: `Engineered`, `Architected`, `Optimized`, `Automated`, `Reduced`, `Spearheaded`, `Refactored`.
2. **State measurable impact (numbers, percentages, or scale)**: `35% latency reduction`, `10k+ daily users`, `40% throughput increase`.
3. **Specify the exact technologies used**: Mention frameworks, databases, and architectural patterns.

*Example*:
> "Achieved 35% reduction in API response latency by designing a multi-layer Redis caching architecture."

### Step 4: Use the AI Resume Enhancer (BYOK)
If you have raw notes, rough English drafts, or descriptions written in Arabic:
1. Click the **AI Key** button in the header bar.
2. Paste a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) and click **Save Key**. The key is stored locally in your browser and never leaves your machine.
3. In any work experience entry, project description, or bio summary, click **Enhance with AI**.
4. The enhancer rewrites your input using Omar Shawky's guidelines and the XYZ formula, checks for strong action verbs, and generates coach tips.
5. Review the suggestion in the preview box:
   - Click **Accept Suggestion** to apply the rewritten text.
   - Click **Discard** to keep your original text.

### Step 5: Keep It Strictly to One Page
Engineers with under 5 to 7 years of experience should strictly maintain a **one-page resume**.

1. Toggle **Show 1-Page Guide** in the toolbar above the CV preview.
2. A red dashed guide line indicates the bottom cutoff (standard A4 page height at 297mm).
3. If your content crosses the guide line:
   - Check the warning pill in the toolbar: `Over 1 page`.
   - In the **Spacing** dropdown, try switching to **Compact (Fit 1 Page)**.
   - If spacing is already set to Compact, trim redundant bullet points or shorten wordy sentences. Aim for 2 to 4 high-impact bullets per role.

### Step 6: Verify with the ATS Quality Linter
Check the **ATS** score badge in the header bar:
- Click the badge to open the detailed **ATS and Quality Audit** modal.
- Address any warnings:
  - **Punctuation Spacing**: Ensure there is always a space after commas (e.g. `Python, Docker` instead of `Python,Docker`).
  - **Action Verbs**: Confirm at least 60% of your bullet points begin with verified technical action verbs.
  - **Metrics**: Ensure quantifiable numbers or percentages are present in your experience and project descriptions.
  - **Contact Links**: Make sure both LinkedIn and GitHub profile links are included in the header.

### Step 7: Save Drafts and Export Backups
- Click **File > Save Draft** to persist your current CV in your browser's local storage.
- Click **File > Export JSON Backup** to download your resume data as a `.json` file.
- **Tip**: Export different JSON files for different specializations (e.g., `resume-backend.json`, `resume-frontend.json`). You can reload any version using **File > Import JSON**.

### Step 8: Export to PDF
1. Click the primary **PDF** button on the far right of the header bar.
2. In the browser print dialog, apply the following settings:
   - **Destination**: Save as PDF
   - **Paper Size**: A4
   - **Margins**: None (or Default)
   - **Headers and Footers**: Unchecked / Disabled
   - **Background Graphics**: Checked / Enabled
3. The resulting PDF contains clean, selectable vector text with clickable hyperlinks and zero visual artifacts.

---

## 3. Resume Dos and Don'ts

| Do | Don't |
|---|---|
| Use a strict single-column layout. | Use two-column, multi-table, or graphic-heavy layouts. |
| Stick strictly to one A4 page. | Spill 2–3 lines onto a second page. |
| Start every bullet with a strong action verb. | Start bullets with "Responsible for" or "Worked on". |
| Quantify results with metrics (%, ms, $, users). | List tasks without showing measurable outcome. |
| List skills as categorized keyword groups. | Use skill rating bars, percentages, or stars. |
| Include clickable LinkedIn and GitHub profile links. | Include full residential address, marital status, or photo. |
| Use standard ASCII punctuation with space after commas. | Cluster keywords without spaces (e.g., `React,Node,AWS`). |
| Export backups regularly using JSON export. | Rely solely on browser cache for important revisions. |

---

## 4. Next Steps

- Explore the technical design: [Architecture Overview](./architecture.md)
- Learn about the feature set: [Features Guide](./features.md)
- Review engineering formatting rules: [Resume Rules](./resume-rules.md)
- Contribute to the project: [Contributing Guide](./contributing.md)
