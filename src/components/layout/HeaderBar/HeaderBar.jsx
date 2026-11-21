import "./HeaderBar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useReactToPrint } from "react-to-print";
import { useState, useEffect, useRef } from "react";

export default function HeaderBar({
  cvRef,
  onSave,
  isSavedRecently,
  hasSavedDraft,
  onResume,
  onSample,
  isReordering,
  onToggleReordering,
  onExportJson,
  onImportJson,
  onDownloadTemplate,
  onOpenAtsModal,
  atsScore,
  hasAiKey = false,
  onOpenAiModal,
  documentTitle = "Resume",
  isPrintDisabled = false,
}) {
  const [theme, setTheme] = useState(false);
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const fileMenuRef = useRef(null);

  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle,
  });

  // Theme effect
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

  // Click outside and Escape key to close File dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target)) {
        setIsFileMenuOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsFileMenuOpen(false);
      }
    }

    if (isFileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFileMenuOpen]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      e.target.value = "";
      setIsFileMenuOpen(false);
    }
  }

  function handleActionClick(action) {
    action();
    setIsFileMenuOpen(false);
  }

  return (
    <header className="header-bar">
      {/* LEFT: Brand Title & File Dropdown */}
      <div className="header-left">
        <div className="brand-logo" aria-label="CV Builder Workspace">
          <span className="brand-mark" aria-hidden="true">CV</span>
          <span className="brand-title">BUILDER</span>
        </div>

        {/* Secondary Actions Grouped into File Dropdown */}
        <div className="file-menu-container" ref={fileMenuRef}>
          <button
            type="button"
            className={`btn-header btn-header--secondary btn-file-menu${isFileMenuOpen ? " active" : ""}`}
            onClick={() => setIsFileMenuOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={isFileMenuOpen}
            title="File and Data Actions (Save, Resume, Export, Import, Sample)"
          >
            <span>File</span>
            <svg
              className={`file-chevron${isFileMenuOpen ? " open" : ""}`}
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isFileMenuOpen && (
            <div className="file-dropdown-menu" role="menu">
              {/* Hidden file input for JSON import */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept=".json,application/json"
                onChange={handleFileChange}
              />

              <button
                type="button"
                className={`file-menu-item${isSavedRecently ? " is-saved" : ""}`}
                role="menuitem"
                onClick={() => handleActionClick(onSave)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                <span>{isSavedRecently ? "Draft Saved!" : "Save Draft"}</span>
              </button>

              {hasSavedDraft && (
                <button
                  type="button"
                  className="file-menu-item"
                  role="menuitem"
                  onClick={() => handleActionClick(onResume)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>Resume Saved Draft</span>
                </button>
              )}

              <button
                type="button"
                className="file-menu-item"
                role="menuitem"
                onClick={() => handleActionClick(onExportJson)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Export JSON Backup</span>
              </button>

              <button
                type="button"
                className="file-menu-item"
                role="menuitem"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                    fileInputRef.current.click();
                  }
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Import JSON</span>
              </button>

              <button
                type="button"
                className="file-menu-item"
                role="menuitem"
                onClick={() => handleActionClick(onDownloadTemplate)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                <span>Download JSON Template</span>
              </button>

              <div className="file-menu-divider" />

              <button
                type="button"
                className="file-menu-item"
                role="menuitem"
                onClick={() => handleActionClick(onSample)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="11" y2="17" />
                </svg>
                <span>Load Sample CV</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: High-frequency controls */}
      <div className="header-right headerButtons">
        <button
          type="button"
          className={`btn-header btn-header--secondary btn-header--sort${isReordering ? " active" : ""}`}
          onClick={onToggleReordering}
          aria-pressed={isReordering}
          title={isReordering ? "Done reordering sections" : "Reorder CV sections"}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 5 }}
            aria-hidden="true"
          >
            <polyline points="7 15 12 20 17 15" />
            <polyline points="7 9 12 4 17 9" />
          </svg>
          <span>Sort</span>
        </button>

        <button
          type="button"
          className="btn-header btn-header--ats"
          onClick={onOpenAtsModal}
          title="Open Rules & Formatting Audit"
        >
          <span>Rules {atsScore !== undefined ? `${atsScore}%` : "Audit"}</span>
        </button>

        <button
          type="button"
          className="btn-header btn-header--ai"
          onClick={onOpenAiModal}
          title={
            hasAiKey
              ? "Gemini AI Key configured (Click to change)"
              : "Configure your Gemini API Key for AI enhancements"
          }
        >
          <span
            className={`ai-dot${hasAiKey ? " active" : ""}`}
            aria-hidden="true"
          />
          <span>AI Key</span>
        </button>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={theme ? "Switch to dark mode" : "Switch to light mode"}
          title={theme ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme ? (
            <LightModeIcon fontSize="small" />
          ) : (
            <DarkModeIcon fontSize="small" />
          )}
        </button>

        <button
          type="button"
          className="btn-header btn-header--primary"
          onClick={handlePrint}
          disabled={isPrintDisabled}
          title={
            isPrintDisabled
              ? "Add content to your CV before downloading PDF"
              : "Export ATS-friendly PDF"
          }
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 6 }}
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>Download PDF</span>
        </button>
      </div>
    </header>
  );
}
