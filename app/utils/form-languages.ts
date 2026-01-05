export interface FormLanguage {
  id: string
  name: string
  flag: string
  form: {
    // Sections
    sellerInformation: string
    buyerInformation: string
    invoiceDetails: string
    paymentInformation: string
    invoiceColorSelection: string
    invoiceLanguageSelection: string
    taxTypeSelection: string
    notes: string
    paymentStatus: string
    items: string
    
    // Field labels
    companyName: string
    address: string
    companyId: string
    vatId: string
    email: string
    website: string
    invoiceNumber: string
    issueDate: string
    dueDate: string
    currency: string
    referenceNumber: string
    customerReferenceNumber: string
    orderNumber: string
    paymentMethod: string
    bankAccount: string
    iban: string
    swiftBic: string
    notesField: string
    markAsPaid: string
    itemName: string
    quantity: string
    price: string
    taxRate: string
    
    // Tax types
    taxTypes: {
      vat: string
      gst: string
      sales_tax: string
      none: string
    }
    
    // Tax options
    showTax: string
    hideTax: string
    reverseCharge: string
    reverseChargeDescription: string
    
    // Placeholders
    placeholders: {
      companyName: string
      address: string
      companyId: string
      vatId: string
      email: string
      website: string
      invoiceNumber: string
      referenceNumber: string
      customerReferenceNumber: string
      orderNumber: string
      bankAccount: string
      iban: string
      swiftBic: string
      notes: string
      itemName: string
    }
    
    // Buttons and actions
    hide: string
    show: string
    remove: string
    addItem: string
    generateInvoice: string
    termsAndConditions: string
    
    // Descriptions
    colorDescription: string
    languageDescription: string
    taxTypeDescription: string
    notesDescription: string
    
    // Payment methods
    paymentMethods: {
      bankTransfer: string
      cash: string
      paypal: string
      creditCard: string
      wise: string
    }
  }
}

