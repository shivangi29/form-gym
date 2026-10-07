# FORM Gym — complete source export

React 19 + TypeScript fitness web application. Uses Vinext 1.0.0-beta.5 (Next.js-compatible App Router APIs on Vite 8), Tailwind CSS 4, Cloudflare Workers and D1 (SQLite). It is **not a static HTML site** and is not a conventional `next build` deployment.

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Training, library, nutrition, progress and profile screens |
| `app/globals.css`, `app/layout.tsx` | Styling, page shell and metadata |
| `app/api/data/route.ts` | Authenticated reads and writes, input validation, per-user queries |
| `components/` | Exercise photos, videos, muscle maps, preparation, nutrition, monthly calendar and reminders |
| `lib/training.ts`, `lib/exercise-catalog.ts` | Plans, machine/free alternatives and exercise catalogue |
| `lib/preparation.ts`, `lib/weekly-meals.ts` | Warmups, stretches and seven-day meal choices |
| `lib/progress.ts` | Date and streak calculations |
| `lib/identity.ts` | Current Sites identity; replaced for external hosting |
| `lib/form-videos.json` | 17 source-checked NASM YouTube mappings |
| `db/` | D1 connection and Drizzle schema |
| `drizzle/` | Versioned SQLite migrations; apply in order |
| `public/exercises/` | Included exercise photos, attribution and licences |
| `deployment/` | Cloudflare/Supabase conversion templates and instructions |
| `tests/` | Streak/date regression checks |
| `package.json`, `pnpm-lock.yaml` | Dependency versions and install/build commands |
| `build/`, `scripts/`, `vite.config.ts` | Original Sites build integration |

## Features and exact limits

- 77 library exercises with photos, muscle maps and suitable alternatives. Broad anatomy regions are illustrative, not activation measurements.
- Separate warmup and stretching guides (10 and 8 movement options).
- 30, 45, 60 and 90 minute budgets. Recovery sessions remain shorter.
- Goal emphasis: general fitness, fat loss, strength. This changes advice, not a clinical prescription or advanced periodization.
- Profile-specific plan explanation and links to the ACSM review.
- Date-based workout/movement logs, monthly calendar, current/best **activity** streaks, monthly weight change and existing weight/BMI history.
- Weekly checklists automatically use a new Monday key. Historical records stay stored. Pre-upgrade checklist entries have no actual completion date and cannot be reconstructed as dated workouts.
- Optional water, workout and supplement reminders. Browser notifications require permission and an open app; no background push or closed-app guarantees.
- Seven days of vegetarian/non-vegetarian menus, three options per meal.
- **Videos are partial:** 17 source-checked mappings; other cards clearly say a matching video is still being curated. The hosted videos are not downloaded or redistributed. Runtime playback and embedding depend on YouTube; clips may be longer than a short demonstration.
- Existing Sites accounts are isolated by platform user ID. External templates add email/password signup, verification, login/logout and token refresh using Supabase Auth. Account recovery UI, account deletion UI and data export UI remain future work.
- No guarantee of injury-free unsupervised exercise. Complex catalogue entries remain marked as requiring coaching.

## External deployment

Start with [deployment/README.md](deployment/README.md). Cloudflare Workers + D1 is the closest fit; the conversion uses Supabase only for authentication, not workout storage. A static Netlify/GitHub Pages upload will not run this backend. Vercel/standard Next.js would require a separate backend/runtime migration.

## Validation

TypeScript and production builds were checked for both the Sites code and converted Cloudflare source. Migrations were applied to an empty SQLite database and same-date records checked for separate users. Streak tests cover undo, duplicate activity dates, broken streaks and month/year boundaries. External auth has not been exercised against a real configured Supabase project and no external production deployment has been made.

Run `node --experimental-strip-types tests/progress.mjs` and `pnpm exec tsc --noEmit`.

See `SECURITY-REVIEW.md` for credential and production notes. The ZIP includes source and assets, not installed dependencies, build output, private records, Git history or hosting account credentials.
