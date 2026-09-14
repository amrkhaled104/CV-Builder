import { useState } from "react";
import type { CustomSection, CustomSectionItem } from "../types/customSection";
import { createEmptyCustomItem } from "../types/customSection";

export type UseCustomSectionsOptions = {
  onSectionAdded?: (sectionId: string) => void;
  onSectionRemoved?: (sectionId: string) => void;
};

export function useCustomSections(
  initialSections: CustomSection[] = [],
  options?: UseCustomSectionsOptions,
) {
  const [customSections, setCustomSections] =
    useState<CustomSection[]>(initialSections);

  /**
   * Adds a new custom section and triggers order registration.
   */
  function addSection(
    title: string = "New Section",
    items: CustomSectionItem[] = [],
    id?: string,
  ): CustomSection {
    const newSection: CustomSection = {
      id: id ?? `custom-${crypto.randomUUID()}`,
      title,
      items,
    };

    setCustomSections((prev) => [...prev, newSection]);
    options?.onSectionAdded?.(newSection.id);
    return newSection;
  }

  /**
   * Removes a custom section by ID and deregisters it from the section order.
   */
  function removeSection(sectionId: string): void {
    setCustomSections((prev) => prev.filter((sec) => sec.id !== sectionId));
    options?.onSectionRemoved?.(sectionId);
  }

  /**
   * Appends an item to a target custom section.
   */
  function addItem(
    sectionId: string,
    item?: Partial<CustomSectionItem>,
  ): CustomSectionItem {
    const newItem: CustomSectionItem = {
      ...createEmptyCustomItem(),
      ...item,
      id: item?.id ?? crypto.randomUUID(),
    };

    setCustomSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId ? { ...sec, items: [...sec.items, newItem] } : sec,
      ),
    );

    return newItem;
  }

  /**
   * Updates an item's field or multiple fields within a custom section.
   */
  function updateItem(
    sectionId: string,
    itemId: string,
    fieldOrPatch: Partial<CustomSectionItem> | keyof CustomSectionItem,
    value?: unknown,
  ): void {
    setCustomSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;

        return {
          ...sec,
          items: sec.items.map((item) => {
            if (item.id !== itemId) return item;

            if (typeof fieldOrPatch === "string") {
              return { ...item, [fieldOrPatch]: value };
            }
            return { ...item, ...fieldOrPatch };
          }),
        };
      }),
    );
  }

  /**
   * Removes an item by ID from a custom section.
   */
  function removeItem(sectionId: string, itemId: string): void {
    setCustomSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;

        return {
          ...sec,
          items: sec.items.filter((item) => item.id !== itemId),
        };
      }),
    );
  }

  /**
   * Updates the title of a custom section.
   */
  function updateSectionTitle(sectionId: string, title: string): void {
    setCustomSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, title } : sec)),
    );
  }

  /**
   * Loads a pre-configured sample section (if not already loaded) and registers it into sectionOrder.
   */
  function loadSampleSection(sample: CustomSection): void {
    if (
      customSections.some(
        (s) =>
          s.id === sample.id ||
          s.title.trim().toLowerCase() === sample.title.trim().toLowerCase(),
      )
    ) {
      return;
    }
    const cloned: CustomSection = JSON.parse(JSON.stringify(sample));
    setCustomSections((prev) => [...prev, cloned]);
    options?.onSectionAdded?.(cloned.id);
  }

  return {
    customSections,
    setCustomSections,
    addSection,
    removeSection,
    updateSectionTitle,
    loadSampleSection,
    addItem,
    updateItem,
    removeItem,
  };
}
