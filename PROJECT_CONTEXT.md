# PROJECT_CONTEXT.md – Project Context & Overview

## 1. Project Purpose & Vision
**CloudOrder** is a modern full-stack web application designed for managing inventory, viewing product catalogs, and managing orders. It features a role-based dashboard where:
- **Administrators (`admin`)**: Possess full access to inspect, add, and delete products, manage users, and review order analytics.
- **Customers / Regular Users (`user`)**: Possess read-only access to explore the product catalog, view item details, and interact with the storefront.

---

## 2. Technology Stack

### Backend
- **Runtime & Language**: Node.js (v22+), TypeScript (ESM, strict mode)
- **Framework**: Express.js (v5.3+)
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`), password hashing (`bcryptjs`), CORS (`cors`), dotenv (`dotenv`)
- **Execution & Dev Tools**: `tsx` (hot reload / TypeScript runner), `tsc`
- **Data Storage**: Local JSON persistence (`product-data.json` and `users-data.json`) with an abstracted service layer designed for seamless migration to a persistent database (e.g., PostgreSQL / MongoDB) in future phases.

### Frontend
- **Framework**: Next.js (16.4+, App Router)
- **Language**: TypeScript 5+
- **UI & Styling**: React 19, Tailwind CSS 4.3+, PostCSS
- **Linting & Code Quality**: ESLint 9 (`eslint-config-next`)

---

## 3. Environment & Configuration

### Backend Environment Variables (`backend/.env`)
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `PORT` | `5000` | Port for the Express server |
| `NODE_ENV` | `development` | Node environment (`development` / `production`) |
| `JWT_SECRET` | Configured secret | Secret key for signing and verifying JWT tokens |
| `JWT_EXPIRES_IN` | `24h` | Expiration time for generated JWT tokens |
| `PRODUCT_DATA_PATH`| `./product-data.json` | Path to products JSON file |
| `USERS_DATA_PATH` | `./users-data.json` | Path to users JSON file |

### Frontend Environment
- Dev server runs on `http://localhost:3000`
- Configured to consume the backend API at `http://localhost:5000`

---

## 4. Current Development Status
- **Backend Core**: Complete. Express server runs on port 5000.
- **Product Management API**: Implemented. Supports `GET /api/products` (with search, category filter, and pagination), `GET /api/products/:id`, `POST /api/products` (admin-only), and `DELETE /api/products/:id` (admin-only).
- **Authentication & RBAC**: Implemented. Supports `POST /api/auth/register`, `POST /api/auth/login`, and `GET /api/auth/me`. Passwords are encrypted with bcrypt.
- **Frontend App**: Scaffolding complete with Next.js App Router and Tailwind CSS. Frontend-to-backend integration and dashboard UI implementation are upcoming.
