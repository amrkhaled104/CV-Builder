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
}) {
  const sectionIndex = sectionKey ? sectionOrder.indexOf(sectionKey) : -1;

  return (
    <section className={`form-card ${className}`}>
      {title && (
        <div className="form-card-header">
          <h2 className="form-card-title">{title}</h2>
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
      )}
      <fieldset disabled={isReordering} className="form-card-content">
        {children}
      </fieldset>
    </section>
  );
}
