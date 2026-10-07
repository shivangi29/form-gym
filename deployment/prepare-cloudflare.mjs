import {readFileSync,writeFileSync,copyFileSync,mkdirSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
const root=process.cwd();if(!existsSync(resolve(root,'deployment/cloudflare')))throw Error('Run from the extracted FORM project root');
const files={'identity.ts':'lib/identity.ts','account-route.ts':'app/api/account/route.ts','account-page.tsx':'app/account/page.tsx','vite.config.ts':'vite.config.ts','wrangler.jsonc':'wrangler.jsonc'};
for(const [template,target] of Object.entries(files)){mkdirSync(dirname(resolve(root,target)),{recursive:true});copyFileSync(resolve(root,'deployment/cloudflare',template+'.template'),resolve(root,target))}
let page=readFileSync('app/page.tsx','utf8').replace('/signin-with-chatgpt?return_to=%2F','/account').replace('Sign in with ChatGPT','Sign in / create account');if(!page.includes('>Account</a>'))page=page.replace('<span className="private-label">','<a href="/account">Account</a><span className="private-label">');writeFileSync('app/page.tsx',page);
const pkg=JSON.parse(readFileSync('package.json','utf8'));pkg.name='form-gym';pkg.scripts.dev='vite dev';pkg.scripts.build='vite build';pkg.scripts.start='wrangler dev --config dist/server/wrangler.json';pkg.scripts.deploy='wrangler deploy --config dist/server/wrangler.json';writeFileSync('package.json',JSON.stringify(pkg,null,2)+'\n');
console.log('Cloudflare configuration and verified Supabase identity adapter installed. Set your D1 ID, Supabase settings and site URL before deploying.');
