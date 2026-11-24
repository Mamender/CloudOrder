# CODING_STANDARDS.md – Engineering Standards & Conventions

This document establishes the mandatory conventions and technical standards for all code written in the **CloudOrder** project.

---

## 1. General Principles
- **DRY (Don't Repeat Yourself)**: Extract common logic into reusable functions, hooks, or service methods.
- **Single Responsibility**: Each function, component, or class should perform one well-defined task.
- **Fail Fast & Explicitly**: Validate inputs at the boundary (controller/middleware level) before processing.
- **Type Safety**: Strictly avoid `any` in TypeScript; define explicit interfaces, types, and DTOs.

---

## 2. TypeScript Guidelines
- Use explicit types for function parameters, return values, and data transfers.
- Prefer `interface` for object structures and domain entities.
- Prefer `type` for unions, intersections, and mapped types.
- Strict checking options are enabled (`strict: true`, `noImplicitAny: true`).
- Keep types organized in dedicated `src/types/` folders.

```typescript
// Good: Explicit interface and return type
export interface CreateProductDTO {
  title: string;
  price: number;
  category: string;
  stock: number;
}

export async function createProduct(dto: CreateProductDTO): Promise<Product> { ... }
```

---

## 3. Backend Conventions (Node.js & Express)

### Naming Conventions
- **Files**: kebab-case or dot notation describing role (`product.controller.ts`, `auth.middleware.ts`, `user.service.ts`).
- **Variables & Functions**: camelCase (`getProducts`, `validateLogin`, `productService`).
- **Types & Interfaces**: PascalCase (`Product`, `SafeUser`, `TokenPayload`).
- **Constants**: UPPER_SNAKE_CASE (`EMAIL_REGEX`, `DEFAULT_PAGE_SIZE`).

### Request & Response Uniformity
All API responses must follow this standard envelope:

**Success Response:**
```json
{
  "success": true,
  "message": "Action completed successfully",
  "data": { ... }
}
```

**Failure Response:**
```json
{
  "success": false,
  "message": "Invalid credentials or request data",
  "errors": ["Specific field error 1"]
}
```

### HTTP Status Code Usage
- `200 OK`: Successful retrieval or update.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure or malformed payload.
- `401 Unauthorized`: Missing, expired, or invalid authentication token.
- `403 Forbidden`: Authenticated user lacks sufficient permissions (RBAC).
- `404 Not Found`: Requested resource does not exist.
- `409 Conflict`: Resource already exists (e.g., duplicate email during registration).
- `500 Internal Server Error`: Unexpected server exception.

---

## 4. Frontend Conventions (Next.js & React)

### Component Standards
- Place shared UI components in `frontend/components/` and page-specific components in their respective route directories.
- Functional components with TypeScript types:
  ```tsx
  interface ProductCardProps {
    product: Product;
    onDelete?: (id: number) => void;
  }
  
  export function ProductCard({ product, onDelete }: ProductCardProps) { ... }
  ```
- Use React hooks (`useState`, `useEffect`, custom hooks) appropriately; avoid unnecessary state duplication.
- Use Tailwind CSS utility classes; avoid inline styles.

---

## 5. Security & Persistence Standards
- **Passwords**: Always hash using `bcryptjs` with a minimum salt round of 10. Never return password hashes in API responses.
- **Tokens**: Sign tokens with an expiration (`24h`) and include only necessary user claims (`userId`, `email`, `role`).
- **Input Validation**: Never trust raw user inputs. Validate before database/file operations.
- **Atomic File Writing**: When saving to JSON files, ensure JSON syntax is formatted (`JSON.stringify(data, null, 2)`) and write errors are caught and logged.
