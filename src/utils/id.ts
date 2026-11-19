/**
 * Safe ID generation helper.
 * Uses crypto.randomUUID() when available in secure contexts,
 * and falls back safely on non-HTTPS LAN origins (e.g. mobile testing on 192.168.x.x).
 */
export function generateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    try {
      return crypto.randomUUID();
    } catch {
      // Fall through to fallback if randomUUID fails
    }
  }

  // Fallback: timestamp + random alphanumeric string
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `id-${timestamp}-${randomPart}`;
}
