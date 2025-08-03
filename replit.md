# CrashPlan - Backup and Data Management Platform

## Overview

CrashPlan is a comprehensive backup and data management solution built as a modern web application. The platform provides enterprise-grade backup capabilities for Google Workspace services (Gmail and Google Drive) with a clean, professional interface. The application features a dashboard-driven architecture for monitoring backup operations, managing assets, and configuring policies across organizational users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js for the REST API server
- **Build System**: Vite for development and production builds with ESM modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for schema management and migrations
- **Schema Structure**: 
  - Users table for authentication
  - Assets table for tracking Gmail/Google Drive backups
  - Policies table for backup configuration rules
  - Backup/Restore jobs tables for operation tracking
  - Dashboard metrics for real-time statistics
  - App users for platform user management

### API Architecture
- **Pattern**: RESTful API with resource-based endpoints
- **Data Validation**: Zod schemas shared between client and server
- **Error Handling**: Centralized error middleware with structured responses
- **Logging**: Request/response logging with performance metrics

### Authentication & Security
- **Session-based**: PostgreSQL session store for user authentication
- **Schema Validation**: Drizzle-zod integration for runtime type checking
- **CORS**: Configured for development and production environments

### Development Environment
- **Hot Reload**: Vite development server with HMR
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Code Organization**: Monorepo structure with shared types and utilities

## External Dependencies

### Core Infrastructure
- **Database**: PostgreSQL via Neon Database serverless platform
- **Build Tools**: Vite for frontend bundling, ESBuild for server compilation

### UI Framework
- **Component Library**: Radix UI primitives for accessible components
- **Icons**: Lucide React for consistent iconography
- **Styling**: Tailwind CSS with PostCSS processing

### Development Tools
- **Type Safety**: TypeScript with strict configuration
- **Form Management**: React Hook Form with Hookform resolvers
- **Date Handling**: date-fns for date manipulation and formatting
- **Development**: Replit-specific plugins for error overlay and cartographer integration

### Backend Services
- **Database Driver**: @neondatabase/serverless for PostgreSQL connections
- **Session Storage**: connect-pg-simple for PostgreSQL session management
- **Schema Management**: Drizzle Kit for database migrations and schema updates