import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { format, isValid } from "date-fns"
import type { InvoiceFormData } from "@/types/invoice"
import { currencies } from "./currencies"
import { calculateInvoiceTotals, calculateItemTotal, toNumber, toDecimal } from "@/lib/decimal-utils"

// Import base64-encoded fonts
import { notoSansRegularBase64 } from "@/utils/fonts/notoSansRegular"
import { notoSansBoldBase64 } from "@/utils/fonts/notoSansBold"

/**
 * Cleans base64 string by removing the data URI prefix
 */
const cleanBase64 = (base64String: string) => {
  return base64String.startsWith("data:font/ttf;base64,")
    ? base64String.replace("data:font/ttf;base64,", "")
    : base64String
}

/**
 * Removes protocol from website URL for clean PDF display
 */
const formatWebsiteUrl = (url: string): string => {
  if (!url) return url
  return url.replace(/^(https?:\/\/)/, "")
}

/**
 * Generates a PDF invoice from the provided form data
 * @param data The invoice form data containing all information for the invoice
 * @returns A Promise resolving to the jsPDF document object or null if generation fails
 */
export async function generateInvoicePDF(data: InvoiceFormData): Promise<jsPDF | null> {
  try {
    // Create PDF with UTF-8 support
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      floatPrecision: 16,
    })

    // Add fonts to the PDF
    try {
      const regularFontData = cleanBase64(notoSansRegularBase64)
      const boldFontData = cleanBase64(notoSansBoldBase64)

      doc.addFileToVFS("NotoSans-Regular.ttf", regularFontData)
      doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal", "Identity-H")
      doc.addFileToVFS("NotoSans-Bold.ttf", boldFontData)
      doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold", "Identity-H")

      // 🚀 Set NotoSans as the default font immediately after loading
      doc.setFont("NotoSans", "normal")
      doc.setFontSize(10)
      doc.setLanguage("en-US")
    } catch (fontError) {
      throw new Error(`Failed to load fonts: ${fontError instanceof Error ? fontError.message : String(fontError)}`)
    }

    // Define colors matching website theme
    const primaryColor: [number, number, number] = [37, 99, 235] // blue-600 in RGB
    const textColor: [number, number, number] = [31, 41, 55] // gray-800 in RGB
    const mutedColor: [number, number, number] = [107, 114, 128] // gray-500 in RGB

    // Header with invoice number
    const pageWidth = doc.internal.pageSize.width
    const margin = 15
    const contentWidth = pageWidth - 2 * margin
    const headerHeight = 20
    const headerY = 10
    const tableWidth = contentWidth

    doc.setTextColor(...textColor)
    doc.setFontSize(24)
    doc.setFont("NotoSans", "bold")
    doc.text(`Invoice ${data.invoice?.number || ""}`, margin, headerY + headerHeight / 2, {
      align: "left",
      baseline: "middle",
    })

    // Reset text color and font
    doc.setTextColor(...textColor)
    doc.setFont("NotoSans", "normal")
    doc.setFontSize(10)

    // Get currency symbol
    const currentCurrency = currencies.find((c) => c.code === data.invoice?.currency)
    const currencySymbol = currentCurrency?.symbol || data.invoice?.currency || ""

    // Update initial position for invoice details
    const detailsStartY = headerY + headerHeight + 10

    // Helper function to safely format dates
    const formatSafeDate = (date: any): string => {
      const safeDate = date ? new Date(date) : new Date()
      return isValid(safeDate) ? format(safeDate, "dd.MM.yyyy") : format(new Date(), "dd.MM.yyyy")
    }

    // Invoice Details
    const invoiceDetails = [
      ["Issue Date", formatSafeDate(data.invoice?.issueDate)],
      ["Due Date", formatSafeDate(data.invoice?.dueDate)],
      data.invoice?.referenceNumber && ["Reference Number", data.invoice.referenceNumber],
      data.invoice?.customerReferenceNumber && ["Customer Reference", data.invoice.customerReferenceNumber],
      data.invoice?.orderNumber && ["Order Number", data.invoice.orderNumber],
    ].filter(Boolean) as string[][]

    invoiceDetails.forEach((detail, index) => {
      doc.text(detail[0], 15, detailsStartY + index * 6)
      doc.text(detail[1], 70, detailsStartY + index * 6)
    })

    // Company Information
    const startY = detailsStartY + invoiceDetails.length * 6 + 5

    // Helper function to wrap and print text with proper word boundaries
    function printWrappedText(doc: any, text: string, x: number, y: number, maxWidth: number, options: any = {}) {
      try {
        const words = text.split(/\s+/)
        const lines = []
        let currentLine = ""

        for (const word of words) {
          if (currentLine.length + word.length + 1 > 33) {
            lines.push(currentLine.trim())
            currentLine = word
          } else {
            currentLine += (currentLine ? " " : "") + word
          }
        }
        if (currentLine) {
          lines.push(currentLine.trim())
        }

        lines.forEach((line, index) => {
          try {
            const xPos = options.align === "right" ? x - doc.getStringUnitWidth(line) * doc.getFontSize() : x
            doc.text(line, xPos, y + index * 5)
                  } catch (textError) {
            // Fallback to a simple text rendering without alignment
            doc.text(line, x, y + index * 5)
          }
        })

        return lines.length
      } catch (wrapError) {
        return y // Return the original position
      }
    }

    // Seller Information with aligned text
    doc.setFontSize(12)
    doc.setTextColor(...primaryColor)
    doc.setFont("NotoSans", "bold")
    doc.text("From", 15, startY)
    doc.setTextColor(...textColor)
    doc.setFont("NotoSans", "normal")
    doc.setFontSize(10)

    let currentY = startY + 7
    const leftColumnWidth = 80

    // Print seller info with aligned text
    const sellerInfo = [
      data.seller?.companyName,
      data.seller?.address,
      data.seller?.companyId && `Company ID: ${data.seller.companyId}`,
      data.seller?.vatId && `VAT ID: ${data.seller.vatId}`,
      data.seller?.email && `Email: ${data.seller.email}`,
      data.seller?.website && `Website: ${formatWebsiteUrl(data.seller.website)}`,
    ].filter(Boolean)

    sellerInfo.forEach((info) => {
      if (info) {
        const lines = printWrappedText(doc, info, 15, currentY, leftColumnWidth)
        currentY += lines * 5 + 2 // Added small gap between items
      }
    })

    // Buyer Information with aligned text
    doc.setFontSize(12)
    doc.setTextColor(...primaryColor)
    doc.setFont("NotoSans", "bold")
    doc.text("To", 110, startY)
    doc.setTextColor(...textColor)
    doc.setFont("NotoSans", "normal")
    doc.setFontSize(10)

    let buyerY = startY + 7
    const rightColumnWidth = 80

    // Print buyer info with aligned text
    const buyerInfo = [
      data.buyer?.companyName,
      data.buyer?.address,
      data.buyer?.companyId && `Company ID: ${data.buyer.companyId}`,
      data.buyer?.vatId && `VAT ID: ${data.buyer.vatId}`,
      data.buyer?.email && `Email: ${data.buyer.email}`,
      data.buyer?.website && `Website: ${formatWebsiteUrl(data.buyer.website)}`,
    ].filter(Boolean)

    buyerInfo.forEach((info) => {
      if (info) {
        const lines = printWrappedText(doc, info, 110, buyerY, rightColumnWidth)
        buyerY += lines * 5 + 2 // Added small gap between items
      }
    })

    // Use the maximum Y position from both columns
    const maxY = Math.max(currentY, buyerY)

    // Payment Information
    let paymentY = maxY + 10
    if (data.payment?.method) {
      doc.setFontSize(12)
      doc.setTextColor(...primaryColor)
      doc.setFont("NotoSans", "bold")
      doc.text("Payment Information", 15, paymentY)
      doc.setTextColor(...textColor)
      doc.setFont("NotoSans", "normal")
      doc.setFontSize(10)
      paymentY += 7

      const getPaymentMethodLabel = (method: string) => {
        switch (method) {
          case "cash":
            return "Cash"
          case "bank_transfer":
            return "Bank Transfer"
          case "paypal":
            return "PayPal"
          case "credit_card":
            return "Credit Card"
          case "wise":
            return "Wise"
          default:
            return "Unknown"
        }
      }

      const paymentInfo = [
        `Payment Method: ${getPaymentMethodLabel(data.payment.method)}`,
        data.payment.bankAccount && `Bank Account: ${data.payment.bankAccount}`,
        data.payment.iban && `IBAN: ${data.payment.iban}`,
        data.payment.swift && `SWIFT/BIC: ${data.payment.swift}`,
      ].filter(Boolean) as string[] // Type hint
      
      paymentInfo.forEach((info) => {
        doc.text(info, 15, paymentY)
        paymentY += 6
      })
    }

    // Items Table
    const tableStartY = paymentY + 10

    // Add spacing between currency symbols and numbers - use decimal utils for precision
    const formatCurrency = (amount: number) => {
      return `${currencySymbol} ${toDecimal(amount).toFixed(2)}`
    }

    try {
      autoTable(doc, {
        startY: tableStartY,
        head: [["Description", "Quantity", "Unit Price", "VAT %", "Net Price", "VAT Amount", "Total"]],
        body: (data.items || []).map((item) => {
          // Use decimal utilities for precise calculations
          const { netPrice, vatAmount, totalPrice } = calculateItemTotal(
            item.price || 0,
            item.quantity || 0,
            item.vatRate || 0
          )
          
          return [
            item.name || "",
            (item.quantity || 0).toString(),
            formatCurrency(item.price || 0),
            `${item.vatRate || 0}%`,
            formatCurrency(toNumber(netPrice)),
            formatCurrency(toNumber(vatAmount)),
            formatCurrency(toNumber(totalPrice)),
          ]
        }),
        styles: {
          font: "NotoSans",
          fontStyle: "normal",
          fontSize: 9,
          textColor: textColor,
          cellWidth: "wrap",
          cellPadding: 3,
          overflow: "linebreak",
          lineWidth: 0.1,
        },
        columnStyles: {
          0: { cellWidth: 49, overflow: "linebreak" }, // Description column
          1: { cellWidth: 13, overflow: "linebreak" }, // Quantity column
          2: { cellWidth: 25, overflow: "linebreak" }, // Unit Price column
          3: { cellWidth: 13, overflow: "linebreak" }, // VAT Rate column
          4: { cellWidth: 25, overflow: "linebreak" }, // Net Price column
          5: { cellWidth: 25, overflow: "linebreak" }, // VAT Amount column
          6: { cellWidth: 34 - 1, overflow: "linebreak" }, // Total column - slightly reduced width
        },
        headStyles: {
          fillColor: primaryColor,
          textColor: "#ffffff",
          fontSize: 10,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: "#f8fafc",
        },
        margin: { left: 15, right: 15, top: 15, bottom: 15 }, // Adjusted right margin
        tableWidth: tableWidth - 1, // Slightly reduced table width to align with header
        didDrawPage: (data) => {
          // Add header and footer on each page
          doc.setFontSize(8)
          doc.setTextColor(...mutedColor)
          doc.text("Generated by Invoice.wiki", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, {
            align: "center",
          })
          doc.text(
            `${data.pageNumber}/${doc.getNumberOfPages()}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 5,
            { align: "center" },
          )          
        },
      })
    } catch (tableError) {
      // Table creation failed, continue without table
    }

    // Calculate totals using precise decimal arithmetic
    const { netTotal: netTotalDecimal, vatTotal: vatTotalDecimal, grandTotal: grandTotalDecimal } = calculateInvoiceTotals(data.items || [])
    const netTotal = toNumber(netTotalDecimal)
    const vatTotal = toNumber(vatTotalDecimal)
    const total = toNumber(grandTotalDecimal)

    // Add more space before totals
    // TypeScript doesn't know about lastAutoTable property added by autoTable plugin
    const finalY = 'lastAutoTable' in doc ? (doc as any).lastAutoTable.finalY + 10 : 200

    // Get the right edge of the table for alignment
    const rightEdge = pageWidth - 16 // Adjusted to match the table right margin

    // Notes (if provided)
    if (data.notes) {
      doc.setFontSize(12)
      doc.setTextColor(...primaryColor)
      doc.setFont("NotoSans", "bold")
      doc.text("Notes", 15, finalY)
      doc.setTextColor(...textColor)
      doc.setFont("NotoSans", "normal")
      doc.setFontSize(10)

      const notesWidth = 100 // Adjust as needed
      const notesLines = doc.splitTextToSize(data.notes, notesWidth)
      doc.text(notesLines, 15, finalY + 7)
    }

    // Summary aligned with right edge
    doc.setFontSize(10)
    doc.setTextColor(...mutedColor)
    doc.text("Net Total", rightEdge - 70, finalY)
    doc.text("VAT Total", rightEdge - 70, finalY + 7)
    doc.setTextColor(...primaryColor)
    doc.setFontSize(12)
    doc.setFont("NotoSans", "bold")
    doc.text("Total Due", rightEdge - 70, finalY + 14)

    // Amounts
    doc.setTextColor(...textColor)
    doc.setFontSize(10)
    doc.setFont("NotoSans", "normal")
    doc.text(formatCurrency(netTotal), rightEdge, finalY, { align: "right" })
    doc.text(formatCurrency(vatTotal), rightEdge, finalY + 7, { align: "right" })
    doc.setFontSize(12)
    doc.setTextColor(...primaryColor)
    doc.setFont("NotoSans", "bold")

    if (data.isPaid) {
      doc.text("PAID!", rightEdge, finalY + 14, { align: "right" })
    } else {
      doc.text(formatCurrency(total), rightEdge, finalY + 14, { align: "right" })
    }

    // Draw line under total
    doc.setDrawColor(...primaryColor)
    doc.setLineWidth(0.5)
    doc.line(rightEdge - 70, finalY + 18, rightEdge, finalY + 18)

    // Footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(8)
    doc.setTextColor(...mutedColor)
    doc.setFont("NotoSans", "normal")
    doc.text("Generated by Invoice.wiki", doc.internal.pageSize.width / 2, pageHeight - 10, { align: "center" })

    // Page number
    doc.text(
      `${doc.getNumberOfPages()}/${doc.getNumberOfPages()}`,
      doc.internal.pageSize.width / 2, 
      pageHeight - 5, 
      { align: "center" }
    )

    const blob = new Blob([doc.output("blob")], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `invoice-${data.invoice?.number || ""}.pdf`
    link.target = "_blank" // Add target blank for mobile browsers
    link.rel = "noopener noreferrer" // Security best practice
    // Try to open PDF in new tab for mobile browsers
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(url, "_blank")
    } else {
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    URL.revokeObjectURL(url)

    return doc
  } catch (error) {
    return null
  }
}

