import type { SectionKey } from "../hooks/useSectionOrder";
import type { CustomSection } from "../types/customSection";
import { generateId } from "./id";

export type LinkInfo = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};

export type GeneralInfo = {
  firstName: string;
  lastName: string;
  headline: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  links: LinkInfo[];
};

export type EducationItem = {
  id: string;
  schoolName: string;
  study: string;
  place: string;
  grade: string;
  subTitle?: string;
  linkText?: string;
  linkUrl?: string;
  bullets?: string;
  durationType: string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
};

export type ExperienceItem = {
  id: string;
  companyName: string;
  position: string;
  responsibilities: string;
  location?: string;
  companyDescription?: string;
  linkText?: string;
  linkUrl?: string;
  durationType: string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
};

export type ProjectLink = {
  id: string;
  title: string;
  customTitle: string;
  url: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  durationType: string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
  links: ProjectLink[];
};

export type SkillItem = {
  id: string;
  name: string;
};

export type SkillCategory = {
  id: string;
  category: string;
  skills: SkillItem[];
};

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

export const STORAGE_KEY = "cv_builder_session_v1";
export const LEGACY_STORAGE_KEY = "cv_draft";

export const BUILTIN_SECTION_KEYS: readonly SectionKey[] = [
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
];

/**
 * Normalizes and sanitizes arbitrary session data, filling default field types
 * and reconciling sectionOrder so malformed JSON never crashes the runtime.
 */
