import "./ActionButton.css";
export default function ActionButtons({
  text,
  onClick,
  variant = "primary",
  className = "",
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
