# Deploy FORM Gym outside Sites

This is a prepared source handoff, not a completed external deployment. Use your own Cloudflare and Supabase accounts. Do not paste credentials into chat or commit them to Git.

## 1. Prepare a fresh extracted copy

Install Node.js 22.13+ and the pnpm version declared in package.json (11.25.0). From the extracted project directory:

```sh
node deployment/prepare-cloudflare.mjs
pnpm install --frozen-lockfile
pnpm exec wrangler login
pnpm exec wrangler d1 create form-gym
```

The preparation script replaces Sites-only identity with Supabase verification, installs `/account` and `/api/account`, replaces the Vite configuration and adds Wrangler deployment commands. Run it in the extracted copy, not the existing Sites checkout. No local mock identity is used in the converted build. An unset or invalid Supabase configuration denies access to user data.

Copy the D1 ID returned by Cloudflare into `wrangler.jsonc`. Keep the binding name `DB`.

## 2. Configure authentication

Create a Supabase project and enable email/password authentication. Keep email confirmation enabled. Configure its Site URL and allowed redirect URL (`https://YOUR_DOMAIN/account`) to match your eventual public domain. Configure production SMTP/email delivery and appropriate signup rate limits in Supabase before a public launch.

Set these Wrangler variables:

| Setting | Meaning | Secret? |
| --- | --- | --- |
| `SUPABASE_URL` | `https://YOUR_PROJECT.supabase.co` | No |
| `FORM_SITE_URL` | Exact HTTPS public origin, no trailing slash | No |
| `SUPABASE_ANON_KEY` | Supabase legacy public anon API key | Public key; store as an environment binding |
| `DB` | Cloudflare D1 binding | Platform binding, not a hardcoded password |

This adapter expects the legacy **anon** key supported by Supabase Auth. Do not supply a service-role key, JWT signing secret or database password. The frontend never needs a service-role key. Set the anon key interactively:

```sh
pnpm exec wrangler secret put SUPABASE_ANON_KEY --config wrangler.jsonc
```

Access and refresh tokens are stored in HttpOnly, SameSite=Lax cookies. Production HTTPS makes them Secure. The server validates identity through Supabase's `/auth/v1/user`, rather than trusting browser-provided IDs or decoded JWT payloads. It refreshes expired sessions through the Auth service. All D1 operations are scoped to that verified user ID.

For localhost development, use `.dev.vars` (gitignored) for these three settings, with `FORM_SITE_URL=http://localhost:5173`; use a development Supabase project. Never expose the development server publicly.

## 3. Build and deploy

```sh
pnpm exec tsc --noEmit
node --experimental-strip-types tests/progress.mjs
pnpm exec wrangler d1 migrations apply form-gym --remote --config wrangler.jsonc
pnpm run build
pnpm run deploy
```

The Vite Cloudflare plugin produces `dist/server/wrangler.json` with the Worker and client asset configuration. The deploy script uses that generated file. Set your final workers.dev URL in `FORM_SITE_URL`, rebuild and deploy again if it differs from your initial configuration; update Supabase redirects too. Configure a custom domain in Cloudflare if desired.

No additional D1 row-level security is assumed: the application owns query scoping. Do not expose a direct unprotected database API. Existing Sites records are not transferred; they use different account identifiers. Export/import with an explicit account mapping is a separate migration, not included here.

## 4. Verify before inviting users

Create two test accounts and confirm their email addresses. Verify sign-in, save separate profiles/weights/workouts, and confirm account B cannot see account A's data. Verify reload persistence, session refresh, logout, Monday rollover, and two devices. Request `/api/data` without cookies and with a forged `oai-authenticated-user-id`; both must return 401. Confirm signup email delivery, video availability and notification behavior on your target browsers.

The source and converted build compile, but these real-service checks require your configured accounts. Add your privacy notice, support/contact details, and an account/data deletion process before collecting public users' fitness information. Review hosting limits and your dependency update policy; this project pins a beta Vinext release.

## References

- Cloudflare Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- D1 migrations: https://developers.cloudflare.com/d1/reference/migrations/
- Supabase Auth API: https://github.com/supabase/auth
- Supabase server-side identity verification: https://supabase.com/docs/reference/javascript/auth-getuser