export function normalizeSessionData(data: unknown): CvSessionData {
  const raw =
    data && typeof data === "object"
      ? (data as Record<string, unknown>)
      : {};

  const rawG =
    raw.generalInfo && typeof raw.generalInfo === "object"
      ? (raw.generalInfo as Record<string, unknown>)
      : {};

  const links: LinkInfo[] = Array.isArray(rawG.links)
    ? rawG.links
        .filter(
          (l): l is Record<string, unknown> =>
            Boolean(l && typeof l === "object"),
        )
        .map((l) => ({
          id: String(l.id || generateId()),
          title: String(l.title || ""),
          customTitle: String(l.customTitle || ""),
          url: String(l.url || ""),
        }))
    : [];

  const generalInfo: GeneralInfo = {
    firstName: String(rawG.firstName || ""),
    lastName: String(rawG.lastName || ""),
    headline: String(rawG.headline || ""),
    phone: String(rawG.phone || ""),
    email: String(rawG.email || ""),
    location: String(rawG.location || ""),
    bio: String(rawG.bio || ""),
    links,
  };

  const educationList: EducationItem[] = Array.isArray(raw.educationList)
    ? raw.educationList
        .filter(
          (e): e is Record<string, unknown> =>
            Boolean(e && typeof e === "object"),
        )
        .map((e) => ({
          id: String(e.id || generateId()),
          schoolName: String(e.schoolName || ""),
          study: String(e.study || ""),
          place: String(e.place || ""),
          grade: String(e.grade || ""),
          subTitle: e.subTitle ? String(e.subTitle) : undefined,
          linkText: e.linkText ? String(e.linkText) : undefined,
          linkUrl: e.linkUrl ? String(e.linkUrl) : undefined,
          bullets: e.bullets ? String(e.bullets) : "",
          durationType: String(e.durationType || "date"),
          startDate: String(e.startDate || ""),
          endDate: String(e.endDate || ""),
          customDuration: String(e.customDuration || ""),
          isCurrent: Boolean(e.isCurrent),
        }))
    : [];

  const workList: ExperienceItem[] = Array.isArray(raw.workList)
    ? raw.workList
        .filter(
          (w): w is Record<string, unknown> =>
            Boolean(w && typeof w === "object"),
        )
        .map((w) => ({
          id: String(w.id || generateId()),
          companyName: String(w.companyName || ""),
          position: String(w.position || ""),
          responsibilities: String(w.responsibilities || ""),
          location: w.location ? String(w.location) : undefined,
          companyDescription: w.companyDescription
            ? String(w.companyDescription)
            : undefined,
          linkText: w.linkText ? String(w.linkText) : undefined,
          linkUrl: w.linkUrl ? String(w.linkUrl) : undefined,
          durationType: String(w.durationType || "date"),
          startDate: String(w.startDate || ""),
          endDate: String(w.endDate || ""),
          customDuration: String(w.customDuration || ""),
          isCurrent: Boolean(w.isCurrent),
        }))
    : [];

  const projectList: ProjectItem[] = Array.isArray(raw.projectList)
    ? raw.projectList
        .filter(
          (p): p is Record<string, unknown> =>
            Boolean(p && typeof p === "object"),
        )
        .map((p) => {
          const pLinks: ProjectLink[] = Array.isArray(p.links)
            ? p.links
                .filter(
                  (l): l is Record<string, unknown> =>
                    Boolean(l && typeof l === "object"),
                )
                .map((l) => ({
                  id: String(l.id || generateId()),
                  title: String(l.title || ""),
                  customTitle: String(l.customTitle || ""),
                  url: String(l.url || ""),
                }))
            : [];

          return {
            id: String(p.id || generateId()),
            title: String(p.title || ""),
            tagline: String(p.tagline || ""),
            description: String(p.description || ""),
            durationType: String(p.durationType || "date"),
            startDate: String(p.startDate || ""),
            endDate: String(p.endDate || ""),
            customDuration: String(p.customDuration || ""),
            isCurrent: Boolean(p.isCurrent),
            links: pLinks,
          };
        })
    : [];

  const skillList: SkillCategory[] = Array.isArray(raw.skillList)
    ? raw.skillList
        .filter(
          (s): s is Record<string, unknown> =>
            Boolean(s && typeof s === "object"),
        )
        .map((s) => {
          const skills: SkillItem[] = Array.isArray(s.skills)
            ? s.skills
                .filter(
                  (sk): sk is Record<string, unknown> =>
                    Boolean(sk && typeof sk === "object"),
                )
                .map((sk) => ({
                  id: String(sk.id || generateId()),
                  name: String(sk.name || ""),
                }))
            : [];

          return {
            id: String(s.id || generateId()),
            category: String(s.category || ""),
            skills,
          };
        })
    : [];

  const customSections: CustomSection[] = Array.isArray(raw.customSections)
    ? raw.customSections
        .filter(
          (cs): cs is Record<string, unknown> =>
            Boolean(cs && typeof cs === "object"),
        )
        .map((cs) => {
          const items = Array.isArray(cs.items)
            ? cs.items
                .filter(
                  (it): it is Record<string, unknown> =>
                    Boolean(it && typeof it === "object"),
                )
                .map((it) => {
                  const itLinks = Array.isArray(it.links)
                    ? it.links
                        .filter(
                          (l): l is Record<string, unknown> =>
                            Boolean(l && typeof l === "object"),
                        )
                        .map((l) => ({
                          id: String(l.id || generateId()),
                          title: String(l.title || ""),
                          customTitle: String(l.customTitle || ""),
                          url: String(l.url || ""),
                        }))
                    : [];

                  return {
                    id: String(it.id || generateId()),
                    title: String(it.title || ""),
                    tagline: String(it.tagline || ""),
                    description: String(it.description || ""),
                    durationType: String(it.durationType || "date"),
                    startDate: String(it.startDate || ""),
                    endDate: String(it.endDate || ""),
                    customDuration: String(it.customDuration || ""),
                    isCurrent: Boolean(it.isCurrent),
                    links: itLinks,
                  };
                })
            : [];

          return {
            id: String(cs.id || `custom-${generateId()}`),
            title: String(cs.title || "Custom Section"),
            items,
          };
        })
    : [];

  // Reconcile sectionOrder
  const customSectionIds = customSections.map((cs) => cs.id);
  const allowedKeys = new Set<string>([
    ...BUILTIN_SECTION_KEYS,
    ...customSectionIds,
  ]);

  let incomingOrder: string[] = [];
  if (Array.isArray(raw.sectionOrder)) {
    incomingOrder = raw.sectionOrder
      .map(String)
      .filter((k) => allowedKeys.has(k));
  }

  // Never accept empty sectionOrder
  if (incomingOrder.length === 0) {
    incomingOrder = [...BUILTIN_SECTION_KEYS];
  }

  // Append missing built-in sections
  for (const builtin of BUILTIN_SECTION_KEYS) {
    if (!incomingOrder.includes(builtin)) {
      incomingOrder.push(builtin);
    }
  }

  // Append missing custom sections so they are never silently hidden
  for (const customId of customSectionIds) {
    if (!incomingOrder.includes(customId)) {
      incomingOrder.push(customId);
    }
  }

  const sectionOrder = Array.from(new Set(incomingOrder));

  return {
    version: typeof raw.version === "number" ? raw.version : 1,
    savedAt:
      typeof raw.savedAt === "string"
        ? raw.savedAt
        : new Date().toISOString(),
    generalInfo,
    educationList,
    workList,
    projectList,
    skillList,
    customSections,
    sectionOrder,
  };
}

