import type {
  CvSessionData,
  GeneralInfo,
  EducationItem,
  ExperienceItem,
  ProjectItem,
  SkillCategory,
  LinkInfo,
} from "./storage";
import { isValidSessionData, normalizeSessionData } from "./storage";
import { generateId } from "./id";

export type SchemaAdaptResult = {
  success: boolean;
  data?: CvSessionData;
  error?: string;
  detectedSchema?: string;
};

/**
 * Extracts string value safely from unknown object with multiple possible key aliases.
 */
function extractString(
  obj: Record<string, unknown> | undefined,
  keys: string[],
): string {
  if (!obj || typeof obj !== "object") return "";
  for (const k of keys) {
    const val = obj[k];
    if (typeof val === "string" && val.trim()) {
      return val.trim();
    }
    if (typeof val === "number") {
      return String(val);
    }
  }
  return "";
}

/**
 * Adapts arbitrary/external JSON data into the standard CvSessionData schema.
 * Handles native format, JSON Resume (jsonresume.org), and common schema variations.
 */
export function adaptJsonToCvData(parsed: unknown): SchemaAdaptResult {
  if (!parsed || typeof parsed !== "object") {
    return {
      success: false,
      error: "The uploaded file does not contain a valid JSON object.",
    };
  }

  // 1. Direct native match
  if (isValidSessionData(parsed)) {
    return {
      success: true,
      data: normalizeSessionData(parsed),
      detectedSchema: "CV Builder Native Format",
    };
  }

  const raw = parsed as Record<string, unknown>;

  // 2. Locate General Information / Basics
  const gSource = (raw.generalInfo ||
    raw.basics ||
    raw.personalInfo ||
    raw.personal_info ||
    raw.contact ||
    raw.profile ||
    raw.info ||
    raw) as Record<string, unknown>;

  let firstName = extractString(gSource, [
    "firstName",
    "first_name",
    "givenName",
    "fname",
  ]);
  let lastName = extractString(gSource, [
    "lastName",
    "last_name",
    "familyName",
    "surname",
    "lname",
  ]);

  // If full name is in a single string (e.g. JSON Resume "name: 'Amr Khaled'")
  if (!firstName && !lastName) {
    const fullName = extractString(gSource, [
      "name",
      "fullName",
      "full_name",
      "displayName",
    ]);
    if (fullName) {
      const parts = fullName.split(/\s+/);
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }
  }

  const headline = extractString(gSource, [
    "headline",
    "label",
    "title",
    "jobTitle",
    "role",
    "occupation",
  ]);
  const phone = extractString(gSource, [
    "phone",
    "phoneNumber",
    "phone_number",
    "mobile",
    "tel",
  ]);
  const email = extractString(gSource, [
    "email",
    "mail",
    "emailAddress",
    "email_address",
  ]);
  const bio = extractString(gSource, [
    "bio",
    "summary",
    "about",
    "description",
    "objective",
  ]);

  // Handle location (string or object)
  let location = "";
  if (typeof gSource.location === "string") {
    location = gSource.location.trim();
  } else if (
    gSource.location &&
    typeof gSource.location === "object"
  ) {
    const locObj = gSource.location as Record<string, unknown>;
    const city = extractString(locObj, ["city", "town"]);
    const country = extractString(locObj, [
      "country",
      "countryCode",
      "region",
    ]);
    location = [city, country].filter(Boolean).join(", ");
  }

  // Handle links / social profiles
  const rawProfiles = (gSource.links ||
    gSource.profiles ||
    gSource.social ||
    raw.links ||
    raw.profiles) as unknown;

  const links: LinkInfo[] = [];
  if (Array.isArray(rawProfiles)) {
    rawProfiles.forEach((p) => {
      if (p && typeof p === "object") {
        const pObj = p as Record<string, unknown>;
        const title = extractString(pObj, [
          "title",
          "network",
          "platform",
          "name",
        ]);
        const url = extractString(pObj, ["url", "link", "href"]);
        if (url) {
          links.push({
            id: generateId(),
            title: title || "Website",
            customTitle: "",
            url,
          });
        }
      }
    });
  }

  // If website/url exists directly in basics
  const websiteUrl = extractString(gSource, ["url", "website"]);
  if (websiteUrl && !links.some((l) => l.url === websiteUrl)) {
    links.push({
      id: generateId(),
      title: "Portfolio",
      customTitle: "",
      url: websiteUrl,
    });
  }

  const generalInfo: GeneralInfo = {
    firstName,
    lastName,
    headline,
    phone,
    email,
    location,
    bio,
    links,
  };

  // 3. Locate Experience / Work
  const rawWork = (raw.workList ||
    raw.work ||
    raw.experience ||
    raw.experiences ||
    raw.jobs ||
    raw.employment) as unknown;

  const workList: ExperienceItem[] = [];
  if (Array.isArray(rawWork)) {
    rawWork.forEach((w) => {
      if (w && typeof w === "object") {
        const wObj = w as Record<string, unknown>;
        const companyName = extractString(wObj, [
          "companyName",
          "company",
          "name",
          "organization",
          "employer",
        ]);
        const position = extractString(wObj, [
          "position",
          "role",
          "title",
          "jobTitle",
        ]);
        const companyDescription = extractString(wObj, [
          "companyDescription",
          "summary",
          "description",
        ]);

        let responsibilities: string;
        if (Array.isArray(wObj.highlights)) {
          responsibilities = wObj.highlights
            .filter((h) => typeof h === "string")
            .join("\n");
        } else if (Array.isArray(wObj.responsibilities)) {
          responsibilities = wObj.responsibilities
            .filter((h) => typeof h === "string")
            .join("\n");
        } else {
          responsibilities = extractString(wObj, [
            "responsibilities",
            "bullets",
            "details",
          ]);
        }

        const startDate = extractString(wObj, [
          "startDate",
          "start_date",
          "from",
        ]);
        const endDate = extractString(wObj, ["endDate", "end_date", "to"]);
        const isCurrent = Boolean(
          wObj.isCurrent ?? wObj.current ?? (!endDate && startDate),
        );

        if (companyName || position || responsibilities) {
          workList.push({
            id: generateId(),
            companyName,
            position,
            responsibilities,
            location: extractString(wObj, ["location", "city"]),
            companyDescription,
            linkText: extractString(wObj, ["linkText", "websiteName"]),
            linkUrl: extractString(wObj, ["linkUrl", "url", "website"]),
            durationType: "date",
            startDate,
            endDate,
            customDuration: "",
            isCurrent,
          });
        }
      }
    });
  }

  // 4. Locate Education
  const rawEdu = (raw.educationList ||
    raw.education ||
    raw.academics ||
    raw.schools ||
    raw.degrees) as unknown;

  const educationList: EducationItem[] = [];
  if (Array.isArray(rawEdu)) {
    rawEdu.forEach((e) => {
      if (e && typeof e === "object") {
        const eObj = e as Record<string, unknown>;
        const schoolName = extractString(eObj, [
          "schoolName",
          "institution",
          "school",
          "university",
          "college",
        ]);
        const area = extractString(eObj, ["area", "major", "fieldOfStudy"]);
        const studyType = extractString(eObj, [
          "studyType",
          "degree",
          "qualification",
        ]);
        let study = extractString(eObj, ["study"]);
        if (!study) {
          study = [studyType, area].filter(Boolean).join(" in ");
        }

        let bullets: string;
        if (Array.isArray(eObj.courses)) {
          bullets = "Courses: " + eObj.courses.filter((c) => typeof c === "string").join(", ");
        } else if (Array.isArray(eObj.bullets)) {
          bullets = eObj.bullets.filter((b) => typeof b === "string").join("\n");
        } else {
          bullets = extractString(eObj, ["bullets", "description"]);
        }

        const grade = extractString(eObj, ["grade", "gpa", "score"]);
        const startDate = extractString(eObj, ["startDate", "start_date", "from"]);
        const endDate = extractString(eObj, ["endDate", "end_date", "to"]);

        if (schoolName || study) {
          educationList.push({
            id: generateId(),
            schoolName,
            study,
            place: extractString(eObj, ["place", "location", "city"]),
            grade,
            subTitle: extractString(eObj, ["subTitle", "faculty"]),
            linkText: extractString(eObj, ["linkText"]),
            linkUrl: extractString(eObj, ["linkUrl", "url"]),
            bullets,
            durationType: "date",
            startDate,
            endDate,
            customDuration: "",
            isCurrent: Boolean(eObj.isCurrent),
          });
        }
      }
    });
  }

  // 5. Locate Projects
  const rawProj = (raw.projectList || raw.projects || raw.portfolio) as unknown;
  const projectList: ProjectItem[] = [];
  if (Array.isArray(rawProj)) {
    rawProj.forEach((p) => {
      if (p && typeof p === "object") {
        const pObj = p as Record<string, unknown>;
        const title = extractString(pObj, ["title", "name"]);
        const tagline = extractString(pObj, ["tagline", "summary", "subtitle"]);

        let description: string;
        if (Array.isArray(pObj.highlights)) {
          description = pObj.highlights.filter((h) => typeof h === "string").join("\n");
        } else if (Array.isArray(pObj.description)) {
          description = pObj.description.filter((d) => typeof d === "string").join("\n");
        } else {
          description = extractString(pObj, ["description", "details"]);
        }

        const projectLinks = [];
        const url = extractString(pObj, ["url", "link", "website"]);
        if (url) {
          projectLinks.push({
            id: generateId(),
            title: "Website",
            customTitle: "",
            url,
          });
        }

        if (title || description) {
          projectList.push({
            id: generateId(),
            title,
            tagline,
            description,
            durationType: "date",
            startDate: extractString(pObj, ["startDate", "start_date"]),
            endDate: extractString(pObj, ["endDate", "end_date"]),
            customDuration: "",
            isCurrent: Boolean(pObj.isCurrent),
            links: projectLinks,
          });
        }
      }
    });
  }

  // 6. Locate Skills
  const rawSkills = (raw.skillList ||
    raw.skills ||
    raw.technologies ||
    raw.competencies) as unknown;

  const skillList: SkillCategory[] = [];
  if (Array.isArray(rawSkills)) {
    rawSkills.forEach((s) => {
      if (s && typeof s === "object") {
        const sObj = s as Record<string, unknown>;
        const categoryName = extractString(sObj, [
          "category",
          "name",
          "group",
          "title",
        ]);

        let items: { id: string; name: string }[] = [];
        if (Array.isArray(sObj.skills)) {
          items = sObj.skills
            .filter((sk) => sk && (typeof sk === "string" || typeof sk === "object"))
            .map((sk) => {
              if (typeof sk === "string") return { id: generateId(), name: sk };
              const skObj = sk as Record<string, unknown>;
              return { id: generateId(), name: String(skObj.name || "") };
            })
            .filter((it) => it.name.trim());
        } else if (Array.isArray(sObj.keywords)) {
          // JSON Resume format: { name: "Web Development", keywords: ["HTML", "CSS", "JS"] }
          items = sObj.keywords
            .filter((kw): kw is string => typeof kw === "string" && Boolean(kw.trim()))
            .map((kw) => ({ id: generateId(), name: kw.trim() }));
        }

        if (categoryName || items.length > 0) {
          skillList.push({
            id: generateId(),
            category: categoryName || "Skills",
            skills: items,
          });
        }
      } else if (typeof s === "string" && s.trim()) {
        // Flat array of skill strings: ["JavaScript", "Python", "React"]
        let defaultCat = skillList.find((c) => c.category === "Technical Skills");
        if (!defaultCat) {
          defaultCat = { id: generateId(), category: "Technical Skills", skills: [] };
          skillList.push(defaultCat);
        }
        defaultCat.skills.push({ id: generateId(), name: s.trim() });
      }
    });
  }

  // 7. Verify whether any meaningful resume fields were extracted
  const candidateSession = {
    generalInfo,
    educationList,
    workList,
    projectList,
    skillList,
    customSections: [],
    sectionOrder: ["summary", "education", "experience", "projects", "skills"],
  };

  if (isValidSessionData(candidateSession)) {
    return {
      success: true,
      data: normalizeSessionData(candidateSession),
      detectedSchema: "Adapted from External Schema (JSON Resume / Custom)",
    };
  }

  return {
    success: false,
    error:
      "Could not detect any recognized CV fields (such as name, experience, education, or skills) in the uploaded JSON file.",
  };
}

