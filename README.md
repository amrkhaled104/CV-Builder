# CV Builder

## What this is and why I made it
  ""
> **Design**: Informed by engineering resume best practices (clean hierarchy, scannable layout, zero visual noise). Core reference: [Omar Shawky's Resume Guide](https://omarshawky1.github.io/portfolio/resume.html).

## Project Folder Structure

```
src/
├── components/
│   └── layout/                    # Core layout views 
│       ├── CvReview/              # Live Preview
│       ├── FormInput/             # Form Sidebar
│       ├── HeaderBar/             
│       └── SectionOrderControls/  # Reorder Controls
├── Forms/                         # Input forms for each CV section
│   ├── CustomSections.jsx
│   ├── EducationExp.jsx
│   ├── GeneralInfo.jsx
│   ├── PracticalExp.jsx
│   ├── Projects.jsx
│   └── Skills.jsx
├── hooks/                         # State & logic hooks
│   ├── useCustomSections.ts       # Dynamic custom sections
│   └── useSectionOrder.ts         # Section ordering & freeze mode
├── reusables/                     # Shared UI components (cards, inputs, buttons)
├── data/                          # Sample CV data for quick testing
├── types/                         # TypeScript definitions
├── App.tsx                        # Main application layout & state
└── main.tsx                       # App entry point
```
