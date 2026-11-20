import { useState, useEffect } from "react";
import "./ImportGuideModal.css";
import { getCvTemplateJsonString, downloadCvTemplateJson } from "../../../utils/schemaTemplate";
import { translateJsonWithGemini } from "../../../services/geminiService";
import type { CvSessionData } from "../../../utils/storage";

type ImportGuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errorMessage?: string;
  rawJsonContent?: string;
  hasAiKey?: boolean;
  onOpenAiKeyModal?: () => void;
  onImportSuccess?: (data: CvSessionData) => void;
};

export default function ImportGuideModal({
  isOpen,
  onClose,
  errorMessage,
  rawJsonContent,
  hasAiKey = false,
  onOpenAiKeyModal,
  onImportSuccess,
}: ImportGuideModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showRawUpload, setShowRawUpload] = useState(false);
  const [showFullSchema, setShowFullSchema] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isTranslating) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isTranslating]);

  if (!isOpen) return null;

  const templateString = getCvTemplateJsonString();

  async function handleCopyTemplate() {
    try {
      await navigator.clipboard.writeText(templateString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  async function handleAiTranslate() {
    if (!rawJsonContent?.trim()) {
      setAiError("No uploaded content available to translate.");
      return;
    }
    if (!hasAiKey) {
      onOpenAiKeyModal?.();
      return;
    }

    setIsTranslating(true);
    setAiError(null);

    try {
      const translatedData = await translateJsonWithGemini(rawJsonContent);
      setIsTranslating(false);
      onImportSuccess?.(translatedData);
      onClose();
    } catch (err: unknown) {
      setIsTranslating(false);
      setAiError(
        (err as Error).message ||
          "AI translation failed. Please check your Gemini API key or network connection.",
      );
    }
  }

  return (
    <div
      className="import-modal-backdrop"
      onClick={() => {
        if (!isTranslating) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="import-guide-title"
    >
      <div
        className="import-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="import-modal-header">
          <div className="import-modal-title-wrap">
            <svg
              className="import-modal-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h2 id="import-guide-title" className="import-modal-title">
              JSON Import Assistance
            </h2>
          </div>
          <button
            type="button"
            className="import-modal-close"
            onClick={onClose}
            disabled={isTranslating}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="import-modal-body">
          {/* Reason Banner */}
          <div className="import-banner import-banner--warning">
            <div className="import-banner-header">
              <strong>Uploaded file could not be mapped directly:</strong>
            </div>
            <p className="import-banner-text">
              {errorMessage ||
                "The uploaded JSON file does not contain recognizable CV fields (such as name, experience, education, or skills)."}
            </p>
          </div>

          {/* AI Translation Option */}
          {rawJsonContent && (
            <div className="import-solution-card">
              <div className="import-solution-info">
                <h3 className="import-solution-title">Option 1: Auto-Translate with AI</h3>
                <p className="import-solution-desc">
                  Convert your uploaded JSON or resume data automatically into the required schema using Gemini Flash (BYOK).
                </p>
                {aiError && (
                  <div className="import-ai-error" role="alert">
                    {aiError}
                  </div>
                )}
              </div>
              <div className="import-solution-actions">
                <button
                  type="button"
                  className="btn-modal-action btn-modal-action--primary"
                  onClick={handleAiTranslate}
                  disabled={isTranslating}
                >
                  {isTranslating ? (
                    <span className="import-spinner-wrap">
                      <span className="import-spinner" />
                      Translating...
                    </span>
                  ) : hasAiKey ? (
                    "Translate with AI"
                  ) : (
                    "Add API Key to Translate"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Template Download Option */}
          <div className="import-solution-card">
            <div className="import-solution-info">
              <h3 className="import-solution-title">
                {rawJsonContent ? "Option 2: Use the Standard Template" : "Standard JSON Template"}
              </h3>
              <p className="import-solution-desc">
                Download the official JSON schema template pre-populated with example fields, edit it with your data, and re-upload.
              </p>
            </div>
            <div className="import-solution-actions">
              <button
                type="button"
                className="btn-modal-action btn-modal-action--secondary"
                onClick={downloadCvTemplateJson}
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
                <span>Download Template (.json)</span>
              </button>
            </div>
          </div>

          {/* Expandable Expected Schema Viewer */}
          <div className="import-schema-section">
            <div className="import-schema-header">
              <button
                type="button"
                className="import-schema-toggle"
                onClick={() => setShowFullSchema((prev) => !prev)}
                aria-expanded={showFullSchema}
              >
                <svg
                  className={`import-chevron${showFullSchema ? " open" : ""}`}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span>Expected JSON Structure Reference</span>
              </button>
              {showFullSchema && (
                <button
                  type="button"
                  className="btn-copy-schema"
                  onClick={handleCopyTemplate}
                >
                  {isCopied ? "Copied!" : "Copy Schema"}
                </button>
              )}
            </div>

            {showFullSchema && (
              <div className="import-code-container">
                <pre className="import-code-block">
                  <code>{templateString}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Inspect Raw Upload (if available) */}
          {rawJsonContent && (
            <div className="import-raw-section">
              <button
                type="button"
                className="import-raw-toggle"
                onClick={() => setShowRawUpload((prev) => !prev)}
                aria-expanded={showRawUpload}
              >
                <svg
                  className={`import-chevron${showRawUpload ? " open" : ""}`}
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
                <span>View Uploaded File Content Snippet</span>
              </button>
              {showRawUpload && (
                <div className="import-code-container import-code-container--raw">
                  <pre className="import-code-block">
                    <code>
                      {rawJsonContent.slice(0, 1000)}
                      {rawJsonContent.length > 1000 ? "\n... (truncated)" : ""}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="import-modal-footer">
          <button
            type="button"
            className="btn-modal-action btn-modal-action--secondary"
            onClick={onClose}
            disabled={isTranslating}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
