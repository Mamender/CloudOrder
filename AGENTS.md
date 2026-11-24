# AGENTS.md – Mandatory AI Instructions

Welcome to the **CloudOrder** project. All AI coding assistants working on this repository must strictly adhere to the rules, workflow, and standards defined in this document.

---

## 1. Mandatory Development Workflow

Every new feature, enhancement, and significant bug fix must follow this exact sequence:

```text
UNDERSTAND ➔ DOCUMENT REQUIREMENT ➔ CREATE TASKS ➔ PLAN ➔ WAIT FOR APPROVAL ➔ IMPLEMENT ➔ TEST ➔ UPDATE DOCUMENTATION
```

If the user asks a question or requests an explanation, answer normally and concisely without unnecessarily creating development tasks.

---

## 2. Core Rules

### Rule 1: Always Plan Before Coding
Whenever the user provides a new requirement:
1. **Understand** the requirement completely.
2. **Inspect** the existing codebase and implementation.
3. **Identify** all impacted files and modules.
4. **Prepare** a detailed but concise implementation plan.
5. **Explain** the proposed technical approach, trade-offs, and potential risks.
6. **Wait for explicit user approval.**

> [!CAUTION]
> **Never write, modify, or delete application code without explicit user approval.**  
> Discussions, suggestions, exploratory answers, or questions do NOT count as approval.

---

### Rule 2: Follow Existing Architecture
- Respect and maintain the existing project architecture (frontend in `frontend/`, backend in `backend/`).
- Utilize and build reusable components, hooks, services, and utility functions.
- Avoid duplicate code and adhere to DRY principles.
- Apply SOLID principles and strict separation of concerns.
- Keep frontend and backend responsibilities cleanly separated.
- Maintain consistent naming conventions across the full stack.
- Do not introduce unnecessary dependencies or libraries.
- **Never change architectural patterns without discussing and agreeing with the user first.**

---

### Rule 3: Maintain Requirements
Whenever a new requirement is introduced:
- Add it to [REQUIREMENTS.md](file:///Users/mshaw/cloudorder/REQUIREMENTS.md).
- Assign a unique ID using the format `REQ-XXX` (e.g., `REQ-001`, `REQ-002`).
- Include a clear requirement description.
- Define precise, verifiable acceptance criteria.
- Record priority (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`) and initial status (`PENDING`).
- Link and generate corresponding tasks in [TASKS.md](file:///Users/mshaw/cloudorder/TASKS.md).

> [!NOTE]
> Every newly introduced requirement must initially be marked as `PENDING`.

---

### Rule 4: Maintain Tasks
- Break down every requirement into actionable development tasks.
- Assign a unique ID using the format `TASK-XXX` (e.g., `TASK-001`, `TASK-002`).
- Permitted task statuses:
  - `PENDING`
  - `IN PROGRESS`
  - `DONE`
  - `BLOCKED`
- Continuously update task statuses throughout development.
- **Never mark a task `DONE` unless both implementation and verification (build, lint, tests) have succeeded.**
- **Never remove completed tasks.** Keep the full historical record intact.

---

### Rule 5: Implementation Standards
- Write clean, maintainable, production-ready code.
- Enforce strict TypeScript across both frontend and backend.
- Favor reusable modules over copy-pasting or parallel logic.
- Follow existing folder conventions (`src/controllers/`, `src/services/`, `src/middlewares/`, `app/`, etc.).
- Implement robust input validation and centralized error handling.
- Uphold security (password hashing, JWT verification, RBAC) and performance best practices.
- Avoid scope creep and unnecessary refactoring.
- Do not modify unrelated functionality.
- Write or update tests where applicable.

---

### Rule 6: After Completing a Task
Once an implementation step is complete:
1. Run relevant automated test suites.
2. Run lint checks.
3. Run build/typecheck checks where applicable (e.g., `tsc --noEmit`, `next build`).
4. Update task status in [TASKS.md](file:///Users/mshaw/cloudorder/TASKS.md).
5. Update requirement status in [REQUIREMENTS.md](file:///Users/mshaw/cloudorder/REQUIREMENTS.md).
6. Record detailed changes in [CHANGELOG.md](file:///Users/mshaw/cloudorder/CHANGELOG.md).
7. Update [ARCHITECTURE.md](file:///Users/mshaw/cloudorder/ARCHITECTURE.md) if structural or design decisions were altered.
8. Report all modified files with clickable markdown links (`file:///...`).
9. Summarize verification results to the user.
10. Explicitly mention any remaining pending or blocked work.

> [!IMPORTANT]
> If verification fails, do NOT mark the task `DONE`. Fix all issues or set the status to `BLOCKED` with an explanation.

---

## 3. Context Preservation Rules
- **Always read `AGENTS.md` before starting development.**
- Treat the project's root Markdown documentation as the authoritative, persistent source of truth.
- Do not rely solely on transient conversation history.
- Ensure documentation remains strictly synchronized with actual code.
- If a conflict arises between documentation and codebase, investigate and report it to the user.
- Never silently discard existing requirements or decisions.
