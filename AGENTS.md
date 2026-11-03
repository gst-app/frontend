# AGENTS.md

## Strict Adherence

These rules are **mandatory**, not suggestions. Agents must follow every rule in this file exactly as written. If a user request appears to conflict with a rule here, **stop and ask** instead of choosing which to follow. Rules can only be overridden by an explicit, in-session instruction from the user that names the rule being overridden.

---

## File Access Policy

### Core Rule

Agents **must not** read from or write to any file without **explicit permission** from the user or a designated system owner. When in doubt, ask. Never assume access is allowed.

### Sensitive Files: Always Off-Limits Unless Explicitly Permitted

Agents must never access the following without clear, documented permission:

- **Environment files**: `.env`, `.env.local`, `.env.development`, `.env.production`, and any variant
- **Credentials & secrets**: API keys, tokens, certificates (`.pem`, `.key`, `.p12`)
- **Authentication config**: OAuth client secrets, JWT secrets, session secrets
- **Private keys**: SSH keys (`id_rsa`, `id_ed25519`), GPG keys
- **System files**: `/etc/passwd`, `/etc/shadow`, host files, OS-level config
- **CI/CD & deployment config**: pipeline files, hosting config (e.g. Vercel, Netlify), or any file containing credentials
- **User data files**: any file containing PII, health data, financial records (including mock/fixture data copied from real users)

### Build & Dependency Files: Read/Write Only When Explicitly Permitted

These files affect the whole project. Do not read or modify them unless the user names them:

- `package.json`, lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)
- `vite.config.*`, `tsconfig*.json`, `eslint.config.*`, `.eslintrc*`, `.prettierrc*`
- `index.html` (project root)
- `.gitignore`, `.npmrc`

### Before Reading a File

An agent must confirm:

- [ ] The user has explicitly named the file and asked the agent to read it
- [ ] The file is not in the sensitive files list above
- [ ] The purpose of reading is clear and scoped

### Before Writing to a File

An agent must confirm:

- [ ] The user has explicitly instructed the agent to write to that specific file
- [ ] The agent has shown the intended changes to the user before applying them (where possible)
- [ ] The file is not a system, config, build, or credentials file (unless named by the user)
- [ ] A backup or reversible path exists for critical files

### Explicit Permission Requirements

Permission must be:

- **Direct**: the user must name or clearly reference the file
- **In-context**: granted in the current session, not assumed from a past session
- **Scoped**: permission to read does not imply permission to write, and vice versa

> Example of valid permission:
> _"Read the `UserProfile.tsx` file and suggest improvements."_

> Example of invalid assumption:
> _User says "fix the login bug" → agent reads `.env` to find the API URL without being told to._

---

## API & Backend Boundaries

- The backend is **out of scope**. Do not assume, invent, or change anything about it.
- **Never invent** endpoints, request/response shapes, status codes, headers, or auth flows. If the shape of an API is not visible in code you've been permitted to read, **ask the user**.
- **Never change API contracts** on the frontend side (URLs, payload shapes, field names) unless the user explicitly says the backend changed.
- If a frontend change requires a backend change (new endpoint, new field, different response), **say so and describe it** (route, method, payload, response). Do not act on it. Let the user decide.
- **No real network calls** during development tasks (fetching from live or shared APIs, hitting production, running scripts that call external services) unless explicitly instructed.
- Do not hard-code API URLs, keys, or tokens. If an environment variable is needed, **tell the user the name and purpose** and let them add it.

---

## Environment Variables

- Anything prefixed with `VITE_` is **bundled into the client and publicly visible**. Never put secrets, private keys, or tokens in a `VITE_` variable, and flag it if you see one.
- Never create, edit, or print `.env` files. Describe the variable (name, purpose, example format) and let the user add it.
- Do not reference an environment variable unless you have confirmed it exists, or the user has told you its name.

---

## Output & Reporting

- **Always output the code changes you made.** After every task, show each changed file with a clear diff or the full modified section.
- State the **file path** for every change.
- Briefly explain **what changed and why**, in plain language.
- List any files you **created or deleted**.
- If you ran any commands, list them and their results.
- If you did **not** run tests, linting, a type-check, or a build, or could not verify something in the browser, say so. Never imply a change was verified when it wasn't.

---

## Keep It Simple

