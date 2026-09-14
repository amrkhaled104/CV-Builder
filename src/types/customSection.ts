export type ProjectLink = {
  id: string;
  title: string;
  customTitle?: string;
  url: string;
};

/**
 * Unified item structure reusing the existing Project & Experience layouts
 * (title, tagline, description/bullets, dates, and links).
 */
export type CustomSectionItem = {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  durationType: "date" | "hours" | "custom" | string;
  startDate: string;
  endDate: string;
  customDuration: string;
  isCurrent: boolean;
  links: ProjectLink[];
  // Optional experience fields for maximum compatibility across item models
  companyName?: string;
  position?: string;
  responsibilities?: string;
  location?: string;
  companyDescription?: string;
  linkText?: string;
  linkUrl?: string;
};

export type CustomSection = {
  id: string;
  title: string;
  items: CustomSectionItem[];
};

/**
 * Factory creating an empty item with the standard project/item shape.
 */
export function createEmptyCustomItem(): CustomSectionItem {
  return {
    id: crypto.randomUUID(),
    title: "",
    tagline: "",
    description: "",
    durationType: "date",
    startDate: "",
    endDate: "",
    customDuration: "",
    isCurrent: false,
    links: [
      {
        id: crypto.randomUUID(),
        title: "",
        customTitle: "",
        url: "",
      },
    ],
  };
}
