# Personal Expense Tracker

A comprehensive personal finance management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Live Demo

[Live Demo Link](https://expense-tracker-arpritjacob.vercel.app)

## Features

- 🔐 User Authentication (Google OAuth)
- 💰 Transaction Management (Add, Edit, Delete)
- 📊 Interactive Charts and Analytics
- 🏷️ Transaction Categorization
- 📱 Responsive Design
- 🌓 Dark Mode Support
- 📈 Monthly Budget Tracking
- 📊 Spending Insights
- 💾 Data Export (CSV)
- ⚡ Real-time Updates

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Drizzle
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **State Management**: TanStack React Query
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- PNPM or Bun
- PostgreSQL Database (NeonDB)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your-neondb-connection-string"

# Authentication
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
pnpm install
# or
bun install
```

3. Run database migrations:
```bash
pnpm db:migrate
# or
bun db:migrate
```

4. Start the development server:
```bash
pnpm dev
# or
bun dev
```

## Database Schema

The application uses the following main tables:
- `users`: User accounts and profiles
- `transactions`: Financial transactions
- `categories`: Transaction categories
- `budgets`: Monthly budget settings

## API Routes

- `/api/auth/*`: Authentication endpoints
- `/api/transactions`: Transaction management
- `/api/categories`: Category management
- `/api/budgets`: Budget management

## Folder Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
├── lib/                 # Utility functions
├── server/             # Server-side code
├── styles/             # Global styles
└── types/              # TypeScript types
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [NextAuth.js](https://next-auth.js.org) 