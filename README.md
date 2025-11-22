# TinyLink - URL Shortener

A professional URL shortener with Google-quality design, built with Next.js, TypeScript, and PostgreSQL.

## Features

- ✅ Create short links with custom or auto-generated codes
- ✅ Real-time click tracking and analytics
- ✅ Professional Google Material Design UI
- ✅ Responsive design optimized for all devices
- ✅ Link management with search and filtering
- ✅ PostgreSQL database with connection pooling
- ✅ RESTful API endpoints
- ✅ Health check endpoint
- ✅ Copy-to-clipboard functionality
- ✅ Smooth animations and transitions

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (we recommend [Neon](https://neon.tech))

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your database URL:
   ```
   POSTGRES_URL=your_postgresql_connection_string
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

The database tables will be created automatically on first API request.

## API Endpoints

### Links Management
- `POST /api/links` - Create a new short link
- `GET /api/links` - Get all links
- `GET /api/links/:code` - Get link stats by code
- `DELETE /api/links/:code` - Delete a link

### Redirect
- `GET /:code` - Redirect to target URL (302) and increment click count

### Health Check
- `GET /healthz` - System health status

## Pages

- `/` - Dashboard (list, add, delete links)
- `/code/:code` - Stats page for individual links
- `/:code` - Redirect endpoint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

```
POSTGRES_URL=your_production_postgresql_url
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

## Database Schema

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  target_url TEXT NOT NULL,
  total_clicks INTEGER DEFAULT 0,
  last_clicked TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Code Validation

- Short codes must be 6-8 characters
- Only letters (A-Z, a-z) and numbers (0-9) allowed
- Codes are globally unique

## License

MIT License