export type ImportCvResult = {
  data: CvSessionData;
  detectedSchema?: string;
};

export class ImportCvError extends Error {
  rawText?: string;
  constructor(message: string, rawText?: string) {
    super(message);
    this.name = "ImportCvError";
    this.rawText = rawText;
  }
}

/**
 * Imports, parses, and adapts CV data from a user-uploaded JSON file.
 * Automatically adapts foreign schemas or rejects with an ImportCvError containing raw content.
 */
export function importCvFromJson(file: File): Promise<ImportCvResult> {
  return new Promise((resolve, reject) => {
    // 1MB file size cap
    if (file.size > 1024 * 1024) {
      reject(new ImportCvError("File exceeds maximum allowed size of 1MB."));
      return;
    }

    // Case-insensitive check
    if (!file.name.toLowerCase().endsWith(".json")) {
      reject(new ImportCvError("Please upload a valid .json file."));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || "";
      try {
        const parsed = JSON.parse(text);
        const adaptResult = adaptJsonToCvData(parsed);
        if (adaptResult.success && adaptResult.data) {
          resolve({
            data: adaptResult.data,
            detectedSchema: adaptResult.detectedSchema,
          });
        } else {
          reject(
            new ImportCvError(
              adaptResult.error ||
                "The uploaded file does not match a recognized CV structure.",
              text,
            ),
          );
        }
      } catch {
        reject(
          new ImportCvError(
            "Failed to parse JSON file. File may be malformed or corrupted.",
            text,
          ),
        );
      }
    };
    reader.onerror = () => reject(new ImportCvError("Failed to read the file."));
    reader.readAsText(file);
  });
}
