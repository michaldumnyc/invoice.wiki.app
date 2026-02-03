import Decimal from "decimal.js"

// Настройки Decimal.js для денежных расчетов
Decimal.set({
  precision: 28, // Высокая точность
  rounding: 4, // ROUND_HALF_UP (математическое округление)
  toExpNeg: -20, // Не использовать экспоненциальную запись для малых чисел
  toExpPos: 20, // Не использовать экспоненциальную запись для больших чисел
})

/**
 * Безопасно конвертирует значение в Decimal
 */
export function toDecimal(value: string | number | undefined | null): Decimal {
  if (value === undefined || value === null || value === "") {
    return new Decimal(0)
  }

  // Если это строка, убираем все кроме цифр, точки и минуса
  if (typeof value === "string") {
    const cleanValue = value.replace(/[^0-9.-]/g, "")
    return cleanValue ? new Decimal(cleanValue) : new Decimal(0)
  }

  return new Decimal(value)
}

/**
 * Рассчитывает чистую стоимость (цена * количество)
 */
export function calculateNetPrice(price: string | number, quantity: string | number): Decimal {
  return toDecimal(price).mul(toDecimal(quantity))
}

/**
 * Рассчитывает НДС от суммы
 */
export function calculateVAT(netAmount: Decimal, vatRate: string | number): Decimal {
  return netAmount.mul(toDecimal(vatRate)).div(100)
}

/**
 * Рассчитывает общую стоимость позиции (с НДС)
 */
export function calculateItemTotal(
  price: string | number,
  quantity: string | number,
  vatRate: string | number
): {
  netPrice: Decimal
  vatAmount: Decimal
  totalPrice: Decimal
} {
  const netPrice = calculateNetPrice(price, quantity)
  const vatAmount = calculateVAT(netPrice, vatRate)
  const totalPrice = netPrice.add(vatAmount)

  return {
    netPrice,
    vatAmount,
    totalPrice,
  }
}

/**
 * Рассчитывает итоги по всему инвойсу
 */
export function calculateInvoiceTotals(
  items: Array<{
    price: string | number
    quantity: string | number
    vatRate: string | number
  }>
): {
  netTotal: Decimal
  vatTotal: Decimal
  grandTotal: Decimal
} {
  let netTotal = new Decimal(0)
  let vatTotal = new Decimal(0)

  items.forEach((item) => {
    const { netPrice, vatAmount } = calculateItemTotal(item.price, item.quantity, item.vatRate)

    netTotal = netTotal.add(netPrice)
    vatTotal = vatTotal.add(vatAmount)
  })

  return {
    netTotal,
    vatTotal,
    grandTotal: netTotal.add(vatTotal),
  }
}

/**
 * Форматирует Decimal в число для отображения
 */
export function toNumber(decimal: Decimal): number {
  return decimal.toNumber()
}

/**
 * Форматирует Decimal в строку с фиксированным количеством знаков
 */
export function toFixed(decimal: Decimal, decimalPlaces: number = 2): string {
  return decimal.toFixed(decimalPlaces)
}
