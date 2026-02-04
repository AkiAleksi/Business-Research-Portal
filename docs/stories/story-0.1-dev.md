# Story 0.1: Project Initialization

Status: completed

## Story

As a **developer**,
I want **a properly configured Next.js project with all dependencies**,
so that **I have a solid foundation to build the application**.

## Acceptance Criteria

1. Next.js 14+ with App Router is configured
2. TypeScript configuration is set up
3. Tailwind CSS is installed and configured
4. ESLint and Prettier are configured
5. Environment variables template (.env.example) exists
6. `npm run dev` starts the development server successfully
7. `npm run build` completes without errors

## Tasks / Subtasks

- [x] Task 1: Create Next.js project (AC: #1, #2, #3, #4)
  - [x] Run `npx create-next-app@latest` with correct flags
  - [x] Verify TypeScript, Tailwind, App Router enabled

- [x] Task 2: Install CopilotKit packages (AC: #6, #7)
  - [x] `npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime`

- [x] Task 3: Install additional dependencies (AC: #6, #7)
  - [x] `npm install lucide-react`
  - [x] `npm install next-auth`

- [x] Task 4: Create environment template (AC: #5)
  - [x] Create `.env.example` with all required variables
  - [x] Create `.env.local` for local development

- [x] Task 5: Verify build (AC: #6, #7)
  - [x] Run `npm run dev` - verify starts successfully
  - [x] Run `npm run build` - verify completes without errors

## Dev Notes

### Initialization Commands

```bash
# 1. Navigate to project root (Desktop)
cd ~/Desktop/business-research-portal

# 2. Create Next.js app IN current directory
npx create-next-app@latest . \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# 3. Install CopilotKit
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime

# 4. Install other dependencies
npm install lucide-react next-auth
```

### Environment Variables Required

```bash
# .env.example
# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Claude AI
ANTHROPIC_API_KEY=

# Optional: CopilotKit Cloud
COPILOTKIT_API_KEY=
```

### Project Structure Notes

After initialization, the project structure should be:

```
business-research-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/           # (create manually)
├── public/
├── .env.example       # (create)
├── .env.local         # (create, gitignored)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

### References

- [Source: docs/architecture.md#Initialization Commands]
- [Source: docs/architecture.md#Tech Stack]
- [Source: docs/prd.md#Tech Stack]

## Dev Agent Record

### Agent Model Used

_To be filled by Dev agent_

### Completion Notes List

_To be filled by Dev agent_

### File List

_To be filled by Dev agent after implementation_
