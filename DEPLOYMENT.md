# Deployment Guide

## Quick Deploy to Vercel

### 1. Database Setup (Neon)

1. Go to [Neon](https://neon.tech) and create a free account
2. Create a new project
3. Copy the connection string from the dashboard

### 2. Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Add environment variables:
   - `POSTGRES_URL`: Your Neon connection string
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel app URL (e.g., `https://your-app.vercel.app`)

4. Deploy!

### 3. Test Your Deployment

Visit these URLs to test:
- `https://your-app.vercel.app/` - Dashboard
- `https://your-app.vercel.app/healthz` - Health check

## Alternative: Railway

1. Create account at [Railway](https://railway.app)
2. Create new project from GitHub
3. Add PostgreSQL service
4. Set environment variables:
   - `POSTGRES_URL`: Railway will provide this
   - `NEXT_PUBLIC_BASE_URL`: Your Railway app URL

## Alternative: Render

1. Create account at [Render](https://render.com)
2. Create new Web Service from GitHub
3. Add PostgreSQL database
4. Set environment variables in Render dashboard

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Required for all deployments:

- `POSTGRES_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_BASE_URL`: Your app's base URL

## Database Schema

The app automatically creates the required table on first API request. No manual setup needed!

## Testing Checklist

After deployment, test these features:

- [ ] Health check: `GET /healthz` returns 200
- [ ] Create link: Works with both custom and auto-generated codes
- [ ] Duplicate code: Returns 409 error
- [ ] Redirect: `/:code` redirects and increments counter
- [ ] Stats page: `/code/:code` shows link details
- [ ] Delete link: Removes link and makes redirect return 404
- [ ] Dashboard: Shows all links with search/filter
- [ ] Responsive design: Works on mobile devices