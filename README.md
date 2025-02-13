# InvoiceHub

InvoiceHub is a modern invoice management system built with Next.js 14, TypeScript, and Material-UI. It provides a clean and efficient interface for managing invoices with features like adding new invoices, listing existing ones, and filtering through them.

## Features

- 📝 Create new invoices with validation
- 📊 View all invoices in a responsive table/card layout
- 🔍 Search and filter invoices
- 💾 Persistent storage using localStorage
- 📱 Fully responsive design
- 🎨 Clean and modern UI using Material-UI
- ✨ Form validation using React Hook Form and Zod

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone git@github.com:farhanabi/invoice-hub.git
cd invoice-hub
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── app/                # Next.js 14 App Router pages
│   ├── invoices/       # Invoice-related pages
│   │   ├── add/        # Add invoice page
│   │   └── list/       # Invoice listing page
│   └── layout.tsx      # Root layout component
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
│   └── use-invoices.ts # Invoice management hook
└── lib/                # Utility functions and configurations
    ├── schemas/        # Zod validation schemas
    ├── types/          # TypeScript type definitions
    └── theme.ts        # MUI theme configuration
```

## Technical Decisions

### Framework & Architecture

- **Next.js 14 with App Router**: Chosen for its file-based routing, server components, and built-in performance optimizations. The App Router provides a more intuitive project structure and better type safety.
- **TypeScript**: Enables better type safety and developer experience with early error detection and improved IDE support.

### State Management & Data Persistence

- **Custom Hook (useInvoices)**: Implements a simple and effective state management solution using React's built-in hooks. This approach avoids the complexity of external state management libraries while maintaining clean separation of concerns.
- **localStorage**: Used for data persistence to maintain simplicity while meeting the requirement of preserving data across page refreshes. In a production environment, this would be replaced with a proper backend.

### UI & Styling

- **Material-UI (MUI)**: Provides a comprehensive set of pre-built components that follow Material Design principles while allowing for customization. MUI's theming system enables consistent styling across the application.
- **Responsive Design**: Implements different layouts for mobile and desktop views, ensuring a good user experience across all device sizes:
  - Card-based layout for mobile devices
  - Table view for desktop screens
  - Collapsible sidebar navigation
  - Optimized form layouts

### Form Management & Validation

- **React Hook Form**: Offers excellent performance and developer experience for form handling with minimal re-renders.
- **Zod**: Provides robust schema validation with great TypeScript integration, making it easier to maintain type safety between form data and validation rules.

### Loading & Error States

- **Optimistic Updates**: Implements immediate UI feedback while handling operations.
- **Skeleton Loading**: Uses skeleton placeholders during data loading for a better user experience.
- **Error Boundaries**: Handles errors gracefully with user-friendly error messages and recovery options.

## Future Improvements

1. Backend Integration

   - Replace localStorage with proper API endpoints
   - Implement user authentication
   - Add real-time updates

2. Features

   - Invoice editing functionality
   - PDF generation and export
   - Email notifications
   - Multi-currency support

3. Performance
   - Implement pagination for large datasets
   - Add infinite scrolling or load-more functionality
   - Optimize bundle size
