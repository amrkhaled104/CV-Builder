import "./HeaderBar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect } from "react";
export default function HeaderBar({
  cvRef,
  loadSampleCV,
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
    <div className="header-bar">
      <div className="theme-toggle-handle" onClick={toggleTheme}>
        {theme ? <LightModeIcon /> : <DarkModeIcon />}
      </div>
      <div className="logo">CV</div>
      <div className="headerButtons">
        <button className="sampleCV" onClick={loadSampleCV}>
          Sample Cv
        </button>
        <button className="pdfDownload" onClick={handlePrint}>
          PDF
        </button>
        <button
          className={`reorderSections${isReordering ? " active" : ""}`}
          onClick={onToggleReordering}
          aria-pressed={isReordering}
          title={isReordering ? "Done reordering sections" : "Reorder CV sections"}
        >
          {isReordering ? (
            <>
              <svg
                className="reorder-btn-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Done</span>
            </>
          ) : (
            <>
              <svg
                className="reorder-btn-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 15l5 5 5-5" />
                <path d="M7 9l5-5 5 5" />
              </svg>
              <span>Edit Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
