# Deployment Guide

This guide covers how to publish your Linarc Mega Menu app to a public server.

## Prerequisites

1. **Build the production version:**
   ```bash
   npm run build
   ```
   This creates a `dist` folder with optimized production files.

2. **Environment Variables:**
   - Make sure you have your `GEMINI_API_KEY` ready
   - You'll need to configure this on your hosting platform

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```
   Or connect your GitHub repo at [vercel.com](https://vercel.com)

3. **Configure Environment Variables:**
   - Go to your project settings on Vercel
   - Add `GEMINI_API_KEY` in the Environment Variables section
   - Redeploy after adding variables

4. **Build Settings (auto-detected):**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option 2: Netlify

1. **Install Netlify CLI (optional):**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   Or connect your GitHub repo at [netlify.com](https://netlify.com)

3. **Create `netlify.toml` in project root:**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

4. **Configure Environment Variables:**
   - Go to Site settings → Environment variables
   - Add `GEMINI_API_KEY`
   - Redeploy

### Option 3: GitHub Pages

1. **Update `vite.config.ts`** to add `base` path:
   ```typescript
   base: '/your-repo-name/',
   ```

2. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

### Option 4: Traditional Web Server (Apache/Nginx)

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your web server's public directory:
   - Apache: `/var/www/html/` or your virtual host directory
   - Nginx: `/usr/share/nginx/html/` or your site root

3. **Configure your server:**
   - Ensure the server serves `index.html` for all routes (SPA routing)
   - For Apache, add `.htaccess` with rewrite rules
   - For Nginx, configure try_files directive

4. **Environment Variables:**
   - Since this is a static build, environment variables are baked in at build time
   - You'll need to set `GEMINI_API_KEY` in a `.env` file before building
   - Or use a different approach like runtime configuration

## Important Notes

### Environment Variables in Production

Your current setup uses environment variables at build time. For production:

1. **Build-time variables (current approach):**
   - Set `GEMINI_API_KEY` in your hosting platform's environment variables
   - The build process will inject them into the bundle
   - Variables are visible in the client-side code (not secure for secrets)

2. **For sensitive API keys:**
   - Consider using a backend proxy to hide your API key
   - Never expose sensitive keys in client-side code

### Testing the Build Locally

Before deploying, test your production build:

```bash
npm run build
npm run preview
```

This serves the production build locally so you can verify everything works.

## Quick Start (Vercel)

The fastest way to deploy:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Add `GEMINI_API_KEY` in project settings → Environment Variables
5. Click "Deploy"
6. Your app will be live in minutes!

## Troubleshooting

- **404 errors on routes:** Configure your server to serve `index.html` for all routes (SPA routing)
- **Environment variables not working:** Make sure they're set in your hosting platform and you've redeployed
- **Build fails:** Check that all dependencies are in `package.json` and run `npm install` first
