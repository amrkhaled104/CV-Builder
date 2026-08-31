import "./SectionTitle.css";
export default function SectionTitle({ title, subtitle = "" }) {
  return (
    <div className="section-title">
      <h3>{title}</h3>

      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
