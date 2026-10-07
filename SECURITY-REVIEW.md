# Credential and portability review

Reviewed application code, configuration and text source in this export. Pattern checks found no private keys, AWS access keys, GitHub tokens, Supabase secret keys or JWT-like credential literals. No `.env` files were present. This is a source review, not a full penetration test or dependency-vulnerability audit.

No hardcoded database password or backend secret was found. D1 is accessed by the runtime's `DB` binding. The all-zero D1 identifier in the original Vite config is a local placeholder, not a credential. Original Sites project identity has been replaced with neutral binding metadata in the downloadable export.

Important portability finding: the original `lib/identity.ts` trusts `oai-authenticated-user-id`. That is only appropriate behind the Sites trusted gateway. **Do not directly deploy the unconverted source to an arbitrary public host.** Run `node deployment/prepare-cloudflare.mjs` first. It replaces the whole identity module with Supabase-verified authentication and removes the Sites mock-auth plugin from the Vite configuration.

The exported archive excludes `.git`, `.env*`, `.dev.vars*`, local database state, build output, installed dependencies, caches, personal progress records and ephemeral credentials. Keep environment files ignored. Set production settings through your hosting account; no service-role key is required for the supplied auth adapter.

Public YouTube IDs, image-credit URLs, and licence texts are intentional nonsecret content. Videos load from YouTube only when their player is opened. User workout data stays in D1 and account credentials are handled by Supabase for the external deployment.

External sign-in is compile-checked but awaits live integration testing with your own services. Do not call the handoff a production security certification.
