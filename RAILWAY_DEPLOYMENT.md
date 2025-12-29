# Railway Deployment Guide for MBRIGHT Fantasy Cricket

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository: https://github.com/ashwin24121995/mbright-fantasy

## Step-by-Step Deployment

### 1. Create New Project on Railway
1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `ashwin24121995/mbright-fantasy`

### 2. Add MySQL Database
1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will automatically provision a MySQL database

### 3. Configure Environment Variables
Go to your web service settings → Variables tab and add the following:

**Required Variables:**
```
NODE_ENV=production
DATABASE_URL=${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}?user=${MYSQLUSER}&password=${MYSQLPASSWORD}
JWT_SECRET=<generate-a-random-32-character-string>
```

**Generate JWT_SECRET:**
Run this command locally:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Configure Build & Start Commands
In Railway service settings:

**Build Command:**
```
pnpm install && pnpm build
```

**Start Command:**
```
pnpm start
```

### 5. Database Migration
After deployment, run migrations:
1. Go to your service in Railway
2. Click on "Settings" → "Deploy"
3. Add a deployment trigger or manually run:
```bash
pnpm db:push
```

### 6. Custom Domain (Optional)
1. Go to service "Settings" → "Domains"
2. Click "Generate Domain" for a Railway domain
3. Or add your custom domain: mbrightfantasy.com

## Important Notes

### Database Connection
The `DATABASE_URL` format for Railway MySQL is:
```
mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

Railway provides these as separate environment variables that need to be combined.

### Environment Variables Not Needed
These Manus-specific variables are NOT needed for Railway:
- `OAUTH_SERVER_URL`
- `VITE_OAUTH_PORTAL_URL`
- `OWNER_OPEN_ID`
- `OWNER_NAME`
- `BUILT_IN_FORGE_API_KEY`
- `BUILT_IN_FORGE_API_URL`
- `VITE_FRONTEND_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`
- `VITE_APP_ID`
- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

### Custom Authentication
This project uses custom email/password authentication, not Manus OAuth, so it should work on Railway without issues.

### File Uploads
If you plan to use file uploads, you'll need to configure S3 or another storage service separately since the Manus storage helpers won't work on Railway.

## Troubleshooting

### Build Fails
- Check that Node.js version is compatible (v18 or higher)
- Verify all dependencies are in package.json

### Database Connection Issues
- Verify DATABASE_URL is correctly formatted
- Check that database migrations have run
- Ensure MySQL service is running

### Application Won't Start
- Check logs in Railway dashboard
- Verify JWT_SECRET is set
- Ensure build completed successfully

## Repository
GitHub: https://github.com/ashwin24121995/mbright-fantasy

## Support
For Railway-specific issues, visit: https://docs.railway.app
