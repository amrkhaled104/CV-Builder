import "./AtsAuditModal.css";
import type { LintResult } from "../../../utils/atsLinter";

type AtsAuditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  auditResult: LintResult;
};

export default function AtsAuditModal({
  isOpen,
  onClose,
  auditResult,
}: AtsAuditModalProps) {
  if (!isOpen) return null;

  const { score, issues, passedCount, warningCount, errorCount } = auditResult;

  const scoreBadgeClass =
    score >= 85
      ? "ats-score-badge--high"
      : score >= 65
        ? "ats-score-badge--med"
        : "ats-score-badge--low";

  return (
    <div
      className="ats-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ats-audit-title"
    >
      <div
        className="ats-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ats-modal-header">
          <div className="ats-modal-title-wrap">
            <h2 id="ats-audit-title" className="ats-modal-title">
              ATS & Guide Audit
            </h2>
            <span className={`ats-score-badge ${scoreBadgeClass}`}>
              {score} / 100
            </span>
          </div>
          <button
            type="button"
            className="ats-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="ats-modal-body">
          <div className="ats-summary-banner">
            <div>
              <strong>Based on Omar Shawky's CS Resume Guidelines:</strong>
              <div>
                {passedCount} passed &bull; {warningCount} recommendations &bull; {errorCount} critical issues.
              </div>
            </div>
            <div className="ats-quote">
              &ldquo;Don&apos;t think of a r&eacute;sum&eacute; as a way to get a job: think of it as a way to give some hiring manager an excuse to hit DELETE. At least technically, your r&eacute;sum&eacute; has to be perfect to survive.&rdquo;
              <br />
              &mdash; <strong>Joel Spolsky</strong>, Co-Founder of Stack Overflow
            </div>
          </div>

          <div className="ats-issues-list">
            {issues.map((issue) => {
              const icon =
                issue.type === "success"
                  ? "✓"
                  : issue.type === "warning"
                    ? "⚠"
                    : "✕";
              return (
                <div
                  key={issue.id}
                  className={`ats-issue-card ats-issue-card--${issue.type}`}
                >
                  <div className="ats-issue-icon" aria-hidden="true">
                    {icon}
                  </div>
                  <div className="ats-issue-content">
                    <div className="ats-issue-msg">{issue.message}</div>
                    {issue.recommendation && (
                      <div className="ats-issue-rec">{issue.recommendation}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="ats-modal-footer">
          <button
            type="button"
            className="btn-header btn-header--secondary"
            onClick={onClose}
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
}