- **Do not overcomplicate solutions.** Choose the simplest approach that satisfies the request.
- Do not add abstractions, layers, patterns, or configuration that were not asked for. This includes extra custom hooks, context providers, HOCs, wrapper components, and generic "reusable" components that have only one use.
- Prefer built-in React state (`useState`, `useReducer`, props) before reaching for anything heavier. Do not introduce a state management or data-fetching library unless the project already uses one or the user asks.
- Do not add `useMemo`, `useCallback`, or `React.memo` as a default. Only add them when there is a known, stated performance reason.
- Do not refactor unrelated code. Keep changes **minimal and scoped** to the request.
- Do not add new dependencies or packages without asking first.
- Follow the project's **existing conventions**: folder structure, file and component naming, import style, styling approach, and routing setup. Don't introduce new styles.
- If a simple solution has trade-offs, mention them briefly and let the user decide. Don't silently build the complex version.

---

## UI & Styling

- Use the project's **existing styling approach** (e.g. CSS modules, Tailwind, styled-components, plain CSS). Do not mix in a second approach, and do not add a UI component library without asking.
- Reuse existing components, tokens, and utilities before creating new ones. If you are unsure whether one exists, **ask**.
- Do not hard-code colors, spacing, or fonts if the project has a theme or design tokens.
- Keep markup accessible: semantic elements, `alt` text on images, labels on form controls, keyboard-reachable interactive elements.
- Do not change the visual design of existing screens unless the request says to.

---

## Testing Policy

The type of test depends on the type of code being tested. Use the project's **existing test setup and conventions**. Do not install or switch test tooling without asking.

### Components & Pages → Component Tests

Components and pages that render UI should be tested from the **user's perspective** (what is rendered, what happens on interaction), not by testing implementation details such as internal state or private functions.

- Do **not** snapshot-test large trees.
- Mock only true external boundaries (e.g. network requests). Do not mock child components just to make a test easier.

### Hooks, Utilities & Helpers → Unit Tests

Custom hooks, formatters, validators, mappers, and other pure helpers must be covered by **unit tests**.

- Keep them isolated and fast.
- Mock only true external boundaries when necessary.

### End-to-End Tests

- Do not write or run end-to-end tests unless the user explicitly asks.

### General Testing Rules

- Do not write tests unless asked, or unless the task clearly includes them.
- Do not modify or delete existing tests to make them pass.
- Do not run tests that hit production or shared environments.
- If you're unsure which test type applies, **ask**.

---

## No Hallucination — Ask When Confused

- **Never guess or invent**: APIs, component props, hook signatures, library methods, config options, routes, file paths, environment variables, translation keys, CSS class names, or package versions.
- If something is not visible in the code you've been permitted to read, **say you don't know**. Do not fabricate it.
- **Always ask when confused**, whether the requirement is ambiguous, multiple approaches are possible, or context is missing (for example: unclear design, missing API shape, unknown component to reuse).
- Ask **before** acting, not after. A short clarifying question is always better than a wrong assumption.
- Clearly separate **facts** (from the code or user) from **assumptions**. Label assumptions as such.
- If you cannot complete the task within these rules, say so and explain what's blocking you.

---

## Additional Safeguards

- **No git operations** (commit, push, merge, rebase, reset, branch deletion) unless explicitly instructed.
- **No installing, updating, or removing packages** (`npm install`, `npm update`, `npm uninstall`, or the yarn/pnpm equivalents) unless explicitly instructed.
- **No running scripts** (`dev`, `build`, `lint`, `test`, `preview`, or any custom script) unless the user asks or the task clearly includes it. Report which ones you ran.
- **No deleting or renaming files** unless explicitly instructed.
- **No destructive or irreversible shell commands** (`rm -rf`, force operations, overwriting data) without explicit instruction.
- **No network calls, external API requests, or deployments** unless explicitly instructed.
- **Never expose secrets**: do not print, log, echo, or hard-code credentials, tokens, or keys in code, output, or tests. Do not leave `console.log` statements containing user data or tokens.
- **No scope creep**: if you notice other issues (bugs, security problems, accessibility gaps, tech debt, unused code), **report them**, but do not fix them unless asked.
- **One task at a time**: do not start unrequested work after finishing the requested task.
- **Confirm before large changes**: if a task will touch many files, change routing, or change core behavior, propose a plan first and wait for approval.
- **Preserve existing behavior**: do not change public interfaces, component props, exported function signatures, route paths, or shared types without asking.

---

## When Unsure

If an agent is uncertain whether it has permission to do something, or about any rule in this file, it must:

1. **Stop** and not proceed with the operation
2. **Ask** the user explicitly what is permitted
3. **Wait** for a clear response before continuing

---

## Violations

Any agent action that breaks a rule in this file (including reading, writing, modifying, or deleting a file without explicit permission, installing a package without instruction, or running a script without instruction) is a policy violation and **must be flagged immediately** in the session output, with a description of what happened and how to reverse it.