/**
 * Checks whether a candidate object contains actual user-entered CV content
 * (as opposed to an unpopulated, empty initial state).
 */
export function isValidSessionData(data: unknown): data is CvSessionData {
  if (!data || typeof data !== "object") return false;

  const session = data as Record<string, unknown>;
  const g = session.generalInfo as Record<string, unknown> | undefined;

  const hasName = Boolean(
    (typeof g?.firstName === "string" && g.firstName.trim()) ||
      (typeof g?.lastName === "string" && g.lastName.trim()),
  );
  const hasHeadline =
    typeof g?.headline === "string" && Boolean(g.headline.trim());
  const hasBio = typeof g?.bio === "string" && Boolean(g.bio.trim());
  const hasContact = Boolean(
    (typeof g?.email === "string" && g.email.trim()) ||
      (typeof g?.phone === "string" && g.phone.trim()) ||
      (typeof g?.location === "string" && g.location.trim()),
  );
  const hasLinks =
    Array.isArray(g?.links) &&
    g.links.some(
      (l) =>
        Boolean(
          typeof l?.url === "string" &&
            l.url.trim() &&
            ((typeof l?.title === "string" && l.title.trim()) ||
              (typeof l?.customTitle === "string" && l.customTitle.trim())),
        ),
    );

  const hasEdu =
    Array.isArray(session.educationList) &&
    session.educationList.some((e) =>
      Boolean(
        (typeof e?.schoolName === "string" && e.schoolName.trim()) ||
          (typeof e?.study === "string" && e.study.trim()) ||
          (typeof e?.bullets === "string" && e.bullets.trim()) ||
          (typeof e?.subTitle === "string" && e.subTitle.trim()) ||
          (typeof e?.place === "string" && e.place.trim()),
      ),
    );

  const hasWork =
    Array.isArray(session.workList) &&
    session.workList.some((w) =>
      Boolean(
        (typeof w?.companyName === "string" && w.companyName.trim()) ||
          (typeof w?.position === "string" && w.position.trim()) ||
          (typeof w?.responsibilities === "string" &&
            w.responsibilities.trim()) ||
          (typeof w?.companyDescription === "string" &&
            w.companyDescription.trim()),
      ),
    );

  const hasProjects =
    Array.isArray(session.projectList) &&
    session.projectList.some((p) =>
      Boolean(
        (typeof p?.title === "string" && p.title.trim()) ||
          (typeof p?.tagline === "string" && p.tagline.trim()) ||
          (typeof p?.description === "string" && p.description.trim()) ||
          (Array.isArray(p?.links) &&
            p.links.some(
              (l: Record<string, unknown>) =>
                typeof l?.url === "string" && l.url.trim(),
            )),
      ),
    );

  const hasSkills =
    Array.isArray(session.skillList) &&
    session.skillList.some(
      (s) =>
        typeof s?.category === "string" &&
        s.category.trim() &&
        Array.isArray(s?.skills) &&
        s.skills.some(
          (sk: Record<string, unknown>) =>
            typeof sk?.name === "string" && sk.name.trim(),
        ),
    );

  const hasCustom =
    Array.isArray(session.customSections) &&
    session.customSections.some((cs) =>
      Boolean(
        Array.isArray(cs?.items) &&
          cs.items.some(
            (item: Record<string, unknown>) =>
              (typeof item?.title === "string" && item.title.trim()) ||
              (typeof item?.description === "string" &&
                item.description.trim()),
          ),
      ),
    );

  return (
    hasName ||
    hasHeadline ||
    hasBio ||
    hasContact ||
    hasLinks ||
    hasEdu ||
    hasWork ||
    hasProjects ||
    hasSkills ||
    hasCustom
  );
}

