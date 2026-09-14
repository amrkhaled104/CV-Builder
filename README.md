# CV Builder

## What this is and why I made it

A straightforward CV builder made to create a clean, single-page resume with live preview. Most CV tools lock you into fixed templates or make it hard to add unique sections like open-source contributions or certifications. I built this so you can easily add custom sections, fill in your info, reorder sections up and down with one click, and export straight to PDF.

## Project Folder Structure

```
src/
├── components/
│   └── layout/
│       ├── CvReview/              # Live A4 preview & empty state
│       ├── FormInput/             # Sidebar form wrapper
│       ├── HeaderBar/             # Theme switch, Sample CV, PDF export, order toggle
│       └── SectionOrderControls/  # Up/Down reordering controls
├── Forms/                         # Input forms for each CV section
│   ├── CustomSections.jsx
│   ├── EducationExp.jsx
│   ├── GeneralInfo.jsx
│   ├── PracticalExp.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── hooks/                         # State & logic hooks
│   ├── useCustomSections.ts       # Dynamic custom sections CRUD
│   └── useSectionOrder.ts         # Section ordering & freeze mode
├── reusables/                     # Shared UI components (cards, inputs, buttons)
├── data/                          # Sample CV data for quick testing
├── types/                         # TypeScript definitions
├── App.tsx                        # Main application layout & state
└── main.tsx                       # App entry point
```

## Tools Used

- **React 19** - UI and component state
- **TypeScript** - Type safety and custom section models
- **Vite** - Fast local development server and bundler
- **react-to-print** - Direct browser print & PDF generation
- **Vanilla CSS** - Modern styling with light/dark theme tokens

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/amrkhaled104/CV-Builder.git
   cd CV-Builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.
