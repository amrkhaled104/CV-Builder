import { useState } from "react";
import "./FormCard.css";
import SectionOrderControls from "../components/layout/SectionOrderControls.tsx";

export default function FormCard({
  title,
  children,
  className = "",
  sectionKey,
  sectionOrder = [],
  isReordering = false,
  onMoveUp,
  onMoveDown,
  defaultOpen = true,
  collapsible = true,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const sectionIndex = sectionKey ? sectionOrder.indexOf(sectionKey) : -1;

  function handleToggleHeader(e) {
    // If clicking on section order controls or a button, don't toggle accordion
    if (e.target.closest(".section-order-controls") || e.target.closest("button")) {
      return;
    }
    if (collapsible) {
      setIsOpen((prev) => !prev);
    }
  }

  return (
    <section
      className={`form-card ${className}${isReordering && sectionKey ? " is-reordering" : ""}${!isOpen ? " is-collapsed" : ""}`}
    >
      {title && (
        <div
          className={`form-card-header${collapsible ? " is-clickable" : ""}`}
          onClick={handleToggleHeader}
          role={collapsible ? "button" : undefined}
          tabIndex={collapsible ? 0 : undefined}
          aria-expanded={collapsible ? isOpen : undefined}
          onKeyDown={(e) => {
            if (collapsible && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setIsOpen((prev) => !prev);
            }
          }}
        >
          <div className="form-card-title-wrap">
            {collapsible && (
              <span
                className={`accordion-chevron${isOpen ? " is-open" : ""}`}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            )}
            <h2 className="form-card-title">{title}</h2>
          </div>

          <div
            className="form-card-header-actions"
            onClick={(e) => e.stopPropagation()}
          >
            {sectionKey && onMoveUp && onMoveDown && (
              <SectionOrderControls
                sectionKey={sectionKey}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                isFirst={sectionIndex === 0}
                isLast={sectionIndex === sectionOrder.length - 1}
                isVisible={isReordering}
              />
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <fieldset disabled={isReordering} className="form-card-content">
          {children}
        </fieldset>
      )}
    </section>
  );
}
