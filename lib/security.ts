// security.ts
import DOMPurify from "isomorphic-dompurify"
// 1. Устанавливаем библиотеку validator
// npm install validator
import validator from "validator"

/**
 * Очистка общего текстового ввода:
 * 1. Удаляем потенциально вредоносные теги с помощью DOMPurify
 * 2. Обрезаем длину до maxLength (по умолчанию 250)
 */
export function sanitizeInput(input: string, maxLength = 250): string {
  let sanitized = DOMPurify.sanitize(input)
  return sanitized.slice(0, maxLength)
}

/**
 * Очистка email-адреса:
 * 1. Санитизируем HTML-теги (редко, но на всякий случай)
 * 2. С помощью validator.isEmail проверяем, что строка является email
 * 3. Если валидный – обрезаем до 200 символов. Если нет – возвращаем пустую строку
 */
export function sanitizeEmail(email: string): string {
  // Сначала убираем теги
  const sanitized = DOMPurify.sanitize(email)
  // Проверяем формат email через validator.isEmail
  if (validator.isEmail(sanitized)) {
    return sanitized.slice(0, 200)
  }
  return ""
}

/**
 * Очистка адреса веб-сайта:
 * 1. Удаляем теги
 * 2. Убираем http:// или https:// (при необходимости)
 * 3. Обрезаем до 150 символов
 */
export function sanitizeWebsite(url: string): string {
  let sanitized = DOMPurify.sanitize(url)
  sanitized = sanitized.replace(/^(https?:\/\/)/, "")
  return sanitized.slice(0, 150)
}

/**
 * Очистка числового ввода:
 * 1. Удаляем теги
 * 2. Оставляем только цифры, точки, запятые, минус
 * 3. Обрезаем до 50 символов
 */
export function sanitizeNumber(input: string): string {
  const sanitized = DOMPurify.sanitize(input)
  return sanitized.replace(/[^0-9.,-]/g, "").slice(0, 50)
}
