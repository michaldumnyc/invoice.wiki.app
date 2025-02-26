import DOMPurify from "isomorphic-dompurify"

export function sanitizeInput(input: string, maxLength = 250): string {
  let sanitized = DOMPurify.sanitize(input)
  sanitized = sanitized.slice(0, maxLength)
  return sanitized
}

export function sanitizeEmail(email: string): string {
  const sanitized = DOMPurify.sanitize(email)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(sanitized) ? sanitized.slice(0, 200) : ""
}

export function sanitizeWebsite(url: string): string {
  let sanitized = DOMPurify.sanitize(url)
  sanitized = sanitized.replace(/^(https?:\/\/)/, "")
  sanitized = sanitized.slice(0, 150)
  return sanitized
}

export function sanitizeNumber(input: string): string {
  const sanitized = DOMPurify.sanitize(input)
  return sanitized.replace(/[^0-9.,-]/g, "").slice(0, 50)
}

