# Overview

This is a full-stack TypeScript application for an e-commerce jersey store called "TheClubJersey". The application is built with a React frontend using Vite and an Express.js backend, featuring a modern UI with shadcn/ui components and real-time product management capabilities.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, local storage for wishlist
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless)
- **Development**: In-memory storage fallback for development
- **API Design**: RESTful endpoints with JSON responses

## Key Components

### Database Schema
- **Jerseys Table**: Product catalog with pricing, categories, tags, and metadata
- **Banners Table**: Homepage carousel content management
- **Orders Table**: Customer order tracking and management
- **Validation**: Drizzle-Zod integration for type-safe schema validation

### Frontend Features
- **Product Catalog**: Filterable and sortable jersey listings
- **Wishlist System**: Persistent local storage wishlist with CRUD operations
- **Banner Carousel**: Rotating promotional banners with auto-advance
- **Admin Panel**: Complete CRUD interface for jerseys and banners
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Backend Services
- **Storage Abstraction**: Interface-based storage layer supporting both in-memory and PostgreSQL
- **API Routes**: Complete REST API for jerseys, banners, and orders
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Development Tools**: Request logging and response time tracking

## Data Flow

1. **Product Display**: Frontend queries `/api/jerseys` to fetch product catalog
2. **Filtering/Search**: Client-side filtering with category, search, and sort capabilities
3. **Wishlist Management**: Local storage persistence with React hooks
4. **Order Processing**: Google Forms integration for order capture
5. **Admin Operations**: Real-time CRUD operations with optimistic updates
6. **Banner Management**: Dynamic carousel content with admin controls

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection for production
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **wouter**: Lightweight React router

### Development Tools
- **tsx**: TypeScript execution for development
- **esbuild**: Fast backend bundling for production
- **@replit/vite-plugin-***: Replit integration plugins

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with automatic restart on changes
- **Database**: PostgreSQL 16 with automatic provisioning
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Port Configuration**: Backend on 5000, proxied to port 80

### Production Build
- **Frontend**: Vite build with optimized assets to `dist/public`
- **Backend**: esbuild bundle with external dependencies to `dist/index.js`
- **Database**: Drizzle schema migrations via `db:push` command
- **Deployment**: Autoscale deployment target on Replit

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection for development/production modes
- **Google Forms**: External form URLs for order processing

## Changelog
- June 14, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.