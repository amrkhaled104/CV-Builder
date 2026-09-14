import { useState } from "react";

export type BuiltinSectionKey =
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills";

export type SectionKey = BuiltinSectionKey | (string & {});

export const initialSectionOrder: SectionKey[] = [
  "summary",
  "education",
  "experience",
  "projects",
  "skills",
];

export function useSectionOrder(initialOrder: SectionKey[] = initialSectionOrder) {
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(initialOrder);
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

  function addSection(key: SectionKey) {
    setSectionOrder((current) =>
      current.includes(key) ? current : [...current, key],
    );
  }

  function removeSection(key: SectionKey) {
    setSectionOrder((current) => current.filter((k) => k !== key));
  }

  return {
    sectionOrder,
    setSectionOrder,
    isReordering,
    toggleReordering,
    moveUp,
    moveDown,
    addSection,
    removeSection,
    addSectionKey: addSection,
    removeSectionKey: removeSection,
  };
}
