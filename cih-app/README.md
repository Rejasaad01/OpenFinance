# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

## Backend API

The app is wired to the Financial MVP API. Configure the API base URL with:

```bash
VITE_API_BASE_URL=https://backend-production-df87.up.railway.app
```

If `VITE_API_BASE_URL` is not set, the frontend falls back to the Railway production URL above.

## Hostinger Deployment

This app uses Vue Router history mode. On Hostinger/Apache, refreshing a page like `/dashboard` or `/loan-advisor` will fail unless Apache rewrites those routes back to `index.html`.

The required rewrite file is `public/.htaccess`. Vite copies it into `dist/.htaccess` during build.

Build a Hostinger-ready archive with:

```bash
npm run build:hostinger
```

Upload the contents of `hostinger-dist.zip` into `public_html`. The archive is created from inside `dist`, so `index.html`, `assets/`, and `.htaccess` should be directly inside `public_html`, not inside a nested `dist` folder.

Important: `.htaccess` is a hidden file. If you upload files manually, make sure hidden files are visible and that `.htaccess` is uploaded too.