/**
 * Persists session state to localStorage safely.
 */
export function saveSessionToStorage(
  session: Omit<CvSessionData, "version" | "savedAt">,
): boolean {
  try {
    const payload: CvSessionData = {
      ...session,
      version: 1,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.warn("Unable to save CV session to localStorage:", err);
    return false;
  }
}

/**
 * Retrieves and validates saved session data from localStorage.
 * Includes automatic fallback and migration for legacy 'cv_draft' storage.
 */
export function loadSessionFromStorage(): CvSessionData | null {
  try {
    // 1. Try modern storage key
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidSessionData(parsed)) {
        return normalizeSessionData(parsed);
      }
    }

    // 2. Fallback to legacy key if exists
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const parsedLegacy = JSON.parse(legacyRaw);
      if (isValidSessionData(parsedLegacy)) {
        const normalized = normalizeSessionData(parsedLegacy);
        saveSessionToStorage(normalized);
        return normalized;
      }
    }

    return null;
  } catch (err) {
    console.warn("Unable to load CV session from localStorage:", err);
    return null;
  }
}

/**
 * Checks whether valid session data is present in localStorage.
 */
export function hasSavedSessionInStorage(): boolean {
  return loadSessionFromStorage() !== null;
}

/**
 * Clears any saved CV session from localStorage.
 */
export function clearSessionFromStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (err) {
    console.warn("Unable to clear CV session from localStorage:", err);
  }
}

/**
 * Exports CV data as a downloadable JSON file.
 */
export function exportCvToJson(
  session: Omit<CvSessionData, "version" | "savedAt">,
): void {
  const payload: CvSessionData = {
    ...session,
    version: 1,
    savedAt: new Date().toISOString(),
  };

  const nameSlug = [session.generalInfo.firstName, session.generalInfo.lastName]
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "");

  const fileName = `cv-resume${nameSlug ? `-${nameSlug}` : ""}.json`;
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

/**
 * Imports and validates CV data from a user-uploaded JSON file against the template schema.
 */
export function importCvFromJson(file: File): Promise<CvSessionData> {
  return new Promise((resolve, reject) => {
    // 1MB file size cap
    if (file.size > 1024 * 1024) {
      reject(new Error("File exceeds maximum allowed size of 1MB."));
      return;
    }

    // Case-insensitive .json extension check
    if (!file.name.toLowerCase().endsWith(".json")) {
      reject(new Error("Please upload a valid .json file."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = (event.target?.result as string) || "";
        const parsed = JSON.parse(text);

        if (isValidSessionData(parsed)) {
          resolve(normalizeSessionData(parsed));
        } else {
          reject(
            new Error(
              "The uploaded JSON file does not match the required CV template. Please make sure your file follows the structure of the downloadable template (File > Download JSON Template).",
            ),
          );
        }
      } catch {
        reject(
          new Error(
            "Failed to parse JSON file. Please ensure the file is valid JSON and matches the template structure (File > Download JSON Template).",
          ),
        );
      }
    };
    reader.onerror = () => reject(new Error("Failed to read the file."));
    reader.readAsText(file);
  });
}
