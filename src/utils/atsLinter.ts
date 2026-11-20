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

const PRESENT_ACTION_VERBS = new Set([
  "administers", "advises", "allocates", "analyzes", "architects", "assembles", "assesses",
  "audits", "automates", "boosts", "builds", "centralizes", "champions", "coaches",
  "collaborates", "compiles", "composes", "configures", "constructs", "consults",
  "coordinates", "crafts", "creates", "customizes", "debugs", "delivers", "deploys",
  "designs", "determines", "develops", "devises", "diagnoses", "directs", "discovers",
  "documents", "drafts", "drives", "enables", "enforces", "engineers", "enhances",
  "establishes", "evaluates", "executes", "expands", "facilitates", "formulates",
  "generates", "guides", "heads", "identifies", "implements", "improves", "increases",
  "initiates", "inspects", "installs", "instructs", "integrates", "introduces",
  "investigates", "launches", "lead", "leads", "leverages", "maintains", "manages",
  "maps", "maximizes", "measures", "mentors", "migrates", "minimizes", "models",
  "modernizes", "monitors", "negotiates", "optimizes", "orchestrates", "organizes",
  "outperforms", "overhauls", "oversees", "partners", "performs", "pioneers", "plans",
  "prepares", "prevents", "produces", "programs", "promotes", "proposes", "publishes",
  "re-architects", "rebuilds", "redesigns", "reduces", "refactors", "refines",
  "remodels", "reorganizes", "replaces", "resolves", "restructures", "revamps",
  "reviews", "saves", "scales", "schedules", "secures", "simplifies", "simulates",
  "solves", "spearheads", "standardizes", "streamlines", "strengthens", "structures",
  "supervises", "tests", "tracks", "trains", "transforms", "troubleshoots", "unifies",
  "upgrades", "utilizes", "validates", "verifies", "writes"
]);

const WEAK_OPENERS = [
  "worked on",
  "responsible for",
  "helped with",
  "assisted in",
  "tasked with",
  "involved in",
  "participated in",
];

