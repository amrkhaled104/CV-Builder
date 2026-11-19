# 🛠️ 02. Features Guide

[← Back to Core Philosophy](./01-core-philosophy.md) &bull; [Next: Resume Writing Guide →](./03-writing-guide.md)

---

## 🧭 Feature Overview Matrix

| Feature | Purpose | Key Benefit |
| :--- | :--- | :--- |
| **SaaS Workspace UI** | Clean, collapsible accordion form panel | Zero clutter, fast navigation, no nested boxes |
| **Live Dual-Mode Preview** | Real-time preview with A4 scaling | Immediate feedback on formatting and length |
| **ATS & Quality Linter** | Real-time audit modal with 0–100% score | Catches punctuation bugs, weak verbs, and missing links |
| **1-Page Guide & Density** | Visual A4 cutoff line + Spacing presets | Fits your content cleanly into exactly 1 page |
| **Scoped Typography** | LaTeX Serif vs. Modern Sans | Resume fonts never leak into the app controls |
| **Dynamic Reordering** | Reorder sections up or down | Prioritize Experience over Education for seniors, etc. |
| **Custom Sections** | Add Open Source, Publications, Awards | Extends standard sections without layout breaks |
| **JSON Import / Export** | Full data portability & backups | Maintain multiple resumes (Frontend, Backend, etc.) |
| **Zero-Loss Print Engine** | Standard browser print-to-PDF | Perfectly sized A4 vector PDF, 100% text searchable |

---

## 🔍 Detailed Feature Walkthrough

### 1. 🗂️ Rebalanced Header & File Dropdown
The top navigation bar groups all file and state management into a clean `File ▾` menu:
- **Save Draft:** Persists the current state to browser storage with instant visual confirmation (`✓ Draft Saved!`).
- **Resume Saved Draft:** Restores the last saved working session.
- **Export JSON Backup:** Downloads a clean `.json` file (`cv-resume-[name].json`) to store on Google Drive, GitHub, or local disk.
- **Import JSON:** Restores any previously exported `.json` file with full schema validation.
- **Load Sample CV:** Populates realistic tech engineering sample data with Google's XYZ formula.

The right side of the header holds quick-access high-frequency actions:
- **Sort:** Toggles section reordering mode.
- **ATS Badge:** Displays your live score (e.g. `ATS 90%`) and opens the audit dialog.
- **Theme Toggle:** Flawless transition between Dark and Light mode.
- **Download PDF:** High-prominence CTA to export a pixel-perfect PDF.

---

### 2. 🎯 Built-In ATS & Proofreading Linter
Clicking the **ATS** badge opens a detailed audit modal based on top tech screening rules:

- **Punctuation & Spacing Audit (Joel Spolsky Rule):**
  Scans all text areas for missing spaces after commas (e.g., `React,Node` $\rightarrow$ flags warning with recommendation `React, Node`).
- **Strong Action Verbs Verification:**
  Checks whether bullet points begin with decisive past-tense engineering verbs (`Engineered`, `Spearheaded`, `Refactored`, `Automated`).
- **Quantifiable Metrics (Google XYZ Formula):**
  Ensures your bullet points contain measurable impact indicators (`%`, latency metrics, throughput, scale numbers).
- **Contact Completeness:**
  Verifies that Full Name, Professional Email, Phone Number, LinkedIn, and GitHub links are present.
- **Scoring Engine:**
  Computes a live score out of 100 with actionable suggestions.

---

### 3. 📏 Visual 1-Page Guide & Density Controls
Located directly above the preview paper in the **Preview Controls Bar**:

- **Show 1-Page Guide Toggle:** Displays a dashed red boundary at the exact A4 cutoff (`297mm`).
- **Smart Overflow Pill:** If your resume extends beyond 1 page, a high-contrast pill appears: `⚠️ Over 1 page`.
  - Hovering provides context-aware guidance:
    - If density is `Normal`: advises switching to `Compact` spacing or trimming bullets.
    - If density is already `Compact`: advises tightening descriptions or removing older entries.
- **Spacing Presets:**
  - `Compact (Fit 1 Page)`: Slightly tighter padding and line-height to fit extra content.
  - `Standard Normal`: Default balanced spacing.
  - `Spacious`: Comfortable layout for applicants with fewer entries.

---

### 4. 🔤 Scoped Typography Engine
Choose between two industry-standard aesthetic styles without altering the editor UI:
- **LaTeX Serif (Latin Modern / Computer Modern):** The gold standard of academic and engineering resumes, mimicking a freshly compiled `.tex` document.
- **Modern Sans (Source Sans / Inter):** Clean, crisp, and modern aesthetic.

> [!NOTE]
> The selected font is strictly scoped to `.cvPreview`. The application chrome, form fields, and modal popups remain clean sans-serif (`Inter`).

---

### 5. 🔄 Dynamic Section Reordering (Sort Mode)
Different career stages demand different section hierarchies:
- **New Graduates / Students:** `Education` $\rightarrow$ `Projects` $\rightarrow$ `Experience` $\rightarrow$ `Skills`.
- **Experienced Engineers:** `Experience` $\rightarrow$ `Skills` $\rightarrow$ `Projects` $\rightarrow$ `Education`.

Clicking **Sort** in the header enables reordering mode. Use the **↑** and **↓** arrows on each section header to instantly adjust layout priority.

---

### 6. 🖨️ Zero-Loss PDF Print Engine
Clicking **Download PDF** invokes a fine-tuned print engine via `react-to-print`:
- **Paper Dimensions:** `@page { size: A4 portrait; margin: 12mm 14mm; }`.
- **Break-Inside Protection:** Prevents entries from awkward page-split cuts (`break-inside: avoid; page-break-inside: avoid;`).
- **Pure Black Typography:** All text and links print in `#000000` with clean underlines, ensuring crisp readability on any physical or digital printer.
- **No Soft-Wrapping:** Text rendering utilizes `hyphens: none` to guarantee every word remains searchable via `Ctrl+F`.

---

## 🔗 Next Steps

- Master technical bullet points: [03. Resume Writing Guide →](./03-writing-guide.md)
- Learn how the code is architected: [04. Architecture & Code →](./04-architecture-and-code.md)
