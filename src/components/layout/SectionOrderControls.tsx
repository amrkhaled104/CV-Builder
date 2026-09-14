import type { SectionKey } from "../../hooks/useSectionOrder";
import "./SectionOrderControls.css";

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

  const label = sectionLabels[sectionKey];

  return (
    <div
      className="section-order-controls"
      role="group"
      aria-label={`Reorder ${label}`}
    >
      <button
        type="button"
        className="section-order-btn"
        aria-label={`Move ${label} up`}
        title={`Move ${label} up`}
        disabled={isFirst}
        onClick={() => onMoveUp(sectionKey)}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>

      <button
        type="button"
        className="section-order-btn"
        aria-label={`Move ${label} down`}
        title={`Move ${label} down`}
        disabled={isLast}
        onClick={() => onMoveDown(sectionKey)}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>
  );
}