function hasQuantifiedMetric(line: string): boolean {
  // 1. Percentages, multipliers, or currency
  if (/\b\d+(\.\d+)?%|[xX]%|\$[\d,]+(\.\d+)?([kKmMbB])?|\b\d+(\.\d+)?x\b/i.test(line)) {
    return true;
  }
  // 2. Metric suffixes: 10k, 2M, 500k, 100+
  if (/\b\d+([kKmMbB])\+?\b|\b\d+\+\b/i.test(line)) {
    return true;
  }
  // 3. Time / latency measurements: 35ms, 2 seconds, 3 hours
  if (/\b\d+(\.\d+)?\s*(ms|milliseconds?|seconds?|secs?|minutes?|mins?|hours?|days?|weeks?|months?)\b/i.test(line)) {
    return true;
  }
  // 4. Quantified nouns: 12 applications, 500 users, 14 services
  if (/\b\d+\s*(?:\+)?\s*(users?|clients?|customers?|requests?|queries|endpoints?|services?|microservices?|servers?|nodes?|tests?|features?|members?|engineers?|developers?|stars?|downloads?|tickets?|prs?|pull\s+requests?|issues?|events?|qps|rps|applications?|projects?|milestones?)\b/i.test(line)) {
    return true;
  }
  // 5. Check if there are other numbers, but strip out years (19xx, 20xx) and tech versions (e.g. React 18, Java 17, ES6, S3)
  const stripped = line
    .replace(/\b(19\d\d|20\d\d)\b/g, "")
    .replace(/\b(?:react|vue|angular|node|python|java|c\+\+|c#|es|ecmascript|html|css|php|ruby|go|s|v|version)\s*\d+\b/gi, "")
    .replace(/\b(?:ipv4|ipv6|utf-8|utf-16|sha-\d+|sha\d+|md5|aes-\d+|oauth\s*\d+|http\s*\d+(\.\d+)?)\b/gi, "");

  if (/\b\d+\b/.test(stripped) && /\b(reduced|increased|improved|cut|saved|scaled|boosted|grew|expanded|from|to)\b/i.test(line)) {
    return true;
  }
  return false;
}

function isValidProfileUrl(urlStr: string | undefined, domain: string): boolean {
  if (!urlStr?.trim()) return false;
  try {
    const trimmed = urlStr.trim();
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    const cleanPath = parsed.pathname.replace(/\/$/, "");
    return host === domain && cleanPath.length > 0;
  } catch {
    return false;
  }
}

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

  // 1. Contact Information
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!generalInfo.email?.trim()) {
    issues.push({
      id: "contact-email",
      type: "error",
      category: "Contact",
      message: "Missing email address.",
      recommendation: "Provide a clean, professional email (e.g., firstname.lastname@gmail.com).",
    });
  } else if (!emailRegex.test(generalInfo.email.trim())) {
    issues.push({
      id: "contact-email",
      type: "error",
      category: "Contact",
      message: `Invalid email address format: "${generalInfo.email}".`,
      recommendation: "Ensure email has a valid username, @ symbol, and domain.",
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

  const hasLinkedin = generalInfo.links?.some((l) => isValidProfileUrl(l.url, "linkedin.com"));
  const hasGithub = generalInfo.links?.some((l) => isValidProfileUrl(l.url, "github.com"));

  if (!hasLinkedin) {
    issues.push({
      id: "contact-linkedin",
      type: "warning",
      category: "Contact",
      message: "Valid LinkedIn profile URL missing.",
      recommendation: "Provide a valid profile link to linkedin.com/in/yourname in the header.",
    });
  } else {
    issues.push({
      id: "contact-linkedin",
      type: "success",
      category: "Contact",
      message: "Valid LinkedIn profile URL included.",
    });
  }

  if (!hasGithub) {
    issues.push({
      id: "contact-github",
      type: "warning",
      category: "Contact",
      message: "Valid GitHub profile URL missing.",
      recommendation: "For CS and Software Engineering roles, a valid github.com/yourname link demonstrates real code.",
    });
  } else {
    issues.push({
      id: "contact-github",
      type: "success",
      category: "Contact",
      message: "Valid GitHub profile URL included.",
    });
  }

  // 2. Core Section Content Checks (Prevent Empty-CV 100% Score)
  const validWorkCount = workList.filter(
    (w) => Boolean(w.companyName?.trim() || w.position?.trim() || w.responsibilities?.trim())
  ).length;

  const validProjectsCount = projectList.filter(
    (p) => Boolean(p.title?.trim() || p.description?.trim())
  ).length;

  if (validWorkCount === 0 && validProjectsCount === 0) {
    issues.push({
      id: "core-experience-projects",
      type: "error",
      category: "Structure",
      message: "No Experience or Projects provided.",
      recommendation: "Add at least one work experience or technical project detailing your software engineering work.",
    });
  } else {
    issues.push({
      id: "core-experience-projects",
      type: "success",
      category: "Structure",
      message: `Documented technical experience/projects: ${validWorkCount} job(s), ${validProjectsCount} project(s).`,
    });
  }

  const validEducationCount = educationList.filter(
    (e) => Boolean(e.schoolName?.trim() || e.study?.trim())
  ).length;

  if (validEducationCount === 0) {
    issues.push({
      id: "core-education",
      type: "warning",
      category: "Structure",
      message: "No Education entries provided.",
      recommendation: "Include your degree, university, or verified computer science curriculum.",
    });
  } else {
    issues.push({
      id: "core-education",
      type: "success",
      category: "Structure",
      message: "Education details provided.",
    });
  }

  const validSkillsCount = skillList.filter(
    (s) => Boolean(s.category?.trim() && s.skills?.some((sk) => sk.name?.trim()))
  ).length;

  if (validSkillsCount === 0) {
    issues.push({
      id: "core-skills",
      type: "warning",
      category: "Structure",
      message: "No technical Skills categorized.",
      recommendation: "Add core Languages, Frameworks, and Developer Tools so ATS keyword parsers can index you.",
    });
  } else {
    issues.push({
      id: "core-skills",
      type: "success",
      category: "Structure",
      message: `Categorized skills provided across ${validSkillsCount} group(s).`,
    });
  }

  const hasAnyContent = Boolean(
    fullName ||
      generalInfo.email?.trim() ||
      generalInfo.phone?.trim() ||
      validWorkCount > 0 ||
      validProjectsCount > 0 ||
      validEducationCount > 0 ||
      validSkillsCount > 0 ||
      customSections.some((cs) =>
        cs.items?.some((i) => i.title?.trim() || i.description?.trim()),
      ),
  );

  // 3. Proofreading & Punctuation (Joel Spolsky Rule: space after comma)
  const allTexts: string[] = [
    generalInfo.bio || "",
    ...educationList.map((e) => `${e.bullets || ""} ${e.study || ""} ${e.schoolName || ""}`),
    ...workList.map((w) => `${w.responsibilities || ""} ${w.companyDescription || ""}`),
    ...projectList.map((p) => `${p.description || ""} ${p.tagline || ""}`),
    ...skillList.map((s) => `${s.category || ""}: ${(s.skills || []).map((sk) => sk.name).join(", ")}`),
    ...customSections.flatMap((cs) => cs.items.map((i) => i.description || "")),
  ];

  let missingCommaSpaceCount = 0;
  for (const text of allTexts) {
    if (!text) continue;
    // Strip code generics like Map<string,number> before checking comma spacing
    const normalized = text.replace(/<[^>]*>/g, "");
    const match = normalized.match(/[a-zA-Z0-9],[a-zA-Z]/g);
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
  } else if (hasAnyContent) {
    issues.push({
      id: "proofreading-comma-space",
      type: "success",
      category: "Proofreading",
      message: "Clean comma punctuation: Proper spacing after commas detected throughout your text.",
    });
  }

  // 4. Action Verbs, Weak Openers & Google's XYZ Formula Check
  type BulletEntry = {
    line: string;
    isCurrent: boolean;
  };
  const allBulletLines: BulletEntry[] = [];

  workList.forEach((w) => {
    if (w.responsibilities) {
      w.responsibilities
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((l) => allBulletLines.push({ line: l, isCurrent: Boolean(w.isCurrent) }));
    }
  });

  projectList.forEach((p) => {
    if (p.description) {
      p.description
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((l) => allBulletLines.push({ line: l, isCurrent: Boolean(p.isCurrent) }));
    }
  });

  educationList.forEach((e) => {
    if (e.bullets) {
      e.bullets
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .forEach((l) => allBulletLines.push({ line: l, isCurrent: Boolean(e.isCurrent) }));
    }
  });

  customSections.forEach((cs) => {
    cs.items?.forEach((item) => {
      if (item.description) {
        item.description
          .split("\n")
          .map((l) => l.trim())
          .filter(Boolean)
          .forEach((l) => allBulletLines.push({ line: l, isCurrent: Boolean(item.isCurrent) }));
      }
    });
  });

  if (allBulletLines.length === 0) {
    issues.push({
      id: "impact-no-bullets",
      type: "warning",
      category: "Impact & Action Verbs",
      message: "No bullet points found in your work, project, or education sections.",
      recommendation: "Add bullet points using Google's XYZ formula to show measurable technical impact.",
    });
  } else {
    let strongActionVerbCount = 0;
    let metricCount = 0;
    let weakOpenerCount = 0;
    const weakOpenerExamples: string[] = [];

    allBulletLines.forEach(({ line, isCurrent }) => {
      const cleaned = line.replace(/^[-*•]\s*/, "").trim();
      const lowerCleaned = cleaned.toLowerCase();

      // Check weak openers
      for (const weak of WEAK_OPENERS) {
        if (lowerCleaned.startsWith(weak)) {
          weakOpenerCount++;
          weakOpenerExamples.push(weak);
          break;
        }
      }

      // Check action verbs
      const firstWord = cleaned.split(/\s+/)[0]?.toLowerCase().replace(/[^a-z-]/g, "");
      if (firstWord) {
        if (STRONG_ACTION_VERBS.has(firstWord)) {
          strongActionVerbCount++;
        } else if (isCurrent && PRESENT_ACTION_VERBS.has(firstWord)) {
          strongActionVerbCount++;
        }
      }

      // Check genuine metrics
      if (hasQuantifiedMetric(cleaned)) {
        metricCount++;
      }
    });

    if (weakOpenerCount > 0) {
      const uniqueWeak = Array.from(new Set(weakOpenerExamples))
        .map((w) => `"${w}"`)
        .join(", ");
      issues.push({
        id: "impact-weak-openers",
        type: "warning",
        category: "Impact & Action Verbs",
        message: `Detected ${weakOpenerCount} bullet point(s) starting with weak openers (${uniqueWeak}).`,
        recommendation:
          "Avoid passive phrases like 'worked on' or 'responsible for'. Replace with strong action verbs (e.g., Developed, Engineered, Optimized).",
      });
    }

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
          "Start bullets with punchy action verbs (e.g., Developed, Built, Engineered, Spearheaded, Optimized, Automated).",
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

  // Calculate score
  const errorCount = issues.filter((i) => i.type === "error").length;
  const warningCount = issues.filter((i) => i.type === "warning").length;
  const passedCount = issues.filter((i) => i.type === "success").length;

  let score = 0;
  if (hasAnyContent) {
    score = Math.max(0, Math.min(100, 100 - errorCount * 25 - warningCount * 10));
  }

  return {
    score,
    issues,
    passedCount,
    warningCount,
    errorCount,
  };
}
