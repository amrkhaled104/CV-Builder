import type { SectionKey } from "../../hooks/useSectionOrder";

type SectionOrderControlsProps = {
  sectionKey: SectionKey;
  onMoveUp: (key: SectionKey) => void;
  onMoveDown: (key: SectionKey) => void;
  isFirst: boolean;
  isLast: boolean;
  isVisible: boolean;
};

const sectionLabels: Record<SectionKey, string> = {
  summary: "Summary",
  education: "Education",
  experience: "Experience",
  projects: "Projects",
  skills: "Skills",
};

export default function SectionOrderControls({
  sectionKey,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  isVisible,
}: SectionOrderControlsProps) {
  if (!isVisible) return null;

  return (
    <div
      className="section-order-item"
      aria-label={`Reorder ${sectionLabels[sectionKey]}`}
    >
      <span>{sectionLabels[sectionKey]}</span>
      <button
        type="button"
        aria-label={`Move ${sectionLabels[sectionKey]} up`}
        disabled={isFirst}
        onClick={() => onMoveUp(sectionKey)}
      >
        ↑
      </button>
      <button
        type="button"
        aria-label={`Move ${sectionLabels[sectionKey]} down`}
        disabled={isLast}
        onClick={() => onMoveDown(sectionKey)}
      >
        ↓
      </button>
    </div>
  );
}
