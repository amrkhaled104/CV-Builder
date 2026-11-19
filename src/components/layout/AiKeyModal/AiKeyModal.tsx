import { useState, useEffect } from "react";
import "./AiKeyModal.css";
import { getAiKey, setAiKey, clearAiKey, hasAiKey } from "../../../utils/aiKeyStorage";

type AiKeyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated?: (hasKey: boolean) => void;
};

function AiKeyModalContent({
  onClose,
  onKeyUpdated,
}: {
  onClose: () => void;
  onKeyUpdated?: (hasKey: boolean) => void;
}) {
  const [apiKey, setApiKeyState] = useState(() => getAiKey());
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; type: "success" | "info" } | null>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSave() {
    const trimmed = apiKey.trim();
    if (!trimmed) {
      clearAiKey();
      onKeyUpdated?.(false);
      setStatusMsg({ text: "Key cleared.", type: "info" });
      setTimeout(() => onClose(), 600);
      return;
    }

    setAiKey(trimmed);
    onKeyUpdated?.(true);
    setStatusMsg({ text: "API key saved locally.", type: "success" });
    setTimeout(() => onClose(), 600);
  }

  function handleClear() {
    clearAiKey();
    setApiKeyState("");
    onKeyUpdated?.(false);
    setStatusMsg({ text: "API key removed from browser storage.", type: "info" });
  }

  return (
    <div
      className="ai-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-modal-title"
    >
      <div className="ai-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="ai-modal-header">
          <div className="ai-modal-title-wrap">
            <h2 id="ai-modal-title" className="ai-modal-title">
              Gemini API Key Settings (BYOK)
            </h2>
          </div>
          <button
            type="button"
            className="ai-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="ai-modal-body">
          <p className="ai-modal-description">
            Bring Your Own Key (BYOK) to unlock client-side AI resume enhancement.
            Transform raw, informal notes (in Arabic or rough English) into crisp,
            ATS-optimized bullets using Google&apos;s XYZ formula.
          </p>

          <div className="ai-key-input-wrap">
            <input
              type={showPassword ? "text" : "password"}
              className="ai-key-input"
              placeholder="Paste your Gemini API key (AIza...)"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              className="ai-key-toggle-btn"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="ai-key-help">
            <span>Don&apos;t have a free key yet?</span>
            <a
              href="https://aistudio.google.com/apikey"
              target="_blank"
              rel="noreferrer"
              className="ai-key-link"
            >
              Get a free API key at Google AI Studio &rarr;
            </a>
          </div>

          <div className="ai-key-privacy-note">
            <strong>Privacy Note:</strong> Your key is stored exclusively in your browser&apos;s local storage.
            Requests are sent directly from your browser to Google&apos;s Gemini REST API endpoints with no backend intermediary.
          </div>

          {statusMsg && (
            <div className={`ai-key-status-msg ${statusMsg.type}`}>
              {statusMsg.text}
            </div>
          )}
        </div>

        <div className="ai-modal-footer">
          {hasAiKey() && (
            <button
              type="button"
              className="btn-header btn-header--secondary"
              onClick={handleClear}
              style={{ color: "var(--danger-color)", borderColor: "var(--border-color)" }}
            >
              Remove Key
            </button>
          )}

          <div className="ai-modal-footer-actions">
            <button
              type="button"
              className="btn-header btn-header--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-header btn-header--primary"
              onClick={handleSave}
            >
              Save Key
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiKeyModal({
  isOpen,
  onClose,
  onKeyUpdated,
}: AiKeyModalProps) {
  if (!isOpen) return null;

  return (
    <AiKeyModalContent
      onClose={onClose}
      onKeyUpdated={onKeyUpdated}
    />
  );
}
