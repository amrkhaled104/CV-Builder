# Contributing Guide

[Back to Resume Rules](./resume-rules.md) | [Back to Docs Index](./README.md)

This guide walks you through setting up your local development environment, making changes, and adding new features to CV Builder.

---

## 1. Setting Up the Development Environment

### Requirements
- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm (bundled with Node.js)

### Steps
1. Clone the repository and navigate into the project folder:
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

---

## 2. Common Contribution Workflows

### How to Add a New Field to an Existing Section

1. **Update State (`src/App.tsx`)**:
   - Locate the state hook for that section (e.g. `educationList` or `generalInfo`).
   - Add your new field with a default value.
2. **Update Types (`src/utils/storage.ts`)**:
   - Find the matching type (e.g. `EducationItem`, `ExperienceItem`).
   - Add your field with the proper TypeScript type.
   - Update `isValidSessionData()` if this field should be checked during session validation.
3. **Update Form Component (`src/Forms/*.jsx`)**:
   - Add a `<FormBox label="Your Label">` containing the input element.
   - Bind the `value` and `onChange` handler.
4. **Update the Preview (`src/components/layout/CvReview/CvPreview.tsx`)**:
   - Locate the matching `case` in the `sections.map()` switch statement.
   - Render the field in the preview DOM using appropriate styling.
5. **Update Sample Data (`src/data/sampleData.js`)**:
   - Add an example value for the new field to keep the sample template complete.

---

### How to Add a New Rule to the ATS Linter

1. Open `src/utils/atsLinter.ts`.
2. Locate the `runAtsAudit()` function.
3. Add your validation logic.
4. Push a new `LintIssue` object to the `issues` array:
   ```typescript
   issues.push({
     id: "unique-rule-id",
     type: "warning", // "error" | "warning" | "success"
     category: "Proofreading", // "Structure" | "Contact" | "Proofreading" | "Impact & Action Verbs"
     message: "Short description of what was checked.",
     recommendation: "Actionable advice on how to fix it.",
   });
   ```
5. Ensure your rule adheres to the guidelines in [Resume Rules](./resume-rules.md).

---

### How to Style Components

- **CSS Variables**: Always use CSS variables from `src/App.css` so that your styles work seamlessly in both Dark and Light themes:
  - Backgrounds: `var(--bg-primary)`, `var(--bg-secondary)`, `var(--bg-card-subtle)`
  - Text: `var(--text-primary)`, `var(--text-secondary)`, `var(--text-muted)`
  - Borders: `var(--border-color)`, `var(--border-subtle)`
  - Accent / Primary: `var(--accent-primary)`, `var(--accent-hover)`, `var(--focus-ring)`
- **Font Scoping**: UI elements must always use `font-family: var(--font-ui)`. Never apply the resume's serif font to form controls, buttons, or app chrome.
- **Print Safety**: Any styling added to `CvPreview.css` must preserve `@media print` rules. Never add fixed heights or overflow clipping to elements that print.

---

## 3. Verification Checklist

Before submitting changes or opening a pull request, run the following verification commands:

1. **Type Check and Production Build**:
   ```bash
   npm run build
   ```
   Must exit with code 0 and zero TypeScript errors.

2. **Lint Check**:
   ```bash
   npm run lint
   ```
   Must exit with code 0 and zero ESLint errors or warnings.

3. **Print Test**:
   - Open the app in your browser, load the sample CV, and click "Download PDF".
   - Verify that the browser print preview renders correctly on A4 paper with pure black text and no awkward breaks across entries.

---

## Next Steps

- [Return to Docs Index](./README.md)
- [Review Architecture](./architecture.md)
