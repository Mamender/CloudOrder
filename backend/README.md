# CloudOrder Backend API

RESTful API built with **Express** and **TypeScript** providing **Authentication (JWT + bcrypt)**, **Role-Based Access Control (RBAC)**, and **Product Management**.

All data is stored in local JSON files:
- Products: `product-data.json`
- Users: `users-data.json`

---

## Folder Structure

```text
backend/
├── src/
│   ├── config/                      # App config & environment variables
│   │   └── index.ts
│   ├── controllers/                 # HTTP controller handlers
│   │   ├── auth.controller.ts       # Register, Login, Me profile
│   │   └── product.controller.ts    # Product CRUD operations
│   ├── middlewares/                 # Middlewares
│   │   ├── auth.middleware.ts       # JWT verify (authenticate) & RBAC (authorize)
│   │   ├── auth-validate.middleware.ts # Register & Login input validation
│   │   ├── validate.middleware.ts   # Product payload validation
│   │   └── error.middleware.ts      # Standardized 404 & 500 error handler
│   ├── routes/                      # Route definitions
│   │   ├── auth.routes.ts           # /api/auth routes
│   │   └── product.routes.ts        # /api/products routes
│   ├── services/                    # Business logic & file operations
│   │   ├── user.service.ts          # User persistence, hashing & token generation
│   │   └── product.service.ts       # Product queries & mutations
│   ├── types/                       # TypeScript interfaces
│   │   ├── express.types.ts
│   │   ├── user.types.ts
│   │   └── product.types.ts
│   ├── app.ts                       # Express application configuration
│   └── server.ts                    # HTTP server bootstrap
├── product-data.json                # Products JSON database
├── users-data.json                  # Users JSON database (passwords hashed)
├── .env
├── .env.example
├── tsconfig.json
└── package.json
```

---

## Default Seed Accounts

| Role | Email | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **admin** | `admin@cloudorder.com` | `admin123` | **Full access**: View, Add (`POST`), and Delete (`DELETE`) products |
| **user** | `user@cloudorder.com` | `user123` | **Read-only**: View products (`GET`) |

---

## Quick Start

```bash
cd backend
npm install
npm run dev
```

Server runs on: `http://localhost:5000`

---

## API Reference

### 1. Authentication Endpoints

#### Register a New User
- **`POST /api/auth/register`**
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "securePassword123",
    "role": "user"  // Optional: 'user' (default) or 'admin'
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Registration successful",
    "data": {
      "user": {
        "id": 3,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "user",
        "createdAt": "...",
        "updatedAt": "..."
      },
      "token": "eyJhbGciOi..."
    }
  }
  ```

#### Login
- **`POST /api/auth/login`**
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "admin@cloudorder.com",
    "password": "admin123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "user": {
        "id": 1,
        "name": "Admin User",
        "email": "admin@cloudorder.com",
        "role": "admin"
      },
      "token": "eyJhbGciOi..."
    }
  }
  ```

#### Get Current Logged-in Profile
- **`GET /api/auth/me`**
- **Headers:** `Authorization: Bearer <TOKEN>`

---

### 2. Product Endpoints (Protected by RBAC)

All product endpoints require `Authorization: Bearer <TOKEN>` header.

| Method | Endpoint | Required Role | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | `user` or `admin` | View all products (supports `?search=`, `?category=`, `?limit=`, `?skip=`) |
| **GET** | `/api/products/:id` | `user` or `admin` | View single product by id |
| **POST** | `/api/products` | **`admin` only** | Create a new product (returns 403 Forbidden for `user`) |
| **DELETE** | `/api/products/:id` | **`admin` only** | Delete a product (returns 403 Forbidden for `user`) |

#### Example: Attempting POST /api/products as a regular `user`:
```json
{
  "success": false,
  "message": "Forbidden: Access requires one of the following roles: [admin]. Your role is 'user'."
}
```
Status: `403 Forbidden`
