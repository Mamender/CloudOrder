# CHANGELOG.md – Project Change History

All notable changes, architectural decisions, and verification records for the **CloudOrder** project are documented here.

Format: Chronological, grouped by release/phase with requirement and task references.

---

## [Unreleased]

### Added
- **Backend Product Update Endpoint**:
  - Added `update(id, updates)` in `ProductService` updating `meta.updatedAt` and persisting to `product-data.json`.
  - Added `validateUpdateProduct` middleware in `validate.middleware.ts` to validate update request payload.
  - Added `updateProduct` controller in `product.controller.ts`.
  - Registered `PUT /api/products/:id` and `PATCH /api/products/:id` in `product.routes.ts` protected by `authenticate` and `authorize(['admin'])`.
- **Frontend Product Edit Interface**:
  - Added `UpdateProductInput` type definition in `frontend/types/index.ts`.
  - Added `api.updateProduct(id, payload)` client method in `frontend/lib/api.ts`.
  - Created `EditProductModal` component in `frontend/components/EditProductModal.tsx`.
  - Added "Edit" action button to `ProductCard` for admins and hooked up update state flow in `DashboardPage`.

---
### 2026-11-24 – Frontend Dashboard & Authentication Integration
- **Requirements**: `REQ-004`
- **Tasks**: `TASK-007`, `TASK-008`, `TASK-009`
- **Changes**:
  - Created [types/index.ts](file:///Users/mshaw/cloudorder/frontend/types/index.ts) defining user, role, product, API envelope, and DTO interfaces.
  - Implemented [lib/api.ts](file:///Users/mshaw/cloudorder/frontend/lib/api.ts) with typed fetch wrapper, Bearer token injection, and error extraction.
  - Implemented [context/AuthContext.tsx](file:///Users/mshaw/cloudorder/frontend/context/AuthContext.tsx) managing token persistence, session restore, login, registration, and logout.
  - Built [app/(auth)/login/page.tsx](file:///Users/mshaw/cloudorder/frontend/app/(auth)/login/page.tsx) with email/password validation and quick demo login fills.
  - Built [app/(auth)/register/page.tsx](file:///Users/mshaw/cloudorder/frontend/app/(auth)/register/page.tsx) with validation and role selection (`user` / `admin`).
  - Built [app/dashboard/page.tsx](file:///Users/mshaw/cloudorder/frontend/app/dashboard/page.tsx) with real-time search, category filters, and role-based access control.
  - Created reusable components: [Navbar.tsx](file:///Users/mshaw/cloudorder/frontend/components/Navbar.tsx), [ProductCard.tsx](file:///Users/mshaw/cloudorder/frontend/components/ProductCard.tsx), [AddProductModal.tsx](file:///Users/mshaw/cloudorder/frontend/components/AddProductModal.tsx), and [Alert.tsx](file:///Users/mshaw/cloudorder/frontend/components/Alert.tsx).
- **Verification**: ESLint and TypeScript checks passed with 0 errors. Protected route redirect and API client contracts verified against backend response envelopes.

---

### 2026-11-24 – Project AI Documentation System Setup
- **Requirements**: `REQ-005`
- **Tasks**: `TASK-010`
- **Changes**:
  - Established root-level documentation system:
    - [AGENTS.md](file:///Users/mshaw/cloudorder/AGENTS.md): Mandatory workflow (`UNDERSTAND ➔ DOCUMENT ➔ TASK ➔ PLAN ➔ APPROVE ➔ IMPLEMENT ➔ TEST ➔ DOCS`), planning rules, and verification requirements.
    - [PROJECT_CONTEXT.md](file:///Users/mshaw/cloudorder/PROJECT_CONTEXT.md): Project overview, business objectives, full technology stack, and environment specifications.
    - [ARCHITECTURE.md](file:///Users/mshaw/cloudorder/ARCHITECTURE.md): System architecture diagram, directory layout, backend layers, and frontend architecture design.
    - [CODING_STANDARDS.md](file:///Users/mshaw/cloudorder/CODING_STANDARDS.md): TypeScript rules, API response formats, HTTP status code usage, and security practices.
    - [REQUIREMENTS.md](file:///Users/mshaw/cloudorder/REQUIREMENTS.md): Requirements registry (`REQ-001` through `REQ-005`) with priorities and acceptance criteria.
    - [TASKS.md](file:///Users/mshaw/cloudorder/TASKS.md): Development backlog with clear task statuses.
    - [CHANGELOG.md](file:///Users/mshaw/cloudorder/CHANGELOG.md): Initial historical changelog.
- **Verification**: All documentation cross-checked against backend source code and package configurations. No application code altered.

---

### 2026-11-24 – Authentication & Role-Based Access Control (RBAC)
- **Requirements**: `REQ-002`, `REQ-003`
- **Tasks**: `TASK-004`, `TASK-005`, `TASK-006`
- **Changes**:
  - Added dependencies: `jsonwebtoken`, `bcryptjs`, and their `@types/*` dev dependencies.
  - Created `users-data.json` storing user records with bcrypt hashed passwords and roles (`admin`, `user`).
  - Created [user.service.ts](file:///Users/mshaw/cloudorder/backend/src/services/user.service.ts) handling registration, authentication, safe user sanitization, and JWT signing.
  - Implemented [auth.controller.ts](file:///Users/mshaw/cloudorder/backend/src/controllers/auth.controller.ts) for `register`, `login`, and `getMe`.
  - Implemented [auth.middleware.ts](file:///Users/mshaw/cloudorder/backend/src/middlewares/auth.middleware.ts) providing `authenticate` and `authorize(allowedRoles)`.
  - Protected product management routes: `POST /api/products` and `DELETE /api/products/:id` restricted to `admin` role; `GET /api/products` accessible to both `user` and `admin`.
- **Verification**: Automated test script verified password hashing, login token generation, role verification, duplicate email rejection (409), and RBAC rejection (403). TypeScript check passed with 0 errors.

---

### 2026-11-24 – Product Management API & File Persistence
- **Requirements**: `REQ-001`
- **Tasks**: `TASK-001`, `TASK-002`, `TASK-003`
- **Changes**:
  - Configured Express 5 with TypeScript in `backend/` using ECMAScript modules (`"type": "module"`).
  - Created modular folder layout: `src/config`, `src/controllers`, `src/middlewares`, `src/routes`, `src/services`, `src/types`.
  - Implemented `ProductService` reading/writing [product-data.json](file:///Users/mshaw/cloudorder/backend/product-data.json).
  - Created endpoints: `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `DELETE /api/products/:id`.
  - Added input validation middleware (`validateCreateProduct`) and global error handler.
- **Verification**: End-to-end service test confirmed retrieval, pagination, creation with auto-increment ID, and deletion.
