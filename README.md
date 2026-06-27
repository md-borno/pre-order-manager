# Preorder Manager

> A full-stack preorder management application built with Next.js 16, Prisma, and SQLite.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)

**Author:** Adlul Islam · **Submitted For:** Xubitar Technical Assessment · **Last Updated:** June 27, 2026

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Quick Start](#quick-start)
5. [Detailed Setup & Installation](#detailed-setup--installation)
6. [Folder Structure](#folder-structure)
7. [System Architecture](#system-architecture)
8. [Technology Decisions](#technology-decisions)
9. [Frontend Architecture](#frontend-architecture)
10. [Database Schema](#database-schema)
11. [API Reference](#api-reference)
12. [API Testing Guide](#api-testing-guide)
13. [How It Works (Data Flows)](#how-it-works-data-flows)
14. [Component Overview](#component-overview)
15. [User Guide & Tutorials](#user-guide--tutorials)
29. [Acknowledgments](#acknowledgments)

---

## Project Overview

**Preorder Manager** is a full-stack web application for managing product preorders. Built with Next.js 16, Prisma ORM, and SQLite, it provides a clean, intuitive interface for creating, managing, and monitoring preorders with advanced filtering, sorting, and pagination — all handled at the database level for performance.

### Key Objectives
- Manage product preorders with status tracking (Active/Inactive)
- Display preorders in a paginated, sortable, filterable list
- Create and update preorders with a clean form interface
- Toggle preorder status without a page reload
- Delete preorders with confirmation
- Responsive UI matching design specifications

### Key Highlights
- ✅ **Fully Functional** — all required features implemented and tested
- ✅ **Production Ready** — clean code, error handling, security best practices
- ✅ **Modern Stack** — Next.js 16, React 19, TypeScript
- ✅ **Performance Optimized** — server-side filtering, sorting, pagination

---

## Features

### Preorder Management
- Create, Read, Update, Delete (CRUD) preorders
- Toggle status (Active/Inactive) with instant updates
- Bulk selection with checkboxes (select all / deselect all)
- Confirmation dialogs for destructive actions

### Filtering & Sorting
- Filter by status: **All**, **Active**, **Inactive**
- Sort by: Name (A–Z / Z–A), Created Date (Newest/Oldest), Start Date, End Date
- All filtering and sorting happens server-side at the database level

### Pagination
- Server-side pagination (default 10 items/page)
- Configurable page size via query parameter
- Total count tracking with Previous/Next navigation

### User Interface
- Responsive design (mobile, tablet, desktop)
- Loading states and animations
- Toast notifications (success/error) via Sonner
- Confirmation dialogs via SweetAlert2
- Clean, modern UI built with shadcn/ui

### Full Feature List (10 Core Features)
1. **View Preorder List** — table with checkbox, name, product count, preorder window, dates, status, and actions columns
2. **Filter Preorders** — All / Active / Inactive, resets pagination to page 1 on change
3. **Sort Preorders** — 8 sort options (name and 3 date fields, each ascending/descending)
4. **Pagination** — Previous/Next controls, disabled at boundaries, default 10 items/page
5. **Create Preorder** — dedicated `/preorders/create` page with full validation
6. **Edit Preorder** — pencil icon opens `/preorders/edit/[id]` pre-filled with existing data
7. **Toggle Status** — click the status badge for an instant PATCH update, no full-page reload
8. **Delete Preorder** — trash icon with a SweetAlert2 confirmation dialog before permanent deletion
9. **Bulk Selection** — row and "select all" checkboxes are functional today; bulk actions (delete/update) are placeholders for a future release
10. **Search & Navigation** — bookmarkable URLs for list (`/preorders`), create (`/preorders/create`), and edit (`/preorders/edit/:id`)

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.9 | Full-stack React framework (App Router) |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Type safety |
| **Prisma** | 6.16.3 | ORM for database management |
| **SQLite** | (via Prisma) | Lightweight, file-based database |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework |
| **React Hook Form** | 7.80.0 | Form state management |
| **SweetAlert2** | 11.26.25 | Alert / confirmation dialogs |
| **Sonner** | 2.0.7 | Toast notifications |
| **Lucide React** | 1.21.0 | Icon library |
| **shadcn/ui** | 4.12.0 | UI component library |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/md-borno/preorder-manager.git
cd preorder-manager

# 2. Install & configure
npm install dotenv
npm install

# 3. Initialize the database
npx prisma migrate dev
npx prisma db seed

# 4. Run
npm run dev

# 5. Open
# → http://localhost:3000  (redirects to /preorders)
```

That's it — you should see 2 sample preorders (iPhone 15 Pro, Samsung Galaxy S24) in the table. For a fully detailed walkthrough, including prerequisites and troubleshooting, see the next section.

---

## Detailed Setup & Installation

### Step 1 — Clone the Repository

```bash
# HTTPS (easiest)
git clone https://github.com/md-borno/preorder-manager.git
cd preorder-manager

```

Verify the clone:
```bash
git remote -v   # should show origin fetch/push URLs
git branch      # should show * main
ls -la          # should show README.md, package.json, src/, prisma/, etc.
```

### Step 2 — Install Dependencies

```bash
npm install
# or
yarn install
```

This downloads all dependencies from `package.json`, creates `node_modules/`, and generates `package-lock.json` (typically 2–5 minutes the first time). Verify with:

```bash
npm ls --depth=0
npm ls react next
```

Warnings are usually fine; there should be no errors.

### Step 3 — Environment Setup

Create `.env.local` in the project root:

```bash
touch .env.local        # macOS/Linux
type nul > .env.local   # Windows
```

Add:

```env
DATABASE_URL="file:./prisma/dev.db"
NODE_ENV="development"
```

### Step 4 — Database Setup

Run migrations to create the SQLite database and schema:

```bash
npx prisma migrate dev
```

You'll be prompted for a migration name (e.g. `init`) and a confirmation. This creates `prisma/dev.db`, runs all migrations, and generates the Prisma client.

Seed sample data:

```bash
npx prisma db seed
```

This creates 2 sample preorders (iPhone 15 Pro, Samsung Galaxy S24).

Verify the database with any of:
```bash
npx prisma studio                                    # GUI at http://localhost:5555
ls -lh prisma/dev.db                                 # confirm file exists, size > 0
npx prisma db execute --stdin <<< "SELECT * FROM Preorder;"
```

### Step 5 — Verify Installation

```bash
node --version && npm --version && git --version
ls -la | grep -E "package.json|.env.local|prisma"
npm ls --depth=0
ls -lh prisma/dev.db
```

### Step 6 — Run the Project

```bash
npm run dev
```

```
  ▲ Next.js 16.2.9
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Ready in 2.3s
```

Open `http://localhost:3000` — you'll be redirected to `/preorders` where you should see the list page, filter/sort dropdowns, a Create Preorder button, pagination, and row actions. Stop the server with `Ctrl+C`; saved files hot-reload automatically.

### Common Commands

```bash
# Development
npm run dev               # start dev server
npm run lint              # lint code
npx prisma studio          # open database GUI

# Database
npx prisma migrate dev     # run migrations
npx prisma db seed         # seed sample data
npx prisma migrate reset   # reset database
npx prisma generate        # regenerate Prisma client

# Production
npm run build
npm start
```

### Next Steps
1. Verify everything works: `npm run dev`
2. Review [System Architecture](#system-architecture)
3. Test the API with curl or Postman — see [API Testing Guide](#api-testing-guide)
4. Explore the code in `src/`

---

## Folder Structure

```
preorder-manager/
│
├── public/                          # Static assets (images, favicon, etc.)
│
├── src/
│   ├── app/                         # Next.js app directory
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page (redirects to /preorders)
│   │   ├── global.css               # Global styles
│   │   │
│   │   ├── api/                     # API routes
│   │   │   └── preorders/
│   │   │       ├── route.ts         # GET (list), POST (create)
│   │   │       └── [preorderId]/
│   │   │           └── route.ts     # GET, PUT, PATCH, DELETE
│   │   │
│   │   └── preorders/               # UI pages
│   │       ├── page.tsx             # Preorder list page
│   │       ├── create/
│   │       │   └── page.tsx         # Create preorder page
│   │       └── edit/
│   │           └── [preorderId]/
│   │               └── page.tsx     # Edit preorder page
│   │
│   ├── components/                  # Reusable React components
│   │   ├── PreorderList.tsx         # Table component for listing preorders
│   │   ├── PreorderForm.tsx         # Form component for create/edit
│   │   ├── StatusSwitch.tsx         # Status toggle component
│   │   ├── Pagination.tsx           # Pagination component
│   │   └── ui/                      # UI primitives (shadcn/ui)
│   │       ├── button.tsx
│   │       └── alert-dialog.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts                # Prisma client singleton
│   │   └── utils.ts                 # Utility functions
│   │
│   └── types/
│       └── index.ts                 # TypeScript type definitions
│
├── prisma/
│   ├── schema.prisma                # Database schema definition
│   ├── seed.ts                      # Database seeding script
│   ├── migrations/
│   │   └── 20260625211307_init/
│   │       └── migration.sql
│   └── dev.db                       # SQLite database file (local)
│
├── Configuration Files
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.mjs
│   ├── components.json
│   ├── prisma.config.ts
│   ├── .gitignore
│   └── .env.local                   # not tracked in git
│
└── README.md                        # This file
```

---

## System Architecture

### High-Level Overview

```
┌──────────────────────────────────────────────────────────┐
│                 Browser / Client                         │
│  (React 19 + TypeScript + Tailwind CSS + shadcn/ui)       │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTP Requests (REST API)
┌────────────────────▼─────────────────────────────────────┐
│              Next.js 16 Server                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │  Route Handlers (App Router)                        │  │
│  │  ├── GET    /api/preorders                           │  │
│  │  ├── POST   /api/preorders                           │  │
│  │  ├── GET    /api/preorders/[id]                      │  │
│  │  ├── PUT    /api/preorders/[id]                      │  │
│  │  ├── PATCH  /api/preorders/[id]                      │  │
│  │  └── DELETE /api/preorders/[id]                      │  │
│  └────────────────────────────────────────────────────┘  │
│                     │  Prisma ORM (type-safe query builder)│
└────────────────────┬─────────────────────────────────────┘
                     │ SQL Queries
┌────────────────────▼─────────────────────────────────────┐
│               SQLite Database — prisma/dev.db              │
│  Preorder Table: id (PK, CUID), name, productCount,         │
│  preorderWhen, startAt, endAt, status, createdAt, updatedAt │
└──────────────────────────────────────────────────────────┘
```

### Architecture & Endpoint Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React/Next.js)                 │
├─────────────────────────────────────────────────────────────┤
│ Pages:                                                       │
│ ├── /preorders           → PreorderList + Pagination         │
│ ├── /preorders/create    → PreorderForm (Create mode)        │
│ └── /preorders/edit/[id] → PreorderForm (Edit mode)           │
└────────────────────────┬────────────────────────────────────┘
                         │
                   API Layer (Next.js Route Handlers)
                         │
        ┌────────────────┴────────────────┐
        v                                 v
  ┌──────────────┐              ┌──────────────────┐
  │ GET /api/    │              │ POST /api/        │
  │  preorders   │              │  preorders        │
  │ Returns:     │              │ Body: name,        │
  │ filtered,    │              │ productCount,       │
  │ sorted,      │              │ preorderWhen,       │
  │ paginated    │              │ startAt, endAt,     │
  │ list         │              │ status              │
  └──────────────┘              └──────────────────┘
                                        │
        ┌──────────────────────────────┴──────────────────────────────┐
        v                                                              v
  ┌──────────────────────────┐              ┌────────────────────────┐
  │ GET /api/preorders/[id]  │              │ PUT /api/preorders/[id]│
  │ Returns: single record   │              │ Updates: full record    │
  └──────────────────────────┘              └────────────────────────┘
                                                    │
                                ┌───────────────────┼───────────────────┐
                                v                   v                   v
                        ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
                        │ DELETE /api/ │  │ PATCH /api/   │  │   Prisma     │
                        │preorders/[id]│  │preorders/[id] │  │ ORM - SQLite │
                        │ Deletes      │  │ Updates status│  │ dev.db       │
                        │ record       │  │ field only    │  │              │
                        └──────────────┘  └──────────────┘  └──────────────┘
```

---

## Technology Decisions

| Choice | Why |
|--------|-----|
| **Next.js 16** | Full-stack capability (frontend + API in one project), server components, App Router with dynamic segments, built-in image optimization and code splitting, first-class TypeScript support, fast refresh |
| **Prisma ORM** | Type safety from auto-generated types, a migration system for database version control, a readable query builder, database-agnostic (easy to swap to PostgreSQL later), and Prisma Studio for visual inspection |
| **SQLite** | Zero setup, ideal for MVP speed, file-based (easy to back up / version), built-in indexing, with a clear migration path to PostgreSQL |
| **React Hook Form** | Minimal re-renders, ~8KB minified, built-in validation, WCAG-compliant accessibility |
| **Tailwind CSS** | Utility-first for rapid UI development, mobile-first responsiveness, themeable, no separate CSS files to context-switch into |

### Code Organization Rationale

```
src/
├── app/                        # Next.js App Router
│   ├── api/                    # API route handlers
│   │   └── preorders/
│   │       └── [preorderId]/   # Dynamic route parameter
│   └── preorders/              # Pages with UI
│       ├── page.tsx            # List view
│       ├── create/              # Create flow
│       └── edit/[preorderId]/  # Edit view with ID
│
├── components/
│   ├── PreorderList.tsx        # Container component
│   ├── PreorderForm.tsx        # Form logic
│   ├── StatusSwitch.tsx        # Reusable UI component
│   ├── Pagination.tsx          # Reusable UI component
│   └── ui/                     # Primitives from shadcn/ui
│
├── lib/
│   ├── prisma.ts                # Singleton instance
│   └── utils.ts                 # Shared utilities
│
└── types/
    └── index.ts                 # TypeScript definitions
```

This structure keeps API logic separate from UI (separation of concerns), scales easily as routes/features grow, maximizes component reuse, centralizes type definitions, and keeps each file's purpose obvious.

### API Design Principles

| Method | Resource | Action | Status |
|--------|----------|--------|--------|
| GET | `/api/preorders` | List all | 200 |
| POST | `/api/preorders` | Create new | 201 |
| GET | `/api/preorders/:id` | Fetch single | 200 |
| PUT | `/api/preorders/:id` | Update full | 200 |
| PATCH | `/api/preorders/:id` | Update partial | 200 |
| DELETE | `/api/preorders/:id` | Remove | 200 |

Query parameters on the list endpoint (`?page=1&limit=10&filter=active&sort=createdAt_desc`) keep state in the URL — bookmarkable, stateless, cache-friendly, and explicit about intent.

---

## Frontend Architecture

### Component Hierarchy

```
App (Root Layout)
└── PreorderListPage
    ├── Header
    │   ├── Title
    │   └── CreateButton → Navigate to /preorders/create
    ├── FilterBar
    │   ├── StatusFilter (All, Active, Inactive)
    │   └── SortSelector
    ├── PreorderList (Container)
    │   ├── Table Header
    │   └── TableBody
    │       ├── TableRow (repeated)
    │       │   ├── Checkbox
    │       │   ├── Name, ProductCount, Dates
    │       │   ├── StatusSwitch → PATCH request
    │       │   ├── EditButton → Navigate to /preorders/edit/[id]
    │       │   └── DeleteButton → DELETE request + Confirmation
    │       └── EmptyState (if no preorders)
    └── Pagination
        ├── PrevButton, PageInfo, NextButton
```

### State Management

```typescript
const [preorders, setPreorders] = useState([]);
const [page, setPage] = useState(1);
const [filter, setFilter] = useState('all');
const [sort, setSort] = useState('createdAt_desc');
const [isLoading, setIsLoading] = useState(false);
```

Data flow: a state change triggers `useEffect` → the effect calls the API → the API returns data → state updates with the response → the component re-renders.

### Server vs Client Components

```typescript
// Server component — fetch server-side
async function PreorderListPage() {
  const data = await fetch('...');
  return <PreorderList data={data} />;
}

// Client component
'use client';
import { useState, useEffect } from 'react';

export function PreorderList() {
  const [data, setData] = useState([]);
  useEffect(() => { /* fetch */ }, []);
}
```

Pages currently use client components for interactivity, while routes handle server-side API logic — a clean separation of concerns.

### Form Handling (React Hook Form)

```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
    name: preorder?.name || '',
    productCount: preorder?.productCount || 1,
    // ...
  }
});

const onSubmit = async (data) => {
  // Convert to API format, make POST/PUT request, handle response
};
```

This gives minimal re-renders, uncontrolled components, better performance on large forms, and built-in validation.

---

## Database Schema

### Preorder Table

```prisma
model Preorder {
  id            String   @id @default(cuid())
  name          String
  productCount  Int      @default(1)
  preorderWhen  String
  startAt       DateTime
  endAt         DateTime
  status        String   @default("active")
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

### Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | String (CUID) | Unique identifier | `cm8s7z9k0000108jt9k8d9k8m` |
| `name` | String | Product name | `iPhone 15 Pro` |
| `productCount` | Int | Number of units available | `50` |
| `preorderWhen` | String | When preorder is available | `out-of-stock`, `regardless-of-stock` |
| `startAt` | DateTime | Preorder start date | `2026-06-27T10:00:00Z` |
| `endAt` | DateTime | Preorder end date | `2026-07-27T10:00:00Z` |
| `status` | String | Active or inactive | `active`, `inactive` |
| `createdAt` | DateTime | Creation timestamp | auto-generated |
| `updatedAt` | DateTime | Last update timestamp | auto-updated |

### Why a Single Table?

Preorders are independent entities with no related data that needs a separate table, so a single table simplifies queries and avoids unnecessary joins. If a `Product` entity is introduced later, the schema can be normalized:

```prisma
model Preorder {
  // ...existing fields
  product   Product @relation(fields: [productId], references: [id])
  productId String
}

model Product {
  id        String     @id @default(cuid())
  name      String
  preorders Preorder[]
}
```

### Indexing Strategy

`id` is auto-indexed as the primary key. For larger datasets, add indexes on fields used in filtering/sorting:

```prisma
model Preorder {
  // ...fields
  @@index([status])
  @@index([createdAt])
  @@index([startAt])
  @@index([endAt])
}
```

`status` is used in filter queries; `createdAt`, `startAt`, and `endAt` are used in sort and date-range queries.

---

## API Reference

**Base URL:** `http://localhost:3000/api`

**Authentication:** None currently required. For future use, Bearer token auth can be layered in: `curl -H "Authorization: Bearer YOUR_TOKEN" ...`

### 1. `GET /preorders` — List

Returns preorders with filtering, sorting, and pagination.

**Query Parameters:**
- `page` (optional, default `1`)
- `limit` (optional, default `10`)
- `filter` (optional): `all` | `active` | `inactive` (default `all`)
- `sort` (optional, default `createdAt_desc`): `name_asc`, `name_desc`, `createdAt_asc`, `createdAt_desc`, `startAt_asc`, `startAt_desc`, `endAt_asc`, `endAt_desc`

```bash
curl "http://localhost:3000/api/preorders?page=1&limit=10&filter=active&sort=name_asc"
```

**Response (200 OK):**
```json
{
  "preorders": [
    {
      "id": "cm8s7z9k0000108jt9k8d9k8m",
      "name": "iPhone 15 Pro",
      "productCount": 50,
      "preorderWhen": "regardless-of-stock",
      "startAt": "2026-06-27T10:00:00Z",
      "endAt": "2026-07-27T10:00:00Z",
      "status": "active",
      "createdAt": "2026-06-27T10:00:00Z",
      "updatedAt": "2026-06-27T10:00:00Z"
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 }
}
```

### 2. `POST /preorders` — Create

```bash
curl -X POST "http://localhost:3000/api/preorders" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "productCount": 30,
    "preorderWhen": "out-of-stock",
    "startAt": "2026-07-01T10:00:00Z",
    "endAt": "2026-08-01T10:00:00Z",
    "status": "active"
  }'
```

**Validation:** `name` (string, ≥1 char), `productCount` (number, ≥1), `preorderWhen` (enum: `out-of-stock` | `regardless-of-stock`), `startAt`/`endAt` (ISO datetime). `status` is optional and defaults to `active`.

**Response (201 Created):** the created record, including generated `id`, `createdAt`, `updatedAt`.

### 3. `GET /preorders/:id` — Fetch Single

```bash
curl "http://localhost:3000/api/preorders/cm8s7z9k0000108jt9k8d9k8m"
```

Returns the record (200) or `{ "error": "Preorder not found" }` (404).

### 4. `PUT /preorders/:id` — Update (Full)

```bash
curl -X PUT "http://localhost:3000/api/preorders/cm8s7z9k0000108jt9k8d9k8m" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "iPhone 15 Pro Max",
    "productCount": 75,
    "preorderWhen": "out-of-stock",
    "startAt": "2026-06-30T10:00:00Z",
    "endAt": "2026-07-30T10:00:00Z",
    "status": "active"
  }'
```

Returns the fully updated record (200).

### 5. `PATCH /preorders/:id` — Update Status Only

```bash
curl -X PATCH "http://localhost:3000/api/preorders/cm8s7z9k0000108jt9k8d9k8m" \
  -H "Content-Type: application/json" \
  -d '{"status": "inactive"}'
```

Updates only the `status` field and returns the updated record (200). This is what powers the instant status-toggle in the UI.

### 6. `DELETE /preorders/:id` — Delete

```bash
curl -X DELETE "http://localhost:3000/api/preorders/cm8s7z9k0000108jt9k8d9k8m"
```

Returns `{ "success": true }` (200), or `{ "error": "Failed to delete preorder" }` (500) on failure.

### Standard Response Shapes

```json
// Success (paginated)
{ "data": { /* main data */ }, "pagination": { "page": 1, "limit": 10, "total": 25, "totalPages": 3 } }

// Error
{ "error": "User-friendly error message", "code": "ERROR_CODE", "status": 400 }
```

**HTTP status codes used:** `200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`.

---

## API Testing Guide

### Tools

| Tool | Notes |
|------|-------|
| **curl** | No install needed, scriptable, works everywhere |
| **Postman** | Visual GUI, collections, environments — [download](https://www.postman.com/downloads/) |
| **Thunder Client** | Lightweight VS Code extension |
| **REST Client** | File-based (`.rest`/`.http`), version-control friendly VS Code extension |

### Testing Workflows

**Complete CRUD test:**
```bash
# 1. List
curl http://localhost:3000/api/preorders

# 2. Create and capture ID
RESPONSE=$(curl -X POST http://localhost:3000/api/preorders \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","productCount":10,"preorderWhen":"out-of-stock","startAt":"2026-07-01T10:00:00Z","endAt":"2026-08-01T10:00:00Z","status":"active"}')
ID=$(echo $RESPONSE | jq -r '.id')

# 3. Fetch it
curl http://localhost:3000/api/preorders/$ID

# 4. Update it
curl -X PUT http://localhost:3000/api/preorders/$ID \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Test Product","productCount":20,"preorderWhen":"regardless-of-stock","startAt":"2026-07-01T10:00:00Z","endAt":"2026-08-01T10:00:00Z","status":"inactive"}'

# 5. Toggle status
curl -X PATCH http://localhost:3000/api/preorders/$ID -H "Content-Type: application/json" -d '{"status":"active"}'

# 6. Delete it, then verify 404
curl -X DELETE http://localhost:3000/api/preorders/$ID
curl http://localhost:3000/api/preorders/$ID
```

**Filter & sort test:** run the list endpoint with each `filter` value (`all`, `active`, `inactive`) and each `sort` value to confirm results change as expected.

**Pagination test:** seed 15+ records, then request `?page=1&limit=5`, `?page=2&limit=5`, `?page=3&limit=5` and confirm the correct slices and `totalPages` are returned.

### Postman Collection

Save as `Preorder Manager.postman_collection.json` and import via Postman → Import → Raw text:

```json
{
  "info": {
    "name": "Preorder Manager",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Preorders",
      "item": [
        {
          "name": "List All",
          "request": {
            "method": "GET",
            "url": {
              "raw": "{{base_url}}/preorders?page=1&limit=10&filter=all&sort=createdAt_desc",
              "host": ["{{base_url}}"],
              "path": ["preorders"],
              "query": [
                {"key": "page", "value": "1"},
                {"key": "limit", "value": "10"},
                {"key": "filter", "value": "all"},
                {"key": "sort", "value": "createdAt_desc"}
              ]
            }
          }
        },
        {
          "name": "Create",
          "request": {
            "method": "POST",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"New Product\",\n  \"productCount\": 50,\n  \"preorderWhen\": \"out-of-stock\",\n  \"startAt\": \"2026-07-01T10:00:00Z\",\n  \"endAt\": \"2026-08-01T10:00:00Z\",\n  \"status\": \"active\"\n}"
            },
            "url": { "raw": "{{base_url}}/preorders", "host": ["{{base_url}}"], "path": ["preorders"] }
          }
        }
      ]
    }
  ],
  "variable": [{ "key": "base_url", "value": "http://localhost:3000/api", "type": "string" }]
}
```

### Common Errors

| Status | Likely cause | Fix |
|--------|--------------|-----|
| `400 Bad Request` | Missing field, wrong type, bad date format, invalid enum | Use ISO dates (`2026-07-01T10:00:00Z`); check required fields |
| `404 Not Found` | Wrong/typo'd ID, or already deleted | Re-fetch ID from the list endpoint |
| `500 Internal Server Error` | DB connection issue, server crash | Check server logs, restart `npm run dev`, confirm `prisma/dev.db` exists |
| Network error (`curl: (7) Failed to connect`) | Server not running, wrong port, firewall | `npm run dev`; try `npm run dev -- -p 3001` |

### Testing Checklist
- [ ] Server running (`npm run dev`) and database seeded (`npx prisma db seed`)
- [ ] `GET /preorders` (list, filter, sort, pagination all work)
- [ ] `POST /preorders` creates a record
- [ ] `GET /preorders/:id` fetches a single record
- [ ] `PUT /preorders/:id` updates a full record
- [ ] `PATCH /preorders/:id` updates status only
- [ ] `DELETE /preorders/:id` removes a record
- [ ] Invalid ID → 404, invalid data → 400, server errors → 500

### Tips & Tricks
```bash
curl http://localhost:3000/api/preorders | jq .                       # pretty-print
curl http://localhost:3000/api/preorders > response.json              # save to file
curl -X POST ... -d @payload.json                                      # POST from a file
curl -w "Time: %{time_total}s\n" http://localhost:3000/api/preorders  # measure response time
```

---

## How It Works (Data Flows)

**1. Viewing the list:** User visits `/preorders` → `PreorderList` mounts → `useEffect` calls `GET /api/preorders?page=1&limit=10&filter=all&sort=createdAt_desc` → API filters/sorts/paginates at the database level → component renders the table.

```typescript
useEffect(() => {
  fetchPreorders({ page, limit, filter: currentFilter, sort: currentSort });
}, [page, limit, currentFilter, currentSort]);
```

**2. Filtering/sorting:** Selecting a new filter or sort updates state → triggers a new API call → backend re-queries → table re-renders.

```typescript
let where: Prisma.PreorderWhereInput = {};
if (filter === "active") where.status = "active";
// ...
const preorders = await prisma.preorder.findMany({
  where, orderBy: { name: "asc" }, skip: (page - 1) * limit, take: limit
});
```

**3. Creating a preorder:** Click "Create Preorder" → `/preorders/create` → fill form → submit → client validation → `POST /api/preorders` → record created → success toast → redirect to `/preorders`.

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  const preorder = await prisma.preorder.create({
    data: {
      name: body.name,
      productCount: Number(body.productCount),
      preorderWhen: body.preorderWhen,
      startAt: new Date(body.startAt),
      endAt: new Date(body.endAt),
      status: body.status || "active"
    }
  });
  return NextResponse.json(preorder, { status: 201 });
}
```

**4. Editing:** Click the pencil icon → `/preorders/edit/[id]` → `GET /api/preorders/[id]` fetches existing data → form pre-fills → submit → `PUT /api/preorders/[id]` → success toast → redirect to list.

**5. Toggling status:** Click the status badge → `PATCH /api/preorders/[id]` updates only the `status` field → UI updates optimistically with no page reload.

**6. Deleting:** Click delete → SweetAlert2 confirmation → confirm → `DELETE /api/preorders/[id]` → row removed from the table → success toast → pagination adjusts if the page is now empty.

**7. Paginating:** Click Next/Previous → page state updates → new request with `page=N` → table and pagination controls update.

---

## Component Overview

| Component | File | Purpose | Key Props |
|-----------|------|---------|-----------|
| **PreorderList** | `src/components/PreorderList.tsx` | Table display with filtering, sorting, pagination, row checkboxes, status toggle, edit/delete actions | `preorders`, `currentFilter`, `currentSort`, `pagination`, `onFilterChange`, `onSortChange`, `onPageChange`, `onStatusToggle`, `onDelete`, `onEdit` |
| **PreorderForm** | `src/components/PreorderForm.tsx` | Create/edit form with React Hook Form, validation, loading spinner, error display | `mode` (`create`/`edit`), `initialData`, `onSubmit`, `isLoading` |
| **StatusSwitch** | `src/components/StatusSwitch.tsx` | Toggle switch for Active/Inactive with instant feedback | `status`, `onChange`, `disabled`, `loading` |
| **Pagination** | `src/components/Pagination.tsx` | Previous/Next navigation with disabled boundary states | `currentPage`, `totalPages`, `onPageChange` |

**Form fields** (Create/Edit): Product Name, Product Count, Preorder When (`out-of-stock` / `regardless-of-stock`), Start Date, End Date, Status.

---

## User Guide & Tutorials

### Getting Started
1. `npm run dev`
2. Open `http://localhost:3000` → auto-redirects to `/preorders`
3. First-time visitors see 2 sample preorders

### Tutorial 1 — Create Your First Preorder (~3 min)
1. Go to `/preorders` and click **Create Preorder**
2. Fill in Name, Product Count, Preorder When, Start Date, End Date (Status defaults to Active)
3. Click **Save Changes** — wait for the success toast and automatic redirect
4. Confirm the new row appears at the top of the list, marked Active (green)

### Tutorial 2 — Update an Existing Preorder (~2 min)
1. Find the preorder and click the pencil icon
2. Edit any field (e.g. increase Product Count, extend End Date)
3. Click **Save Changes** and confirm the table reflects your edit
4. Use **Cancel**/**Back** any time to discard changes

### Tutorial 3 — Filter & Sort (~1 min)
1. Use the filter dropdown (All / Active / Inactive) — table updates instantly
2. Use the sort dropdown (e.g. Name A–Z) — table re-sorts instantly
3. Useful combinations: **Active + Name A–Z** to browse active products alphabetically; **All + End Date (Earliest)** to see preorders expiring soonest; **Inactive + Oldest First** to audit stale records

### Tutorial 4 — Manage Status (~30 sec)
Click the status badge directly to toggle Active ↔ Inactive without opening the full edit form — instant, no page reload.

### Tutorial 5 — Delete a Preorder (~30 sec)
Click the trash icon → confirm in the SweetAlert2 dialog → row disappears with a success toast. **This cannot be undone.**

### Advanced Usage
- **Find expiring active preorders:** Filter = Active, Sort = End Date (Earliest)
- **Audit old inactive preorders:** Filter = Inactive, Sort = Oldest First
- **Bulk operations:** checkboxes and select-all currently work visually; bulk delete/status-change/export are planned but not yet wired to actions

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+Enter` | Save form (create/edit page) |
| `Esc` | Cancel form |
| `Tab` | Move between form fields |

### Tips & Best Practices
- Use meaningful names (✅ "iPhone 15 Pro 256GB" vs ❌ "Item 1")
- Set realistic dates — ensure End Date > Start Date, typically a 2–4 week window
- Use the status badge for quick toggles instead of opening the full edit form
- Filter before deleting in bulk to reduce mistakes
- Sort by End Date regularly to catch preorders that need deactivating
- Use the date picker rather than typing dates manually
- Product Count must be a whole number ≥ 1; Preorder When is one of two fixed options

### Rate Limiting (recommended for production)
```typescript
const rateLimit = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const recent = (rateLimit.get(ip) || []).filter(t => now - t < 60000);
  if (recent.length > 100) return false;
  rateLimit.set(ip, [...recent, now]);
  return true;
}
```
---

## Acknowledgments

**Made with ❤️ for the Xubitar Assessment** · **Version 1.0** · Last Updated: June 27, 2026