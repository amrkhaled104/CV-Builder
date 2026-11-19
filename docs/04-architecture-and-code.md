# 🏗️ 04. Architecture & Technical Breakdown

[← Back to Resume Writing Guide](./03-writing-guide.md) &bull; [Return to Documentation Hub →](./README.md)

---

## 💻 Tech Stack

- **Framework:** React 19.2 (Functional Components & Hooks)
- **Language:** TypeScript 6.0 (Strict mode enabled)
- **Build Tool:** Vite 8.2 (Sub-second HMR and production builds)
- **Icons:** Material UI Icons (`@mui/icons-material`)
- **Print Engine:** `react-to-print` (DOM print stream extraction)
- **Styling:** Modular CSS with CSS Custom Properties (Theme tokens)

---

## 🗂️ Project Directory Map

```
c:/Users/Al-3amer/Desktop/CV-Builder/
├── docs/                           # Modular documentation suite
│   ├── README.md                   # Documentation hub
│   ├── 01-core-philosophy.md       # Engineering principles
│   ├── 02-features-guide.md        # Feature walkthrough
│   ├── 03-writing-guide.md         # Technical bullet writing rules
│   └── 04-architecture-and-code.md # Engineering & technical architecture
├── src/
│   ├── components/layout/
│   │   ├── AtsAuditModal/          # ATS score & advice modal
│   │   ├── CvReview/               # Live CV preview paper & controls
│   │   ├── FormInput/              # Form sidebar container
│   │   ├── HeaderBar/              # Top navigation & file dropdown
│   │   └── SectionOrderControls/   # Reorder up/down arrows
│   ├── data/
│   │   └── sampleData.js           # Sample FAANG-targeted resume data
│   ├── Forms/                      # Section-specific form modules
│   │   ├── CustomSections.jsx
│   │   ├── EducationExp.jsx
│   │   ├── GeneralInfo.jsx
│   │   ├── PracticalExp.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── hooks/
│   │   ├── useCustomSections.ts    # Custom section state lifecycle
│   │   └── useSectionOrder.ts      # Section order array & toggle
│   ├── reusables/                  # Common atomic components
│   │   ├── ActionButton.jsx
│   │   ├── DateRow.jsx
│   │   ├── DurationInput.jsx
│   │   ├── DynamicList.jsx
│   │   ├── FormBox.jsx             # Standardized label + input wrapper
│   │   ├── FormCard.jsx            # Accordion collapsible card
│   │   ├── InputRow.jsx            # Grid row container
│   │   ├── LinkCard.jsx            # URL link row container
│   │   └── SectionTitle.jsx
│   ├── types/
│   │   └── customSection.ts        # Custom section TypeScript interfaces
│   ├── utils/
│   │   ├── atsLinter.ts            # ATS audit algorithms & rule checks
│   │   └── storage.ts              # LocalStorage & JSON export/import
│   ├── App.css                     # Global SaaS theme & typography
│   ├── App.tsx                     # Top-level state coordinator
│   └── main.tsx                    # React DOM entry point
├── package.json
└── tsconfig.json
```

---

## 🔄 State Architecture

The application adopts a **single source of truth** in `App.tsx`:

```
                    ┌─────────────────┐
                    │     App.tsx     │
                    │  (Root State)   │
                    └────────┬────────┘
           ┌─────────────────┴─────────────────┐
           ▼                                   ▼
┌──────────────────────┐             ┌──────────────────────┐
│   FormInputs.jsx     │             │    CvPreview.tsx     │
│ (Collapsible Forms)  │             │   (Live Reactive)    │
└──────────────────────┘             └──────────────────────┘
```

### Key State Slices:
1. `generalInfo`: Personal information, contact channels, bio, and social links.
2. `educationList`: Degrees, universities, coursework, and dates.
3. `workList`: Positions, companies, descriptions, bullets, and durations.
4. `projectList`: Project titles, taglines, bullets, and links.
5. `skillList`: Categories with arrays of technical keywords.
6. `customSections`: Dynamic user-defined sections (e.g. Open Source, Certifications).
7. `sectionOrder`: An array of section keys (`["summary", "education", "experience", ...]`).

