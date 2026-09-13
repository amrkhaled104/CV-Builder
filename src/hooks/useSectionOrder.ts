import { useState } from "react";

export type SectionKey =
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills";

const initialSectionOrder: SectionKey[] = [
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
];

export function useSectionOrder() {
  const [sectionOrder, setSectionOrder] =
    useState<SectionKey[]>(initialSectionOrder);
  const [isReordering, setIsReordering] = useState(false);

  function toggleReordering() {
    setIsReordering((current) => !current);
  }

  function moveUp(key: SectionKey) {
    setSectionOrder((current) => {
      const index = current.indexOf(key);
      if (index <= 0) return current;

      const next = [...current];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }

  function moveDown(key: SectionKey) {
    setSectionOrder((current) => {
      const index = current.indexOf(key);
      if (index === -1 || index === current.length - 1) return current;

      const next = [...current];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }

  return {
    sectionOrder,
    isReordering,
    toggleReordering,
    moveUp,
    moveDown,
  };
}
