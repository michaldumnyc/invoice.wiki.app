import DOMPurify from "isomorphic-dompurify"

/**
 * Sanitize general text input:
 * 1. Remove potentially malicious tags using DOMPurify
 * 2. Trim length to maxLength (default 250)
 */
export function sanitizeInput(input: string, maxLength = 250): string {
  let sanitized = DOMPurify.sanitize(input)
  return sanitized.slice(0, maxLength)
}

/**
 * Sanitize email address:
 * 1. Sanitize HTML tags (rarely needed, but just in case)
 * 2. Allow partial email input by not validating format
 * 3. Trim to 200 characters
 */
export function sanitizeEmail(email: string): string {
  // First remove tags
  const sanitized = DOMPurify.sanitize(email)
  // Remove any potentially harmful characters but keep basic email characters
  return sanitized.replace(/[^a-zA-Z0-9@._+-]/g, '').slice(0, 200)
}

/**
 * Sanitize website URL:
 * 1. Remove tags
 * 2. Remove http:// or https:// (if needed)
 * 3. Trim to 150 characters
 */
export function sanitizeWebsite(url: string): string {
  let sanitized = DOMPurify.sanitize(url)
  sanitized = sanitized.replace(/^(https?:\/\/)/, "")
  return sanitized.slice(0, 150)
}

/**
 * Sanitize numeric input:
 * 1. Remove tags
 * 2. Keep only digits, dots, commas, and minus signs
 * 3. Trim to 50 characters
 */
export function sanitizeNumber(input: string): string {
  const sanitized = DOMPurify.sanitize(input)
  return sanitized.replace(/[^0-9.,-]/g, "").slice(0, 50)
}
