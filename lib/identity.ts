import {headers} from 'next/headers';
// Only valid behind the Sites authentication gateway. The external-hosting
// preparation script replaces this entire module with verified Supabase auth.
export async function userId(){return (await headers()).get('oai-authenticated-user-id')}