export const formLanguages: FormLanguage[] = [
  {
    id: 'en',
    name: 'English',
    flag: '🇺🇸',
    form: {
      sellerInformation: 'Seller Information',
      buyerInformation: 'Buyer Information',
      invoiceDetails: 'Invoice Details',
      paymentInformation: 'Payment Information',
      invoiceColorSelection: 'Invoice Accent Color',
      invoiceLanguageSelection: 'Invoice Language',
      taxTypeSelection: 'Tax Type',
      notes: 'Notes',
      paymentStatus: 'Payment Status',
      items: 'Items',
      
      companyName: 'Company Name',
      address: 'Address',
      companyId: 'Company ID',
      vatId: 'VAT ID',
      email: 'Email',
      website: 'Website',
      invoiceNumber: 'Invoice Number',
      issueDate: 'Issue Date',
      dueDate: 'Due Date',
      currency: 'Currency',
      referenceNumber: 'Reference Number',
      customerReferenceNumber: 'Customer Reference Number',
      orderNumber: 'Order Number',
      paymentMethod: 'Payment Method',
      bankAccount: 'Bank Account',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Notes (max 210 characters)',
      markAsPaid: 'Mark as Paid',
      itemName: 'Item Name',
      quantity: 'Quantity',
      price: 'Price',
      taxRate: 'Tax Rate (%)',
      
      taxTypes: {
        vat: 'VAT (Value Added Tax)',
        gst: 'GST (Goods & Services Tax)',
        sales_tax: 'Sales Tax',
        none: 'No Tax'
      },
      
      showTax: 'Show tax columns',
      hideTax: 'Hide tax in invoice',
      reverseCharge: 'Reverse Charge (B2B)',
      reverseChargeDescription: 'VAT to be paid by the buyer (EU B2B services)',
      
      placeholders: {
        companyName: 'Your Company Ltd.',
        address: '123 Business Street, City, Country',
        companyId: '12345678',
        vatId: 'GB123456789',
        email: 'contact@company.com',
        website: 'example.com',
        invoiceNumber: 'INV-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'ORD-001',
        bankAccount: '1234567890',
        iban: 'GB29 NWBK 6016 1331 9268 19',
        swiftBic: 'NWBKGB2L',
        notes: 'Payment terms: Net 30 days. Thank you for your business!',
        itemName: 'Product or service description'
      },
      
      hide: 'Hide',
      show: 'Show',
      remove: 'Remove',
      addItem: 'Add Item',
      generateInvoice: 'Generate Invoice',
      termsAndConditions: 'Terms and Conditions',
      
      colorDescription: 'Choose the accent color for your invoice headers and highlights',
      languageDescription: 'Choose the language for your invoice content and labels',
      taxTypeDescription: 'Select the tax system used in your region',
      notesDescription: 'Add payment terms, thank you notes, or additional information',
      
      paymentMethods: {
        bankTransfer: 'Bank Transfer',
        cash: 'Cash',
        paypal: 'PayPal',
        creditCard: 'Credit Card',
        wise: 'Wise'
      }
    }
  },
  {
    id: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    form: {
      sellerInformation: 'Verkäufer-Informationen',
      buyerInformation: 'Käufer-Informationen',
      invoiceDetails: 'Rechnungsdetails',
      paymentInformation: 'Zahlungsinformationen',
      invoiceColorSelection: 'Rechnungsfarbe',
      invoiceLanguageSelection: 'Rechnungssprache',
      taxTypeSelection: 'Steuerart',
      notes: 'Notizen',
      paymentStatus: 'Zahlungsstatus',
      items: 'Positionen',
      
      companyName: 'Firmenname',
      address: 'Adresse',
      companyId: 'Firmen-ID',
      vatId: 'USt-IdNr.',
      email: 'E-Mail',
      website: 'Website',
      invoiceNumber: 'Rechnungsnummer',
      issueDate: 'Rechnungsdatum',
      dueDate: 'Fälligkeitsdatum',
      currency: 'Währung',
      referenceNumber: 'Referenznummer',
      customerReferenceNumber: 'Kundenreferenz',
      orderNumber: 'Bestellnummer',
      paymentMethod: 'Zahlungsart',
      bankAccount: 'Bankkonto',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Notizen (max. 210 Zeichen)',
      markAsPaid: 'Als bezahlt markieren',
      itemName: 'Artikelname',
      quantity: 'Menge',
      price: 'Preis',
      taxRate: 'Steuersatz (%)',
      
      taxTypes: {
        vat: 'MwSt (Mehrwertsteuer)',
        gst: 'GST (Waren- und Dienstleistungssteuer)',
        sales_tax: 'Umsatzsteuer',
        none: 'Keine Steuer'
      },
      
      showTax: 'Steuerspalten anzeigen',
      hideTax: 'Steuer in Rechnung ausblenden',
      reverseCharge: 'Reverse Charge (B2B)',
      reverseChargeDescription: 'Steuerschuldnerschaft des Leistungsempfängers',
      
      placeholders: {
        companyName: 'Ihre Firma GmbH',
        address: 'Geschäftsstraße 123, Stadt, Land',
        companyId: '12345678',
        vatId: 'DE123456789',
        email: 'kontakt@firma.de',
        website: 'beispiel.de',
        invoiceNumber: 'RG-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'BEST-001',
        bankAccount: '1234567890',
        iban: 'DE89 3704 0044 0532 0130 00',
        swiftBic: 'COBADEFFXXX',
        notes: 'Zahlungsbedingungen: Netto 30 Tage. Vielen Dank für Ihr Vertrauen!',
        itemName: 'Produkt- oder Dienstleistungsbeschreibung'
      },
      
      hide: 'Ausblenden',
      show: 'Anzeigen',
      remove: 'Entfernen',
      addItem: 'Position hinzufügen',
      generateInvoice: 'Rechnung erstellen',
      termsAndConditions: 'Geschäftsbedingungen',
      
      colorDescription: 'Wählen Sie die Akzentfarbe für Ihre Rechnungsüberschriften',
      languageDescription: 'Wählen Sie die Sprache für Ihre Rechnungsinhalte',
      taxTypeDescription: 'Wählen Sie das Steuersystem Ihrer Region',
      notesDescription: 'Zahlungsbedingungen, Dankesnotizen oder zusätzliche Informationen hinzufügen',
      
      paymentMethods: {
        bankTransfer: 'Banküberweisung',
        cash: 'Bargeld',
        paypal: 'PayPal',
        creditCard: 'Kreditkarte',
        wise: 'Wise'
      }
    }
  },
  {
    id: 'cs',
    name: 'Čeština',
    flag: '🇨🇿',
    form: {
      sellerInformation: 'Informace o prodávajícím',
      buyerInformation: 'Informace o kupujícím',
      invoiceDetails: 'Detaily faktury',
      paymentInformation: 'Platební informace',
      invoiceColorSelection: 'Barva faktury',
      invoiceLanguageSelection: 'Jazyk faktury',
      taxTypeSelection: 'Typ daně',
      notes: 'Poznámky',
      paymentStatus: 'Stav platby',
      items: 'Položky',
      
      companyName: 'Název firmy',
      address: 'Adresa',
      companyId: 'IČO',
      vatId: 'DIČ',
      email: 'E-mail',
      website: 'Webová stránka',
      invoiceNumber: 'Číslo faktury',
      issueDate: 'Datum vystavení',
      dueDate: 'Datum splatnosti',
      currency: 'Měna',
      referenceNumber: 'Referenční číslo',
      customerReferenceNumber: 'Reference zákazníka',
      orderNumber: 'Číslo objednávky',
      paymentMethod: 'Způsob platby',
      bankAccount: 'Bankovní účet',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Poznámky (max. 210 znaků)',
      markAsPaid: 'Označit jako zaplaceno',
      itemName: 'Název položky',
      quantity: 'Množství',
      price: 'Cena',
      taxRate: 'Sazba daně (%)',
      
      taxTypes: {
        vat: 'DPH (Daň z přidané hodnoty)',
        gst: 'GST (Daň ze zboží a služeb)',
        sales_tax: 'Prodejní daň',
        none: 'Bez daně'
      },
      
      showTax: 'Zobrazit daňové sloupce',
      hideTax: 'Skrýt daň ve faktuře',
      reverseCharge: 'Reverse Charge (B2B)',
      reverseChargeDescription: 'Daň odvede příjemce plnění',
      
      placeholders: {
        companyName: 'Vaše firma s.r.o.',
        address: 'Obchodní 123, Město, Země',
        companyId: '12345678',
        vatId: 'CZ12345678',
        email: 'kontakt@firma.cz',
        website: 'priklad.cz',
        invoiceNumber: 'FA-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'OBJ-001',
        bankAccount: '1234567890',
        iban: 'CZ65 0800 0000 1920 0014 5399',
        swiftBic: 'GIBACZPX',
        notes: 'Platební podmínky: Splatnost 30 dní. Děkujeme za důvěru!',
        itemName: 'Popis produktu nebo služby'
      },
      
      hide: 'Skrýt',
      show: 'Zobrazit',
      remove: 'Odebrat',
      addItem: 'Přidat položku',
      generateInvoice: 'Vytvořit fakturu',
      termsAndConditions: 'Obchodní podmínky',
      
      colorDescription: 'Vyberte barevný akcent pro záhlaví faktury',
      languageDescription: 'Vyberte jazyk pro obsah faktury',
      taxTypeDescription: 'Vyberte daňový systém vaší oblasti',
      notesDescription: 'Přidejte platební podmínky, poděkování nebo další informace',
      
      paymentMethods: {
        bankTransfer: 'Bankovní převod',
        cash: 'Hotovost',
        paypal: 'PayPal',
        creditCard: 'Platební karta',
        wise: 'Wise'
      }
    }
  },
  {
    id: 'pl',
    name: 'Polski',
    flag: '🇵🇱',
    form: {
      sellerInformation: 'Informacje o sprzedawcy',
      buyerInformation: 'Informacje o kupującym',
      invoiceDetails: 'Szczegóły faktury',
      paymentInformation: 'Informacje o płatności',
      invoiceColorSelection: 'Kolor faktury',
      invoiceLanguageSelection: 'Język faktury',
      taxTypeSelection: 'Typ podatku',
      notes: 'Uwagi',
      paymentStatus: 'Status płatności',
      items: 'Pozycje',
      
      companyName: 'Nazwa firmy',
      address: 'Adres',
      companyId: 'NIP',
      vatId: 'VAT ID',
      email: 'E-mail',
      website: 'Strona internetowa',
      invoiceNumber: 'Numer faktury',
      issueDate: 'Data wystawienia',
      dueDate: 'Termin płatności',
      currency: 'Waluta',
      referenceNumber: 'Numer referencyjny',
      customerReferenceNumber: 'Referencja klienta',
      orderNumber: 'Numer zamówienia',
      paymentMethod: 'Sposób płatności',
      bankAccount: 'Konto bankowe',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Uwagi (maks. 210 znaków)',
      markAsPaid: 'Oznacz jako zapłacone',
      itemName: 'Nazwa pozycji',
      quantity: 'Ilość',
      price: 'Cena',
      taxRate: 'Stawka podatku (%)',
      
      taxTypes: {
        vat: 'VAT (Podatek od wartości dodanej)',
        gst: 'GST (Podatek od towarów i usług)',
        sales_tax: 'Podatek od sprzedaży',
        none: 'Bez podatku'
      },
      
      showTax: 'Pokaż kolumny podatkowe',
      hideTax: 'Ukryj podatek na fakturze',
      reverseCharge: 'Reverse Charge (B2B)',
      reverseChargeDescription: 'Podatek rozlicza nabywca usługi',
      
      placeholders: {
        companyName: 'Twoja Firma Sp. z o.o.',
        address: 'ul. Biznesowa 123, Miasto, Kraj',
        companyId: '1234567890',
        vatId: 'PL1234567890',
        email: 'kontakt@firma.pl',
        website: 'przyklad.pl',
        invoiceNumber: 'FV-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'ZAM-001',
        bankAccount: '1234567890',
        iban: 'PL61 1090 1014 0000 0712 1981 2874',
        swiftBic: 'WBKPPLPP',
        notes: 'Warunki płatności: 30 dni netto. Dziękujemy za zaufanie!',
        itemName: 'Opis produktu lub usługi'
      },
      
      hide: 'Ukryj',
      show: 'Pokaż',
      remove: 'Usuń',
      addItem: 'Dodaj pozycję',
      generateInvoice: 'Wygeneruj fakturę',
      termsAndConditions: 'Regulamin',
      
      colorDescription: 'Wybierz kolor akcentu dla nagłówków faktury',
      languageDescription: 'Wybierz język zawartości faktury',
      taxTypeDescription: 'Wybierz system podatkowy dla twojego regionu',
      notesDescription: 'Dodaj warunki płatności, podziękowania lub dodatkowe informacje',
      
      paymentMethods: {
        bankTransfer: 'Przelew bankowy',
        cash: 'Gotówka',
        paypal: 'PayPal',
        creditCard: 'Karta kredytowa',
        wise: 'Wise'
      }
    }
  },
  {
    id: 'sk',
    name: 'Slovenčina',
    flag: '🇸🇰',
    form: {
      sellerInformation: 'Informácie o predávajúcom',
      buyerInformation: 'Informácie o kupujúcom',
      invoiceDetails: 'Detaily faktúry',
      paymentInformation: 'Platobné informácie',
      invoiceColorSelection: 'Farba faktúry',
      invoiceLanguageSelection: 'Jazyk faktúry',
      taxTypeSelection: 'Typ dane',
      notes: 'Poznámky',
      paymentStatus: 'Stav platby',
      items: 'Položky',
      
      companyName: 'Názov firmy',
      address: 'Adresa',
      companyId: 'IČO',
      vatId: 'IČ DPH',
      email: 'E-mail',
      website: 'Webová stránka',
      invoiceNumber: 'Číslo faktúry',
      issueDate: 'Dátum vystavenia',
      dueDate: 'Dátum splatnosti',
      currency: 'Mena',
      referenceNumber: 'Referenčné číslo',
      customerReferenceNumber: 'Referencia zákazníka',
      orderNumber: 'Číslo objednávky',
      paymentMethod: 'Spôsob platby',
      bankAccount: 'Bankový účet',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Poznámky (max. 210 znakov)',
      markAsPaid: 'Označiť ako zaplatené',
      itemName: 'Názov položky',
      quantity: 'Množstvo',
      price: 'Cena',
      taxRate: 'Sadzba dane (%)',
      
      taxTypes: {
        vat: 'DPH (Daň z pridanej hodnoty)',
        gst: 'GST (Daň z tovarov a služieb)',
        sales_tax: 'Predajná daň',
        none: 'Bez dane'
      },
      
      showTax: 'Zobraziť daňové stĺpce',
      hideTax: 'Skryť daň vo faktúre',
      reverseCharge: 'Reverse Charge (B2B)',
      reverseChargeDescription: 'Daň odvedie príjemca plnenia',
      
      placeholders: {
        companyName: 'Vaša firma s.r.o.',
        address: 'Obchodná 123, Mesto, Krajina',
        companyId: '12345678',
        vatId: 'SK1234567890',
        email: 'kontakt@firma.sk',
        website: 'priklad.sk',
        invoiceNumber: 'FA-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'OBJ-001',
        bankAccount: '1234567890',
        iban: 'SK31 1200 0000 1987 4263 7541',
        swiftBic: 'GIBASKBX',
        notes: 'Platobné podmienky: Splatnosť 30 dní. Ďakujeme za dôveru!',
        itemName: 'Popis produktu alebo služby'
      },
      
      hide: 'Skryť',
      show: 'Zobraziť',
      remove: 'Odstrániť',
      addItem: 'Pridať položku',
      generateInvoice: 'Vytvoriť faktúru',
      termsAndConditions: 'Obchodné podmienky',
      
      colorDescription: 'Vyberte farebný akcent pre hlavičky faktúry',
      languageDescription: 'Vyberte jazyk pre obsah faktúry',
      taxTypeDescription: 'Vyberte daňový systém vašej oblasti',
      notesDescription: 'Pridajte platobné podmienky, poďakovanie alebo ďalšie informácie',
      
      paymentMethods: {
        bankTransfer: 'Bankový prevod',
        cash: 'Hotovosť',
        paypal: 'PayPal',
        creditCard: 'Platobná karta',
        wise: 'Wise'
      }
    }
  },
  {
    id: 'uk',
    name: 'Українська',
    flag: '🇺🇦',
    form: {
      sellerInformation: 'Інформація про продавця',
      buyerInformation: 'Інформація про покупця',
      invoiceDetails: 'Деталі рахунку',
      paymentInformation: 'Платіжна інформація',
      invoiceColorSelection: 'Колір рахунку',
      invoiceLanguageSelection: 'Мова рахунку',
      taxTypeSelection: 'Тип податку',
      notes: 'Примітки',
      paymentStatus: 'Статус оплати',
      items: 'Позиції',
      
      companyName: 'Назва компанії',
      address: 'Адреса',
      companyId: 'ЄДРПОУ',
      vatId: 'ПДВ номер',
      email: 'Електронна пошта',
      website: 'Веб-сайт',
      invoiceNumber: 'Номер рахунку',
      issueDate: 'Дата виставлення',
      dueDate: 'Дата оплати',
      currency: 'Валюта',
      referenceNumber: 'Референс номер',
      customerReferenceNumber: 'Референс клієнта',
      orderNumber: 'Номер замовлення',
      paymentMethod: 'Спосіб оплати',
      bankAccount: 'Банківський рахунок',
      iban: 'IBAN',
      swiftBic: 'SWIFT/BIC',
      notesField: 'Примітки (макс. 210 символів)',
      markAsPaid: 'Позначити як сплачено',
      itemName: 'Назва позиції',
      quantity: 'Кількість',
      price: 'Ціна',
      taxRate: 'Ставка податку (%)',
      
      taxTypes: {
        vat: 'ПДВ (Податок на додану вартість)',
        gst: 'GST (Податок на товари та послуги)',
        sales_tax: 'Податок з продажу',
        none: 'Без податку'
      },
      
      showTax: 'Показати колонки податку',
      hideTax: 'Приховати податок у рахунку',
      reverseCharge: '', // Not used for Ukrainian
      reverseChargeDescription: '', // Not used for Ukrainian
      
      placeholders: {
        companyName: 'Ваша Компанія ТОВ',
        address: 'вул. Бізнесова 123, Місто, Країна',
        companyId: '12345678',
        vatId: 'UA123456789',
        email: 'kontakt@kompaniya.ua',
        website: 'pryklad.ua',
        invoiceNumber: 'РФ-001',
        referenceNumber: '001',
        customerReferenceNumber: 'REF-001',
        orderNumber: 'ЗАМ-001',
        bankAccount: '1234567890',
        iban: 'UA213996220000026007233566001',
        swiftBic: 'PBANUA2X',
        notes: 'Умови оплати: 30 днів нетто. Дякуємо за довіру!',
        itemName: 'Опис товару або послуги'
      },
      
      hide: 'Приховати',
      show: 'Показати',
      remove: 'Видалити',
      addItem: 'Додати позицію',
      generateInvoice: 'Генерувати рахунок',
      termsAndConditions: 'Умови та положення',
      
      colorDescription: 'Виберіть акцентний колір для заголовків рахунку',
      languageDescription: 'Виберіть мову для вмісту рахунку',
      taxTypeDescription: 'Виберіть податкову систему вашого регіону',
      notesDescription: 'Додайте умови оплати, подяку або додаткову інформацію',
      
      paymentMethods: {
        bankTransfer: 'Банківський переказ',
        cash: 'Готівка',
        paypal: 'PayPal',
        creditCard: 'Кредитна картка',
        wise: 'Wise'
      }
    }
  }
]

export const getFormLanguageById = (id: string): FormLanguage => {
  return formLanguages.find(lang => lang.id === id) || formLanguages[0] // default to English
} 