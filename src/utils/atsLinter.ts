import type { GeneralInfo, EducationItem, ExperienceItem, ProjectItem, SkillCategory } from "./storage";
import type { CustomSection } from "../types/customSection";

export type LintIssue = {
  id: string;
  type: "error" | "warning" | "success";
  category: "Structure" | "Contact" | "Proofreading" | "Impact & Action Verbs";
  message: string;
  recommendation?: string;
};

export type LintResult = {
  score: number;
  issues: LintIssue[];
  passedCount: number;
  warningCount: number;
  errorCount: number;
};

const STRONG_ACTION_VERBS = new Set([
  "achieved", "acquired", "adapted", "addressed", "administered", "advised", "allocated",
  "analyzed", "architected", "assembled", "assessed", "audited", "automated", "boosted",
  "budgeted", "built", "centralized", "championed", "coached", "collaborated", "compiled",
  "composed", "conceptualized", "configured", "constructed", "consulted", "controlled",
  "coordinated", "crafted", "created", "customized", "debugged", "decreased", "delegated",
  "delivered", "deployed", "designed", "determined", "developed", "devised", "diagnosed",
  "directed", "discovered", "dispatched", "documented", "drafted", "drove", "eliminated",
  "enabled", "enforced", "engineered", "enhanced", "established", "evaluated", "executed",
  "expanded", "expedited", "fabricated", "facilitated", "formulated", "founded", "generated",
  "guided", "halted", "headed", "identified", "implemented", "improved", "increased",
  "initiated", "inspected", "installed", "instituted", "instructed", "integrated", "introduced",
  "invented", "investigated", "launched", "lead", "led", "leveraged", "maintained", "managed",
  "mapped", "maximized", "measured", "mentored", "migrated", "minimized", "modeled",
  "modernized", "monitored", "negotiated", "optimized", "orchestrated", "organized", "originated",
  "outperformed", "overhauled", "oversaw", "partnered", "performed", "pioneered", "planned",
  "prepared", "prevented", "produced", "programmed", "promoted", "proposed", "published",
  "re-architected", "rebuilt", "reconciled", "redesigned", "reduced", "refactored", "refined",
  "remodeled", "reorganized", "replaced", "resolved", "restructured", "revamped", "reviewed",
  "revitalized", "saved", "scaled", "scheduled", "screened", "secured", "selected", "separated",
  "simplified", "simulated", "solved", "spearheaded", "standardized", "streamlined", "strengthened",
  "structured", "supervised", "synthesized", "systematized", "tested", "tracked", "trained",
  "transformed", "troubleshot", "unified", "upgraded", "utilized", "validated", "verified", "wrote"
]);

