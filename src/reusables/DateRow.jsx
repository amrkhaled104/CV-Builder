import "./DataRow.css";
export default function DateRow({ children, className = "" }) {
  return <div className={`date-row ${className}`}>{children}</div>;
}
