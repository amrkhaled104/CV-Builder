import "./HeaderBar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect } from "react";
export default function HeaderBar({
  cvRef,
  onSave,
  isSavedRecently,
  hasSavedDraft,
  onResume,
  onSample,
  isReordering,
  onToggleReordering,
}) {
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };
  const handlePrint = useReactToPrint({
    contentRef: cvRef,
  });
  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
    }
  }, [theme]);

  return (
    <header className="header-bar">
      <div className="header-left">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={theme ? "Switch to dark mode" : "Switch to light mode"}
          title={theme ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </button>
      </div>

      <div className="header-center">
        <span className="logo">CV</span>
      </div>

      <div className="header-right headerButtons">
        <button
          type="button"
          className={`btn-header btn-header--secondary btn-header--save${isSavedRecently ? " is-saved" : ""}`}
          onClick={onSave}
          title="Save current CV draft to local storage"
        >
          {isSavedRecently ? "Saved!" : "Save"}
        </button>

        {hasSavedDraft && (
          <button
            type="button"
            className="btn-header btn-header--secondary btn-header--resume"
            onClick={onResume}
            title="Resume saved CV draft"
          >
            Resume
          </button>
        )}

        <button
          type="button"
          className="btn-header btn-header--secondary"
          onClick={onSample}
          title="Load sample CV template"
        >
          Sample
        </button>

        <button
          type="button"
          className={`btn-header btn-header--secondary btn-header--sort${isReordering ? " active" : ""}`}
          onClick={onToggleReordering}
          aria-pressed={isReordering}
          title={isReordering ? "Done reordering sections" : "Reorder CV sections"}
        >
          Sort
        </button>

        <button
          type="button"
          className="btn-header btn-header--primary"
          onClick={handlePrint}
          title="Export CV as PDF"
        >
          PDF
        </button>
      </div>
    </header>
  );
}
