# Vision Photography Portfolio

## Overview

A photography portfolio web application with an Apple-inspired dark aesthetic. The application displays a curated collection of photographs organized by category (Nature, Architecture, Portrait, Travel) with smooth scroll animations and a modern, minimal design. Built as a full-stack TypeScript application with React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for Apple-style scroll animations and transitions
- **Build Tool**: Vite

The frontend follows a component-based architecture with:
- Pages in `client/src/pages/`
- Reusable components in `client/src/components/`
- UI primitives in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript (compiled with tsx for development, esbuild for production)
- **API Pattern**: RESTful endpoints defined in `server/routes.ts`
- **Database Access**: Storage layer abstraction in `server/storage.ts`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Defined in `shared/schema.ts` using Drizzle's table definitions
- **Migrations**: Managed via `drizzle-kit push` command
- **Validation**: Zod schemas generated from Drizzle schemas using `drizzle-zod`

The database schema currently includes a `photos` table with fields for id, url, title, description, and category.

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Database schema definitions and TypeScript types
- `routes.ts`: API route definitions with Zod validation schemas

### Build System
- Development: Vite dev server with HMR for frontend, tsx for backend
- Production: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- The build script in `script/build.ts` handles both builds and bundles specific dependencies to reduce cold start times

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Connection**: Uses `pg` Pool with Drizzle ORM wrapper

### UI/Animation Libraries
- **Radix UI**: Accessible component primitives (dialog, dropdown, toast, etc.)
- **Framer Motion**: Scroll-based animations and transitions
- **Embla Carousel**: Carousel/slider functionality

### Key NPM Packages
- `@tanstack/react-query`: Data fetching and caching
- `class-variance-authority`: Component variant management
- `zod`: Runtime type validation
- `lucide-react`: Icon library

### Fonts
- Inter: UI and body text
- Manrope: Headlines and display text
- Loaded via Google Fonts CDN

### Development Tools
- `@replit/vite-plugin-runtime-error-modal`: Error overlay in development
- `@replit/vite-plugin-cartographer`: Replit-specific development tooling