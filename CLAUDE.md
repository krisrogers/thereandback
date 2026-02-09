# CLAUDE.md — There & Back

## Project Overview

**There & Back** is a quest-based learning and adventure tracker inspired by fantasy RPG mechanics. It gamifies personal growth through quests, XP, avatar progression, and reflection-based journaling. The app is entirely client-side with no backend.

## Tech Stack

- **Framework**: Nuxt 3 (Vue 3 meta-framework), SSR disabled (SPA mode)
- **Language**: TypeScript 5
- **Styling**: Single custom CSS file (`assets/css/main.css`) with CSS variables, dark theme, fantasy aesthetic
- **State Management**: Vue 3 Composition API via `useApp()` composable with localStorage persistence
- **Build**: Vite (via Nuxt), static site generation
- **Deployment**: GitHub Pages via GitHub Actions (push to `main`)
- **Node version**: 20 (specified in CI)

## Project Structure

```
thereandback/
├── pages/
│   └── index.vue              # Single-page app entry point
├── components/                # Vue 3 SFCs (15 components)
│   ├── AppHeader.vue          # Top bar with avatar and XP display
│   ├── AppNavigation.vue      # View switcher (Realms/Tree/Logbook/Progress)
│   ├── Avatar.vue             # Full avatar display with progression stages
│   ├── AvatarMini.vue         # Compact avatar for header
│   ├── CustomQuestModal.vue   # Multi-step form for user-created quests
│   ├── EntryDetailModal.vue   # View completed quest details
│   ├── Logbook.vue            # Journal of completed quests
│   ├── ParticleBackground.vue # Animated background effect
│   ├── ProgressView.vue       # XP and realm statistics dashboard
│   ├── QuestBoard.vue         # Available quests for a subsection
│   ├── QuestImage.vue         # Quest illustration renderer
│   ├── QuestModal.vue         # Quest completion form
│   ├── RealmSelect.vue        # Top-level realm picker (5 realms)
│   ├── SkillTree.vue          # SVG-based visual quest/subsection tree
│   └── SubsectionSelect.vue   # Subsection picker within a realm
├── composables/
│   ├── constants.ts           # All data definitions, types, and helper functions
│   └── useApp.ts              # Global state composable (entries, XP, level)
├── assets/css/
│   └── main.css               # All styles (~1600 lines), CSS custom properties
├── nuxt.config.ts             # Nuxt configuration (SSR off, base URL, fonts)
├── tsconfig.json              # Extends Nuxt-generated tsconfig
├── package.json               # Dependencies and scripts
└── .github/workflows/
    └── deploy.yml             # CI/CD: build + deploy to GitHub Pages
```

## Key Commands

```bash
npm install          # Install dependencies (runs nuxt prepare via postinstall)
npm run dev          # Start development server (Vite HMR)
npm run build        # Production build
npm run generate     # Static site generation (outputs to .output/public)
npm run preview      # Preview the generated static site
```

## Architecture & Key Concepts

### Data Model

All domain data is defined in `composables/constants.ts`:

- **Sections (Realms)**: 5 themed areas (Workshop, Wilds, Shire, Hearth, Library)
- **Subsections**: 5 skill areas per realm (25 total)
- **Tiers**: 5 difficulty levels (Wanderer 10XP → Guide 200XP)
- **Types**: 8 quest activity types (observation, practice, experiment, build, project, expedition, service, teaching)
- **Quests**: 10 pre-built quests; users can also create custom quests
- **Entry**: A completed quest record with responses, evidence (base64 images), and notes

### State Management

`composables/useApp.ts` exports the `useApp()` composable which provides:
- `entries` — reactive array of all completed quests
- `addEntry()` / `deleteEntry()` — mutate entries
- `totalXP`, `level`, `xpInLevel`, `xpProgress` — computed XP metrics
- `stage` — current avatar progression stage

State is persisted to localStorage under key `thereAndBack_v5`. The composable uses module-level refs for global singleton state.

### Navigation / Views

The app is a single page (`pages/index.vue`) with four views toggled via `AppNavigation`:
1. **Realms** — Browse realms → subsections → quest board
2. **Skill Tree** — SVG visualization of all realms and subsections
3. **Logbook** — Chronological list of completed quests
4. **Progress** — XP stats, realm exploration metrics, avatar display

### Styling Conventions

- Dark theme with gold accent (`--gold: #fbbf24`)
- Fonts: Cinzel (headings), Crimson Text (body) — loaded from Google Fonts
- Mobile-first layout, max-width 480px
- Heavy use of CSS animations (float, shimmer, slide-up, bounce-in)
- All styles in a single `main.css` file using BEM-like class naming

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `NUXT_APP_BASE_URL` | Base URL path for GitHub Pages deployment | `/` |

## CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`):
- Triggers on push to `main` or manual dispatch
- Builds with Node 20, runs `npm run generate`
- Deploys `.output/public` to GitHub Pages

## Development Notes

- **No test framework** is configured. There are no unit or integration tests.
- **No linter/formatter** is configured (no ESLint, Prettier, etc.).
- **No backend or database** — all data lives in the browser's localStorage.
- **No authentication** — single-user, single-device app.
- Evidence images are stored as base64 strings directly in localStorage entries.
- The TypeScript config extends Nuxt's auto-generated tsconfig (`.nuxt/tsconfig.json`), so run `npm run postinstall` (or `npx nuxt prepare`) after cloning to generate types.

## Conventions for AI Assistants

- Keep the app client-side only; do not introduce server-side dependencies or APIs.
- Follow the existing Vue 3 Composition API + `<script setup lang="ts">` pattern in all components.
- All domain constants and types belong in `composables/constants.ts`.
- Shared reactive state goes through `useApp()` in `composables/useApp.ts`.
- Styles go in `assets/css/main.css` using existing CSS variable tokens.
- Maintain the fantasy/RPG naming and theming throughout UI text and code.
- Components are flat (no subdirectories); keep them in `components/`.
- The app targets mobile-first; test layouts at 480px width.