---

## 💾 Storage & Data Portability Layer (`storage.ts`)

### 1. Schema Definition (`CvSessionData`)
```typescript
export type CvSessionData = {
  version: number;
  savedAt: string;
  generalInfo: GeneralInfo;
  educationList: EducationItem[];
  workList: ExperienceItem[];
  projectList: ProjectItem[];
  skillList: SkillCategory[];
  customSections: CustomSection[];
  sectionOrder: SectionKey[];
};
```

### 2. Backward Compatibility & Auto-Migration
To prevent any data loss from previous releases:
- First checks modern key: `cv_builder_session_v1`.
- If missing, gracefully checks legacy key: `cv_draft`.
- If legacy data is detected and valid, automatically upgrades and saves under the new versioned key.

### 3. JSON Export & Import
- **Export (`exportCvToJson`):** Generates a formatted JSON blob and triggers a clean browser download: `cv-resume-[name].json`.
- **Import (`importCvFromJson`):** Parses user-uploaded JSON files, validates content structure with `isValidSessionData()` type guards, and rejects invalid schemas before setting state.

---

## 🎯 ATS Linter Engine (`atsLinter.ts`)

The ATS audit operates synchronously and is memoized via `useMemo` in `App.tsx`:

```typescript
const auditResult = useMemo(
  () => runAtsAudit({ generalInfo, educationList, workList, projectList, skillList, customSections }),
  [generalInfo, educationList, workList, projectList, skillList, customSections]
);
```

### Key Verification Algorithms:
1. **Joel Spolsky Punctuation Rule:**
   ```typescript
   // Detects missing space after comma (e.g., "React,TypeScript")
   const match = text.match(/[a-zA-Z0-9],[a-zA-Z]/g);
   ```
2. **Action Verbs Matching:**
   Maintains a Set of **120+ past-tense engineering action verbs** (`STRONG_ACTION_VERBS`). Strips leading bullet symbols (`-`, `*`, `•`) and verifies the opening word.
3. **Quantifiable Metrics Matching:**
   ```typescript
   // Detects percentages, scales, and dollar values
   const hasMetric = /(\d+[%kKxXmM]?|\$[\d,]+|\b[0-9]+(\.[0-9]+)?%)/.test(line);
   ```
4. **Scoring Model:**
   Starts at 100 points, deducting **25 points per error** (e.g., missing name or email) and **10 points per warning** (e.g., missing phone or LinkedIn), bounded to a minimum floor score of 20.

---

## 🖨️ PDF Generation Mechanics

PDF generation avoids bloated canvas screenshot tools (like `html2canvas`) which produce blurry, unselectable, and ATS-incompatible raster images. 

Instead, CV Builder uses `useReactToPrint` to extract the live DOM tree directly into a clean browser print stream:

```css
@page {
  size: A4 portrait;
  margin: 12mm 14mm;
}

@media print {
  /* Hide all app chrome */
  .preview-controls-bar,
  .cv-page-guide,
  .page-limit-pill,
  .header-bar,
  .leftSidebarForm {
    display: none !important;
  }

  /* Force pure black typography & prevent split breaks */
  .cvPreview {
    width: 100% !important;
    box-shadow: none !important;
    background: #fff !important;
    color: #000 !important;
  }

  .entry, .skill-category, .cv-header {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }
}
```

This guarantees:
- **100% Vector Text:** Razor-sharp typography at any zoom level.
- **Searchable PDF:** Machine-readable text streams that pass any ATS parser.
- **Clickable Hyperlinks:** Active anchors for GitHub, LinkedIn, and personal portfolios.

---

## 🔗 Navigation

- Return to Documentation Hub: [Documentation Hub →](./README.md)
- Review features: [02. Features Guide →](./02-features-guide.md)
