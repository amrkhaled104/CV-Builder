# Architecture and Code Structure

[Back to Docs Index](./README.md) | [Next: Features](./features.md)

This document explains how CV Builder works internally so you can build new features or fix bugs without breaking existing functionality.

---

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Bundler**: Vite
- **Icons**: Material UI Icons (`@mui/icons-material`)
- **Print Utility**: `react-to-print`
- **Styling**: Standard CSS with CSS variables (Dark and Light themes defined in `src/App.css`)

---

## Directory Structure

```
src/
├── components/
│   ├── common/
│   │   └── AiEnhanceSection/  # Scoped AI enhance button and suggestion box
│   └── layout/
│       ├── AiKeyModal/        # Modal for entering and managing Gemini API key
│       ├── AtsAuditModal/     # Modal dialog showing the ATS score and advice
│       ├── CvReview/          # Live CV preview paper, toolbar, and print styling
│       ├── FormInput/         # Left sidebar containing all section form components
│       ├── HeaderBar/         # Top bar: brand logo, File dropdown menu, actions
│       └── SectionOrderControls.tsx # Up/down buttons to reorder sections in sort mode
├── data/
│   └── sampleData.js          # Default sample CV data (engineering focused)
├── Forms/                     # Individual form components for each CV section
│   ├── CustomSections.jsx     # User-created custom sections
│   ├── EducationExp.jsx       # Education entries
│   ├── GeneralInfo.jsx        # Name, headline, contact info, bio, and links
│   ├── PracticalExp.jsx       # Work experience entries
│   ├── Projects.jsx           # Technical project entries
│   └── Skills.jsx             # Categorized skill lists
├── hooks/
│   ├── useAiEnhance.ts        # Hook for calling AI enhancer per entry
│   ├── useCustomSections.ts   # State management for custom dynamic sections
│   └── useSectionOrder.ts     # State management for section reordering
├── services/
│   └── geminiService.ts       # Direct REST client for Google Gemini 2.5 Flash
├── reusables/                 # Shared UI building blocks
│   ├── ActionButton.jsx       # Primary, link, subtle, and icon buttons
│   ├── DynamicList.jsx        # List wrapper for repeated entries
│   ├── FormBox.jsx            # Standard form field wrapper (label + input)
│   ├── FormCard.jsx           # Accordion container with expand/collapse
│   ├── InputRow.jsx           # Grid container (1 or 2 columns)
│   └── LinkCard.jsx           # Card for social/profile links
├── types/
│   └── customSection.ts       # TypeScript types for custom sections
├── utils/
│   ├── aiKeyStorage.ts        # BYOK local storage management
│   ├── atsLinter.ts           # ATS and formatting audit algorithms
│   └── storage.ts             # LocalStorage management and JSON export/import
├── App.tsx                    # Root state coordinator
└── main.tsx                   # Application entry point
```

---

## Data Flow and State Management

The entire app uses a single source of truth located in `src/App.tsx`.

```
                    ┌──────────────┐
                    │   App.tsx    │
                    │ (Root State) │
                    └──────┬───────┘
            ┌──────────────┴──────────────┐
            ▼                             ▼
   ┌─────────────────┐           ┌──────────────────┐
   │ FormInputs.jsx  │           │  CvPreview.tsx   │
   │  (Left Sidebar) │           │  (Live Preview)  │
   └─────────────────┘           └──────────────────┘
```

1. **State Slices**:
   - `generalInfo`: Object holding name, headline, contact details, bio, and social links.
   - `educationList`: Array of education items.
   - `workList`: Array of work experience items.
   - `projectList`: Array of technical project items.
   - `skillList`: Array of skill categories (e.g. Technical, Languages).
   - `customSections`: Array of user-created sections.
   - `sectionOrder`: Array of section keys defining display order (e.g. `["summary", "education", "experience", ...]`).

