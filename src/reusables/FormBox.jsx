import "./FormBox.css";
export default function FormBox({ label, children }) {
  return (
    <div className="FormBox">
      {label && <label className="FormLabel">{label}</label>}
      {children}
    </div>
  );
}
