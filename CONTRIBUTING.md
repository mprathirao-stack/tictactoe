# Contributing

Thanks for helping improve this project! This guide covers how to get set up and submit changes.

## Getting started

This project uses [Bun](https://bun.sh) as the package manager and [Vite](https://vitejs.dev) for the dev server.

```bash
bun install
bun run dev       # start the dev server
bun run build     # type-check and build for production
bun run lint      # run Oxlint
bun run preview   # preview the production build
```

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Base UI primitives)
- Oxlint

## Project structure

- `src/` — application source code
- `public/` — static assets
- `dist/` — production build output (generated, not committed)

## Making changes

1. Create a branch off `main` for your change (e.g. `fix/board-reset-bug`, `feat/score-tracker`).
2. Keep changes focused — one feature or fix per pull request.
3. Run `bun run lint` and `bun run build` before opening a PR to catch type and lint errors.
4. Write clear commit messages describing *why* the change was made, not just what changed.

## Submitting a pull request

1. Push your branch and open a PR against `main`.
2. Fill in a short description of the change and how you tested it.
3. Link any related issues.
4. Be responsive to review feedback — small follow-up commits are fine.

## Code style

- Follow the existing formatting and component patterns used in `src/`.
- Prefer editing existing components over introducing new abstractions unless the change clearly warrants it.
- Run `oxlint` (`bun run lint`) before submitting; fix warnings where reasonable.
