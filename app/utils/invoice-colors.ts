export interface InvoiceColor {
  id: string
  name: string
  hex: string
  rgb: [number, number, number]
  headerText: string // цвет текста на цветном фоне (белый или черный)
}

export const invoiceColors: InvoiceColor[] = [
  {
    id: 'blue',
    name: 'Blue',
    hex: '#2563eb',
    rgb: [37, 99, 235],
    headerText: '#ffffff'
  },
  {
    id: 'green',
    name: 'Green', 
    hex: '#16a34a',
    rgb: [22, 163, 74],
    headerText: '#ffffff'
  },
  {
    id: 'red',
    name: 'Red',
    hex: '#dc2626', 
    rgb: [220, 38, 38],
    headerText: '#ffffff'
  },
  {
    id: 'purple',
    name: 'Purple',
    hex: '#9333ea',
    rgb: [147, 51, 234], 
    headerText: '#ffffff'
  },
  {
    id: 'orange',
    name: 'Orange',
    hex: '#ea580c',
    rgb: [234, 88, 12],
    headerText: '#ffffff'
  },
  {
    id: 'pink',
    name: 'Pink',
    hex: '#e11d48',
    rgb: [225, 29, 72],
    headerText: '#ffffff'
  },
  {
    id: 'teal',
    name: 'Teal',
    hex: '#0d9488', 
    rgb: [13, 148, 136],
    headerText: '#ffffff'
  },
  {
    id: 'yellow',
    name: 'Yellow',
    hex: '#ca8a04',
    rgb: [202, 138, 4],
    headerText: '#ffffff'
  },
  {
    id: 'slate',
    name: 'Slate',
    hex: '#475569',
    rgb: [71, 85, 105], 
    headerText: '#ffffff'
  },
  {
    id: 'black',
    name: 'Black',
    hex: '#1f2937',
    rgb: [31, 41, 55],
    headerText: '#ffffff'
  }
]

export const getInvoiceColorById = (id: string): InvoiceColor => {
  return invoiceColors.find(color => color.id === id) || invoiceColors[0] // default to blue
} 