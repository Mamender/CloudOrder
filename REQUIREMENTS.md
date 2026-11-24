# REQUIREMENTS.md – User Requirements Registry

This document tracks all project requirements, acceptance criteria, priorities, and implementation statuses.

---

## Requirements Registry

### REQ-001: Product Data Management API
- **Priority**: HIGH
- **Status**: DONE
- **Description**: Provide RESTful API endpoints in Node/Express with TypeScript to retrieve, create, and delete products persisted in `product-data.json`.
- **Acceptance Criteria**:
  - `GET /api/products`: Returns list of products with optional query filtering (`search`, `category`, `limit`, `skip`).
  - `GET /api/products/:id`: Returns single product by numeric ID.
  - `POST /api/products`: Validates input and creates a new product with auto-generated ID.
  - `DELETE /api/products/:id`: Removes product from `product-data.json` by ID.
  - Errors handled with proper HTTP status codes.
- **Related Tasks**: `TASK-001`, `TASK-002`, `TASK-003`

---

### REQ-002: User Authentication & JSON Persistence
- **Priority**: CRITICAL
- **Status**: DONE
- **Description**: Provide user registration, login, and profile lookup using bcrypt password hashing and JWT authentication, persisting data in `users-data.json`.
- **Acceptance Criteria**:
  - `POST /api/auth/register`: Validates user inputs (name, email, password min 6 chars) and hashes passwords with bcrypt. Prevents duplicate emails (409 Conflict).
  - `POST /api/auth/login`: Verifies email and password; returns JWT token on success.
  - `GET /api/auth/me`: Returns sanitized user profile for authenticated user.
  - Pre-seeded accounts for testing (`admin@cloudorder.com` / `admin123` and `user@cloudorder.com` / `user123`).
- **Related Tasks**: `TASK-004`, `TASK-005`

---

### REQ-003: Role-Based Access Control (RBAC)
- **Priority**: CRITICAL
- **Status**: DONE
- **Description**: Enforce role-based access control where `admin` has full access to manage products and regular `user` has read-only access.
- **Acceptance Criteria**:
  - Authenticated `user` and `admin` can view products (`GET /api/products`, `GET /api/products/:id`).
  - Only authenticated `admin` can add products (`POST /api/products`) or delete products (`DELETE /api/products/:id`).
  - Standard users attempting POST/DELETE receive `403 Forbidden`.
  - Unauthenticated requests receive `401 Unauthorized`.
- **Related Tasks**: `TASK-006`

---

### REQ-004: Frontend Dashboard & Authentication Integration
- **Priority**: HIGH
- **Status**: DONE
- **Description**: Build a responsive Next.js frontend application featuring Login, Registration, Product Catalog browsing for users, and an Admin Product Management panel connected to the Express backend.
- **Acceptance Criteria**:
  - Login page (`/login`) connected to `POST /api/auth/login`.
  - Registration page (`/register`) connected to `POST /api/auth/register` with role selection or defaults.
  - Authentication state management (`AuthContext`) storing JWT in browser storage and providing user profile & logout.
  - Protected Dashboard (`/dashboard`) that automatically redirects unauthenticated users to `/login`.
  - Role-based UI rendering:
    - Standard `user`: Catalog view with search & category filters.
    - `admin`: Catalog view + "Add Product" modal/form + "Delete Product" action.
  - Proper error feedback, alerts, validation, and loading indicators.
- **Related Tasks**: `TASK-007`, `TASK-008`, `TASK-009`

---

### REQ-005: Project-Level AI Documentation System
- **Priority**: HIGH
- **Status**: DONE
- **Description**: Establish a centralized documentation and context management system at the root of the CloudOrder project to ensure all AI assistants follow strict planning, architecture, task tracking, and quality standards.
- **Acceptance Criteria**:
  - Seven markdown files created at project root (`AGENTS.md`, `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, `CODING_STANDARDS.md`, `REQUIREMENTS.md`, `TASKS.md`, `CHANGELOG.md`).
  - Mandatory AI rules and planning workflow incorporated.
  - Existing implementation audited and documented.
  - No application code modified without prior approval.
- **Related Tasks**: `TASK-010`

---

### REQ-006: Product Update API & Frontend Edit UI
- **Priority**: HIGH
- **Status**: DONE
- **Description**: Provide RESTful API endpoint in Express backend to update existing product data in `product-data.json`, and frontend edit interface for administrators.
- **Acceptance Criteria**:
  - `PUT /api/products/:id` (and `PATCH /api/products/:id`): Updates fields of an existing product.
  - Restricted to authenticated `admin` users via RBAC.
  - Validates numeric ID and body payload.
  - Automatically updates `meta.updatedAt` timestamp.
  - Returns `404 Not Found` if product ID does not exist, `400 Bad Request` for invalid input, and `200 OK` on success.
  - Frontend provides `Edit` button for admins on product cards with pre-filled `EditProductModal` and real-time list update.
- **Related Tasks**: `TASK-011`, `TASK-012`