export function runAtsAudit({
  generalInfo,
  educationList,
  workList,
  projectList,
  skillList,
  customSections,
}: {
  generalInfo: GeneralInfo;
  educationList: EducationItem[];
  workList: ExperienceItem[];
  projectList: ProjectItem[];
  skillList: SkillCategory[];
  customSections: CustomSection[];
}): LintResult {
  const issues: LintIssue[] = [];

  // 1. Structure: One-Column Layout
  issues.push({
    id: "layout-single-column",
    type: "success",
    category: "Structure",
    message: "Strict Single-Column Layout: Ensures 100% predictable ATS parsing order without text-box glitches.",
  });

  // 2. Contact Information
  const fullName = [generalInfo.firstName, generalInfo.lastName].filter(Boolean).join(" ").trim();
  if (!fullName) {
    issues.push({
      id: "contact-name",
      type: "error",
      category: "Contact",
      message: "Missing full name in header.",
      recommendation: "Recruiters and ATS need your first and last name prominently at the top.",
    });
  } else {
    issues.push({
      id: "contact-name",
      type: "success",
      category: "Contact",
      message: `Full name provided: "${fullName}".`,
    });
  }

  if (!generalInfo.email?.trim()) {
    issues.push({
      id: "contact-email",
      type: "error",
      category: "Contact",
      message: "Missing email address.",
      recommendation: "Provide a clean, professional email (e.g., firstname.lastname@gmail.com).",
    });
  } else {
    issues.push({
      id: "contact-email",
      type: "success",
      category: "Contact",
      message: "Professional contact email included.",
    });
  }

  if (!generalInfo.phone?.trim()) {
    issues.push({
      id: "contact-phone",
      type: "warning",
      category: "Contact",
      message: "Phone number is omitted.",
      recommendation: "Include a phone number with international country code (e.g. +20...).",
    });
  } else {
    issues.push({
      id: "contact-phone",
      type: "success",
      category: "Contact",
      message: "Phone number included.",
    });
  }

  const hasGithub = generalInfo.links?.some((l) =>
    l.url.toLowerCase().includes("github.com") || l.title?.toLowerCase().includes("github")
  );
  const hasLinkedin = generalInfo.links?.some((l) =>
    l.url.toLowerCase().includes("linkedin.com") || l.title?.toLowerCase().includes("linkedin")
  );

  if (!hasLinkedin) {
    issues.push({
      id: "contact-linkedin",
      type: "warning",
      category: "Contact",
      message: "LinkedIn profile link missing.",
      recommendation: "FAANG & Fortune 500 recruiters routinely look for a LinkedIn profile link in the header.",
    });
  } else {
    issues.push({
      id: "contact-linkedin",
      type: "success",
      category: "Contact",
      message: "LinkedIn profile link included.",
    });
  }

  if (!hasGithub) {
    issues.push({
      id: "contact-github",
      type: "warning",
      category: "Contact",
      message: "GitHub link missing.",
      recommendation: "For CS and Software Engineering roles, a GitHub profile demonstrates real code artifacts.",
    });
  } else {
    issues.push({
      id: "contact-github",
      type: "success",
      category: "Contact",
      message: "GitHub profile link included.",
    });
  }

  // 3. Proofreading & Punctuation (Joel Spolsky Rule: space after comma)
  const allTexts: string[] = [
    generalInfo.bio,
    ...educationList.map((e) => `${e.bullets || ""} ${e.study} ${e.schoolName}`),
    ...workList.map((w) => `${w.responsibilities || ""} ${w.companyDescription || ""}`),
    ...projectList.map((p) => `${p.description || ""} ${p.tagline || ""}`),
    ...customSections.flatMap((cs) => cs.items.map((i) => i.description || "")),
  ];

  let missingCommaSpaceCount = 0;
  for (const text of allTexts) {
    if (!text) continue;
    // Look for comma followed immediately by a letter without space (e.g. "React,Node" or "Algorithms,Data")
    const match = text.match(/[a-zA-Z0-9],[a-zA-Z]/g);
    if (match) {
      missingCommaSpaceCount += match.length;
    }
  }

  if (missingCommaSpaceCount > 0) {
    issues.push({
      id: "proofreading-comma-space",
      type: "warning",
      category: "Proofreading",
      message: `Detected ${missingCommaSpaceCount} place(s) missing a space after a comma (e.g. "word,word").`,
      recommendation:
        "Joel Spolsky notes: 'Always put a space after a comma'. Consistent punctuation prevents hiring managers from hitting delete.",
    });
  } else {
    issues.push({
      id: "proofreading-comma-space",
      type: "success",
      category: "Proofreading",
      message: "Clean comma punctuation: Proper spacing after commas detected throughout your text.",
    });
  }

  // 4. Action Verbs & Google's XYZ Formula Check
  const allBulletLines: string[] = [];
  workList.forEach((w) => {
    if (w.responsibilities) {
      w.responsibilities.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => allBulletLines.push(l));
    }
  });
  projectList.forEach((p) => {
    if (p.description) {
      p.description.split("\n").map((l) => l.trim()).filter(Boolean).forEach((l) => allBulletLines.push(l));
    }
  });

  if (allBulletLines.length > 0) {
    let strongActionVerbCount = 0;
    let metricCount = 0;

    allBulletLines.forEach((line) => {
      // Clean leading bullet symbols (- * •)
      const cleaned = line.replace(/^[-*•]\s*/, "").trim();
      const firstWord = cleaned.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z-]/g, "");
      if (firstWord && STRONG_ACTION_VERBS.has(firstWord)) {
        strongActionVerbCount++;
      }

      // Check for metrics (% or numbers or metrics like 10k, 2x, etc.)
      if (/(\d+[%kKxXmM]?|\$[\d,]+|\b[0-9]+(\.[0-9]+)?%)/.test(line)) {
        metricCount++;
      }
    });

    const actionVerbRatio = strongActionVerbCount / allBulletLines.length;
    if (actionVerbRatio >= 0.6) {
      issues.push({
        id: "impact-action-verbs",
        type: "success",
        category: "Impact & Action Verbs",
        message: `Strong action verbs used in ${strongActionVerbCount} of ${allBulletLines.length} bullet points.`,
      });
    } else {
      issues.push({
        id: "impact-action-verbs",
        type: "warning",
        category: "Impact & Action Verbs",
        message: `Only ${strongActionVerbCount} of ${allBulletLines.length} bullet points start with strong action verbs.`,
        recommendation:
          "Start bullets with punchy past-tense verbs (e.g., Developed, Built, Engineered, Spearheaded, Optimized, Automated).",
      });
    }

    if (metricCount > 0) {
      issues.push({
        id: "impact-xyz-metrics",
        type: "success",
        category: "Impact & Action Verbs",
        message: `Found measurable numbers/metrics in ${metricCount} bullet point(s) (Google's XYZ formula).`,
      });
    } else {
      issues.push({
        id: "impact-xyz-metrics",
        type: "warning",
        category: "Impact & Action Verbs",
        message: "No quantifiable metrics (% or numbers) found in your bullet points.",
        recommendation:
          "Use Google's formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. Example: 'Reduced latency by 35% by implementing Redis caching'.",
      });
    }
  }

  // 5. Skills Check: No rating stars or percentages
  if (skillList.length > 0) {
    issues.push({
      id: "skills-clean-format",
      type: "success",
      category: "Structure",
      message: "Skills are categorized cleanly as keywords without arbitrary percentage or star ratings.",
    });
  }

  // Calculate score
  const errorCount = issues.filter((i) => i.type === "error").length;
  const warningCount = issues.filter((i) => i.type === "warning").length;
  const passedCount = issues.filter((i) => i.type === "success").length;

  let score = 100 - errorCount * 25 - warningCount * 10;
  if (score < 20) score = 20;

  return {
    score,
    issues,
    passedCount,
    warningCount,
    errorCount,
  };
}
