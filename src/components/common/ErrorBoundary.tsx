import React, { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleResetDraft = (): void => {
    try {
      localStorage.removeItem("cv_builder_draft");
    } catch {
      // Ignore storage errors
    }
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backgroundColor: "var(--bg-primary, #0f172a)",
            color: "var(--text-primary, #f8fafc)",
            fontFamily: "var(--font-ui, system-ui, sans-serif)",
          }}
        >
          <div
            style={{
              maxWidth: "520px",
              width: "100%",
              padding: "32px",
              backgroundColor: "var(--bg-secondary, #1e293b)",
              borderRadius: "12px",
              border: "1px solid var(--border-color, #334155)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                marginBottom: "12px",
                color: "var(--danger-color, #ef4444)",
              }}
            >
              Something went wrong
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                color: "var(--text-secondary, #94a3b8)",
                marginBottom: "20px",
              }}
            >
              An unexpected error occurred while rendering the application. You can
              try reloading, or reset your local draft if the saved state is
              corrupted.
            </p>
            {this.state.error && (
              <pre
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  color: "#f87171",
                  fontSize: "0.8rem",
                  textAlign: "left",
                  overflowX: "auto",
                  marginBottom: "24px",
                }}
              >
                {this.state.error.message}
              </pre>
            )}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  backgroundColor: "var(--accent-primary, #3b82f6)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Reload Application
              </button>
              <button
                type="button"
                onClick={this.handleResetDraft}
                style={{
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  backgroundColor: "transparent",
                  color: "var(--danger-color, #ef4444)",
                  border: "1px solid var(--danger-color, #ef4444)",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Reset Local Draft & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
