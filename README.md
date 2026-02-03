# Invoice.wiki

[![CI](https://github.com/michaldumnyc/invoice.wiki.app/actions/workflows/ci.yml/badge.svg)](https://github.com/michaldumnyc/invoice.wiki.app/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Free online invoice generator with PDF export. No sign-up required.

🌐 **Live:** [invoice.wiki](https://invoice.wiki)

## Features

- 📄 Generate professional PDF invoices instantly
- 🌍 Multi-language support (EN, DE, CS, PL, SK, UK)
- 💱 Multiple currencies
- 🎨 Customizable invoice colors
- 🔒 Privacy-first — all data stays in your browser
- 📱 Mobile-friendly

## Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/) 5
- [Tailwind CSS](https://tailwindcss.com/) 3
- [Radix UI](https://www.radix-ui.com/)
- [jsPDF](https://github.com/parallax/jsPDF) + [jspdf-autotable](https://github.com/simonbengtsson/jsPDF-AutoTable)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Getting Started

```bash
git clone https://github.com/michaldumnyc/invoice.wiki.app.git
cd invoice.wiki.app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | TypeScript validation |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

[MIT](LICENSE)
