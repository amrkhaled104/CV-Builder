import "./ActionButton.css";
export default function ActionButtons({
  text,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  title,
}) {
  return (
    <button
      type="button"
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {text}
    </button>
  );
}
