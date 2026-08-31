import "./FormCard.css";
export default function FormCard({ title, children, className = "" }) {
  return (
    <section className={`form-card ${className}`}>
      {title && <h2 className="form-card-title">{title}</h2>}
      <div className="form-card-content">{children}</div>
    </section>
  );
}
