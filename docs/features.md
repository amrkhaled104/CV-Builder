# Features Guide

[Back to Architecture](./architecture.md) | [Next: Resume Rules](./resume-rules.md)

This document provides a breakdown of every user-facing feature in CV Builder, explaining what it does, why it exists, and which files implement it.

---

## 1. Top Header and File Menu

**Files**: `src/components/layout/HeaderBar/HeaderBar.jsx`, `src/components/layout/HeaderBar/HeaderBar.css`

The header organizes actions based on frequency:

- **Brand Logo**: Fixed to the far left.
- **File Dropdown Menu**: Contains secondary data operations:
  - `Save Draft`: Writes the current CV state to `localStorage`.
  - `Resume Saved Draft`: Restores the saved draft (only visible when a saved draft exists).
  - `Export JSON Backup`: Downloads a `.json` backup file.
  - `Import JSON`: Opens a file picker to restore a `.json` file.
  - `Load Sample CV`: Replaces current fields with realistic software engineering sample data.
  - **Menu Behavior**: Closes on click-outside and on the `Escape` key.
- **Sort Button**: Toggles section reordering controls on the left form cards.
- **ATS Button**: Displays the current audit score (e.g. `ATS 90%`) and opens the audit dialog.
- **Theme Toggle**: Switches between Dark and Light mode.
- **Download PDF**: Primary CTA that opens the browser print dialog to export a clean PDF.

---

## 2. Collapsible Form Accordions

**Files**: `src/reusables/FormCard.jsx`, `src/reusables/FormCard.css`, `src/Forms/*`

- Each main section in the left sidebar is wrapped in a `FormCard`.
- Clicking the card header or pressing `Enter`/`Space` expands or collapses the section.
- This allows users to focus on one section at a time without endless scrolling.
- Reordering controls in the header stay clickable without toggling the accordion state.

---

## 3. Flattened Form Fields

**Files**: `src/Forms/GeneralInfo.jsx`, `src/reusables/FormBox.jsx`

- Replaced deeply nested cards with clean subheadings and dividers.
- Inputs for First Name / Last Name, Headline / Location, and Email / Phone are laid out in two columns using `InputRow` to reduce wasted vertical height.
- Labels and focus rings are standardized across all inputs, textareas, and select menus.

---

## 4. Live CV Preview

**Files**: `src/components/layout/CvReview/CvPreview.tsx`, `src/components/layout/CvReview/CvPreview.css`

The right side of the screen displays a live representation of the resume as it will appear when printed.

- **Reactive Updates**: Any change in the form appears immediately on the preview sheet.
- **Empty Filtering**: If a field or section is empty, it does not render.
- **Empty State**: When no data has been entered, an empty-state illustration prompts the user to start typing or click "Load Sample CV".

---

## 5. Typography and Spacing Controls

**Files**: `src/components/layout/CvReview/CvPreview.tsx`, `src/components/layout/CvReview/CvPreview.css`

Located in the toolbar above the preview paper:

- **Typography Selector**:
  - `LaTeX Serif`: Classic academic and engineering style (Latin Modern / Computer Modern / Times New Roman).
  - `Modern Sans`: Crisp sans-serif style (Source Sans Pro).
  - **Font Scoping**: The serif font applies only to `.cvPreview`. The app interface, forms, and buttons always use the modern sans-serif font stack (`Inter`).
- **Spacing Selector**:
  - `Compact (Fit 1 Page)`: Slightly reduced font size (13px) and margins to fit more content on a single page.
  - `Standard Normal`: Default balanced size (14px).
  - `Spacious`: Slightly relaxed margins (14.5px) for shorter resumes.

---

## 6. One-Page Limit Guide

**Files**: `src/components/layout/CvReview/CvPreview.tsx`, `src/components/layout/CvReview/CvPreview.css`

For software engineering candidates with less than 7 years of experience, staying on exactly one page is standard practice.

- **Visual Cutoff Line**: A red dashed guide renders at the 297mm height mark (standard A4 page height).
- **Status Pill**: If content extends beyond 297mm, a pill appears in the toolbar: `Over 1 page`.
- **Smart Tooltip**:
  - If Spacing is `Normal` or `Spacious`: warns the user to switch to `Compact` or trim bullet points.
  - If Spacing is already `Compact`: warns the user to trim bullet points or shorten descriptions.
- The guide line and warning pill are automatically hidden when printing to PDF.

---

## 7. ATS and Quality Linter

**Files**: `src/utils/atsLinter.ts`, `src/components/layout/AtsAuditModal/AtsAuditModal.tsx`

Calculates a real-time score out of 100 based on standard tech hiring filters:

- **Punctuation Check**: Catches missing spaces after commas (e.g. `React,Node` instead of `React, Node`).
- **Action Verbs Check**: Verifies that bullet points start with strong past-tense verbs (e.g., `Developed`, `Built`, `Optimized`).
- **Quantifiable Metrics Check**: Checks whether bullets contain numbers, percentages, or measurable results.
- **Contact Info Check**: Ensures full name, email, phone number, LinkedIn, and GitHub links are present.

---

## 8. Section Reordering

**Files**: `src/hooks/useSectionOrder.ts`, `src/components/layout/SectionOrderControls.tsx`

- Clicking **Sort** in the header reveals `↑` and `↓` arrows on each form card header.
- Users can move sections up or down depending on their career stage (e.g., students put Education before Experience; experienced engineers put Experience before Education).

---

## 9. Custom Sections

**Files**: `src/hooks/useCustomSections.ts`, `src/Forms/CustomSections.jsx`

- Users can add custom sections with arbitrary titles (e.g. `Open Source Projects`, `Certifications`, `Publications`).
- Custom sections support titles, taglines, dates, project links, and bullet point descriptions.

---

## Next Steps

- Review the resume rules: [Resume Rules](./resume-rules.md)
- Learn how to contribute: [Contributing Guide](./contributing.md)