2. **How Forms Update State**:
   - Each form in `src/Forms/` receives its corresponding state slice and setter from `App.tsx`.
   - When a user types in an input, the form calls `setGeneralInfo`, `setWorkList`, etc.
   - The updated state passes down immediately to `CvPreview.tsx`.

3. **How the Preview Renders**:
   - `CvPreview.tsx` maps over `sectionOrder`.
   - For each section key, it renders the matching block (`summary`, `education`, `experience`, `projects`, `skills`, or custom section ID).
   - Empty sections are filtered out so they do not take up space.

---

## AI Enhancer Architecture (BYOK)

The AI Enhancer uses a Bring Your Own Key (BYOK) design:

```
┌────────────────────────────────┐
│ User enters Gemini API Key     │
│ (stored in browser localKey)   │
└──────────────┬─────────────────┘
               │
               ▼
┌────────────────────────────────┐
│ User clicks "Enhance with AI"  │
│ on Summary, Job, or Project    │
└──────────────┬─────────────────┘
               │
               ▼ Direct REST Call (no backend)
┌────────────────────────────────┐
│ Google Gemini REST API         │
│ (gemini-2.5-flash)             │
│ System Prompt: Omar Shawky's   │
│ Guidelines & Google XYZ        │
└──────────────┬─────────────────┘
               │
               ▼ Structured JSON Response
┌────────────────────────────────┐
│ Non-Destructive Preview Box    │
│ [Accept] -> Writes to Form     │
│ [Discard] -> Closes Preview    │
└────────────────────────────────┘
```

1. **Storage**: Key is saved in `localStorage` under `cv_builder_gemini_key` (`src/utils/aiKeyStorage.ts`).
2. **Direct Client Fetch**: Requests go straight to Google's API endpoint (`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`) without passing through any intermediate proxy or server.
3. **Scoped State**: `AiEnhanceBox` is mounted inside individual entry items, ensuring each job or project maintains its own isolated loading, error, and suggestion state.
4. **Non-Destructive**: Suggestions are displayed in a preview box. Form state is only modified when the user clicks `Accept`.

---

## Storage and Data Portability (`src/utils/storage.ts`)

All user data stays in the user's browser. There is no backend server or database.

- **Storage Key**: `cv_builder_session_v1` in `localStorage`.
- **Auto-Migration**: If a user has an older draft saved under `cv_draft`, `loadSessionFromStorage()` reads it, upgrades it, and saves it under the new versioned key without data loss.
- **Exporting JSON**: `exportCvToJson()` converts the current state to a `.json` file and triggers a browser download named `cv-resume-[name].json`.
- **Importing JSON**: `importCvFromJson(file)` reads an uploaded `.json` file, runs it through `isValidSessionData()` to ensure all required fields are present, and loads it into the app state.

---

## Print and PDF Generation

PDF export uses `react-to-print` in `src/components/layout/HeaderBar/HeaderBar.jsx`.

- It captures the DOM node referenced by `cvRef` (the `.cvPreview` section).
- In `src/components/layout/CvReview/CvPreview.css`, the `@media print` query:
  - Hides all application UI (sidebar, header, toolbars, buttons, warnings).
  - Sets paper size to A4 with a single clean margin (`@page { size: A4 portrait; margin: 12mm 14mm; }`) and zero redundant `.cvPreview` padding so multi-page resumes maintain proper top/bottom margins on subsequent pages.
  - Sets text color to pure black (`#000000`).
  - Sets `break-after: avoid; page-break-after: avoid;` on `.cv-section-title` to prevent orphaned headings.
  - Sets `orphans: 2; widows: 2;` on `.bullet-list li` for clean typographic pagination.
  - Sets `break-inside: avoid` on `.entry` and `.skill-category` so entries are not awkwardly split across pages.
  - Keeps text vector-based and selectable so ATS parsers can read it cleanly.

---

## Next Steps

- Read about the features: [Features Guide](./features.md)
- Learn the resume design rules: [Resume Rules](./resume-rules.md)
- Learn how to contribute: [Contributing Guide](./contributing.md)
