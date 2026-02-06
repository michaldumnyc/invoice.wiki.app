import type { Locale } from "./constants"

export interface Dictionary {
  nav: {
    home: string
    createInvoice: string
    faq: string
    about: string
    openMenu: string
    closeMenu: string
    theme: {
      light: string
      dark: string
      system: string
      toggleTheme: string
    }
  }
  footer: {
    quickLinks: string
    freeInvoiceGenerator: string
    aboutSite: string
    createProfessionalInvoice: string
    privacyPolicy: string
    openSource: string
  }
  home: {
    meta: {
      title: string
      description: string
      ogTitle: string
      ogDescription: string
    }
    hero: { title: string; description: string; cta: string }
    howItWorks: {
      title: string
      steps: Array<{ title: string; description: string }>
      cta: string
    }
    features: {
      title: string
      items: Array<{ title: string; description: string }>
      privacyLink: string
      learnMoreLink: string
    }
    faq: {
      title: string
      items: Array<{ question: string; answer: string }>
    }
    grid: {
      title: string
      items: Array<{ title: string; subtitle: string }>
    }
    invoiceExample: {
      title: string
      description: string
      clickToEnlarge: string
      imageAlt: string
      imageTitle: string
      pdfReady: string
      tryItNow: string
      benefits: Array<{ title: string; description: string }>
    }
    cta: { title: string; subtitle: string; button: string }
  }
  about: {
    meta: {
      title: string
      description: string
      ogTitle: string
      ogDescription: string
    }
    title: string
    intro: string
    createFirstInvoice: string
    latestUpdates: {
      title: string
      items: string[]
    }
    privacy: { title: string; content: string; link: string }
    whatIsInvoice: { title: string; content: string }
    components: {
      title: string
      seller: { title: string; items: string[] }
      buyer: { title: string; items: string[] }
      details: { title: string; items: string[] }
      payment: { title: string; items: string[] }
      itemsTotals: { title: string; items: string[] }
    }
    legal: { title: string; content: string; purposeIntro: string; purposes: string[] }
    international: {
      title: string
      items: Array<{ title: string; description: string }>
    }
    whyChoose: { title: string; items: string[] }
    invoiceQuality: { title: string; content: string }
    invoiceExample: {
      whatYouGet: string
      items: string[]
      note: string
      clickToEnlarge: string
      imageTitle: string
      imageAlt: string
    }
    readyCta: { title: string; subtitle: string; button: string }
    contact: { title: string; content: string }
  }
  faq: {
    meta: {
      title: string
      description: string
      ogTitle: string
      ogDescription: string
    }
    title: string
    subtitle: string
    categories: Array<{
      category: string
      icon: string
      questions: Array<{ question: string; answer: string }>
    }>
    stillHaveQuestions: {
      title: string
      content: string
      createInvoice: string
      aboutSite: string
    }
  }
  privacy: {
    meta: {
      title: string
      description: string
      ogTitle: string
      ogDescription: string
    }
    title: string
    noCollection: { title: string; content: string[] }
    howWeProtect: { title: string; intro: string; items: Array<{ title: string; content: string }> }
    whatWeDoNotCollect: { title: string; intro: string; items: string[] }
    analytics: { title: string; intro: string; items: string[]; note: string }
    thirdParty: { title: string; content: string; link: string }
    rights: { title: string; intro: string; items: string[] }
    readyCta: { title: string; content: string; button: string }
    contactTitle: string
    contactContent: string
  }
  createInvoice: {
    meta: {
      title: string
      description: string
      ogTitle: string
      ogDescription: string
    }
    title: string
    subtitle: string
    privacyLink: string
    faqLink: string
    needHelp: string
    faqTitle: string
    faqItems: Array<{ question: string; answer: string }>
    viewAllFaqs: string
    form: {
      agreePrefix: string
      termsLink: string
      agreeSuffix: string
      termsRequired: string
      generateInvoice: string
      generatingInvoice: string
    }
  }
  terms: {
    title: string
    version: string
    lastUpdated: string
    acceptanceOfTerms: { title: string; content: string }
    descriptionOfService: { title: string; content: string }
    noWarranties: { title: string; content: string }
    limitationOfLiability: { title: string; content: string }
    indemnification: { title: string; content: string; items: string[] }
    governingLaw: { title: string; content: string }
    changesToTerms: { title: string; content: string }
    versionHistory: { title: string; content: string; v1: string }
    contactInfo: { title: string; content: string; link: string }
  }
  notFound: {
    meta: { title: string; description: string }
    code: string
    title: string
    subtitle: string
    encouragement: string
    returnHome: string
    createInvoice: string
  }
  skipToContent: string
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default as unknown as Dictionary),
  de: () => import("@/dictionaries/de.json").then((m) => m.default as unknown as Dictionary),
  cs: () => import("@/dictionaries/cs.json").then((m) => m.default as unknown as Dictionary),
  pl: () => import("@/dictionaries/pl.json").then((m) => m.default as unknown as Dictionary),
  sk: () => import("@/dictionaries/sk.json").then((m) => m.default as unknown as Dictionary),
  uk: () => import("@/dictionaries/uk.json").then((m) => m.default as unknown as Dictionary),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]()
}
