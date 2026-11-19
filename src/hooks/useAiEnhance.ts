import { useState, useCallback } from "react";
import {
  callGeminiEnhancer,
  type AiEnhanceResult,
  type SectionType,
} from "../services/geminiService";
import { hasAiKey } from "../utils/aiKeyStorage";

export type UseAiEnhanceOptions = {
  onMissingKey?: () => void;
};

export function useAiEnhance(options?: UseAiEnhanceOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<AiEnhanceResult | null>(null);

  const enhance = useCallback(
    async (sectionType: SectionType, rawContent: string, context?: string) => {
      setError(null);

      if (!hasAiKey()) {
        if (options?.onMissingKey) {
          options.onMissingKey();
        } else {
          setError(
            "No Gemini API key set. Please click the AI Key button in the header to enter your key.",
          );
        }
        return;
      }

      const trimmed = rawContent.trim();
      if (!trimmed) {
        setError("Please enter some text or bullets before asking AI to enhance.");
        return;
      }

      setIsLoading(true);
      try {
        const result = await callGeminiEnhancer({
          sectionType,
          rawContent: trimmed,
          context,
        });
        setSuggestion(result);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during AI enhancement.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [options],
  );

  const clearSuggestion = useCallback(() => {
    setSuggestion(null);
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    suggestion,
    enhance,
    clearSuggestion,
  };
}
