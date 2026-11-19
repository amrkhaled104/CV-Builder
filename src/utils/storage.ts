import type { SectionKey } from "../hooks/useSectionOrder";
import type { CustomSection } from "../types/customSection";

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

/**
 * Checks whether a candidate object contains actual user-entered CV content
 * (as opposed to an unpopulated, empty initial state).
 */
export function isValidSessionData(data: unknown): data is CvSessionData {
  if (!data || typeof data !== "object") return false;

  const session = data as Partial<CvSessionData>;
  const g = session.generalInfo;

  const hasName = Boolean(g?.firstName?.trim() || g?.lastName?.trim());
  const hasHeadline = Boolean(g?.headline?.trim());
  const hasBio = Boolean(g?.bio?.trim());
  const hasContact = Boolean(
    g?.email?.trim() || g?.phone?.trim() || g?.location?.trim(),
  );
  const hasLinks =
    Array.isArray(g?.links) &&
    g.links.some(
      (l) =>
        Boolean(l?.url?.trim() && (l?.title?.trim() || l?.customTitle?.trim())),
    );

  const hasEdu =
    Array.isArray(session.educationList) &&
    session.educationList.some((e) =>
      Boolean(
        e?.schoolName?.trim() ||
          e?.study?.trim() ||
          e?.bullets?.trim() ||
          e?.subTitle?.trim() ||
          e?.place?.trim(),
      ),
    );

  const hasWork =
    Array.isArray(session.workList) &&
    session.workList.some((w) =>
      Boolean(
        w?.companyName?.trim() ||
          w?.position?.trim() ||
          w?.responsibilities?.trim() ||
          w?.companyDescription?.trim(),
      ),
    );

  const hasProjects =
    Array.isArray(session.projectList) &&
    session.projectList.some((p) =>
      Boolean(
        p?.title?.trim() ||
          p?.tagline?.trim() ||
          p?.description?.trim() ||
          (p?.links && p.links.some((l) => l?.url?.trim())),
      ),
    );

  const hasSkills =
    Array.isArray(session.skillList) &&
    session.skillList.some(
      (s) => s?.category?.trim() && s?.skills?.some((sk) => sk?.name?.trim()),
    );

  const hasCustom =
    Array.isArray(session.customSections) &&
    session.customSections.some((cs) =>
      Boolean(
        cs?.items?.some(
          (item) => item?.title?.trim() || item?.description?.trim(),
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
        return parsed;
      }
    }

    // 2. Fallback to legacy key if exists
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const parsedLegacy = JSON.parse(legacyRaw);
      if (isValidSessionData(parsedLegacy)) {
        // Upgrade to new storage key seamlessly
        saveSessionToStorage(parsedLegacy);
        return {
          ...parsedLegacy,
          version: 1,
          savedAt: new Date().toISOString(),
        };
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
 * Imports and validates CV data from a user-uploaded JSON file.
 */
export function importCvFromJson(file: File): Promise<CvSessionData> {
  return new Promise((resolve, reject) => {
    if (!file.name.endsWith(".json")) {
      reject(new Error("Please upload a valid .json file."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (isValidSessionData(parsed)) {
          resolve(parsed as CvSessionData);
        } else {
          reject(
            new Error(
              "The uploaded file does not match a valid CV structure.",
            ),
          );
        }
      } catch {
        reject(new Error("Failed to parse JSON file. File may be corrupted."));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read the file."));
    reader.readAsText(file);
  });
}
