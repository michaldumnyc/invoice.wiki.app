import DOMPurify from "isomorphic-dompurify"

// Strip all HTML tags — plain text only
const PURIFY_CONFIG = { ALLOWED_TAGS: [] as string[], ALLOWED_ATTR: [] as string[] }

/**
 * Sanitize general text input:
 * 1. Strip all HTML tags
 * 2. Trim length to maxLength (default 250)
 */
export function sanitizeInput(input: string, maxLength = 250): string {
  const sanitized = DOMPurify.sanitize(input, PURIFY_CONFIG)
  return sanitized.slice(0, maxLength)
}

/**
 * Sanitize email address:
 * 1. Strip all HTML tags
 * 2. Allow partial email input by not validating format
 * 3. Trim to 200 characters
 */
export function sanitizeEmail(email: string): string {
  const sanitized = DOMPurify.sanitize(email, PURIFY_CONFIG)
  return sanitized.replace(/[^a-zA-Z0-9@._+-]/g, "").slice(0, 200)
}

/**
 * Sanitize website URL:
 * 1. Strip all HTML tags
 * 2. Block dangerous schemes (javascript:, data:, vbscript:)
 * 3. Remove http:// or https://
 * 4. Trim to 150 characters
 */
export function sanitizeWebsite(url: string): string {
  let sanitized = DOMPurify.sanitize(url, PURIFY_CONFIG)
  // Block dangerous URL schemes
  if (/^(javascript|data|vbscript):/i.test(sanitized)) {
    return ""
  }
  sanitized = sanitized.replace(/^(https?:\/\/)/, "")
  return sanitized.slice(0, 150)
}

/**
 * Sanitize numeric input:
 * 1. Strip all HTML tags
 * 2. Keep only digits, dots, commas, and minus signs
 * 3. Trim to 50 characters
 */
export function sanitizeNumber(input: string): string {
  const sanitized = DOMPurify.sanitize(input, PURIFY_CONFIG)
  return sanitized.replace(/[^0-9.,-]/g, "").slice(0, 50)
}
