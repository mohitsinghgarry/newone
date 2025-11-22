# Vercel Deployment Guide for TinyLink

## 🚀 **Quick Deployment Steps**

### **1. Prepare Your Repository**
Make sure your code is pushed to GitHub with all the latest changes.

### **2. Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your TinyLink repository

### **3. Configure Environment Variables**
In the Vercel dashboard, add these environment variables:

#### **Required Environment Variables:**
```
POSTGRES_URL=your_neon_database_connection_string
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

#### **How to Add Environment Variables:**
1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables"
4. Add each variable:
   - **Name**: `POSTGRES_URL`
   - **Value**: Your full Neon database connection string
   - **Environment**: Production, Preview, Development (select all)

5. Add the second variable:
   - **Name**: `NEXT_PUBLIC_BASE_URL`
   - **Value**: `https://your-app-name.vercel.app` (replace with your actual Vercel URL)
   - **Environment**: Production, Preview, Development (select all)

### **4. Deploy**
1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be live at `https://your-app-name.vercel.app`

## 🔧 **Troubleshooting Common Issues**

### **Issue 1: "Secret does not exist" Error**
**Problem**: Vercel configuration references non-existent secrets
**Solution**: ✅ **Fixed** - Removed the problematic `env` section from `vercel.json`

### **Issue 2: Database Connection Failed**
**Problem**: Incorrect database URL format
**Solution**: 
```
# Correct format for Neon:
postgresql://username:password@host/database?sslmode=require
```

### **Issue 3: Build Failures**
**Problem**: Missing dependencies or TypeScript errors
**Solution**: 
1. Run `npm run build` locally first
2. Fix any TypeScript errors
3. Ensure all dependencies are in `package.json`

### **Issue 4: API Routes Not Working**
**Problem**: Incorrect API route structure
**Solution**: ✅ **Already Fixed** - All API routes follow Next.js 14 App Router structure

## 📋 **Pre-Deployment Checklist**

### **Code Preparation**
- [ ] All TypeScript errors resolved
- [ ] `npm run build` works locally
- [ ] Environment variables configured
- [ ] Database connection tested

### **Vercel Configuration**
- [ ] `vercel.json` is clean (no secret references)
- [ ] Environment variables added to Vercel dashboard
- [ ] Correct domain configured in `NEXT_PUBLIC_BASE_URL`

### **Database Setup**
- [ ] Neon database created and accessible
- [ ] Connection string copied correctly
- [ ] Database tables will be created automatically on first API call

## 🌐 **Environment Variables Explained**

### **POSTGRES_URL**
```
postgresql://neondb_owner:your_password@ep-cool-art-ahidai8s-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- **Purpose**: Database connection string
- **Source**: Copy from your Neon dashboard
- **Required**: Yes, for all database operations

### **NEXT_PUBLIC_BASE_URL**
```
https://your-tinylink-app.vercel.app
```
- **Purpose**: Base URL for generating short links
- **Format**: Your actual Vercel deployment URL
- **Required**: Yes, for proper link generation

## 🔄 **Automatic Features**

### **Database Initialization**
- Tables are created automatically on first API request
- No manual database setup required
- Connection pooling handled automatically

### **IST Timezone**
- All timestamps display in Indian Standard Time
- Works correctly on Vercel's servers
- No additional configuration needed

### **Responsive Design**
- Mobile-optimized interface
- Works on all device sizes
- Progressive Web App features

## 📊 **Post-Deployment Testing**

### **Test These Features:**
1. **Health Check**: Visit `/healthz` - should return 200 OK
2. **Create Link**: Test link creation with custom and auto codes
3. **Redirect**: Test that `/:code` redirects properly
4. **Analytics**: Check `/code/:code` stats pages
5. **Search**: Test search functionality
6. **Mobile**: Test on mobile devices

### **Verify Environment:**
1. Check that timestamps show IST
2. Verify short URLs use correct domain
3. Test database connectivity
4. Confirm all API endpoints work

## 🚨 **Important Notes**

### **Domain Configuration**
- Update `NEXT_PUBLIC_BASE_URL` after deployment
- Use your actual Vercel URL, not localhost
- Include `https://` in the URL

### **Database Security**
- Neon connection includes SSL by default
- Connection string is secure
- No additional security configuration needed

### **Performance**
- Vercel Edge Functions for fast API responses
- Global CDN for static assets
- Automatic scaling based on traffic

## 🎯 **Success Indicators**

Your deployment is successful when:
- ✅ Health check returns `{"ok": true, "version": "1.0"}`
- ✅ You can create and access short links
- ✅ Analytics pages load correctly
- ✅ All timestamps show IST
- ✅ Mobile interface works properly

Follow these steps and your TinyLink app will be successfully deployed on Vercel with proper Indian timezone support!