# GST Frontend

A React and TypeScript frontend built with Vite.

## Requirements

- Node.js 24.x
- pnpm 12.14.x

The repository specifies pnpm 12.14.0 through the `packageManager` field in
`package.json`.

## Setup

Install dependencies, create the environment files, and start the development
server:

```bash
pnpm install
cp .env.example .env
cp .env.example .env.local
pnpm dev
```

Set `VITE_API_BASE_URL` to configure the API base URL. Use `.env.local` for
developer-specific local values. The `.env` and `.env.local` files are ignored
and must not be committed. `.env.example` is the tracked environment template.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the Vite development server with hot module replacement. |
| `pnpm build` | Runs TypeScript validation and creates the production bundle. |
| `pnpm lint` | Runs Oxlint. |
| `pnpm format` | Formats supported files with Oxfmt. |
| `pnpm format:check` | Checks formatting without modifying files. |
| `pnpm preview` | Serves the production build locally after `pnpm build`. |
| `pnpm prepare` | Initializes Husky after dependency installation. |

## Git hooks and commit conventions

The pre-commit hook in `.husky/pre-commit` runs `pnpm lint-staged`. Staged
`js`, `jsx`, `ts`, and `tsx` files are processed with `oxlint --fix` and
`oxfmt`.

The commit-msg hook in `.husky/commit-msg` runs Commitlint against the commit
message. Commitlint extends `@commitlint/config-conventional`.

Commit messages use the following format:

```text
type(scope): subject
```

The scope is optional, and the subject comes after the colon. For example:

```text
feat: add account settings
feat(chore): update project dependencies
fix(auth): handle expired sessions
docs: update project setup
```

Configured commit rules are:

- Supported types include `feat`, `fix`, `chore`, `docs`, `style`, `refactor`,
  `perf`, `test`, `build`, `ci`, and `revert`.
- The subject must be lowercase.
- The subject must be no longer than 100 characters.
- Commit body lines must be no longer than 200 characters.

## Folder structure

The project is organized for scalable feature development:

```text
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── ui/
│   ├── config/
│   ├── features/
│   │   └── auth/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── stores/
│   ├── test/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   ├── providers.tsx
│   └── router.tsx
├── .env.example
├── components.json
├── package.json
├── pnpm-lock.yaml
├── tsconfig*.json
└── vite.config.ts
```
