export const GEMINI_API_KEY_STORAGE = "cv_builder_gemini_key";

/**
 * Retrieves the stored Gemini API key from localStorage.
 */
export function getAiKey(): string {
  try {
    return (localStorage.getItem(GEMINI_API_KEY_STORAGE) || "").trim();
  } catch {
    return "";
  }
}

/**
 * Saves the Gemini API key to localStorage.
 */
export function setAiKey(key: string): void {
  try {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem(GEMINI_API_KEY_STORAGE, trimmed);
    } else {
      clearAiKey();
    }
  } catch (err) {
    console.warn("Unable to save AI API key to localStorage:", err);
  }
}

/**
 * Removes the Gemini API key from localStorage.
 */
export function clearAiKey(): void {
  try {
    localStorage.removeItem(GEMINI_API_KEY_STORAGE);
  } catch (err) {
    console.warn("Unable to clear AI API key from localStorage:", err);
  }
}

/**
 * Checks whether a valid-length Gemini API key is present in localStorage.
 */
export function hasAiKey(): boolean {
  return Boolean(getAiKey().length > 0);
}
