import "./FormBox.css";
export default function FormBox({
  label,
  htmlFor,
  required = false,
  children,
}) {
  return (
    <div className="FormBox">
      {label && (
        <label htmlFor={htmlFor} className="FormLabel">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {children}
    </div>
  );
}
