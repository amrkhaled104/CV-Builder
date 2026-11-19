import { useMemo } from "react";
import "./AiEnhanceBox.css";
import { useAiEnhance } from "../../../hooks/useAiEnhance";
import type { SectionType } from "../../../services/geminiService";

type AiEnhanceBoxProps = {
  sectionType: SectionType;
  rawContent: string;
  context?: string;
  onAccept: (improved: string) => void;
  onMissingKey?: () => void;
};

export default function AiEnhanceBox({
  sectionType,
  rawContent,
  context,
  onAccept,
  onMissingKey,
}: AiEnhanceBoxProps) {
  const { isLoading, error, suggestion, enhance, clearSuggestion } = useAiEnhance({
    onMissingKey,
  });

  const normalizedImprovedText = useMemo(() => {
    if (!suggestion) return "";
    if (Array.isArray(suggestion.improved)) {
      return suggestion.improved.join("\n");
    }
    return suggestion.improved.trim();
  }, [suggestion]);

  const improvedBullets = useMemo(() => {
    if (!suggestion) return [];
    if (Array.isArray(suggestion.improved)) {
      return suggestion.improved;
    }
    return suggestion.improved
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  }, [suggestion]);

  function handleAccept() {
    if (normalizedImprovedText) {
      onAccept(normalizedImprovedText);
      clearSuggestion();
    }
  }

  return (
    <div className="ai-enhance-container">
      {!suggestion && !isLoading && (
        <div className="ai-enhance-trigger-row">
          <button
            type="button"
            className="btn-ai-enhance"
            onClick={() => enhance(sectionType, rawContent, context)}
            title="Enhance with AI using Omar Shawky's guidelines and Google's XYZ formula"
          >
            <span>Enhance with AI</span>
          </button>
        </div>
      )}

      {isLoading && (
        <div className="ai-enhance-trigger-row">
          <button type="button" className="btn-ai-enhance" disabled>
            <span className="ai-spinner" aria-hidden="true" />
            <span>Analyzing & Enhancing...</span>
          </button>
        </div>
      )}

      {error && (
        <div className="ai-enhance-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="ai-enhance-error-close"
            onClick={clearSuggestion}
            aria-label="Dismiss error"
          >
            &times;
          </button>
        </div>
      )}

      {suggestion && (
        <div className="ai-suggestion-box">
          <div className="ai-suggestion-header">
            <span className="ai-suggestion-title">AI Suggestion (FAANG & XYZ)</span>
            <button
              type="button"
              className="ai-enhance-error-close"
              onClick={clearSuggestion}
              title="Close preview"
            >
              &times;
            </button>
          </div>

          <div className="ai-suggestion-content">
            {sectionType === "summary" ? (
              <p style={{ margin: 0 }}>{normalizedImprovedText}</p>
            ) : (
              <ul className="ai-suggestion-bullets">
                {improvedBullets.map((bullet, idx) => (
                  <li key={idx}>{bullet.replace(/^[-*•]\s*/, "")}</li>
                ))}
              </ul>
            )}
          </div>

          {suggestion.tips && suggestion.tips.length > 0 && (
            <div className="ai-suggestion-tips">
              <strong>Coach Tips:</strong>
              <ul>
                {suggestion.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="ai-suggestion-actions">
            <button
              type="button"
              className="btn-ai-discard"
              onClick={clearSuggestion}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn-ai-accept"
              onClick={handleAccept}
            >
              Accept Suggestion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
