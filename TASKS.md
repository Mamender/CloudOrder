# TASKS.md – Development Task Backlog & Tracking

This document tracks all development tasks across the CloudOrder project.

Status values: `PENDING`, `IN PROGRESS`, `DONE`, `BLOCKED`

---

## Task List

| Task ID | Requirement | Title | Status | Description |
| :--- | :--- | :--- | :--- | :--- |
| `TASK-001` | `REQ-001` | Scaffold Backend Architecture | `DONE` | Initialize TypeScript Express backend structure (`src/config`, `src/controllers`, `src/services`, `src/routes`, `src/middlewares`, `src/types`). |
| `TASK-002` | `REQ-001` | Implement Product File Service | `DONE` | Create `ProductService` for reading and writing `product-data.json` with pagination, search, and category filtering. |
| `TASK-003` | `REQ-001` | Implement Product Endpoints & Validation | `DONE` | Implement `GET /api/products`, `GET /api/products/:id`, `POST /api/products`, and `DELETE /api/products/:id` with input validation middleware. |
| `TASK-004` | `REQ-002` | User Persistence & Bcrypt Hashing | `DONE` | Implement `UserService` and `users-data.json` schema with bcrypt password hashing and safe user sanitization. |
| `TASK-005` | `REQ-002` | JWT Authentication & Auth Routes | `DONE` | Implement registration, login, and current user profile endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`). |
| `TASK-006` | `REQ-003` | RBAC Middleware & Route Protection | `DONE` | Create `authenticate` and `authorize` middlewares; restrict `POST` and `DELETE` on products to `admin` role. |
| `TASK-007` | `REQ-004` | Frontend Auth Service & Context | `DONE` | Create API client and authentication context in Next.js frontend to handle login, register, token persistence, and session state. |
| `TASK-008` | `REQ-004` | Frontend Login & Registration UI | `DONE` | Build responsive login and registration pages with validation and error messaging. |
| `TASK-009` | `REQ-004` | Frontend Role-Aware Dashboard | `DONE` | Build dashboard view: product catalog for regular users, and add/delete management capabilities for admins. |
| `TASK-010` | `REQ-005` | Create Root AI Documentation System | `DONE` | Create the 7 root markdown documentation files with verified project context, AI workflow rules, and task registries. |
| `TASK-011` | `REQ-006` | Implement Product Update Endpoint & Service | `DONE` | Add `update` method in `ProductService`, `validateUpdateProduct` middleware, `updateProduct` controller handler, and `PUT`/`PATCH` routes restricted to admin. |
| `TASK-012` | `REQ-006` | Implement Frontend Product Edit UI | `DONE` | Add `updateProduct` API client method, `UpdateProductInput` type, `EditProductModal` component, and Edit button handler in Dashboard. |
