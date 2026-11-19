# Resume Rules and Design Constraints

[Back to Features](./features.md) | [Next: Contributing Guide](./contributing.md)

This project is built around the resume guidelines compiled in [Omar Shawky's Resume Guide](https://omarshawky1.github.io/portfolio/resume.html). 

When modifying `CvPreview.tsx`, `CvPreview.css`, or any form fields, you must follow these rules so that generated resumes continue to pass Applicant Tracking Systems (ATS) and recruiter reviews.

---

## 1. Single-Column Layout Only

**Rule**: The resume must always remain a single-column layout. Never introduce two-column sidebars, split columns, or floating text boxes.

**Reason**:
- ATS parsers (Workday, Lever, Greenhouse) parse documents sequentially from top to bottom. Two-column layouts cause text from different sections to merge together into unreadable strings.
- Human recruiters scan resumes from top to bottom. Single-column layouts give the applicant complete control over reading order.

---

## 2. No Decorative Elements, Rating Bars, or Badges

**Rule**: Do not add progress bars (e.g. "Python: 80%"), star ratings (e.g. 4/5 stars), colored badges, or profile photos to the resume preview.

**Reason**:
- Rating bars mean nothing to engineering hiring managers (what is 80% Python?). They signal junior inexperience.
- Profile pictures are standard grounds for automatic rejection in the US, UK, Canada, and EU to prevent unconscious bias.
- Skills should be presented as simple, categorized text lists:
  `Languages: Python, TypeScript, C++, SQL`

---

## 3. Flawless Text Searchability (Ctrl+F)

**Rule**: All text in the exported PDF must be real, selectable text with standard encoding. Avoid soft-hyphenation or awkward character wrapping.

**Reason**:
- Recruiters often search resumes with `Ctrl+F` for specific technologies (e.g., `Java`).
- If CSS or Word processors softly hyphenate words across line breaks (e.g., `Ja-` on one line and `va` on the next), the recruiter's search returns zero results, causing immediate disqualification.
- In `src/components/layout/CvReview/CvPreview.css`, `hyphens: none` and `word-break: normal` are explicitly enforced.

---

## 4. Perfect Punctuation (The Joel Spolsky Rule)

**Rule**: Punctuation must be consistent. Always place a space after every comma and period.

**Reason**:
- Joel Spolsky (Co-Founder of Stack Overflow) famously wrote:
  *"Would I reject someone just because they don't quite understand the relationship between the comma and the space? Well, not necessarily. But when I have to find two summer interns out of 300 applicants... there's just no reason a college graduate can't get this right."*
- Hiring managers review hundreds of resumes per opening. Minor typographical mistakes provide an easy justification to delete an application.

---

## 5. Strict One-Page Limit

**Rule**: The resume must fit on a single page for candidates with fewer than 7 years of professional experience.

**Reason**:
- Two-page resumes with 2 or 3 trailing lines on the second page signal a lack of editing discipline.
- The visual 1-page guide line (at 297mm A4 height) and density controls (`Compact`, `Normal`, `Spacious`) exist to help users adjust spacing to stay within page 1.

---

## 6. The Google XYZ Formula for Bullets

**Rule**: Bullet points should follow the structure:
`Accomplished [X] as measured by [Y], by doing [Z]`

**Reason**:
- Laszlo Bock (former SVP of People Operations at Google) established this formula as the gold standard for engineering resumes.
- Rather than listing passive duties (*"Responsible for building the API"*), write measurable achievements (*"Decreased API response time by 35% by implementing Redis caching"*).

---

## Next Steps

- How to build new features: [Contributing Guide](./contributing.md)
